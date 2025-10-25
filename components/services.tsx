import React from 'react';
import Container from './container';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

function ServiceCard({
  icon,
  title,
  btnLink,
  btnText,
  delay = 0.3,
  children,
}: {
  icon: string;
  title: string;
  btnLink: string;
  btnText: string;
  delay?: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay,
      }}
      className={cn(
        'text-sm bg-card p-6 rounded-xl border border-border hover:shadow-md hover:-translate-y-2 transition-all duration-300',
        'flex flex-col justify-between items-center gap-4'
      )}
    >
      <div className="flex gap-2 items-center justify-center">
        <i className={`fas ${icon} text-primary text-xl`}></i>
        <h3 className="text-xl font-semibold text-foreground dark:text-foreground text-center">
          {title}
        </h3>
      </div>
      <p className="text-foreground/90 dark:text-card-foreground/90 text-center tracking-wide">
        {children}
      </p>
      <Link
        href={btnLink}
        className="w-max py-2 px-4 tracking-wider bg-primary text-primary-foreground rounded-lg hover:bg-primary-hover transition-colors"
      >
        {btnText}
      </Link>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="py-20 overflow-hidden">
      <Container>
        <h2 className="mb-12 inline-block text-primary text-lg md:text-xl lg:text-2xl font-semibold tracking-widest cursor-default group">
          [ SERVICES ]
          <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
        </h2>
        <div className="flex flex-col gap-4 mb-20 text-3xl md:text-4xl font-bold text-center">
          <p>Build modern web projects.</p>
          <p>Launch your front-end career.</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <ServiceCard
            icon="fa-laptop-code"
            title="網頁開發外包"
            btnLink="#contact"
            btnText="立即洽談"
          >
            使用 <strong>React / Vue / Next.js / Nuxt.js</strong>
            打造高效、現代、響應式網站。不僅確保前端性能優化與跨裝置體驗流暢，更能依照你的品牌風格與功能需求，快速將專案落地，讓你專注於業務成長。
          </ServiceCard>
          <ServiceCard
            icon="fa-chalkboard-teacher"
            title="轉職前端教練課"
            btnLink="https://calendly.com/ssuyuke/1v1"
            btnText="預約諮詢"
            delay={0.6}
          >
            從基礎到專案實戰，量身打造學習計畫，提供專案實作、履歷優化與面試一條龍服務。我已協助
            10+ 種職業
            成功轉職前端工程師，讓你掌握前端核心技能，快速上手專案，順利開啟新職涯。
          </ServiceCard>
          <ServiceCard
            icon="fa-lightbulb"
            title="前端技能諮詢"
            btnLink="#contact"
            btnText="預約諮詢"
            delay={0.9}
          >
            針對轉職前端提供專業諮詢服務：專案規劃、履歷優化、技能提升與面試策略，從技術到求職全方位支持
          </ServiceCard>
        </div>
      </Container>
    </section>
  );
}
