'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { BarChart3, TrendingUp, AlertCircle, Users } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Problem() {
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
        staggerChildren: 0.12,
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

  const problems = [
    {
      icon: Users,
      title: t('problem.card1Title', 'Unverified Placement Claims'),
      value: '90%',
      description: t('problem.card1Desc', 'Placement claims lack multi-source verification or evidence checks.'),
      color: 'bg-blue-100 dark:bg-blue-900/40 text-primary-blue dark:text-sky-300',
    },
    {
      icon: TrendingUp,
      title: t('problem.card2Title', 'Early Career Attrition'),
      value: '38% Drop',
      description: t('problem.card2Desc', 'Youth leave their first jobs in 6 months due to migration or wage hurdles.'),
      color: 'bg-orange-100 dark:bg-amber-900/40 text-saffron dark:text-amber-300',
    },
    {
      icon: AlertCircle,
      title: t('problem.card3Title', 'Blind Skill-Job Mismatches'),
      value: 'Invisible',
      description: t('problem.card3Desc', 'Centers have no feedback loop to fix modules that fail industry demand.'),
      color: 'bg-red-100 dark:bg-rose-900/40 text-red-600 dark:text-rose-300',
    },
    {
      icon: BarChart3,
      title: t('hero.stageFollowUp', 'Long-term Retention'),
      value: '18 Months',
      description: t('problem.desc', 'Government needs sustained visibility on wage progression and retention.'),
      color: 'bg-green-100 dark:bg-emerald-900/40 text-success-green dark:text-emerald-300',
    },
  ];

  return (
    <section ref={ref} className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-slate-900 transition-colors duration-200" id="about">
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
              {t('problem.badge', 'The Critical Information Gap')}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary-navy dark:text-white">
              {t('problem.title', 'The Missing 18 Months After Certification')}
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              {t(
                'problem.desc',
                'India excels at training and certifying millions. However, government stakeholders lack reliable visibility into what happens after: Did the learner enter employment? Is retention sustained after 6, 12, or 24 months?'
              )}
            </p>
          </motion.div>

          {/* Problem Cards Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {problems.map((problem) => {
              const Icon = problem.icon;
              return (
                <motion.div
                  key={problem.title}
                  variants={itemVariants}
                  whileHover={{
                    y: -6,
                    transition: { duration: 0.25 },
                  }}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-lg transition-all"
                >
                  <div className={`${problem.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                    <Icon size={24} />
                  </div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 mb-1.5 line-clamp-1">
                    {problem.title}
                  </h3>
                  <p className="text-2xl font-black text-primary-navy dark:text-sky-300 mb-2">
                    {problem.value}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {problem.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
