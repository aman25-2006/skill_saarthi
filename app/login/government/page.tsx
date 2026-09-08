'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Eye,
  EyeOff,
  Check,
  X,
  AlertCircle,
  CheckCircle2,
  Shield,
  Sparkles,
  BarChart3,
  TrendingUp,
  Brain,
  Landmark,
  FileCheck,
} from 'lucide-react';

type OfficerAuthMode = 'signin' | 'request-access';
type StepNumber = 1 | 2 | 3;

interface OfficerPersonalData {
  fullName: string;
  designation: string;
  employeeCode: string;
  mobile: string;
}

interface OfficerJurisdictionData {
  ministryAgency: string;
  jurisdictionLevel: 'Central' | 'State / SSDM' | 'District / DEO' | '';
  state: string;
  district: string;
}

interface OfficerAccountData {
  officialEmail: string;
  password: string;
  confirmPassword: string;
  officialDeclarationAgreed: boolean;
}

const INDIAN_STATES = [
  'Andaman and Nicobar Islands',
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chandigarh',
  'Chhattisgarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi (NCT)',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jammu and Kashmir',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Ladakh',
  'Lakshadweep',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Puducherry',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
];

const DEPARTMENTS = [
  'Ministry of Skill Development & Entrepreneurship (MSDE)',
  'National Skill Development Corporation (NSDC)',
  'National Council for Vocational Education (NCVET)',
  'Directorate General of Training (DGT)',
  'State Skill Development Mission (SSDM)',
  'District Employment & Skilling Office (DEO)',
  'Sector Skill Council (SSC)',
  'Other Central / State Nodal Body',
];

export default function GovernmentOfficerAuthPage() {
  const router = useRouter();

  // Mode: Sign In (default) or Request Access / Onboarding
  const [authMode, setAuthMode] = useState<OfficerAuthMode>('signin');

  // Multi-step access request state
  const [currentStep, setCurrentStep] = useState<StepNumber>(1);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [generatedRefId, setGeneratedRefId] = useState<string>('');

  // Password visibility states
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [showSignInPassword, setShowSignInPassword] = useState<boolean>(false);

  // Sign In Form States
  const [signInEmail, setSignInEmail] = useState<string>('');
  const [signInPassword, setSignInPassword] = useState<string>('');
  const [signInDepartment, setSignInDepartment] = useState<string>('');
  const [signInError, setSignInError] = useState<string>('');
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
  const [forgotPasswordNotice, setForgotPasswordNotice] = useState<string>('');

  // Step 1: Officer Identification
  const [personalData, setPersonalData] = useState<OfficerPersonalData>({
    fullName: '',
    designation: '',
    employeeCode: '',
    mobile: '',
  });

  // Step 2: Jurisdiction
  const [jurisdictionData, setJurisdictionData] = useState<OfficerJurisdictionData>({
    ministryAgency: '',
    jurisdictionLevel: '',
    state: '',
    district: '',
  });

  // Step 3: Account & Declaration
  const [accountData, setAccountData] = useState<OfficerAccountData>({
    officialEmail: '',
    password: '',
    confirmPassword: '',
    officialDeclarationAgreed: false,
  });

  const [isSubmittingRegistration, setIsSubmittingRegistration] = useState<boolean>(false);

  // Validation Logic for Step 3 Password
  const passwordCriteria = useMemo(() => {
    const pwd = accountData.password;
    return {
      minLength: pwd.length >= 8,
      hasUpper: /[A-Z]/.test(pwd),
      hasLower: /[a-z]/.test(pwd),
      hasNumber: /[0-9]/.test(pwd),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
    };
  }, [accountData.password]);

  const passwordStrength = useMemo(() => {
    const passedCount = Object.values(passwordCriteria).filter(Boolean).length;
    if (accountData.password.length === 0) return { score: 0, label: '', color: '' };
    if (passedCount <= 2) return { score: 1, label: 'Weak', color: 'bg-red-500 text-red-700' };
    if (passedCount <= 4) return { score: 2, label: 'Medium', color: 'bg-amber-500 text-amber-700' };
    return { score: 3, label: 'Strong', color: 'bg-success-green text-success-green' };
  }, [passwordCriteria, accountData.password]);

  const isOfficialEmailValid = useMemo(() => {
    const email = accountData.officialEmail.trim().toLowerCase();
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }, [accountData.officialEmail]);

  const isPasswordMatch = useMemo(() => {
    if (!accountData.confirmPassword) return null;
    return accountData.password === accountData.confirmPassword;
  }, [accountData.password, accountData.confirmPassword]);

  const allPasswordCriteriaMet = useMemo(() => {
    return (
      passwordCriteria.minLength &&
      passwordCriteria.hasUpper &&
      passwordCriteria.hasLower &&
      passwordCriteria.hasNumber &&
      passwordCriteria.hasSpecial
    );
  }, [passwordCriteria]);

  // Validation for Step 1
  const isStep1Valid = useMemo(() => {
    return (
      personalData.fullName.trim().length >= 3 &&
      personalData.designation.trim().length >= 2 &&
      personalData.employeeCode.trim().length >= 3 &&
      /^[0-9]{10}$/.test(personalData.mobile.trim())
    );
  }, [personalData]);

  // Validation for Step 2
  const isStep2Valid = useMemo(() => {
    if (!jurisdictionData.ministryAgency || !jurisdictionData.jurisdictionLevel) return false;
    if (jurisdictionData.jurisdictionLevel === 'Central') return true;
    if (jurisdictionData.jurisdictionLevel === 'State / SSDM') {
      return jurisdictionData.state !== '';
    }
    if (jurisdictionData.jurisdictionLevel === 'District / DEO') {
      return jurisdictionData.state !== '' && jurisdictionData.district.trim().length >= 2;
    }
    return true;
  }, [jurisdictionData]);

  // Validation for Step 3
  const isStep3Valid = useMemo(() => {
    return (
      isOfficialEmailValid &&
      allPasswordCriteriaMet &&
      isPasswordMatch === true &&
      accountData.officialDeclarationAgreed
    );
  }, [isOfficialEmailValid, allPasswordCriteriaMet, isPasswordMatch, accountData.officialDeclarationAgreed]);

  // Handle Officer Sign In
  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setSignInError('');

    const emailInput = signInEmail.trim().toLowerCase();
    const passwordInput = signInPassword;

    if (!emailInput || !passwordInput) {
      setSignInError('Please enter both official email / ID and password.');
      return;
    }

    setIsSigningIn(true);

    setTimeout(() => {
      // Demo credentials check: gov@skillsaarthi.gov.in / Gov@123 (or officer@gov.in / Sih@123)
      const isDemo =
        (emailInput === 'gov@skillsaarthi.gov.in' || emailInput === 'officer@gov.in' || emailInput === 'sih@gmail.com') &&
        (passwordInput === 'Gov@123' || passwordInput === 'Sih@123' || passwordInput === 'Gov@Officer123');

      // Also check local registered officer
      let isLocalOfficer = false;
      let matchedName = 'Officer';
      let matchedDept = signInDepartment || 'Ministry of Skill Development';

      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('skill_saarthi_officer_user');
        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            if (parsed.email && parsed.email.toLowerCase() === emailInput && parsed.password === passwordInput) {
              isLocalOfficer = true;
              matchedName = parsed.fullName || 'Officer';
              matchedDept = parsed.department || matchedDept;
            }
          } catch {
            // ignore
          }
        }
      }

      if (isDemo || isLocalOfficer) {
        if (typeof window !== 'undefined') {
          localStorage.setItem(
            'skill_saarthi_officer_session',
            JSON.stringify({
              email: emailInput,
              department: matchedDept,
              name: matchedName,
              signedInAt: new Date().toISOString(),
            })
          );
        }
        router.push('/government');
      } else {
        setIsSigningIn(false);
        setSignInError('Invalid official email or password. Please verify your credentials or use the demo account.');
      }
    }, 850);
  };

  // Handle Officer Onboarding / Access Request Submission
  const handleCompleteRequest = () => {
    if (!isStep3Valid) return;

    setIsSubmittingRegistration(true);

    const refId = `GOV-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    setGeneratedRefId(refId);

    const newOfficerProfile = {
      refId,
      email: accountData.officialEmail.trim(),
      password: accountData.password,
      fullName: personalData.fullName.trim(),
      designation: personalData.designation.trim(),
      employeeCode: personalData.employeeCode.trim(),
      mobile: personalData.mobile.trim(),
      department: jurisdictionData.ministryAgency,
      jurisdiction: jurisdictionData,
      createdAt: new Date().toISOString(),
    };

    if (typeof window !== 'undefined') {
      localStorage.setItem('skill_saarthi_officer_user', JSON.stringify(newOfficerProfile));
      localStorage.setItem(
        'skill_saarthi_officer_session',
        JSON.stringify({
          email: newOfficerProfile.email,
          refId,
          name: newOfficerProfile.fullName,
          department: newOfficerProfile.department,
        })
      );
    }

    setTimeout(() => {
      setIsSubmittingRegistration(false);
      setIsSuccess(true);
    }, 900);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-white to-amber-50/30 flex flex-col justify-between selection:bg-saffron selection:text-white">
      {/* Top Government Platform Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-saffron rounded-lg p-1"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-saffron to-orange-600 rounded-lg flex items-center justify-center shadow-md group-hover:scale-105 transition-transform text-white font-bold text-lg">
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
              <p className="text-[11px] text-text-muted mt-0.5">
                Ministry of Skill Development &amp; Entrepreneurship, GoI
              </p>
            </div>
          </Link>

          {/* Back to Home Button */}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-saffron hover:text-orange-700 px-3 py-1.5 rounded-lg hover:bg-orange-50 transition-colors focus:outline-none focus:ring-2 focus:ring-saffron"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start w-full">
          {/* LEFT COLUMN: Government Telemetry Showcase (Desktop) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="hidden lg:flex lg:col-span-5 flex-col justify-between space-y-8 sticky top-24 pt-4"
          >
            <div className="space-y-6">
              {/* Official Badge */}
              <div className="inline-flex items-center gap-2 bg-white border border-orange-200 shadow-sm px-3.5 py-1.5 rounded-full">
                <span className="w-2.5 h-2.5 rounded-full bg-saffron animate-pulse" />
                <span className="text-xs font-semibold text-saffron tracking-wide uppercase">
                  Authorized Government Access • Restricted
                </span>
              </div>

              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-primary-navy leading-tight tracking-tight">
                  Outcome Telemetry &amp; <br />
                  <span className="text-saffron">Macro Policy Governance</span>
                </h1>
                <p className="mt-3 text-base text-text-muted leading-relaxed">
                  Real-time visibility into training provider performance, cohort wage outcomes, skill gap trends, and scheme impact assessment across 700+ districts.
                </p>
              </div>

              {/* 4 Key Government Capabilities */}
              <div className="bg-white/90 backdrop-blur border border-orange-100 rounded-2xl p-6 shadow-md space-y-4">
                <p className="text-xs font-bold text-primary-navy uppercase tracking-wider flex items-center gap-2">
                  <Landmark size={15} className="text-saffron" />
                  National Executive Telemetry Pillars
                </p>

                <div className="space-y-3.5">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-orange-50 text-saffron flex items-center justify-center font-bold text-xs border border-orange-200 shadow-xs flex-shrink-0 mt-0.5">
                      <BarChart3 size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-text-dark leading-none">
                        Cohort Analytics &amp; Outcomes
                      </p>
                      <p className="text-xs text-text-muted mt-1">
                        Track longitudinal employment, wage progression, and scheme retention.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-orange-50 text-saffron flex items-center justify-center font-bold text-xs border border-orange-200 shadow-xs flex-shrink-0 mt-0.5">
                      <FileCheck size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-text-dark leading-none">
                        Training Provider Auditing
                      </p>
                      <p className="text-xs text-text-muted mt-1">
                        Real-time inspection of partner centers, NCVET compliance, and dropouts.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-orange-50 text-saffron flex items-center justify-center font-bold text-xs border border-orange-200 shadow-xs flex-shrink-0 mt-0.5">
                      <Brain size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-text-dark leading-none">
                        AI Macro Insights &amp; Alerts
                      </p>
                      <p className="text-xs text-text-muted mt-1">
                        Automated policy alerts highlighting sector-specific industry shortages.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-orange-50 text-saffron flex items-center justify-center font-bold text-xs border border-orange-200 shadow-xs flex-shrink-0 mt-0.5">
                      <TrendingUp size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-text-dark leading-none">
                        State &amp; District Telemetry
                      </p>
                      <p className="text-xs text-text-muted mt-1">
                        Cross-jurisdictional benchmarking for SSDM, DEO, and Central ministries.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Callouts */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-sm">
                  <div className="flex items-center gap-2 text-saffron font-semibold text-sm">
                    <Shield size={16} />
                    <span>Parichay SSO Ready</span>
                  </div>
                  <p className="text-xs text-text-muted mt-1">
                    Integrated with Government of India single sign-on architecture.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-sm">
                  <div className="flex items-center gap-2 text-success-green font-semibold text-sm">
                    <CheckCircle2 size={16} />
                    <span>NIC Data Compliant</span>
                  </div>
                  <p className="text-xs text-text-muted mt-1">
                    Encrypted telemetry compliant with national data standards.
                  </p>
                </div>
              </div>
            </div>

            {/* Support Note */}
            <div className="pt-4 border-t border-gray-200/80 text-xs text-text-muted">
              Official officer support hotline:{' '}
              <a href="mailto:gov-support@skillsaarthi.gov.in" className="text-saffron font-semibold hover:underline">
                gov-support@skillsaarthi.gov.in
              </a>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Interactive Officer Authentication Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="lg:col-span-7 w-full max-w-xl mx-auto"
          >
            <div className="bg-white rounded-2xl shadow-xl border border-orange-200 overflow-hidden relative">
              {/* Saffron tricolor top border accent */}
              <div className="h-1.5 bg-gradient-to-r from-saffron via-amber-400 to-orange-600 w-full" />

              {/* Card Header & Tab Switcher */}
              {!isSuccess && (
                <div className="p-6 sm:p-8 pb-4 border-b border-gray-100 bg-gradient-to-b from-orange-50/40 to-white">
                  <div className="text-center sm:text-left mb-6">
                    <div className="inline-flex items-center gap-2 text-xs font-semibold text-saffron bg-orange-50 border border-orange-200 px-3 py-1 rounded-full mb-2">
                      <Building2 size={14} />
                      Government Officer Portal
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-primary-navy tracking-tight">
                      {authMode === 'signin' ? 'Officer Sign In' : 'Request Officer Access'}
                    </h2>
                    <p className="text-sm text-text-muted mt-1">
                      {authMode === 'signin'
                        ? 'Enter your official government credentials to access the analytics portal.'
                        : 'Submit your departmental credentials for portal accreditation.'}
                    </p>
                  </div>

                  {/* Mode Switcher Tabs */}
                  <div className="grid grid-cols-2 bg-gray-100 p-1 rounded-xl relative">
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode('signin');
                        setSignInError('');
                      }}
                      className={`py-2.5 text-sm font-semibold rounded-lg transition-all relative z-10 ${
                        authMode === 'signin'
                          ? 'bg-white text-saffron shadow-sm'
                          : 'text-text-muted hover:text-text-dark'
                      }`}
                    >
                      Officer Sign In
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode('request-access');
                        setSignInError('');
                      }}
                      className={`py-2.5 text-sm font-semibold rounded-lg transition-all relative z-10 ${
                        authMode === 'request-access'
                          ? 'bg-white text-saffron shadow-sm'
                          : 'text-text-muted hover:text-text-dark'
                      }`}
                    >
                      Request Access
                    </button>
                  </div>
                </div>
              )}

              {/* Card Content Area */}
              <div className="p-6 sm:p-8">
                <AnimatePresence mode="wait">
                  {/* SUCCESS SCREEN */}
                  {isSuccess ? (
                    <motion.div
                      key="success-screen"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-6 space-y-6"
                    >
                      <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: [0, 1.2, 1] }}
                          transition={{ duration: 0.6, ease: 'easeOut' }}
                          className="w-20 h-20 bg-saffron rounded-full flex items-center justify-center text-white shadow-xl"
                        >
                          <Check size={44} strokeWidth={3} />
                        </motion.div>
                        <motion.div
                          animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0, 0.6] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute inset-0 rounded-full border-2 border-saffron"
                        />
                      </div>

                      <div>
                        <span className="text-xs font-bold text-saffron uppercase tracking-wider bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
                          Access Authorized
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-bold text-primary-navy mt-3">
                          Officer Registration Authorized!
                        </h3>
                        <p className="text-base text-text-muted mt-2">
                          Welcome,{' '}
                          <span className="font-semibold text-text-dark">{personalData.fullName}</span>!
                        </p>
                      </div>

                      <div className="bg-orange-50/70 border border-orange-200 rounded-xl p-5 text-left text-xs sm:text-sm space-y-2.5 max-w-md mx-auto">
                        <div className="flex justify-between items-center pb-2 border-b border-orange-200">
                          <span className="text-text-muted">Officer Reference ID:</span>
                          <span className="font-mono font-bold text-saffron">{generatedRefId}</span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b border-orange-200">
                          <span className="text-text-muted">Designation:</span>
                          <span className="font-medium text-text-dark">{personalData.designation}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-text-muted">Department / Body:</span>
                          <span className="font-medium text-text-dark truncate max-w-[220px]">
                            {jurisdictionData.ministryAgency}
                          </span>
                        </div>
                      </div>

                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => router.push('/government')}
                          className="w-full inline-flex items-center justify-center gap-2 bg-saffron text-white py-3.5 px-6 rounded-lg font-semibold hover:bg-orange-600 transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-saffron text-base"
                        >
                          Continue to Government Portal
                          <ArrowRight size={18} />
                        </button>
                      </div>
                    </motion.div>
                  ) : authMode === 'signin' ? (
                    /* SIGN IN MODE */
                    <motion.div
                      key="signin-mode"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-5"
                    >
                      {/* Demo Credentials Box */}
                      <div className="bg-orange-50/70 border border-orange-200 rounded-xl p-3.5 text-xs text-text-muted space-y-1">
                        <div className="flex items-center gap-1.5 text-saffron font-bold">
                          <Sparkles size={14} className="text-saffron" />
                          <span>Government Officer Demo Credentials</span>
                        </div>
                        <p className="text-xs text-text-dark">
                          Official Email:{' '}
                          <code className="text-saffron font-mono font-semibold">
                            gov@skillsaarthi.gov.in
                          </code>
                          {' • '}
                          Password:{' '}
                          <code className="text-saffron font-mono font-semibold">
                            Gov@123
                          </code>
                        </p>
                        <p className="text-[11px] text-text-muted italic">
                          (Please enter the credentials manually into the form below.)
                        </p>
                      </div>

                      {/* Error Message */}
                      {signInError && (
                        <motion.div
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-red-50 border border-red-200 text-red-700 text-xs px-3.5 py-2.5 rounded-lg flex items-center gap-2"
                        >
                          <AlertCircle size={15} className="flex-shrink-0" />
                          <span>{signInError}</span>
                        </motion.div>
                      )}

                      {/* Forgot Password / Parichay SSO Notice */}
                      {forgotPasswordNotice && (
                        <div className="bg-amber-50 border border-amber-200 text-amber-800 text-xs px-3.5 py-2.5 rounded-lg flex items-center justify-between gap-2">
                          <span>{forgotPasswordNotice}</span>
                          <button
                            type="button"
                            onClick={() => setForgotPasswordNotice('')}
                            className="text-amber-800 hover:text-amber-900 font-bold"
                          >
                            ✕
                          </button>
                        </div>
                      )}

                      <form onSubmit={handleSignIn} className="space-y-4">
                        {/* Department / Nodal Body Selector */}
                        <div className="space-y-1.5">
                          <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider">
                            Department / Nodal Agency
                          </label>
                          <select
                            value={signInDepartment}
                            onChange={(e) => setSignInDepartment(e.target.value)}
                            className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-saffron focus:border-transparent transition-all bg-white"
                          >
                            <option value="">Select Department (Optional)</option>
                            {DEPARTMENTS.map((dept) => (
                              <option key={dept} value={dept}>
                                {dept}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Official Email Field */}
                        <div className="space-y-1.5">
                          <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider">
                            Official Email Address / Officer ID <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={signInEmail}
                            onChange={(e) => setSignInEmail(e.target.value)}
                            placeholder="e.g. gov@skillsaarthi.gov.in or officer@gov.in"
                            className="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-saffron focus:border-transparent transition-all"
                          />
                        </div>

                        {/* Password Field */}
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider">
                              Password <span className="text-red-500">*</span>
                            </label>
                            <button
                              type="button"
                              onClick={() =>
                                setForgotPasswordNotice(
                                  'Officer recovery is routed through Parichay NIC SSO or registered nodal credentials. For this demo, use Gov@123.'
                                )
                              }
                              className="text-xs text-saffron hover:underline font-semibold focus:outline-none"
                            >
                              Forgot Password?
                            </button>
                          </div>
                          <div className="relative">
                            <input
                              type={showSignInPassword ? 'text' : 'password'}
                              required
                              value={signInPassword}
                              onChange={(e) => setSignInPassword(e.target.value)}
                              placeholder="e.g. Gov@123"
                              className="w-full px-4 py-2.5 pr-11 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-saffron focus:border-transparent transition-all"
                            />
                            <button
                              type="button"
                              onClick={() => setShowSignInPassword(!showSignInPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-dark p-1 focus:outline-none"
                              aria-label={showSignInPassword ? 'Hide password' : 'Show password'}
                            >
                              {showSignInPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                          </div>
                        </div>

                        {/* Primary Button */}
                        <div className="pt-2">
                          <button
                            type="submit"
                            disabled={isSigningIn}
                            className="w-full inline-flex items-center justify-center gap-2 bg-saffron text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-600 transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-saffron text-sm disabled:opacity-70"
                          >
                            {isSigningIn ? (
                              <>
                                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Verifying with Government Gateway...
                              </>
                            ) : (
                              <>
                                Access Officer Portal
                                <ArrowRight size={16} />
                              </>
                            )}
                          </button>
                        </div>
                      </form>

                      {/* Bottom Mode Switch Link */}
                      <div className="pt-4 border-t border-gray-100 text-center text-xs sm:text-sm text-text-muted">
                        New government stakeholder?{' '}
                        <button
                          type="button"
                          onClick={() => {
                            setAuthMode('request-access');
                            setSignInError('');
                          }}
                          className="font-semibold text-saffron hover:text-orange-700 hover:underline ml-1"
                        >
                          Request Officer Access
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    /* REQUEST ACCESS / ONBOARDING MODE */
                    <motion.div
                      key="request-access-mode"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      {/* Step Progress Bar */}
                      <div>
                        <div className="flex items-center justify-between text-xs font-semibold mb-2">
                          <span className="text-saffron">Step 0{currentStep} of 03</span>
                          <span className="text-text-muted">
                            {currentStep === 1 && 'Officer Identification'}
                            {currentStep === 2 && 'Department & Jurisdiction'}
                            {currentStep === 3 && 'Credentials & Oath'}
                          </span>
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { num: 1, label: '01 Officer Details' },
                            { num: 2, label: '02 Jurisdiction' },
                            { num: 3, label: '03 Credentials' },
                          ].map((step) => {
                            const isPast = currentStep > step.num;
                            const isCurrent = currentStep === step.num;
                            return (
                              <div key={step.num} className="space-y-1.5">
                                <div
                                  className={`h-2 rounded-full transition-all duration-300 ${
                                    isPast
                                      ? 'bg-success-green'
                                      : isCurrent
                                      ? 'bg-saffron'
                                      : 'bg-gray-200'
                                  }`}
                                />
                                <p
                                  className={`text-[11px] font-medium truncate ${
                                    isCurrent
                                      ? 'text-saffron font-bold'
                                      : isPast
                                      ? 'text-success-green'
                                      : 'text-text-muted'
                                  }`}
                                >
                                  {step.label}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* STEP 1: OFFICER IDENTIFICATION */}
                      {currentStep === 1 && (
                        <motion.div
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -12 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-4"
                        >
                          <div>
                            <h3 className="text-xl font-bold text-primary-navy">
                              Officer Identification
                            </h3>
                            <p className="text-xs sm:text-sm text-text-muted mt-0.5">
                              Enter official officer records for authorization.
                            </p>
                          </div>

                          <div className="space-y-3.5">
                            {/* Full Name */}
                            <div className="space-y-1">
                              <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider">
                                Full Name &amp; Title <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                value={personalData.fullName}
                                onChange={(e) =>
                                  setPersonalData((prev) => ({ ...prev, fullName: e.target.value }))
                                }
                                placeholder="e.g. Dr. Rajesh Verma, IAS / Nodal Officer"
                                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-saffron focus:border-transparent transition-all"
                              />
                            </div>

                            {/* Designation */}
                            <div className="space-y-1">
                              <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider">
                                Official Designation <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                value={personalData.designation}
                                onChange={(e) =>
                                  setPersonalData((prev) => ({ ...prev, designation: e.target.value }))
                                }
                                placeholder="e.g. Joint Secretary / District Nodal Director"
                                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-saffron focus:border-transparent transition-all"
                              />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                              {/* Employee Code */}
                              <div className="space-y-1">
                                <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider">
                                  Employee / Officer ID <span className="text-red-500">*</span>
                                </label>
                                <input
                                  type="text"
                                  value={personalData.employeeCode}
                                  onChange={(e) =>
                                    setPersonalData((prev) => ({
                                      ...prev,
                                      employeeCode: e.target.value,
                                    }))
                                  }
                                  placeholder="e.g. GOI-MSDE-9482"
                                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-saffron focus:border-transparent transition-all"
                                />
                              </div>

                              {/* Mobile Number */}
                              <div className="space-y-1">
                                <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider">
                                  Official Mobile <span className="text-red-500">*</span>
                                </label>
                                <div className="flex gap-2">
                                  <span className="inline-flex items-center px-2.5 text-xs font-semibold text-text-muted bg-gray-100 border border-gray-300 rounded-lg">
                                    +91
                                  </span>
                                  <input
                                    type="tel"
                                    maxLength={10}
                                    value={personalData.mobile}
                                    onChange={(e) =>
                                      setPersonalData((prev) => ({
                                        ...prev,
                                        mobile: e.target.value.replace(/\D/g, ''),
                                      }))
                                    }
                                    placeholder="e.g. 9876543210"
                                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-saffron focus:border-transparent transition-all"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Continue Button */}
                          <div className="pt-3">
                            <button
                              type="button"
                              onClick={() => isStep1Valid && setCurrentStep(2)}
                              disabled={!isStep1Valid}
                              className={`w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-semibold transition-all shadow-sm text-sm ${
                                isStep1Valid
                                  ? 'bg-saffron text-white hover:bg-orange-600 shadow-md cursor-pointer'
                                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                              }`}
                            >
                              Continue to Department &amp; Jurisdiction
                              <ArrowRight size={16} />
                            </button>
                          </div>
                        </motion.div>
                      )}

                      {/* STEP 2: DEPARTMENT & JURISDICTION */}
                      {currentStep === 2 && (
                        <motion.div
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -12 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-4"
                        >
                          <div>
                            <h3 className="text-xl font-bold text-primary-navy">
                              Department &amp; Jurisdiction
                            </h3>
                            <p className="text-xs sm:text-sm text-text-muted mt-0.5">
                              Define your administrative scope and telemetry mandate.
                            </p>
                          </div>

                          <div className="space-y-3.5">
                            {/* Ministry / Nodal Agency */}
                            <div className="space-y-1">
                              <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider">
                                Ministry / Agency <span className="text-red-500">*</span>
                              </label>
                              <select
                                value={jurisdictionData.ministryAgency}
                                onChange={(e) =>
                                  setJurisdictionData((prev) => ({
                                    ...prev,
                                    ministryAgency: e.target.value,
                                  }))
                                }
                                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-saffron focus:border-transparent transition-all bg-white"
                              >
                                <option value="">Select Ministry / Agency</option>
                                {DEPARTMENTS.map((d) => (
                                  <option key={d} value={d}>
                                    {d}
                                  </option>
                                ))}
                              </select>
                            </div>

                            {/* Jurisdiction Level */}
                            <div className="space-y-1">
                              <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider">
                                Jurisdiction Level <span className="text-red-500">*</span>
                              </label>
                              <select
                                value={jurisdictionData.jurisdictionLevel}
                                onChange={(e) =>
                                  setJurisdictionData((prev) => ({
                                    ...prev,
                                    jurisdictionLevel: e.target.value as OfficerJurisdictionData['jurisdictionLevel'],
                                  }))
                                }
                                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-saffron focus:border-transparent transition-all bg-white"
                              >
                                <option value="">Select Jurisdiction Scope</option>
                                <option value="Central">Central (National Oversight)</option>
                                <option value="State / SSDM">State / SSDM Oversight</option>
                                <option value="District / DEO">District / DEO Oversight</option>
                              </select>
                            </div>

                            {/* State Selector */}
                            {jurisdictionData.jurisdictionLevel !== 'Central' &&
                              jurisdictionData.jurisdictionLevel !== '' && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                  <div className="space-y-1">
                                    <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider">
                                      State / UT <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                      value={jurisdictionData.state}
                                      onChange={(e) =>
                                        setJurisdictionData((prev) => ({ ...prev, state: e.target.value }))
                                      }
                                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-saffron focus:border-transparent transition-all bg-white"
                                    >
                                      <option value="">Select State</option>
                                      {INDIAN_STATES.map((st) => (
                                        <option key={st} value={st}>
                                          {st}
                                        </option>
                                      ))}
                                    </select>
                                  </div>

                                  {jurisdictionData.jurisdictionLevel === 'District / DEO' && (
                                    <div className="space-y-1">
                                      <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider">
                                        District <span className="text-red-500">*</span>
                                      </label>
                                      <input
                                        type="text"
                                        value={jurisdictionData.district}
                                        onChange={(e) =>
                                          setJurisdictionData((prev) => ({
                                            ...prev,
                                            district: e.target.value,
                                          }))
                                        }
                                        placeholder="e.g. Patna / Muzaffarpur"
                                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-saffron focus:border-transparent transition-all"
                                      />
                                    </div>
                                  )}
                                </div>
                              )}
                          </div>

                          {/* Navigation Buttons */}
                          <div className="flex items-center gap-3 pt-4">
                            <button
                              type="button"
                              onClick={() => setCurrentStep(1)}
                              className="w-1/3 py-2.5 px-4 rounded-lg font-semibold border border-gray-300 text-text-dark hover:bg-gray-50 transition-all text-sm"
                            >
                              Back
                            </button>
                            <button
                              type="button"
                              onClick={() => isStep2Valid && setCurrentStep(3)}
                              disabled={!isStep2Valid}
                              className={`w-2/3 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-semibold transition-all text-sm ${
                                isStep2Valid
                                  ? 'bg-saffron text-white hover:bg-orange-600 shadow-md cursor-pointer'
                                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                              }`}
                            >
                              Continue
                              <ArrowRight size={16} />
                            </button>
                          </div>
                        </motion.div>
                      )}

                      {/* STEP 3: CREDENTIALS & OFFICIAL OATH */}
                      {currentStep === 3 && (
                        <motion.div
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -12 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-4"
                        >
                          <div>
                            <h3 className="text-xl font-bold text-primary-navy">
                              Credentials &amp; Authorization Oath
                            </h3>
                            <p className="text-xs sm:text-sm text-text-muted mt-0.5">
                              Setup officer login credentials and accept official data confidentiality.
                            </p>
                          </div>

                          <div className="space-y-3.5">
                            {/* Official Email Field */}
                            <div className="space-y-1">
                              <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider">
                                Official Email Address <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="email"
                                value={accountData.officialEmail}
                                onChange={(e) =>
                                  setAccountData((prev) => ({
                                    ...prev,
                                    officialEmail: e.target.value,
                                  }))
                                }
                                placeholder="e.g. officer@gov.in or gov@skillsaarthi.gov.in"
                                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-saffron focus:border-transparent transition-all"
                              />
                              <p className="text-[11px] text-text-muted">
                                Preferred domain formats: <code className="text-saffron">@gov.in</code>,{' '}
                                <code className="text-saffron">@nic.in</code>, or{' '}
                                <code className="text-saffron">@skillsaarthi.gov.in</code>
                              </p>
                            </div>

                            {/* Password Field */}
                            <div className="space-y-1">
                              <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider">
                                Portal Password <span className="text-red-500">*</span>
                              </label>
                              <div className="relative">
                                <input
                                  type={showPassword ? 'text' : 'password'}
                                  value={accountData.password}
                                  onChange={(e) =>
                                    setAccountData((prev) => ({ ...prev, password: e.target.value }))
                                  }
                                  placeholder="e.g. Gov@123"
                                  className="w-full px-3.5 py-2.5 pr-11 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-saffron focus:border-transparent transition-all"
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowPassword(!showPassword)}
                                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-dark p-1 focus:outline-none"
                                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                              </div>
                            </div>

                            {/* Password Strength Meter */}
                            {accountData.password.length > 0 && (
                              <div className="space-y-1.5 bg-gray-50 p-3 rounded-lg border border-gray-200/70">
                                <div className="flex items-center justify-between text-xs">
                                  <span className="text-text-muted">Password Strength:</span>
                                  <span className={`font-semibold ${passwordStrength.color}`}>
                                    {passwordStrength.label}
                                  </span>
                                </div>
                                <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{
                                      width:
                                        passwordStrength.score === 1
                                          ? '33%'
                                          : passwordStrength.score === 2
                                          ? '66%'
                                          : passwordStrength.score === 3
                                          ? '100%'
                                          : '0%',
                                    }}
                                    className={`h-full ${
                                      passwordStrength.score === 1
                                        ? 'bg-red-500'
                                        : passwordStrength.score === 2
                                        ? 'bg-amber-500'
                                        : 'bg-success-green'
                                    }`}
                                  />
                                </div>
                              </div>
                            )}

                            {/* 5-Point Requirements Checklist */}
                            <div className="bg-orange-50/60 border border-orange-200/70 rounded-lg p-3 space-y-1.5 text-xs">
                              <p className="font-semibold text-primary-navy">Security Criteria:</p>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                                <div className="flex items-center gap-1.5">
                                  <span
                                    className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${
                                      passwordCriteria.minLength
                                        ? 'bg-success-green text-white'
                                        : 'bg-gray-200 text-gray-400'
                                    }`}
                                  >
                                    {passwordCriteria.minLength ? <Check size={10} /> : <X size={10} />}
                                  </span>
                                  <span className={passwordCriteria.minLength ? 'text-success-green' : 'text-text-muted'}>
                                    Min 8 characters
                                  </span>
                                </div>

                                <div className="flex items-center gap-1.5">
                                  <span
                                    className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${
                                      passwordCriteria.hasUpper
                                        ? 'bg-success-green text-white'
                                        : 'bg-gray-200 text-gray-400'
                                    }`}
                                  >
                                    {passwordCriteria.hasUpper ? <Check size={10} /> : <X size={10} />}
                                  </span>
                                  <span className={passwordCriteria.hasUpper ? 'text-success-green' : 'text-text-muted'}>
                                    One uppercase letter
                                  </span>
                                </div>

                                <div className="flex items-center gap-1.5">
                                  <span
                                    className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${
                                      passwordCriteria.hasLower
                                        ? 'bg-success-green text-white'
                                        : 'bg-gray-200 text-gray-400'
                                    }`}
                                  >
                                    {passwordCriteria.hasLower ? <Check size={10} /> : <X size={10} />}
                                  </span>
                                  <span className={passwordCriteria.hasLower ? 'text-success-green' : 'text-text-muted'}>
                                    One lowercase letter
                                  </span>
                                </div>

                                <div className="flex items-center gap-1.5">
                                  <span
                                    className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${
                                      passwordCriteria.hasNumber
                                        ? 'bg-success-green text-white'
                                        : 'bg-gray-200 text-gray-400'
                                    }`}
                                  >
                                    {passwordCriteria.hasNumber ? <Check size={10} /> : <X size={10} />}
                                  </span>
                                  <span className={passwordCriteria.hasNumber ? 'text-success-green' : 'text-text-muted'}>
                                    One number
                                  </span>
                                </div>

                                <div className="flex items-center gap-1.5 sm:col-span-2">
                                  <span
                                    className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${
                                      passwordCriteria.hasSpecial
                                        ? 'bg-success-green text-white'
                                        : 'bg-gray-200 text-gray-400'
                                    }`}
                                  >
                                    {passwordCriteria.hasSpecial ? <Check size={10} /> : <X size={10} />}
                                  </span>
                                  <span className={passwordCriteria.hasSpecial ? 'text-success-green' : 'text-text-muted'}>
                                    One special character (@, #, $, !)
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Confirm Password */}
                            <div className="space-y-1">
                              <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider">
                                Confirm Password <span className="text-red-500">*</span>
                              </label>
                              <div className="relative">
                                <input
                                  type={showConfirmPassword ? 'text' : 'password'}
                                  value={accountData.confirmPassword}
                                  onChange={(e) =>
                                    setAccountData((prev) => ({
                                      ...prev,
                                      confirmPassword: e.target.value,
                                    }))
                                  }
                                  placeholder="e.g. Gov@123"
                                  className="w-full px-3.5 py-2.5 pr-11 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-saffron focus:border-transparent transition-all"
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-dark p-1 focus:outline-none"
                                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                                >
                                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                              </div>

                              {accountData.confirmPassword.length > 0 && (
                                <div className="pt-1 text-xs">
                                  {isPasswordMatch ? (
                                    <span className="text-success-green font-semibold flex items-center gap-1">
                                      <Check size={14} /> ✓ Passwords match
                                    </span>
                                  ) : (
                                    <span className="text-red-600 font-semibold flex items-center gap-1">
                                      <AlertCircle size={14} /> ⚠ Passwords do not match
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>

                            {/* Official Confidentiality Oath Checkbox */}
                            <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-sm space-y-2">
                              <label className="flex items-start gap-2.5 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={accountData.officialDeclarationAgreed}
                                  onChange={(e) =>
                                    setAccountData((prev) => ({
                                      ...prev,
                                      officialDeclarationAgreed: e.target.checked,
                                    }))
                                  }
                                  className="mt-0.5 w-4 h-4 text-saffron rounded border-gray-300 focus:ring-saffron"
                                />
                                <span className="text-xs font-semibold text-text-dark leading-relaxed">
                                  I certify that I am an authorized government officer representing the designated nodal agency, and agree to handle citizen skilling outcome telemetry in strict accordance with national data governance guidelines.
                                </span>
                              </label>
                            </div>
                          </div>

                          {/* Navigation Buttons */}
                          <div className="flex items-center gap-3 pt-3">
                            <button
                              type="button"
                              onClick={() => setCurrentStep(2)}
                              className="w-1/3 py-2.5 px-4 rounded-lg font-semibold border border-gray-300 text-text-dark hover:bg-gray-50 transition-all text-sm"
                            >
                              Back
                            </button>
                            <button
                              type="button"
                              onClick={handleCompleteRequest}
                              disabled={!isStep3Valid || isSubmittingRegistration}
                              className={`w-2/3 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-semibold transition-all text-sm ${
                                isStep3Valid && !isSubmittingRegistration
                                  ? 'bg-saffron text-white hover:bg-orange-600 shadow-md cursor-pointer'
                                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                              }`}
                            >
                              {isSubmittingRegistration ? (
                                <>
                                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                  Submitting Authorization...
                                </>
                              ) : (
                                <>
                                  Authorize &amp; Access Portal
                                  <ArrowRight size={16} />
                                </>
                              )}
                            </button>
                          </div>
                        </motion.div>
                      )}

                      {/* Bottom Switch to Sign In */}
                      <div className="pt-4 border-t border-gray-100 text-center text-xs sm:text-sm text-text-muted">
                        Already have officer access?{' '}
                        <button
                          type="button"
                          onClick={() => {
                            setAuthMode('signin');
                            setSignInError('');
                          }}
                          className="font-semibold text-saffron hover:text-orange-700 hover:underline ml-1"
                        >
                          Officer Sign In
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Official Government Footer */}
      <footer className="py-4 border-t border-gray-200 bg-white text-center text-xs text-text-muted">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>
            © {new Date().getFullYear()} Skill Saarthi • Ministry of Skill Development &amp; Entrepreneurship, Government of India
          </p>
          <div className="flex items-center gap-4 text-xs">
            <Link href="/" className="hover:text-saffron hover:underline">
              Terms of Use
            </Link>
            <span>•</span>
            <Link href="/" className="hover:text-saffron hover:underline">
              Confidentiality Charter
            </Link>
            <span>•</span>
            <Link href="/" className="hover:text-saffron hover:underline">
              Nodal Helpdesk
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
