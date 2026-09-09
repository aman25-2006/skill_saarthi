'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Shield,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Server,
  Cpu,
  KeyRound,
  ShieldCheck,
} from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();

  // Mode: 'signin' or 'security-pin'
  const [authMode, setAuthMode] = useState<'signin' | 'security-pin'>('signin');

  // Form State
  const [email, setEmail] = useState('admin@skillsaarthi.gov.in');
  const [password, setPassword] = useState('Admin@123');
  const [securityPin, setSecurityPin] = useState('9482-ROOT');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Auto-fill Demo Credentials
  const handleAutoFill = () => {
    setEmail('admin@skillsaarthi.gov.in');
    setPassword('Admin@123');
    setSecurityPin('9482-ROOT');
    setErrorMessage('');
  };

  // Sign In Handler
  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    setTimeout(() => {
      // Allow demo credentials or valid format
      if (
        (email === 'admin@skillsaarthi.gov.in' && password === 'Admin@123') ||
        (email.includes('@') && password.length >= 6)
      ) {
        setSuccessMessage('Administrator authenticated. Initializing System Ops Console...');
        if (typeof window !== 'undefined') {
          localStorage.setItem(
            'skill_saarthi_admin_session',
            JSON.stringify({
              adminId: 'ADM-MSDE-ROOT-01',
              name: 'Amit Sharma',
              role: 'Senior Technical Director & Root Admin',
              organization: 'National Informatics Centre (NIC) / MSDE',
              email: email,
              loginTime: new Date().toISOString(),
            })
          );
        }
        setTimeout(() => {
          router.push('/admin');
        }, 1000);
      } else {
        setIsLoading(false);
        setErrorMessage('Invalid administrator credentials. Please use the Demo Credentials provided below.');
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-between selection:bg-rose-500 selection:text-white">
      {/* Top Header */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-slate-400 hover:text-white text-xs font-semibold transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to Landing Page</span>
        </Link>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-mono text-slate-300 font-semibold">
            Central Ops Gateway • 256-Bit SSL
          </span>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 my-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800/90 border border-slate-700 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 relative overflow-hidden"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header Brand */}
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-red-700 mx-auto flex items-center justify-center shadow-lg shadow-rose-900/30 text-white">
              <Shield size={28} />
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-rose-400 bg-rose-500/10 px-2.5 py-0.5 rounded-full border border-rose-500/20">
                System Administration
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Skill Saarthi Central Ops
              </h1>
              <p className="text-xs text-slate-400">
                National Outcome Telemetry Layer • Technical Directorate Console
              </p>
            </div>
          </div>

          {/* Mode Switcher */}
          <div className="grid grid-cols-2 p-1 bg-slate-900/80 rounded-xl border border-slate-700 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setAuthMode('signin')}
              className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                authMode === 'signin'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <KeyRound size={13} />
              Root Admin Login
            </button>
            <button
              type="button"
              onClick={() => setAuthMode('security-pin')}
              className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                authMode === 'security-pin'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Cpu size={13} />
              2FA Security Token
            </button>
          </div>

          {/* Demo Quick-Fill Pill */}
          <div className="p-3 bg-slate-900/60 border border-slate-700/80 rounded-xl flex items-center justify-between gap-2 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 block font-mono">DEMO ROOT CREDENTIALS:</span>
              <span className="text-slate-200 font-mono text-[11px] font-semibold">
                admin@skillsaarthi.gov.in / Admin@123
              </span>
            </div>
            <button
              type="button"
              onClick={handleAutoFill}
              className="bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 px-3 py-1.5 rounded-lg font-bold text-[11px] transition-all whitespace-nowrap"
            >
              Auto-fill Demo
            </button>
          </div>

          {/* Error & Success Messages */}
          <AnimatePresence>
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs flex items-center gap-2"
              >
                <AlertCircle size={15} className="flex-shrink-0 text-red-400" />
                <span>{errorMessage}</span>
              </motion.div>
            )}

            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2"
              >
                <CheckCircle2 size={15} className="flex-shrink-0 text-emerald-400" />
                <span>{successMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSignIn} className="space-y-4 text-xs">
            {authMode === 'signin' ? (
              <>
                <div className="space-y-1.5">
                  <label className="block font-semibold text-slate-200">
                    Administrator Official Email (NIC / MSDE)
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@skillsaarthi.gov.in"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="block font-semibold text-slate-200">Master Password</label>
                    <span className="text-[10px] text-slate-400">Default: Admin@123</span>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 transition-colors pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-white"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <label className="block font-semibold text-slate-200">
                    Hardware Security Key / 2FA Authenticator Token
                  </label>
                  <input
                    type="text"
                    required
                    value={securityPin}
                    onChange={(e) => setSecurityPin(e.target.value)}
                    placeholder="e.g. 9482-ROOT"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono placeholder-slate-500 focus:outline-none focus:border-rose-500 transition-colors tracking-wider text-center text-sm"
                  />
                </div>
                <p className="text-[11px] text-slate-400 text-center">
                  Protected under Central Government Digital Security Guidelines. Enter your cryptographic access token.
                </p>
              </div>
            )}

            {/* Login Action Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-sm shadow-lg shadow-rose-950/40 transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Server size={16} className="animate-spin" />
                  <span>Authenticating Root Access...</span>
                </>
              ) : (
                <>
                  <ShieldCheck size={16} />
                  <span>Access Central Admin Console →</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Links to other portals */}
          <div className="pt-4 border-t border-slate-700/80 flex items-center justify-between text-[11px] text-slate-400">
            <Link href="/login/government" className="hover:text-amber-400 transition-colors">
              🏛️ Government Officer Login
            </Link>
            <span>•</span>
            <Link href="/login/student" className="hover:text-blue-400 transition-colors">
              🎓 Student Portal Login
            </Link>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-3 text-center text-xs text-slate-500">
        <p>
          © {new Date().getFullYear()} Skill Saarthi • Ministry of Skill Development &amp; Entrepreneurship, Government of India
        </p>
      </footer>
    </div>
  );
}
