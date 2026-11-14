// PRISHA XPRESS PVT. LTD. - ABOUT US PAGE
// ROUTE: /about
// REDESIGNED 8-SECTION HIGH-PERFORMANCE CORPORATE PAGE

import React from 'react';
import { PageTransition } from '../components/animations/PageTransition';
import { PageHero } from '../components/common/PageHero';
import { SectionHeading } from '../components/common/SectionHeading';
import { CTASection } from '../components/common/CTASection';
import { Button } from '../components/common/Button';
import { AboutStrengthsSlider } from '../components/about/AboutStrengthsSlider';
import { AboutStatisticsSection } from '../components/about/AboutStatisticsSection';
import { companyInfo } from '../data/companyData';
import {
  Target,
  Eye,
  Building2,
  Users,
  CheckCircle2,
  MapPin,
  ShieldCheck,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <PageTransition>
      {/* SECTION 1: HERO SECTION */}
      <PageHero
        badge="About Prisha Xpress Pvt. Ltd."
        title="Empowering Your Fleet, Elevating Your Efficiency"
        subtitle="Prisha Xpress Pvt. Ltd. delivers transportation, logistics, professional driver solutions and fleet support to help businesses operate with confidence."
        image="/assets/images/hero-fleet.jpg"
        breadcrumbs={[{ label: 'About Us' }]}
      >
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button
            to="/services"
            variant="primary"
            size="md"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Explore Our Services
          </Button>
          <Button
            to="/contact#enquiry"
            variant="glass"
            size="md"
          >
            Business Enquiry
          </Button>
        </div>
      </PageHero>

      {/* SECTION 2: COMPANY OVERVIEW ("WHO WE ARE") */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Genuine Company Photograph with Location Badge */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative rounded-3xl overflow-hidden shadow-soft-purple border-4 border-white bg-px-deep aspect-[4/3] group">
                <img
                  src="/assets/images/company-team.jpg"
                  alt="Prisha Xpress Management & Fleet Operations Team"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-px-deep/75 via-transparent to-transparent" />

                {/* Headquarters Location Indicator */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-white/60 shadow-md text-xs flex justify-between items-center">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-purple-100 text-px-primary flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-px-dark">Headquarters</p>
                      <p className="text-xs text-gray-700 font-medium">Kharadi, Pune – 411014</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-px-lavender text-px-primary font-bold text-[10px] tracking-wide">
                    Pune, MH
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Concise Company Introduction */}
            <div className="lg:col-span-7 space-y-5 order-1 lg:order-2">
              <div className="space-y-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-px-primary text-xs font-bold uppercase tracking-wider border border-purple-100">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  WHO WE ARE
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-px-dark tracking-tight leading-tight">
                  Professional Fleet Solutions Built on Trust
                </h2>
              </div>

              <div className="space-y-4 text-gray-700 text-sm sm:text-base leading-relaxed">
                <p>
                  <strong>Prisha Xpress Pvt. Ltd.</strong> (CIN:{' '}
                  <span className="font-mono text-px-primary font-bold">{companyInfo.cin}</span>) is a transportation, logistics and fleet solutions company established to deliver dependable road freight, professional truck driver staffing, 3PL fleet supervision, commercial vehicle servicing and automotive spare parts support.
                </p>
                <p>
                  Headquartered in <strong>Kharadi, Pune</strong>, the company focuses on helping fleet operators, manufacturers and transport enterprises improve operational reliability through disciplined transportation operations and dedicated support.
                </p>
              </div>

              {/* Verified Metadata Quick Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-2xl bg-px-bg border border-px-border">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-px-violet">Incorporation</p>
                  <p className="text-xs font-bold text-px-dark mt-0.5">{companyInfo.founded}</p>
                </div>
                <div className="p-3 rounded-2xl bg-px-bg border border-px-border">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-px-violet">Headquarters</p>
                  <p className="text-xs font-bold text-px-dark mt-0.5">Kharadi, Pune (MH)</p>
                </div>
                <div className="p-3 rounded-2xl bg-px-bg border border-px-border col-span-2 sm:col-span-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-px-violet">Operations</p>
                  <p className="text-xs font-bold text-emerald-600 mt-0.5">Active Western Corridors</p>
                </div>
              </div>

              {/* Published Experience Audit Flag */}
              <div className="p-3.5 rounded-2xl bg-px-lavender/50 border border-purple-200/80 flex items-start gap-2.5 text-xs text-px-deep">
                <AlertCircle className="w-4 h-4 text-px-primary shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong className="font-bold">Published Experience Note:</strong> Claims of 15+ years cumulative fleet leadership across western freight corridors are flagged for formal corporate audit confirmation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: OUR MISSION & VISION */}
      <section className="py-14 lg:py-20 bg-px-bg border-t border-px-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Corporate Purpose"
            title="Our Purpose and Direction"
            subtitle="Guiding principles steering our operational execution and long-term industry partnerships."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Mission Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-px-border shadow-soft-purple/30 hover:border-px-primary/40 hover:shadow-soft-purple transition-all duration-300 space-y-4 flex flex-col justify-between">
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 text-px-primary flex items-center justify-center shadow-xs">
                    <Target className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-px-violet px-3 py-1 rounded-full bg-px-lavender/70 border border-purple-100">
                    Our Mission
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-px-dark">
                  Deliver Dependable Fleet Operations
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed font-normal">
                  To empower Indian transport enterprises with skilled commercial drivers, proactive vehicle maintenance and transparent fleet management, improving efficiency across their operations.
                </p>
              </div>

              <ul className="space-y-2.5 pt-4 border-t border-gray-100 text-xs sm:text-sm text-gray-800 font-medium">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Dignified, fair working practices for commercial drivers</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Zero-compromise on-time delivery commitments for clients</span>
                </li>
              </ul>
            </div>

            {/* Vision Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-px-border shadow-soft-purple/30 hover:border-px-primary/40 hover:shadow-soft-purple transition-all duration-300 space-y-4 flex flex-col justify-between">
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 text-px-primary flex items-center justify-center shadow-xs">
                    <Eye className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-px-violet px-3 py-1 rounded-full bg-px-lavender/70 border border-purple-100">
                    Our Vision
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-px-dark">
                  India's Most Trusted Logistics Partner
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed font-normal">
                  To become a trusted logistics and fleet management partner recognized for integrity, operational discipline, technological readiness and respect for the driver community.
                </p>
              </div>

              <ul className="space-y-2.5 pt-4 border-t border-gray-100 text-xs sm:text-sm text-gray-800 font-medium">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Integrated multi-service hubs along major national corridors</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Transparent, technology-enabled supply chain operations</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: WHY CHOOSE PRISHA XPRESS (SINGLE HORIZONTAL ANIMATED SLIDER) */}
      <AboutStrengthsSlider />

      {/* SECTION 5: OUR COMMITMENT (COMBINED COMPACT SECTION) */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Two-Way Commitment"
            title="Balancing Customer Value with Driver Welfare"
            subtitle="Reliable logistics depends on honoring commitments to both the businesses we serve and the people who keep transportation moving."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Column 1: Commitment to Customers */}
            <div className="p-6 sm:p-8 rounded-3xl bg-px-bg border border-px-border shadow-xs hover:border-px-primary/40 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 text-px-primary flex items-center justify-center shadow-xs">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-px-violet">
                      Corporate Service
                    </span>
                    <h3 className="text-xl font-bold text-px-dark">
                      Commitment to Customers
                    </h3>
                  </div>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed font-normal mb-5">
                  We partner with enterprise clients and fleet owners to deliver predictable freight movements with strict operational governance.
                </p>
              </div>

              <ul className="space-y-3 pt-4 border-t border-purple-100/60 text-xs sm:text-sm text-gray-800 font-medium">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Transparent commercial communication and clear pricing</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Planned transportation operations and strict schedule adherence</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Professional, verified driver support and safety protocol compliance</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Attention to delivery schedules and tailored business requirements</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Commitment to Drivers & Employees */}
            <div className="p-6 sm:p-8 rounded-3xl bg-px-bg border border-px-border shadow-xs hover:border-px-primary/40 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 text-px-primary flex items-center justify-center shadow-xs">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-px-violet">
                      People & Community
                    </span>
                    <h3 className="text-xl font-bold text-px-dark">
                      Commitment to Drivers & Employees
                    </h3>
                  </div>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed font-normal mb-5">
                  Commercial drivers are the backbone of our economy. We champion dignity, fair treatment, and health security on every highway journey.
                </p>
              </div>

              <ul className="space-y-3 pt-4 border-t border-purple-100/60 text-xs sm:text-sm text-gray-800 font-medium">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Respectful workplace practices and dignified highway conditions</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Fair and transparent treatment without discrimination or delays</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Driver welfare initiatives, including routine vision and health checkup camps</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Continuous opportunities for skills development and professional advancement</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: OUR IMPACT IN NUMBERS (PREMIUM STATISTICS) */}
      <AboutStatisticsSection />

      {/* SECTION 7: BUSINESS ENQUIRY CTA */}
      <CTASection
        badge="Connect with Leadership"
        title="Let's Plan Your Fleet Strategy Together"
        subtitle="Speak with our team in Kharadi, Pune to explore driver staffing, transportation, fleet management and other business solutions."
        primaryBtnText="Business Enquiry"
        primaryBtnLink="/contact#enquiry"
        secondaryBtnText="Explore Our Services"
        secondaryBtnLink="/services"
        image="/assets/images/hero-fleet.jpg"
      />

      {/* SECTION 8: PROFESSIONAL FOOTER (Rendered globally via Footer in App.tsx) */}
    </PageTransition>
  );
};
