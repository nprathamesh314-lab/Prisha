// PRISHA XPRESS PVT. LTD. - CLEAN STAFF RECRUITMENT ADMIN DASHBOARD
// ROUTE: /admin/staff-applications
// SUPABASE CONNECTED (staff_applications table & staff-application-documents bucket)

import React, { useState, useEffect } from 'react';
import {
  recruitmentService,
} from '../../services/recruitmentService';
import {
  StaffApplication,
  StaffApplicationStatus,
  StaffDepartment,
} from '../../types/recruitment';
import {
  DATE_FILTER_OPTIONS,
  DateRangeFilter,
  isWithinDateRange,
} from '../../utils/dateFilters';
import {
  Search,
  Download,
  Eye,
  FileText,
  Phone,
  MessageSquare,
  Mail,
  MapPin,
  Clock,
  RefreshCw,
  Briefcase,
  CheckCircle2,
  XCircle,
  X,
  Check,
  GraduationCap,
  Trash2,
  AlertCircle,
} from 'lucide-react';

export const StaffApplicationsAdminPage: React.FC = () => {
  const [applications, setApplications] = useState<StaffApplication[]>([]);
  const [selectedApp, setSelectedApp] = useState<StaffApplication | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState<StaffDepartment | 'All'>('All');
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'shortlisted' | 'rejected'>('all');
  const [dateFilter, setDateFilter] = useState<DateRangeFilter>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);

  // Safe 2-Step Deletion State
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const currentUser = recruitmentService.getCurrentUser();

  const loadData = async (syncWithDb = false) => {
    if (syncWithDb) {
      setIsRefreshing(true);
      await recruitmentService.syncStaffApplicationsFromDb();
      setIsRefreshing(false);
    }
    refreshLocalList();
  };

  const refreshLocalList = () => {
    let list = recruitmentService.getStaffApplications({
      search: searchQuery,
      department: selectedDept,
    });

    // Filter by Date Range
    list = list.filter((a) => isWithinDateRange(a.created_at, dateFilter));

    if (activeTab === 'pending') {
      list = list.filter((a) => a.application_status === 'Submitted' || a.application_status === 'Under Review');
    } else if (activeTab === 'shortlisted') {
      list = list.filter(
        (a) =>
          a.application_status === 'Shortlisted' ||
          a.application_status === 'Interview Scheduled' ||
          a.application_status === 'Selected'
      );
    } else if (activeTab === 'rejected') {
      list = list.filter((a) => a.application_status === 'Rejected');
    }

    setApplications(list);

    if (selectedApp) {
      const refreshed = recruitmentService.getStaffApplicationById(selectedApp.id);
      if (refreshed) setSelectedApp(refreshed);
    }
  };

  useEffect(() => {
    loadData(true);
  }, []);

  useEffect(() => {
    refreshLocalList();
  }, [searchQuery, selectedDept, activeTab, dateFilter]);

  // Status Metrics Dynamically Reflect Date Filter
  const allApps = recruitmentService.getStaffApplications();
  const dateFilteredAllApps = allApps.filter((a) => isWithinDateRange(a.created_at, dateFilter));
  const totalCount = dateFilteredAllApps.length;
  const pendingCount = dateFilteredAllApps.filter(
    (a) => a.application_status === 'Submitted' || a.application_status === 'Under Review'
  ).length;
  const shortlistedCount = dateFilteredAllApps.filter(
    (a) =>
      a.application_status === 'Shortlisted' ||
      a.application_status === 'Interview Scheduled' ||
      a.application_status === 'Selected'
  ).length;
  const rejectedCount = dateFilteredAllApps.filter((a) => a.application_status === 'Rejected').length;

  // Status Update Handler
  const handleQuickStatusUpdate = async (status: StaffApplicationStatus) => {
    if (!selectedApp) return;
    try {
      const updated = recruitmentService.updateStaffStatus(
        selectedApp.id,
        status,
        `Status updated to ${status} by ${currentUser.name}`
      );
      setSelectedApp(updated);
      setActionSuccessMsg(`Status updated to "${status}".`);
      refreshLocalList();
      setTimeout(() => setActionSuccessMsg(null), 3000);
    } catch (e: any) {
      alert(`Error updating status: ${e.message}`);
    }
  };

  // Safe 2-Step Staff Application Deletion Handler
  const handleDeleteStaffApplication = async () => {
    if (!selectedApp) return;
    setIsDeleting(true);
    try {
      const idToDelete = selectedApp.id;
      const ref = selectedApp.application_reference;
      const candidateName = selectedApp.full_name;

      await recruitmentService.deleteStaffApplication(idToDelete);

      // Remove from local list
      const updated = applications.filter((a) => a.id !== idToDelete && a.application_reference !== ref);
      setApplications(updated);

      // Dispatch count change for sidebar
      window.dispatchEvent(new CustomEvent('admin_counts_changed'));

      // Close modal & confirmation
      setDeleteConfirmOpen(false);
      setSelectedApp(null);

      // Toast notification
      setToastMessage(`Staff application for ${candidateName} (${ref}) was permanently deleted.`);
      setTimeout(() => setToastMessage(null), 5000);
    } catch (err: any) {
      alert(`Error deleting staff application: ${err.message || 'Unknown error'}`);
    } finally {
      setIsDeleting(false);
    }
  };

  // Helper for WhatsApp number
  const getWhatsAppNumber = (phone?: string): string => {
    const digits = (phone || '').replace(/\D/g, '');
    if (digits.length === 10) return `91${digits}`;
    if (digits.length === 12 && digits.startsWith('91')) return digits;
    if (digits.length > 10) return `91${digits.slice(-10)}`;
    return digits || '910000000000';
  };

  // Export CSV
  const handleExportCSV = () => {
    const csvRows = [
      [
        'Reference ID',
        'Candidate Name',
        'Mobile Number',
        'Email',
        'Position',
        'Department',
        'Qualification',
        'Total Experience',
        'Expected Salary (INR)',
        'Status',
        'Submission Date',
      ],
      ...applications.map((app) => [
        app.application_reference,
        `"${app.full_name}"`,
        `"${app.mobile_number}"`,
        app.email,
        `"${app.position_applied_for}"`,
        app.department,
        `"${app.qualification}"`,
        app.is_fresher ? 'Fresher' : app.total_experience || 'Experienced',
        app.expected_salary || 0,
        app.application_status,
        new Date(app.created_at).toLocaleDateString(),
      ]),
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.map((e) => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `PrishaXpress_Staff_Applications_${dateFilter}_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Status Badge Helper
  const renderStatusBadge = (status: StaffApplicationStatus) => {
    switch (status) {
      case 'Submitted':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            Submitted
          </span>
        );
      case 'Under Review':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            Under Review
          </span>
        );
      case 'Shortlisted':
      case 'Interview Scheduled':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
            {status}
          </span>
        );
      case 'Selected':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Selected
          </span>
        );
      case 'Rejected':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-200">
            <XCircle className="w-3.5 h-3.5 text-rose-600" />
            Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-700 border border-gray-200">
            {status}
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
            <Briefcase className="w-6 h-6 text-px-primary" />
            Staff Applications
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Office and operational job seekers for Admin, HR, Operations, Accounts, and Technical teams.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => loadData(true)}
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

      {/* 2. Four Clickable Summary Cards */}
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
            Total Applicants
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
          onClick={() => setActiveTab('shortlisted')}
          className={`p-4 rounded-2xl border text-left transition-all ${
            activeTab === 'shortlisted'
              ? 'bg-purple-700 text-white border-purple-700 shadow-md ring-2 ring-purple-400/30'
              : 'bg-white text-gray-900 border-gray-200 hover:border-purple-300'
          }`}
        >
          <p className={`text-xs font-bold uppercase tracking-wider ${activeTab === 'shortlisted' ? 'text-purple-100' : 'text-purple-700'}`}>
            Shortlisted / Interview
          </p>
          <p className="text-2xl font-black mt-1 text-purple-700">{shortlistedCount}</p>
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

      {/* 3. Search Bar, Quick Date Filter Buttons & Department Filter */}
      <div className="bg-white rounded-2xl border border-gray-200 p-3 sm:p-4 shadow-xs flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full lg:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search candidate name, role, email, phone, city..."
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

        {/* Department Filter */}
        <div className="flex items-center gap-2">
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value as any)}
            className="px-3 py-2 rounded-xl border border-gray-200 text-xs font-medium bg-white text-gray-700 focus:outline-none focus:border-px-primary"
          >
            <option value="All">All Departments</option>
            <option value="Administration">Administration</option>
            <option value="Human Resources">Human Resources</option>
            <option value="Operations">Operations</option>
            <option value="Transport & Logistics">Transport & Logistics</option>
            <option value="Accounts & Finance">Accounts & Finance</option>
            <option value="IT & Technical">IT & Technical</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {/* 4. Clean 5-Column Table (Desktop) + Mobile Cards */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        {applications.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <p className="text-sm font-bold text-gray-700">No applications match your search filters.</p>
            <p className="text-xs text-gray-400 mt-1">Try resetting the search bar or choosing another tab.</p>
          </div>
        ) : (
          <>
            {/* Desktop 5-Column Table (Hidden on Mobile) */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-50/80 border-b border-gray-200 text-gray-500 uppercase tracking-wider font-bold">
                    <th className="py-3 px-4 w-[28%]">Candidate & Contact</th>
                    <th className="py-3 px-4 w-[24%]">Role & Department</th>
                    <th className="py-3 px-4 w-[20%]">City & Experience</th>
                    <th className="py-3 px-4 w-[16%]">Status</th>
                    <th className="py-3 px-4 w-[12%] text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  {applications.map((app) => {
                    const waNumber = getWhatsAppNumber(app.mobile_number);
                    return (
                      <tr
                        key={app.id}
                        onClick={() => setSelectedApp(app)}
                        className="hover:bg-purple-50/40 transition-colors cursor-pointer group"
                      >
                        {/* Col 1: Candidate & Contact */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-gray-900 text-sm group-hover:text-px-primary transition-colors">
                              {app.full_name}
                            </span>
                            <span className="text-[10px] font-mono text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                              {app.application_reference}
                            </span>
                          </div>
                          <div className="flex items-center gap-2.5 mt-1">
                            <a
                              href={`tel:${app.mobile_number}`}
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1 text-[11px] font-bold text-gray-600 hover:text-emerald-700 bg-gray-100 hover:bg-emerald-50 px-2 py-0.5 rounded-md transition-colors"
                              title="Call Candidate"
                            >
                              <Phone className="w-3 h-3 text-emerald-600" />
                              <span>{app.mobile_number}</span>
                            </a>
                            <a
                              href={`https://wa.me/${waNumber}?text=Hello%20${encodeURIComponent(app.full_name)},%20this%20is%20Prisha%20Xpress%20Recruitment%20regarding%20your%20application%20for%20${encodeURIComponent(app.position_applied_for)}.`}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2 py-0.5 rounded-md transition-colors"
                              title="Chat on WhatsApp"
                            >
                              <MessageSquare className="w-3 h-3 text-emerald-600" />
                              <span>WhatsApp</span>
                            </a>
                          </div>
                        </td>

                        {/* Col 2: Role & Department */}
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-gray-900">{app.position_applied_for}</div>
                          <span className="inline-block mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-px-primary">
                            {app.department}
                          </span>
                        </td>

                        {/* Col 3: City & Experience */}
                        <td className="py-3.5 px-4 text-gray-600">
                          <div className="font-semibold text-gray-800 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-gray-400" />
                            <span>{app.city || 'Maharashtra'}</span>
                          </div>
                          <div className="text-[11px] text-gray-500 mt-0.5">
                            {app.is_fresher ? (
                              <span className="font-bold text-emerald-700">Fresher Candidate</span>
                            ) : (
                              <span>{app.total_experience || 'Experienced'} exp</span>
                            )}
                          </div>
                        </td>

                        {/* Col 4: Status */}
                        <td className="py-3.5 px-4">
                          {renderStatusBadge(app.application_status)}
                        </td>

                        {/* Col 5: Action */}
                        <td className="py-3.5 px-4 text-right">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedApp(app);
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 text-px-primary font-bold text-xs hover:bg-px-primary hover:text-white transition-all shadow-2xs"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>View Profile</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Stacked Cards (Hidden on Desktop) */}
            <div className="block lg:hidden divide-y divide-gray-100">
              {applications.map((app) => {
                const waNumber = getWhatsAppNumber(app.mobile_number);
                return (
                  <div key={app.id} className="p-4 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-black text-gray-900 text-sm">{app.full_name}</span>
                          <span className="text-[10px] font-mono text-gray-400 bg-gray-100 px-1 py-0.5 rounded">
                            {app.application_reference}
                          </span>
                        </div>
                        <div className="text-xs font-semibold text-px-primary mt-0.5">
                          {app.position_applied_for} â€¢ {app.department}
                        </div>
                        <div className="text-xs text-gray-500 flex items-center gap-2 mt-0.5">
                          <span>{app.city}</span>
                          <span>â€¢</span>
                          <span>{app.is_fresher ? 'Fresher' : app.total_experience || 'Experienced'}</span>
                        </div>
                      </div>
                      <div>{renderStatusBadge(app.application_status)}</div>
                    </div>

                    {/* Thumb-friendly mobile buttons */}
                    <div className="grid grid-cols-3 gap-2 pt-1">
                      <a
                        href={`tel:${app.mobile_number}`}
                        className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-gray-100 text-gray-700 font-bold text-xs active:bg-gray-200"
                      >
                        <Phone className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Call</span>
                      </a>
                      <a
                        href={`https://wa.me/${waNumber}?text=Hello%20${encodeURIComponent(app.full_name)},%20this%20is%20Prisha%20Xpress%20Recruitment%20regarding%20your%20application%20for%20${encodeURIComponent(app.position_applied_for)}.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-emerald-50 text-emerald-700 font-bold text-xs active:bg-emerald-100"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                        <span>WhatsApp</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => setSelectedApp(app)}
                        className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-px-primary text-white font-bold text-xs active:bg-purple-900"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Profile</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* 5. Detail Modal with Top Action Bar */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-5">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-gray-200 p-5 sm:p-7 space-y-5 animate-fadeIn">
            
            {/* Modal Top Header */}
            <div className="flex items-start justify-between border-b border-gray-100 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-px-primary text-xs">
                    {selectedApp.application_reference}
                  </span>
                  {renderStatusBadge(selectedApp.application_status)}
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-gray-900 mt-1">
                  {selectedApp.full_name}
                </h2>
                <p className="text-xs text-gray-500">
                  Applied for <strong>{selectedApp.position_applied_for}</strong> ({selectedApp.department})
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedApp(null)}
                className="text-gray-400 hover:text-gray-700 p-1.5 rounded-xl hover:bg-gray-100 transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Success alert */}
            {actionSuccessMsg && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-fadeIn">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>{actionSuccessMsg}</span>
              </div>
            )}

            {/* TOP ACTION BAR - NO SCROLL NEEDED */}
            <div className="bg-purple-50/70 border border-purple-100 rounded-2xl p-3.5 sm:p-4 space-y-2.5">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
                {/* Contact buttons */}
                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${selectedApp.mobile_number}`}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-gray-200 text-gray-800 text-xs font-bold hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700 shadow-2xs transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Call Candidate</span>
                  </a>
                  <a
                    href={`https://wa.me/${getWhatsAppNumber(selectedApp.mobile_number)}?text=Hello%20${encodeURIComponent(selectedApp.full_name)},%20this%20is%20Prisha%20Xpress%20Recruitment%20regarding%20your%20application%20for%20${encodeURIComponent(selectedApp.position_applied_for)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 shadow-2xs transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>

                {/* One-tap status buttons */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleQuickStatusUpdate('Under Review')}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      selectedApp.application_status === 'Under Review'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-white border border-blue-200 text-blue-700 hover:bg-blue-50'
                    }`}
                  >
                    Under Review
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickStatusUpdate('Shortlisted')}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      selectedApp.application_status === 'Shortlisted'
                        ? 'bg-purple-700 text-white shadow-xs'
                        : 'bg-white border border-purple-200 text-purple-700 hover:bg-purple-50'
                    }`}
                  >
                    Shortlist
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickStatusUpdate('Interview Scheduled')}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      selectedApp.application_status === 'Interview Scheduled'
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-white border border-indigo-200 text-indigo-700 hover:bg-indigo-50'
                    }`}
                  >
                    Interview
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickStatusUpdate('Selected')}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      selectedApp.application_status === 'Selected'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-white border border-emerald-200 text-emerald-700 hover:bg-emerald-50'
                    }`}
                  >
                    Select
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickStatusUpdate('Rejected')}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      selectedApp.application_status === 'Rejected'
                        ? 'bg-rose-600 text-white shadow-xs'
                        : 'bg-white border border-rose-200 text-rose-700 hover:bg-rose-50'
                    }`}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>

            {/* Candidate Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {/* Contact Information */}
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-2">
                <p className="font-bold text-gray-500 uppercase tracking-wider text-[10px]">Contact & Location</p>
                <p className="flex items-center gap-2 text-gray-800">
                  <Phone className="w-3.5 h-3.5 text-gray-400" />
                  <span className="font-semibold">{selectedApp.mobile_number}</span>
                </p>
                <p className="flex items-center gap-2 text-gray-800">
                  <Mail className="w-3.5 h-3.5 text-gray-400" />
                  <span>{selectedApp.email}</span>
                </p>
                <p className="flex items-start gap-2 text-gray-700">
                  <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" />
                  <span>
                    {selectedApp.current_address ? `${selectedApp.current_address}, ` : ''}
                    {selectedApp.city}, {selectedApp.state || 'Maharashtra'} - {selectedApp.pin_code}
                  </span>
                </p>
                <div className="pt-2 border-t border-gray-200 text-[11px] text-gray-500 flex items-center justify-between">
                  <span>DOB: {selectedApp.date_of_birth || 'N/A'}</span>
                  <span>Gender: {selectedApp.gender || 'N/A'}</span>
                </div>
              </div>

              {/* Education & Qualification */}
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-2">
                <p className="font-bold text-gray-500 uppercase tracking-wider text-[10px]">Education & Academics</p>
                <div className="flex items-center gap-2 text-gray-800">
                  <GraduationCap className="w-4 h-4 text-px-primary shrink-0" />
                  <span className="font-bold">{selectedApp.qualification}</span>
                </div>
                {selectedApp.course_degree && (
                  <p className="text-gray-700">
                    <strong>Degree:</strong> {selectedApp.course_degree}
                  </p>
                )}
                {selectedApp.college_university && (
                  <p className="text-gray-600">
                    <strong>University:</strong> {selectedApp.college_university} ({selectedApp.passing_year || 'N/A'})
                  </p>
                )}
                {selectedApp.percentage_cgpa && (
                  <p className="text-gray-600">
                    <strong>Score / CGPA:</strong> {selectedApp.percentage_cgpa}
                  </p>
                )}
                {selectedApp.additional_qualification && (
                  <p className="text-purple-800 font-medium">
                    <strong>Certifications:</strong> {selectedApp.additional_qualification}
                  </p>
                )}
              </div>

              {/* Work Experience & Salary */}
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-2 sm:col-span-2">
                <p className="font-bold text-gray-500 uppercase tracking-wider text-[10px]">Work Experience & Compensation</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-gray-700">
                  <p>
                    <strong>Status:</strong>{' '}
                    <span className="font-bold text-gray-900">
                      {selectedApp.is_fresher ? 'Fresher' : selectedApp.total_experience || 'Experienced'}
                    </span>
                  </p>
                  <p>
                    <strong>Notice Period:</strong> {selectedApp.notice_period || 'Immediate'}
                  </p>
                  <p>
                    <strong>Previous CTC:</strong> {selectedApp.previous_salary || 'N/A'}
                  </p>
                  <p>
                    <strong>Expected CTC:</strong>{' '}
                    <span className="font-bold text-emerald-700">
                      â‚¹{selectedApp.expected_salary?.toLocaleString('en-IN') || 'â€”'}
                    </span>
                  </p>
                </div>
                {selectedApp.previous_company && (
                  <p className="text-gray-700 pt-1">
                    <strong>Previous Employer:</strong> {selectedApp.previous_company}{' '}
                    {selectedApp.previous_job_role ? `(${selectedApp.previous_job_role})` : ''}
                  </p>
                )}
                {selectedApp.key_skills && (
                  <p className="pt-2 border-t border-gray-200 text-gray-700">
                    <strong>Key Skills:</strong> {selectedApp.key_skills}
                  </p>
                )}
                {selectedApp.additional_message && (
                  <p className="pt-2 border-t border-gray-200 text-gray-600 italic">
                    "{selectedApp.additional_message}"
                  </p>
                )}
              </div>
            </div>

            {/* Document Vault */}
            <div className="space-y-2.5">
              <h3 className="font-bold text-gray-800 text-xs uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-px-primary" />
                <span>Uploaded Documents</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedApp.documents && selectedApp.documents.length > 0 ? (
                  selectedApp.documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="p-3 rounded-xl border border-gray-200 bg-white flex items-center justify-between text-xs"
                    >
                      <div>
                        <p className="font-bold text-gray-800 capitalize">{doc.document_type.replace('_', ' ')}</p>
                        <p className="text-[10px] text-gray-400 font-mono truncate max-w-[160px]">{doc.original_filename}</p>
                      </div>
                      <a
                        href={`#download-${doc.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          alert(`Downloading: ${doc.original_filename} (Storage Path: ${doc.storage_path})`);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-purple-50 text-px-primary font-bold hover:bg-px-primary hover:text-white transition-all text-[11px] flex items-center gap-1"
                      >
                        <Download className="w-3 h-3" />
                        <span>Download</span>
                      </a>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-xs italic">No attached documents submitted.</p>
                )}
              </div>
            </div>

            {/* Application History Log */}
            {selectedApp.status_history && selectedApp.status_history.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <h4 className="font-bold text-gray-700 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-gray-400" />
                  <span>Status History</span>
                </h4>
                <div className="space-y-1.5">
                  {selectedApp.status_history.map((h) => (
                    <div key={h.id} className="p-2.5 rounded-xl bg-gray-50 border border-gray-100 text-xs">
                      <div className="flex justify-between font-semibold text-gray-800">
                        <span>
                          {h.previous_status} â†’ <span className="text-px-primary font-bold">{h.new_status}</span>
                        </span>
                        <span className="text-gray-400 text-[10px]">
                          {new Date(h.created_at).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-gray-600 text-[11px] mt-0.5">{h.reason}</p>
                      <span className="text-[10px] text-gray-400">By {h.changed_by}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Actions with Safe Delete */}
            <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setDeleteConfirmOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-50 border border-rose-200 rounded-xl transition-colors cursor-pointer"
                title="Delete this candidate application permanently"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Application</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedApp(null);
                  setDeleteConfirmOpen(false);
                }}
                className="px-5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-bold text-gray-700 transition-colors cursor-pointer"
              >
                Close Profile
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Safe 2-Step Staff Deletion Confirmation Modal */}
      {deleteConfirmOpen && selectedApp && (
        <div className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-gray-200 overflow-hidden animate-scaleUp">
            <div className="p-5 sm:p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-6 h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
                Delete Staff Application Permanently?
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                Delete application from <span className="font-bold text-gray-900">{selectedApp.full_name}</span> ({selectedApp.application_reference})? This action cannot be undone.
              </p>
              <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 text-left mb-6">
                <p className="text-[11px] font-medium text-rose-800 leading-normal flex items-start gap-1.5">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
                  <span>This will permanently delete this candidate record from Supabase and remove uploaded documents from storage.</span>
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
                  onClick={handleDeleteStaffApplication}
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
    </div>
  );
};
