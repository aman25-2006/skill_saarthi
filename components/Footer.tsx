'use client';

import { motion } from 'framer-motion';
import {
  Github,
  Twitter,
  Linkedin,
  Mail,
  ExternalLink,
} from 'lucide-react';

export default function Footer() {
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
      transition: { duration: 0.5 },
    },
  };

  const footerLinks = [
    {
      title: 'Skill Saarthi',
      links: [
        { label: 'About', href: '/#about' },
        { label: 'Mission', href: '#' },
        { label: 'Contact', href: '#' },
      ],
    },
    {
      title: 'Quick Links',
      links: [
        { label: 'Home', href: '/' },
        { label: 'Features', href: '/#features' },
        { label: 'How It Works', href: '/#how-it-works' },
        { label: 'Impact', href: '/#impact' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'FAQs', href: '#' },
        { label: 'Help & Support', href: '#' },
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms & Conditions', href: '#' },
      ],
    },
    {
      title: 'Portals',
      links: [
        { label: 'Student Login', href: '/login/student' },
        { label: 'Government Login', href: '/login/government' },
        { label: 'Admin Login', href: '/login/admin' },
      ],
    },
  ];

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:hello@skillsaarthi.gov.in', label: 'Email' },
  ];

  return (
    <footer className="bg-deep-navy text-white pt-16 sm:pt-20 lg:pt-24 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-12 pb-12 border-b border-blue-700">
            {/* Branding Column */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-saffron to-orange-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">S</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Skill Saarthi</h3>
                  <p className="text-xs text-blue-200">Track • Analyse • Build</p>
                </div>
              </div>
              <p className="text-sm text-blue-200 leading-relaxed">
                Tracking employment outcomes and measuring the real impact of
                skilling programmes.
              </p>
            </motion.div>

            {/* Footer Links Columns */}
            {footerLinks.map((column) => (
              <motion.div
                key={column.title}
                variants={itemVariants}
                className="sm:col-span-1"
              >
                <h4 className="font-bold text-lg mb-4">{column.title}</h4>
                <ul className="space-y-2">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-blue-200 hover:text-saffron transition-colors text-sm flex items-center gap-1 group"
                      >
                        {link.label}
                        {link.href.startsWith('http') && (
                          <ExternalLink
                            size={12}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          />
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Bottom Section */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-between gap-6"
          >
            {/* Copyright */}
            <div className="text-center sm:text-left">
              <p className="text-blue-200 text-sm mb-2">
                © 2026 Skill Saarthi. Prototype for Smart India Hackathon (SIH).
              </p>
              <p className="text-xs text-blue-300 italic">
                Built for better skilling outcomes. Not an official Government of
                India product.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ y: -4 }}
                    whileTap={{ y: 0 }}
                    className="w-10 h-10 bg-blue-700 hover:bg-saffron rounded-lg flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-saffron focus:ring-offset-deep-navy"
                    aria-label={social.label}
                  >
                    <Icon size={18} />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
