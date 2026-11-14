// PRISHA XPRESS PVT. LTD. - MODULE A: STAFF RECRUITMENT APPLICATION WIZARD
// ROUTE: /careers/staff-application
// STRICT SEPARATION: SAVES TO STAFF RECRUITMENT DATABASE ONLY

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageTransition } from '../../components/animations/PageTransition';
import { Button } from '../../components/common/Button';
import { recruitmentService } from '../../services/recruitmentService';
import { StaffApplication, StaffDepartment, EmploymentType, StaffDocumentType } from '../../types/recruitment';
import { supabaseStorageService } from '../../services/supabaseClient';
import {
  User,
  GraduationCap,
  Briefcase,
  History,
  UploadCloud,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  FileText,
  Trash2,
  Building2,
  AlertCircle,
  Copy,
  Printer,
  Sparkles,
  ShieldCheck,
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
  'West Bengal',
  'Other',
];

const QUALIFICATION_LEVELS = [
  '10th',
  '12th',
  'ITI',
  'Diploma',
  'Graduate',
  'Postgraduate',
  'Other',
];

const STAFF_DEPARTMENTS: StaffDepartment[] = [
  'Administration',
  'Human Resources',
  'Operations',
  'Transport & Logistics',
  'Accounts & Finance',
  'IT & Technical',
  'Customer Support',
  'Other',
];

const EMPLOYMENT_OPTIONS: EmploymentType[] = [
  'Full-time',
  'Part-time',
  'Contract',
  'Internship',
];

const POSITIONS_BY_DEPT: Record<StaffDepartment, string[]> = {
  Administration: ['Executive Assistant', 'Office Administrator', 'Facilities Coordinator', 'Front Desk Officer'],
  'Human Resources': ['HR Generalist', 'Recruitment Specialist', 'Payroll & Compliance Executive', 'Driver Welfare Officer'],
  Operations: ['Logistics Operations Lead', 'Fleet Dispatch Controller', 'Hub Supervisor', 'Route Optimization Specialist'],
  'Transport & Logistics': ['Freight Movement Coordinator', 'Loading & Unloading Supervisor', 'Vendor Dispatch Executive'],
  'Accounts & Finance': ['Accounts & Billing Executive', 'GST & E-way Bill Analyst', 'Audit Assistant', 'Financial Controller'],
  'IT & Technical': ['GPS & Telematics Support', 'Frontend Web Developer', 'Systems & Network Admin', 'TMS ERP Coordinator'],
  'Customer Support': ['Customer Support Specialist', 'Client Relations Executive', 'Dispute Resolution Coordinator'],
  Other: ['Customer Relationship Executive', 'Business Development Associate', 'Management Trainee'],
};

interface UploadedDocState {
  type: StaffDocumentType;
  file: File | null;
  filename: string;
  size: number;
  progress: number;
  fileUrl?: string;
}

export const StaffApplicationPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submittedApp, setSubmittedApp] = useState<StaffApplication | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
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
    // Step 2: Educational Details
    qualification: 'Graduate',
    course_degree: '',
    specialization: '',
    college_university: '',
    passing_year: 2023,
    percentage_cgpa: '',
    additional_qualification: '',
    certifications: '',
    // Step 3: Job Preferences
    department: 'Operations' as StaffDepartment,
    position_applied_for: 'Logistics Operations Lead',
    preferred_location: 'Pune Corporate Office (Kharadi)',
    employment_type: 'Full-time' as EmploymentType,
    is_fresher: false,
    // Step 4: Work Experience
    total_experience: '2-4 Years',
    previous_company: '',
    previous_job_role: '',
    previous_responsibilities: '',
    previous_salary: '',
    expected_salary: 500000,
    notice_period: '30 Days',
    key_skills: '',
    availability_to_join: 'Immediate',
    // Step 6: Declarations
    additional_message: '',
    declaration_accepted: false,
    consent_accepted: false,
    privacy_accepted: false,
  });

  // Step 5 Documents State (Bucket: staff-application-documents)
  const [documents, setDocuments] = useState<Record<string, UploadedDocState>>({
    resume: { type: 'resume', file: null, filename: '', size: 0, progress: 0 },
    educational_certificate: { type: 'educational_certificate', file: null, filename: '', size: 0, progress: 0 },
    experience_certificate: { type: 'experience_certificate', file: null, filename: '', size: 0, progress: 0 },
    professional_certification: { type: 'professional_certification', file: null, filename: '', size: 0, progress: 0 },
    profile_photograph: { type: 'profile_photograph', file: null, filename: '', size: 0, progress: 0 },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (name === 'department') {
        const dept = value as StaffDepartment;
        setFormData((prev) => ({
          ...prev,
          department: dept,
          position_applied_for: POSITIONS_BY_DEPT[dept]?.[0] || 'Executive',
        }));
      }
    }
  };

  const handleFileSelect = async (type: string, file: File | null) => {
    if (!file) return;

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg('File size exceeds 5MB limit. Please upload a smaller document.');
      return;
    }

    // Validate MIME / extension
    const ext = file.name.split('.').pop()?.toLowerCase();
    const validResumeExts = ['pdf', 'doc', 'docx'];
    const validGeneralExts = ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png'];

    if (type === 'resume' && !validResumeExts.includes(ext || '')) {
      setErrorMsg('Invalid Resume Format: Only PDF, DOC, or DOCX documents are accepted for resumes.');
      return;
    } else if (!validGeneralExts.includes(ext || '')) {
      setErrorMsg('Invalid File Format: Accepted file types are PDF, DOC, DOCX, JPG, and PNG.');
      return;
    }

    setErrorMsg(null);

    // Initial progress state
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

    // Upload to Supabase Storage bucket: staff-application-documents
    try {
      const uploadRes = await supabaseStorageService.uploadStaffDocument(file, 'draft', type);
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
    if (step === 1) {
      if (!formData.full_name.trim() || formData.full_name.trim().length < 3) {
        setErrorMsg('Please enter your full name (minimum 3 characters, valid letters).');
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
        setErrorMsg('Please enter a valid 10-digit Indian mobile number.');
        return false;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
        setErrorMsg('Please enter a valid email address.');
        return false;
      }
      if (!formData.current_address.trim()) {
        setErrorMsg('Current address is required.');
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
    } else if (step === 2) {
      if (!formData.course_degree.trim()) {
        setErrorMsg('Please enter your course / degree title.');
        return false;
      }
      if (!formData.college_university.trim()) {
        setErrorMsg('College or university name is required.');
        return false;
      }
      if (!formData.percentage_cgpa.trim()) {
        setErrorMsg('Please enter your percentage or CGPA.');
        return false;
      }
    } else if (step === 3) {
      if (!formData.position_applied_for.trim()) {
        setErrorMsg('Please select a position applied for.');
        return false;
      }
    } else if (step === 4) {
      if (!formData.is_fresher) {
        if (!formData.previous_company.trim()) {
          setErrorMsg('Please specify your previous or current employer name.');
          return false;
        }
        if (!formData.previous_job_role.trim()) {
          setErrorMsg('Please specify your previous job role.');
          return false;
        }
      }
    } else if (step === 5) {
      // Required: Resume (PDF, DOC or DOCX). Other documents are optional.
      if (!documents.resume.filename) {
        setErrorMsg('Resume (PDF, DOC or DOCX) is mandatory. Please upload your resume.');
        return false;
      }
    } else if (step === 6) {
      if (!formData.declaration_accepted) {
        setErrorMsg('Please confirm that the information provided is accurate.');
        return false;
      }
      if (!formData.consent_accepted) {
        setErrorMsg('Please provide consent for recruitment processing.');
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
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 220, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(6)) return;

    setSubmitting(true);
    setErrorMsg(null);

    try {
      // Build uploaded docs list with Supabase storage metadata
      const uploadedDocsList = Object.values(documents)
        .filter((d) => d.filename)
        .map((d) => ({
          document_type: d.type,
          filename: d.filename,
          fileType: d.file?.type || 'application/pdf',
          size: d.size || 250000,
        }));

      const res = await recruitmentService.submitStaffApplication(
        {
          ...formData,
          expected_salary: Number(formData.expected_salary) || 0,
        },
        uploadedDocsList
      );

      setSubmittedApp(res);
      window.scrollTo({ top: 200, behavior: 'smooth' });
    } catch (err: any) {
      setErrorMsg(err?.message || 'Failed to submit application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const copyRef = () => {
    if (submittedApp?.application_reference) {
      navigator.clipboard.writeText(submittedApp.application_reference);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <PageTransition>
      {/* 1. Header Banner */}
      <section className="relative pt-32 pb-16 lg:pt-36 lg:pb-20 text-white overflow-hidden bg-px-deep flex items-center justify-center min-h-[440px]">
        {/* Background Office Photograph - Bright Natural Daylight */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/images/careers-staff.jpg"
            alt="Corporate Staff Careers"
            className="w-full h-full object-cover object-[75%_center] md:object-center filter brightness-100 contrast-100"
          />
          {/* Soft Ambient Directional Support Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-px-deep/65 via-transparent to-px-deep/40 hidden md:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-px-deep/75 via-transparent to-px-deep/35 md:hidden" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center w-full py-6">
          <div className="p-6 sm:p-10 rounded-3xl bg-px-deep/80 backdrop-blur-md border border-white/20 shadow-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold uppercase tracking-wider text-purple-200 border border-white/20">
              <Building2 className="w-3.5 h-3.5 text-px-accent" />
              <span>Staff Recruitment Module • Corporate Positions</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Build Your Career With Prisha Xpress
            </h1>
            <p className="text-sm sm:text-base text-gray-100 max-w-2xl mx-auto font-medium leading-relaxed">
              Join our team and become part of a growing transportation and logistics organization.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Wizard Container */}
      <section className="py-16 bg-px-bg min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Submission Success Screen */}
          {submittedApp ? (
            <div className="bg-white rounded-3xl border border-px-border shadow-2xl p-8 sm:p-14 text-center animate-fadeIn">
              <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2">
                Application Received Successfully
              </span>

              <h2 className="text-3xl font-black text-px-dark">
                Thank You, {submittedApp.full_name}!
              </h2>

              <p className="mt-3 text-gray-700 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                Thank you for applying to Prisha Xpress. Your staff application has been submitted successfully. Our recruitment team will review your application.
              </p>

              {/* Reference Card */}
              <div className="my-8 max-w-md mx-auto p-6 rounded-2xl bg-px-lavender/60 border border-purple-200 text-left">
                <span className="text-xs font-bold text-px-violet uppercase tracking-widest block">
                  Official Application Reference Number
                </span>
                <div className="flex items-center justify-between gap-3 mt-1.5">
                  <span className="text-2xl font-black tracking-wider text-px-primary font-mono">
                    {submittedApp.application_reference}
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
                  <span>Department: <strong>{submittedApp.department}</strong></span>
                  <span>Status: <strong className="text-purple-700">Submitted</strong></span>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-800 text-left max-w-md mx-auto mb-8">
                <p className="font-bold flex items-center gap-1.5 mb-1">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  What happens next?
                </p>
                <p>
                  Our HR recruitment team will review your resume and qualifications. Shortlisted candidates will be contacted via email ({submittedApp.email}) or phone ({submittedApp.mobile_number}) for round 1 discussion.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => window.print()}
                  className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-bold text-sm flex items-center gap-2 hover:bg-gray-50 transition-all"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Summary</span>
                </button>
                <Link to="/careers">
                  <Button variant="primary">Return to Careers Hub</Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-px-border shadow-soft-purple p-6 sm:p-10">
              {/* Progress Steps Header */}
              <div className="mb-10">
                <div className="flex justify-between items-center mb-3 text-xs sm:text-sm font-bold text-gray-500">
                  <span className="text-px-primary">Step {currentStep} of 6</span>
                  <span>{Math.round((currentStep / 6) * 100)}% Complete</span>
                </div>
                {/* Progress Bar */}
                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-px-primary to-px-violet transition-all duration-300 rounded-full"
                    style={{ width: `${(currentStep / 6) * 100}%` }}
                  />
                </div>

                {/* Step Icons Row */}
                <div className="grid grid-cols-6 gap-1 mt-6 text-center">
                  {[
                    { s: 1, label: 'Personal', icon: User },
                    { s: 2, label: 'Education', icon: GraduationCap },
                    { s: 3, label: 'Job Role', icon: Briefcase },
                    { s: 4, label: 'Experience', icon: History },
                    { s: 5, label: 'Documents', icon: UploadCloud },
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
                              ? 'bg-px-primary text-white shadow-md'
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

              {/* STEP 1: PERSONAL INFORMATION */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="border-b border-gray-100 pb-4">
                    <h3 className="text-xl font-bold text-px-dark">Step 1: Personal Information</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      Enter your official contact and residential information.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleInputChange}
                        placeholder="e.g. Pooja Sanjay Kulkarni"
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
                        Mobile Number <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="mobile_number"
                        value={formData.mobile_number}
                        onChange={handleInputChange}
                        placeholder="+91 98230 00000"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-px-primary text-sm"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Alternate Mobile Number <span className="text-gray-400 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="tel"
                        name="alternate_mobile_number"
                        value={formData.alternate_mobile_number}
                        onChange={handleInputChange}
                        placeholder="+91 98230 11111"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-px-primary text-sm"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="candidate@example.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-px-primary text-sm"
                        required
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Current Residential Address <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        name="current_address"
                        rows={2}
                        value={formData.current_address}
                        onChange={handleInputChange}
                        placeholder="House / Flat No., Street, Landmark..."
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-px-primary text-sm resize-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        City <span className="text-rose-500">*</span>
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
                        value={formData.pin_code}
                        onChange={handleInputChange}
                        placeholder="411001"
                        maxLength={6}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-px-primary text-sm"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: EDUCATIONAL DETAILS */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="border-b border-gray-100 pb-4">
                    <h3 className="text-xl font-bold text-px-dark">Step 2: Educational Details</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      Academic qualifications and certifications.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Highest Qualification <span className="text-rose-500">*</span>
                      </label>
                      <select
                        name="qualification"
                        value={formData.qualification}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-px-primary text-sm bg-white"
                      >
                        {QUALIFICATION_LEVELS.map((q) => (
                          <option key={q} value={q}>
                            {q}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Degree / Course Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="course_degree"
                        value={formData.course_degree}
                        onChange={handleInputChange}
                        placeholder="e.g. B.Com Accounting & Finance"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-px-primary text-sm"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Specialization <span className="text-gray-400 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        name="specialization"
                        value={formData.specialization}
                        onChange={handleInputChange}
                        placeholder="e.g. Logistics & Supply Chain"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-px-primary text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        College / University Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="college_university"
                        value={formData.college_university}
                        onChange={handleInputChange}
                        placeholder="e.g. Savitribai Phule Pune University"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-px-primary text-sm"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Passing Year <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="passing_year"
                        min={1990}
                        max={2026}
                        value={formData.passing_year}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-px-primary text-sm"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Percentage or CGPA <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="percentage_cgpa"
                        value={formData.percentage_cgpa}
                        onChange={handleInputChange}
                        placeholder="e.g. 78% or 8.2 CGPA"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-px-primary text-sm"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Additional Qualifications <span className="text-gray-400 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        name="additional_qualification"
                        value={formData.additional_qualification}
                        onChange={handleInputChange}
                        placeholder="e.g. Post-Graduate Diploma, Tally ERP"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-px-primary text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Relevant Certifications <span className="text-gray-400 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        name="certifications"
                        value={formData.certifications}
                        onChange={handleInputChange}
                        placeholder="e.g. Six Sigma, SAP Logistics, CSCP"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-px-primary text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Percentage / CGPA <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="percentage_cgpa"
                        value={formData.percentage_cgpa}
                        onChange={handleInputChange}
                        placeholder="e.g. 78% or 8.4 CGPA"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-px-primary text-sm"
                        required
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Additional Certifications / Qualifications (Optional)
                      </label>
                      <input
                        type="text"
                        name="additional_qualification"
                        value={formData.additional_qualification}
                        onChange={handleInputChange}
                        placeholder="e.g. Tally Prime, Advanced Excel, Six Sigma Green Belt, Supply Chain Cert"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-px-primary text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: JOB DETAILS */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="border-b border-gray-100 pb-4">
                    <h3 className="text-xl font-bold text-px-dark">Step 3: Job Role & Preferences</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      Select your desired department and position.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Department <span className="text-rose-500">*</span>
                      </label>
                      <select
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-px-primary text-sm bg-white"
                      >
                        {STAFF_DEPARTMENTS.map((dept) => (
                          <option key={dept} value={dept}>
                            {dept}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Position Applied For <span className="text-rose-500">*</span>
                      </label>
                      <select
                        name="position_applied_for"
                        value={formData.position_applied_for}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-px-primary text-sm bg-white"
                      >
                        {(POSITIONS_BY_DEPT[formData.department] || []).map((pos) => (
                          <option key={pos} value={pos}>
                            {pos}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Preferred Work Location <span className="text-rose-500">*</span>
                      </label>
                      <select
                        name="preferred_location"
                        value={formData.preferred_location}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-px-primary text-sm bg-white"
                      >
                        <option value="Pune Headquarters (Corporate Office)">Pune Headquarters (Corporate Office)</option>
                        <option value="Chakan Logistics Hub, Pune">Chakan Logistics Hub, Pune</option>
                        <option value="Talegaon Service Depot">Talegaon Service Depot</option>
                        <option value="Mumbai Regional Coordination Office">Mumbai Regional Coordination Office</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Employment Type <span className="text-rose-500">*</span>
                      </label>
                      <select
                        name="employment_type"
                        value={formData.employment_type}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-px-primary text-sm bg-white"
                      >
                        {EMPLOYMENT_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Fresher Question with clear visual switch */}
                    <div className="sm:col-span-2 p-4 rounded-2xl bg-px-lavender/50 border border-purple-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <p className="text-xs font-bold text-px-dark">Are You a Fresher?</p>
                        <p className="text-[11px] text-gray-500">
                          Select Yes if this is your first full-time professional corporate role.
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setFormData((p) => ({ ...p, is_fresher: true }))}
                          className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                            formData.is_fresher
                              ? 'bg-px-primary text-white shadow-sm'
                              : 'bg-white border border-gray-200 text-gray-600'
                          }`}
                        >
                          Yes, Fresher
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData((p) => ({ ...p, is_fresher: false }))}
                          className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                            !formData.is_fresher
                              ? 'bg-px-primary text-white shadow-sm'
                              : 'bg-white border border-gray-200 text-gray-600'
                          }`}
                        >
                          No, Experienced
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: WORK EXPERIENCE (WITH CONDITIONAL FRESHER LOGIC) */}
              {currentStep === 4 && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="border-b border-gray-100 pb-4">
                    <h3 className="text-xl font-bold text-px-dark">Step 4: Professional Experience</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {formData.is_fresher
                        ? 'As a fresher, tell us about your core skills and salary expectations.'
                        : 'Detail your past logistics / corporate background.'}
                    </p>
                  </div>

                  {formData.is_fresher ? (
                    <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-emerald-600 shrink-0" />
                      <span>
                        Fresher mode active: Previous company details are optional. Focus on highlighting your technical skills and internship projects.
                      </span>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Total Relevant Experience <span className="text-rose-500">*</span>
                        </label>
                        <select
                          name="total_experience"
                          value={formData.total_experience}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-px-primary text-sm bg-white"
                        >
                          <option value="1-2 Years">1-2 Years</option>
                          <option value="2-4 Years">2-4 Years</option>
                          <option value="4-6 Years">4-6 Years</option>
                          <option value="6-10 Years">6-10 Years</option>
                          <option value="10+ Years">10+ Years</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Previous / Current Company <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="previous_company"
                          value={formData.previous_company}
                          onChange={handleInputChange}
                          placeholder="e.g. Mahindra Logistics Ltd."
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-px-primary text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Previous Job Role <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="previous_job_role"
                          value={formData.previous_job_role}
                          onChange={handleInputChange}
                          placeholder="e.g. Fleet Operations Assistant"
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-px-primary text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Previous Salary (CTC p.a. - Optional)
                        </label>
                        <input
                          type="text"
                          name="previous_salary"
                          value={formData.previous_salary}
                          onChange={handleInputChange}
                          placeholder="e.g. ₹4,50,000 p.a."
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-px-primary text-sm"
                        />
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Key Skills & Software Tools
                      </label>
                      <textarea
                        name="key_skills"
                        rows={2}
                        value={formData.key_skills}
                        onChange={handleInputChange}
                        placeholder="e.g. TMS ERP, Advanced Excel, Route Planning, Vendor Coordination, GPS Telematics..."
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-px-primary text-sm resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Notice Period
                      </label>
                      <select
                        name="notice_period"
                        value={formData.notice_period}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-px-primary text-sm bg-white"
                      >
                        <option value="Immediate Joiner">Immediate Joiner</option>
                        <option value="15 Days">15 Days</option>
                        <option value="30 Days">30 Days</option>
                        <option value="60 Days">60 Days</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Expected Annual Salary (₹ CTC p.a.)
                      </label>
                      <input
                        type="number"
                        name="expected_salary"
                        step={10000}
                        value={formData.expected_salary}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-px-primary text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5: DOCUMENT UPLOAD */}
              {currentStep === 5 && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="border-b border-gray-100 pb-4">
                    <h3 className="text-xl font-bold text-px-dark">Step 5: Document Upload</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      Upload your credentials for private HR review. Files are stored in private encrypted storage.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {/* 1. Resume (Required) */}
                    <div className="p-4 rounded-2xl border border-dashed border-purple-300 bg-purple-50/40">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div>
                          <p className="text-xs font-bold text-px-dark flex items-center gap-1.5">
                            <FileText className="w-4 h-4 text-px-primary" />
                            Resume / Curriculum Vitae (CV) <span className="text-rose-500">* (Required)</span>
                          </p>
                          <p className="text-[11px] text-gray-500">
                            Accepted: PDF, DOC, DOCX (Max 5MB)
                          </p>
                        </div>
                        {documents.resume.filename ? (
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                              ✓ {documents.resume.filename} ({(documents.resume.size / 1024).toFixed(0)} KB)
                            </span>
                            <button
                              type="button"
                              onClick={() => removeDoc('resume')}
                              className="text-gray-400 hover:text-rose-500 p-1"
                              title="Remove"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <label className="cursor-pointer px-4 py-2 rounded-xl bg-px-primary text-white text-xs font-bold hover:bg-px-violet transition-all shadow-sm">
                            <span>Select Resume</span>
                            <input
                              type="file"
                              accept=".pdf,.doc,.docx"
                              className="hidden"
                              onChange={(e) => handleFileSelect('resume', e.target.files?.[0] || null)}
                            />
                          </label>
                        )}
                      </div>
                    </div>

                    {/* 2. Educational Certificates (Optional) */}
                    <div className="p-4 rounded-2xl border border-gray-200 bg-gray-50/50">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div>
                          <p className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                            <GraduationCap className="w-4 h-4 text-gray-400" />
                            Educational Certificates <span className="text-gray-400 font-normal">(Optional)</span>
                          </p>
                          <p className="text-[11px] text-gray-500">Degree, diploma or passing marksheet (PDF, JPG, PNG)</p>
                        </div>
                        {documents.educational_certificate.filename ? (
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                              ✓ {documents.educational_certificate.filename}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeDoc('educational_certificate')}
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
                              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                              className="hidden"
                              onChange={(e) => handleFileSelect('educational_certificate', e.target.files?.[0] || null)}
                            />
                          </label>
                        )}
                      </div>
                    </div>

                    {/* 3. Experience Certificate (Optional) */}
                    <div className="p-4 rounded-2xl border border-gray-200 bg-gray-50/50">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div>
                          <p className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                            <History className="w-4 h-4 text-gray-400" />
                            Experience Certificate <span className="text-gray-400 font-normal">(Optional)</span>
                          </p>
                          <p className="text-[11px] text-gray-500">From prior logistics or corporate employer</p>
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
                            <span>Upload (Optional)</span>
                            <input
                              type="file"
                              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                              className="hidden"
                              onChange={(e) => handleFileSelect('experience_certificate', e.target.files?.[0] || null)}
                            />
                          </label>
                        )}
                      </div>
                    </div>

                    {/* 4. Professional Certifications (Optional) */}
                    <div className="p-4 rounded-2xl border border-gray-200 bg-gray-50/50">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div>
                          <p className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                            <ShieldCheck className="w-4 h-4 text-gray-400" />
                            Professional Certifications <span className="text-gray-400 font-normal">(Optional)</span>
                          </p>
                          <p className="text-[11px] text-gray-500">Supply chain, ERP, Six Sigma, or software certifications</p>
                        </div>
                        {documents.professional_certification.filename ? (
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                              ✓ {documents.professional_certification.filename}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeDoc('professional_certification')}
                              className="text-gray-400 hover:text-rose-500 p-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <label className="cursor-pointer px-4 py-2 rounded-xl bg-white border border-gray-300 text-gray-700 text-xs font-bold hover:bg-gray-100 transition-all">
                            <span>Upload Certification</span>
                            <input
                              type="file"
                              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                              className="hidden"
                              onChange={(e) => handleFileSelect('professional_certification', e.target.files?.[0] || null)}
                            />
                          </label>
                        )}
                      </div>
                    </div>

                    {/* 5. Profile Photograph (Optional) */}
                    <div className="p-4 rounded-2xl border border-gray-200 bg-gray-50/50">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div>
                          <p className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                            <User className="w-4 h-4 text-gray-400" />
                            Profile Photograph <span className="text-gray-400 font-normal">(Optional)</span>
                          </p>
                          <p className="text-[11px] text-gray-500">Formal passport size photograph (JPG, PNG)</p>
                        </div>
                        {documents.profile_photograph.filename ? (
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                              ✓ {documents.profile_photograph.filename}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeDoc('profile_photograph')}
                              className="text-gray-400 hover:text-rose-500 p-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <label className="cursor-pointer px-4 py-2 rounded-xl bg-white border border-gray-300 text-gray-700 text-xs font-bold hover:bg-gray-100 transition-all">
                            <span>Upload Photo</span>
                            <input
                              type="file"
                              accept=".jpg,.jpeg,.png"
                              className="hidden"
                              onChange={(e) => handleFileSelect('profile_photograph', e.target.files?.[0] || null)}
                            />
                          </label>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 6: FINAL REVIEW & SUBMISSION */}
              {currentStep === 6 && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="border-b border-gray-100 pb-4">
                    <h3 className="text-xl font-bold text-px-dark">Step 6: Review & Final Submission</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      Verify your application summary and complete mandatory recruitment declarations.
                    </p>
                  </div>

                  {/* Summary Box */}
                  <div className="p-5 rounded-2xl bg-px-bg border border-px-border space-y-3 text-xs">
                    <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                      <span className="font-bold text-px-deep">Position:</span>
                      <span className="font-extrabold text-px-primary">{formData.position_applied_for} ({formData.department})</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-gray-600">
                      <p><strong>Candidate:</strong> {formData.full_name}</p>
                      <p><strong>Mobile:</strong> {formData.mobile_number}</p>
                      <p><strong>Email:</strong> {formData.email}</p>
                      <p><strong>City / State:</strong> {formData.city}, {formData.state}</p>
                      <p><strong>Qualification:</strong> {formData.qualification}</p>
                      <p><strong>Status:</strong> {formData.is_fresher ? 'Fresher' : `Experienced (${formData.total_experience})`}</p>
                    </div>
                    <div className="pt-2 border-t border-gray-200 flex items-center justify-between text-gray-500">
                      <span>Resume: <strong>{documents.resume.filename || 'Uploaded'}</strong></span>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="text-px-primary font-bold hover:underline"
                      >
                        Edit Details
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Additional Message for HR (Optional)
                    </label>
                    <textarea
                      name="additional_message"
                      rows={2}
                      value={formData.additional_message}
                      onChange={handleInputChange}
                      placeholder="Share any special logistics accomplishments, certifications or preferred joining date..."
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-px-primary text-sm resize-none"
                    />
                  </div>

                  {/* Mandatory Declarations */}
                  <div className="space-y-3 pt-2">
                    <label className="flex items-start gap-3 p-3.5 rounded-2xl bg-purple-50/60 border border-purple-200 cursor-pointer">
                      <input
                        type="checkbox"
                        name="declaration_accepted"
                        checked={formData.declaration_accepted}
                        onChange={handleInputChange}
                        className="mt-1 h-4 w-4 rounded text-px-primary focus:ring-px-primary"
                        required
                      />
                      <span className="text-xs text-gray-700 leading-relaxed">
                        <strong className="text-px-deep">Accuracy Declaration:</strong> "I confirm that the information provided is accurate."
                      </span>
                    </label>

                    <label className="flex items-start gap-3 p-3.5 rounded-2xl bg-purple-50/60 border border-purple-200 cursor-pointer">
                      <input
                        type="checkbox"
                        name="consent_accepted"
                        checked={formData.consent_accepted}
                        onChange={handleInputChange}
                        className="mt-1 h-4 w-4 rounded text-px-primary focus:ring-px-primary"
                        required
                      />
                      <span className="text-xs text-gray-700 leading-relaxed">
                        <strong className="text-px-deep">Recruitment Processing Consent:</strong> "I consent to the processing of my application for recruitment purposes."
                      </span>
                    </label>

                    <label className="flex items-start gap-3 p-3.5 rounded-2xl bg-purple-50/60 border border-purple-200 cursor-pointer">
                      <input
                        type="checkbox"
                        name="privacy_accepted"
                        checked={formData.privacy_accepted}
                        onChange={handleInputChange}
                        className="mt-1 h-4 w-4 rounded text-px-primary focus:ring-px-primary"
                        required
                      />
                      <span className="text-xs text-gray-700 leading-relaxed">
                        <strong className="text-px-deep">Privacy Policy Agreement:</strong> "I agree to the applicable Privacy Policy."
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {/* Wizard Bottom Buttons */}
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
                    className="px-6 py-2.5 text-xs sm:text-sm"
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
                    className="px-8 py-3 text-xs sm:text-sm bg-gradient-to-r from-px-primary to-px-violet shadow-lg hover:shadow-xl"
                  >
                    {submitting ? 'Submitting Application...' : 'SUBMIT STAFF APPLICATION'}
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
