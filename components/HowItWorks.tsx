'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { BookOpen, Zap, Search, Briefcase, Target, BarChart3 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function HowItWorks() {
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
      { threshold: 0.15 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const stages = [
    {
      icon: BookOpen,
      title: t('hero.stageTraining', 'Training'),
      description: t('how.step1Desc', 'Build foundational skills and obtain certified credential.'),
      color: 'from-blue-600 to-primary-blue',
    },
    {
      icon: Zap,
      title: t('hero.stageAssessment', 'Assessment'),
      description: 'Standardized NCVET skill qualification rubrics.',
      color: 'from-purple-600 to-indigo-600',
    },
    {
      icon: Search,
      title: t('hero.stageSkillGap', 'Skill Gap'),
      description: t('features.feat2Desc', 'AI identifies workplace gaps and non-placement causes.'),
      color: 'from-pink-600 to-purple-600',
    },
    {
      icon: Briefcase,
      title: t('hero.stageApprenticeship', 'Apprenticeship'),
      description: 'Hands-on industrial training & real workplace exposure.',
      color: 'from-saffron to-orange-600',
    },
    {
      icon: Target,
      title: t('hero.stageEmployment', 'Employment'),
      description: t('how.step3Title', 'Triangulate verified employment & wage consistency.'),
      color: 'from-emerald-500 to-green-600',
    },
    {
      icon: BarChart3,
      title: t('hero.stageFollowUp', 'Follow-up'),
      description: t('how.step2Desc', 'Milestone survey tracking at 3M, 6M, 12M, and 24M.'),
      color: 'from-rose-500 to-red-600',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <section
      ref={ref}
      className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-light-blue/40 via-white to-light-blue/20 dark:from-slate-850 dark:via-slate-900 dark:to-slate-850 transition-colors duration-200"
      id="how-it-works"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="space-y-12"
        >
          {/* Heading */}
          <motion.div variants={itemVariants} className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-primary-blue dark:text-sky-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800">
              {t('how.badge', 'Continuous Lifecycle')}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary-navy dark:text-white">
              {t('how.title', 'How Skill Saarthi Operates')}
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              {t('solution.axiom', 'CONNECT → FOLLOW → VERIFY → MEASURE → EXPLAIN → ACT')}
            </p>
          </motion.div>

          {/* Desktop Timeline */}
          <div className="hidden lg:block">
            <motion.div variants={containerVariants} className="relative">
              {/* Timeline line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.9, delay: 0.2, ease: 'easeInOut' }}
                className="absolute top-12 left-0 right-0 h-1 bg-gradient-to-r from-primary-blue via-saffron to-emerald-500 origin-left"
              />

              {/* Stages */}
              <div className="grid grid-cols-6 gap-3">
                {stages.map((stage, idx) => {
                  const Icon = stage.icon;
                  return (
                    <motion.div
                      key={stage.title}
                      variants={itemVariants}
                      className="flex flex-col items-center text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={inView ? { scale: 1 } : { scale: 0 }}
                        transition={{ delay: 0.2 + idx * 0.08, duration: 0.4 }}
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stage.color} flex items-center justify-center mb-4 text-white shadow-lg border-4 border-white dark:border-slate-800 relative z-10`}
                      >
                        <Icon size={24} />
                      </motion.div>

                      <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 mb-1">
                        {stage.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3">
                        {stage.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Mobile/Tablet Timeline */}
          <div className="lg:hidden">
            <motion.div variants={containerVariants} className="space-y-6 relative pl-6 border-l-2 border-primary-blue/30 dark:border-sky-500/30">
              {stages.map((stage, idx) => {
                const Icon = stage.icon;
                return (
                  <motion.div
                    key={stage.title}
                    variants={itemVariants}
                    className="flex gap-4 items-start"
                  >
                    <div
                      className={`w-11 h-11 rounded-xl bg-gradient-to-br ${stage.color} flex items-center justify-center text-white shadow-md border-2 border-white dark:border-slate-800 shrink-0 relative -left-8.5 z-10`}
                    >
                      <Icon size={18} />
                    </div>

                    <div className="pt-0.5">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                          {stage.title}
                        </h3>
                        <span className="text-[10px] font-mono text-slate-400">Step {idx + 1}</span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {stage.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
