// PRISHA XPRESS PVT. LTD. - MODULE B: DRIVER REGISTRATION WIZARD
// ROUTE: /careers/driver-registration
// STRICT SEPARATION: SAVES TO DRIVER REGISTRATION DATABASE ONLY

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageTransition } from '../../components/animations/PageTransition';
import { Button } from '../../components/common/Button';
import { recruitmentService } from '../../services/recruitmentService';
import {
  DriverApplication,
  VehicleCategory,
  DriverDocumentType,
} from '../../types/recruitment';
import { supabaseStorageService } from '../../services/supabaseClient';
import {
  Truck,
  CreditCard,
  History,
  UploadCloud,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Trash2,
  Phone,
  MapPin,
  AlertCircle,
  Copy,
  Printer,
  Edit,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react';

const INDIAN_STATES = [
  'Maharashtra',
  'Gujarat',
  'Karnataka',
  'Goa',
  'Madhya Pradesh',
  'Telangana',
  'Delhi NCR',
  'Rajasthan',
  'Tamil Nadu',
  'Uttar Pradesh',
  'Other',
];

const VEHICLE_CATEGORIES: VehicleCategory[] = [
  'LMV',
  'HMV',
  'HGMV',
  'Transport Vehicle',
  'Trailer / Multi-Axle',
  'Container Vehicle',
  'Other',
];

const COMMON_VEHICLE_TYPES = [
  'BharatBenz 2823R (Heavy Rigid)',
  'Tata Signa 4825.TK (Multi-Axle)',
  'Ashok Leyland 5525 (Tractor Trailer)',
  'Eicher Pro 6028 (Container Body)',
  'Tata 1613 / 1109 (Medium Goods)',
  'Mahindra Blazo X 35',
];

interface UploadedDriverDoc {
  type: DriverDocumentType;
  file: File | null;
  filename: string;
  size: number;
  progress: number;
  fileUrl?: string;
}

export const DriverRegistrationPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submittedDriver, setSubmittedDriver] = useState<DriverApplication | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [licenceWarning, setLicenceWarning] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Personal Info
    full_name: '',
    date_of_birth: '',
    gender: 'Male' as 'Male' | 'Female' | 'Other',
    mobile_number: '',
    alternate_mobile_number: '',
    email: '',
    current_address: '',
    city: 'Pune',
    state: 'Maharashtra',
    pin_code: '',
    emergency_contact_name: '',
    emergency_contact_number: '',
    // Step 2: Driving Licence Details
    licence_number: '',
    licence_type: 'Commercial Heavy Transport (TRANS)',
    vehicle_categories: ['HMV', 'Transport Vehicle'] as VehicleCategory[],
    licence_issue_date: '',
    licence_expiry_date: '',
    issuing_rto: 'MH-14 Pimpri Chinchwad RTO',
    licence_issuing_state: 'Maharashtra',
    is_licence_expired_flag: false,
    // Step 3: Driving Experience
    total_driving_experience: '5-8 Years',
    heavy_vehicle_experience: '5 Years',
    previous_company_name: '',
    previous_job_role: 'Commercial Long Haul Driver',
    types_of_vehicles_driven: ['BharatBenz 2823R (Heavy Rigid)'],
    preferred_work_location: 'Pune – Mumbai – Gujarat Corridor',
    expected_monthly_salary: 35000,
    availability_to_join: 'Immediate',
    willingness_to_travel: true,
    additional_skills: '',
    // Step 6: Declarations
    declaration_accepted: false,
    licence_review_authorized: false,
    consent_accepted: false,
    privacy_accepted: false,
  });

  // Step 4 Documents State (Bucket: driver-application-documents)
  const [documents, setDocuments] = useState<Record<string, UploadedDriverDoc>>({
    driving_licence_front: { type: 'driving_licence_front', file: null, filename: '', size: 0, progress: 0 },
    driving_licence_back: { type: 'driving_licence_back', file: null, filename: '', size: 0, progress: 0 },
    recent_photograph: { type: 'recent_photograph', file: null, filename: '', size: 0, progress: 0 },
    address_proof: { type: 'address_proof', file: null, filename: '', size: 0, progress: 0 },
    resume: { type: 'resume', file: null, filename: '', size: 0, progress: 0 },
    experience_certificate: { type: 'experience_certificate', file: null, filename: '', size: 0, progress: 0 },
    pan_card: { type: 'pan_card', file: null, filename: '', size: 0, progress: 0 },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const toggleCategory = (cat: VehicleCategory) => {
    setFormData((prev) => {
      const exists = prev.vehicle_categories.includes(cat);
      if (exists) {
        if (prev.vehicle_categories.length <= 1) return prev; // Keep at least one
        return { ...prev, vehicle_categories: prev.vehicle_categories.filter((c) => c !== cat) };
      } else {
        return { ...prev, vehicle_categories: [...prev.vehicle_categories, cat] };
      }
    });
  };

  const toggleVehicleModel = (model: string) => {
    setFormData((prev) => {
      const exists = prev.types_of_vehicles_driven.includes(model);
      if (exists) {
        return { ...prev, types_of_vehicles_driven: prev.types_of_vehicles_driven.filter((m) => m !== model) };
      } else {
        return { ...prev, types_of_vehicles_driven: [...prev.types_of_vehicles_driven, model] };
      }
    });
  };

  const handleFileSelect = async (type: string, file: File | null) => {
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg('File size exceeds 5MB limit. Please upload a compressed document or photo.');
      return;
    }

    const ext = file.name.split('.').pop()?.toLowerCase();
    const validExts = ['pdf', 'jpg', 'jpeg', 'png', 'doc', 'docx'];
    if (!validExts.includes(ext || '')) {
      setErrorMsg('Invalid File Format: Accepted file types are PDF, JPG, JPEG, and PNG.');
      return;
    }

    setErrorMsg(null);

    setDocuments((prev) => ({
      ...prev,
      [type]: {
        type: type as any,
        file,
        filename: file.name,
        size: file.size,
        progress: 40,
      },
    }));

    // Upload to Supabase Storage bucket: driver-application-documents
    try {
      const uploadRes = await supabaseStorageService.uploadDriverDocument(file, 'draft', type);
      setDocuments((prev) => ({
        ...prev,
        [type]: {
          ...prev[type],
          progress: 100,
          fileUrl: uploadRes.fileUrl,
        },
      }));
    } catch {
      setDocuments((prev) => ({
        ...prev,
        [type]: {
          ...prev[type],
          progress: 100,
        },
      }));
    }
  };

  const removeDoc = (type: string) => {
    setDocuments((prev) => ({
      ...prev,
      [type]: { type: type as any, file: null, filename: '', size: 0, progress: 0 },
    }));
  };

  // Step Validations
  const validateStep = (step: number): boolean => {
    setErrorMsg(null);
    setLicenceWarning(null);

    if (step === 1) {
      if (!formData.full_name.trim() || formData.full_name.trim().length < 3) {
        setErrorMsg('Please enter your full name as printed on driving licence (minimum 3 characters).');
        return false;
      }
      if (!formData.date_of_birth) {
        setErrorMsg('Please select your date of birth.');
        return false;
      }
      if (new Date(formData.date_of_birth) > new Date()) {
        setErrorMsg('Invalid Date of Birth: Date of birth cannot be in the future.');
        return false;
      }
      const cleanMobile = formData.mobile_number.replace(/\D/g, '');
      if (cleanMobile.length < 10) {
        setErrorMsg('Please enter a valid 10-digit primary mobile number.');
        return false;
      }
      if (!formData.city.trim()) {
        setErrorMsg('City is required.');
        return false;
      }
      if (!formData.state.trim()) {
        setErrorMsg('State is required.');
        return false;
      }
      const pinRegex = /^\d{6}$/;
      if (!pinRegex.test(formData.pin_code.trim())) {
        setErrorMsg('PIN code must be exactly 6 digits.');
        return false;
      }
      if (!formData.emergency_contact_name.trim()) {
        setErrorMsg('Emergency contact name is mandatory for highway driver safety.');
        return false;
      }
      const cleanEmerg = formData.emergency_contact_number.replace(/\D/g, '');
      if (cleanEmerg.length < 10) {
        setErrorMsg('Emergency contact phone number must be a valid 10-digit number.');
        return false;
      }
    } else if (step === 2) {
      if (!formData.licence_number.trim() || formData.licence_number.trim().length < 5) {
        setErrorMsg('Please enter a valid Driving Licence Number (e.g. MH14 20120045612).');
        return false;
      }
      if (formData.vehicle_categories.length === 0) {
        setErrorMsg('Please select at least one vehicle category authorized on your licence.');
        return false;
      }
      if (!formData.licence_issue_date || !formData.licence_expiry_date) {
        setErrorMsg('Please specify both licence issue date and expiry date.');
        return false;
      }
      // Licence date validation: Expiry must be later than Issue date
      if (new Date(formData.licence_expiry_date) <= new Date(formData.licence_issue_date)) {
        setErrorMsg('Invalid Licence Dates: Licence expiry date must be later than the issue date.');
        return false;
      }
      // Expired licence warning (flagged for review, not completely blocking testing)
      if (new Date(formData.licence_expiry_date) < new Date()) {
        formData.is_licence_expired_flag = true;
        setLicenceWarning('Notice: Driving licence expiry date is past. This application will be flagged for RTO renewal verification.');
      } else {
        formData.is_licence_expired_flag = false;
      }
      if (!formData.issuing_rto.trim()) {
        setErrorMsg('Please enter the Issuing RTO authority name.');
        return false;
      }
    } else if (step === 3) {
      if (!formData.preferred_work_location.trim()) {
        setErrorMsg('Please enter your preferred transport route or city location.');
        return false;
      }
      if (!formData.availability_to_join.trim()) {
        setErrorMsg('Please specify your availability to join.');
        return false;
      }
    } else if (step === 4) {
      // Required: Driving Licence front & back, Recent Photograph, Address Proof
      if (!documents.driving_licence_front.filename && !documents.driving_licence_back.filename) {
        setErrorMsg('Driving Licence documents (Front and Back) are mandatory. Please upload clear photos or PDF.');
        return false;
      }
      if (!documents.driving_licence_front.filename) {
        setErrorMsg('Driving Licence (Front Side) is mandatory.');
        return false;
      }
      if (!documents.driving_licence_back.filename) {
        setErrorMsg('Driving Licence (Back Side showing endorsements) is mandatory.');
        return false;
      }
      if (!documents.recent_photograph.filename) {
        setErrorMsg('Recent driver photograph is mandatory for profile verification.');
        return false;
      }
      if (!documents.address_proof.filename) {
        setErrorMsg('Address proof (e.g. Electricity bill, Voter ID or Ration Card) is mandatory.');
        return false;
      }
    } else if (step === 6) {
      if (!formData.declaration_accepted) {
        setErrorMsg('Please confirm that the information provided is accurate.');
        return false;
      }
      if (!formData.licence_review_authorized) {
        setErrorMsg('Please authorize Prisha Xpress to review the submitted driving licence and documents.');
        return false;
      }
      if (!formData.consent_accepted) {
        setErrorMsg('Please consent to the processing of your application for recruitment purposes.');
        return false;
      }
      if (!formData.privacy_accepted) {
        setErrorMsg('Please agree to the applicable Privacy Policy.');
        return false;
      }
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 6));
      window.scrollTo({ top: 220, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setErrorMsg(null);
    setLicenceWarning(null);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 220, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(6)) return;

    setSubmitting(true);
    setErrorMsg(null);

    try {
      const uploadedDocsList = Object.values(documents)
        .filter((d) => d.filename)
        .map((d) => ({
          document_type: d.type,
          filename: d.filename,
          fileType: d.file?.type || 'application/pdf',
          size: d.size || 350000,
        }));

      const res = await recruitmentService.submitDriverRegistration(
        {
          ...formData,
          expected_monthly_salary: Number(formData.expected_monthly_salary) || 0,
        },
        uploadedDocsList
      );

      setSubmittedDriver(res);
      window.scrollTo({ top: 200, behavior: 'smooth' });
    } catch (err: any) {
      setErrorMsg(err?.message || 'Failed to submit driver registration. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const copyRef = () => {
    if (submittedDriver?.application_reference) {
      navigator.clipboard.writeText(submittedDriver.application_reference);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <PageTransition>
      {/* 1. Header Banner */}
      <section className="relative pt-32 pb-16 lg:pt-36 lg:pb-20 text-white overflow-hidden bg-px-deep flex items-center justify-center min-h-[440px]">
        {/* Background Driver & Truck Photograph - Bright Natural Daylight */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/images/careers-driver.jpg"
            alt="Commercial Driver Registration"
            className="w-full h-full object-cover object-[75%_center] md:object-center filter brightness-100 contrast-100"
          />
          {/* Soft Ambient Directional Support Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-px-deep/65 via-transparent to-px-deep/40 hidden md:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-px-deep/75 via-transparent to-px-deep/35 md:hidden" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center w-full py-6">
          <div className="p-6 sm:p-10 rounded-3xl bg-px-deep/80 backdrop-blur-md border border-white/20 shadow-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider border border-white/20 shadow-sm">
              <Truck className="w-3.5 h-3.5 text-px-accent" />
              <span>Fleet & Highway Operations • Driver Portal</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Join Prisha Xpress as a Professional Driver
            </h1>
            <p className="text-sm sm:text-base text-gray-100 max-w-2xl mx-auto font-medium leading-relaxed">
              Apply to drive for one of Maharashtra's premier logistics operations. Competitive compensation, modern fleet, and professional working environment.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Wizard Container */}
      <section className="py-16 bg-px-bg min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Submission Success Screen */}
          {submittedDriver ? (
            <div className="bg-white rounded-3xl border border-px-border shadow-2xl p-8 sm:p-14 text-center animate-fadeIn">
              <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2">
                Registration Submitted Successfully!
              </span>

              <h2 className="text-3xl font-black text-px-dark">
                Thank you for registering with Prisha Xpress.
              </h2>

              <p className="mt-2 text-gray-700 text-sm sm:text-base max-w-lg mx-auto font-normal leading-relaxed">
                Your driver application has been submitted successfully. Our team will review your details and documents.
              </p>

              {/* Reference Card */}
              <div className="my-8 max-w-md mx-auto p-6 rounded-2xl bg-px-lavender/60 border border-purple-200 text-left">
                <span className="text-xs font-bold text-px-violet uppercase tracking-widest block">
                  Driver Application Reference Number
                </span>
                <div className="flex items-center justify-between gap-3 mt-1.5">
                  <span className="text-2xl font-black tracking-wider text-px-primary font-mono">
                    {submittedDriver.application_reference}
                  </span>
                  <button
                    onClick={copyRef}
                    className="p-2 rounded-lg bg-white border border-purple-200 text-px-primary hover:bg-px-primary hover:text-white transition-all text-xs flex items-center gap-1 font-semibold"
                    title="Copy Reference"
                  >
                    <Copy className="w-4 h-4" />
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                <div className="mt-4 pt-3 border-t border-purple-200 text-xs text-gray-600 flex justify-between">
                  <span>Licence: <strong>{submittedDriver.licence_number.slice(0, 4)} •••• {submittedDriver.licence_number.slice(-4)}</strong></span>
                  <span>Status: <strong className="text-amber-700">Pending Verification</strong></span>
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4 text-xs text-purple-900 text-left max-w-md mx-auto mb-6 space-y-2">
                <p className="font-bold flex items-center gap-1.5 text-px-deep">
                  <ShieldCheck className="w-4 h-4 text-px-primary shrink-0" />
                  Next Steps:
                </p>
                <p>
                  Our Fleet Operations & Document Verification Cell will verify your licence details with RTO records and contact you regarding the driving assessment and document inspection at our Pune / Talegaon depot.
                </p>
              </div>

              {/* Crucial Legal Disclaimer */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 text-[11px] text-amber-900 text-left max-w-md mx-auto mb-8">
                <p className="font-bold flex items-center gap-1 text-amber-800">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                  Important Disclaimer:
                </p>
                <p className="mt-0.5">
                  Application submission does not constitute an offer of employment or registration in official company software. Induction is subject to driving assessment, document verification, and background clearance.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => window.print()}
                  className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-bold text-sm flex items-center gap-2 hover:bg-gray-50 transition-all"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Receipt</span>
                </button>
                <Link to="/careers">
                  <Button variant="primary">Return to Careers Hub</Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-px-border shadow-soft-purple p-6 sm:p-10">
              {/* Step Navigation Bar */}
              <div className="mb-10">
                <div className="flex justify-between items-center mb-3 text-xs sm:text-sm font-bold text-gray-500">
                  <span className="text-px-primary">Step {currentStep} of 6</span>
                  <span>{Math.round((currentStep / 6) * 100)}% Complete</span>
                </div>
                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-px-deep via-px-primary to-px-violet transition-all duration-300 rounded-full"
                    style={{ width: `${(currentStep / 6) * 100}%` }}
                  />
                </div>

                {/* Step Icons */}
                <div className="grid grid-cols-6 gap-1 mt-6 text-center">
                  {[
                    { s: 1, label: 'Personal', icon: Truck },
                    { s: 2, label: 'Licence', icon: CreditCard },
                    { s: 3, label: 'Experience', icon: History },
                    { s: 4, label: 'Documents', icon: UploadCloud },
                    { s: 5, label: 'Review', icon: Edit },
                    { s: 6, label: 'Submit', icon: CheckCircle2 },
                  ].map((step) => {
                    const Icon = step.icon;
                    const isActive = currentStep === step.s;
                    const isPassed = currentStep > step.s;
                    return (
                      <div
                        key={step.s}
                        onClick={() => {
                          if (step.s < currentStep) setCurrentStep(step.s);
                        }}
                        className={`flex flex-col items-center gap-1.5 cursor-pointer transition-all ${
                          isActive
                            ? 'text-px-primary font-bold'
                            : isPassed
                            ? 'text-emerald-600'
                            : 'text-gray-400'
                        }`}
                      >
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs transition-all ${
                            isActive
                              ? 'bg-px-deep text-white shadow-md'
                              : isPassed
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-gray-100 text-gray-500'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-[11px] hidden sm:block truncate max-w-full">
                          {step.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Validation Error Banner */}
              {errorMsg && (
                <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Licence Warning Banner */}
              {licenceWarning && (
                <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs sm:text-sm flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 shrink-0 text-amber-600" />
                  <span>{licenceWarning}</span>
                </div>
              )}

              {/* STEP 1: PERSONAL INFORMATION */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="border-b border-gray-100 pb-4">
                    <h3 className="text-xl font-bold text-px-dark">Step 1: Driver Personal Details</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      Enter your personal information and mandatory emergency contact details.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Driver Full Name (As per Driving Licence) <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleInputChange}
                        placeholder="e.g. Ramesh Balasaheb Shinde"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-px-primary text-sm"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Date of Birth <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="date_of_birth"
                        value={formData.date_of_birth}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-px-primary text-sm"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Gender <span className="text-rose-500">*</span>
                      </label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-px-primary text-sm bg-white"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Primary Mobile Number <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="mobile_number"
                        value={formData.mobile_number}
                        onChange={handleInputChange}
                        placeholder="+91 94220 00000"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-px-primary text-sm"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Alternate Mobile Number (Optional)
                      </label>
                      <input
                        type="tel"
                        name="alternate_mobile_number"
                        value={formData.alternate_mobile_number}
                        onChange={handleInputChange}
                        placeholder="+91 98900 00000"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-px-primary text-sm"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="driver@example.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-px-primary text-sm"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Current Residential Address (Optional)
                      </label>
                      <textarea
                        name="current_address"
                        rows={2}
                        value={formData.current_address}
                        onChange={handleInputChange}
                        placeholder="Village / Town, Post, Taluka, District (Optional)..."
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-px-primary text-sm resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        City / Town <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-px-primary text-sm"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        State <span className="text-rose-500">*</span>
                      </label>
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-px-primary text-sm bg-white"
                      >
                        {INDIAN_STATES.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        PIN Code <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="pin_code"
                        maxLength={6}
                        value={formData.pin_code}
                        onChange={handleInputChange}
                        placeholder="410501"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-px-primary text-sm"
                        required
                      />
                    </div>

                    {/* Emergency Contacts */}
                    <div className="sm:col-span-2 pt-3 border-t border-gray-100">
                      <p className="text-xs font-bold text-px-deep uppercase tracking-wider mb-2">
                        Emergency Contact (Mandatory for Highway Safety)
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1">
                            Emergency Contact Name & Relation <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="emergency_contact_name"
                            value={formData.emergency_contact_name}
                            onChange={handleInputChange}
                            placeholder="e.g. Sunita Shinde (Wife) or Father"
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-px-primary text-sm"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1">
                            Emergency Contact Phone <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="tel"
                            name="emergency_contact_number"
                            value={formData.emergency_contact_number}
                            onChange={handleInputChange}
                            placeholder="+91 98901 00000"
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-px-primary text-sm"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: DRIVING LICENCE DETAILS */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="border-b border-gray-100 pb-4">
                    <h3 className="text-xl font-bold text-px-dark">Step 2: Driving Licence & Authorizations</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      Enter official RTO licence numbers and authorized commercial vehicle categories.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Driving Licence Number <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="licence_number"
                        value={formData.licence_number}
                        onChange={handleInputChange}
                        placeholder="e.g. MH14 20120045612"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-px-primary text-sm font-mono uppercase"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Licence Type <span className="text-rose-500">*</span>
                      </label>
                      <select
                        name="licence_type"
                        value={formData.licence_type}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-px-primary text-sm bg-white"
                      >
                        <option value="Commercial Heavy Transport (TRANS)">Commercial Heavy Transport (TRANS)</option>
                        <option value="Heavy Goods Motor Vehicle (HGMV)">Heavy Goods Motor Vehicle (HGMV)</option>
                        <option value="Medium Goods Vehicle (MGV)">Medium Goods Vehicle (MGV)</option>
                        <option value="Light Motor Vehicle (LMV - Commercial)">Light Motor Vehicle (LMV - Commercial)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Issuing RTO Authority <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="issuing_rto"
                        value={formData.issuing_rto}
                        onChange={handleInputChange}
                        placeholder="e.g. MH-14 Pimpri Chinchwad RTO"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-px-primary text-sm"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Licence Issue Date <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="licence_issue_date"
                        value={formData.licence_issue_date}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-px-primary text-sm"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Licence Expiry Date <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="licence_expiry_date"
                        value={formData.licence_expiry_date}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-px-primary text-sm"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Licence Issuing State <span className="text-rose-500">*</span>
                      </label>
                      <select
                        name="licence_issuing_state"
                        value={formData.licence_issuing_state}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-px-primary text-sm bg-white"
                      >
                        {INDIAN_STATES.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Multi-Select Vehicle Categories */}
                    <div className="sm:col-span-2 pt-2">
                      <label className="block text-xs font-bold text-gray-700 mb-2">
                        Vehicle Categories Authorized (Select All Applicable) <span className="text-rose-500">*</span>
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {VEHICLE_CATEGORIES.map((cat) => {
                          const selected = formData.vehicle_categories.includes(cat);
                          return (
                            <button
                              type="button"
                              key={cat}
                              onClick={() => toggleCategory(cat)}
                              className={`p-3 rounded-xl border text-xs font-bold text-left flex items-center justify-between transition-all ${
                                selected
                                  ? 'bg-purple-50 border-px-primary text-px-primary shadow-sm'
                                  : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                              }`}
                            >
                              <span>{cat}</span>
                              {selected && <CheckCircle2 className="w-4 h-4 text-px-primary shrink-0" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: DRIVING EXPERIENCE */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="border-b border-gray-100 pb-4">
                    <h3 className="text-xl font-bold text-px-dark">Step 3: Commercial Driving Experience</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      Experience, vehicle models handled, and route preferences.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Total Driving Experience <span className="text-rose-500">*</span>
                      </label>
                      <select
                        name="total_driving_experience"
                        value={formData.total_driving_experience}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-px-primary text-sm bg-white"
                      >
                        <option value="3-5 Years">3-5 Years</option>
                        <option value="5-8 Years">5-8 Years</option>
                        <option value="8-10 Years">8-10 Years</option>
                        <option value="10-15 Years">10-15 Years</option>
                        <option value="15+ Years">15+ Years</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Heavy Vehicle Experience <span className="text-rose-500">*</span>
                      </label>
                      <select
                        name="heavy_vehicle_experience"
                        value={formData.heavy_vehicle_experience}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-px-primary text-sm bg-white"
                      >
                        <option value="2-3 Years">2-3 Years</option>
                        <option value="4-6 Years">4-6 Years</option>
                        <option value="7-10 Years">7-10 Years</option>
                        <option value="10+ Years">10+ Years</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Previous Transporter / Company Name (Optional)
                      </label>
                      <input
                        type="text"
                        name="previous_company_name"
                        value={formData.previous_company_name}
                        onChange={handleInputChange}
                        placeholder="e.g. Western Carriers / VRL / Individual Fleet"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-px-primary text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Preferred Work Location / Route <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="preferred_work_location"
                        value={formData.preferred_work_location}
                        onChange={handleInputChange}
                        placeholder="e.g. Pune – Mumbai Expressway / Chakan Hub"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-px-primary text-sm"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Expected Monthly Salary (₹ per month)
                      </label>
                      <input
                        type="number"
                        name="expected_monthly_salary"
                        step={1000}
                        value={formData.expected_monthly_salary}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-px-primary text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Availability to Join <span className="text-rose-500">*</span>
                      </label>
                      <select
                        name="availability_to_join"
                        value={formData.availability_to_join}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-px-primary text-sm bg-white"
                      >
                        <option value="Immediate">Immediate</option>
                        <option value="Within 7 Days">Within 7 Days</option>
                        <option value="Within 15 Days">Within 15 Days</option>
                      </select>
                    </div>

                    {/* Vehicle Models Multi-Select */}
                    <div className="sm:col-span-2 pt-2">
                      <label className="block text-xs font-bold text-gray-700 mb-2">
                        Commercial Truck Models You Have Driven:
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {COMMON_VEHICLE_TYPES.map((model) => {
                          const checked = formData.types_of_vehicles_driven.includes(model);
                          return (
                            <button
                              type="button"
                              key={model}
                              onClick={() => toggleVehicleModel(model)}
                              className={`p-2.5 rounded-xl border text-xs text-left flex items-center justify-between transition-all ${
                                checked
                                  ? 'bg-purple-50 border-px-primary text-px-primary font-bold'
                                  : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                              }`}
                            >
                              <span>{model}</span>
                              {checked && <CheckCircle2 className="w-4 h-4 text-px-primary shrink-0" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: DOCUMENT UPLOAD */}
              {currentStep === 4 && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="border-b border-gray-100 pb-4">
                    <h3 className="text-xl font-bold text-px-dark">Step 4: Driver Document Upload</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      Upload clear scans or photos for physical verification. Stored securely in dedicated storage.
                    </p>
                  </div>

                  {/* Compliance Notice */}
                  <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-amber-700 shrink-0" />
                    <span>
                      <strong>Compliance & Privacy Notice:</strong> Do not upload Aadhaar cards. For statutory compliance, please upload standard Driving Licence, Photo, and Address Proof (Electricity bill / Voter ID).
                    </span>
                  </div>

                  <div className="space-y-4">
                    {/* 1. Driving Licence Front (Required) */}
                    <div className="p-4 rounded-2xl border border-dashed border-purple-300 bg-purple-50/40">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div>
                          <p className="text-xs font-bold text-px-dark flex items-center gap-1.5">
                            <CreditCard className="w-4 h-4 text-px-primary" />
                            Driving Licence – Front Side <span className="text-rose-500">*</span>
                          </p>
                          <p className="text-[11px] text-gray-500">Color photo showing driver photo, name, licence number & validity</p>
                        </div>
                        {documents.driving_licence_front.filename ? (
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                              ✓ {documents.driving_licence_front.filename}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeDoc('driving_licence_front')}
                              className="text-gray-400 hover:text-rose-500 p-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <label className="cursor-pointer px-4 py-2 rounded-xl bg-px-primary text-white text-xs font-bold hover:bg-px-violet transition-all shadow-sm">
                            <span>Upload DL Front</span>
                            <input
                              type="file"
                              accept=".pdf,.jpg,.jpeg,.png"
                              className="hidden"
                              onChange={(e) => handleFileSelect('driving_licence_front', e.target.files?.[0] || null)}
                            />
                          </label>
                        )}
                      </div>
                    </div>

                    {/* 2. Driving Licence Back (Required) */}
                    <div className="p-4 rounded-2xl border border-dashed border-purple-300 bg-purple-50/40">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div>
                          <p className="text-xs font-bold text-px-dark flex items-center gap-1.5">
                            <CreditCard className="w-4 h-4 text-px-primary" />
                            Driving Licence – Back Side <span className="text-rose-500">*</span>
                          </p>
                          <p className="text-[11px] text-gray-500">Showing vehicle class endorsements (TRANS / HGV / LMV) and badge numbers</p>
                        </div>
                        {documents.driving_licence_back.filename ? (
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                              ✓ {documents.driving_licence_back.filename}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeDoc('driving_licence_back')}
                              className="text-gray-400 hover:text-rose-500 p-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <label className="cursor-pointer px-4 py-2 rounded-xl bg-px-primary text-white text-xs font-bold hover:bg-px-violet transition-all shadow-sm">
                            <span>Upload DL Back</span>
                            <input
                              type="file"
                              accept=".pdf,.jpg,.jpeg,.png"
                              className="hidden"
                              onChange={(e) => handleFileSelect('driving_licence_back', e.target.files?.[0] || null)}
                            />
                          </label>
                        )}
                      </div>
                    </div>

                    {/* 3. Recent Driver Photograph (Required) */}
                    <div className="p-4 rounded-2xl border border-dashed border-purple-300 bg-purple-50/40">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div>
                          <p className="text-xs font-bold text-px-dark flex items-center gap-1.5">
                            <Truck className="w-4 h-4 text-px-primary" />
                            Recent Driver Photograph <span className="text-rose-500">*</span>
                          </p>
                          <p className="text-[11px] text-gray-500">Clear front-facing passport size color photo</p>
                        </div>
                        {documents.recent_photograph.filename ? (
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                              ✓ {documents.recent_photograph.filename}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeDoc('recent_photograph')}
                              className="text-gray-400 hover:text-rose-500 p-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <label className="cursor-pointer px-4 py-2 rounded-xl bg-px-primary text-white text-xs font-bold hover:bg-px-violet transition-all shadow-sm">
                            <span>Upload Photograph</span>
                            <input
                              type="file"
                              accept=".jpg,.jpeg,.png"
                              className="hidden"
                              onChange={(e) => handleFileSelect('recent_photograph', e.target.files?.[0] || null)}
                            />
                          </label>
                        )}
                      </div>
                    </div>

                    {/* 4. Address Proof (Required) */}
                    <div className="p-4 rounded-2xl border border-dashed border-purple-300 bg-purple-50/40">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div>
                          <p className="text-xs font-bold text-px-dark flex items-center gap-1.5">
                            <MapPin className="w-4 h-4 text-px-primary" />
                            Address Proof (Voter ID / Light Bill / Ration Card) <span className="text-rose-500">*</span>
                          </p>
                          <p className="text-[11px] text-gray-500">Official proof of residential address</p>
                        </div>
                        {documents.address_proof.filename ? (
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                              ✓ {documents.address_proof.filename}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeDoc('address_proof')}
                              className="text-gray-400 hover:text-rose-500 p-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <label className="cursor-pointer px-4 py-2 rounded-xl bg-px-primary text-white text-xs font-bold hover:bg-px-violet transition-all shadow-sm">
                            <span>Upload Address Proof</span>
                            <input
                              type="file"
                              accept=".pdf,.jpg,.jpeg,.png"
                              className="hidden"
                              onChange={(e) => handleFileSelect('address_proof', e.target.files?.[0] || null)}
                            />
                          </label>
                        )}
                      </div>
                    </div>

                    {/* 5. Resume / Bio-Data (Optional) */}
                    <div className="p-4 rounded-2xl border border-gray-200 bg-gray-50/50">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div>
                          <p className="text-xs font-bold text-gray-700">Driver Bio-Data / Resume (Optional)</p>
                          <p className="text-[11px] text-gray-500">Written bio-data or printed resume if available</p>
                        </div>
                        {documents.resume.filename ? (
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                              ✓ {documents.resume.filename}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeDoc('resume')}
                              className="text-gray-400 hover:text-rose-500 p-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <label className="cursor-pointer px-4 py-2 rounded-xl bg-white border border-gray-300 text-gray-700 text-xs font-bold hover:bg-gray-100 transition-all">
                            <span>Upload Resume</span>
                            <input
                              type="file"
                              accept=".pdf,.doc,.docx,.jpg,.png"
                              className="hidden"
                              onChange={(e) => handleFileSelect('resume', e.target.files?.[0] || null)}
                            />
                          </label>
                        )}
                      </div>
                    </div>

                    {/* 6. Experience Certificate (Optional) */}
                    <div className="p-4 rounded-2xl border border-gray-200 bg-gray-50/50">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div>
                          <p className="text-xs font-bold text-gray-700">Prior Transporter Experience Certificate (Optional)</p>
                          <p className="text-[11px] text-gray-500">Letter of service from previous fleet operator</p>
                        </div>
                        {documents.experience_certificate.filename ? (
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                              ✓ {documents.experience_certificate.filename}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeDoc('experience_certificate')}
                              className="text-gray-400 hover:text-rose-500 p-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <label className="cursor-pointer px-4 py-2 rounded-xl bg-white border border-gray-300 text-gray-700 text-xs font-bold hover:bg-gray-100 transition-all">
                            <span>Upload Certificate</span>
                            <input
                              type="file"
                              accept=".pdf,.jpg,.jpeg,.png"
                              className="hidden"
                              onChange={(e) => handleFileSelect('experience_certificate', e.target.files?.[0] || null)}
                            />
                          </label>
                        )}
                      </div>
                    </div>

                    {/* 7. PAN Card (Optional) */}
                    <div className="p-4 rounded-2xl border border-gray-200 bg-gray-50/50">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div>
                          <p className="text-xs font-bold text-gray-700">PAN Card (Optional)</p>
                          <p className="text-[11px] text-gray-500">For banking and payout account setup</p>
                        </div>
                        {documents.pan_card.filename ? (
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                              ✓ {documents.pan_card.filename}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeDoc('pan_card')}
                              className="text-gray-400 hover:text-rose-500 p-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <label className="cursor-pointer px-4 py-2 rounded-xl bg-white border border-gray-300 text-gray-700 text-xs font-bold hover:bg-gray-100 transition-all">
                            <span>Upload PAN</span>
                            <input
                              type="file"
                              accept=".pdf,.jpg,.jpeg,.png"
                              className="hidden"
                              onChange={(e) => handleFileSelect('pan_card', e.target.files?.[0] || null)}
                            />
                          </label>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5: REVIEW INFORMATION (5 DISTINCT EDITABLE SECTIONS) */}
              {currentStep === 5 && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="border-b border-gray-100 pb-4">
                    <h3 className="text-xl font-bold text-px-dark">Step 5: Review Registration Summary</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      Carefully review all details. Click "Edit" on any section to make corrections.
                    </p>
                  </div>

                  {/* Section A: Personal Information */}
                  <div className="p-4 rounded-2xl bg-px-bg border border-px-border space-y-2">
                    <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                      <h4 className="font-bold text-px-deep text-xs uppercase tracking-wider flex items-center gap-1.5">
                        <Truck className="w-3.5 h-3.5 text-px-primary" />
                        A. Personal Information
                      </h4>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="text-xs font-bold text-px-primary hover:underline flex items-center gap-1"
                      >
                        <Edit className="w-3.5 h-3.5" /> Edit
                      </button>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-gray-700">
                      <p><strong>Name:</strong> {formData.full_name || '—'}</p>
                      <p><strong>DOB:</strong> {formData.date_of_birth || '—'}</p>
                      <p><strong>Gender:</strong> {formData.gender}</p>
                      <p className="sm:col-span-3"><strong>Address:</strong> {formData.current_address ? `${formData.current_address}, ` : ''}{formData.city}, {formData.state} - {formData.pin_code}</p>
                    </div>
                  </div>

                  {/* Section B: Contact Information */}
                  <div className="p-4 rounded-2xl bg-px-bg border border-px-border space-y-2">
                    <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                      <h4 className="font-bold text-px-deep text-xs uppercase tracking-wider flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-px-primary" />
                        B. Contact & Emergency Details
                      </h4>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="text-xs font-bold text-px-primary hover:underline flex items-center gap-1"
                      >
                        <Edit className="w-3.5 h-3.5" /> Edit
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-700">
                      <p><strong>Primary Mobile:</strong> {formData.mobile_number || '—'}</p>
                      <p><strong>Alternate Mobile:</strong> {formData.alternate_mobile_number || 'None'}</p>
                      <p><strong>Emergency Contact:</strong> {formData.emergency_contact_name}</p>
                      <p><strong>Emergency Phone:</strong> {formData.emergency_contact_number}</p>
                    </div>
                  </div>

                  {/* Section C: Driving Licence Details */}
                  <div className="p-4 rounded-2xl bg-px-bg border border-px-border space-y-2">
                    <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                      <h4 className="font-bold text-px-deep text-xs uppercase tracking-wider flex items-center gap-1.5">
                        <CreditCard className="w-3.5 h-3.5 text-px-primary" />
                        C. Driving Licence Details
                      </h4>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="text-xs font-bold text-px-primary hover:underline flex items-center gap-1"
                      >
                        <Edit className="w-3.5 h-3.5" /> Edit
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-700">
                      <p><strong>Licence No:</strong> <span className="font-mono font-bold text-px-primary">{formData.licence_number}</span></p>
                      <p><strong>Issuing RTO:</strong> {formData.issuing_rto}</p>
                      <p><strong>Issue Date:</strong> {formData.licence_issue_date}</p>
                      <p><strong>Expiry Date:</strong> {formData.licence_expiry_date}</p>
                      <div className="col-span-2">
                        <strong>Vehicle Categories:</strong>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {formData.vehicle_categories.map((c) => (
                            <span key={c} className="px-2 py-0.5 rounded-md bg-purple-100 text-px-deep text-[11px] font-bold">
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section D: Driving Experience */}
                  <div className="p-4 rounded-2xl bg-px-bg border border-px-border space-y-2">
                    <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                      <h4 className="font-bold text-px-deep text-xs uppercase tracking-wider flex items-center gap-1.5">
                        <History className="w-3.5 h-3.5 text-px-primary" />
                        D. Driving Experience
                      </h4>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(3)}
                        className="text-xs font-bold text-px-primary hover:underline flex items-center gap-1"
                      >
                        <Edit className="w-3.5 h-3.5" /> Edit
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-700">
                      <p><strong>Total Experience:</strong> {formData.total_driving_experience}</p>
                      <p><strong>Heavy Experience:</strong> {formData.heavy_vehicle_experience}</p>
                      <p><strong>Preferred Location:</strong> {formData.preferred_work_location}</p>
                      <p><strong>Expected Salary:</strong> ₹{formData.expected_monthly_salary} / month</p>
                      <p className="col-span-2"><strong>Vehicles Driven:</strong> {formData.types_of_vehicles_driven.join(', ')}</p>
                    </div>
                  </div>

                  {/* Section E: Uploaded Documents */}
                  <div className="p-4 rounded-2xl bg-px-bg border border-px-border space-y-2">
                    <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                      <h4 className="font-bold text-px-deep text-xs uppercase tracking-wider flex items-center gap-1.5">
                        <UploadCloud className="w-3.5 h-3.5 text-px-primary" />
                        E. Uploaded Documents
                      </h4>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(4)}
                        className="text-xs font-bold text-px-primary hover:underline flex items-center gap-1"
                      >
                        <Edit className="w-3.5 h-3.5" /> Edit
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-700">
                      <p>DL Front: <strong className={documents.driving_licence_front.filename ? 'text-emerald-700' : 'text-rose-600'}>{documents.driving_licence_front.filename ? '✓ Uploaded' : 'Missing'}</strong></p>
                      <p>DL Back: <strong className={documents.driving_licence_back.filename ? 'text-emerald-700' : 'text-rose-600'}>{documents.driving_licence_back.filename ? '✓ Uploaded' : 'Missing'}</strong></p>
                      <p>Photograph: <strong className={documents.recent_photograph.filename ? 'text-emerald-700' : 'text-rose-600'}>{documents.recent_photograph.filename ? '✓ Uploaded' : 'Missing'}</strong></p>
                      <p>Address Proof: <strong className={documents.address_proof.filename ? 'text-emerald-700' : 'text-rose-600'}>{documents.address_proof.filename ? '✓ Uploaded' : 'Missing'}</strong></p>
                      {documents.resume.filename && <p>Resume: <strong className="text-emerald-700">✓ Uploaded</strong></p>}
                      {documents.experience_certificate.filename && <p>Exp Certificate: <strong className="text-emerald-700">✓ Uploaded</strong></p>}
                      {documents.pan_card.filename && <p>PAN Card: <strong className="text-emerald-700">✓ Uploaded</strong></p>}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 6: SUBMIT REGISTRATION */}
              {currentStep === 6 && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="border-b border-gray-100 pb-4">
                    <h3 className="text-xl font-bold text-px-dark">Step 6: Declarations & Submit Registration</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      Please read and confirm the following statutory driver declarations and consents.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {/* Declaration 1 */}
                    <label className="flex items-start gap-3 p-4 rounded-2xl bg-purple-50/70 border border-purple-200 cursor-pointer">
                      <input
                        type="checkbox"
                        name="declaration_accepted"
                        checked={formData.declaration_accepted}
                        onChange={handleInputChange}
                        className="mt-1 h-4 w-4 rounded text-px-primary focus:ring-px-primary"
                        required
                      />
                      <span className="text-xs text-gray-700 leading-relaxed">
                        <strong className="text-px-deep">Driver Accuracy Declaration:</strong> "I declare that all details provided in this application and all documents submitted are true, complete, and authentic."
                      </span>
                    </label>

                    {/* Declaration 2 */}
                    <label className="flex items-start gap-3 p-4 rounded-2xl bg-purple-50/70 border border-purple-200 cursor-pointer">
                      <input
                        type="checkbox"
                        name="licence_review_authorized"
                        checked={formData.licence_review_authorized}
                        onChange={handleInputChange}
                        className="mt-1 h-4 w-4 rounded text-px-primary focus:ring-px-primary"
                        required
                      />
                      <span className="text-xs text-gray-700 leading-relaxed">
                        <strong className="text-px-deep">RTO & Licence Review Authorization:</strong> "I authorize Prisha Xpress Pvt. Ltd. to review my application, verify my driving licence with the issuing RTO or relevant authorities, and conduct necessary background verification."
                      </span>
                    </label>

                    {/* Declaration 3 */}
                    <label className="flex items-start gap-3 p-4 rounded-2xl bg-purple-50/70 border border-purple-200 cursor-pointer">
                      <input
                        type="checkbox"
                        name="consent_accepted"
                        checked={formData.consent_accepted}
                        onChange={handleInputChange}
                        className="mt-1 h-4 w-4 rounded text-px-primary focus:ring-px-primary"
                        required
                      />
                      <span className="text-xs text-gray-700 leading-relaxed">
                        <strong className="text-px-deep">Recruitment Evaluation Consent:</strong> "I understand and agree that this registration is for recruitment evaluation and does not constitute an offer of employment or a contract."
                      </span>
                    </label>

                    {/* Declaration 4 */}
                    <label className="flex items-start gap-3 p-4 rounded-2xl bg-purple-50/70 border border-purple-200 cursor-pointer">
                      <input
                        type="checkbox"
                        name="privacy_accepted"
                        checked={formData.privacy_accepted}
                        onChange={handleInputChange}
                        className="mt-1 h-4 w-4 rounded text-px-primary focus:ring-px-primary"
                        required
                      />
                      <span className="text-xs text-gray-700 leading-relaxed">
                        <strong className="text-px-deep">Privacy Policy Agreement:</strong> "I have read, understood, and agree to the Prisha Xpress Recruitment Privacy Policy."
                      </span>
                    </label>
                  </div>

                  <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 text-xs text-gray-600 leading-relaxed">
                    <p className="font-bold text-gray-800 mb-1">Company Policy & Software Confirmation:</p>
                    <p>
                      By clicking Submit, your application will be saved to the secure Prisha Xpress driver registration database and forwarded to the Document Verification Cell. Application submission does not constitute an offer of employment or registration in official company software. Induction is subject to driving assessment, document verification, and background clearance.
                    </p>
                  </div>
                </div>
              )}

              {/* Bottom Buttons */}
              <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-bold text-xs sm:text-sm hover:bg-gray-50 flex items-center gap-1.5 transition-all"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < 6 ? (
                  <Button
                    type="button"
                    variant="primary"
                    onClick={nextStep}
                    className="px-6 py-2.5 text-xs sm:text-sm bg-px-deep hover:bg-px-primary"
                  >
                    <span>Next Step</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    variant="primary"
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="px-8 py-3 text-xs sm:text-sm bg-px-deep hover:bg-px-primary shadow-lg"
                  >
                    {submitting ? 'Submitting Registration...' : 'SUBMIT DRIVER REGISTRATION'}
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  );
};
