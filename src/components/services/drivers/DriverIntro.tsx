import React from 'react';
import { FadeIn } from '../../animations/FadeIn';
import { SectionHeading } from '../../common/SectionHeading';
import { CheckCircle2, Users } from 'lucide-react';

export const DriverIntro: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Human-Centred Logistics"
          title="Empowering the Drivers Who Move the Nation"
          subtitle="At Prisha Xpress, commercial drivers are not treated as casual numbers—they are valued micro-entrepreneurs whose safety, dignity, and career progression are prioritized."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Authentic Team & Driver Photo */}
          <div className="lg:col-span-6 relative">
            <FadeIn direction="right">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-px-deep">
                <img
                  src="/assets/images/company-team.jpg"
                  alt="Prisha Xpress Driver Operations Team"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-px-deep/75 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/30 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-px-primary" />
                    <span className="font-bold text-px-dark">1,000+ Driver Community</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full font-bold bg-emerald-100 text-emerald-800 text-[11px]">
                    Pune Operations
                  </span>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Narrative & Values */}
          <div className="lg:col-span-6 space-y-6">
            <FadeIn direction="left">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-px-dark leading-snug">
                Dignified Work, Reliable Deliveries, Zero Intermediaries
              </h3>
            </FadeIn>

            <FadeIn direction="left" delay={0.1}>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                In India's transportation sector, driver shortages and high attrition often stem from delayed payments, lack of healthcare, and poor working conditions. <strong>Prisha Xpress Pvt. Ltd.</strong> re-engineers this model by treating drivers with professional respect and transparent financial accounting.
              </p>
            </FadeIn>

            <FadeIn direction="left" delay={0.2}>
              <div className="space-y-3.5 pt-1">
                <div className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-px-lavender text-px-primary mt-1 shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-px-dark">Rigorous Background Vetting</h4>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Commercial license authenticity, criminal background checks, past employer cross-checks, and Aadhaar identity verification.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-px-lavender text-px-primary mt-1 shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-px-dark">Continuous Etiquette & Safety Training</h4>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Customer greeting protocols, proof-of-delivery handover, defensive driving, and fatigue management on interstate routes.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-px-lavender text-px-primary mt-1 shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-px-dark">Full Personal Accident & Trip Insurance</h4>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Every commercial journey is insured, providing complete peace of mind to both our driver partners and corporate clients.
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};
