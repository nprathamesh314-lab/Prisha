import React from 'react';
import { PageTransition } from '../../components/animations/PageTransition';
import { TransportHero } from '../../components/services/transportation/TransportHero';
import { TransportIntro } from '../../components/services/transportation/TransportIntro';
import { TransportServicesEditorial } from '../../components/services/transportation/TransportServicesEditorial';
import { TransportJourneyTimeline } from '../../components/services/transportation/TransportJourneyTimeline';
import { TransportVisualGallery } from '../../components/services/transportation/TransportVisualGallery';
import { TransportCTA } from '../../components/services/transportation/TransportCTA';

export const TransportationPage: React.FC = () => {
  return (
    <PageTransition>
      {/* 1. Dynamic Highway Cinematic Hero with Animated Route Paths */}
      <TransportHero />

      {/* 2. Movement & Transit Reliability Introduction */}
      <TransportIntro />

      {/* 3. Asymmetrical Editorial Service Categories */}
      <TransportServicesEditorial />

      {/* 4. Connected Process Timeline with Highway Milestones */}
      <TransportJourneyTimeline />

      {/* 5. Horizontal Visual Gallery Showcase */}
      <TransportVisualGallery />

      {/* 6. High-Conversion Route Booking CTA */}
      <TransportCTA />
    </PageTransition>
  );
};
