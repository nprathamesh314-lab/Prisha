import React from 'react';
import { FadeIn } from '../../animations/FadeIn';
import { SectionHeading } from '../../common/SectionHeading';
import { Truck, ClipboardCheck, ShieldCheck, HeartHandshake, FileText, AlertTriangle } from 'lucide-react';

const driverRoles = [
  {
    icon: Truck,
    title: 'Defensive Highway Driving',
    desc: 'Adhering to strict highway speed limits, disciplined lane driving, and statutory rest intervals to prevent fatigue.',
  },
  {
    icon: ClipboardCheck,
    title: 'Pre-Trip Vehicle Inspection',
    desc: 'Checking tire pressures, air brake pressure, lights, fluid levels, and container seals before wheels roll.',
  },
  {
    icon: ShieldCheck,
    title: 'Cargo Integrity & Seal Care',
    desc: 'Ensuring tarpaulins, container locks, and temperature seals remain undisturbed throughout long-haul transit.',
  },
  {
    icon: HeartHandshake,
    title: 'Consignee Courtesy & Etiquette',
    desc: 'Maintaining polite and respectful communication at all factory gates, warehouse docks, and security checkpoints.',
  },
  {
    icon: FileText,
    title: 'Digital Proof-of-Delivery',
    desc: 'Collecting consignee signatures, recording timestamped delivery proofs, and reporting through digital dispatch apps.',
  },
  {
    icon: AlertTriangle,
    title: 'Instant Control Room Updates',
    desc: 'Promptly reporting roadside congestion, weather delays, or vehicle anomalies to our 24/7 Pune operations desk.',
  },
];

export const DriverResponsibilities: React.FC = () => {
  return (
    <section className="py-20 bg-px-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Professional Standards"
          title="Core Responsibilities of Our Commercial Drivers"
          subtitle="Our clients trust Prisha Xpress because our commercial drivers uphold high standards of road discipline, safety, and cargo care."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {driverRoles.map((role, idx) => {
            const Icon = role.icon;
            return (
              <FadeIn key={role.title} delay={idx * 0.1} direction="up">
                <div className="p-7 rounded-3xl bg-white border border-px-border shadow-soft-purple hover:shadow-card-hover transition-all duration-300 h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    {/* Circular Avatar Style Badge */}
                    <div className="w-14 h-14 rounded-full bg-px-lavender flex items-center justify-center text-px-primary shadow-sm border border-px-border">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-px-dark">{role.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {role.desc}
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
