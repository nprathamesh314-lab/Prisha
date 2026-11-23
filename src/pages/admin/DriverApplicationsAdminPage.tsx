// PRISHA XPRESS PVT. LTD. - CLEAN DRIVER APPLICATIONS DASHBOARD
// ROUTE: /admin/drivers & /admin/driver-applications
// SUPABASE CONNECTED (driver_applications table & driver-documents bucket)

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  driverApplicationService,
} from '../../services/driverApplicationService';
import {
  DriverApplicationRecord,
  DriverAppStatus,
} from '../../types/driverApplication';
import {
  DATE_FILTER_OPTIONS,
  DateRangeFilter,
  isWithinDateRange,
} from '../../utils/dateFilters';
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
  X,
  Maximize2,
  FileText,
  AlertCircle,
  Truck,
  Check,
  ZoomIn,
  ZoomOut,
  RotateCw,
  ExternalLink,
  Trash2,
} from 'lucide-react';

const REJECTION_REASON_CHIPS = [
  'Blurry Driving Licence photo',
  'Blurred ID proof',
  'Driving Licence expired',
  'Incomplete details',
];

export const DriverApplicationsAdminPage: React.FC = () => {
  const [drivers, setDrivers] = useState<DriverApplicationRecord[]>([]);
  const [selectedDriver, setSelectedDriver] = useState<DriverApplicationRecord | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [dateFilter, setDateFilter] = useState<DateRangeFilter>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Verification modal state
  const [adminRemarks, setAdminRemarks] = useState('');
  const [actionError, setActionError] = useState<string | null>(null);
  const [isProcessingAction, setIsProcessingAction] = useState(false);
  const [rejectionPanelOpen, setRejectionPanelOpen] = useState(false);
  const [recentActionResult, setRecentActionResult] = useState<{
    type: 'approved' | 'rejected';
    driver: DriverApplicationRecord;
  } | null>(null);

  // Safe 2-Step Deletion State
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Full-screen image preview lightbox state
  const [zoomedImage, setZoomedImage] = useState<{ url: string; title: string } | null>(null);
  const [zoomScale, setZoomScale] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);

  // Reset zoom & rotation whenever image changes
  useEffect(() => {
    setZoomScale(1);
    setRotation(0);
  }, [zoomedImage]);

  // Keyboard Escape handler to close ONLY the zoomed image
  useEffect(() => {
    if (!zoomedImage) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        setZoomedImage(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [zoomedImage]);

  // Fetch applications
  const loadDrivers = async () => {
    setIsRefreshing(true);
    try {
      const list = await driverApplicationService.getDriverApplications();
      setDrivers(list);
    } catch (err) {
      console.error('Error fetching driver applications:', err);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadDrivers();
  }, []);

  // Update adminRemarks and reset action states when opening modal
  useEffect(() => {
    if (selectedDriver) {
      setAdminRemarks(selectedDriver.admin_remarks || '');
      setActionError(null);
      setRejectionPanelOpen(false);
      setRecentActionResult((prev) => (prev?.driver.id === selectedDriver.id ? prev : null));
    }
  }, [selectedDriver]);

  // Unique cities list for simple filter dropdown
  const cities = ['All', ...Array.from(new Set(drivers.map((d) => d.city).filter(Boolean)))];

  // Safe WhatsApp number helper
  const getCleanWhatsAppNumber = (phone?: string): string => {
    const raw = (phone || '').replace(/\D/g, '');
    if (raw.length === 10) return `91${raw}`;
    if (raw.length === 12 && raw.startsWith('91')) return raw;
    if (raw.length > 10) return `91${raw.slice(-10)}`;
    return raw || '910000000000';
  };

  // 1. Filter by Date Range First
  const dateFilteredDrivers = drivers.filter((driver) =>
    isWithinDateRange(driver.created_at, dateFilter)
  );

  // 2. Summary Counts Dynamically Reflect the Active Date Filter
  const totalCount = dateFilteredDrivers.length;
  const pendingCount = dateFilteredDrivers.filter((d) => d.status === 'pending').length;
  const approvedCount = dateFilteredDrivers.filter((d) => d.status === 'approved').length;
  const rejectedCount = dateFilteredDrivers.filter((d) => d.status === 'rejected').length;

  // 3. Final Filtered Drivers (Card tab, City, Search Query)
  const filteredDrivers = dateFilteredDrivers.filter((driver) => {
    const matchesTab =
      activeTab === 'all'
        ? true
        : activeTab === 'pending'
        ? driver.status === 'pending'
        : activeTab === 'approved'
        ? driver.status === 'approved'
        : driver.status === 'rejected';

    if (!matchesTab) return false;

    if (selectedCity !== 'All' && driver.city !== selectedCity) {
      return false;
    }

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

  // Status Action Handlers
  const handleApprove = async () => {
    if (!selectedDriver) return;
    setIsProcessingAction(true);
    setActionError(null);
    try {
      const remarks = adminRemarks.trim() || 'Driving Licence & Aadhaar verified. Approved for hub operations.';
      const updated = await driverApplicationService.updateApplicationStatus(
        selectedDriver.id,
        'approved',
        remarks
      );
      setSelectedDriver(updated);
      setAdminRemarks(remarks);
      setDrivers((prev) => prev.map((d) => (d.id === updated.id ? updated : d)));
      setRecentActionResult({ type: 'approved', driver: updated });
      setRejectionPanelOpen(false);
      window.dispatchEvent(new CustomEvent('admin_counts_changed'));
    } catch (err: any) {
      setActionError(err.message || 'Failed to approve driver application.');
    } finally {
      setIsProcessingAction(false);
    }
  };

  const handleRejectClick = () => {
    setActionError(null);
    setRejectionPanelOpen(true);
  };

  const handleConfirmReject = async () => {
    if (!selectedDriver) return;
    if (!adminRemarks.trim()) {
      setActionError('Please select or type a short reason before rejecting.');
      return;
    }
    setIsProcessingAction(true);
    setActionError(null);
    try {
      const reason = adminRemarks.trim();
      const updated = await driverApplicationService.updateApplicationStatus(
        selectedDriver.id,
        'rejected',
        reason
      );
      setSelectedDriver(updated);
      setAdminRemarks(reason);
      setDrivers((prev) => prev.map((d) => (d.id === updated.id ? updated : d)));
      setRecentActionResult({ type: 'rejected', driver: updated });
      setRejectionPanelOpen(false);
      window.dispatchEvent(new CustomEvent('admin_counts_changed'));
    } catch (err: any) {
      setActionError(err.message || 'Failed to reject driver application.');
    } finally {
      setIsProcessingAction(false);
    }
  };

  // Safe 2-Step Driver Application Deletion Handler
  const handleDeleteDriver = async () => {
    if (!selectedDriver) return;
    setIsDeleting(true);
    setActionError(null);
    try {
      const idToDelete = selectedDriver.id;
      const appCode = selectedDriver.application_code;
      const driverName = selectedDriver.full_name;

      await driverApplicationService.deleteDriverApplication(idToDelete, appCode);

      // Remove from local state
      const updated = drivers.filter((d) => d.id !== idToDelete && d.application_code !== appCode);
      setDrivers(updated);

      // Dispatch count change for sidebar
      window.dispatchEvent(new CustomEvent('admin_counts_changed'));

      // Close modals
      setDeleteConfirmOpen(false);
      setSelectedDriver(null);

      // Toast notification
      setToastMessage(`Driver application for ${driverName} (${appCode}) was permanently deleted.`);
      setTimeout(() => setToastMessage(null), 5000);
    } catch (err: any) {
      setActionError(`Failed to delete driver application: ${err.message || 'Unknown error'}`);
    } finally {
      setIsDeleting(false);
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = [
      'Application ID',
      'Driver Name',
      'Mobile Number',
      'City',
      'Pincode',
      'DL Number',
      'Vehicle Categories',
      'Status',
      'Admin Remarks',
      'Submission Date',
    ];

    const rows = filteredDrivers.map((d) => [
      `"${d.application_code}"`,
      `"${d.full_name}"`,
      `"${d.mobile_number}"`,
      `"${d.city}"`,
      `"${d.pincode}"`,
      `"${d.dl_number}"`,
      `"${d.vehicle_categories.join(', ')}"`,
      `"${d.status}"`,
      `"${d.admin_remarks || ''}"`,
      `"${new Date(d.created_at).toLocaleDateString('en-IN')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].map((e) => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `PrishaXpress_Drivers_${dateFilter}_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Status Badge Helper
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
            Pending
          </span>
        );
    }
  };

  return (
    <div className="space-y-5 max-w-7xl mx-auto">
      {/* 1. Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            <Truck className="w-6 h-6 text-px-primary" />
            Driver Applications
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Heavy commercial drivers registered for Prisha Xpress logistics network.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={loadDrivers}
            disabled={isRefreshing}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-xs font-bold text-gray-700 shadow-xs transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-px-primary ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
          </button>

          <button
            type="button"
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-xs font-bold text-gray-700 shadow-xs transition-all"
          >
            <Download className="w-3.5 h-3.5 text-px-primary" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* 2. Four Clickable Summary Cards (Dynamic with Date Filter) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          type="button"
          onClick={() => setActiveTab('all')}
          className={`p-4 rounded-2xl border text-left transition-all ${
            activeTab === 'all'
              ? 'bg-purple-900 text-white border-purple-900 shadow-md ring-2 ring-purple-600/30'
              : 'bg-white text-gray-900 border-gray-200 hover:border-purple-300'
          }`}
        >
          <p className={`text-xs font-bold uppercase tracking-wider ${activeTab === 'all' ? 'text-purple-200' : 'text-gray-400'}`}>
            Total Drivers
          </p>
          <p className="text-2xl font-black mt-1">{totalCount}</p>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('pending')}
          className={`p-4 rounded-2xl border text-left transition-all ${
            activeTab === 'pending'
              ? 'bg-amber-600 text-white border-amber-600 shadow-md ring-2 ring-amber-400/30'
              : 'bg-white text-gray-900 border-gray-200 hover:border-amber-300'
          }`}
        >
          <p className={`text-xs font-bold uppercase tracking-wider ${activeTab === 'pending' ? 'text-amber-100' : 'text-amber-600'}`}>
            Pending Review
          </p>
          <p className="text-2xl font-black mt-1 text-amber-600">{pendingCount}</p>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('approved')}
          className={`p-4 rounded-2xl border text-left transition-all ${
            activeTab === 'approved'
              ? 'bg-emerald-700 text-white border-emerald-700 shadow-md ring-2 ring-emerald-400/30'
              : 'bg-white text-gray-900 border-gray-200 hover:border-emerald-300'
          }`}
        >
          <p className={`text-xs font-bold uppercase tracking-wider ${activeTab === 'approved' ? 'text-emerald-100' : 'text-emerald-600'}`}>
            Approved
          </p>
          <p className="text-2xl font-black mt-1 text-emerald-600">{approvedCount}</p>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('rejected')}
          className={`p-4 rounded-2xl border text-left transition-all ${
            activeTab === 'rejected'
              ? 'bg-rose-700 text-white border-rose-700 shadow-md ring-2 ring-rose-400/30'
              : 'bg-white text-gray-900 border-gray-200 hover:border-rose-300'
          }`}
        >
          <p className={`text-xs font-bold uppercase tracking-wider ${activeTab === 'rejected' ? 'text-rose-100' : 'text-rose-600'}`}>
            Rejected
          </p>
          <p className="text-2xl font-black mt-1 text-rose-600">{rejectedCount}</p>
        </button>
      </div>

      {/* 3. Search Bar, Quick Date Filter Buttons & City Filter */}
      <div className="bg-white rounded-2xl border border-gray-200 p-3 sm:p-4 shadow-xs flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full lg:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, phone, city, or ID..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-xs font-medium focus:outline-none focus:border-px-primary"
          />
        </div>

        {/* Date Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-gray-100 rounded-xl overflow-x-auto self-start lg:self-auto">
          {DATE_FILTER_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setDateFilter(opt.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                dateFilter === opt.id
                  ? 'bg-px-primary text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* City Filter */}
        <div className="flex items-center gap-2">
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="px-3 py-2 rounded-xl border border-gray-200 text-xs font-medium bg-white text-gray-700 focus:outline-none focus:border-px-primary"
          >
            {cities.map((city) => (
              <option key={city} value={city}>
                {city === 'All' ? 'All Cities' : city}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 4. Clean 5-Column Table (Desktop) + Mobile Cards */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        {filteredDrivers.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <Truck className="w-10 h-10 text-gray-300 mx-auto mb-2" />
            <p className="text-sm font-bold text-gray-700">No driver records found matching your filters.</p>
            <p className="text-xs text-gray-400 mt-1">Try changing the date filter or clear the search box.</p>
          </div>
        ) : (
          <>
            {/* Desktop Table (Hidden on Mobile) */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-50/70 border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    <th className="py-3 px-4">1. Name & Contact</th>
                    <th className="py-3 px-4">2. Licence & Vehicles</th>
                    <th className="py-3 px-4">3. Location</th>
                    <th className="py-3 px-4">4. Status</th>
                    <th className="py-3 px-4 text-right">5. Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs">
                  {filteredDrivers.map((driver) => (
                    <tr key={driver.id} className="hover:bg-purple-50/20 transition-colors">
                      {/* 1. Name & Phone with quick call / WhatsApp */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-gray-900 text-sm">{driver.full_name}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-gray-600 font-medium">{driver.mobile_number}</span>
                          <a
                            href={`tel:${driver.mobile_number}`}
                            className="p-1 rounded text-purple-700 hover:bg-purple-100 transition-colors"
                            title="Call Driver"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>
                          <a
                            href={`https://wa.me/${getCleanWhatsAppNumber(driver.whatsapp_number || driver.mobile_number)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 rounded text-emerald-600 hover:bg-emerald-50 transition-colors"
                            title="WhatsApp Driver"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </a>
                        </div>
                        <span className="text-[10px] font-mono text-gray-400 block mt-0.5">{driver.application_code}</span>
                      </td>

                      {/* 2. Licence & Vehicles */}
                      <td className="py-3.5 px-4">
                        <span className="font-mono font-bold text-gray-800 text-xs bg-gray-100 px-2 py-0.5 rounded">
                          {driver.dl_number}
                        </span>
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {driver.vehicle_categories.map((cat) => (
                            <span
                              key={cat}
                              className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-purple-50 text-purple-900 border border-purple-100"
                            >
                              {cat}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* 3. Location & PIN */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-gray-800">{driver.city}</div>
                        <div className="text-[11px] text-gray-500 font-mono mt-0.5">PIN: {driver.pincode}</div>
                      </td>

                      {/* 4. Status Badge */}
                      <td className="py-3.5 px-4">
                        {renderStatusBadge(driver.status)}
                      </td>

                      {/* 5. Action */}
                      <td className="py-3.5 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => setSelectedDriver(driver)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-px-primary text-white font-bold text-xs hover:bg-purple-900 transition-all shadow-xs"
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

            {/* Mobile Stacked Cards (Hidden on Desktop) */}
            <div className="block lg:hidden divide-y divide-gray-100">
              {filteredDrivers.map((driver) => (
                <div key={driver.id} className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-bold text-gray-900 text-base">{driver.full_name}</div>
                      <div className="text-xs text-gray-500 font-mono">{driver.application_code}</div>
                    </div>
                    <div>{renderStatusBadge(driver.status)}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                    <div>
                      <span className="text-[10px] text-gray-400 block uppercase font-bold">Licence</span>
                      <span className="font-mono font-bold text-gray-800">{driver.dl_number}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 block uppercase font-bold">Location</span>
                      <span className="font-bold text-gray-800">{driver.city}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {driver.vehicle_categories.map((c) => (
                      <span key={c} className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-900">
                        {c}
                      </span>
                    ))}
                  </div>

                  {/* Thumb-friendly mobile buttons */}
                  <div className="flex items-center gap-2 pt-1">
                    <a
                      href={`tel:${driver.mobile_number}`}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-purple-200 text-purple-800 font-bold text-xs bg-purple-50"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call</span>
                    </a>

                    <a
                      href={`https://wa.me/${getCleanWhatsAppNumber(driver.whatsapp_number || driver.mobile_number)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-xs"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => setSelectedDriver(driver)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-px-primary text-white font-bold text-xs shadow-xs"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Verify</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* 5. Driver Verification Modal (Primary Actions at Top) */}
      {selectedDriver && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden my-auto border border-gray-200">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-purple-50 via-white to-purple-50 border-b border-gray-200 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-xs text-px-primary bg-purple-100 px-2 py-0.5 rounded">
                    {selectedDriver.application_code}
                  </span>
                  {renderStatusBadge(selectedDriver.status)}
                </div>
                <h2 className="text-base sm:text-lg font-black text-gray-900 mt-1">
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

            {/* One-Click Pre-Filled WhatsApp Notification Banner (Approve or Reject) */}
            {recentActionResult && (
              <div className="border-b border-gray-100">
                {recentActionResult.type === 'approved' ? (
                  <div className="p-3.5 sm:p-4 bg-emerald-50 text-emerald-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-fadeIn">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-emerald-900">
                          ✓ Driver Approved! Notify {recentActionResult.driver.full_name} on WhatsApp?
                        </p>
                        <p className="text-[11px] text-emerald-700">
                          Reference: <span className="font-mono font-bold">{recentActionResult.driver.application_code}</span>
                        </p>
                      </div>
                    </div>
                    <a
                      href={`https://wa.me/${getCleanWhatsAppNumber(
                        recentActionResult.driver.whatsapp_number || recentActionResult.driver.mobile_number
                      )}?text=${encodeURIComponent(
                        `Namaste ${recentActionResult.driver.full_name}, congratulations! Your driver application (${recentActionResult.driver.application_code}) with Prisha Xpress Pvt. Ltd. has been APPROVED. Please visit our Pune office with your original Driving Licence and ID documents for onboarding. Contact: +91 7276897727`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Send Approval on WhatsApp</span>
                    </a>
                  </div>
                ) : (
                  <div className="p-3.5 sm:p-4 bg-rose-50 text-rose-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-fadeIn">
                    <div className="flex items-center gap-2.5">
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-rose-900">
                          Application Rejected. Send update to {recentActionResult.driver.full_name} on WhatsApp?
                        </p>
                        <p className="text-[11px] text-rose-700">
                          Reason: {recentActionResult.driver.admin_remarks || adminRemarks}
                        </p>
                      </div>
                    </div>
                    <a
                      href={`https://wa.me/${getCleanWhatsAppNumber(
                        recentActionResult.driver.whatsapp_number || recentActionResult.driver.mobile_number
                      )}?text=${encodeURIComponent(
                        `Namaste ${recentActionResult.driver.full_name}, your driver application (${recentActionResult.driver.application_code}) with Prisha Xpress Pvt. Ltd. could not be approved due to: ${
                          recentActionResult.driver.admin_remarks || adminRemarks
                        }. Please re-apply with clear documents or contact our Pune team at +91 7276897727.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-xs transition-all"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Send Update on WhatsApp</span>
                    </a>
                  </div>
                )}
              </div>
            )}

            {/* Quick Action Bar RIGHT AT THE TOP - With Remarks & Actions */}
            <div className="p-3 sm:p-4 bg-purple-50/80 border-b border-purple-100 space-y-3">
              {/* Admin Remarks / Notes Input (Always visible at top) */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider shrink-0">
                  Admin Remarks / Notes:
                </label>
                <input
                  type="text"
                  value={adminRemarks}
                  onChange={(e) => setAdminRemarks(e.target.value)}
                  placeholder="e.g. DL & ID verified, ready for Pune route..."
                  className="flex-1 px-3 py-1.5 text-xs border border-gray-300 rounded-xl focus:border-px-primary focus:outline-none bg-white font-medium shadow-2xs"
                />
              </div>

              {/* Action Buttons Row */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-purple-100/70">
                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${selectedDriver.mobile_number}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-purple-200 text-purple-900 font-bold text-xs hover:bg-purple-100 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-purple-700" />
                    <span>Call {selectedDriver.mobile_number}</span>
                  </a>

                  <a
                    href={`https://wa.me/${getCleanWhatsAppNumber(selectedDriver.whatsapp_number || selectedDriver.mobile_number)}?text=${encodeURIComponent(
                      `Hello ${selectedDriver.full_name}, this is Prisha Xpress regarding your driver application (${selectedDriver.application_code}).`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleApprove}
                    disabled={isProcessingAction || selectedDriver.status === 'approved'}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all shadow-xs disabled:opacity-50"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{selectedDriver.status === 'approved' ? 'Approved' : 'Approve Driver'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleRejectClick}
                    disabled={isProcessingAction || selectedDriver.status === 'rejected'}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition-all shadow-xs disabled:opacity-50"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Reject</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Inline Rejection Reason Panel (Shown when clicking Reject) */}
            {rejectionPanelOpen && (
              <div className="p-3.5 sm:p-4 bg-rose-50 border-b border-rose-200 space-y-2.5 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-rose-900 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-rose-600" />
                    Select or type rejection reason (Required):
                  </span>
                  <button
                    type="button"
                    onClick={() => setRejectionPanelOpen(false)}
                    className="text-xs text-rose-600 hover:text-rose-800 font-bold"
                  >
                    ✕ Cancel
                  </button>
                </div>

                {/* Quick-select chips */}
                <div className="flex flex-wrap gap-1.5">
                  {REJECTION_REASON_CHIPS.map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => setAdminRemarks(chip)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                        adminRemarks === chip
                          ? 'bg-rose-700 text-white shadow-xs'
                          : 'bg-white border border-rose-200 text-rose-800 hover:bg-rose-100'
                      }`}
                    >
                      {chip}
                    </button>
                  ))}
                </div>

                {/* Custom input */}
                <input
                  type="text"
                  value={adminRemarks}
                  onChange={(e) => setAdminRemarks(e.target.value)}
                  placeholder="Enter specific rejection reason..."
                  className="w-full px-3 py-2 text-xs border border-rose-300 rounded-xl bg-white focus:outline-none focus:border-rose-600 font-medium"
                />

                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setRejectionPanelOpen(false)}
                    className="px-3 py-1.5 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmReject}
                    disabled={isProcessingAction}
                    className="px-4 py-1.5 text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white rounded-lg transition-colors shadow-xs disabled:opacity-50 flex items-center gap-1.5"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Confirm Rejection & Save</span>
                  </button>
                </div>
              </div>
            )}

            {/* Error Message */}
            {actionError && (
              <div className="mx-4 mt-3 p-2.5 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{actionError}</span>
              </div>
            )}

            {/* Modal Body */}
            <div className="p-4 sm:p-5 overflow-y-auto space-y-4">
              {/* Driver Details Card */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-gray-50 p-3.5 rounded-xl border border-gray-100 text-xs">
                <div>
                  <span className="text-[10px] text-gray-400 block uppercase font-bold">Date of Birth</span>
                  <span className="font-semibold text-gray-800">{selectedDriver.date_of_birth}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block uppercase font-bold">City / Location</span>
                  <span className="font-semibold text-gray-800">{selectedDriver.city} ({selectedDriver.pincode})</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block uppercase font-bold">Driving Licence</span>
                  <span className="font-mono font-bold text-purple-900">{selectedDriver.dl_number}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block uppercase font-bold">Emergency Contact</span>
                  <span className="font-semibold text-gray-800">
                    {selectedDriver.emergency_contact || 'None provided'}
                  </span>
                </div>
              </div>

              {/* Vehicle Categories */}
              <div>
                <span className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block mb-1.5">
                  Authorized Vehicle Categories
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedDriver.vehicle_categories.map((cat) => (
                    <span
                      key={cat}
                      className="px-2.5 py-1 rounded-lg text-xs font-bold bg-purple-100 text-purple-900 border border-purple-200 flex items-center gap-1.5"
                    >
                      <Check className="w-3 h-3 text-purple-700" />
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Document Thumbnails with Click-to-Zoom */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">
                    Uploaded Documents (Click thumbnail to view full-screen)
                  </span>
                  <span className="text-[10px] text-purple-800 font-bold">Click any document to inspect</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
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
                            <FileText className="w-7 h-7 text-red-500 mb-1" />
                            <span className="text-[10px] text-gray-500 font-bold">PDF</span>
                          </div>
                        ) : (
                          <img
                            src={doc.url}
                            alt={doc.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                          />
                        )}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity">
                          <Maximize2 className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="p-1.5 text-center bg-white border-t border-gray-100">
                        <p className="text-[11px] font-bold text-gray-800 truncate">{doc.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer with Safe Delete Button */}
            <div className="p-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setDeleteConfirmOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-50 border border-rose-200 rounded-lg transition-colors cursor-pointer"
                title="Delete this driver application permanently"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Application</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedDriver(null);
                  setDeleteConfirmOpen(false);
                }}
                className="px-4 py-1.5 text-xs font-bold text-gray-600 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Safe 2-Step Driver Deletion Confirmation Modal */}
      {deleteConfirmOpen && selectedDriver && (
        <div className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-gray-200 overflow-hidden animate-scaleUp">
            <div className="p-5 sm:p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-6 h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
                Delete Driver Application Permanently?
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                Delete application from <span className="font-bold text-gray-900">{selectedDriver.full_name}</span> ({selectedDriver.application_code})? This action cannot be undone.
              </p>
              <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 text-left mb-6">
                <p className="text-[11px] font-medium text-rose-800 leading-normal flex items-start gap-1.5">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
                  <span>This will permanently delete this driver record from Supabase and delete all uploaded documents (DL, Aadhaar, PAN) from cloud storage.</span>
                </p>
              </div>

              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={() => setDeleteConfirmOpen(false)}
                  className="w-1/2 px-4 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm font-bold text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={handleDeleteDriver}
                  className="w-1/2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs sm:text-sm font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {isDeleting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Deleting...</span>
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4" />
                      <span>Yes, Delete Permanently</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* User Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[100] max-w-md bg-gray-900 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-gray-700 animate-slideUp">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <p className="text-xs font-medium">{toastMessage}</p>
          <button
            onClick={() => setToastMessage(null)}
            className="text-gray-400 hover:text-white ml-auto"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 6. Full-Screen Document Zoom Lightbox (React Portal to document.body, z-[9999]) */}
      {zoomedImage &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            onClick={(e) => {
              e.stopPropagation();
              setZoomedImage(null);
            }}
            className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex flex-col animate-fadeIn select-none"
          >
            {/* Top Toolbar */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="p-3 sm:p-4 bg-gray-900/95 border-b border-gray-800 text-white flex items-center justify-between gap-3 shrink-0"
            >
              {/* Document Title with Driver Name */}
              <div className="flex items-center gap-2 min-w-0">
                <FileText className="w-4 h-4 text-purple-400 shrink-0" />
                <h3 className="font-bold text-xs sm:text-sm truncate">
                  {zoomedImage.title} {selectedDriver ? `— ${selectedDriver.full_name}` : ''}
                </h3>
              </div>

              {/* Action Controls: Zoom In, Zoom Out, Rotate, Open in Tab, Close */}
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setZoomScale((prev) => Math.min(prev + 0.25, 3))}
                  className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-200 hover:text-white transition-colors"
                  title="Zoom In (+)"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setZoomScale((prev) => Math.max(prev - 0.25, 0.5))}
                  className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-200 hover:text-white transition-colors"
                  title="Zoom Out (-)"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setRotation((prev) => (prev + 90) % 360)}
                  className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-200 hover:text-white transition-colors"
                  title="Rotate 90°"
                >
                  <RotateCw className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setZoomScale(1);
                    setRotation(0);
                  }}
                  className="px-2.5 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-[11px] font-bold text-gray-300 hover:text-white transition-colors"
                  title="Reset Zoom & Rotation"
                >
                  Reset
                </button>
                <a
                  href={zoomedImage.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-200 hover:text-white transition-colors"
                  title="Open Full Image in New Tab"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setZoomedImage(null);
                  }}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition-colors ml-1 shadow-sm"
                  title="Close Preview (Esc)"
                >
                  <X className="w-4 h-4" />
                  <span>Close</span>
                </button>
              </div>
            </div>

            {/* Document Viewer Body */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex-1 overflow-auto p-4 sm:p-8 flex items-center justify-center bg-black/40"
            >
              {zoomedImage.url.endsWith('.pdf') ? (
                <iframe
                  src={zoomedImage.url}
                  title={zoomedImage.title}
                  className="w-[90vw] h-[82vh] rounded-xl border border-gray-800 bg-white shadow-2xl"
                />
              ) : (
                <div className="transition-transform duration-200 ease-out flex items-center justify-center max-w-full max-h-full">
                  <img
                    src={zoomedImage.url}
                    alt={zoomedImage.title}
                    style={{
                      transform: `scale(${zoomScale}) rotate(${rotation}deg)`,
                      transition: 'transform 0.2s ease-out',
                    }}
                    className="max-h-[80vh] max-w-[85vw] object-contain rounded-xl shadow-2xl border border-gray-800/60 bg-gray-900"
                  />
                </div>
              )}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};
