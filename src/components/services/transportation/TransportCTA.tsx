import React from 'react';
import { ArrowRight, PhoneCall, Truck } from 'lucide-react';
import { Button } from '../../common/Button';
import { FadeIn } from '../../animations/FadeIn';
import { companyInfo } from '../../../data/companyData';

export const TransportCTA: React.FC = () => {
  return (
    <section className="py-24 bg-px-deep text-white relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/images/network-map.jpg"
          alt="Transportation & Line-Haul Highway Operations"
          className="w-full h-full object-cover object-[70%_center] md:object-center filter brightness-90 contrast-105"
        />
        {/* Desktop directional gradient */}
        <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-px-deep/88 via-px-deep/60 to-px-primary/30" />
        {/* Mobile vertical gradient */}
        <div className="sm:hidden absolute inset-0 bg-gradient-to-b from-px-deep/92 via-px-deep/60 to-px-deep/30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(164,75,192,0.25)_0%,transparent_60%)]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="p-8 sm:p-12 rounded-3xl bg-px-deep/75 backdrop-blur-md border border-white/15 shadow-2xl text-center space-y-6">
          <FadeIn direction="down">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-semibold text-purple-200">
              <Truck className="w-4 h-4 text-purple-300" />
              Freight Line-Haul Bookings
            </span>
          </FadeIn>

          <FadeIn direction="up" delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight max-w-3xl mx-auto">
              Ready to Move Your Cargo on Time?
            </h2>
          </FadeIn>

          <FadeIn direction="up" delay={0.2}>
            <p className="text-base sm:text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed">
              Contact our Pune freight booking desk today to schedule line-haul trucks, arrange regular corridor dispatches, or receive a competitive transportation quote.
            </p>
          </FadeIn>

          <FadeIn direction="up" delay={0.3}>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Button
                to="/contact?service=transportation"
                variant="white"
                size="lg"
                icon={<ArrowRight className="w-5 h-5 text-px-primary" />}
              >
                Request Transportation Quote
              </Button>
              <Button
                href={`tel:${companyInfo.phone}`}
                variant="glass"
                size="lg"
                icon={<PhoneCall className="w-4 h-4 text-purple-300" />}
              >
                Call {companyInfo.phone}
              </Button>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
