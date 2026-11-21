import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Users, Truck, Clock } from 'lucide-react';

interface HighlightItem {
  icon: React.ComponentType<{ className?: string }>;
  heading: string;
  subtitle: string;
}

const highlights: HighlightItem[] = [
  {
    icon: Compass,
    heading: 'Pan-India Operations',
    subtitle: 'Serving Businesses Across India',
  },
  {
    icon: Users,
    heading: 'Verified Drivers',
    subtitle: 'RTO and Background Verified',
  },
  {
    icon: Truck,
    heading: 'Complete Fleet Solutions',
    subtitle: 'Trucks, Trailers and Heavy Vehicles',
  },
  {
    icon: Clock,
    heading: 'On-Time Delivery',
    subtitle: 'Reliable and Timely Transportation',
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 lg:divide-x divide-gray-100">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.heading}
                className={`flex items-center gap-3.5 ${
                  idx > 0 ? 'pt-3.5 sm:pt-0 lg:pl-6' : ''
                }`}
              >
                <div className="p-2.5 sm:p-3 rounded-2xl bg-px-lavender text-px-primary shrink-0 shadow-xs">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-base font-extrabold text-px-dark leading-snug">
                    {item.heading}
                  </h3>
                  <p className="text-xs text-gray-500 font-medium leading-snug mt-0.5">
                    {item.subtitle}
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
