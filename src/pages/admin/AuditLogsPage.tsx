// PRISHA XPRESS PVT. LTD. - AUDIT LOGS & COMPLIANCE HISTORY
// ROUTE: /admin/audit-logs
// SUPER ADMIN CLEARANCE ONLY

import React from 'react';
import { recruitmentService } from '../../services/recruitmentService';
import {
  ShieldCheck,
  Server,
  Users,
  Truck,
} from 'lucide-react';

export const AuditLogsPage: React.FC = () => {
  const staffApps = recruitmentService.getStaffApplications();
  const driverApps = recruitmentService.getDriverApplications();

  // Aggregate logs
  const logs: Array<{
    id: string;
    type: 'STAFF_STATUS' | 'DRIVER_STATUS' | 'DRIVER_VERIF' | 'DRIVER_INTEGRATION';
    ref: string;
    title: string;
    details: string;
    actor: string;
    timestamp: string;
  }> = [];

  staffApps.forEach((s) => {
    s.status_history?.forEach((h) => {
      logs.push({
        id: h.id,
        type: 'STAFF_STATUS',
        ref: s.application_reference,
        title: `Staff Status: ${h.previous_status} → ${h.new_status}`,
        details: h.reason,
        actor: h.changed_by,
        timestamp: h.created_at,
      });
    });
  });

  driverApps.forEach((d) => {
    d.status_history?.forEach((h) => {
      logs.push({
        id: h.id,
        type: 'DRIVER_STATUS',
        ref: d.application_reference,
        title: `Driver Status: ${h.previous_status} → ${h.new_status}`,
        details: h.reason,
        actor: h.changed_by,
        timestamp: h.created_at,
      });
    });

    d.verifications?.forEach((v) => {
      logs.push({
        id: v.id,
        type: 'DRIVER_VERIF',
        ref: d.application_reference,
        title: `Document ${v.document_type.replace('_', ' ')} Verified: ${v.verification_status}`,
        details: v.verification_notes,
        actor: v.verified_by,
        timestamp: v.verified_at,
      });
    });

    d.integration_logs?.forEach((intg) => {
      logs.push({
        id: intg.id,
        type: 'DRIVER_INTEGRATION',
        ref: d.application_reference,
        title: `TMS Integration: ${intg.integration_status} (ID: ${intg.external_driver_id})`,
        details: `Integrated into ${intg.external_system_name}`,
        actor: intg.initiated_by,
        timestamp: intg.created_at,
      });
    });
  });

  // Sort newest first
  logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[10px] uppercase tracking-wider">
            Security & Audit
          </span>
          <span className="text-xs text-gray-500">• {logs.length} Immutable Log Entries</span>
        </div>
        <h1 className="text-2xl font-black text-px-dark tracking-tight mt-1">
          Recruitment Audit Trail & System Events
        </h1>
        <p className="text-xs text-gray-500">
          Tamper-evident record of all application reviews, document verifications, status changes, and TMS master integration calls.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-px-border shadow-soft-purple overflow-hidden">
        <div className="divide-y divide-gray-100">
          {logs.length === 0 ? (
            <div className="p-12 text-center text-gray-400 text-xs">No audit logs recorded yet.</div>
          ) : (
            logs.map((log) => (
              <div key={log.id} className="p-4 sm:p-5 hover:bg-purple-50/30 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-purple-50 text-px-primary shrink-0 mt-0.5">
                    {log.type === 'STAFF_STATUS' ? (
                      <Users className="w-4 h-4" />
                    ) : log.type === 'DRIVER_INTEGRATION' ? (
                      <Server className="w-4 h-4 text-emerald-600" />
                    ) : log.type === 'DRIVER_VERIF' ? (
                      <ShieldCheck className="w-4 h-4 text-blue-600" />
                    ) : (
                      <Truck className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-px-primary text-[11px]">{log.ref}</span>
                      <span className="font-bold text-px-dark">{log.title}</span>
                    </div>
                    <p className="text-gray-600 mt-0.5 text-[11px]">{log.details}</p>
                    <span className="text-[10px] text-gray-400">Actor: <strong>{log.actor}</strong></span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[11px] text-gray-400 font-mono">
                    {new Date(log.timestamp).toLocaleString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
