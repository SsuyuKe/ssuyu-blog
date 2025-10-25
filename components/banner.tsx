'use client';

import Image from 'next/image';
import { motion, MotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function Banner({
  scale,
  overlayOpacity,
}: {
  scale: MotionValue<number>;
  overlayOpacity: MotionValue<number>;
}) {
  return (
    <section className="w-full h-screen sticky top-0 z-20 overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-muted-foreground z-10 pointer-events-none"
        style={{ opacity: overlayOpacity }}
      />
      <motion.div style={{ scale }}>
        <div
          className={cn(
            'flex flex-col justify-center',
            'h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-[61px] md:py-[61px]'
          )}
        >
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Left - Text */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.5,
              }}
              className="w-full lg:w-1/2 text-center lg:text-left space-y-4"
            >
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
            </motion.div>

            {/* Right - Avatar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.5,
              }}
              className="w-full lg:w-1/2 flex justify-center"
            >
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_50px_rgba(0,0,0,0.08)] transition-all duration-700 ease-out">
                <Image
                  src="/avatar.jpg"
                  alt="SSUYUKE"
                  width={320}
                  height={320}
                  className="w-full h-full object-cover scale-100 hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            </motion.div>
          </div>
          {/* Taglines */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              type: 'spring',
              delay: 0.8,
              duration: 0.5,
              stiffness: 200,
              damping: 10,
            }}
            className="flex flex-col items-center mt-10 space-y-2 text-center max-w-full mx-auto"
          >
            <p
              className="text-muted-foreground/80 tracking-wide leading-relaxed font-light"
              style={{ fontSize: 'clamp(0.875rem, 2vw, 1.125rem)' }}
            >
              I craft fast, user-centered, and elegant web experiences.
            </p>

            <p className="text-muted-foreground/70 tracking-wide leading-relaxed font-light italic text-base md:text-lg">
              「打造貼近使用者、流暢又有質感的網頁體驗。」
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
