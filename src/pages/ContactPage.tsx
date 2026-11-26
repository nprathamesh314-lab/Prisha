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
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
  RefreshCw,
  Sparkles,
} from 'lucide-react';

// Official Social Media Channels Data
const socialLinks = [
  {
    name: 'X (Twitter)',
    url: 'https://x.com/prishaxpress',
    hoverClass: 'hover:bg-black hover:border-black hover:text-white',
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/people/Prisha-Xpress-Pvt-Ltd/100089768081375/',
    hoverClass: 'hover:bg-[#1877F2] hover:border-[#1877F2] hover:text-white',
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/prishaxpress/',
    hoverClass:
      'hover:bg-gradient-to-tr hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF] hover:border-transparent hover:text-white',
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/company/prisha-xpress-pvt-ltd/posts/?viewAsMember=true',
    hoverClass: 'hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:text-white',
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
];

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
  const directPhone = '+91 7276897727';
  const whatsappUrl = 'https://wa.me/917276897727';
  const officialEmail = companyInfo.email || 'info@prishaxpress.com';

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
                  Find the Right Transport Solution for Your Business
                </h1>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal mt-2">
                  Tell us about your transport or fleet requirements. Our team will review your needs and contact you to discuss a suitable solution.
                </p>
              </div>

              {/* Simple Contact Information Rows */}
              <div className="pt-4 border-t border-purple-100 space-y-4">
                <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-purple-700">
                  CONTACT INFORMATION
                </h2>

                <div className="space-y-4">
                  {/* Row 1: Office Address */}
                  <a
                    href="https://maps.google.com/?q=Kharadi,+Pune+-+411014,+Maharashtra,+India"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3.5 group text-left transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 text-px-primary flex items-center justify-center shrink-0 group-hover:bg-purple-100 group-hover:border-purple-200 transition-colors">
                      <MapPin className="w-5 h-5 text-px-primary" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                        OFFICE ADDRESS
                      </span>
                      <span className="text-sm sm:text-base font-semibold text-px-dark group-hover:text-px-primary transition-colors leading-snug">
                        Kharadi, Pune – 411014, Maharashtra, India
                      </span>
                    </div>
                  </a>

                  {/* Row 2: Phone */}
                  <div className="flex items-start gap-3.5 group text-left">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 text-px-primary flex items-center justify-center shrink-0 group-hover:bg-purple-100 group-hover:border-purple-200 transition-colors">
                      <Phone className="w-5 h-5 text-px-primary" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                        PHONE
                      </span>
                      <a
                        href={`tel:${directPhone.replace(/\s+/g, '')}`}
                        className="text-sm sm:text-base font-semibold text-px-dark hover:text-px-primary transition-colors leading-snug inline-block"
                      >
                        {directPhone}
                      </a>
                    </div>
                  </div>

                  {/* Row 3: WhatsApp */}
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3.5 group text-left transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-100 group-hover:border-emerald-200 transition-colors">
                      <svg className="w-5 h-5 fill-current text-emerald-600" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12.031 2C6.495 2 2 6.495 2 12.031c0 1.954.56 3.778 1.528 5.32L2 22l4.802-1.505a9.986 9.986 0 005.229 1.536c5.536 0 10.031-4.495 10.031-10.031C22.062 6.495 17.567 2 12.031 2zm0 18.286c-1.637 0-3.176-.469-4.49-1.282l-.322-.2-3.328 1.043 1.066-3.235-.219-.348a8.214 8.214 0 01-1.265-4.433c0-4.57 3.717-8.287 8.287-8.287 4.57 0 8.287 3.717 8.287 8.287 0 4.57-3.717 8.286-8.287 8.286zm4.542-6.196c-.249-.125-1.472-.726-1.7-.809-.228-.083-.394-.125-.56.125-.166.249-.643.809-.788.975-.145.166-.29.187-.539.062s-1.05-.387-2.001-1.235c-.74-.66-1.24-1.475-1.385-1.724-.145-.249-.015-.383.109-.507.112-.112.249-.29.373-.435.125-.145.166-.249.249-.415.083-.166.041-.311-.021-.435-.062-.125-.56-1.349-.768-1.847-.202-.485-.408-.419-.56-.427l-.477-.008c-.166 0-.435.062-.663.311-.228.249-.871.851-.871 2.075 0 1.224.892 2.407 1.016 2.573.125.166 1.755 2.68 4.252 3.757.594.256 1.058.409 1.42.524.597.19 1.14.163 1.569.099.479-.071 1.472-.602 1.68-1.183.207-.581.207-1.079.145-1.183-.062-.104-.228-.166-.477-.291z" />
                      </svg>
                    </div>
                    <div>
                      <span className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                        WHATSAPP
                      </span>
                      <span className="text-sm sm:text-base font-semibold text-px-dark group-hover:text-emerald-600 transition-colors leading-snug">
                        Chat with us on WhatsApp
                      </span>
                    </div>
                  </a>

                  {/* Row 4: Email */}
                  <a
                    href={`mailto:${officialEmail}`}
                    className="flex items-start gap-3.5 group text-left transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 text-px-primary flex items-center justify-center shrink-0 group-hover:bg-purple-100 group-hover:border-purple-200 transition-colors">
                      <Mail className="w-5 h-5 text-px-primary" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                        EMAIL
                      </span>
                      <span className="text-sm sm:text-base font-semibold text-px-dark group-hover:text-px-primary transition-colors leading-snug">
                        {officialEmail}
                      </span>
                    </div>
                  </a>
                </div>
              </div>

              {/* FOLLOW US */}
              <div className="pt-2 space-y-3">
                <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-purple-700">
                  FOLLOW US
                </h2>
                <div className="flex items-center gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Follow Prisha Xpress on ${social.name}`}
                      className={`w-11 h-11 rounded-xl bg-white border border-gray-200 text-gray-700 shadow-xs hover:-translate-y-1 hover:shadow-md transition-all duration-200 flex items-center justify-center ${social.hoverClass}`}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
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
