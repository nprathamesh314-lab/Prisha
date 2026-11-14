import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Truck, Users, Compass } from 'lucide-react';

const stats = [
  {
    icon: Compass,
    value: 'Pune Hub',
    label: 'Operations Base',
    sub: 'Kharadi & Talegaon Depot',
  },
  {
    icon: Users,
    value: '100% Verified',
    label: 'Driver Cell',
    sub: 'RTO & Background Screened',
  },
  {
    icon: Truck,
    value: 'Rigids & Trailers',
    label: 'Fleet Scope',
    sub: 'Heavy Commercial Vehicles',
  },
  {
    icon: ShieldCheck,
    value: 'SLA-Driven',
    label: 'Dispatch Control',
    sub: 'Western Freight Corridors',
  },
];

export const StatsStripSection: React.FC = () => {
  return (
    <section className="relative z-20 -mt-6 sm:-mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="rounded-2xl sm:rounded-3xl bg-white border border-px-border shadow-xl p-4 sm:p-6 lg:py-5 lg:px-8"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className={`flex items-center gap-3.5 ${
                  idx > 0 ? 'pt-3 sm:pt-0 sm:pl-6' : ''
                }`}
              >
                <div className="p-2.5 sm:p-3 rounded-2xl bg-px-lavender text-px-primary shrink-0">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm sm:text-base lg:text-lg font-black text-px-dark truncate">
                    {item.value}
                  </p>
                  <p className="text-[11px] sm:text-xs font-bold text-px-violet uppercase tracking-wider">
                    {item.label}
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-gray-500 truncate hidden sm:block">
                    {item.sub}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};
