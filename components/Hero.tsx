'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Shield, GraduationCap, Building2 } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

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
      transition: { duration: 0.7, ease: 'easeOut' },
    },
  };

  const careerStages = [
    { label: t('hero.stageTraining', 'Training'), delay: 0, icon: '🎓' },
    { label: t('hero.stageAssessment', 'Assessment'), delay: 0.15, icon: '📊' },
    { label: t('hero.stageSkillGap', 'Skill Gap'), delay: 0.3, icon: '🔍' },
    { label: t('hero.stageApprenticeship', 'Apprenticeship'), delay: 0.45, icon: '💼' },
    { label: t('hero.stageEmployment', 'Employment'), delay: 0.6, icon: '🎯' },
    { label: t('hero.stageFollowUp', 'Follow-up'), delay: 0.75, icon: '📈' },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-light-blue/60 to-white dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 pt-10 pb-16 sm:pt-14 sm:pb-20 lg:pt-16 lg:pb-24 transition-colors duration-200">
      {/* Background glowing orbs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary-blue/5 dark:bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-saffron/5 dark:bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left: Text Content (7 cols) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-6"
          >
            <motion.div variants={itemVariants} className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 dark:bg-amber-500/15 border border-orange-200 dark:border-amber-500/30 text-saffron dark:text-amber-300 text-xs sm:text-sm font-semibold shadow-xs">
                <span className="w-2 h-2 rounded-full bg-saffron animate-pulse" />
                <span>{t('hero.badge', '“The certificate is not the outcome. What happens after the certificate is.”')}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white">
                <span className="block text-primary-navy dark:text-sky-300">
                  {t('hero.titleLine1', 'Track Skills. Measure Outcomes.')}
                </span>
                <span className="block mt-1 text-saffron dark:text-amber-400">
                  {t('hero.titleLine2', 'Build a Better Future.')}
                </span>
              </h1>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl"
            >
              {t(
                'hero.desc',
                "Skill Saarthi is India's consent-based Outcome Intelligence Layer connecting training credentials with verified post-placement careers, retention, wage growth, and skill gap remediation."
              )}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3 pt-2"
            >
              <Link
                href="/login/student"
                className="inline-flex items-center justify-center gap-2 bg-primary-navy dark:bg-primary-blue text-white px-6 py-3 rounded-xl font-bold hover:bg-deep-navy transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-blue text-sm"
              >
                <GraduationCap size={18} />
                <span>{t('hero.exploreStudent', 'Explore Student Portal')}</span>
                <ArrowRight size={16} />
              </Link>

              <Link
                href="/login/government"
                className="inline-flex items-center justify-center gap-2 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 px-6 py-3 rounded-xl font-bold border border-gray-300 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition-all shadow-xs text-sm"
              >
                <Building2 size={18} className="text-saffron" />
                <span>{t('hero.officerConsole', 'Officer & Admin Console')}</span>
              </Link>
            </motion.div>

            {/* Micro stats banner */}
            <motion.div
              variants={itemVariants}
              className="pt-4 grid grid-cols-3 gap-3 border-t border-gray-200 dark:border-slate-800"
            >
              <div>
                <p className="text-xl sm:text-2xl font-bold text-primary-navy dark:text-sky-300">42,750+</p>
                <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {t('hero.statTrainees', 'Trainees Tracked')}
                </p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-emerald-600 dark:text-emerald-400">74.2%</p>
                <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {t('hero.statTriangulation', 'Triangulation Accuracy')}
                </p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-saffron dark:text-amber-400">18 Months</p>
                <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {t('hero.statWindow', 'Longitudinal Window')}
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Career Stages Stepper Card (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="lg:col-span-5 bg-white dark:bg-slate-800/90 rounded-3xl p-6 sm:p-7 shadow-xl border border-gray-200 dark:border-slate-700 relative overflow-hidden"
          >
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-slate-700">
              <div className="flex items-center gap-2">
                <Shield size={18} className="text-primary-blue dark:text-sky-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">
                  Longitudinal Journey Stepper
                </span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                Active Protocol
              </span>
            </div>

            <div className="space-y-3.5 mt-5">
              {careerStages.map((stage, idx) => (
                <motion.div
                  key={stage.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: stage.delay, duration: 0.4 }}
                  className="flex items-center gap-3.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-gray-100 dark:border-slate-700/60 hover:border-primary-blue/30 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border-2 border-primary-blue/40 flex items-center justify-center text-lg shadow-xs shrink-0">
                    <span>{stage.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-sm text-slate-800 dark:text-slate-100 truncate">
                        {stage.label}
                      </p>
                      <span className="text-[10px] font-mono text-slate-400">Step {idx + 1}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                      {idx === 0 && 'NSDC / NCVET Certification'}
                      {idx === 1 && 'Domain Assessment & Rubric'}
                      {idx === 2 && 'AI Workplace Gap Analysis'}
                      {idx === 3 && 'On-Job Industrial Training'}
                      {idx === 4 && 'Multi-Source Triangulation'}
                      {idx === 5 && 'Month 3, 6, 12, 24 Survey'}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-gray-100 dark:border-slate-700 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="inline-flex items-center gap-1.5 font-semibold text-primary-navy dark:text-sky-300">
                <Sparkles size={14} className="text-saffron" />
                Triangulation Score: 78.4%
              </span>
              <span className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
                ✓ Verified
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
