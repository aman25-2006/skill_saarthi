'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
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
  Download,
  FileText,
  Clock,
  LogOut,
  Sparkles,
  Eye,
  CheckCircle2,
  Building,
  MapPin,
  Landmark,
  Bell,
  Settings,
  Layers,
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

interface EvidenceTrailItem {
  type: string;
  source: string;
  weight: string;
  status: 'verified' | 'pending' | 'review' | 'conflict';
}

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
  evidenceStatus: 'Verified Outcome' | 'Needs Review' | 'Unverified Outcome' | 'Follow-up Pending' | 'Conflicted';
  confidenceScore: number; // 0 - 100%
  sustainableIndex: number; // 0 - 100
  jobRelevance: 'Direct' | 'Partial' | 'None';
  evidenceTrail: EvidenceTrailItem[];
}

export default function GovernmentOfficerPortalPage() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, languages } = useLanguage();

  // Active Tab
  const [activeTab, setActiveTab] = useState<GovTabType>('dashboard');

  // Modals & Drawers
  const [selectedStudent, setSelectedStudent] = useState<StudentRecord | null>(null);
  const [selectedEvidenceStudent, setSelectedEvidenceStudent] = useState<StudentRecord | null>(null);
  const [showConfigPolicyModal, setShowConfigPolicyModal] = useState<boolean>(false);
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
  const [showNotificationsDrawer, setShowNotificationsDrawer] = useState<boolean>(false);
  const [showOfficerSettingsModal, setShowOfficerSettingsModal] = useState<boolean>(false);
  const [reportToast, setReportToast] = useState<string>('');

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

  // Configurable Evidence Policy State (Pillar 4)
  const [evidencePolicy, setEvidencePolicy] = useState({
    learnerConfirmationWeight: 30,
    supportingDocWeight: 35,
    institutionalRosterWeight: 17,
    providentFundCrossCheckWeight: 18,
    verificationThreshold: 75, // Scores >= 75% are "Verified Outcome"
    reviewThreshold: 40,       // Scores 40-74% are "Needs Review" (<40% Unverified)
  });

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

  // Mock Student Registry Database with 5-State Taxonomy (Pillar 1, 5, 6)
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
      evidenceStatus: 'Verified Outcome',
      confidenceScore: 88,
      sustainableIndex: 92,
      jobRelevance: 'Direct',
      evidenceTrail: [
        { type: 'Learner 3M/6M Attestation', source: 'WhatsApp Micro-Survey', weight: '+30%', status: 'verified' },
        { type: 'Documentary Proof', source: 'Offer Letter & TechNova Salary Slip', weight: '+35%', status: 'verified' },
        { type: 'Institutional Cross-Check', source: 'Muzaffarpur CoE Placement Roster', weight: '+17%', status: 'verified' },
        { type: 'Consistency Audit', source: 'No discrepancy flagged', weight: '+6%', status: 'verified' },
      ],
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
      evidenceStatus: 'Verified Outcome',
      confidenceScore: 92,
      sustainableIndex: 95,
      jobRelevance: 'Direct',
      evidenceTrail: [
        { type: 'Learner 3M Confirmation', source: 'Portal Micro-Check', weight: '+30%', status: 'verified' },
        { type: 'Corporate Tax / UAN Record', source: 'EPFO Cross-Reference', weight: '+38%', status: 'verified' },
        { type: 'Institutional Match', source: 'Patna Skill Hub Roster', weight: '+18%', status: 'verified' },
        { type: 'Wage Escrow Audit', source: 'Bank credit match verified', weight: '+6%', status: 'verified' },
      ],
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
      evidenceStatus: 'Needs Review',
      confidenceScore: 64,
      sustainableIndex: 71,
      jobRelevance: 'Partial',
      evidenceTrail: [
        { type: 'Learner Self-Report', source: 'SMS Checkpoint Confirmed', weight: '+30%', status: 'verified' },
        { type: 'Institutional Roster', source: 'Gaya Institute Listed as Placed', weight: '+17%', status: 'verified' },
        { type: 'Documentary Proof', source: 'Salary slip awaiting upload', weight: '0%', status: 'pending' },
        { type: 'Relevance Review', source: 'Electrical maintenance (Partial match)', weight: '+17%', status: 'review' },
      ],
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
      evidenceStatus: 'Verified Outcome',
      confidenceScore: 82,
      sustainableIndex: 86,
      jobRelevance: 'Direct',
      evidenceTrail: [
        { type: 'Learner Self-Employment Report', source: 'WhatsApp Micro-Survey', weight: '+30%', status: 'verified' },
        { type: 'Client Invoices / GSTN', source: 'GST & Freelance Contracts', weight: '+35%', status: 'verified' },
        { type: 'Center Verification', source: 'Entrepreneurship incubation confirmed', weight: '+17%', status: 'verified' },
      ],
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
      evidenceStatus: 'Unverified Outcome',
      confidenceScore: 18,
      sustainableIndex: 12,
      jobRelevance: 'None',
      evidenceTrail: [
        { type: 'Learner Follow-up', source: 'Reports placement barrier: Interview skill gap', weight: '+18%', status: 'verified' },
        { type: 'Employer Record', source: 'No placement offer submitted', weight: '0%', status: 'pending' },
        { type: 'Note', source: 'Never equate Unverified with Unemployed', weight: '0%', status: 'pending' },
      ],
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
      evidenceStatus: 'Follow-up Pending',
      confidenceScore: 50,
      sustainableIndex: 68,
      jobRelevance: 'Direct',
      evidenceTrail: [
        { type: 'Historical 3M/6M Check', source: 'Previously verified at Apollo Clinic', weight: '+35%', status: 'verified' },
        { type: '12-Month Checkpoint', source: 'Notification dispatched; response pending', weight: '0%', status: 'pending' },
        { type: 'Status', source: 'Follow-up in progress', weight: '+15%', status: 'pending' },
      ],
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
      evidenceStatus: 'Conflicted',
      confidenceScore: 42,
      sustainableIndex: 35,
      jobRelevance: 'Partial',
      evidenceTrail: [
        { type: 'Learner Report', source: 'Reports contract terminated after 45 days', weight: '+20%', status: 'conflict' },
        { type: 'Provider Report', source: 'Center claimed active 1-year apprenticeship', weight: '+22%', status: 'conflict' },
        { type: 'Conflict Resolution', source: 'Discrepancy flagged: Officer audit scheduled', weight: '0%', status: 'conflict' },
      ],
    },
  ]);

  // Student Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [districtFilter, setDistrictFilter] = useState('All');
  const [programFilter, setProgramFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [evidenceFilter, setEvidenceFilter] = useState('All');

  const filteredStudents = useMemo(() => {
    return studentsList.filter((s) => {
      const matchesSearch =
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.district.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDistrict = districtFilter === 'All' || s.district === districtFilter;
      const matchesProgram = programFilter === 'All' || s.program.toLowerCase().includes(programFilter.toLowerCase());
      const matchesStatus = statusFilter === 'All' || s.status === statusFilter;
      const matchesEvidence = evidenceFilter === 'All' || s.evidenceStatus === evidenceFilter;
      return matchesSearch && matchesDistrict && matchesProgram && matchesStatus && matchesEvidence;
    });
  }, [studentsList, searchQuery, districtFilter, programFilter, statusFilter, evidenceFilter]);

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

  const govTabDefinitions = [
    {
      id: 'dashboard' as GovTabType,
      label: 'Macro Overview',
      labels: { en: 'Dashboard', hi: 'डैशबोर्ड', mr: 'डॅशबोर्ड' },
      desc: { en: 'State telemetry & evidence KPIs', hi: 'राज्य अवलोकन व मुख्य मेट्रिक्स', mr: 'राज्य विहंगावलोकन व मेट्रिक्स' },
      icon: BarChart3,
      primaryDesktop: true,
      primaryMobile: true,
    },
    {
      id: 'students' as GovTabType,
      label: 'Student Management',
      labels: { en: 'Students', hi: 'छात्र प्रबंधन', mr: 'विद्यार्थी व्यवस्थापन' },
      desc: { en: 'Longitudinal learner roster & audits', hi: 'शिक्षार्थी रिकॉर्ड व साक्ष्य सत्यापन', mr: 'विद्यार्थी नोंदी व पुरावा पडताळणी' },
      icon: Users,
      primaryDesktop: true,
      primaryMobile: true,
    },
    {
      id: 'skill-gaps' as GovTabType,
      label: 'Skill Gap Analytics',
      labels: { en: 'Skill Gaps', hi: 'कौशल अंतर', mr: 'कौशल्य तफावत' },
      desc: { en: 'District & sector mismatch telemetry', hi: 'क्षेत्रीय कौशल अंतर विश्लेषण', mr: 'विभागीय कौशल्य तफावत विश्लेषण' },
      icon: Brain,
      primaryDesktop: true,
      primaryMobile: false,
    },
    {
      id: 'employment' as GovTabType,
      label: 'Employment Analytics',
      labels: { en: 'Employment', hi: 'रोजगार विश्लेषण', mr: 'रोजगार विश्लेषण' },
      desc: { en: 'Placement verification & retention', hi: 'रोजगार टिकून राहणे व सत्यापन', mr: 'रोजगार टिकून राहणे व पडताळणी' },
      icon: Briefcase,
      primaryDesktop: true,
      primaryMobile: false,
    },
    {
      id: 'ai-insights' as GovTabType,
      label: 'AI Macro Insights',
      labels: { en: 'AI Insights', hi: 'एआई इनसाइट्स', mr: 'एआय विश्लेषण' },
      desc: { en: 'AI policy intelligence & forecast', hi: 'नीतिगत एआई सिफारिशें', mr: 'धोरणात्मक एआय शिफारसी' },
      icon: Sparkles,
      primaryDesktop: true,
      primaryMobile: true,
    },
    {
      id: 'programs' as GovTabType,
      label: 'Training Programs',
      labels: { en: 'Programs', hi: 'प्रशिक्षण कार्यक्रम', mr: 'प्रशिक्षण कार्यक्रम' },
      desc: { en: 'PMKVY / NCVET curricula tracking', hi: 'पीएमकेवीवाई पाठ्यक्रम व पूर्णता', mr: 'पीएमकेव्हीवाय अभ्यासक्रम नोंद' },
      icon: Award,
      primaryDesktop: false,
      primaryMobile: false,
    },
    {
      id: 'providers' as GovTabType,
      label: 'Training Providers',
      labels: { en: 'Providers', hi: 'प्रशिक्षण प्रदाता', mr: 'संस्था व्यवस्थापन' },
      desc: { en: 'Center accreditation & outcome scoring', hi: 'संस्था जवाबदेही व ऑडिट', mr: 'संस्था उत्तरदायित्व व ऑडिट' },
      icon: Building,
      primaryDesktop: false,
      primaryMobile: false,
    },
    {
      id: 'wage-career' as GovTabType,
      label: 'Wage & Career',
      labels: { en: 'Wage & Career', hi: 'वेतन व करियर', mr: 'वेतन व कारकीर्द' },
      desc: { en: 'Salary increment & trajectory', hi: 'वेतन वृद्धि व करियर मार्ग', mr: 'पगार वाढ व कारकीर्द प्रगती' },
      icon: TrendingUp,
      primaryDesktop: false,
      primaryMobile: false,
    },
    {
      id: 'follow-up' as GovTabType,
      label: 'Follow-Up Monitoring',
      labels: { en: 'Follow-Ups', hi: 'फॉलो-अप मॉनिटरिंग', mr: 'पाठपुरावा नियंत्रण' },
      desc: { en: '3, 6, 12, 24M scheduled surveys', hi: 'नियमित फॉलो-अप सर्वेक्षण', mr: 'नियमित पाठपुरावा सर्वेक्षण' },
      icon: Clock,
      primaryDesktop: false,
      primaryMobile: false,
    },
    {
      id: 'impact' as GovTabType,
      label: 'Impact & ROI',
      labels: { en: 'Impact & ROI', hi: 'प्रभाव व आरओआई', mr: 'प्रभाव व परतावा' },
      desc: { en: 'Public skilling expenditure ROI', hi: 'सार्वजनिक खर्च व वित्तीय लाभ', mr: 'सार्वजनिक खर्च व परतावा' },
      icon: Landmark,
      primaryDesktop: false,
      primaryMobile: false,
    },
    {
      id: 'reports' as GovTabType,
      label: 'Reports & Export',
      labels: { en: 'Reports', hi: 'रिपोर्ट्स व निर्यात', mr: 'अहवाल व निर्यात' },
      desc: { en: 'Export state/national audit dossiers', hi: 'संसद/नीति आयोग रिपोर्ट निर्यात', mr: 'ऑडिट अहवाल व निर्यात' },
      icon: FileText,
      primaryDesktop: false,
      primaryMobile: false,
    },
    {
      id: 'alerts' as GovTabType,
      label: 'Policy Flags',
      labels: { en: 'Policy Flags', hi: 'नीतिगत अलर्ट', mr: 'धोरणात्मक इशारे' },
      desc: { en: 'High-risk placement & compliance flags', hi: 'जोखिम चेतावनी व अनुपालन', mr: 'धोका इशारे व पडताळणी' },
      icon: AlertCircle,
      primaryDesktop: false,
      primaryMobile: false,
    },
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-text-dark'} flex flex-col justify-between selection:bg-saffron selection:text-white transition-colors duration-200`}>
      {/* 1. TOP OFFICIAL GOVERNMENT OFFICER NAVBAR */}
      <header className={`${theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-white border-gray-200'} border-b sticky top-0 z-40 shadow-xs transition-colors duration-200`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-3">
          {/* Brand Identity */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-saffron rounded-lg p-1"
          >
            <div className="w-9 h-9 bg-gradient-to-br from-saffron to-orange-600 rounded-lg flex items-center justify-center shadow-md text-white font-bold text-base">
              S
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-primary-navy'} text-base leading-none`}>
                  Skill Saarthi
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-orange-50 dark:bg-amber-950/40 text-saffron dark:text-amber-400 px-2 py-0.5 rounded-full border border-orange-200 dark:border-amber-800/60">
                  <Building2 size={12} />
                  Government Officer Portal
                </span>
                <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-800/60 shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                  DEMO / SYNTHETIC DATA (Section 20 Protocol)
                </span>
              </div>
              <p className="text-[10px] text-text-muted dark:text-slate-400 mt-0.5">
                Ministry of Skill Development &amp; Entrepreneurship, GoI
              </p>
            </div>
          </Link>

          {/* Top Quick Actions & Officer Chip */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Selector */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-gray-200 dark:border-slate-700 text-xs font-semibold">
              <Globe size={14} className="text-saffron dark:text-amber-400 ml-1" />
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
              {theme === 'dark' ? <Sun size={17} className="text-amber-400" /> : <Moon size={17} className="text-primary-navy" />}
            </button>

            {/* Notifications Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotificationsDrawer(!showNotificationsDrawer)}
                className="p-2 text-text-muted dark:text-slate-400 hover:text-saffron hover:bg-orange-50 dark:hover:bg-slate-800 rounded-lg relative transition-colors focus:outline-none"
                aria-label="Alerts"
              >
                <Bell size={17} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-saffron rounded-full animate-pulse" />
              </button>

              {/* Notifications Popover */}
              {showNotificationsDrawer && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl shadow-xl z-50 p-4 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-slate-700">
                    <span className="font-bold text-xs text-primary-navy dark:text-sky-300 uppercase tracking-wider">
                      Policy Flags &amp; Alerts (3)
                    </span>
                    <button
                      onClick={() => setShowNotificationsDrawer(false)}
                      className="text-xs text-text-muted dark:text-slate-400 hover:text-text-dark"
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
                      className="p-2.5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 rounded-lg cursor-pointer hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
                    >
                      <p className="font-bold text-red-700 dark:text-red-400 flex items-center gap-1">
                        <AlertCircle size={13} />
                        Low Placement Flag
                      </p>
                      <p className="text-text-muted dark:text-slate-400 mt-0.5">
                        Bhagalpur ITI Skill Annex reported 42% placement in Q1. Audit required.
                      </p>
                    </div>
                    <div
                      onClick={() => {
                        setActiveTab('skill-gaps');
                        setShowNotificationsDrawer(false);
                      }}
                      className="p-2.5 bg-orange-50 dark:bg-amber-950/40 border border-orange-200 dark:border-amber-800/60 rounded-lg cursor-pointer hover:bg-orange-100 dark:hover:bg-amber-900/40 transition-colors"
                    >
                      <p className="font-bold text-saffron dark:text-amber-400 flex items-center gap-1">
                        <Brain size={13} />
                        Surge in Digital Gaps
                      </p>
                      <p className="text-text-muted dark:text-slate-400 mt-0.5">
                        2,450 students in Muzaffarpur missing Docker / Cloud competencies.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Officer Identification Chip */}
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-xs font-bold text-text-dark dark:text-slate-100 leading-tight">{officerProfile.name}</span>
              <span className="text-[10px] text-text-muted dark:text-slate-400 truncate max-w-[200px]">
                {officerProfile.designation}
              </span>
            </div>

            {/* Officer Settings Modal Trigger */}
            <button
              onClick={() => setShowOfficerSettingsModal(true)}
              className="p-2 text-text-muted dark:text-slate-400 hover:text-saffron hover:bg-orange-50 dark:hover:bg-slate-800 rounded-lg transition-colors focus:outline-none"
              title="Officer Profile & Settings"
            >
              <Settings size={17} />
            </button>

            {/* Sign Out Button */}
            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-1 text-xs font-semibold text-text-muted dark:text-slate-400 hover:text-red-600 px-2.5 py-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
              title="Sign Out"
            >
              <LogOut size={15} />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>

        {/* 3. NAVIGATION TABS BAR - RESPONSIVE CLEAN WITH 'MORE' DROPDOWN */}
        <div className={`${theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-white border-gray-200'} border-b relative z-30 transition-colors duration-200`}>
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-1.5 sm:gap-2">
            
            {/* Primary Visible Tabs */}
            <div className="flex items-center gap-1 sm:gap-1.5 flex-1 overflow-x-auto scrollbar-none py-2">
              {govTabDefinitions.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                const currentLabel = tab.labels[language] || tab.label;

                if (!tab.primaryDesktop) return null;

                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id as GovTabType);
                      setIsMoreMenuOpen(false);
                    }}
                    className={`${tab.primaryMobile ? 'inline-flex' : 'hidden sm:inline-flex'} items-center gap-1.5 py-2 px-2.5 sm:px-3.5 text-xs font-semibold rounded-lg transition-all ${
                      isActive
                        ? 'bg-saffron text-white shadow-xs font-bold'
                        : 'text-text-muted dark:text-slate-400 hover:text-text-dark dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Icon
                      size={14}
                      className={isActive ? 'text-white' : 'text-text-muted dark:text-slate-400'}
                    />
                    <span className="whitespace-nowrap">{currentLabel}</span>
                    {tab.id === 'ai-insights' && (
                      <span className="hidden md:inline-block w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse ml-0.5" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* "More ▾" Dropdown Menu */}
            <div className="relative shrink-0 py-2" ref={moreMenuRef}>
              <button
                onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
                className={`inline-flex items-center gap-1.5 py-2 px-2.5 sm:px-3 text-xs font-bold rounded-lg border transition-all ${
                  govTabDefinitions.some((t) => t.id === activeTab && !t.primaryDesktop)
                    ? 'border-saffron bg-orange-50 dark:bg-amber-950/60 text-saffron dark:text-amber-300 shadow-xs'
                    : 'border-gray-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-text-dark dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
                aria-label="More Options"
                title="More Options"
              >
                <MoreHorizontal size={14} />
                <span className="whitespace-nowrap">
                  {language === 'hi' ? 'अधिक' : language === 'mr' ? 'अधिक' : 'More'}
                  {govTabDefinitions.some((t) => t.id === activeTab && !t.primaryDesktop) && (
                    <span className="ml-1 text-saffron dark:text-amber-400 font-semibold max-w-[90px] sm:max-w-none truncate inline-block align-bottom">
                      : {govTabDefinitions.find((t) => t.id === activeTab)?.labels[language] || govTabDefinitions.find((t) => t.id === activeTab)?.label}
                    </span>
                  )}
                </span>
                <ChevronDown
                  size={13}
                  className={`transition-transform duration-200 ${isMoreMenuOpen ? 'rotate-180 text-saffron dark:text-amber-400' : 'text-slate-400'}`}
                />
              </button>

              {/* Dropdown Popover */}
              <AnimatePresence>
                {isMoreMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-72 sm:w-80 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-2xl shadow-2xl z-50 p-2 space-y-1 overflow-hidden"
                  >
                    <div className="px-3 py-2 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        {language === 'hi' ? 'अतिरिक्त सरकारी विश्लेषण' : language === 'mr' ? 'अतिरिक्त प्रशासकीय विश्लेषण' : 'Advanced Analytics & Modules'}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                        {language === 'hi' ? 'नीति नियंत्रण' : language === 'mr' ? 'धोरण नियंत्रण' : 'Policy Control'}
                      </span>
                    </div>

                    <div className="max-h-80 overflow-y-auto space-y-1 p-1">
                      {govTabDefinitions
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
                                setActiveTab(tab.id as GovTabType);
                                setIsMoreMenuOpen(false);
                              }}
                              className={`w-full flex items-start gap-3 p-2.5 rounded-xl text-left transition-all ${
                                isActive
                                  ? 'bg-orange-50 dark:bg-amber-950/50 border border-orange-200 dark:border-amber-800/80 text-saffron dark:text-amber-200'
                                  : 'hover:bg-slate-50 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-300'
                              } ${tab.primaryDesktop ? 'sm:hidden' : ''}`}
                            >
                              <div
                                className={`p-2 rounded-lg shrink-0 ${
                                  isActive
                                    ? 'bg-saffron text-white'
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
                                    <span className="text-[10px] font-bold text-saffron dark:text-amber-400 flex items-center gap-0.5">
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

              {/* Outcome Evidence & Sustainable Outcome Index Master Strip (Pillars 1, 6, 7) */}
              <div className="bg-gradient-to-r from-primary-navy via-deep-navy to-slate-900 text-white rounded-2xl p-5 sm:p-6 shadow-md space-y-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 pb-3 border-b border-white/15">
                  <div className="space-y-0.5">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-saffron bg-orange-500/20 px-2.5 py-0.5 rounded-full border border-orange-400/30">
                      Outcome Evidence Engine • Longitudinal Intelligence
                    </span>
                    <h2 className="text-xl font-bold">The Sustainable Livelihood Equation</h2>
                    <p className="text-xs text-blue-100 max-w-2xl leading-relaxed">
                      &ldquo;The certificate is not the outcome. What happens after the certificate is.&rdquo; Skill Saarthi separates vanity placement counts from verifiable 6–24 month economic retention.
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-[10px] text-blue-200 block uppercase tracking-wider">Sustainable Outcome Index</span>
                      <span className="text-2xl font-extrabold text-saffron">78.4 <span className="text-xs font-normal text-white">/ 100</span></span>
                    </div>
                    <button
                      onClick={() => setShowConfigPolicyModal(true)}
                      className="bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-lg text-xs font-bold border border-white/20 transition-all flex items-center gap-1.5"
                    >
                      <Settings size={14} /> Configure Policy
                    </button>
                  </div>
                </div>

                {/* 5-Stage Comparative Pipeline */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center text-xs">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                    <span className="text-[10px] text-blue-200 block">1. Initial Reported Placed</span>
                    <span className="text-lg font-bold text-white block mt-0.5">75.0%</span>
                    <span className="text-[10px] text-blue-300">32,100 Learners</span>
                  </div>
                  <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-400/30">
                    <span className="text-[10px] text-blue-200 block">2. Verified Outcomes (≥75% Conf.)</span>
                    <span className="text-lg font-bold text-blue-300 block mt-0.5">71.2%</span>
                    <span className="text-[10px] text-blue-200">30,550 Cross-Checked</span>
                  </div>
                  <div className="p-3 bg-green-500/10 rounded-xl border border-green-400/30">
                    <span className="text-[10px] text-green-200 block">3. 6-Month Sustained Retention</span>
                    <span className="text-lg font-bold text-success-green block mt-0.5">63.1%</span>
                    <span className="text-[10px] text-green-300">27,000 Active in Jobs</span>
                  </div>
                  <div className="p-3 bg-orange-500/10 rounded-xl border border-orange-400/30">
                    <span className="text-[10px] text-orange-200 block">4. Wage Progression Delta</span>
                    <span className="text-lg font-bold text-saffron block mt-0.5">+78%</span>
                    <span className="text-[10px] text-orange-200">₹12k → ₹21.4k Avg</span>
                  </div>
                  <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-400/30">
                    <span className="text-[10px] text-purple-200 block">5. Training-Job Relevance</span>
                    <span className="text-lg font-bold text-purple-300 block mt-0.5">84.5%</span>
                    <span className="text-[10px] text-purple-200">High Curricular Match</span>
                  </div>
                </div>

                {/* Section 14 Case Study: Automotive Welder — Nashik (Pillar: Placement % ≠ Sustainable Outcome) */}
                <div className="p-4 bg-white/10 rounded-xl border border-white/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-saffron text-white">
                        Section 14 Benchmark Case Study
                      </span>
                      <span className="font-bold text-white text-sm">Automotive Welder Cohort — Nashik District</span>
                    </div>
                    <p className="text-blue-100 text-[11px] leading-relaxed">
                      Placement: <strong className="text-white font-mono">82%</strong> • Verified Employment: <strong className="text-white font-mono">74%</strong> • 6-Month Retention: <strong className="text-emerald-300 font-mono">61%</strong> • Wage Progression: <strong className="text-saffron font-mono">+18%</strong> • Job Relevance: <strong className="text-purple-300 font-mono">84%</strong>
                    </p>
                  </div>
                  <div className="px-3.5 py-2 rounded-lg bg-white/15 border border-white/25 text-[11px] font-bold text-amber-300 whitespace-nowrap self-start md:self-auto shadow-xs">
                    💡 “82% placement does not mean 82% sustainable success”
                  </div>
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
                    <span className="text-xs font-medium uppercase tracking-wider">Certified</span>
                    <Award size={16} className="text-primary-blue" />
                  </div>
                  <p className="text-xl font-bold text-primary-blue">42,800</p>
                  <p className="text-[11px] text-success-green font-semibold mt-0.5">88.7% Completion</p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
                  <div className="flex items-center justify-between text-text-muted mb-1.5">
                    <span className="text-xs font-medium uppercase tracking-wider">Verified Outcomes</span>
                    <ShieldCheck size={16} className="text-success-green" />
                  </div>
                  <p className="text-xl font-bold text-success-green">30,550</p>
                  <p className="text-[11px] text-success-green font-semibold mt-0.5">71.2% Evidence Confirmed</p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
                  <div className="flex items-center justify-between text-text-muted mb-1.5">
                    <span className="text-xs font-medium uppercase tracking-wider">Average Wage</span>
                    <TrendingUp size={16} className="text-saffron" />
                  </div>
                  <p className="text-xl font-bold text-saffron">₹21,400 <span className="text-xs font-normal">/mo</span></p>
                  <p className="text-[11px] text-success-green font-semibold mt-0.5">+78% Longitudinal Delta</p>
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
                  <p className="text-[11px] text-purple-600 font-semibold mt-0.5">6.6x Budget Multiplier</p>
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
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-bold text-primary-navy">Student Outcome &amp; Evidence Registry</h2>
                    <span className="text-[11px] bg-blue-100 text-primary-navy font-bold px-2.5 py-0.5 rounded-full border border-blue-200">
                      Outcome Evidence Engine Active
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-text-muted mt-0.5">
                    Separating Outcome Status, Evidence Confidence, and Sustainable Livelihood Quality per learner record.
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowConfigPolicyModal(true)}
                    className="inline-flex items-center gap-1.5 bg-white border border-gray-300 text-primary-navy px-3.5 py-2 rounded-lg text-xs font-bold hover:bg-gray-50 transition-all shadow-xs"
                  >
                    <Settings size={14} className="text-saffron" />
                    Configure Evidence Policy
                  </button>
                  <button
                    onClick={() => triggerReportDownload('Complete_Learners_Registry', 'excel')}
                    className="inline-flex items-center gap-2 bg-saffron text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-orange-600 transition-all shadow-xs"
                  >
                    <Download size={14} /> Export Registry (Excel)
                  </button>
                </div>
              </div>

              {/* Search & 5-Parameter Filter Bar */}
              <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs">
                  {/* Search Bar */}
                  <div className="relative sm:col-span-1">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search by Name or Student ID..."
                      className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-saffron"
                    />
                    <Search size={15} className="absolute left-3 top-2.5 text-text-muted dark:text-slate-400" />
                  </div>

                  {/* Filter by Evidence Status (Pillar 1) */}
                  <div>
                    <select
                      value={evidenceFilter}
                      onChange={(e) => setEvidenceFilter(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-orange-200 dark:border-amber-800/60 bg-orange-50/60 dark:bg-slate-900 text-slate-900 dark:text-amber-300 font-semibold focus:outline-none focus:ring-2 focus:ring-saffron"
                    >
                      <option value="All">All Evidence States (5 Tiers)</option>
                      <option value="Verified Outcome">🟢 Verified Outcome (≥75%)</option>
                      <option value="Needs Review">🟡 Needs Review (50-74%)</option>
                      <option value="Unverified Outcome">🔴 Unverified Outcome</option>
                      <option value="Follow-up Pending">⚪ Follow-up Pending</option>
                      <option value="Conflicted">⚠️ Conflicted / Discrepancy</option>
                    </select>
                  </div>

                  {/* Filter by District */}
                  <div>
                    <select
                      value={districtFilter}
                      onChange={(e) => setDistrictFilter(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-saffron"
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
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-saffron"
                    >
                      <option value="All">All Programs</option>
                      <option value="Full Stack">Full Stack Web &amp; Cloud</option>
                      <option value="Data Analytics">Data Analytics</option>
                      <option value="Solar">Solar Technician</option>
                      <option value="Healthcare">Healthcare Assistant</option>
                      <option value="Digital Marketing">Digital Marketing</option>
                    </select>
                  </div>

                  {/* Filter by Livelihood Status */}
                  <div>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-saffron"
                    >
                      <option value="All">All Reported Livelihoods</option>
                      <option value="Employed">Employed (Full-Time)</option>
                      <option value="Self-Employed">Self-Employed / Freelance</option>
                      <option value="Apprenticeship">Apprenticeship</option>
                      <option value="Unemployed">Unemployed / Seeking</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Student Evidence & Outcome Table */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-gray-50 border-b border-gray-200 text-text-muted uppercase tracking-wider font-semibold">
                      <tr>
                        <th className="py-3 px-4">Student &amp; ID</th>
                        <th className="py-3 px-4">District &amp; Training</th>
                        <th className="py-3 px-4">Outcome Evidence Status</th>
                        <th className="py-3 px-4">Evidence Confidence</th>
                        <th className="py-3 px-4">Sustainable Index</th>
                        <th className="py-3 px-4">Verified Wage &amp; Relevance</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredStudents.map((s) => (
                        <tr key={s.id} className="hover:bg-orange-50/30 transition-colors">
                          <td className="py-3 px-4">
                            <span className="font-bold text-text-dark block">{s.name}</span>
                            <span className="text-[10px] text-text-muted font-mono">{s.id}</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-medium text-text-dark block">{s.district}</span>
                            <span className="text-text-muted text-[11px] truncate max-w-[170px] block">{s.program}</span>
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2.5 py-1 rounded-full font-bold text-[10px] inline-flex items-center gap-1 ${
                                s.evidenceStatus === 'Verified Outcome'
                                  ? 'bg-green-50 text-success-green border border-green-200'
                                  : s.evidenceStatus === 'Needs Review'
                                  ? 'bg-amber-50 text-amber-800 border border-amber-200'
                                  : s.evidenceStatus === 'Unverified Outcome'
                                  ? 'bg-red-50 text-red-700 border border-red-200'
                                  : s.evidenceStatus === 'Follow-up Pending'
                                  ? 'bg-gray-100 text-gray-700 border border-gray-300'
                                  : 'bg-orange-100 text-orange-800 border border-orange-300'
                              }`}
                            >
                              {s.evidenceStatus === 'Verified Outcome' && '🟢'}
                              {s.evidenceStatus === 'Needs Review' && '🟡'}
                              {s.evidenceStatus === 'Unverified Outcome' && '🔴'}
                              {s.evidenceStatus === 'Follow-up Pending' && '⚪'}
                              {s.evidenceStatus === 'Conflicted' && '⚠️'}
                              {s.evidenceStatus}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-primary-navy text-sm">{s.confidenceScore}%</span>
                              <button
                                onClick={() => setSelectedEvidenceStudent(s)}
                                className="text-[10px] bg-blue-50 text-primary-blue hover:bg-blue-100 border border-blue-200 px-2 py-0.5 rounded font-semibold transition-colors whitespace-nowrap"
                              >
                                Audit Trail →
                              </button>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
                              {s.sustainableIndex} / 100
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-bold text-primary-navy block">
                              {s.salary > 0 ? `₹${s.salary.toLocaleString('en-IN')}/mo` : 'Unplaced'}
                            </span>
                            <span className="text-[10px] text-text-muted">
                              Relevance: <span className="font-semibold text-text-dark">{s.jobRelevance}</span>
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => setSelectedStudent(s)}
                              className="bg-gray-100 text-primary-navy hover:bg-primary-navy hover:text-white px-3 py-1 rounded-lg font-bold transition-all text-xs"
                            >
                              Dossier →
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

              {/* Pillar 9: Provider Outcome Profile Comparison (Exposing Day-1 Placement Fallacy) */}
              <div className="bg-gradient-to-br from-slate-900 via-primary-navy to-slate-900 rounded-2xl p-6 text-white shadow-lg space-y-5 border border-blue-900/50">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/10">
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full mb-1">
                      <ShieldCheck size={13} /> Pillar 9: Longitudinal Provider Outcome Profiling
                    </div>
                    <h3 className="text-xl font-bold tracking-tight">Why Initial Placement Rates Mislead Government Funding</h3>
                    <p className="text-xs text-blue-200 mt-0.5">
                      Comparing Provider A vs Provider B reveals how day-1 placement metrics hide 6-month attrition and irrelevant job churn.
                    </p>
                  </div>
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-white/10 text-white self-start sm:self-auto border border-white/10">
                    Audit Cohort: 1,000 Certified Trainees Each
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Provider A */}
                  <div className="bg-white/5 rounded-xl p-5 border border-emerald-500/30 hover:border-emerald-500/60 transition-all space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded">
                          Sustainable Performer
                        </span>
                        <h4 className="text-base font-bold text-white mt-1">Provider A: Muzaffarpur Center of Excellence</h4>
                        <p className="text-xs text-blue-200">Full Stack Web &amp; Cloud Cohort</p>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-gray-300 block">Sustainable Index (SOI)</span>
                        <span className="text-2xl font-bold text-emerald-400">86/100</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-white/10 text-xs">
                      <div className="bg-white/5 p-2 rounded-lg">
                        <span className="text-[10px] text-gray-300 block">Day-1 Placed</span>
                        <span className="text-base font-bold text-white">84.0%</span>
                      </div>
                      <div className="bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20">
                        <span className="text-[10px] text-emerald-300 block font-semibold">6M Retained</span>
                        <span className="text-base font-bold text-emerald-400">71.2%</span>
                      </div>
                      <div className="bg-white/5 p-2 rounded-lg">
                        <span className="text-[10px] text-gray-300 block">Wage Growth</span>
                        <span className="text-base font-bold text-emerald-400">+24.5%</span>
                      </div>
                      <div className="bg-white/5 p-2 rounded-lg">
                        <span className="text-[10px] text-gray-300 block">Job Relevance</span>
                        <span className="text-base font-bold text-emerald-400">88.4%</span>
                      </div>
                    </div>

                    <div className="p-3 bg-emerald-950/40 rounded-lg border border-emerald-500/20 text-xs text-emerald-200 leading-relaxed">
                      <span className="font-bold text-emerald-300">Longitudinal Insight:</span> Trainees maintain long-term employment in high-skill tech roles with salary hikes from ₹22,000 to ₹28,000+. Eligible for 100% milestone incentive disbursement under MSDE outcome guidelines.
                    </div>
                  </div>

                  {/* Provider B */}
                  <div className="bg-white/5 rounded-xl p-5 border border-rose-500/30 hover:border-rose-500/60 transition-all space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 bg-rose-500/20 px-2 py-0.5 rounded">
                          Flagged for High Attrition
                        </span>
                        <h4 className="text-base font-bold text-white mt-1">Provider B: Bhagalpur ITI Skill Annex</h4>
                        <p className="text-xs text-blue-200">Hardware &amp; Web Cohort</p>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-gray-300 block">Sustainable Index (SOI)</span>
                        <span className="text-2xl font-bold text-rose-400">41/100</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-white/10 text-xs">
                      <div className="bg-white/5 p-2 rounded-lg">
                        <span className="text-[10px] text-gray-300 block">Day-1 Placed</span>
                        <span className="text-base font-bold text-amber-400">86.2%</span>
                      </div>
                      <div className="bg-rose-500/10 p-2 rounded-lg border border-rose-500/20">
                        <span className="text-[10px] text-rose-300 block font-semibold">6M Retained</span>
                        <span className="text-base font-bold text-rose-400">38.1%</span>
                      </div>
                      <div className="bg-white/5 p-2 rounded-lg">
                        <span className="text-[10px] text-gray-300 block">Wage Growth</span>
                        <span className="text-base font-bold text-rose-400">-2.1%</span>
                      </div>
                      <div className="bg-white/5 p-2 rounded-lg">
                        <span className="text-[10px] text-gray-300 block">Job Relevance</span>
                        <span className="text-base font-bold text-rose-400">34.0%</span>
                      </div>
                    </div>

                    <div className="p-3 bg-rose-950/40 rounded-lg border border-rose-500/20 text-xs text-rose-200 leading-relaxed">
                      <span className="font-bold text-rose-300">Longitudinal Insight:</span> High Day-1 placement (86.2%) masked that 52% of placements were informal short-term delivery gigs unrelated to syllabus. 62% quit by Month 6. Automatic milestone grant freeze triggered pending curriculum restructuring.
                    </div>
                  </div>
                </div>
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

              {/* Pillar 8: Non-Placement Intelligence System (WHAT -> WHY -> WHAT NEXT) */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-gray-100">
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-saffron bg-orange-50 px-2.5 py-0.5 rounded-full mb-1">
                      <Brain size={13} /> Pillar 8: Causal Non-Placement Intelligence
                    </div>
                    <h3 className="text-xl font-bold text-primary-navy">Non-Placement Intelligence: WHAT → WHY → WHAT NEXT</h3>
                    <p className="text-xs text-text-muted mt-0.5">
                      Transforming unplaced learner records from passive statistics into diagnostic root causes and targeted remedial actions.
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-text-muted bg-gray-100 px-3 py-1 rounded-full self-start sm:self-auto">
                    Cohort: 5,980 Unplaced Learners (14.0%)
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* STAGE 1: WHAT */}
                  <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-primary-navy text-white text-xs font-bold flex items-center justify-center">1</span>
                      <h4 className="font-bold text-primary-navy text-sm">WHAT: Unplaced Cohort</h4>
                    </div>
                    <div className="space-y-3 text-xs">
                      <div className="p-3 bg-white rounded-lg border border-gray-200">
                        <span className="text-text-muted block text-[11px]">Total Unplaced Cohort:</span>
                        <span className="text-xl font-bold text-primary-navy">5,980 Learners</span>
                        <span className="text-[10px] text-text-muted block mt-0.5">Across all registered trades in Bihar</span>
                      </div>
                      <div className="p-3 bg-white rounded-lg border border-gray-200">
                        <span className="text-text-muted block text-[11px]">Average Post-Cert Window:</span>
                        <span className="text-lg font-bold text-saffron">4.2 Months</span>
                        <span className="text-[10px] text-text-muted block mt-0.5">Critical period before skill degradation sets in</span>
                      </div>
                      <div className="p-3 bg-white rounded-lg border border-gray-200">
                        <span className="text-text-muted block text-[11px]">Active Job Seeking Rate:</span>
                        <span className="text-lg font-bold text-success-green">86.4%</span>
                        <span className="text-[10px] text-text-muted block mt-0.5">High motivation, blocked by specific structural friction</span>
                      </div>
                    </div>
                  </div>

                  {/* STAGE 2: WHY (Root Causes) */}
                  <div className="bg-orange-50/40 rounded-xl p-5 border border-orange-200 space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-saffron text-white text-xs font-bold flex items-center justify-center">2</span>
                      <h4 className="font-bold text-primary-navy text-sm">WHY: Causal Attribution</h4>
                    </div>
                    <div className="space-y-3 text-xs">
                      <div>
                        <div className="flex justify-between font-bold text-text-dark mb-1">
                          <span>Technical Skill Gaps</span>
                          <span className="text-saffron">48.2%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-saffron rounded-full" style={{ width: '48.2%' }} />
                        </div>
                        <p className="text-[10px] text-text-muted mt-1">Lacked hands-on Cloud/DevOps tools demanded in job postings</p>
                      </div>

                      <div>
                        <div className="flex justify-between font-bold text-text-dark mb-1">
                          <span>Interview &amp; Soft-Skills Screen</span>
                          <span className="text-primary-blue">21.4%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-primary-blue rounded-full" style={{ width: '21.4%' }} />
                        </div>
                        <p className="text-[10px] text-text-muted mt-1">Passed exam but struggled in technical English and situational rounds</p>
                      </div>

                      <div>
                        <div className="flex justify-between font-bold text-text-dark mb-1">
                          <span>Salary vs Benchmark Gap</span>
                          <span className="text-amber-600">12.1%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500 rounded-full" style={{ width: '12.1%' }} />
                        </div>
                        <p className="text-[10px] text-text-muted mt-1">Offered entry ₹14k against ₹22k+ regional living cost expectation</p>
                      </div>

                      <div>
                        <div className="flex justify-between font-bold text-text-dark mb-1">
                          <span>Relocation / Mobility Friction</span>
                          <span className="text-purple-600">10.8%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-purple-500 rounded-full" style={{ width: '10.8%' }} />
                        </div>
                        <p className="text-[10px] text-text-muted mt-1">Declined offers requiring migration outside home district</p>
                      </div>

                      <div>
                        <div className="flex justify-between font-bold text-text-dark mb-1">
                          <span>Local Market Saturation</span>
                          <span className="text-gray-600">7.5%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-gray-500 rounded-full" style={{ width: '7.5%' }} />
                        </div>
                        <p className="text-[10px] text-text-muted mt-1">Local trade saturation in specific rural sub-districts</p>
                      </div>
                    </div>
                  </div>

                  {/* STAGE 3: WHAT NEXT (Remediation Pathways) */}
                  <div className="bg-emerald-50/40 rounded-xl p-5 border border-emerald-200 space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-success-green text-white text-xs font-bold flex items-center justify-center">3</span>
                      <h4 className="font-bold text-primary-navy text-sm">WHAT NEXT: Remediation</h4>
                    </div>
                    <div className="space-y-3 text-xs">
                      <div className="p-3 bg-white rounded-lg border border-emerald-200 space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-primary-navy">30-Day Technical Bridge Modules</span>
                          <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">2,880 Learners</span>
                        </div>
                        <p className="text-text-muted text-[11px]">Auto-invitation sent via WhatsApp bot for Cloud and DevOps bridge courses at district CoEs.</p>
                      </div>

                      <div className="p-3 bg-white rounded-lg border border-emerald-200 space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-primary-navy">AI Mock Interview Clinic</span>
                          <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold">1,280 Learners</span>
                        </div>
                        <p className="text-text-muted text-[11px]">Virtual voice/video interview practice with immediate feedback on technical communication.</p>
                      </div>

                      <div className="p-3 bg-white rounded-lg border border-emerald-200 space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-primary-navy">Local Apprenticeship Matching</span>
                          <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 text-[10px] font-bold">1,370 Learners</span>
                        </div>
                        <p className="text-text-muted text-[11px]">Direct routing to NAPS/NATS stipend-supported apprenticeships within 25 km radius.</p>
                      </div>
                    </div>
                  </div>
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
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-saffron bg-orange-50 px-2.5 py-0.5 rounded-full mb-1">
                    <Sparkles size={13} /> Pillar 10 &amp; 11: Honest AI Telemetry Architecture
                  </div>
                  <h2 className="text-2xl font-bold text-primary-navy">AI Policy Insights &amp; Decision Intelligence</h2>
                  <p className="text-xs sm:text-sm text-text-muted mt-0.5">
                    Synthesizing longitudinal outcome data to recommend resource allocation and curriculum improvements with full epistemic humility.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-text-muted bg-white border border-gray-200 px-3 py-1.5 rounded-lg shadow-xs flex items-center gap-1.5">
                    <ShieldCheck size={14} className="text-success-green" /> DPDP Act 2023 Compliant
                  </span>
                </div>
              </div>

              {/* Epistemic Humility & Governance Strip */}
              <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-4 text-xs text-primary-navy flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <Brain size={18} className="text-primary-blue flex-shrink-0" />
                  <div>
                    <span className="font-bold">Human-in-the-Loop Governance:</span> AI delivers structured <em>“Consider”</em> advisories with full evidence trails. Final budgetary and program decisions remain strictly under officer discretion.
                  </div>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-blue-100 text-primary-blue border border-blue-300 self-start sm:self-auto">
                  Advisory Only
                </span>
              </div>

              {/* Two-Phase Architecture Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* PHASE 1: DETERMINISTIC HEURISTIC RULES (ACTIVE NOW) */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 space-y-4">
                  <div className="flex justify-between items-start pb-3 border-b border-gray-100">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-success-green bg-green-50 px-2 py-0.5 rounded border border-green-200">
                        Phase 1: Active in Production
                      </span>
                      <h3 className="text-base font-bold text-primary-navy mt-1">
                        Deterministic Heuristic Engine
                      </h3>
                      <p className="text-xs text-text-muted">Multi-Source Cross-Verification &amp; Transparent Triangulation Rules</p>
                    </div>
                    <span className="text-xs font-mono font-bold bg-gray-50 px-2.5 py-1 rounded text-primary-navy border border-gray-200">
                      100% Auditable
                    </span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 space-y-1">
                      <div className="flex justify-between font-bold text-primary-navy">
                        <span>Rule A: High-Confidence Triangulation</span>
                        <span className="text-success-green">Score &ge; 75%</span>
                      </div>
                      <p className="text-text-muted text-[11px]">
                        Learner WhatsApp micro-survey confirmed (+30%) + Salary slip / Offer letter uploaded (+35%) + Center roster match (+17%) &rarr; Verified Outcome.
                      </p>
                    </div>

                    <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 space-y-1">
                      <div className="flex justify-between font-bold text-primary-navy">
                        <span>Rule B: Single-Source Review Gate</span>
                        <span className="text-amber-600">Score 50-74%</span>
                      </div>
                      <p className="text-text-muted text-[11px]">
                        Learner confirms placement but documentary slip pending &rarr; Marked <em>Needs Review</em>. Automated reminder queued without penalizing student.
                      </p>
                    </div>

                    <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 space-y-1">
                      <div className="flex justify-between font-bold text-primary-navy">
                        <span>Rule C: Conflicted Outcome Flag</span>
                        <span className="text-rose-600">Discrepancy Trigger</span>
                      </div>
                      <p className="text-text-muted text-[11px]">
                        Training provider reports student as &ldquo;Placed&rdquo; but learner micro-survey reports &ldquo;Seeking Work&rdquo; &rarr; Auto-tagged ⚠️ Conflicted for inspection.
                      </p>
                    </div>

                    <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 space-y-1">
                      <div className="flex justify-between font-bold text-primary-navy">
                        <span>Rule D: Wage Outlier Detection</span>
                        <span className="text-primary-blue">Audit Guard</span>
                      </div>
                      <p className="text-text-muted text-[11px]">
                        Reported wage exceeds 2.5&times; district trade median &rarr; Routed to desk audit queue to prevent fraudulent subsidy claims.
                      </p>
                    </div>
                  </div>
                </div>

                {/* PHASE 2: PREDICTIVE LONGITUDINAL ML (ROADMAP) */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 space-y-4">
                  <div className="flex justify-between items-start pb-3 border-b border-gray-100">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                        Phase 2: Data Accumulation Stage
                      </span>
                      <h3 className="text-base font-bold text-primary-navy mt-1">
                        Predictive Longitudinal ML (Roadmap)
                      </h3>
                      <p className="text-xs text-text-muted">Statistical Modeling on 24-Month Mature Outcome Records</p>
                    </div>
                    <span className="text-xs font-mono font-bold bg-purple-50 px-2.5 py-1 rounded text-purple-800 border border-purple-200">
                      Cohort Target: 100k+
                    </span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="p-3 bg-purple-50/40 rounded-xl border border-purple-100 space-y-1">
                      <div className="flex justify-between font-bold text-purple-900">
                        <span>Kaplan-Meier Retention Survival Model</span>
                        <span className="text-purple-700 font-mono">In Calibration</span>
                      </div>
                      <p className="text-text-muted text-[11px]">
                        Estimating 6-month and 12-month drop-off hazard rates across demographic cohorts to trigger proactive retention interventions.
                      </p>
                    </div>

                    <div className="p-3 bg-purple-50/40 rounded-xl border border-purple-100 space-y-1">
                      <div className="flex justify-between font-bold text-purple-900">
                        <span>Trade Obsolescence &amp; Velocity Forecaster</span>
                        <span className="text-purple-700 font-mono">Pilot Phase</span>
                      </div>
                      <p className="text-text-muted text-[11px]">
                        Correlating active job market hiring indices with regional placement speeds to forecast declining syllabus viability 6 months ahead.
                      </p>
                    </div>

                    <div className="p-3 bg-purple-50/40 rounded-xl border border-purple-100 space-y-1">
                      <div className="flex justify-between font-bold text-purple-900">
                        <span>Personalized Bridge Course Matching</span>
                        <span className="text-purple-700 font-mono">Active Pilot</span>
                      </div>
                      <p className="text-text-muted text-[11px]">
                        Recommending specific 15-day modular additions (e.g. Cloud Foundations) that maximize post-training wage growth elasticity.
                      </p>
                    </div>

                    <div className="p-3 bg-purple-50/40 rounded-xl border border-purple-100 space-y-1">
                      <div className="flex justify-between font-bold text-purple-900">
                        <span>Wage Trajectory Simulation</span>
                        <span className="text-purple-700 font-mono">Research</span>
                      </div>
                      <p className="text-text-muted text-[11px]">
                        Benchmarking individual earnings growth against regional CPI to evaluate genuine real-wage welfare improvement over 24 months.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actionable Policy Advisories (PRD Aligned) */}
              <div className="space-y-4">
                <h3 className="font-bold text-sm text-primary-navy uppercase tracking-wider">
                  Active AI Policy Advisories for Review
                </h3>

                <div className="p-5 bg-gradient-to-br from-blue-50/80 to-white rounded-2xl border border-blue-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-primary-navy font-bold text-sm">
                      <Sparkles size={16} className="text-saffron" />
                      <span>Advisory #1: Curriculum Modernization Discovery</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-blue-100 text-primary-blue text-[10px] font-bold">
                      Confidence: 94%
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-text-dark leading-relaxed">
                    &ldquo;Students completing Full Stack courses with Cloud Modules command a 23% higher employment rate
                    and 38% higher starting wage (₹28,000 vs ₹20,200) than pure web cohorts.&rdquo;
                  </p>
                  <div className="pt-2 border-t border-blue-100 text-xs text-text-muted flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="font-bold text-primary-navy">Recommended Action:</span> Consider mandating 40 hours of practical Docker &amp; Cloud training across all Tier-2 ITI curriculum batches starting Q3.
                    </div>
                    <button
                      onClick={() => alert('Advisory noted. Forwarded to State Curriculum Review Committee.')}
                      className="bg-primary-navy hover:bg-navy-dark text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap self-start sm:self-auto"
                    >
                      Forward to Committee
                    </button>
                  </div>
                </div>

                <div className="p-5 bg-gradient-to-br from-orange-50/80 to-white rounded-2xl border border-orange-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-saffron font-bold text-sm">
                      <Sparkles size={16} className="text-saffron" />
                      <span>Advisory #2: Resource Reallocation Recommendation</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-orange-100 text-saffron text-[10px] font-bold">
                      Confidence: 91%
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-text-dark leading-relaxed">
                    &ldquo;Reallocating ₹1.8 Cr grant funding from saturated general desktop trades to Cloud, Data Analytics, and Solar
                    Technician hubs in Northern Bihar will yield estimated +840 incremental placements within 12 months.&rdquo;
                  </p>
                  <div className="pt-2 border-t border-orange-100 text-xs text-text-muted flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="font-bold text-saffron">Recommended Action:</span> Review capital allocation split for Q3-Q4 PMKVY 4.0 district allocations.
                    </div>
                    <button
                      onClick={() => alert('Advisory noted. Added to Annual Planning Agenda.')}
                      className="bg-saffron hover:bg-orange-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap self-start sm:self-auto"
                    >
                      Add to Planning Agenda
                    </button>
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

      {/* ======================================================== */}
      {/* MODAL 4: OUTCOME EVIDENCE TRAIL DOSSIER (Pillar 5) */}
      {/* ======================================================== */}
      {selectedEvidenceStudent && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-5 shadow-2xl border border-gray-200 max-h-[90vh] overflow-y-auto text-xs"
          >
            {/* Header */}
            <div className="flex justify-between items-start pb-3 border-b border-gray-100">
              <div>
                <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-saffron uppercase tracking-wider mb-1 font-mono">
                  <ShieldCheck size={13} /> Outcome Evidence Trail • {selectedEvidenceStudent.id}
                </div>
                <h3 className="text-xl font-bold text-primary-navy">{selectedEvidenceStudent.name}</h3>
                <p className="text-text-muted">
                  {selectedEvidenceStudent.district} • {selectedEvidenceStudent.program} • {selectedEvidenceStudent.provider}
                </p>
              </div>
              <button
                onClick={() => setSelectedEvidenceStudent(null)}
                className="text-text-muted hover:text-text-dark font-bold text-lg p-1"
              >
                ✕
              </button>
            </div>

            {/* Holy Trinity Triad Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Evidence Status */}
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                <span className="text-[10px] uppercase font-bold text-text-muted block">Evidence Classification</span>
                <span
                  className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold border mt-1 ${
                    selectedEvidenceStudent.evidenceStatus === 'Verified Outcome'
                      ? 'bg-green-50 text-success-green border-green-200'
                      : selectedEvidenceStudent.evidenceStatus === 'Needs Review'
                      ? 'bg-amber-50 text-amber-800 border-amber-200'
                      : selectedEvidenceStudent.evidenceStatus === 'Conflicted'
                      ? 'bg-red-50 text-red-700 border-red-200'
                      : selectedEvidenceStudent.evidenceStatus === 'Follow-up Pending'
                      ? 'bg-blue-50 text-primary-blue border-blue-200'
                      : 'bg-gray-100 text-gray-700 border-gray-300'
                  }`}
                >
                  {selectedEvidenceStudent.evidenceStatus}
                </span>
              </div>

              {/* Confidence Score */}
              <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-200">
                <span className="text-[10px] uppercase font-bold text-text-muted block">Confidence Score</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-bold text-primary-navy">
                    {selectedEvidenceStudent.confidenceScore}%
                  </span>
                  <span className="text-[10px] text-text-muted">Triangulated</span>
                </div>
                <div className="w-full bg-blue-200 h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <div
                    className="bg-primary-blue h-full rounded-full"
                    style={{ width: `${selectedEvidenceStudent.confidenceScore}%` }}
                  />
                </div>
              </div>

              {/* Sustainable Outcome Index */}
              <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-200">
                <span className="text-[10px] uppercase font-bold text-text-muted block">Sustainable Index (SOI)</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-bold text-success-green">
                    {selectedEvidenceStudent.sustainableIndex}/100
                  </span>
                  <span className="text-[10px] text-emerald-700 font-semibold">
                    {selectedEvidenceStudent.jobRelevance} Fit
                  </span>
                </div>
                <p className="text-[10px] text-text-muted mt-1">
                  Salary: {selectedEvidenceStudent.salary > 0 ? `₹${selectedEvidenceStudent.salary.toLocaleString('en-IN')}/mo` : 'Seeking'}
                </p>
              </div>
            </div>

            {/* Evidence Triangulation Audit Breakdown (Pillar 5) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-primary-navy text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <Layers size={14} className="text-saffron" /> Triangulated Evidence Breakdown
                </h4>
                <span className="text-[10px] text-text-muted">
                  Configured Threshold: &ge; {evidencePolicy.verificationThreshold}% for Verification
                </span>
              </div>

              <div className="bg-gray-50 rounded-xl border border-gray-200 divide-y divide-gray-200 overflow-hidden">
                {selectedEvidenceStudent.evidenceTrail && selectedEvidenceStudent.evidenceTrail.length > 0 ? (
                  selectedEvidenceStudent.evidenceTrail.map((ev, i) => (
                    <div key={i} className="p-3 flex items-center justify-between gap-3 text-xs bg-white">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-primary-navy">{ev.type}</span>
                          <span className="text-[10px] font-mono px-1.5 py-0.2 bg-blue-50 text-primary-blue rounded border border-blue-200 font-semibold">
                            Weight: {ev.weight}
                          </span>
                        </div>
                        <p className="text-[11px] text-text-muted">Source: {ev.source}</p>
                      </div>
                      <div>
                        {ev.status === 'verified' && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-success-green bg-green-50 px-2 py-0.5 rounded border border-green-200">
                            <CheckCircle2 size={12} /> Verified
                          </span>
                        )}
                        {ev.status === 'pending' && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                            <Clock size={12} /> Pending Upload
                          </span>
                        )}
                        {ev.status === 'conflict' && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                            <AlertCircle size={12} /> Conflicted
                          </span>
                        )}
                        {ev.status === 'review' && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                            <Eye size={12} /> Needs Review
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-text-muted">No evidence items registered yet.</div>
                )}
              </div>
            </div>

            {/* Legal / DPDP Act & Blockchain Reference */}
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 space-y-1.5 text-[11px]">
              <div className="flex justify-between text-text-muted">
                <span>DPDP Act 2023 Consent:</span>
                <span className="font-semibold text-text-dark">Authenticated via Aadhaar OTP (Valid until 2027)</span>
              </div>
              <div className="flex justify-between text-text-muted">
                <span>Audit Telemetry Hash:</span>
                <span className="font-mono text-primary-navy">SHA-256: 7d4a...8f9e (Immutable)</span>
              </div>
              <div className="flex justify-between text-text-muted">
                <span>Last Longitudinal Checkpoint:</span>
                <span className="font-semibold text-text-dark">{selectedEvidenceStudent.followUpStatus}</span>
              </div>
            </div>

            {/* Officer Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 border-t border-gray-100">
              <button
                onClick={() => {
                  setReportToast(`Audit flag registered for ${selectedEvidenceStudent.name}. District review dispatched.`);
                  setTimeout(() => setReportToast(''), 3500);
                  setSelectedEvidenceStudent(null);
                }}
                className="w-full sm:w-auto px-4 py-2 border border-red-300 text-red-700 hover:bg-red-50 rounded-lg font-bold text-xs transition-colors"
              >
                Flag for Center Inspection
              </button>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setSelectedEvidenceStudent(null)}
                  className="w-full sm:w-auto px-4 py-2 text-text-muted hover:text-text-dark font-semibold text-xs transition-colors"
                >
                  Close Dossier
                </button>
                <button
                  onClick={() => {
                    setReportToast(`Officer approval confirmed for ${selectedEvidenceStudent.name}! Recorded in National Registry.`);
                    setTimeout(() => setReportToast(''), 3500);
                    setSelectedEvidenceStudent(null);
                  }}
                  className="w-full sm:w-auto bg-success-green hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-bold text-xs transition-colors shadow-xs"
                >
                  Approve Verified Outcome
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 5: CONFIGURABLE EVIDENCE POLICY (Pillar 4) */}
      {/* ======================================================== */}
      {showConfigPolicyModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-xl w-full p-6 space-y-5 shadow-2xl border border-gray-200 max-h-[90vh] overflow-y-auto text-xs"
          >
            {/* Header */}
            <div className="flex justify-between items-start pb-3 border-b border-gray-100">
              <div>
                <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-saffron uppercase tracking-wider mb-1 font-mono">
                  <Settings size={13} /> Pillar 4: Configurable Evidence Policy
                </div>
                <h3 className="text-xl font-bold text-primary-navy">Calibrate National Evidence Engine</h3>
                <p className="text-text-muted">
                  Configure evidence weights, data-source significance, and classification thresholds for state schemes.
                </p>
              </div>
              <button
                onClick={() => setShowConfigPolicyModal(false)}
                className="text-text-muted hover:text-text-dark font-bold text-lg p-1"
              >
                ✕
              </button>
            </div>

            {/* Presets */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold text-text-muted block">Policy Presets</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setEvidencePolicy({
                      learnerConfirmationWeight: 30,
                      supportingDocWeight: 35,
                      institutionalRosterWeight: 17,
                      providentFundCrossCheckWeight: 18,
                      verificationThreshold: 75,
                      reviewThreshold: 40,
                    })
                  }
                  className="p-2.5 rounded-lg border border-primary-navy/30 bg-blue-50/50 hover:bg-blue-100/70 text-left transition-colors"
                >
                  <span className="font-bold text-primary-navy block text-xs">Standard MSDE</span>
                  <span className="text-[10px] text-text-muted block">30 / 35 / 17 / 18</span>
                  <span className="text-[10px] text-primary-blue font-semibold">Threshold: 75% (Review: 40%)</span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setEvidencePolicy({
                      learnerConfirmationWeight: 20,
                      supportingDocWeight: 50,
                      institutionalRosterWeight: 15,
                      providentFundCrossCheckWeight: 15,
                      verificationThreshold: 80,
                      reviewThreshold: 50,
                    })
                  }
                  className="p-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-left transition-colors"
                >
                  <span className="font-bold text-text-dark block text-xs">High Assurance</span>
                  <span className="text-[10px] text-text-muted block">20 / 50 / 15 / 15</span>
                  <span className="text-[10px] text-saffron font-semibold">Threshold: 80% (Review: 50%)</span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setEvidencePolicy({
                      learnerConfirmationWeight: 45,
                      supportingDocWeight: 25,
                      institutionalRosterWeight: 15,
                      providentFundCrossCheckWeight: 15,
                      verificationThreshold: 65,
                      reviewThreshold: 35,
                    })
                  }
                  className="p-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-left transition-colors"
                >
                  <span className="font-bold text-text-dark block text-xs">Rural Low-Friction</span>
                  <span className="text-[10px] text-text-muted block">45 / 25 / 15 / 15</span>
                  <span className="text-[10px] text-success-green font-semibold">Threshold: 65% (Review: 35%)</span>
                </button>
              </div>
            </div>

            {/* Sliders / Weight Controls */}
            <div className="space-y-4 pt-2 border-t border-gray-100">
              <div className="space-y-2">
                <div className="flex justify-between font-semibold">
                  <span>1. Learner Micro-Survey Attestation Weight</span>
                  <span className="text-saffron font-bold font-mono">{evidencePolicy.learnerConfirmationWeight}%</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={60}
                  value={evidencePolicy.learnerConfirmationWeight}
                  onChange={(e) =>
                    setEvidencePolicy((prev) => ({ ...prev, learnerConfirmationWeight: Number(e.target.value) }))
                  }
                  className="w-full accent-saffron"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between font-semibold">
                  <span>2. Documentary Proof (Offer Letter / Salary Slip) Weight</span>
                  <span className="text-primary-blue font-bold font-mono">{evidencePolicy.supportingDocWeight}%</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={60}
                  value={evidencePolicy.supportingDocWeight}
                  onChange={(e) =>
                    setEvidencePolicy((prev) => ({ ...prev, supportingDocWeight: Number(e.target.value) }))
                  }
                  className="w-full accent-primary-blue"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between font-semibold">
                  <span>3. Training Center / Institutional Roster Match</span>
                  <span className="text-purple-700 font-bold font-mono">{evidencePolicy.institutionalRosterWeight}%</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={30}
                  value={evidencePolicy.institutionalRosterWeight}
                  onChange={(e) =>
                    setEvidencePolicy((prev) => ({ ...prev, institutionalRosterWeight: Number(e.target.value) }))
                  }
                  className="w-full accent-purple-700"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between font-semibold">
                  <span>4. Consistency Audit / Secondary Database Check</span>
                  <span className="text-success-green font-bold font-mono">{evidencePolicy.providentFundCrossCheckWeight}%</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={30}
                  value={evidencePolicy.providentFundCrossCheckWeight}
                  onChange={(e) =>
                    setEvidencePolicy((prev) => ({ ...prev, providentFundCrossCheckWeight: Number(e.target.value) }))
                  }
                  className="w-full accent-success-green"
                />
              </div>

              {/* Total Weight Verification */}
              {(() => {
                const total =
                  evidencePolicy.learnerConfirmationWeight +
                  evidencePolicy.supportingDocWeight +
                  evidencePolicy.institutionalRosterWeight +
                  evidencePolicy.providentFundCrossCheckWeight;
                return (
                  <div
                    className={`p-2.5 rounded-lg text-xs font-semibold flex items-center justify-between ${
                      total === 100
                        ? 'bg-green-50 text-success-green border border-green-200'
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}
                  >
                    <span>Sum of Triangulation Weights:</span>
                    <span className="font-mono font-bold">
                      {total}% {total === 100 ? '✓ (Normalized)' : '(Must sum to 100%)'}
                    </span>
                  </div>
                );
              })()}

              {/* Threshold Calibration */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                  <span className="text-[10px] uppercase font-bold text-text-muted block">Verified Threshold</span>
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="number"
                      min={60}
                      max={95}
                      value={evidencePolicy.verificationThreshold}
                      onChange={(e) =>
                        setEvidencePolicy((prev) => ({ ...prev, verificationThreshold: Number(e.target.value) }))
                      }
                      className="w-16 p-1 border rounded font-mono font-bold text-primary-navy"
                    />
                    <span className="text-[11px] text-text-muted">% or higher (Verified)</span>
                  </div>
                </div>

                <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                  <span className="text-[10px] uppercase font-bold text-text-muted block">Needs Review Threshold</span>
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="number"
                      min={25}
                      max={74}
                      value={evidencePolicy.reviewThreshold}
                      onChange={(e) =>
                        setEvidencePolicy((prev) => ({ ...prev, reviewThreshold: Number(e.target.value) }))
                      }
                      className="w-16 p-1 border rounded font-mono font-bold text-primary-navy"
                    />
                    <span className="text-[11px] text-text-muted">% to {evidencePolicy.verificationThreshold - 1}%</span>
                  </div>
                </div>
              </div>

              {/* Section 10 Decision Matrix & Section 11 Worked Example */}
              <div className="p-3 bg-slate-50 rounded-xl border border-gray-200 space-y-2 text-[11px]">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-primary-navy uppercase tracking-wider text-[10px]">
                    Section 10 &amp; 11: National Decision Matrix &amp; Worked Example
                  </span>
                  <span className="text-[10px] text-text-muted">SIH Protocol</span>
                </div>

                <div className="grid grid-cols-3 gap-1.5 text-center font-semibold text-[10px]">
                  <div className="p-1.5 bg-green-50 text-success-green border border-green-200 rounded">
                    &ge;{evidencePolicy.verificationThreshold}% &rarr; Verified Outcome
                  </div>
                  <div className="p-1.5 bg-amber-50 text-amber-800 border border-amber-200 rounded">
                    {evidencePolicy.reviewThreshold}–{evidencePolicy.verificationThreshold - 1}% &rarr; Needs Review
                  </div>
                  <div className="p-1.5 bg-red-50 text-red-700 border border-red-200 rounded">
                    &lt;{evidencePolicy.reviewThreshold}% &rarr; Unverified Outcome
                  </div>
                </div>

                <div className="p-2 bg-white rounded-lg border border-gray-200 text-text-muted space-y-1">
                  <span className="font-bold text-text-dark block">Worked Confidence Calculation (Section 11 Example):</span>
                  <p className="font-mono text-[10px] text-primary-navy">
                    Learner (+20) + Employer (+25) + Salary/Consistency (+20) + Doc (+0) + Follow-Up (+15) = <strong>80% &rarr; Verified Outcome</strong>
                  </p>
                  <p className="text-[10px] text-text-muted italic">
                    *The policy is transparent, configurable and auditable by government inspectors.
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setShowConfigPolicyModal(false)}
                className="px-4 py-2 text-text-muted hover:text-text-dark font-semibold text-xs transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setReportToast(
                    `National Evidence Policy calibrated! Verified threshold set to ${evidencePolicy.verificationThreshold}%. Live recalculation applied.`
                  );
                  setTimeout(() => setReportToast(''), 3500);
                  setShowConfigPolicyModal(false);
                }}
                className="bg-saffron hover:bg-orange-600 text-white px-5 py-2 rounded-lg font-bold text-xs transition-colors shadow-xs"
              >
                Apply &amp; Propagate Policy
              </button>
            </div>
          </motion.div>
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
