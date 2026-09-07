'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { BookOpen, Zap, Search, Briefcase, Target, BarChart3 } from 'lucide-react';

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

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
      title: 'Training',
      description: 'Build foundational skills',
      color: 'from-blue-500 to-primary-blue',
    },
    {
      icon: Zap,
      title: 'Assessment',
      description: 'Evaluate performance',
      color: 'from-purple-500 to-blue-500',
    },
    {
      icon: Search,
      title: 'Skill Gap',
      description: 'Identify missing skills',
      color: 'from-pink-500 to-purple-500',
    },
    {
      icon: Briefcase,
      title: 'Apprenticeship',
      description: 'Gain real-world experience',
      color: 'from-saffron to-orange-600',
    },
    {
      icon: Target,
      title: 'Employment',
      description: 'Get placed in jobs',
      color: 'from-success-green to-green-600',
    },
    {
      icon: BarChart3,
      title: 'Follow-up',
      description: 'Track progress at 3M, 6M, 12M and 24M',
      color: 'from-red-500 to-pink-500',
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section
      ref={ref}
      className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-light-blue to-white"
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
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-navy">
              How It Works
            </h2>
            <p className="text-lg text-text-muted max-w-2xl mx-auto">
              A complete journey from training to employment and beyond
            </p>
          </motion.div>

          {/* Desktop Timeline */}
          <div className="hidden lg:block">
            <motion.div
              variants={containerVariants}
              className="relative"
            >
              {/* Timeline line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: 'easeInOut' }}
                className="absolute top-16 left-0 right-0 h-1 bg-gradient-to-r from-primary-blue via-saffron to-success-green origin-left"
              ></motion.div>

              {/* Stages */}
              <div className="grid grid-cols-6 gap-4">
                {stages.map((stage, idx) => {
                  const Icon = stage.icon;
                  return (
                    <motion.div
                      key={stage.title}
                      variants={itemVariants}
                      className="flex flex-col items-center"
                    >
                      {/* Icon Circle */}
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={inView ? { scale: 1 } : { scale: 0 }}
                        transition={{
                          delay: 0.4 + idx * 0.1,
                          duration: 0.5,
                        }}
                        className={`w-20 h-20 rounded-full bg-gradient-to-br ${stage.color} flex items-center justify-center mb-6 text-white shadow-lg border-4 border-white relative z-10`}
                      >
                        <Icon size={32} />
                      </motion.div>

                      {/* Text */}
                      <h3 className="font-bold text-lg text-text-dark text-center mb-2">
                        {stage.title}
                      </h3>
                      <p className="text-sm text-text-muted text-center">
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
            <motion.div
              variants={containerVariants}
              className="space-y-8 relative pl-8"
            >
              {/* Vertical line */}
              <motion.div
                initial={{ scaleY: 0 }}
                animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: 'easeInOut' }}
                className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-blue via-saffron to-success-green origin-top"
              ></motion.div>

              {stages.map((stage, idx) => {
                const Icon = stage.icon;
                return (
                  <motion.div
                    key={stage.title}
                    variants={itemVariants}
                    className="flex gap-6"
                  >
                    {/* Icon */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={inView ? { scale: 1 } : { scale: 0 }}
                      transition={{
                        delay: 0.4 + idx * 0.1,
                        duration: 0.5,
                      }}
                      className={`w-14 h-14 rounded-full bg-gradient-to-br ${stage.color} flex items-center justify-center text-white shadow-lg border-4 border-white flex-shrink-0 relative -left-11 z-10`}
                    >
                      <Icon size={24} />
                    </motion.div>

                    {/* Content */}
                    <div className="pt-2">
                      <h3 className="font-bold text-lg text-text-dark mb-1">
                        {stage.title}
                      </h3>
                      <p className="text-sm text-text-muted">
                        {stage.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Bottom CTA */}
          <motion.div
            variants={itemVariants}
            className="text-center pt-8 border-t border-gray-200"
          >
            <p className="text-text-muted text-lg mb-4">
              Each stage is continuously monitored and analysed to ensure better
              outcomes.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
