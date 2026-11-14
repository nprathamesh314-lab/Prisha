// PRISHA XPRESS PVT. LTD. - PRIVATE ADMIN ACCESS CONTROL & DASHBOARD SHELL
// EXACTLY ONE ADMINISTRATOR ROLE: 'admin'
// ACCOUNTS CREATED IN SUPABASE AUTH & VERIFIED AGAINST public.user_roles
// STRICT ACCESS GATE: UNAUTHORIZED VISITORS CANNOT VIEW OR FETCH SENSITIVE DATA

import React, { useState, useEffect } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import {
  supabaseAuthService,
  SupabaseAuthSession,
} from '../../services/supabaseClient';
import {
  LayoutDashboard,
  Users,
  Truck,
  ShieldCheck,
  CheckCircle,
  FileSpreadsheet,
  History,
  Lock,
  ExternalLink,
  ShieldAlert,
  Menu,
  X,
  Settings,
  LogOut,
  AlertCircle,
  KeyRound,
  ArrowRight,
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const location = useLocation();
  const [session, setSession] = useState<SupabaseAuthSession | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Sign-in gate form state
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Check existing session on mount
  useEffect(() => {
    const verifySession = async () => {
      setCheckingAuth(true);
      const activeSession = await supabaseAuthService.getAdminSession();
      setSession(activeSession);
      setCheckingAuth(false);
    };
    verifySession();
  }, []);

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
          Verifying Prisha Xpress Administrator Clearance...
        </p>
      </div>
    );
  }

  // 2. UNAUTHORIZED / PUBLIC VISITOR ACCESS GATE (NO SENSITIVE DATA LOADED)
  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1E0433] via-[#2D064C] to-[#150224] flex flex-col items-center justify-center p-4 sm:p-6 text-white relative overflow-hidden">
        {/* Background ambient decorative shapes */}
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-0 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-md w-full bg-white/95 backdrop-blur-xl rounded-3xl border border-white/20 p-8 sm:p-10 text-px-dark shadow-2xl relative z-10">
          {/* Logo & Header */}
          <div className="text-center space-y-3 mb-8">
            <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-purple-100 text-px-primary mb-2 shadow-xs">
              <KeyRound className="w-8 h-8 text-px-primary" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-px-deep">
              Private Administrator Access
            </h1>
            <p className="text-xs text-gray-500 leading-relaxed">
              Authorized management portal for <strong>PRISHA XPRESS PVT. LTD.</strong> Access requires an authenticated Supabase account with the active <code>admin</code> role.
            </p>
          </div>

          {/* Error Notice */}
          {authError && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <strong>Access Denied:</strong> {authError}
              </div>
            </div>
          )}

          {/* Secure Sign-in Form */}
          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Administrator Email
              </label>
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="admin@prishaxpress.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-900 focus:outline-none focus:border-px-primary focus:ring-2 focus:ring-purple-100 transition-all bg-gray-50/50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Supabase Auth Password
              </label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-900 focus:outline-none focus:border-px-primary focus:ring-2 focus:ring-purple-100 transition-all bg-gray-50/50"
              />
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-3.5 px-4 rounded-xl bg-px-primary hover:bg-px-deep text-white font-bold text-sm shadow-lg shadow-purple-600/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
            >
              {authLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Authenticate Session</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Return link */}
          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-px-primary transition-colors"
            >
              <span>← Return to Public Website</span>
            </Link>
          </div>

          {/* Security footnote */}
          <div className="mt-4 p-3 rounded-xl bg-purple-50/80 border border-purple-200 text-[10px] text-gray-600 text-center">
            <p>
              <strong>Security Protocol:</strong> Accounts are registered via Supabase Dashboard. Role clearance is validated in <code>public.user_roles</code>.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 3. AUTHORIZED ADMINISTRATOR DASHBOARD
  const navItems = [
    {
      title: 'Main',
      items: [
        {
          name: 'Dashboard Overview',
          path: '/admin',
          icon: LayoutDashboard,
          allowed: true,
        },
      ],
    },
    {
      title: 'Recruitment & Verification',
      items: [
        {
          name: 'Staff Applications',
          path: '/admin/staff-applications',
          icon: Users,
          allowed: true,
          badge: 'Module A',
        },
        {
          name: 'Driver Applications',
          path: '/admin/driver-applications',
          icon: Truck,
          allowed: true,
          badge: 'Module B',
        },
        {
          name: 'Document Verification',
          path: '/admin/driver-verification',
          icon: ShieldCheck,
          allowed: true,
          badge: 'Checklist',
        },
        {
          name: 'Approved Drivers (TMS Master)',
          path: '/admin/approved-drivers',
          icon: CheckCircle,
          allowed: true,
          badge: 'Authorized',
        },
      ],
    },
    {
      title: 'Governance & Analytics',
      items: [
        {
          name: 'Recruitment Reports',
          path: '/admin/reports',
          icon: FileSpreadsheet,
          allowed: true,
        },
        {
          name: 'Audit Trail & Logs',
          path: '/admin/audit-logs',
          icon: History,
          allowed: true,
          badge: 'Audited',
        },
        {
          name: 'Company Master Settings',
          path: '/admin/settings',
          icon: Settings,
          allowed: true,
          badge: 'Verified Data',
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F6FB] flex flex-col pt-20">
      {/* Top Navbar */}
      <header className="fixed top-0 left-0 right-0 h-20 bg-white border-b border-px-border z-40 px-4 sm:px-8 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-100"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <Link to="/admin" className="flex items-center gap-3">
            <img
              src="/assets/prisha-logo.png"
              alt="Prisha Xpress Pvt. Ltd."
              className="h-9 w-auto object-contain"
            />
            <div className="hidden sm:block border-l border-gray-200 pl-3">
              <span className="font-black text-px-dark text-sm tracking-tight block">
                ADMIN PORTAL
              </span>
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">
                Single Administrator System (admin)
              </span>
            </div>
          </Link>
        </div>

        {/* Right Controls: Single Admin Role Badge & User Profile */}
        <div className="flex items-center gap-3">
          {/* Official Single Role Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-100 border border-purple-200 text-xs font-bold text-px-primary">
            <Lock className="w-3.5 h-3.5 text-px-primary" />
            <span>Role: Administrator (admin)</span>
          </div>

          {/* User Email & Sign Out */}
          <div className="hidden md:flex items-center gap-3 pl-3 border-l border-gray-200 text-xs">
            <div className="text-right">
              <p className="font-bold text-px-dark leading-tight">{session.user.email}</p>
              <p className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1 justify-end">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Active Session
              </p>
            </div>
          </div>

          {/* Sign Out Button */}
          <button
            onClick={handleSignOut}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-rose-200 text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 transition-all"
            title="Terminate Administrative Session"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>

          {/* Link to Public Website */}
          <Link
            to="/"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:text-px-primary hover:border-px-primary transition-all ml-1"
          >
            <span className="hidden sm:inline">Main Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 pt-20 w-64 bg-white border-r border-px-border z-30 transition-transform duration-300 lg:static lg:translate-x-0 ${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="h-full flex flex-col justify-between py-6 px-4 overflow-y-auto">
            <div className="space-y-6">
              {navItems.map((group, gIdx) => (
                <div key={gIdx} className="space-y-1">
                  <p className="px-3 text-[10px] font-black uppercase tracking-wider text-gray-400">
                    {group.title}
                  </p>
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive =
                      item.path === '/admin'
                        ? location.pathname === '/admin'
                        : location.pathname.startsWith(item.path);

                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                          isActive
                            ? 'bg-px-primary text-white shadow-sm'
                            : 'text-gray-600 hover:bg-purple-50 hover:text-px-primary'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className="w-4 h-4 shrink-0" />
                          <span>{item.name}</span>
                        </div>
                        {item.badge && (
                          <span
                            className={`text-[9px] px-1.5 py-0.5 rounded-md uppercase tracking-wider font-extrabold ${
                              isActive
                                ? 'bg-white/20 text-white'
                                : 'bg-purple-100 text-px-primary'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Strict Architecture Notice Card */}
            <div className="p-3 rounded-2xl bg-px-lavender/60 border border-purple-200 text-[11px] text-px-deep space-y-1 mt-6">
              <div className="flex items-center gap-1.5 font-bold">
                <ShieldAlert className="w-3.5 h-3.5 text-px-primary shrink-0" />
                <span>Strict Separation Active</span>
              </div>
              <p className="text-[10px] text-gray-600 leading-tight">
                Staff & Driver databases and document buckets are strictly segregated. Cross-contamination is blocked at the schema level.
              </p>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
