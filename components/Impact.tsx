'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function Impact() {
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

  const Counter = ({ end, duration }: { end: number; duration: number }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!inView) return;

      let start = 0;
      const increment = end / (duration * 60);
      const interval = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(interval);
        } else {
          setCount(Math.floor(start));
        }
      }, 1000 / 60);

      return () => clearInterval(interval);
    }, [inView, end, duration]);

    return <span>{count.toLocaleString()}</span>;
  };

  const metrics = [
    {
      value: <Counter end={42750} duration={1.5} />,
      label: t('impact.metric1Label', 'Active Consented Trainees'),
      suffix: '+',
      color: 'text-primary-blue dark:text-sky-400',
    },
    {
      value: <Counter end={74} duration={1.5} />,
      label: t('impact.metric2Label', 'Verified Employment Rate'),
      suffix: '.2%',
      color: 'text-saffron dark:text-amber-400',
    },
    {
      value: <Counter end={61} duration={1.5} />,
      label: t('impact.metric3Label', '6-Month Sustained Retention'),
      suffix: '.0%',
      color: 'text-emerald-600 dark:text-emerald-400',
    },
    {
      value: <Counter end={18} duration={1.5} />,
      label: t('impact.metric4Label', 'Average Wage Progression'),
      prefix: '+',
      suffix: '.4%',
      color: 'text-primary-navy dark:text-indigo-400',
    },
  ];

  return (
    <section
      ref={ref}
      className="py-16 sm:py-20 lg:py-24 bg-gradient-to-r from-light-blue/50 via-white to-blue-50/50 dark:from-slate-850 dark:via-slate-900 dark:to-slate-850 transition-colors duration-200"
      id="impact"
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
              {t('impact.badge', 'Target Outcomes')}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary-navy dark:text-white">
              {t('impact.title', 'Measurable National Impact')}
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              {t('why.title', 'Evidence-based metrics showing the power of longitudinal outcome tracking')}
            </p>
          </motion.div>

          {/* Metrics Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {metrics.map((metric, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -6 }}
                className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all border border-gray-200 dark:border-slate-700 text-center"
              >
                <div className={`text-4xl sm:text-5xl font-black mb-2 ${metric.color}`}>
                  {metric.prefix && <span>{metric.prefix}</span>}
                  {metric.value}
                  {metric.suffix && <span>{metric.suffix}</span>}
                </div>
                <p className="text-slate-600 dark:text-slate-300 font-bold text-sm sm:text-base mt-2">
                  {metric.label}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Section 20 Synthetic Data Protocol Banner */}
          <motion.div
            variants={itemVariants}
            className="bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800/60 p-5 rounded-2xl flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse shrink-0" />
              <p className="text-xs sm:text-sm text-amber-900 dark:text-amber-200 font-medium">
                <strong>{t('portal.demoWatermark', 'DEMO / SYNTHETIC DATA (Section 20 Protocol)')}:</strong> Figures represent calibrated demonstration cohort models across Nashik, Bhagalpur, and Varanasi.
              </p>
            </div>
            <span className="hidden sm:inline text-xs font-mono font-bold text-amber-700 dark:text-amber-300 shrink-0">
              Section 20 Compliant
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
