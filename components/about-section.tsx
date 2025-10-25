import React from 'react';
import Container from './container';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function AboutSection({ className }: { className?: string }) {
  return (
    <section id="about" className={cn('py-20 overflow-hidden', className)}>
      <Container>
        <div className="flex flex-col lg:flex-row items-start gap-12">
          <motion.video
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.5,
              duration: 0.5,
            }}
            autoPlay
            loop
            muted
            className="w-full lg:w-1/4 rounded-3xl shadow-sm object-cover"
          >
            <source src="/life.mp4" type="video/mp4" />
            您的瀏覽器不支援影片播放。
          </motion.video>

          <div className="flex-1 space-y-10">
            {/* ABOUT */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.5,
                duration: 0.5,
              }}
            >
              <h2 className="relative inline-block text-lg md:text-xl lg:text-2xl font-medium text-primary tracking-widest uppercase mb-4 group">
                [ ABOUT ME ]
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </h2>
              <h1 className="text-3xl md:text-4xl font-semibold leading-snug text-foreground">
                嗨，我是 <span className="font-bold">思宇 Ssuyu</span>。
                <br />
                來自
                <span className="text-primary font-medium"> 花蓮太魯閣族 </span>
                的
                <span className="underline underline-offset-8 decoration-border">
                  前端工程師
                </span>
                。
              </h1>
            </motion.div>

            {/* CONTENT */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.5,
                duration: 0.5,
              }}
              className="grid md:grid-cols-2 gap-10 text-sm text-muted-foreground leading-relaxed"
            >
              <div>
                <h3 className="text-xs font-semibold text-foreground mb-2 tracking-widest">
                  JOURNEY
                </h3>
                <p>
                  我從非本科背景轉職成為前端工程師，
                  <br />
                  同時，我熱愛教學，已協助
                  <span className="text-primary font-medium">
                    {' '}
                    超過 10 種不同職業背景
                  </span>{' '}
                  的學員成功轉職。
                </p>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-foreground mb-2 tracking-widest">
                  MISSION
                </h3>
                <p className="pb-4">
                  專注於打造
                  <span className="font-medium text-foreground"> 高效能</span>、
                  <span className="font-medium text-foreground">具互動性 </span>
                  的網頁應用。
                </p>
                {/* <p>
                  前端：React、Vue、Next.js、Nuxt.js、Vite、Tailwind CSS
                  <br />
                  後端：Node.js、MongoDB、MySQL
                </p> */}
                <p>
                  提供
                  <span className="text-primary font-medium"> 網站設計 </span>、
                  <span className="text-primary font-medium"> 互動介面 </span>與
                  <span className="text-primary font-medium">
                    {' '}
                    前端功能開發
                  </span>
                  ，
                  <br />
                  致力於打造
                  <span className="font-medium text-foreground">
                    {' '}
                    現代化、高效能、可維護
                  </span>{' '}
                  的專案，協助企業、品牌與個人展現獨特價值。
                </p>
              </div>
            </motion.div>

            {/* 社群 */}
            <div className="flex items-center gap-6 pt-6">
              <div className="flex gap-4 text-muted-foreground text-lg">
                <Link
                  href="https://www.instagram.com/ssuyuke/"
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
                  className="hover:text-primary transition cursor-pointer"
                >
                  <i className="fa-brands fa-github"></i>
                </Link>
              </div>
              <button className="ml-auto text-sm font-medium hover:text-primary transition-all duration-300 cursor-pointer">
                CONTACT →
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
