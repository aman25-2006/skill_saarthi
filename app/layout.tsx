import type { Metadata, Viewport } from 'next';
import './globals.css';
import Providers from '@/components/Providers';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Skill Saarthi - Track Employment Outcomes & Measure Skilling Impact',
  description:
    'Skill Saarthi helps track employment outcomes, identify skill gaps and measure the real impact of skilling programmes for students, training providers and the government.',
  keywords: [
    'skilling',
    'employment outcomes',
    'government',
    'skill tracking',
    'career development',
  ],
  authors: [{ name: 'Skill Saarthi Team' }],
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://skillsaarthi.gov.in',
    siteName: 'Skill Saarthi',
    title: 'Skill Saarthi - Track Employment Outcomes & Measure Skilling Impact',
    description:
      'Skill Saarthi helps track employment outcomes, identify skill gaps and measure the real impact of skilling programmes.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('skill_saarthi_theme');
                  var lang = localStorage.getItem('skill_saarthi_lang');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                  if (lang) {
                    document.documentElement.lang = lang;
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="bg-white dark:bg-slate-900 text-text-dark dark:text-slate-100 transition-colors duration-200">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
