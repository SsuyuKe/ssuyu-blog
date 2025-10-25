'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

// ----------------------------------------------------
// 1. 視差文字組件
// ----------------------------------------------------
interface ParallaxTextLineProps {
  text: string;
  direction: 'left' | 'right';
  speed: number;
  scrollYProgress: MotionValue<number>;
}

const ParallaxTextLine: React.FC<ParallaxTextLineProps> = ({
  text,
  direction,
  speed,
  scrollYProgress,
}) => {
  const distance = speed * 1500; // 調整乘數控制視差強度

  const xStart = direction === 'left' ? distance : -distance;
  const xEnd = direction === 'left' ? -distance : distance;

  const x = useTransform(scrollYProgress, [0, 1], [xStart, xEnd]);

  return (
    <motion.div
      className="text-border will-change-transform whitespace-nowrap font-[900] text-[90px] uppercase"
      style={{ x }}
    >
      {Array(3)
        .fill(null)
        .map((_, i) => (
          <span key={i} className="inline-block px-8 text-gray-800 opacity-90">
            {text}
          </span>
        ))}
    </motion.div>
  );
};

// ----------------------------------------------------
// 2. 視差滾動容器
// ----------------------------------------------------
const TextParallaxAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const text1 = 'Front-end Engineer';
  const text2 = 'Interactive Web Experiences';
  const text3 = 'Clarity & Confidence';

  return (
    <div className="flex justify-center items-center h-screen">
      <div
        ref={containerRef}
        style={{
          padding: '135px 0',
          overflow: 'hidden', // 隱藏溢出文字
        }}
      >
        <div className="flex flex-col space-y-10">
          <ParallaxTextLine
            direction="left"
            speed={1.0}
            text={text1}
            scrollYProgress={scrollYProgress}
          />
          <ParallaxTextLine
            direction="right"
            speed={0.3}
            text={text2}
            scrollYProgress={scrollYProgress}
          />
          <ParallaxTextLine
            direction="left"
            speed={0.6}
            text={text3}
            scrollYProgress={scrollYProgress}
          />
        </div>
      </div>
    </div>
  );
};

export default TextParallaxAnimation;
