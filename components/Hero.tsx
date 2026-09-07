'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';

export default function Hero() {
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
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const careerStages = [
    { label: 'Training', delay: 0 },
    { label: 'Assessment', delay: 0.2 },
    { label: 'Skill Gap', delay: 0.4 },
    { label: 'Apprenticeship', delay: 0.6 },
    { label: 'Employment', delay: 0.8 },
    { label: 'Follow-up', delay: 1 },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-light-blue to-white pt-12 pb-20 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="block text-primary-navy">
                  Track Skills. Measure Outcomes.
                </span>
                <span className="block mt-2">
                  <span className="text-saffron">Build a Better Future.</span>
                </span>
              </h1>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-text-muted leading-relaxed max-w-xl"
            >
              Skill Saarthi helps track employment outcomes, identify skill gaps
              and measure the real impact of skilling programmes — for
              individuals, training providers and the government.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <motion.a
                href="#demo"
                whileHover={{ y: -4, boxShadow: '0 12px 24px rgba(6, 59, 115, 0.2)' }}
                whileTap={{ y: -2 }}
                className="inline-flex items-center justify-center gap-2 bg-saffron text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-orange-600 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-saffron"
              >
                <Play size={18} />
                Try Demo
                <ArrowRight size={18} />
              </motion.a>

              <motion.a
                href="#how-it-works"
                whileHover={{ y: -4, boxShadow: '0 12px 24px rgba(11, 92, 171, 0.1)' }}
                whileTap={{ y: -2 }}
                className="inline-flex items-center justify-center gap-2 bg-light-blue text-primary-blue px-8 py-3.5 rounded-lg font-semibold border-2 border-primary-blue hover:bg-primary-blue hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-blue"
              >
                Learn More
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right: Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="relative h-80 sm:h-96 lg:h-full"
          >
            {/* Career Journey Visualization */}
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Vertical Journey Line - Mobile/Tablet */}
              <div className="lg:hidden absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-primary-blue via-saffron to-success-green opacity-50"></div>

              {/* Horizontal Journey Line - Desktop */}
              <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary-blue via-saffron to-success-green transform -translate-y-1/2"></div>

              {/* Career Stages - Responsive Layout */}
              <div className="hidden lg:flex gap-8 w-full justify-between">
                {careerStages.map((stage, idx) => (
                  <motion.div
                    key={stage.label}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: stage.delay,
                      duration: 0.5,
                    }}
                    className="flex flex-col items-center gap-3 flex-1"
                  >
                    <div className="w-16 h-16 bg-white border-4 border-primary-blue rounded-full flex items-center justify-center shadow-lg relative z-10">
                      <span className="text-2xl">
                        {['🎓', '📊', '🔍', '💼', '🎯', '📈'][idx]}
                      </span>
                    </div>
                    <p className="font-semibold text-sm text-center text-text-dark whitespace-nowrap">
                      {stage.label}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Mobile/Tablet Vertical Layout */}
              <div className="lg:hidden flex flex-col gap-6 pl-12">
                {careerStages.map((stage, idx) => (
                  <motion.div
                    key={stage.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: stage.delay,
                      duration: 0.5,
                    }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-12 h-12 bg-white border-3 border-primary-blue rounded-full flex items-center justify-center shadow-lg relative z-10 flex-shrink-0">
                      <span className="text-xl">
                        {['🎓', '📊', '🔍', '💼', '🎯', '📈'][idx]}
                      </span>
                    </div>
                    <p className="font-semibold text-sm text-text-dark">
                      {stage.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Decorative elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-8 right-8 w-16 h-16 bg-saffron rounded-lg opacity-10"
            ></motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
              className="absolute bottom-12 left-16 w-20 h-20 bg-primary-blue rounded-full opacity-10"
            ></motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
