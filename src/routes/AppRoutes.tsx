import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { AboutPage } from '../pages/AboutPage';
import { NetworkPage } from '../pages/NetworkPage';
import { TruckDriversPage } from '../pages/TruckDriversPage';
import { ServicesOverviewPage } from '../pages/ServicesOverviewPage';
import { TruckDriversOnHirePage } from '../pages/services/TruckDriversOnHirePage';
import { FleetManagementPage } from '../pages/services/FleetManagementPage';
import { TransportationPage } from '../pages/services/TransportationPage';
import { ServiceStationPage } from '../pages/services/ServiceStationPage';
import { AutoSparesPage } from '../pages/services/AutoSparesPage';
import { CareersPage } from '../pages/CareersPage';
import { StaffApplicationPage } from '../pages/careers/StaffApplicationPage';
import { DriverRegistrationPage } from '../pages/careers/DriverRegistrationPage';
import { CsrPage } from '../pages/CsrPage';
import { ContactPage } from '../pages/ContactPage';
import { NotFoundPage } from '../pages/NotFoundPage';

// Admin Dashboard Components
import { AdminLayout } from '../pages/admin/AdminLayout';
import { AdminDashboardOverviewPage } from '../pages/admin/AdminDashboardOverviewPage';
import { StaffApplicationsAdminPage } from '../pages/admin/StaffApplicationsAdminPage';
import { DriverApplicationsAdminPage } from '../pages/admin/DriverApplicationsAdminPage';
import { DriverVerificationPage } from '../pages/admin/DriverVerificationPage';
import { ApprovedDriversPage } from '../pages/admin/ApprovedDriversPage';
import { RecruitmentReportsPage } from '../pages/admin/RecruitmentReportsPage';
import { AuditLogsPage } from '../pages/admin/AuditLogsPage';
import { CompanyMasterSettingsPage } from '../pages/admin/CompanyMasterSettingsPage';

export const AppRoutes: React.FC = () => {
  return (
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

      {/* Public Careers & Recruitment Modules (Staff & Driver) */}
      <Route path="/careers" element={<CareersPage />} />
      <Route path="/careers/staff" element={<StaffApplicationPage />} />
      <Route path="/careers/staff-application" element={<StaffApplicationPage />} />
      <Route path="/careers/driver" element={<DriverRegistrationPage />} />
      <Route path="/careers/driver-registration" element={<DriverRegistrationPage />} />

      {/* Corporate Responsibility & Contact */}
      <Route path="/csr" element={<CsrPage />} />
      <Route path="/contact" element={<ContactPage />} />

      {/* Private Admin Dashboard Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboardOverviewPage />} />
        <Route path="staff-applications" element={<StaffApplicationsAdminPage />} />
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
  );
};
