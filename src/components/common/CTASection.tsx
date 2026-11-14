import React from 'react';
import { ArrowRight, PhoneCall, ShieldCheck, CheckCircle } from 'lucide-react';
import { Button } from './Button';
import { FadeIn } from '../animations/FadeIn';
import { companyInfo } from '../../data/companyData';

interface CTASectionProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  primaryBtnText?: string;
  primaryBtnLink?: string;
  secondaryBtnText?: string;
  secondaryBtnLink?: string;
  image?: string;
}

export const CTASection: React.FC<CTASectionProps> = ({
  badge = 'Strategic Logistics Partnership',
  title = "Let's Build Better Transportation Solutions Together",
  subtitle = 'Partner with Prisha Xpress for dependable transportation, driver staffing, and intelligent fleet management tailored to your enterprise.',
  primaryBtnText = 'Discuss Your Requirements',
  primaryBtnLink = '/contact#enquiry',
  secondaryBtnText,
  secondaryBtnLink,
  image = '/assets/images/corporate-hq.jpg',
}) => {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden bg-px-deep text-white flex items-center justify-center">
      {/* Background Natural Daylight Photography */}
      <div className="absolute inset-0 z-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover object-[70%_center] md:object-center filter brightness-100 contrast-100"
        />
        {/* Soft Ambient Directional Support Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-px-deep/65 via-transparent to-px-deep/40 hidden md:block" />
        <div className="absolute inset-0 bg-gradient-to-t from-px-deep/75 via-transparent to-px-deep/35 md:hidden" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 w-full py-6">
        <div className="p-6 sm:p-10 lg:p-12 rounded-3xl bg-px-deep/80 backdrop-blur-md border border-white/20 shadow-2xl text-center space-y-6">
          <FadeIn direction="down">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-semibold text-px-lavender shadow-md">
              <ShieldCheck className="w-4 h-4 text-purple-300" />
              {badge}
            </span>
          </FadeIn>

          <FadeIn direction="up" delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight max-w-3xl mx-auto text-white">
              {title}
            </h2>
          </FadeIn>

          <FadeIn direction="up" delay={0.2}>
            <p className="text-sm sm:text-base lg:text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed font-normal">
              {subtitle}
            </p>
          </FadeIn>

          {/* Value badges */}
          <FadeIn direction="up" delay={0.3}>
            <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs sm:text-sm text-gray-200">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Disciplined Highway Operations</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>RTO Verified Drivers</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Pune Operations Headquarters</span>
              </div>
            </div>
          </FadeIn>

          {/* CTA Buttons */}
          <FadeIn direction="up" delay={0.4}>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <Button
                to={primaryBtnLink}
                variant="white"
                size="lg"
                icon={<ArrowRight className="w-5 h-5 text-px-primary" />}
              >
                {primaryBtnText}
              </Button>

              {secondaryBtnText && secondaryBtnLink ? (
                <Button
                  to={secondaryBtnLink}
                  variant="glass"
                  size="lg"
                >
                  {secondaryBtnText}
                </Button>
              ) : (
                <Button
                  href={`tel:${companyInfo.phone}`}
                  variant="glass"
                  size="lg"
                  icon={<PhoneCall className="w-4 h-4 text-purple-300" />}
                >
                  Call {companyInfo.phone}
                </Button>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
