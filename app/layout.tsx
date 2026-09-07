import type { Metadata, Viewport } from 'next';
import './globals.css';

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
    <html lang="en">
      <body className="bg-white text-text-dark">
        {children}
      </body>
    </html>
  );
}
