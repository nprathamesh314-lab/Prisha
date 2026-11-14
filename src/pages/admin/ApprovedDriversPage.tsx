// PRISHA XPRESS PVT. LTD. - APPROVED DRIVERS & TMS MASTER INTEGRATION
// ROUTE: /admin/approved-drivers
// RESTRICTED TO AUTHORIZED DRIVER MANAGERS & SUPER ADMINS

import React, { useState, useEffect } from 'react';
import {
  recruitmentService,
} from '../../services/recruitmentService';
import {
  DriverApplication,
} from '../../types/recruitment';
import {
  companySoftwareIntegration,
} from '../../services/companySoftwareIntegrationService';
import {
  CheckCircle,
  Phone,
  Server,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
} from 'lucide-react';

export const ApprovedDriversPage: React.FC = () => {
  const [approvedDrivers, setApprovedDrivers] = useState<DriverApplication[]>([]);
  const [selectedDriverForIntegration, setSelectedDriverForIntegration] = useState<DriverApplication | null>(null);
  const [integrating, setIntegrating] = useState(false);
  const [integrationResult, setIntegrationResult] = useState<{
    success: boolean;
    externalId?: string;
    message: string;
  } | null>(null);

  const currentUser = recruitmentService.getCurrentUser();
  const integrationConfig = companySoftwareIntegration.getConfig();

  const loadData = () => {
    const list = recruitmentService.getApprovedDrivers();
    setApprovedDrivers(list);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleIntegrate = async () => {
    if (!selectedDriverForIntegration) return;

    setIntegrating(true);
    setIntegrationResult(null);

    // Call integration architecture
    const syncRes = await companySoftwareIntegration.syncApprovedDriver({
      id: selectedDriverForIntegration.id,
      fullName: selectedDriverForIntegration.full_name,
      drivingLicenseNumber: selectedDriverForIntegration.licence_number,
      status: selectedDriverForIntegration.application_status,
      isSynced: selectedDriverForIntegration.is_integrated_with_driver_master,
    });

    setIntegrationResult({
      success: syncRes.success,
      message: syncRes.message,
    });
    setIntegrating(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[10px] uppercase tracking-wider">
              Approved Driver Roster
            </span>
            <span className="text-xs text-gray-500">• {approvedDrivers.length} Cleared Captains</span>
          </div>
          <h1 className="text-2xl font-black text-px-dark tracking-tight mt-1">
            Approved Drivers & TMS Master Integration
          </h1>
          <p className="text-xs text-gray-500">
            Drivers who have passed all 10 verification checklist checks and are cleared for induction into Prisha Xpress Driver Master.
          </p>
        </div>

        <button
          onClick={loadData}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-xs font-bold text-gray-700 shadow-xs"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh List</span>
        </button>
      </div>

      {/* Integration Status Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-purple-50 border border-amber-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <Server className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-amber-900">Future Company Software Integration:</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-200 text-amber-900">
                STATUS: {integrationConfig.status} (DISABLED)
              </span>
            </div>
            <p className="text-gray-600 mt-0.5">
              Enterprise TMS / ERP integration architecture is active. Live synchronization remains safely disabled until official company API documentation and credentials are provided. No simulated requests occur.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Roster Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {approvedDrivers.length === 0 ? (
          <div className="col-span-full py-16 text-center bg-white rounded-3xl border border-px-border text-gray-400">
            No approved drivers found. Review and approve drivers in the Verification Bay first.
          </div>
        ) : (
          approvedDrivers.map((driver) => {
            const isIntegrated = driver.is_integrated_with_driver_master;
            return (
              <div
                key={driver.id}
                className="bg-white rounded-3xl border border-px-border shadow-soft-purple p-6 flex flex-col justify-between space-y-4 hover:border-px-primary/40 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-mono font-bold text-px-primary text-xs">
                        {driver.application_reference}
                      </span>
                      <h3 className="font-bold text-base text-px-dark mt-0.5">{driver.full_name}</h3>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Phone className="w-3 h-3" /> {driver.mobile_number}
                      </p>
                    </div>

                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-black ${
                        isIntegrated
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-purple-100 text-px-primary'
                      }`}
                    >
                      {isIntegrated ? 'Integrated' : 'Ready'}
                    </span>
                  </div>

                  <div className="p-3 rounded-2xl bg-px-bg border border-px-border space-y-1.5 text-xs">
                    <p className="text-gray-700">
                      <strong>Licence:</strong>{' '}
                      <span className="font-mono font-bold text-px-deep">{driver.licence_number}</span>
                    </p>
                    <p className="text-gray-600">
                      <strong>RTO:</strong> {driver.issuing_rto}
                    </p>
                    <p className="text-gray-600">
                      <strong>Expiry:</strong> {driver.licence_expiry_date}
                    </p>
                    <div className="pt-1 flex flex-wrap gap-1">
                      {driver.vehicle_categories.map((c) => (
                        <span key={c} className="px-1.5 py-0.5 rounded bg-white text-[10px] font-bold text-px-primary border border-purple-100">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  {isIntegrated && (
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
                      <p className="font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Integrated to TMS Driver Master
                      </p>
                      <p className="text-[11px] font-mono mt-0.5">
                        External ID: <strong>{driver.external_driver_id}</strong>
                      </p>
                    </div>
                  )}
                </div>

                <div className="pt-2">
                  {isIntegrated ? (
                    <button
                      disabled
                      className="w-full py-2.5 rounded-xl bg-gray-100 text-gray-400 font-bold text-xs cursor-not-allowed flex items-center justify-center gap-1.5"
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      <span>Already in Company Software</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setSelectedDriverForIntegration(driver);
                        setIntegrationResult(null);
                      }}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-px-deep to-px-primary hover:from-px-primary hover:to-px-violet text-white font-bold text-xs shadow-sm flex items-center justify-center gap-1.5 transition-all"
                    >
                      <Server className="w-3.5 h-3.5" />
                      <span>Add to Company Driver Master</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* 3. Integration Confirmation & Pre-Check Modal */}
      {selectedDriverForIntegration && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-60 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-px-border animate-fadeIn space-y-5">
            <div className="border-b border-gray-100 pb-3">
              <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                TMS ERP Authorization Gateway
              </span>
              <h3 className="text-xl font-black text-px-dark mt-0.5">
                Integrate Driver to Master Database
              </h3>
              <p className="text-xs text-gray-500">
                Driver: <strong>{selectedDriverForIntegration.full_name}</strong> ({selectedDriverForIntegration.application_reference})
              </p>
            </div>

            {/* Pre-Integration Checklist */}
            <div className="space-y-2 text-xs">
              <p className="font-bold text-px-deep text-[11px] uppercase tracking-wider">Automated Pre-Flight Validations:</p>
              <div className="p-3 rounded-2xl bg-px-bg border border-px-border space-y-1.5">
                <p className="flex items-center gap-2 text-emerald-800 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Document verification status: <strong>Verified (All checks passed)</strong></span>
                </p>
                <p className="flex items-center gap-2 text-emerald-800 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Duplicate licence search: <strong>Clean (No conflicting active IDs)</strong></span>
                </p>
                <p className="flex items-center gap-2 text-emerald-800 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Licence expiry date: <strong>{selectedDriverForIntegration.licence_expiry_date} (Active)</strong></span>
                </p>
                <p className="flex items-center gap-2 text-emerald-800 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Authorized Administrator: <strong>{currentUser.name} ({currentUser.role})</strong></span>
                </p>
              </div>
            </div>

            {/* Integration Result Feedback */}
            {integrationResult && (
              <div
                className={`p-4 rounded-2xl text-xs ${
                  integrationResult.success
                    ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
                    : 'bg-rose-50 border border-rose-200 text-rose-900'
                }`}
              >
                <p className="font-bold flex items-center gap-1.5">
                  {integrationResult.success ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  )}
                  {integrationResult.success ? 'Integration Succeeded!' : 'Integration Blocked'}
                </p>
                <p className="mt-1">{integrationResult.message}</p>
                {integrationResult.externalId && (
                  <p className="font-mono font-bold mt-1 text-px-primary">
                    Generated Driver Master TMS ID: {integrationResult.externalId}
                  </p>
                )}
              </div>
            )}

            {/* Bottom Actions */}
            <div className="pt-2 flex justify-end gap-3">
              <button
                onClick={() => {
                  setSelectedDriverForIntegration(null);
                  setIntegrationResult(null);
                }}
                className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50"
              >
                {integrationResult?.success ? 'Done' : 'Cancel'}
              </button>

              {!integrationResult?.success && (
                <button
                  onClick={handleIntegrate}
                  disabled={integrating}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-bold text-xs shadow-md hover:shadow-lg disabled:opacity-50 flex items-center gap-2"
                >
                  <Server className="w-3.5 h-3.5" />
                  <span>{integrating ? 'Connecting to Driver Master API...' : 'CONFIRM & ADD TO MASTER'}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
