import React from 'react';
import { PageTransition } from '../../components/animations/PageTransition';
import { SparesHero } from '../../components/services/auto-spares/SparesHero';
import { SparesIntro } from '../../components/services/auto-spares/SparesIntro';
import { SparesInteractiveCatalog } from '../../components/services/auto-spares/SparesInteractiveCatalog';
import { SparesEnquiryProcess } from '../../components/services/auto-spares/SparesEnquiryProcess';
import { SparesCTA } from '../../components/services/auto-spares/SparesCTA';

export const AutoSparesPage: React.FC = () => {
  return (
    <PageTransition>
      {/* 1. Product-Centric Automotive Parts Hero */}
      <SparesHero />

      {/* 2. Anti-Counterfeit Guarantee & Quality Story */}
      <SparesIntro />

      {/* 3. Interactive Filterable Spare Parts Catalog by Category */}
      <SparesInteractiveCatalog />

      {/* 4. 3-Step Parts Ordering & Verification Process */}
      <SparesEnquiryProcess />

      {/* 5. Direct Parts Procurement & Quote CTA */}
      <SparesCTA />
    </PageTransition>
  );
};
