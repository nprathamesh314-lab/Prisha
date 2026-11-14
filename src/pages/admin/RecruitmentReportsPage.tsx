// PRISHA XPRESS PVT. LTD. - RECRUITMENT REPORTS & EXPORTS
// ROUTE: /admin/reports
// SEPARATE REPORTING FOR MODULE A (STAFF) AND MODULE B (DRIVERS)

import React from 'react';
import { recruitmentService } from '../../services/recruitmentService';
import {
  Download,
  Users,
  Truck,
} from 'lucide-react';

export const RecruitmentReportsPage: React.FC = () => {
  const staffStats = recruitmentService.getStaffStats();
  const driverStats = recruitmentService.getDriverStats();

  const isStaffAllowed = recruitmentService.canAccessStaff();
  const isDriverAllowed = recruitmentService.canAccessDrivers();

  const downloadStaffReport = () => {
    const list = recruitmentService.getStaffApplications();
    const csvRows = [
      ['Application Reference', 'Candidate Name', 'Department', 'Position', 'Qualification', 'Experience', 'Status', 'Date'],
      ...list.map((a) => [
        a.application_reference,
        `"${a.full_name}"`,
        a.department,
        `"${a.position_applied_for}"`,
        `"${a.qualification}"`,
        a.is_fresher ? 'Fresher' : a.total_experience || 'Experienced',
        a.application_status,
        new Date(a.created_at).toLocaleDateString(),
      ]),
    ];
    const csv = 'data:text/csv;charset=utf-8,' + csvRows.map((e) => e.join(',')).join('\n');
    const link = document.createElement('a');
    link.href = encodeURI(csv);
    link.download = `PrishaXpress_Staff_Recruitment_Report_${Date.now()}.csv`;
    link.click();
  };

  const downloadDriverReport = () => {
    const list = recruitmentService.getDriverApplications();
    const csvRows = [
      ['Driver Reference', 'Driver Name', 'Licence Number', 'Categories', 'Experience', 'Verification Status', 'Application Status', 'External ID', 'Date'],
      ...list.map((d) => [
        d.application_reference,
        `"${d.full_name}"`,
        `"${d.licence_number}"`,
        `"${d.vehicle_categories.join(', ')}"`,
        `"${d.total_driving_experience}"`,
        d.verification_status,
        d.application_status,
        d.external_driver_id || 'N/A',
        new Date(d.created_at).toLocaleDateString(),
      ]),
    ];
    const csv = 'data:text/csv;charset=utf-8,' + csvRows.map((e) => e.join(',')).join('\n');
    const link = document.createElement('a');
    link.href = encodeURI(csv);
    link.download = `PrishaXpress_Driver_Operations_Report_${Date.now()}.csv`;
    link.click();
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-px-primary font-extrabold text-[10px] uppercase tracking-wider">
            Governance & Compliance
          </span>
        </div>
        <h1 className="text-2xl font-black text-px-dark tracking-tight mt-1">
          Recruitment & Operations Reports
        </h1>
        <p className="text-xs text-gray-500">
          Independent compliance exports and analytics for HR and Driver fleet operations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Module A Staff Report Card */}
        {isStaffAllowed ? (
          <div className="bg-white rounded-3xl border border-px-border shadow-soft-purple p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-2xl bg-purple-100 text-px-primary">
                  <Users className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-50 text-px-primary">
                  HR Module
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-px-dark">Staff Recruitment Master Report</h3>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                  Export complete candidate details, educational qualifications, department allocations, and recruitment status histories.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 p-4 rounded-2xl bg-px-bg border border-px-border text-xs text-center">
                <div>
                  <span className="text-[10px] text-gray-400 font-bold uppercase">Total</span>
                  <p className="text-lg font-black text-px-dark">{staffStats.total}</p>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 font-bold uppercase">Shortlisted</span>
                  <p className="text-lg font-black text-px-primary">{staffStats.shortlisted}</p>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 font-bold uppercase">Selected</span>
                  <p className="text-lg font-black text-emerald-600">{staffStats.selected}</p>
                </div>
              </div>
            </div>

            <button
              onClick={downloadStaffReport}
              className="w-full py-3 rounded-xl bg-px-primary hover:bg-px-violet text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Download Staff Report (CSV)</span>
            </button>
          </div>
        ) : (
          <div className="p-8 bg-gray-50 rounded-3xl border border-gray-200 text-center text-xs text-gray-400 flex items-center justify-center">
            Staff reporting restricted to HR & Super Admin.
          </div>
        )}

        {/* Module B Driver Report Card */}
        {isDriverAllowed ? (
          <div className="bg-white rounded-3xl border border-px-border shadow-soft-purple p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-2xl bg-purple-100 text-px-primary">
                  <Truck className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-px-deep text-white">
                  Fleet Module
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-px-dark">Driver Fleet & Verification Report</h3>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                  Export verified driver rosters, commercial licence details, vehicle categories authorized, and external TMS integration IDs.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 p-4 rounded-2xl bg-px-bg border border-px-border text-xs text-center">
                <div>
                  <span className="text-[10px] text-gray-400 font-bold uppercase">Total</span>
                  <p className="text-lg font-black text-px-dark">{driverStats.total}</p>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 font-bold uppercase">Verified</span>
                  <p className="text-lg font-black text-blue-600">{driverStats.verified}</p>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 font-bold uppercase">In Master TMS</span>
                  <p className="text-lg font-black text-emerald-600">{driverStats.integrated}</p>
                </div>
              </div>
            </div>

            <button
              onClick={downloadDriverReport}
              className="w-full py-3 rounded-xl bg-px-deep hover:bg-px-primary text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Download Driver Report (CSV)</span>
            </button>
          </div>
        ) : (
          <div className="p-8 bg-gray-50 rounded-3xl border border-gray-200 text-center text-xs text-gray-400 flex items-center justify-center">
            Driver reporting restricted to Driver Admin & Super Admin.
          </div>
        )}
      </div>
    </div>
  );
};
