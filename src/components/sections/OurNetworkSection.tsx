import React, { useState } from 'react';
import { Radio, ArrowRight } from 'lucide-react';
import { companyStatistics } from '../../data/companyData';
import { SectionHeading } from '../common/SectionHeading';
import { Button } from '../common/Button';
import { FadeIn } from '../animations/FadeIn';

const corridors = [
  {
    name: 'Western Industrial Hubs',
    cities: 'Pune • Mumbai • Ahmedabad • Surat • Nashik',
    desc: 'Automotive, FMCG, and heavy manufacturing logistics corridors with high-frequency fleet dispatch.',
  },
  {
    name: 'Northern Freight Network',
    cities: 'Delhi NCR • Jaipur • Chandigarh • Ludhiana',
    desc: 'Connecting northern consumption centers with rapid highway transit and round-the-clock monitoring.',
  },
  {
    name: 'Southern Commercial Belt',
    cities: 'Bengaluru • Chennai • Hyderabad • Coimbatore',
    desc: 'Dedicated electronic, retail, and tech-manufacturing freight operations with trained driver crews.',
  },
  {
    name: 'Eastern Transit Corridors',
    cities: 'Kolkata • Bhubaneswar • Raipur • Jamshedpur',
    desc: 'Heavy cargo and industrial logistics links operating across critical national highways.',
  },
];

export const OurNetworkSection: React.FC = () => {
  const [activeCorridor, setActiveCorridor] = useState(0);

  return (
    <section id="network" className="py-24 bg-px-bg relative overflow-hidden">
      {/* Decorative Subtle Background Lighting */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-px-lavender/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-purple-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Network Reach & Logistics Hubs"
          title="Connecting India's Major Freight Corridors"
          subtitle="Strategic highway routes connecting primary manufacturing hubs and distribution centers across Western, Northern, and Southern India."
        />

        {/* Network Metrics Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {companyStatistics.map((stat, idx) => (
            <FadeIn key={stat.id} delay={idx * 0.1} direction="up">
              <div className="p-5 sm:p-6 rounded-3xl bg-white border border-px-border shadow-soft-purple hover:shadow-card-hover transition-all flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                      Legacy Milestone
                    </span>
                  </div>
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-px-dark mt-2 font-mono">{stat.value}</p>
                  <p className="text-xs sm:text-sm font-bold text-px-violet mt-1">{stat.label}</p>
                  <p className="text-[11px] sm:text-xs text-gray-500 mt-1.5 leading-relaxed">{stat.description}</p>
                </div>
                <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-400">
                  <span>Audit Pending</span>
                  <span className="text-px-primary font-semibold">Ref: 2024</span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Interactive Network Visual Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Dynamic Map Image with Telematics Radar Effect */}
          <div className="lg:col-span-7">
            <FadeIn direction="right">
              <div className="relative rounded-3xl overflow-hidden border border-px-border shadow-2xl group bg-px-deep">
                <img
                  src="/assets/images/network-map.jpg"
                  alt="Prisha Xpress Pan-India Logistics Network Map"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 aspect-[16/10]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-px-deep/85 via-px-deep/20 to-transparent" />

                {/* Live Telematics Indicator Overlay */}
                <div className="absolute top-4 left-4 p-3 rounded-2xl bg-px-deep/85 backdrop-blur-md border border-white/15 flex items-center gap-3">
                  <div className="relative flex items-center justify-center">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <span className="absolute w-4 h-4 rounded-full bg-emerald-400/50 animate-ping" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-purple-200">
                      Fleet Operations Desk
                    </p>
                    <p className="text-xs font-semibold text-white">Active Corridor: {corridors[activeCorridor].name}</p>
                  </div>
                </div>

                {/* Bottom Active Corridor Snapshot Panel */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/40 text-xs text-px-dark shadow-lg space-y-1.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-extrabold text-px-deep text-sm">
                      {corridors[activeCorridor].name}
                    </span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-px-lavender text-px-primary">
                      Central Hub: Pune, MH
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 font-medium">
                    {corridors[activeCorridor].cities}
                  </p>
                  <p className="text-[11px] text-gray-500 italic">
                    *Illustrative corridor routing. Dedicated route allocation confirmed per commercial booking.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right: Interactive Freight Corridors List */}
          <div className="lg:col-span-5 space-y-3">
            <FadeIn direction="left">
              <p className="text-xs font-bold uppercase tracking-wider text-px-violet mb-1">
                Select Strategic Regional Corridor
              </p>
            </FadeIn>

            {corridors.map((c, i) => {
              const isSelected = activeCorridor === i;
              return (
                <FadeIn key={c.name} delay={i * 0.1} direction="left">
                  <div
                    tabIndex={0}
                    role="button"
                    aria-pressed={isSelected}
                    onClick={() => setActiveCorridor(i)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setActiveCorridor(i);
                      }
                    }}
                    className={`p-4 sm:p-5 rounded-2xl border cursor-pointer transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-px-primary ${
                      isSelected
                        ? 'bg-white border-px-primary shadow-soft-purple ring-2 ring-px-primary/10 translate-x-1'
                        : 'bg-white/80 border-px-border hover:border-gray-300 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm sm:text-base font-bold text-px-dark flex items-center gap-2">
                        <Radio
                          className={`w-4 h-4 shrink-0 ${
                            isSelected ? 'text-px-primary animate-pulse' : 'text-gray-400'
                          }`}
                        />
                        <span>{c.name}</span>
                      </h4>
                      {isSelected && (
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-px-lavender text-px-primary border border-purple-200">
                          Active View
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-semibold text-px-violet mt-1.5">{c.cities}</p>
                    <p className="text-[11px] sm:text-xs text-gray-600 mt-1 leading-relaxed">{c.desc}</p>
                  </div>
                </FadeIn>
              );
            })}

            <FadeIn direction="left" delay={0.4}>
              <div className="pt-2">
                <Button
                  to="/network"
                  variant="primary"
                  size="md"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Explore Detailed Network Hubs
                </Button>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};
