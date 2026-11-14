import React, { useState } from 'react';
import { SectionHeading } from '../../common/SectionHeading';
import { Cog, Disc, Layers, Zap, Droplet, CheckCircle2 } from 'lucide-react';

interface PartProduct {
  id: string;
  category: string;
  title: string;
  application: string;
  specs: string;
  warranty: string;
  icon: React.ElementType;
}

const partsCatalog: PartProduct[] = [
  {
    id: 'p1',
    category: 'engine',
    title: 'Heavy Diesel Pistons & Cylinder Liners',
    application: 'Commercial Multi-Axle Trucks',
    specs: 'High thermal conductivity alloy, matched bore tolerances',
    warranty: 'Full OEM Manufacturer Warranty',
    icon: Cog,
  },
  {
    id: 'p2',
    category: 'engine',
    title: 'Common-Rail Fuel Injectors & High-Pressure Pumps',
    application: 'Modern Electronic Diesel Engines',
    specs: 'Precision spray orifice calibration for peak fuel efficiency',
    warranty: 'OEM Calibrated & Bench Tested',
    icon: Cog,
  },
  {
    id: 'p3',
    category: 'brakes',
    title: 'Dual-Circuit Air Brake Drums & Slack Adjusters',
    application: 'Heavy Multi-Axle Trailers & Rigid Trucks',
    specs: 'High-tensile cast iron, anti-glazing thermal balance',
    warranty: 'Certified Highway Heat Dissipation',
    icon: Disc,
  },
  {
    id: 'p4',
    category: 'brakes',
    title: 'Asbestos-Free Heavy Commercial Brake Linings',
    application: 'Line-Haul Commercial Vehicle Axles',
    specs: 'Heavy friction composite formulation, long wear cycle',
    warranty: 'Compliant with National Road Safety Codes',
    icon: Disc,
  },
  {
    id: 'p5',
    category: 'suspension',
    title: 'Parabolic & Semi-Elliptic Leaf Spring Assemblies',
    application: 'Heavy Freight Haulage & Chassis Support',
    specs: 'High-yield spring steel, shot-peened for fatigue resistance',
    warranty: 'Rated for Maximum Highway Payloads',
    icon: Layers,
  },
  {
    id: 'p6',
    category: 'suspension',
    title: 'Heavy-Duty U-Bolts, Shackle Pins & Bushings',
    application: 'Chassis & Leaf Spring Anchoring',
    specs: 'Grade 10.9 high-tensile forged steel fasteners',
    warranty: 'Anti-Corrosive Zinc Phosphate Coated',
    icon: Layers,
  },
  {
    id: 'p7',
    category: 'electricals',
    title: 'Heavy Commercial Alternators & Starters',
    application: '24V Heavy Commercial Electrical Architectures',
    specs: 'High-amperage output, heavy-duty sealed brush gear',
    warranty: 'Bench Tested Electrical Stability',
    icon: Zap,
  },
  {
    id: 'p8',
    category: 'lubricants',
    title: 'Heavy-Duty Synthetic Engine & Gear Oils',
    application: 'Long-Drain Commercial Fleet Formulations',
    specs: 'High-viscosity index, active soot & sludge dispersants',
    warranty: 'Certified OEM Fluid Specification',
    icon: Droplet,
  },
];

const categoryTabs = [
  { key: 'all', label: 'All Spares' },
  { key: 'engine', label: 'Engine Components' },
  { key: 'brakes', label: 'Brake Systems' },
  { key: 'suspension', label: 'Suspension & Chassis' },
  { key: 'electricals', label: 'Electricals & Sensors' },
  { key: 'lubricants', label: 'Heavy Lubricants' },
];

export const SparesInteractiveCatalog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredParts =
    selectedCategory === 'all'
      ? partsCatalog
      : partsCatalog.filter((p) => p.category === selectedCategory);

  return (
    <section className="py-20 bg-px-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Product Catalog"
          title="Explore Verified Commercial Spare Part Categories"
          subtitle="Click category tabs to filter authentic OEM replacement parts engineered for commercial vehicle uptime."
        />

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categoryTabs.map((tab) => {
            const isActive = selectedCategory === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setSelectedCategory(tab.key)}
                className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-px-primary text-white shadow-soft-purple scale-105'
                    : 'bg-white text-gray-700 hover:text-px-primary hover:bg-white/80 border border-px-border'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Filtered Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredParts.map((part) => {
            const Icon = part.icon;
            return (
              <div
                key={part.id}
                className="group p-6 rounded-3xl bg-white border border-px-border shadow-soft-purple hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between h-full"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-xl bg-px-lavender text-px-primary group-hover:bg-px-primary group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                      OEM Verified
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-px-dark group-hover:text-px-primary transition-colors">
                    {part.title}
                  </h4>

                  <p className="text-xs text-px-violet font-semibold">
                    App: {part.application}
                  </p>

                  <p className="text-xs text-gray-600 leading-relaxed">
                    {part.specs}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-gray-100 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{part.warranty}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
