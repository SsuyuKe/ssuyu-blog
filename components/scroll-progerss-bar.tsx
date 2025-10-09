'use client';

import { motion, useScroll } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 10); // 滾動超過 10px 才顯示
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 z-[1000]"
      initial={{ opacity: 0 }}
      animate={{ opacity: show ? 1 : 0 }}
    >
      <motion.div
        className="h-full bg-primary origin-left"
        style={{ scaleX: scrollYProgress }}
      />
    </motion.div>
  );
}
