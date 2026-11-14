import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';

interface GalleryItem {
  id: number;
  image: string;
  title: string;
  category: string;
  description: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    image: '/assets/images/hero-fleet.jpg',
    title: 'Heavy Commercial Highway Fleet',
    category: 'Commercial Vehicles',
    description: 'Rigids and multi-axle freight carriers dispatched across Maharashtra and western national highways.',
  },
  {
    id: 2,
    image: '/assets/images/fleet-warehouse.jpg',
    title: '3PL Logistics Hub & Warehouse Facility',
    category: 'Fleet Operations',
    description: 'Centralized consignment handling, trailer parking, and line-haul vehicle turnarounds in Pune.',
  },
  {
    id: 3,
    image: '/assets/images/service-station.jpg',
    title: 'Commercial Service Station Bays',
    category: 'Maintenance Bays',
    description: 'Drive-through bays equipped for hydraulic brake inspections, pneumatic line repairs, and wheel alignments.',
  },
  {
    id: 4,
    image: '/assets/images/auto-spares-hero.jpg',
    title: 'OEM Commercial Auto Spares Hub',
    category: 'Parts Inventory',
    description: 'Certified heavy vehicle brake shoes, air valves, filters, and transmission gears ready for immediate fitment.',
  },
  {
    id: 5,
    image: '/assets/images/company-team.jpg',
    title: 'Central Logistics Operations Crew',
    category: 'Dispatch Team',
    description: 'Coordinated fleet control room supervisors ensuring strict SLA adherence and driver safety orientation.',
  },
];

export const FleetGallerySection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => {
    setActiveIndex((prev) => (prev + 1) % galleryItems.length);
  };

  const prev = () => {
    setActiveIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  };

  const current = galleryItems[activeIndex];

  return (
    <section className="py-14 lg:py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <SectionHeading
              badge="Visual Showcase"
              title="Fleet & Operational Infrastructure"
              subtitle="Real commercial logistics assets powering dependable enterprise transportation."
              className="mb-0 text-left"
            />
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 self-start md:self-end">
            <button
              onClick={prev}
              aria-label="Previous gallery image"
              className="p-2.5 rounded-2xl bg-px-bg border border-px-border text-px-dark hover:border-px-primary hover:text-px-primary transition-all active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              aria-label="Next gallery image"
              className="p-2.5 rounded-2xl bg-px-bg border border-px-border text-px-dark hover:border-px-primary hover:text-px-primary transition-all active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Big Featured Slide */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[16/9] max-h-[500px] bg-px-deep">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <img
                src={current.image}
                alt={current.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover filter brightness-100 contrast-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-px-deep/90 via-px-deep/30 to-transparent" />

              {/* Bottom Caption Card */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 p-4 sm:p-6 rounded-2xl bg-px-deep/85 backdrop-blur-md border border-white/25 text-white max-w-xl">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-px-primary text-white inline-block mb-2">
                  {current.category}
                </span>
                <h3 className="text-base sm:text-xl font-bold">{current.title}</h3>
                <p className="text-xs sm:text-sm text-gray-100 mt-1 line-clamp-2 leading-relaxed font-medium">
                  {current.description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Top Corner Badge */}
          <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-px-deep/80 backdrop-blur-md border border-white/20 text-white text-xs font-semibold flex items-center gap-1.5 z-10">
            <Camera className="w-3.5 h-3.5 text-purple-300" />
            <span>Asset {activeIndex + 1} of {galleryItems.length}</span>
          </div>
        </div>

        {/* Thumbnails Row */}
        <div className="grid grid-cols-5 gap-2 sm:gap-4 mt-4">
          {galleryItems.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setActiveIndex(idx)}
              aria-label={`Select gallery asset ${idx + 1}`}
              className={`relative rounded-xl sm:rounded-2xl overflow-hidden aspect-[16/10] border-2 transition-all ${
                activeIndex === idx
                  ? 'border-px-primary ring-2 ring-px-primary/20 scale-[1.02]'
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
