import React, { useState } from 'react';
import { SectionHeading } from '../../common/SectionHeading';
import { ShieldCheck, ChevronRight, Activity, Wrench, Fuel, BarChart3 } from 'lucide-react';

const workflowStages = [
  {
    id: 'stage-1',
    num: '01',
    name: 'Fleet Audit & Baselines',
    subtitle: 'Diagnostic Evaluation',
    icon: BarChart3,
    details: 'Initial mechanical inspection of all vehicles, reviewing past breakdown frequencies, tire states, and statutory fitness paperwork.',
    deliverable: 'Complete Fleet Health Scorecard & Asset Maintenance Schedule',
  },
  {
    id: 'stage-2',
    num: '02',
    name: 'Driver & Route Pairing',
    subtitle: 'Resource Assignment',
    icon: Activity,
    details: 'Assigning vetted, highway-experienced commercial drivers to specific freight corridors and commercial payload categories.',
    deliverable: 'Background-Verified Driver Crews & Route Orientation Briefings',
  },
  {
    id: 'stage-3',
    num: '03',
    name: 'Scheduled Preventive Servicing',
    subtitle: 'Maintenance Cycle',
    icon: Wrench,
    details: 'Vehicles enter dedicated Prisha Xpress service stations at scheduled intervals for oil changes, brake adjustments, and diagnostic checks.',
    deliverable: 'Pre-Trip Roadworthiness Certificate & Genuine OEM Part Warranty',
  },
  {
    id: 'stage-4',
    num: '04',
    name: 'Active Transit & Fuel Optimization',
    subtitle: 'Operational Excellence',
    icon: Fuel,
    details: 'Central Pune operations room coordinates route milestones, highway alerts, and driver turnarounds to curb unnecessary idle fuel consumption.',
    deliverable: 'Reduced Total Cost of Operation & Zero En-Route Breakdowns',
  },
];

export const FleetInteractiveWorkflow: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const activeStage = workflowStages[selectedIdx];

  return (
    <section className="py-20 bg-px-deep text-white relative overflow-hidden">
      {/* Background Subtle Tech Line Elements */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          theme="dark"
          badge="Operational Process"
          title="Interactive 3PL Fleet Management Workflow"
          subtitle="Click through each stage to explore how we coordinate vehicle care, driver assignments, and transit optimization."
        />

        {/* Step Selector Ribbon with Connecting Lines */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {workflowStages.map((st, i) => {
            const isSelected = selectedIdx === i;
            const Icon = st.icon;
            return (
              <div
                key={st.id}
                onClick={() => setSelectedIdx(i)}
                className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 relative ${
                  isSelected
                    ? 'bg-white/20 border-purple-300 shadow-glow-purple scale-[1.02]'
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-black font-mono text-purple-200">
                    {st.num}
                  </span>
                  <div className={`p-2 rounded-xl ${isSelected ? 'bg-px-primary text-white' : 'bg-white/10 text-purple-200'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <h4 className="text-sm font-bold text-white">{st.name}</h4>
                <p className="text-[11px] text-purple-200 mt-1">{st.subtitle}</p>

                {isSelected && (
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-purple-300 rotate-45 hidden lg:block" />
                )}
              </div>
            );
          })}
        </div>

        {/* Active Stage Detail Panel */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-purple-500/30 text-purple-200 border border-purple-400/30">
                  Stage {activeStage.num}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {activeStage.name}
                </h3>
              </div>

              <p className="text-sm sm:text-base text-gray-200 leading-relaxed">
                {activeStage.details}
              </p>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3 text-xs text-purple-200">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>
                  <strong className="text-white">Measurable Deliverable:</strong>{' '}
                  {activeStage.deliverable}
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 text-center lg:text-right">
              <button
                onClick={() => setSelectedIdx((selectedIdx + 1) % workflowStages.length)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-px-deep font-bold text-xs sm:text-sm hover:bg-px-lavender transition-all shadow-md"
              >
                <span>Next Stage</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
