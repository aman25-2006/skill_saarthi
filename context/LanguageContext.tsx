'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { translations, SupportedLanguage } from './translations';

export interface LanguageOption {
  code: SupportedLanguage;
  label: string;
  native: string;
}

export const AVAILABLE_LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  { code: 'mr', label: 'Marathi', native: 'मराठी' },
];

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string, fallback?: string) => string;
  languages: LanguageOption[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<SupportedLanguage>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('skill_saarthi_lang') as SupportedLanguage | null;
      if (savedLang && (savedLang === 'en' || savedLang === 'hi' || savedLang === 'mr')) {
        setLanguageState(savedLang);
        document.documentElement.lang = savedLang;
      }
    } catch {
      // ignore SSR or storage errors
    }
    setMounted(true);
  }, []);

  const setLanguage = useCallback((lang: SupportedLanguage) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('skill_saarthi_lang', lang);
      document.documentElement.lang = lang;
    } catch {
      // ignore storage errors
    }
  }, []);

  const t = useCallback(
    (key: string, fallback?: string): string => {
      const currentLangDict = translations[language] || translations.en;
      if (currentLangDict && currentLangDict[key]) {
        return currentLangDict[key];
      }
      // fallback to English
      if (translations.en && translations.en[key]) {
        return translations.en[key];
      }
      return fallback !== undefined ? fallback : key;
    },
    [language]
  );

  return (
    <LanguageContext.Provider
      value={{
        language: mounted ? language : 'en',
        setLanguage,
        t,
        languages: AVAILABLE_LANGUAGES,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      language: 'en' as SupportedLanguage,
      setLanguage: () => {},
      t: (key: string, fallback?: string) => fallback || key,
      languages: AVAILABLE_LANGUAGES,
    };
  }
  return context;
}

