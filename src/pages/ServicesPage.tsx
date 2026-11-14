import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { PageTransition } from '../components/animations/PageTransition';
import { servicesData } from '../data/companyData';
import { Button } from '../components/common/Button';
import { CheckCircle2, ArrowRight, PhoneCall } from 'lucide-react';
import { companyInfo } from '../data/companyData';

export const ServicesPage: React.FC = () => {
  const { serviceId } = useParams<{ serviceId?: string }>();
  const location = useLocation();

  // Scroll to selected service if present
  useEffect(() => {
    if (serviceId) {
      const el = document.getElementById(serviceId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [serviceId, location.pathname]);

  return (
    <PageTransition>
      {/* Banner */}
      <section className="relative pt-36 pb-20 bg-px-deep text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-px-deep via-px-deep to-px-primary/80" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-xs font-bold uppercase tracking-wider text-purple-200 border border-white/20 mb-4">
            Commercial Portfolio
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Logistics & Fleet Services
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-200 max-w-2xl mx-auto">
            Comprehensive solutions tailored to empower shippers, fleet owners, and commercial operators across India.
          </p>
        </div>
      </section>

      {/* Services List Detail */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {servicesData.map((svc, index) => {
            const isReversed = index % 2 === 1;
            return (
              <div
                key={svc.id}
                id={svc.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center p-8 sm:p-12 rounded-3xl bg-px-bg border border-px-border shadow-soft-purple ${
                  serviceId === svc.id ? 'ring-2 ring-px-primary' : ''
                }`}
              >
                {/* Image */}
                <div className={`lg:col-span-6 ${isReversed ? 'lg:order-2' : ''}`}>
                  <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[16/10] bg-px-deep">
                    <img
                      src={svc.image}
                      alt={svc.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-px-primary text-white shadow">
                        {svc.tag || 'Service Pillar'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className={`lg:col-span-6 space-y-5 ${isReversed ? 'lg:order-1' : ''}`}>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-px-violet">
                      {svc.subtitle}
                    </span>
                    <h2 className="text-3xl font-extrabold text-px-dark mt-1">
                      {svc.title}
                    </h2>
                  </div>

                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {svc.description}
                  </p>

                  <div className="space-y-2.5 pt-2">
                    <p className="text-xs font-bold uppercase text-gray-500 tracking-wider">
                      Key Highlights & Assurance
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {svc.highlights.map((hl, hIdx) => (
                        <div key={hIdx} className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex flex-wrap items-center gap-4">
                    <Button
                      to={`/contact?service=${svc.id}`}
                      variant="primary"
                      icon={<ArrowRight className="w-4 h-4" />}
                    >
                      Enquire For {svc.title}
                    </Button>
                    <a
                      href={`tel:${companyInfo.phone}`}
                      className="inline-flex items-center gap-2 text-xs font-bold text-px-dark hover:text-px-primary"
                    >
                      <PhoneCall className="w-4 h-4 text-px-accent" />
                      <span>{companyInfo.phone}</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </PageTransition>
  );
};
