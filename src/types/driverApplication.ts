// PRISHA XPRESS PVT. LTD. - DRIVER APPLICATION TYPES
// 3-STEP COMMERCIAL DRIVER RECRUITMENT AND VERIFICATION

export type DriverAppStatus = 'pending' | 'approved' | 'rejected';

export type DriverVehicleCategory =
  | 'LMV'
  | 'HMV'
  | 'HGMV'
  | 'Transport Vehicle'
  | 'Trailer / Multi-Axle'
  | 'Container Vehicle';

export interface DriverApplicationFormData {
  // Step 1: Section A - Personal Information
  full_name: string;
  mobile_number: string;
  whatsapp_number?: string;
  date_of_birth: string; // YYYY-MM-DD
  city: string;
  pincode: string;
  emergency_contact?: string;

  // Step 1: Section B - Driving Licence Details
  dl_number: string;
  vehicle_categories: DriverVehicleCategory[];

  // Step 3: Declaration
  declaration_accepted: boolean;
}

export interface DriverUploadedFiles {
  dl_front: File | null;
  dl_back: File | null;
  aadhaar_front: File | null;
  aadhaar_back: File | null;
  pan_card?: File | null;
}

export interface DriverDocumentUrls {
  dl_front_url: string;
  dl_back_url: string;
  aadhaar_front_url: string;
  aadhaar_back_url: string;
  pan_card_url?: string | null;
}

export interface DriverApplicationRecord {
  id: string;
  application_code: string;
  full_name: string;
  mobile_number: string;
  whatsapp_number?: string;
  date_of_birth: string;
  city: string;
  pincode: string;
  emergency_contact?: string;
  dl_number: string;
  vehicle_categories: DriverVehicleCategory[];
  dl_front_url: string;
  dl_back_url: string;
  aadhaar_front_url: string;
  aadhaar_back_url: string;
  pan_card_url?: string | null;
  status: DriverAppStatus;
  admin_remarks?: string | null;
  reviewed_at?: string | null;
  created_at: string;
  updated_at?: string;
}
