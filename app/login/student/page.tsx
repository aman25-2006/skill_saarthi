'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, GraduationCap } from 'lucide-react';
import Link from 'next/link';

export default function StudentLoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-light-blue to-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full border-2 border-primary-blue"
      >
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-primary-blue hover:text-deep-navy mb-6 font-semibold"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <GraduationCap size={32} className="text-primary-blue" />
          </div>
          <h1 className="text-3xl font-bold text-primary-navy mb-2">
            Student Login
          </h1>
          <p className="text-text-muted">
            This page is a placeholder for the Student login interface
          </p>
        </div>

        {/* Prototype Notice */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-yellow-900">
            <span className="font-semibold">⚠️ Prototype Notice:</span> This login
            page is under development. The full student dashboard is coming soon.
          </p>
        </div>

        {/* Info Box */}
        <div className="bg-light-blue rounded-lg p-6 space-y-4 text-center">
          <p className="text-text-dark font-semibold">Student Portal Features:</p>
          <ul className="text-sm text-text-muted space-y-2">
            <li>✓ Skill Profile</li>
            <li>✓ AI Skill-Gap Analysis</li>
            <li>✓ Employment Tracking</li>
            <li>✓ Career Analytics</li>
            <li>✓ Wage Progression</li>
          </ul>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-text-muted">
            For more information, visit the landing page or contact
            hello@skillsaarthi.gov.in
          </p>
        </div>
      </motion.div>
    </div>
  );
}
