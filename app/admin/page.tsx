'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Shield,
  Server,
  Users,
  Database,
  Activity,
  Lock,
  Download,
  Search,
  CheckCircle2,
  LogOut,
  Sparkles,
  Building,
  RefreshCw,
  Plus,
  Sliders,
  FileSpreadsheet,
  Sun,
  Moon,
  Globe,
  ChevronDown,
  MoreHorizontal,
  Check,
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { SupportedLanguage } from '@/context/translations';

type AdminTabType =
  | 'overview'
  | 'users'
  | 'policy'
  | 'ingestion'
  | 'security'
  | 'providers'
  | 'audit';

interface OfficerRequest {
  id: string;
  name: string;
  email: string;
  department: string;
  jurisdiction: string;
  designation: string;
  requestedAt: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

interface SystemService {
  name: string;
  status: 'Operational' | 'Degraded' | 'Maintenance';
  latency: string;
  uptime: string;
  description: string;
}

export default function AdminPortalPage() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, languages } = useLanguage();

  // Active Tab
  const [activeTab, setActiveTab] = useState<AdminTabType>('overview');

  // Responsive More Menu State
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const moreMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
        setIsMoreMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Admin Profile
  const [adminProfile] = useState({
    name: 'Amit Sharma',
    role: 'Senior Technical Director & Root Admin',
    department: 'National Informatics Centre (NIC) / MSDE',
    employeeId: 'NIC-MSDE-ROOT-01',
    email: 'admin@skillsaarthi.gov.in',
  });

  // Global Toast
  const [toastMessage, setToastMessage] = useState<string>('');
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Check auth session
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const session = localStorage.getItem('skill_saarthi_admin_session');
      if (!session) {
        // Set fallback demo session if accessing directly
        localStorage.setItem(
          'skill_saarthi_admin_session',
          JSON.stringify({
            adminId: 'ADM-MSDE-ROOT-01',
            name: 'Amit Sharma',
            role: 'Senior Technical Director & Root Admin',
            organization: 'National Informatics Centre (NIC) / MSDE',
            email: 'admin@skillsaarthi.gov.in',
            loginTime: new Date().toISOString(),
          })
        );
      }
    }
  }, []);

  // System Services Health
  const [services] = useState<SystemService[]>([
    {
      name: 'Outcome Evidence Triangulation Engine',
      status: 'Operational',
      latency: '18ms',
      uptime: '99.98%',
      description: 'Calculates multi-source confidence scores (0-100%) and 5-state classifications.',
    },
    {
      name: 'WhatsApp Micro-Survey Webhook Gateway',
      status: 'Operational',
      latency: '42ms',
      uptime: '99.94%',
      description: '4-step micro-survey delivery pipeline with 30-second completion throughput.',
    },
    {
      name: 'DigiLocker & Document Verification Bridge',
      status: 'Operational',
      latency: '65ms',
      uptime: '99.85%',
      description: 'Automated salary slip and offer letter payload cryptographic verification.',
    },
    {
      name: 'NCVET & State Mission Cohort Sync',
      status: 'Operational',
      latency: '120ms',
      uptime: '99.99%',
      description: 'Longitudinal sync across Bihar, Maharashtra, and Central PMKVY registries.',
    },
    {
      name: 'DPDP Act 2023 Consent Audit Ledger',
      status: 'Operational',
      latency: '12ms',
      uptime: '100%',
      description: 'Cryptographic SHA-256 telemetry logger for zero-trust data access audits.',
    },
  ]);

  // Master Global Policy State (Section 9, 10, 11)
  const [masterPolicy, setMasterPolicy] = useState({
    learnerConfirmationWeight: 30,
    supportingDocWeight: 35,
    institutionalRosterWeight: 17,
    providentFundCrossCheckWeight: 18,
    verificationThreshold: 75,
    reviewThreshold: 40,
    autoAuditFlagAboveRatio: 2.5,
  });

  // Officer Access Requests State
  const [officerRequests, setOfficerRequests] = useState<OfficerRequest[]>([
    {
      id: 'REQ-2026-901',
      name: 'Dr. Rajesh Verma, IAS',
      email: 'rajesh.verma@bihar.gov.in',
      department: 'Bihar Skill Development Mission (SSDM)',
      jurisdiction: 'Bihar State (All 38 Districts)',
      designation: 'Mission Director & Joint Secretary',
      requestedAt: '08 Mar 2026, 09:30 IST',
      status: 'Approved',
    },
    {
      id: 'REQ-2026-902',
      name: 'Smt. Ananya Sen, IAS',
      email: 'ananya.sen@msde.gov.in',
      department: 'Ministry of Skill Development (MSDE)',
      jurisdiction: 'National Northern Region Oversight',
      designation: 'Deputy Secretary (Apprenticeships)',
      requestedAt: '08 Mar 2026, 14:15 IST',
      status: 'Pending',
    },
    {
      id: 'REQ-2026-903',
      name: 'Vikramaditya Rao',
      email: 'v.rao@nashik.mah.gov.in',
      department: 'Maharashtra State Innovation Society',
      jurisdiction: 'Nashik Industrial Cluster',
      designation: 'District Executive Officer',
      requestedAt: '09 Mar 2026, 11:00 IST',
      status: 'Pending',
    },
  ]);

  // Handle Approve / Reject
  const handleUpdateRequestStatus = (id: string, newStatus: 'Approved' | 'Rejected') => {
    setOfficerRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
    showToast(`Request ${id} updated to ${newStatus}. Credentials propagated to officer inbox.`);
  };

  // Mock System Audit Logs
  const [auditLogs] = useState([
    { id: 'LOG-8841', actor: 'Amit Sharma (Root)', action: 'Propagated Master Evidence Policy (75/40 Thresholds)', timestamp: '09 Mar 2026, 16:45 IST', category: 'Policy' },
    { id: 'LOG-8840', actor: 'Dr. Rajesh Verma (Gov)', action: 'Reviewed Student Dossier SS-2026-849201 (Rahul Kumar)', timestamp: '09 Mar 2026, 16:12 IST', category: 'Privacy/Access' },
    { id: 'LOG-8839', actor: 'System Scheduler', action: 'Synced 1,420 6-Month Micro-Surveys with WhatsApp Bot Gateway', timestamp: '09 Mar 2026, 15:00 IST', category: 'Telemetry' },
    { id: 'LOG-8838', actor: 'System Engine', action: 'Flagged Bhagalpur ITI Skill Annex (Placement < 50% threshold)', timestamp: '09 Mar 2026, 13:20 IST', category: 'Quality' },
    { id: 'LOG-8837', actor: 'Amit Sharma (Root)', action: 'Verified DPDP Act 2023 Consent Integrity Hash (SHA-256)', timestamp: '09 Mar 2026, 11:10 IST', category: 'Security' },
  ]);

  // Search filter for requests
  const [searchQuery, setSearchQuery] = useState('');
  const filteredRequests = useMemo(() => {
    return officerRequests.filter(
      (r) =>
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.jurisdiction.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [officerRequests, searchQuery]);

  // Sign out handler
  const handleSignOut = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('skill_saarthi_admin_session');
    }
    router.push('/login/admin');
  };

  const adminTabDefinitions = [
    {
      id: 'overview' as AdminTabType,
      label: 'System Ops & Health',
      labels: { en: 'System Ops & Health', hi: 'सिस्टम स्वास्थ्य व संचालन', mr: 'सिस्टम आरोग्य व ऑपरेशन्स' },
      desc: { en: 'Telemetry services & cluster latency', hi: 'सिस्टम स्वास्थ्य व लेटेंसी', mr: 'सिस्टम आरोग्य व लेटन्सी' },
      icon: Activity,
      primaryDesktop: true,
      primaryMobile: true,
    },
    {
      id: 'users' as AdminTabType,
      label: 'User & Access (RBAC)',
      labels: { en: 'User & Access', hi: 'उपयोगकर्ता व अनुमति', mr: 'वापरकर्ते व प्रवेश' },
      desc: { en: 'RBAC officer roles & approval queue', hi: 'अधिकारी अनुमति व अनुमोदन', mr: 'अधिकारी परवानग्या व मान्यता' },
      icon: Users,
      primaryDesktop: true,
      primaryMobile: true,
    },
    {
      id: 'policy' as AdminTabType,
      label: 'Global Evidence Policy',
      labels: { en: 'Global Evidence Policy', hi: 'राष्ट्रीय साक्ष्य नीति', mr: 'राष्ट्रीय पुरावा धोरण' },
      desc: { en: 'Multi-source confidence weightings', hi: 'साक्ष्य नीति व वेटेज नियम', mr: 'पुरावा धोरण व नियम' },
      icon: Sliders,
      primaryDesktop: true,
      primaryMobile: true,
    },
    {
      id: 'security' as AdminTabType,
      label: 'DPDP & Privacy Ledger',
      labels: { en: 'DPDP & Privacy Ledger', hi: 'डीपीडीपी लेजर', mr: 'डीपीडीपी नोंदवही' },
      desc: { en: 'DPDP Act 2023 consent hashes & logs', hi: 'डीपीडीपी सहमति व ऑडिट लेजर', mr: 'डीपीडीपी संमती नोंदी' },
      icon: Shield,
      primaryDesktop: true,
      primaryMobile: false,
    },
    {
      id: 'ingestion' as AdminTabType,
      label: 'Data Pipelines & Ingestion',
      labels: { en: 'Data Ingestion', hi: 'डेटा इनजेशन व पाइपलाइन', mr: 'डेटा अंतर्ग्रहण' },
      desc: { en: 'API connectors & sync frequencies', hi: 'डेटा पाइपलाइन व सिंक', mr: 'डेटा पाइपलाइन व समन्वय' },
      icon: Database,
      primaryDesktop: false,
      primaryMobile: false,
    },
    {
      id: 'providers' as AdminTabType,
      label: 'Provider Registry Admin',
      labels: { en: 'Provider Registry', hi: 'प्रदाता मान्यता रजिस्ट्री', mr: 'संस्था नोंदणी' },
      desc: { en: 'Accredited training center registry', hi: 'संस्था मान्यता रजिस्ट्री', mr: 'संस्था मान्यता नोंदणी' },
      icon: Building,
      primaryDesktop: false,
      primaryMobile: false,
    },
    {
      id: 'audit' as AdminTabType,
      label: 'System Audit Logs',
      labels: { en: 'System Audit Logs', hi: 'सिस्टम ऑडिट लॉग्स', mr: 'सिस्टम ऑडिट नोंदी' },
      desc: { en: 'Immutable system event log trail', hi: 'सिस्टम ऑडिट व सुरक्षा लॉग्स', mr: 'सिस्टम ऑडिट नोंदी' },
      icon: FileSpreadsheet,
      primaryDesktop: false,
      primaryMobile: false,
    },
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-900'} flex flex-col justify-between selection:bg-rose-500 selection:text-white transition-colors duration-200`}>
      {/* 1. TOP OFFICIAL CENTRAL OPS HEADER */}
      <header className={`${theme === 'dark' ? 'bg-slate-950/90 border-slate-800' : 'bg-white border-gray-200'} border-b sticky top-0 z-40 backdrop-blur-md transition-colors duration-200`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-3">
          {/* Brand & Badge */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-rose-500 rounded-lg p-1"
          >
            <div className="w-9 h-9 bg-gradient-to-br from-rose-600 to-red-700 rounded-lg flex items-center justify-center shadow-lg shadow-rose-950/40 text-white font-bold text-base">
              <Shield size={18} />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'} text-base leading-none`}>
                  Skill Saarthi
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-rose-500/15 text-rose-500 dark:text-rose-300 px-2 py-0.5 rounded-full border border-rose-500/30">
                  <Lock size={12} />
                  Central Admin Console
                </span>
                <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-600 dark:text-amber-300 border border-amber-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  DEMO / SYNTHETIC DATA (Section 20 Protocol)
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                National Informatics Centre (NIC) • Technical Directorate for MSDE
              </p>
            </div>
          </Link>

          {/* Admin Identification & Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Selector */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-gray-200 dark:border-slate-700 text-xs font-semibold">
              <Globe size={14} className="text-rose-500 ml-1" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
                className="bg-transparent text-xs font-semibold cursor-pointer focus:outline-none pr-1 text-slate-800 dark:text-slate-100"
                aria-label="Language"
              >
                {languages.map((l) => (
                  <option key={l.code} value={l.code} className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100">
                    {l.native}
                  </option>
                ))}
              </select>
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors border border-gray-200 dark:border-slate-700"
              aria-label="Toggle theme"
              title={theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
            >
              {theme === 'dark' ? <Sun size={17} className="text-amber-400" /> : <Moon size={17} className="text-rose-600" />}
            </button>

            <div className="hidden md:flex flex-col text-right">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight">
                {adminProfile.name}
              </span>
              <span className="text-[10px] text-rose-500 dark:text-rose-400 truncate max-w-[200px]">
                {adminProfile.role}
              </span>
            </div>

            <button
              onClick={() => showToast('Platform cache purged. All telemetry queues synchronized.')}
              className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors focus:outline-none border border-gray-200 dark:border-slate-700"
              title="Purge Cache & Sync"
            >
              <RefreshCw size={16} />
            </button>

            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-red-500 px-2.5 py-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors border border-gray-200 dark:border-slate-700/60"
              title="Sign Out"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>

        {/* 2. NAVIGATION TABS BAR - RESPONSIVE DUAL-VIEW (100% PHONE FIT & SPACIOUS LAPTOP FIT) */}
        <div className={`${theme === 'dark' ? 'bg-slate-950 border-slate-800/80' : 'bg-white border-gray-200'} border-t relative z-30 transition-colors duration-200`}>
          <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8">
            
            {/* MOBILE VIEW (< 640px): 100% balanced 4-column grid fitting any smartphone display without horizontal scrolling */}
            <div className="grid grid-cols-4 gap-1 py-1.5 sm:hidden">
              {adminTabDefinitions
                .filter((t) => t.primaryMobile)
                .map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  const mobileLabel = 
                    tab.id === 'overview' ? (language === 'hi' ? 'सिस्टम' : language === 'mr' ? 'सिस्टम' : 'System Ops') :
                    tab.id === 'users' ? (language === 'hi' ? 'उपयोगकर्ता' : language === 'mr' ? 'वापरकर्ते' : 'Users') :
                    tab.id === 'policy' ? (language === 'hi' ? 'नीति' : language === 'mr' ? 'धोरण' : 'Policy') :
                    (tab.labels[language] || tab.label);

                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id as AdminTabType);
                        setIsMoreMenuOpen(false);
                      }}
                      className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl text-center transition-all ${
                        isActive
                          ? 'bg-rose-600 text-white shadow-xs font-bold'
                          : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                      }`}
                    >
                      <Icon size={16} className={isActive ? 'text-white' : 'text-slate-400'} />
                      <span className="text-[10px] leading-tight truncate w-full mt-1">
                        {mobileLabel}
                      </span>
                    </button>
                  );
                })}

              {/* Mobile "More" Button */}
              <button
                onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
                className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl text-center border transition-all ${
                  adminTabDefinitions.some((t) => t.id === activeTab && !t.primaryMobile)
                    ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-300 font-bold shadow-xs'
                    : 'border-gray-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300'
                }`}
                aria-label="More Options"
              >
                <MoreHorizontal size={16} className={adminTabDefinitions.some((t) => t.id === activeTab && !t.primaryMobile) ? 'text-rose-600 dark:text-rose-300' : 'text-slate-400'} />
                <span className="text-[10px] leading-tight truncate w-full mt-1 font-semibold flex items-center justify-center gap-0.5">
                  {language === 'hi' ? 'अधिक ▾' : language === 'mr' ? 'अधिक ▾' : 'More ▾'}
                </span>
              </button>
            </div>

            {/* LAPTOP / DESKTOP VIEW (>= 640px): Spacious full-feature navbar */}
            <div className="hidden sm:flex items-center justify-between gap-2 py-2">
              <div className="flex items-center gap-1.5 flex-1 overflow-x-auto scrollbar-none">
                {adminTabDefinitions
                  .filter((t) => t.primaryDesktop)
                  .map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    const currentLabel = tab.labels[language] || tab.label;

                    return (
                      <button
                        key={tab.id}
                        onClick={() => {
                          setActiveTab(tab.id as AdminTabType);
                          setIsMoreMenuOpen(false);
                        }}
                        className={`inline-flex items-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
                          isActive
                            ? 'bg-rose-600 text-white shadow-xs font-bold'
                            : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <Icon
                          size={14}
                          className={isActive ? 'text-white' : 'text-slate-400'}
                        />
                        <span className="whitespace-nowrap">{currentLabel}</span>
                      </button>
                    );
                  })}
              </div>

              {/* Desktop "More ▾" Button */}
              <div className="relative shrink-0" ref={moreMenuRef}>
                <button
                  onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
                  className={`inline-flex items-center gap-1.5 py-2 px-3 text-xs font-bold rounded-lg border transition-all ${
                    adminTabDefinitions.some((t) => t.id === activeTab && !t.primaryDesktop)
                      ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-300 shadow-xs'
                      : 'border-gray-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                  aria-label="More Options"
                  title="More Options"
                >
                  <MoreHorizontal size={14} />
                  <span className="whitespace-nowrap">
                    {language === 'hi' ? 'अधिक' : language === 'mr' ? 'अधिक' : 'More'}
                    {adminTabDefinitions.some((t) => t.id === activeTab && !t.primaryDesktop) && (
                      <span className="ml-1 text-rose-600 dark:text-rose-400 font-semibold truncate inline-block align-bottom">
                        : {adminTabDefinitions.find((t) => t.id === activeTab)?.labels[language] || adminTabDefinitions.find((t) => t.id === activeTab)?.label}
                      </span>
                    )}
                  </span>
                  <ChevronDown
                    size={13}
                    className={`transition-transform duration-200 ${isMoreMenuOpen ? 'rotate-180 text-rose-500 dark:text-rose-400' : 'text-slate-400'}`}
                  />
                </button>
              </div>
            </div>

            {/* SHARED FULLY RESPONSIVE DROPDOWN POPOVER (Fits Phone margins or Desktop Anchor) */}
            <AnimatePresence>
              {isMoreMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="fixed sm:absolute inset-x-3 sm:inset-x-auto sm:right-4 mt-2 sm:w-80 max-w-[calc(100vw-24px)] bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-2xl shadow-2xl z-50 p-2 space-y-1 overflow-hidden"
                >
                  <div className="px-3 py-2 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      {language === 'hi' ? 'केंद्रीय एडमिन कंसोल' : language === 'mr' ? 'केंद्रीय प्रशासकीय नियंत्रणे' : 'Central Admin Modules'}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                      {language === 'hi' ? 'सुरक्षा नियंत्रण' : language === 'mr' ? 'सुरक्षा नियंत्रणे' : 'Root Ops'}
                    </span>
                  </div>

                  <div className="max-h-80 overflow-y-auto space-y-1 p-1">
                    {adminTabDefinitions
                      .filter((t) => !t.primaryDesktop || !t.primaryMobile)
                      .map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        const label = tab.labels[language] || tab.label;
                        const desc = tab.desc[language] || tab.desc.en;

                        return (
                          <button
                            key={tab.id}
                            onClick={() => {
                              setActiveTab(tab.id as AdminTabType);
                              setIsMoreMenuOpen(false);
                            }}
                            className={`w-full flex items-start gap-3 p-2.5 rounded-xl text-left transition-all ${
                              isActive
                                ? 'bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800/80 text-rose-600 dark:text-rose-300'
                                : 'hover:bg-slate-50 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-300'
                            } ${tab.primaryDesktop ? 'sm:hidden' : ''}`}
                          >
                            <div
                              className={`p-2 rounded-lg shrink-0 ${
                                isActive
                                  ? 'bg-rose-600 text-white'
                                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                              }`}
                            >
                              <Icon size={16} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p className="text-xs font-bold leading-tight truncate">
                                  {label}
                                </p>
                                {isActive && (
                                  <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 flex items-center gap-0.5">
                                    <Check size={12} /> Active
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-slate-400 dark:text-slate-400 mt-0.5 line-clamp-1">
                                {desc}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>
      </header>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-4 right-4 z-50 bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-semibold animate-fade-in">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 3. MAIN CONTENT CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <AnimatePresence mode="wait">
          {/* ======================================================== */}
          {/* TAB 1: SYSTEM OPS & HEALTH */}
          {/* ======================================================== */}
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">
                    Central Platform Operations &amp; Engine Telemetry
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                    Real-time monitoring of Outcome Evidence Engine services, micro-survey throughput, and infrastructure queues.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    99.98% System Uptime (Production)
                  </span>
                </div>
              </div>

              {/* 6 Macro Platform KPI Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 text-xs">
                <div className="bg-slate-800/80 border border-slate-700/80 p-4 rounded-2xl space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Total Trainees</span>
                  <p className="text-2xl font-bold text-white">48,250</p>
                  <span className="text-[10px] text-emerald-400 font-semibold">Active in Pipeline</span>
                </div>

                <div className="bg-slate-800/80 border border-slate-700/80 p-4 rounded-2xl space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Verified Outcomes</span>
                  <p className="text-2xl font-bold text-emerald-400">32,100</p>
                  <span className="text-[10px] text-slate-400">&ge;75% Confidence</span>
                </div>

                <div className="bg-slate-800/80 border border-slate-700/80 p-4 rounded-2xl space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Active Officers</span>
                  <p className="text-2xl font-bold text-blue-400">142</p>
                  <span className="text-[10px] text-slate-400">National / State</span>
                </div>

                <div className="bg-slate-800/80 border border-slate-700/80 p-4 rounded-2xl space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Accredited Centers</span>
                  <p className="text-2xl font-bold text-amber-400">720</p>
                  <span className="text-[10px] text-slate-400">NSDC Audited</span>
                </div>

                <div className="bg-slate-800/80 border border-slate-700/80 p-4 rounded-2xl space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Engine Success</span>
                  <p className="text-2xl font-bold text-rose-400">99.4%</p>
                  <span className="text-[10px] text-slate-400">Triangulation Rate</span>
                </div>

                <div className="bg-slate-800/80 border border-slate-700/80 p-4 rounded-2xl space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Monthly Surveys</span>
                  <p className="text-2xl font-bold text-purple-400">4,820</p>
                  <span className="text-[10px] text-slate-400">Avg 28s Completion</span>
                </div>
              </div>

              {/* Service Health Grid */}
              <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-slate-700">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Server size={16} className="text-rose-400" />
                    Core Micro-Services &amp; Gateways
                  </h3>
                  <span className="text-[11px] text-slate-400">Live Healthcheck: All Passed</span>
                </div>

                <div className="divide-y divide-slate-700/60">
                  {services.map((svc) => (
                    <div key={svc.name} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm">{svc.name}</span>
                          <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                            {svc.status}
                          </span>
                        </div>
                        <p className="text-slate-400 text-[11px]">{svc.description}</p>
                      </div>

                      <div className="flex items-center gap-4 text-slate-400 text-[11px] font-mono self-start sm:self-auto">
                        <span>Latency: <strong className="text-slate-200">{svc.latency}</strong></span>
                        <span>Uptime: <strong className="text-emerald-400">{svc.uptime}</strong></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* System Infrastructure Telemetry Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700 space-y-2">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Postgres Telemetry Database</span>
                  <div className="flex justify-between font-mono">
                    <span className="text-slate-300">Connection Pool:</span>
                    <span className="text-emerald-400 font-bold">42 / 100 Active</span>
                  </div>
                  <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-400 h-full rounded-full" style={{ width: '42%' }} />
                  </div>
                </div>

                <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700 space-y-2">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Micro-Survey Ingress Queue</span>
                  <div className="flex justify-between font-mono">
                    <span className="text-slate-300">Webhook Queue:</span>
                    <span className="text-blue-400 font-bold">128 msgs/sec</span>
                  </div>
                  <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-blue-400 h-full rounded-full" style={{ width: '28%' }} />
                  </div>
                </div>

                <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700 space-y-2">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Cryptographic Hash Verifier</span>
                  <div className="flex justify-between font-mono">
                    <span className="text-slate-300">Integrity Status:</span>
                    <span className="text-rose-400 font-bold">Zero Tampering Detected</span>
                  </div>
                  <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-rose-400 h-full rounded-full" style={{ width: '100%' }} />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ======================================================== */}
          {/* TAB 2: USER & ACCESS MANAGEMENT (RBAC) */}
          {/* ======================================================== */}
          {activeTab === 'users' && (
            <motion.div
              key="users"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">
                    Officer &amp; Role-Based Access Control (RBAC)
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                    Review and authorize government officer access requests, provision audit roles, and revoke permissions.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => showToast('New Officer Account Provisioning dialog triggered.')}
                    className="bg-rose-600 hover:bg-rose-500 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-lg shadow-rose-950/40"
                  >
                    <Plus size={14} /> Provision New Officer
                  </button>
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search size={16} className="absolute left-3.5 top-3 text-slate-400 dark:text-slate-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter officers by name, department, or jurisdiction..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-800/80 border border-gray-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-rose-500 transition-colors"
                />
              </div>

              {/* Requests Table */}
              <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-900 border-b border-slate-700 text-slate-400 uppercase tracking-wider font-semibold text-[10px]">
                      <tr>
                        <th className="py-3.5 px-4">Officer Name &amp; Email</th>
                        <th className="py-3.5 px-4">Designation</th>
                        <th className="py-3.5 px-4">Department / Agency</th>
                        <th className="py-3.5 px-4">Jurisdiction Scope</th>
                        <th className="py-3.5 px-4">Requested At</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-4 text-right">Admin Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/60">
                      {filteredRequests.map((req) => (
                        <tr key={req.id} className="hover:bg-slate-700/30 transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-white">{req.name}</div>
                            <div className="text-[11px] text-slate-400 font-mono">{req.email}</div>
                          </td>
                          <td className="py-3.5 px-4 text-slate-300 font-semibold">{req.designation}</td>
                          <td className="py-3.5 px-4 text-slate-300">{req.department}</td>
                          <td className="py-3.5 px-4">
                            <span className="px-2 py-0.5 rounded bg-blue-500/15 text-blue-300 border border-blue-500/30 font-mono text-[10px]">
                              {req.jurisdiction}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-slate-400 text-[11px] font-mono">{req.requestedAt}</td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                                req.status === 'Approved'
                                  ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                                  : req.status === 'Pending'
                                  ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 animate-pulse'
                                  : 'bg-red-500/15 text-red-400 border-red-500/30'
                              }`}
                            >
                              {req.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right space-x-1.5">
                            {req.status === 'Pending' ? (
                              <>
                                <button
                                  onClick={() => handleUpdateRequestStatus(req.id, 'Approved')}
                                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-1 rounded-lg font-bold text-[11px] transition-colors"
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() => handleUpdateRequestStatus(req.id, 'Rejected')}
                                  className="bg-red-600/80 hover:bg-red-600 text-white px-2.5 py-1 rounded-lg font-bold text-[11px] transition-colors"
                                >
                                  Reject
                                </button>
                              </>
                            ) : (
                              <button
                                onClick={() =>
                                  handleUpdateRequestStatus(
                                    req.id,
                                    req.status === 'Approved' ? 'Rejected' : 'Approved'
                                  )
                                }
                                className="text-slate-400 hover:text-white px-2 py-1 rounded hover:bg-slate-700 text-[11px]"
                              >
                                Toggle
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* ======================================================== */}
          {/* TAB 3: GLOBAL EVIDENCE POLICY */}
          {/* ======================================================== */}
          {activeTab === 'policy' && (
            <motion.div
              key="policy"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">
                    Master Evidence Policy &amp; Algorithmic Calibration
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                    Central configuration of triangulation weights, verification bands, and automated audit triggers.
                  </p>
                </div>
                <button
                  onClick={() =>
                    showToast('Master policy changes broadcasted to all national and state engines.')
                  }
                  className="bg-rose-600 hover:bg-rose-500 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-lg shadow-rose-950/40"
                >
                  Broadcast Policy Updates
                </button>
              </div>

              {/* Sliders & Weight Tuner */}
              <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 space-y-6">
                <div className="flex justify-between items-center pb-3 border-b border-slate-700">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Sliders size={16} className="text-rose-400" />
                    Master Triangulation Weight Calibration
                  </h3>
                  <span className="text-[11px] font-mono text-emerald-400">
                    Total: {masterPolicy.learnerConfirmationWeight + masterPolicy.supportingDocWeight + masterPolicy.institutionalRosterWeight + masterPolicy.providentFundCrossCheckWeight}% (Normalized)
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                  <div className="space-y-2 p-4 bg-slate-900/60 rounded-xl border border-slate-700/60">
                    <div className="flex justify-between font-semibold">
                      <span>1. Learner Micro-Survey Attestation Weight</span>
                      <span className="text-amber-400 font-mono font-bold">{masterPolicy.learnerConfirmationWeight}%</span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={60}
                      value={masterPolicy.learnerConfirmationWeight}
                      onChange={(e) => setMasterPolicy({ ...masterPolicy, learnerConfirmationWeight: Number(e.target.value) })}
                      className="w-full accent-amber-400"
                    />
                    <p className="text-[11px] text-slate-400">Weight assigned to learner 4-tap confirmation via WhatsApp.</p>
                  </div>

                  <div className="space-y-2 p-4 bg-slate-900/60 rounded-xl border border-slate-700/60">
                    <div className="flex justify-between font-semibold">
                      <span>2. Documentary Proof (Salary Slip / Offer Letter)</span>
                      <span className="text-blue-400 font-mono font-bold">{masterPolicy.supportingDocWeight}%</span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={60}
                      value={masterPolicy.supportingDocWeight}
                      onChange={(e) => setMasterPolicy({ ...masterPolicy, supportingDocWeight: Number(e.target.value) })}
                      className="w-full accent-blue-400"
                    />
                    <p className="text-[11px] text-slate-400">Weight assigned to DigiLocker / PDF payslip upload.</p>
                  </div>

                  <div className="space-y-2 p-4 bg-slate-900/60 rounded-xl border border-slate-700/60">
                    <div className="flex justify-between font-semibold">
                      <span>3. Training Center / Institutional Roster Match</span>
                      <span className="text-purple-400 font-mono font-bold">{masterPolicy.institutionalRosterWeight}%</span>
                    </div>
                    <input
                      type="range"
                      min={5}
                      max={30}
                      value={masterPolicy.institutionalRosterWeight}
                      onChange={(e) => setMasterPolicy({ ...masterPolicy, institutionalRosterWeight: Number(e.target.value) })}
                      className="w-full accent-purple-400"
                    />
                    <p className="text-[11px] text-slate-400">Center placement log cross-check verification.</p>
                  </div>

                  <div className="space-y-2 p-4 bg-slate-900/60 rounded-xl border border-slate-700/60">
                    <div className="flex justify-between font-semibold">
                      <span>4. Consistency Audit / Secondary Database Check</span>
                      <span className="text-emerald-400 font-mono font-bold">{masterPolicy.providentFundCrossCheckWeight}%</span>
                    </div>
                    <input
                      type="range"
                      min={5}
                      max={30}
                      value={masterPolicy.providentFundCrossCheckWeight}
                      onChange={(e) => setMasterPolicy({ ...masterPolicy, providentFundCrossCheckWeight: Number(e.target.value) })}
                      className="w-full accent-emerald-400"
                    />
                    <p className="text-[11px] text-slate-400">Secondary checks for wage outlier consistency.</p>
                  </div>
                </div>

                {/* Section 10 Master Thresholds */}
                <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700 space-y-3">
                  <h4 className="font-bold text-xs text-white uppercase tracking-wider">
                    Section 10 Decision Thresholds
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block text-slate-400 mb-1">Verified Outcome Minimum (Default: 75%)</label>
                      <input
                        type="number"
                        min={60}
                        max={95}
                        value={masterPolicy.verificationThreshold}
                        onChange={(e) => setMasterPolicy({ ...masterPolicy, verificationThreshold: Number(e.target.value) })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white font-mono font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Needs Review Floor (Default: 40%)</label>
                      <input
                        type="number"
                        min={25}
                        max={70}
                        value={masterPolicy.reviewThreshold}
                        onChange={(e) => setMasterPolicy({ ...masterPolicy, reviewThreshold: Number(e.target.value) })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white font-mono font-bold"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ======================================================== */}
          {/* TAB 4: DATA PIPELINES & INGESTION */}
          {/* ======================================================== */}
          {activeTab === 'ingestion' && (
            <motion.div
              key="ingestion"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">
                    Data Ingestion &amp; Cohort Pipelines
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                    Batch upload skilling records from state missions (PMKVY 4.0, DDU-GKY, SSDM) into the Outcome Intelligence Layer.
                  </p>
                </div>
                <button
                  onClick={() => showToast('Generated 500 synthetic learner records under Section 20 Protocol.')}
                  className="bg-amber-600 hover:bg-amber-500 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-lg shadow-amber-950/40"
                >
                  <Sparkles size={14} /> Generate Section 20 Synthetic Cohort
                </button>
              </div>

              {/* Ingestion Upload Card */}
              <div className="p-8 border-2 border-dashed border-slate-700 rounded-3xl bg-slate-800/40 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-rose-500/15 text-rose-400 flex items-center justify-center mx-auto">
                  <Database size={24} />
                </div>
                <h3 className="text-base font-bold text-white">Upload State Skilling Cohort (CSV / JSON)</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Drag and drop student certification records from State Skill Development Missions or National Skill Portals.
                </p>
                <div className="pt-2 flex justify-center gap-3">
                  <button
                    onClick={() => showToast('Sample PMKVY 4.0 batch ingested. 1,000 records loaded.')}
                    className="bg-rose-600 hover:bg-rose-500 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md"
                  >
                    Select Batch File
                  </button>
                  <button
                    onClick={() => showToast('Template downloaded: skill_saarthi_schema_v2.csv')}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 px-4 py-2 rounded-xl text-xs font-bold transition-all"
                  >
                    <Download size={13} className="inline mr-1" /> Download Schema Template
                  </button>
                </div>
              </div>

              {/* Ingestion Status History */}
              <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Recent Ingestion Batches
                </h3>
                <div className="divide-y divide-slate-700/60 text-xs">
                  {[
                    { name: 'Bihar SSDM Full Stack Batch Q1 2025', count: '4,200 records', status: 'Ingested & Verified', time: '08 Mar 2026' },
                    { name: 'Maharashtra Nashik Auto Cluster Cohort', count: '2,850 records', status: 'Ingested & Verified', time: '05 Mar 2026' },
                    { name: 'PMKVY 4.0 Northern Tier-2 ITI Batch', count: '6,100 records', status: 'Ingested & Verified', time: '01 Mar 2026' },
                  ].map((batch) => (
                    <div key={batch.name} className="py-3 flex justify-between items-center">
                      <div>
                        <span className="font-bold text-white block">{batch.name}</span>
                        <span className="text-[11px] text-slate-400">{batch.count} • {batch.time}</span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                        {batch.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ======================================================== */}
          {/* TAB 5: DPDP ACT 2023 & PRIVACY LEDGER */}
          {/* ======================================================== */}
          {activeTab === 'security' && (
            <motion.div
              key="security"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  DPDP Act 2023 Compliance &amp; Consent Ledger
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                  Audit logs of all student data consent grants, access telemetry, and SHA-256 cryptographic hashes.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Active Consents</span>
                  <p className="text-2xl font-bold text-emerald-400">42,750</p>
                  <p className="text-[11px] text-slate-400">Aadhaar OTP / WhatsApp verified</p>
                </div>

                <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Revocations</span>
                  <p className="text-2xl font-bold text-slate-200">0</p>
                  <p className="text-[11px] text-emerald-400">Zero active dispute requests</p>
                </div>

                <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Officer Access Logs</span>
                  <p className="text-2xl font-bold text-blue-400">1,842</p>
                  <p className="text-[11px] text-slate-400">100% auditable event trail</p>
                </div>
              </div>

              <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Officer Dossier Access Audit Trail
                </h3>
                <div className="divide-y divide-slate-700/60 text-xs">
                  <div className="py-3 flex justify-between items-center">
                    <div>
                      <span className="font-bold text-white">Dr. Rajesh Verma (Joint Secretary)</span>
                      <p className="text-[11px] text-slate-400">Accessed dossier for Rahul Kumar (SS-2026-849201) • Desk Review</p>
                    </div>
                    <span className="font-mono text-[10px] text-slate-400">09 Mar 2026, 16:12 IST</span>
                  </div>

                  <div className="py-3 flex justify-between items-center">
                    <div>
                      <span className="font-bold text-white">Smt. Ananya Sen (MSDE Inspector)</span>
                      <p className="text-[11px] text-slate-400">Audited center report for Bhagalpur ITI • Flag Inspection</p>
                    </div>
                    <span className="font-mono text-[10px] text-slate-400">09 Mar 2026, 14:05 IST</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ======================================================== */}
          {/* TAB 6: PROVIDER REGISTRY ADMIN */}
          {/* ======================================================== */}
          {activeTab === 'providers' && (
            <motion.div
              key="providers"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">
                    Training Provider Registry &amp; Accreditation Admin
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                    Manage accredited NSDC and SSDM centers, impose milestone grant freezes, and flag under-performing centers.
                  </p>
                </div>
              </div>

              <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 border-b border-slate-700 text-slate-400 uppercase tracking-wider font-semibold text-[10px]">
                    <tr>
                      <th className="py-3.5 px-4">Center / Provider Name</th>
                      <th className="py-3.5 px-4">District</th>
                      <th className="py-3.5 px-4">Placement %</th>
                      <th className="py-3.5 px-4">6M Retention</th>
                      <th className="py-3.5 px-4">Funding Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/60">
                    <tr className="hover:bg-slate-700/30">
                      <td className="py-3.5 px-4 font-bold text-white">Muzaffarpur Center of Excellence (NSDC)</td>
                      <td className="py-3.5 px-4 text-slate-300">Muzaffarpur, Bihar</td>
                      <td className="py-3.5 px-4 text-emerald-400 font-bold">84%</td>
                      <td className="py-3.5 px-4 text-emerald-400 font-bold">71.2%</td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                          100% Disbursed
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => showToast('Muzaffarpur CoE audited. Quality rating renewed as A+.')}
                          className="text-slate-400 hover:text-white text-[11px]"
                        >
                          Audit Details
                        </button>
                      </td>
                    </tr>

                    <tr className="hover:bg-slate-700/30">
                      <td className="py-3.5 px-4 font-bold text-white">Bhagalpur ITI Skill Annex</td>
                      <td className="py-3.5 px-4 text-slate-300">Bhagalpur, Bihar</td>
                      <td className="py-3.5 px-4 text-amber-400 font-bold">86.2% Day-1</td>
                      <td className="py-3.5 px-4 text-rose-400 font-bold">38.1% (High Drop)</td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded bg-rose-500/15 text-rose-400 border border-rose-500/30 text-[10px] font-bold animate-pulse">
                          Milestone Frozen (Pillar 9)
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-2">
                        <button
                          onClick={() => showToast('Disbursement hold confirmed for Bhagalpur ITI pending syllabus revision.')}
                          className="bg-rose-600 hover:bg-rose-500 text-white px-2.5 py-1 rounded text-[11px] font-bold"
                        >
                          Freeze Grants
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* ======================================================== */}
          {/* TAB 7: SYSTEM AUDIT LOGS */}
          {/* ======================================================== */}
          {activeTab === 'audit' && (
            <motion.div
              key="audit"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">
                    Immutable System Audit Logs
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                    Central event stream recording every administrative policy change, access grant, and system warning.
                  </p>
                </div>
                <button
                  onClick={() => showToast('Exported audit_log_2026.csv to administrator local drive.')}
                  className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
                >
                  <Download size={14} /> Export Audit Log (CSV)
                </button>
              </div>

              <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl overflow-hidden">
                <div className="divide-y divide-slate-700/60 text-xs">
                  {auditLogs.map((log) => (
                    <div key={log.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-700/30 transition-colors">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] font-bold text-rose-400 bg-rose-500/15 px-2 py-0.5 rounded border border-rose-500/30">
                            {log.id}
                          </span>
                          <span className="font-bold text-white">{log.actor}</span>
                          <span className="text-[10px] text-slate-400">({log.category})</span>
                        </div>
                        <p className="text-slate-300 text-xs">{log.action}</p>
                      </div>
                      <span className="text-[11px] font-mono text-slate-400 whitespace-nowrap self-start sm:self-auto">
                        {log.timestamp}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* 4. FOOTER */}
      <footer className="border-t border-slate-800 py-3.5 text-center text-xs text-slate-500 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>
            © {new Date().getFullYear()} Skill Saarthi • Ministry of Skill Development &amp; Entrepreneurship, Government of India
          </p>
          <div className="flex items-center gap-4 text-xs">
            <span className="text-rose-400 font-semibold font-mono">Central Ops Level 1 Active</span>
            <span>•</span>
            <Link href="/" className="hover:text-white hover:underline">
              Landing Page
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
