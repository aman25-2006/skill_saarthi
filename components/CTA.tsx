'use client';

import { motion } from 'framer-motion';
import { ArrowRight, GraduationCap, Building2, Server } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function CTA() {
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
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section className="relative py-16 sm:py-20 lg:py-28 bg-gradient-to-r from-light-blue/50 via-white to-blue-50/50 dark:from-slate-850 dark:via-slate-900 dark:to-slate-850 transition-colors duration-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="space-y-8 text-center"
        >
          {/* Heading */}
          <motion.div variants={itemVariants} className="space-y-3">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary-navy dark:text-white leading-tight">
              {t('cta.title', 'Ready to Measure Sustainable Livelihood Outcomes?')}
            </h2>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            {t('cta.desc', 'Join central ministries, state skill development missions, and thousands of certified learners on India\'s unified outcome tracking network.')}
          </motion.p>

          {/* Buttons: All 3 Portals */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-2"
          >
            <Link
              href="/login/student"
              className="inline-flex items-center justify-center gap-2 bg-primary-blue text-white px-6 py-3.5 rounded-xl font-bold hover:bg-deep-navy transition-all shadow-md text-sm"
            >
              <GraduationCap size={18} />
              <span>{t('cta.student', 'Student Sign In')}</span>
              <ArrowRight size={16} />
            </Link>

            <Link
              href="/login/government"
              className="inline-flex items-center justify-center gap-2 bg-saffron text-white px-6 py-3.5 rounded-xl font-bold hover:bg-orange-600 transition-all shadow-md text-sm"
            >
              <Building2 size={18} />
              <span>{t('cta.gov', 'Government Sign In')}</span>
              <ArrowRight size={16} />
            </Link>

            <Link
              href="/login/admin"
              className="inline-flex items-center justify-center gap-2 bg-slate-900 dark:bg-slate-800 text-white border border-slate-700 px-6 py-3.5 rounded-xl font-bold hover:bg-slate-800 dark:hover:bg-slate-700 transition-all shadow-md text-sm"
            >
              <Server size={18} className="text-rose-400" />
              <span>{t('cta.admin', 'Admin Console')}</span>
            </Link>
          </motion.div>

          {/* Supporting text */}
          <motion.p
            variants={itemVariants}
            className="text-slate-500 dark:text-slate-400 text-xs pt-4 border-t border-gray-200 dark:border-slate-800 max-w-xl mx-auto"
          >
            Unified National Skilling Platform • Open API &amp; DigiLocker Integrated • Zero Trust Architecture
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
