'use client';

import { motion } from 'framer-motion';
import { ExternalLink, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.4 },
    },
  };

  const footerLinks = [
    {
      title: 'Skill Saarthi',
      links: [
        { label: t('nav.home', 'Home'), href: '/' },
        { label: t('nav.about', 'About'), href: '/#about' },
        { label: t('nav.features', 'Features'), href: '/#features' },
        { label: t('nav.howItWorks', 'How It Works'), href: '/#how-it-works' },
      ],
    },
    {
      title: 'Consoles & Portals',
      links: [
        { label: t('nav.asStudent', 'Student Portal'), href: '/login/student' },
        { label: t('nav.asGov', 'Government Officer Portal'), href: '/login/government' },
        { label: t('nav.asAdmin', 'Central Admin Console'), href: '/login/admin' },
      ],
    },
    {
      title: 'Governance & Privacy',
      links: [
        { label: 'DPDP Act 2023 Compliance', href: '/admin' },
        { label: 'Section 10 Decision Matrix', href: '/government' },
        { label: 'Section 20 Demo Cohort Standard', href: '/student' },
        { label: 'DigiLocker Verification Bridge', href: '/admin' },
      ],
    },
  ];

  return (
    <footer className="bg-slate-950 text-white pt-16 sm:pt-20 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-12 pb-12 border-b border-slate-800">
            {/* Branding Column */}
            <motion.div variants={itemVariants} className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-blue to-primary-navy rounded-xl flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-lg">S</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white">Skill Saarthi</h3>
                  <p className="text-xs text-saffron font-semibold">
                    {t('nav.tagline', 'Track • Analyse • Build Better Futures')}
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md">
                {t(
                  'hero.desc',
                  'Skill Saarthi is India\'s consent-based Outcome Intelligence Layer connecting training credentials with verified post-placement careers, retention, wage growth, and skill gap remediation.'
                )}
              </p>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300">
                <ShieldCheck size={14} className="text-emerald-400" />
                <span>Section 20 Protocol Active • DPDP Act 2023 Compliant</span>
              </div>
            </motion.div>

            {/* Footer Links Columns */}
            {footerLinks.map((column) => (
              <motion.div
                key={column.title}
                variants={itemVariants}
                className="sm:col-span-1"
              >
                <h4 className="font-bold text-sm text-slate-200 uppercase tracking-wider mb-4">
                  {column.title}
                </h4>
                <ul className="space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-slate-400 hover:text-white transition-colors text-xs flex items-center gap-1 group"
                      >
                        <span>{link.label}</span>
                        {link.href.startsWith('http') && (
                          <ExternalLink
                            size={12}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          />
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Bottom Section */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500"
          >
            <div className="text-center sm:text-left space-y-1">
              <p>
                {t('footer.dept', 'Ministry of Skill Development & Entrepreneurship (MSDE)')} • {t('footer.gov', 'Government of India')}
              </p>
              <p className="text-[11px]">
                {t('footer.partner', 'Technical Directorate: National Informatics Centre (NIC)')}
              </p>
            </div>

            <p className="text-[11px] text-slate-400 font-mono">
              {t('footer.rights', '© 2026 Skill Saarthi. All Rights Reserved.')}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
