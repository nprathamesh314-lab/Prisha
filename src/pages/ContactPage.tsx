// PRISHA XPRESS PVT. LTD. - CONTACT US PAGE
// ROUTE: /contact
// VERIFIED COMPANY CONTACT DETAILS & BUSINESS ENQUIRY WORKFLOW

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PageTransition } from '../components/animations/PageTransition';
import { companyInfo } from '../data/companyData';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Send,
  CheckCircle2,
  Clock,
  Building2,
  HelpCircle,
} from 'lucide-react';
import { Button } from '../components/common/Button';

export const ContactPage: React.FC = () => {
  const location = useLocation();
  const [formType, setFormType] = useState<'business' | 'customer'>('business');
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: 'Truck Drivers On Hire',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (location.hash === '#enquiry') {
      const el = document.getElementById('enquiry-form');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <PageTransition>
      {/* Banner */}
      <section className="relative pt-32 pb-16 lg:pt-36 lg:pb-20 text-white overflow-hidden bg-px-deep flex items-center justify-center min-h-[440px]">
        {/* Background Corporate HQ Image - Natural Daylight */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/images/contact-hq.jpg"
            alt="Prisha Xpress Corporate Headquarters & Facility"
            className="w-full h-full object-cover object-[75%_center] md:object-center filter brightness-100 contrast-100"
          />
          {/* Soft Ambient Directional Support Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-px-deep/65 via-transparent to-px-deep/40 hidden md:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-px-deep/75 via-transparent to-px-deep/35 md:hidden" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center w-full py-6">
          <div className="p-6 sm:p-10 rounded-3xl bg-px-deep/80 backdrop-blur-md border border-white/20 shadow-2xl space-y-4">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold uppercase tracking-wider text-purple-200 border border-white/20">
              Official Corporate Connect
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Contact Prisha Xpress Pvt. Ltd.
            </h1>
            <p className="text-sm sm:text-base text-gray-100 max-w-2xl mx-auto font-medium leading-relaxed">
              Headquartered in Kharadi, Pune. Speak with our team for commercial driver staffing, 3PL fleet operations, transportation planning, or workshop servicing.
            </p>
          </div>
        </div>
      </section>

      {/* Main Section */}
      <section className="py-20 bg-px-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Contact Details Card (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-8 rounded-3xl bg-white border border-px-border shadow-soft-purple space-y-6">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-px-violet">
                    Corporate Office
                  </span>
                  <h2 className="text-2xl font-black text-px-dark mt-0.5">
                    {companyInfo.name}
                  </h2>
                  <p className="text-xs text-gray-500 font-mono mt-1">CIN: {companyInfo.cin}</p>
                </div>

                <div className="space-y-4 pt-2">
                  {/* Address */}
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-xl bg-px-lavender text-px-primary shrink-0 mt-0.5">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase">Registered Location</p>
                      <p className="text-sm font-semibold text-px-dark mt-0.5">
                        {companyInfo.address}
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-xl bg-px-lavender text-px-primary shrink-0 mt-0.5">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase">Direct Official Helpline</p>
                      <a
                        href={`tel:${companyInfo.phone}`}
                        className="text-sm font-bold text-px-primary hover:underline block mt-0.5"
                      >
                        {companyInfo.phone}
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-xl bg-px-lavender text-px-primary shrink-0 mt-0.5">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase">Official Email</p>
                      <a
                        href={`mailto:${companyInfo.email}`}
                        className="text-sm font-bold text-px-primary hover:underline block mt-0.5"
                      >
                        {companyInfo.email}
                      </a>
                    </div>
                  </div>

                  {/* Business Hours */}
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-xl bg-px-lavender text-px-primary shrink-0 mt-0.5">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase">Published Business Hours</p>
                      <p className="text-sm font-semibold text-px-dark mt-0.5">
                        {companyInfo.businessHours}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Customer support and driver desk active during standard operating hours.
                      </p>
                    </div>
                  </div>
                </div>

                {/* WhatsApp Direct Integration */}
                <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-emerald-600 text-white shrink-0">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-emerald-900">Direct WhatsApp Enquiry</p>
                      <p className="text-[11px] text-emerald-700">Connect instantly on +91 7276897727</p>
                    </div>
                  </div>
                  <a
                    href="https://wa.me/917276897727?text=Hello%20Prisha%20Xpress%2C%20I%20would%20like%20to%20enquire%20about%20your%20services."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs inline-flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span>Message WhatsApp</span>
                    <Send className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Google Maps Location Preview Card */}
                <div className="p-4 rounded-2xl bg-px-bg border border-px-border space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-px-dark">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-px-primary" />
                      Kharadi, Pune – 411014 Location
                    </span>
                    <span className="text-[10px] text-gray-400 font-normal">Maharashtra</span>
                  </div>
                  <div className="h-44 rounded-xl overflow-hidden border border-gray-200 relative bg-gray-100 flex items-center justify-center text-center p-4">
                    <iframe
                      title="Prisha Xpress Office Location Map"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60505.74836647184!2d73.91689438038755!3d18.552945203716654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c3c1db92c3a5%3A0x6e9f187a552e6754!2sKharadi%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                      className="w-full h-full border-0 absolute inset-0"
                      allowFullScreen={false}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                  <p className="text-[11px] text-gray-500 italic text-center">
                    Exact premises pin provided upon confirmed meeting appointment.
                  </p>
                </div>
              </div>
            </div>

            {/* Form Section (7 cols) */}
            <div id="enquiry-form" className="lg:col-span-7">
              <div className="p-8 sm:p-12 rounded-3xl bg-white border border-px-border shadow-soft-purple space-y-6">
                {/* Form Tabs: Business Enquiry vs Customer Support */}
                <div className="flex p-1.5 rounded-2xl bg-px-bg border border-px-border max-w-sm">
                  <button
                    type="button"
                    onClick={() => {
                      setFormType('business');
                      setSubmitted(false);
                    }}
                    className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      formType === 'business'
                        ? 'bg-px-primary text-white shadow-xs'
                        : 'text-gray-600 hover:text-px-primary'
                    }`}
                  >
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Business Enquiry</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setFormType('customer');
                      setSubmitted(false);
                    }}
                    className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      formType === 'customer'
                        ? 'bg-px-primary text-white shadow-xs'
                        : 'text-gray-600 hover:text-px-primary'
                    }`}
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Customer Contact</span>
                  </button>
                </div>

                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-px-dark">
                    {formType === 'business'
                      ? 'Discuss Transportation & Fleet Requirements'
                      : 'Customer & Partner Assistance Desk'}
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    {formType === 'business'
                      ? 'Submit your commercial transport, driver hiring, or 3PL fleet parameters for a formal proposal.'
                      : 'Reach our team for active consignment inquiries, driver verification support, or billing questions.'}
                  </p>
                </div>

                {submitted ? (
                  <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3 animate-fadeIn">
                    <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                    <h3 className="text-lg font-bold text-emerald-900">Enquiry Received Successfully!</h3>
                    <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto">
                      Thank you for contacting Prisha Xpress Pvt. Ltd. Our team will review your {formData.service} inquiry and contact you during business hours (9:30 AM – 6:00 PM).
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-xs font-bold text-px-primary underline mt-2 inline-block"
                    >
                      Submit another enquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Full Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Anand Kulkarni"
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-px-primary"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Company / Fleet Name {formType === 'business' && <span className="text-rose-500">*</span>}
                        </label>
                        <input
                          type="text"
                          required={formType === 'business'}
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="e.g. ABC Manufacturing / Individual"
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-px-primary"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Mobile / Phone Number <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98765 00000"
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-px-primary"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Official Email Address <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="contact@company.com"
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-px-primary"
                        />
                      </div>
                    </div>

                    {/* Service Selection */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Service of Interest <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-px-primary bg-white"
                      >
                        <option value="Truck Drivers On Hire">Truck Drivers On Hire</option>
                        <option value="3PL Fleet Management">3PL Fleet Management</option>
                        <option value="Transportation">Transportation & Road Freight</option>
                        <option value="Service Station">Commercial Service Station</option>
                        <option value="Auto Spares">Auto Spares Enquiry</option>
                        <option value="General Corporate Query">General Corporate Query</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Requirement Details <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Please describe your route requirements, fleet specifications, vehicle models, or required driver headcount..."
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-px-primary resize-none"
                      />
                    </div>

                    <div className="pt-2">
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        className="w-full justify-center py-3.5 text-xs sm:text-sm"
                        icon={<Send className="w-4 h-4" />}
                      >
                        {formType === 'business' ? 'Submit Business Enquiry' : 'Send Message'}
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};
