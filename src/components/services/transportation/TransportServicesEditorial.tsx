import React from 'react';
import { SectionHeading } from '../../common/SectionHeading';
import { FadeIn } from '../../animations/FadeIn';
import { Truck, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '../../common/Button';

const transportCategories = [
  {
    title: 'Full Truckload (FTL) Line-Haul',
    tag: 'Enterprise Point-to-Point',
    desc: 'Dedicated commercial vehicles dispatched directly from factory gates to central distribution hubs without intermediate cross-dock delays.',
    specs: ['Direct factory-to-hub transit', 'Containerized & sealed trailers', 'Single-consignor payload integrity'],
  },
  {
    title: 'Scheduled Regional Freight',
    tag: 'Next-Day Industrial Corridors',
    desc: 'High-frequency line-hauls connecting Pune and Maharashtra industrial clusters to Gujarat, Delhi NCR, and Karnataka commercial belts.',
    specs: ['Daily scheduled departures', 'Next-day delivery corridors', 'Flexible pallet and bulk capacities'],
  },
  {
    title: 'Industrial Heavy & Multi-Axle Hauling',
    tag: 'Heavy Machinery & Materials',
    desc: 'Specialized heavy vehicle operations for automotive parts, steel, machinery, and FMCG manufacturing consignments.',
    specs: ['Multi-axle trailer capability', 'Heavy payload weight balance', 'Corridor clearance compliance'],
  },
];

export const TransportServicesEditorial: React.FC = () => {
  return (
    <section className="py-20 bg-px-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Freight Offerings"
          title="Transportation Service Categories"
          subtitle="Configured to handle varied payload dimensions, commercial volumes, and delivery turnaround requirements."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {transportCategories.map((cat, idx) => (
            <FadeIn key={cat.title} delay={idx * 0.12} direction="up">
              <div className="p-8 rounded-3xl bg-white border border-px-border shadow-soft-purple hover:shadow-card-hover transition-all duration-300 h-full flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-2xl bg-px-lavender text-px-primary">
                      <Truck className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-px-lavender text-px-primary">
                      {cat.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-px-dark">{cat.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {cat.desc}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-gray-100">
                    {cat.specs.map((sp, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{sp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6">
                  <Button
                    to="/contact?service=transportation"
                    variant="outline"
                    size="sm"
                    className="w-full"
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    Book This Freight Route
                  </Button>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
