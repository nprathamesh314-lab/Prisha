import React from 'react';
import { SectionHeading } from '../../common/SectionHeading';
import { FadeIn } from '../../animations/FadeIn';
import { Gauge, Wrench, Settings, Activity, Flame, Sparkles } from 'lucide-react';

const mechanicalServices = [
  {
    icon: Gauge,
    title: 'Diagnostic Engine Scanning',
    desc: 'Fault code analysis, injector pulse profiling, common-rail pressure checks, and turbocharger boost diagnostics for heavy diesel engines.',
  },
  {
    icon: Wrench,
    title: 'Dual-Circuit Air Brakes',
    desc: 'Pneumatic air line leak tests, brake drum lathing, brake chamber diaphragm replacements, and ABS sensor calibration.',
  },
  {
    icon: Settings,
    title: 'Chassis, Axle & Leaf Springs',
    desc: 'High-tensile leaf spring bundle repair, center bolt replacements, king pin greasing, and laser-guided heavy axle alignment.',
  },
  {
    icon: Activity,
    title: 'Heavy Lube & Fluid Care',
    desc: 'Scheduled diesel engine oil flushes, synthetic transmission fluid refills, differential oil changes, and wheel bearing pack greasing.',
  },
  {
    icon: Flame,
    title: 'Clutch & Transmission Repair',
    desc: 'Heavy commercial clutch plate and pressure plate replacements, release bearing adjustments, and gearbox linkage tuning.',
  },
  {
    icon: Sparkles,
    title: 'High-Power Highway Electricals',
    desc: 'High-output alternator overhauls, commercial battery testing, wiring harness rewiring, and highway LED safety lamp upgrades.',
  },
];

export const StationServiceCategories: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Mechanical Categories"
          title="Verified Workshop Technical Capabilities"
          subtitle="Targeted mechanical and diagnostic services executed by certified heavy commercial diesel technicians."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mechanicalServices.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <FadeIn key={cat.title} delay={idx * 0.1} direction="up">
                <div className="p-8 rounded-3xl bg-px-bg border border-px-border shadow-soft-purple hover:shadow-card-hover transition-all duration-300 h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="p-3.5 rounded-2xl bg-white text-px-primary w-fit shadow-sm border border-px-border">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-px-dark">{cat.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {cat.desc}
                    </p>
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
