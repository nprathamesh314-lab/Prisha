import React from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Cpu,
  Truck,
  Wrench,
  Cog,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';
import { servicesData } from '../../data/companyData';
import { SectionHeading } from '../common/SectionHeading';
import { FadeIn } from '../animations/FadeIn';
import { SwooshDecoration } from '../animations/SwooshDecoration';

const iconMap: Record<string, React.ElementType> = {
  UserCheck: Users,
  Cpu: Cpu,
  Truck: Truck,
  Wrench: Wrench,
  Cog: Cog,
};

export const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-px-bg relative overflow-hidden">
      {/* Background Glows & Circular Swoosh */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-px-lavender/70 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-24 opacity-25 hidden xl:block pointer-events-none">
        <SwooshDecoration size={400} theme="light" speed={35} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="End-to-End Logistics Portfolio"
          title="Our Main Services"
          subtitle="Easy truck transport, trusted drivers, and truck service support across India."
        />

        {/* Featured First 2 Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {servicesData.slice(0, 2).map((service, index) => {
            const Icon = iconMap[service.icon] || Truck;
            return (
              <FadeIn key={service.id} delay={index * 0.15} direction="up">
                <div className="group relative bg-white rounded-3xl overflow-hidden border border-px-border/80 shadow-soft-purple hover:shadow-card-hover transition-all duration-500 flex flex-col h-full">
                  {/* Image Container with Zoom */}
                  <div className="relative h-64 sm:h-72 overflow-hidden bg-px-deep">
                    <img
                      src={service.image}
                      alt={service.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 brightness-95 group-hover:brightness-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    
                    {/* Badge */}
                    {service.tag && (
                      <div className="absolute top-4 left-4">
                        <span className="px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-px-primary text-white shadow-md">
                          {service.tag}
                        </span>
                      </div>
                    )}

                    {/* Icon Pill */}
                    <div className="absolute bottom-4 left-4 p-3 rounded-2xl bg-white/90 backdrop-blur-md text-px-primary shadow-lg group-hover:bg-px-primary group-hover:text-white transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                    <div className="space-y-3">
                      <p className="text-xs font-bold uppercase tracking-wider text-px-violet">
                        {service.subtitle}
                      </p>
                      <h3 className="text-2xl font-extrabold text-px-dark group-hover:text-px-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* Key Highlights */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-gray-100">
                      {service.highlights.map((hl, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="truncate">{hl}</span>
                        </div>
                      ))}
                    </div>

                    {/* Action Link */}
                    <div className="pt-2">
                      <Link
                        to={service.slug}
                        className="inline-flex items-center gap-2 text-sm font-bold text-px-primary group-hover:text-px-deep transition-colors"
                      >
                        <span>Explore {service.title}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>

        {/* Remaining 3 Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicesData.slice(2).map((service, index) => {
            const Icon = iconMap[service.icon] || Truck;
            return (
              <FadeIn key={service.id} delay={(index + 2) * 0.12} direction="up">
                <div className="group relative bg-white rounded-3xl overflow-hidden border border-px-border/80 shadow-soft-purple hover:shadow-card-hover transition-all duration-500 flex flex-col h-full">
                  {/* Image Container with Zoom */}
                  <div className="relative h-48 overflow-hidden bg-px-deep">
                    <img
                      src={service.image}
                      alt={service.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 brightness-95 group-hover:brightness-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Badge */}
                    {service.tag && (
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-px-primary text-white shadow">
                          {service.tag}
                        </span>
                      </div>
                    )}

                    {/* Icon Pill */}
                    <div className="absolute bottom-3 left-3 p-2.5 rounded-xl bg-white/90 backdrop-blur-md text-px-primary shadow group-hover:bg-px-primary group-hover:text-white transition-colors duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-px-violet">
                        {service.subtitle}
                      </p>
                      <h3 className="text-xl font-extrabold text-px-dark group-hover:text-px-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                        {service.description}
                      </p>
                    </div>

                    {/* Highlights */}
                    <div className="space-y-1.5 pt-2 border-t border-gray-100">
                      {service.highlights.slice(0, 2).map((hl, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-xs text-gray-700 font-medium">
                          <CheckCircle className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span className="truncate">{hl}</span>
                        </div>
                      ))}
                    </div>

                    {/* Action Link */}
                    <div className="pt-2">
                      <Link
                        to={service.slug}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-px-primary group-hover:text-px-deep transition-colors"
                      >
                        <span>Explore More</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
};
