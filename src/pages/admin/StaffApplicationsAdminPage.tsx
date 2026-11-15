// PRISHA XPRESS PVT. LTD. - MODULE A: STAFF APPLICATIONS HR MANAGEMENT
// ROUTE: /admin/staff-applications
// STRICT ACCESS: HR ADMIN & SUPER ADMIN ONLY. NEVER MIXES DRIVER RECORDS.

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
  Search,
  Download,
  Eye,
  FileText,
  Phone,
  Mail,
  MapPin,
  Clock,
  RefreshCw,
} from 'lucide-react';

const STATUS_BADGE_CLASSES: Record<StaffApplicationStatus, string> = {
  Submitted: 'bg-amber-100 text-amber-800 border-amber-200',
  'Under Review': 'bg-blue-100 text-blue-800 border-blue-200',
  Shortlisted: 'bg-purple-100 text-px-primary border-purple-200',
  'Interview Scheduled': 'bg-indigo-100 text-indigo-800 border-indigo-200',
  Selected: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  Rejected: 'bg-rose-100 text-rose-800 border-rose-200',
  'On Hold': 'bg-gray-100 text-gray-700 border-gray-200',
};

export const StaffApplicationsAdminPage: React.FC = () => {
  const [applications, setApplications] = useState<StaffApplication[]>([]);
  const [selectedApp, setSelectedApp] = useState<StaffApplication | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState<StaffDepartment | 'All'>('All');
  const [selectedStatus, setSelectedStatus] = useState<StaffApplicationStatus | 'All'>('All');
  const [statusUpdateModalOpen, setStatusUpdateModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<StaffApplicationStatus>('Under Review');
  const [statusReason, setStatusReason] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);

  const currentUser = recruitmentService.getCurrentUser();

  const loadData = async (syncWithDb = false) => {
    if (syncWithDb) {
      setIsSyncing(true);
      await recruitmentService.syncStaffApplicationsFromDb();
      setIsSyncing(false);
    }
    const list = recruitmentService.getStaffApplications({
      search: searchQuery,
      department: selectedDept,
      status: selectedStatus,
    });
    setApplications(list);
  };

  useEffect(() => {
    loadData(true);
  }, []);

  useEffect(() => {
    loadData(false);
  }, [searchQuery, selectedDept, selectedStatus]);

  const handleUpdateStatus = () => {
    if (!selectedApp) return;
    try {
      const updated = recruitmentService.updateStaffStatus(
        selectedApp.id,
        newStatus,
        statusReason || `Status updated to ${newStatus} by ${currentUser.name}`
      );
      setSelectedApp(updated);
      setStatusUpdateModalOpen(false);
      setStatusReason('');
      loadData();
    } catch (e: any) {
      alert(e?.message || 'Failed to update status');
    }
  };

  const exportReport = () => {
    const csvRows = [
      [
        'Reference',
        'Candidate Name',
        'Mobile Number',
        'Email',
        'Position',
        'Department',
        'Qualification',
        'Total Experience',
        'Expected Salary',
        'Application Status',
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
    link.setAttribute('download', `PrishaXpress_Staff_Recruitment_${Date.now()}.csv`);
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
            <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-px-primary font-extrabold text-[10px] uppercase tracking-wider">
              Module A (Staff Database)
            </span>
            <span className="text-xs text-gray-500">• {applications.length} Records</span>
          </div>
          <h1 className="text-2xl font-black text-px-dark tracking-tight mt-1">
            Staff Recruitment Management
          </h1>
          <p className="text-xs text-gray-500">
            Independent candidate repository for corporate, technical, and operations roles.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => loadData(true)}
            disabled={isSyncing}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-purple-200 bg-purple-50/80 hover:bg-purple-100/80 text-xs font-bold text-px-primary transition-all disabled:opacity-50"
            title="Fetch latest online submissions from Supabase Cloud Database"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Syncing...' : 'Sync Cloud DB'}</span>
          </button>

          <button
            onClick={exportReport}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-xs font-bold text-gray-700 shadow-xs transition-all"
          >
            <Download className="w-4 h-4 text-px-primary" />
            <span>Export Staff CSV</span>
          </button>
        </div>
      </div>

      {/* 2. Filters & Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-px-border shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, ref, email, phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-px-primary"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Department Filter */}
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value as any)}
            className="px-3 py-2 rounded-xl border border-gray-200 text-xs bg-white text-gray-700 focus:outline-none focus:border-px-primary"
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

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as any)}
            className="px-3 py-2 rounded-xl border border-gray-200 text-xs bg-white text-gray-700 focus:outline-none focus:border-px-primary"
          >
            <option value="All">All Statuses</option>
            <option value="Submitted">Submitted</option>
            <option value="Under Review">Under Review</option>
            <option value="Shortlisted">Shortlisted</option>
            <option value="Interview Scheduled">Interview Scheduled</option>
            <option value="Selected">Selected</option>
            <option value="Rejected">Rejected</option>
            <option value="On Hold">On Hold</option>
          </select>
        </div>
      </div>

      {/* 3. Applications Table */}
      <div className="bg-white rounded-3xl border border-px-border shadow-soft-purple overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-px-bg/80 border-b border-px-border text-gray-500 font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4">Reference</th>
                <th className="py-3.5 px-4">Candidate Name</th>
                <th className="py-3.5 px-4">Position & Dept</th>
                <th className="py-3.5 px-4">Qualification</th>
                <th className="py-3.5 px-4">Experience</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Applied Date</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {applications.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-gray-400">
                    No staff applications matching search filters.
                  </td>
                </tr>
              ) : (
                applications.map((app) => (
                  <tr
                    key={app.id}
                    className="hover:bg-purple-50/40 transition-colors cursor-pointer"
                    onClick={() => setSelectedApp(app)}
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-px-primary">
                      {app.application_reference}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-px-dark">{app.full_name}</div>
                      <div className="text-[11px] text-gray-400">{app.mobile_number}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-gray-800">{app.position_applied_for}</div>
                      <span className="text-[10px] text-gray-400">{app.department}</span>
                    </td>
                    <td className="py-3.5 px-4 text-gray-600">
                      {app.qualification}
                    </td>
                    <td className="py-3.5 px-4">
                      {app.is_fresher ? (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold text-[10px]">
                          Fresher
                        </span>
                      ) : (
                        <span className="text-gray-700 font-medium">
                          {app.total_experience || 'Experienced'}
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                          STATUS_BADGE_CLASSES[app.application_status]
                        }`}
                      >
                        {app.application_status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-gray-500 whitespace-nowrap">
                      {new Date(app.created_at).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedApp(app);
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

      {/* 4. Full Candidate Profile Drawer / Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-px-border p-6 sm:p-8 animate-fadeIn space-y-6">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-gray-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-px-primary text-sm">
                    {selectedApp.application_reference}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                      STATUS_BADGE_CLASSES[selectedApp.application_status]
                    }`}
                  >
                    {selectedApp.application_status}
                  </span>
                </div>
                <h2 className="text-2xl font-black text-px-dark mt-1">
                  {selectedApp.full_name}
                </h2>
                <p className="text-xs text-gray-500">
                  Applied for <strong>{selectedApp.position_applied_for}</strong> ({selectedApp.department})
                </p>
              </div>

              <button
                onClick={() => setSelectedApp(null)}
                className="text-gray-400 hover:text-gray-700 p-2 rounded-xl hover:bg-gray-100"
              >
                ✕
              </button>
            </div>

            {/* Profile Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-px-bg space-y-2">
                <p className="font-bold text-px-deep uppercase tracking-wider text-[10px]">Contact Details</p>
                <p className="flex items-center gap-2 text-gray-700">
                  <Phone className="w-3.5 h-3.5 text-gray-400" /> {selectedApp.mobile_number}
                </p>
                <p className="flex items-center gap-2 text-gray-700">
                  <Mail className="w-3.5 h-3.5 text-gray-400" /> {selectedApp.email}
                </p>
                <p className="flex items-start gap-2 text-gray-700">
                  <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" />
                  <span>{selectedApp.current_address}, {selectedApp.city}, {selectedApp.state} - {selectedApp.pin_code}</span>
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-px-bg space-y-2">
                <p className="font-bold text-px-deep uppercase tracking-wider text-[10px]">Academics</p>
                <p><strong>Qualification:</strong> {selectedApp.qualification}</p>
                <p><strong>Degree:</strong> {selectedApp.course_degree}</p>
                <p><strong>University:</strong> {selectedApp.college_university} ({selectedApp.passing_year})</p>
                <p><strong>Score:</strong> {selectedApp.percentage_cgpa}</p>
                {selectedApp.additional_qualification && (
                  <p><strong>Addl Cert:</strong> {selectedApp.additional_qualification}</p>
                )}
              </div>

              <div className="p-4 rounded-2xl bg-px-bg space-y-2 sm:col-span-2">
                <p className="font-bold text-px-deep uppercase tracking-wider text-[10px]">Work Experience & Compensation</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-gray-700">
                  <p><strong>Status:</strong> {selectedApp.is_fresher ? 'Fresher' : selectedApp.total_experience}</p>
                  <p><strong>Notice Period:</strong> {selectedApp.notice_period || 'Immediate'}</p>
                  <p><strong>Expected CTC:</strong> ₹{selectedApp.expected_salary?.toLocaleString('en-IN') || '—'}</p>
                  <p><strong>Previous Employer:</strong> {selectedApp.previous_company || 'N/A'}</p>
                </div>
                {selectedApp.key_skills && (
                  <p className="pt-2 border-t border-gray-200">
                    <strong>Key Skills:</strong> {selectedApp.key_skills}
                  </p>
                )}
              </div>
            </div>

            {/* Document Vault */}
            <div className="space-y-3">
              <h3 className="font-bold text-px-dark text-xs uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-px-primary" />
                <span>Uploaded Candidate Documents</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedApp.documents && selectedApp.documents.length > 0 ? (
                  selectedApp.documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="p-3 rounded-xl border border-gray-200 bg-white flex items-center justify-between text-xs"
                    >
                      <div>
                        <p className="font-bold text-gray-800 capitalize">{doc.document_type.replace('_', ' ')}</p>
                        <p className="text-[10px] text-gray-400 font-mono">{doc.original_filename}</p>
                      </div>
                      <a
                        href={`#download-${doc.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          alert(`Simulating secure signed URL download for: ${doc.original_filename} (Private Storage: ${doc.storage_path})`);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-purple-50 text-px-primary font-bold hover:bg-px-primary hover:text-white transition-all text-[11px] flex items-center gap-1"
                      >
                        <Download className="w-3 h-3" />
                        <span>Download</span>
                      </a>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-xs italic">No attached documents.</p>
                )}
              </div>
            </div>

            {/* Application History Log */}
            {selectedApp.status_history && selectedApp.status_history.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <h4 className="font-bold text-gray-700 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-gray-400" />
                  <span>HR Status History Log</span>
                </h4>
                <div className="space-y-2">
                  {selectedApp.status_history.map((h) => (
                    <div key={h.id} className="p-2.5 rounded-xl bg-gray-50 border border-gray-100 text-xs">
                      <div className="flex justify-between font-semibold text-px-deep">
                        <span>{h.previous_status} → {h.new_status}</span>
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

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <button
                onClick={() => setSelectedApp(null)}
                className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50"
              >
                Close Profile
              </button>
              <button
                onClick={() => setStatusUpdateModalOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-px-primary text-white text-xs font-bold hover:bg-px-violet shadow-sm"
              >
                Update Recruitment Status
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Update Status Modal */}
      {statusUpdateModalOpen && selectedApp && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-60 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-px-border animate-fadeIn space-y-4">
            <h3 className="font-bold text-lg text-px-dark">
              Update Status: {selectedApp.full_name}
            </h3>
            <p className="text-xs text-gray-500">
              Ref: <strong className="font-mono text-px-primary">{selectedApp.application_reference}</strong>
            </p>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                New Recruitment Status
              </label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs bg-white focus:outline-none focus:border-px-primary"
              >
                <option value="Submitted">Submitted</option>
                <option value="Under Review">Under Review</option>
                <option value="Shortlisted">Shortlisted</option>
                <option value="Interview Scheduled">Interview Scheduled</option>
                <option value="Selected">Selected</option>
                <option value="Rejected">Rejected</option>
                <option value="On Hold">On Hold</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                HR Review Comments / Reason
              </label>
              <textarea
                rows={3}
                value={statusReason}
                onChange={(e) => setStatusReason(e.target.value)}
                placeholder="Reason for status change or next steps instructions..."
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-px-primary resize-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setStatusUpdateModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateStatus}
                className="px-5 py-2 rounded-xl bg-px-primary text-white text-xs font-bold hover:bg-px-violet shadow-sm"
              >
                Save Status
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
