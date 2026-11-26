import React, { useState } from 'react';
import { PageTransition } from '../components/animations/PageTransition';
import { NetworkHeroSection } from '../components/sections/NetworkHeroSection';
import { SectionHeading } from '../components/common/SectionHeading';
import { FadeIn } from '../components/animations/FadeIn';
import { CTASection } from '../components/common/CTASection';
import { NetworkLogisticsVideo } from '../components/sections/NetworkLogisticsVideo';
import {
  Radio,
  Truck,
  Users,
  ShieldCheck,
  CheckCircle2,
  Navigation,
  Activity,
  Clock,
} from 'lucide-react';

interface CorridorData {
  id: string;
  name: string;
  tag: string;
  regions: string;
  description: string;
  transitHours: string;
  activeFeatures: string[];
}

const corridorList: CorridorData[] = [
  {
    id: 'western',
    name: 'Western India Network',
    tag: 'Main Transport Route',
    regions: 'Pune • Mumbai • Ahmedabad • Surat • Nashik',
    description:
      'We connect major business and industrial cities across Western India and help businesses move their goods safely and on time.',
    transitHours: 'Regular Transport Service',
    activeFeatures: [
      'Operations managed from Pune',
      'Regular goods transportation',
      'Dedicated drivers and transport support',
    ],
  },
  {
    id: 'northern',
    name: 'Northern India Network',
    tag: 'North India Routes',
    regions: 'Delhi NCR • Gurgaon • Jaipur • Chandigarh • Ludhiana',
    description:
      'We connect important cities across North India to support the smooth movement of goods for businesses.',
    transitHours: 'Regular Transport Service',
    activeFeatures: [
      'Transportation across major highways',
      'Experienced drivers for long-distance trips',
      'Support during transportation',
    ],
  },
  {
    id: 'southern',
    name: 'Southern India Network',
    tag: 'South India Routes',
    regions: 'Bengaluru • Chennai • Hyderabad • Coimbatore • Hosur',
    description:
      'We provide transportation services across major business and industrial cities in South India.',
    transitHours: 'Regular Transport Service',
    activeFeatures: [
      'Regular transportation support',
      'Goods movement for different industries',
      'Reliable transport services',
    ],
  },
  {
    id: 'eastern',
    name: 'Eastern India Network',
    tag: 'East India Routes',
    regions: 'Kolkata • Bhubaneswar • Raipur • Jamshedpur',
    description:
      'We connect important cities in Eastern India and support businesses with their transportation needs.',
    transitHours: 'Regular Transport Service',
    activeFeatures: [
      'Industrial goods transportation',
      'Support for business deliveries',
      'Transport services across major routes',
    ],
  },
];

export const NetworkPage: React.FC = () => {
  const [selectedCorridor, setSelectedCorridor] = useState<CorridorData>(corridorList[0]);

  return (
    <PageTransition>
      {/* SECTION 1: HERO */}
      <NetworkHeroSection />

      {/* SECTION 2: OUR TRANSPORT NETWORK & ARCHITECTURE */}
      <section id="explore-network" className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="OUR TRANSPORT NETWORK"
            title="Connecting Businesses Across India"
            subtitle="Prisha Xpress helps businesses transport goods between different cities across India. Our road and air transport network helps move goods from one place to another."
            className="mb-4"
          />

          {/* Logistics Animation Video Player */}
          <NetworkLogisticsVideo />

          {/* The Four Core Network Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: Transport Network */}
            <FadeIn direction="up" delay={0.1}>
              <div className="p-6 sm:p-7 rounded-3xl bg-px-bg border border-px-border shadow-soft-purple hover:shadow-card-hover transition-all duration-300 h-full flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="p-3 rounded-2xl bg-px-lavender text-px-primary w-fit">
                    <Navigation className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-extrabold text-px-dark">Transport Network</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    We connect important cities and business areas across India to make goods transport easier.
                  </p>
                </div>
                <div className="pt-4 border-t border-px-border/80 text-xs font-bold text-px-violet flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Connecting Cities Across India</span>
                </div>
              </div>
            </FadeIn>

            {/* Card 2: Driver Network */}
            <FadeIn direction="up" delay={0.2}>
              <div className="p-6 sm:p-7 rounded-3xl bg-px-bg border border-px-border shadow-soft-purple hover:shadow-card-hover transition-all duration-300 h-full flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="p-3 rounded-2xl bg-px-lavender text-px-primary w-fit">
                    <Users className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-extrabold text-px-dark">Driver Network</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    We work with a large network of drivers who help move goods safely from one place to another.
                  </p>
                </div>
                <div className="pt-4 border-t border-px-border/80 text-xs font-bold text-px-violet flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>1,000+ Drivers</span>
                </div>
              </div>
            </FadeIn>

            {/* Card 3: Fleet Operations */}
            <FadeIn direction="up" delay={0.3}>
              <div className="p-6 sm:p-7 rounded-3xl bg-px-bg border border-px-border shadow-soft-purple hover:shadow-card-hover transition-all duration-300 h-full flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="p-3 rounded-2xl bg-px-lavender text-px-primary w-fit">
                    <Truck className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-extrabold text-px-dark">Fleet Operations</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    We support truck operations and regular vehicle checks to help keep trucks in good working condition.
                  </p>
                </div>
                <div className="pt-4 border-t border-px-border/80 text-xs font-bold text-px-violet flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Better Vehicle Care</span>
                </div>
              </div>
            </FadeIn>

            {/* Card 4: Customer Support */}
            <FadeIn direction="up" delay={0.4}>
              <div className="p-6 sm:p-7 rounded-3xl bg-px-bg border border-px-border shadow-soft-purple hover:shadow-card-hover transition-all duration-300 h-full flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="p-3 rounded-2xl bg-px-lavender text-px-primary w-fit">
                    <Activity className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-extrabold text-px-dark">Customer Support</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    Our team helps with journey updates, driver coordination and transport-related support.
                  </p>
                </div>
                <div className="pt-4 border-t border-px-border/80 text-xs font-bold text-px-violet flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Reliable Support</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* SECTION 3: VISUAL NETWORK EXPERIENCE (Interactive Visualization) */}
      <section className="py-20 bg-px-deep text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading
            theme="dark"
            badge="OUR TRANSPORT NETWORK"
            title="Our Transport Network"
            subtitle="Explore our major transport routes across India. Select any route to see the cities we connect and the services we provide."
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Corridor Selection Tabs (5 cols) */}
            <div className="lg:col-span-5 space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-purple-300 mb-2">
                Select Transport Route:
              </p>
              {corridorList.map((c) => {
                const isSelected = selectedCorridor.id === c.id;
                return (
                  <div
                    key={c.id}
                    onClick={() => setSelectedCorridor(c)}
                    className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 ${
                      isSelected
                        ? 'bg-white/15 border-purple-300 shadow-lg translate-x-1.5'
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                        <Radio
                          className={`w-4 h-4 ${
                            isSelected ? 'text-emerald-400 animate-pulse' : 'text-gray-400'
                          }`}
                        />
                        {c.name}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/30 text-purple-200 border border-purple-400/30">
                        {c.tag}
                      </span>
                    </div>
                    <p className="text-xs text-purple-200 mt-2 font-medium">{c.regions}</p>
                  </div>
                );
              })}
            </div>

            {/* Right: Detailed Information Panel & Visual Map Overlay (7 cols) */}
            <div className="lg:col-span-7">
              <div className="p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-white/10">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-purple-200">
                      Route Details
                    </span>
                    <h3 className="text-2xl font-extrabold text-white mt-1">
                      {selectedCorridor.name}
                    </h3>
                  </div>
                  <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-xs font-bold text-emerald-300 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{selectedCorridor.transitHours}</span>
                  </div>
                </div>

                {/* Map Visual with Motion Path */}
                <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-black/40">
                  <img
                    src="/assets/images/corridor-network-map.jpg"
                    alt={selectedCorridor.name}
                    className="w-full h-64 sm:h-72 lg:h-80 object-cover filter brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  {/* Illustrative Route Line Indicator */}
                  <div className="absolute top-4 left-4 p-2.5 rounded-xl bg-black/70 backdrop-blur-md border border-white/20 text-xs text-purple-200 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span>Cities connected: {selectedCorridor.regions}</span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-xs text-gray-200">
                    <p className="font-semibold text-white">Main Operations Office: Pune, Maharashtra</p>
                    <p className="text-xs text-purple-200 font-medium">Our Pune team supports driver coordination and journey updates across all routes.</p>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-gray-100 leading-relaxed font-normal">
                  {selectedCorridor.description}
                </p>

                {/* Features List */}
                <div className="space-y-2 pt-2 border-t border-white/10">
                  <p className="text-xs font-bold uppercase tracking-wider text-purple-200">
                    Key Service Highlights
                  </p>
                  {selectedCorridor.activeFeatures.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2.5 text-xs sm:text-sm text-white font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: FLEET OPERATIONS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-px-violet">
                Fleet Reliability
              </span>
              <h2 className="text-3xl font-extrabold text-px-dark">
                Modern Heavy Fleet Operations & Mechanical Assurance
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                A dependable network is only as strong as the vehicles that traverse it. Prisha Xpress enforces strict mechanical readiness across all participating commercial vehicles, combining scheduled multi-point checks, express service turnaround, and direct access to genuine OEM spare parts.
              </p>

              <div className="space-y-3 pt-1">
                <div className="p-4 rounded-2xl bg-px-bg border border-px-border flex items-start gap-3">
                  <Truck className="w-5 h-5 text-px-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-px-dark">Multi-Axle & Container Capability</h4>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Configured for diverse commercial cargo needs—from FMCG pallets to heavy industrial equipment.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-px-bg border border-px-border flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-px-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-px-dark">Pre-Trip Safety & Fitness Check</h4>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Brakes, tires, electricals, and engine vitals are thoroughly inspected before vehicle dispatch.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-px-deep">
                <img
                  src="/assets/images/fleet-warehouse.jpg"
                  alt="Prisha Xpress Fleet Operations"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: DRIVER NETWORK */}
      <section className="py-20 bg-px-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-px-deep">
                <img
                  src="/assets/images/careers-driver.jpg"
                  alt="Prisha Xpress Driver Network"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-px-violet">
                Human Infrastructure
              </span>
              <h2 className="text-3xl font-extrabold text-px-dark">
                The Backbone of Our Network: 1,000+ Skilled Drivers
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Prisha Xpress views commercial drivers as respected partners and micro-entrepreneurs. Our vetted drivers are trained in customer etiquette, vehicle care, road safety, and digital proof-of-delivery, ensuring high service quality on every trip.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-1">
                <div className="p-4 rounded-2xl bg-white border border-px-border">
                  <p className="text-2xl font-black text-px-primary">1,000+</p>
                  <p className="text-xs font-bold text-px-dark mt-1">Documented Drivers</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">Background-verified crew</p>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-px-border">
                  <p className="text-2xl font-black text-px-primary">100%</p>
                  <p className="text-xs font-bold text-px-dark mt-1">Trip Insured</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">Comprehensive driver safety</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: CTA */}
      <CTASection
        badge="Corridor Contracting"
        title="Connect Your Supply Chain to Our Network"
        subtitle="Speak with our Pune route planning team to book dedicated fleet capacity or evaluate contract transportation across our primary highway corridors."
        primaryBtnText="Discuss Network Rates"
        primaryBtnLink="/contact#enquiry"
      />
    </PageTransition>
  );
};
