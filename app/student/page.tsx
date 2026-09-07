'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  GraduationCap,
  LogOut,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Clock,
  ExternalLink,
} from 'lucide-react';

export default function StudentPortalPage() {
  const router = useRouter();
  const [userName, setUserName] = useState<string>('Student');
  const [userEmail, setUserEmail] = useState<string>('');
  const [activeStage, setActiveStage] = useState<number>(0);

  useEffect(() => {
    // Read from localStorage if available
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('skill_saarthi_student_user');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed.fullName) {
            setUserName(parsed.fullName.split(' ')[0] || parsed.fullName);
          }
          if (parsed.email) {
            setUserEmail(parsed.email);
          }
        } catch {
          // Ignore parse errors
        }
      }
    }
  }, []);

  const preparationStages = [
    'Aligning curriculum with NCVET & NSQF competencies...',
    'Synthesizing personalized AI skill-gap assessment...',
    'Establishing longitudinal employment & wage tracking hook...',
    'Configuring student portal telemetry and analytics...',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % preparationStages.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [preparationStages.length]);

  const handleSignOut = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('skill_saarthi_student_session');
    }
    router.push('/login/student');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-light-blue via-white to-blue-50/50 flex flex-col justify-between selection:bg-primary-blue selection:text-white">
      {/* Top Government Platform Bar */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          {/* Brand Identity */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-primary-blue rounded-lg p-1">
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

          {/* Quick Actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-text-muted hover:text-primary-navy px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">Landing Page</span>
            </Link>

            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-text-muted hover:text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
              title="Sign Out of Portal"
            >
              <LogOut size={16} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-10">
        <div className="max-w-2xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="bg-white rounded-2xl shadow-xl border border-blue-100 p-6 sm:p-10 text-center relative overflow-hidden"
          >
            {/* Top decorative tricolor bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-saffron via-white to-success-green opacity-90" />

            {/* Verification Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-50 text-primary-navy border border-blue-200 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-6 shadow-sm">
              <ShieldCheck size={16} className="text-primary-blue" />
              <span>National Skilling Architecture • Prototype Preview</span>
            </div>

            {/* Central Animated Graphic */}
            <div className="relative w-28 h-28 mx-auto mb-8 flex items-center justify-center">
              {/* Outer rotating ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-primary-blue/30"
              />

              {/* Middle pulsing halo */}
              <motion.div
                animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-2 rounded-full bg-gradient-to-tr from-light-blue to-blue-100"
              />

              {/* Core emblem */}
              <div className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-br from-primary-navy to-primary-blue flex items-center justify-center shadow-lg text-white">
                <GraduationCap size={40} className="text-white" />
              </div>

              {/* Little floating cog/sparkle badge */}
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-saffron text-white flex items-center justify-center shadow-md border-2 border-white"
              >
                <Cpu size={16} />
              </motion.div>
            </div>

            {/* Headings */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-navy mb-3 tracking-tight">
              Student Portal is Under Maintenance
            </h1>

            {userName && userName !== 'Student' && (
              <p className="text-sm font-semibold text-primary-blue mb-2">
                Hello {userName}{userEmail ? ` (${userEmail})` : ''}, we have safely saved your onboarding profile!
              </p>
            )}

            <p className="text-text-muted text-base sm:text-lg max-w-lg mx-auto mb-8 leading-relaxed">
              We&apos;re preparing your personalized Skill Saarthi experience. The Student Portal will be available soon.
            </p>

            {/* Animated Loading / Progress Visual */}
            <div className="bg-light-blue/70 border border-blue-100 rounded-xl p-5 mb-8 text-left max-w-lg mx-auto shadow-inner">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-primary-blue animate-spin" style={{ animationDuration: '6s' }} />
                  <span className="text-xs sm:text-sm font-semibold text-primary-navy">
                    Preparing your dashboard...
                  </span>
                </div>

                {/* Animated Pulsing Dots */}
                <div className="flex items-center gap-1.5" aria-label="Loading indicator">
                  <motion.span
                    animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                    className="w-2 h-2 rounded-full bg-primary-blue"
                  />
                  <motion.span
                    animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                    className="w-2 h-2 rounded-full bg-saffron"
                  />
                  <motion.span
                    animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                    className="w-2 h-2 rounded-full bg-primary-navy"
                  />
                </div>
              </div>

              {/* Progress dynamic text */}
              <motion.div
                key={activeStage}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                className="text-xs sm:text-sm text-text-muted flex items-start gap-2 min-h-[40px]"
              >
                <Sparkles size={16} className="text-saffron flex-shrink-0 mt-0.5" />
                <span>{preparationStages[activeStage]}</span>
              </motion.div>

              {/* Upcoming Feature Highlights Preview */}
              <div className="mt-4 pt-3 border-t border-blue-200/60 grid grid-cols-2 gap-2 text-xs text-text-muted">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-success-green flex-shrink-0" />
                  <span>AI Skill-Gap Engine</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-success-green flex-shrink-0" />
                  <span>Verified Credentials</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-success-green flex-shrink-0" />
                  <span>Employment Tracker</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-success-green flex-shrink-0" />
                  <span>Wage Growth Graph</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <Link
                href="/"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary-navy text-white px-7 py-3 rounded-lg font-semibold hover:bg-deep-navy transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-navy text-sm"
              >
                <ArrowLeft size={16} />
                Back to Home
              </Link>

              <button
                onClick={handleSignOut}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-text-muted border border-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 hover:text-text-dark transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 text-sm"
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </div>

            {/* Note */}
            <div className="mt-8 pt-5 border-t border-gray-100 flex items-center justify-center gap-2 text-xs text-text-muted">
              <span>National Skilling Framework Version 2.4</span>
              <span>•</span>
              <a
                href="/#features"
                className="text-primary-blue hover:underline inline-flex items-center gap-1"
              >
                Explore Platform Architecture
                <ExternalLink size={12} />
              </a>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 border-t border-gray-200 bg-white text-center text-xs text-text-muted">
        <p>
          Skill Saarthi is an outcome-driven digital platform under the Ministry of Skill Development and Entrepreneurship, Government of India.
        </p>
      </footer>
    </div>
  );
}

