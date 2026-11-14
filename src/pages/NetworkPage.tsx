import React, { useState } from 'react';
import { PageTransition } from '../components/animations/PageTransition';
import { PageHero } from '../components/common/PageHero';
import { SectionHeading } from '../components/common/SectionHeading';
import { FadeIn } from '../components/animations/FadeIn';
import { CTASection } from '../components/common/CTASection';
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
    name: 'Western Industrial Corridors',
    tag: 'Primary Operations Belt',
    regions: 'Pune • Mumbai • Ahmedabad • Surat • Nashik',
    description:
      'High-volume freight corridors connecting automotive clusters, heavy manufacturing, and export shipping hubs through continuous dispatch and monitored transit.',
    transitHours: 'Express Next-Day Transit',
    activeFeatures: [
      'Central control operations headquartered in Pune',
      'High-frequency industrial container and trailer movement',
      'Dedicated driver change points and rest stops',
    ],
  },
  {
    id: 'northern',
    name: 'Northern Freight Network',
    tag: 'Strategic Transit Link',
    regions: 'Delhi NCR • Gurgaon • Jaipur • Chandigarh • Ludhiana',
    description:
      'Connecting western and central manufacturing zones to key northern consumer hubs, retail warehouses, and agricultural supply chains.',
    transitHours: 'Scheduled Highway Line-Haul',
    activeFeatures: [
      'National highway corridor transit monitoring',
      'Dual-driver long-haul options for time-sensitive cargo',
      'Trained highway emergency support response',
    ],
  },
  {
    id: 'southern',
    name: 'Southern Commercial Belt',
    tag: 'Tech & Electronics Transit',
    regions: 'Bengaluru • Chennai • Hyderabad • Coimbatore • Hosur',
    description:
      'Precision freight operations serving electronic manufacturing, retail distribution centers, and consumer goods distribution networks.',
    transitHours: 'Standard 36-48 Hr Express',
    activeFeatures: [
      'Strict cargo security protocols and sealed container trucks',
      'Route-experienced commercial drivers familiar with southern routes',
      'Verified service station support near major junction points',
    ],
  },
  {
    id: 'eastern',
    name: 'Eastern Transit Corridors',
    tag: 'Industrial Raw & Finished Goods',
    regions: 'Kolkata • Bhubaneswar • Raipur • Jamshedpur',
    description:
      'Heavy freight lines supporting steel, infrastructure, industrial materials, and commercial distribution across eastern national highway routes.',
    transitHours: 'Heavy Freight Schedules',
    activeFeatures: [
      'Heavy multi-axle vehicle operation expertise',
      'Over-dimensional and bulk cargo route survey capabilities',
      'Statutory interstate checkpoint compliance assurance',
    ],
  },
];

export const NetworkPage: React.FC = () => {
  const [selectedCorridor, setSelectedCorridor] = useState<CorridorData>(corridorList[0]);

  return (
    <PageTransition>
      {/* SECTION 1: HERO */}
      <PageHero
        badge="Pan-India Logistics Infrastructure"
        title="Connecting Transportation Operations Through Our Network"
        subtitle="A synchronized nationwide network connecting Pune headquarters to key industrial clusters, driver touchpoints, and major interstate freight corridors."
        image="/assets/images/network-map.jpg"
        breadcrumbs={[{ label: 'Our Network' }]}
      />

      {/* SECTION 2: OUR NETWORK OVERVIEW */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Network Architecture"
            title="Comprehensive Highway & Operational Connectivity"
            subtitle="Built on four foundational operational pillars ensuring consistent, punctual transit across India."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FadeIn direction="up" delay={0.1}>
              <div className="p-7 rounded-3xl bg-px-bg border border-px-border shadow-soft-purple h-full flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="p-3 rounded-2xl bg-px-lavender text-px-primary w-fit">
                    <Navigation className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-extrabold text-px-dark">Transportation Network</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    Connecting key industrial corridors with dedicated long-haul schedules and committed delivery turnarounds.
                  </p>
                </div>
                <div className="pt-4 border-t border-px-border/80 text-xs font-bold text-px-violet flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Pan-India Corridors</span>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.2}>
              <div className="p-7 rounded-3xl bg-px-bg border border-px-border shadow-soft-purple h-full flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="p-3 rounded-2xl bg-px-lavender text-px-primary w-fit">
                    <Users className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-extrabold text-px-dark">Driver Network</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    Over 1,000 thoroughly verified, safety-trained commercial drivers positioned near critical highway hubs.
                  </p>
                </div>
                <div className="pt-4 border-t border-px-border/80 text-xs font-bold text-px-violet flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>1,000+ Verified Crew</span>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.3}>
              <div className="p-7 rounded-3xl bg-px-bg border border-px-border shadow-soft-purple h-full flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="p-3 rounded-2xl bg-px-lavender text-px-primary w-fit">
                    <Truck className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-extrabold text-px-dark">Fleet Operations</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    Telematics-ready heavy commercial vehicles maintained through preventive checks and dedicated service bays.
                  </p>
                </div>
                <div className="pt-4 border-t border-px-border/80 text-xs font-bold text-px-violet flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Zero Idle Downtime</span>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.4}>
              <div className="p-7 rounded-3xl bg-px-bg border border-px-border shadow-soft-purple h-full flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="p-3 rounded-2xl bg-px-lavender text-px-primary w-fit">
                    <Activity className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-extrabold text-px-dark">Operational Support</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    Centralized Pune control room providing 24/7 journey monitoring, driver coordination, and incident support.
                  </p>
                </div>
                <div className="pt-4 border-t border-px-border/80 text-xs font-bold text-px-violet flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>24/7 Active Control</span>
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
            badge="Interactive Route Experience"
            title="Freight Corridors & Synchronized Route Mapping"
            subtitle="Click on any regional corridor to inspect specific highway connections and operational capabilities."
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Corridor Selection Tabs (5 cols) */}
            <div className="lg:col-span-5 space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-purple-300 mb-2">
                Select Freight Corridor:
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
                      Corridor Specification
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
                    src="/assets/images/network-map.jpg"
                    alt={selectedCorridor.name}
                    className="w-full h-56 sm:h-64 object-cover filter brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  {/* Illustrative Route Line Indicator */}
                  <div className="absolute top-4 left-4 p-2.5 rounded-xl bg-black/70 backdrop-blur-md border border-white/20 text-xs text-purple-200 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span>Illustrative corridor routing: {selectedCorridor.regions}</span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-xs text-gray-300">
                    <p className="font-semibold text-white">Central Transit Node: Pune, Maharashtra</p>
                    <p className="text-[11px] text-gray-400">All routes monitored with centralized driver check-ins.</p>
                  </div>
                </div>

                <p className="text-sm text-gray-200 leading-relaxed">
                  {selectedCorridor.description}
                </p>

                {/* Features List */}
                <div className="space-y-2 pt-2 border-t border-white/10">
                  <p className="text-xs font-bold uppercase tracking-wider text-purple-200">
                    Operational Highlights
                  </p>
                  {selectedCorridor.activeFeatures.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2.5 text-xs text-gray-300">
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
