import { motion } from 'framer-motion';
import React from 'react';
import Container from './container';
import { cn } from '@/lib/utils';

const frontendSkills = [
  'React',
  'Vue.js',
  'Next.js',
  'Nuxt.js',
  'Tailwind',
  'TypeScript',
  'JavaScript',
  'HTML',
  'CSS',
];
const backendSkills = [
  'Node.js',
  'Express.js',
  'Go',
  'MongoDB',
  'MySQL',
  'REST API',
  'GraphQL',
];

// 父容器動畫，控制子元素 stagger
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// 單個技能動畫
const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 12,
      duration: 0.25,
    },
  },
};

export default function SkillsSection({ className }: { className?: string }) {
  return (
    <section className={className}>
      <Container
        className={cn(
          'before:block before:w-14 before:h-[1px] before:absolute before:right-5 before:bottom-0 before:bg-border',
          'after:block after:w-[1px] after:h-14 after:absolute after:right-5 after:bottom-0 after:bg-border',
          'relative pb-8'
        )}
      >
        {/* 標題 */}
        <div className="flex justify-center lg:justify-start mb-12">
          <h2 className="relative text-primary text-lg md:text-xl lg:text-2xl font-semibold tracking-widest cursor-default group">
            [ SKILLS ]
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-20">
          {/* 前端技能 */}
          <div>
            <h3 className="text-base md:text-lg font-medium mb-6 tracking-wider text-center lg:text-left">
              FRONTEND DEVELOPMENT
            </h3>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.2 }}
              className="flex flex-wrap justify-center lg:justify-start gap-4"
            >
              {frontendSkills.map(skill => (
                <motion.span
                  key={skill}
                  variants={itemVariants}
                  className="px-4 py-2 rounded-lg bg-muted-foreground/10 text-sm md:text-base font-light hover:bg-primary hover:text-white"
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* 後端技能 */}
          <div>
            <h3 className="text-base md:text-lg font-medium mb-6 text-center tracking-wider lg:text-left">
              BACKEND DEVELOPMENT
            </h3>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.2 }}
              className="flex flex-wrap justify-center lg:justify-start gap-4"
            >
              {backendSkills.map(skill => (
                <motion.span
                  key={skill}
                  variants={itemVariants}
                  className="px-4 py-2 rounded-lg bg-muted-foreground/10 text-sm md:text-base font-light hover:bg-primary hover:text-white"
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
