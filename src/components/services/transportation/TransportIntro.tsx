import React from 'react';
import { SectionHeading } from '../../common/SectionHeading';

export const TransportIntro: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Highway Excellence"
          title="Engineered for Continuous Highway Movement"
          subtitle="Delivering commercial cargo with punctual transit turnarounds, seasoned commercial drivers, and mechanically sound vehicles."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-px-dark">
              Dependable Long-Haul & Regional Road Freight
            </h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              At <strong>Prisha Xpress Pvt. Ltd.</strong>, we understand that supply chains cannot afford transit delays. Whether moving full container loads of consumer products, automotive components, or raw industrial materials, our transportation services combine disciplined dispatch timing with real-time control room coordination.
            </p>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Every shipment is backed by comprehensive transit insurance, pre-trip vehicle mechanical inspections, and background-verified drivers trained to deliver with safety and care.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-px-bg border border-px-border">
                <p className="text-2xl font-black text-px-primary font-mono">SLA</p>
                <p className="text-xs font-bold text-px-dark mt-1">Disciplined Dispatch</p>
                <p className="text-[11px] text-gray-500 mt-0.5">Committed schedule adherence</p>
              </div>
              <div className="p-4 rounded-2xl bg-px-bg border border-px-border">
                <p className="text-2xl font-black text-px-primary font-mono">100%</p>
                <p className="text-xs font-bold text-px-dark mt-1">Insured Cargo</p>
                <p className="text-[11px] text-gray-500 mt-0.5">Comprehensive transit coverage</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-px-deep">
              <img
                src="/assets/images/logistics-hub.jpg"
                alt="Prisha Xpress Logistics Terminal"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
