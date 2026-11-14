// PRISHA XPRESS PVT. LTD. - PUBLISHED CUSTOMER TESTIMONIALS SECTION
// PRESERVES ORIGINAL NAMES AND CONTENT FROM WWW.PRISHAXPRESS.COM
// ADDS VERIFICATION STATUS FLAGS AND TRANSPARENCY NOTES

import React from 'react';
import { publishedTestimonials } from '../../data/companyData';
import { SectionHeading } from '../common/SectionHeading';
import { FadeIn } from '../animations/FadeIn';
import { Quote, Star, AlertCircle, CheckCircle2 } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-24 bg-px-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Client Voice"
          title="What Fleet Owners & Logistics Partners Say"
          subtitle="Preserving verified feedback published on the official Prisha Xpress website, reflecting our ongoing commitment to reliable service."
        />

        {/* Verification Transparency Notice */}
        <div className="max-w-3xl mx-auto mb-12 p-3.5 rounded-2xl bg-purple-50/80 border border-purple-200 text-xs text-px-deep text-center flex items-center justify-center gap-2">
          <AlertCircle className="w-4 h-4 text-px-primary shrink-0" />
          <span>
            <strong>Transparency Notice:</strong> Testimonials reflect published client feedback from the original prishaxpress.com website. Formal written permission is re-verified periodically.
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {publishedTestimonials.map((item, index) => (
            <FadeIn key={item.id} delay={index * 0.1} direction="up">
              <div className="p-8 rounded-3xl bg-white border border-px-border shadow-soft-purple hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between h-full relative">
                <Quote className="w-10 h-10 text-px-lavender absolute top-6 right-6 pointer-events-none" />

                <div className="space-y-4 relative z-10">
                  {/* Star Rating */}
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {/* Feedback Content */}
                  <p className="text-sm text-gray-700 leading-relaxed italic">
                    "{item.content}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-px-dark text-base">{item.name}</h4>
                    <p className="text-xs text-gray-500">{item.role} • {item.company}</p>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Published Partner</span>
                  </span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
