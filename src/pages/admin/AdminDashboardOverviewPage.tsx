// PRISHA XPRESS PVT. LTD. - ADMIN DASHBOARD OVERVIEW
// ROUTE: /admin
// STRICT ISOLATION: INDEPENDENT STAFF AND DRIVER ANALYTICS

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { recruitmentService } from '../../services/recruitmentService';
import {
  Users,
  Truck,
  ShieldCheck,
  CheckCircle,
  ArrowRight,
  Database,
  Lock,
} from 'lucide-react';

export const AdminDashboardOverviewPage: React.FC = () => {
  const [staffStats, setStaffStats] = useState(recruitmentService.getStaffStats());
  const [driverStats, setDriverStats] = useState(recruitmentService.getDriverStats());
  const currentRole = recruitmentService.getCurrentRole();
  const currentUser = recruitmentService.getCurrentUser();

  const isStaffAllowed = recruitmentService.canAccessStaff();
  const isDriverAllowed = recruitmentService.canAccessDrivers();

  useEffect(() => {
    setStaffStats(recruitmentService.getStaffStats());
    setDriverStats(recruitmentService.getDriverStats());
  }, [currentRole]);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* 1. Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-px-deep via-[#2b054a] to-px-primary text-white shadow-soft-purple">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-purple-200 border border-white/20">
            <Lock className="w-3.5 h-3.5 text-px-accent" />
            <span>Active Session: {currentUser.role.replace('_', ' ').toUpperCase()}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Recruitment Command & Operations
          </h1>
          <p className="text-purple-100 text-xs sm:text-sm font-light max-w-xl">
            Welcome back, {currentUser.name}. You are logged in with authorized administrative privileges for Prisha Xpress Pvt. Ltd.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <div className="px-4 py-2.5 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md text-right">
            <span className="text-[10px] uppercase font-bold text-purple-200 block">System Clock</span>
            <span className="font-mono font-bold text-sm text-white">
              {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Architecture Isolation Notice Banner */}
      <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5 text-px-deep">
          <Database className="w-5 h-5 text-px-primary shrink-0" />
          <div>
            <strong className="font-bold">Dual-Schema Isolation Active:</strong> Staff and Driver recruitment modules run on strictly segregated tables (`staff_applications` vs `driver_applications`) and private storage buckets.
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-wider self-start sm:self-center">
          100% Segregated
        </span>
      </div>

      {/* 3. Module A: Staff Recruitment KPIs */}
      {isStaffAllowed && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-purple-100 text-px-primary">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-black text-px-dark">Module A: Staff Recruitment (HR)</h2>
                <p className="text-xs text-gray-500">Corporate & administrative position applications</p>
              </div>
            </div>
            <Link
              to="/admin/staff-applications"
              className="text-xs font-bold text-px-primary hover:text-px-violet flex items-center gap-1"
            >
              <span>View All Applications</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            <div className="p-4 rounded-2xl bg-white border border-px-border shadow-xs">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Total</span>
              <p className="text-2xl font-black text-px-dark mt-1">{staffStats.total}</p>
              <span className="text-[10px] text-gray-500">All submissions</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-px-border shadow-xs">
              <span className="text-[11px] font-bold text-amber-500 uppercase tracking-wider">New Submitted</span>
              <p className="text-2xl font-black text-amber-600 mt-1">{staffStats.submitted}</p>
              <span className="text-[10px] text-gray-500">Awaiting HR screen</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-px-border shadow-xs">
              <span className="text-[11px] font-bold text-blue-500 uppercase tracking-wider">In Review</span>
              <p className="text-2xl font-black text-blue-600 mt-1">{staffStats.underReview}</p>
              <span className="text-[10px] text-gray-500">Dept evaluation</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-px-border shadow-xs">
              <span className="text-[11px] font-bold text-purple-500 uppercase tracking-wider">Shortlisted</span>
              <p className="text-2xl font-black text-px-primary mt-1">{staffStats.shortlisted}</p>
              <span className="text-[10px] text-gray-500">Round 1 scheduled</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-px-border shadow-xs">
              <span className="text-[11px] font-bold text-indigo-500 uppercase tracking-wider">Interview</span>
              <p className="text-2xl font-black text-indigo-600 mt-1">{staffStats.interview}</p>
              <span className="text-[10px] text-gray-500">Final discussion</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-px-border shadow-xs">
              <span className="text-[11px] font-bold text-emerald-500 uppercase tracking-wider">Selected</span>
              <p className="text-2xl font-black text-emerald-600 mt-1">{staffStats.selected}</p>
              <span className="text-[10px] text-gray-500">Offers released</span>
            </div>
          </div>
        </div>
      )}

      {/* 4. Module B: Driver Registration KPIs */}
      {isDriverAllowed && (
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-purple-100 text-px-primary">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-black text-px-dark">Module B: Driver Operations & Verification</h2>
                <p className="text-xs text-gray-500">Commercial truck captain registrations and licence screening</p>
              </div>
            </div>
            <Link
              to="/admin/driver-applications"
              className="text-xs font-bold text-px-primary hover:text-px-violet flex items-center gap-1"
            >
              <span>View All Drivers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            <div className="p-4 rounded-2xl bg-white border border-px-border shadow-xs">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Total Drivers</span>
              <p className="text-2xl font-black text-px-dark mt-1">{driverStats.total}</p>
              <span className="text-[10px] text-gray-500">Fleet registrations</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-px-border shadow-xs">
              <span className="text-[11px] font-bold text-amber-500 uppercase tracking-wider">Pending Verif.</span>
              <p className="text-2xl font-black text-amber-600 mt-1">{driverStats.pendingVerification}</p>
              <span className="text-[10px] text-gray-500">Awaiting RTO check</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-px-border shadow-xs">
              <span className="text-[11px] font-bold text-blue-500 uppercase tracking-wider">Docs Verified</span>
              <p className="text-2xl font-black text-blue-600 mt-1">{driverStats.verified}</p>
              <span className="text-[10px] text-gray-500">Licence confirmed</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-px-border shadow-xs">
              <span className="text-[11px] font-bold text-purple-500 uppercase tracking-wider">Approved Ready</span>
              <p className="text-2xl font-black text-px-primary mt-1">{driverStats.approved}</p>
              <span className="text-[10px] text-gray-500">Ready for Master</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-px-border shadow-xs">
              <span className="text-[11px] font-bold text-emerald-500 uppercase tracking-wider">In TMS Software</span>
              <p className="text-2xl font-black text-emerald-600 mt-1">{driverStats.integrated}</p>
              <span className="text-[10px] text-gray-500">Assigned Ext ID</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-px-border shadow-xs">
              <span className="text-[11px] font-bold text-rose-500 uppercase tracking-wider">Rejected</span>
              <p className="text-2xl font-black text-rose-600 mt-1">{driverStats.rejected}</p>
              <span className="text-[10px] text-gray-500">Failed compliance</span>
            </div>
          </div>
        </div>
      )}

      {/* 5. Fast Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {isStaffAllowed && (
          <Link
            to="/admin/staff-applications"
            className="p-6 rounded-3xl bg-white border border-px-border shadow-xs hover:shadow-md hover:border-px-primary/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-2xl bg-purple-100 text-px-primary flex items-center justify-center mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-px-dark text-base">HR Staff Applications</h3>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                Filter candidate resumes by department, qualification and years of experience. Schedule interviews and export reports.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-px-primary">
              <span>Open Staff Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        )}

        {isDriverAllowed && (
          <Link
            to="/admin/driver-verification"
            className="p-6 rounded-3xl bg-white border border-px-border shadow-xs hover:shadow-md hover:border-px-primary/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-2xl bg-purple-100 text-px-primary flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-px-dark text-base">Driver Document Verification</h3>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                Conduct step-by-step verification on commercial driving licences, RTO endorsements, and address records with official checklist items.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-px-primary">
              <span>Open Verification Bay</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        )}

        {isDriverAllowed && (
          <Link
            to="/admin/approved-drivers"
            className="p-6 rounded-3xl bg-white border border-px-border shadow-xs hover:shadow-md hover:border-px-primary/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                <CheckCircle className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-px-dark text-base">Approved Driver Master Integration</h3>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                Review verified drivers ready for company software. Authorized managers can run duplicate checks and integrate into Prisha Xpress TMS.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-emerald-700">
              <span>Inspect Approved Roster</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};
