import React from 'react';
import { Briefcase, UserCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { Button } from '../common/Button';
import { FadeIn } from '../animations/FadeIn';

export const CareersSection: React.FC = () => {
  return (
    <section id="careers" className="py-24 bg-px-bg relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-px-lavender rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-100 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Join Prisha Xpress"
          title="Build Your Career With India's Growing Logistics Leader"
          subtitle="Whether you are an ambitious corporate logistics professional or an experienced commercial heavy vehicle driver, Prisha Xpress offers respect, growth, and security."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Card 1: Staff Application */}
          <FadeIn direction="right" duration={0.6}>
            <div className="group bg-white rounded-3xl overflow-hidden border border-px-border shadow-soft-purple hover:shadow-card-hover transition-all duration-500 flex flex-col h-full">
              {/* Image Section */}
              <div className="relative h-64 sm:h-72 overflow-hidden bg-px-deep">
                <img
                  src="/assets/images/careers-staff.jpg"
                  alt="Corporate and Operations Careers at Prisha Xpress"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-px-deep/80 via-px-deep/30 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-px-primary text-white shadow-md">
                    Corporate & Operations
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 p-3 rounded-2xl bg-white/90 backdrop-blur-md text-px-primary shadow-lg">
                  <Briefcase className="w-6 h-6" />
                </div>
              </div>

              {/* Content Section */}
              <div className="p-7 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <h3 className="text-2xl font-extrabold text-px-dark group-hover:text-px-primary transition-colors">
                    Staff & Management Opportunities
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Join our Pune headquarters and regional control rooms. We are
                    looking for proactive leaders in fleet coordination, operations
                    management, client relationship, supply chain analytics, and technology development.
                  </p>

                  <div className="space-y-2 pt-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Corporate office culture with merit-based career progression</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Exposure to cutting-edge AI telematics & enterprise ERPs</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Competitive compensation and professional healthcare benefits</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    to="/careers/staff-application"
                    variant="primary"
                    size="md"
                    className="w-full sm:w-auto"
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    Apply for Corporate Roles
                  </Button>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Card 2: Driver Registration */}
          <FadeIn direction="left" duration={0.6}>
            <div className="group bg-white rounded-3xl overflow-hidden border border-px-border shadow-soft-purple hover:shadow-card-hover transition-all duration-500 flex flex-col h-full">
              {/* Image Section */}
              <div className="relative h-64 sm:h-72 overflow-hidden bg-px-deep">
                <img
                  src="/assets/images/careers-driver.jpg"
                  alt="Driver Registration with Prisha Xpress"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-px-deep/80 via-px-deep/30 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-700 text-white shadow-md">
                    Commercial Drivers
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 p-3 rounded-2xl bg-white/90 backdrop-blur-md text-px-primary shadow-lg">
                  <UserCheck className="w-6 h-6" />
                </div>
              </div>

              {/* Content Section */}
              <div className="p-7 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <h3 className="text-2xl font-extrabold text-px-dark group-hover:text-px-primary transition-colors">
                    Professional Driver Registration
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Drive with pride and dignity. We treat our commercial drivers as
                    valued micro-entrepreneurs, providing steady trip assignments, timely
                    automated payouts, safety training, and personal insurance support.
                  </p>

                  <div className="space-y-2 pt-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Disciplined electronic trip settlements and transparent earnings</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Personal accident coverage & medical trip insurance support</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Safe, well-maintained commercial vehicles and highway roadside assistance</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    to="/careers/driver-registration"
                    variant="secondary"
                    size="md"
                    className="w-full sm:w-auto"
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    Register as a Driver
                  </Button>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
