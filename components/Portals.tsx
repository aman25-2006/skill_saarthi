'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import {
  GraduationCap,
  Briefcase,
  TrendingUp,
  BarChart3,
  Shield,
  ArrowRight,
  Server,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function Portals() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section ref={ref} className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-slate-900 transition-colors duration-200" id="portals">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="space-y-12"
        >
          {/* Heading */}
          <motion.div variants={itemVariants} className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-saffron dark:text-amber-400 bg-orange-50 dark:bg-amber-500/10 px-3 py-1 rounded-full border border-orange-200 dark:border-amber-500/20">
              {t('portals.badge', 'Role-Based Ecosystem')}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary-navy dark:text-white">
              {t('portals.title', 'Three Dedicated Consoles')}
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Tailored experiences for students, government officers, and technical administrators
            </p>
          </motion.div>

          {/* Portal Cards: 3 columns */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {/* 1. Student Portal */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -6 }}
              className="bg-white dark:bg-slate-800 rounded-3xl p-7 sm:p-8 border-2 border-primary-blue/30 dark:border-primary-blue/50 shadow-md hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 text-primary-blue dark:text-sky-300 px-3.5 py-1.5 rounded-full mb-5 font-bold text-xs">
                  <GraduationCap size={16} />
                  <span>Student Portal</span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                  {t('portals.studentTitle', 'Learner Outcome Passport')}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                  {t('portals.studentDesc', 'Access your longitudinal skill passport, log employment updates, get AI gap analysis, and control data consents.')}
                </p>

                <div className="space-y-2.5 mb-8 text-xs text-slate-700 dark:text-slate-300 font-medium">
                  <div className="flex items-center gap-2.5">
                    <Sparkles size={15} className="text-primary-blue dark:text-sky-400 shrink-0" />
                    <span>AI Skill-Gap Diagnostics</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Briefcase size={15} className="text-primary-blue dark:text-sky-400 shrink-0" />
                    <span>Verified Career Timeline & Wages</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Shield size={15} className="text-primary-blue dark:text-sky-400 shrink-0" />
                    <span>DPDP Act Digital Consents</span>
                  </div>
                </div>
              </div>

              <Link
                href="/login/student"
                className="inline-flex items-center justify-center gap-2 bg-primary-blue text-white px-5 py-3 rounded-xl font-bold hover:bg-deep-navy transition-all text-xs sm:text-sm shadow-md"
              >
                <span>{t('cta.student', 'Student Login')}</span>
                <ArrowRight size={16} />
              </Link>
            </motion.div>

            {/* 2. Government Portal */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -6 }}
              className="bg-white dark:bg-slate-800 rounded-3xl p-7 sm:p-8 border-2 border-saffron/30 dark:border-amber-500/50 shadow-md hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                <div className="inline-flex items-center gap-2 bg-orange-50 dark:bg-amber-900/30 text-saffron dark:text-amber-300 px-3.5 py-1.5 rounded-full mb-5 font-bold text-xs">
                  <BarChart3 size={16} />
                  <span>Government Portal</span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                  {t('portals.govTitle', 'Government Officer Intelligence')}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                  {t('portals.govDesc', 'District & state dashboards, VTP accreditation tracking, Section 14 Nashik benchmark equations, and cohort reviews.')}
                </p>

                <div className="space-y-2.5 mb-8 text-xs text-slate-700 dark:text-slate-300 font-medium">
                  <div className="flex items-center gap-2.5">
                    <TrendingUp size={15} className="text-saffron dark:text-amber-400 shrink-0" />
                    <span>Longitudinal Retention Tracking</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <BarChart3 size={15} className="text-saffron dark:text-amber-400 shrink-0" />
                    <span>Section 14 Nashik Welder Equation</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Shield size={15} className="text-saffron dark:text-amber-400 shrink-0" />
                    <span>VTP Milestone Funding Verification</span>
                  </div>
                </div>
              </div>

              <Link
                href="/login/government"
                className="inline-flex items-center justify-center gap-2 bg-saffron text-white px-5 py-3 rounded-xl font-bold hover:bg-orange-600 transition-all text-xs sm:text-sm shadow-md"
              >
                <span>{t('cta.gov', 'Government Login')}</span>
                <ArrowRight size={16} />
              </Link>
            </motion.div>

            {/* 3. Central Admin Portal */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -6 }}
              className="bg-white dark:bg-slate-800 rounded-3xl p-7 sm:p-8 border-2 border-rose-500/30 dark:border-rose-500/50 shadow-md hover:shadow-xl transition-all flex flex-col justify-between md:col-span-2 lg:col-span-1"
            >
              <div>
                <div className="inline-flex items-center gap-2 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 px-3.5 py-1.5 rounded-full mb-5 font-bold text-xs">
                  <Server size={16} />
                  <span>Central Admin Console</span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                  {t('portals.adminTitle', 'Central Ops & Policy Master')}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                  {t('portals.adminDesc', 'System telemetry, Section 10 evidence weight calibration, DPDP cryptographic logs, and Section 20 cohort generation.')}
                </p>

                <div className="space-y-2.5 mb-8 text-xs text-slate-700 dark:text-slate-300 font-medium">
                  <div className="flex items-center gap-2.5">
                    <Server size={15} className="text-rose-500 shrink-0" />
                    <span>Micro-Service Telemetry & Ingress</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Shield size={15} className="text-rose-500 shrink-0" />
                    <span>Section 10 National Weight Calibration</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Sparkles size={15} className="text-rose-500 shrink-0" />
                    <span>Section 20 Synthetic Cohort Pipeline</span>
                  </div>
                </div>
              </div>

              <Link
                href="/login/admin"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-rose-600 to-red-600 text-white px-5 py-3 rounded-xl font-bold hover:from-rose-500 hover:to-red-500 transition-all text-xs sm:text-sm shadow-md"
              >
                <span>{t('cta.admin', 'Admin Console')}</span>
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
