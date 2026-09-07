'use client';

import AccessibilityBar from '@/components/AccessibilityBar';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Problem from '@/components/Problem';
import Solution from '@/components/Solution';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import Portals from '@/components/Portals';
import Impact from '@/components/Impact';
import WhyItMatters from '@/components/WhyItMatters';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import HelpWidget from '@/components/HelpWidget';

export default function Home() {
  return (
    <>
      <AccessibilityBar />
      <Navbar />
      <main id="main-content">
        <Hero />
        <Problem />
        <Solution />
        <Features />
        <HowItWorks />
        <Portals />
        <Impact />
        <WhyItMatters />
        <CTA />
      </main>
      <Footer />
      <HelpWidget />
    </>
  );
}
