'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function WhyItMatters() {
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

  const benefits = [
    t('why.student', 'For Students: Lifelong verified career credentials, wage growth tracking, and rapid upskilling recommendations.'),
    t('why.provider', 'For Training Providers: Objective performance recognition, outcome-based funding validation, and employer tie-ups.'),
    t('why.government', 'For Government: Evidence-based fund allocation, elimination of ghost placements, and targeted curriculum policy.'),
    'Section 10 Triangulated Evidence Confidence Standard (≥75% Verified)',
    'DPDP Act 2023 Digital Consent Lifecycle with 1-Click Revocation',
    'AI Root-Cause Diagnosis of Post-Training Workplace Attrition',
  ];

  return (
    <section
      ref={ref}
      className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-deep-navy via-primary-navy to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-white overflow-hidden transition-colors duration-200"
    >
      {/* Glow shapes */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-saffron/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="space-y-12"
        >
          {/* Heading */}
          <motion.div variants={itemVariants} className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-white/10 px-3 py-1 rounded-full border border-white/20">
              {t('why.badge', 'Ecosystem Benefits')}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
              {t('why.title', 'Value Across the Skilling Value Chain')}
            </h2>
            <p className="text-base sm:text-lg text-blue-100 dark:text-slate-300 max-w-2xl leading-relaxed">
              Skill Saarthi transforms how we measure and improve skilling outcomes in India\'s digital economy.
            </p>
          </motion.div>

          {/* Benefits Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6"
          >
            {benefits.map((benefit) => (
              <motion.div
                key={benefit}
                variants={itemVariants}
                whileHover={{ x: 4 }}
                className="flex items-start gap-4 bg-white/10 dark:bg-slate-850/80 backdrop-blur-sm rounded-2xl p-6 border border-white/15 dark:border-slate-700/80 hover:border-white/30 transition-all"
              >
                <div className="shrink-0 mt-0.5">
                  <CheckCircle2 size={22} className="text-saffron dark:text-amber-400" />
                </div>
                <p className="text-sm sm:text-base font-semibold text-blue-50 dark:text-slate-200 leading-relaxed">
                  {benefit}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Call to Action */}
          <motion.div
            variants={itemVariants}
            className="text-center pt-8 border-t border-white/15 dark:border-slate-800"
          >
            <p className="text-blue-100 dark:text-slate-300 text-sm sm:text-base mb-6 max-w-2xl mx-auto">
              {t('cta.desc', 'Join central ministries, state skill development missions, and thousands of certified learners on India\'s unified outcome tracking network.')}
            </p>
            <Link
              href="/login/government"
              className="inline-flex items-center gap-2 bg-saffron text-white px-8 py-3.5 rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg text-sm"
            >
              <span>{t('cta.gov', 'Government Officer Login')}</span>
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
