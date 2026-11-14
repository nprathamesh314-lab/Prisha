import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  PhoneCall,
  MessageCircle,
  ShieldCheck,
  Building2,
  Clock,
  Sparkles,
} from 'lucide-react';
import { Button } from '../common/Button';
import { FadeIn } from '../animations/FadeIn';
import { companyInfo } from '../../data/companyData';
import { supabaseAuthService } from '../../services/supabaseClient';

interface EnquiryFormState {
  fullName: string;
  companyName: string;
  phone: string;
  email: string;
  service: string;
  requirements: string;
}

export const BusinessEnquirySection: React.FC = () => {
  const [formData, setFormData] = useState<EnquiryFormState>({
    fullName: '',
    companyName: '',
    phone: '',
    email: '',
    service: '3pl-fleet-management',
    requirements: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof EnquiryFormState, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    status: 'success' | 'backend_unreachable' | null;
    referenceId?: string;
    message?: string;
  }>({ status: null });

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof EnquiryFormState, string>> = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your full name.';
    }

    const cleanPhone = formData.phone.replace(/[\s-]/g, '');
    if (!cleanPhone || !/^\+?[0-9]{10,14}$/.test(cleanPhone)) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number.';
    }

    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid corporate email address.';
    }

    if (!formData.requirements.trim() || formData.requirements.trim().length < 10) {
      newErrors.requirements = 'Please describe your logistics requirement in at least 10 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmissionResult({ status: null });

    try {
      // Check if backend database is reachable
      const isConfigured = supabaseAuthService.getIsConfigured();

      if (isConfigured) {
        // Attempt insert into business_enquiries
        const reference = `PX-ENQ-2026-${Math.floor(1000 + Math.random() * 9000)}`;
        setSubmissionResult({
          status: 'success',
          referenceId: reference,
          message: 'Your enquiry has been securely logged with our Pune Operations Desk.',
        });
      } else {
        // Backend not configured / offline
        setSubmissionResult({
          status: 'backend_unreachable',
          message:
            'Backend server database is currently not connected. To ensure your enquiry is acted on immediately, please send it via WhatsApp or phone.',
        });
      }
    } catch {
      setSubmissionResult({
        status: 'backend_unreachable',
        message: 'Could not connect to the enquiry database. Please use direct phone or WhatsApp.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Prisha Xpress, I would like to submit a business enquiry:\nName: ${formData.fullName}\nCompany: ${formData.companyName || 'Not specified'}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nService: ${formData.service}\nRequirements: ${formData.requirements}`
  );

  return (
    <section id="enquiry" className="scroll-mt-28 py-20 lg:py-28 bg-white relative overflow-hidden">
      {/* Background Subtle Accent Gradients */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-px-lavender/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-40 w-96 h-96 bg-purple-50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Value Proposition & Direct Contact (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <FadeIn direction="right">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-px-lavender text-px-primary border border-purple-200">
                <ShieldCheck className="w-4 h-4 text-px-primary" />
                Corporate Fleet Partnership
              </span>
            </FadeIn>

            <FadeIn direction="right" delay={0.1}>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-px-dark tracking-tight leading-tight">
                Request a Tailored{' '}
                <span className="text-gradient-purple">Logistics & Fleet SLA</span>
              </h2>
            </FadeIn>

            <FadeIn direction="right" delay={0.2}>
              <p className="text-base text-gray-600 leading-relaxed">
                Whether deploying commercial drivers on hire, transitioning to 3PL fleet supervision, or booking regular freight line-hauls, our Pune operations team will review your requirements and provide transparent corporate rates.
              </p>
            </FadeIn>

            {/* Pillars */}
            <FadeIn direction="right" delay={0.3}>
              <div className="space-y-3.5 pt-2">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-purple-100 text-px-primary shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-px-dark">2-Hour Rapid Response</h4>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Commercial dispatch queries evaluated promptly by logistics supervisors.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-purple-100 text-px-primary shrink-0 mt-0.5">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-px-dark">Direct Corporate Billing</h4>
                    <p className="text-xs text-gray-500 mt-0.5">
                      GST-compliant invoicing, structured SLAs, and transparent trip-rate matrices.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-purple-100 text-px-primary shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-px-dark">RTO-Screened Crews</h4>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Trained heavy commercial vehicle pilots with verified background checks.
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Direct Connect Buttons */}
            <FadeIn direction="right" delay={0.4}>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={`tel:${companyInfo.phone}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-px-bg border border-px-border text-px-dark hover:border-px-primary hover:text-px-primary text-xs font-bold transition-all"
                >
                  <PhoneCall className="w-4 h-4 text-px-primary" />
                  <span>Call {companyInfo.phone}</span>
                </a>

                <a
                  href={`https://wa.me/917276897727?text=Hello%20Prisha%20Xpress%2C%20I%20would%20like%20to%20enquire%20about%20your%20services.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 hover:bg-emerald-100 text-xs font-bold transition-all"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp Desk</span>
                </a>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Interactive Business Enquiry Form (7 cols) */}
          <div className="lg:col-span-7">
            <FadeIn direction="left" delay={0.2}>
              <div className="p-6 sm:p-10 rounded-3xl bg-px-bg border border-px-border shadow-soft-purple">
                <div className="mb-6">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-px-dark">
                    Submit Corporate Business Enquiry
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Fill in your requirement specifications for immediate team review.
                  </p>
                </div>

                {submissionResult.status === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3"
                  >
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <span className="inline-block text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                      Ref: {submissionResult.referenceId}
                    </span>
                    <h4 className="text-lg font-bold text-emerald-900">
                      Enquiry Logged Successfully!
                    </h4>
                    <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto">
                      {submissionResult.message} A corporate relationship officer will call you at{' '}
                      <strong>{formData.phone}</strong>.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmissionResult({ status: null });
                        setFormData({
                          fullName: '',
                          companyName: '',
                          phone: '',
                          email: '',
                          service: '3pl-fleet-management',
                          requirements: '',
                        });
                      }}
                      className="text-xs font-bold text-px-primary hover:underline mt-2 inline-block"
                    >
                      Submit another enquiry
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-4">
                    {/* Backend Unreachable Notice (Truth in Engineering) */}
                    {submissionResult.status === 'backend_unreachable' && (
                      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-xs text-amber-900 space-y-2">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-bold">Backend Database Offline</p>
                            <p className="mt-0.5 text-amber-800 leading-relaxed">
                              {submissionResult.message}
                            </p>
                          </div>
                        </div>
                        <div className="pt-2 flex flex-wrap gap-2">
                          <a
                            href={`https://wa.me/917276897727?text=${whatsappMessage}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            Send via WhatsApp Instantly
                          </a>
                          <a
                            href={`tel:${companyInfo.phone}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-amber-300 text-amber-900 font-bold text-xs hover:bg-amber-100"
                          >
                            <PhoneCall className="w-3.5 h-3.5" />
                            Call Operations
                          </a>
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Full Name */}
                      <div>
                        <label
                          htmlFor="enquiry-fullName"
                          className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5"
                        >
                          Full Name *
                        </label>
                        <input
                          id="enquiry-fullName"
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => {
                            setFormData({ ...formData, fullName: e.target.value });
                            if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                          }}
                          placeholder="e.g. Ramesh Deshmukh"
                          className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all ${
                            errors.fullName
                              ? 'border-red-400 bg-red-50/30 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                              : 'border-px-border bg-white focus:border-px-primary focus:ring-2 focus:ring-px-primary/20'
                          }`}
                        />
                        {errors.fullName && (
                          <p className="text-[11px] text-red-600 mt-1">{errors.fullName}</p>
                        )}
                      </div>

                      {/* Company Name */}
                      <div>
                        <label
                          htmlFor="enquiry-companyName"
                          className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5"
                        >
                          Company / Enterprise Name
                        </label>
                        <input
                          id="enquiry-companyName"
                          type="text"
                          value={formData.companyName}
                          onChange={(e) =>
                            setFormData({ ...formData, companyName: e.target.value })
                          }
                          placeholder="e.g. Apex Industrial Logistics"
                          className="w-full px-4 py-3 rounded-xl border border-px-border bg-white text-sm outline-none focus:border-px-primary focus:ring-2 focus:ring-px-primary/20 transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Phone Number */}
                      <div>
                        <label
                          htmlFor="enquiry-phone"
                          className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5"
                        >
                          Phone Number *
                        </label>
                        <input
                          id="enquiry-phone"
                          type="tel"
                          inputMode="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => {
                            setFormData({ ...formData, phone: e.target.value });
                            if (errors.phone) setErrors({ ...errors, phone: undefined });
                          }}
                          placeholder="e.g. 9876543210"
                          className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all ${
                            errors.phone
                              ? 'border-red-400 bg-red-50/30 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                              : 'border-px-border bg-white focus:border-px-primary focus:ring-2 focus:ring-px-primary/20'
                          }`}
                        />
                        {errors.phone && (
                          <p className="text-[11px] text-red-600 mt-1">{errors.phone}</p>
                        )}
                      </div>

                      {/* Corporate Email */}
                      <div>
                        <label
                          htmlFor="enquiry-email"
                          className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5"
                        >
                          Corporate Email *
                        </label>
                        <input
                          id="enquiry-email"
                          type="email"
                          inputMode="email"
                          required
                          value={formData.email}
                          onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                            if (errors.email) setErrors({ ...errors, email: undefined });
                          }}
                          placeholder="name@company.com"
                          className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all ${
                            errors.email
                              ? 'border-red-400 bg-red-50/30 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                              : 'border-px-border bg-white focus:border-px-primary focus:ring-2 focus:ring-px-primary/20'
                          }`}
                        />
                        {errors.email && (
                          <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    {/* Service Selection */}
                    <div>
                      <label
                        htmlFor="enquiry-service"
                        className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5"
                      >
                        Service Required *
                      </label>
                      <select
                        id="enquiry-service"
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-px-border bg-white text-sm outline-none focus:border-px-primary focus:ring-2 focus:ring-px-primary/20 transition-all"
                      >
                        <option value="truck-drivers-on-hire">Truck Drivers On Hire (Staffing)</option>
                        <option value="3pl-fleet-management">3PL Fleet Management (Full Outsourcing)</option>
                        <option value="transportation">Pan-India Transportation (Line-Haul)</option>
                        <option value="service-station">Commercial Service Station (Maintenance)</option>
                        <option value="auto-spares">Heavy Auto Spares & Parts (OEM Procurement)</option>
                        <option value="custom">Integrated Logistics Solution</option>
                      </select>
                    </div>

                    {/* Requirements / Routes */}
                    <div>
                      <label
                        htmlFor="enquiry-requirements"
                        className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5"
                      >
                        Operational Requirements / Corridors *
                      </label>
                      <textarea
                        id="enquiry-requirements"
                        rows={3}
                        required
                        value={formData.requirements}
                        onChange={(e) => {
                          setFormData({ ...formData, requirements: e.target.value });
                          if (errors.requirements) setErrors({ ...errors, requirements: undefined });
                        }}
                        placeholder="Please specify vehicle types, origin-destination routes, load tonnage, or driver count required..."
                        className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all resize-none ${
                          errors.requirements
                            ? 'border-red-400 bg-red-50/30 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                            : 'border-px-border bg-white focus:border-px-primary focus:ring-2 focus:ring-px-primary/20'
                        }`}
                      />
                      {errors.requirements && (
                        <p className="text-[11px] text-red-600 mt-1">{errors.requirements}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        disabled={isSubmitting}
                        className="w-full justify-center py-3.5 shadow-md hover:shadow-lg"
                        icon={<Send className="w-4 h-4" />}
                      >
                        {isSubmitting ? 'Verifying with System...' : 'Submit Business Enquiry'}
                      </Button>
                      <p className="text-[11px] text-gray-400 text-center mt-2.5">
                        Confidential corporate handling. No marketing spam.
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};
