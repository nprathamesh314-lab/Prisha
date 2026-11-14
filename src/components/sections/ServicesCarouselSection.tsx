import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Users,
  Cpu,
  Truck,
  Wrench,
  Cog,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { servicesData } from '../../data/companyData';
import { SectionHeading } from '../common/SectionHeading';

const iconMap: Record<string, React.ElementType> = {
  UserCheck: Users,
  Cpu: Cpu,
  Truck: Truck,
  Wrench: Wrench,
  Cog: Cog,
};

export const ServicesCarouselSection: React.FC = () => {
  const [startIndex, setStartIndex] = useState(0);

  // Responsive items count: 3 on desktop, 2 on tablet, 1 on mobile
  const maxIndex = servicesData.length - 1;

  const next = () => {
    setStartIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prev = () => {
    setStartIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  // Build looping slice or visible items
  const visibleServices = [
    servicesData[startIndex % servicesData.length],
    servicesData[(startIndex + 1) % servicesData.length],
    servicesData[(startIndex + 2) % servicesData.length],
  ];

  return (
    <section id="services" className="py-14 lg:py-20 bg-px-bg relative overflow-hidden">
      {/* Background Subtle Ambience */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-px-lavender/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-100/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <SectionHeading
              badge="Logistics Solutions"
              title="Our Core Service Capabilities"
              subtitle="Specialized commercial transportation, vetted driver staffing, and fleet maintenance ecosystems."
              className="mb-0 text-left"
            />
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-2.5 self-start md:self-end">
            <button
              onClick={prev}
              aria-label="Previous service"
              className="p-3 rounded-2xl bg-white border border-px-border text-px-dark hover:border-px-primary hover:text-px-primary shadow-xs transition-all active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              aria-label="Next service"
              className="p-3 rounded-2xl bg-white border border-px-border text-px-dark hover:border-px-primary hover:text-px-primary shadow-xs transition-all active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Grid */}
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={startIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {visibleServices.map((service, index) => {
                const Icon = iconMap[service.icon] || Truck;
                return (
                  <div
                    key={`${service.id}-${index}`}
                    className="group bg-white rounded-3xl overflow-hidden border border-px-border shadow-soft-purple hover:shadow-card-hover hover:border-px-primary/40 transition-all duration-300 flex flex-col justify-between h-full"
                  >
                    <div>
                      {/* Compact Image Header */}
                      <div className="relative h-44 sm:h-48 overflow-hidden bg-px-deep">
                        <img
                          src={service.image}
                          alt={service.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-px-deep/75 via-transparent to-transparent" />

                        {service.tag && (
                          <div className="absolute top-3 left-3">
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-px-primary text-white shadow-xs">
                              {service.tag}
                            </span>
                          </div>
                        )}

                        <div className="absolute bottom-3 left-3 p-2.5 rounded-xl bg-white/95 backdrop-blur-md text-px-primary shadow-md">
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 sm:p-6 space-y-2.5">
                        <span className="text-xs font-bold uppercase tracking-wider text-px-violet block">
                          {service.subtitle}
                        </span>
                        <h3 className="text-lg sm:text-xl font-bold text-px-dark group-hover:text-px-primary transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-sm text-gray-700 line-clamp-2 leading-relaxed">
                          {service.description}
                        </p>

                        {/* Top 2 Highlights */}
                        <div className="pt-2 space-y-1">
                          {service.highlights.slice(0, 2).map((hl, i) => (
                            <div key={i} className="flex items-center gap-1.5 text-xs text-gray-700">
                              <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span className="truncate font-medium">{hl}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom CTA */}
                    <div className="p-5 sm:p-6 pt-0 border-t border-gray-100/80 mt-2">
                      <Link
                        to={service.slug}
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-px-primary hover:text-px-deep transition-colors group-hover:translate-x-1 duration-200"
                      >
                        <span>Explore details</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Indicators & View All Link */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {servicesData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setStartIndex(idx)}
                aria-label={`Jump to service slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  startIndex === idx ? 'w-8 bg-px-primary' : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          <Link
            to="/services"
            className="text-xs font-bold text-px-primary hover:text-px-deep inline-flex items-center gap-1.5 transition-colors"
          >
            <span>View All 5 Services in Detail</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};
