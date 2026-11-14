import React from 'react';
import { motion } from 'framer-motion';
import {
  FileSpreadsheet,
  Truck,
  Navigation,
  CheckCircle2,
} from 'lucide-react';
import { processSteps } from '../../data/companyData';
import { SectionHeading } from '../common/SectionHeading';
import { FadeIn } from '../animations/FadeIn';

const iconMap: Record<string, React.ElementType> = {
  FileSpreadsheet: FileSpreadsheet,
  Truck: Truck,
  Navigation: Navigation,
  CheckCircle2: CheckCircle2,
};

export const HowWeWorkSection: React.FC = () => {
  return (
    <section id="workflow" className="py-20 lg:py-28 bg-white relative overflow-hidden">
      {/* Mesh Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-50/40 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Seamless Operational Workflow"
          title="How We Execute Precision Transportation"
          subtitle="From initial route design to on-time digital handover, every milestone is backed by technology and experienced logistics supervisors."
        />

        {/* Process Steps Cards */}
        <div className="relative mt-12">
          {/* Animated Horizontal Connecting Line for Desktop */}
          <div className="hidden lg:block absolute top-[72px] left-16 right-16 h-1 bg-purple-100 z-0 rounded-full overflow-hidden">
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{
                repeat: Infinity,
                duration: 3.2,
                ease: 'easeInOut',
              }}
              className="w-1/2 h-full bg-gradient-to-r from-transparent via-px-primary to-transparent"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative z-10">
            {processSteps.map((step, idx) => {
              const Icon = iconMap[step.icon] || Truck;
              return (
                <FadeIn key={step.step} delay={idx * 0.12} direction="up">
                  <div className="group bg-white p-6 sm:p-7 rounded-3xl border border-px-border shadow-soft-purple hover:shadow-card-hover hover:border-px-primary/50 transition-all duration-300 flex flex-col justify-between h-full relative">
                    {/* Top Row: Number Tag and Icon */}
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-px-primary to-px-violet font-mono">
                          {step.step}
                        </span>
                        <div className="p-3 rounded-2xl bg-px-lavender text-px-primary group-hover:bg-px-primary group-hover:text-white transition-colors duration-300 shadow-sm">
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>

                      {/* Title & Description */}
                      <h3 className="text-base sm:text-lg font-bold text-px-dark group-hover:text-px-primary transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 mt-2.5 leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    {/* Key Highlights */}
                    <div className="mt-6 pt-4 border-t border-gray-100 space-y-2">
                      {step.keyPoints.map((point, pIdx) => (
                        <div
                          key={pIdx}
                          className="flex items-center gap-2 text-xs font-semibold text-gray-700"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-px-primary shrink-0" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
