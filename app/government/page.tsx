'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Building2,
  Users,
  Briefcase,
  TrendingUp,
  BarChart3,
  Award,
  AlertCircle,
  Brain,
  ShieldCheck,
  Search,
  Filter,
  Download,
  FileText,
  Clock,
  LogOut,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Eye,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Building,
  MapPin,
  Calendar,
  DollarSign,
  Landmark,
  Bell,
  Settings,
  Layers,
  ArrowRight,
  Shield,
  ThumbsUp,
  Check,
  X,
} from 'lucide-react';

type GovTabType =
  | 'dashboard'
  | 'students'
  | 'programs'
  | 'providers'
  | 'skill-gaps'
  | 'employment'
  | 'wage-career'
  | 'follow-up'
  | 'impact'
  | 'reports'
  | 'alerts'
  | 'ai-insights';

interface StudentRecord {
  id: string;
  name: string;
  district: string;
  program: string;
  provider: string;
  status: 'Employed' | 'Apprenticeship' | 'Unemployed' | 'Self-Employed';
  salary: number;
  followUpStatus: '3-Month Done' | '6-Month Active' | '12-Month Due' | 'Completed';
  completionDate: string;
  skills: string[];
}

export default function GovernmentOfficerPortalPage() {
  const router = useRouter();

  // Active Tab
  const [activeTab, setActiveTab] = useState<GovTabType>('dashboard');

  // Modals & Drawers
  const [selectedStudent, setSelectedStudent] = useState<StudentRecord | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
  const [showNotificationsDrawer, setShowNotificationsDrawer] = useState<boolean>(false);
  const [showOfficerSettingsModal, setShowOfficerSettingsModal] = useState<boolean>(false);
  const [reportToast, setReportToast] = useState<string>('');

  // Officer Profile
  const [officerProfile, setOfficerProfile] = useState({
    name: 'Dr. Rajesh Verma, IAS',
    designation: 'Joint Secretary & Mission Director',
    department: 'Ministry of Skill Development & Entrepreneurship (MSDE)',
    jurisdiction: 'National & Bihar State Oversight',
    officerId: 'GOI-MSDE-9482',
    email: 'gov@skillsaarthi.gov.in',
  });

  // Hydrate Officer details if available
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('skill_saarthi_officer_user');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setOfficerProfile((prev) => ({
            ...prev,
            name: parsed.fullName || prev.name,
            designation: parsed.designation || prev.designation,
            department: parsed.department || prev.department,
            officerId: parsed.refId || prev.officerId,
            email: parsed.email || prev.email,
          }));
        } catch {
          // ignore
        }
      }
    }
  }, []);

  // Mock Student Registry Database
  const [studentsList] = useState<StudentRecord[]>([
    {
      id: 'SS-2026-849201',
      name: 'Rahul Kumar',
      district: 'Muzaffarpur',
      program: 'Full Stack Web & Cloud Development',
      provider: 'Muzaffarpur Center of Excellence (NSDC)',
      status: 'Employed',
      salary: 28000,
      followUpStatus: '6-Month Active',
      completionDate: '10 Jan 2025',
      skills: ['React.js', 'Python', 'PostgreSQL', 'Tailwind CSS', 'Git'],
    },
    {
      id: 'SS-2026-712903',
      name: 'Priya Sharma',
      district: 'Patna',
      program: 'Data Analytics & Business Intelligence',
      provider: 'Patna Skill Hub (SSDM)',
      status: 'Employed',
      salary: 32000,
      followUpStatus: '3-Month Done',
      completionDate: '15 Feb 2025',
      skills: ['Python', 'SQL', 'Power BI', 'Excel Advanced'],
    },
    {
      id: 'SS-2026-641029',
      name: 'Amit Patel',
      district: 'Gaya',
      program: 'Solar & Renewable Energy Technician',
      provider: 'Gaya Renewable Skilling Institute',
      status: 'Employed',
      salary: 19500,
      followUpStatus: '3-Month Done',
      completionDate: '20 Nov 2024',
      skills: ['PV Installation', 'Grid Inverters', 'Electrical Safety'],
    },
    {
      id: 'SS-2026-519284',
      name: 'Sneha Das',
      district: 'Muzaffarpur',
      program: 'Digital Marketing & E-Commerce Executive',
      provider: 'Muzaffarpur Center of Excellence (NSDC)',
      status: 'Self-Employed',
      salary: 24000,
      followUpStatus: '6-Month Active',
      completionDate: '05 Jan 2025',
      skills: ['SEO', 'Meta Ads', 'Content Strategy', 'Google Analytics'],
    },
    {
      id: 'SS-2026-482019',
      name: 'Vikram Singh',
      district: 'Bhagalpur',
      program: 'Full Stack Web & Cloud Development',
      provider: 'Bhagalpur ITI Skill Annex',
      status: 'Unemployed',
      salary: 0,
      followUpStatus: '6-Month Active',
      completionDate: '12 Jan 2025',
      skills: ['HTML/CSS', 'Basic JavaScript', 'WordPress'],
    },
    {
      id: 'SS-2026-391827',
      name: 'Ananya Roy',
      district: 'Patna',
      program: 'Healthcare & General Duty Assistant',
      provider: 'Patna MedSkill Academy',
      status: 'Employed',
      salary: 18500,
      followUpStatus: '12-Month Due',
      completionDate: '10 Aug 2024',
      skills: ['Patient Vitals', 'Emergency Response', 'Medical Records'],
    },
    {
      id: 'SS-2026-281940',
      name: 'Mohammad Farhan',
      district: 'Darbhanga',
      program: 'Full Stack Web & Cloud Development',
      provider: 'Mithila Technical Institute',
      status: 'Apprenticeship',
      salary: 14000,
      followUpStatus: '3-Month Done',
      completionDate: '28 Feb 2025',
      skills: ['Node.js', 'React.js', 'MongoDB'],
    },
  ]);

  // Student Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [districtFilter, setDistrictFilter] = useState('All');
  const [programFilter, setProgramFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredStudents = useMemo(() => {
    return studentsList.filter((s) => {
      const matchesSearch =
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.district.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDistrict = districtFilter === 'All' || s.district === districtFilter;
      const matchesProgram = programFilter === 'All' || s.program.toLowerCase().includes(programFilter.toLowerCase());
      const matchesStatus = statusFilter === 'All' || s.status === statusFilter;
      return matchesSearch && matchesDistrict && matchesProgram && matchesStatus;
    });
  }, [studentsList, searchQuery, districtFilter, programFilter, statusFilter]);

  // Trigger Report Download Toast
  const triggerReportDownload = (reportName: string, format: string) => {
    setReportToast(`Generating & downloading ${reportName} (${format.toUpperCase()})...`);
    setTimeout(() => {
      setReportToast('');
    }, 3000);
  };

  // Sign out handler
  const handleSignOut = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('skill_saarthi_officer_session');
    }
    router.push('/login/government');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between text-text-dark selection:bg-saffron selection:text-white">
      {/* 1. TOP OFFICIAL GOVERNMENT OFFICER NAVBAR */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between">
          {/* Brand Identity */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-saffron rounded-lg p-1"
          >
            <div className="w-9 h-9 bg-gradient-to-br from-saffron to-orange-600 rounded-lg flex items-center justify-center shadow-md text-white font-bold text-base">
              S
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-primary-navy text-base leading-none">
                  Skill Saarthi
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-orange-50 text-saffron px-2 py-0.5 rounded-full border border-orange-200">
                  <Building2 size={12} />
                  Government Officer Portal
                </span>
              </div>
              <p className="text-[10px] text-text-muted mt-0.5">
                Ministry of Skill Development &amp; Entrepreneurship, GoI
              </p>
            </div>
          </Link>

          {/* Top Quick Actions & Officer Chip */}
          <div className="flex items-center gap-3">
            {/* Notifications Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotificationsDrawer(!showNotificationsDrawer)}
                className="p-2 text-text-muted hover:text-saffron hover:bg-orange-50 rounded-lg relative transition-colors focus:outline-none"
                aria-label="Alerts"
              >
                <Bell size={18} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-saffron rounded-full animate-pulse" />
              </button>

              {/* Notifications Popover */}
              {showNotificationsDrawer && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-xl z-50 p-4 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                    <span className="font-bold text-xs text-primary-navy uppercase tracking-wider">
                      Policy Flags &amp; Alerts (3)
                    </span>
                    <button
                      onClick={() => setShowNotificationsDrawer(false)}
                      className="text-xs text-text-muted hover:text-text-dark"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div
                      onClick={() => {
                        setActiveTab('alerts');
                        setShowNotificationsDrawer(false);
                      }}
                      className="p-2.5 bg-red-50 border border-red-200 rounded-lg cursor-pointer hover:bg-red-100 transition-colors"
                    >
                      <p className="font-bold text-red-700 flex items-center gap-1">
                        <AlertCircle size={13} />
                        Low Placement Flag
                      </p>
                      <p className="text-text-muted mt-0.5">
                        Bhagalpur ITI Skill Annex reported 42% placement in Q1. Audit required.
                      </p>
                    </div>
                    <div
                      onClick={() => {
                        setActiveTab('skill-gaps');
                        setShowNotificationsDrawer(false);
                      }}
                      className="p-2.5 bg-orange-50 border border-orange-200 rounded-lg cursor-pointer hover:bg-orange-100 transition-colors"
                    >
                      <p className="font-bold text-saffron flex items-center gap-1">
                        <Brain size={13} />
                        Surge in Digital Gaps
                      </p>
                      <p className="text-text-muted mt-0.5">
                        2,450 students in Muzaffarpur missing Docker / Cloud competencies.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Officer Identification Chip */}
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-xs font-bold text-text-dark leading-tight">{officerProfile.name}</span>
              <span className="text-[10px] text-text-muted truncate max-w-[200px]">
                {officerProfile.designation}
              </span>
            </div>

            {/* Officer Settings Modal Trigger */}
            <button
              onClick={() => setShowOfficerSettingsModal(true)}
              className="p-2 text-text-muted hover:text-saffron hover:bg-orange-50 rounded-lg transition-colors focus:outline-none"
              title="Officer Profile & Settings"
            >
              <Settings size={18} />
            </button>

            {/* Sign Out Button */}
            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-1 text-xs font-semibold text-text-muted hover:text-red-600 px-2.5 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
              title="Sign Out"
            >
              <LogOut size={15} />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>


        {/* 3. NAVIGATION TABS BAR */}
        <div className="bg-white border-b border-gray-200 overflow-x-auto scrollbar-none">
          <div className="max-w-7xl mx-auto px-4 flex gap-1 sm:gap-2 min-w-max">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
              { id: 'students', label: 'Student Management', icon: Users },
              { id: 'programs', label: 'Training Programs', icon: Award },
              { id: 'providers', label: 'Training Providers', icon: Building },
              { id: 'skill-gaps', label: 'Skill Gap Analytics', icon: Brain },
              { id: 'employment', label: 'Employment Analytics', icon: Briefcase },
              { id: 'wage-career', label: 'Wage & Career', icon: TrendingUp },
              { id: 'follow-up', label: 'Follow-Up Monitoring', icon: Clock },
              { id: 'impact', label: 'Impact & ROI', icon: Landmark },
              { id: 'reports', label: 'Reports & Export', icon: FileText },
              { id: 'alerts', label: 'Policy Flags', icon: AlertCircle },
              { id: 'ai-insights', label: 'AI Macro Insights', icon: Sparkles },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as GovTabType)}
                  className={`flex items-center gap-1.5 py-3 px-3.5 text-xs font-semibold border-b-2 transition-all ${
                    isActive
                      ? 'border-saffron text-saffron font-bold bg-orange-50/40'
                      : 'border-transparent text-text-muted hover:text-text-dark hover:border-gray-300'
                  }`}
                >
                  <Icon
                    size={15}
                    className={isActive ? 'text-saffron' : 'text-text-muted'}
                  />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Global Toast for Reports */}
      {reportToast && (
        <div className="fixed bottom-4 right-4 z-50 bg-primary-navy text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 text-xs font-semibold animate-fade-in">
          <CheckCircle2 size={16} className="text-success-green" />
          <span>{reportToast}</span>
        </div>
      )}

      {/* 4. MAIN CONTENT TABS CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <AnimatePresence mode="wait">
          {/* ======================================================== */}
          {/* VIEW 1: EXECUTIVE DASHBOARD */}
          {/* ======================================================== */}
          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {/* Executive Welcome & Jurisdiction Header */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl sm:text-3xl font-bold text-primary-navy">
                      National Skilling Telemetry Dashboard
                    </h1>
                    <span className="bg-orange-100 text-saffron border border-orange-200 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <ShieldCheck size={12} /> MSDE Active
                    </span>
                  </div>
                  <p className="text-text-muted text-sm mt-1">
                    Logged in as <span className="font-semibold text-text-dark">{officerProfile.name}</span> •{' '}
                    {officerProfile.department} • Overseeing 48,250+ Registered Learners across 38 Districts
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => triggerReportDownload('National_Skilling_Overview', 'pdf')}
                    className="inline-flex items-center gap-2 bg-saffron text-white px-4 py-2.5 rounded-lg text-xs font-semibold hover:bg-orange-600 transition-all shadow-sm"
                  >
                    <Download size={14} />
                    Export Executive Summary (PDF)
                  </button>
                </div>
              </div>

              {/* 6 Core Outcome Snapshot KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
                  <div className="flex items-center justify-between text-text-muted mb-1.5">
                    <span className="text-xs font-medium uppercase tracking-wider">Total Enrolled</span>
                    <Users size={16} className="text-primary-navy" />
                  </div>
                  <p className="text-xl font-bold text-primary-navy">48,250</p>
                  <p className="text-[11px] text-text-muted mt-0.5">Across 700+ Centers</p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
                  <div className="flex items-center justify-between text-text-muted mb-1.5">
                    <span className="text-xs font-medium uppercase tracking-wider">Trained / Certified</span>
                    <Award size={16} className="text-primary-blue" />
                  </div>
                  <p className="text-xl font-bold text-primary-blue">42,800</p>
                  <p className="text-[11px] text-success-green font-semibold mt-0.5">88.7% Completion Rate</p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
                  <div className="flex items-center justify-between text-text-muted mb-1.5">
                    <span className="text-xs font-medium uppercase tracking-wider">Placed / Employed</span>
                    <Briefcase size={16} className="text-success-green" />
                  </div>
                  <p className="text-xl font-bold text-success-green">32,100</p>
                  <p className="text-[11px] text-success-green font-semibold mt-0.5">75.0% Placement Rate</p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
                  <div className="flex items-center justify-between text-text-muted mb-1.5">
                    <span className="text-xs font-medium uppercase tracking-wider">Average Wage</span>
                    <TrendingUp size={16} className="text-saffron" />
                  </div>
                  <p className="text-xl font-bold text-saffron">₹21,400 <span className="text-xs font-normal">/mo</span></p>
                  <p className="text-[11px] text-success-green font-semibold mt-0.5">+78% Longitudinal Growth</p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-orange-200 shadow-xs bg-gradient-to-br from-orange-50/50 to-white">
                  <div className="flex items-center justify-between text-text-muted mb-1.5">
                    <span className="text-xs font-bold text-saffron uppercase tracking-wider">Follow-Ups Due</span>
                    <Clock size={16} className="text-saffron" />
                  </div>
                  <p className="text-xl font-bold text-saffron">1,420</p>
                  <p className="text-[11px] text-amber-700 font-semibold mt-0.5">88% Response Rate</p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
                  <div className="flex items-center justify-between text-text-muted mb-1.5">
                    <span className="text-xs font-medium uppercase tracking-wider">Annual Net ROI</span>
                    <Landmark size={16} className="text-purple-600" />
                  </div>
                  <p className="text-xl font-bold text-purple-700">₹18.4 Cr</p>
                  <p className="text-[11px] text-purple-600 font-semibold mt-0.5">6.6x Budget Return</p>
                </div>
              </div>

              {/* Conversion Funnel & District Heatbar */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* 7 Cols: Employment Conversion Funnel */}
                <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <div>
                      <h3 className="font-bold text-sm text-primary-navy uppercase tracking-wider">
                        Longitudinal Skilling Funnel
                      </h3>
                      <p className="text-xs text-text-muted">Conversion from Enrolled → Certified → Placed → Retained</p>
                    </div>
                    <span className="text-xs font-bold text-success-green bg-green-50 px-2.5 py-1 rounded-full border border-green-200">
                      84% 6-Month Retention
                    </span>
                  </div>

                  <div className="space-y-3 pt-2 text-xs">
                    <div>
                      <div className="flex justify-between font-semibold mb-1">
                        <span>1. Total Enrolled Learners</span>
                        <span className="font-bold text-primary-navy">48,250 (100%)</span>
                      </div>
                      <div className="h-4 bg-gray-100 rounded-lg overflow-hidden">
                        <div className="h-full bg-primary-navy rounded-lg w-full" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between font-semibold mb-1">
                        <span>2. Successfully Certified Trainees</span>
                        <span className="font-bold text-primary-blue">42,800 (88.7%)</span>
                      </div>
                      <div className="h-4 bg-gray-100 rounded-lg overflow-hidden">
                        <div className="h-full bg-primary-blue rounded-lg w-[88.7%]" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between font-semibold mb-1">
                        <span>3. Placed into Employment / Apprenticeship</span>
                        <span className="font-bold text-success-green">32,100 (75.0%)</span>
                      </div>
                      <div className="h-4 bg-gray-100 rounded-lg overflow-hidden">
                        <div className="h-full bg-success-green rounded-lg w-[75%]" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between font-semibold mb-1">
                        <span>4. Long-Term 6-Month Retained in Jobs</span>
                        <span className="font-bold text-saffron">27,000 (63.1% of Enrolled)</span>
                      </div>
                      <div className="h-4 bg-gray-100 rounded-lg overflow-hidden">
                        <div className="h-full bg-saffron rounded-lg w-[63.1%]" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 5 Cols: District-wise Performance Leaderboard */}
                <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <h3 className="font-bold text-sm text-primary-navy uppercase tracking-wider">
                      District Placement Leaderboard
                    </h3>
                    <button
                      onClick={() => setActiveTab('students')}
                      className="text-xs text-saffron font-bold hover:underline"
                    >
                      View All →
                    </button>
                  </div>

                  <div className="space-y-3 text-xs">
                    {[
                      { district: 'Patna', placement: '82%', avgSalary: '₹24,500', color: 'bg-success-green' },
                      { district: 'Muzaffarpur', placement: '76%', avgSalary: '₹21,000', color: 'bg-primary-blue' },
                      { district: 'Gaya', placement: '71%', avgSalary: '₹18,500', color: 'bg-primary-blue' },
                      { district: 'Bhagalpur', placement: '68%', avgSalary: '₹17,800', color: 'bg-amber-500' },
                      { district: 'Darbhanga', placement: '65%', avgSalary: '₹16,900', color: 'bg-amber-500' },
                    ].map((item) => (
                      <div key={item.district} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <MapPin size={14} className="text-text-muted" />
                          <span className="font-bold text-text-dark">{item.district}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-text-muted">Avg: {item.avgSalary}</span>
                          <span className="font-bold text-primary-navy w-10 text-right">{item.placement}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ======================================================== */}
          {/* VIEW 2: STUDENT MANAGEMENT */}
          {/* ======================================================== */}
          {activeTab === 'students' && (
            <motion.div
              key="students"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <h2 className="text-2xl font-bold text-primary-navy">Student Outcome Registry</h2>
                  <p className="text-xs sm:text-sm text-text-muted mt-0.5">
                    Individual learner telemetry, longitudinal wage records, and follow-up survey histories.
                  </p>
                </div>
                <button
                  onClick={() => triggerReportDownload('Complete_Learners_Registry', 'excel')}
                  className="inline-flex items-center gap-2 bg-saffron text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-orange-600 transition-all shadow-xs"
                >
                  <Download size={14} /> Export Student Data (Excel)
                </button>
              </div>

              {/* Search & Multi-Filter Bar */}
              <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                  {/* Search Bar */}
                  <div className="relative sm:col-span-1">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search by Name or Student ID..."
                      className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-saffron"
                    />
                    <Search size={15} className="absolute left-3 top-2.5 text-text-muted" />
                  </div>

                  {/* Filter by District */}
                  <div>
                    <select
                      value={districtFilter}
                      onChange={(e) => setDistrictFilter(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-saffron"
                    >
                      <option value="All">All Districts</option>
                      <option value="Muzaffarpur">Muzaffarpur</option>
                      <option value="Patna">Patna</option>
                      <option value="Gaya">Gaya</option>
                      <option value="Bhagalpur">Bhagalpur</option>
                      <option value="Darbhanga">Darbhanga</option>
                    </select>
                  </div>

                  {/* Filter by Program */}
                  <div>
                    <select
                      value={programFilter}
                      onChange={(e) => setProgramFilter(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-saffron"
                    >
                      <option value="All">All Programs</option>
                      <option value="Full Stack">Full Stack Web &amp; Cloud</option>
                      <option value="Data Analytics">Data Analytics</option>
                      <option value="Solar">Solar Technician</option>
                      <option value="Healthcare">Healthcare Assistant</option>
                      <option value="Digital Marketing">Digital Marketing</option>
                    </select>
                  </div>

                  {/* Filter by Employment Status */}
                  <div>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-saffron"
                    >
                      <option value="All">All Statuses</option>
                      <option value="Employed">Employed</option>
                      <option value="Unemployed">Unemployed</option>
                      <option value="Apprenticeship">Apprenticeship</option>
                      <option value="Self-Employed">Self-Employed</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Student Table */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-gray-50 border-b border-gray-200 text-text-muted uppercase tracking-wider font-semibold">
                      <tr>
                        <th className="py-3 px-4">Student ID &amp; Name</th>
                        <th className="py-3 px-4">District</th>
                        <th className="py-3 px-4">Training Program</th>
                        <th className="py-3 px-4">Employment Status</th>
                        <th className="py-3 px-4">Current Wage</th>
                        <th className="py-3 px-4">Follow-Up State</th>
                        <th className="py-3 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredStudents.map((s) => (
                        <tr key={s.id} className="hover:bg-orange-50/30 transition-colors">
                          <td className="py-3 px-4">
                            <span className="font-bold text-text-dark block">{s.name}</span>
                            <span className="text-[10px] text-text-muted font-mono">{s.id}</span>
                          </td>
                          <td className="py-3 px-4 font-medium text-text-dark">{s.district}</td>
                          <td className="py-3 px-4 text-text-muted truncate max-w-[200px]">{s.program}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                                s.status === 'Employed'
                                  ? 'bg-green-50 text-success-green border border-green-200'
                                  : s.status === 'Apprenticeship'
                                  ? 'bg-blue-50 text-primary-blue border border-blue-200'
                                  : s.status === 'Self-Employed'
                                  ? 'bg-purple-50 text-purple-700 border border-purple-200'
                                  : 'bg-red-50 text-red-700 border border-red-200'
                              }`}
                            >
                              {s.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-bold text-primary-navy">
                            {s.salary > 0 ? `₹${s.salary.toLocaleString('en-IN')}/mo` : '—'}
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-[11px] text-text-muted">{s.followUpStatus}</span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => setSelectedStudent(s)}
                              className="bg-orange-50 text-saffron hover:bg-saffron hover:text-white px-3 py-1 rounded-lg font-bold transition-all"
                            >
                              View Dossier →
                            </button>
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
          {/* VIEW 3: TRAINING PROGRAMS */}
          {/* ======================================================== */}
          {activeTab === 'programs' && (
            <motion.div
              key="programs"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-primary-navy">Government Skilling Programs</h2>
                  <p className="text-xs sm:text-sm text-text-muted mt-0.5">
                    Monitoring curriculum completion rates, placement performance, and wage returns by program.
                  </p>
                </div>
                <button
                  onClick={() => triggerReportDownload('Programs_Performance_Audit', 'pdf')}
                  className="bg-saffron text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-orange-600 transition-colors shadow-xs"
                >
                  <Download size={14} className="inline mr-1" /> Export Program Audit (PDF)
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: 'PMKVY 4.0 - Full Stack Web & Cloud Development',
                    code: 'SSC/Q0501 (NSQF Level 5)',
                    enrolled: 14200,
                    completionRate: 91,
                    placementRate: 82,
                    avgWage: '₹26,500',
                    activeCenters: 48,
                    status: 'High Performer',
                  },
                  {
                    title: 'National Data Analytics & Python Program',
                    code: 'SSC/Q2102 (NSQF Level 5)',
                    enrolled: 9800,
                    completionRate: 88,
                    placementRate: 78,
                    avgWage: '₹28,200',
                    activeCenters: 32,
                    status: 'High Performer',
                  },
                  {
                    title: 'Solar & Renewable Energy Technician',
                    code: 'SGJ/Q0101 (NSQF Level 4)',
                    enrolled: 11400,
                    completionRate: 89,
                    placementRate: 74,
                    avgWage: '₹19,500',
                    activeCenters: 42,
                    status: 'Stable',
                  },
                  {
                    title: 'Healthcare & General Duty Assistant',
                    code: 'HSS/Q5101 (NSQF Level 4)',
                    enrolled: 7600,
                    completionRate: 94,
                    placementRate: 71,
                    avgWage: '₹18,000',
                    activeCenters: 28,
                    status: 'Stable',
                  },
                  {
                    title: 'Digital Marketing & E-Commerce Executive',
                    code: 'MEP/Q0701 (NSQF Level 4)',
                    enrolled: 5250,
                    completionRate: 82,
                    placementRate: 69,
                    avgWage: '₹22,000',
                    activeCenters: 24,
                    status: 'Review Recommended',
                  },
                ].map((p) => (
                  <div
                    key={p.code}
                    className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-4 hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] bg-blue-50 text-primary-navy border border-blue-200 font-bold px-2 py-0.5 rounded-full">
                          {p.code}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            p.status === 'High Performer'
                              ? 'bg-green-50 text-success-green'
                              : p.status === 'Stable'
                              ? 'bg-blue-50 text-primary-blue'
                              : 'bg-amber-50 text-amber-800'
                          }`}
                        >
                          {p.status}
                        </span>
                      </div>

                      <h4 className="font-bold text-sm text-primary-navy leading-snug">{p.title}</h4>

                      <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-gray-100">
                        <div>
                          <span className="text-text-muted block text-[10px]">Enrolled:</span>
                          <span className="font-bold text-text-dark">{p.enrolled.toLocaleString('en-IN')}</span>
                        </div>
                        <div>
                          <span className="text-text-muted block text-[10px]">Average Wage:</span>
                          <span className="font-bold text-saffron">{p.avgWage}</span>
                        </div>
                        <div>
                          <span className="text-text-muted block text-[10px]">Completion:</span>
                          <span className="font-bold text-success-green">{p.completionRate}%</span>
                        </div>
                        <div>
                          <span className="text-text-muted block text-[10px]">Placement:</span>
                          <span className="font-bold text-primary-navy">{p.placementRate}%</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedProgram(p.title)}
                      className="w-full bg-gray-50 hover:bg-orange-50 text-text-dark hover:text-saffron py-2 rounded-lg text-xs font-bold border border-gray-200 transition-colors"
                    >
                      View Center Breakdown →
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ======================================================== */}
          {/* VIEW 4: TRAINING PROVIDERS */}
          {/* ======================================================== */}
          {activeTab === 'providers' && (
            <motion.div
              key="providers"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-primary-navy">Training Provider Quality Audits</h2>
                  <p className="text-xs sm:text-sm text-text-muted mt-0.5">
                    Center-level outcome auditing, student ratings, and placement verification under NSDC standards.
                  </p>
                </div>
                <button
                  onClick={() => triggerReportDownload('Provider_Audit_Matrix', 'excel')}
                  className="bg-saffron text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-orange-600 transition-colors shadow-xs"
                >
                  <Download size={14} className="inline mr-1" /> Export Provider Audits (Excel)
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-gray-50 border-b border-gray-200 text-text-muted uppercase tracking-wider font-semibold">
                      <tr>
                        <th className="py-3 px-4">Provider / Center Name</th>
                        <th className="py-3 px-4">District</th>
                        <th className="py-3 px-4">Students Trained</th>
                        <th className="py-3 px-4">Completion %</th>
                        <th className="py-3 px-4">Placement %</th>
                        <th className="py-3 px-4">Average Wage</th>
                        <th className="py-3 px-4">Quality Audit Rating</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {[
                        {
                          name: 'Muzaffarpur Center of Excellence (NSDC)',
                          district: 'Muzaffarpur',
                          trained: 4200,
                          completion: '92%',
                          placement: '84%',
                          wage: '₹24,500',
                          rating: 'A+ (Top Performer)',
                          ratingColor: 'text-success-green bg-green-50 border-green-200',
                        },
                        {
                          name: 'Patna Skill Hub (SSDM)',
                          district: 'Patna',
                          trained: 6800,
                          completion: '90%',
                          placement: '82%',
                          wage: '₹26,000',
                          rating: 'A+ (Top Performer)',
                          ratingColor: 'text-success-green bg-green-50 border-green-200',
                        },
                        {
                          name: 'Gaya Renewable Skilling Institute',
                          district: 'Gaya',
                          trained: 3100,
                          completion: '89%',
                          placement: '74%',
                          wage: '₹19,500',
                          rating: 'A (Good Standing)',
                          ratingColor: 'text-primary-blue bg-blue-50 border-blue-200',
                        },
                        {
                          name: 'Patna MedSkill Academy',
                          district: 'Patna',
                          trained: 2900,
                          completion: '95%',
                          placement: '72%',
                          wage: '₹18,500',
                          rating: 'A (Good Standing)',
                          ratingColor: 'text-primary-blue bg-blue-50 border-blue-200',
                        },
                        {
                          name: 'Bhagalpur ITI Skill Annex',
                          district: 'Bhagalpur',
                          trained: 1850,
                          completion: '71%',
                          placement: '48%',
                          wage: '₹14,200',
                          rating: 'Flagged (&lt;50% Placement)',
                          ratingColor: 'text-red-700 bg-red-50 border-red-200 animate-pulse',
                        },
                      ].map((prov) => (
                        <tr key={prov.name} className="hover:bg-gray-50">
                          <td className="py-3.5 px-4 font-bold text-text-dark">{prov.name}</td>
                          <td className="py-3.5 px-4 text-text-muted">{prov.district}</td>
                          <td className="py-3.5 px-4 font-semibold">{prov.trained.toLocaleString('en-IN')}</td>
                          <td className="py-3.5 px-4 font-bold text-success-green">{prov.completion}</td>
                          <td className="py-3.5 px-4 font-bold text-primary-navy">{prov.placement}</td>
                          <td className="py-3.5 px-4 font-bold text-saffron">{prov.wage}</td>
                          <td className="py-3.5 px-4">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${prov.ratingColor}`}>
                              {prov.rating}
                            </span>
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
          {/* VIEW 5: SKILL GAP ANALYTICS (SIH CORE) */}
          {/* ======================================================== */}
          {activeTab === 'skill-gaps' && (
            <motion.div
              key="skill-gaps"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-saffron bg-orange-50 px-2.5 py-0.5 rounded-full mb-1">
                    <Brain size={13} /> SIH Core Analytical Asset
                  </div>
                  <h2 className="text-2xl font-bold text-primary-navy">Macro Skill Gap Intelligence</h2>
                  <p className="text-xs sm:text-sm text-text-muted mt-0.5">
                    Detecting critical disparities between syllabus competencies and real employer hiring standards.
                  </p>
                </div>
                <button
                  onClick={() => triggerReportDownload('National_Skill_Gap_Matrix', 'csv')}
                  className="bg-saffron text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-orange-600 transition-colors shadow-xs"
                >
                  <Download size={14} className="inline mr-1" /> Export Skill Gap Matrix (CSV)
                </button>
              </div>

              {/* Top Highlight Stat Card Mentioned in PRD */}
              <div className="p-6 bg-gradient-to-r from-orange-500 to-amber-600 rounded-2xl text-white shadow-md grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-orange-200">
                    Highest Deficit Competency
                  </span>
                  <h3 className="text-2xl font-bold mt-1">Docker &amp; Cloud Systems</h3>
                  <p className="text-xs text-orange-100 mt-1">Found in 68% of Full Stack IT batches</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-orange-200">
                    Total Affected Students
                  </span>
                  <h3 className="text-2xl font-bold mt-1">2,450 Learners</h3>
                  <p className="text-xs text-orange-100 mt-1">Requiring immediate bridge courses</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-orange-200">
                    Most Impacted District
                  </span>
                  <h3 className="text-2xl font-bold mt-1">Muzaffarpur, Bihar</h3>
                  <p className="text-xs text-orange-100 mt-1">Followed by Bhagalpur &amp; Gaya</p>
                </div>
              </div>

              {/* District-wise Skill Gap Matrix Table */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
                <h3 className="font-bold text-sm text-primary-navy uppercase tracking-wider">
                  District-Wise Skill Gap Density
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 bg-orange-50/50 rounded-xl border border-orange-200 space-y-2">
                    <span className="font-bold text-saffron text-sm">Muzaffarpur District</span>
                    <p className="text-text-muted">Top Gap: Containerization &amp; DevOps</p>
                    <div className="flex justify-between font-semibold pt-1 border-t border-orange-200">
                      <span>Affected: 2,450 learners</span>
                      <span className="text-red-600 font-bold">Severity: High</span>
                    </div>
                  </div>

                  <div className="p-4 bg-orange-50/50 rounded-xl border border-orange-200 space-y-2">
                    <span className="font-bold text-saffron text-sm">Patna District</span>
                    <p className="text-text-muted">Top Gap: Cloud Microservices &amp; CI/CD</p>
                    <div className="flex justify-between font-semibold pt-1 border-orange-200 border-t">
                      <span>Affected: 1,820 learners</span>
                      <span className="text-amber-700 font-bold">Severity: Medium</span>
                    </div>
                  </div>

                  <div className="p-4 bg-orange-50/50 rounded-xl border border-orange-200 space-y-2">
                    <span className="font-bold text-saffron text-sm">Gaya District</span>
                    <p className="text-text-muted">Top Gap: Grid Inverter Diagnostics</p>
                    <div className="flex justify-between font-semibold pt-1 border-orange-200 border-t">
                      <span>Affected: 1,210 learners</span>
                      <span className="text-red-600 font-bold">Severity: High</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ======================================================== */}
          {/* VIEW 6: EMPLOYMENT ANALYTICS */}
          {/* ======================================================== */}
          {activeTab === 'employment' && (
            <motion.div
              key="employment"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold text-primary-navy">Employment Outcomes &amp; Retention</h2>
                <p className="text-xs sm:text-sm text-text-muted mt-0.5">
                  Longitudinal placement conversion and workplace retention telemetry.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
                  <span className="text-text-muted uppercase text-[10px] font-bold">Formal Employment</span>
                  <p className="text-2xl font-bold text-success-green mt-1">68.0%</p>
                  <p className="text-text-muted mt-0.5">29,100 Learners</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
                  <span className="text-text-muted uppercase text-[10px] font-bold">Apprenticeship</span>
                  <p className="text-2xl font-bold text-primary-blue mt-1">10.0%</p>
                  <p className="text-text-muted mt-0.5">4,280 Learners</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
                  <span className="text-text-muted uppercase text-[10px] font-bold">Self-Employed</span>
                  <p className="text-2xl font-bold text-purple-700 mt-1">8.0%</p>
                  <p className="text-text-muted mt-0.5">3,420 Learners</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
                  <span className="text-text-muted uppercase text-[10px] font-bold">Seeking Job / Unemployed</span>
                  <p className="text-2xl font-bold text-red-600 mt-1">14.0%</p>
                  <p className="text-text-muted mt-0.5">5,980 Learners</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                <h3 className="font-bold text-sm text-primary-navy uppercase tracking-wider">
                  Post-Training Retention Rate (Months 3 to 24)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                    <span className="text-text-muted block">3-Month Retention:</span>
                    <span className="text-2xl font-bold text-success-green">91.4%</span>
                    <p className="text-[11px] text-text-muted mt-1">Minimal immediate dropouts</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                    <span className="text-text-muted block">6-Month Retention:</span>
                    <span className="text-2xl font-bold text-success-green">84.2%</span>
                    <p className="text-[11px] text-text-muted mt-1">Stable employment baseline</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <span className="text-text-muted block">12-Month Retention:</span>
                    <span className="text-2xl font-bold text-primary-blue">76.8%</span>
                    <p className="text-[11px] text-text-muted mt-1">Includes role transitions</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ======================================================== */}
          {/* VIEW 7: WAGE & CAREER ANALYTICS */}
          {/* ======================================================== */}
          {activeTab === 'wage-career' && (
            <motion.div
              key="wage-career"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold text-primary-navy">Longitudinal Wage Growth Analytics</h2>
                <p className="text-xs sm:text-sm text-text-muted mt-0.5">
                  Proving return on public funds: how trainee earnings escalate over time.
                </p>
              </div>

              {/* Wage Progression Curve Mentioned in PRD */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                  <div>
                    <span className="text-xs text-text-muted">PRD Milestone Telemetry:</span>
                    <h3 className="text-xl font-bold text-primary-navy mt-0.5">
                      ₹12,000 → ₹16,500 → ₹21,000
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-success-green bg-green-50 px-3 py-1 rounded-full border border-green-200">
                    +75% Wage Increment across 18 Months
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center text-xs">
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <span className="text-text-muted block text-[11px]">Starting Apprenticeship Wage</span>
                    <span className="text-xl font-bold text-text-dark">₹12,000 / mo</span>
                    <span className="text-[10px] text-text-muted block mt-1">Month 0 Baseline</span>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <span className="text-text-muted block text-[11px]">3-Month Post-Placement Wage</span>
                    <span className="text-xl font-bold text-primary-blue">₹16,500 / mo</span>
                    <span className="text-[10px] text-success-green font-bold block mt-1">+37.5% Increment</span>
                  </div>

                  <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                    <span className="text-text-muted block text-[11px]">Current Average Wage (12-Mo)</span>
                    <span className="text-xl font-bold text-success-green">₹21,000 / mo</span>
                    <span className="text-[10px] text-success-green font-bold block mt-1">+75.0% Increment</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ======================================================== */}
          {/* VIEW 8: FOLLOW-UP MONITORING */}
          {/* ======================================================== */}
          {activeTab === 'follow-up' && (
            <motion.div
              key="follow-up"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold text-primary-navy">Longitudinal Follow-Up Audit System</h2>
                <p className="text-xs sm:text-sm text-text-muted mt-0.5">
                  Automated checks at 3, 6, 12, and 24 months tracking what students actually do post-training.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
                  <span className="font-bold text-text-dark block">3-Month Follow-Ups</span>
                  <p className="text-xl font-bold text-success-green mt-1">94% Response</p>
                  <p className="text-text-muted mt-0.5">4,820 / 5,120 Verified</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-orange-200 shadow-xs bg-orange-50/40">
                  <span className="font-bold text-saffron block">6-Month Follow-Ups (Active)</span>
                  <p className="text-xl font-bold text-saffron mt-1">88% Response</p>
                  <p className="text-text-muted mt-0.5">1,420 Surveys Pending</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
                  <span className="font-bold text-text-dark block">12-Month Follow-Ups</span>
                  <p className="text-xl font-bold text-primary-blue mt-1">79% Response</p>
                  <p className="text-text-muted mt-0.5">2,810 Verified</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
                  <span className="font-bold text-text-dark block">24-Month Follow-Ups</span>
                  <p className="text-xl font-bold text-purple-700 mt-1">68% Response</p>
                  <p className="text-text-muted mt-0.5">Long-Term Career Anchor</p>
                </div>
              </div>

              {/* Attrition & Non-Placement Root Causes */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                <h3 className="font-bold text-sm text-primary-navy uppercase tracking-wider">
                  Reported Reasons for Non-Placement / Attrition
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
                  <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200">
                    <span className="font-bold text-text-dark block">Wage Expectations (42%)</span>
                    <p className="text-text-muted mt-1">Offered stipend or starting pay perceived as too low.</p>
                  </div>
                  <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200">
                    <span className="font-bold text-text-dark block">Relocation Issues (28%)</span>
                    <p className="text-text-muted mt-1">Jobs located outside district without lodging aid.</p>
                  </div>
                  <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200">
                    <span className="font-bold text-text-dark block">Higher Education (18%)</span>
                    <p className="text-text-muted mt-1">Trainee enrolled in degree / master&apos;s studies.</p>
                  </div>
                  <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200">
                    <span className="font-bold text-text-dark block">Skill Disparity (12%)</span>
                    <p className="text-text-muted mt-1">Candidate failed technical employer interviews.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ======================================================== */}
          {/* VIEW 9: IMPACT & ROI */}
          {/* ======================================================== */}
          {activeTab === 'impact' && (
            <motion.div
              key="impact"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold text-primary-navy">Public Investment Return &amp; Impact</h2>
                <p className="text-xs sm:text-sm text-text-muted mt-0.5">
                  Macroeconomic evaluation of public skilling outlays against new wages earned.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm text-center space-y-2">
                  <span className="text-xs text-text-muted font-bold uppercase">Government Budget Allocated</span>
                  <h3 className="text-3xl font-bold text-primary-navy">₹12.5 Cr</h3>
                  <p className="text-xs text-text-muted">Total Scheme Subsidies</p>
                </div>
                <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm text-center space-y-2">
                  <span className="text-xs text-text-muted font-bold uppercase">Annual Net Wages Generated</span>
                  <h3 className="text-3xl font-bold text-success-green">₹82.4 Cr</h3>
                  <p className="text-xs text-text-muted">Direct Economic Velocity</p>
                </div>
                <div className="p-6 bg-white rounded-2xl border border-green-200 shadow-sm text-center space-y-2 bg-green-50/30">
                  <span className="text-xs text-success-green font-bold uppercase">Public Return Multiple</span>
                  <h3 className="text-3xl font-bold text-success-green">6.6x ROI</h3>
                  <p className="text-xs text-text-muted">Net Societal Return Ratio</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* ======================================================== */}
          {/* VIEW 10: REPORTS & EXPORT */}
          {/* ======================================================== */}
          {activeTab === 'reports' && (
            <motion.div
              key="reports"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold text-primary-navy">Reports &amp; Data Export Center</h2>
                <p className="text-xs sm:text-sm text-text-muted mt-0.5">
                  Download official MSDE / NSDC compliance dossiers in PDF, Excel, and CSV formats.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: 'Complete Student Cohort Registry', format: 'Excel (.xlsx)', icon: FileText },
                  { name: 'Training Provider Quality Audit Report', format: 'PDF (.pdf)', icon: Award },
                  { name: 'District-Wise Skill Gap Matrix', format: 'CSV (.csv)', icon: Brain },
                  { name: 'Longitudinal Wage Progression Dossier', format: 'PDF (.pdf)', icon: TrendingUp },
                  { name: 'Follow-Up Attrition & Retention Report', format: 'Excel (.xlsx)', icon: Clock },
                  { name: 'Annual Scheme Return on Investment (ROI)', format: 'PDF (.pdf)', icon: Landmark },
                ].map((rep) => (
                  <div key={rep.name} className="p-4 bg-white rounded-2xl border border-gray-200 shadow-xs flex flex-col justify-between space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 bg-orange-50 text-saffron rounded-lg flex-shrink-0">
                        <rep.icon size={18} />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-text-dark">{rep.name}</h4>
                        <span className="text-[10px] text-text-muted">{rep.format}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => triggerReportDownload(rep.name, rep.format)}
                      className="w-full bg-gray-50 hover:bg-saffron hover:text-white text-text-dark py-2 rounded-lg text-xs font-bold border border-gray-200 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Download size={13} />
                      Download Report
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ======================================================== */}
          {/* VIEW 11: ALERTS & FLAGS */}
          {/* ======================================================== */}
          {activeTab === 'alerts' && (
            <motion.div
              key="alerts"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <div>
                <h2 className="text-2xl font-bold text-primary-navy">Policy Alerts &amp; Quality Flags</h2>
                <p className="text-xs sm:text-sm text-text-muted mt-0.5">
                  Automated notifications highlighting systemic risks, center audits, and follow-up drops.
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-4 bg-red-50 rounded-2xl border border-red-200 flex items-start gap-3">
                  <AlertCircle size={20} className="text-red-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-red-900 text-sm">Under-Performing Provider Flag: Bhagalpur ITI</h4>
                    <p className="text-red-800 mt-0.5 leading-relaxed">
                      Placement rate dropped to 48% (below the 50% NCVET mandate). Center inspection scheduled.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-orange-50 rounded-2xl border border-orange-200 flex items-start gap-3">
                  <Clock size={20} className="text-saffron flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-orange-900 text-sm">Follow-Up Delay in Gaya District</h4>
                    <p className="text-orange-800 mt-0.5 leading-relaxed">
                      12-Month response rate in Gaya dipped below 72%. Nodal officers alerted to conduct telephonic re-engagement.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-green-50 rounded-2xl border border-green-200 flex items-start gap-3">
                  <Sparkles size={20} className="text-success-green flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-green-900 text-sm">Surge in Clean Energy Placements: Patna</h4>
                    <p className="text-green-800 mt-0.5 leading-relaxed">
                      Solar Technician cohort achieved 82% placement in under 30 days due to regional rooftop solar mandate.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ======================================================== */}
          {/* VIEW 12: AI MACRO INSIGHTS */}
          {/* ======================================================== */}
          {activeTab === 'ai-insights' && (
            <motion.div
              key="ai-insights"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-saffron bg-orange-50 px-2.5 py-0.5 rounded-full mb-1">
                  <Sparkles size={13} /> AI Macro Telemetry Engine
                </div>
                <h2 className="text-2xl font-bold text-primary-navy">AI Policy Insights &amp; Recommendations</h2>
                <p className="text-xs sm:text-sm text-text-muted mt-0.5">
                  Synthesizing longitudinal outcome data to recommend resource allocation and curriculum improvements.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-6 bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-blue-200 shadow-sm space-y-3">
                  <div className="flex items-center gap-2 text-primary-navy font-bold text-sm">
                    <Sparkles size={16} className="text-saffron" />
                    <span>AI Key Outcome Discovery:</span>
                  </div>
                  <p className="text-sm font-semibold text-text-dark leading-relaxed">
                    &ldquo;Students completing Full Stack courses with Cloud Modules command a 23% higher employment rate
                    and 38% higher starting wage than pure web cohorts.&rdquo;
                  </p>
                  <div className="pt-2 border-t border-blue-100 text-xs text-text-muted">
                    <span className="font-bold text-primary-navy block mb-1">Recommended Policy Intervention:</span>
                    Mandate 40 hours of practical Docker and Cloud training across all Tier-2 ITI curriculum batches starting Q3.
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-br from-orange-50 to-white rounded-2xl border border-orange-200 shadow-sm space-y-3">
                  <div className="flex items-center gap-2 text-saffron font-bold text-sm">
                    <Sparkles size={16} className="text-saffron" />
                    <span>AI Budget Reallocation Recommendation:</span>
                  </div>
                  <p className="text-sm font-semibold text-text-dark leading-relaxed">
                    &ldquo;Reallocate ₹1.8 Cr funding from low-demand general trades to Cloud, Data Analytics, and Solar
                    Technician hubs in Northern Bihar districts.&rdquo;
                  </p>
                  <div className="pt-2 border-t border-orange-100 text-xs text-text-muted">
                    <span className="font-bold text-saffron block mb-1">Projected Outcome:</span>
                    Estimated +840 incremental placements within 12 months with higher average retention.
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* ======================================================== */}
      {/* MODAL 1: STUDENT DOSSIER DRILLDOWN */}
      {/* ======================================================== */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl border border-gray-200 max-h-[90vh] overflow-y-auto text-xs"
          >
            <div className="flex justify-between items-start pb-3 border-b border-gray-100">
              <div>
                <span className="text-[10px] font-bold text-saffron uppercase font-mono">{selectedStudent.id}</span>
                <h3 className="text-lg font-bold text-primary-navy">{selectedStudent.name}</h3>
                <p className="text-text-muted">{selectedStudent.district} • {selectedStudent.program}</p>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="text-text-muted hover:text-text-dark font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-xl space-y-1">
                <span className="font-bold text-primary-navy block">Training &amp; Center:</span>
                <p className="text-text-muted">{selectedStudent.provider}</p>
                <p className="text-[11px] text-text-muted">Completed: {selectedStudent.completionDate}</p>
              </div>

              <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 space-y-1">
                <span className="font-bold text-primary-navy block">Verified Competencies:</span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {selectedStudent.skills.map((sk) => (
                    <span key={sk} className="bg-white px-2.5 py-0.5 rounded-full border border-blue-200 text-primary-navy font-semibold text-[10px]">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-green-50/50 rounded-xl border border-green-100 space-y-1">
                <span className="font-bold text-success-green block">Employment Telemetry:</span>
                <p className="text-text-dark font-semibold">Status: {selectedStudent.status}</p>
                <p className="text-text-muted">
                  Current Wage: {selectedStudent.salary > 0 ? `₹${selectedStudent.salary.toLocaleString('en-IN')}/month` : 'Seeking'}
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedStudent(null)}
                className="bg-primary-navy text-white px-4 py-2 rounded-lg font-bold"
              >
                Close Dossier
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 2: PROGRAM DRILLDOWN */}
      {/* ======================================================== */}
      {selectedProgram && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl border border-gray-200 text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <h3 className="text-sm font-bold text-primary-navy">Program Performance Breakdown</h3>
              <button onClick={() => setSelectedProgram(null)} className="text-text-muted hover:text-text-dark">✕</button>
            </div>
            <div className="space-y-2">
              <p className="font-bold text-text-dark">{selectedProgram}</p>
              <p className="text-text-muted">Audit inspection verified for all accredited NSDC and SSDM centers in Bihar.</p>
              <div className="p-3 bg-gray-50 rounded-xl text-text-muted space-y-1">
                <div className="flex justify-between"><span>Curriculum Standard:</span><span className="font-bold text-text-dark">NCVET Level 5</span></div>
                <div className="flex justify-between"><span>Placement Compliance:</span><span className="font-bold text-success-green">Meets 70% Target</span></div>
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <button onClick={() => setSelectedProgram(null)} className="bg-saffron text-white px-4 py-2 rounded-lg font-bold">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 3: OFFICER SETTINGS */}
      {/* ======================================================== */}
      {showOfficerSettingsModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl border border-gray-200 text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <h3 className="text-sm font-bold text-primary-navy">Officer Profile &amp; Governance Scope</h3>
              <button onClick={() => setShowOfficerSettingsModal(false)} className="text-text-muted hover:text-text-dark">✕</button>
            </div>
            <div className="space-y-3">
              <div>
                <span className="text-text-muted block">Officer Name:</span>
                <span className="font-bold text-text-dark text-sm">{officerProfile.name}</span>
              </div>
              <div>
                <span className="text-text-muted block">Designation:</span>
                <span className="font-semibold text-text-dark">{officerProfile.designation}</span>
              </div>
              <div>
                <span className="text-text-muted block">Department:</span>
                <span className="font-semibold text-text-dark">{officerProfile.department}</span>
              </div>
              <div>
                <span className="text-text-muted block">Official Jurisdiction:</span>
                <span className="font-semibold text-text-dark">{officerProfile.jurisdiction}</span>
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <button onClick={() => setShowOfficerSettingsModal(false)} className="bg-saffron text-white px-4 py-2 rounded-lg font-bold">
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. FOOTER */}
      <footer className="py-4 border-t border-gray-200 bg-white text-center text-xs text-text-muted">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>
            © {new Date().getFullYear()} Skill Saarthi • Ministry of Skill Development &amp; Entrepreneurship, Government of India
          </p>
          <div className="flex items-center gap-4 text-xs">
            <span className="text-saffron font-semibold">National Outcome Telemetry System Active</span>
            <span>•</span>
            <Link href="/" className="hover:text-primary-navy hover:underline">
              Landing Page
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
