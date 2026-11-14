import React from 'react';
import { SectionHeading } from '../../common/SectionHeading';
import { XCircle, CheckCircle2 } from 'lucide-react';
import { FadeIn } from '../../animations/FadeIn';

export const FleetSplitInfo: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Comparative Value"
          title="Why Outsource to Prisha Xpress 3PL?"
          subtitle="A clear contrast between unmanaged commercial fleets and our structured 3PL ecosystem."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Left Column: Traditional In-House Fleets */}
          <FadeIn direction="right">
            <div className="p-8 sm:p-10 rounded-3xl bg-red-50/40 border border-red-200/60 h-full flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-red-600 font-bold text-xs uppercase tracking-wider">
                  <XCircle className="w-4 h-4" />
                  <span>Unmanaged In-House Fleet</span>
                </div>
                <h3 className="text-2xl font-extrabold text-px-dark">
                  High Downtime & Unpredictable Costs
                </h3>
                <ul className="space-y-3 text-xs sm:text-sm text-gray-700">
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                    <span>Reactive roadside repairs causing delayed customer consignments.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                    <span>Risk of counterfeit spare parts causing sudden mechanical breakdowns.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                    <span>High driver turnover, lack of background checks, and road disputes.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                    <span>Excess fuel wastage due to unmonitored idling and inefficient routes.</span>
                  </li>
                </ul>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-red-200 text-xs text-red-700 font-semibold text-center">
                High Risk • Inconsistent SLAs • Hidden Maintenance Spikes
              </div>
            </div>
          </FadeIn>

          {/* Right Column: Prisha Xpress 3PL Management */}
          <FadeIn direction="left">
            <div className="p-8 sm:p-10 rounded-3xl bg-px-bg border border-px-primary/40 shadow-soft-purple h-full flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-px-primary font-bold text-xs uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Prisha Xpress 3PL Model</span>
                </div>
                <h3 className="text-2xl font-extrabold text-px-dark">
                  Predictable SLAs & Disciplined Fleet Performance
                </h3>
                <ul className="space-y-3 text-xs sm:text-sm text-gray-700">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>Scheduled preventive maintenance bays prevent roadside breakdowns.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>100% genuine OEM replacement parts backed by manufacturer warranty.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>Over 1,000 verified commercial drivers with full trip insurance.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>Centralized Pune command center coordinating routes and turnarounds.</span>
                  </li>
                </ul>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-px-border text-xs text-px-primary font-bold text-center shadow-sm">
                Predictable Costs • Maximum Uptime • End-to-End Accountability
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
