import React from 'react';
import { SectionHeading } from '../../common/SectionHeading';
import { CheckCircle2 } from 'lucide-react';

export const FleetIntro: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Technology & Operations"
          title="Engineering Reliability Into Every Commercial Truck"
          subtitle="How our 3PL fleet management model eliminates vehicle idle time, controls fuel expenditure, and extends asset lifespan."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-px-dark">
              From Reactive Repairs to Proactive Fleet Performance
            </h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Traditional fleet operations in India often wait until a truck breaks down on a national highway before addressing mechanical issues. This leads to costly towing, missed delivery SLAs, driver disputes, and inflated emergency repair bills.
            </p>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              <strong>Prisha Xpress Pvt. Ltd.</strong> reverses this dynamic with structured 3PL management. By combining regular preventive inspections at our dedicated service stations, supplying certified OEM spares, and assigning disciplined drivers, we ensure your vehicles remain roadworthy and profitable.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-sm font-bold text-px-dark">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Scheduled Multi-Point Fleet Health Audits</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-bold text-px-dark">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Zero Roadside Breakdown Target Protocols</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-bold text-px-dark">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Centralized Pune Command Tower Coordination</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-px-deep">
              <img
                src="/assets/images/fleet-warehouse.jpg"
                alt="Prisha Xpress Fleet Terminal"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
