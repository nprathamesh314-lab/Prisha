// PRISHA XPRESS PVT. LTD. - CLEAN & SIMPLE ADMIN PORTAL
// ROUTE: /admin/*
// CLEAN EVERYDAY WORKFLOW FOR PRISHA XPRESS TEAM MEMBERS

import React, { useState, useEffect } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import {
  supabaseAuthService,
  SupabaseAuthSession,
} from '../../services/supabaseClient';
import { businessEnquiryService } from '../../services/enquiryService';
import { recruitmentService } from '../../services/recruitmentService';
import { driverApplicationService } from '../../services/driverApplicationService';
import {
  LayoutDashboard,
  Users,
  Truck,
  Building2,
  ExternalLink,
  Menu,
  X,
  LogOut,
  AlertCircle,
  KeyRound,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const location = useLocation();
  const [session, setSession] = useState<SupabaseAuthSession | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Live pending counts for Staff, Drivers, and Business Enquiries
  const [pendingCounts, setPendingCounts] = useState({
    enquiries: 0,
    staff: 0,
    drivers: 0,
  });

  // Sign-in gate form state
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Check session on mount
  useEffect(() => {
    const verifySession = async () => {
      setCheckingAuth(true);
      const activeSession = await supabaseAuthService.getAdminSession();
      setSession(activeSession);
      setCheckingAuth(false);
    };
    verifySession();
  }, []);

  // Fetch live counts across modules
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        await businessEnquiryService.syncFromSupabase();
        const enqStats = businessEnquiryService.getStats();

        await recruitmentService.syncStaffApplicationsFromDb();
        const staffList = recruitmentService.getStaffApplications();
        const staffPending = staffList.filter(
          (s) => s.application_status === 'Submitted' || s.application_status === 'Under Review'
        ).length;

        const driverList = await driverApplicationService.getDriverApplications();
        const driverPending = driverList.filter((d) => d.status === 'pending').length;

        setPendingCounts({
          enquiries: enqStats.new || 0,
          staff: staffPending || 0,
          drivers: driverPending || 0,
        });
      } catch (e) {
        console.warn('Error updating admin counts:', e);
      }
    };

    fetchCounts();

    const handleCountsUpdate = () => fetchCounts();
    window.addEventListener('admin_counts_changed', handleCountsUpdate);
    return () => window.removeEventListener('admin_counts_changed', handleCountsUpdate);
  }, [location.pathname]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthLoading(true);

    const result = await supabaseAuthService.signIn(emailInput, passwordInput);
    setAuthLoading(false);

    if (result.error || !result.session) {
      setAuthError(result.error || 'Authentication failed. Please verify your credentials.');
    } else {
      setSession(result.session);
      setPasswordInput('');
    }
  };

  const handleSignOut = async () => {
    await supabaseAuthService.signOut();
    setSession(null);
    setAuthError(null);
  };

  // 1. Initial Auth Check Loading State
  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#1F0433] flex flex-col items-center justify-center p-6 text-white">
        <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-400 rounded-full animate-spin mb-4" />
        <p className="text-sm font-semibold text-purple-200 tracking-wider">
          Loading Prisha Xpress Admin Portal...
        </p>
      </div>
    );
  }

  // 2. UNAUTHORIZED / SIGN-IN GATE
  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1E0433] via-[#2D064C] to-[#150224] flex flex-col items-center justify-center p-4 sm:p-6 text-white relative overflow-hidden">
        <div className="max-w-md w-full bg-white rounded-3xl border border-purple-100 p-8 sm:p-10 text-gray-900 shadow-2xl relative z-10">
          <div className="text-center space-y-2 mb-6">
            <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-purple-100 text-px-primary mb-1">
              <KeyRound className="w-8 h-8 text-px-primary" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-px-deep">
              Admin Sign In
            </h1>
            <p className="text-xs text-gray-500">
              Prisha Xpress Pvt. Ltd. Management Dashboard
            </p>
          </div>

          {authError && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="admin@prishaxpress.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm font-medium focus:outline-none focus:border-px-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm font-medium focus:outline-none focus:border-px-primary"
              />
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-3 px-4 rounded-xl bg-px-primary hover:bg-px-deep text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
            >
              {authLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Admin</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-gray-100 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-px-primary transition-colors"
            >
              <span>← Back to Website</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 3. CORE EVERYDAY NAVIGATION ITEMS
  const navItems = [
    {
      name: 'Dashboard',
      path: '/admin',
      icon: LayoutDashboard,
    },
    {
      name: 'Business Enquiries',
      path: '/admin/enquiries',
      icon: Building2,
      badge: pendingCounts.enquiries > 0 ? `${pendingCounts.enquiries} New` : undefined,
    },
    {
      name: 'Driver Applications',
      path: '/admin/drivers',
      icon: Truck,
      badge: pendingCounts.drivers > 0 ? `${pendingCounts.drivers} Pending` : undefined,
    },
    {
      name: 'Staff Applications',
      path: '/admin/staff-applications',
      icon: Users,
      badge: pendingCounts.staff > 0 ? `${pendingCounts.staff} Pending` : undefined,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F9F8FC] flex flex-col pt-16">
      {/* Top Navbar */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-40 px-4 sm:px-6 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Logo & Brand Title */}
          <Link to="/admin" className="flex items-center gap-2.5">
            <img
              src="/assets/prisha-logo.png"
              alt="Prisha Xpress"
              className="h-7 sm:h-8 w-auto object-contain"
            />
            <div className="border-l border-gray-200 pl-2.5">
              <span className="font-black text-gray-900 text-xs sm:text-sm tracking-tight block">
                ADMIN PORTAL
              </span>
              <span className="text-[10px] text-gray-400 font-bold block -mt-0.5">
                Prisha Xpress Pvt. Ltd.
              </span>
            </div>
          </Link>
        </div>

        {/* Right Header Actions */}
        <div className="flex items-center gap-2">
          {/* View Website Link */}
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-bold text-gray-700 hover:text-px-primary hover:bg-gray-50 transition-colors"
          >
            <span className="hidden sm:inline">View Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          {/* Log Out Button */}
          <button
            onClick={handleSignOut}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 text-xs font-bold transition-colors"
            title="Sign Out"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Layout Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Mobile Backdrop Overlay */}
        {mobileMenuOpen && (
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/40 z-30 md:hidden backdrop-blur-2xs transition-opacity"
          />
        )}

        {/* Clean Left Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 pt-16 w-60 bg-white border-r border-gray-200 z-30 transition-transform duration-200 md:static md:translate-x-0 ${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="h-full flex flex-col justify-between p-3 overflow-y-auto">
            {/* Core Everyday Navigation Links */}
            <nav className="space-y-1">
              <p className="px-3 pt-2 pb-1 text-[10px] font-black uppercase tracking-wider text-gray-400">
                Menu
              </p>

              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  item.path === '/admin'
                    ? location.pathname === '/admin'
                    : item.path === '/admin/drivers'
                    ? location.pathname === '/admin/drivers' || location.pathname.startsWith('/admin/driver-applications')
                    : item.path === '/admin/staff-applications'
                    ? location.pathname === '/admin/staff' || location.pathname.startsWith('/admin/staff-applications')
                    : item.path === '/admin/enquiries'
                    ? location.pathname === '/admin/enquiries' || location.pathname.startsWith('/admin/business-enquiries')
                    : location.pathname.startsWith(item.path);

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-px-primary text-white shadow-sm'
                        : 'text-gray-700 hover:bg-purple-50 hover:text-px-primary'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.name}</span>
                    </div>

                    {item.badge && (
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-black transition-all ${
                          isActive
                            ? 'bg-white text-px-primary'
                            : 'bg-purple-100 text-purple-900 border border-purple-200'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Bottom Status Tag */}
            <div className="p-3 rounded-xl bg-purple-50 border border-purple-100 text-center text-xs">
              <div className="flex items-center justify-center gap-1.5 font-bold text-purple-900 text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 text-px-primary" />
                <span>Supabase Connected</span>
              </div>
              <p className="text-[10px] text-gray-500 mt-0.5">
                Live Pune Cloud Database
              </p>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
