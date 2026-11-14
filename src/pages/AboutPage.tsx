// PRISHA XPRESS PVT. LTD. - ABOUT US PAGE
// ROUTE: /about
// ACCURATE POSITIONING & OFFICIAL COMPANY BACKGROUND

import React from 'react';
import { PageTransition } from '../components/animations/PageTransition';
import { PageHero } from '../components/common/PageHero';
import { SectionHeading } from '../components/common/SectionHeading';
import { CTASection } from '../components/common/CTASection';
import { companyInfo, whyChooseData } from '../data/companyData';
import {
  ShieldCheck,
  Target,
  Eye,
  Users,
  CheckCircle2,
  Building2,
  AlertCircle,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <PageTransition>
      {/* SECTION 1: HERO */}
      <PageHero
        badge="About Prisha Xpress Pvt. Ltd."
        title="Empowering Your Fleet, Elevating Your Efficiency"
        subtitle="A corporate transportation, fleet management, and driver solutions enterprise headquartered in Pune, committed to operational reliability and driver welfare."
        image="/assets/images/corporate-hq.jpg"
        breadcrumbs={[{ label: 'About Us' }]}
      />

      {/* SECTION 2: COMPANY INTRODUCTION & BACKGROUND */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Corporate Background"
            title="Professional Fleet Solutions Built on Trust"
            subtitle="Founded to bridge the gap between enterprise supply chain demands and reliable highway logistics execution."
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-5 text-gray-700 text-sm sm:text-base leading-relaxed">
              <p>
                <strong>PRISHA XPRESS PVT. LTD.</strong> (CIN: <span className="font-mono text-px-primary font-bold">{companyInfo.cin}</span>) is a transportation, logistics, and fleet solutions company established to deliver dependable road freight, professional truck driver staffing, 3PL fleet supervision, commercial vehicle servicing, and automotive spare parts support.
              </p>
              <p>
                Headquartered in <strong>Kharadi, Pune</strong>, Prisha Xpress operates with the core purpose of <em>“Empowering Your Fleet, Elevating Your Efficiency”</em>. We enable fleet operators, manufacturers, and transport enterprises to eliminate transit unpredictability by pairing disciplined highway operations with vetted commercial drivers and dedicated support.
              </p>

              {/* Experience note */}
              <div className="p-4 rounded-2xl bg-px-lavender/60 border border-purple-200 flex items-start gap-3 text-xs text-px-deep">
                <AlertCircle className="w-5 h-5 text-px-primary shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold">Published Leadership Experience:</strong> The company draws upon a published claim of <strong>15+ years of cumulative industry leadership</strong> across western freight corridors and fleet mechanics (subject to formal company audit confirmation).
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="/assets/images/company-team.jpg"
                  alt="Prisha Xpress Management & Fleet Operations"
                  className="w-full h-auto object-cover aspect-[4/3]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-px-deep/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/50 text-xs flex justify-between items-center">
                  <div>
                    <p className="font-bold text-px-dark">Headquarters</p>
                    <p className="text-gray-500">{companyInfo.address}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-px-lavender text-px-primary font-bold text-[10px]">
                    Pune, MH
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: MISSION & VISION */}
      <section className="py-20 bg-px-bg border-t border-px-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-px-border shadow-soft-purple space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-px-primary flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-px-violet">Our Mission</span>
              <h3 className="text-2xl font-black text-px-dark">Deliver Dependable Fleet Operations</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                To empower Indian transport enterprises with verified, skilled commercial drivers, proactive vehicle maintenance, and transparent fleet management, elevating efficiency across every highway kilometer.
              </p>
              <ul className="space-y-2 pt-2 border-t border-gray-100 text-xs text-gray-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Dignified, fair working practices for commercial drivers</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Zero-compromise on-time delivery commitments for clients</span>
                </li>
              </ul>
            </div>

            {/* Vision */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-px-border shadow-soft-purple space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-px-primary flex items-center justify-center">
                <Eye className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-px-violet">Our Vision</span>
              <h3 className="text-2xl font-black text-px-dark">India's Most Trusted Logistics Partner</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                To become the benchmark logistics and fleet management partner recognized for integrity, operational discipline, and technological readiness, while driving lasting social respect for the driver community.
              </p>
              <ul className="space-y-2 pt-2 border-t border-gray-100 text-xs text-gray-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Integrated multi-service hubs along major national corridors</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Transparent, technology-enabled supply chain operations</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: COMMITMENT TO CUSTOMERS & DRIVERS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Two-Way Commitment"
            title="Balancing Customer Value with Driver Welfare"
            subtitle="Sustainable logistics requires honoring commitments to both the enterprises we serve and the captains who drive our trucks."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-px-bg border border-px-border space-y-4">
              <div className="p-3 rounded-2xl bg-purple-100 text-px-primary inline-block">
                <Building2 className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-px-dark">Commitment to Customers</h4>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                We commit to honest pricing, scheduled dispatch, trained driver personnel, and transparent communication. We tailor our transport planning to your specific volume and safety requirements.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-px-bg border border-px-border space-y-4">
              <div className="p-3 rounded-2xl bg-purple-100 text-px-primary inline-block">
                <Users className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-px-dark">Commitment to Drivers & Employees</h4>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                We commit to dignified workplace treatment, on-time payment settlements, free health & eye screenings, safe highway pit stops, and equal opportunity professional growth without prejudice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: WHY CHOOSE PRISHA XPRESS (6 CORE STRENGTHS) */}
      <section className="py-20 bg-px-bg border-t border-px-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Verified Value"
            title="Why Businesses Work with Prisha Xpress"
            subtitle="The 6 operational pillars that distinguish our transportation and fleet support services."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseData.map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-3xl bg-white border border-px-border shadow-xs hover:border-px-primary/40 transition-all space-y-3"
              >
                <div className="p-3 rounded-2xl bg-px-lavender text-px-primary inline-block">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-px-dark text-lg">{item.title}</h4>
                <p className="text-xs text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: CTA */}
      <CTASection
        badge="Connect with Leadership"
        title="Let's Plan Your Fleet Strategy Together"
        subtitle="Speak directly with our logistics team in Kharadi, Pune to explore driver staffing, transportation, or fleet management."
        primaryBtnText="Business Enquiry"
        primaryBtnLink="/contact"
        secondaryBtnText="View Services"
        secondaryBtnLink="/services"
      />
    </PageTransition>
  );
};
