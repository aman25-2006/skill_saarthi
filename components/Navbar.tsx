'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Menu,
  X,
  ChevronDown,
  GraduationCap,
  Building2,
  Shield,
  Sun,
  Moon,
  Globe,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { SupportedLanguage } from '@/context/translations';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t, languages } = useLanguage();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(event.target as Node)
      ) {
        setIsLangDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { name: t('nav.home', 'Home'), href: '/' },
    { name: t('nav.about', 'About'), href: '/#about' },
    { name: t('nav.features', 'Features'), href: '/#features' },
    { name: t('nav.howItWorks', 'How It Works'), href: '/#how-it-works' },
    { name: t('nav.impact', 'Impact'), href: '/#impact' },
    { name: t('nav.resources', 'Resources'), href: '/#resources' },
  ];

  const loginOptions = [
    {
      label: t('nav.asStudent', 'As a Student'),
      href: '/login/student',
      icon: GraduationCap,
      color: 'text-primary-blue',
    },
    {
      label: t('nav.asGov', 'As a Government Officer'),
      href: '/login/government',
      icon: Building2,
      color: 'text-saffron',
    },
    {
      label: t('nav.asAdmin', 'As an Admin'),
      href: '/login/admin',
      icon: Shield,
      color: 'text-rose-600',
    },
  ];

  const currentLangObj = languages.find((l) => l.code === language) || languages[0];

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 shadow-xs transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top branding section */}
        <div className="border-b border-gray-200 dark:border-slate-800 py-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-navy to-primary-blue rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <div className="hidden sm:block">
                <p className="text-xs font-semibold text-primary-navy dark:text-sky-300 leading-tight">
                  {t('nav.ministry', 'Ministry of Skill Development & Entrepreneurship')}
                </p>
                <p className="text-xs text-text-muted dark:text-slate-400">
                  {t('nav.govIndia', 'Government of India')}
                </p>
              </div>
            </div>

            <div className="text-center">
              <h1 className="text-lg sm:text-xl font-bold text-primary-navy dark:text-white">
                Skill Saarthi
              </h1>
              <p className="text-xs text-saffron font-semibold">
                {t('nav.tagline', 'Track • Analyse • Build Better Futures')}
              </p>
            </div>

            {/* Top right quick utilities */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Quick Language Switcher Pills */}
              <div ref={langDropdownRef} className="relative">
                <button
                  onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-text-dark dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                  aria-label="Language"
                >
                  <Globe size={15} className="text-primary-blue dark:text-sky-400" />
                  <span>{currentLangObj.native}</span>
                  <ChevronDown size={14} className={isLangDropdownOpen ? 'rotate-180' : ''} />
                </button>

                <AnimatePresence>
                  {isLangDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-1.5 w-44 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-gray-200 dark:border-slate-700 overflow-hidden z-50"
                    >
                      <div className="p-1">
                        {languages.map((lang) => (
                          <button
                            key={lang.code}
                            onClick={() => {
                              setLanguage(lang.code as SupportedLanguage);
                              setIsLangDropdownOpen(false);
                            }}
                            className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-lg flex items-center justify-between transition-colors ${
                              language === lang.code
                                ? 'bg-primary-blue/10 dark:bg-sky-500/20 text-primary-blue dark:text-sky-300 font-bold'
                                : 'text-text-dark dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700'
                            }`}
                          >
                            <span>{lang.native}</span>
                            <span className="text-[10px] text-text-muted dark:text-slate-400 uppercase">
                              {lang.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg border border-gray-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-text-dark dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5"
                aria-label="Toggle theme"
                title={theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
              >
                {theme === 'dark' ? (
                  <>
                    <Sun size={15} className="text-amber-400" />
                    <span className="hidden md:inline">{t('portal.light', 'Light')}</span>
                  </>
                ) : (
                  <>
                    <Moon size={15} className="text-primary-navy" />
                    <span className="hidden md:inline">{t('portal.dark', 'Dark')}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Navigation links section */}
        <div className="flex items-center justify-between h-14">
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-text-dark dark:text-slate-200 hover:text-primary-blue dark:hover:text-sky-400 font-semibold text-sm transition-colors rounded px-2 py-1"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Desktop Login Dropdown */}
          <div className="hidden lg:block ml-auto">
            <div ref={dropdownRef} className="relative">
              <motion.button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 bg-primary-navy dark:bg-primary-blue text-white px-5 py-2 rounded-lg hover:bg-deep-navy transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-blue font-semibold text-sm shadow-sm"
                whileHover={{ y: -1 }}
                whileTap={{ y: 0 }}
              >
                {t('nav.signIn', 'Sign In')}
                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    isDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </motion.button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-gray-200 dark:border-slate-700 overflow-hidden z-50"
                  >
                    {loginOptions.map((option) => {
                      const Icon = option.icon;
                      return (
                        <a
                          key={option.label}
                          href={option.href}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-light-blue dark:hover:bg-slate-700/60 transition-colors border-b border-gray-100 dark:border-slate-700/60 last:border-b-0 group"
                        >
                          <Icon
                            size={18}
                            className={`${option.color} group-hover:scale-110 transition-transform`}
                          />
                          <div className="flex-1">
                            <p className="font-semibold text-sm text-text-dark dark:text-slate-100">
                              {option.label}
                            </p>
                          </div>
                          <ChevronDown size={14} className="text-text-muted dark:text-slate-400 -rotate-90" />
                        </a>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2 ml-auto">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-text-dark dark:text-slate-200 hover:bg-light-blue dark:hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden pb-4 border-t border-gray-200 dark:border-slate-800"
            >
              <div className="py-3 space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="block px-4 py-2 text-text-dark dark:text-slate-200 hover:bg-light-blue dark:hover:bg-slate-800 rounded-lg font-medium text-sm transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
                <div className="border-t border-gray-200 dark:border-slate-800 pt-3 mt-3">
                  <p className="text-xs font-semibold text-text-muted dark:text-slate-400 px-4 mb-2">
                    {t('nav.signIn', 'Sign In')}
                  </p>
                  {loginOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <a
                        key={option.label}
                        href={option.href}
                        className="flex items-center gap-3 px-4 py-2.5 text-text-dark dark:text-slate-200 hover:bg-light-blue dark:hover:bg-slate-800 rounded-lg transition-colors text-sm font-semibold"
                        onClick={() => setIsOpen(false)}
                      >
                        <Icon size={18} className={option.color} />
                        <span>{option.label}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
