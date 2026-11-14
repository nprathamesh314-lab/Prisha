// PRISHA XPRESS PVT. LTD. - MODULE B: DRIVER DOCUMENT VERIFICATION WORKSPACE
// ROUTE: /admin/driver-verification
// STRICT WORKSPACE FOR VERIFICATION OFFICERS & DRIVER ADMINS

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  recruitmentService,
} from '../../services/recruitmentService';
import {
  DriverApplication,
  DriverVerificationStatus,
  DriverDocument,
} from '../../types/recruitment';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Eye,
  FileText,
  CreditCard,
  Check,
} from 'lucide-react';

const VERIFICATION_CHECKLIST = [
  { id: 'chk-1', title: 'Personal Information', desc: 'Full name, DOB, and gender matches document records.' },
  { id: 'chk-2', title: 'Contact Details', desc: 'Primary phone active and emergency contact relative confirmed.' },
  { id: 'chk-3', title: 'Driving Licence Authenticity', desc: 'RTO physical format, watermark and serial number verified.' },
  { id: 'chk-4', title: 'Licence Issue Date', desc: 'Valid issue date matching minimum statutory commercial age.' },
  { id: 'chk-5', title: 'Licence Expiry Date', desc: 'Active commercial licence validity (not expired).' },
  { id: 'chk-6', title: 'Vehicle Categories Endorsement', desc: 'HMV / HGMV / TRANS heavy endorsement confirmed by RTO stamp.' },
  { id: 'chk-7', title: 'Driving Experience Verification', desc: 'Past heavy truck operator track record and route experience.' },
  { id: 'chk-8', title: 'Address Proof Verification', desc: 'Residential address verified with utility bill or Voter ID.' },
  { id: 'chk-9', title: 'Driver Photograph Check', desc: 'Clear passport photo matching applicant face during induction.' },
  { id: 'chk-10', title: 'Duplicate Record Check', desc: 'Cross-checked against existing driver fleet records for unique licence.' },
];

export const DriverVerificationPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const driverIdParam = searchParams.get('driverId');

  const [drivers, setDrivers] = useState<DriverApplication[]>([]);
  const [selectedDriver, setSelectedDriver] = useState<DriverApplication | null>(null);
  const [selectedDoc, setSelectedDoc] = useState<DriverDocument | null>(null);
  const [docNotes, setDocNotes] = useState('');
  const [checklistState, setChecklistState] = useState<Record<string, boolean>>({});
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);

  const currentUser = recruitmentService.getCurrentUser();

  const loadData = () => {
    const list = recruitmentService.getDriverApplications();
    setDrivers(list);

    if (driverIdParam) {
      const found = list.find((d) => d.id === driverIdParam);
      if (found) {
        setSelectedDriver(found);
        if (found.documents && found.documents.length > 0) {
          setSelectedDoc(found.documents[0]);
        }
        return;
      }
    }

    if (list.length > 0 && !selectedDriver) {
      setSelectedDriver(list[0]);
      if (list[0].documents && list[0].documents.length > 0) {
        setSelectedDoc(list[0].documents[0]);
      }
    }
  };

  useEffect(() => {
    loadData();
  }, [driverIdParam]);

  useEffect(() => {
    if (selectedDriver) {
      // Initialize checklist state
      const initialChecked: Record<string, boolean> = {};
      VERIFICATION_CHECKLIST.forEach((item, idx) => {
        initialChecked[item.id] = selectedDriver.verification_status === 'Verified' || idx < 4;
      });
      setChecklistState(initialChecked);
      if (selectedDriver.documents && selectedDriver.documents.length > 0 && !selectedDoc) {
        setSelectedDoc(selectedDriver.documents[0]);
      }
    }
  }, [selectedDriver]);

  const handleDocStatusChange = (status: DriverVerificationStatus) => {
    if (!selectedDriver || !selectedDoc) return;

    try {
      const updated = recruitmentService.verifyDriverDocument(
        selectedDriver.id,
        selectedDoc.id,
        status,
        docNotes || `Document marked as ${status} by ${currentUser.name}`
      );
      setSelectedDriver(updated);
      const updatedDoc = updated.documents?.find((d) => d.id === selectedDoc.id);
      if (updatedDoc) setSelectedDoc(updatedDoc);
      setActionSuccessMsg(`Document marked as "${status}". Checklist updated.`);
      setTimeout(() => setActionSuccessMsg(null), 3000);
      setDocNotes('');
    } catch (e: any) {
      alert(e?.message || 'Failed to update document verification');
    }
  };

  const toggleChecklistItem = (id: string) => {
    setChecklistState((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleFinalApproval = () => {
    if (!selectedDriver) return;

    // Check all 10 checklist items
    const allChecked = VERIFICATION_CHECKLIST.every((item) => checklistState[item.id]);
    if (!allChecked) {
      alert('Cannot Approve: All 10 verification checklist points must be verified and checked.');
      return;
    }

    try {
      const updated = recruitmentService.updateDriverStatus(
        selectedDriver.id,
        'Approved – Ready for Company Software',
        `All 10 verification checks passed. Approved for Driver Master induction by ${currentUser.name}.`
      );
      setSelectedDriver(updated);
      setActionSuccessMsg('Driver Approved! Now ready for Company Driver Master TMS integration.');
    } catch (e: any) {
      alert(e?.message || 'Failed to approve driver');
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-px-deep text-white font-extrabold text-[10px] uppercase tracking-wider">
              Verification Bay
            </span>
            <span className="text-xs text-gray-500">• 10-Point Highway Inspection Protocol</span>
          </div>
          <h1 className="text-2xl font-black text-px-dark tracking-tight mt-1">
            Driver Document Verification Workspace
          </h1>
          <p className="text-xs text-gray-500">
            Dedicated workspace for examining commercial licences, vehicle endorsements, and background address records.
          </p>
        </div>

        {/* Driver Selector Dropdown */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-bold text-gray-600 whitespace-nowrap">Select Driver:</label>
          <select
            value={selectedDriver?.id || ''}
            onChange={(e) => {
              const d = drivers.find((drv) => drv.id === e.target.value);
              if (d) {
                setSelectedDriver(d);
                if (d.documents && d.documents.length > 0) {
                  setSelectedDoc(d.documents[0]);
                }
              }
            }}
            className="px-3 py-2 rounded-xl border border-gray-200 text-xs font-bold bg-white text-px-primary focus:outline-none focus:border-px-primary"
          >
            {drivers.map((d) => (
              <option key={d.id} value={d.id}>
                {d.application_reference} — {d.full_name} ({d.verification_status})
              </option>
            ))}
          </select>
        </div>
      </div>

      {actionSuccessMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-bold flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{actionSuccessMsg}</span>
        </div>
      )}

      {selectedDriver ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT 7 COLS: Document Viewer & Decision Actions */}
          <div className="lg:col-span-7 space-y-6">
            {/* Driver Identity Card */}
            <div className="p-5 rounded-3xl bg-white border border-px-border shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-px-primary text-xs">
                    {selectedDriver.application_reference}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-purple-50 text-px-primary text-[10px] font-bold">
                    {selectedDriver.vehicle_categories.join(', ')}
                  </span>
                </div>
                <h2 className="text-xl font-black text-px-dark mt-1">{selectedDriver.full_name}</h2>
                <p className="text-xs text-gray-500">
                  Licence: <strong className="font-mono text-gray-700">{selectedDriver.licence_number}</strong> ({selectedDriver.issuing_rto})
                </p>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">Verification Status</span>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-black mt-1 ${
                  selectedDriver.verification_status === 'Verified'
                    ? 'bg-emerald-100 text-emerald-800'
                    : selectedDriver.verification_status === 'Invalid'
                    ? 'bg-rose-100 text-rose-800'
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {selectedDriver.verification_status}
                </span>
              </div>
            </div>

            {/* Document Tabs */}
            <div className="bg-white rounded-3xl border border-px-border shadow-soft-purple p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="font-bold text-sm text-px-dark flex items-center gap-2">
                  <FileText className="w-4 h-4 text-px-primary" />
                  <span>Applicant Submitted Documents ({selectedDriver.documents?.length || 0})</span>
                </h3>
                <span className="text-[10px] text-gray-400 font-mono">Private S3 Storage Encrypted</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {selectedDriver.documents?.map((doc) => (
                  <button
                    key={doc.id}
                    onClick={() => setSelectedDoc(doc)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      selectedDoc?.id === doc.id
                        ? 'bg-px-primary text-white shadow-xs'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span>{doc.document_type.replace('_', ' ').toUpperCase()}</span>
                    <span className={`w-2 h-2 rounded-full ${
                      doc.document_status === 'Verified' ? 'bg-emerald-400' : 'bg-amber-400'
                    }`} />
                  </button>
                ))}
              </div>

              {/* Selected Document Inspection Panel */}
              {selectedDoc && (
                <div className="p-4 rounded-2xl bg-px-bg border border-px-border space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-px-dark text-sm capitalize">
                        {selectedDoc.document_type.replace('_', ' ')}
                      </h4>
                      <p className="text-[11px] text-gray-400 font-mono">
                        File: {selectedDoc.original_filename} ({(selectedDoc.file_size / 1024).toFixed(0)} KB)
                      </p>
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-white border border-gray-200 text-gray-700">
                      Status: <strong>{selectedDoc.document_status}</strong>
                    </span>
                  </div>

                  {/* Document Preview Mock View */}
                  <div className="h-64 rounded-xl bg-white border border-gray-200 flex flex-col items-center justify-center p-6 text-center shadow-inner relative overflow-hidden">
                    <CreditCard className="w-12 h-12 text-px-primary/40 mb-2" />
                    <p className="font-bold text-xs text-px-dark">Document Image Preview</p>
                    <p className="text-[11px] text-gray-400 max-w-sm mt-1">
                      {selectedDoc.storage_path}
                    </p>
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => alert(`Simulated signed document preview for: ${selectedDoc.original_filename}`)}
                        className="px-3 py-1.5 rounded-lg bg-purple-50 text-px-primary text-xs font-bold hover:bg-px-primary hover:text-white transition-all flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect High-Res Scan</span>
                      </button>
                    </div>
                  </div>

                  {/* Document Verification Notes Input */}
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 mb-1">
                      Verification Officer Notes & Remarks:
                    </label>
                    <input
                      type="text"
                      value={docNotes}
                      onChange={(e) => setDocNotes(e.target.value)}
                      placeholder="e.g. RTO heavy endorsement stamped; validity verified with official date..."
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs bg-white focus:outline-none focus:border-px-primary"
                    />
                  </div>

                  {/* Officer Actions for Document */}
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-200">
                    <button
                      onClick={() => handleDocStatusChange('Verified')}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 transition-all"
                    >
                      <Check className="w-4 h-4" />
                      <span>Mark Verified</span>
                    </button>
                    <button
                      onClick={() => handleDocStatusChange('Unclear')}
                      className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 transition-all"
                    >
                      <AlertTriangle className="w-4 h-4" />
                      <span>Mark Unclear (Request Rescan)</span>
                    </button>
                    <button
                      onClick={() => handleDocStatusChange('Invalid')}
                      className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 transition-all"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>Mark Invalid</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT 5 COLS: 10-Point Highway Checklist & Approval */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl border border-px-border shadow-soft-purple p-6 space-y-5">
              <div className="border-b border-gray-100 pb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-px-violet">
                  Mandatory Protocol
                </span>
                <h3 className="font-black text-lg text-px-dark">
                  10-Point Verification Checklist
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Every point must be reviewed before final driver master authorization.
                </p>
              </div>

              <div className="space-y-2.5">
                {VERIFICATION_CHECKLIST.map((item, idx) => {
                  const checked = !!checklistState[item.id];
                  return (
                    <label
                      key={item.id}
                      className={`p-3 rounded-2xl border text-xs flex items-start gap-3 cursor-pointer transition-all ${
                        checked
                          ? 'bg-emerald-50/50 border-emerald-200 text-emerald-950'
                          : 'bg-gray-50/70 border-gray-200 text-gray-700 hover:bg-gray-100/70'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleChecklistItem(item.id)}
                        className="mt-0.5 h-4 w-4 rounded text-emerald-600 focus:ring-emerald-500"
                      />
                      <div>
                        <p className="font-bold text-xs flex items-center gap-1.5">
                          <span>{idx + 1}. {item.title}</span>
                          {checked && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                        </p>
                        <p className="text-[11px] text-gray-500 mt-0.5">{item.desc}</p>
                      </div>
                    </label>
                  );
                })}
              </div>

              {/* Final Approval CTA */}
              <div className="pt-4 border-t border-gray-100 space-y-3">
                <div className="p-3 rounded-xl bg-purple-50 text-[11px] text-px-deep">
                  <p className="font-bold">Next Stage:</p>
                  <p>
                    Approving here marks the driver as <strong>Approved – Ready for Company Software</strong>. Only Authorized Driver Managers can then push to the live TMS Driver Master.
                  </p>
                </div>

                <button
                  onClick={handleFinalApproval}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-px-deep to-px-primary hover:from-px-primary hover:to-px-violet text-white font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>COMPLETE VERIFICATION & APPROVE DRIVER</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-12 text-center bg-white rounded-3xl border border-px-border text-gray-400">
          No driver selected for verification.
        </div>
      )}
    </div>
  );
};
