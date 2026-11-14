import React from 'react';
import { SectionHeading } from '../../common/SectionHeading';
import { FadeIn } from '../../animations/FadeIn';

const galleryItems = [
  {
    image: '/assets/images/hero-fleet.jpg',
    title: 'Interstate Freight Fleets',
    subtitle: 'Modern Mercedes-Benz commercial truck lineup',
  },
  {
    image: '/assets/images/fleet-warehouse.jpg',
    title: 'Loading Terminal & Yard',
    subtitle: 'High-capacity dock bays and trailer marshalling',
  },
  {
    image: '/assets/images/logistics-hub.jpg',
    title: 'Central Distribution Hub',
    subtitle: 'Synchronized highway dispatch operations',
  },
  {
    image: '/assets/images/corporate-hq.jpg',
    title: 'Command & Dispatch Center',
    subtitle: 'Pune operations headquarters and control tower',
  },
];

export const TransportVisualGallery: React.FC = () => {
  return (
    <section className="py-20 bg-px-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Visual Showcase"
          title="On the Road with Prisha Xpress"
          subtitle="A photographic glimpse into our active freight operations, commercial vehicle fleets, and logistics terminals."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryItems.map((item, idx) => (
            <FadeIn key={item.title} delay={idx * 0.1} direction="up">
              <div className="group relative rounded-3xl overflow-hidden shadow-soft-purple hover:shadow-card-hover transition-all duration-500 aspect-[4/3] bg-px-deep border border-px-border">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-px-deep/85 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h4 className="text-sm font-bold text-white group-hover:text-purple-200 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-gray-300 mt-0.5">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
