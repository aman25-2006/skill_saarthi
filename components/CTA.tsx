'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';

export default function CTA() {
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section className="relative py-16 sm:py-20 lg:py-28 bg-gradient-to-r from-light-blue to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-8 text-center"
        >
          {/* Heading */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-navy leading-tight">
              Don't Just Track Training.
              <br />
              <span className="text-saffron">Track What Happens Next.</span>
            </h2>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-text-muted max-w-3xl mx-auto leading-relaxed"
          >
            Skill Saarthi connects training, skills, employment and long-term
            outcomes in one intelligent platform. Make better decisions. Create
            better futures.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
          >
            <motion.a
              href="#demo"
              whileHover={{
                y: -4,
                boxShadow: '0 12px 24px rgba(232, 93, 4, 0.2)',
              }}
              whileTap={{ y: -2 }}
              className="inline-flex items-center justify-center gap-2 bg-saffron text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-saffron text-lg"
            >
              <Play size={20} />
              Try Demo
            </motion.a>

            <motion.a
              href="#how-it-works"
              whileHover={{
                y: -4,
                boxShadow: '0 12px 24px rgba(11, 92, 171, 0.1)',
              }}
              whileTap={{ y: -2 }}
              className="inline-flex items-center justify-center gap-2 bg-light-blue text-primary-blue px-8 py-4 rounded-lg font-semibold border-2 border-primary-blue hover:bg-primary-blue hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-blue text-lg"
            >
              Explore How It Works
              <ArrowRight size={20} />
            </motion.a>
          </motion.div>

          {/* Supporting text */}
          <motion.p
            variants={itemVariants}
            className="text-text-muted text-sm pt-4 border-t border-gray-300 max-w-2xl mx-auto"
          >
            No credit card required. Start with a free demo today.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
