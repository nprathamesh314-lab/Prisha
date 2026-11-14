import React from 'react';
import { SectionHeading } from '../../common/SectionHeading';
import { FadeIn } from '../../animations/FadeIn';
import { CheckCircle2, Wrench, Clock, Gauge, Activity } from 'lucide-react';

const verifiedFacilities = [
  {
    icon: Wrench,
    title: 'Heavy Vehicle Drive-Through Bays',
    spec: 'Accommodates 16 to 40+ Ton Multi-Axle Trucks',
    desc: 'Deep inspection pits and high-tonnage lifting jacks allowing complete chassis, differential, and suspension checks without uncoupling freight trailers.',
  },
  {
    icon: Gauge,
    title: 'Electronic Engine & ECU Diagnostics',
    spec: 'Advanced OBD & Common-Rail Scanning',
    desc: 'Computerized diagnostic tools reading electronic engine fault codes, fuel pump calibration, sensor data, and exhaust emission compliance.',
  },
  {
    icon: Clock,
    title: 'Express Routine Turnaround Lane',
    spec: 'Under 90 Minutes Routine Servicing',
    desc: 'Dedicated rapid lanes for engine oil flushes, air filter blow-outs, brake shoe adjustments, and fluid top-ups to get freight trucks back on the road.',
  },
  {
    icon: Activity,
    title: 'Pre-Monsoon & Summer Fitness Testing',
    spec: '45-Point Mandatory Safety Inspection',
    desc: 'Exhaustive pre-trip inspection checklist covering tire tread depth, wiper motors, air brake pressure seals, steering joints, and LED highway lighting.',
  },
];

export const StationFacilities: React.FC = () => {
  return (
    <section className="py-20 bg-px-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Verified Facilities"
          title="Industrial Service Station Infrastructure"
          subtitle="Built to industrial specifications to handle heavy commercial transport vehicles with speed and precision."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {verifiedFacilities.map((fac, idx) => {
            const Icon = fac.icon;
            return (
              <FadeIn key={fac.title} delay={idx * 0.1} direction="up">
                <div className="p-7 rounded-3xl bg-white border border-px-border shadow-soft-purple hover:shadow-card-hover transition-all duration-300 h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-3 rounded-2xl bg-px-lavender text-px-primary">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-px-lavender text-px-primary">
                        Facility
                      </span>
                    </div>

                    <div>
                      <h4 className="text-base font-bold text-px-dark">{fac.title}</h4>
                      <p className="text-xs font-semibold text-px-violet mt-1">{fac.spec}</p>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {fac.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-gray-100 flex items-center gap-1.5 text-xs font-bold text-px-violet">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Verified Infrastructure</span>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
};
