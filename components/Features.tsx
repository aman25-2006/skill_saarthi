'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import {
  Brain,
  Clock,
  TrendingUp,
  BarChart3,
  ShieldCheck,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Features() {
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

  const features = [
    {
      icon: ShieldCheck,
      title: t('features.feat1Title', 'Multi-Source Triangulation'),
      description: t('features.feat1Desc', 'Cross-validates WhatsApp micro-surveys, employer attestation, salary consistency, and DigiLocker records.'),
      gradient: 'from-blue-600 to-primary-blue',
    },
    {
      icon: Brain,
      title: t('features.feat2Title', 'AI Skill Gap Diagnostics'),
      description: t('features.feat2Desc', 'PIN-points exact technical defects and non-placement causes to suggest personalized bridge courses.'),
      gradient: 'from-purple-600 to-indigo-600',
    },
    {
      icon: Clock,
      title: t('hero.stageFollowUp', 'Follow-up System (3M, 6M, 12M, 24M)'),
      description: t('how.step2Desc', 'Quick 30-second WhatsApp micro-surveys at Month 3, 6, 12, and 24 to check employment, wages, and challenges.'),
      gradient: 'from-saffron to-orange-600',
    },
    {
      icon: TrendingUp,
      title: t('impact.metric4Label', 'Average Wage Progression'),
      description: t('problem.desc', 'Continuous longitudinal wage tracking assessing career mobility over the 2-year post-certification window.'),
      gradient: 'from-emerald-500 to-green-600',
    },
    {
      icon: BarChart3,
      title: t('portals.govTitle', 'Government Officer Intelligence'),
      description: t('portals.govDesc', 'District & state dashboards, VTP accreditation tracking, Section 14 Nashik benchmark equations, and cohort reviews.'),
      gradient: 'from-rose-500 to-red-600',
    },
    {
      icon: ShieldCheck,
      title: t('features.feat3Title', 'DPDP Act 2023 Consent Ledger'),
      description: t('features.feat3Desc', 'Cryptographic consent trails ensuring all post-training outcome data is shared strictly with learner permission.'),
      gradient: 'from-amber-500 to-saffron',
    },
  ];

  return (
    <section
      ref={ref}
      className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-slate-900 transition-colors duration-200"
      id="features"
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
            <span className="text-xs font-bold uppercase tracking-wider text-saffron dark:text-amber-400 bg-orange-50 dark:bg-amber-500/10 px-3 py-1 rounded-full border border-orange-200 dark:border-amber-500/20">
              {t('features.badge', 'Engine Capabilities')}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary-navy dark:text-white">
              {t('features.title', 'Engineered for High-Trust Governance')}
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              {t('why.title', 'Comprehensive tools for complete employment outcome tracking')}
            </p>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  variants={itemVariants}
                  whileHover={{
                    y: -6,
                    transition: { duration: 0.25 },
                  }}
                  className="group"
                >
                  <div className="relative h-full bg-slate-50 dark:bg-slate-800 rounded-3xl p-7 border border-gray-200 dark:border-slate-700 hover:border-primary-blue dark:hover:border-sky-500 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between">
                    <div>
                      {/* Gradient icon background */}
                      <div
                        className={`w-13 h-13 w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 shadow-md group-hover:scale-105 transition-transform text-white`}
                      >
                        <Icon size={24} />
                      </div>

                      {/* Content */}
                      <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-gray-200/60 dark:border-slate-700/60 text-[11px] font-bold text-primary-blue dark:text-sky-400">
                      Active Telemetry →
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
