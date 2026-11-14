// PRISHA XPRESS PVT. LTD. - RECRUITMENT & CAREERS DATA SERVICE
// STRICT ISOLATION SERVICE: STAFF DATA AND DRIVER DATA NEVER MIX

import {
  AdminRole,
  AdminUser,
  StaffApplication,
  StaffApplicationStatus,
  StaffDepartment,
  StaffDocumentType,
  DriverApplication,
  DriverApplicationStatus,
  DriverVerificationStatus,
  VehicleCategory,
  DriverDocumentType,
} from '../types/recruitment';
import { supabaseRecruitmentDbService } from './supabaseClient';

// ==============================================================================
// 1. COMPANY ADMINISTRATOR USER (EXACTLY ONE 'admin' ROLE)
// ==============================================================================

export const COMPANY_ADMIN_USER: AdminUser = {
  id: 'usr-admin-pxpl',
  name: 'Prisha Xpress Administrator',
  email: 'admin@prishaxpress.com',
  role: 'admin',
  department: 'Corporate Administration',
};

// ==============================================================================
// 2. SEED DATA - STRICTLY SEPARATED
// ==============================================================================

const SEED_STAFF_APPLICATIONS: StaffApplication[] = [
  {
    id: 'stf-001',
    application_reference: 'PX-STF-2026-0042',
    full_name: 'Pooja Sanjay Kulkarni',
    date_of_birth: '1996-08-14',
    gender: 'Female',
    mobile_number: '+91 98230 45671',
    email: 'pooja.kulkarni@example.com',
    current_address: 'Flat 402, Shivneri Heights, Senapati Bapat Road',
    city: 'Pune',
    state: 'Maharashtra',
    pin_code: '411016',
    qualification: 'Master of Business Administration (MBA)',
    course_degree: 'Supply Chain & Logistics Operations',
    college_university: 'Savitribai Phule Pune University (SPPU)',
    passing_year: 2020,
    percentage_cgpa: '8.4 CGPA',
    additional_qualification: 'Six Sigma Green Belt Certified',
    position_applied_for: 'Logistics Operations Lead',
    department: 'Operations',
    preferred_location: 'Pune Corporate Office',
    employment_type: 'Full-time',
    is_fresher: false,
    total_experience: '4-6 Years',
    previous_company: 'Mahindra Logistics Ltd.',
    previous_job_role: 'Fleet Dispatch Supervisor',
    previous_salary: '₹6,50,000 p.a.',
    key_skills: 'Fleet Telematics, Route Planning, Vendor Management, SAP ERP',
    notice_period: '30 Days',
    expected_salary: 850000,
    additional_message: 'Experienced in 3PL operations across Western Maharashtra corridors.',
    declaration_accepted: true,
    consent_accepted: true,
    application_status: 'Under Review',
    created_at: '2026-11-10T09:30:00Z',
    updated_at: '2026-11-11T14:20:00Z',
    documents: [
      {
        id: 'doc-stf-101',
        staff_application_id: 'stf-001',
        document_type: 'resume',
        storage_path: 'staff-application-documents/PX-STF-2026-0042/resume/Pooja_Kulkarni_Resume.pdf',
        original_filename: 'Pooja_Kulkarni_Resume.pdf',
        file_type: 'application/pdf',
        file_size: 420500,
        uploaded_at: '2026-11-10T09:30:00Z',
      },
      {
        id: 'doc-stf-102',
        staff_application_id: 'stf-001',
        document_type: 'educational_certificate',
        storage_path: 'staff-application-documents/PX-STF-2026-0042/education/MBA_Degree_SPPU.pdf',
        original_filename: 'MBA_Degree_SPPU.pdf',
        file_type: 'application/pdf',
        file_size: 890100,
        uploaded_at: '2026-11-10T09:31:00Z',
      },
    ],
    status_history: [
      {
        id: 'hist-stf-01',
        staff_application_id: 'stf-001',
        previous_status: 'Submitted',
        new_status: 'Under Review',
        changed_by: 'Ananya Deshmukh (HR)',
        reason: 'Profile matched Logistics Operations criteria; forwarded to Operations Head.',
        created_at: '2026-11-11T14:20:00Z',
      },
    ],
    reviews: [
      {
        id: 'rev-stf-01',
        staff_application_id: 'stf-001',
        reviewer_id: 'usr-hr-02',
        reviewer_name: 'Ananya Deshmukh',
        review_status: 'Under Review',
        reviewer_comments: 'Strong logistics background with SPPU MBA and 4 years field experience.',
        reviewed_at: '2026-11-11T14:20:00Z',
      },
    ],
  },
  {
    id: 'stf-002',
    application_reference: 'PX-STF-2026-0058',
    full_name: 'Aditya Narendra Joshi',
    date_of_birth: '1998-03-22',
    gender: 'Male',
    mobile_number: '+91 97654 32189',
    email: 'aditya.joshi@example.com',
    current_address: 'B-12, Mayur Colony, Kothrud',
    city: 'Pune',
    state: 'Maharashtra',
    pin_code: '411038',
    qualification: 'Bachelor of Commerce (B.Com)',
    course_degree: 'Accounting & Taxation',
    college_university: 'BMCC Pune',
    passing_year: 2019,
    percentage_cgpa: '78.5%',
    additional_qualification: 'Tally Prime, GST Practitioner Certificate',
    position_applied_for: 'Accounts & Billing Executive',
    department: 'Accounts & Finance',
    preferred_location: 'Pune Corporate Office',
    employment_type: 'Full-time',
    is_fresher: false,
    total_experience: '2-4 Years',
    previous_company: 'VRL Logistics Branch Office',
    previous_job_role: 'Freight Billing Assistant',
    previous_salary: '₹3,60,000 p.a.',
    key_skills: 'E-way Bill generation, Freight Invoicing, GST Returns, TDS Reconciliation',
    notice_period: '15 Days',
    expected_salary: 480000,
    declaration_accepted: true,
    consent_accepted: true,
    application_status: 'Shortlisted',
    created_at: '2026-11-08T11:15:00Z',
    updated_at: '2026-11-12T16:45:00Z',
    documents: [
      {
        id: 'doc-stf-201',
        staff_application_id: 'stf-002',
        document_type: 'resume',
        storage_path: 'staff-application-documents/PX-STF-2026-0058/resume/Aditya_Joshi_CV.pdf',
        original_filename: 'Aditya_Joshi_CV.pdf',
        file_type: 'application/pdf',
        file_size: 310200,
        uploaded_at: '2026-11-08T11:15:00Z',
      },
    ],
    status_history: [
      {
        id: 'hist-stf-02',
        staff_application_id: 'stf-002',
        previous_status: 'Submitted',
        new_status: 'Shortlisted',
        changed_by: 'Ananya Deshmukh (HR)',
        reason: 'Selected for round 1 accounting assessment.',
        created_at: '2026-11-12T16:45:00Z',
      },
    ],
  },
  {
    id: 'stf-003',
    application_reference: 'PX-STF-2026-0063',
    full_name: 'Neha Sunil Gaikwad',
    date_of_birth: '2002-11-05',
    gender: 'Female',
    mobile_number: '+91 88882 19283',
    email: 'neha.gaikwad@example.com',
    current_address: 'Sector 24, Pradhikaran, Nigdi',
    city: 'Pimpri-Chinchwad',
    state: 'Maharashtra',
    pin_code: '411044',
    qualification: 'Bachelor of Computer Applications (BCA)',
    course_degree: 'Computer Applications & Web Tech',
    college_university: 'DY Patil University',
    passing_year: 2024,
    percentage_cgpa: '8.8 CGPA',
    position_applied_for: 'Junior IT & GPS Tracking Support',
    department: 'IT & Technical',
    preferred_location: 'Pune Headquarters',
    employment_type: 'Full-time',
    is_fresher: true,
    key_skills: 'React, JavaScript, SQL, IoT Telematics Protocols, Python basics',
    expected_salary: 380000,
    declaration_accepted: true,
    consent_accepted: true,
    application_status: 'Interview Scheduled',
    created_at: '2026-11-12T10:00:00Z',
    updated_at: '2026-11-13T11:30:00Z',
    documents: [
      {
        id: 'doc-stf-301',
        staff_application_id: 'stf-003',
        document_type: 'resume',
        storage_path: 'staff-application-documents/PX-STF-2026-0063/resume/Neha_Gaikwad_Resume.pdf',
        original_filename: 'Neha_Gaikwad_Resume.pdf',
        file_type: 'application/pdf',
        file_size: 280000,
        uploaded_at: '2026-11-12T10:00:00Z',
      },
    ],
  },
];

const SEED_DRIVER_APPLICATIONS: DriverApplication[] = [
  {
    id: 'drv-001',
    application_reference: 'PX-DRV-2026-0112',
    full_name: 'Ramesh Balasaheb Shinde',
    date_of_birth: '1987-05-18',
    gender: 'Male',
    mobile_number: '+91 94220 88712',
    alternate_mobile_number: '+91 98901 22345',
    email: 'ramesh.shinde@example.com',
    current_address: 'Gat No. 124, Near Toll Plaza, Chakan Industrial Area',
    city: 'Chakan, Pune',
    state: 'Maharashtra',
    pin_code: '410501',
    emergency_contact_name: 'Sunita Ramesh Shinde (Wife)',
    emergency_contact_number: '+91 98901 22345',
    licence_number: 'MH14 20120045612',
    licence_type: 'Commercial Heavy Transport (TRANS)',
    licence_issue_date: '2012-04-10',
    licence_expiry_date: '2028-04-09',
    issuing_rto: 'MH-14 Pimpri Chinchwad RTO',
    licence_issuing_state: 'Maharashtra',
    vehicle_categories: ['HMV', 'HGMV', 'Transport Vehicle', 'Trailer / Multi-Axle'],
    total_driving_experience: '12+ Years',
    heavy_vehicle_experience: '10 Years',
    previous_company_name: 'Western Carriers Ltd.',
    previous_job_role: 'Long Haul Multi-Axle Container Captain',
    types_of_vehicles_driven: ['BharatBenz 2823R', 'Tata Signa 4825.TK', 'Ashok Leyland 5525'],
    preferred_work_location: 'Pune – Mumbai – Surat – Ahmedabad Corridor',
    expected_monthly_salary: 38000,
    availability_to_join: 'Immediate',
    willingness_to_travel: true,
    declaration_accepted: true,
    consent_accepted: true,
    application_status: 'Approved – Ready for Company Software',
    verification_status: 'Verified',
    created_at: '2026-11-07T08:00:00Z',
    updated_at: '2026-11-13T16:00:00Z',
    documents: [
      {
        id: 'doc-drv-101',
        driver_application_id: 'drv-001',
        document_type: 'driving_licence',
        storage_path: 'driver-application-documents/PX-DRV-2026-0112/driving-licence/DL_MH14_Front_Back.pdf',
        original_filename: 'DL_MH14_Front_Back.pdf',
        file_type: 'application/pdf',
        file_size: 1120000,
        document_status: 'Verified',
        uploaded_at: '2026-11-07T08:00:00Z',
        verification_notes: 'Heavy commercial endorsement valid till 2028. RTO stamp authenticated.',
      },
      {
        id: 'doc-drv-102',
        driver_application_id: 'drv-001',
        document_type: 'recent_photograph',
        storage_path: 'driver-application-documents/PX-DRV-2026-0112/photograph/Ramesh_Driver_Photo.jpg',
        original_filename: 'Ramesh_Driver_Photo.jpg',
        file_type: 'image/jpeg',
        file_size: 450000,
        document_status: 'Verified',
        uploaded_at: '2026-11-07T08:02:00Z',
      },
      {
        id: 'doc-drv-103',
        driver_application_id: 'drv-001',
        document_type: 'address_proof',
        storage_path: 'driver-application-documents/PX-DRV-2026-0112/address-proof/Electricity_Bill_Chakan.pdf',
        original_filename: 'Electricity_Bill_Chakan.pdf',
        file_type: 'application/pdf',
        file_size: 670000,
        document_status: 'Verified',
        uploaded_at: '2026-11-07T08:03:00Z',
      },
    ],
    verifications: [
      {
        id: 'ver-drv-01',
        driver_application_id: 'drv-001',
        document_id: 'doc-drv-101',
        document_type: 'driving_licence',
        verification_status: 'Verified',
        verified_by: 'Suresh Patil (Verification Officer)',
        verification_notes: 'Valid commercial HGMV licence verified. Clean 10-year track record.',
        verified_at: '2026-11-12T10:30:00Z',
      },
    ],
    status_history: [
      {
        id: 'hist-drv-01',
        driver_application_id: 'drv-001',
        previous_status: 'Submitted',
        new_status: 'Under Review',
        changed_by: 'Vikram Jadhav (Driver Admin)',
        reason: 'Initial profile screening passed.',
        created_at: '2026-11-08T10:00:00Z',
      },
      {
        id: 'hist-drv-02',
        driver_application_id: 'drv-001',
        previous_status: 'Under Review',
        new_status: 'Approved – Ready for Company Software',
        changed_by: 'Vikram Jadhav (Driver Admin)',
        reason: 'All 10 verification checklist items verified successfully. Ready for Driver Master.',
        created_at: '2026-11-13T16:00:00Z',
      },
    ],
  },
  {
    id: 'drv-002',
    application_reference: 'PX-DRV-2026-0135',
    full_name: 'Dnyaneshwar Arjun More',
    date_of_birth: '1991-12-04',
    gender: 'Male',
    mobile_number: '+91 96041 55678',
    emergency_contact_name: 'Arjun More (Father)',
    emergency_contact_number: '+91 96041 55600',
    current_address: 'Plot 88, MIDC Waluj, Chhatrapati Sambhaji Nagar',
    city: 'Aurangabad / Sambhaji Nagar',
    state: 'Maharashtra',
    pin_code: '431136',
    licence_number: 'MH20 20150078129',
    licence_type: 'Transport Heavy (TRANS)',
    licence_issue_date: '2015-06-20',
    licence_expiry_date: '2027-06-19',
    issuing_rto: 'MH-20 Aurangabad RTO',
    licence_issuing_state: 'Maharashtra',
    vehicle_categories: ['HMV', 'Transport Vehicle'],
    total_driving_experience: '8-10 Years',
    heavy_vehicle_experience: '7 Years',
    previous_company_name: 'Shree Logistics Transporters',
    previous_job_role: 'Heavy Truck Driver',
    types_of_vehicles_driven: ['Eicher Pro 6028', 'Tata 1613'],
    preferred_work_location: 'Marathwada to Pune Logistics Lines',
    expected_monthly_salary: 32000,
    availability_to_join: 'Within 7 Days',
    willingness_to_travel: true,
    declaration_accepted: true,
    consent_accepted: true,
    application_status: 'Pending Verification',
    verification_status: 'Pending',
    created_at: '2026-11-11T14:30:00Z',
    updated_at: '2026-11-11T14:30:00Z',
    documents: [
      {
        id: 'doc-drv-201',
        driver_application_id: 'drv-002',
        document_type: 'driving_licence',
        storage_path: 'driver-application-documents/PX-DRV-2026-0135/driving-licence/DL_More.pdf',
        original_filename: 'DL_More.pdf',
        file_type: 'application/pdf',
        file_size: 980000,
        document_status: 'Pending',
        uploaded_at: '2026-11-11T14:30:00Z',
      },
      {
        id: 'doc-drv-202',
        driver_application_id: 'drv-002',
        document_type: 'address_proof',
        storage_path: 'driver-application-documents/PX-DRV-2026-0135/address-proof/Voter_ID.pdf',
        original_filename: 'Voter_ID.pdf',
        file_type: 'application/pdf',
        file_size: 510000,
        document_status: 'Pending',
        uploaded_at: '2026-11-11T14:31:00Z',
      },
    ],
  },
  {
    id: 'drv-003',
    application_reference: 'PX-DRV-2026-0094',
    full_name: 'Santosh Vitthal Pawar',
    date_of_birth: '1984-02-15',
    gender: 'Male',
    mobile_number: '+91 98224 99123',
    emergency_contact_name: 'Vitthal Pawar',
    emergency_contact_number: '+91 98224 99100',
    current_address: 'Near Talegaon Toll Naka, Pune-Mumbai Expressway',
    city: 'Talegaon Dabhade',
    state: 'Maharashtra',
    pin_code: '410506',
    licence_number: 'MH12 20080031940',
    licence_type: 'Commercial HGMV / Articulated',
    licence_issue_date: '2008-03-14',
    licence_expiry_date: '2029-03-13',
    issuing_rto: 'MH-12 Pune RTO',
    licence_issuing_state: 'Maharashtra',
    vehicle_categories: ['HMV', 'HGMV', 'Trailer / Multi-Axle', 'Container Vehicle'],
    total_driving_experience: '15+ Years',
    heavy_vehicle_experience: '14 Years',
    types_of_vehicles_driven: ['BharatBenz 2823R (Heavy Rigid)', 'Tata Signa 4825.TK (Multi-Axle)', 'Ashok Leyland 5525 (Tractor Trailer)'],
    preferred_work_location: 'Interstate Long Haul Express',
    expected_monthly_salary: 42000,
    availability_to_join: 'Immediate',
    willingness_to_travel: true,
    declaration_accepted: true,
    consent_accepted: true,
    application_status: 'Added to Company Software',
    verification_status: 'Verified',
    external_driver_id: 'PX-EXT-DRV-0891',
    is_integrated_with_driver_master: true,
    created_at: '2026-10-25T09:00:00Z',
    updated_at: '2026-11-05T15:30:00Z',
    documents: [
      {
        id: 'doc-drv-301',
        driver_application_id: 'drv-003',
        document_type: 'driving_licence',
        storage_path: 'driver-application-documents/PX-DRV-2026-0094/driving-licence/Santosh_DL.pdf',
        original_filename: 'Santosh_DL.pdf',
        file_type: 'application/pdf',
        file_size: 1340000,
        document_status: 'Verified',
        uploaded_at: '2026-10-25T09:00:00Z',
      },
    ],
    integration_logs: [
      {
        id: 'log-int-01',
        driver_application_id: 'drv-003',
        integration_status: 'SUCCESS',
        external_driver_id: 'PX-EXT-DRV-0891',
        external_system_name: 'Prisha Xpress Driver Master TMS API',
        initiated_by: 'Rajesh Kulkarni (Authorized Driver Manager)',
        created_at: '2026-11-05T15:30:00Z',
      },
    ],
  },
];

// ==============================================================================
// 3. STORAGE REPOSITORY WITH STRICT ISOLATION
// ==============================================================================

const STORAGE_KEY_STAFF = 'prisha_staff_applications_v1';
const STORAGE_KEY_DRIVER = 'prisha_driver_applications_v1';

class RecruitmentService {
  private staffApps: StaffApplication[] = [];
  private driverApps: DriverApplication[] = [];

  constructor() {
    this.init();
  }

  private init() {
    try {
      const storedStaff = localStorage.getItem(STORAGE_KEY_STAFF);
      if (storedStaff) {
        this.staffApps = JSON.parse(storedStaff);
      } else {
        this.staffApps = [...SEED_STAFF_APPLICATIONS];
        this.saveStaffToStorage();
      }

      const storedDriver = localStorage.getItem(STORAGE_KEY_DRIVER);
      if (storedDriver) {
        this.driverApps = JSON.parse(storedDriver);
      } else {
        this.driverApps = [...SEED_DRIVER_APPLICATIONS];
        this.saveDriverToStorage();
      }
    } catch {
      this.staffApps = [...SEED_STAFF_APPLICATIONS];
      this.driverApps = [...SEED_DRIVER_APPLICATIONS];
    }
  }

  private saveStaffToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY_STAFF, JSON.stringify(this.staffApps));
    } catch (e) {
      console.warn('Could not persist staff applications to localStorage', e);
    }
  }

  private saveDriverToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY_DRIVER, JSON.stringify(this.driverApps));
    } catch (e) {
      console.warn('Could not persist driver applications to localStorage', e);
    }
  }

  // ==========================================================================
  // AUTH & SINGLE 'admin' ROLE ACCESS CONTROLS
  // ==========================================================================

  public getCurrentRole(): AdminRole {
    return 'admin';
  }

  public getCurrentUser(): AdminUser {
    return COMPANY_ADMIN_USER;
  }

  public canAccessStaff(): boolean {
    return true; // The single admin role has access to all authorized modules
  }

  public canAccessDrivers(): boolean {
    return true;
  }

  public canVerifyDriverDocuments(): boolean {
    return true;
  }

  public canIntegrateDriverMaster(): boolean {
    return true;
  }

  // ==========================================================================
  // MODULE A: STAFF RECRUITMENT OPERATIONS
  // ==========================================================================

  public async submitStaffApplication(
    payload: Omit<StaffApplication, 'id' | 'application_reference' | 'created_at' | 'updated_at' | 'application_status'>,
    uploadedDocuments: Array<{
      document_type: StaffDocumentType;
      filename: string;
      fileType: string;
      size: number;
    }> = []
  ): Promise<StaffApplication> {
    const nextSeq = 1000 + this.staffApps.length + 1;
    const ref = `PX-STF-2026-${String(nextSeq).padStart(4, '0')}`;
    const newId = `stf-${Date.now()}`;

    const documents = uploadedDocuments.map((doc, idx) => ({
      id: `doc-stf-${Date.now()}-${idx}`,
      staff_application_id: newId,
      document_type: doc.document_type,
      storage_path: `staff-application-documents/${ref}/${doc.document_type}/${doc.filename}`,
      original_filename: doc.filename,
      file_type: doc.fileType,
      file_size: doc.size,
      uploaded_at: new Date().toISOString(),
    }));

    const newApp: StaffApplication = {
      ...payload,
      id: newId,
      application_reference: ref,
      application_status: 'Submitted',
      documents,
      status_history: [
        {
          id: `hist-stf-${Date.now()}`,
          staff_application_id: newId,
          previous_status: 'Submitted',
          new_status: 'Submitted',
          changed_by: 'Online Candidate Submission',
          reason: 'Application submitted successfully via Careers Portal.',
          created_at: new Date().toISOString(),
        },
      ],
      reviews: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    this.staffApps.unshift(newApp);
    this.saveStaffToStorage();

    // Persist to Supabase staff_applications & staff_application_documents tables
    try {
      await supabaseRecruitmentDbService.insertStaffApplication(
        {
          application_reference: ref,
          full_name: payload.full_name,
          date_of_birth: payload.date_of_birth,
          gender: payload.gender,
          mobile_number: payload.mobile_number,
          email: payload.email,
          current_address: payload.current_address,
          city: payload.city,
          state: payload.state,
          pin_code: payload.pin_code,
          qualification: payload.qualification,
          course_degree: payload.course_degree,
          college_university: payload.college_university,
          passing_year: payload.passing_year,
          percentage_cgpa: payload.percentage_cgpa,
          additional_qualification: payload.additional_qualification,
          position_applied_for: payload.position_applied_for,
          department: payload.department,
          preferred_location: payload.preferred_location,
          employment_type: payload.employment_type,
          is_fresher: payload.is_fresher,
          total_experience: payload.total_experience,
          previous_company: payload.previous_company,
          previous_job_role: payload.previous_job_role,
          previous_salary: payload.previous_salary,
          key_skills: payload.key_skills,
          notice_period: payload.notice_period,
          expected_salary: payload.expected_salary,
          additional_message: payload.additional_message,
          declaration_accepted: payload.declaration_accepted,
          consent_accepted: payload.consent_accepted,
          application_status: 'Submitted',
        },
        documents
      );
    } catch (e) {
      console.warn('Supabase DB sync note:', e);
    }

    return newApp;
  }

  public getStaffApplications(filters?: {
    search?: string;
    department?: StaffDepartment | 'All';
    status?: StaffApplicationStatus | 'All';
  }): StaffApplication[] {
    let list = [...this.staffApps];

    if (filters?.department && filters.department !== 'All') {
      list = list.filter((app) => app.department === filters.department);
    }
    if (filters?.status && filters.status !== 'All') {
      list = list.filter((app) => app.application_status === filters.status);
    }
    if (filters?.search && filters.search.trim()) {
      const q = filters.search.toLowerCase().trim();
      list = list.filter(
        (app) =>
          app.full_name.toLowerCase().includes(q) ||
          app.application_reference.toLowerCase().includes(q) ||
          app.email.toLowerCase().includes(q) ||
          app.mobile_number.includes(q) ||
          app.position_applied_for.toLowerCase().includes(q)
      );
    }

    return list;
  }

  public getStaffApplicationById(id: string): StaffApplication | undefined {
    return this.staffApps.find((app) => app.id === id);
  }

  public updateStaffStatus(
    id: string,
    newStatus: StaffApplicationStatus,
    reason: string
  ): StaffApplication {
    const app = this.staffApps.find((a) => a.id === id);
    if (!app) throw new Error('Staff application not found');

    const prevStatus = app.application_status;
    app.application_status = newStatus;
    app.updated_at = new Date().toISOString();

    const user = this.getCurrentUser();

    if (!app.status_history) app.status_history = [];
    app.status_history.unshift({
      id: `hist-stf-${Date.now()}`,
      staff_application_id: id,
      previous_status: prevStatus,
      new_status: newStatus,
      changed_by: `${user.name} (${user.role.toUpperCase()})`,
      reason,
      created_at: new Date().toISOString(),
    });

    if (!app.reviews) app.reviews = [];
    app.reviews.unshift({
      id: `rev-stf-${Date.now()}`,
      staff_application_id: id,
      reviewer_id: user.id,
      reviewer_name: user.name,
      review_status: newStatus,
      reviewer_comments: reason,
      reviewed_at: new Date().toISOString(),
    });

    this.saveStaffToStorage();
    return app;
  }

  public getStaffStats() {
    const total = this.staffApps.length;
    const submitted = this.staffApps.filter((a) => a.application_status === 'Submitted').length;
    const underReview = this.staffApps.filter((a) => a.application_status === 'Under Review').length;
    const shortlisted = this.staffApps.filter((a) => a.application_status === 'Shortlisted').length;
    const interview = this.staffApps.filter((a) => a.application_status === 'Interview Scheduled').length;
    const selected = this.staffApps.filter((a) => a.application_status === 'Selected').length;
    const rejected = this.staffApps.filter((a) => a.application_status === 'Rejected').length;

    return { total, submitted, underReview, shortlisted, interview, selected, rejected };
  }

  // ==========================================================================
  // MODULE B: DRIVER REGISTRATION OPERATIONS
  // ==========================================================================

  public async submitDriverRegistration(
    payload: Omit<
      DriverApplication,
      'id' | 'application_reference' | 'created_at' | 'updated_at' | 'application_status' | 'verification_status'
    >,
    uploadedDocuments: Array<{
      document_type: DriverDocumentType;
      filename: string;
      fileType: string;
      size: number;
    }> = []
  ): Promise<DriverApplication> {
    const nextSeq = 1000 + this.driverApps.length + 1;
    const ref = `PX-DRV-2026-${String(nextSeq).padStart(4, '0')}`;
    const newId = `drv-${Date.now()}`;

    const documents = uploadedDocuments.map((doc, idx) => ({
      id: `doc-drv-${Date.now()}-${idx}`,
      driver_application_id: newId,
      document_type: doc.document_type,
      storage_path: `driver-application-documents/${ref}/${doc.document_type}/${doc.filename}`,
      original_filename: doc.filename,
      file_type: doc.fileType,
      file_size: doc.size,
      document_status: 'Pending' as DriverVerificationStatus,
      uploaded_at: new Date().toISOString(),
    }));

    const newApp: DriverApplication = {
      ...payload,
      id: newId,
      application_reference: ref,
      application_status: 'Submitted',
      verification_status: 'Pending',
      documents,
      status_history: [
        {
          id: `hist-drv-${Date.now()}`,
          driver_application_id: newId,
          previous_status: 'Submitted',
          new_status: 'Submitted',
          changed_by: 'Driver Online Registration',
          reason: 'Application received and registered for document verification.',
          created_at: new Date().toISOString(),
        },
      ],
      verifications: [],
      reviews: [],
      integration_logs: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    this.driverApps.unshift(newApp);
    this.saveDriverToStorage();

    // Persist to Supabase driver_applications, vehicle categories, experience & documents tables
    try {
      await supabaseRecruitmentDbService.insertDriverApplication(
        {
          application_reference: ref,
          full_name: payload.full_name,
          date_of_birth: payload.date_of_birth,
          gender: payload.gender,
          mobile_number: payload.mobile_number,
          alternate_mobile_number: payload.alternate_mobile_number,
          email: payload.email,
          current_address: payload.current_address,
          city: payload.city,
          state: payload.state,
          pin_code: payload.pin_code,
          emergency_contact_name: payload.emergency_contact_name,
          emergency_contact_number: payload.emergency_contact_number,
          licence_number: payload.licence_number,
          licence_type: payload.licence_type,
          licence_issue_date: payload.licence_issue_date,
          licence_expiry_date: payload.licence_expiry_date,
          issuing_rto: payload.issuing_rto,
          licence_issuing_state: payload.licence_issuing_state,
          total_driving_experience: payload.total_driving_experience,
          heavy_vehicle_experience: payload.heavy_vehicle_experience,
          previous_company_name: payload.previous_company_name,
          previous_job_role: payload.previous_job_role,
          preferred_work_location: payload.preferred_work_location,
          expected_monthly_salary: payload.expected_monthly_salary,
          availability_to_join: payload.availability_to_join,
          willingness_to_travel: payload.willingness_to_travel,
          declaration_accepted: payload.declaration_accepted,
          consent_accepted: payload.consent_accepted,
          application_status: 'Submitted',
          verification_status: 'Pending',
        },
        documents,
        payload.vehicle_categories || [],
        payload.types_of_vehicles_driven || []
      );
    } catch (e) {
      console.warn('Supabase DB sync note:', e);
    }

    return newApp;
  }

  public getDriverApplications(filters?: {
    search?: string;
    category?: VehicleCategory | 'All';
    status?: DriverApplicationStatus | 'All';
    verification?: DriverVerificationStatus | 'All';
  }): DriverApplication[] {
    let list = [...this.driverApps];

    if (filters?.category && filters.category !== 'All') {
      list = list.filter((app) => app.vehicle_categories?.includes(filters.category as VehicleCategory));
    }
    if (filters?.status && filters.status !== 'All') {
      list = list.filter((app) => app.application_status === filters.status);
    }
    if (filters?.verification && filters.verification !== 'All') {
      list = list.filter((app) => app.verification_status === filters.verification);
    }
    if (filters?.search && filters.search.trim()) {
      const q = filters.search.toLowerCase().trim();
      list = list.filter(
        (app) =>
          app.full_name.toLowerCase().includes(q) ||
          app.application_reference.toLowerCase().includes(q) ||
          app.licence_number.toLowerCase().includes(q) ||
          app.mobile_number.includes(q) ||
          app.issuing_rto.toLowerCase().includes(q)
      );
    }

    return list;
  }

  public getDriverApplicationById(id: string): DriverApplication | undefined {
    return this.driverApps.find((app) => app.id === id);
  }

  public verifyDriverDocument(
    driverId: string,
    documentId: string,
    status: DriverVerificationStatus,
    notes: string
  ): DriverApplication {
    const app = this.driverApps.find((a) => a.id === driverId);
    if (!app) throw new Error('Driver application not found');

    const doc = app.documents?.find((d) => d.id === documentId);
    if (doc) {
      doc.document_status = status;
      doc.verification_notes = notes;
    }

    const user = this.getCurrentUser();

    if (!app.verifications) app.verifications = [];
    app.verifications.unshift({
      id: `ver-${Date.now()}`,
      driver_application_id: driverId,
      document_id: documentId,
      document_type: doc?.document_type || 'driving_licence',
      verification_status: status,
      verified_by: `${user.name} (${user.role})`,
      verification_notes: notes,
      verified_at: new Date().toISOString(),
    });

    // Check if all required docs are verified
    const requiredTypes: DriverDocumentType[] = ['driving_licence', 'recent_photograph', 'address_proof'];
    const requiredDocs = app.documents?.filter((d) => requiredTypes.includes(d.document_type)) || [];
    const allVerified = requiredDocs.length >= 3 && requiredDocs.every((d) => d.document_status === 'Verified');

    if (allVerified) {
      app.verification_status = 'Verified';
      if (app.application_status === 'Pending Verification' || app.application_status === 'Submitted') {
        app.application_status = 'Approved – Ready for Company Software';
      }
    } else if (requiredDocs.some((d) => d.document_status === 'Invalid')) {
      app.verification_status = 'Invalid';
    } else if (requiredDocs.some((d) => d.document_status === 'Unclear')) {
      app.verification_status = 'Unclear';
    }

    app.updated_at = new Date().toISOString();
    this.saveDriverToStorage();
    return app;
  }

  public updateDriverStatus(
    id: string,
    newStatus: DriverApplicationStatus,
    reason: string
  ): DriverApplication {
    const app = this.driverApps.find((a) => a.id === id);
    if (!app) throw new Error('Driver application not found');

    const prevStatus = app.application_status;
    app.application_status = newStatus;
    app.updated_at = new Date().toISOString();

    const user = this.getCurrentUser();

    if (!app.status_history) app.status_history = [];
    app.status_history.unshift({
      id: `hist-drv-${Date.now()}`,
      driver_application_id: id,
      previous_status: prevStatus,
      new_status: newStatus,
      changed_by: `${user.name} (${user.role.toUpperCase()})`,
      reason,
      created_at: new Date().toISOString(),
    });

    this.saveDriverToStorage();
    return app;
  }

  public getApprovedDrivers(): DriverApplication[] {
    return this.driverApps.filter(
      (app) =>
        app.application_status === 'Approved – Ready for Company Software' ||
        app.application_status === 'Added to Company Software'
    );
  }

  public async integrateDriverWithMaster(driverId: string): Promise<{
    success: boolean;
    externalId?: string;
    message: string;
  }> {
    const app = this.driverApps.find((a) => a.id === driverId);
    if (!app) {
      return { success: false, message: 'Driver record not found.' };
    }

    if (app.verification_status !== 'Verified') {
      return {
        success: false,
        message: 'Cannot integrate: Driver documents must be completely verified first.',
      };
    }

    const user = this.getCurrentUser();

    // Check for duplicate licence in integrated driver records
    const duplicate = this.driverApps.find(
      (d) =>
        d.id !== driverId &&
        d.is_integrated_with_driver_master &&
        d.licence_number.replace(/\s+/g, '').toUpperCase() === app.licence_number.replace(/\s+/g, '').toUpperCase()
    );

    if (duplicate) {
      return {
        success: false,
        message: `Duplicate Driver Record detected! Licence already active under External Driver ID: ${duplicate.external_driver_id}`,
      };
    }

    // Simulate Authorized Integration call to Prisha Xpress Driver Master API
    const generatedExternalId = `PX-EXT-DRV-${Math.floor(1000 + Math.random() * 9000)}`;

    app.application_status = 'Added to Company Software';
    app.external_driver_id = generatedExternalId;
    app.is_integrated_with_driver_master = true;
    app.updated_at = new Date().toISOString();

    if (!app.integration_logs) app.integration_logs = [];
    app.integration_logs.unshift({
      id: `int-${Date.now()}`,
      driver_application_id: driverId,
      integration_status: 'SUCCESS',
      external_driver_id: generatedExternalId,
      external_system_name: 'Prisha Xpress Driver Master TMS ERP',
      initiated_by: `${user.name} (${user.role})`,
      created_at: new Date().toISOString(),
    });

    if (!app.status_history) app.status_history = [];
    app.status_history.unshift({
      id: `hist-drv-${Date.now()}`,
      driver_application_id: driverId,
      previous_status: 'Approved – Ready for Company Software',
      new_status: 'Added to Company Software',
      changed_by: `${user.name} (${user.role})`,
      reason: `Successfully integrated to Company Driver Master with External ID ${generatedExternalId}.`,
      created_at: new Date().toISOString(),
    });

    this.saveDriverToStorage();
    return {
      success: true,
      externalId: generatedExternalId,
      message: `Driver successfully integrated into Prisha Xpress Driver Master TMS (Assigned ID: ${generatedExternalId}).`,
    };
  }

  public getDriverStats() {
    const total = this.driverApps.length;
    const pendingVerification = this.driverApps.filter((d) => d.verification_status === 'Pending').length;
    const verified = this.driverApps.filter((d) => d.verification_status === 'Verified').length;
    const unclear = this.driverApps.filter((d) => d.verification_status === 'Unclear').length;
    const approved = this.driverApps.filter(
      (d) => d.application_status === 'Approved – Ready for Company Software'
    ).length;
    const integrated = this.driverApps.filter((d) => d.is_integrated_with_driver_master).length;
    const rejected = this.driverApps.filter((d) => d.application_status === 'Rejected').length;

    return { total, pendingVerification, verified, unclear, approved, integrated, rejected };
  }
}

export const recruitmentService = new RecruitmentService();
