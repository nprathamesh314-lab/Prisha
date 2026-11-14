import React from 'react';
import { motion } from 'framer-motion';
import {
  FileSpreadsheet,
  Truck,
  Navigation,
  CheckCircle2,
} from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { FadeIn } from '../animations/FadeIn';

const steps = [
  {
    step: '01',
    icon: FileSpreadsheet,
    title: 'Consignment & Route Planning',
    desc: 'Load specification, destination corridor mapping, and committed SLA scheduling.',
  },
  {
    step: '02',
    icon: Truck,
    title: 'Driver Allocation & Inspection',
    desc: 'Matching vetted commercial pilots and completing pre-trip multi-point vehicle checks.',
  },
  {
    step: '03',
    icon: Navigation,
    title: 'Line-Haul Highway Transit',
    desc: 'Continuous dispatch monitoring, transit checkpoint logging, and driver welfare support.',
  },
  {
    step: '04',
    icon: CheckCircle2,
    title: 'Delivery & Digital POD',
    desc: 'On-time consignee handover, electronic signature verification, and transparent billing.',
  },
];

export const WorkflowTimelineSection: React.FC = () => {
  return (
    <section id="workflow" className="py-14 lg:py-20 bg-px-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Operational Process"
          title="Transportation Execution Timeline"
          subtitle="A disciplined four-stage pipeline ensuring predictability and cargo security on every trip."
        />

        {/* Desktop Horizontal Timeline (>= 1024px) */}
        <div className="hidden lg:block relative mt-12">
          {/* Animated Continuous Progress Track */}
          <div className="absolute top-1/2 left-16 right-16 h-1 bg-purple-200/80 -translate-y-8 rounded-full overflow-hidden z-0">
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: 'easeInOut',
              }}
              className="w-1/3 h-full bg-gradient-to-r from-transparent via-px-primary to-transparent"
            />
          </div>

          <div className="grid grid-cols-4 gap-6 relative z-10">
            {steps.map((item, idx) => {
              const Icon = item.icon;
              return (
                <FadeIn key={item.step} delay={idx * 0.15} direction="up">
                  <div className="p-6 rounded-3xl bg-white border border-px-border shadow-soft-purple hover:shadow-card-hover hover:border-px-primary/40 transition-all flex flex-col justify-between h-full group">
                    <div>
                      {/* Step Header */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-black font-mono text-px-primary group-hover:text-px-violet transition-colors">
                          {item.step}
                        </span>
                        <div className="p-2.5 rounded-xl bg-px-lavender text-px-primary group-hover:bg-px-primary group-hover:text-white transition-colors duration-300">
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>

                      <h3 className="text-base font-bold text-px-dark group-hover:text-px-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-1.5 text-[11px] font-bold text-px-violet">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Standard Operating Procedure</span>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>

        {/* Mobile & Tablet Compact Vertical Timeline (< 1024px) */}
        <div className="lg:hidden mt-8 space-y-4 relative">
          <div className="absolute top-4 bottom-4 left-6 w-0.5 bg-purple-200 z-0" />

          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <FadeIn key={item.step} delay={idx * 0.1} direction="up">
                <div className="relative z-10 flex items-start gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-px-border shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-px-primary text-white flex items-center justify-center font-mono font-bold text-xs shrink-0 shadow-sm">
                    {item.step}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-sm font-bold text-px-dark">
                        {item.title}
                      </h4>
                      <Icon className="w-4 h-4 text-px-violet shrink-0" />
                    </div>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                      {item.desc}
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
