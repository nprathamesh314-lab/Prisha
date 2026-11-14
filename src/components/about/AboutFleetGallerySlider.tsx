import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Camera, ShieldCheck } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';

interface FleetGalleryItem {
  id: string;
  image: string;
  title: string;
  category: string;
  description: string;
  location: string;
}

const fleetGalleryItems: FleetGalleryItem[] = [
  {
    id: 'fg-1',
    image: '/assets/images/hero-fleet.jpg',
    title: 'Commercial Highway Fleet',
    category: 'Commercial Vehicles',
    description:
      'Rigid and multi-axle freight carriers dispatched across Maharashtra and national highway corridors.',
    location: 'Western Freight Corridors',
  },
  {
    id: 'fg-2',
    image: '/assets/images/fleet-warehouse.jpg',
    title: '3PL Logistics Hub & Staging',
    category: 'Fleet Operations',
    description:
      'Consignment staging, line-haul vehicle turnarounds, and cargo coordination facility.',
    location: 'Pune Logistics Hub',
  },
  {
    id: 'fg-3',
    image: '/assets/images/service-station.jpg',
    title: 'Commercial Service Station Bays',
    category: 'Maintenance Bays',
    description:
      'Dedicated drive-through service bays for preventive maintenance, pneumatic checks, and vehicle safety.',
    location: 'Service Hub',
  },
  {
    id: 'fg-4',
    image: '/assets/images/auto-spares-hero.jpg',
    title: 'OEM Commercial Auto Spares',
    category: 'Parts Inventory',
    description:
      'Commercial vehicle brake assemblies, pneumatic valves, filters, and transmission spares support.',
    location: 'Spares Center',
  },
  {
    id: 'fg-5',
    image: '/assets/images/company-team.jpg',
    title: 'Central Operations & Dispatch Crew',
    category: 'Dispatch Team',
    description:
      'Fleet coordinators, client relationship personnel, and driver support team managing daily movements.',
    location: 'Kharadi, Pune HQ',
  },
];

export const AboutFleetGallerySlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Responsive itemsPerPage
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  const maxIndex = Math.max(0, fleetGalleryItems.length - itemsPerPage);

  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [itemsPerPage, maxIndex, currentIndex]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Auto-slide every 5s with pause on hover
  useEffect(() => {
    if (isPaused) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) {
      setIsPaused(false);
      return;
    }
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;

    if (diff > threshold) {
      nextSlide();
    } else if (diff < -threshold) {
      prevSlide();
    }

    touchStartX.current = null;
    touchEndX.current = null;
    setIsPaused(false);
  };

  const totalPages = maxIndex + 1;

  return (
    <section
      className="py-14 lg:py-20 bg-white relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 lg:mb-10 gap-4">
          <div>
            <SectionHeading
              badge="Fleet & Team Showcase"
              title="Behind Every Journey, There's a Dedicated Team"
              subtitle="Real commercial vehicles, logistics hubs, and operational support powering Prisha Xpress."
              className="mb-0 text-left"
            />
          </div>

          <div className="flex items-center gap-3 self-start md:self-end">
            <div className="text-xs font-semibold text-gray-500 mr-2 hidden sm:block">
              <span className="text-px-primary font-bold">{currentIndex + 1}</span> of{' '}
              {totalPages}
            </div>
            <button
              onClick={prevSlide}
              aria-label="Previous fleet image"
              className="p-3 rounded-2xl bg-px-bg border border-px-border text-px-dark hover:bg-px-primary hover:text-white hover:border-px-primary transition-all duration-200 active:scale-95 shadow-xs"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next fleet image"
              className="p-3 rounded-2xl bg-px-bg border border-px-border text-px-dark hover:bg-px-primary hover:text-white hover:border-px-primary transition-all duration-200 active:scale-95 shadow-xs"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Multi-item Slider Track */}
        <div className="overflow-hidden -mx-2.5 px-2.5 py-2">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
            }}
          >
            {fleetGalleryItems.map((item) => (
              <div
                key={item.id}
                className="px-2.5 shrink-0"
                style={{ width: `${100 / itemsPerPage}%` }}
              >
                <div className="group relative rounded-3xl overflow-hidden shadow-soft-purple/50 border border-px-border bg-px-deep h-full flex flex-col justify-end aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3]">
                  {/* Photography Image with smooth zoom on hover */}
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover filter brightness-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Gradient Overlay for Legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-px-deep/95 via-px-deep/40 to-transparent" />

                  {/* Top Location Badge */}
                  <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full bg-px-deep/80 backdrop-blur-md border border-white/20 text-white text-[11px] font-semibold flex items-center gap-1.5 z-10">
                    <Camera className="w-3 h-3 text-purple-300" />
                    <span>{item.location}</span>
                  </div>

                  {/* Bottom Caption Card */}
                  <div className="relative z-10 p-4 sm:p-5 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-px-primary/90 text-white inline-block mb-1.5">
                      {item.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold leading-snug group-hover:text-purple-200 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-100 mt-1 line-clamp-2 leading-relaxed font-medium">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center items-center gap-2 mt-6">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to fleet slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === idx
                  ? 'w-8 bg-px-primary'
                  : 'w-2 bg-purple-200 hover:bg-purple-300'
              }`}
            />
          ))}
        </div>

        {/* Transparency note */}
        <div className="mt-8 text-center">
          <p className="text-xs sm:text-sm text-gray-700 inline-flex items-center gap-1.5 font-medium">
            <ShieldCheck className="w-4 h-4 text-px-primary" />
            <span>
              Real fleet operations and facility photography. No artificial or exaggerated claims.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};
