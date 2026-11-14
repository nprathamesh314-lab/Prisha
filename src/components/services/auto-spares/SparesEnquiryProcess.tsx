import React from 'react';
import { SectionHeading } from '../../common/SectionHeading';
import { FadeIn } from '../../animations/FadeIn';
import { FileSearch, CheckCircle2, Truck, ShieldCheck } from 'lucide-react';

const steps = [
  {
    step: '01',
    title: 'Share Part Number or Chassis Code',
    desc: 'Provide your OEM part number, truck make/model, or chassis code to our Pune parts desk.',
    icon: FileSearch,
  },
  {
    step: '02',
    title: 'Compatibility & Stock Verification',
    desc: 'Our parts engineers confirm genuine OEM compatibility, technical specs, and bulk fleet pricing.',
    icon: ShieldCheck,
  },
  {
    step: '03',
    title: 'Fast Dispatch to Workshop or Yard',
    desc: 'Components are packed with warranty papers and dispatched directly to your transport yard or service bay.',
    icon: Truck,
  },
];

export const SparesEnquiryProcess: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Procurement Workflow"
          title="How to Order Commercial Auto Spares"
          subtitle="A transparent, streamlined 3-step procurement flow for fleet owners, workshop managers, and commercial operators."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((st, i) => {
            const Icon = st.icon;
            return (
              <FadeIn key={st.step} delay={i * 0.12} direction="up">
                <div className="p-8 rounded-3xl bg-px-bg border border-px-border shadow-soft-purple hover:shadow-card-hover transition-all duration-300 h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-px-primary to-px-violet font-mono">
                        {st.step}
                      </span>
                      <div className="p-3 rounded-2xl bg-white shadow-sm border border-px-border text-px-primary">
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>

                    <h4 className="text-lg font-bold text-px-dark">{st.title}</h4>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {st.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-px-border/70 flex items-center gap-1.5 text-xs font-bold text-px-violet">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Step {st.step} Flow</span>
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
