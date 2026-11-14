import React from 'react';
import { FadeIn } from '../../animations/FadeIn';
import { SectionHeading } from '../../common/SectionHeading';
import { CheckCircle2, FileText, UserCheck, ShieldCheck, Award } from 'lucide-react';

const journeySteps = [
  {
    step: '01',
    title: 'Requirement Consultation',
    desc: 'Enterprise clients share route corridors, vehicle classes (HMV/LMV-TR), load types, and deployment durations.',
    icon: FileText,
  },
  {
    step: '02',
    title: 'Driver Matching & Verification',
    desc: 'Matching vetted drivers experienced on specific state highway terrains, verified through national databases.',
    icon: UserCheck,
  },
  {
    step: '03',
    title: 'Safety & Route Briefing',
    desc: 'Drivers receive pre-trip safety briefs, consignee handover guidelines, and cargo security instructions.',
    icon: ShieldCheck,
  },
  {
    step: '04',
    title: 'Fleet Deployment & Control Room Support',
    desc: 'Driver arrives at client pickup dock on time, supported by 24/7 central tracking from our Pune headquarters.',
    icon: Award,
  },
];

export const DriverHiringJourney: React.FC = () => {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Deployment Flow"
          title="The Driver Hiring & Onboarding Journey"
          subtitle="A structured, compliant process that guarantees roadworthy commercial crews for your high-priority freight."
        />

        <div className="relative">
          {/* Connecting Line for Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-1 bg-gradient-to-r from-px-primary via-px-violet to-px-lavender -translate-y-6 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {journeySteps.map((st, i) => {
              const Icon = st.icon;
              return (
                <FadeIn key={st.step} delay={i * 0.12} direction="up">
                  <div className="p-7 rounded-3xl bg-px-bg border border-px-border shadow-soft-purple hover:shadow-card-hover transition-all duration-300 h-full flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-px-primary to-px-violet font-mono">
                          {st.step}
                        </span>
                        <div className="p-3 rounded-2xl bg-white shadow-sm border border-px-border text-px-primary">
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>
                      <h4 className="text-base font-bold text-px-dark">{st.title}</h4>
                      <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                        {st.desc}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-px-border/80 flex items-center gap-1.5 text-xs font-bold text-px-violet">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Milestone {st.step}</span>
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
