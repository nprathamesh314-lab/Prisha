import React from 'react';
import { Briefcase, UserCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { Button } from '../common/Button';
import { FadeIn } from '../animations/FadeIn';

export const CareersSection: React.FC = () => {
  return (
    <section id="careers" className="py-14 lg:py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Join Our Mission"
          title="Careers at Prisha Xpress"
          subtitle="Explore independent recruitment pathways for corporate logistics professionals and commercial vehicle pilots."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mt-10">
          {/* Card 1: Corporate Staff Application */}
          <FadeIn direction="right" duration={0.5}>
            <div className="group bg-px-bg rounded-3xl overflow-hidden border border-px-border shadow-soft-purple hover:shadow-card-hover hover:border-px-primary/40 transition-all duration-300 flex flex-col justify-between h-full">
              <div>
                {/* Compact Image */}
                <div className="relative h-44 sm:h-48 overflow-hidden bg-px-deep">
                  <img
                    src="/assets/images/careers-staff.jpg"
                    alt="Corporate and Operations Careers at Prisha Xpress"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-px-deep/75 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-px-primary text-white shadow-xs">
                      Corporate Staff & Ops
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 p-2 rounded-xl bg-white/95 backdrop-blur-md text-px-primary shadow-md">
                    <Briefcase className="w-5 h-5" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 space-y-3">
                  <h3 className="text-lg sm:text-xl font-bold text-px-dark group-hover:text-px-primary transition-colors">
                    Staff & Management Opportunities
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Lead dispatch operations, freight account management, supply chain analytics, and enterprise IT from our Pune headquarters.
                  </p>

                  <div className="pt-1 space-y-1.5">
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Corporate culture with structured career progression</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Exposure to telematics and logistics technology</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Button */}
              <div className="p-5 sm:p-6 pt-0">
                <Button
                  to="/careers/staff"
                  variant="primary"
                  size="md"
                  className="w-full sm:w-auto"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Apply for Corporate Roles
                </Button>
              </div>
            </div>
          </FadeIn>

          {/* Card 2: Commercial Driver Registration */}
          <FadeIn direction="left" duration={0.5}>
            <div className="group bg-px-bg rounded-3xl overflow-hidden border border-px-border shadow-soft-purple hover:shadow-card-hover hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between h-full">
              <div>
                {/* Compact Image */}
                <div className="relative h-44 sm:h-48 overflow-hidden bg-px-deep">
                  <img
                    src="/assets/images/careers-driver.jpg"
                    alt="Driver Registration with Prisha Xpress"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-px-deep/75 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-700 text-white shadow-xs">
                      Commercial Drivers
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 p-2 rounded-xl bg-white/95 backdrop-blur-md text-emerald-700 shadow-md">
                    <UserCheck className="w-5 h-5" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 space-y-3">
                  <h3 className="text-lg sm:text-xl font-bold text-px-dark group-hover:text-emerald-700 transition-colors">
                    Professional Driver Registration
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Drive commercial rigids and multi-axles as a valued micro-entrepreneur with regular dispatches, transparent earnings, and roadside safety support.
                  </p>

                  <div className="pt-1 space-y-1.5">
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Disciplined electronic settlements and transparent earnings</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Accident coverage support & dedicated highway assistance</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Button */}
              <div className="p-5 sm:p-6 pt-0">
                <Button
                  to="/careers/driver"
                  variant="secondary"
                  size="md"
                  className="w-full sm:w-auto"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Register as a Driver
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
