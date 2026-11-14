import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ShieldCheck,
  Users,
  FileCheck,
  HeartHandshake,
  Layers,
  Cpu,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';

interface StrengthItem {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
}

const strengths: StrengthItem[] = [
  {
    id: 's-1',
    number: '01',
    title: 'Reliable Operations',
    description:
      'Disciplined transport and dispatch processes designed to support dependable operations.',
    icon: ShieldCheck,
    tag: 'Process Discipline',
  },
  {
    id: 's-2',
    number: '02',
    title: 'Dedicated Team Support',
    description:
      'Dedicated operational support for clients, fleet owners and commercial drivers.',
    icon: Users,
    tag: 'Pune Headquarters',
  },
  {
    id: 's-3',
    number: '03',
    title: 'Transparent Pricing',
    description:
      'Clear commercial terms and pricing without unexpected charges.',
    icon: FileCheck,
    tag: 'Commercial Integrity',
  },
  {
    id: 's-4',
    number: '04',
    title: 'Customer-Focused Solutions',
    description:
      'Transportation and driver services adapted to individual business requirements.',
    icon: HeartHandshake,
    tag: 'Tailored Logistics',
  },
  {
    id: 's-5',
    number: '05',
    title: 'Operational Efficiency',
    description:
      'Focus on reducing delays, unnecessary transit and vehicle downtime.',
    icon: Layers,
    tag: 'Fleet Optimization',
  },
  {
    id: 's-6',
    number: '06',
    title: 'Technology-Enabled Services',
    description:
      'Digital tools and monitoring systems where genuinely implemented and operational.',
    icon: Cpu,
    tag: 'Digital Readiness',
  },
];

export const AboutStrengthsSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Responsive itemsPerPage calculation
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

  const maxIndex = Math.max(0, strengths.length - itemsPerPage);

  // Clamp current index when itemsPerPage changes
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

  // Auto-slide every 4.5 seconds with pause on hover
  useEffect(() => {
    if (isPaused) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 4500);

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
      className="py-14 lg:py-20 bg-px-bg border-y border-px-border relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 lg:mb-10 gap-4">
          <div>
            <SectionHeading
              badge="Core Strengths"
              title="Why Businesses Work with Prisha Xpress"
              subtitle="Discover the operational principles behind our transportation and fleet support services."
              className="mb-0 text-left"
            />
          </div>

          {/* Slider Controls */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <div className="text-xs font-semibold text-gray-500 mr-2 hidden sm:block">
              <span className="text-px-primary font-bold">{currentIndex + 1}</span> of{' '}
              {totalPages}
            </div>
            <button
              onClick={prevSlide}
              aria-label="Previous strength"
              className="p-3 rounded-2xl bg-white border border-px-border text-px-dark hover:bg-px-primary hover:text-white hover:border-px-primary transition-all duration-200 active:scale-95 shadow-xs"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next strength"
              className="p-3 rounded-2xl bg-white border border-px-border text-px-dark hover:bg-px-primary hover:text-white hover:border-px-primary transition-all duration-200 active:scale-95 shadow-xs"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Slider Track Container */}
        <div className="overflow-hidden -mx-2 px-2 py-2">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
            }}
          >
            {strengths.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="px-2.5 shrink-0"
                  style={{ width: `${100 / itemsPerPage}%` }}
                >
                  <div className="h-full p-6 sm:p-7 rounded-3xl bg-white border border-px-border shadow-soft-purple/40 hover:shadow-soft-purple hover:border-px-primary/40 transition-all duration-300 flex flex-col justify-between group">
                    <div>
                      {/* Top Header: Icon & Number Badge */}
                      <div className="flex items-center justify-between mb-5">
                        <div className="w-12 h-12 rounded-2xl bg-px-lavender text-px-primary flex items-center justify-center group-hover:scale-105 group-hover:bg-px-primary group-hover:text-white transition-all duration-300 shadow-xs">
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-black font-mono px-2.5 py-1 rounded-full bg-px-bg text-px-primary border border-purple-100">
                          {item.number}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg sm:text-xl font-bold text-px-dark group-hover:text-px-primary transition-colors duration-200 mb-2.5">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Bottom Tag */}
                    <div className="pt-5 mt-5 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500 font-medium">
                      <span className="flex items-center gap-1.5 text-px-violet">
                        <Sparkles className="w-3.5 h-3.5 text-px-primary" />
                        {item.tag}
                      </span>
                      <span className="text-gray-400 group-hover:text-px-primary transition-colors">
                        Verified Pillar
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center items-center gap-2 mt-6">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === idx
                  ? 'w-8 bg-px-primary'
                  : 'w-2 bg-purple-200 hover:bg-purple-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
