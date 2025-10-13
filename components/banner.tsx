'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Banner() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className={cn(
        'flex flex-col w-full justify-between relative',
        'h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-[61px] md:py-[61px]'
      )}
    >
      <div className="h-[80px]"></div>
      <div
        className={`flex flex-col lg:flex-row items-center gap-16 transition-opacity duration-1000 ease-out ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Left - Text */}
        <div className="w-full lg:w-1/2 text-center lg:text-left space-y-4">
          <p className="text-lg text-primary font-medium tracking-wide">
            Hello, I&apos;m
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold leading-none tracking-tight">
            SSUYU KE
          </h1>
          <div className="space-y-1 text-lg md:text-xl lg:text-2xl font-normal text-muted-foreground/90">
            <p>Web Designer & Frontend Developer</p>
            <p>Career Coach</p>
          </div>
        </div>

        {/* Right - Avatar */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_50px_rgba(0,0,0,0.08)] transition-all duration-700 ease-out">
            <Image
              src="/avatar.jpg"
              alt="SSUYUKE"
              width={320}
              height={320}
              className="w-full h-full object-cover scale-100 hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>
        </div>
      </div>
      {/* Taglines */}
      <div
        className={`flex flex-col items-center mt-10 space-y-2 text-center max-w-full mx-auto transition-transform transition-opacity duration-1000 ease-out ${
          loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        {/* English tagline */}
        <p
          className="text-muted-foreground/80 tracking-wide leading-relaxed font-light whitespace-nowrap"
          style={{ fontSize: 'clamp(0.875rem, 2vw, 1.125rem)' }}
        >
          I craft fast, user-centered, and elegant web experiences.
        </p>

        {/* Chinese tagline */}
        <p className="text-muted-foreground/70 tracking-wide leading-relaxed font-light italic text-base md:text-lg">
          「打造貼近使用者、流暢又有質感的網頁體驗。」
        </p>
      </div>
      <div className="h-[60px]"></div>
    </section>
  );
}
