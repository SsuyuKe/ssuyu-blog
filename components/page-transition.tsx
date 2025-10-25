'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();

  const variants = {
    hidden: { opacity: 0 },
    enter: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={path}
        variants={variants}
        initial="hidden"
        animate="enter"
        exit="exit"
        transition={{
          delay: 0.3,
          duration: 0.4,
          ease: 'easeInOut',
        }}
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}
