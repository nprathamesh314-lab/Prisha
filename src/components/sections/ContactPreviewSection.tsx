import React from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  ExternalLink,
  ShieldCheck,
  Building2,
  Navigation,
} from 'lucide-react';
import { companyInfo } from '../../data/companyData';
import { SectionHeading } from '../common/SectionHeading';
import { Button } from '../common/Button';
import { FadeIn } from '../animations/FadeIn';

export const ContactPreviewSection: React.FC = () => {
  return (
    <section id="contact" className="scroll-mt-28 py-20 lg:py-28 bg-px-bg relative overflow-hidden">
      {/* Background Soft Blobs */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-px-lavender/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Verified Corporate Communication"
          title="Direct Contact & Operations Desk"
          subtitle="Reach our Pune corporate headquarters and fleet coordination team directly via phone, email, or instant WhatsApp."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-12">
          {/* Card 1: Registered & Head Office */}
          <FadeIn direction="up" delay={0.1}>
            <div className="p-7 rounded-3xl bg-white border border-px-border shadow-soft-purple hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between h-full">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-px-lavender text-px-primary">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-px-lavender text-px-primary border border-purple-200">
                    Corporate HQ
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-px-dark">{companyInfo.name}</h3>
                  <p className="text-xs text-gray-500 font-mono mt-1">CIN: {companyInfo.cin}</p>
                </div>

                <div className="space-y-3 pt-2 text-sm text-gray-600">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-px-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-px-dark text-xs uppercase tracking-wider text-gray-400">
                        Registered Location
                      </p>
                      <p className="mt-0.5 leading-relaxed text-gray-700">{companyInfo.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Navigation className="w-5 h-5 text-px-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-px-dark text-xs uppercase tracking-wider text-gray-400">
                        Operational Depots
                      </p>
                      <p className="mt-0.5 text-gray-700">Kharadi & Talegaon Dabhade Hubs, Pune</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 mt-6">
                <a
                  href="https://maps.google.com/?q=Kharadi+Pune+Maharashtra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-px-primary hover:text-px-deep transition-colors"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </FadeIn>

          {/* Card 2: Phone, Email & WhatsApp */}
          <FadeIn direction="up" delay={0.2}>
            <div className="p-7 rounded-3xl bg-white border border-px-border shadow-soft-purple hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between h-full">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-emerald-100 text-emerald-700">
                    <Phone className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Direct Channels
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-px-dark">Connect Directly</h3>
                  <p className="text-xs text-gray-500 mt-1">Official communication helplines</p>
                </div>

                <div className="space-y-3.5 pt-2">
                  {/* Phone */}
                  <a
                    href={`tel:${companyInfo.phone}`}
                    className="p-3 rounded-2xl bg-px-bg border border-px-border hover:border-px-primary flex items-center justify-between transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-white text-px-primary shadow-xs">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                          Corporate Helpline
                        </p>
                        <p className="text-sm font-bold text-px-dark group-hover:text-px-primary">
                          {companyInfo.phone}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-px-primary font-bold">Call →</span>
                  </a>

                  {/* Email */}
                  <a
                    href={`mailto:${companyInfo.email}`}
                    className="p-3 rounded-2xl bg-px-bg border border-px-border hover:border-px-primary flex items-center justify-between transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-white text-px-primary shadow-xs">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                          Official Email
                        </p>
                        <p className="text-xs sm:text-sm font-bold text-px-dark group-hover:text-px-primary truncate max-w-[160px] sm:max-w-none">
                          {companyInfo.email}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-px-primary font-bold">Mail →</span>
                  </a>

                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/917276897727?text=Hello%20Prisha%20Xpress%2C%20I%20would%20like%20to%20enquire%20about%20your%20services."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 flex items-center justify-between transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-emerald-600 text-white shadow-xs">
                        <MessageCircle className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                          Instant WhatsApp Desk
                        </p>
                        <p className="text-xs font-bold text-emerald-950">Chat with Logistics Rep</p>
                      </div>
                    </div>
                    <span className="text-xs text-emerald-700 font-bold">Chat →</span>
                  </a>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 mt-6 flex items-center gap-2 text-[11px] text-gray-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Verified corporate email domain & business phone line</span>
              </div>
            </div>
          </FadeIn>

          {/* Card 3: Operational Support Hours & Dispatch Control */}
          <FadeIn direction="up" delay={0.3}>
            <div className="p-7 rounded-3xl bg-white border border-px-border shadow-soft-purple hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between h-full">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-purple-100 text-px-primary">
                    <Clock className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-purple-50 text-px-primary border border-purple-200">
                    Operating Schedule
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-px-dark">Operational Hours</h3>
                  <p className="text-xs text-gray-500 mt-1">Corporate & active transit timings</p>
                </div>

                <div className="space-y-3 pt-2 text-xs">
                  <div className="p-3 rounded-2xl bg-px-bg border border-px-border">
                    <p className="font-bold text-px-dark text-xs">Corporate Office Hours</p>
                    <p className="text-gray-600 mt-0.5 font-medium">{companyInfo.businessHours}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">Administrative & contract discussions</p>
                  </div>

                  <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200">
                    <p className="font-bold text-emerald-900 text-xs flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      24/7 Line-Haul Fleet Monitoring
                    </p>
                    <p className="text-emerald-800 text-[11px] mt-0.5">
                      Round-the-clock emergency support for dispatched vehicles and active drivers.
                    </p>
                  </div>

                  <div className="p-3 rounded-2xl bg-px-bg border border-px-border">
                    <p className="font-bold text-px-dark text-xs">Driver Walk-In Onboarding</p>
                    <p className="text-gray-600 mt-0.5 font-medium">Monday – Friday: 10:00 AM – 5:00 PM</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">At Talegaon & Kharadi driver desks</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 mt-6">
                <Button
                  to="/contact"
                  variant="outline"
                  size="sm"
                  className="w-full justify-center"
                >
                  View Full Office Map & Directory
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
