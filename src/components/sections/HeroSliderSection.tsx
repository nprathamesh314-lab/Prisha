import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Send,
  MapPin,
} from 'lucide-react';
import { Button } from '../common/Button';

interface Slide {
  id: number;
  image: string;
  alt: string;
  tag: string;
  caption: string;
}

const slides: Slide[] = [
  {
    id: 1,
    image: '/assets/images/hero-fleet.jpg',
    alt: 'Prisha Xpress Commercial Transportation Fleet on Highway',
    tag: 'Highway Line-Haul & Freight Logistics',
    caption: 'Pune & Western Corridor Heavy Commercial Vehicle Fleet',
  },
  {
    id: 2,
    image: '/assets/images/fleet-warehouse.jpg',
    alt: 'Prisha Xpress 3PL Fleet Management and Logistics Hub',
    tag: '3PL Corporate Fleet Supervision',
    caption: 'End-to-End Fleet Dispatch, Driver Rosters & Maintenance',
  },
  {
    id: 3,
    image: '/assets/images/logistics-hub.jpg',
    alt: 'Prisha Xpress Logistics Operations Terminal',
    tag: 'Verified Commercial Drivers & Workshop Network',
    caption: 'RTO-Screened Drivers & Commercial Servicing Infrastructure',
  },
];

export const HeroSliderSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [nextSlide, isPaused]);

  return (
    <section
      className="relative min-h-[82vh] lg:min-h-[88vh] flex items-center justify-center overflow-hidden bg-px-deep pt-20 pb-12 lg:py-0"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Hero Image Slider"
    >
      {/* Background Slides with Cross-Fade */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={slides[currentSlide].id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].alt}
              className="w-full h-full object-cover object-[70%_center] md:object-center filter brightness-100 contrast-100"
            />
          </motion.div>
        </AnimatePresence>

        {/* Directional Vignettes for Maximum Legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-px-deep/85 via-px-deep/45 to-transparent hidden md:block" />
        <div className="absolute inset-0 bg-gradient-to-t from-px-deep/90 via-px-deep/55 to-px-deep/25 md:hidden" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 lg:py-16">
        <div className="max-w-3xl">
          <div className="p-6 sm:p-9 lg:p-11 rounded-3xl bg-px-deep/80 backdrop-blur-md border border-white/15 shadow-2xl space-y-5 text-white">
            {/* Top Badge */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-px-lavender">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-300" />
                PRISHA XPRESS PVT. LTD.
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[11px] font-medium">
                <MapPin className="w-3 h-3" />
                Kharadi, Pune
              </span>
            </div>

            {/* Official Headline */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15] text-white">
              Driving Your Business Forward.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-purple-300 to-pink-200">
                Delivering with Confidence.
              </span>
            </h1>

            {/* Concise Supporting Text */}
            <p className="text-sm sm:text-base lg:text-lg text-gray-200 font-normal leading-relaxed max-w-2xl">
              Reliable transportation, professional driver solutions and fleet management for your business. Operating across Pune, Maharashtra, and India's vital western freight corridors.
            </p>

            {/* Slide Context Indicator */}
            <div className="py-1 flex items-center gap-2 text-xs text-purple-200">
              <span className="w-2 h-2 rounded-full bg-px-violet animate-pulse" />
              <span className="font-semibold">{slides[currentSlide].tag}</span>
              <span className="text-white/40 hidden sm:inline">•</span>
              <span className="text-gray-300 text-[11px] hidden sm:inline">{slides[currentSlide].caption}</span>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <Button
                to="/services"
                variant="white"
                size="md"
                icon={<ArrowRight className="w-4 h-4 text-px-primary group-hover:translate-x-1 transition-transform" />}
              >
                Explore Our Services
              </Button>

              <Button
                to="#enquiry"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('enquiry')?.scrollIntoView({ behavior: 'smooth' });
                }}
                variant="glass"
                size="md"
                icon={<Send className="w-4 h-4 text-purple-300" />}
              >
                Request a Business Enquiry
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Slider Navigation Controls (Left/Right Arrows & Bottom Dots) */}
      <div className="absolute bottom-5 right-5 sm:right-10 z-20 flex items-center gap-3">
        <button
          onClick={prevSlide}
          aria-label="Previous slide"
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-md border border-white/20 text-white transition-all focus:outline-none focus:ring-2 focus:ring-white"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-px-deep/60 backdrop-blur-md border border-white/10">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlide === idx ? 'w-6 bg-px-violet' : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-md border border-white/20 text-white transition-all focus:outline-none focus:ring-2 focus:ring-white"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
