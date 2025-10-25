import React from 'react';
import Container from './container';
import { cn } from '@/lib/utils';

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

export default function Project() {
  return (
    <section>
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
                <div className={cn('relative h-[200px] overflow-hidden group')}>
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
                    {project.skills.map(item => item.toUpperCase()).join('・')}
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
  );
}
