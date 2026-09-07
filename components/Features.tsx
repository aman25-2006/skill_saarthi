'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import {
  Brain,
  Briefcase,
  Clock,
  TrendingUp,
  BarChart3,
  Zap,
} from 'lucide-react';

export default function Features() {
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

  const features = [
    {
      icon: Brain,
      title: 'AI Skill-Gap Engine',
      description:
        'Analyze interview/assessment feedback and identify missing skills.',
      gradient: 'from-blue-500 to-primary-blue',
    },
    {
      icon: Briefcase,
      title: 'Employment Tracking',
      description: 'Track current employment, role, company and salary.',
      gradient: 'from-purple-500 to-blue-500',
    },
    {
      icon: Clock,
      title: 'Follow-up System',
      description: 'Track outcomes at 3M, 6M, 12M and 24M milestones.',
      gradient: 'from-saffron to-orange-600',
    },
    {
      icon: TrendingUp,
      title: 'Wage Progression',
      description: 'Track salary growth and career advancement over time.',
      gradient: 'from-success-green to-green-600',
    },
    {
      icon: BarChart3,
      title: 'Government Analytics',
      description:
        'Monitor employment, retention and programme outcomes at scale.',
      gradient: 'from-red-500 to-pink-500',
    },
    {
      icon: Zap,
      title: 'AI-Powered Insights',
      description:
        'Identify recurring skill gaps, attrition trends and programme impact.',
      gradient: 'from-yellow-500 to-saffron',
    },
  ];

  return (
    <section
      ref={ref}
      className="py-16 sm:py-20 lg:py-24 bg-white"
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
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-navy">
              Everything You Need to Track What Happens After Training
            </h2>
            <p className="text-lg text-text-muted max-w-2xl mx-auto">
              Comprehensive tools for complete employment outcome tracking
            </p>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  variants={itemVariants}
                  whileHover={{
                    y: -8,
                    transition: { duration: 0.3 },
                  }}
                  className="group"
                >
                  <div className="relative h-full bg-gradient-to-br from-white to-light-blue rounded-2xl p-8 border border-gray-200 hover:border-primary-blue shadow-sm hover:shadow-xl transition-all cursor-pointer">
                    {/* Gradient icon background */}
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}
                    >
                      <Icon size={28} className="text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-text-dark mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-text-muted leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Animated accent line */}
                    <motion.div
                      initial={{ width: 0 }}
                      whileHover={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                      className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary-blue to-saffron rounded-b-2xl"
                    ></motion.div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* CTA */}
          <motion.div
            variants={itemVariants}
            className="text-center pt-8"
          >
            <p className="text-text-muted text-lg">
              All features designed with government transparency and student
              privacy in mind.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
