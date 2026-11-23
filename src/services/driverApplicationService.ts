// PRISHA XPRESS PVT. LTD. - DRIVER APPLICATION BACKEND & STORAGE SERVICE
// SUPABASE DATABASE (public.driver_applications) & STORAGE (driver-documents bucket)

import {
  DriverApplicationFormData,
  DriverUploadedFiles,
  DriverApplicationRecord,
  DriverAppStatus,
  DriverVehicleCategory,
} from '../types/driverApplication';

const STORAGE_BUCKET = 'driver-documents';
const LOCAL_STORAGE_KEY = 'px_driver_applications_db_v1';
const DRAFT_STORAGE_KEY = 'px_driver_form_draft_v2';

class DriverApplicationService {
  private supabaseUrl: string;
  private supabaseKey: string;
  private isConfigured: boolean;

  constructor() {
    this.supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || '';
    this.supabaseKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '';
    this.isConfigured = Boolean(
      this.supabaseUrl &&
      this.supabaseKey &&
      !this.supabaseUrl.includes('your-project-id')
    );
  }

  private getHeaders(): Record<string, string> {
    return {
      apikey: this.supabaseKey,
      Authorization: `Bearer ${this.supabaseKey}`,
    };
  }

  /**
   * Helper to convert File to base64 data URL for offline thumbnail preview / fallback
   */
  public async fileToDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

  /**
   * Uploads an individual document file to Supabase private storage bucket 'driver-documents'
   * and generates a 1-year signed URL for secure viewing.
   */
  public async uploadDocument(
    applicationCode: string,
    docKey: 'dl-front' | 'dl-back' | 'aadhaar-front' | 'aadhaar-back' | 'pan-card',
    file: File
  ): Promise<{ storagePath: string; url: string }> {
    const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const storagePath = `${applicationCode}/${docKey}.${fileExt}`;

    if (!this.isConfigured) {
      const dataUrl = await this.fileToDataUrl(file);
      return { storagePath, url: dataUrl };
    }

    try {
      // 1. Upload file binary
      const uploadUrl = `${this.supabaseUrl}/storage/v1/object/${STORAGE_BUCKET}/${storagePath}`;
      const uploadRes = await fetch(uploadUrl, {
        method: 'POST',
        headers: {
          ...this.getHeaders(),
          'Content-Type': file.type || 'image/jpeg',
          'x-upsert': 'true',
        },
        body: file,
      });

      if (!uploadRes.ok) {
        console.warn(`Storage upload warning for ${docKey}, falling back to data URL:`, await uploadRes.text());
        const dataUrl = await this.fileToDataUrl(file);
        return { storagePath, url: dataUrl };
      }

      // 2. Generate signed URL (valid for 1 year = 31536000 seconds)
      const signUrl = `${this.supabaseUrl}/storage/v1/object/sign/${STORAGE_BUCKET}/${storagePath}`;
      const signRes = await fetch(signUrl, {
        method: 'POST',
        headers: {
          ...this.getHeaders(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ expiresIn: 31536000 }),
      });

      if (signRes.ok) {
        const signData = await signRes.json();
        if (signData.signedURL) {
          const fullSignedUrl = `${this.supabaseUrl}/storage/v1${signData.signedURL}`;
          return { storagePath, url: fullSignedUrl };
        }
      }

      // If sign fails, return public object URL or data URL
      const publicUrl = `${this.supabaseUrl}/storage/v1/object/public/${STORAGE_BUCKET}/${storagePath}`;
      return { storagePath, url: publicUrl };
    } catch (err) {
      console.error(`Error uploading ${docKey}:`, err);
      const dataUrl = await this.fileToDataUrl(file);
      return { storagePath, url: dataUrl };
    }
  }

  /**
   * Generates a sequential application code e.g. PX-DRV-2026-0001
   */
  public generateApplicationCode(): string {
    const stored = this.getLocalApplications();
    const count = stored.length + 1;
    const padded = String(count).padStart(4, '0');
    return `PX-DRV-2026-${padded}`;
  }

  /**
   * Submits a full driver application:
   * 1. Uploads documents to Supabase Storage 'driver-documents'
   * 2. Inserts application record into Supabase PostgreSQL 'driver_applications'
   * 3. Saves to local storage cache for instant resilience
   */
  public async submitDriverApplication(
    formData: DriverApplicationFormData,
    files: DriverUploadedFiles
  ): Promise<DriverApplicationRecord> {
    const applicationCode = this.generateApplicationCode();

    // 1. Upload all documents
    if (!files.dl_front || !files.dl_back || !files.aadhaar_front || !files.aadhaar_back) {
      throw new Error('Please upload all required documents (Driving Licence Front/Back, Aadhaar Card Front/Back).');
    }

    const [dlFront, dlBack, aadhaarFront, aadhaarBack, panCard] = await Promise.all([
      this.uploadDocument(applicationCode, 'dl-front', files.dl_front),
      this.uploadDocument(applicationCode, 'dl-back', files.dl_back),
      this.uploadDocument(applicationCode, 'aadhaar-front', files.aadhaar_front),
      this.uploadDocument(applicationCode, 'aadhaar-back', files.aadhaar_back),
      files.pan_card ? this.uploadDocument(applicationCode, 'pan-card', files.pan_card) : Promise.resolve(null),
    ]);

    const newRecord: DriverApplicationRecord = {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `drv-${Date.now()}`,
      application_code: applicationCode,
      full_name: formData.full_name.trim(),
      mobile_number: formData.mobile_number.trim(),
      whatsapp_number: (formData.whatsapp_number || formData.mobile_number).trim(),
      date_of_birth: formData.date_of_birth,
      city: formData.city,
      pincode: formData.pincode.trim(),
      emergency_contact: formData.emergency_contact?.trim() || '',
      dl_number: formData.dl_number.trim().toUpperCase(),
      vehicle_categories: formData.vehicle_categories,
      dl_front_url: dlFront.url,
      dl_back_url: dlBack.url,
      aadhaar_front_url: aadhaarFront.url,
      aadhaar_back_url: aadhaarBack.url,
      pan_card_url: panCard ? panCard.url : null,
      status: 'pending',
      admin_remarks: null,
      reviewed_at: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // 2. Persist to Supabase DB if configured
    if (this.isConfigured) {
      try {
        // First try the new schema columns
        const insertUrl = `${this.supabaseUrl}/rest/v1/driver_applications`;
        const res = await fetch(insertUrl, {
          method: 'POST',
          headers: {
            ...this.getHeaders(),
            'Content-Type': 'application/json',
            Prefer: 'return=representation',
          },
          body: JSON.stringify({
            application_code: newRecord.application_code,
            full_name: newRecord.full_name,
            mobile_number: newRecord.mobile_number,
            whatsapp_number: newRecord.whatsapp_number,
            date_of_birth: newRecord.date_of_birth,
            city: newRecord.city,
            pincode: newRecord.pincode,
            emergency_contact: newRecord.emergency_contact,
            dl_number: newRecord.dl_number,
            vehicle_categories: newRecord.vehicle_categories,
            dl_front_url: newRecord.dl_front_url,
            dl_back_url: newRecord.dl_back_url,
            aadhaar_front_url: newRecord.aadhaar_front_url,
            aadhaar_back_url: newRecord.aadhaar_back_url,
            pan_card_url: newRecord.pan_card_url,
            status: newRecord.status,
            admin_remarks: newRecord.admin_remarks,
            reviewed_at: newRecord.reviewed_at,
          }),
        });

        if (!res.ok) {
          const errText = await res.text();
          console.warn('Direct schema insert notice:', errText);
          // If schema cache indicates older columns, fallback to legacy schema insertion
          if (errText.includes('Could not find') || errText.includes('PGRST204')) {
            await this.fallbackLegacyInsert(newRecord);
          }
        } else {
          const insertedData = await res.json();
          if (Array.isArray(insertedData) && insertedData[0]?.id) {
            newRecord.id = insertedData[0].id;
          }
        }
      } catch (dbErr) {
        console.error('Error saving driver to Supabase DB, keeping local copy:', dbErr);
      }
    }

    // 3. Save to local storage for instant dashboard updates
    this.saveLocalApplication(newRecord);
    this.clearDraft();

    return newRecord;
  }

  /**
   * Fallback insert to legacy database schema if 20261123 migration has not been run yet
   */
  private async fallbackLegacyInsert(record: DriverApplicationRecord): Promise<void> {
    try {
      const payload = {
        application_reference: record.application_code,
        full_name: record.full_name,
        date_of_birth: record.date_of_birth,
        gender: 'Male',
        mobile_number: record.mobile_number,
        alternate_mobile_number: record.whatsapp_number,
        city: record.city,
        state: 'Maharashtra',
        pin_code: record.pincode,
        emergency_contact_name: record.emergency_contact || 'None',
        emergency_contact_number: record.emergency_contact || 'None',
        licence_number: record.dl_number,
        licence_type: record.vehicle_categories[0] || 'Transport Vehicle',
        application_status: 'Submitted',
        verification_status: 'Pending',
        declaration_accepted: true,
        consent_accepted: true,
      };

      const res = await fetch(`${this.supabaseUrl}/rest/v1/driver_applications`, {
        method: 'POST',
        headers: {
          ...this.getHeaders(),
          'Content-Type': 'application/json',
          Prefer: 'return=representation',
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        const dbId = data[0]?.id || record.id;
        record.id = dbId;

        // Also insert documents into driver_application_documents
        const docs = [
          { type: 'Driving Licence (Front)', url: record.dl_front_url },
          { type: 'Driving Licence (Back)', url: record.dl_back_url },
          { type: 'Aadhaar Card (Front)', url: record.aadhaar_front_url },
          { type: 'Aadhaar Card (Back)', url: record.aadhaar_back_url },
        ];
        if (record.pan_card_url) {
          docs.push({ type: 'PAN Card', url: record.pan_card_url });
        }

        for (const doc of docs) {
          await fetch(`${this.supabaseUrl}/rest/v1/driver_application_documents`, {
            method: 'POST',
            headers: {
              ...this.getHeaders(),
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              driver_application_id: dbId,
              document_type: doc.type,
              storage_path: doc.url,
              original_filename: `${record.application_code}-${doc.type}`,
              file_type: 'image/jpeg',
              file_size: 1024 * 500,
              document_status: 'Pending',
            }),
          });
        }
      }
    } catch (e) {
      console.warn('Fallback legacy insert caught error:', e);
    }
  }

  /**
   * Retrieves all driver applications from Supabase and merges with local records
   */
  public async getDriverApplications(filters?: {
    status?: string;
    search?: string;
  }): Promise<DriverApplicationRecord[]> {
    let applications: DriverApplicationRecord[] = [...this.getLocalApplications()];

    if (this.isConfigured) {
      try {
        const res = await fetch(
          `${this.supabaseUrl}/rest/v1/driver_applications?select=*,driver_vehicle_categories(*),driver_application_documents(*)&order=created_at.desc`,
          {
            headers: this.getHeaders(),
          }
        );

        if (res.ok) {
          const dbRows: any[] = await res.json();
          const mappedDbRows: DriverApplicationRecord[] = dbRows.map((row) => {
            const docs = row.driver_application_documents || [];
            const findDoc = (type: string) => {
              const d = docs.find((item: any) =>
                item.document_type && item.document_type.toLowerCase().includes(type.toLowerCase())
              );
              return d ? d.storage_path : '';
            };

            const cats: DriverVehicleCategory[] =
              Array.isArray(row.vehicle_categories) && row.vehicle_categories.length > 0
                ? row.vehicle_categories
                : Array.isArray(row.driver_vehicle_categories) && row.driver_vehicle_categories.length > 0
                ? row.driver_vehicle_categories.map((c: any) => c.vehicle_category)
                : ([row.licence_type || 'Transport Vehicle'] as DriverVehicleCategory[]);

            return {
              id: row.id,
              application_code: row.application_code || row.application_reference || `PX-DRV-2026-${row.id.slice(0, 4)}`,
              full_name: row.full_name || '',
              mobile_number: row.mobile_number || '',
              whatsapp_number: row.whatsapp_number || row.alternate_mobile_number || row.mobile_number,
              date_of_birth: row.date_of_birth || '',
              city: row.city || 'Pune',
              pincode: row.pincode || row.pin_code || '',
              emergency_contact: row.emergency_contact || row.emergency_contact_number || '',
              dl_number: row.dl_number || row.licence_number || '',
              vehicle_categories: cats,
              dl_front_url: row.dl_front_url || findDoc('Front') || '/assets/images/drivers-hero.jpg',
              dl_back_url: row.dl_back_url || findDoc('Back') || '/assets/images/drivers-hero.jpg',
              aadhaar_front_url: row.aadhaar_front_url || findDoc('Aadhaar') || '/assets/images/drivers-hero.jpg',
              aadhaar_back_url: row.aadhaar_back_url || findDoc('Aadhaar') || '/assets/images/drivers-hero.jpg',
              pan_card_url: row.pan_card_url || findDoc('PAN') || null,
              status: this.normalizeStatus(row.status || row.application_status),
              admin_remarks: row.admin_remarks || null,
              reviewed_at: row.reviewed_at || null,
              created_at: row.created_at || new Date().toISOString(),
              updated_at: row.updated_at || row.created_at,
            };
          });

          // Merge DB rows with local rows, deduplicating by application_code or id
          const idMap = new Map<string, DriverApplicationRecord>();
          for (const item of mappedDbRows) {
            idMap.set(item.application_code, item);
          }
          for (const local of applications) {
            if (!idMap.has(local.application_code)) {
              idMap.set(local.application_code, local);
            }
          }
          applications = Array.from(idMap.values());
        }
      } catch (err) {
        console.warn('Error fetching driver applications from Supabase, returning local cache:', err);
      }
    }

    // Default seed records if empty
    if (applications.length === 0) {
      applications = this.getSeedApplications();
      this.saveAllLocalApplications(applications);
    }

    // Sort by created_at descending
    applications.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    // Apply filters
    if (filters?.status && filters.status !== 'All') {
      const target = filters.status.toLowerCase();
      applications = applications.filter((app) => app.status.toLowerCase() === target);
    }

    if (filters?.search && filters.search.trim()) {
      const q = filters.search.trim().toLowerCase();
      applications = applications.filter(
        (app) =>
          app.full_name.toLowerCase().includes(q) ||
          app.mobile_number.includes(q) ||
          app.dl_number.toLowerCase().includes(q) ||
          app.city.toLowerCase().includes(q) ||
          app.application_code.toLowerCase().includes(q)
      );
    }

    return applications;
  }

  private normalizeStatus(statusStr?: string): DriverAppStatus {
    if (!statusStr) return 'pending';
    const s = statusStr.toLowerCase();
    if (s.includes('approve')) return 'approved';
    if (s.includes('reject')) return 'rejected';
    return 'pending';
  }

  /**
   * Updates application status ('approved' or 'rejected') and admin remarks
   */
  public async updateApplicationStatus(
    id: string,
    status: DriverAppStatus,
    adminRemarks: string
  ): Promise<DriverApplicationRecord> {
    const apps = await this.getDriverApplications();
    const app = apps.find((a) => a.id === id || a.application_code === id);
    if (!app) throw new Error('Driver application not found.');

    const reviewedAt = new Date().toISOString();
    app.status = status;
    app.admin_remarks = adminRemarks;
    app.reviewed_at = reviewedAt;

    // Update in Supabase
    if (this.isConfigured) {
      try {
        await fetch(`${this.supabaseUrl}/rest/v1/driver_applications?id=eq.${app.id}`, {
          method: 'PATCH',
          headers: {
            ...this.getHeaders(),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            status,
            admin_remarks: adminRemarks,
            reviewed_at: reviewedAt,
            application_status: status === 'approved' ? 'Approved – Ready for Company Software' : 'Rejected',
          }),
        });
      } catch (e) {
        console.warn('Could not update Supabase status directly:', e);
      }
    }

    // Update local cache
    this.saveLocalApplication(app);
    return app;
  }

  // Local Storage Management
  public getLocalApplications(): DriverApplicationRecord[] {
    try {
      const data = localStorage.getItem(LOCAL_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  public saveLocalApplication(record: DriverApplicationRecord) {
    const list = this.getLocalApplications();
    const idx = list.findIndex((a) => a.id === record.id || a.application_code === record.application_code);
    if (idx >= 0) {
      list[idx] = record;
    } else {
      list.unshift(record);
    }
    this.saveAllLocalApplications(list);
  }

  public saveAllLocalApplications(list: DriverApplicationRecord[]) {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      console.warn('Could not save to localStorage:', e);
    }
  }

  /**
   * Permanently deletes a driver application from Supabase database,
   * cleans up uploaded files in Supabase Storage ('driver-documents'),
   * and removes the record from local storage.
   */
  public async deleteDriverApplication(id: string, applicationCode?: string): Promise<boolean> {
    // 1. Remove from local storage
    const localList = this.getLocalApplications().filter(
      (a) => a.id !== id && (!applicationCode || a.application_code !== applicationCode)
    );
    this.saveAllLocalApplications(localList);

    // 2. Delete from Supabase Database & Storage
    if (this.isConfigured) {
      try {
        const headers = this.getHeaders();
        const filter = applicationCode
          ? `or=(id.eq.${id},application_code.eq.${applicationCode},application_reference.eq.${applicationCode})`
          : `id=eq.${id}`;

        // Attempt deleting any child relations first (if cascade isn't automatic)
        await fetch(`${this.supabaseUrl}/rest/v1/driver_application_documents?driver_application_id=eq.${id}`, {
          method: 'DELETE',
          headers,
        }).catch(() => {});

        await fetch(`${this.supabaseUrl}/rest/v1/driver_vehicle_categories?driver_application_id=eq.${id}`, {
          method: 'DELETE',
          headers,
        }).catch(() => {});

        await fetch(`${this.supabaseUrl}/rest/v1/driver_vehicle_experience?driver_application_id=eq.${id}`, {
          method: 'DELETE',
          headers,
        }).catch(() => {});

        await fetch(`${this.supabaseUrl}/rest/v1/driver_application_status_history?driver_application_id=eq.${id}`, {
          method: 'DELETE',
          headers,
        }).catch(() => {});

        // Delete main driver application row
        await fetch(`${this.supabaseUrl}/rest/v1/driver_applications?${filter}`, {
          method: 'DELETE',
          headers,
        });

        // 3. Clean up files from Supabase Storage ('driver-documents' bucket)
        if (applicationCode) {
          const docKeys = ['dl-front', 'dl-back', 'aadhaar-front', 'aadhaar-back', 'pan-card'];
          const exts = ['jpg', 'jpeg', 'png', 'pdf', 'webp'];
          const possiblePaths: string[] = [];
          for (const key of docKeys) {
            for (const ext of exts) {
              possiblePaths.push(`${applicationCode}/${key}.${ext}`);
            }
          }

          await fetch(`${this.supabaseUrl}/storage/v1/object/${STORAGE_BUCKET}`, {
            method: 'DELETE',
            headers: {
              ...headers,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prefixes: [applicationCode], paths: possiblePaths }),
          }).catch((err) => console.warn('Could not clean up driver storage files:', err));
        }
      } catch (err) {
        console.warn('Error deleting driver application from Supabase:', err);
      }
    }

    return true;
  }

  // Draft Autosave Management
  public saveDraft(data: Partial<DriverApplicationFormData>) {
    try {
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify({ ...data, savedAt: Date.now() }));
    } catch (e) {
      console.warn('Could not autosave draft:', e);
    }
  }

  public loadDraft(): Partial<DriverApplicationFormData> | null {
    try {
      const data = localStorage.getItem(DRAFT_STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  public clearDraft() {
    try {
      localStorage.removeItem(DRAFT_STORAGE_KEY);
      localStorage.removeItem('px_driver_form_draft');
    } catch {}
  }

  // Initial High-Quality Demo Seed Applications
  private getSeedApplications(): DriverApplicationRecord[] {
    return [
      {
        id: 'drv-demo-001',
        application_code: 'PX-DRV-2026-0001',
        full_name: 'Ramesh Kumar Patil',
        mobile_number: '9822045610',
        whatsapp_number: '9822045610',
        date_of_birth: '1988-06-14',
        city: 'Pune',
        pincode: '411018',
        emergency_contact: 'Sunita Patil (Wife) - 9822045611',
        dl_number: 'MH14 20120045612',
        vehicle_categories: ['HMV', 'Transport Vehicle', 'Trailer / Multi-Axle'],
        dl_front_url: '/assets/images/drivers-hero.jpg',
        dl_back_url: '/assets/images/drivers-hero.jpg',
        aadhaar_front_url: '/assets/images/drivers-hero.jpg',
        aadhaar_back_url: '/assets/images/drivers-hero.jpg',
        pan_card_url: null,
        status: 'pending',
        admin_remarks: null,
        reviewed_at: null,
        created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
      },
      {
        id: 'drv-demo-002',
        application_code: 'PX-DRV-2026-0002',
        full_name: 'Sachin Dnyaneshwar Shinde',
        mobile_number: '9765412390',
        whatsapp_number: '9765412390',
        date_of_birth: '1992-03-21',
        city: 'Chhatrapati Sambhajinagar',
        pincode: '431001',
        emergency_contact: 'Dnyaneshwar Shinde (Father) - 9765412399',
        dl_number: 'MH20 20150078921',
        vehicle_categories: ['HMV', 'Container Vehicle'],
        dl_front_url: '/assets/images/drivers-hero.jpg',
        dl_back_url: '/assets/images/drivers-hero.jpg',
        aadhaar_front_url: '/assets/images/drivers-hero.jpg',
        aadhaar_back_url: '/assets/images/drivers-hero.jpg',
        pan_card_url: '/assets/images/drivers-hero.jpg',
        status: 'approved',
        admin_remarks: 'Verified DL with Pune RTO. Ready for allocation on Chakan - JNPT corridor.',
        reviewed_at: new Date(Date.now() - 3600000 * 24).toISOString(),
        created_at: new Date(Date.now() - 3600000 * 26).toISOString(),
      },
      {
        id: 'drv-demo-003',
        application_code: 'PX-DRV-2026-0003',
        full_name: 'Anil Baban Jadhav',
        mobile_number: '9158023456',
        whatsapp_number: '9158023456',
        date_of_birth: '1985-11-09',
        city: 'Kolhapur',
        pincode: '416003',
        emergency_contact: 'Rohit Jadhav (Brother) - 9158023499',
        dl_number: 'MH09 20100012384',
        vehicle_categories: ['LMV', 'Transport Vehicle'],
        dl_front_url: '/assets/images/drivers-hero.jpg',
        dl_back_url: '/assets/images/drivers-hero.jpg',
        aadhaar_front_url: '/assets/images/drivers-hero.jpg',
        aadhaar_back_url: '/assets/images/drivers-hero.jpg',
        pan_card_url: null,
        status: 'rejected',
        admin_remarks: 'Driving Licence expired in Jan 2026. Requested renewal copy before re-applying.',
        reviewed_at: new Date(Date.now() - 3600000 * 12).toISOString(),
        created_at: new Date(Date.now() - 3600000 * 18).toISOString(),
      },
    ];
  }
}

export const driverApplicationService = new DriverApplicationService();
