'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Menu,
  X,
  Search,
  ChevronDown,
  GraduationCap,
  Building2,
  Shield,
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/#about' },
    { name: 'Features', href: '/#features' },
    { name: 'How It Works', href: '/#how-it-works' },
    { name: 'Impact', href: '/#impact' },
    { name: 'Resources', href: '/#resources' },
  ];

  const loginOptions = [
    {
      label: 'As a Student',
      href: '/login/student',
      icon: GraduationCap,
      color: 'text-primary-blue',
    },
    {
      label: 'As a Government Officer',
      href: '/login/government',
      icon: Building2,
      color: 'text-primary-blue',
    },
    {
      label: 'As an Admin',
      href: '/login/admin',
      icon: Shield,
      color: 'text-primary-blue',
    },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top branding section */}
        <div className="border-b border-gray-200 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-navy to-primary-blue rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <div className="hidden sm:block">
                <p className="text-xs font-semibold text-primary-navy leading-tight">
                  Ministry of Skill Development
                </p>
                <p className="text-xs text-text-muted">Government of India</p>
              </div>
            </div>

            <div className="text-center">
              <h1 className="text-lg sm:text-xl font-bold text-primary-navy">
                Skill Saarthi
              </h1>
              <p className="text-xs text-saffron font-semibold">
                Track • Analyse • Build Better Futures
              </p>
            </div>

            <div className="hidden sm:flex items-center gap-4">
              <button
                className="p-2 text-text-muted hover:text-primary-blue transition-colors"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation section */}
        <div className="flex items-center justify-between h-16">
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-text-dark hover:text-primary-blue font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-blue rounded px-2 py-1"
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
                className="flex items-center gap-2 bg-primary-navy text-white px-6 py-2.5 rounded-lg hover:bg-deep-navy transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-blue font-semibold text-sm"
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                Sign In
                <ChevronDown
                  size={18}
                  className={`transition-transform ${
                    isDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </motion.button>

              {/* Dropdown Menu */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{
                  opacity: isDropdownOpen ? 1 : 0,
                  y: isDropdownOpen ? 0 : -10,
                  pointerEvents: isDropdownOpen ? 'auto' : 'none',
                }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden"
              >
                {loginOptions.map((option, index) => {
                  const Icon = option.icon;
                  return (
                    <a
                      key={option.label}
                      href={option.href}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-light-blue transition-colors border-b border-gray-100 last:border-b-0 group"
                    >
                      <Icon
                        size={20}
                        className={`${option.color} group-hover:scale-110 transition-transform`}
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-sm text-text-dark">
                          {option.label}
                        </p>
                      </div>
                      <ChevronDown size={16} className="text-text-muted -rotate-90" />
                    </a>
                  );
                })}
              </motion.div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-4 ml-auto">
            <button
              className="p-2 text-text-muted hover:text-primary-blue transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-text-dark hover:bg-light-blue rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden pb-4 border-t border-gray-200"
          >
            <div className="py-4 space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block px-4 py-2 text-text-dark hover:bg-light-blue rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="border-t border-gray-200 pt-4 mt-4">
                <p className="text-xs font-semibold text-text-muted px-4 mb-3">
                  Sign In As
                </p>
                {loginOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <a
                      key={option.label}
                      href={option.href}
                      className="flex items-center gap-3 px-4 py-2 text-text-dark hover:bg-light-blue rounded-lg transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <Icon size={18} className={option.color} />
                      <span className="text-sm font-medium">{option.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}
