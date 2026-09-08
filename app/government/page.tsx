'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Building2,
  LogOut,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  BarChart3,
  TrendingUp,
  Brain,
  AlertCircle,
  Clock,
  ExternalLink,
  Lock,
} from 'lucide-react';

export default function GovernmentPortalPage() {
  const router = useRouter();
  const [officerName, setOfficerName] = useState<string>('Officer');
  const [officerDept, setOfficerDept] = useState<string>('');
  const [activeStage, setActiveStage] = useState<number>(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('skill_saarthi_officer_user');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed.fullName) {
            setOfficerName(parsed.fullName);
          }
          if (parsed.department) {
            setOfficerDept(parsed.department);
          }
        } catch {
          // ignore parse errors
        }
      }
    }
  }, []);

  const telemetryPreparationStages = [
    'Aggregating state-wise cohort employment telemetry across 700+ districts...',
    'Calibrating training provider audit benchmarks and NCVET compliance data...',
    'Synthesizing AI macro policy insights and industry wage progression models...',
    'Configuring encrypted executive dashboard and confidential telemetry access...',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % telemetryPreparationStages.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [telemetryPreparationStages.length]);

  const handleSignOut = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('skill_saarthi_officer_session');
    }
    router.push('/login/government');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/60 via-white to-amber-50/40 flex flex-col justify-between selection:bg-saffron selection:text-white">
      {/* Top Government Platform Bar */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          {/* Brand Identity */}
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

          {/* Quick Actions */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-text-muted bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-full">
              <Lock size={12} className="text-saffron" />
              <span>Restricted Government Access</span>
            </div>

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
            className="bg-white rounded-2xl shadow-xl border border-orange-100 p-6 sm:p-10 text-center relative overflow-hidden"
          >
            {/* Top decorative tricolor bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-saffron via-white to-success-green opacity-90" />

            {/* Verification Badge */}
            <div className="inline-flex items-center gap-2 bg-orange-50 text-saffron border border-orange-200 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-6 shadow-sm">
              <ShieldCheck size={16} />
              <span>National Executive Telemetry • Policy Preview</span>
            </div>

            {/* Central Animated Graphic */}
            <div className="relative w-28 h-28 mx-auto mb-8 flex items-center justify-center">
              {/* Outer rotating ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-saffron/40"
              />

              {/* Middle pulsing halo */}
              <motion.div
                animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-2 rounded-full bg-gradient-to-tr from-orange-100 to-amber-100"
              />

              {/* Core emblem */}
              <div className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-br from-saffron to-orange-600 flex items-center justify-center shadow-lg text-white">
                <Building2 size={38} className="text-white" />
              </div>

              {/* Little floating chart badge */}
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-primary-navy text-white flex items-center justify-center shadow-md border-2 border-white"
              >
                <BarChart3 size={15} />
              </motion.div>
            </div>

            {/* Headings */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-navy mb-3 tracking-tight">
              Government Officer Portal is Under Maintenance
            </h1>

            {officerName && officerName !== 'Officer' && (
              <p className="text-sm font-semibold text-saffron mb-2">
                Authenticated: {officerName}{officerDept ? ` (${officerDept})` : ''}
              </p>
            )}

            <p className="text-text-muted text-base sm:text-lg max-w-lg mx-auto mb-8 leading-relaxed">
              We&apos;re preparing the executive macroeconomic telemetry dashboard. Confidential programme monitoring and provider analytics will be accessible soon.
            </p>

            {/* Animated Loading / Progress Visual */}
            <div className="bg-orange-50/50 border border-orange-100 rounded-xl p-5 mb-8 text-left max-w-lg mx-auto shadow-inner">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-saffron animate-spin" style={{ animationDuration: '6s' }} />
                  <span className="text-xs sm:text-sm font-semibold text-primary-navy">
                    Preparing executive dashboard...
                  </span>
                </div>

                {/* Animated Pulsing Dots */}
                <div className="flex items-center gap-1.5" aria-label="Loading indicator">
                  <motion.span
                    animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                    className="w-2 h-2 rounded-full bg-saffron"
                  />
                  <motion.span
                    animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                    className="w-2 h-2 rounded-full bg-primary-navy"
                  />
                  <motion.span
                    animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                    className="w-2 h-2 rounded-full bg-success-green"
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
                <span>{telemetryPreparationStages[activeStage]}</span>
              </motion.div>

              {/* Upcoming Feature Highlights Preview */}
              <div className="mt-4 pt-3 border-t border-orange-200/60 grid grid-cols-2 gap-2 text-xs text-text-muted">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-success-green flex-shrink-0" />
                  <span>Cohort Analytics</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-success-green flex-shrink-0" />
                  <span>Employment Outcomes</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-success-green flex-shrink-0" />
                  <span>Provider Audits</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-success-green flex-shrink-0" />
                  <span>AI Policy Alerts</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <Link
                href="/"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-saffron text-white px-7 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-saffron text-sm"
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
              <span>National Skilling Architecture • Government Officer Portal</span>
              <span>•</span>
              <a
                href="/#impact"
                className="text-saffron hover:underline inline-flex items-center gap-1 font-semibold"
              >
                View Skilling Impact Framework
                <ExternalLink size={12} />
              </a>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 border-t border-gray-200 bg-white text-center text-xs text-text-muted">
        <p>
          Skill Saarthi Government Officer Portal is restricted to authorized state &amp; central nodal officers under the Ministry of Skill Development and Entrepreneurship, Government of India.
        </p>
      </footer>
    </div>
  );
}

