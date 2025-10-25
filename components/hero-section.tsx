import React, { useRef, RefObject } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Container from './container';

// 定義您的顏色
const COLOR_NORMAL = '#c8c8c8'; // 灰白色
const COLOR_HIGHLIGHT = '#c83e6b'; // 亮紅色

interface AnimatedTextProps {
  text: string;
  sectionRef: RefObject<HTMLElement | null>;
  shouldHoldColor?: boolean;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  sectionRef,
  shouldHoldColor = false,
}) => {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start center', 'end center'],
  });

  const endColor = shouldHoldColor ? COLOR_HIGHLIGHT : COLOR_NORMAL;

  const color = useTransform(
    scrollYProgress,
    [0.05, 0.2, 0.85, 0.95],
    [COLOR_NORMAL, COLOR_HIGHLIGHT, COLOR_HIGHLIGHT, endColor]
  );

  return (
    <motion.p className="text-3xl lg:text-[56px] font-bold" style={{ color }}>
      {text}
    </motion.p>
  );
};

const ScrollSection = ({
  text,
  holdColor,
}: {
  text: string;
  holdColor?: boolean;
}) => {
  const ref = useRef(null);

  return (
    <section ref={ref} className="flex items-center">
      <AnimatedText text={text} sectionRef={ref} shouldHoldColor={holdColor} />
    </section>
  );
};

const ScrollColorAnimationDemo = () => {
  const text1 =
    'Hi, I’m a front-end engineer passionate about turning ideas into interactive web experiences.';
  const text2 =
    'I build modern web experiences and help people learn to code with clarity and confidence.';

  return (
    <section className="py-20 lg:h-screen flex justify-center items-center">
      <Container>
        <ScrollSection text={text1} holdColor={false} />
        <ScrollSection text={text2} holdColor={true} />
      </Container>
    </section>
  );
};

export default ScrollColorAnimationDemo;
