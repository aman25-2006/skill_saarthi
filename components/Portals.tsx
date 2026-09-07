'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import {
  GraduationCap,
  Briefcase,
  TrendingUp,
  BarChart3,
  AlertCircle,
  Brain,
  ArrowRight,
} from 'lucide-react';

export default function Portals() {
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
        staggerChildren: 0.2,
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
    <section ref={ref} className="py-16 sm:py-20 lg:py-24 bg-white">
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
              Two Powerful Portals
            </h2>
            <p className="text-lg text-text-muted max-w-2xl mx-auto">
              Tailored experiences for students and government stakeholders
            </p>
          </motion.div>

          {/* Portal Cards */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10"
          >
            {/* Student Portal */}
            <motion.div
              variants={itemVariants}
              whileHover={{
                y: -12,
                boxShadow: '0 20px 40px rgba(6, 59, 115, 0.15)',
              }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-blue to-primary-blue opacity-0 group-hover:opacity-5 rounded-2xl transition-all duration-300"></div>

              <div className="relative bg-white rounded-2xl p-8 sm:p-10 border-2 border-primary-blue shadow-lg hover:shadow-2xl transition-all">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-blue-100 text-primary-blue px-4 py-2 rounded-full mb-6 font-semibold text-sm">
                  <GraduationCap size={16} />
                  Student Portal
                </div>

                {/* Title */}
                <h3 className="text-2xl sm:text-3xl font-bold text-text-dark mb-3">
                  Track your journey. Identify skill gaps. Build your career.
                </h3>

                {/* Description */}
                <p className="text-text-muted mb-8 text-lg">
                  Complete visibility into your skills, employment status and career
                  progression.
                </p>

                {/* Features List */}
                <div className="space-y-3 mb-8">
                  <div className="flex items-start gap-3">
                    <GraduationCap size={20} className="text-primary-blue mt-1 flex-shrink-0" />
                    <span className="text-text-dark">Skill Profile & Assessment</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Brain size={20} className="text-primary-blue mt-1 flex-shrink-0" />
                    <span className="text-text-dark">
                      AI Skill-Gap Analysis
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Briefcase size={20} className="text-primary-blue mt-1 flex-shrink-0" />
                    <span className="text-text-dark">
                      Employment Tracking
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <TrendingUp size={20} className="text-primary-blue mt-1 flex-shrink-0" />
                    <span className="text-text-dark">Wage Progression</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <BarChart3 size={20} className="text-primary-blue mt-1 flex-shrink-0" />
                    <span className="text-text-dark">Career Analytics</span>
                  </div>
                </div>

                {/* CTA Button */}
                <motion.a
                  href="/login/student"
                  whileHover={{ x: 4 }}
                  className="inline-flex items-center gap-2 bg-primary-blue text-white px-8 py-3 rounded-lg font-semibold hover:bg-deep-navy transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-blue"
                >
                  Student Login
                  <ArrowRight size={18} />
                </motion.a>
              </div>
            </motion.div>

            {/* Government Portal */}
            <motion.div
              variants={itemVariants}
              whileHover={{
                y: -12,
                boxShadow: '0 20px 40px rgba(232, 93, 4, 0.15)',
              }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-saffron to-saffron opacity-0 group-hover:opacity-5 rounded-2xl transition-all duration-300"></div>

              <div className="relative bg-white rounded-2xl p-8 sm:p-10 border-2 border-saffron shadow-lg hover:shadow-2xl transition-all">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-orange-100 text-saffron px-4 py-2 rounded-full mb-6 font-semibold text-sm">
                  <BarChart3 size={16} />
                  Government Portal
                </div>

                {/* Title */}
                <h3 className="text-2xl sm:text-3xl font-bold text-text-dark mb-3">
                  Turn outcome data into better skilling decisions.
                </h3>

                {/* Description */}
                <p className="text-text-muted mb-8 text-lg">
                  Government-grade analytics for policy-making and programme
                  improvement.
                </p>

                {/* Features List */}
                <div className="space-y-3 mb-8">
                  <div className="flex items-start gap-3">
                    <BarChart3 size={20} className="text-saffron mt-1 flex-shrink-0" />
                    <span className="text-text-dark">Cohort Analytics</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Briefcase size={20} className="text-saffron mt-1 flex-shrink-0" />
                    <span className="text-text-dark">
                      Employment Outcomes
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Brain size={20} className="text-saffron mt-1 flex-shrink-0" />
                    <span className="text-text-dark">Skill Gap Trends</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <TrendingUp size={20} className="text-saffron mt-1 flex-shrink-0" />
                    <span className="text-text-dark">
                      Provider Performance
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <AlertCircle size={20} className="text-saffron mt-1 flex-shrink-0" />
                    <span className="text-text-dark">AI Insights & Alerts</span>
                  </div>
                </div>

                {/* CTA Button */}
                <motion.a
                  href="/login/government"
                  whileHover={{ x: 4 }}
                  className="inline-flex items-center gap-2 bg-saffron text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-saffron"
                >
                  Government Login
                  <ArrowRight size={18} />
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
