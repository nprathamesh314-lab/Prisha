import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star, ChevronLeft, ChevronRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { publishedTestimonials } from '../../data/companyData';
import { SectionHeading } from '../common/SectionHeading';

export const TestimonialSliderSection: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent((prev) => (prev + 1) % publishedTestimonials.length);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + publishedTestimonials.length) % publishedTestimonials.length);
  };

  const item = publishedTestimonials[current];

  return (
    <section className="py-14 lg:py-20 bg-px-bg relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Client Voice"
          title="What Our Enterprise Partners Say"
          subtitle="Feedback published on the official Prisha Xpress platform reflecting our day-to-day commitment to reliability."
        />

        {/* Verification Transparency Notice */}
        <div className="mb-6 p-2.5 sm:p-3 rounded-2xl bg-purple-50 border border-purple-200/80 text-[11px] sm:text-xs text-px-deep text-center flex items-center justify-center gap-2">
          <AlertCircle className="w-3.5 h-3.5 text-px-primary shrink-0" />
          <span>
            <strong>Transparency Notice:</strong> Testimonials reflect published client feedback from prishaxpress.com.
          </span>
        </div>

        {/* Single Testimonial Card */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="p-7 sm:p-10 rounded-3xl bg-white border border-px-border shadow-soft-purple text-center relative"
            >
              <Quote className="w-10 h-10 text-px-lavender mx-auto mb-4" />

              {/* Star Rating */}
              <div className="flex items-center justify-center gap-1 text-amber-400 mb-4">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Feedback Quote */}
              <p className="text-base sm:text-lg text-gray-800 leading-relaxed italic max-w-2xl mx-auto">
                "{item.content}"
              </p>

              {/* Author */}
              <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
                <div>
                  <h4 className="font-bold text-px-dark text-base">{item.name}</h4>
                  <p className="text-xs text-gray-500">{item.role} • {item.company}</p>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 inline-flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>Verified Partner</span>
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slider Controls */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="p-2.5 rounded-full bg-white border border-px-border text-px-dark hover:border-px-primary hover:text-px-primary transition-all active:scale-95 shadow-xs"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1.5">
              {publishedTestimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  aria-label={`Go to testimonial ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    current === idx ? 'w-6 bg-px-primary' : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next testimonial"
              className="p-2.5 rounded-full bg-white border border-px-border text-px-dark hover:border-px-primary hover:text-px-primary transition-all active:scale-95 shadow-xs"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
