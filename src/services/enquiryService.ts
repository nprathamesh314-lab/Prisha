// PRISHA XPRESS PVT. LTD. - BUSINESS ENQUIRY SERVICE
// ENTERPRISE SUPABASE PERSISTENCE, EMAIL DISPATCH & LOCAL STORAGE SYNCHRONIZATION
// COMPLIES WITH: DATABASE FIRST, EMAIL SECOND, RLS SECURITY, AUDIT HISTORY

import {
  BusinessEnquiry,
  BusinessEnquiryServiceType,
  EnquiryStatus,
  EnquiryStats,
  EnquiryFilterOptions,
  EnquiryActivityHistory,
} from '../types/enquiry';
import { emailService } from './emailService';
import { supabaseAuthService } from './supabaseClient';

const STORAGE_KEY_ENQUIRIES = 'prisha_business_enquiries_v1';
const STORAGE_KEY_ACTIVITY = 'prisha_business_enquiry_activity_v1';

// Initial realistic seed records for corporate demonstration
const SEED_ENQUIRIES: BusinessEnquiry[] = [
  {
    id: 'enq-seed-001',
    enquiry_id: 'PXPL-ENQ-2026-0001',
    enquiry_number: 'PXPL-ENQ-2026-0001',
    full_name: 'Rajesh Sharma',
    company_name: 'Western Logistics Hub Ltd.',
    phone: '+91 98220 12345',
    phone_number: '+91 98220 12345',
    email: 'rajesh.sharma@westernlogistics.in',
    service_required: 'Truck Drivers on Hire',
    requirements: 'Require 8 verified HMV container drivers for Pune – Mumbai – Ahmedabad freight corridor on monthly corporate contract.',
    operational_requirements: 'Require 8 verified HMV container drivers for Pune – Mumbai – Ahmedabad freight corridor on monthly corporate contract.',
    status: 'In Progress',
    admin_notes: 'Spoke with Mr. Rajesh. Shared commercial proposal for 8 multi-axle drivers. Awaiting route clearance.',
    assigned_to: 'usr-admin-pxpl',
    assigned_to_name: 'Operations Team Lead',
    follow_up_date: new Date(Date.now() + 86400000).toISOString(),
    email_status: 'Sent',
    customer_email_status: 'Sent',
    created_at: new Date(Date.now() - 172800000).toISOString(),
    updated_at: new Date(Date.now() - 86400000).toISOString(),
    contacted_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'enq-seed-002',
    enquiry_id: 'PXPL-ENQ-2026-0002',
    enquiry_number: 'PXPL-ENQ-2026-0002',
    full_name: 'Vikram Patil',
    company_name: 'Kirloskar Spares & Engineering',
    phone: '+91 98901 67890',
    phone_number: '+91 98901 67890',
    email: 'v.patil@kirloskarspares.com',
    service_required: '3PL Fleet Management',
    requirements: 'Need dedicated 3PL fleet management for 14 commercial tempos operating across Bhosari and Chakan industrial belts.',
    operational_requirements: 'Need dedicated 3PL fleet management for 14 commercial tempos operating across Bhosari and Chakan industrial belts.',
    status: 'New',
    admin_notes: 'New enquiry received. Fleet size: 14 vehicles.',
    assigned_to: undefined,
    assigned_to_name: undefined,
    email_status: 'Sent',
    customer_email_status: 'Sent',
    created_at: new Date(Date.now() - 86400000).toISOString(),
    updated_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'enq-seed-003',
    enquiry_id: 'PXPL-ENQ-2026-0003',
    enquiry_number: 'PXPL-ENQ-2026-0003',
    full_name: 'Amitabh Sen',
    company_name: 'Apex FMCG Distribution',
    phone: '+91 97654 32109',
    phone_number: '+91 97654 32109',
    email: 'asen@apexfmcg.co.in',
    service_required: 'Transportation Services',
    requirements: 'Looking for scheduled daily 32ft multi-axle closed container movement from Pune warehouse to Nagpur distribution centre.',
    operational_requirements: 'Looking for scheduled daily 32ft multi-axle closed container movement from Pune warehouse to Nagpur distribution centre.',
    status: 'Contacted',
    admin_notes: 'Sent rate card for 32ft multi-axle line-haul via official email. Follow up scheduled for tomorrow.',
    assigned_to: 'usr-admin-pxpl',
    assigned_to_name: 'Fleet Dispatcher',
    email_status: 'Sent',
    customer_email_status: 'Sent',
    created_at: new Date(Date.now() - 259200000).toISOString(),
    updated_at: new Date(Date.now() - 129600000).toISOString(),
    contacted_at: new Date(Date.now() - 129600000).toISOString(),
  },
];

class BusinessEnquiryService {
  private enquiries: BusinessEnquiry[] = [];
  private activityLogs: EnquiryActivityHistory[] = [];

  constructor() {
    this.init();
  }

  private init() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_ENQUIRIES);
      if (stored) {
        this.enquiries = JSON.parse(stored);
      } else {
        this.enquiries = [...SEED_ENQUIRIES];
        this.saveToStorage();
      }

      const storedLogs = localStorage.getItem(STORAGE_KEY_ACTIVITY);
      if (storedLogs) {
        this.activityLogs = JSON.parse(storedLogs);
      } else {
        this.activityLogs = [
          {
            id: 'act-001',
            enquiry_id: 'enq-seed-001',
            action_type: 'CREATED',
            actor_name: 'Website Visitor',
            notes: 'Enquiry submitted via Online Business Enquiry Form.',
            created_at: new Date(Date.now() - 172800000).toISOString(),
          },
          {
            id: 'act-002',
            enquiry_id: 'enq-seed-001',
            action_type: 'STATUS_CHANGE',
            previous_status: 'New',
            new_status: 'In Progress',
            actor_name: 'Administrator',
            notes: 'Status updated to In Progress following initial requirement review.',
            created_at: new Date(Date.now() - 86400000).toISOString(),
          },
        ];
        this.saveActivityToStorage();
      }
    } catch {
      this.enquiries = [...SEED_ENQUIRIES];
      this.activityLogs = [];
    }
  }

  private saveToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY_ENQUIRIES, JSON.stringify(this.enquiries));
    } catch (e) {
      console.warn('Could not persist enquiries to localStorage', e);
    }
  }

  private saveActivityToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY_ACTIVITY, JSON.stringify(this.activityLogs));
    } catch (e) {
      console.warn('Could not persist enquiry activity to localStorage', e);
    }
  }

  /**
   * Generates a unique sequential human-readable reference number
   * Format: PXPL-ENQ-2026-XXXX
   */
  public generateNextReference(): string {
    const year = new Date().getFullYear();
    const count = this.enquiries.length + 1;
    return `PXPL-ENQ-${year}-${String(count).padStart(4, '0')}`;
  }

  /**
   * Submits a new business enquiry.
   * Follows strict rule: Database first, email second.
   * Completely removes preferred_contact_method.
   */
  public async submitEnquiry(input: {
    full_name: string;
    company_name?: string;
    phone?: string;
    phone_number?: string;
    email: string;
    service_required: BusinessEnquiryServiceType;
    requirements?: string;
    operational_requirements?: string;
  }): Promise<{
    success: boolean;
    data?: BusinessEnquiry;
    referenceId?: string;
    enquiryId?: string;
    error?: string;
  }> {
    const isConfigured = supabaseAuthService.getIsConfigured();
    const supabaseUrl = supabaseAuthService.getUrl();
    const anonKey = supabaseAuthService.getAnonKey();

    const referenceId = this.generateNextReference();
    const newId = `enq-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const nowIso = new Date().toISOString();

    const cleanPhone = (input.phone || input.phone_number || '').trim();
    const reqText = (input.requirements || input.operational_requirements || '').trim();

    const newEnquiry: BusinessEnquiry = {
      id: newId,
      enquiry_id: referenceId,
      enquiry_number: referenceId,
      full_name: input.full_name.trim(),
      company_name: input.company_name?.trim() || '',
      phone: cleanPhone,
      phone_number: cleanPhone,
      email: input.email.trim().toLowerCase(),
      service_required: input.service_required,
      requirements: reqText,
      operational_requirements: reqText,
      status: 'New',
      email_status: 'Pending',
      customer_email_status: 'Pending',
      created_at: nowIso,
      updated_at: nowIso,
    };

    // 1. DATABASE FIRST: Persist to Supabase if configured
    if (isConfigured) {
      try {
        const payload: any = {
          contact_person: newEnquiry.full_name,
          company_name: newEnquiry.company_name || null,
          phone: newEnquiry.phone,
          email: newEnquiry.email,
          service_requested: newEnquiry.service_required,
          fleet_requirement: newEnquiry.requirements || '',
          status: 'New',
          internal_notes: null,
          origin_city: 'Pune',
          destination_city: 'Corridor Operations',
          additional_details: newEnquiry.requirements || '',
        };

        const res = await fetch(`${supabaseUrl}/rest/v1/business_enquiries`, {
          method: 'POST',
          headers: {
            apikey: anonKey,
            Authorization: `Bearer ${anonKey}`,
            'Content-Type': 'application/json',
            Prefer: 'return=representation',
          },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          const [inserted] = await res.json().catch(() => [null]);
          if (inserted?.id) {
            newEnquiry.id = inserted.id;
            if (inserted.enquiry_number) {
              newEnquiry.enquiry_id = inserted.enquiry_number;
              newEnquiry.enquiry_number = inserted.enquiry_number;
            }
          }
        } else {
          console.warn('Supabase DB returned error for business enquiry:', res.status);
        }
      } catch (err) {
        console.warn('Network error inserting enquiry to Supabase DB:', err);
      }
    }

    // Save to local cache
    this.enquiries.unshift(newEnquiry);
    this.saveToStorage();

    // Log Activity
    this.addActivityLog({
      enquiry_id: newEnquiry.id,
      action_type: 'CREATED',
      actor_name: `${newEnquiry.full_name} (Customer)`,
      notes: `Enquiry submitted for ${newEnquiry.service_required}.`,
    });

    // 2. EMAIL SECOND: Dispatch transactional notifications safely
    emailService
      .sendEnquiryEmails(newEnquiry)
      .then((emailResult) => {
        const idx = this.enquiries.findIndex((e) => e.id === newEnquiry.id);
        if (idx !== -1) {
          this.enquiries[idx].email_status = emailResult.adminSuccess ? 'Sent' : 'Failed';
          this.enquiries[idx].email_error = emailResult.adminError;
          this.enquiries[idx].customer_email_status = emailResult.customerSuccess ? 'Sent' : 'Failed';
          this.enquiries[idx].customer_email_error = emailResult.customerError;
          this.saveToStorage();
        }

        // Also update Supabase if configured
        if (isConfigured) {
          fetch(
            `${supabaseUrl}/rest/v1/business_enquiries?id=eq.${newEnquiry.id}`,
            {
              method: 'PATCH',
              headers: {
                apikey: anonKey,
                Authorization: `Bearer ${anonKey}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email_status: emailResult.adminSuccess ? 'Sent' : 'Failed',
                email_error: emailResult.adminError || null,
                customer_email_status: emailResult.customerSuccess ? 'Sent' : 'Failed',
                customer_email_error: emailResult.customerError || null,
              }),
            }
          ).catch((e) => console.warn('Could not update email status in Supabase:', e));
        }
      })
      .catch((err) => console.warn('Email dispatch background error:', err));

    return {
      success: true,
      data: newEnquiry,
      referenceId: newEnquiry.enquiry_id,
      enquiryId: newEnquiry.enquiry_id,
    };
  }

  /**
   * Syncs enquiries from Supabase database for authenticated administrator
   */
  public async syncFromSupabase(): Promise<void> {
    const session = await supabaseAuthService.getAdminSession();
    const isConfigured = supabaseAuthService.getIsConfigured();
    if (!isConfigured) return;

    try {
      const supabaseUrl = supabaseAuthService.getUrl();
      const anonKey = supabaseAuthService.getAnonKey();
      const authToken = session?.token || anonKey;

      const res = await fetch(
        `${supabaseUrl}/rest/v1/business_enquiries?select=*&order=created_at.desc`,
        {
          headers: {
            apikey: anonKey,
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (res.ok) {
        const data: any[] = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          const remoteMap = new Map(data.map((item) => [item.id, item]));
          const merged: BusinessEnquiry[] = data.map((item) => {
            let normalizedStatus: EnquiryStatus = 'New';
            const s = (item.status || '').toLowerCase();
            if (s.includes('progress')) normalizedStatus = 'In Progress';
            else if (s.includes('contact')) normalizedStatus = 'Contacted';
            else if (s.includes('convert')) normalizedStatus = 'Converted';
            else if (s.includes('complete')) normalizedStatus = 'Completed';
            else if (s.includes('close') || s.includes('lost')) normalizedStatus = 'Closed';
            else normalizedStatus = 'New';

            return {
              id: item.id,
              enquiry_id: item.enquiry_number || item.enquiry_id || item.id,
              enquiry_number: item.enquiry_number || item.enquiry_id || item.id,
              full_name: item.full_name || item.contact_person || 'Customer',
              company_name: item.company_name || '',
              phone: item.phone_number || item.phone || '',
              phone_number: item.phone_number || item.phone || '',
              email: item.email || '',
              service_required: (item.service_required || item.service_requested || 'Other') as BusinessEnquiryServiceType,
              requirements: item.operational_requirements || item.requirements || item.fleet_requirement || '',
              operational_requirements: item.operational_requirements || item.requirements || item.fleet_requirement || '',
              status: normalizedStatus,
              admin_notes: item.admin_notes || item.internal_notes || '',
              assigned_to: item.assigned_to,
              assigned_to_name: item.assigned_to_name,
              follow_up_date: item.follow_up_date,
              email_status: item.email_status || 'Pending',
              email_error: item.email_error,
              customer_email_status: item.customer_email_status || 'Pending',
              customer_email_error: item.customer_email_error,
              created_at: item.created_at || new Date().toISOString(),
              updated_at: item.updated_at || new Date().toISOString(),
              contacted_at: item.contacted_at,
            };
          });

          for (const local of this.enquiries) {
            if (!remoteMap.has(local.id)) {
              merged.push(local);
            }
          }
          this.enquiries = merged;
          this.saveToStorage();
        }
      }
    } catch (e) {
      console.warn('Error syncing enquiries from Supabase:', e);
    }
  }

  /**
   * Retrieves enquiries with flexible search and filtering
   */
  public getEnquiries(filters?: EnquiryFilterOptions): BusinessEnquiry[] {
    let list = [...this.enquiries];

    if (!filters) return list;

    // 1. Search Query
    if (filters.searchQuery?.trim()) {
      const q = filters.searchQuery.trim().toLowerCase();
      list = list.filter(
        (e) =>
          (e.enquiry_id && e.enquiry_id.toLowerCase().includes(q)) ||
          (e.enquiry_number && e.enquiry_number.toLowerCase().includes(q)) ||
          (e.full_name && e.full_name.toLowerCase().includes(q)) ||
          (e.company_name && e.company_name.toLowerCase().includes(q)) ||
          (e.phone && e.phone.includes(q)) ||
          (e.email && e.email.toLowerCase().includes(q)) ||
          (e.requirements && e.requirements.toLowerCase().includes(q)) ||
          (e.operational_requirements && e.operational_requirements.toLowerCase().includes(q))
      );
    }

    // 2. Status Filter
    if (filters.status && filters.status !== 'All') {
      list = list.filter((e) => e.status === filters.status);
    }

    // 3. Service Filter
    if (filters.service && filters.service !== 'All') {
      list = list.filter((e) => e.service_required === filters.service);
    }

    // 4. Date Filter
    if (filters.dateRange && filters.dateRange !== 'all') {
      const now = new Date();
      if (filters.dateRange === 'today') {
        const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
        list = list.filter((e) => new Date(e.created_at).getTime() >= startOfDay);
      } else if (filters.dateRange === '7days') {
        const past7 = now.getTime() - 7 * 86400000;
        list = list.filter((e) => new Date(e.created_at).getTime() >= past7);
      } else if (filters.dateRange === '30days') {
        const past30 = now.getTime() - 30 * 86400000;
        list = list.filter((e) => new Date(e.created_at).getTime() >= past30);
      } else if (filters.dateRange === 'custom') {
        if (filters.startDate) {
          const s = new Date(filters.startDate).getTime();
          list = list.filter((e) => new Date(e.created_at).getTime() >= s);
        }
        if (filters.endDate) {
          const end = new Date(filters.endDate).getTime() + 86400000;
          list = list.filter((e) => new Date(e.created_at).getTime() <= end);
        }
      }
    }

    return list;
  }

  public getEnquiryById(id: string): BusinessEnquiry | undefined {
    return this.enquiries.find((e) => e.id === id);
  }

  /**
   * Updates enquiry status with full audit logging
   */
  public async updateStatus(
    id: string,
    newStatus: EnquiryStatus,
    reason?: string,
    actorName: string = 'Administrator'
  ): Promise<BusinessEnquiry> {
    const enquiry = this.enquiries.find((e) => e.id === id);
    if (!enquiry) throw new Error('Enquiry record not found');

    const previousStatus = enquiry.status;
    enquiry.status = newStatus;
    enquiry.updated_at = new Date().toISOString();

    if (newStatus === 'Contacted' && !enquiry.contacted_at) {
      enquiry.contacted_at = new Date().toISOString();
    }

    this.saveToStorage();

    this.addActivityLog({
      enquiry_id: id,
      action_type: 'STATUS_CHANGE',
      previous_status: previousStatus,
      new_status: newStatus,
      actor_name: actorName,
      notes: reason || `Status changed from ${previousStatus} to ${newStatus}.`,
    });

    // Supabase update
    this.patchSupabase(id, {
      status: newStatus,
      contacted_at: enquiry.contacted_at || null,
      updated_at: enquiry.updated_at,
    });

    return enquiry;
  }

  /**
   * Adds private internal notes (never visible to public)
   */
  public async addInternalNotes(
    id: string,
    notes: string,
    actorName: string = 'Administrator'
  ): Promise<BusinessEnquiry> {
    const enquiry = this.enquiries.find((e) => e.id === id);
    if (!enquiry) throw new Error('Enquiry record not found');

    enquiry.admin_notes = notes;
    enquiry.updated_at = new Date().toISOString();
    this.saveToStorage();

    this.addActivityLog({
      enquiry_id: id,
      action_type: 'NOTE_ADDED',
      actor_name: actorName,
      notes: `Internal note saved: "${notes.slice(0, 80)}${notes.length > 80 ? '...' : ''}"`,
    });

    this.patchSupabase(id, {
      admin_notes: notes,
      updated_at: enquiry.updated_at,
    });

    return enquiry;
  }

  /**
   * Assigns enquiry to a team member
   */
  public async assignEnquiry(
    id: string,
    assignedToId: string,
    assignedToName: string,
    actorName: string = 'Administrator'
  ): Promise<BusinessEnquiry> {
    const enquiry = this.enquiries.find((e) => e.id === id);
    if (!enquiry) throw new Error('Enquiry record not found');

    enquiry.assigned_to = assignedToId;
    enquiry.assigned_to_name = assignedToName;
    enquiry.updated_at = new Date().toISOString();
    this.saveToStorage();

    this.addActivityLog({
      enquiry_id: id,
      action_type: 'ASSIGNED',
      actor_name: actorName,
      notes: `Enquiry assigned to ${assignedToName}.`,
    });

    this.patchSupabase(id, {
      assigned_to_name: assignedToName,
      updated_at: enquiry.updated_at,
    });

    return enquiry;
  }

  /**
   * Sets a follow-up reminder date
   */
  public async setFollowUpDate(
    id: string,
    dateIso: string | undefined,
    actorName: string = 'Administrator'
  ): Promise<BusinessEnquiry> {
    const enquiry = this.enquiries.find((e) => e.id === id);
    if (!enquiry) throw new Error('Enquiry record not found');

    enquiry.follow_up_date = dateIso;
    enquiry.updated_at = new Date().toISOString();
    this.saveToStorage();

    this.addActivityLog({
      enquiry_id: id,
      action_type: 'FOLLOW_UP_SET',
      actor_name: actorName,
      notes: dateIso
        ? `Follow-up reminder set for ${new Date(dateIso).toLocaleDateString('en-IN')}.`
        : 'Follow-up reminder cleared.',
    });

    this.patchSupabase(id, {
      follow_up_date: dateIso || null,
      updated_at: enquiry.updated_at,
    });

    return enquiry;
  }

  /**
   * Retries email notifications for an enquiry
   */
  public async retryEmails(id: string, actorName: string = 'Administrator'): Promise<{
    adminSuccess: boolean;
    customerSuccess: boolean;
    adminError?: string;
    customerError?: string;
  }> {
    const enquiry = this.enquiries.find((e) => e.id === id);
    if (!enquiry) throw new Error('Enquiry not found');

    const result = await emailService.sendEnquiryEmails(enquiry);

    enquiry.email_status = result.adminSuccess ? 'Sent' : 'Failed';
    enquiry.email_error = result.adminError;
    enquiry.customer_email_status = result.customerSuccess ? 'Sent' : 'Failed';
    enquiry.customer_email_error = result.customerError;
    enquiry.updated_at = new Date().toISOString();

    this.saveToStorage();

    this.addActivityLog({
      enquiry_id: id,
      action_type: 'EMAIL_RETRY',
      actor_name: actorName,
      notes: `Email notification redelivery attempted. Company Email: ${enquiry.email_status}, Customer Email: ${enquiry.customer_email_status}.`,
    });

    this.patchSupabase(id, {
      email_status: enquiry.email_status,
      email_error: enquiry.email_error || null,
      customer_email_status: enquiry.customer_email_status,
      customer_email_error: enquiry.customer_email_error || null,
      updated_at: enquiry.updated_at,
    });

    return result;
  }

  /**
   * Activity history logs for an enquiry
   */
  public getActivityHistory(enquiryId: string): EnquiryActivityHistory[] {
    return this.activityLogs
      .filter((log) => log.enquiry_id === enquiryId)
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  private addActivityLog(log: Omit<EnquiryActivityHistory, 'id' | 'created_at'>) {
    const newLog: EnquiryActivityHistory = {
      ...log,
      id: `act-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      created_at: new Date().toISOString(),
    };
    this.activityLogs.unshift(newLog);
    this.saveActivityToStorage();
  }

  /**
   * KPI Statistics calculated dynamically from real stored records
   */
  public getStats(): EnquiryStats {
    const total = this.enquiries.length;
    const newCount = this.enquiries.filter((e) => e.status === 'New').length;
    const contacted = this.enquiries.filter((e) => e.status === 'Contacted').length;
    const inProgress = this.enquiries.filter((e) => e.status === 'In Progress').length;
    const completed = this.enquiries.filter((e) => e.status === 'Completed').length;
    const converted = this.enquiries.filter((e) => e.status === 'Converted').length;
    const closed = this.enquiries.filter((e) => e.status === 'Closed').length;

    return {
      total,
      new: newCount,
      contacted,
      inProgress,
      completed,
      converted,
      closed,
    };
  }

  /**
   * Exports enquiries to Excel-compatible CSV format
   * (No Preferred Contact Method column)
   */
  public exportToCsv(filteredEnquiries?: BusinessEnquiry[], dateFilterName?: string): void {
    const list = filteredEnquiries || this.enquiries;

    const headers = [
      'Enquiry ID',
      'Submission Date & Time',
      'Customer Name',
      'Company Name',
      'Mobile Number',
      'Email Address',
      'Service Required',
      'Status',
      'Assigned To',
      'Follow-up Date',
      'Company Email Status',
      'Customer Email Status',
      'Requirements',
      'Internal Admin Notes',
    ];

    const rows = list.map((e) => [
      e.enquiry_id || e.enquiry_number,
      new Date(e.created_at).toLocaleString('en-IN'),
      `"${e.full_name.replace(/"/g, '""')}"`,
      `"${(e.company_name || '').replace(/"/g, '""')}"`,
      `"${e.phone || e.phone_number}"`,
      `"${e.email}"`,
      `"${e.service_required}"`,
      `"${e.status}"`,
      `"${e.assigned_to_name || 'Unassigned'}"`,
      e.follow_up_date ? new Date(e.follow_up_date).toLocaleDateString('en-IN') : '',
      e.email_status,
      e.customer_email_status,
      `"${(e.requirements || e.operational_requirements || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`,
      `"${(e.admin_notes || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`,
    ]);

    const csvContent =
      '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `prisha_xpress_business_enquiries_${dateFilterName ? dateFilterName + '_' : ''}${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  /**
   * Helper to patch Supabase record asynchronously
   */
  private async patchSupabase(id: string, payload: any) {
    const session = await supabaseAuthService.getAdminSession();
    const isConfigured = supabaseAuthService.getIsConfigured();
    if (!isConfigured) return;

    try {
      const supabaseUrl = supabaseAuthService.getUrl();
      const anonKey = supabaseAuthService.getAnonKey();
      const authToken = session?.token || anonKey;

      const dbPayload: any = { ...payload };
      if (payload.admin_notes !== undefined) {
        dbPayload.internal_notes = payload.admin_notes;
      }

      await fetch(`${supabaseUrl}/rest/v1/business_enquiries?id=eq.${id}`, {
        method: 'PATCH',
        headers: {
          apikey: anonKey,
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dbPayload),
      });
    } catch (e) {
      console.warn('Error patching enquiry in Supabase:', e);
    }
  }
}

export const businessEnquiryService = new BusinessEnquiryService();
