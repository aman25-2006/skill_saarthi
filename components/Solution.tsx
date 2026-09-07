'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Eye, Zap, TrendingUp } from 'lucide-react';

export default function Solution() {
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

  const pillars = [
    {
      number: '01',
      title: 'Track',
      description: 'Employment and career outcomes',
      icon: Eye,
      color: 'from-primary-blue to-primary-blue',
    },
    {
      number: '02',
      title: 'Analyse',
      description: 'Skill gaps and outcome patterns',
      icon: Zap,
      color: 'from-saffron to-orange-600',
    },
    {
      number: '03',
      title: 'Improve',
      description: 'Training programmes using data-driven insights',
      icon: TrendingUp,
      color: 'from-success-green to-green-600',
    },
  ];

  return (
    <section
      ref={ref}
      className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-light-blue to-white"
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
              Our Solution
            </h2>
            <p className="text-lg sm:text-xl text-text-muted max-w-2xl mx-auto leading-relaxed">
              Skill Saarthi uses AI-powered insights and longitudinal tracking to
              monitor employment outcomes, identify skill gaps, and measure the real
              impact of skilling programmes.
            </p>
          </motion.div>

          {/* Three Pillars */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
          >
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.number}
                  variants={itemVariants}
                  whileHover={{
                    y: -12,
                    transition: { duration: 0.3 },
                  }}
                  className="relative"
                >
                  {/* Card */}
                  <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl border border-gray-100 transition-all h-full">
                    {/* Number */}
                    <div className="text-6xl font-bold bg-gradient-to-r from-gray-200 to-gray-300 bg-clip-text text-transparent mb-4">
                      {pillar.number}
                    </div>

                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${pillar.color} flex items-center justify-center mb-6 text-white`}>
                      <Icon size={28} />
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold text-text-dark mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-text-muted text-lg leading-relaxed">
                      {pillar.description}
                    </p>

                    {/* Decorative line */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary-blue to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-b-2xl"></div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Connection visualization */}
          <motion.div
            variants={itemVariants}
            className="hidden lg:flex justify-center items-center gap-8 pt-12"
          >
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-4xl text-text-muted"
            >
              →
            </motion.div>
            <motion.div
              animate={{ x: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
              className="text-4xl text-text-muted"
            >
              ←
            </motion.div>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
              className="text-4xl text-text-muted"
            >
              →
            </motion.div>
          </motion.div>

          {/* Supporting text */}
          <motion.p
            variants={itemVariants}
            className="text-center text-text-muted max-w-2xl mx-auto text-lg"
          >
            This integrated approach enables stakeholders to make data-driven
            decisions and continuously improve skilling outcomes.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
