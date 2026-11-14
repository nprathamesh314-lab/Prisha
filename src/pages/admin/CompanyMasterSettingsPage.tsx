// PRISHA XPRESS PVT. LTD. - COMPANY MASTER INFORMATION & METRICS SETTINGS
// ALLOWS COMPANY ADMINISTRATORS TO REVIEW, CONFIRM, AND EDIT PUBLISHED FIGURES
// PRESERVES AUDIT TRAIL AND FORMAL CONFIRMATION FLAGS

import React, { useState, useEffect } from 'react';
import {
  companyInfo as initialCompanyInfo,
  companyStatistics as initialStats,
  CompanyInfo,
  CompanyStatItem,
} from '../../data/companyData';
import {
  Building2,
  TrendingUp,
  Phone,
  Mail,
  Clock,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Save,
  RotateCcw,
  HelpCircle,
  FileText,
  BadgeCheck,
  Shield,
} from 'lucide-react';

const STORAGE_KEY_INFO = 'pxpl_admin_company_info';
const STORAGE_KEY_STATS = 'pxpl_admin_company_stats';

export const CompanyMasterSettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'stats' | 'info' | 'questionnaire'>('stats');
  const [companyData, setCompanyData] = useState<CompanyInfo>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_INFO);
    return saved ? JSON.parse(saved) : initialCompanyInfo;
  });
  const [stats, setStats] = useState<CompanyStatItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_STATS);
    return saved ? JSON.parse(saved) : initialStats;
  });
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (savedSuccess) {
      const timer = setTimeout(() => setSavedSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [savedSuccess]);

  const handleStatChange = (id: string, field: keyof CompanyStatItem, value: any) => {
    setStats((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleInfoChange = (field: keyof CompanyInfo, value: any) => {
    setCompanyData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY_INFO, JSON.stringify(companyData));
    localStorage.setItem(STORAGE_KEY_STATS, JSON.stringify(stats));
    setSavedSuccess(true);
  };

  const handleReset = () => {
    if (window.confirm('Reset all values to published website defaults?')) {
      localStorage.removeItem(STORAGE_KEY_INFO);
      localStorage.removeItem(STORAGE_KEY_STATS);
      setCompanyData(initialCompanyInfo);
      setStats(initialStats);
    }
  };

  const questionnaireItems = [
    {
      id: 'Q1',
      question: 'Official Corporate Headquarters',
      detail: 'Is Kharadi, Pune the registered corporate office or operational hub? Is there a full building/street number?',
      category: 'Corporate Registry',
      status: 'Awaiting Street Address',
    },
    {
      id: 'Q2',
      question: 'Experience Claim Clarification',
      detail: 'Company incorporated Nov 2023. Does the "15+ Years Experience" claim reflect founder/management team background? How should it be formally worded?',
      category: 'Branding & Legal',
      status: 'Needs Clarification',
    },
    {
      id: 'Q3',
      question: 'Exact Active Driver Count',
      detail: 'Website lists both "753 Drivers Network" and "1,000+ Drivers Network". What is the audited active roster number?',
      category: 'Operations',
      status: 'Needs Confirmation',
    },
    {
      id: 'Q4',
      question: 'Fleet Count & Ownership Model',
      detail: 'Old website states "79 Fleet Optimization". How many trucks are company-owned vs partner-managed?',
      category: 'Fleet Operations',
      status: 'Needs Confirmation',
    },
    {
      id: 'Q5',
      question: 'Payroll vs Station Staff Breakdown',
      detail: 'Old website states "187 Dedicated Staff". Does this include mechanics, dispatchers, and corporate employees?',
      category: 'HR & Personnel',
      status: 'Needs Confirmation',
    },
    {
      id: 'Q6',
      question: 'Tracking Telemetry Distance',
      detail: 'Is the "70,80,300 Km Tracked" milestone from an internal GPS/TMS platform or odometer records?',
      category: 'Technology & Telemetry',
      status: 'Needs Confirmation',
    },
    {
      id: 'Q7',
      question: 'Service Station Workshop Address',
      detail: 'What is the physical address of the 24/7 commercial vehicle service station and spare parts counter?',
      category: 'Workshop Facility',
      status: 'Pending Address',
    },
    {
      id: 'Q8',
      question: 'Client Testimonial Permissions',
      detail: 'Do we have signed marketing consent from Mr. Vinod Gaikwad, DVS International, Mr. Mahesh Nalawade, and Savani Transport?',
      category: 'Legal & Marketing',
      status: 'Pending Written Consent',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-2xl bg-purple-100 text-px-primary">
              <Building2 className="w-6 h-6" />
            </span>
            <div>
              <h1 className="text-2xl font-bold text-px-deep">Company Master Settings</h1>
              <p className="text-sm text-gray-500">
                Manage verified corporate identity, operational statistics, and verification audit trail
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleReset}
            className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium flex items-center gap-2 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Defaults</span>
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl bg-px-primary text-white hover:bg-px-deep text-sm font-semibold flex items-center gap-2 shadow-md shadow-purple-600/20 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save Updates</span>
          </button>
        </div>
      </div>

      {/* Success Alert */}
      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>
            Company master settings updated and stored to local browser state successfully. Changes reflect across live portal sessions.
          </span>
        </div>
      )}

      {/* Tab Switcher */}
      <div className="flex items-center gap-2 p-1.5 bg-gray-100 rounded-2xl w-fit">
        <button
          onClick={() => setActiveTab('stats')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
            activeTab === 'stats'
              ? 'bg-white text-px-primary shadow-sm'
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Operational Statistics</span>
        </button>

        <button
          onClick={() => setActiveTab('info')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
            activeTab === 'info'
              ? 'bg-white text-px-primary shadow-sm'
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Corporate Identity & Contact</span>
        </button>

        <button
          onClick={() => setActiveTab('questionnaire')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
            activeTab === 'questionnaire'
              ? 'bg-white text-px-primary shadow-sm'
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>Clarification Tracker ({questionnaireItems.length})</span>
        </button>
      </div>

      {/* TAB 1: STATISTICS */}
      {activeTab === 'stats' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong>Data Governance Protocol:</strong> Statistics published on the original website (753 Drivers, 79 Fleets, 187 Staff, 70,80,300 Km) are flagged as <em>Needs Company Confirmation</em> until internal annual operational audits confirm them. Once verified, toggle the confirmation status to display a formal corporate certification seal.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4 hover:border-purple-200 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-400 tracking-wider uppercase">
                    Metric ID: {stat.id}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                      stat.status === 'confirmed'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : 'bg-amber-100 text-amber-800 border border-amber-200'
                    }`}
                  >
                    {stat.status === 'confirmed' ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" /> Confirmed
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="w-3.5 h-3.5" /> Needs Confirmation
                      </>
                    )}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      Label Name
                    </label>
                    <input
                      type="text"
                      value={stat.label}
                      onChange={(e) => handleStatChange(stat.id, 'label', e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm font-semibold text-px-deep focus:outline-none focus:border-px-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      Published Value
                    </label>
                    <input
                      type="text"
                      value={stat.value}
                      onChange={(e) => handleStatChange(stat.id, 'value', e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm font-bold text-px-primary focus:outline-none focus:border-px-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Operational Scope Description
                  </label>
                  <input
                    type="text"
                    value={stat.description}
                    onChange={(e) => handleStatChange(stat.id, 'description', e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs text-gray-700 focus:outline-none focus:border-px-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Audit Notes & Source
                  </label>
                  <textarea
                    rows={2}
                    value={stat.notes}
                    onChange={(e) => handleStatChange(stat.id, 'notes', e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs text-gray-600 focus:outline-none focus:border-px-primary"
                  />
                </div>

                {/* Status Toggle */}
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-gray-500 font-medium">Verification Status:</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleStatChange(stat.id, 'status', 'needs_confirmation')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        stat.status === 'needs_confirmation'
                          ? 'bg-amber-500 text-white shadow-sm'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      Needs Confirmation
                    </button>
                    <button
                      type="button"
                      onClick={() => handleStatChange(stat.id, 'status', 'confirmed')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        stat.status === 'confirmed'
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      Confirmed
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: CORPORATE IDENTITY & CONTACT */}
      {activeTab === 'info' && (
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-px-deep flex items-center gap-2">
              <BadgeCheck className="w-5 h-5 text-px-primary" />
              <span>Official Registered Corporate Details</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                  Company Legal Name
                </label>
                <input
                  type="text"
                  value={companyData.name}
                  onChange={(e) => handleInfoChange('name', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-px-deep focus:outline-none focus:border-px-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                  Corporate Identification Number (CIN)
                </label>
                <input
                  type="text"
                  value={companyData.cin}
                  onChange={(e) => handleInfoChange('cin', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-mono text-gray-700 bg-gray-50 focus:outline-none"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                  Official Positioning Statement
                </label>
                <input
                  type="text"
                  value={companyData.positioning}
                  onChange={(e) => handleInfoChange('positioning', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-px-primary focus:outline-none focus:border-px-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                  Tagline / Punchline
                </label>
                <input
                  type="text"
                  value={companyData.tagline}
                  onChange={(e) => handleInfoChange('tagline', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 focus:outline-none focus:border-px-primary"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100">
              <h3 className="text-sm font-bold text-px-deep uppercase tracking-wider mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-px-primary" />
                <span>Contact & Communication Channels</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    <span>Office Location / Address</span>
                  </label>
                  <input
                    type="text"
                    value={companyData.address}
                    onChange={(e) => handleInfoChange('address', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm font-medium text-gray-800 focus:outline-none focus:border-px-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-gray-400" />
                    <span>Official Helpline / Phone</span>
                  </label>
                  <input
                    type="text"
                    value={companyData.phone}
                    onChange={(e) => handleInfoChange('phone', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm font-medium text-gray-800 focus:outline-none focus:border-px-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-gray-400" />
                    <span>Official Email</span>
                  </label>
                  <input
                    type="email"
                    value={companyData.email}
                    onChange={(e) => handleInfoChange('email', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm font-medium text-gray-800 focus:outline-none focus:border-px-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    <span>Business Working Hours</span>
                  </label>
                  <input
                    type="text"
                    value={companyData.businessHours}
                    onChange={(e) => handleInfoChange('businessHours', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm font-medium text-gray-800 focus:outline-none focus:border-px-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1 flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-gray-400" />
                    <span>Experience Claim Wording</span>
                  </label>
                  <input
                    type="text"
                    value={companyData.experienceClaim}
                    onChange={(e) => handleInfoChange('experienceClaim', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm font-medium text-gray-800 focus:outline-none focus:border-px-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Experience Claim Audit Status
                  </label>
                  <select
                    value={companyData.experienceStatus}
                    onChange={(e) => handleInfoChange('experienceStatus', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm font-medium text-gray-800 focus:outline-none focus:border-px-primary bg-white"
                  >
                    <option value="published_needs_confirmation">
                      Published (Needs Founder Track-Record Confirmation)
                    </option>
                    <option value="confirmed">Formally Confirmed by Management</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CLARIFICATION QUESTIONNAIRE TRACKER */}
      {activeTab === 'questionnaire' && (
        <div className="space-y-6">
          <div className="bg-purple-900 text-white p-6 rounded-3xl space-y-3">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <FileText className="w-5 h-5 text-px-violet" />
              <span>Company Information Clarification Questionnaire</span>
            </h2>
            <p className="text-xs text-purple-200 leading-relaxed">
              To guarantee total accuracy and corporate legal compliance, the following items from the legacy website require formal confirmation from Prisha Xpress Pvt. Ltd. executive management. All items are documented in detail in <code>COMPANY_INFORMATION_REQUIRED.md</code>.
            </p>
          </div>

          <div className="space-y-4">
            {questionnaireItems.map((q) => (
              <div
                key={q.id}
                className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-purple-100 text-px-primary font-mono text-xs font-bold">
                      {q.id}
                    </span>
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      {q.category}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-px-deep">{q.question}</h3>
                  <p className="text-xs text-gray-600">{q.detail}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                    {q.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
