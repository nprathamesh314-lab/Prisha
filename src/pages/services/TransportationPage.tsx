import React from 'react';
import { PageTransition } from '../../components/animations/PageTransition';
import { TransportHero } from '../../components/services/transportation/TransportHero';
import { TransportIntro } from '../../components/services/transportation/TransportIntro';
import { TransportServicesEditorial } from '../../components/services/transportation/TransportServicesEditorial';
import { TransportVisualGallery } from '../../components/services/transportation/TransportVisualGallery';

export const TransportationPage: React.FC = () => {
  return (
    <PageTransition>
      {/* 1. Dynamic Highway Cinematic Hero with Animated Route Paths */}
      <TransportHero />

      {/* 2. Movement & Transit Reliability Introduction */}
      <TransportIntro />

      {/* 3. Asymmetrical Editorial Service Categories */}
      <TransportServicesEditorial />

      {/* 4. Horizontal Visual Gallery Showcase */}
      <TransportVisualGallery />
    </PageTransition>
  );
};
