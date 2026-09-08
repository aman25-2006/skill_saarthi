'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { BarChart3, TrendingUp, AlertCircle, Users } from 'lucide-react';

export default function Problem() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

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
        delayChildren: 0.2,
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

  const problems = [
    {
      icon: Users,
      title: 'Training Completed',
      value: '90%',
      description: 'But outcomes unknown',
      color: 'bg-blue-100 text-primary-blue',
    },
    {
      icon: TrendingUp,
      title: 'Employment Rate',
      value: '?',
      description: 'Often unmeasured',
      color: 'bg-orange-100 text-saffron',
    },
    {
      icon: AlertCircle,
      title: 'Skill Gaps',
      value: 'Invisible',
      description: 'Hard to identify',
      color: 'bg-red-100 text-red-600',
    },
    {
      icon: BarChart3,
      title: 'Long-term Retention',
      value: '?',
      description: 'Rarely tracked',
      color: 'bg-green-100 text-success-green',
    },
  ];

  return (
    <section ref={ref} className="py-16 sm:py-20 lg:py-24 bg-white" id="about">
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
              The Problem
            </h2>
            <p className="text-lg sm:text-xl text-text-muted max-w-2xl mx-auto leading-relaxed">
              Most skilling systems tell us how many people were trained. But
              they often fail to track what happens after training — whether
              people get employed, how their skills evolve, why they leave jobs,
              and what needs to improve.
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
                    y: -8,
                    transition: { duration: 0.3 },
                  }}
                  className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all"
                >
                  <div className={`${problem.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                    <Icon size={24} />
                  </div>
                  <h3 className="font-bold text-lg text-text-dark mb-2">
                    {problem.title}
                  </h3>
                  <p className="text-2xl font-bold text-primary-navy mb-2">
                    {problem.value}
                  </p>
                  <p className="text-sm text-text-muted">{problem.description}</p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* CTA */}
          <motion.div
            variants={itemVariants}
            className="text-center pt-8 border-t border-gray-200"
          >
            <p className="text-text-muted mb-4">
              These challenges affect training providers, governments and
              individuals alike.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
