// PRISHA XPRESS - INSTANT ROUTE PREFETCH UTILITY
// Preloads page bundles into browser cache on hover/touch for instant 0ms page transitions

const prefetchedRoutes = new Set<string>();

export const prefetchRoute = (path: string): void => {
  // Normalize path
  const cleanPath = path.split('#')[0].split('?')[0];

  if (prefetchedRoutes.has(cleanPath)) return;
  prefetchedRoutes.add(cleanPath);

  switch (cleanPath) {
    case '/about':
      import('../pages/AboutPage');
      break;
    case '/services':
      import('../pages/ServicesOverviewPage');
      break;
    case '/services/truck-drivers-on-hire':
      import('../pages/services/TruckDriversOnHirePage');
      break;
    case '/services/3pl-fleet-management':
      import('../pages/services/FleetManagementPage');
      break;
    case '/services/transportation':
      import('../pages/services/TransportationPage');
      break;
    case '/services/service-station':
      import('../pages/services/ServiceStationPage');
      break;
    case '/services/auto-parts':
    case '/services/auto-spares':
      import('../pages/services/AutoSparesPage');
      break;
    case '/network':
      import('../pages/NetworkPage');
      break;
    case '/drivers':
      import('../pages/TruckDriversPage');
      break;
    case '/careers':
      import('../pages/CareersPage');
      break;
    case '/careers/staff':
    case '/careers/staff-application':
      import('../pages/careers/StaffApplicationPage');
      break;
    case '/careers/driver':
    case '/careers/driver-registration':
      import('../pages/careers/DriverRegistrationPage');
      break;
    case '/csr':
      import('../pages/CsrPage');
      break;
    case '/contact':
      import('../pages/ContactPage');
      break;
    case '/privacy-policy':
    case '/privacy':
      import('../pages/PrivacyPolicyPage');
      break;
    case '/terms-and-conditions':
    case '/terms':
      import('../pages/TermsAndConditionsPage');
      break;
    default:
      break;
  }
};
