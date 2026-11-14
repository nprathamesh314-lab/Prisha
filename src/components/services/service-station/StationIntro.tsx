import React from 'react';
import { SectionHeading } from '../../common/SectionHeading';
import { CheckCircle2 } from 'lucide-react';

export const StationIntro: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Industrial Infrastructure"
          title="Preventing Highway Failures Before Wheels Roll"
          subtitle="Our commercial service hubs provide scheduled maintenance, rapid diagnostics, and mechanical overhauls to keep heavy transport trucks operating at peak performance."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-px-dark">
              Engineered for Heavy Commercial Transport
            </h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Highway breakdowns on commercial routes cause compounding losses—damaging client relationships, spoiling perishable consignments, and creating severe traffic hazards. <strong>Prisha Xpress Pvt. Ltd.</strong> operates commercial vehicle service stations specifically configured to absorb heavy line-haul maintenance demands.
            </p>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              From routine oil and filter changes in our express turnaround bays to complex engine tuning and pneumatic air brake repairs, our certified mechanical crew applies strict safety check protocols to every vehicle that enters our bays.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-sm font-bold text-px-dark">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Heavy Drive-Through Pits for Multi-Axle Trucks</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-bold text-px-dark">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Certified Technicians with Commercial Engine Expertise</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-bold text-px-dark">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Direct Ready Access to Genuine OEM Commercial Spares</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-px-deep">
              <img
                src="/assets/images/service-station.jpg"
                alt="Prisha Xpress Heavy Commercial Service Bay"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
