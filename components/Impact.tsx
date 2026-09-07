'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

export default function Impact() {
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
    }, [inView]);

    return <span>{count.toLocaleString()}</span>;
  };

  const metrics = [
    {
      value: <Counter end={25420} duration={2} />,
      label: 'Trainees Tracked',
      color: 'text-primary-blue',
    },
    {
      value: <Counter end={68} duration={2} />,
      label: 'Employment Rate',
      suffix: '%',
      color: 'text-saffron',
    },
    {
      value: <Counter end={74} duration={2} />,
      label: '6-Month Retention',
      suffix: '%',
      color: 'text-success-green',
    },
    {
      value: '₹',
      label: 'Average Wage',
      amount: <Counter end={19400} duration={2} />,
      color: 'text-primary-navy',
    },
  ];

  return (
    <section
      ref={ref}
      className="py-16 sm:py-20 lg:py-24 bg-gradient-to-r from-light-blue to-blue-50"
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
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-navy">
              From Training Data to Real-World Impact
            </h2>
            <p className="text-lg text-text-muted max-w-2xl mx-auto">
              Demo metrics showing the power of longitudinal outcome tracking
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
                whileHover={{
                  y: -8,
                  scale: 1.05,
                }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-200"
              >
                <div className="text-center">
                  <div
                    className={`text-4xl sm:text-5xl font-bold mb-2 ${metric.color}`}
                  >
                    {metric.value}
                    {metric.suffix && <span>{metric.suffix}</span>}
                    {metric.amount && (
                      <span className="ml-1 text-primary-blue">
                        {metric.amount}
                      </span>
                    )}
                  </div>
                  <p className="text-text-muted font-semibold text-lg">
                    {metric.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Disclaimer */}
          <motion.div
            variants={itemVariants}
            className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg"
          >
            <p className="text-sm text-yellow-900">
              <span className="font-semibold">⚠️ Prototype Demo Data:</span> These
              figures are for demonstration purposes only and represent sample
              metrics. They do not reflect actual Government of India statistics
              or real-world programme data.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
