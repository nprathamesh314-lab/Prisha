import React from 'react';
import { SectionHeading } from '../../common/SectionHeading';
import { FadeIn } from '../../animations/FadeIn';
import { CheckCircle2 } from 'lucide-react';

const journeyMilestones = [
  {
    milestone: '01',
    title: 'Consignment Intake & Route Planning',
    desc: 'Intake of cargo payload details, volume patterns, delivery deadlines, and industrial corridor alignment.',
  },
  {
    milestone: '02',
    title: 'Pre-Trip Vehicle & Driver Allocation',
    desc: 'Matching roadworthy commercial trucks with verified, route-experienced drivers with pre-trip checklist sign-off.',
  },
  {
    milestone: '03',
    title: 'Dock Loading & Tamper-Proof Sealing',
    desc: 'Supervised cargo loading, container door latching, and digital seal number logging.',
  },
  {
    milestone: '04',
    title: 'Monitored Highway Transit',
    desc: 'Continuous journey tracking and checkpoint monitoring coordinated from our central Pune operations command.',
  },
  {
    milestone: '05',
    title: 'Punctual Unloading & Digital POD',
    desc: 'Consignee seal inspection, cargo unloading, and immediate digital proof of delivery sign-off.',
  },
];

export const TransportJourneyTimeline: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Highway Process"
          title="The Connected Transportation Journey"
          subtitle="Every kilometer backed by disciplined dispatch timing, checkpoint verification, and operations support."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {journeyMilestones.map((jm, i) => (
            <FadeIn key={jm.milestone} delay={i * 0.1} direction="up">
              <div className="p-6 rounded-3xl bg-px-bg border border-px-border h-full flex flex-col justify-between relative">
                <div>
                  <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-px-primary to-px-violet font-mono">
                    {jm.milestone}
                  </span>
                  <h4 className="text-sm font-bold text-px-dark mt-3">{jm.title}</h4>
                  <p className="text-xs text-gray-600 mt-2 leading-relaxed">{jm.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-px-border/70 flex items-center gap-1.5 text-[11px] font-bold text-px-violet">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Milestone {jm.milestone}</span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
