import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import Container from './container';

const navItems = [
  { name: '首頁｜HOME', href: '/' },
  { name: '關於我｜ABOUT', href: '/#about' },
  { name: '服務項目｜SERVICES', href: '/#services' },
  { name: '部落格｜BLOG', href: '/blog' },
  { name: '聯繫我｜CONTACT', href: '/#contact' },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1, // 控制每個項目間隔時間
      delayChildren: 0.2, // 整體延遲開始
    },
  },
};

const item = {
  hidden: { opacity: 0, x: 20 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
    },
  },
};

export default function Menu({
  setIsOpen,
  isOpen,
}: {
  setIsOpen: (open: boolean) => void;
  isOpen: boolean;
}) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{
          opacity: isOpen ? 1 : 0,
          transition: { duration: 0.5 },
        }}
        exit={{ height: 0, opacity: 0, transition: { duration: 0.5 } }}
        className={cn(
          'absolute left-0 top-full w-full h-screen z-[1000]',
          'md:hidden bg-background overflow-hidden',
          isOpen ? 'pointer-events-auto' : 'pointer-events-none'
        )}
      >
        <Container className={cn('flex flex-col h-full pt-10')}>
          <motion.ul
            variants={container}
            initial="hidden"
            animate={isOpen ? 'show' : 'hidden'}
            className="space-y-4 text-sm text-left"
          >
            {navItems.map(i => (
              <motion.li
                key={i.name}
                variants={item}
                className="tracking-wider font-bold"
              >
                <Link href={i.href} onClick={() => setIsOpen(false)}>
                  {i.name}
                </Link>
              </motion.li>
            ))}
          </motion.ul>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isOpen ? 1 : 0 }}
            transition={{
              delay: 0.8,
            }}
            className="flex gap-4 text-muted-foreground text-lg pt-6"
          >
            <Link
              href="https://www.instagram.com/ssuyuke/"
              target="_blank"
              className="hover:text-primary transition cursor-pointer"
            >
              <i className="fa-brands fa-instagram"></i>
            </Link>
            <Link
              href="#"
              className="hover:text-primary transition cursor-pointer"
            >
              <i className="fa-brands fa-linkedin"></i>
            </Link>
            <Link
              href="https://github.com/SsuyuKe"
              target="_blank"
              className="hover:text-primary transition cursor-pointer"
            >
              <i className="fa-brands fa-github"></i>
            </Link>
          </motion.div>
        </Container>
      </motion.div>
    </AnimatePresence>
  );
}
