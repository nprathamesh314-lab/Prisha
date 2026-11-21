import React from 'react';
import { PageTransition } from '../../components/animations/PageTransition';
import { DriverHero } from '../../components/services/drivers/DriverHero';
import { DriverIntro } from '../../components/services/drivers/DriverIntro';
import { DriverResponsibilities } from '../../components/services/drivers/DriverResponsibilities';
import { DriverFaqSection } from '../../components/services/drivers/DriverFaqSection';
import { DriverCTA } from '../../components/services/drivers/DriverCTA';

export const TruckDriversOnHirePage: React.FC = () => {
  return (
    <PageTransition>
      {/* 1. Driver-Focused Human-Centred Hero */}
      <DriverHero />

      {/* 2. Driver-Focused Introduction & Welfare Story */}
      <DriverIntro />

      {/* 3. Driver Responsibilities with Circular Avatar Cards */}
      <DriverResponsibilities />

      {/* 4. Driver FAQs */}
      <DriverFaqSection />

      {/* 5. Dual-Action Driver & Enterprise CTA */}
      <DriverCTA />
    </PageTransition>
  );
};
