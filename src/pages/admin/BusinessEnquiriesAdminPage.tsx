// PRISHA XPRESS PVT. LTD. - CLEAN BUSINESS ENQUIRIES DASHBOARD
// ROUTE: /admin/enquiries & /admin/business-enquiries
// SUPABASE CONNECTED (business_enquiries table)

import React, { useState, useEffect } from 'react';
import {
  businessEnquiryService,
} from '../../services/enquiryService';
import {
  BusinessEnquiry,
  EnquiryStatus,
  BusinessEnquiryServiceType,
} from '../../types/enquiry';
import {
  DATE_FILTER_OPTIONS,
  DateRangeFilter,
  isWithinDateRange,
} from '../../utils/dateFilters';
import {
  Search,
  Download,
  Phone,
  MessageSquare,
  Clock,
  CheckCircle2,
  Eye,
  RefreshCw,
  Building2,
  X,
  Check,
  Trash2,
  AlertTriangle,
} from 'lucide-react';

export const BusinessEnquiriesAdminPage: React.FC = () => {
  const [enquiries, setEnquiries] = useState<BusinessEnquiry[]>([]);
  const [stats, setStats] = useState(businessEnquiryService.getStats());
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'new' | 'inProgress' | 'booked'>('all');
  const [selectedService, setSelectedService] = useState<BusinessEnquiryServiceType | 'All'>('All');
  const [dateFilter, setDateFilter] = useState<DateRangeFilter>('all');

  // Active Detail Modal
  const [activeEnquiry, setActiveEnquiry] = useState<BusinessEnquiry | null>(null);
  const [newNoteInput, setNewNoteInput] = useState('');
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);
  const [followUpBanner, setFollowUpBanner] = useState<{
    status: EnquiryStatus;
    message: string;
    whatsAppUrl?: string;
  } | null>(null);

  // Safe 2-Step Deletion State
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const loadData = async () => {
    setIsRefreshing(true);
    await businessEnquiryService.syncFromSupabase();
    refreshLocalList();
    setIsRefreshing(false);
  };

  const refreshLocalList = () => {
    let list = businessEnquiryService.getEnquiries({
      searchQuery,
      service: selectedService,
    });

    // 1. Filter by Date Range
    list = list.filter((e) => isWithinDateRange(e.created_at, dateFilter));

    // Dynamic stats reflecting date filter
    const allEnqs = businessEnquiryService.getEnquiries();
    const dateFilteredAll = allEnqs.filter((e) => isWithinDateRange(e.created_at, dateFilter));
    setStats({
      total: dateFilteredAll.length,
      new: dateFilteredAll.filter((e) => e.status === 'New').length,
      inProgress: dateFilteredAll.filter((e) => e.status === 'In Progress' || e.status === 'Contacted').length,
      contacted: dateFilteredAll.filter((e) => e.status === 'Contacted').length,
      completed: dateFilteredAll.filter((e) => e.status === 'Completed').length,
      converted: dateFilteredAll.filter(
        (e) => e.status === 'Booked / Confirmed' || e.status === 'Converted'
      ).length,
      closed: dateFilteredAll.filter((e) => e.status === 'Closed').length,
    });

    if (activeTab === 'new') {
      list = list.filter((e) => e.status === 'New');
    } else if (activeTab === 'inProgress') {
      list = list.filter((e) => e.status === 'In Progress' || e.status === 'Contacted');
    } else if (activeTab === 'booked') {
      list = list.filter((e) => e.status === 'Booked / Confirmed' || e.status === 'Converted');
    }

    setEnquiries(list);

    if (activeEnquiry) {
      const refreshed = businessEnquiryService.getEnquiryById(activeEnquiry.id);
      if (refreshed) setActiveEnquiry(refreshed);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    refreshLocalList();
  }, [searchQuery, selectedService, activeTab, dateFilter]);

  // Open Details Modal
  const handleOpenDetails = (enquiry: BusinessEnquiry) => {
    setActiveEnquiry(enquiry);
    setNewNoteInput(enquiry.admin_notes || '');
    setActionSuccessMsg(null);
    setFollowUpBanner(null);
  };

  // Status Change Handler with Auto-Save Notes & WhatsApp Follow-Up Banner
  const handleStatusChange = async (newStatus: EnquiryStatus) => {
    if (!activeEnquiry) return;
    try {
      const updated = await businessEnquiryService.updateStatus(
        activeEnquiry.id,
        newStatus,
        `Status updated to ${newStatus} by Administrator`,
        'Administrator',
        newNoteInput // Auto-saves internal notes to Supabase!
      );
      setActiveEnquiry(updated);

      let msg = '';
      let waUrl: string | undefined = undefined;

      if (newStatus === 'In Progress') {
        msg = `Updated to In Progress. Call or WhatsApp ${activeEnquiry.full_name} to share your quote.`;
        waUrl = formatWhatsAppUrl(
          activeEnquiry.phone,
          activeEnquiry.full_name,
          activeEnquiry.service_required,
          activeEnquiry.requirements,
          newStatus
        );
      } else if (newStatus === 'Booked / Confirmed') {
        msg = `Marked as Booked / Confirmed! Send a confirmation message to ${activeEnquiry.full_name} on WhatsApp.`;
        waUrl = formatWhatsAppUrl(
          activeEnquiry.phone,
          activeEnquiry.full_name,
          activeEnquiry.service_required,
          activeEnquiry.requirements,
          newStatus
        );
      } else if (newStatus === 'Closed') {
        msg = 'Lead marked as Closed.';
      } else if (newStatus === 'New') {
        msg = 'Status set back to New.';
      } else {
        msg = `Status updated to ${newStatus}.`;
      }

      setFollowUpBanner({
        status: newStatus,
        message: msg,
        whatsAppUrl: waUrl,
      });

      refreshLocalList();
      window.dispatchEvent(new CustomEvent('admin_counts_changed'));
    } catch (e: any) {
      alert(`Error updating status: ${e.message}`);
    }
  };

  // Save Notes Handler
  const handleSaveNotes = async () => {
    if (!activeEnquiry) return;
    try {
      const updated = await businessEnquiryService.addInternalNotes(
        activeEnquiry.id,
        newNoteInput,
        'Administrator'
      );
      setActiveEnquiry(updated);
      setActionSuccessMsg('Notes saved successfully.');
      refreshLocalList();
      setTimeout(() => setActionSuccessMsg(null), 3000);
    } catch (e: any) {
      alert(`Error saving notes: ${e.message}`);
    }
  };

  // Safe 2-Step Delete Enquiry Handler
  const handleDeleteEnquiry = async () => {
    if (!activeEnquiry) return;
    setIsDeleting(true);
    try {
      const idToDelete = activeEnquiry.id;
      const refName = `${activeEnquiry.full_name} (${activeEnquiry.enquiry_id || activeEnquiry.enquiry_number})`;
      await businessEnquiryService.deleteEnquiry(idToDelete);

      // Update local enquiries list
      const updated = enquiries.filter((e) => e.id !== idToDelete);
      setEnquiries(updated);

      // Refresh stats
      setStats(businessEnquiryService.getStats());

      // Notify sidebar of count change
      window.dispatchEvent(new CustomEvent('admin_counts_changed'));

      // Close modals
      setDeleteConfirmOpen(false);
      setActiveEnquiry(null);

      // Display user feedback toast
      setToastMessage(`Enquiry from ${refName} was permanently deleted.`);
      setTimeout(() => setToastMessage(null), 5000);
    } catch (err: any) {
      alert(`Error deleting enquiry: ${err.message || 'Unknown error'}`);
    } finally {
      setIsDeleting(false);
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    businessEnquiryService.exportToCsv(enquiries, dateFilter);
  };

  // Safe Phone & WhatsApp Helpers
  const formatPhoneLink = (phone?: string) => (phone || '').replace(/\s+/g, '');
  const formatWhatsAppUrl = (
    phone?: string,
    name?: string,
    service?: string,
    requirements?: string,
    status?: EnquiryStatus
  ) => {
    const raw = (phone || '').replace(/\D/g, '');
    const cleanDigits = raw.length === 10 ? `91${raw}` : raw.startsWith('91') ? raw : `91${raw}`;
    
    let text = '';
    if (status === 'Booked / Confirmed' || status === 'Converted') {
      text = `Namaste ${name || 'Customer'}, we are pleased to confirm your transport/fleet booking with Prisha Xpress Pvt. Ltd. for ${service || 'Logistics Services'}. Our operations team will coordinate vehicle placement and driver assignment shortly. Contact: +91 7276897727`;
    } else {
      text = `Namaste ${name || 'Customer'}, thank you for contacting Prisha Xpress Pvt. Ltd. regarding ${service || 'our services'}${requirements ? ` (${requirements})` : ''}. Please let us know how we can assist you further. Contact: +91 7276897727`;
    }

    return `https://wa.me/${cleanDigits}?text=${encodeURIComponent(text)}`;
  };

  // Status Badge Helper
  const renderStatusBadge = (status: EnquiryStatus) => {
    switch (status) {
      case 'New':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            New
          </span>
        );
      case 'In Progress':
      case 'Contacted':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            {status}
          </span>
        );
      case 'Booked / Confirmed':
      case 'Converted':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Booked / Confirmed
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
            <Building2 className="w-6 h-6 text-px-primary" />
            Business Enquiries
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Customer leads for Full Truck Load (FTL), commercial fleet management, and transport bookings.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={loadData}
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
            Total Enquiries
          </p>
          <p className="text-2xl font-black mt-1">{stats.total}</p>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('new')}
          className={`p-4 rounded-2xl border text-left transition-all ${
            activeTab === 'new'
              ? 'bg-amber-600 text-white border-amber-600 shadow-md ring-2 ring-amber-400/30'
              : 'bg-white text-gray-900 border-gray-200 hover:border-amber-300'
          }`}
        >
          <p className={`text-xs font-bold uppercase tracking-wider ${activeTab === 'new' ? 'text-amber-100' : 'text-amber-600'}`}>
            New Enquiries
          </p>
          <p className="text-2xl font-black mt-1 text-amber-600">{stats.new}</p>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('inProgress')}
          className={`p-4 rounded-2xl border text-left transition-all ${
            activeTab === 'inProgress'
              ? 'bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-400/30'
              : 'bg-white text-gray-900 border-gray-200 hover:border-blue-300'
          }`}
        >
          <p className={`text-xs font-bold uppercase tracking-wider ${activeTab === 'inProgress' ? 'text-blue-100' : 'text-blue-600'}`}>
            In Progress
          </p>
          <p className="text-2xl font-black mt-1 text-blue-600">{stats.inProgress + stats.contacted}</p>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('booked')}
          className={`p-4 rounded-2xl border text-left transition-all ${
            activeTab === 'booked'
              ? 'bg-emerald-700 text-white border-emerald-700 shadow-md ring-2 ring-emerald-400/30'
              : 'bg-white text-gray-900 border-gray-200 hover:border-emerald-300'
          }`}
        >
          <p className={`text-xs font-bold uppercase tracking-wider ${activeTab === 'booked' ? 'text-emerald-100' : 'text-emerald-600'}`}>
            Booked / Confirmed
          </p>
          <p className="text-2xl font-black mt-1 text-emerald-600">{stats.converted}</p>
        </button>
      </div>

      {/* 3. Search Bar, Quick Date Filter Buttons & Service Filter */}
      <div className="bg-white rounded-2xl border border-gray-200 p-3 sm:p-4 shadow-xs flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full lg:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search customer, company, phone, service..."
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

        {/* Service Filter */}
        <div className="flex items-center gap-2">
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value as any)}
            className="px-3 py-2 rounded-xl border border-gray-200 text-xs font-medium bg-white text-gray-700 focus:outline-none focus:border-px-primary"
          >
            <option value="All">All Services</option>
            <option value="Transportation Services">Transportation Services</option>
            <option value="Truck Drivers on Hire">Truck Drivers on Hire</option>
            <option value="3PL Fleet Management">3PL Fleet Management</option>
            <option value="Vehicle Servicing">Vehicle Servicing</option>
            <option value="Automotive Spare Parts">Automotive Spare Parts</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {/* 4. Clean 5-Column Table (Desktop) + Mobile Cards */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        {enquiries.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <Building2 className="w-10 h-10 text-gray-300 mx-auto mb-2" />
            <p className="text-sm font-bold text-gray-700">No business enquiries found</p>
            <p className="text-xs text-gray-400 mt-0.5">Try adjusting your search query or tab filter.</p>
          </div>
        ) : (
          <>
            {/* Desktop 5-Column Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/70 border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    <th className="py-3 px-4">1. Customer & Company</th>
                    <th className="py-3 px-4">2. Service & Requirement</th>
                    <th className="py-3 px-4">3. Date</th>
                    <th className="py-3 px-4">4. Status</th>
                    <th className="py-3 px-4 text-right">5. Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs">
                  {enquiries.map((enq) => (
                    <tr key={enq.id} className="hover:bg-purple-50/20 transition-colors">
                      {/* 1. Customer & Company */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-gray-900 text-sm">{enq.full_name}</div>
                        {enq.company_name && (
                          <div className="text-xs font-semibold text-purple-900">{enq.company_name}</div>
                        )}
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-gray-600 font-medium">{enq.phone || 'N/A'}</span>
                          {enq.phone && (
                            <>
                              <a
                                href={`tel:${formatPhoneLink(enq.phone)}`}
                                className="p-1 rounded text-purple-700 hover:bg-purple-100 transition-colors"
                                title="Call Customer"
                              >
                                <Phone className="w-3.5 h-3.5" />
                              </a>
                              <a
                                href={formatWhatsAppUrl(
                                  enq.phone,
                                  enq.full_name,
                                  enq.service_required,
                                  enq.requirements,
                                  enq.status
                                )}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1 rounded text-emerald-600 hover:bg-emerald-50 transition-colors"
                                title="WhatsApp Customer"
                              >
                                <MessageSquare className="w-3.5 h-3.5" />
                              </a>
                            </>
                          )}
                        </div>
                        <span className="text-[10px] font-mono text-gray-400 block mt-0.5">{enq.enquiry_id}</span>
                      </td>

                      {/* 2. Service & Requirement */}
                      <td className="py-3.5 px-4 max-w-xs">
                        <span className="px-2 py-0.5 rounded-full bg-purple-50 text-purple-800 font-bold text-[10px] border border-purple-100 inline-block mb-1">
                          {enq.service_required}
                        </span>
                        <p className="text-gray-600 text-xs line-clamp-2 leading-relaxed">
                          {enq.requirements || enq.operational_requirements || 'Standard freight movement'}
                        </p>
                      </td>

                      {/* 3. Date */}
                      <td className="py-3.5 px-4 text-gray-500 whitespace-nowrap">
                        {new Date(enq.created_at).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>

                      {/* 4. Status */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {renderStatusBadge(enq.status)}
                      </td>

                      {/* 5. Action */}
                      <td className="py-3.5 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => handleOpenDetails(enq)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-px-primary hover:bg-px-deep text-white text-xs font-bold shadow-xs transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Lead</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile / Tablet Cards (< lg) */}
            <div className="block lg:hidden divide-y divide-gray-100">
              {enquiries.map((enq) => (
                <div key={enq.id} className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-sm text-gray-900 block">{enq.full_name}</span>
                      {enq.company_name && (
                        <span className="text-xs font-semibold text-purple-900 block">{enq.company_name}</span>
                      )}
                      <span className="font-mono text-[10px] text-gray-400">{enq.enquiry_id}</span>
                    </div>
                    {renderStatusBadge(enq.status)}
                  </div>

                  <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100 text-xs space-y-1">
                    <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-900 font-bold text-[10px] inline-block">
                      {enq.service_required}
                    </span>
                    <p className="text-gray-600 line-clamp-2 mt-1">
                      {enq.requirements || 'Standard freight movement'}
                    </p>
                  </div>

                  {/* Thumb-friendly mobile buttons */}
                  <div className="flex items-center gap-2 pt-1">
                    <a
                      href={`tel:${formatPhoneLink(enq.phone)}`}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-purple-200 text-purple-800 font-bold text-xs bg-purple-50"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call</span>
                    </a>

                    <a
                      href={formatWhatsAppUrl(
                        enq.phone,
                        enq.full_name,
                        enq.service_required,
                        enq.requirements,
                        enq.status
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-xs"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => handleOpenDetails(enq)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-px-primary text-white font-bold text-xs shadow-xs"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* 5. Customer Detail Drawer (Actions at Top) */}
      {activeEnquiry && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden my-auto border border-gray-200">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-purple-50 via-white to-purple-50 border-b border-gray-200 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-xs text-px-primary bg-purple-100 px-2 py-0.5 rounded">
                    {activeEnquiry.enquiry_id}
                  </span>
                  {renderStatusBadge(activeEnquiry.status)}
                </div>
                <h2 className="text-base sm:text-lg font-black text-gray-900 mt-1">
                  {activeEnquiry.full_name}
                  {activeEnquiry.company_name && (
                    <span className="text-xs font-normal text-gray-500 ml-1.5">• {activeEnquiry.company_name}</span>
                  )}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setActiveEnquiry(null)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Action Bar RIGHT AT THE TOP */}
            <div className="p-3 sm:p-4 bg-purple-50/80 border-b border-purple-100 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <a
                  href={`tel:${formatPhoneLink(activeEnquiry.phone)}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-purple-200 text-purple-900 font-bold text-xs hover:bg-purple-100 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-purple-700" />
                  <span>Call {activeEnquiry.phone || 'Customer'}</span>
                </a>

                <a
                  href={formatWhatsAppUrl(
                    activeEnquiry.phone,
                    activeEnquiry.full_name,
                    activeEnquiry.service_required,
                    activeEnquiry.requirements,
                    activeEnquiry.status
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>

              {/* Status Switcher Buttons: New, In Progress, Booked / Confirmed, Closed */}
              <div className="flex items-center gap-1.5 overflow-x-auto">
                <span className="text-[11px] font-bold text-gray-500 mr-1">Status:</span>
                {(['New', 'In Progress', 'Booked / Confirmed', 'Closed'] as EnquiryStatus[]).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => handleStatusChange(st)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                      activeEnquiry.status === st ||
                      (st === 'Booked / Confirmed' && activeEnquiry.status === 'Converted')
                        ? st === 'Booked / Confirmed'
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : st === 'In Progress'
                          ? 'bg-blue-600 text-white shadow-xs'
                          : st === 'Closed'
                          ? 'bg-gray-700 text-white shadow-xs'
                          : 'bg-amber-600 text-white shadow-xs'
                        : 'bg-white text-gray-700 border border-gray-200 hover:bg-purple-50'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Post-Click Follow-Up Banner with WhatsApp Action */}
            {followUpBanner && (
              <div
                className={`p-3.5 sm:p-4 border-b flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-fadeIn ${
                  followUpBanner.status === 'Booked / Confirmed'
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                    : followUpBanner.status === 'In Progress'
                    ? 'bg-blue-50 border-blue-200 text-blue-950'
                    : followUpBanner.status === 'Closed'
                    ? 'bg-gray-100 border-gray-200 text-gray-800'
                    : 'bg-amber-50 border-amber-200 text-amber-950'
                }`}
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2
                    className={`w-5 h-5 shrink-0 ${
                      followUpBanner.status === 'Booked / Confirmed'
                        ? 'text-emerald-600'
                        : followUpBanner.status === 'In Progress'
                        ? 'text-blue-600'
                        : 'text-gray-500'
                    }`}
                  />
                  <p className="text-xs sm:text-sm font-bold">{followUpBanner.message}</p>
                </div>

                {followUpBanner.whatsAppUrl && (
                  <a
                    href={followUpBanner.whatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all shrink-0"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>
                      {followUpBanner.status === 'Booked / Confirmed'
                        ? 'Send Booking Confirmation on WhatsApp'
                        : 'Send Quote on WhatsApp'}
                    </span>
                  </a>
                )}
              </div>
            )}

            {/* Notification message */}
            {actionSuccessMsg && (
              <div className="mx-4 mt-3 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{actionSuccessMsg}</span>
              </div>
            )}

            {/* Modal Body */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1 text-xs">
              {/* Customer & Lead Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200 space-y-1.5">
                  <p className="text-[11px] font-bold text-gray-500 uppercase">Contact Information</p>
                  <div className="flex justify-between"><span className="text-gray-500">Contact Person:</span><span className="font-bold text-gray-900">{activeEnquiry.full_name}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Company:</span><span className="font-bold text-gray-900">{activeEnquiry.company_name || 'Individual'}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Phone:</span><span className="font-bold text-gray-900">{activeEnquiry.phone}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Email:</span><span className="font-bold text-gray-900">{activeEnquiry.email}</span></div>
                </div>

                <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200 space-y-1.5">
                  <p className="text-[11px] font-bold text-gray-500 uppercase">Requirement</p>
                  <div className="flex justify-between"><span className="text-gray-500">Service:</span><span className="font-bold text-purple-900">{activeEnquiry.service_required}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Received Date:</span><span className="font-medium text-gray-800">{new Date(activeEnquiry.created_at).toLocaleDateString('en-IN')}</span></div>
                </div>
              </div>

              {/* Requirement Text */}
              <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200">
                <p className="text-[11px] font-bold text-gray-500 uppercase mb-1">Customer Message / Operational Notes</p>
                <p className="text-gray-800 text-xs leading-relaxed">
                  {activeEnquiry.requirements || activeEnquiry.operational_requirements || 'No additional notes provided.'}
                </p>
              </div>

              {/* Internal Admin Notes */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">
                    Internal Admin Notes
                  </label>
                  <button
                    type="button"
                    onClick={handleSaveNotes}
                    className="text-xs font-bold text-px-primary hover:text-px-deep"
                  >
                    Save Notes
                  </button>
                </div>
                <textarea
                  rows={3}
                  value={newNoteInput}
                  onChange={(e) => setNewNoteInput(e.target.value)}
                  placeholder="e.g. Discussed rate card for 32ft multi-axle truck. Follow up on Monday."
                  className="w-full p-2.5 rounded-xl border border-gray-300 text-xs focus:border-px-primary focus:outline-none"
                />
              </div>
            </div>

            {/* Modal Footer with Safe Delete Button */}
            <div className="p-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setDeleteConfirmOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-50 border border-rose-200 rounded-lg transition-colors cursor-pointer"
                title="Delete this enquiry permanently"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Lead</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveEnquiry(null);
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

      {/* Safe 2-Step Deletion Confirmation Modal */}
      {deleteConfirmOpen && activeEnquiry && (
        <div className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-gray-200 overflow-hidden animate-scaleUp">
            <div className="p-5 sm:p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-6 h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
                Delete Business Enquiry Permanently?
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                Delete enquiry from <span className="font-bold text-gray-900">{activeEnquiry.full_name}</span> ({activeEnquiry.enquiry_id || activeEnquiry.enquiry_number})? This action cannot be undone.
              </p>
              <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 text-left mb-6">
                <p className="text-[11px] font-medium text-rose-800 leading-normal flex items-start gap-1.5">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
                  <span>This will permanently remove this record from Supabase and immediately recalculate your dashboard totals.</span>
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
                  onClick={handleDeleteEnquiry}
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
