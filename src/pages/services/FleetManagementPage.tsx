import React from 'react';
import { PageTransition } from '../../components/animations/PageTransition';
import { FleetHero } from '../../components/services/fleet/FleetHero';
import { FleetIntro } from '../../components/services/fleet/FleetIntro';
import { FleetTelemetryDashboard } from '../../components/services/fleet/FleetTelemetryDashboard';
import { FleetInteractiveWorkflow } from '../../components/services/fleet/FleetInteractiveWorkflow';
import { FleetSplitInfo } from '../../components/services/fleet/FleetSplitInfo';
import { FleetCTA } from '../../components/services/fleet/FleetCTA';

export const FleetManagementPage: React.FC = () => {
  return (
    <PageTransition>
      {/* 1. Fleet Technology Cinematic Hero */}
      <FleetHero />

      {/* 2. 3PL Operational Lifecycle Intro */}
      <FleetIntro />

      {/* 3. Dashboard-Style Telemetry Panels */}
      <FleetTelemetryDashboard />

      {/* 4. Interactive Connected Workflow with Animated Lines */}
      <FleetInteractiveWorkflow />

      {/* 5. Split-Screen Comparison: In-House vs Prisha 3PL */}
      <FleetSplitInfo />

      {/* 6. Technology-Focused Enterprise Consultation CTA */}
      <FleetCTA />
    </PageTransition>
  );
};
