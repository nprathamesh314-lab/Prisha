// PRISHA XPRESS PVT. LTD. - CAREERS & RECRUITMENT DATA TYPES
// STRICTLY SEPARATED DATA ARCHITECTURE FOR STAFF & DRIVERS

// ==========================================
// 1. COMMON & RBAC TYPES (SINGLE ADMIN ROLE)
// ==========================================

export type AdminRole = 'admin';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'admin';
  avatar?: string;
  department?: string;
}

// ==========================================
// 2. MODULE A: STAFF RECRUITMENT TYPES
// ==========================================

export type StaffApplicationStatus =
  | 'Submitted'
  | 'Under Review'
  | 'Shortlisted'
  | 'Interview Scheduled'
  | 'Selected'
  | 'Rejected'
  | 'On Hold';

export type StaffDepartment =
  | 'Administration'
  | 'Human Resources'
  | 'Operations'
  | 'Transport & Logistics'
  | 'Accounts & Finance'
  | 'IT & Technical'
  | 'Customer Support'
  | 'Other';

export type EmploymentType = 'Full-time' | 'Part-time' | 'Contract' | 'Internship' | 'Other';

export type StaffDocumentType =
  | 'resume'
  | 'educational_certificate'
  | 'experience_certificate'
  | 'professional_certification'
  | 'profile_photograph';

export interface StaffDocument {
  id: string;
  staff_application_id: string;
  document_type: StaffDocumentType;
  storage_path: string;
  original_filename: string;
  file_type: string;
  file_size: number;
  uploaded_at: string;
  file_url?: string;
}

export interface StaffApplicationReview {
  id: string;
  staff_application_id: string;
  reviewer_id: string;
  reviewer_name: string;
  review_status: StaffApplicationStatus;
  reviewer_comments: string;
  reviewed_at: string;
}

export interface StaffStatusHistory {
  id: string;
  staff_application_id: string;
  previous_status: StaffApplicationStatus;
  new_status: StaffApplicationStatus;
  changed_by: string;
  reason: string;
  created_at: string;
}

export interface StaffApplication {
  id: string;
  application_reference: string; // e.g. PX-STF-2026-0042
  // Personal Info
  full_name: string;
  date_of_birth: string;
  gender: 'Male' | 'Female' | 'Other';
  mobile_number: string;
  alternate_mobile_number?: string;
  email: string;
  current_address: string;
  city: string;
  state: string;
  pin_code: string;
  // Educational Details
  qualification: string;
  course_degree: string;
  specialization?: string;
  college_university: string;
  passing_year: number;
  percentage_cgpa: string;
  additional_qualification?: string;
  certifications?: string;
  // Job Details
  position_applied_for: string;
  department: StaffDepartment;
  preferred_location: string;
  employment_type: EmploymentType;
  is_fresher: boolean;
  // Work Experience (Conditional)
  total_experience?: string;
  previous_company?: string;
  previous_job_role?: string;
  previous_responsibilities?: string;
  previous_salary?: string;
  key_skills?: string;
  notice_period?: string;
  expected_salary?: number;
  availability_to_join?: string;
  // Final Submission
  additional_message?: string;
  declaration_accepted: boolean;
  consent_accepted: boolean;
  application_status: StaffApplicationStatus;
  // Relations
  documents?: StaffDocument[];
  reviews?: StaffApplicationReview[];
  status_history?: StaffStatusHistory[];
  // Timestamps
  created_at: string;
  updated_at: string;
}

// ==========================================
// 3. MODULE B: DRIVER REGISTRATION TYPES
// ==========================================

export type DriverApplicationStatus =
  | 'Submitted'
  | 'Pending Verification'
  | 'Information Required'
  | 'Under Review'
  | 'Approved – Ready for Company Software'
  | 'Rejected'
  | 'Adding to Company Software'
  | 'Added to Company Software'
  | 'Integration Failed';

export type DriverVerificationStatus =
  | 'Pending'
  | 'Verified'
  | 'Unclear'
  | 'Invalid';

export type VehicleCategory =
  | 'LMV'
  | 'HMV'
  | 'HGMV'
  | 'Transport Vehicle'
  | 'Trailer / Multi-Axle'
  | 'Container Vehicle'
  | 'Other';

export type DriverDocumentType =
  | 'driving_licence'
  | 'driving_licence_front'
  | 'driving_licence_back'
  | 'recent_photograph'
  | 'address_proof'
  | 'resume'
  | 'experience_certificate'
  | 'pan_card';

export interface DriverDocument {
  id: string;
  driver_application_id: string;
  document_type: DriverDocumentType;
  storage_path: string;
  original_filename: string;
  file_type: string;
  file_size: number;
  document_status: DriverVerificationStatus;
  uploaded_at: string;
  file_url?: string;
  verification_notes?: string;
}

export interface DriverDocumentVerification {
  id: string;
  driver_application_id: string;
  document_id: string;
  document_type: DriverDocumentType;
  verification_status: DriverVerificationStatus;
  verified_by: string;
  verification_notes: string;
  verified_at: string;
}

export interface DriverApplicationReview {
  id: string;
  driver_application_id: string;
  reviewer_id: string;
  reviewer_name: string;
  review_status: DriverApplicationStatus;
  reviewer_comments: string;
  reviewed_at: string;
}

export interface DriverStatusHistory {
  id: string;
  driver_application_id: string;
  previous_status: DriverApplicationStatus;
  new_status: DriverApplicationStatus;
  changed_by: string;
  reason: string;
  created_at: string;
}

export interface DriverSoftwareIntegrationLog {
  id: string;
  driver_application_id: string;
  integration_status: 'SUCCESS' | 'FAILED' | 'PENDING' | 'NOT_CONFIGURED';
  external_driver_id?: string;
  external_system_name: string;
  initiated_by: string;
  error_message?: string;
  created_at: string;
}

export interface DriverApplication {
  id: string;
  application_reference: string; // e.g. PX-DRV-2026-0118
  // Personal Info
  full_name: string;
  date_of_birth: string;
  gender: 'Male' | 'Female' | 'Other';
  mobile_number: string;
  alternate_mobile_number?: string;
  email?: string;
  current_address?: string;
  city: string;
  state: string;
  pin_code: string;
  emergency_contact_name: string;
  emergency_contact_number: string;
  // Driving Licence Details
  licence_number: string;
  licence_type: string;
  licence_issue_date: string;
  licence_expiry_date: string;
  issuing_rto: string;
  licence_issuing_state: string;
  vehicle_categories: VehicleCategory[];
  // Driving Experience
  total_driving_experience: string;
  heavy_vehicle_experience: string;
  previous_company_name?: string;
  previous_job_role?: string;
  types_of_vehicles_driven: string[];
  preferred_work_location: string;
  expected_monthly_salary?: number;
  availability_to_join: string;
  willingness_to_travel: boolean;
  additional_skills?: string;
  // Submission
  declaration_accepted: boolean;
  consent_accepted: boolean;
  application_status: DriverApplicationStatus;
  verification_status: DriverVerificationStatus;
  // Software Integration
  external_driver_id?: string;
  is_integrated_with_driver_master?: boolean;
  // Relations
  documents?: DriverDocument[];
  verifications?: DriverDocumentVerification[];
  reviews?: DriverApplicationReview[];
  status_history?: DriverStatusHistory[];
  integration_logs?: DriverSoftwareIntegrationLog[];
  // Timestamps
  created_at: string;
  updated_at: string;
}

// Verification Checklist Items
export interface VerificationChecklistItem {
  id: string;
  title: string;
  category: 'Personal' | 'Licence' | 'Experience' | 'Documents' | 'Compliance';
  description: string;
  status: 'passed' | 'failed' | 'pending' | 'flagged';
  notes?: string;
}
