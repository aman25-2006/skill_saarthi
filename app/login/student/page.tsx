'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  GraduationCap,
  Eye,
  EyeOff,
  Check,
  X,
  AlertCircle,
  CheckCircle2,
  Briefcase,
  BookOpen,
  Award,
  Sparkles,
  Shield,
  HelpCircle,
  Building,
  User,
  MapPin,
  Compass,
} from 'lucide-react';

type AuthMode = 'signup' | 'signin';
type StepNumber = 1 | 2 | 3 | 4;

interface StudentAccountData {
  email: string;
  password: string;
  confirmPassword: string;
}

interface StudentPersonalData {
  fullName: string;
  dob: string;
  gender: string;
  mobile: string;
  state: string;
  district: string;
  city: string;
  pinCode: string;
}

interface StudentEducationData {
  highestQualification: string;
  courseDegree: string;
  specialization: string;
  institution: string;
  graduationYear: string;
  educationStatus: 'Currently Studying' | 'Completed' | 'Dropped Out' | '';
}

interface StudentSkillsData {
  skills: string[];
  careerInterest: string;
  employmentStatus: 'Student / Not Employed' | 'Employed' | 'Self-Employed' | 'Apprenticeship / Internship' | '';
  companyName?: string;
  jobRole?: string;
  monthlySalary?: string;
  consentAgreed: boolean;
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

const SUGGESTED_SKILLS = [
  'Python',
  'Java',
  'JavaScript',
  'HTML/CSS',
  'SQL',
  'React.js',
  'Data Analytics',
  'Cloud Computing',
  'Communication',
  'Cybersecurity',
  'AI / Machine Learning',
  'UI/UX Design',
];

export default function StudentAuthPage() {
  const router = useRouter();

  // Mode: Sign Up (default) or Sign In
  const [authMode, setAuthMode] = useState<AuthMode>('signup');

  // Multi-step signup state
  const [currentStep, setCurrentStep] = useState<StepNumber>(1);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [generatedStudentId, setGeneratedStudentId] = useState<string>('');

  // Password visibility states
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [showSignInPassword, setShowSignInPassword] = useState<boolean>(false);

  // Step 1: Account
  const [accountData, setAccountData] = useState<StudentAccountData>({
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Step 2: Personal
  const [personalData, setPersonalData] = useState<StudentPersonalData>({
    fullName: '',
    dob: '',
    gender: '',
    mobile: '',
    state: '',
    district: '',
    city: '',
    pinCode: '',
  });

  // Step 3: Education
  const [educationData, setEducationData] = useState<StudentEducationData>({
    highestQualification: '',
    courseDegree: '',
    specialization: '',
    institution: '',
    graduationYear: '',
    educationStatus: '',
  });

  // Step 4: Skills & Career
  const [skillsData, setSkillsData] = useState<StudentSkillsData>({
    skills: [],
    careerInterest: '',
    employmentStatus: '',
    companyName: '',
    jobRole: '',
    monthlySalary: '',
    consentAgreed: false,
  });

  const [customSkillInput, setCustomSkillInput] = useState<string>('');

  // Sign In State
  const [signInEmail, setSignInEmail] = useState<string>('');
  const [signInPassword, setSignInPassword] = useState<string>('');
  const [signInError, setSignInError] = useState<string>('');
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
  const [isSubmittingRegistration, setIsSubmittingRegistration] = useState<boolean>(false);
  const [forgotPasswordNotice, setForgotPasswordNotice] = useState<string>('');

  // Validation Logic for Step 1
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

  const isEmailValid = useMemo(() => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(accountData.email.trim());
  }, [accountData.email]);

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

  const isStep1Valid = useMemo(() => {
    return isEmailValid && allPasswordCriteriaMet && isPasswordMatch === true;
  }, [isEmailValid, allPasswordCriteriaMet, isPasswordMatch]);

  // Validation Logic for Step 2
  const isStep2Valid = useMemo(() => {
    return (
      personalData.fullName.trim().length >= 2 &&
      personalData.dob !== '' &&
      personalData.gender !== '' &&
      /^[0-9]{10}$/.test(personalData.mobile.trim()) &&
      personalData.state !== '' &&
      personalData.district.trim().length >= 2 &&
      personalData.city.trim().length >= 2 &&
      /^[0-9]{6}$/.test(personalData.pinCode.trim())
    );
  }, [personalData]);

  // Validation Logic for Step 3
  const isStep3Valid = useMemo(() => {
    return (
      educationData.highestQualification !== '' &&
      educationData.courseDegree.trim().length >= 2 &&
      educationData.specialization.trim().length >= 2 &&
      educationData.institution.trim().length >= 2 &&
      educationData.graduationYear !== '' &&
      educationData.educationStatus !== ''
    );
  }, [educationData]);

  // Validation Logic for Step 4
  const isStep4Valid = useMemo(() => {
    const basicValid =
      skillsData.skills.length > 0 &&
      skillsData.careerInterest !== '' &&
      skillsData.employmentStatus !== '' &&
      skillsData.consentAgreed;

    if (!basicValid) return false;

    if (skillsData.employmentStatus === 'Employed' || skillsData.employmentStatus === 'Apprenticeship / Internship') {
      return (
        (skillsData.companyName?.trim().length ?? 0) >= 2 &&
        (skillsData.jobRole?.trim().length ?? 0) >= 2 &&
        (skillsData.monthlySalary?.trim().length ?? 0) >= 2
      );
    }

    return true;
  }, [skillsData]);

  // Skill Add / Remove Handlers
  const toggleSkill = (skill: string) => {
    setSkillsData((prev) => {
      const exists = prev.skills.includes(skill);
      if (exists) {
        return { ...prev, skills: prev.skills.filter((s) => s !== skill) };
      } else {
        return { ...prev, skills: [...prev.skills, skill] };
      }
    });
  };

  const handleAddCustomSkill = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = customSkillInput.trim();
    if (trimmed && !skillsData.skills.includes(trimmed)) {
      setSkillsData((prev) => ({
        ...prev,
        skills: [...prev.skills, trimmed],
      }));
      setCustomSkillInput('');
    }
  };

  // Sign Up Submission
  const handleCompleteRegistration = () => {
    if (!isStep4Valid) return;

    setIsSubmittingRegistration(true);

    const studentId = `SS-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    setGeneratedStudentId(studentId);

    const newStudentProfile = {
      id: studentId,
      email: accountData.email.trim(),
      password: accountData.password,
      fullName: personalData.fullName.trim(),
      personal: personalData,
      education: educationData,
      skills: skillsData,
      createdAt: new Date().toISOString(),
    };

    // Save in localStorage for prototype mock authentication
    if (typeof window !== 'undefined') {
      localStorage.setItem('skill_saarthi_student_user', JSON.stringify(newStudentProfile));
      localStorage.setItem('skill_saarthi_student_session', JSON.stringify({ email: newStudentProfile.email, studentId }));
    }

    setTimeout(() => {
      setIsSubmittingRegistration(false);
      setIsSuccess(true);
    }, 900);
  };

  // Sign In Submission
  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setSignInError('');

    const emailInput = signInEmail.trim().toLowerCase();
    const passwordInput = signInPassword;

    if (!emailInput || !passwordInput) {
      setSignInError('Please enter both email address and password.');
      return;
    }

    setIsSigningIn(true);

    setTimeout(() => {
      // Check demo credentials: sih@gmail.com / Sih@123
      const isDemo = emailInput === 'sih@gmail.com' && passwordInput === 'Sih@123';

      // Also check if matches registered local user
      let isLocalUser = false;
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('skill_saarthi_student_user');
        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            if (parsed.email && parsed.email.toLowerCase() === emailInput && parsed.password === passwordInput) {
              isLocalUser = true;
            }
          } catch {
            // ignore parse errors
          }
        }
      }

      if (isDemo || isLocalUser) {
        if (typeof window !== 'undefined') {
          localStorage.setItem(
            'skill_saarthi_student_session',
            JSON.stringify({
              email: emailInput,
              signedInAt: new Date().toISOString(),
            })
          );
        }
        router.push('/student');
      } else {
        setIsSigningIn(false);
        setSignInError('Invalid email or password.');
      }
    }, 850);
  };

  // Extract display first name for success screen
  const dynamicFirstName = useMemo(() => {
    const raw = personalData.fullName.trim();
    if (!raw) return 'Student';
    return raw.split(' ')[0];
  }, [personalData.fullName]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-light-blue via-white to-blue-50/40 flex flex-col justify-between selection:bg-primary-blue selection:text-white">
      {/* Top Government Platform Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-primary-blue rounded-lg p-1"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary-navy to-primary-blue rounded-lg flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-primary-navy text-base leading-none">
                  Skill Saarthi
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-blue-50 text-primary-blue px-2 py-0.5 rounded-full border border-blue-200">
                  <GraduationCap size={12} />
                  Student Portal
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
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary-blue hover:text-deep-navy px-3 py-1.5 rounded-lg hover:bg-light-blue transition-colors focus:outline-none focus:ring-2 focus:ring-primary-blue"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Main Dual-Column Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start w-full">
          {/* LEFT COLUMN: Skill Saarthi Journey & Government Trust Presentation (Desktop Visible) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="hidden lg:flex lg:col-span-5 flex-col justify-between space-y-8 sticky top-24 pt-4"
          >
            <div className="space-y-6">
              {/* Official Tricolor Badge */}
              <div className="inline-flex items-center gap-2 bg-white border border-gray-200 shadow-sm px-3.5 py-1.5 rounded-full">
                <span className="w-2.5 h-2.5 rounded-full bg-saffron animate-pulse" />
                <span className="text-xs font-semibold text-primary-navy tracking-wide uppercase">
                  National Skilling Telemetry Initiative
                </span>
              </div>

              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-primary-navy leading-tight tracking-tight">
                  Track Skills. <br />
                  <span className="text-saffron">Measure Real Outcomes.</span>
                </h1>
                <p className="mt-3 text-base text-text-muted leading-relaxed">
                  Join thousands of learners across India building verified skill profiles, navigating career gaps, and unlocking verified employment opportunities.
                </p>
              </div>

              {/* 4-Stage Student Journey Diagram */}
              <div className="bg-white/90 backdrop-blur border border-blue-100 rounded-2xl p-6 shadow-md space-y-4">
                <p className="text-xs font-bold text-primary-navy uppercase tracking-wider flex items-center gap-2">
                  <Compass size={15} className="text-primary-blue" />
                  Your Skill Saarthi Milestone Path
                </p>

                <div className="space-y-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-primary-blue flex items-center justify-center font-bold text-xs border border-blue-200 shadow-xs">
                      1
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-text-dark leading-none">
                        Student Account &amp; Profile Setup
                      </p>
                      <p className="text-xs text-text-muted mt-0.5">
                        Register your verified credentials &amp; background
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-primary-blue flex items-center justify-center font-bold text-xs border border-blue-200 shadow-xs">
                      2
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-text-dark leading-none">
                        AI Skill-Gap &amp; Course Mapping
                      </p>
                      <p className="text-xs text-text-muted mt-0.5">
                        Identify missing industry competencies
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-primary-blue flex items-center justify-center font-bold text-xs border border-blue-200 shadow-xs">
                      3
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-text-dark leading-none">
                        Apprenticeship &amp; Outcome Tracking
                      </p>
                      <p className="text-xs text-text-muted mt-0.5">
                        Structured monitoring of initial placements
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-orange-50 text-saffron flex items-center justify-center font-bold text-xs border border-orange-200 shadow-xs">
                      4
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-text-dark leading-none">
                        Longitudinal Wage &amp; Career Growth
                      </p>
                      <p className="text-xs text-text-muted mt-0.5">
                        Telemetry reporting for national policy &amp; youth growth
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Callouts */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-sm">
                  <div className="flex items-center gap-2 text-primary-blue font-semibold text-sm">
                    <Shield size={16} />
                    <span>Privacy First</span>
                  </div>
                  <p className="text-xs text-text-muted mt-1">
                    Citizen data protected under digital framework standards.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-sm">
                  <div className="flex items-center gap-2 text-success-green font-semibold text-sm">
                    <CheckCircle2 size={16} />
                    <span>NCVET Aligned</span>
                  </div>
                  <p className="text-xs text-text-muted mt-1">
                    Standardized NSQF qualification framework mapping.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Support Note */}
            <div className="pt-4 border-t border-gray-200/80 text-xs text-text-muted">
              Need technical assistance? Reach student helpline at{' '}
              <a href="mailto:support@skillsaarthi.gov.in" className="text-primary-blue font-semibold hover:underline">
                support@skillsaarthi.gov.in
              </a>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Interactive Authentication & Onboarding Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="lg:col-span-7 w-full max-w-xl mx-auto"
          >
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden relative">
              {/* Tricolor top border accent */}
              <div className="h-1.5 bg-gradient-to-r from-saffron via-white to-success-green w-full" />

              {/* Card Header & Tab Switcher */}
              {!isSuccess && (
                <div className="p-6 sm:p-8 pb-4 border-b border-gray-100 bg-gradient-to-b from-blue-50/30 to-white">
                  <div className="text-center sm:text-left mb-6">
                    <div className="inline-flex items-center gap-2 text-xs font-semibold text-primary-blue bg-blue-50 px-3 py-1 rounded-full mb-2">
                      <GraduationCap size={14} />
                      Skill Saarthi Student Portal
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-primary-navy tracking-tight">
                      Welcome to Skill Saarthi
                    </h2>
                    <p className="text-sm text-text-muted mt-1">
                      Track your skills, employment journey and career growth.
                    </p>
                  </div>

                  {/* Mode Switcher Tabs: Sign Up vs Sign In */}
                  <div className="grid grid-cols-2 bg-gray-100 p-1 rounded-xl relative">
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode('signup');
                        setSignInError('');
                      }}
                      className={`py-2.5 text-sm font-semibold rounded-lg transition-all relative z-10 ${
                        authMode === 'signup'
                          ? 'bg-white text-primary-navy shadow-sm'
                          : 'text-text-muted hover:text-text-dark'
                      }`}
                    >
                      Sign Up
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode('signin');
                        setSignInError('');
                      }}
                      className={`py-2.5 text-sm font-semibold rounded-lg transition-all relative z-10 ${
                        authMode === 'signin'
                          ? 'bg-white text-primary-navy shadow-sm'
                          : 'text-text-muted hover:text-text-dark'
                      }`}
                    >
                      Sign In
                    </button>
                  </div>
                </div>
              )}

              {/* CARD CONTENT */}
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
                      {/* Animated Checkmark Badge */}
                      <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: [0, 1.2, 1] }}
                          transition={{ duration: 0.6, ease: 'easeOut' }}
                          className="w-20 h-20 bg-success-green rounded-full flex items-center justify-center text-white shadow-xl"
                        >
                          <Check size={44} strokeWidth={3} />
                        </motion.div>
                        <motion.div
                          animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0, 0.6] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute inset-0 rounded-full border-2 border-success-green"
                        />
                      </div>

                      <div>
                        <span className="text-xs font-bold text-success-green uppercase tracking-wider bg-green-50 px-3 py-1 rounded-full border border-green-200">
                          Onboarding Completed
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-bold text-primary-navy mt-3">
                          Registration Successful!
                        </h3>
                        <p className="text-base text-text-muted mt-2">
                          Welcome to Skill Saarthi,{' '}
                          <span className="font-semibold text-text-dark">{dynamicFirstName}</span>!
                        </p>
                      </div>

                      {/* Summary Information Card */}
                      <div className="bg-light-blue/80 border border-blue-200/80 rounded-xl p-5 text-left text-xs sm:text-sm space-y-2.5 max-w-md mx-auto">
                        <div className="flex justify-between items-center pb-2 border-b border-blue-200">
                          <span className="text-text-muted">Assigned Student ID:</span>
                          <span className="font-mono font-bold text-primary-navy">{generatedStudentId}</span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b border-blue-200">
                          <span className="text-text-muted">Registered Email:</span>
                          <span className="font-medium text-text-dark">{accountData.email}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-text-muted">Career Track:</span>
                          <span className="font-medium text-text-dark">{skillsData.careerInterest}</span>
                        </div>
                      </div>

                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => router.push('/student')}
                          className="w-full inline-flex items-center justify-center gap-2 bg-primary-navy text-white py-3.5 px-6 rounded-lg font-semibold hover:bg-deep-navy transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-navy text-base"
                        >
                          Continue to Student Portal
                          <ArrowRight size={18} />
                        </button>
                      </div>
                    </motion.div>
                  ) : authMode === 'signup' ? (
                    /* SIGN UP WIZARD FLOW */
                    <motion.div
                      key="signup-flow"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      {/* Step Progress Bar */}
                      <div>
                        <div className="flex items-center justify-between text-xs font-semibold mb-2">
                          <span className="text-primary-navy">
                            Step 0{currentStep} of 04
                          </span>
                          <span className="text-text-muted">
                            {currentStep === 1 && 'Account Credentials'}
                            {currentStep === 2 && 'Personal Information'}
                            {currentStep === 3 && 'Academic Qualifications'}
                            {currentStep === 4 && 'Skills & Career Path'}
                          </span>
                        </div>

                        {/* Visual 4-Pill Stepper */}
                        <div className="grid grid-cols-4 gap-2">
                          {[
                            { num: 1, label: '01 Account' },
                            { num: 2, label: '02 Personal' },
                            { num: 3, label: '03 Education' },
                            { num: 4, label: '04 Skills' },
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
                                      ? 'bg-primary-navy'
                                      : 'bg-gray-200'
                                  }`}
                                />
                                <p
                                  className={`text-[11px] font-medium truncate ${
                                    isCurrent
                                      ? 'text-primary-navy font-bold'
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

                      {/* STEP 1: ACCOUNT DETAILS */}
                      {currentStep === 1 && (
                        <motion.div
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -12 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-5"
                        >
                          <div>
                            <h3 className="text-xl font-bold text-primary-navy">
                              Create your Student Account
                            </h3>
                            <p className="text-xs sm:text-sm text-text-muted mt-0.5">
                              Start your journey with Skill Saarthi.
                            </p>
                          </div>

                          {/* Email Address Field */}
                          <div className="space-y-1.5">
                            <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider">
                              Email Address <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="email"
                              value={accountData.email}
                              onChange={(e) =>
                                setAccountData((prev) => ({ ...prev, email: e.target.value }))
                              }
                              placeholder="Enter your email address"
                              className="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all"
                            />
                            <p className="text-xs text-text-muted flex items-center gap-1.5">
                              <span>Example:</span>
                              <code className="text-primary-blue bg-blue-50 px-1.5 py-0.5 rounded font-mono">
                                sih@gmail.com
                              </code>
                            </p>
                            {accountData.email.length > 0 && !isEmailValid && (
                              <p className="text-xs text-red-600 flex items-center gap-1">
                                <AlertCircle size={13} />
                                Please enter a valid email address.
                              </p>
                            )}
                          </div>

                          {/* Password Field */}
                          <div className="space-y-1.5">
                            <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider">
                              Password <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <input
                                type={showPassword ? 'text' : 'password'}
                                value={accountData.password}
                                onChange={(e) =>
                                  setAccountData((prev) => ({ ...prev, password: e.target.value }))
                                }
                                placeholder="e.g. Sih@123"
                                className="w-full px-4 py-2.5 pr-11 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all"
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
                            <p className="text-xs text-text-muted flex items-center gap-1.5">
                              <span>Example password:</span>
                              <code className="text-primary-blue bg-blue-50 px-1.5 py-0.5 rounded font-mono">
                                Sih@123
                              </code>
                              <span className="text-[11px] text-text-muted italic">(e.g. Sih@1234)</span>
                            </p>
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

                          {/* Dynamic Password Requirements Checklist */}
                          <div className="bg-light-blue/70 border border-blue-100 rounded-lg p-3.5 space-y-2">
                            <p className="text-xs font-semibold text-primary-navy">
                              Password Requirements:
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs">
                              <div className="flex items-center gap-2">
                                <span
                                  className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors ${
                                    passwordCriteria.minLength
                                      ? 'bg-success-green text-white'
                                      : 'bg-gray-200 text-gray-400'
                                  }`}
                                >
                                  {passwordCriteria.minLength ? <Check size={11} /> : <X size={11} />}
                                </span>
                                <span
                                  className={
                                    passwordCriteria.minLength
                                      ? 'text-success-green font-medium'
                                      : 'text-text-muted'
                                  }
                                >
                                  Minimum 8 characters
                                </span>
                              </div>

                              <div className="flex items-center gap-2">
                                <span
                                  className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors ${
                                    passwordCriteria.hasUpper
                                      ? 'bg-success-green text-white'
                                      : 'bg-gray-200 text-gray-400'
                                  }`}
                                >
                                  {passwordCriteria.hasUpper ? <Check size={11} /> : <X size={11} />}
                                </span>
                                <span
                                  className={
                                    passwordCriteria.hasUpper
                                      ? 'text-success-green font-medium'
                                      : 'text-text-muted'
                                  }
                                >
                                  One uppercase letter
                                </span>
                              </div>

                              <div className="flex items-center gap-2">
                                <span
                                  className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors ${
                                    passwordCriteria.hasLower
                                      ? 'bg-success-green text-white'
                                      : 'bg-gray-200 text-gray-400'
                                  }`}
                                >
                                  {passwordCriteria.hasLower ? <Check size={11} /> : <X size={11} />}
                                </span>
                                <span
                                  className={
                                    passwordCriteria.hasLower
                                      ? 'text-success-green font-medium'
                                      : 'text-text-muted'
                                  }
                                >
                                  One lowercase letter
                                </span>
                              </div>

                              <div className="flex items-center gap-2">
                                <span
                                  className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors ${
                                    passwordCriteria.hasNumber
                                      ? 'bg-success-green text-white'
                                      : 'bg-gray-200 text-gray-400'
                                  }`}
                                >
                                  {passwordCriteria.hasNumber ? <Check size={11} /> : <X size={11} />}
                                </span>
                                <span
                                  className={
                                    passwordCriteria.hasNumber
                                      ? 'text-success-green font-medium'
                                      : 'text-text-muted'
                                  }
                                >
                                  One number
                                </span>
                              </div>

                              <div className="flex items-center gap-2 sm:col-span-2">
                                <span
                                  className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors ${
                                    passwordCriteria.hasSpecial
                                      ? 'bg-success-green text-white'
                                      : 'bg-gray-200 text-gray-400'
                                  }`}
                                >
                                  {passwordCriteria.hasSpecial ? <Check size={11} /> : <X size={11} />}
                                </span>
                                <span
                                  className={
                                    passwordCriteria.hasSpecial
                                      ? 'text-success-green font-medium'
                                      : 'text-text-muted'
                                  }
                                >
                                  One special character (e.g. @, #, $, !)
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Confirm Password Field */}
                          <div className="space-y-1.5">
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
                                placeholder="e.g. Sih@123"
                                className="w-full px-4 py-2.5 pr-11 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all"
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

                            {/* Instant Password Match Indicator */}
                            {accountData.confirmPassword.length > 0 && (
                              <motion.div
                                initial={{ opacity: 0, y: -4 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="pt-1"
                              >
                                {isPasswordMatch ? (
                                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-success-green">
                                    <Check size={14} />
                                    ✓ Passwords match
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600">
                                    <AlertCircle size={14} />
                                    ⚠ Passwords do not match
                                  </span>
                                )}
                              </motion.div>
                            )}
                          </div>

                          {/* Continue Button */}
                          <div className="pt-3">
                            <button
                              type="button"
                              onClick={() => isStep1Valid && setCurrentStep(2)}
                              disabled={!isStep1Valid}
                              className={`w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-semibold transition-all shadow-sm text-sm ${
                                isStep1Valid
                                  ? 'bg-primary-navy text-white hover:bg-deep-navy shadow-md cursor-pointer'
                                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                              }`}
                            >
                              Continue to Personal Details
                              <ArrowRight size={16} />
                            </button>
                          </div>
                        </motion.div>
                      )}

                      {/* STEP 2: PERSONAL DETAILS */}
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
                              Tell us about yourself
                            </h3>
                            <p className="text-xs sm:text-sm text-text-muted mt-0.5">
                              Collect basic student details for official registry.
                            </p>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Full Name */}
                            <div className="space-y-1 sm:col-span-2">
                              <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider">
                                Full Name <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                value={personalData.fullName}
                                onChange={(e) =>
                                  setPersonalData((prev) => ({ ...prev, fullName: e.target.value }))
                                }
                                placeholder="e.g. Rahul Kumar"
                                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all"
                              />
                            </div>

                            {/* Date of Birth */}
                            <div className="space-y-1">
                              <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider">
                                Date of Birth <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="date"
                                value={personalData.dob}
                                onChange={(e) =>
                                  setPersonalData((prev) => ({ ...prev, dob: e.target.value }))
                                }
                                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all"
                              />
                            </div>

                            {/* Gender */}
                            <div className="space-y-1">
                              <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider">
                                Gender <span className="text-red-500">*</span>
                              </label>
                              <select
                                value={personalData.gender}
                                onChange={(e) =>
                                  setPersonalData((prev) => ({ ...prev, gender: e.target.value }))
                                }
                                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all bg-white"
                              >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                                <option value="Prefer not to say">Prefer not to say</option>
                              </select>
                            </div>

                            {/* Mobile Number */}
                            <div className="space-y-1 sm:col-span-2">
                              <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider">
                                Mobile Number <span className="text-red-500">*</span>
                              </label>
                              <div className="flex gap-2">
                                <span className="inline-flex items-center px-3 text-xs font-semibold text-text-muted bg-gray-100 border border-gray-300 rounded-lg">
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
                                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all"
                                />
                              </div>
                              {personalData.mobile.length > 0 && personalData.mobile.length !== 10 && (
                                <p className="text-[11px] text-amber-600">
                                  Please enter a valid 10-digit mobile number.
                                </p>
                              )}
                            </div>

                            {/* State */}
                            <div className="space-y-1">
                              <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider">
                                State <span className="text-red-500">*</span>
                              </label>
                              <select
                                value={personalData.state}
                                onChange={(e) =>
                                  setPersonalData((prev) => ({ ...prev, state: e.target.value }))
                                }
                                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all bg-white"
                              >
                                <option value="">Select State (e.g. Bihar)</option>
                                {INDIAN_STATES.map((s) => (
                                  <option key={s} value={s}>
                                    {s}
                                  </option>
                                ))}
                              </select>
                            </div>

                            {/* District */}
                            <div className="space-y-1">
                              <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider">
                                District <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                value={personalData.district}
                                onChange={(e) =>
                                  setPersonalData((prev) => ({ ...prev, district: e.target.value }))
                                }
                                placeholder="e.g. Muzaffarpur"
                                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all"
                              />
                            </div>

                            {/* City */}
                            <div className="space-y-1">
                              <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider">
                                City <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                value={personalData.city}
                                onChange={(e) =>
                                  setPersonalData((prev) => ({ ...prev, city: e.target.value }))
                                }
                                placeholder="e.g. Muzaffarpur"
                                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all"
                              />
                            </div>

                            {/* PIN Code */}
                            <div className="space-y-1">
                              <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider">
                                PIN Code <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                maxLength={6}
                                value={personalData.pinCode}
                                onChange={(e) =>
                                  setPersonalData((prev) => ({
                                    ...prev,
                                    pinCode: e.target.value.replace(/\D/g, ''),
                                  }))
                                }
                                placeholder="e.g. 842001"
                                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all"
                              />
                            </div>
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
                                  ? 'bg-primary-navy text-white hover:bg-deep-navy shadow-md cursor-pointer'
                                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                              }`}
                            >
                              Continue
                              <ArrowRight size={16} />
                            </button>
                          </div>
                        </motion.div>
                      )}

                      {/* STEP 3: EDUCATION DETAILS */}
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
                              Tell us about your education
                            </h3>
                            <p className="text-xs sm:text-sm text-text-muted mt-0.5">
                              Enter your academic background and qualification status.
                            </p>
                          </div>

                          <div className="space-y-3.5">
                            {/* Highest Qualification */}
                            <div className="space-y-1">
                              <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider">
                                Highest Qualification <span className="text-red-500">*</span>
                              </label>
                              <select
                                value={educationData.highestQualification}
                                onChange={(e) =>
                                  setEducationData((prev) => ({
                                    ...prev,
                                    highestQualification: e.target.value,
                                  }))
                                }
                                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all bg-white"
                              >
                                <option value="">Select Qualification (e.g. Bachelor&apos;s Degree)</option>
                                <option value="10th Standard / Matriculation">10th Standard / Matriculation</option>
                                <option value="12th Standard / Higher Secondary">12th Standard / Higher Secondary</option>
                                <option value="ITI / Vocational Certificate">ITI / Vocational Certificate</option>
                                <option value="Polytechnic Diploma">Polytechnic Diploma</option>
                                <option value="Bachelor's Degree">Bachelor&apos;s Degree (e.g. BCA, B.Tech, B.Sc)</option>
                                <option value="Master's Degree">Master&apos;s Degree (e.g. MCA, M.Tech, M.Sc)</option>
                                <option value="Doctorate / Ph.D.">Doctorate / Ph.D.</option>
                                <option value="Other">Other</option>
                              </select>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                              {/* Course / Degree */}
                              <div className="space-y-1">
                                <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider">
                                  Course / Degree <span className="text-red-500">*</span>
                                </label>
                                <input
                                  type="text"
                                  value={educationData.courseDegree}
                                  onChange={(e) =>
                                    setEducationData((prev) => ({
                                      ...prev,
                                      courseDegree: e.target.value,
                                    }))
                                  }
                                  placeholder="e.g. BCA"
                                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all"
                                />
                              </div>

                              {/* Specialization */}
                              <div className="space-y-1">
                                <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider">
                                  Specialization <span className="text-red-500">*</span>
                                </label>
                                <input
                                  type="text"
                                  value={educationData.specialization}
                                  onChange={(e) =>
                                    setEducationData((prev) => ({
                                      ...prev,
                                      specialization: e.target.value,
                                    }))
                                  }
                                  placeholder="e.g. Computer Applications"
                                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all"
                                />
                              </div>
                            </div>

                            {/* Institution / College */}
                            <div className="space-y-1">
                              <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider">
                                Institution / College <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                value={educationData.institution}
                                onChange={(e) =>
                                  setEducationData((prev) => ({
                                    ...prev,
                                    institution: e.target.value,
                                  }))
                                }
                                placeholder="e.g. ABC College"
                                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all"
                              />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                              {/* Graduation Year */}
                              <div className="space-y-1">
                                <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider">
                                  Graduation Year <span className="text-red-500">*</span>
                                </label>
                                <select
                                  value={educationData.graduationYear}
                                  onChange={(e) =>
                                    setEducationData((prev) => ({
                                      ...prev,
                                      graduationYear: e.target.value,
                                    }))
                                  }
                                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all bg-white"
                                >
                                  <option value="">Select Year (e.g. 2027)</option>
                                  {[2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030].map(
                                    (year) => (
                                      <option key={year} value={year.toString()}>
                                        {year}
                                      </option>
                                    )
                                  )}
                                </select>
                              </div>

                              {/* Education Status */}
                              <div className="space-y-1">
                                <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider">
                                  Education Status <span className="text-red-500">*</span>
                                </label>
                                <select
                                  value={educationData.educationStatus}
                                  onChange={(e) =>
                                    setEducationData((prev) => ({
                                      ...prev,
                                      educationStatus: e.target.value as StudentEducationData['educationStatus'],
                                    }))
                                  }
                                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all bg-white"
                                >
                                  <option value="">Select Status</option>
                                  <option value="Currently Studying">Currently Studying</option>
                                  <option value="Completed">Completed</option>
                                  <option value="Dropped Out">Dropped Out</option>
                                </select>
                              </div>
                            </div>
                          </div>

                          {/* Navigation Buttons */}
                          <div className="flex items-center gap-3 pt-4">
                            <button
                              type="button"
                              onClick={() => setCurrentStep(2)}
                              className="w-1/3 py-2.5 px-4 rounded-lg font-semibold border border-gray-300 text-text-dark hover:bg-gray-50 transition-all text-sm"
                            >
                              Back
                            </button>
                            <button
                              type="button"
                              onClick={() => isStep3Valid && setCurrentStep(4)}
                              disabled={!isStep3Valid}
                              className={`w-2/3 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-semibold transition-all text-sm ${
                                isStep3Valid
                                  ? 'bg-primary-navy text-white hover:bg-deep-navy shadow-md cursor-pointer'
                                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                              }`}
                            >
                              Continue
                              <ArrowRight size={16} />
                            </button>
                          </div>
                        </motion.div>
                      )}

                      {/* STEP 4: SKILLS & CAREER */}
                      {currentStep === 4 && (
                        <motion.div
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -12 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-4"
                        >
                          <div>
                            <h3 className="text-xl font-bold text-primary-navy">
                              Tell us about your skills
                            </h3>
                            <p className="text-xs sm:text-sm text-text-muted mt-0.5">
                              Highlight competencies, goals, and optional outcome telemetry.
                            </p>
                          </div>

                          {/* Skills Selection */}
                          <div className="space-y-2">
                            <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider">
                              Current Skills <span className="text-red-500">*</span>
                              <span className="text-text-muted font-normal lowercase ml-1">
                                (select or add multiple)
                              </span>
                            </label>

                            {/* Suggested skill chips */}
                            <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto p-2 bg-gray-50 rounded-lg border border-gray-200">
                              {SUGGESTED_SKILLS.map((skill) => {
                                const isSelected = skillsData.skills.includes(skill);
                                return (
                                  <button
                                    key={skill}
                                    type="button"
                                    onClick={() => toggleSkill(skill)}
                                    className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                                      isSelected
                                        ? 'bg-primary-blue text-white shadow-xs'
                                        : 'bg-white text-text-dark border border-gray-200 hover:border-primary-blue'
                                    }`}
                                  >
                                    {isSelected ? '✓ ' : '+ '}
                                    {skill}
                                  </button>
                                );
                              })}
                            </div>

                            {/* Custom Skill Input */}
                            <div className="flex gap-2 pt-1">
                              <input
                                type="text"
                                value={customSkillInput}
                                onChange={(e) => setCustomSkillInput(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleAddCustomSkill(e);
                                  }
                                }}
                                placeholder="Type another skill & press Add..."
                                className="w-full px-3 py-1.5 text-xs rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary-blue"
                              />
                              <button
                                type="button"
                                onClick={handleAddCustomSkill}
                                className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-text-dark text-xs font-semibold rounded-lg border border-gray-300 transition-colors"
                              >
                                Add
                              </button>
                            </div>

                            {/* Selected Skills Pills */}
                            {skillsData.skills.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 pt-1">
                                {skillsData.skills.map((skill) => (
                                  <span
                                    key={skill}
                                    className="inline-flex items-center gap-1 bg-blue-50 text-primary-navy border border-blue-200 text-xs px-2.5 py-0.5 rounded-full font-medium"
                                  >
                                    {skill}
                                    <button
                                      type="button"
                                      onClick={() => toggleSkill(skill)}
                                      className="text-text-muted hover:text-red-500 ml-0.5"
                                      aria-label={`Remove ${skill}`}
                                    >
                                      <X size={12} />
                                    </button>
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Career Interest */}
                          <div className="space-y-1">
                            <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider">
                              Career Interest <span className="text-red-500">*</span>
                            </label>
                            <select
                              value={skillsData.careerInterest}
                              onChange={(e) =>
                                setSkillsData((prev) => ({
                                  ...prev,
                                  careerInterest: e.target.value,
                                }))
                              }
                              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all bg-white"
                            >
                              <option value="">Select Primary Career Interest</option>
                              <option value="Software Development">Software Development</option>
                              <option value="Data Analytics">Data Analytics</option>
                              <option value="Cloud Computing">Cloud Computing</option>
                              <option value="Cybersecurity">Cybersecurity</option>
                              <option value="AI / Machine Learning">AI / Machine Learning</option>
                              <option value="Digital Marketing">Digital Marketing</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>

                          {/* Current Employment Status */}
                          <div className="space-y-1">
                            <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider">
                              Current Employment Status <span className="text-red-500">*</span>
                            </label>
                            <select
                              value={skillsData.employmentStatus}
                              onChange={(e) =>
                                setSkillsData((prev) => ({
                                  ...prev,
                                  employmentStatus: e.target.value as StudentSkillsData['employmentStatus'],
                                }))
                              }
                              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all bg-white"
                            >
                              <option value="">Select Employment Status</option>
                              <option value="Student / Not Employed">Student / Not Employed</option>
                              <option value="Employed">Employed</option>
                              <option value="Self-Employed">Self-Employed</option>
                              <option value="Apprenticeship / Internship">Apprenticeship / Internship</option>
                            </select>
                          </div>

                          {/* Conditional Employment Fields */}
                          {(skillsData.employmentStatus === 'Employed' ||
                            skillsData.employmentStatus === 'Apprenticeship / Internship') && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="bg-light-blue/70 border border-blue-200/70 p-4 rounded-xl space-y-3"
                            >
                              <p className="text-xs font-bold text-primary-navy uppercase tracking-wider">
                                Employment Information
                              </p>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="space-y-1 sm:col-span-2">
                                  <label className="block text-xs font-semibold text-text-dark">
                                    Company Name <span className="text-red-500">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    value={skillsData.companyName || ''}
                                    onChange={(e) =>
                                      setSkillsData((prev) => ({
                                        ...prev,
                                        companyName: e.target.value,
                                      }))
                                    }
                                    placeholder="e.g. Infosys / Tech Services"
                                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary-blue bg-white"
                                  />
                                </div>

                                <div className="space-y-1">
                                  <label className="block text-xs font-semibold text-text-dark">
                                    Job Role <span className="text-red-500">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    value={skillsData.jobRole || ''}
                                    onChange={(e) =>
                                      setSkillsData((prev) => ({
                                        ...prev,
                                        jobRole: e.target.value,
                                      }))
                                    }
                                    placeholder="e.g. Junior Developer"
                                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary-blue bg-white"
                                  />
                                </div>

                                <div className="space-y-1">
                                  <label className="block text-xs font-semibold text-text-dark">
                                    Monthly Salary <span className="text-red-500">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    value={skillsData.monthlySalary || ''}
                                    onChange={(e) =>
                                      setSkillsData((prev) => ({
                                        ...prev,
                                        monthlySalary: e.target.value,
                                      }))
                                    }
                                    placeholder="e.g. ₹25,000 / month"
                                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary-blue bg-white"
                                  />
                                </div>
                              </div>
                            </motion.div>
                          )}

                          {/* Final Consent Card */}
                          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm space-y-2.5">
                            <div className="flex items-center gap-2">
                              <Shield size={16} className="text-primary-navy flex-shrink-0" />
                              <h4 className="text-xs font-bold text-primary-navy uppercase tracking-wider">
                                Consent for Outcome Tracking
                              </h4>
                            </div>

                            <p className="text-xs text-text-muted leading-relaxed">
                              “I agree to share my training and employment outcome information for programme monitoring and improvement.”
                            </p>

                            <label className="flex items-start gap-2.5 cursor-pointer pt-1">
                              <input
                                type="checkbox"
                                checked={skillsData.consentAgreed}
                                onChange={(e) =>
                                  setSkillsData((prev) => ({
                                    ...prev,
                                    consentAgreed: e.target.checked,
                                  }))
                                }
                                className="mt-0.5 w-4 h-4 text-primary-navy rounded border-gray-300 focus:ring-primary-blue"
                              />
                              <span className="text-xs font-semibold text-text-dark">
                                I agree to the consent terms
                              </span>
                            </label>

                            <p className="text-[11px] text-text-muted border-t border-gray-100 pt-2 italic">
                              Your information will be handled according to applicable privacy and data protection requirements.
                            </p>
                          </div>

                          {/* Navigation Buttons */}
                          <div className="flex items-center gap-3 pt-3">
                            <button
                              type="button"
                              onClick={() => setCurrentStep(3)}
                              className="w-1/3 py-2.5 px-4 rounded-lg font-semibold border border-gray-300 text-text-dark hover:bg-gray-50 transition-all text-sm"
                            >
                              Back
                            </button>
                            <button
                              type="button"
                              onClick={handleCompleteRegistration}
                              disabled={!isStep4Valid || isSubmittingRegistration}
                              className={`w-2/3 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-semibold transition-all text-sm ${
                                isStep4Valid && !isSubmittingRegistration
                                  ? 'bg-saffron text-white hover:bg-orange-600 shadow-md cursor-pointer'
                                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                              }`}
                            >
                              {isSubmittingRegistration ? (
                                <>
                                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                  Creating Account...
                                </>
                              ) : (
                                <>
                                  Complete Registration
                                  <ArrowRight size={16} />
                                </>
                              )}
                            </button>
                          </div>
                        </motion.div>
                      )}

                      {/* Bottom Mode Switch Link */}
                      <div className="pt-4 border-t border-gray-100 text-center text-xs sm:text-sm text-text-muted">
                        Already have an account?{' '}
                        <button
                          type="button"
                          onClick={() => {
                            setAuthMode('signin');
                            setSignInError('');
                          }}
                          className="font-semibold text-primary-blue hover:text-deep-navy hover:underline ml-1"
                        >
                          Sign In
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    /* SIGN IN MODE */
                    <motion.div
                      key="signin-flow"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-5"
                    >
                      <div>
                        <h3 className="text-xl font-bold text-primary-navy">Welcome Back</h3>
                        <p className="text-xs sm:text-sm text-text-muted mt-0.5">
                          Sign in to continue your Skill Saarthi journey.
                        </p>
                      </div>

                      {/* Demo Credentials Helper Box */}
                      <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-3.5 text-xs text-text-muted space-y-1">
                        <div className="flex items-center gap-1.5 text-primary-navy font-bold">
                          <Sparkles size={14} className="text-saffron" />
                          <span>Demo Account Credentials</span>
                        </div>
                        <p className="text-xs text-text-dark">
                          Email:{' '}
                          <code className="text-primary-blue font-mono font-semibold">
                            sih@gmail.com
                          </code>
                          {' • '}
                          Password:{' '}
                          <code className="text-primary-blue font-mono font-semibold">
                            Sih@123
                          </code>
                        </p>
                        <p className="text-[11px] text-text-muted italic">
                          (Credentials are not pre-filled. Enter them in the fields below to sign in.)
                        </p>
                      </div>

                      {/* Inline Error Message */}
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

                      {/* Forgot Password Notice */}
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
                        {/* Sign-In Email Field */}
                        <div className="space-y-1.5">
                          <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider">
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            required
                            value={signInEmail}
                            onChange={(e) => setSignInEmail(e.target.value)}
                            placeholder="e.g. sih@gmail.com"
                            className="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all"
                          />
                        </div>

                        {/* Sign-In Password Field */}
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider">
                              Password <span className="text-red-500">*</span>
                            </label>
                            <button
                              type="button"
                              onClick={() =>
                                setForgotPasswordNotice(
                                  'Password recovery via OTP will be enabled in production. For this prototype, please use Sih@123.'
                                )
                              }
                              className="text-xs text-primary-blue hover:underline font-semibold focus:outline-none"
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
                              placeholder="e.g. Sih@123"
                              className="w-full px-4 py-2.5 pr-11 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all"
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

                        {/* Sign In Primary CTA */}
                        <div className="pt-2">
                          <button
                            type="submit"
                            disabled={isSigningIn}
                            className="w-full inline-flex items-center justify-center gap-2 bg-primary-navy text-white py-3 px-6 rounded-lg font-semibold hover:bg-deep-navy transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-navy text-sm disabled:opacity-70"
                          >
                            {isSigningIn ? (
                              <>
                                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Signing you in...
                              </>
                            ) : (
                              <>
                                Sign In
                                <ArrowRight size={16} />
                              </>
                            )}
                          </button>
                        </div>
                      </form>

                      {/* Bottom Mode Switch Link */}
                      <div className="pt-4 border-t border-gray-100 text-center text-xs sm:text-sm text-text-muted">
                        Don&apos;t have an account?{' '}
                        <button
                          type="button"
                          onClick={() => {
                            setAuthMode('signup');
                            setSignInError('');
                          }}
                          className="font-semibold text-primary-blue hover:text-deep-navy hover:underline ml-1"
                        >
                          Sign Up
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

      {/* Government Standard Footer */}
      <footer className="py-4 border-t border-gray-200 bg-white text-center text-xs text-text-muted">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>
            © {new Date().getFullYear()} Skill Saarthi • Ministry of Skill Development &amp; Entrepreneurship, Government of India
          </p>
          <div className="flex items-center gap-4 text-xs">
            <Link href="/" className="hover:text-primary-navy hover:underline">
              Terms of Use
            </Link>
            <span>•</span>
            <Link href="/" className="hover:text-primary-navy hover:underline">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/" className="hover:text-primary-navy hover:underline">
              Helpdesk
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
