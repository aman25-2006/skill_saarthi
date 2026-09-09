'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Eye, Zap, TrendingUp, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Solution() {
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
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const pillars = [
    {
      number: '01',
      title: t('features.feat1Title', 'Multi-Source Triangulation'),
      description: t('features.feat1Desc', 'Cross-validates learner surveys, employer attestation, and bank salary slips.'),
      icon: Eye,
      color: 'from-primary-blue to-blue-700',
    },
    {
      number: '02',
      title: t('features.feat2Title', 'AI Skill Gap Diagnostics'),
      description: t('features.feat2Desc', 'Identifies exact workplace skill mismatches to trigger personalized bridge courses.'),
      icon: Zap,
      color: 'from-saffron to-orange-600',
    },
    {
      number: '03',
      title: t('features.feat4Title', 'Section 10 Decision Matrix'),
      description: t('features.feat4Desc', 'Standardized national evidence confidence scoring: ≥75% Verified, 40-74% Review, <40% Unverified.'),
      icon: TrendingUp,
      color: 'from-emerald-500 to-green-600',
    },
  ];

  return (
    <section
      ref={ref}
      className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-light-blue/50 via-white to-light-blue/30 dark:from-slate-850 dark:via-slate-900 dark:to-slate-850 transition-colors duration-200"
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
              {t('solution.badge', 'Outcome Intelligence Layer')}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary-navy dark:text-white">
              {t('solution.title', 'Moving from Counting Placements to Measuring Livelihoods')}
            </h2>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-primary-navy/5 dark:bg-slate-800 text-primary-navy dark:text-sky-300 font-mono text-xs sm:text-sm font-bold border border-primary-navy/10 dark:border-slate-700">
              <span>{t('solution.axiom', 'CONNECT → FOLLOW → VERIFY → MEASURE → EXPLAIN → ACT')}</span>
            </div>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed pt-2">
              {t(
                'solution.desc',
                'Skill Saarthi does not claim absolute certainty. Instead, our Outcome Evidence Engine asks: “How strong is the available evidence supporting this reported outcome?”'
              )}
            </p>
          </motion.div>

          {/* Three Pillars */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
          >
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.number}
                  variants={itemVariants}
                  whileHover={{
                    y: -8,
                    transition: { duration: 0.25 },
                  }}
                  className="relative"
                >
                  <div className="bg-white dark:bg-slate-800 rounded-3xl p-7 shadow-sm hover:shadow-xl border border-gray-200 dark:border-slate-700 transition-all h-full flex flex-col justify-between">
                    <div>
                      {/* Number */}
                      <div className="text-5xl font-black text-slate-200 dark:text-slate-700 mb-3 font-mono">
                        {pillar.number}
                      </div>

                      {/* Icon */}
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${pillar.color} flex items-center justify-center mb-5 text-white shadow-md`}>
                        <Icon size={24} />
                      </div>

                      {/* Content */}
                      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                        {pillar.title}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-100 dark:border-slate-700 flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                      <CheckCircle size={14} />
                      <span>National Standard</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
