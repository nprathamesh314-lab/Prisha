// PRISHA XPRESS PVT. LTD. - DRIVER APPLICATIONS & VERIFICATION DASHBOARD
// ROUTE: /admin/drivers & /admin/driver-applications
// CONNECTED TO SUPABASE (PostgreSQL Database + Storage bucket 'driver-documents')

import React, { useState, useEffect } from 'react';
import {
  driverApplicationService,
} from '../../services/driverApplicationService';
import {
  DriverApplicationRecord,
  DriverAppStatus,
} from '../../types/driverApplication';
import {
  Search,
  Download,
  Eye,
  RefreshCw,
  Phone,
  MessageSquare,
  CheckCircle2,
  XCircle,
  Clock,
  ShieldCheck,
  X,
  Maximize2,
  FileText,
  AlertCircle,
  Truck,
} from 'lucide-react';

export const DriverApplicationsAdminPage: React.FC = () => {
  const [drivers, setDrivers] = useState<DriverApplicationRecord[]>([]);
  const [selectedDriver, setSelectedDriver] = useState<DriverApplicationRecord | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [isSyncing, setIsSyncing] = useState(false);

  // Verification modal state
  const [adminRemarks, setAdminRemarks] = useState('');
  const [actionError, setActionError] = useState<string | null>(null);
  const [isProcessingAction, setIsProcessingAction] = useState(false);

  // Full-screen image preview modal
  const [zoomedImage, setZoomedImage] = useState<{ url: string; title: string } | null>(null);

  // Fetch applications
  const loadDrivers = async () => {
    setIsSyncing(true);
    try {
      const list = await driverApplicationService.getDriverApplications();
      setDrivers(list);
    } catch (err) {
      console.error('Error fetching driver applications:', err);
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    loadDrivers();
  }, []);

  // Update adminRemarks when opening modal
  useEffect(() => {
    if (selectedDriver) {
      setAdminRemarks(selectedDriver.admin_remarks || '');
      setActionError(null);
    }
  }, [selectedDriver]);

  // Filtered drivers based on tab and search
  const filteredDrivers = drivers.filter((driver) => {
    const matchesTab =
      activeTab === 'all'
        ? true
        : activeTab === 'pending'
        ? driver.status === 'pending'
        : activeTab === 'approved'
        ? driver.status === 'approved'
        : driver.status === 'rejected';

    if (!matchesTab) return false;

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      driver.full_name.toLowerCase().includes(q) ||
      driver.mobile_number.includes(q) ||
      (driver.whatsapp_number && driver.whatsapp_number.includes(q)) ||
      driver.dl_number.toLowerCase().includes(q) ||
      driver.city.toLowerCase().includes(q) ||
      driver.application_code.toLowerCase().includes(q)
    );
  });

  // Summary counts
  const totalCount = drivers.length;
  const pendingCount = drivers.filter((d) => d.status === 'pending').length;
  const approvedCount = drivers.filter((d) => d.status === 'approved').length;
  const rejectedCount = drivers.filter((d) => d.status === 'rejected').length;

  // Status Action Handlers
  const handleApprove = async () => {
    if (!selectedDriver) return;
    setIsProcessingAction(true);
    setActionError(null);
    try {
      const remarks = adminRemarks.trim() || 'Driving Licence & Aadhaar verified. Approved for hub onboarding.';
      const updated = await driverApplicationService.updateApplicationStatus(
        selectedDriver.id,
        'approved',
        remarks
      );
      setSelectedDriver(updated);
      setDrivers((prev) => prev.map((d) => (d.id === updated.id ? updated : d)));
    } catch (err: any) {
      setActionError(err.message || 'Failed to approve driver application.');
    } finally {
      setIsProcessingAction(false);
    }
  };

  const handleReject = async () => {
    if (!selectedDriver) return;
    if (!adminRemarks.trim()) {
      setActionError('Please provide a reason in Admin Remarks before rejecting this application.');
      return;
    }
    setIsProcessingAction(true);
    setActionError(null);
    try {
      const updated = await driverApplicationService.updateApplicationStatus(
        selectedDriver.id,
        'rejected',
        adminRemarks.trim()
      );
      setSelectedDriver(updated);
      setDrivers((prev) => prev.map((d) => (d.id === updated.id ? updated : d)));
    } catch (err: any) {
      setActionError(err.message || 'Failed to reject driver application.');
    } finally {
      setIsProcessingAction(false);
    }
  };

  // CSV Export
  const exportCSV = () => {
    const headers = [
      'Application ID',
      'Driver Name',
      'Mobile Number',
      'WhatsApp Number',
      'City',
      'PIN Code',
      'Driving Licence',
      'Vehicle Categories',
      'Date of Birth',
      'Status',
      'Admin Remarks',
      'Submission Date',
    ];

    const rows = filteredDrivers.map((d) => [
      d.application_code,
      `"${d.full_name}"`,
      `"${d.mobile_number}"`,
      `"${d.whatsapp_number || d.mobile_number}"`,
      `"${d.city}"`,
      `"${d.pincode}"`,
      `"${d.dl_number}"`,
      `"${d.vehicle_categories.join(', ')}"`,
      `"${d.date_of_birth}"`,
      `"${d.status}"`,
      `"${d.admin_remarks || ''}"`,
      `"${new Date(d.created_at).toLocaleDateString('en-IN')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].map((e) => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `PrishaXpress_Driver_Applications_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Render Status Badge
  const renderStatusBadge = (status: DriverAppStatus) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Approved
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-200">
            <XCircle className="w-3.5 h-3.5 text-rose-600" />
            Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            Pending Review
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-2 sm:px-4">
      {/* 1. Header with Title & Action Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-px-deep text-white font-extrabold text-[10px] uppercase tracking-wider">
              Fleet Recruitment Cell
            </span>
            <span className="text-xs text-gray-500 font-semibold">• Supabase Connected</span>
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight mt-1 flex items-center gap-2">
            <Truck className="w-6 h-6 text-px-primary" />
            Driver Applications & Verification
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Manage commercial heavy vehicle driver registrations, verify documents, and approve applications.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={loadDrivers}
            disabled={isSyncing}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-purple-200 bg-purple-50 hover:bg-purple-100 text-xs font-bold text-px-primary transition-all disabled:opacity-50"
            title="Refresh list from Supabase Database"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Syncing...' : 'Sync Database'}</span>
          </button>

          <button
            type="button"
            onClick={exportCSV}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-xs font-bold text-gray-700 shadow-sm transition-all"
          >
            <Download className="w-3.5 h-3.5 text-px-primary" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* 2. Top Summary Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div
          onClick={() => setActiveTab('all')}
          className={`p-4 rounded-2xl border cursor-pointer transition-all ${
            activeTab === 'all'
              ? 'bg-purple-900 text-white border-purple-900 shadow-md'
              : 'bg-white text-gray-900 border-gray-200 hover:border-purple-200'
          }`}
        >
          <p className={`text-xs font-bold uppercase tracking-wider ${activeTab === 'all' ? 'text-purple-200' : 'text-gray-500'}`}>
            All Drivers
          </p>
          <p className="text-2xl font-black mt-1">{totalCount}</p>
        </div>

        <div
          onClick={() => setActiveTab('pending')}
          className={`p-4 rounded-2xl border cursor-pointer transition-all ${
            activeTab === 'pending'
              ? 'bg-amber-600 text-white border-amber-600 shadow-md'
              : 'bg-white text-gray-900 border-gray-200 hover:border-amber-200'
          }`}
        >
          <p className={`text-xs font-bold uppercase tracking-wider ${activeTab === 'pending' ? 'text-amber-100' : 'text-amber-600'}`}>
            Pending Review
          </p>
          <p className="text-2xl font-black mt-1 text-amber-600">{pendingCount}</p>
        </div>

        <div
          onClick={() => setActiveTab('approved')}
          className={`p-4 rounded-2xl border cursor-pointer transition-all ${
            activeTab === 'approved'
              ? 'bg-emerald-700 text-white border-emerald-700 shadow-md'
              : 'bg-white text-gray-900 border-gray-200 hover:border-emerald-200'
          }`}
        >
          <p className={`text-xs font-bold uppercase tracking-wider ${activeTab === 'approved' ? 'text-emerald-100' : 'text-emerald-600'}`}>
            Approved
          </p>
          <p className="text-2xl font-black mt-1 text-emerald-600">{approvedCount}</p>
        </div>

        <div
          onClick={() => setActiveTab('rejected')}
          className={`p-4 rounded-2xl border cursor-pointer transition-all ${
            activeTab === 'rejected'
              ? 'bg-rose-700 text-white border-rose-700 shadow-md'
              : 'bg-white text-gray-900 border-gray-200 hover:border-rose-200'
          }`}
        >
          <p className={`text-xs font-bold uppercase tracking-wider ${activeTab === 'rejected' ? 'text-rose-100' : 'text-rose-600'}`}>
            Rejected
          </p>
          <p className="text-2xl font-black mt-1 text-rose-600">{rejectedCount}</p>
        </div>
      </div>

      {/* 3. Search Bar & Filter Tabs */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search driver name, mobile, DL number, or city..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs font-medium focus:outline-none focus:border-px-primary"
          />
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {[
            { id: 'all', label: 'All Drivers' },
            { id: 'pending', label: 'Pending Review' },
            { id: 'approved', label: 'Approved' },
            { id: 'rejected', label: 'Rejected' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-purple-900 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Desktop Applications Table / Mobile Cards */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {filteredDrivers.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <Truck className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-base font-bold text-gray-700">No driver applications found</p>
            <p className="text-xs text-gray-400 mt-1">Try adjusting your search query or filter tab.</p>
          </div>
        ) : (
          <>
            {/* Desktop Table View (Hidden on mobile) */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/80 border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    <th className="py-3 px-4">Application ID</th>
                    <th className="py-3 px-4">Driver Name</th>
                    <th className="py-3 px-4">Mobile / WhatsApp</th>
                    <th className="py-3 px-4">City</th>
                    <th className="py-3 px-4">DL Number & Categories</th>
                    <th className="py-3 px-4">Submitted Date</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs">
                  {filteredDrivers.map((driver) => (
                    <tr key={driver.id} className="hover:bg-purple-50/30 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-purple-950">
                        {driver.application_code}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-gray-900">
                        {driver.full_name}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-gray-800">+91 {driver.mobile_number}</div>
                        {driver.whatsapp_number && driver.whatsapp_number !== driver.mobile_number && (
                          <div className="text-[11px] text-gray-400">WA: +91 {driver.whatsapp_number}</div>
                        )}
                      </td>
                      <td className="py-3.5 px-4 font-medium text-gray-700">
                        {driver.city}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-mono font-semibold text-gray-900">{driver.dl_number}</div>
                        <div className="flex flex-wrap gap-1 mt-0.5">
                          {driver.vehicle_categories.slice(0, 2).map((c) => (
                            <span
                              key={c}
                              className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-gray-100 text-gray-700"
                            >
                              {c}
                            </span>
                          ))}
                          {driver.vehicle_categories.length > 2 && (
                            <span className="text-[10px] text-gray-400">+{driver.vehicle_categories.length - 2}</span>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-gray-500 whitespace-nowrap">
                        {new Date(driver.created_at).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {renderStatusBadge(driver.status)}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => setSelectedDriver(driver)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-px-primary hover:bg-px-deep text-white text-xs font-bold shadow-xs transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View & Verify</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile / Tablet Card View (Shown on screens < lg) */}
            <div className="block lg:hidden divide-y divide-gray-100">
              {filteredDrivers.map((driver) => (
                <div key={driver.id} className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-xs text-purple-900 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                      {driver.application_code}
                    </span>
                    {renderStatusBadge(driver.status)}
                  </div>

                  <div>
                    <h3 className="text-sm font-black text-gray-900">{driver.full_name}</h3>
                    <p className="text-xs text-gray-600 mt-0.5">
                      +91 {driver.mobile_number} • {driver.city}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Licence:</span>
                      <span className="font-mono font-bold text-gray-900">{driver.dl_number}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {driver.vehicle_categories.map((c) => (
                        <span key={c} className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-gray-400">
                      {new Date(driver.created_at).toLocaleDateString('en-IN')}
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedDriver(driver)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-px-primary text-white text-xs font-bold shadow-sm"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View & Verify</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* 5. DRIVER VERIFICATION DRAWER / MODAL */}
      {selectedDriver && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden my-auto border border-gray-200">
            {/* Modal Header */}
            <div className="p-4 sm:p-6 bg-gradient-to-r from-purple-50 via-white to-purple-50 border-b border-gray-200 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-black text-sm text-px-primary bg-purple-100/80 px-2.5 py-0.5 rounded-lg border border-purple-200">
                    {selectedDriver.application_code}
                  </span>
                  {renderStatusBadge(selectedDriver.status)}
                </div>
                <h2 className="text-lg sm:text-xl font-black text-gray-900 mt-1">
                  {selectedDriver.full_name}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedDriver(null)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm">
              {/* Quick Contact Bar */}
              <div className="p-3 bg-purple-50/70 rounded-xl border border-purple-100 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-purple-700" />
                  <span className="font-bold text-gray-800">
                    Contact Driver: <span className="text-purple-950 font-black">+91 {selectedDriver.mobile_number}</span>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`tel:+91${selectedDriver.mobile_number}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-purple-200 text-purple-800 font-bold hover:bg-purple-100 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" /> Call Driver
                  </a>
                  <a
                    href={`https://wa.me/91${selectedDriver.whatsapp_number || selectedDriver.mobile_number}?text=${encodeURIComponent(
                      `Hello ${selectedDriver.full_name}, this is Prisha Xpress fleet operations regarding your driver application (${selectedDriver.application_code}).`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-colors shadow-xs"
                  >
                    <MessageSquare className="w-3.5 h-3.5" /> WhatsApp Driver
                  </a>
                </div>
              </div>

              {/* Personal & Licence Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Personal Information */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 space-y-2.5">
                  <h3 className="text-xs font-black text-gray-700 uppercase tracking-wider pb-2 border-b border-gray-200">
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-gray-500 block">Full Name:</span>
                      <span className="font-bold text-gray-900">{selectedDriver.full_name}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block">Date of Birth:</span>
                      <span className="font-bold text-gray-900">{selectedDriver.date_of_birth}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block">Mobile Number:</span>
                      <span className="font-bold text-gray-900">+91 {selectedDriver.mobile_number}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block">WhatsApp Number:</span>
                      <span className="font-bold text-gray-900">+91 {selectedDriver.whatsapp_number || selectedDriver.mobile_number}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block">City & PIN:</span>
                      <span className="font-bold text-gray-900">{selectedDriver.city} - {selectedDriver.pincode}</span>
                    </div>
                    {selectedDriver.emergency_contact && (
                      <div>
                        <span className="text-gray-500 block">Emergency Contact:</span>
                        <span className="font-bold text-gray-900">{selectedDriver.emergency_contact}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Driving Licence Information */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 space-y-2.5">
                  <h3 className="text-xs font-black text-gray-700 uppercase tracking-wider pb-2 border-b border-gray-200">
                    Driving Licence & Categories
                  </h3>
                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-gray-500 block">Driving Licence Number:</span>
                      <span className="font-mono font-black text-sm text-purple-950">{selectedDriver.dl_number}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block mb-1">Authorized Categories:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedDriver.vehicle_categories.map((c) => (
                          <span
                            key={c}
                            className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-900 font-bold text-xs border border-purple-200"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500 block">Submitted At:</span>
                      <span className="font-medium text-gray-800">
                        {new Date(selectedDriver.created_at).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* DOCUMENT VIEWER: Side-by-Side Thumbnails with Click-to-Zoom */}
              <div>
                <h3 className="text-xs font-black text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-px-primary" />
                  Uploaded Verification Documents (Click to Zoom)
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {[
                    { title: 'DL Front', url: selectedDriver.dl_front_url },
                    { title: 'DL Back', url: selectedDriver.dl_back_url },
                    { title: 'Aadhaar Front', url: selectedDriver.aadhaar_front_url },
                    { title: 'Aadhaar Back', url: selectedDriver.aadhaar_back_url },
                    ...(selectedDriver.pan_card_url ? [{ title: 'PAN Card', url: selectedDriver.pan_card_url }] : []),
                  ].map((doc, idx) => (
                    <div
                      key={idx}
                      onClick={() => setZoomedImage({ url: doc.url, title: doc.title })}
                      className="group cursor-pointer rounded-xl border border-gray-200 overflow-hidden bg-gray-50 hover:border-px-primary transition-all shadow-xs"
                    >
                      <div className="aspect-4/3 relative bg-gray-100 flex items-center justify-center overflow-hidden">
                        {doc.url.endsWith('.pdf') ? (
                          <div className="flex flex-col items-center justify-center p-2 text-center">
                            <FileText className="w-8 h-8 text-red-500 mb-1" />
                            <span className="text-[10px] text-gray-500 font-bold">PDF Document</span>
                          </div>
                        ) : (
                          <img
                            src={doc.url}
                            alt={doc.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                          />
                        )}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity">
                          <Maximize2 className="w-5 h-5" />
                        </div>
                      </div>
                      <div className="p-2 text-center bg-white border-t border-gray-100">
                        <p className="text-[11px] font-bold text-gray-800 truncate">{doc.title}</p>
                        <p className="text-[10px] text-px-primary font-bold">Click to view</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ADMIN REMARKS & ACTION CONTROLS */}
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-3">
                <label className="block text-xs font-black text-gray-700 uppercase tracking-wider">
                  Admin Remarks & Verification Notes
                </label>
                <textarea
                  rows={3}
                  value={adminRemarks}
                  onChange={(e) => setAdminRemarks(e.target.value)}
                  placeholder="e.g. DL & Aadhaar numbers verified with RTO database. Approved for Pune hub operations."
                  className="w-full p-3 rounded-xl border border-gray-300 text-xs font-medium focus:border-px-primary focus:outline-none bg-white"
                />

                {actionError && (
                  <p className="text-xs text-red-600 font-semibold flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                    {actionError}
                  </p>
                )}

                <div className="flex flex-wrap items-center justify-end gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={handleReject}
                    disabled={isProcessingAction}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors disabled:opacity-50 shadow-xs"
                  >
                    <XCircle className="w-4 h-4" />
                    Reject Application
                  </button>

                  <button
                    type="button"
                    onClick={handleApprove}
                    disabled={isProcessingAction}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black transition-colors disabled:opacity-50 shadow-md"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Approve Driver
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-3 bg-gray-100 border-t border-gray-200 text-right">
              <button
                type="button"
                onClick={() => setSelectedDriver(null)}
                className="px-4 py-2 text-xs font-bold text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. FULL-SCREEN DOCUMENT ZOOM MODAL */}
      {zoomedImage && (
        <div
          onClick={() => setZoomedImage(null)}
          className="fixed inset-0 z-60 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col"
          >
            <div className="p-3.5 bg-gray-900 text-white flex items-center justify-between">
              <span className="font-bold text-xs">{zoomedImage.title}</span>
              <button
                type="button"
                onClick={() => setZoomedImage(null)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-2 overflow-auto max-h-[82vh] flex items-center justify-center bg-gray-100">
              {zoomedImage.url.endsWith('.pdf') ? (
                <iframe src={zoomedImage.url} title={zoomedImage.title} className="w-[80vw] h-[75vh]" />
              ) : (
                <img
                  src={zoomedImage.url}
                  alt={zoomedImage.title}
                  className="max-h-[78vh] w-auto object-contain rounded-lg shadow-md"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
