// PRISHA XPRESS PVT. LTD. - CONTACT & BUSINESS ENQUIRY PAGE
// ROUTE: /contact
// CLEAN COMPACT TWO-COLUMN LAYOUT WITHOUT PREFERRED CONTACT METHOD
// AUTOMATIC SUPABASE DATABASE INSERTION & RESEND EMAIL NOTIFICATIONS

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageTransition } from '../components/animations/PageTransition';
import { companyInfo } from '../data/companyData';
import { businessEnquiryService } from '../services/enquiryService';
import { BusinessEnquiryServiceType } from '../types/enquiry';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
  RefreshCw,
  Sparkles,
} from 'lucide-react';

interface ContactFormState {
  fullName: string;
  companyName: string;
  phone: string;
  email: string;
  service: BusinessEnquiryServiceType;
  requirements: string;
}

const SERVICE_OPTIONS: BusinessEnquiryServiceType[] = [
  'Truck Drivers on Hire',
  'Transportation Services',
  '3PL Fleet Management',
  'Fleet Supervision',
  'Vehicle Servicing',
  'Automotive Spare Parts',
  'Other',
];

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormState>({
    fullName: '',
    companyName: '',
    phone: '',
    email: '',
    service: 'Truck Drivers on Hire',
    requirements: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormState, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedEnquiryId, setSubmittedEnquiryId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ContactFormState, string>> = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your full name.';
    }

    const cleanPhone = formData.phone.replace(/[\s-]/g, '');
    if (!cleanPhone || !/^\+?[0-9]{10,14}$/.test(cleanPhone)) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number.';
    }

    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.service) {
      newErrors.service = 'Please select a required service.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent duplicate submissions caused by repeated clicks
    if (!validate()) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const result = await businessEnquiryService.submitEnquiry({
        full_name: formData.fullName,
        company_name: formData.companyName,
        phone: formData.phone,
        email: formData.email,
        service_required: formData.service,
        requirements: formData.requirements,
      });

      if (result.success && (result.enquiryId || result.referenceId)) {
        setSubmittedEnquiryId(result.enquiryId || result.referenceId || 'PXPL-ENQ-2026');
      } else {
        setErrorMessage('Unable to submit your enquiry. Please try again.');
      }
    } catch {
      setErrorMessage('Unable to submit your enquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmittedEnquiryId(null);
    setFormData({
      fullName: '',
      companyName: '',
      phone: '',
      email: '',
      service: 'Truck Drivers on Hire',
      requirements: '',
    });
    setErrors({});
    setErrorMessage(null);
  };

  // Official contact values
  const directPhone = '+91 7276879727';
  const whatsappUrl = 'https://wa.me/917276879727?text=Hello%20Prisha%20Xpress%2C%20I%20would%20like%20to%20discuss%20a%20business%20enquiry.';
  const officialEmail = companyInfo.email || 'contact@prishaxpress.com';
  const locationText = 'Kharadi, Pune, Maharashtra.';

  return (
    <PageTransition>
      <div className="min-h-screen bg-white text-px-dark pt-28 pb-16 lg:pt-32 lg:pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* ======================================================== */}
            {/* LEFT SIDE – Contact Information                          */}
            {/* ======================================================== */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-100 text-px-primary border border-purple-200">
                  <Sparkles className="w-3.5 h-3.5" />
                  LET'S WORK TOGETHER
                </span>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-px-dark tracking-tight leading-tight mt-3">
                  Let's Discuss Your Transport Needs
                </h1>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal mt-2">
                  Looking for reliable transport, truck drivers or fleet management services? Share your requirements with us. Our team will contact you.
                </p>
              </div>

              {/* Three Simple Contact Options */}
              <div className="space-y-3.5 pt-2">
                {/* 1. Call Us */}
                <a
                  href={`tel:${directPhone.replace(/\s+/g, '')}`}
                  className="p-4 rounded-2xl bg-[#FAF8FC] border border-purple-100 hover:border-purple-300 hover:bg-purple-50/50 transition-all flex items-start gap-3.5 group shadow-2xs block"
                >
                  <div className="p-2.5 rounded-xl bg-purple-100 text-px-primary group-hover:bg-px-primary group-hover:text-white transition-colors shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-px-dark">1. Call Us</h2>
                    <p className="text-sm font-extrabold text-px-primary mt-0.5">{directPhone}</p>
                    <p className="text-xs text-gray-500 mt-0.5">Click to call.</p>
                  </div>
                </a>

                {/* 2. WhatsApp */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-[#FAF8FC] border border-emerald-100 hover:border-emerald-300 hover:bg-emerald-50/50 transition-all flex items-start gap-3.5 group shadow-2xs block"
                >
                  <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition-colors shrink-0 mt-0.5">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-px-dark">2. WhatsApp</h2>
                    <p className="text-sm font-bold text-emerald-700 mt-0.5">Chat with our team.</p>
                    <p className="text-xs text-gray-500 mt-0.5">Open the company's existing official WhatsApp number.</p>
                  </div>
                </a>

                {/* 3. Email */}
                <a
                  href={`mailto:${officialEmail}`}
                  className="p-4 rounded-2xl bg-[#FAF8FC] border border-purple-100 hover:border-purple-300 hover:bg-purple-50/50 transition-all flex items-start gap-3.5 group shadow-2xs block"
                >
                  <div className="p-2.5 rounded-xl bg-purple-100 text-px-primary group-hover:bg-px-primary group-hover:text-white transition-colors shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-px-dark">3. Email</h2>
                    <p className="text-sm font-bold text-px-dark mt-0.5">{officialEmail}</p>
                    <p className="text-xs text-gray-500 mt-0.5">Contact us using the company's verified official email address.</p>
                  </div>
                </a>
              </div>

              {/* Company Location */}
              <div className="pt-2 flex items-center gap-2.5 text-xs text-gray-600">
                <div className="p-2 rounded-lg bg-gray-100 text-gray-700 shrink-0">
                  <MapPin className="w-4 h-4 text-px-primary" />
                </div>
                <span>
                  <strong>Location: </strong> {locationText}
                </span>
              </div>
            </div>

            {/* ======================================================== */}
            {/* RIGHT SIDE – Business Enquiry Form                      */}
            {/* ======================================================== */}
            <div className="lg:col-span-7">
              <div className="p-6 sm:p-8 lg:p-10 rounded-3xl bg-white border border-purple-100 shadow-[0_4px_24px_rgba(112,47,138,0.06)]">
                
                {submittedEnquiryId ? (
                  /* Success Feedback View */
                  <div className="text-center py-8 space-y-5 animate-fadeIn">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xl sm:text-2xl font-black text-px-dark">
                        Thank you!
                      </h3>
                      <p className="text-sm sm:text-base text-gray-700 font-medium max-w-md mx-auto">
                        Your enquiry has been submitted successfully. Our team will contact you soon.
                      </p>
                    </div>

                    {/* Enquiry ID Display */}
                    <div className="p-4 rounded-xl bg-purple-50 border border-purple-200 max-w-sm mx-auto text-center space-y-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700 block">
                        Your Enquiry ID
                      </span>
                      <span className="text-xl font-black font-mono text-px-primary block select-all">
                        {submittedEnquiryId}
                      </span>
                    </div>

                    <div className="pt-4 flex flex-wrap justify-center items-center gap-3">
                      <Link
                        to="/"
                        className="px-5 py-2.5 rounded-xl bg-px-primary hover:bg-px-violet text-white text-xs sm:text-sm font-bold shadow-soft-purple transition-all inline-flex items-center gap-2"
                      >
                        <span>Back to Home</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>

                      <button
                        type="button"
                        onClick={handleReset}
                        className="px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-px-dark text-xs sm:text-sm font-bold transition-all inline-flex items-center gap-1.5"
                      >
                        <RefreshCw className="w-3.5 h-3.5 text-gray-600" />
                        <span>Submit Another Enquiry</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Form Input View */
                  <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-black text-px-dark">
                        Send a Business Enquiry
                      </h2>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1">
                        Tell us what service you need. Our team will get in touch.
                      </p>
                    </div>

                    {/* Error Banner */}
                    {errorMessage && (
                      <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-center gap-2.5">
                        <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    {/* 1. Full Name * */}
                    <div>
                      <label className="block text-xs font-bold text-px-dark mb-1">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => {
                          setFormData({ ...formData, fullName: e.target.value });
                          if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                        }}
                        placeholder="Enter your full name"
                        className={`w-full px-4 py-2.5 rounded-xl bg-white border ${
                          errors.fullName ? 'border-rose-400 focus:ring-rose-200' : 'border-gray-200 focus:border-px-primary'
                        } text-sm focus:outline-none focus:ring-2 focus:ring-px-primary/20 transition-all`}
                        disabled={isSubmitting}
                      />
                      {errors.fullName && (
                        <p className="text-[11px] text-rose-600 mt-1 font-medium">{errors.fullName}</p>
                      )}
                    </div>

                    {/* 2. Company / Business Name (Optional) */}
                    <div>
                      <label className="block text-xs font-bold text-px-dark mb-1">
                        Company / Business Name <span className="text-gray-400 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        placeholder="Enter company or fleet name"
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-200 focus:border-px-primary text-sm focus:outline-none focus:ring-2 focus:ring-px-primary/20 transition-all"
                        disabled={isSubmitting}
                      />
                    </div>

                    {/* 3 & 4. Mobile Number * & Email Address * */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-px-dark mb-1">
                          Mobile Number <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => {
                            setFormData({ ...formData, phone: e.target.value });
                            if (errors.phone) setErrors({ ...errors, phone: undefined });
                          }}
                          placeholder="10-digit mobile number"
                          className={`w-full px-4 py-2.5 rounded-xl bg-white border ${
                            errors.phone ? 'border-rose-400 focus:ring-rose-200' : 'border-gray-200 focus:border-px-primary'
                          } text-sm focus:outline-none focus:ring-2 focus:ring-px-primary/20 transition-all`}
                          disabled={isSubmitting}
                        />
                        {errors.phone && (
                          <p className="text-[11px] text-rose-600 mt-1 font-medium">{errors.phone}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-px-dark mb-1">
                          Email Address <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                            if (errors.email) setErrors({ ...errors, email: undefined });
                          }}
                          placeholder="Your email address"
                          className={`w-full px-4 py-2.5 rounded-xl bg-white border ${
                            errors.email ? 'border-rose-400 focus:ring-rose-200' : 'border-gray-200 focus:border-px-primary'
                          } text-sm focus:outline-none focus:ring-2 focus:ring-px-primary/20 transition-all`}
                          disabled={isSubmitting}
                        />
                        {errors.email && (
                          <p className="text-[11px] text-rose-600 mt-1 font-medium">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    {/* 5. Service Required * (Dropdown) */}
                    <div>
                      <label className="block text-xs font-bold text-px-dark mb-1">
                        Service Required <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) =>
                          setFormData({ ...formData, service: e.target.value as BusinessEnquiryServiceType })
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-200 focus:border-px-primary text-sm font-medium focus:outline-none focus:ring-2 focus:ring-px-primary/20 transition-all cursor-pointer"
                        disabled={isSubmitting}
                      >
                        {SERVICE_OPTIONS.map((srv) => (
                          <option key={srv} value={srv}>
                            {srv}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* 6. Requirements (Optional textarea) */}
                    <div>
                      <label className="block text-xs font-bold text-px-dark mb-1">
                        Requirements <span className="text-gray-400 font-normal">(Optional)</span>
                      </label>
                      <textarea
                        rows={3}
                        value={formData.requirements}
                        onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                        placeholder="Briefly describe your transport or fleet requirements."
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-200 focus:border-px-primary text-sm focus:outline-none focus:ring-2 focus:ring-px-primary/20 transition-all resize-y"
                        disabled={isSubmitting}
                      />
                    </div>

                    {/* 7. Submit Enquiry Button */}
                    <div className="pt-2 space-y-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 px-6 rounded-xl bg-px-primary hover:bg-px-violet text-white font-bold text-sm sm:text-base shadow-soft-purple hover:shadow-glow-purple disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin text-white" />
                            <span>Submitting Enquiry...</span>
                          </>
                        ) : (
                          <>
                            <span>Submit Enquiry</span>
                            <Send className="w-4 h-4 text-white" />
                          </>
                        )}
                      </button>

                      {/* Reassurance text below button */}
                      <p className="text-center text-xs text-gray-500 font-medium">
                        Your information is safe with us. Our team will contact you.
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
