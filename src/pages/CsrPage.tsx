// PRISHA XPRESS PVT. LTD. - DRIVER CARE & HIGHWAY SUPPORT (CSR)
// ROUTE: /csr
// SIMPLIFIED NATURAL INDIAN ENGLISH WITH AUTHENTIC CSR PHOTOGRAPHS

import React from 'react';
import { PageTransition } from '../components/animations/PageTransition';
import { PageHero } from '../components/common/PageHero';
import { SectionHeading } from '../components/common/SectionHeading';
import { FadeIn } from '../components/animations/FadeIn';
import { CTASection } from '../components/common/CTASection';
import { authenticCsrInitiatives } from '../data/companyData';
import {
  Eye,
  GraduationCap,
  Award,
  HeartHandshake,
  Coffee,
  CheckCircle2,
  BadgeDollarSign,
  AlertCircle,
  ShieldCheck,
} from 'lucide-react';

const CSR_ICONS: Record<number, React.ElementType> = {
  1: Eye,
  2: GraduationCap,
  3: Award,
  4: HeartHandshake,
  5: Coffee,
  6: BadgeDollarSign,
};

export const CsrPage: React.FC = () => {
  return (
    <PageTransition>
      {/* SECTION 1: HERO */}
      <PageHero
        badge="CARING FOR OUR DRIVERS"
        title="Driver Care & Highway Support"
        subtitle="We care about our truck drivers and their families. We want to support drivers by focusing on their health, safety and daily needs. Our aim is to make their journeys safer and their lives better."
        image="/assets/images/csr-welfare.jpg"
        breadcrumbs={[{ label: 'CSR' }]}
      />

      {/* SECTION 2: INTRODUCTION & TRANSPARENCY */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="SUPPORTING OUR DRIVERS"
            title="Our Promise to Support and Respect Every Driver"
            subtitle="Truck drivers keep goods moving across India. At Prisha Xpress Pvt. Ltd., we stand with our drivers to support their health, safety and families."
          />

          <div className="max-w-4xl mx-auto text-center space-y-4">
            <p className="text-base text-gray-700 leading-relaxed">
              At <strong>Prisha Xpress Pvt. Ltd.</strong>, we believe good transport service starts with the person behind the wheel. We focus on six practical areas: free eye checkups, school support for children, road safety training, respect at work, safe rest stops on highways, and on-time payments.
            </p>
            <div className="inline-flex items-center gap-2 p-3 rounded-2xl bg-purple-50 border border-purple-200 text-xs text-px-deep text-left">
              <AlertCircle className="w-4 h-4 text-px-primary shrink-0" />
              <span>
                <strong>Clear Information:</strong> We share genuine information about our active programs and ongoing support for drivers on the ground.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE 6 AUTHENTIC CSR THEMES (WITH REAL PHOTOGRAPHS) */}
      <section className="py-16 sm:py-20 bg-px-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="OUR 6 KEY INITIATIVES"
            title="Six Ways We Support Our Drivers"
            subtitle="Practical on-ground programs created by Prisha Xpress to support truck drivers and their families on and off the road."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {authenticCsrInitiatives.map((item, idx) => {
              const Icon = CSR_ICONS[item.themeNumber] || ShieldCheck;
              const isActive = item.operationalStatus.includes('Active');

              return (
                <FadeIn key={item.id} delay={idx * 0.1} direction="up">
                  <div className="rounded-3xl bg-white border border-px-border shadow-soft-purple hover:shadow-card-hover transition-all duration-300 h-full flex flex-col justify-between overflow-hidden group">
                    <div>
                      {/* Top Real Photograph */}
                      <div className="relative h-56 sm:h-60 w-full overflow-hidden bg-gray-100">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        {/* Gradient Shadow Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent pointer-events-none" />

                        {/* Top Badges (Theme Number & Status) */}
                        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                          <span className="text-[11px] font-black tracking-wider text-white bg-black/55 backdrop-blur-md px-3 py-1 rounded-full shadow-sm border border-white/20">
                            Theme {item.themeNumber}
                          </span>
                          <span
                            className={`text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm backdrop-blur-md ${
                              isActive
                                ? 'bg-emerald-600/90 text-white border border-emerald-400'
                                : 'bg-purple-800/90 text-white border border-purple-400'
                            }`}
                          >
                            {item.operationalStatus}
                          </span>
                        </div>

                        {/* Floating Icon Badge on Image */}
                        <div className="absolute bottom-3 left-4 p-2.5 rounded-2xl bg-white text-px-primary shadow-md flex items-center gap-2">
                          <Icon className="w-5 h-5 text-px-primary" />
                          <span className="text-[11px] font-extrabold uppercase tracking-wide text-px-deep">
                            {item.category}
                          </span>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-6 sm:p-7 space-y-3.5">
                        <h3 className="text-xl font-black text-px-dark group-hover:text-px-primary transition-colors leading-snug">
                          {item.title}
                        </h3>

                        {/* Description */}
                        <p className="text-sm text-gray-700 leading-relaxed font-normal">
                          {item.description}
                        </p>

                        {/* Key Activities */}
                        <div className="pt-4 border-t border-gray-100 space-y-2">
                          <p className="text-xs font-bold uppercase tracking-wider text-px-violet">
                            Key Activities:
                          </p>
                          {item.keyActivities.map((act, aIdx) => (
                            <div key={aIdx} className="flex items-start gap-2 text-xs sm:text-sm text-gray-800 font-medium">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{act}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 4: STATUTORY COMMITMENT NOTE */}
      <section className="py-16 bg-white border-t border-px-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 rounded-3xl bg-px-lavender/40 border border-purple-200 text-center space-y-3">
            <h3 className="text-xl font-bold text-px-deep">
              Working Together for Highway Safety Across Maharashtra
            </h3>
            <p className="text-sm text-gray-700 max-w-3xl mx-auto leading-relaxed font-normal">
              Prisha Xpress Pvt. Ltd. works directly with drivers and transport groups in Pune and Maharashtra. We want every initiative to provide real, helpful support that drivers and their families can count on every day.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 5: CTA */}
      <CTASection
        badge="PARTNER WITH US"
        title="Join Hands for Safe Transport & Driver Care"
        subtitle="Work with Prisha Xpress for honest, reliable transport services that take care of goods, vehicles and drivers."
        primaryBtnText="Talk to Our Team"
        primaryBtnLink="/contact"
        secondaryBtnText="Register as a Driver"
        secondaryBtnLink="/careers/driver"
      />
    </PageTransition>
  );
};
