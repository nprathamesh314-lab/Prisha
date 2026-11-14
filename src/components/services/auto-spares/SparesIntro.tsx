import React from 'react';
import { SectionHeading } from '../../common/SectionHeading';
import { CheckCircle2 } from 'lucide-react';

export const SparesIntro: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Authentic Components"
          title="Eliminating Counterfeit Risks from Fleet Operations"
          subtitle="Substandard commercial vehicle parts cause catastrophic engine seizures and dangerous highway brake failures. Prisha Xpress supplies only 100% genuine OEM components."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-px-dark">
              Engineered for Heavy Mileage Durability
            </h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              When commercial trucks log hundreds of kilometers daily on interstate freight corridors, every mechanical component is subjected to severe thermal and mechanical stresses. Sourcing cheap, unverified replica parts drastically increases the likelihood of sudden roadside breakdowns.
            </p>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              <strong>Prisha Xpress Pvt. Ltd.</strong> maintains direct supply partnerships with certified original equipment manufacturers. We verify part serials, batch codes, and dimensional tolerances, guaranteeing optimal fitment and long service life.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-sm font-bold text-px-dark">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>100% Certified OEM Heavy Commercial Spare Parts</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-bold text-px-dark">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Ready Stock of Critical Highway Replacement Components</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-bold text-px-dark">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Fitment Available at Prisha Xpress Service Station Bays</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-px-deep">
              <img
                src="/assets/images/service-station.jpg"
                alt="Prisha Xpress Auto Spares Workshop"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
