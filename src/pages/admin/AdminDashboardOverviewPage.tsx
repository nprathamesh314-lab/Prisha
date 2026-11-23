// PRISHA XPRESS PVT. LTD. - CLEAN ADMIN DASHBOARD OVERVIEW
// ROUTE: /admin
// SIMPLE OVERVIEW FOR EVERYDAY TEAM WORKFLOWS

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { recruitmentService } from '../../services/recruitmentService';
import { businessEnquiryService } from '../../services/enquiryService';
import { driverApplicationService } from '../../services/driverApplicationService';
import {
  Users,
  Truck,
  Building2,
  ArrowRight,
  Clock,
  CheckCircle2,
  Calendar,
  Eye,
  RefreshCw,
} from 'lucide-react';

export const AdminDashboardOverviewPage: React.FC = () => {
  const [enquiryStats, setEnquiryStats] = useState(businessEnquiryService.getStats());
  const [staffStats, setStaffStats] = useState(recruitmentService.getStaffStats());
  const [driverCount, setDriverCount] = useState({ total: 0, pending: 0, approved: 0 });
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadAllStats = async () => {
    setIsRefreshing(true);
    try {
      await businessEnquiryService.syncFromSupabase();
      setEnquiryStats(businessEnquiryService.getStats());

      await recruitmentService.syncStaffApplicationsFromDb();
      setStaffStats(recruitmentService.getStaffStats());

      const drivers = await driverApplicationService.getDriverApplications();
      setDriverCount({
        total: drivers.length,
        pending: drivers.filter((d) => d.status === 'pending').length,
        approved: drivers.filter((d) => d.status === 'approved').length,
      });
    } catch (e) {
      console.warn('Error loading dashboard stats:', e);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadAllStats();
  }, []);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* 1. Clean Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-7 rounded-2xl bg-gradient-to-r from-[#210235] via-px-deep to-px-primary text-white shadow-md">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-purple-200 border border-white/15 mb-2">
            Operations & Recruitment Portal
          </span>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            Welcome to Prisha Xpress Admin
          </h1>
          <p className="text-purple-100 text-xs sm:text-sm font-normal mt-0.5 max-w-lg">
            Manage customer enquiries, verify commercial driver documents, and screen job applicants across Maharashtra.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadAllStats}
            disabled={isRefreshing}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 text-xs font-bold transition-all disabled:opacity-50 text-white"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 border border-white/15 text-xs font-medium">
            <Calendar className="w-3.5 h-3.5 text-purple-300" />
            <span>
              {new Date().toLocaleDateString('en-IN', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              })}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Three Main Everyday Workflow Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {/* Card 1: Business Enquiries */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs flex flex-col justify-between hover:border-purple-300 transition-all">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-px-primary flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              {enquiryStats.new > 0 && (
                <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-extrabold border border-amber-200">
                  {enquiryStats.new} New
                </span>
              )}
            </div>

            <h2 className="text-base font-black text-gray-900">Business Enquiries</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Customer quotes for Full Truck Load (FTL), fleet hiring, and logistics.
            </p>

            <div className="mt-4 grid grid-cols-3 gap-2 pt-3 border-t border-gray-100 text-center">
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase">Total</p>
                <p className="text-lg font-black text-gray-900 mt-0.5">{enquiryStats.total}</p>
              </div>
              <div>
                <p className="text-xs text-amber-600 font-bold uppercase">New</p>
                <p className="text-lg font-black text-amber-600 mt-0.5">{enquiryStats.new}</p>
              </div>
              <div>
                <p className="text-xs text-emerald-600 font-bold uppercase">Won</p>
                <p className="text-lg font-black text-emerald-600 mt-0.5">{enquiryStats.converted}</p>
              </div>
            </div>
          </div>

          <Link
            to="/admin/enquiries"
            className="mt-5 w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-purple-50 hover:bg-purple-100 text-px-primary text-xs font-bold transition-colors"
          >
            <span>Open Business Enquiries</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Card 2: Driver Applications */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs flex flex-col justify-between hover:border-purple-300 transition-all">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-px-primary flex items-center justify-center">
                <Truck className="w-5 h-5" />
              </div>
              {driverCount.pending > 0 && (
                <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-extrabold border border-amber-200">
                  {driverCount.pending} Pending
                </span>
              )}
            </div>

            <h2 className="text-base font-black text-gray-900">Driver Applications</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Commercial heavy truck drivers applying with DL and Aadhaar cards.
            </p>

            <div className="mt-4 grid grid-cols-3 gap-2 pt-3 border-t border-gray-100 text-center">
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase">Total</p>
                <p className="text-lg font-black text-gray-900 mt-0.5">{driverCount.total}</p>
              </div>
              <div>
                <p className="text-xs text-amber-600 font-bold uppercase">Pending</p>
                <p className="text-lg font-black text-amber-600 mt-0.5">{driverCount.pending}</p>
              </div>
              <div>
                <p className="text-xs text-emerald-600 font-bold uppercase">Approved</p>
                <p className="text-lg font-black text-emerald-600 mt-0.5">{driverCount.approved}</p>
              </div>
            </div>
          </div>

          <Link
            to="/admin/drivers"
            className="mt-5 w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-purple-50 hover:bg-purple-100 text-px-primary text-xs font-bold transition-colors"
          >
            <span>Verify Driver Applications</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Card 3: Staff Applications */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs flex flex-col justify-between hover:border-purple-300 transition-all">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-px-primary flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              {staffStats.submitted > 0 && (
                <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-extrabold border border-blue-200">
                  {staffStats.submitted} Pending
                </span>
              )}
            </div>

            <h2 className="text-base font-black text-gray-900">Staff Applications</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Office, operations, accounting, and admin candidates applying to Prisha Xpress.
            </p>

            <div className="mt-4 grid grid-cols-3 gap-2 pt-3 border-t border-gray-100 text-center">
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase">Total</p>
                <p className="text-lg font-black text-gray-900 mt-0.5">{staffStats.total}</p>
              </div>
              <div>
                <p className="text-xs text-blue-600 font-bold uppercase">Pending</p>
                <p className="text-lg font-black text-blue-600 mt-0.5">{staffStats.submitted}</p>
              </div>
              <div>
                <p className="text-xs text-emerald-600 font-bold uppercase">Selected</p>
                <p className="text-lg font-black text-emerald-600 mt-0.5">{staffStats.selected}</p>
              </div>
            </div>
          </div>

          <Link
            to="/admin/staff-applications"
            className="mt-5 w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-purple-50 hover:bg-purple-100 text-px-primary text-xs font-bold transition-colors"
          >
            <span>Review Staff Applications</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 3. Quick Action Hub */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs">
        <h3 className="text-xs font-black text-gray-700 uppercase tracking-wider mb-3">
          Quick Everyday Actions
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <Link
            to="/admin/enquiries"
            className="p-3.5 rounded-xl border border-gray-200 hover:border-px-primary hover:bg-purple-50/40 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">Check New Enquiries</p>
                <p className="text-[11px] text-gray-500">Contact new freight leads</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-px-primary transition-colors" />
          </Link>

          <Link
            to="/admin/drivers"
            className="p-3.5 rounded-xl border border-gray-200 hover:border-px-primary hover:bg-purple-50/40 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-50 text-px-primary flex items-center justify-center">
                <Eye className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">Verify Driver Documents</p>
                <p className="text-[11px] text-gray-500">Inspect DL & Aadhaar photos</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-px-primary transition-colors" />
          </Link>

          <Link
            to="/admin/staff-applications"
            className="p-3.5 rounded-xl border border-gray-200 hover:border-px-primary hover:bg-purple-50/40 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">Screen Staff Resumes</p>
                <p className="text-[11px] text-gray-500">Shortlist office candidates</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-px-primary transition-colors" />
          </Link>
        </div>
      </div>
    </div>
  );
};
