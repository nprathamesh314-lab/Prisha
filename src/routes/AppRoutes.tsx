import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

// Accessible Branding Loading Fallback
const RouteLoadingFallback: React.FC = () => (
  <div
    role="status"
    aria-live="polite"
    className="min-h-[60vh] flex flex-col items-center justify-center p-6 bg-px-bg"
  >
    <div className="w-12 h-12 rounded-full border-4 border-purple-200 border-t-px-primary animate-spin" />
    <p className="mt-4 text-xs font-bold uppercase tracking-wider text-px-violet">
      Loading Prisha Xpress...
    </p>
    <span className="sr-only">Loading page content</span>
  </div>
);

// Primary Corporate Pages (Lazy-loaded for code splitting and instant initial payload)
const HomePage = lazy(() => import('../pages/HomePage').then((m) => ({ default: m.HomePage })));
const AboutPage = lazy(() => import('../pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const NetworkPage = lazy(() => import('../pages/NetworkPage').then((m) => ({ default: m.NetworkPage })));
const TruckDriversPage = lazy(() => import('../pages/TruckDriversPage').then((m) => ({ default: m.TruckDriversPage })));

// Services Hub and Individual Service Pages
const ServicesOverviewPage = lazy(() => import('../pages/ServicesOverviewPage').then((m) => ({ default: m.ServicesOverviewPage })));
const TruckDriversOnHirePage = lazy(() => import('../pages/services/TruckDriversOnHirePage').then((m) => ({ default: m.TruckDriversOnHirePage })));
const FleetManagementPage = lazy(() => import('../pages/services/FleetManagementPage').then((m) => ({ default: m.FleetManagementPage })));
const TransportationPage = lazy(() => import('../pages/services/TransportationPage').then((m) => ({ default: m.TransportationPage })));
const ServiceStationPage = lazy(() => import('../pages/services/ServiceStationPage').then((m) => ({ default: m.ServiceStationPage })));
const AutoSparesPage = lazy(() => import('../pages/services/AutoSparesPage').then((m) => ({ default: m.AutoSparesPage })));
const ServicesPage = lazy(() => import('../pages/ServicesPage').then((m) => ({ default: m.ServicesPage })));

// Public Careers & Recruitment Modules (Staff & Driver)
const CareersPage = lazy(() => import('../pages/CareersPage').then((m) => ({ default: m.CareersPage })));
const StaffApplicationPage = lazy(() => import('../pages/careers/StaffApplicationPage').then((m) => ({ default: m.StaffApplicationPage })));
const DriverRegistrationPage = lazy(() => import('../pages/careers/DriverRegistrationPage').then((m) => ({ default: m.DriverRegistrationPage })));

// Corporate Responsibility & Contact
const CsrPage = lazy(() => import('../pages/CsrPage').then((m) => ({ default: m.CsrPage })));
const ContactPage = lazy(() => import('../pages/ContactPage').then((m) => ({ default: m.ContactPage })));

// Legal & Policy Pages
const PrivacyPolicyPage = lazy(() => import('../pages/PrivacyPolicyPage').then((m) => ({ default: m.PrivacyPolicyPage })));
const TermsAndConditionsPage = lazy(() => import('../pages/TermsAndConditionsPage').then((m) => ({ default: m.TermsAndConditionsPage })));

// Private Admin Dashboard Components
const AdminLayout = lazy(() => import('../pages/admin/AdminLayout').then((m) => ({ default: m.AdminLayout })));
const AdminDashboardOverviewPage = lazy(() => import('../pages/admin/AdminDashboardOverviewPage').then((m) => ({ default: m.AdminDashboardOverviewPage })));
const BusinessEnquiriesAdminPage = lazy(() => import('../pages/admin/BusinessEnquiriesAdminPage').then((m) => ({ default: m.BusinessEnquiriesAdminPage })));
const StaffApplicationsAdminPage = lazy(() => import('../pages/admin/StaffApplicationsAdminPage').then((m) => ({ default: m.StaffApplicationsAdminPage })));
const DriverApplicationsAdminPage = lazy(() => import('../pages/admin/DriverApplicationsAdminPage').then((m) => ({ default: m.DriverApplicationsAdminPage })));
const DriverVerificationPage = lazy(() => import('../pages/admin/DriverVerificationPage').then((m) => ({ default: m.DriverVerificationPage })));
const ApprovedDriversPage = lazy(() => import('../pages/admin/ApprovedDriversPage').then((m) => ({ default: m.ApprovedDriversPage })));
const RecruitmentReportsPage = lazy(() => import('../pages/admin/RecruitmentReportsPage').then((m) => ({ default: m.RecruitmentReportsPage })));
const AuditLogsPage = lazy(() => import('../pages/admin/AuditLogsPage').then((m) => ({ default: m.AuditLogsPage })));
const CompanyMasterSettingsPage = lazy(() => import('../pages/admin/CompanyMasterSettingsPage').then((m) => ({ default: m.CompanyMasterSettingsPage })));

// 404 Catch-All
const NotFoundPage = lazy(() => import('../pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })));

export const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<RouteLoadingFallback />}>
      <Routes>
        {/* Primary Corporate Pages */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/network" element={<NetworkPage />} />
        <Route path="/drivers" element={<TruckDriversPage />} />

        {/* Services Hub and Individual Service Pages */}
        <Route path="/services" element={<ServicesOverviewPage />} />
        <Route path="/services/truck-drivers-on-hire" element={<TruckDriversOnHirePage />} />
        <Route path="/services/3pl-fleet-management" element={<FleetManagementPage />} />
        <Route path="/services/transportation" element={<TransportationPage />} />
        <Route path="/services/service-station" element={<ServiceStationPage />} />
        <Route path="/services/auto-parts" element={<AutoSparesPage />} />
        <Route path="/services/auto-spares" element={<AutoSparesPage />} />
        <Route path="/services/:serviceId" element={<ServicesPage />} />

        {/* Public Careers & Recruitment Modules (Staff & Driver) */}
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/careers/staff" element={<StaffApplicationPage />} />
        <Route path="/careers/staff-application" element={<StaffApplicationPage />} />
        <Route path="/careers/driver" element={<DriverRegistrationPage />} />
        <Route path="/careers/driver-registration" element={<DriverRegistrationPage />} />

        {/* Corporate Responsibility & Contact */}
        <Route path="/csr" element={<CsrPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/enquiry" element={<ContactPage />} />

        {/* Legal & Policy Pages */}
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditionsPage />} />
        <Route path="/terms" element={<TermsAndConditionsPage />} />

        {/* Private Admin Dashboard Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardOverviewPage />} />
          <Route path="enquiries" element={<BusinessEnquiriesAdminPage />} />
          <Route path="business-enquiries" element={<BusinessEnquiriesAdminPage />} />
          <Route path="staff" element={<StaffApplicationsAdminPage />} />
          <Route path="staff-applications" element={<StaffApplicationsAdminPage />} />
          <Route path="drivers" element={<DriverApplicationsAdminPage />} />
          <Route path="driver-applications" element={<DriverApplicationsAdminPage />} />
          <Route path="driver-verification" element={<DriverVerificationPage />} />
          <Route path="approved-drivers" element={<ApprovedDriversPage />} />
          <Route path="reports" element={<RecruitmentReportsPage />} />
          <Route path="audit-logs" element={<AuditLogsPage />} />
          <Route path="settings" element={<CompanyMasterSettingsPage />} />
        </Route>

        {/* 404 Catch-All */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};
