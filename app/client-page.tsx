'use client';

import { useEffect, useState, useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import Banner from '@/components/banner';
import About from '@/components/about-section';
import Services from '@/components/services';
import Brand from '@/components/brand-section';
import Skills from '@/components/skills-section';
import HeroSection from '@/components/hero-section';
import ContactForm from '@/components/contact-form';

export default function ClientPage() {
  const [, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.5]);

  const brightness = useTransform(
    scrollYProgress,
    [0, 0.3, 0.8, 1],
    [0, 0.5, 0.6, 0.8]
  );

  return (
    <div ref={containerRef}>
      <Banner scale={scale} overlayOpacity={brightness} />
      <div className="bg-background relative z-[20]">
        <HeroSection />
        <About />
        <Skills className="md:my-32" />
        <Services />
        <ContactForm className="mb-20" />
        <Brand />
      </div>
    </div>
  );
}
