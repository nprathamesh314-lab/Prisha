// PRISHA XPRESS PVT. LTD. - WHY CHOOSE PRISHA XPRESS SECTION
// 6 VERIFIED PILLARS FROM MASTER SPECIFICATION

import React from 'react';
import {
  ShieldCheck,
  Users,
  FileCheck,
  HeartHandshake,
  Layers,
  Cpu,
} from 'lucide-react';
import { whyChooseData } from '../../data/companyData';
import { SectionHeading } from '../common/SectionHeading';
import { FadeIn } from '../animations/FadeIn';

const ICON_MAP: Record<string, React.ElementType> = {
  ShieldCheck: ShieldCheck,
  Users: Users,
  FileCheck: FileCheck,
  HeartHandshake: HeartHandshake,
  Layers: Layers,
  Cpu: Cpu,
};

export const WhyChooseUsSection: React.FC = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Mesh Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#68139A_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.04]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Core Principles"
          title="Why Choose Prisha Xpress?"
          subtitle="Built around six operational pillars that deliver reliability, transparency, and efficiency to Indian commercial fleets."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyChooseData.map((item, index) => {
            const Icon = ICON_MAP[item.icon] || ShieldCheck;
            return (
              <FadeIn key={item.id} delay={index * 0.1} direction="up">
                <div className="group p-8 rounded-3xl bg-px-bg border border-px-border hover:border-px-primary/40 hover:bg-white hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between h-full relative overflow-hidden">
                  {/* Subtle Corner Glow on Hover */}
                  <div className="absolute -right-12 -top-12 w-28 h-28 bg-px-lavender rounded-full group-hover:scale-150 transition-transform duration-500 opacity-60 pointer-events-none" />

                  <div className="space-y-4 relative z-10">
                    <div className="p-3.5 rounded-2xl bg-px-lavender text-px-primary group-hover:bg-px-primary group-hover:text-white transition-colors duration-300 shadow-sm inline-block">
                      <Icon className="w-6 h-6" />
                    </div>

                    <h3 className="text-xl font-bold text-px-dark group-hover:text-px-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-px-border/60 flex items-center justify-between text-xs text-px-violet font-semibold">
                    <span>Verified Operational Pillar</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-px-primary group-hover:scale-150 transition-transform" />
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
