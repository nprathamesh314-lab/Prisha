import React from 'react';
import { ArrowRight, UserCheck, PhoneCall } from 'lucide-react';
import { Button } from '../../common/Button';
import { FadeIn } from '../../animations/FadeIn';
import { companyInfo } from '../../../data/companyData';

export const DriverCTA: React.FC = () => {
  return (
    <section className="py-20 bg-px-deep text-white relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/images/company-team.jpg"
          alt="Prisha Xpress Logistics & Driver Team"
          className="w-full h-full object-cover object-[70%_center] md:object-center filter brightness-90 contrast-105"
        />
        {/* Desktop directional gradient */}
        <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-px-deep/88 via-px-deep/60 to-px-primary/30" />
        {/* Mobile vertical gradient */}
        <div className="sm:hidden absolute inset-0 bg-gradient-to-b from-px-deep/92 via-px-deep/60 to-px-deep/30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(164,75,192,0.25)_0%,transparent_60%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Card 1: For Enterprise Clients Hiring Drivers */}
          <FadeIn direction="right">
            <div className="p-8 sm:p-10 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl h-full flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-200">
                  For Fleets & Shippers
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Hire Vetted Commercial Drivers
                </h3>
                <p className="text-sm text-gray-200 leading-relaxed">
                  Eliminate fleet idle time. Deploy background-verified, insured commercial drivers for long-haul routes or dedicated local fleet operations.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Button
                  to="/contact?service=truck-drivers-on-hire"
                  variant="white"
                  size="md"
                  icon={<ArrowRight className="w-4 h-4 text-px-primary" />}
                >
                  Request Driver Staffing
                </Button>
                <a
                  href={`tel:${companyInfo.phone}`}
                  className="inline-flex items-center gap-2 text-xs font-bold text-purple-200 hover:text-white"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Call {companyInfo.phone}</span>
                </a>
              </div>
            </div>
          </FadeIn>

          {/* Card 2: For Commercial Drivers Seeking Registration */}
          <FadeIn direction="left">
            <div className="p-8 sm:p-10 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl h-full flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                  For Commercial Drivers
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Join Our Verified Driver Network
                </h3>
                <p className="text-sm text-gray-200 leading-relaxed">
                  Drive with pride. Get steady trip assignments, timely automated bank settlements, personal accident insurance coverage, and safety recognition.
                </p>
              </div>

              <div className="pt-2">
                <Button
                  to="/careers?type=driver"
                  variant="secondary"
                  size="md"
                  icon={<UserCheck className="w-4 h-4" />}
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
