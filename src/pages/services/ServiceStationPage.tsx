import React from 'react';
import { PageTransition } from '../../components/animations/PageTransition';
import { StationHero } from '../../components/services/service-station/StationHero';
import { StationIntro } from '../../components/services/service-station/StationIntro';
import { StationFacilities } from '../../components/services/service-station/StationFacilities';
import { StationServiceCategories } from '../../components/services/service-station/StationServiceCategories';
import { StationEnvironmentGallery } from '../../components/services/service-station/StationEnvironmentGallery';
import { StationCTA } from '../../components/services/service-station/StationCTA';

export const ServiceStationPage: React.FC = () => {
  return (
    <PageTransition>
      {/* 1. Industrial Architectural Hero with Subtle Mechanical Gear Accent */}
      <StationHero />

      {/* 2. Heavy Vehicle Maintenance Readiness Intro */}
      <StationIntro />

      {/* 3. Verified Industrial Facilities Specifications */}
      <StationFacilities />

      {/* 4. Structured Mechanical Service Categories */}
      <StationServiceCategories />

      {/* 5. Interactive 6-Point Pre-Highway Inspection Checklist & Gallery */}
      <StationEnvironmentGallery />

      {/* 6. Corporate Fleet Maintenance Contracting CTA */}
      <StationCTA />
    </PageTransition>
  );
};
