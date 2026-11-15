// PRISHA XPRESS PVT. LTD. - MODULE B: DRIVER APPLICATIONS ADMIN
// ROUTE: /admin/driver-applications
// STRICT SEPARATION: DRIVER FLEET REPOSITORIES ONLY. NEVER MIXES STAFF RECORDS.

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  recruitmentService,
} from '../../services/recruitmentService';
import {
  DriverApplication,
  DriverApplicationStatus,
  DriverVerificationStatus,
  VehicleCategory,
} from '../../types/recruitment';
import {
  Search,
  Download,
  Eye,
  ShieldCheck,
  ArrowRight,
  RefreshCw,
} from 'lucide-react';

const APP_STATUS_CLASSES: Record<DriverApplicationStatus, string> = {
  Submitted: 'bg-amber-100 text-amber-800 border-amber-200',
  'Pending Verification': 'bg-amber-100 text-amber-800 border-amber-200',
  'Information Required': 'bg-orange-100 text-orange-800 border-orange-200',
  'Under Review': 'bg-blue-100 text-blue-800 border-blue-200',
  'Approved – Ready for Company Software': 'bg-purple-100 text-px-primary border-purple-200',
  Rejected: 'bg-rose-100 text-rose-800 border-rose-200',
  'Adding to Company Software': 'bg-indigo-100 text-indigo-800 border-indigo-200',
  'Added to Company Software': 'bg-emerald-100 text-emerald-800 border-emerald-200',
  'Integration Failed': 'bg-red-100 text-red-800 border-red-200',
};

const VERIF_STATUS_CLASSES: Record<DriverVerificationStatus, string> = {
  Pending: 'bg-amber-50 text-amber-700 border-amber-200',
  Verified: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Unclear: 'bg-orange-50 text-orange-700 border-orange-200',
  Invalid: 'bg-rose-50 text-rose-700 border-rose-200',
};

export const DriverApplicationsAdminPage: React.FC = () => {
  const navigate = useNavigate();
  const [drivers, setDrivers] = useState<DriverApplication[]>([]);
  const [selectedDriver, setSelectedDriver] = useState<DriverApplication | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<VehicleCategory | 'All'>('All');
  const [selectedStatus, setSelectedStatus] = useState<DriverApplicationStatus | 'All'>('All');
  const [selectedVerification, setSelectedVerification] = useState<DriverVerificationStatus | 'All'>('All');
  const [showFullLicence, setShowFullLicence] = useState(false);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<DriverApplicationStatus>('Under Review');
  const [statusReason, setStatusReason] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);

  const currentUser = recruitmentService.getCurrentUser();

  const loadData = async (syncWithDb = false) => {
    if (syncWithDb) {
      setIsSyncing(true);
      await recruitmentService.syncDriverApplicationsFromDb();
      setIsSyncing(false);
    }
    const list = recruitmentService.getDriverApplications({
      search: searchQuery,
      category: selectedCategory,
      status: selectedStatus,
      verification: selectedVerification,
    });
    setDrivers(list);
  };

  useEffect(() => {
    loadData(true);
  }, []);

  useEffect(() => {
    loadData(false);
  }, [searchQuery, selectedCategory, selectedStatus, selectedVerification]);

  const maskLicence = (lic: string) => {
    if (!lic || lic.length < 8) return lic;
    return `${lic.slice(0, 4)} •••• ${lic.slice(-4)}`;
  };

  const handleUpdateStatus = () => {
    if (!selectedDriver) return;
    try {
      const updated = recruitmentService.updateDriverStatus(
        selectedDriver.id,
        newStatus,
        statusReason || `Driver status updated to ${newStatus} by ${currentUser.name}`
      );
      setSelectedDriver(updated);
      setStatusModalOpen(false);
      setStatusReason('');
      loadData();
    } catch (e: any) {
      alert(e?.message || 'Failed to update driver status');
    }
  };

  const exportReport = () => {
    const csvRows = [
      [
        'Reference',
        'Driver Name',
        'Mobile Number',
        'Licence Number (Masked)',
        'Vehicle Categories',
        'Total Experience',
        'Heavy Vehicle Exp',
        'Preferred Location',
        'Expected Salary',
        'Verification Status',
        'Application Status',
        'External Driver ID',
      ],
      ...drivers.map((drv) => [
        drv.application_reference,
        `"${drv.full_name}"`,
        `"${drv.mobile_number}"`,
        `"${maskLicence(drv.licence_number)}"`,
        `"${drv.vehicle_categories.join(', ')}"`,
        `"${drv.total_driving_experience}"`,
        `"${drv.heavy_vehicle_experience}"`,
        `"${drv.preferred_work_location}"`,
        drv.expected_monthly_salary || 0,
        drv.verification_status,
        drv.application_status,
        drv.external_driver_id || 'Not Integrated',
      ]),
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.map((e) => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `PrishaXpress_Driver_Roster_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1. Header with Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-px-deep text-white font-extrabold text-[10px] uppercase tracking-wider">
              Module B (Driver Database)
            </span>
            <span className="text-xs text-gray-500">• {drivers.length} Driver Records</span>
          </div>
          <h1 className="text-2xl font-black text-px-dark tracking-tight mt-1">
            Commercial Driver Applications
          </h1>
          <p className="text-xs text-gray-500">
            Dedicated fleet recruitment cell for heavy commercial vehicle drivers and transport captains.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => loadData(true)}
            disabled={isSyncing}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-purple-200 bg-purple-50/80 hover:bg-purple-100/80 text-xs font-bold text-px-primary transition-all disabled:opacity-50"
            title="Fetch latest online driver registrations from Supabase Cloud Database"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Syncing...' : 'Sync Cloud DB'}</span>
          </button>

          <Link
            to="/admin/driver-verification"
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-px-primary font-bold text-xs border border-purple-200 transition-all"
          >
            <ShieldCheck className="w-4 h-4 text-px-primary" />
            <span>Verification Bay</span>
          </Link>
          <button
            onClick={exportReport}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-xs font-bold text-gray-700 shadow-xs transition-all"
          >
            <Download className="w-4 h-4 text-px-primary" />
            <span>Export Driver CSV</span>
          </button>
        </div>
      </div>

      {/* 2. Filters & Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-px-border shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search driver name, ref, licence, RTO..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-px-primary"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Vehicle Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as any)}
            className="px-3 py-2 rounded-xl border border-gray-200 text-xs bg-white text-gray-700 focus:outline-none focus:border-px-primary"
          >
            <option value="All">All Vehicle Classes</option>
            <option value="HMV">HMV</option>
            <option value="HGMV">HGMV</option>
            <option value="Transport Vehicle">Transport Vehicle</option>
            <option value="Trailer / Multi-Axle">Trailer / Multi-Axle</option>
            <option value="Container Vehicle">Container Vehicle</option>
            <option value="LMV">LMV</option>
          </select>

          {/* Verification Filter */}
          <select
            value={selectedVerification}
            onChange={(e) => setSelectedVerification(e.target.value as any)}
            className="px-3 py-2 rounded-xl border border-gray-200 text-xs bg-white text-gray-700 focus:outline-none focus:border-px-primary"
          >
            <option value="All">All Verification States</option>
            <option value="Pending">Pending</option>
            <option value="Verified">Verified</option>
            <option value="Unclear">Unclear</option>
            <option value="Invalid">Invalid</option>
          </select>

          {/* Application Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as any)}
            className="px-3 py-2 rounded-xl border border-gray-200 text-xs bg-white text-gray-700 focus:outline-none focus:border-px-primary"
          >
            <option value="All">All Application Statuses</option>
            <option value="Submitted">Submitted</option>
            <option value="Pending Verification">Pending Verification</option>
            <option value="Under Review">Under Review</option>
            <option value="Approved – Ready for Company Software">Approved – Ready for Software</option>
            <option value="Added to Company Software">Added to Company Software</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* 3. Driver Applications Table */}
      <div className="bg-white rounded-3xl border border-px-border shadow-soft-purple overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-px-bg/80 border-b border-px-border text-gray-500 font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4">Driver Ref</th>
                <th className="py-3.5 px-4">Driver Name</th>
                <th className="py-3.5 px-4">Licence Number</th>
                <th className="py-3.5 px-4">Authorized Categories</th>
                <th className="py-3.5 px-4">Experience</th>
                <th className="py-3.5 px-4">Verification</th>
                <th className="py-3.5 px-4">Application Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {drivers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-gray-400">
                    No commercial drivers matching current filters.
                  </td>
                </tr>
              ) : (
                drivers.map((drv) => (
                  <tr
                    key={drv.id}
                    className="hover:bg-purple-50/40 transition-colors cursor-pointer"
                    onClick={() => setSelectedDriver(drv)}
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-px-primary">
                      {drv.application_reference}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-px-dark">{drv.full_name}</div>
                      <div className="text-[11px] text-gray-400">{drv.mobile_number}</div>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-gray-700">
                      {maskLicence(drv.licence_number)}
                      <span className="block text-[10px] text-gray-400 font-sans font-normal">{drv.issuing_rto}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1 max-w-[200px]">
                        {drv.vehicle_categories.slice(0, 2).map((cat) => (
                          <span
                            key={cat}
                            className="px-2 py-0.5 rounded-md bg-purple-50 text-px-primary text-[10px] font-bold"
                          >
                            {cat}
                          </span>
                        ))}
                        {drv.vehicle_categories.length > 2 && (
                          <span className="px-1.5 py-0.5 rounded-md bg-gray-100 text-gray-600 text-[10px]">
                            +{drv.vehicle_categories.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-gray-800">{drv.total_driving_experience}</span>
                      <span className="block text-[10px] text-gray-400">Heavy: {drv.heavy_vehicle_experience}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                          VERIF_STATUS_CLASSES[drv.verification_status]
                        }`}
                      >
                        {drv.verification_status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                          APP_STATUS_CLASSES[drv.application_status]
                        }`}
                      >
                        {drv.application_status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedDriver(drv);
                        }}
                        className="px-2.5 py-1.5 rounded-lg bg-purple-50 text-px-primary hover:bg-px-primary hover:text-white font-bold transition-all text-xs inline-flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Profile</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Full Driver Profile Drawer / Modal */}
      {selectedDriver && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-px-border p-6 sm:p-8 animate-fadeIn space-y-6">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-gray-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-px-primary text-sm">
                    {selectedDriver.application_reference}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                      APP_STATUS_CLASSES[selectedDriver.application_status]
                    }`}
                  >
                    {selectedDriver.application_status}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                      VERIF_STATUS_CLASSES[selectedDriver.verification_status]
                    }`}
                  >
                    Doc Verif: {selectedDriver.verification_status}
                  </span>
                </div>
                <h2 className="text-2xl font-black text-px-dark mt-1">
                  {selectedDriver.full_name}
                </h2>
                <p className="text-xs text-gray-500">
                  Registered Commercial Driver • Preferred Route: <strong>{selectedDriver.preferred_work_location}</strong>
                </p>
              </div>

              <button
                onClick={() => setSelectedDriver(null)}
                className="text-gray-400 hover:text-gray-700 p-2 rounded-xl hover:bg-gray-100"
              >
                ✕
              </button>
            </div>

            {/* Profile Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-px-bg space-y-2">
                <p className="font-bold text-px-deep uppercase tracking-wider text-[10px]">Personal & Emergency Contact</p>
                <p><strong>Mobile:</strong> {selectedDriver.mobile_number}</p>
                <p><strong>Emergency:</strong> {selectedDriver.emergency_contact_name} ({selectedDriver.emergency_contact_number})</p>
                <p><strong>DOB / Gender:</strong> {selectedDriver.date_of_birth} ({selectedDriver.gender})</p>
                <p><strong>Address:</strong> {selectedDriver.current_address ? `${selectedDriver.current_address}, ` : ''}{selectedDriver.city}, {selectedDriver.state} - {selectedDriver.pin_code}</p>
              </div>

              <div className="p-4 rounded-2xl bg-px-bg space-y-2">
                <div className="flex justify-between items-center">
                  <p className="font-bold text-px-deep uppercase tracking-wider text-[10px]">Licence & RTO Authorization</p>
                  <button
                    onClick={() => setShowFullLicence(!showFullLicence)}
                    className="text-[10px] font-bold text-px-primary hover:underline"
                  >
                    {showFullLicence ? 'Mask Licence' : 'Show Full'}
                  </button>
                </div>
                <p>
                  <strong>Licence No:</strong>{' '}
                  <span className="font-mono font-bold text-px-primary">
                    {showFullLicence ? selectedDriver.licence_number : maskLicence(selectedDriver.licence_number)}
                  </span>
                </p>
                <p><strong>Type:</strong> {selectedDriver.licence_type}</p>
                <p><strong>RTO:</strong> {selectedDriver.issuing_rto} ({selectedDriver.licence_issuing_state})</p>
                <p><strong>Validity:</strong> {selectedDriver.licence_issue_date} to <strong className="text-emerald-700">{selectedDriver.licence_expiry_date}</strong></p>
                <div>
                  <strong>Categories:</strong>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedDriver.vehicle_categories.map((c) => (
                      <span key={c} className="px-2 py-0.5 rounded-md bg-purple-100 text-px-deep text-[10px] font-bold">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-px-bg space-y-2 sm:col-span-2">
                <p className="font-bold text-px-deep uppercase tracking-wider text-[10px]">Driving Track Record & Vehicle Models</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-gray-700">
                  <p><strong>Total Driving:</strong> {selectedDriver.total_driving_experience}</p>
                  <p><strong>Heavy Vehicle:</strong> {selectedDriver.heavy_vehicle_experience}</p>
                  <p><strong>Availability:</strong> {selectedDriver.availability_to_join}</p>
                  <p><strong>Expected Payout:</strong> ₹{selectedDriver.expected_monthly_salary} / mo</p>
                </div>
                {selectedDriver.types_of_vehicles_driven && (
                  <p className="pt-2 border-t border-gray-200">
                    <strong>Vehicle Models Driven:</strong> {selectedDriver.types_of_vehicles_driven.join(', ')}
                  </p>
                )}
              </div>
            </div>

            {/* Document Verification Snapshot */}
            <div className="p-4 rounded-2xl border border-purple-200 bg-purple-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-6 h-6 text-px-primary shrink-0" />
                <div>
                  <p className="text-xs font-bold text-px-dark">Document Verification Checklist</p>
                  <p className="text-[11px] text-gray-600">
                    {selectedDriver.documents?.length || 0} documents uploaded (Driving Licence, Address Proof, Photo)
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  navigate(`/admin/driver-verification?driverId=${selectedDriver.id}`);
                }}
                className="px-4 py-2 rounded-xl bg-px-primary text-white text-xs font-bold hover:bg-px-violet shadow-sm flex items-center gap-1.5"
              >
                <span>Open Verification Bay</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Bottom Modal Actions */}
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <button
                onClick={() => setSelectedDriver(null)}
                className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50"
              >
                Close Profile
              </button>
              <button
                onClick={() => setStatusModalOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-px-deep text-white text-xs font-bold hover:bg-px-primary shadow-sm"
              >
                Change Application Status
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Driver Status Modal */}
      {statusModalOpen && selectedDriver && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-60 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-px-border animate-fadeIn space-y-4">
            <h3 className="font-bold text-lg text-px-dark">
              Update Driver Status: {selectedDriver.full_name}
            </h3>
            <p className="text-xs text-gray-500">
              Ref: <strong className="font-mono text-px-primary">{selectedDriver.application_reference}</strong>
            </p>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                New Driver Application Status
              </label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs bg-white focus:outline-none focus:border-px-primary"
              >
                <option value="Submitted">Submitted</option>
                <option value="Pending Verification">Pending Verification</option>
                <option value="Information Required">Information Required</option>
                <option value="Under Review">Under Review</option>
                <option value="Approved – Ready for Company Software">Approved – Ready for Company Software</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Admin Comments / Reason
              </label>
              <textarea
                rows={3}
                value={statusReason}
                onChange={(e) => setStatusReason(e.target.value)}
                placeholder="Reason for status change, route assignment notes, or required documents..."
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-px-primary resize-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setStatusModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateStatus}
                className="px-5 py-2 rounded-xl bg-px-deep text-white text-xs font-bold hover:bg-px-primary shadow-sm"
              >
                Save Driver Status
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
