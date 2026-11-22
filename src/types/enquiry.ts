// PRISHA XPRESS PVT. LTD. - BUSINESS ENQUIRY MANAGEMENT TYPES
// ENTERPRISE FLEET, 3PL, DRIVER HIRING, TRANSPORTATION & AUTO-SPARES ENQUIRIES

export type BusinessEnquiryServiceType =
  | 'Truck Drivers on Hire'
  | '3PL Fleet Management'
  | 'Transportation'
  | 'Service Station'
  | 'Auto-Spares'
  | 'Other';

export type PreferredContactMethod = 'Phone Call' | 'WhatsApp' | 'Email';

export type EnquiryStatus =
  | 'New'
  | 'In Progress'
  | 'Contacted'
  | 'Converted'
  | 'Closed';

export type EmailNotificationStatus = 'Pending' | 'Sent' | 'Failed';

export interface BusinessEnquiry {
  id: string;
  enquiry_number: string;
  full_name: string;
  company_name?: string;
  phone_number: string;
  email: string;
  service_required: BusinessEnquiryServiceType;
  operational_requirements: string;
  preferred_contact_method: PreferredContactMethod;
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
  inProgress: number;
  contacted: number;
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
