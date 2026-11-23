// PRISHA XPRESS PVT. LTD. - BUSINESS ENQUIRY MANAGEMENT TYPES
// ENTERPRISE FLEET, 3PL, DRIVER HIRING, TRANSPORTATION & AUTO-SPARES ENQUIRIES

export type BusinessEnquiryServiceType =
  | 'Truck Drivers on Hire'
  | 'Transportation Services'
  | '3PL Fleet Management'
  | 'Fleet Supervision'
  | 'Vehicle Servicing'
  | 'Automotive Spare Parts'
  | 'Other';

export type EnquiryStatus =
  | 'New'
  | 'Contacted'
  | 'In Progress'
  | 'Completed'
  | 'Converted'
  | 'Booked / Confirmed'
  | 'Closed';

export type EmailNotificationStatus = 'Pending' | 'Sent' | 'Failed';

export interface BusinessEnquiry {
  id: string;
  enquiry_id: string; // Unique readable enquiry reference (e.g. PXPL-ENQ-2026-0001)
  enquiry_number: string; // Compatibility alias
  full_name: string;
  company_name?: string;
  phone: string; // Mobile number
  phone_number: string; // Compatibility alias
  email: string;
  service_required: BusinessEnquiryServiceType;
  requirements?: string; // Optional requirements description
  operational_requirements?: string; // Compatibility alias
  status: EnquiryStatus;
  admin_notes?: string;
  assigned_to?: string;
  assigned_to_name?: string;
  follow_up_date?: string;
  email_status: EmailNotificationStatus;
  email_error?: string;
  customer_email_status: EmailNotificationStatus;
  customer_email_error?: string;
  created_at: string;
  updated_at: string;
  contacted_at?: string;
}

export type EnquiryActivityAction =
  | 'CREATED'
  | 'STATUS_CHANGE'
  | 'NOTE_ADDED'
  | 'ASSIGNED'
  | 'FOLLOW_UP_SET'
  | 'EMAIL_SENT'
  | 'EMAIL_RETRY'
  | 'CONTACTED';

export interface EnquiryActivityHistory {
  id: string;
  enquiry_id: string;
  action_type: EnquiryActivityAction;
  previous_status?: string;
  new_status?: string;
  actor_name: string;
  actor_id?: string;
  notes?: string;
  created_at: string;
}

export interface EnquiryStats {
  total: number;
  new: number;
  contacted: number;
  inProgress: number;
  completed: number;
  converted: number;
  closed: number;
}

export interface EnquiryFilterOptions {
  searchQuery?: string;
  status?: EnquiryStatus | 'All';
  service?: BusinessEnquiryServiceType | 'All';
  dateRange?: 'all' | 'today' | '7days' | '30days' | 'custom';
  startDate?: string;
  endDate?: string;
}
