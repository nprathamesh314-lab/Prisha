import React from 'react';
import { FadeIn } from '../../animations/FadeIn';
import { SectionHeading } from '../../common/SectionHeading';
import { Activity, Wrench, Fuel, Layers, CheckCircle2 } from 'lucide-react';

const telemetryPanels = [
  {
    icon: Activity,
    title: 'Asset Uptime & Dispatch Control',
    metric: 'Max Uptime',
    metricLabel: 'SLA Commitment',
    desc: 'Centralized coordination matching available trailers with ready freight consignments, minimizing terminal waiting times.',
  },
  {
    icon: Wrench,
    title: 'Preventive Health Diagnostics',
    metric: '3,000 km',
    metricLabel: 'Inspection Interval',
    desc: 'Regular multi-point diagnostic checks covering pneumatic brake lines, leaf springs, steering assemblies, and engine vitals.',
  },
  {
    icon: Fuel,
    title: 'Fuel Economy & Idle Control',
    metric: '12-15%',
    metricLabel: 'Operational Efficiency',
    desc: 'Defensive driving coaching, route guidance, and tire pressure maintenance to eliminate excess diesel consumption.',
  },
  {
    icon: Layers,
    title: 'Complete Lifecycle Management',
    metric: '360°',
    metricLabel: 'Fleet Coverage',
    desc: 'Integrated drivers, preventive mechanical bays, and OEM spare part replacements under one corporate contract.',
  },
];

export const FleetTelemetryDashboard: React.FC = () => {
  return (
    <section className="py-20 bg-px-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Operational Dashboard"
          title="Telemetry & Fleet Management Capabilities"
          subtitle="Designed to give fleet owners and shippers total transparency and predictable operating expenditures."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {telemetryPanels.map((panel, idx) => {
            const Icon = panel.icon;
            return (
              <FadeIn key={panel.title} delay={idx * 0.1} direction="up">
                <div className="p-7 rounded-3xl bg-white border border-px-border shadow-soft-purple hover:shadow-card-hover transition-all duration-300 h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-3 rounded-2xl bg-px-lavender text-px-primary">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-black text-px-deep font-mono block">
                          {panel.metric}
                        </span>
                        <span className="text-[10px] uppercase font-bold text-gray-500">
                          {panel.metricLabel}
                        </span>
                      </div>
                    </div>

                    <h4 className="text-base font-bold text-px-dark">{panel.title}</h4>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {panel.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-gray-100 flex items-center gap-1.5 text-xs font-bold text-px-violet">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Verified Capability</span>
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
