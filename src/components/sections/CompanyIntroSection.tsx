import React from 'react';
import { ArrowRight, CheckCircle2, Shield, Award, Users, MapPin } from 'lucide-react';
import { Button } from '../common/Button';
import { FadeIn } from '../animations/FadeIn';
import { companyInfo } from '../../data/companyData';

export const CompanyIntroSection: React.FC = () => {
  return (
    <section id="company-intro" className="py-14 lg:py-20 bg-white relative overflow-hidden">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-1/2 -left-40 w-96 h-96 bg-px-lavender/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-50/50 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Image with Decorative Floating Badges */}
          <div className="lg:col-span-6 relative">
            <FadeIn direction="right" duration={0.6}>
              <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white">
                <img
                  src="/assets/images/company-team.jpg"
                  alt="Prisha Xpress Logistics & Fleet Operations Team"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700 aspect-[4/3]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-px-deep/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-3 rounded-2xl bg-white/90 backdrop-blur-md border border-white/40 shadow-lg text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-px-primary shrink-0" />
                    <div>
                      <p className="font-bold text-px-dark">Headquarters</p>
                      <p className="text-gray-500 text-[11px] sm:text-xs">{companyInfo.headquarters}</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full font-bold bg-px-lavender text-px-primary text-[10px] sm:text-[11px]">
                    Pune, MH
                  </span>
                </div>
              </div>
            </FadeIn>

            {/* Floating Operations Hub Badge */}
            <div className="absolute -bottom-3 left-2 sm:bottom-4 sm:-left-4 bg-px-deep text-white p-3 sm:p-4 rounded-2xl shadow-xl border border-white/20 max-w-[190px] sm:max-w-[210px] z-20">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="p-2 rounded-xl bg-px-primary text-white">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm sm:text-base font-black leading-tight">Pune Hub</p>
                  <p className="text-[10px] sm:text-xs text-purple-200 font-medium mt-0.5">Western Corridors</p>
                </div>
              </div>
            </div>

            {/* Floating Driver Verification Badge */}
            <div className="absolute -top-3 right-2 sm:-top-4 sm:right-2 bg-white text-px-dark p-3 rounded-2xl shadow-card-hover border border-px-border max-w-[170px] sm:max-w-[190px] z-20">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-px-dark">Driver Cell</p>
                  <p className="text-[10px] sm:text-[11px] text-gray-500">Trained & RTO Verified</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Introduction & Verified Activities */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-5">
            <FadeIn direction="left" duration={0.6}>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-px-lavender text-px-primary border border-purple-200">
                <Shield className="w-3.5 h-3.5 text-px-primary" />
                About Prisha Xpress
              </span>
            </FadeIn>

            <FadeIn direction="left" delay={0.1} duration={0.6}>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-px-dark tracking-tight leading-tight">
                Pioneering Next-Gen Transportation &{' '}
                <span className="text-gradient-purple">Fleet Infrastructure</span>
              </h2>
            </FadeIn>

            <FadeIn direction="left" delay={0.2} duration={0.6}>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                <strong>Prisha Xpress Pvt. Ltd. (PXPL)</strong> is an Indian corporate logistics enterprise headquartered in Pune. We bridge critical operational gaps in the supply chain by delivering structured commercial driver staffing, 3PL fleet supervision, dedicated maintenance hubs, and line-haul transit across western routes.
              </p>
            </FadeIn>

            <FadeIn direction="left" delay={0.3} duration={0.6}>
              <div className="space-y-2.5 pt-1">
                <div className="flex items-start gap-2.5">
                  <div className="p-1 rounded-full bg-px-lavender text-px-primary mt-0.5 shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-px-dark">Micro-Entrepreneur Driver Model</h4>
                    <p className="text-xs text-gray-500">
                      RTO-verified commercial pilots with safety training and disciplined electronic trip settlements.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="p-1 rounded-full bg-px-lavender text-px-primary mt-0.5 shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-px-dark">3PL Fleet & Asset Supervision</h4>
                    <p className="text-xs text-gray-500">
                      Eliminating idle times with dedicated dispatch control, telematics coordination, and scheduled maintenance.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="p-1 rounded-full bg-px-lavender text-px-primary mt-0.5 shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-px-dark">Integrated Service Stations & Spares</h4>
                    <p className="text-xs text-gray-500">
                      Commercial vehicle workshop bays and OEM replacement parts to keep enterprise fleets highway-ready.
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="left" delay={0.4} duration={0.6}>
              <div className="pt-2 flex items-center gap-3">
                <Button
                  to="/about"
                  variant="primary"
                  size="md"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Read Company Profile
                </Button>
                <Button
                  to="/network"
                  variant="outline"
                  size="md"
                >
                  Our Network
                </Button>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};
