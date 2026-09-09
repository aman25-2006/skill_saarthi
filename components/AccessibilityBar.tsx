'use client';

import { useState } from 'react';
import { Volume2, Minus, Plus, Eye, Sun, Moon, Globe } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { SupportedLanguage } from '@/context/translations';

export default function AccessibilityBar() {
  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t, languages } = useLanguage();

  const handleFontDecrease = () => {
    if (fontSize > 80) setFontSize(fontSize - 10);
  };

  const handleFontIncrease = () => {
    if (fontSize < 150) setFontSize(fontSize + 10);
  };

  const handleFontReset = () => {
    setFontSize(100);
  };

  return (
    <div
      className={`${
        highContrast
          ? 'bg-black text-white border-2 border-white'
          : 'bg-light-blue dark:bg-slate-950 text-text-dark dark:text-slate-200 border-b border-gray-300 dark:border-slate-800'
      } transition-colors duration-200`}
      style={{ fontSize: `${fontSize}%` }}
    >
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm">
        {/* Left Side */}
        <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
          <a
            href="#main-content"
            className="font-semibold hover:underline focus:underline"
          >
            {t('a11y.skip', 'Skip to Main Content')}
          </a>
          <span className="text-gray-400 dark:text-slate-600">|</span>
          <button
            className="flex items-center gap-1 hover:underline focus:underline"
            aria-label="Screen reader"
          >
            <Volume2 size={16} />
            <span className="hidden sm:inline">{t('a11y.screenReader', 'Screen Reader')}</span>
          </button>
          <span className="text-gray-400 dark:text-slate-600">|</span>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={handleFontDecrease}
              className="p-1 hover:bg-gray-300 dark:hover:bg-slate-800 rounded focus:ring-2 focus:ring-primary-blue"
              aria-label="Decrease font size"
            >
              <Minus size={14} />
            </button>
            <span className="w-5 text-center font-bold">{t('a11y.fontA', 'A')}</span>
            <button
              onClick={handleFontReset}
              className="text-xs hover:bg-gray-300 dark:hover:bg-slate-800 rounded px-1.5 py-0.5 focus:ring-2 focus:ring-primary-blue"
              aria-label="Reset font size"
            >
              {t('a11y.reset', 'Reset')}
            </button>
            <button
              onClick={handleFontIncrease}
              className="p-1 hover:bg-gray-300 dark:hover:bg-slate-800 rounded focus:ring-2 focus:ring-primary-blue"
              aria-label="Increase font size"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {/* Light / Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors text-xs font-semibold shadow-xs"
            aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? (
              <>
                <Sun size={15} className="text-amber-400" />
                <span>{t('a11y.lightMode', 'Light Mode')}</span>
              </>
            ) : (
              <>
                <Moon size={15} className="text-primary-navy" />
                <span>{t('a11y.darkMode', 'Dark Mode')}</span>
              </>
            )}
          </button>

          <span className="text-gray-400 dark:text-slate-600">|</span>

          {/* High Contrast */}
          <button
            onClick={() => setHighContrast(!highContrast)}
            className="flex items-center gap-1 hover:underline focus:underline text-xs"
            aria-label="Toggle high contrast mode"
          >
            <Eye size={15} />
            <span className="hidden sm:inline">{t('a11y.highContrast', 'High Contrast')}</span>
          </button>

          <span className="text-gray-400 dark:text-slate-600">|</span>

          {/* Language Selector */}
          <div className="flex items-center gap-1.5">
            <Globe size={15} className="text-primary-blue dark:text-sky-400" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
              className="px-2 py-1 text-xs font-semibold rounded bg-white dark:bg-slate-900 text-text-dark dark:text-slate-100 border border-gray-300 dark:border-slate-700 focus:ring-2 focus:ring-primary-blue cursor-pointer shadow-xs"
              aria-label={t('a11y.langLabel', 'Select Language')}
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.native} ({lang.label})
                </option>
              ))}
            </select>
          </div>

          <span className="text-gray-400 dark:text-slate-600">|</span>
          <span className="font-semibold text-xs">{t('a11y.india', '🇮🇳 India')}</span>
        </div>
      </div>
    </div>
  );
}
