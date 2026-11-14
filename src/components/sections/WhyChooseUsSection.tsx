import React from 'react';
import { motion } from 'framer-motion';
import { Users, Wrench, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { FadeIn } from '../animations/FadeIn';

const features = [
  {
    icon: Users,
    title: 'RTO-Verified Driver Cell',
    subtitle: 'Micro-Entrepreneur Pilot Network',
    desc: 'Every commercial driver undergoes strict background checks, license verification, defensive driving orientation, and receives timely electronic settlements.',
    tag: 'Screened & Trained',
  },
  {
    icon: Wrench,
    title: 'Fleet Care Ecosystem',
    subtitle: 'Integrated Service Bays & Spares',
    desc: 'Direct access to company-operated commercial maintenance stations and authentic OEM auto parts eliminates highway breakdown delays.',
    tag: 'Preventive Care',
  },
  {
    icon: ShieldCheck,
    title: 'Transparent Corporate SLAs',
    subtitle: 'Direct Commercial Billing',
    desc: 'Structured logistics service agreements, transparent per-kilometer freight pricing, GST-compliant invoicing, and assigned operations managers.',
    tag: 'Contract SLA',
  },
];

export const WhyChooseUsSection: React.FC = () => {
  return (
    <section className="py-14 lg:py-20 bg-white relative overflow-hidden">
      {/* Mesh Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#68139A_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Operational Edge"
          title="Why Logistics Leaders Partner With PXPL"
          subtitle="Built around three foundational principles that ensure predictability, safety, and efficiency."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <FadeIn key={item.title} delay={index * 0.1} direction="up">
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="p-6 rounded-3xl bg-px-bg border border-px-border hover:border-px-primary/40 hover:bg-white hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between h-full relative"
                >
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between">
                      <div className="p-3 rounded-2xl bg-px-lavender text-px-primary shadow-xs">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white text-px-primary border border-purple-200">
                        {item.tag}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg sm:text-xl font-black text-px-dark">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm font-bold text-px-primary mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>

                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-100 mt-5 flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Verified Company Principle</span>
                  </div>
                </motion.div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
};
