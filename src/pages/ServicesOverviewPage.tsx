import React from 'react';
import { Link } from 'react-router-dom';
import { PageTransition } from '../components/animations/PageTransition';
import { PageHero } from '../components/common/PageHero';
import { FadeIn } from '../components/animations/FadeIn';
import { CTASection } from '../components/common/CTASection';
import { Button } from '../components/common/Button';
import {
  Users,
  Cpu,
  Truck,
  Wrench,
  Cog,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';

interface ServiceOverviewItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  highlights: string[];
  image: string;
  icon: React.ElementType;
}

const detailedServices: ServiceOverviewItem[] = [
  {
    id: 'truck-drivers-on-hire',
    slug: '/services/truck-drivers-on-hire',
    title: 'Truck Drivers On Hire',
    subtitle: 'Verified & Professionally Trained Commercial Drivers',
    category: 'Driver Staffing Solutions',
    description:
      'Solve driver shortage bottlenecks with on-demand access to a vetted pool of 1,000+ commercial truck drivers. Every driver is trained in road safety, cargo protection, and client etiquette, with complete personal accident and trip insurance coverage.',
    highlights: [
      '1,000+ verified commercial heavy vehicle drivers',
      'Etiquette, hygiene, and defensive driving training',
      'Comprehensive transit & driver personal insurance',
      'Transparent micro-entrepreneur driver welfare model',
    ],
    image: '/assets/images/careers-driver.jpg',
    icon: Users,
  },
  {
    id: '3pl-fleet-management',
    slug: '/services/3pl-fleet-management',
    title: '3PL Fleet Management',
    subtitle: 'Intelligent Telematics & AI-Driven Predictive Maintenance',
    category: 'Technology & Asset Management',
    description:
      'Transform commercial fleet operations into high-efficiency profit centers. Our 3PL fleet management combines real-time GPS telematics, predictive AI maintenance schedules, and dynamic route optimization algorithms that minimize vehicle idle time and lower total operational costs.',
    highlights: [
      'Real-time vehicle telematics & diagnostics',
      'Predictive maintenance alerts to prevent breakdowns',
      'Dynamic route planning for optimal fuel efficiency',
      'Full end-to-end supply chain visibility dashboard',
    ],
    image: '/assets/images/fleet-warehouse.jpg',
    icon: Cpu,
  },
  {
    id: 'transportation',
    slug: '/services/transportation',
    title: 'Transportation',
    subtitle: 'Reliable Pan-India Road Freight & Express Movement',
    category: 'Freight & Line-Haul Logistics',
    description:
      'Precision-designed long-haul and regional road transportation solutions connecting Western, Northern, Southern, and Eastern industrial belts. Engineered for FMCG, manufacturing, retail, and eCommerce enterprises requiring on-time, damage-free delivery SLAs.',
    highlights: [
      'Synchronized pan-India industrial corridor network',
      'Committed delivery timelines with milestone tracking',
      'High-capacity multi-axle and containerized vehicles',
      'Digital proof of delivery (POD) with instant handover',
    ],
    image: '/assets/images/network-map.jpg',
    icon: Truck,
  },
  {
    id: 'service-station',
    slug: '/services/service-station',
    title: 'Service Station',
    subtitle: 'Specialized Commercial Vehicle Maintenance & Diagnostics',
    category: 'Fleet Maintenance Hubs',
    description:
      'Dedicated commercial truck service centers equipped with heavy vehicle bays, modern electronic diagnostics, and certified technicians. We offer preventive maintenance, engine overhauls, brake system care, and express turnaround to ensure zero highway downtime.',
    highlights: [
      'Heavy commercial vehicle service bays & tooling',
      'Electronic diagnostic scanning for modern truck engines',
      'Rapid turnaround SLAs for commercial transport fleets',
      'Preventive health inspections before highway journeys',
    ],
    image: '/assets/images/service-station.jpg',
    icon: Wrench,
  },
  {
    id: 'auto-parts',
    slug: '/services/auto-parts',
    title: 'Auto Spares',
    subtitle: '100% Authentic OEM Heavy Commercial Parts & Consumables',
    category: 'Parts & Components Supply',
    description:
      'Direct access to certified OEM commercial vehicle spare parts and consumables. By eliminating counterfeit components and middlemen, we supply high-grade engine parts, brake systems, suspension components, and lubricants that maximize vehicle longevity.',
    highlights: [
      '100% genuine certified OEM spare parts',
      'Critical roadway and engine spares inventory',
      'Full manufacturer warranty and compliance support',
      'Direct delivery to fleet yards and service stations',
    ],
    image: '/assets/images/logistics-hub.jpg',
    icon: Cog,
  },
];

export const ServicesOverviewPage: React.FC = () => {
  return (
    <PageTransition>
      {/* SECTION 1: HERO */}
      <PageHero
        badge="Enterprise Logistics Portfolio"
        title="Transportation and Logistics Solutions Designed for Business"
        subtitle="Explore our five comprehensive service pillars engineered to deliver reliability, cost-efficiency, and end-to-end supply chain control across India."
        image="/assets/images/fleet-warehouse.jpg"
        breadcrumbs={[{ label: 'Services Overview' }]}
      />

      {/* SECTION 2: 5 DETAILED ALTERNATING SERVICE SECTIONS */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {detailedServices.map((service, index) => {
            const isReversed = index % 2 === 1;
            const Icon = service.icon;

            return (
              <FadeIn key={service.id} direction="up">
                <div
                  id={service.id}
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center p-8 sm:p-12 rounded-3xl bg-px-bg border border-px-border shadow-soft-purple hover:shadow-card-hover transition-all duration-500`}
                >
                  {/* Image Column */}
                  <div className={`lg:col-span-6 ${isReversed ? 'lg:order-2' : ''}`}>
                    <div className="group relative rounded-3xl overflow-hidden shadow-xl aspect-[16/10] bg-px-deep">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 brightness-95 group-hover:brightness-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-px-deep/75 via-transparent to-transparent" />

                      {/* Floating Category Pill */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-px-primary text-white shadow-md">
                          {service.category}
                        </span>
                      </div>

                      {/* Bottom Icon */}
                      <div className="absolute bottom-4 left-4 p-3 rounded-2xl bg-white/95 backdrop-blur-md text-px-primary shadow-lg">
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>
                  </div>

                  {/* Text & Details Column */}
                  <div className={`lg:col-span-6 space-y-6 ${isReversed ? 'lg:order-1' : ''}`}>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-px-violet">
                        {service.subtitle}
                      </span>
                      <h2 className="text-3xl sm:text-4xl font-extrabold text-px-dark mt-1">
                        {service.title}
                      </h2>
                    </div>

                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
                      {service.description}
                    </p>

                    {/* Key Highlights Checklist */}
                    <div className="space-y-2 pt-1 border-t border-px-border/70">
                      <p className="text-xs font-bold uppercase tracking-wider text-px-violet">
                        Operational Highlights
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {service.highlights.map((hl, hIdx) => (
                          <div key={hIdx} className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-800">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span className="truncate">{hl}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-2 flex items-center gap-4">
                      <Button
                        to={service.slug}
                        variant="primary"
                        icon={<ArrowRight className="w-4 h-4" />}
                      >
                        Explore {service.title}
                      </Button>
                      <Link
                        to={`/contact?service=${service.id}`}
                        className="text-xs font-bold text-px-primary hover:text-px-deep transition-colors inline-flex items-center gap-1"
                      >
                        <span>Direct Enquiry</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* SECTION 3: BUSINESS ENQUIRY CTA */}
      <CTASection
        title="Customized Enterprise Transportation Contracts"
        subtitle="Need a hybrid logistics solution combining dedicated drivers, fleet telematics, and regular line-haul routes? Let our team design your operational SLA."
        primaryBtnText="Discuss Your Requirements"
        primaryBtnLink="/contact#enquiry"
      />
    </PageTransition>
  );
};
