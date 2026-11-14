import React, { useState } from 'react';
import { SectionHeading } from '../../common/SectionHeading';
import { ShieldCheck, CheckSquare, Square } from 'lucide-react';

const inspectionItems = [
  'Air brake pressure retention & pneumatic line leaks',
  'Tire tread depth, sidewall cracks, and rim lug nut torque',
  'Leaf spring tension, center bolt integrity, and U-bolt tightness',
  'Engine oil level, coolant viscosity, and fuel sediment bowl inspection',
  'LED indicator, hazard lamps, headlamp alignment, and horn loudness',
  'Trailer fifth-wheel coupling lock and electrical harness connection',
];

export const StationEnvironmentGallery: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<number[]>([0, 1, 2, 3]);

  const toggleCheck = (idx: number) => {
    if (checkedItems.includes(idx)) {
      setCheckedItems(checkedItems.filter((i) => i !== idx));
    } else {
      setCheckedItems([...checkedItems, idx]);
    }
  };

  return (
    <section className="py-20 bg-px-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Interactive Inspection"
          title="Pre-Highway Mandatory Safety Checklist"
          subtitle="Try our interactive workshop inspection checklist. Every commercial truck undergoes this rigorous protocol before leaving our service bays."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Interactive Checklist (6 cols) */}
          <div className="lg:col-span-6 space-y-4 bg-white p-8 rounded-3xl border border-px-border shadow-soft-purple">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <span className="text-xs font-bold uppercase tracking-wider text-px-violet">
                Workshop Inspection Sheet
              </span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                {checkedItems.length} of {inspectionItems.length} Verified
              </span>
            </div>

            <div className="space-y-3">
              {inspectionItems.map((item, idx) => {
                const isChecked = checkedItems.includes(idx);
                return (
                  <div
                    key={idx}
                    onClick={() => toggleCheck(idx)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                      isChecked
                        ? 'bg-emerald-50/50 border-emerald-200 text-emerald-950'
                        : 'bg-px-bg border-px-border text-gray-700 hover:border-px-primary/40'
                    }`}
                  >
                    {isChecked ? (
                      <CheckSquare className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <Square className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                    )}
                    <span className="text-xs sm:text-sm font-semibold">{item}</span>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 text-[11px] text-gray-500 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-px-primary shrink-0" />
              <span>Standard operating procedure across all Prisha Xpress service stations.</span>
            </div>
          </div>

          {/* Photographic Layout (6 cols) */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-px-deep">
              <img
                src="/assets/images/service-station.jpg"
                alt="Service Station Inspection Bay"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-px-deep/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white text-xs">
                <p className="font-bold text-sm">Industrial Service Standards</p>
                <p className="text-purple-200 mt-1">Multi-axle pit inspection and electronic diagnostics in action.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
