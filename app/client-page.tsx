'use client';

import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import Banner from '@/components/banner';
import Container from '@/components/container';
import Link from 'next/link';
import React from 'react';

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

const projects = [
  {
    name: '企業官方網站',
    description:
      '使用 Next.js 與 TypeScript 完成官方網站的架構與功能開發，確保網站具備響應式設計、優化 SEO 並提升使用者體驗。',
    skills: ['Next.js', 'TypeScript'],
  },
  {
    name: '聊天室',
    description:
      '使用 Vue.js 與 Vuex 開發即時聊天室功能，整合 WebSocket 實現訊息同步，管理使用者狀態與操作介面，提升使用者即時互動體驗。',
    skills: ['Vue.js', 'Vuex', 'WebSocket'],
  },
  {
    name: '區塊鏈錢包',
    description:
      '使用 Next.js 開發交易介面與資產管理功能，實現多版型切換，提供使用者良好的操作體驗與資產概覽。',
    skills: ['Next.js', 'Zustand'],
  },
  {
    name: '直播流量後台管理系統',
    description:
      '獨立從0到1架構並開發直播流量數據後台管理系統，運用 Vue 3、TypeScript、ECharts、Pinia 與 i18n 實現數據可視化與國際化，優化資料處理邏輯與介面互動，提升系統穩定性與使用者體驗。',
    skills: ['Vue3', 'TypeScript', 'Pinia'],
  },
  {
    name: '數據可視化平台',
    description:
      '使用 React、OpenStreetMap 與 ECharts 開發數據可視化平台，提升數據解讀與分析效率。',
    skills: ['React', 'ECharts'],
  },
  {
    name: '遊戲直播播放器',
    description:
      '使用 Vue 3 與 Video.js 實現播放器核心功能，支援即時串流與自訂播放控制，優化播放效能與使用者體驗。',
    skills: ['Vue3', 'Video.js'],
  },
];

export default function HomePage() {
  const [, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Banner />
      <section className="mb-16">
        <Container
          className={cn(
            'pb-24',
            'before:block before:w-14 before:h-[1px] before:absolute before:right-5 before:bottom-0 before:bg-border',
            'after:block after:w-[1px] after:h-14 after:absolute after:right-5 after:bottom-0 after:bg-border'
          )}
        >
          {/* 標題 */}
          <div className="flex justify-center lg:justify-start mb-12">
            <h2 className="relative text-primary text-lg md:text-xl lg:text-2xl font-semibold tracking-widest cursor-default group">
              [ SKILLS ]
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </h2>
          </div>

          {/* 前端技能 */}
          <div className="mb-16">
            <h3 className="text-lg md:text-xl font-medium mb-6 text-center lg:text-left">
              FRONTEND DEVELOPMENT
            </h3>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              {frontendSkills.map((skill, i) => (
                <span
                  key={skill}
                  className="px-4 py-2 rounded-lg bg-muted-foreground/10 text-sm md:text-base font-light hover:bg-primary hover:text-white transition-colors duration-300 opacity-0 animate-fadeIn"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* 後端技能 */}
          <div>
            <h3 className="text-lg md:text-xl font-medium mb-6 text-center lg:text-left">
              BACKEND DEVELOPMENT
            </h3>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              {backendSkills.map((skill, i) => (
                <span
                  key={skill}
                  className="px-4 py-2 rounded-lg bg-muted-foreground/10 text-sm md:text-base font-light hover:bg-primary hover:text-white transition-colors duration-300 opacity-0 animate-fadeIn"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </section>
      <section className="mb-48">
        <Container>
          <div className="flex gap-5">
            {/* 左側固定 */}
            <div className="w-1/4">
              <h2 className="sticky inline-block top-24 text-primary text-lg md:text-xl lg:text-2xl font-semibold tracking-widest cursor-default group">
                [ PROJECTS ]
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </h2>
            </div>

            {/* 右側滾動內容 */}
            <div className="flex-1 grid grid-cols-2 gap-5">
              {projects.map(project => (
                <div key={project.name} className="flex flex-col gap-2">
                  <div
                    className={cn('relative h-[200px] overflow-hidden group')}
                  >
                    {/* 背景顏色替代公司 logo */}
                    <div className="absolute inset-0 bg-border"></div>

                    {/* 三角形 overlay */}
                    <div className="absolute top-0 right-0 w-0 h-0 border-t-primary border-l-transparent group-hover:border-t-[1200px] group-hover:border-l-[1200px] opacity-90 transition-all duration-500 ease-in-out" />

                    {/* 文字內容 */}
                    <div className="absolute inset-0 p-6 bg-transparent text-white opacity-0 transition-opacity duration-300 ease-in-out delay-300 group-hover:opacity-100 flex flex-col justify-center items-center gap-2">
                      <h3 className="text-base font-medium">{project.name}</h3>
                      <p className="text-sm mt-1 text-center">
                        {project.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-primary mb-1 tracking-widest">
                      {project.skills
                        .map(item => item.toUpperCase())
                        .join('・')}
                    </p>
                    <p className="text-base text-muted-foreground">
                      {project.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
      <section className="mb-48">
        <Container>
          <div className="flex flex-col lg:flex-row items-start gap-12">
            <video
              autoPlay
              loop
              muted
              className="w-full lg:w-1/4 rounded-3xl shadow-sm object-cover"
            >
              <source src="/life.mp4" type="video/mp4" />
              您的瀏覽器不支援影片播放。
            </video>

            <div className="flex-1 space-y-10">
              {/* ABOUT */}
              <div>
                <h2 className="relative inline-block text-lg md:text-xl lg:text-2xl font-medium text-primary tracking-widest uppercase mb-4 group">
                  [ ABOUT ME ]
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                </h2>
                <h1 className="text-3xl md:text-4xl font-semibold leading-snug text-foreground">
                  嗨，我是 <span className="font-bold">思宇 Ssuyu</span>。
                  <br />
                  來自
                  <span className="text-primary font-medium">
                    {' '}
                    花蓮太魯閣族{' '}
                  </span>
                  的
                  <span className="underline underline-offset-8 decoration-border">
                    前端工程師
                  </span>
                  。
                </h1>
              </div>

              {/* CONTENT */}
              <div className="grid md:grid-cols-2 gap-10 text-sm text-muted-foreground leading-relaxed">
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
                    SKILLS
                  </h3>
                  <p>
                    專注於打造
                    <span className="font-medium text-foreground"> 高效能</span>
                    、
                    <span className="font-medium text-foreground">
                      具互動性{' '}
                    </span>
                    的網頁應用。
                  </p>
                  <p>
                    前端：React、Vue、Next.js、Nuxt.js、Vite、Tailwind CSS
                    <br />
                    後端：Node.js、MongoDB、MySQL
                  </p>
                  <p className="pt-4">
                    提供
                    <span className="text-primary font-medium"> 網站設計 </span>
                    、
                    <span className="text-primary font-medium"> 互動介面 </span>
                    與
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
              </div>

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

      <section className="pb-5">
        <Container>
          <div className="flex justify-between items-center">
            <p className="text-9xl font-bold">SSUYUKE</p>
            <div className="flex-1 flex flex-col justify-between">
              <div className="flex justify-center text-center mb-4">
                <h2 className="tracking-widest relative text-primary text-lg md:text-xl lg:text-2xl font-semibold cursor-default group">
                  [ CONTACT ]
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                </h2>
              </div>
              <div className="text-center text-sm">
                <p className="tracking-widest mb-1">ssuyuke@gmail.com</p>
                <div>
                  {['Instagram', 'Facebook', 'Linkedin'].map(
                    (item, index, arr) => (
                      <React.Fragment key={item}>
                        <Link
                          href=""
                          className="hover:text-primary transition-colors tracking-wide"
                        >
                          {item.toUpperCase()}
                        </Link>
                        {index < arr.length - 1 && (
                          <span className="mx-1 text-muted-foreground">/</span>
                        )}
                      </React.Fragment>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
