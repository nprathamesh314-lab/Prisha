// PRISHA XPRESS PVT. LTD. - CORPORATE BUSINESS ENQUIRIES ADMIN MANAGEMENT
// ROUTE: /admin/enquiries
// FEATURES: REAL-TIME DB SYNC, STATUS WORKFLOW, INTERNAL NOTES, ASSIGNMENTS,
// EMAIL RETRY, ACTIVITY HISTORY, EXPORT TO EXCEL, WHATSAPP & PHONE SHORTCUTS

import React, { useState, useEffect } from 'react';
import {
  businessEnquiryService,
} from '../../services/enquiryService';
import {
  BusinessEnquiry,
  EnquiryStatus,
  BusinessEnquiryServiceType,
  EnquiryActivityHistory,
} from '../../types/enquiry';
import {
  Search,
  Download,
  Phone,
  MessageCircle,
  Clock,
  CheckCircle2,
  AlertCircle,
  Eye,
  RefreshCw,
  Calendar,
  Building2,
  X,
  History,
  Lock,
} from 'lucide-react';

export const BusinessEnquiriesAdminPage: React.FC = () => {
  const [enquiries, setEnquiries] = useState<BusinessEnquiry[]>([]);
  const [stats, setStats] = useState(businessEnquiryService.getStats());
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<EnquiryStatus | 'All'>('All');
  const [selectedService, setSelectedService] = useState<BusinessEnquiryServiceType | 'All'>('All');
  const [dateRange, setDateRange] = useState<'all' | 'today' | '7days' | '30days'>('all');

  // Selected Enquiry for Details Modal
  const [activeEnquiry, setActiveEnquiry] = useState<BusinessEnquiry | null>(null);
  const [activityHistory, setActivityHistory] = useState<EnquiryActivityHistory[]>([]);
  const [newNoteInput, setNewNoteInput] = useState('');
  const [statusReasonInput, setStatusReasonInput] = useState('');
  const [followUpInput, setFollowUpInput] = useState('');
  const [assigneeInput, setAssigneeInput] = useState('');
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);
  const [isRetryingEmail, setIsRetryingEmail] = useState(false);

  const loadData = async () => {
    setLoading(true);
    await businessEnquiryService.syncFromSupabase();
    refreshLocalList();
    setLoading(false);
  };

  const refreshLocalList = () => {
    const list = businessEnquiryService.getEnquiries({
      searchQuery,
      status: selectedStatus,
      service: selectedService,
      dateRange,
    });
    setEnquiries(list);
    setStats(businessEnquiryService.getStats());

    if (activeEnquiry) {
      const refreshed = businessEnquiryService.getEnquiryById(activeEnquiry.id);
      if (refreshed) {
        setActiveEnquiry(refreshed);
        setActivityHistory(businessEnquiryService.getActivityHistory(refreshed.id));
      }
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    refreshLocalList();
  }, [searchQuery, selectedStatus, selectedService, dateRange]);

  const handleOpenDetails = (enquiry: BusinessEnquiry) => {
    setActiveEnquiry(enquiry);
    setActivityHistory(businessEnquiryService.getActivityHistory(enquiry.id));
    setNewNoteInput(enquiry.admin_notes || '');
    setStatusReasonInput('');
    setFollowUpInput(enquiry.follow_up_date ? enquiry.follow_up_date.slice(0, 10) : '');
    setAssigneeInput(enquiry.assigned_to_name || '');
    setActionSuccessMsg(null);
  };

  const handleStatusChange = async (newStatus: EnquiryStatus) => {
    if (!activeEnquiry) return;
    try {
      const updated = await businessEnquiryService.updateStatus(
        activeEnquiry.id,
        newStatus,
        statusReasonInput || `Status transitioned to ${newStatus}.`,
        'Administrator'
      );
      setActiveEnquiry(updated);
      setActivityHistory(businessEnquiryService.getActivityHistory(updated.id));
      setStatusReasonInput('');
      setActionSuccessMsg(`Enquiry status updated to ${newStatus}.`);
      refreshLocalList();
    } catch (e: any) {
      alert(`Error updating status: ${e.message}`);
    }
  };

  const handleSaveNotes = async () => {
    if (!activeEnquiry) return;
    try {
      const updated = await businessEnquiryService.addInternalNotes(
        activeEnquiry.id,
        newNoteInput,
        'Administrator'
      );
      setActiveEnquiry(updated);
      setActivityHistory(businessEnquiryService.getActivityHistory(updated.id));
      setActionSuccessMsg('Internal administrative notes saved successfully.');
      refreshLocalList();
    } catch (e: any) {
      alert(`Error saving notes: ${e.message}`);
    }
  };

  const handleAssign = async () => {
    if (!activeEnquiry || !assigneeInput.trim()) return;
    try {
      const updated = await businessEnquiryService.assignEnquiry(
        activeEnquiry.id,
        'usr-assigned',
        assigneeInput.trim(),
        'Administrator'
      );
      setActiveEnquiry(updated);
      setActivityHistory(businessEnquiryService.getActivityHistory(updated.id));
      setActionSuccessMsg(`Enquiry assigned to ${assigneeInput.trim()}.`);
      refreshLocalList();
    } catch (e: any) {
      alert(`Error assigning enquiry: ${e.message}`);
    }
  };

  const handleSaveFollowUp = async () => {
    if (!activeEnquiry) return;
    try {
      const dateIso = followUpInput ? new Date(followUpInput).toISOString() : undefined;
      const updated = await businessEnquiryService.setFollowUpDate(
        activeEnquiry.id,
        dateIso,
        'Administrator'
      );
      setActiveEnquiry(updated);
      setActivityHistory(businessEnquiryService.getActivityHistory(updated.id));
      setActionSuccessMsg(dateIso ? 'Follow-up reminder set.' : 'Follow-up reminder cleared.');
      refreshLocalList();
    } catch (e: any) {
      alert(`Error updating follow-up: ${e.message}`);
    }
  };

  const handleRetryEmail = async () => {
    if (!activeEnquiry) return;
    setIsRetryingEmail(true);
    setActionSuccessMsg(null);
    try {
      const res = await businessEnquiryService.retryEmails(activeEnquiry.id, 'Administrator');
      const updated = businessEnquiryService.getEnquiryById(activeEnquiry.id);
      if (updated) {
        setActiveEnquiry(updated);
        setActivityHistory(businessEnquiryService.getActivityHistory(updated.id));
      }
      if (res.adminSuccess && res.customerSuccess) {
        setActionSuccessMsg('Email notifications sent successfully to both company desk and customer.');
      } else {
        setActionSuccessMsg(`Notification status: Company (${res.adminSuccess ? 'Sent' : 'Failed'}), Customer (${res.customerSuccess ? 'Sent' : 'Failed'}). Check error details.`);
      }
      refreshLocalList();
    } catch (e: any) {
      alert(`Error retrying email: ${e.message}`);
    } finally {
      setIsRetryingEmail(false);
    }
  };

  const handleExport = () => {
    businessEnquiryService.exportToCsv(enquiries);
  };

  const getStatusBadgeClass = (status: EnquiryStatus) => {
    switch (status) {
      case 'New':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Contacted':
        return 'bg-purple-100 text-px-primary border-purple-300';
      case 'Converted':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Closed':
        return 'bg-gray-100 text-gray-700 border-gray-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* 1. Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-px-deep via-[#2C074C] to-px-primary text-white shadow-soft-purple">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-purple-200 border border-white/20">
            <Building2 className="w-3.5 h-3.5 text-purple-200" />
            <span>Corporate Lead Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Business Enquiry Management
          </h1>
          <p className="text-purple-100 text-xs sm:text-sm font-light max-w-xl">
            Live database of corporate transport, 3PL fleet management, driver hiring, and auto-spare enquiries.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 self-start sm:self-center">
          <button
            onClick={async () => {
              setSyncing(true);
              await businessEnquiryService.syncFromSupabase();
              refreshLocalList();
              setSyncing(false);
            }}
            disabled={syncing}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold flex items-center gap-2 transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${syncing ? 'animate-spin' : ''}`} />
            <span>{syncing ? 'Syncing...' : 'Sync Supabase'}</span>
          </button>

          <button
            onClick={handleExport}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md flex items-center gap-2 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export to Excel (CSV)</span>
          </button>
        </div>
      </div>

      {/* 2. Dynamic KPI Statistics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <div
          onClick={() => setSelectedStatus('All')}
          className={`p-4 rounded-2xl bg-white border cursor-pointer transition-all ${
            selectedStatus === 'All' ? 'border-px-primary shadow-md ring-2 ring-purple-100' : 'border-px-border shadow-xs hover:border-gray-400'
          }`}
        >
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">Total Enquiries</span>
          <p className="text-2xl font-black text-px-dark mt-1">{stats.total}</p>
          <span className="text-[10px] text-gray-500">All registered leads</span>
        </div>

        <div
          onClick={() => setSelectedStatus('New')}
          className={`p-4 rounded-2xl bg-white border cursor-pointer transition-all ${
            selectedStatus === 'New' ? 'border-amber-500 shadow-md ring-2 ring-amber-100' : 'border-px-border shadow-xs hover:border-amber-300'
          }`}
        >
          <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider block">New Enquiries</span>
          <p className="text-2xl font-black text-amber-600 mt-1">{stats.new}</p>
          <span className="text-[10px] text-gray-500">Pending initial contact</span>
        </div>

        <div
          onClick={() => setSelectedStatus('In Progress')}
          className={`p-4 rounded-2xl bg-white border cursor-pointer transition-all ${
            selectedStatus === 'In Progress' ? 'border-blue-500 shadow-md ring-2 ring-blue-100' : 'border-px-border shadow-xs hover:border-blue-300'
          }`}
        >
          <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider block">In Progress</span>
          <p className="text-2xl font-black text-blue-600 mt-1">{stats.inProgress}</p>
          <span className="text-[10px] text-gray-500">Under discussion</span>
        </div>

        <div
          onClick={() => setSelectedStatus('Contacted')}
          className={`p-4 rounded-2xl bg-white border cursor-pointer transition-all ${
            selectedStatus === 'Contacted' ? 'border-px-primary shadow-md ring-2 ring-purple-100' : 'border-px-border shadow-xs hover:border-purple-300'
          }`}
        >
          <span className="text-[11px] font-bold text-px-primary uppercase tracking-wider block">Contacted</span>
          <p className="text-2xl font-black text-px-primary mt-1">{stats.contacted}</p>
          <span className="text-[10px] text-gray-500">Reached via call/chat</span>
        </div>

        <div
          onClick={() => setSelectedStatus('Converted')}
          className={`p-4 rounded-2xl bg-white border cursor-pointer transition-all ${
            selectedStatus === 'Converted' ? 'border-emerald-500 shadow-md ring-2 ring-emerald-100' : 'border-px-border shadow-xs hover:border-emerald-300'
          }`}
        >
          <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider block">Converted</span>
          <p className="text-2xl font-black text-emerald-600 mt-1">{stats.converted}</p>
          <span className="text-[10px] text-gray-500">Confirmed contracts</span>
        </div>

        <div
          onClick={() => setSelectedStatus('Closed')}
          className={`p-4 rounded-2xl bg-white border cursor-pointer transition-all ${
            selectedStatus === 'Closed' ? 'border-gray-500 shadow-md ring-2 ring-gray-100' : 'border-px-border shadow-xs hover:border-gray-300'
          }`}
        >
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">Closed</span>
          <p className="text-2xl font-black text-gray-700 mt-1">{stats.closed}</p>
          <span className="text-[10px] text-gray-500">Archived or lost</span>
        </div>
      </div>

      {/* 3. Search and Filter Bar */}
      <div className="p-5 rounded-2xl bg-white border border-px-border shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Search Box (6 cols) */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by customer name, company, phone, email, or enquiry ref..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-px-primary/20 focus:border-px-primary transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
              >
                Clear
              </button>
            )}
          </div>

          {/* Service Filter (3 cols) */}
          <div className="md:col-span-3">
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value as any)}
              className="w-full px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-px-primary/20 cursor-pointer"
            >
              <option value="All">All Services</option>
              <option value="Truck Drivers on Hire">Truck Drivers on Hire</option>
              <option value="3PL Fleet Management">3PL Fleet Management</option>
              <option value="Transportation">Transportation</option>
              <option value="Service Station">Service Station</option>
              <option value="Auto-Spares">Auto-Spares</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Date Range Selector (3 cols) */}
          <div className="md:col-span-3 flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
            <div className="grid grid-cols-4 gap-1 w-full text-center">
              {(['all', 'today', '7days', '30days'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setDateRange(r)}
                  className={`py-2 px-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all ${
                    dateRange === r
                      ? 'bg-px-primary text-white shadow-xs'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {r === 'all' ? 'All' : r === 'today' ? 'Today' : r === '7days' ? '7D' : '30D'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Enquiries Table */}
      <div className="rounded-3xl bg-white border border-px-border shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-px-dark text-base">Enquiries Records</h3>
            <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-px-primary text-xs font-bold">
              {enquiries.length} results
            </span>
          </div>
          <span className="text-xs text-gray-500 hidden sm:inline">
            Click 'View Details' to manage status, add notes, or contact customer.
          </span>
        </div>

        {loading ? (
          <div className="p-16 text-center text-gray-500">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto text-px-primary mb-3" />
            <p className="text-sm font-semibold">Loading business enquiries...</p>
          </div>
        ) : enquiries.length === 0 ? (
          <div className="p-16 text-center text-gray-500 space-y-3">
            <Building2 className="w-12 h-12 text-gray-300 mx-auto" />
            <p className="text-base font-bold text-gray-700">No matching business enquiries found</p>
            <p className="text-xs max-w-sm mx-auto text-gray-500">
              Try adjusting your search criteria or submit a test enquiry from the website.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#FAF8FC] text-gray-500 uppercase text-[10px] font-bold tracking-wider border-b border-gray-200">
                <tr>
                  <th className="py-3.5 px-4">Ref Number</th>
                  <th className="py-3.5 px-4">Customer & Company</th>
                  <th className="py-3.5 px-4">Contact</th>
                  <th className="py-3.5 px-4">Service</th>
                  <th className="py-3.5 px-4">Date & Time</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Email Alerts</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {enquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-purple-50/40 transition-colors">
                    {/* Ref Number */}
                    <td className="py-3.5 px-4 font-mono font-bold text-px-primary whitespace-nowrap">
                      {enq.enquiry_number}
                    </td>

                    {/* Customer & Company */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-px-dark">{enq.full_name}</div>
                      <div className="text-xs text-gray-500">{enq.company_name || 'Individual / Fleet Owner'}</div>
                    </td>

                    {/* Contact */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="font-medium text-gray-800">{enq.phone_number}</div>
                      <div className="text-xs text-gray-500">{enq.email}</div>
                    </td>

                    {/* Service */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="font-medium text-gray-900 block">{enq.service_required}</span>
                      <span className="text-[10px] text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full inline-block mt-0.5">
                        Via {enq.preferred_contact_method}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-4 whitespace-nowrap text-xs text-gray-600">
                      {new Date(enq.created_at).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                      <span className="block text-[10px] text-gray-400">
                        {new Date(enq.created_at).toLocaleTimeString('en-IN', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusBadgeClass(
                          enq.status
                        )}`}
                      >
                        {enq.status}
                      </span>
                      {enq.follow_up_date && (
                        <span className="block text-[10px] text-amber-700 mt-1 font-semibold flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Follow-up: {new Date(enq.follow_up_date).toLocaleDateString('en-IN')}
                        </span>
                      )}
                    </td>

                    {/* Email Alerts Status */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        {enq.email_status === 'Sent' ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Sent</span>
                          </span>
                        ) : enq.email_status === 'Pending' ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-600">
                            <Clock className="w-3.5 h-3.5 text-amber-500" />
                            <span>Pending</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-600">
                            <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
                            <span>Failed</span>
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap space-x-1">
                      {/* WhatsApp Shortcut */}
                      <a
                        href={`https://wa.me/${enq.phone_number.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(
                          enq.full_name
                        )}%2C%20regarding%20your%20Prisha%20Xpress%20enquiry%20${enq.enquiry_number}...`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors inline-block"
                        title="Chat on WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>

                      {/* Phone Direct */}
                      <a
                        href={`tel:${enq.phone_number}`}
                        className="p-1.5 rounded-lg bg-purple-50 text-px-primary hover:bg-purple-100 transition-colors inline-block"
                        title="Call Customer"
                      >
                        <Phone className="w-4 h-4" />
                      </a>

                      {/* View Details */}
                      <button
                        onClick={() => handleOpenDetails(enq)}
                        className="px-3 py-1.5 rounded-lg bg-px-primary hover:bg-px-violet text-white text-xs font-bold shadow-xs inline-flex items-center gap-1 transition-all"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Details</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 5. Detailed Enquiry Modal / Drawer */}
      {activeEnquiry && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-px-border my-auto">
            {/* Modal Header */}
            <div className="p-6 sm:p-8 bg-gradient-to-r from-px-deep to-px-primary text-white rounded-t-3xl flex items-center justify-between sticky top-0 z-10 shadow-sm">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-black px-2.5 py-0.5 rounded bg-white/20 text-white">
                    {activeEnquiry.enquiry_number}
                  </span>
                  <span
                    className={`px-3 py-0.5 rounded-full text-xs font-bold border ${getStatusBadgeClass(
                      activeEnquiry.status
                    )} bg-white`}
                  >
                    {activeEnquiry.status}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black">
                  {activeEnquiry.full_name}
                  {activeEnquiry.company_name ? ` (${activeEnquiry.company_name})` : ''}
                </h2>
              </div>
              <button
                onClick={() => setActiveEnquiry(null)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              {/* Action feedback banner */}
              {actionSuccessMsg && (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{actionSuccessMsg}</span>
                </div>
              )}

              {/* Customer Information Grid */}
              <div className="p-5 rounded-2xl bg-[#FAF8FC] border border-purple-100 space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 block">
                  Customer Information
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div>
                    <span className="text-gray-500 font-medium block">Full Name:</span>
                    <span className="font-bold text-px-dark text-base">{activeEnquiry.full_name}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 font-medium block">Company / Business:</span>
                    <span className="font-bold text-px-dark">{activeEnquiry.company_name || 'Individual / Fleet Owner'}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 font-medium block">Phone Number:</span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <a href={`tel:${activeEnquiry.phone_number}`} className="font-bold text-px-primary hover:underline">
                        {activeEnquiry.phone_number}
                      </a>
                      <a
                        href={`https://wa.me/${activeEnquiry.phone_number.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 font-bold text-xs"
                      >
                        WhatsApp
                      </a>
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500 font-medium block">Email Address:</span>
                    <a href={`mailto:${activeEnquiry.email}`} className="font-bold text-px-primary hover:underline">
                      {activeEnquiry.email}
                    </a>
                  </div>
                  <div>
                    <span className="text-gray-500 font-medium block">Preferred Contact:</span>
                    <span className="font-bold text-purple-800">{activeEnquiry.preferred_contact_method}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 font-medium block">Submitted Date & Time:</span>
                    <span className="font-bold text-gray-800">
                      {new Date(activeEnquiry.created_at).toLocaleString('en-IN', {
                        timeZone: 'Asia/Kolkata',
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Service & Operational Requirements */}
              <div className="p-5 rounded-2xl bg-white border border-px-border space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700">
                    Service Requested
                  </span>
                  <span className="px-3 py-1 rounded-full bg-purple-100 text-px-primary font-bold text-xs">
                    {activeEnquiry.service_required}
                  </span>
                </div>
                <div>
                  <span className="text-xs font-bold text-gray-500 block mb-1">
                    Operational Requirements:
                  </span>
                  <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 text-xs sm:text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
                    {activeEnquiry.operational_requirements}
                  </div>
                </div>
              </div>

              {/* Workflow Status Controls */}
              <div className="p-5 rounded-2xl bg-white border border-px-border space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 block">
                  Enquiry Status Workflow
                </span>
                <div className="flex flex-wrap gap-2">
                  {(['New', 'In Progress', 'Contacted', 'Converted', 'Closed'] as EnquiryStatus[]).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => handleStatusChange(st)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                        activeEnquiry.status === st
                          ? 'bg-px-primary text-white border-px-primary shadow-xs'
                          : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="text"
                    value={statusReasonInput}
                    onChange={(e) => setStatusReasonInput(e.target.value)}
                    placeholder="Optional transition note or rationale for activity log..."
                    className="flex-1 px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-px-primary"
                  />
                </div>
              </div>

              {/* Staff Assignment & Follow-Up Reminders */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Team Assignment */}
                <div className="p-4 rounded-2xl bg-white border border-px-border space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">
                    Assign Team Member
                  </span>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={assigneeInput}
                      onChange={(e) => setAssigneeInput(e.target.value)}
                      placeholder="e.g. Rahul Patil (Operations)"
                      className="flex-1 px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-px-primary"
                    />
                    <button
                      onClick={handleAssign}
                      className="px-3 py-2 rounded-xl bg-px-primary text-white text-xs font-bold hover:bg-px-violet"
                    >
                      Assign
                    </button>
                  </div>
                  {activeEnquiry.assigned_to_name && (
                    <p className="text-[11px] text-purple-700 font-semibold">
                      Currently assigned to: {activeEnquiry.assigned_to_name}
                    </p>
                  )}
                </div>

                {/* Follow-up Reminder */}
                <div className="p-4 rounded-2xl bg-white border border-px-border space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">
                    Follow-Up Reminder Date
                  </span>
                  <div className="flex gap-2">
                    <input
                      type="date"
                      value={followUpInput}
                      onChange={(e) => setFollowUpInput(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-px-primary"
                    />
                    <button
                      onClick={handleSaveFollowUp}
                      className="px-3 py-2 rounded-xl bg-amber-600 text-white text-xs font-bold hover:bg-amber-700"
                    >
                      Set
                    </button>
                  </div>
                  {activeEnquiry.follow_up_date && (
                    <p className="text-[11px] text-amber-700 font-semibold">
                      Scheduled for: {new Date(activeEnquiry.follow_up_date).toLocaleDateString('en-IN')}
                    </p>
                  )}
                </div>
              </div>

              {/* Email Notification Status & Retry Bay */}
              <div className="p-5 rounded-2xl bg-white border border-px-border space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700">
                    Email Notification Status
                  </span>
                  <button
                    onClick={handleRetryEmail}
                    disabled={isRetryingEmail}
                    className="px-3 py-1.5 rounded-xl bg-purple-100 hover:bg-purple-200 text-px-primary text-xs font-bold flex items-center gap-1.5 transition-all disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isRetryingEmail ? 'animate-spin' : ''}`} />
                    <span>{isRetryingEmail ? 'Retrying...' : 'Retry Email Delivery'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-gray-50 border border-gray-200">
                    <span className="font-bold text-gray-700 block">Company Notification:</span>
                    <span
                      className={`font-semibold ${
                        activeEnquiry.email_status === 'Sent' ? 'text-emerald-700' : 'text-amber-700'
                      }`}
                    >
                      Status: {activeEnquiry.email_status}
                    </span>
                    {activeEnquiry.email_error && (
                      <p className="text-[11px] text-gray-500 mt-1 italic">{activeEnquiry.email_error}</p>
                    )}
                  </div>

                  <div className="p-3 rounded-xl bg-gray-50 border border-gray-200">
                    <span className="font-bold text-gray-700 block">Customer Confirmation:</span>
                    <span
                      className={`font-semibold ${
                        activeEnquiry.customer_email_status === 'Sent' ? 'text-emerald-700' : 'text-amber-700'
                      }`}
                    >
                      Status: {activeEnquiry.customer_email_status}
                    </span>
                    {activeEnquiry.customer_email_error && (
                      <p className="text-[11px] text-gray-500 mt-1 italic">{activeEnquiry.customer_email_error}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Private Internal Notes (Never visible to public) */}
              <div className="p-5 rounded-2xl bg-white border border-px-border space-y-3">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-purple-600" />
                  <span className="text-xs font-bold text-px-dark uppercase tracking-wider">
                    Private Administrative Notes (Internal Only)
                  </span>
                </div>
                <textarea
                  rows={3}
                  value={newNoteInput}
                  onChange={(e) => setNewNoteInput(e.target.value)}
                  placeholder="Add confidential discussion records, quotation parameters, agreed rates or dispatch notes..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-px-primary/20"
                />
                <div className="flex justify-end">
                  <button
                    onClick={handleSaveNotes}
                    className="px-4 py-2 rounded-xl bg-px-primary hover:bg-px-violet text-white text-xs font-bold shadow-xs transition-all"
                  >
                    Save Internal Notes
                  </button>
                </div>
              </div>

              {/* Activity History & Audit Log */}
              <div className="p-5 rounded-2xl bg-[#FAF8FC] border border-purple-100 space-y-3">
                <div className="flex items-center gap-2">
                  <History className="w-4 h-4 text-px-primary" />
                  <span className="text-xs font-bold text-px-dark uppercase tracking-wider">
                    Activity History & Audit Trail
                  </span>
                </div>

                <div className="space-y-2.5 pt-1">
                  {activityHistory.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-xl bg-white border border-purple-100 text-xs flex items-start gap-2.5 shadow-2xs"
                    >
                      <div className="w-2 h-2 rounded-full bg-px-primary mt-1.5 shrink-0" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <strong className="font-bold text-px-dark">{item.actor_name}</strong>
                          <span className="text-[10px] text-gray-500">
                            {new Date(item.created_at).toLocaleString('en-IN', {
                              dateStyle: 'short',
                              timeStyle: 'short',
                            })}
                          </span>
                        </div>
                        <p className="text-gray-600 mt-0.5">{item.notes}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 bg-gray-50 border-t border-gray-100 rounded-b-3xl flex justify-between items-center">
              <span className="text-xs text-gray-500">
                Prisha Xpress Pvt. Ltd. Corporate TMS Lead Desk
              </span>
              <button
                onClick={() => setActiveEnquiry(null)}
                className="px-5 py-2.5 rounded-xl bg-gray-200 hover:bg-gray-300 text-px-dark text-xs font-bold transition-all"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
