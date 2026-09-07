'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function WhyItMatters() {
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
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const benefits = [
    'Better employment outcomes',
    'Data-driven policy decisions',
    'Stronger skilling ecosystems',
    'Early identification of skill gaps',
    'Long-term outcome tracking',
    'Better programme impact measurement',
  ];

  return (
    <section
      ref={ref}
      className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-deep-navy via-primary-navy to-primary-blue text-white overflow-hidden"
    >
      {/* Animated background elements */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute top-10 right-10 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"
      ></motion.div>
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="absolute -bottom-32 -left-32 w-96 h-96 bg-saffron opacity-5 rounded-full blur-3xl"
      ></motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="space-y-12"
        >
          {/* Heading */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              Why It Matters
            </h2>
            <p className="text-lg text-blue-100 max-w-2xl">
              Skill Saarthi transforms how we measure and improve skilling
              outcomes in India's digital economy.
            </p>
          </motion.div>

          {/* Benefits Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
          >
            {benefits.map((benefit, idx) => (
              <motion.div
                key={benefit}
                variants={itemVariants}
                whileHover={{
                  x: 8,
                  transition: { duration: 0.3 },
                }}
                className="flex items-start gap-4 bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20 hover:border-opacity-40 hover:bg-opacity-20 transition-all"
              >
                <div className="flex-shrink-0">
                  <CheckCircle2 size={24} className="text-saffron mt-1" />
                </div>
                <p className="text-lg font-semibold text-blue-100">
                  {benefit}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Call to Action */}
          <motion.div
            variants={itemVariants}
            className="text-center pt-8 border-t border-white border-opacity-20"
          >
            <p className="text-blue-100 text-lg mb-6 max-w-2xl mx-auto">
              Join us in building a smarter, more transparent skilling ecosystem
              that truly tracks and measures success.
            </p>
            <motion.a
              href="#demo"
              whileHover={{
                y: -4,
                boxShadow: '0 12px 24px rgba(232, 93, 4, 0.3)',
              }}
              className="inline-flex items-center gap-2 bg-saffron text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-orange-600 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-saffron focus:ring-offset-primary-navy"
            >
              Explore the Platform
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
