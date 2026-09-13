'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  GraduationCap,
  Briefcase,
  TrendingUp,
  Award,
  BookOpen,
  CheckCircle2,
  Clock,
  LogOut,
  Sparkles,
  AlertCircle,
  Brain,
  ShieldCheck,
  User,
  ChevronRight,
  Download,
  Bell,
  Settings,
  Send,
  Check,
  Layers,
  Cpu,
  BarChart3,
  Sun,
  Moon,
  Globe,
  Star,
  ChevronDown,
  MoreHorizontal,
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { SupportedLanguage } from '@/context/translations';

type TabType =
  | 'dashboard'
  | 'profile'
  | 'training'
  | 'skills'
  | 'skill-gap'
  | 'learning'
  | 'employment'
  | 'career'
  | 'follow-up'
  | 'ai-assistant';

interface SkillItem {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  score: number;
  category: 'Technical' | 'Frameworks' | 'Soft Skills';
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export default function StudentPortalPage() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, languages } = useLanguage();

  // Active Tab
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');

  // Modals
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [showSurveyModal, setShowSurveyModal] = useState(false);
  const [showEditEmploymentModal, setShowEditEmploymentModal] = useState(false);
  const [showAddSkillModal, setShowAddSkillModal] = useState(false);
  const [showNotificationsDrawer, setShowNotificationsDrawer] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showEvidenceTrailModal, setShowEvidenceTrailModal] = useState(false);

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

  // Student State with local storage hydration
  const [studentProfile, setStudentProfile] = useState({
    fullName: 'Rahul Kumar',
    studentId: 'SS-2026-849201',
    email: 'rahul.kumar@gmail.com',
    mobile: '+91 98765 43210',
    dob: '2003-04-14',
    gender: 'Male',
    state: 'Bihar',
    district: 'Muzaffarpur',
    city: 'Muzaffarpur',
    pinCode: '842001',
    qualification: "Bachelor's Degree (BCA)",
    institution: 'Muzaffarpur Institute of Technology',
    gradYear: '2024',
    programName: 'PMKVY 4.0 - Full Stack Web & Cloud Development',
    trainingCenter: 'Muzaffarpur Center of Excellence for Skilling (NSDC Accredited)',
    trainingProgress: 100,
    company: 'TechNova Solutions Pvt. Ltd.',
    jobRole: 'Junior Software Engineer',
    currentSalary: 28000,
    joiningDate: '15 Jan 2025',
    employmentStatus: 'Employed' as 'Employed' | 'Apprenticeship' | 'Searching',
    dataSharingConsent: true,
  });

  // Hydrate from localStorage if user registered recently
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('skill_saarthi_student_user');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setStudentProfile((prev) => ({
            ...prev,
            fullName: parsed.fullName || prev.fullName,
            studentId: parsed.id || prev.studentId,
            email: parsed.email || prev.email,
            mobile: parsed.personal?.mobile ? `+91 ${parsed.personal.mobile}` : prev.mobile,
            dob: parsed.personal?.dob || prev.dob,
            gender: parsed.personal?.gender || prev.gender,
            state: parsed.personal?.state || prev.state,
            district: parsed.personal?.district || prev.district,
            city: parsed.personal?.city || prev.city,
            pinCode: parsed.personal?.pinCode || prev.pinCode,
            qualification: parsed.education?.highestQualification || prev.qualification,
            institution: parsed.education?.institution || prev.institution,
            gradYear: parsed.education?.graduationYear || prev.gradYear,
            company: parsed.skills?.companyName || prev.company,
            jobRole: parsed.skills?.jobRole || prev.jobRole,
            currentSalary: parsed.skills?.monthlySalary
              ? parseInt(parsed.skills.monthlySalary.replace(/\D/g, ''), 10) || 28000
              : prev.currentSalary,
          }));
        } catch {
          // ignore
        }
      }
    }
  }, []);

  // Skills List
  const [skillsList, setSkillsList] = useState<SkillItem[]>([
    { name: 'Python Programming', level: 'Advanced', score: 88, category: 'Technical' },
    { name: 'JavaScript & React.js', level: 'Advanced', score: 82, category: 'Frameworks' },
    { name: 'PostgreSQL & SQL', level: 'Intermediate', score: 78, category: 'Technical' },
    { name: 'HTML5 & Tailwind CSS', level: 'Expert', score: 92, category: 'Frameworks' },
    { name: 'Node.js & Express REST APIs', level: 'Intermediate', score: 74, category: 'Technical' },
    { name: 'Git & Version Control', level: 'Advanced', score: 85, category: 'Technical' },
    { name: 'Agile Team Communication', level: 'Advanced', score: 90, category: 'Soft Skills' },
    { name: 'Problem Solving & Logic', level: 'Intermediate', score: 79, category: 'Soft Skills' },
  ]);

  // New Skill Input in Modal
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState<'Technical' | 'Frameworks' | 'Soft Skills'>('Technical');
  const [newSkillLevel, setNewSkillLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'>('Intermediate');

  // AI Skill Gap Target Role
  const [targetRole, setTargetRole] = useState<'Full Stack Developer' | 'Data Analyst' | 'Cloud DevOps Engineer' | 'Cybersecurity Analyst'>(
    'Full Stack Developer'
  );

  // Skill Gap Calculations
  const skillGapData = useMemo(() => {
    switch (targetRole) {
      case 'Full Stack Developer':
        return {
          matchScore: 78,
          criticalGaps: ['Docker & Containerization', 'Kubernetes Deployment', 'CI/CD Pipelines (GitHub Actions)'],
          secondaryGaps: ['Redis Caching', 'System Design Basics'],
          acquired: ['React.js', 'Node.js', 'PostgreSQL', 'Python', 'REST APIs', 'Git'],
          wageGrowthPotential: '+35%',
          projectedSalary: '₹38,000 – ₹45,000 / month',
        };
      case 'Cloud DevOps Engineer':
        return {
          matchScore: 56,
          criticalGaps: ['Terraform / Infrastructure as Code', 'AWS / GCP Cloud Architecture', 'Kubernetes Orchestration'],
          secondaryGaps: ['Linux Shell Scripting', 'Prometheus & Grafana Monitoring'],
          acquired: ['Python', 'Git', 'Networking Basics', 'Agile Communication'],
          wageGrowthPotential: '+55%',
          projectedSalary: '₹42,000 – ₹55,000 / month',
        };
      case 'Data Analyst':
        return {
          matchScore: 72,
          criticalGaps: ['Power BI / Tableau Dashboarding', 'Advanced Pandas & NumPy', 'Statistical Testing'],
          secondaryGaps: ['BigQuery & ETL Pipelines', 'Data Warehousing'],
          acquired: ['Python', 'SQL & Database Queries', 'Data Cleaning', 'Problem Solving'],
          wageGrowthPotential: '+30%',
          projectedSalary: '₹35,000 – ₹42,000 / month',
        };
      case 'Cybersecurity Analyst':
        return {
          matchScore: 48,
          criticalGaps: ['Network Vulnerability Scanning', 'SIEM & Threat Detection', 'Cryptography Protocols'],
          secondaryGaps: ['Ethical Hacking Tools', 'Security Compliance (ISO 27001)'],
          acquired: ['Python', 'Linux Fundamentals', 'Problem Solving'],
          wageGrowthPotential: '+45%',
          projectedSalary: '₹40,000 – ₹50,000 / month',
        };
    }
  }, [targetRole]);

  // Recommended Learning Pathways
  const recommendedCourses = [
    {
      id: 'c1',
      title: 'Containerization with Docker & Kubernetes',
      provider: 'Skill India Digital & NCVET',
      duration: '40 Hours',
      level: 'Intermediate',
      rating: 4.8,
      enrolled: false,
      tag: 'Critical Skill Gap',
      tagColor: 'bg-red-50 text-red-700 border-red-200',
    },
    {
      id: 'c2',
      title: 'Cloud Architecture & DevOps Foundations',
      provider: 'SWAYAM / NPTEL (IIT Madras)',
      duration: '60 Hours',
      level: 'Advanced',
      rating: 4.9,
      enrolled: true,
      progress: 35,
      tag: 'High Industry Demand',
      tagColor: 'bg-orange-50 text-saffron border-orange-200',
    },
    {
      id: 'c3',
      title: 'High Performance Databases & Redis Caching',
      provider: 'National Skill Development Corporation',
      duration: '25 Hours',
      level: 'Intermediate',
      rating: 4.7,
      enrolled: false,
      tag: 'Wage Accelerator',
      tagColor: 'bg-blue-50 text-primary-blue border-blue-200',
    },
  ];

  // Follow-Up Milestone State
  const [followUpMilestones, setFollowUpMilestones] = useState([
    {
      milestone: '3-Month Post-Placement Follow-Up',
      dueDate: '15 April 2025',
      status: 'Completed',
      verifiedDate: '16 April 2025',
      summary: 'Verified employment at TechNova Solutions. Wage confirmed at ₹22,000/mo.',
    },
    {
      milestone: '6-Month Post-Placement Follow-Up',
      dueDate: '15 July 2025',
      status: 'Action Required',
      verifiedDate: null,
      summary: 'Survey ready: Confirm wage progression, job retention, and training applicability.',
    },
    {
      milestone: '12-Month Post-Placement Follow-Up',
      dueDate: '15 Jan 2026',
      status: 'Upcoming',
      verifiedDate: null,
      summary: 'Longitudinal stability tracking & annual wage growth analysis.',
    },
    {
      milestone: '24-Month Post-Placement Follow-Up',
      dueDate: '15 Jan 2027',
      status: 'Upcoming',
      verifiedDate: null,
      summary: 'Long-term skilling career mobility audit.',
    },
  ]);

  // Micro-Survey State (Pillar 3: Ultra Low-Friction 4-Step Checkpoint)
  const [microSurveyStep, setMicroSurveyStep] = useState(1);
  const [surveyFormData, setSurveyFormData] = useState({
    workingStatus: 'Yes', // 'Yes' | 'Self-employed' | 'Looking for work' | 'No' | 'Prefer not to say'
    jobRole: 'Junior Software Engineer',
    incomeBracket: '₹25,000 – ₹35,000',
    newSalary: '28000',
    trainingRelevance: 'Yes', // 'Yes' | 'Partly' | 'No'
    hasEvidenceDoc: true,
    evidenceDocType: 'Salary Slip / Offer Letter',
    feedbackNote: 'The PMKVY React & SQL modules directly helped me get this job.',
  });
  const [surveySubmitted, setSurveySubmitted] = useState(false);

  // Outcome Evidence Engine State (Pillar 1, 5, 6)
  const [outcomeEvidence, setOutcomeEvidence] = useState({
    status: 'Verified Outcome' as 'Verified Outcome' | 'Needs Review' | 'Unverified Outcome' | 'Follow-up Pending' | 'Conflicted',
    confidenceScore: 84, // 0-100%
    sustainableOutcomeIndex: 90, // Retention + Wage Progression + Job Relevance
    jobRelevanceScore: 92,
    evidenceTrail: [
      { step: 'Learner Self-Attestation', detail: 'Confirmed employment via 3M & 6M WhatsApp Micro-Surveys', weight: '+30%', status: 'verified' },
      { step: 'Documentary Verification', detail: 'Offer Letter & Recent Salary Slip authenticated', weight: '+35%', status: 'verified' },
      { step: 'Institutional Roster Match', detail: 'Placement verified against Muzaffarpur CoE training cohort', weight: '+17%', status: 'verified' },
      { step: 'Contradiction Audit', detail: 'Cross-checked with state registry; 0 anomalies detected', weight: '0%', status: 'clean' },
    ],
  });

  // Handle Micro-Survey Submission
  const handleSurveySubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSurveySubmitted(true);
    setStudentProfile((prev) => ({
      ...prev,
      currentSalary: parseInt(surveyFormData.newSalary, 10) || prev.currentSalary,
    }));
    setOutcomeEvidence((prev) => ({
      ...prev,
      confidenceScore: surveyFormData.hasEvidenceDoc ? 88 : 74,
      status: 'Verified Outcome',
    }));
    setFollowUpMilestones((prev) =>
      prev.map((m, idx) =>
        idx === 1
          ? {
              ...m,
              status: 'Completed',
              verifiedDate: 'Today',
              summary: `Confirmed retention at ${studentProfile.company}. Verified wage increment to ₹${parseInt(
                surveyFormData.newSalary,
                10
              ).toLocaleString('en-IN')}/mo. Outcome Confidence: 88%.`,
            }
          : m
      )
    );
    setTimeout(() => {
      setShowSurveyModal(false);
      setSurveySubmitted(false);
      setMicroSurveyStep(1);
    }, 1500);
  };

  // AI Chat Assistant Messages
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'assistant',
      text: `Hello ${studentProfile.fullName.split(' ')[0]}! I am your Skill Saarthi AI Career Navigator. I have analyzed your profile: you are working as a Junior Software Engineer at ₹28,000/mo. How can I help boost your skills or wage progression today?`,
      timestamp: 'Just now',
    },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);

  // Send AI Chat Message
  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || chatInput;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: 'Just now',
    };
    setChatMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setChatInput('');
    setIsAiThinking(true);

    setTimeout(() => {
      let reply = '';
      const lower = text.toLowerCase();
      if (lower.includes('salary') || lower.includes('increase') || lower.includes('45k')) {
        reply = `Based on current MSDE & NSDC market telemetry, learners in Full Stack roles in Tier-1/2 tech hubs who master Docker, Kubernetes, and System Design command an average wage of ₹42,000 to ₹48,000 within 18 months. I recommend completing the NCVET-verified "Containerization with Docker" course in your Recommended Learning tab.`;
      } else if (lower.includes('interview') || lower.includes('react')) {
        reply = `Here are 3 key technical interview questions for your current level (Junior to Mid):\n1. "Explain how React's virtual DOM reconciliation works with Fiber."\n2. "How do you optimize slow queries in PostgreSQL using composite indexes?"\n3. "Describe how you would design a REST API with JWT authentication and role-based access control."\nWould you like a sample answer for any of these?`;
      } else if (lower.includes('docker') || lower.includes('gap')) {
        reply = `Your AI Skill Gap report identified Docker and Kubernetes as high-priority gaps because 82% of hiring firms for Full Stack roles now require automated container deployments. Closing this gap can qualify you for Mid-level Engineer roles with an estimated +35% wage hike.`;
      } else {
        reply = `Great question! Looking at your verified Skill Saarthi journey, your strong background in Python and React puts you in the top 20% of your PMKVY cohort. Continuing on your learning path and submitting your 6-Month Follow-Up survey will unlock certified digital badge endorsements for top employers.`;
      }

      setChatMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          sender: 'assistant',
          text: reply,
          timestamp: 'Just now',
        },
      ]);
      setIsAiThinking(false);
    }, 700);
  };

  // Sign out handler
  const handleSignOut = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('skill_saarthi_student_session');
    }
    router.push('/login/student');
  };

  const tabDefinitions = [
    {
      id: 'dashboard' as TabType,
      label: 'Dashboard',
      labels: { en: 'Dashboard', hi: 'डैशबोर्ड', mr: 'डॅशबोर्ड' },
      desc: { en: 'Overview & telemetry KPIs', hi: 'अवलोकन व टेलीमेट्री', mr: 'विहंगावलोकन व मेट्रिक्स' },
      icon: BarChart3,
      primaryDesktop: true,
      primaryMobile: true,
    },
    {
      id: 'career' as TabType,
      label: 'Outcome Passport',
      labels: { en: 'Outcome Passport', hi: 'आउटकम पासपोर्ट', mr: 'आउटकम पासपोर्ट' },
      desc: { en: 'Longitudinal outcome continuity chain', hi: 'दीर्घकालिक परिणाम श्रृंखला', mr: 'दीर्घकालीन परिणाम साखळी' },
      icon: TrendingUp,
      primaryDesktop: true,
      primaryMobile: false,
    },
    {
      id: 'skill-gap' as TabType,
      label: 'AI Skill Gap',
      labels: { en: 'AI Skill Gap', hi: 'एआई कौशल अंतर', mr: 'एआय कौशल्य तफावत' },
      desc: { en: 'Target role matching & wage progression', hi: 'कौशल अंतर व वेतन वाढ', mr: 'कौशल्य तफावत व पगार वाढ' },
      icon: Brain,
      primaryDesktop: true,
      primaryMobile: true,
    },
    {
      id: 'learning' as TabType,
      label: 'Recommended Learning',
      labels: { en: 'Recommended Learning', hi: 'सुझाया गया प्रशिक्षण', mr: 'शिफारस केलेले प्रशिक्षण' },
      desc: { en: 'Govt accredited courses for identified gaps', hi: 'मान्यताप्राप्त अभ्यासक्रम', mr: 'मान्यताप्राप्त अभ्यासक्रम' },
      icon: Layers,
      primaryDesktop: true,
      primaryMobile: false,
    },
    {
      id: 'ai-assistant' as TabType,
      label: 'AI Assistant',
      labels: { en: 'AI Assistant', hi: 'एआई सहायक', mr: 'एआय सहाय्यक' },
      desc: { en: '24/7 multilingual vernacular career bot', hi: '24/7 बहुभाषी करिअर मदत', mr: '24/7 बहुभाषिक करिअर मदत' },
      icon: Cpu,
      primaryDesktop: true,
      primaryMobile: true,
    },
    {
      id: 'profile' as TabType,
      label: 'My Profile',
      labels: { en: 'My Profile', hi: 'मेरी प्रोफाइल', mr: 'माझी प्रोफाइल' },
      desc: { en: 'Learner dossier & National Registry info', hi: 'शिक्षार्थी रिकॉर्ड व माहिती', mr: 'विद्यार्थी नोंद व माहिती' },
      icon: User,
      primaryDesktop: false,
      primaryMobile: false,
    },
    {
      id: 'training' as TabType,
      label: 'My Training',
      labels: { en: 'My Training', hi: 'मेरा प्रशिक्षण', mr: 'माझे प्रशिक्षण' },
      desc: { en: 'PMKVY batches, center & certificate', hi: 'प्रशिक्षण केंद्र व प्रमाणपत्रे', mr: 'प्रशिक्षण केंद्र व प्रमाणपत्रे' },
      icon: BookOpen,
      primaryDesktop: false,
      primaryMobile: false,
    },
    {
      id: 'skills' as TabType,
      label: 'My Skills',
      labels: { en: 'My Skills', hi: 'मेरे कौशल', mr: 'माझी कौशल्ये' },
      desc: { en: 'Verified competency inventory & scores', hi: 'प्रमाणित कौशल्य यादी', mr: 'प्रमाणित कौशल्य यादी' },
      icon: Sparkles,
      primaryDesktop: false,
      primaryMobile: false,
    },
    {
      id: 'employment' as TabType,
      label: 'Employment',
      labels: { en: 'Employment', hi: 'रोजगार व वेतन', mr: 'रोजगार व वेतन' },
      desc: { en: 'Verified placement & salary telemetry', hi: 'नोकरी व वेतन नोंद', mr: 'नोकरी व पगार नोंद' },
      icon: Briefcase,
      primaryDesktop: false,
      primaryMobile: false,
    },
    {
      id: 'follow-up' as TabType,
      label: 'Milestones & Evidence',
      labels: { en: 'Milestones & Evidence', hi: 'पड़ाव व साक्ष्य', mr: 'टप्पे व पुरावे' },
      desc: { en: '3, 6, 12, 24M audit checkpoints', hi: 'दीर्घकालीन फॉलो-अप पड़ाव', mr: 'दीर्घकालीन पाठपुरावा टप्पे' },
      icon: Clock,
      primaryDesktop: false,
      primaryMobile: false,
    },
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-text-dark'} flex flex-col justify-between selection:bg-primary-blue selection:text-white transition-colors duration-200`}>
      {/* 1. TOP OFFICIAL GOVERNMENT PLATFORM NAVBAR */}
      <header className={`${theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-white border-gray-200'} border-b sticky top-0 z-40 shadow-xs transition-colors duration-200`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-3">
          {/* Brand Identity */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-primary-blue rounded-lg p-1"
          >
            <div className="w-9 h-9 bg-gradient-to-br from-primary-navy to-primary-blue rounded-lg flex items-center justify-center shadow-md text-white font-bold text-base">
              S
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-primary-navy'} text-base leading-none`}>
                  Skill Saarthi
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-blue-50 dark:bg-blue-900/30 text-primary-blue dark:text-sky-300 px-2 py-0.5 rounded-full border border-blue-200 dark:border-blue-800">
                  <GraduationCap size={12} />
                  Student Portal
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

          {/* Quick Actions & Profile Badge */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Selector */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-gray-200 dark:border-slate-700 text-xs font-semibold">
              <Globe size={14} className="text-primary-blue dark:text-sky-400 ml-1" />
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
                className="p-2 text-text-muted dark:text-slate-400 hover:text-primary-navy dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg relative transition-colors focus:outline-none"
                aria-label="Notifications"
              >
                <Bell size={17} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-saffron rounded-full animate-pulse" />
              </button>

              {/* Notifications Popover */}
              {showNotificationsDrawer && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl shadow-xl z-50 p-4 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-slate-700">
                    <span className="font-bold text-xs text-primary-navy dark:text-sky-300 uppercase tracking-wider">
                      Notifications (2)
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
                        setActiveTab('follow-up');
                        setShowNotificationsDrawer(false);
                      }}
                      className="p-2.5 bg-orange-50 dark:bg-amber-950/40 border border-orange-200 dark:border-amber-800/60 rounded-lg cursor-pointer hover:bg-orange-100 dark:hover:bg-amber-900/40 transition-colors"
                    >
                      <p className="font-bold text-saffron dark:text-amber-300 flex items-center gap-1">
                        <AlertCircle size={13} />
                        6-Month Follow-Up Due
                      </p>
                      <p className="text-text-muted dark:text-slate-400 mt-0.5">
                        Please confirm your wage increment &amp; job stability.
                      </p>
                    </div>
                    <div
                      onClick={() => {
                        setActiveTab('learning');
                        setShowNotificationsDrawer(false);
                      }}
                      className="p-2.5 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 rounded-lg cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
                    >
                      <p className="font-bold text-primary-blue dark:text-sky-300 flex items-center gap-1">
                        <Sparkles size={13} />
                        New Recommended Course
                      </p>
                      <p className="text-text-muted dark:text-slate-400 mt-0.5">
                        NCVET Docker course added to close your identified skill gap.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Student ID Chip */}
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-xs font-bold text-text-dark dark:text-slate-100 leading-tight">
                {studentProfile.fullName}
              </span>
              <span className="text-[10px] text-text-muted dark:text-slate-400 font-mono">
                {studentProfile.studentId}
              </span>
            </div>

            {/* Settings Button */}
            <button
              onClick={() => setShowSettingsModal(true)}
              className="p-2 text-text-muted dark:text-slate-400 hover:text-primary-navy dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors focus:outline-none"
              title="Privacy & Settings"
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
              {tabDefinitions.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                const currentLabel = tab.labels[language] || tab.label;

                if (!tab.primaryDesktop) return null;

                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id as TabType);
                      setIsMoreMenuOpen(false);
                    }}
                    className={`${tab.primaryMobile ? 'inline-flex' : 'hidden sm:inline-flex'} items-center gap-1.5 py-2 px-2.5 sm:px-3.5 text-xs font-semibold rounded-lg transition-all ${
                      isActive
                        ? 'bg-primary-navy dark:bg-sky-500 text-white shadow-xs font-bold'
                        : 'text-text-muted dark:text-slate-400 hover:text-text-dark dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Icon
                      size={14}
                      className={isActive ? 'text-white' : 'text-text-muted dark:text-slate-400'}
                    />
                    <span className="whitespace-nowrap">{currentLabel}</span>
                    {tab.id === 'ai-assistant' && (
                      <span className="hidden md:inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
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
                  tabDefinitions.some((t) => t.id === activeTab && !t.primaryDesktop)
                    ? 'border-primary-blue bg-blue-50 dark:bg-sky-950/60 text-primary-navy dark:text-sky-300 shadow-xs'
                    : 'border-gray-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-text-dark dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
                aria-label="More Options"
                title="More Options"
              >
                <MoreHorizontal size={14} />
                <span className="whitespace-nowrap">
                  {language === 'hi' ? 'अधिक' : language === 'mr' ? 'अधिक' : 'More'}
                  {tabDefinitions.some((t) => t.id === activeTab && !t.primaryDesktop) && (
                    <span className="ml-1 text-primary-blue dark:text-sky-400 font-semibold max-w-[90px] sm:max-w-none truncate inline-block align-bottom">
                      : {tabDefinitions.find((t) => t.id === activeTab)?.labels[language] || tabDefinitions.find((t) => t.id === activeTab)?.label}
                    </span>
                  )}
                </span>
                <ChevronDown
                  size={13}
                  className={`transition-transform duration-200 ${isMoreMenuOpen ? 'rotate-180 text-primary-blue dark:text-sky-400' : 'text-slate-400'}`}
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
                        {language === 'hi' ? 'अन्य उपलब्ध मॉड्यूल' : language === 'mr' ? 'इतर उपलब्ध विभाग' : 'Additional Modules'}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                        {language === 'hi' ? 'त्वरित पहुंच' : language === 'mr' ? 'द्रुत प्रवेश' : 'Quick Access'}
                      </span>
                    </div>

                    <div className="max-h-80 overflow-y-auto space-y-1 p-1">
                      {tabDefinitions
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
                                setActiveTab(tab.id as TabType);
                                setIsMoreMenuOpen(false);
                              }}
                              className={`w-full flex items-start gap-3 p-2.5 rounded-xl text-left transition-all ${
                                isActive
                                  ? 'bg-blue-50 dark:bg-sky-950/50 border border-blue-200 dark:border-blue-800/80 text-primary-navy dark:text-sky-200'
                                  : 'hover:bg-slate-50 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-300'
                              } ${tab.primaryDesktop ? 'sm:hidden' : ''}`}
                            >
                              <div
                                className={`p-2 rounded-lg shrink-0 ${
                                  isActive
                                    ? 'bg-primary-blue text-white'
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
                                    <span className="text-[10px] font-bold text-primary-blue dark:text-sky-400 flex items-center gap-0.5">
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

      {/* 4. MAIN CONTENT TABS CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <AnimatePresence mode="wait">
          {/* ======================================================== */}
          {/* VIEW 1: DASHBOARD OVERVIEW */}
          {/* ======================================================== */}
          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {/* Top Welcome Header with Outcome Evidence Engine Badge */}
              <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-6 border border-gray-200 dark:border-slate-700 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-2xl sm:text-3xl font-bold text-primary-navy dark:text-white">
                      Welcome back, {studentProfile.fullName}!
                    </h1>
                    <span className="bg-green-100 text-success-green border border-green-200 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 size={12} /> 🟢 {outcomeEvidence.status}
                    </span>
                    <button
                      onClick={() => setShowEvidenceTrailModal(true)}
                      className="text-[11px] font-bold text-primary-blue hover:text-deep-navy bg-blue-50 dark:bg-blue-950/50 dark:text-sky-300 px-2 py-0.5 rounded-full border border-blue-200 dark:border-blue-800 hover:bg-blue-100 transition-colors"
                    >
                      Audit Evidence Trail ({outcomeEvidence.confidenceScore}%) →
                    </button>
                  </div>
                  <p className="text-text-muted dark:text-slate-300 text-sm mt-1">
                    {studentProfile.jobRole} at{' '}
                    <span className="font-semibold text-text-dark dark:text-white">{studentProfile.company}</span>{' '}
                    • Cohort 2024–25 (PMKVY 4.0) • DPDP Act 2023 Consent Active
                  </p>
                </div>

                {/* Quick Action Button to Survey */}
                <button
                  onClick={() => {
                    setMicroSurveyStep(1);
                    setShowSurveyModal(true);
                  }}
                  className="inline-flex items-center gap-2 bg-saffron text-white px-5 py-2.5 rounded-lg text-xs font-semibold hover:bg-orange-600 transition-all shadow-sm focus:outline-none"
                >
                  <Clock size={14} />
                  Complete 6-Month Micro-Survey (30s)
                </button>
              </div>

              {/* 6 Holy Trinity Outcome & Quality KPI Cards (Pillar 6 & 7) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
                {/* 1. Outcome Status */}
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
                  <div className="flex items-center justify-between text-text-muted mb-2">
                    <span className="text-xs font-medium uppercase tracking-wider">Outcome Status</span>
                    <Briefcase size={16} className="text-success-green" />
                  </div>
                  <p className="text-base font-bold text-text-dark">Employed</p>
                  <p className="text-[11px] text-success-green font-semibold mt-1">🟢 Verified in Role</p>
                </div>

                {/* 2. Outcome Confidence Score (Pillar 1 & 4) */}
                <div 
                  onClick={() => setShowEvidenceTrailModal(true)}
                  className="bg-white p-4 rounded-xl border border-blue-200 shadow-xs bg-gradient-to-br from-blue-50/40 to-white cursor-pointer hover:border-primary-blue transition-all"
                >
                  <div className="flex items-center justify-between text-text-muted mb-2">
                    <span className="text-xs font-bold text-primary-blue uppercase tracking-wider">Evidence Confidence</span>
                    <ShieldCheck size={16} className="text-primary-blue" />
                  </div>
                  <p className="text-xl font-bold text-primary-navy">{outcomeEvidence.confidenceScore}%</p>
                  <p className="text-[11px] text-primary-blue font-semibold mt-1 hover:underline">Click to View Trail →</p>
                </div>

                {/* 3. Sustainable Outcome Index (Pillar 7) */}
                <div className="bg-white p-4 rounded-xl border border-purple-200 shadow-xs bg-gradient-to-br from-purple-50/40 to-white">
                  <div className="flex items-center justify-between text-text-muted mb-2">
                    <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">Sustainable Index</span>
                    <Award size={16} className="text-purple-600" />
                  </div>
                  <p className="text-xl font-bold text-purple-800">{outcomeEvidence.sustainableOutcomeIndex} / 100</p>
                  <p className="text-[11px] text-purple-600 font-semibold mt-1">Retention + Relevance</p>
                </div>

                {/* 4. Current Wage & Progression */}
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
                  <div className="flex items-center justify-between text-text-muted mb-2">
                    <span className="text-xs font-medium uppercase tracking-wider">Current Wage</span>
                    <TrendingUp size={16} className="text-saffron" />
                  </div>
                  <p className="text-base font-bold text-primary-navy">
                    ₹{studentProfile.currentSalary.toLocaleString('en-IN')} <span className="text-xs font-normal">/mo</span>
                  </p>
                  <p className="text-[11px] text-success-green font-semibold mt-1">+27% since placement</p>
                </div>

                {/* 5. Job-Training Relevance (Pillar 7) */}
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
                  <div className="flex items-center justify-between text-text-muted mb-2">
                    <span className="text-xs font-medium uppercase tracking-wider">Job Relevance</span>
                    <BookOpen size={16} className="text-primary-blue" />
                  </div>
                  <p className="text-base font-bold text-primary-navy">{outcomeEvidence.jobRelevanceScore}%</p>
                  <p className="text-[11px] text-success-green font-semibold mt-1">High Syllabus Match</p>
                </div>

                {/* 6. Next Follow-Up Checkpoint */}
                <div className="bg-white p-4 rounded-xl border border-orange-200 shadow-xs bg-gradient-to-br from-orange-50/50 to-white">
                  <div className="flex items-center justify-between text-text-muted mb-2">
                    <span className="text-xs font-bold text-saffron uppercase tracking-wider">Checkpoint</span>
                    <Clock size={16} className="text-saffron" />
                  </div>
                  <p className="text-base font-bold text-saffron">6-Month Due</p>
                  <p className="text-[11px] text-amber-700 font-semibold mt-1">Micro-Survey Ready</p>
                </div>
              </div>

              {/* Action Banner for Low-Friction Micro-Survey (Pillar 3) */}
              <div className="bg-gradient-to-r from-orange-500 via-saffron to-amber-500 text-white rounded-2xl p-5 sm:p-6 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center md:text-left">
                  <div className="inline-flex items-center gap-1.5 bg-white/20 text-white text-xs font-bold px-2.5 py-0.5 rounded-full mb-1">
                    <Clock size={12} /> Consent-Based Outcome Intelligence • 4-Tap Micro-Check
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold">
                    6-Month Outcome Passport Checkpoint is Active
                  </h3>
                  <p className="text-xs sm:text-sm text-orange-100 max-w-2xl leading-relaxed">
                    No long forms. Answer 4 quick taps in 30 seconds to update your verified wage progression, job retention, and unlock free NCVET upskilling credits.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setMicroSurveyStep(1);
                    setShowSurveyModal(true);
                  }}
                  className="bg-white text-saffron hover:bg-orange-50 px-6 py-3 rounded-lg font-bold text-xs sm:text-sm shadow-md transition-all whitespace-nowrap"
                >
                  Start 30s Micro-Survey →
                </button>
              </div>

              {/* Two Column Section: Recent Activities & Fast Navigation */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left 7 Cols: Recent Activities Feed */}
                <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
                  <h3 className="font-bold text-sm text-primary-navy uppercase tracking-wider flex items-center gap-2">
                    <Clock size={16} className="text-primary-blue" />
                    Recent Telemetry Activities
                  </h3>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-blue-50/50 rounded-xl border border-blue-100">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-primary-blue flex items-center justify-center flex-shrink-0 mt-0.5">
                        <TrendingUp size={16} />
                      </div>
                      <div className="flex-1 text-xs">
                        <div className="flex justify-between">
                          <span className="font-bold text-text-dark">Wage Progression Updated</span>
                          <span className="text-text-muted">15 July 2025</span>
                        </div>
                        <p className="text-text-muted mt-0.5">
                          Salary increased to ₹28,000/mo after semi-annual performance review at TechNova Solutions.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-green-50/50 rounded-xl border border-green-100">
                      <div className="w-8 h-8 rounded-full bg-green-100 text-success-green flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 size={16} />
                      </div>
                      <div className="flex-1 text-xs">
                        <div className="flex justify-between">
                          <span className="font-bold text-text-dark">3-Month Follow-Up Verified</span>
                          <span className="text-text-muted">16 April 2025</span>
                        </div>
                        <p className="text-text-muted mt-0.5">
                          Initial placement verified. Employer satisfaction reported at 4.5/5.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
                      <div className="w-8 h-8 rounded-full bg-gray-200 text-text-dark flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Award size={16} />
                      </div>
                      <div className="flex-1 text-xs">
                        <div className="flex justify-between">
                          <span className="font-bold text-text-dark">PMKVY 4.0 Certification Issued</span>
                          <span className="text-text-muted">10 Jan 2025</span>
                        </div>
                        <p className="text-text-muted mt-0.5">
                          Graduated from Muzaffarpur Center of Excellence with Grade A in Full Stack Development.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right 5 Cols: Quick Features Jumper */}
                <div className="lg:col-span-5 space-y-4">
                  <div
                    onClick={() => setActiveTab('skill-gap')}
                    className="p-5 bg-white rounded-2xl border border-gray-200 hover:border-primary-blue hover:shadow-md transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 text-primary-blue flex items-center justify-center group-hover:scale-105 transition-transform">
                          <Brain size={20} />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-text-dark group-hover:text-primary-blue transition-colors">
                            AI Skill Gap Engine
                          </h4>
                          <p className="text-xs text-text-muted mt-0.5">
                            Target role compatibility: <span className="font-bold text-primary-navy">78% Match</span>
                          </p>
                        </div>
                      </div>
                      <ChevronRight size={18} className="text-text-muted group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  <div
                    onClick={() => setActiveTab('career')}
                    className="p-5 bg-white rounded-2xl border border-gray-200 hover:border-primary-blue hover:shadow-md transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-orange-50 text-saffron flex items-center justify-center group-hover:scale-105 transition-transform">
                          <TrendingUp size={20} />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-text-dark group-hover:text-saffron transition-colors">
                            Longitudinal Wage Curve
                          </h4>
                          <p className="text-xs text-text-muted mt-0.5">
                            Track your ₹0 → ₹28k progression timeline
                          </p>
                        </div>
                      </div>
                      <ChevronRight size={18} className="text-text-muted group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  <div
                    onClick={() => setActiveTab('ai-assistant')}
                    className="p-5 bg-white rounded-2xl border border-gray-200 hover:border-primary-blue hover:shadow-md transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                          <Cpu size={20} />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-text-dark group-hover:text-purple-600 transition-colors">
                            AI Career Assistant
                          </h4>
                          <p className="text-xs text-text-muted mt-0.5">
                            Instant interview prep &amp; career queries
                          </p>
                        </div>
                      </div>
                      <ChevronRight size={18} className="text-text-muted group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ======================================================== */}
          {/* VIEW 2: MY PROFILE */}
          {/* ======================================================== */}
          {activeTab === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-primary-navy dark:text-white">Student Verified Profile</h2>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-200 mt-0.5 font-medium">
                    Official learner record linked with National Skilling Registry (MSDE / NSDC).
                  </p>
                </div>
                <button
                  onClick={() => alert('Official Skill Passport exported to PDF.')}
                  className="inline-flex items-center gap-2 bg-primary-navy text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-deep-navy transition-colors shadow-xs"
                >
                  <Download size={14} />
                  Download Skill Passport
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Card */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm text-center space-y-4">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-primary-navy to-primary-blue text-white flex items-center justify-center text-3xl font-bold mx-auto shadow-md">
                    {studentProfile.fullName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-primary-navy">{studentProfile.fullName}</h3>
                    <p className="text-xs text-text-muted">{studentProfile.jobRole}</p>
                    <span className="inline-block mt-2 bg-blue-50 text-primary-blue border border-blue-200 text-[11px] font-mono px-2.5 py-0.5 rounded-full font-bold">
                      {studentProfile.studentId}
                    </span>
                  </div>
                  <div className="pt-4 border-t border-gray-100 text-xs text-left space-y-2">
                    <div className="flex justify-between text-text-muted">
                      <span>Status:</span>
                      <span className="font-semibold text-success-green">Employed Regular</span>
                    </div>
                    <div className="flex justify-between text-text-muted">
                      <span>Verification:</span>
                      <span className="font-semibold text-primary-navy">Aadhaar &amp; NCVET Verified</span>
                    </div>
                  </div>
                </div>

                {/* Details Breakdown */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                  {/* Personal & Demographics */}
                  <div>
                    <h4 className="text-xs font-bold text-primary-navy uppercase tracking-wider mb-3">
                      Personal &amp; Contact Information
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="text-text-muted block">Email Address:</span>
                        <span className="font-semibold text-text-dark">{studentProfile.email}</span>
                      </div>
                      <div>
                        <span className="text-text-muted block">Mobile Number:</span>
                        <span className="font-semibold text-text-dark">{studentProfile.mobile}</span>
                      </div>
                      <div>
                        <span className="text-text-muted block">Date of Birth:</span>
                        <span className="font-semibold text-text-dark">{studentProfile.dob}</span>
                      </div>
                      <div>
                        <span className="text-text-muted block">Gender:</span>
                        <span className="font-semibold text-text-dark">{studentProfile.gender}</span>
                      </div>
                      <div className="sm:col-span-2">
                        <span className="text-text-muted block">Permanent Location:</span>
                        <span className="font-semibold text-text-dark">
                          {studentProfile.city}, {studentProfile.district}, {studentProfile.state} - {studentProfile.pinCode}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Academic Background */}
                  <div className="pt-4 border-t border-gray-100">
                    <h4 className="text-xs font-bold text-primary-navy uppercase tracking-wider mb-3">
                      Educational Qualification
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="text-text-muted block">Highest Qualification:</span>
                        <span className="font-semibold text-text-dark">{studentProfile.qualification}</span>
                      </div>
                      <div>
                        <span className="text-text-muted block">Institution / College:</span>
                        <span className="font-semibold text-text-dark">{studentProfile.institution}</span>
                      </div>
                      <div>
                        <span className="text-text-muted block">Year of Completion:</span>
                        <span className="font-semibold text-text-dark">{studentProfile.gradYear}</span>
                      </div>
                      <div>
                        <span className="text-text-muted block">Academic Level:</span>
                        <span className="font-semibold text-text-dark">Undergraduate Degree</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ======================================================== */}
          {/* VIEW 3: MY TRAINING */}
          {/* ======================================================== */}
          {activeTab === 'training' && (
            <motion.div
              key="training"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-primary-navy dark:text-white">My Skilling Program</h2>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-200 mt-0.5 font-medium">
                    Curriculum, training provider details, and verified completion certification.
                  </p>
                </div>
                <button
                  onClick={() => setShowCertificateModal(true)}
                  className="inline-flex items-center gap-2 bg-saffron text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-orange-600 transition-colors shadow-xs"
                >
                  <Award size={15} />
                  View &amp; Download Certificate
                </button>
              </div>

              {/* Main Program Card */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 pb-4 border-b border-gray-100">
                  <div>
                    <span className="bg-blue-50 text-primary-blue text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-blue-200">
                      National Skill Qualification Framework (NSQF Level 5)
                    </span>
                    <h3 className="text-xl font-bold text-primary-navy mt-1.5">{studentProfile.programName}</h3>
                    <p className="text-xs text-text-muted mt-0.5">
                      Training Center: <span className="font-semibold text-text-dark">{studentProfile.trainingCenter}</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-text-muted block">Batch Completion</span>
                    <span className="text-lg font-bold text-success-green">100% Certified (Grade A)</span>
                  </div>
                </div>

                {/* 4 Curriculum Modules Breakdown */}
                <div>
                  <h4 className="text-xs font-bold text-primary-navy uppercase tracking-wider mb-4">
                    Course Curriculum &amp; On-the-Job Modules
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-text-dark">Module 1: Web &amp; Frontend Systems</span>
                        <span className="text-success-green font-bold">100%</span>
                      </div>
                      <p className="text-text-muted text-[11px]">HTML5, CSS3, Modern JavaScript, React.js Single Page Applications</p>
                      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-success-green w-full" />
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-text-dark">Module 2: Server Architecture &amp; APIs</span>
                        <span className="text-success-green font-bold">100%</span>
                      </div>
                      <p className="text-text-muted text-[11px]">Node.js, Express framework, RESTful API architecture, Auth &amp; Security</p>
                      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-success-green w-full" />
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-text-dark">Module 3: Relational &amp; NoSQL Data</span>
                        <span className="text-success-green font-bold">100%</span>
                      </div>
                      <p className="text-text-muted text-[11px]">PostgreSQL queries, schema design, normalization, indexing and ORMs</p>
                      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-success-green w-full" />
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-text-dark">Module 4: Apprenticeship Readiness &amp; Soft Skills</span>
                        <span className="text-success-green font-bold">100%</span>
                      </div>
                      <p className="text-text-muted text-[11px]">Agile sprint workflows, Git team collaboration, workplace ethics &amp; interviews</p>
                      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-success-green w-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ======================================================== */}
          {/* VIEW 4: MY SKILLS */}
          {/* ======================================================== */}
          {activeTab === 'skills' && (
            <motion.div
              key="skills"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <h2 className="text-2xl font-bold text-primary-navy dark:text-white">Skills &amp; Competency Assessment</h2>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-200 mt-0.5 font-medium">
                    Verified skill inventory with live proficiency scores aligned to NCVET criteria.
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowAddSkillModal(true)}
                    className="bg-primary-navy text-white px-3.5 py-2 rounded-lg text-xs font-semibold hover:bg-deep-navy transition-colors shadow-xs"
                  >
                    + Add New Skill
                  </button>
                  <button
                    onClick={() => setActiveTab('skill-gap')}
                    className="bg-saffron text-white px-3.5 py-2 rounded-lg text-xs font-semibold hover:bg-orange-600 transition-colors shadow-xs"
                  >
                    Analyze AI Skill Gaps →
                  </button>
                </div>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {skillsList.map((skill) => (
                  <div
                    key={skill.name}
                    className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs space-y-3 hover:border-primary-blue transition-all"
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-text-muted uppercase">
                        {skill.category}
                      </span>
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                          skill.level === 'Expert'
                            ? 'bg-purple-50 text-purple-700'
                            : skill.level === 'Advanced'
                            ? 'bg-green-50 text-success-green'
                            : 'bg-blue-50 text-primary-blue'
                        }`}
                      >
                        {skill.level}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-bold text-sm text-text-dark">{skill.name}</h4>
                      <div className="flex justify-between text-xs text-text-muted mt-2 mb-1">
                        <span>Assessment Score:</span>
                        <span className="font-bold text-primary-navy">{skill.score}%</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            skill.score >= 85 ? 'bg-success-green' : skill.score >= 75 ? 'bg-primary-blue' : 'bg-amber-500'
                          }`}
                          style={{ width: `${skill.score}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ======================================================== */}
          {/* VIEW 5: AI SKILL GAP ANALYSIS (SIH HIGHLIGHT) */}
          {/* ======================================================== */}
          {activeTab === 'skill-gap' && (
            <motion.div
              key="skill-gap"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-blue bg-blue-50 dark:bg-blue-900/40 dark:text-sky-300 px-2.5 py-0.5 rounded-full mb-1">
                    <Brain size={13} /> SIH Core AI Capability
                  </div>
                  <h2 className="text-2xl font-bold text-primary-navy dark:text-white">AI Skill Gap Intelligence</h2>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-200 mt-0.5 font-medium">
                    Compare your verified competencies against industry target roles to unlock wage progression.
                  </p>
                </div>

                {/* Target Role Selector */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-text-muted dark:text-slate-300 font-semibold">Target Job Role:</span>
                  <select
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value as typeof targetRole)}
                    className="px-3 py-2 text-xs font-semibold rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-blue shadow-xs"
                  >
                    <option value="Full Stack Developer">Full Stack Developer</option>
                    <option value="Cloud DevOps Engineer">Cloud DevOps Engineer</option>
                    <option value="Data Analyst">Data Analyst</option>
                    <option value="Cybersecurity Analyst">Cybersecurity Analyst</option>
                  </select>
                </div>
              </div>

              {/* Top AI Match Dashboard Card */}
              <div className="bg-gradient-to-br from-white via-blue-50/20 to-light-blue p-6 rounded-2xl border border-blue-200 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Circular Score Gauge */}
                <div className="md:col-span-4 flex flex-col items-center justify-center text-center p-4 bg-white rounded-xl border border-blue-100 shadow-xs">
                  <div className="relative w-28 h-28 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-gray-200"
                        strokeWidth="3.5"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-primary-blue"
                        strokeDasharray={`${skillGapData.matchScore}, 100`}
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                      <span className="text-2xl font-bold text-primary-navy">{skillGapData.matchScore}%</span>
                      <span className="text-[10px] text-text-muted uppercase font-bold">Role Match</span>
                    </div>
                  </div>
                  <h4 className="font-bold text-sm text-primary-navy mt-3">{targetRole}</h4>
                  <p className="text-[11px] text-text-muted mt-0.5">High hiring alignment across Indian IT clusters</p>
                </div>

                {/* AI Market Prediction */}
                <div className="md:col-span-8 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3.5 bg-white rounded-xl border border-gray-200">
                      <span className="text-xs text-text-muted block">Wage Growth Potential:</span>
                      <span className="text-xl font-bold text-success-green">{skillGapData.wageGrowthPotential}</span>
                      <p className="text-[11px] text-text-muted mt-0.5">Projected CTC: {skillGapData.projectedSalary}</p>
                    </div>

                    <div className="p-3.5 bg-white rounded-xl border border-gray-200">
                      <span className="text-xs text-text-muted block">Identified Gaps:</span>
                      <span className="text-xl font-bold text-saffron">{skillGapData.criticalGaps.length} Critical Skills</span>
                      <p className="text-[11px] text-text-muted mt-0.5">Resolvable via 40h online NCVET courses</p>
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-xl border border-gray-200 space-y-2 text-xs">
                    <div className="flex items-center gap-1.5 text-primary-navy font-bold">
                      <Sparkles size={14} className="text-saffron" />
                      <span>AI Model Assessment Summary:</span>
                    </div>
                    <p className="text-text-muted leading-relaxed">
                      Learner possesses strong foundation in {skillGapData.acquired.slice(0, 3).join(', ')}. However,
                      hiring telemetry indicates 74% of employers require containerization &amp; automated CI/CD for
                      promotion to mid-level engineering compensation.
                    </p>
                  </div>
                </div>
              </div>

              {/* Detailed Gaps vs Acquired Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Critical Gaps */}
                <div className="bg-white p-6 rounded-2xl border border-red-200 shadow-sm space-y-4">
                  <h3 className="text-sm font-bold text-red-700 uppercase tracking-wider flex items-center gap-2">
                    <AlertCircle size={16} />
                    Missing Critical Skills (High Priority)
                  </h3>
                  <p className="text-xs text-text-muted">
                    Acquiring these competencies will directly close your skill deficit for {targetRole}.
                  </p>
                  <div className="space-y-2.5">
                    {skillGapData.criticalGaps.map((gap) => (
                      <div key={gap} className="p-3 bg-red-50/60 rounded-xl border border-red-100 flex items-center justify-between text-xs">
                        <span className="font-bold text-text-dark">{gap}</span>
                        <span className="text-[10px] bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded-full">Gap</span>
                      </div>
                    ))}
                    {skillGapData.secondaryGaps.map((gap) => (
                      <div key={gap} className="p-3 bg-amber-50/60 rounded-xl border border-amber-100 flex items-center justify-between text-xs">
                        <span className="font-semibold text-text-dark">{gap}</span>
                        <span className="text-[10px] bg-amber-100 text-amber-800 font-medium px-2 py-0.5 rounded-full">Secondary</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setActiveTab('learning')}
                    className="w-full mt-2 bg-saffron text-white py-2.5 rounded-lg text-xs font-bold hover:bg-orange-600 transition-colors shadow-xs"
                  >
                    View Recommended Courses to Bridge These Gaps →
                  </button>
                </div>

                {/* Acquired Skills */}
                <div className="bg-white p-6 rounded-2xl border border-green-200 shadow-sm space-y-4">
                  <h3 className="text-sm font-bold text-success-green uppercase tracking-wider flex items-center gap-2">
                    <CheckCircle2 size={16} />
                    Matched &amp; Verified Competencies
                  </h3>
                  <p className="text-xs text-text-muted">
                    Skills you have already demonstrated in your PMKVY course and assessments.
                  </p>
                  <div className="space-y-2.5">
                    {skillGapData.acquired.map((item) => (
                      <div key={item} className="p-3 bg-green-50/60 rounded-xl border border-green-100 flex items-center justify-between text-xs">
                        <span className="font-semibold text-text-dark">{item}</span>
                        <span className="text-[10px] bg-green-100 text-success-green font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Check size={11} /> Verified
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ======================================================== */}
          {/* VIEW 6: RECOMMENDED LEARNING */}
          {/* ======================================================== */}
          {activeTab === 'learning' && (
            <motion.div
              key="learning"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold text-primary-navy dark:text-white">Recommended Learning Pathways</h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-200 mt-0.5 font-medium">
                  AI-curated government-accredited courses designed to eliminate your identified skill gaps.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recommendedCourses.map((c) => (
                  <div
                    key={c.id}
                    className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-4 flex flex-col justify-between hover:shadow-md transition-all"
                  >
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${c.tagColor}`}>
                          {c.tag}
                        </span>
                        <span className="text-xs text-text-muted flex items-center gap-1">
                          <Star size={12} className="text-amber-500 fill-amber-500" /> {c.rating}
                        </span>
                      </div>

                      <div>
                        <h4 className="font-bold text-sm text-primary-navy leading-snug">{c.title}</h4>
                        <p className="text-xs text-text-muted mt-1">{c.provider}</p>
                      </div>

                      <div className="flex items-center gap-3 text-[11px] text-text-muted pt-2 border-t border-gray-100">
                        <span className="flex items-center gap-1"><Clock size={12} /> {c.duration}</span>
                        <span>•</span>
                        <span>{c.level}</span>
                      </div>

                      {c.enrolled && (
                        <div className="space-y-1 pt-1">
                          <div className="flex justify-between text-[11px]">
                            <span className="text-primary-blue font-semibold">Active Progress:</span>
                            <span className="font-bold">{c.progress}%</span>
                          </div>
                          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-primary-blue" style={{ width: `${c.progress}%` }} />
                          </div>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => alert(`Enrolled in "${c.title}" via National Digital Skilling Portal.`)}
                      className={`w-full py-2.5 rounded-lg text-xs font-bold transition-all shadow-xs ${
                        c.enrolled
                          ? 'bg-blue-50 text-primary-blue border border-blue-200 hover:bg-blue-100'
                          : 'bg-primary-navy text-white hover:bg-deep-navy'
                      }`}
                    >
                      {c.enrolled ? 'Resume Learning →' : 'Enroll Free (Govt Sponsored) →'}
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ======================================================== */}
          {/* VIEW 7: EMPLOYMENT TRACKING */}
          {/* ======================================================== */}
          {activeTab === 'employment' && (
            <motion.div
              key="employment"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-primary-navy dark:text-white">Employment &amp; Placement Record</h2>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-200 mt-0.5 font-medium">
                    Verified employment telemetry connected to longitudinal retention tracking.
                  </p>
                </div>
                <button
                  onClick={() => setShowEditEmploymentModal(true)}
                  className="bg-primary-navy text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-deep-navy transition-colors shadow-xs"
                >
                  Update Employment Info
                </button>
              </div>

              {/* Current Job Card */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-orange-50 text-saffron flex items-center justify-center font-bold text-lg border border-orange-200">
                      <Briefcase size={22} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-primary-navy">{studentProfile.jobRole}</h3>
                      <p className="text-xs text-text-muted">
                        {studentProfile.company} • Full-Time Regular
                      </p>
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-xs text-text-muted block">Current Monthly Salary</span>
                    <span className="text-xl font-bold text-success-green">
                      ₹{studentProfile.currentSalary.toLocaleString('en-IN')} <span className="text-xs font-normal">/ month</span>
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200">
                    <span className="text-text-muted block">Joining Date:</span>
                    <span className="font-bold text-text-dark text-sm">{studentProfile.joiningDate}</span>
                  </div>
                  <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200">
                    <span className="text-text-muted block">Work Location:</span>
                    <span className="font-bold text-text-dark text-sm">Patna, Bihar (Hybrid)</span>
                  </div>
                  <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200">
                    <span className="text-text-muted block">Placement Route:</span>
                    <span className="font-bold text-primary-navy text-sm">PMKVY Placement Drive</span>
                  </div>
                </div>
              </div>

              {/* Employment Journey Timeline */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                <h3 className="font-bold text-sm text-primary-navy uppercase tracking-wider">
                  Work Experience History
                </h3>
                <div className="space-y-4 text-xs border-l-2 border-blue-200 ml-3 pl-4">
                  <div className="relative">
                    <div className="absolute -left-[23px] top-1 w-3 h-3 rounded-full bg-success-green border-2 border-white" />
                    <span className="text-[10px] text-text-muted font-bold">Jan 2025 – Present</span>
                    <h4 className="font-bold text-sm text-text-dark">Junior Software Engineer</h4>
                    <p className="text-text-muted">{studentProfile.company} • ₹28,000 / month</p>
                  </div>

                  <div className="relative pt-2">
                    <div className="absolute -left-[23px] top-3 w-3 h-3 rounded-full bg-primary-blue border-2 border-white" />
                    <span className="text-[10px] text-text-muted font-bold">July 2024 – Dec 2024</span>
                    <h4 className="font-bold text-sm text-text-dark">Apprentice Web Developer</h4>
                    <p className="text-text-muted">Local IT Solutions (Muzaffarpur) • Stipend: ₹12,000 / month</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ======================================================== */}
          {/* VIEW 8: CAREER PROGRESS & WAGE PROGRESSION (SIH CORE) */}
          {/* ======================================================== */}
          {activeTab === 'career' && (
            <motion.div
              key="career"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div>
                <div className="inline-flex items-center gap-1 text-xs font-bold text-saffron bg-orange-50 dark:bg-amber-950/40 dark:text-amber-300 px-2.5 py-0.5 rounded-full mb-1">
                  <TrendingUp size={13} /> Pillar 2: Single Longitudinal Backbone
                </div>
                <h2 className="text-2xl font-bold text-primary-navy dark:text-white">National Outcome Passport</h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-200 mt-0.5 font-medium">
                  The verified longitudinal record connecting your training, certification, placement, and post-skilling livelihood growth.
                </p>
              </div>

              {/* Longitudinal Backbone Journey Map (Pillar 2) */}
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-3">
                <span className="text-xs font-bold text-primary-navy uppercase tracking-wider block">
                  Learner Outcome Continuity Chain
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 text-center text-xs">
                  {[
                    { title: '1. Training', sub: '480h Web Dev', status: 'done', color: 'bg-blue-100 text-primary-navy' },
                    { title: '2. Assessment', sub: 'Grade A Passed', status: 'done', color: 'bg-blue-100 text-primary-navy' },
                    { title: '3. Certification', sub: 'NCVET Level 5', status: 'done', color: 'bg-blue-100 text-primary-navy' },
                    { title: '4. Placement', sub: 'TechNova Sol.', status: 'done', color: 'bg-blue-100 text-primary-navy' },
                    { title: '5. Outcome Passport', sub: 'Live Telemetry', status: 'active', color: 'bg-saffron text-white font-bold shadow-xs' },
                    { title: '6. 3M Checkpoint', sub: 'Verified (₹22k)', status: 'done', color: 'bg-green-100 text-success-green' },
                    { title: '7. 6M Checkpoint', sub: 'Active (₹28k)', status: 'action', color: 'bg-orange-100 text-saffron font-bold border border-orange-300 animate-pulse' },
                    { title: '8. 12M / 24M', sub: 'Upcoming', status: 'pending', color: 'bg-gray-100 text-text-muted' },
                  ].map((step, idx) => (
                    <div key={idx} className={`p-2.5 rounded-xl flex flex-col justify-center items-center ${step.color}`}>
                      <span className="font-bold text-[11px]">{step.title}</span>
                      <span className="text-[9px] opacity-90 mt-0.5">{step.sub}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 14 Benchmark Callout: Outcome Quality Standard */}
              <div className="p-4 bg-gradient-to-r from-blue-900 via-primary-navy to-slate-900 text-white rounded-2xl border border-blue-800 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-saffron text-white">
                      Section 14 National Quality Standard
                    </span>
                    <span className="font-bold text-white text-sm">Outcome Quality ≠ Day-1 Placement</span>
                  </div>
                  <p className="text-blue-100 text-[11px] leading-relaxed">
                    National benchmark comparison (e.g., Automotive Welder — Nashik: 82% placed, 61% retained at 6M, +18% wage growth). Your verified profile achieves a <strong className="text-emerald-300">90/100 Sustainable Outcome Index</strong> with <strong className="text-saffron">+27% wage progression</strong>.
                  </p>
                </div>
                <div className="px-3.5 py-1.5 rounded-lg bg-white/10 border border-white/20 text-amber-300 text-[11px] font-bold whitespace-nowrap self-start md:self-auto shadow-2xs">
                  ✓ Verified Sustainable Outcome
                </div>
              </div>

              {/* Wage Progression Visualizer */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-4 border-b border-gray-100">
                  <div>
                    <h3 className="text-base font-bold text-primary-navy">Monthly Wage Growth Timeline</h3>
                    <p className="text-xs text-text-muted">
                      Tracking baseline stipend to verified salary increases over time.
                    </p>
                  </div>
                  <div className="text-xs text-text-muted">
                    Total Wage Growth:{' '}
                    <span className="font-bold text-success-green">+133% since Apprenticeship</span>
                  </div>
                </div>

                {/* Simulated Bar Graph / Chart */}
                <div className="pt-4 pb-2">
                  <div className="grid grid-cols-4 gap-4 sm:gap-8 items-end h-56 border-b border-gray-200 pb-3">
                    {/* Stage 1: Training */}
                    <div className="flex flex-col items-center gap-2 h-full justify-end">
                      <span className="text-xs font-bold text-text-muted">₹0</span>
                      <div className="w-full bg-gray-200 rounded-t-lg h-6 flex items-center justify-center text-[10px] text-text-muted font-bold" />
                      <span className="text-[11px] font-semibold text-text-dark text-center">Training</span>
                      <span className="text-[10px] text-text-muted">Aug 2023</span>
                    </div>

                    {/* Stage 2: Apprenticeship */}
                    <div className="flex flex-col items-center gap-2 h-full justify-end">
                      <span className="text-xs font-bold text-primary-blue">₹12,000</span>
                      <div className="w-full bg-blue-200 rounded-t-lg h-24 flex items-center justify-center text-[10px] text-primary-blue font-bold" />
                      <span className="text-[11px] font-semibold text-text-dark text-center">Apprenticeship</span>
                      <span className="text-[10px] text-text-muted">Jul 2024</span>
                    </div>

                    {/* Stage 3: Initial Placement */}
                    <div className="flex flex-col items-center gap-2 h-full justify-end">
                      <span className="text-xs font-bold text-primary-navy">₹22,000</span>
                      <div className="w-full bg-primary-blue rounded-t-lg h-36 flex items-center justify-center text-[10px] text-white font-bold" />
                      <span className="text-[11px] font-semibold text-text-dark text-center">1st Job Placement</span>
                      <span className="text-[10px] text-text-muted">Jan 2025</span>
                    </div>

                    {/* Stage 4: Current 6-Month Review */}
                    <div className="flex flex-col items-center gap-2 h-full justify-end">
                      <span className="text-xs font-bold text-success-green">₹28,000</span>
                      <div className="w-full bg-success-green rounded-t-lg h-44 flex items-center justify-center text-[10px] text-white font-bold" />
                      <span className="text-[11px] font-bold text-success-green text-center">Current Wage</span>
                      <span className="text-[10px] text-text-muted">Jul 2025</span>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-100 flex items-start gap-3 text-xs text-text-muted">
                  <ShieldCheck size={18} className="text-primary-blue flex-shrink-0 mt-0.5" />
                  <p>
                    <span className="font-bold text-primary-navy">Government Outcome Benchmark:</span> This student&apos;s
                    wage of ₹28,000/mo exceeds the Bihar state skilled minimum wage threshold (₹13,850/mo) by 102%,
                    demonstrating high ROI for PMKVY 4.0 resource allocation.
                  </p>
                </div>
              </div>

              {/* Career Milestones Badges */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                <h3 className="font-bold text-sm text-primary-navy uppercase tracking-wider">
                  Verified Career Milestones
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 bg-green-50 rounded-xl border border-green-200 flex items-center gap-3">
                    <CheckCircle2 size={24} className="text-success-green flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-text-dark">Certified Graduate</h4>
                      <p className="text-text-muted">PMKVY 4.0 Full Stack Web</p>
                    </div>
                  </div>

                  <div className="p-4 bg-green-50 rounded-xl border border-green-200 flex items-center gap-3">
                    <CheckCircle2 size={24} className="text-success-green flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-text-dark">Fast-Track Placement</h4>
                      <p className="text-text-muted">Placed within 30 days of completion</p>
                    </div>
                  </div>

                  <div className="p-4 bg-green-50 rounded-xl border border-green-200 flex items-center gap-3">
                    <CheckCircle2 size={24} className="text-success-green flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-text-dark">Wage Accelerator</h4>
                      <p className="text-text-muted">Achieved &gt;25% semi-annual increment</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ======================================================== */}
          {/* VIEW 9: FOLLOW-UP MILESTONES (SIH INNOVATION) */}
          {/* ======================================================== */}
          {activeTab === 'follow-up' && (
            <motion.div
              key="follow-up"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <div className="inline-flex items-center gap-1 text-xs font-bold text-saffron bg-orange-50 dark:bg-amber-950/40 dark:text-amber-300 px-2.5 py-0.5 rounded-full mb-1">
                    <Clock size={13} /> Longitudinal Tracking Framework
                  </div>
                  <h2 className="text-2xl font-bold text-primary-navy dark:text-white">Post-Training Follow-Up Milestones</h2>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-200 mt-0.5 font-medium">
                    Standardized 3, 6, 12, and 24-month audit checkpoints to monitor job retention and career growth.
                  </p>
                </div>
                <button
                  onClick={() => setShowSurveyModal(true)}
                  className="bg-saffron text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-orange-600 transition-colors shadow-xs"
                >
                  Take 6-Month Survey Now →
                </button>
              </div>

              {/* 4 Milestones Cards */}
              <div className="space-y-4">
                {followUpMilestones.map((m, idx) => (
                  <div
                    key={m.milestone}
                    className={`bg-white p-5 rounded-2xl border shadow-xs transition-all ${
                      m.status === 'Action Required'
                        ? 'border-orange-300 ring-2 ring-orange-200'
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-3 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                            m.status === 'Completed'
                              ? 'bg-green-100 text-success-green'
                              : m.status === 'Action Required'
                              ? 'bg-orange-100 text-saffron'
                              : 'bg-gray-100 text-text-muted'
                          }`}
                        >
                          {idx + 1}
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-text-dark">{m.milestone}</h4>
                          <span className="text-[11px] text-text-muted">Due Date: {m.dueDate}</span>
                        </div>
                      </div>

                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full ${
                          m.status === 'Completed'
                            ? 'bg-green-50 text-success-green border border-green-200'
                            : m.status === 'Action Required'
                            ? 'bg-orange-50 text-saffron border border-orange-200 animate-pulse'
                            : 'bg-gray-50 text-text-muted border border-gray-200'
                        }`}
                      >
                        {m.status}
                      </span>
                    </div>

                    <div className="pt-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs">
                      <p className="text-text-muted max-w-xl">{m.summary}</p>
                      {m.status === 'Action Required' ? (
                        <button
                          onClick={() => setShowSurveyModal(true)}
                          className="bg-saffron text-white px-4 py-1.5 rounded-lg font-bold hover:bg-orange-600 transition-colors"
                        >
                          Fill Survey
                        </button>
                      ) : (
                        <span className="text-text-muted italic">
                          {m.status === 'Completed' ? '✓ Verified on portal' : 'Scheduled automatic trigger'}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ======================================================== */}
          {/* VIEW 10: AI CAREER ASSISTANT */}
          {/* ======================================================== */}
          {activeTab === 'ai-assistant' && (
            <motion.div
              key="ai-assistant"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div>
                <div className="inline-flex items-center gap-1 text-xs font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-900/60 px-2.5 py-0.5 rounded-full mb-1">
                  <Cpu size={13} /> 24/7 AI Career Mentor
                </div>
                <h2 className="text-2xl font-bold text-primary-navy dark:text-white">AI Career Assistant</h2>
                <p className="text-xs sm:text-sm text-text-muted dark:text-slate-400 mt-0.5">
                  Get personalized technical interview preparation, wage navigation, and skilling guidance.
                </p>
              </div>

              {/* Chat Container */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm flex flex-col h-[520px] overflow-hidden transition-colors">
                {/* Chat Messages */}
                <div className="flex-1 p-5 overflow-y-auto space-y-4 text-xs sm:text-sm bg-slate-50/40 dark:bg-slate-900/40">
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {msg.sender === 'assistant' && (
                        <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-300 border border-purple-200 dark:border-purple-800 flex items-center justify-center flex-shrink-0 font-bold text-xs">
                          AI
                        </div>
                      )}
                      <div
                        className={`p-3.5 rounded-2xl max-w-lg leading-relaxed whitespace-pre-line shadow-xs ${
                          msg.sender === 'user'
                            ? 'bg-primary-navy dark:bg-primary-blue text-white rounded-tr-none'
                            : 'bg-white dark:bg-slate-700/90 text-slate-900 dark:text-slate-100 border border-gray-200 dark:border-slate-600 rounded-tl-none'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {isAiThinking && (
                    <div className="flex gap-2 items-center text-xs text-text-muted dark:text-slate-400 italic">
                      <span className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" />
                      <span>AI Career Navigator is thinking...</span>
                    </div>
                  )}
                </div>

                {/* Preset Prompt Chips */}
                <div className="p-3 bg-slate-50 dark:bg-slate-900/60 border-t border-gray-200 dark:border-slate-700 flex flex-wrap gap-2 text-xs transition-colors">
                  <button
                    onClick={() => handleSendMessage('How do I increase my salary from ₹28,000 to ₹45,000?')}
                    className="bg-white dark:bg-slate-800 px-3 py-1.5 rounded-full border border-gray-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-purple-500 dark:hover:border-purple-400 hover:text-purple-600 dark:hover:text-purple-300 transition-colors shadow-xs"
                  >
                    💡 How do I reach ₹45,000/mo?
                  </button>
                  <button
                    onClick={() => handleSendMessage('Prepare me for a React.js and SQL technical interview')}
                    className="bg-white dark:bg-slate-800 px-3 py-1.5 rounded-full border border-gray-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-purple-500 dark:hover:border-purple-400 hover:text-purple-600 dark:hover:text-purple-300 transition-colors shadow-xs"
                  >
                    🎯 React interview prep questions
                  </button>
                  <button
                    onClick={() => handleSendMessage('Why did my AI skill gap report recommend Docker and Kubernetes?')}
                    className="bg-white dark:bg-slate-800 px-3 py-1.5 rounded-full border border-gray-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-purple-500 dark:hover:border-purple-400 hover:text-purple-600 dark:hover:text-purple-300 transition-colors shadow-xs"
                  >
                    🐳 Why is Docker recommended?
                  </button>
                </div>

                {/* Chat Input Box */}
                <div className="p-3 bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700 flex gap-2 transition-colors">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSendMessage();
                    }}
                    placeholder="Ask any question about skills, jobs, or salary..."
                    className="flex-1 px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all shadow-xs"
                  />
                  <button
                    onClick={() => handleSendMessage()}
                    className="bg-primary-navy dark:bg-purple-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-deep-navy dark:hover:bg-purple-700 transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <span>Send</span>
                    <Send size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* ======================================================== */}
      {/* MODAL 1: 4-STEP ULTRA LOW-FRICTION MICRO-SURVEY (PILLAR 3) */}
      {/* ======================================================== */}
      {showSurveyModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-gray-200 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-start pb-2 border-b border-gray-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-saffron bg-orange-50 px-2 py-0.5 rounded-full border border-orange-200">
                  Step {microSurveyStep} of 4 • 30-Second Micro-Check
                </span>
                <h3 className="text-lg font-bold text-primary-navy mt-1">
                  6-Month Outcome Passport Checkpoint
                </h3>
              </div>
              <button
                onClick={() => setShowSurveyModal(false)}
                className="text-text-muted hover:text-text-dark font-bold text-sm"
              >
                ✕
              </button>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-saffron h-full transition-all duration-300"
                style={{ width: `${(microSurveyStep / 4) * 100}%` }}
              />
            </div>

            {surveySubmitted ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-16 h-16 bg-green-100 text-success-green rounded-full flex items-center justify-center mx-auto text-2xl animate-bounce">
                  ✓
                </div>
                <h4 className="text-lg font-bold text-primary-navy">Outcome Passport Updated!</h4>
                <p className="text-xs text-text-muted max-w-sm mx-auto">
                  Outcome Confidence updated to <span className="font-bold text-success-green">88% (Verified Outcome 🟢)</span>. Your longitudinal record has been synced with the Ministry of Skill Development.
                </p>
                <div className="p-3 bg-green-50 rounded-xl border border-green-200 text-xs text-success-green font-semibold">
                  +100 NCVET Free Upskilling Credits Unlocked!
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                {/* STEP 1: WORKING STATUS */}
                {microSurveyStep === 1 && (
                  <div className="space-y-3">
                    <label className="block font-bold text-text-dark text-sm">
                      1. Are you currently working?
                    </label>
                    <p className="text-text-muted text-[11px]">
                      Select the option that best reflects your current livelihood status.
                    </p>
                    <div className="grid grid-cols-1 gap-2 pt-1">
                      {[
                        { id: 'Yes', title: 'Yes, in regular job', desc: 'Employed full-time or contract at TechNova Solutions' },
                        { id: 'Self-employed', title: 'Self-employed / Freelancing', desc: 'Running own venture or client projects' },
                        { id: 'Looking for work', title: 'Looking for work', desc: 'Actively interviewing for new roles' },
                        { id: 'No', title: 'Not working / Higher education', desc: 'Pursuing further degree or family commitments' },
                        { id: 'Prefer not to say', title: 'Prefer not to say', desc: 'Keep status confidential' },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => {
                            setSurveyFormData({ ...surveyFormData, workingStatus: opt.id });
                            setMicroSurveyStep(opt.id === 'Yes' || opt.id === 'Self-employed' ? 2 : 4);
                          }}
                          className={`p-3 rounded-xl border text-left flex justify-between items-center transition-all ${
                            surveyFormData.workingStatus === opt.id
                              ? 'border-primary-blue bg-blue-50/50 shadow-xs'
                              : 'border-gray-200 hover:border-gray-300 bg-white'
                          }`}
                        >
                          <div>
                            <p className="font-bold text-text-dark">{opt.title}</p>
                            <p className="text-text-muted text-[11px] mt-0.5">{opt.desc}</p>
                          </div>
                          <ChevronRight size={14} className="text-text-muted" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 2: JOB ROLE & WAGE RANGE */}
                {microSurveyStep === 2 && (
                  <div className="space-y-3">
                    <label className="block font-bold text-text-dark text-sm">
                      2. Role &amp; Monthly Income Range
                    </label>
                    <div>
                      <span className="block font-semibold text-text-dark dark:text-slate-200 mb-1">Current Job Role</span>
                      <input
                        type="text"
                        value={surveyFormData.jobRole}
                        onChange={(e) => setSurveyFormData({ ...surveyFormData, jobRole: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-blue"
                      />
                    </div>

                    <div>
                      <span className="block font-semibold text-text-dark dark:text-slate-200 mb-1">Monthly Income Bracket</span>
                      <div className="grid grid-cols-2 gap-2">
                        {['Under ₹15,000', '₹15,000 – ₹25,000', '₹25,000 – ₹35,000', '₹35,000+'].map((bracket) => (
                          <button
                            key={bracket}
                            type="button"
                            onClick={() => setSurveyFormData({ ...surveyFormData, incomeBracket: bracket })}
                            className={`p-2 rounded-lg border text-center font-semibold transition-all ${
                              surveyFormData.incomeBracket === bracket
                                ? 'bg-primary-navy dark:bg-primary-blue text-white border-primary-navy dark:border-primary-blue'
                                : 'bg-gray-50 dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-text-dark dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700'
                            }`}
                          >
                            {bracket}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="block font-semibold text-text-dark dark:text-slate-200 mb-1">Exact Verified Monthly Wage (₹)</span>
                      <input
                        type="number"
                        value={surveyFormData.newSalary}
                        onChange={(e) => setSurveyFormData({ ...surveyFormData, newSalary: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 font-bold text-primary-navy dark:text-sky-300 focus:outline-none focus:ring-2 focus:ring-primary-blue"
                      />
                    </div>

                    <div className="pt-2 flex justify-between">
                      <button
                        type="button"
                        onClick={() => setMicroSurveyStep(1)}
                        className="px-4 py-2 rounded-lg border border-gray-300 text-text-muted font-semibold"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={() => setMicroSurveyStep(3)}
                        className="bg-primary-navy text-white px-5 py-2 rounded-lg font-bold hover:bg-deep-navy"
                      >
                        Next: Job Relevance →
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: TRAINING RELEVANCE */}
                {microSurveyStep === 3 && (
                  <div className="space-y-3">
                    <label className="block font-bold text-text-dark text-sm">
                      3. Is this job related to your PMKVY course?
                    </label>
                    <p className="text-text-muted text-[11px]">
                      Measures curricular effectiveness and skill alignment for state policy planning.
                    </p>

                    <div className="grid grid-cols-1 gap-2 pt-1">
                      {[
                        { id: 'Yes', title: 'Yes, Directly Related', desc: 'Daily tasks use React, SQL, and Web Development skills', badge: '+15% Index' },
                        { id: 'Partly', title: 'Partly Related', desc: 'Uses some digital & problem solving skills learned', badge: '+8% Index' },
                        { id: 'No', title: 'No, Different Domain', desc: 'Working in non-technical or alternate field', badge: 'Flagged for Audit' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            setSurveyFormData({ ...surveyFormData, trainingRelevance: item.id });
                            setMicroSurveyStep(4);
                          }}
                          className={`p-3 rounded-xl border text-left flex justify-between items-center transition-all ${
                            surveyFormData.trainingRelevance === item.id
                              ? 'border-primary-blue bg-blue-50/50 shadow-xs'
                              : 'border-gray-200 hover:border-gray-300 bg-white'
                          }`}
                        >
                          <div>
                            <p className="font-bold text-text-dark">{item.title}</p>
                            <p className="text-text-muted text-[11px] mt-0.5">{item.desc}</p>
                          </div>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-text-dark border border-gray-200">
                            {item.badge}
                          </span>
                        </button>
                      ))}
                    </div>

                    <div className="pt-2 flex justify-start">
                      <button
                        type="button"
                        onClick={() => setMicroSurveyStep(2)}
                        className="px-4 py-2 rounded-lg border border-gray-300 text-text-muted font-semibold"
                      >
                        Back
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 4: SUPPORTING EVIDENCE (OPTIONAL +35% BOOST) */}
                {microSurveyStep === 4 && (
                  <div className="space-y-3">
                    <label className="block font-bold text-text-dark text-sm">
                      4. Supporting Evidence (Optional)
                    </label>
                    <p className="text-text-muted text-[11px]">
                      Providing supporting proof elevates your Outcome Passport to <span className="font-bold text-success-green">88% Verified Status 🟢</span>.
                    </p>

                    <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-primary-navy">Attach Proof of Outcome</span>
                        <span className="text-[10px] bg-green-100 text-success-green font-bold px-2 py-0.5 rounded-full">+35% Confidence</span>
                      </div>
                      <select
                        value={surveyFormData.evidenceDocType}
                        onChange={(e) => setSurveyFormData({ ...surveyFormData, evidenceDocType: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-blue"
                      >
                        <option value="Salary Slip / Offer Letter">Recent Salary Slip / Offer Letter (Uploaded)</option>
                        <option value="EPFO UAN Number">EPFO UAN / Social Security Number</option>
                        <option value="Self Declaration">Formal Self-Declaration</option>
                      </select>
                      <p className="text-[10px] text-text-muted">
                        ✓ TechNova_Jul2025_PaySlip.pdf attached automatically from DigiLocker.
                      </p>
                    </div>

                    <div className="p-3 bg-gray-50 rounded-xl space-y-1 text-[11px] text-text-muted">
                      <div className="flex items-center gap-2">
                        <ShieldCheck size={14} className="text-primary-blue" />
                        <span className="font-bold text-text-dark">DPDP Act 2023 Consent Declaration</span>
                      </div>
                      <p>
                        I consent to sharing this outcome evidence with MSDE for national livelihood policy planning and longitudinal skill outcome research.
                      </p>
                    </div>

                    <div className="pt-2 flex justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => setMicroSurveyStep(3)}
                        className="px-4 py-2 rounded-lg border border-gray-300 text-text-muted font-semibold"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSurveySubmit()}
                        className="bg-saffron text-white px-5 py-2.5 rounded-lg font-bold hover:bg-orange-600 shadow-sm"
                      >
                        Complete Micro-Survey (Done!) →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 1B: OUTCOME EVIDENCE TRAIL MODAL (PILLAR 5) */}
      {/* ======================================================== */}
      {showEvidenceTrailModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-gray-200"
          >
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-success-green animate-pulse" />
                <h3 className="text-sm font-bold text-primary-navy">
                  Outcome Evidence Trail — {studentProfile.studentId}
                </h3>
              </div>
              <button
                onClick={() => setShowEvidenceTrailModal(false)}
                className="text-text-muted hover:text-text-dark font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-gray-200 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-text-muted uppercase tracking-wider font-semibold">Outcome Status</span>
                  <p className="font-bold text-success-green text-sm flex items-center gap-1">
                    🟢 {outcomeEvidence.status}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-text-muted uppercase tracking-wider font-semibold">Evidence Confidence</span>
                  <p className="font-bold text-primary-navy text-xl">{outcomeEvidence.confidenceScore}%</p>
                </div>
              </div>

              <div className="p-2.5 bg-blue-50/60 rounded-lg border border-blue-100 text-[11px] text-primary-navy">
                <span className="font-semibold">Epistemic Standard:</span> Answers <em>“How strong is the available evidence supporting this reported outcome?”</em> under Government of India skilling telemetry policy.
              </div>
            </div>

            {/* Evidence Steps Trail */}
            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-primary-navy text-[11px] uppercase tracking-wider">
                Contributing Evidence Factors
              </h4>
              {outcomeEvidence.evidenceTrail.map((item, idx) => (
                <div key={idx} className="p-3 bg-white rounded-xl border border-gray-200 flex items-start justify-between gap-3 shadow-2xs">
                  <div className="space-y-0.5">
                    <p className="font-bold text-text-dark flex items-center gap-1.5">
                      <CheckCircle2 size={13} className="text-success-green flex-shrink-0" />
                      {item.step}
                    </p>
                    <p className="text-text-muted text-[11px]">{item.detail}</p>
                  </div>
                  <span className="font-mono font-bold text-xs bg-green-50 text-success-green border border-green-200 px-2 py-0.5 rounded-md whitespace-nowrap">
                    {item.weight}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-between items-center text-[11px] text-text-muted border-t border-gray-100">
              <span className="flex items-center gap-1">
                <ShieldCheck size={13} className="text-primary-blue" />
                DPDP Act 2023 Consent Validated
              </span>
              <button
                onClick={() => setShowEvidenceTrailModal(false)}
                className="bg-primary-navy text-white px-4 py-2 rounded-lg font-bold hover:bg-deep-navy text-xs"
              >
                Close Audit Trail
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 2: CERTIFICATE VIEWER MODAL */}
      {/* ======================================================== */}
      {showCertificateModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-2xl border border-gray-200"
          >
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <span className="text-xs font-bold text-primary-navy uppercase tracking-wider">
                Official National Skilling Certificate (Preview)
              </span>
              <button
                onClick={() => setShowCertificateModal(false)}
                className="text-text-muted hover:text-text-dark font-bold text-sm"
              >
                ✕
              </button>
            </div>

            {/* Certificate Canvas */}
            <div className="border-4 border-double border-primary-navy p-6 sm:p-8 rounded-xl bg-gradient-to-b from-amber-50/20 via-white to-orange-50/20 text-center space-y-4">
              <div className="w-12 h-12 bg-primary-navy text-white rounded-lg flex items-center justify-center font-bold text-xl mx-auto shadow-md">
                S
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-text-muted">
                  Ministry of Skill Development &amp; Entrepreneurship • Government of India
                </p>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-primary-navy mt-1">
                  Certificate of Competence
                </h3>
              </div>

              <p className="text-xs text-text-muted italic">This is to officially certify that</p>
              <h4 className="text-xl font-bold text-text-dark border-b border-gray-300 pb-1 inline-block px-8">
                {studentProfile.fullName}
              </h4>

              <p className="text-xs text-text-muted max-w-md mx-auto leading-relaxed">
                has successfully completed the government accredited qualification in{' '}
                <span className="font-bold text-text-dark">{studentProfile.programName}</span> (NSQF Level 5) with Grade
                A at {studentProfile.trainingCenter}.
              </p>

              <div className="pt-4 flex justify-between items-center text-[10px] text-text-muted border-t border-gray-200">
                <span>Certificate ID: MSDE-2025-Q0501-9482</span>
                <span>Issue Date: 10 Jan 2025</span>
                <span>QR Verified ✓</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowCertificateModal(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-xs font-semibold"
              >
                Close
              </button>
              <button
                onClick={() => alert('Certificate PDF downloaded.')}
                className="inline-flex items-center gap-1.5 bg-primary-navy text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-deep-navy"
              >
                <Download size={14} /> Download Verified PDF
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 3: ADD SKILL MODAL */}
      {/* ======================================================== */}
      {showAddSkillModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl border border-gray-200">
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <h3 className="text-sm font-bold text-primary-navy">Add Skill to Inventory</h3>
              <button onClick={() => setShowAddSkillModal(false)} className="text-text-muted hover:text-text-dark">
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-text-dark mb-1">Skill Name</label>
                <input
                  type="text"
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  placeholder="e.g. Docker, TypeScript, FastApi..."
                  className="w-full px-3 py-2 rounded-lg border border-gray-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-text-dark mb-1">Category</label>
                <select
                  value={newSkillCategory}
                  onChange={(e) => setNewSkillCategory(e.target.value as typeof newSkillCategory)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white"
                >
                  <option value="Technical">Technical</option>
                  <option value="Frameworks">Frameworks &amp; Libraries</option>
                  <option value="Soft Skills">Soft Skills</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-text-dark mb-1">Proficiency Level</label>
                <select
                  value={newSkillLevel}
                  onChange={(e) => setNewSkillLevel(e.target.value as typeof newSkillLevel)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white"
                >
                  <option value="Beginner">Beginner (50%)</option>
                  <option value="Intermediate">Intermediate (75%)</option>
                  <option value="Advanced">Advanced (88%)</option>
                  <option value="Expert">Expert (95%)</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 text-xs">
              <button
                onClick={() => setShowAddSkillModal(false)}
                className="px-3.5 py-2 rounded-lg border border-gray-300 font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (newSkillName.trim()) {
                    const score =
                      newSkillLevel === 'Expert' ? 95 : newSkillLevel === 'Advanced' ? 88 : newSkillLevel === 'Intermediate' ? 75 : 50;
                    setSkillsList((prev) => [
                      ...prev,
                      { name: newSkillName.trim(), category: newSkillCategory, level: newSkillLevel, score },
                    ]);
                    setNewSkillName('');
                    setShowAddSkillModal(false);
                  }
                }}
                className="bg-primary-navy text-white px-4 py-2 rounded-lg font-bold hover:bg-deep-navy"
              >
                Add Skill
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 4: UPDATE EMPLOYMENT MODAL */}
      {/* ======================================================== */}
      {showEditEmploymentModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl border border-gray-200 text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <h3 className="text-sm font-bold text-primary-navy">Update Employment Information</h3>
              <button onClick={() => setShowEditEmploymentModal(false)} className="text-text-muted hover:text-text-dark">
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block font-semibold text-text-dark mb-1">Company / Organization</label>
                <input
                  type="text"
                  value={studentProfile.company}
                  onChange={(e) => setStudentProfile({ ...studentProfile, company: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-text-dark mb-1">Job Designation</label>
                <input
                  type="text"
                  value={studentProfile.jobRole}
                  onChange={(e) => setStudentProfile({ ...studentProfile, jobRole: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-text-dark mb-1">Monthly Salary (₹)</label>
                <input
                  type="number"
                  value={studentProfile.currentSalary}
                  onChange={(e) => setStudentProfile({ ...studentProfile, currentSalary: parseInt(e.target.value, 10) || 0 })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowEditEmploymentModal(false)}
                className="px-3.5 py-2 rounded-lg border border-gray-300 font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowEditEmploymentModal(false);
                  alert('Employment records updated in longitudinal tracking database.');
                }}
                className="bg-primary-navy text-white px-4 py-2 rounded-lg font-bold hover:bg-deep-navy"
              >
                Save Record
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 5: PRIVACY & SETTINGS MODAL */}
      {/* ======================================================== */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl border border-gray-200 text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <h3 className="text-sm font-bold text-primary-navy">Privacy &amp; Data Consent Settings</h3>
              <button onClick={() => setShowSettingsModal(false)} className="text-text-muted hover:text-text-dark">
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3 p-3 bg-gray-50 rounded-xl">
                <div>
                  <span className="font-bold text-text-dark block">Outcome Telemetry Consent</span>
                  <span className="text-text-muted text-[11px]">
                    Share longitudinal wage &amp; employment data for national skilling policy improvements.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={studentProfile.dataSharingConsent}
                  onChange={(e) => setStudentProfile({ ...studentProfile, dataSharingConsent: e.target.checked })}
                  className="mt-1 w-4 h-4 text-primary-navy rounded"
                />
              </div>

              <div className="p-3 bg-gray-50 rounded-xl space-y-1 text-[11px] text-text-muted">
                <span className="font-bold text-text-dark block">Data Protection Act Compliance</span>
                <p>
                  Your information is handled strictly according to India&apos;s Digital Personal Data Protection (DPDP) Act.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowSettingsModal(false)}
                className="bg-primary-navy text-white px-4 py-2 rounded-lg font-bold hover:bg-deep-navy"
              >
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
            <span className="text-primary-navy font-semibold">Longitudinal Outcome Telemetry Active</span>
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
