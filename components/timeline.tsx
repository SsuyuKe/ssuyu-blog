'use client';

import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Container from './container';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const timelineItems = [
  {
    year: '2025',
  },
  {
    title: '里程碑🎉',
    content:
      '至今已協助 10+ 種職業成功轉職前端工程師（如人事HR、空服員、動畫特效師、廚師、業務助理、財務會計人員等）',
    image:
      'https://images.unsplash.com/photo-1760445645512-e5dbf41503e4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=686',
  },
  {
    title: '出版',
    content: '轉職前端電子書《轉職前端工程師的完全指南：從0開始到成功上岸》',
  },
  {
    title: '回饋社會',
    content: '到偏鄉小學無償授課',
    image: '/feedback.JPG',
  },
  {
    year: '2024',
  },
  {
    title: '接案',
    content: '開始提供前端接案服務',
  },
  {
    title: '直播',
    content: '舉辦免費前端專案工作坊',
  },
  {
    title: 'IG品牌',
    content: '開始經營 IG @ssuyuke 分享前端知識',
    image:
      'https://images.unsplash.com/photo-1521401292936-0a2129a30b1c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=765',
  },
  {
    year: '2023',
  },
  {
    title: 'FB轉職前端社團',
    content: '創立「高效轉職前端網頁社群」臉書社團，開始協助學員轉職',
    image:
      'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=735',
  },
  {
    title: '前端工程師',
    content: '從半導體行業轉職前端工程師🥳',
    image: 'front-end.JPG',
  },
  {
    year: '2022',
  },
];
const Timeline = () => {
  const timelineRef = useRef(null);
  const fillLineRef = useRef(null);
  const imageRef = useRef(null); // 圖片 Ref (用於 GSAP 控制圖片淡入淡出)
  const imagePinRef = useRef(null);
  const checkPointItemRefs = useRef<HTMLLIElement[]>([]);
  checkPointItemRefs.current = [];

  // 狀態：追蹤當前顯示的圖片 URL
  const [activeImage, setActiveImage] = useState('');

  const addTocheckPoints = (el: HTMLLIElement | null) => {
    if (el && !checkPointItemRefs.current.includes(el)) {
      checkPointItemRefs.current.push(el);
    }
  };

  const fillLineAnimation = () => {
    // 1. 線條著色動畫
    const lineTl = gsap.timeline({
      defaults: { duration: 1, ease: 'none' },
    });
    lineTl.to(fillLineRef.current, { scaleY: 1 });

    ScrollTrigger.create({
      trigger: timelineRef.current,
      start: 'top 200px',
      end: 'bottom 200px',
      scrub: true,
      animation: lineTl,
    });
    return { lineTl };
  };

  // 2. 圖片固定 (Pin) 動畫
  const pinImageAnimaion = () => {
    ScrollTrigger.create({
      trigger: timelineRef.current, // 觸發器：整個時間線內容
      pin: imagePinRef.current, // 釘住圖片的容器
      start: 'top 200px', // 當時間線頂部到達視窗頂部時開始釘住
      end: 'bottom center', // 當時間線底部到達視窗底部時解除釘住 (這樣圖片在滾動完後才會跟著滾走)
      pinSpacing: false, // 避免產生額外的 padding/margin
    });
  };

  //3. 節點偵測與圖片切換動畫
  const slideAnimation = () => {
    checkPointItemRefs.current.forEach((item, index) => {
      const itemData = timelineItems[index];

      // 為每個時間線項目創建 ScrollTrigger
      ScrollTrigger.create({
        trigger: item,
        // 當項目滾動到視窗中心時觸發 (start)
        start: 'top center',
        // 當項目滾出視窗中心時結束 (end)
        end: 'bottom center',

        // 關鍵屬性：進入/離開觸發
        onToggle: self => {
          if (self.isActive) {
            // 進入活動區：切換圖片和標題
            gsap.to(imageRef.current, {
              opacity: 0.8, // 圖片變亮
              duration: 0.3,
            });
            if (itemData.image) {
              setActiveImage(itemData.image);
            }
          } else {
            // 離開活動區：圖片變暗 (可選)
            gsap.to(imageRef.current, {
              opacity: 0.5,
              duration: 0.3,
            });
          }
        },
      });
    });
  };

  const renderTimeLine = () => (
    <div className="relative">
      {/* 1. 靜態的「背景」線 */}
      <div className="absolute h-full w-[2px] bg-border -translate-x-1/2"></div>

      {/* 2. 要滾動時著色的「前景」線 */}
      <div
        ref={fillLineRef}
        className="absolute h-full w-[2px] bg-primary origin-top scale-y-0 -translate-x-1/2"
      ></div>

      {/* Timeline Items */}
      <ul className="flex flex-col relative">
        {timelineItems.map((item, index) => (
          <li
            ref={addTocheckPoints}
            key={index}
            className="flex items-start pb-28"
          >
            {/* 圓點區域 */}
            <div className="relative flex-shrink-0">
              {/* Center Dot */}
              <div className="absolute top-0 right-0 w-4 h-4 border-2 border-border bg-background rounded-full z-20 transform translate-x-1/2" />
            </div>

            {/* 內容區塊 (包含標題和內容，現在都靠右) */}
            <div className="flex-1 pl-4">
              {/* 年 */}
              <p className="text-4xl font-bold text-primary tracking-wide">
                {item.year}
              </p>
              <div className="text-foreground">
                {/* 標題 */}
                <p className="text-2xl font-bold tracking-wide">{item.title}</p>
                {/* 內容 */}
                <div className="font-medium tracking-wide">{item.content}</div>
              </div>
            </div>
          </li>
        ))}
        <div className="absolute -bottom-10 -left-2 z-20 transform flex items-start">
          <div className="w-4 h-4 border-2 border-border bg-background rounded-full"></div>
          <div className="pl-2 text-foreground">
            <p className="text-2xl font-bold tracking-wide">起點</p>

            <p className="font-medium tracking-wide">
              半導體科技公司產品工程師
            </p>
          </div>
        </div>
      </ul>
    </div>
  );

  const renderImage = () => (
    <div
      ref={imagePinRef}
      className="relative aspect-square w-full rounded-2xl h-96 overflow-hidden pt-7"
    >
      <div
        className="absolute h-7 top-0 left-0 right-0 flex items-center justify-between px-3 rounded-t-2xl"
        style={{
          backgroundColor: '#ffffff', // 接近純白，與 #f5f5f5 輕微區分
        }}
      >
        {/* A. 左邊三個控制按鈕 */}
        <div className="flex space-x-2">
          {/* 紅色 - 關閉 (保持標準色) */}
          <div
            className="w-3 h-3 rounded-full bg-[#FF5F56] opacity-70 hover:opacity-100 transition-opacity"
            title="關閉"
          ></div>

          {/* 黃色 - 最小化 (保持標準色) */}
          <div
            className="w-3 h-3 rounded-full bg-[#FFBD2E] opacity-70 hover:opacity-100 transition-opacity"
            title="最小化"
          ></div>

          {/* 綠色按鈕替換為主題色 #c83e6b */}
          <div
            className="w-3 h-3 rounded-full opacity-70 hover:opacity-100 transition-opacity bg-primary"
            // 使用您的主題色

            title="主要操作/全螢幕"
          ></div>
        </div>

        {/* B. 中間標題 (可選) */}
        <div className="text-xs text-gray-400 font-medium">
          Ssuyu Ke&apos;s Journey
        </div>

        {/* C. 右邊圖標 (例如：分享/設定圖標) */}
        <div className="flex space-x-2">
          {/* 圖標在懸停時使用主題色 #c83e6b */}
          <svg
            className="w-4 h-4 text-gray-400 cursor-pointer transition-colors"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            // 懸停時顏色設置為主題色
            style={
              {
                // Tailwind CSS 不直接支援行內樣式 + 偽類（:hover）
                // 在 React 中，通常需要使用 useState 或 Tailwind JIT 來自定義 hover 顏色。
                // 在此範例中，我們使用通用的 hover:text-gray-700 搭配一個提示性文字
                // 讓它看起來像是在呼應主題。如果您使用 PostCSS/Tailwind，
                // 建議在 tailwind.config.js 中擴展 hover 顏色。
              }
            }
            onMouseEnter={e => (e.currentTarget.style.color = '#c83e6b')}
            onMouseLeave={e =>
              (e.currentTarget.style.color = 'rgb(156, 163, 175)')
            } // 變回 text-gray-400 的顏色
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
            />
          </svg>
        </div>
      </div>
      <Image
        ref={imageRef}
        src={activeImage || timelineItems.find(i => i.image)?.image || ''}
        width={500}
        height={500}
        alt="Timeline Visual"
        className="w-full h-full object-cover transition-opacity duration-300"
        style={{ opacity: 0.5 }}
      />
    </div>
  );

  useLayoutEffect(() => {
    if (!timelineRef.current || !fillLineRef.current) return;

    const { lineTl } = fillLineAnimation();
    pinImageAnimaion();
    slideAnimation();

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      lineTl.kill();
    };
  }, []);

  return (
    <section className="py-20">
      <Container className="min-h-[200vh]">
        <h2 className="mb-12 inline-block text-primary text-lg md:text-xl lg:text-2xl font-semibold tracking-widest cursor-default group">
          [ TIMELINE ]
          <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
        </h2>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-6" ref={timelineRef}>
            {renderTimeLine()}
          </div>
          <div className="col-span-12 md:col-span-6 md:flex hidden">
            {renderImage()}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Timeline;
