import Container from '@/components/container';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const timeline = [
  { date: '2023.12', content: '創立臉書社團「高效轉職前端網頁社群」' },
  { date: '2024.02', content: '開始經營 IG @ssuyuke 分享前端知識' },
  { date: '2025.02', content: '到偏鄉小學無償授課' },
  {
    date: 'Present',
    content:
      '至今已協助 10+ 種職業成功轉職前端工程師（人事HR、空服員、動畫特效師、廚師、業務助理、財務會計人員等）',
  },
];
const feedbacks = [
  {
    role: '醫療行政人員',
    content:
      '從零開始學習一項全新的技能確實不容易，尤其是前端需要注意的細節真的很多。但有了思宇這樣的好老師，能夠幫助我直接針對重點去解決最根本的問題，大大減少了摸索的時間和挫折感。照著他安排的進度，一步步完成專案、準備面試，這一路上都能感受到他的鼓勵與支持。最終，我也真的成功轉職了！',
  },
  {
    role: '空服員',
    content:
      '我達到的最大目標就是我轉職成功了！我的作品真的有被人家看到！這是我最開心的，我真的達成了我的目標！一開始我對自己超級沒信心，因為我是半路轉職的，人家學這麼久我有辦法跟人家競爭嗎？然後你一直鼓勵我，我真的很感動，就是覺得我不行了，可是妳卻一直相信我可以！',
  },
  {
    role: '動畫特效師',
    content:
      '跟思宇學習大概兩個多月，就達到了實際的成果！思宇的方式不會太緊迫盯人但是又會有push，推進我下一步該怎麼做，然後引導下一個階段的方向，我覺得可以讓我比較有目標了！讓我在下一個階段知道可以先著手做什麼事，也會抓到我每一次的進度和問題該如何解決！',
  },
  {
    role: '業務助理',
    content:
      '老師會用簡單的方式，把程式講的很簡單。或者是把專案和理論做結合，老師是邊實作邊跟我講原理，然後我就會知道該怎麼去做！讓我覺得很多事情都理所當然學會！',
  },
  {
    role: '財務會計人員',
    content:
      '我覺得思宇是很可以很我方向，並告訴我下一步該怎麼做的人。包括技術題、專案及面試的準備，妳可以很明確的告訴我應該要怎麼準備，所以我覺得這是妳最吸引我的地方！',
  },
  {
    role: '霧眉師',
    content:
      '回想起一開始，我已經在嘗試轉職的路上自己摸索線上課程，始終看不到效果。在我最迷惘、懊惱的時候，看到了妳的高效轉職直播，也參加了每一場直播，那句「非本科系也能成功轉職！」徹底打動了我。我渴望改變，這樣的機會我當然也想抓住。妳讓我看到希望與方向，並決定開始了一對一的教練課，從專案發想到每週的進度管理、各種問題解答、完成專案、履歷求職的全過程、提醒我要注意的細節，一步步的指引我走過來。遇到瓶頸時，我容易內耗式的懷疑自己，你總能具體分析問題核心後給出最實際的建議，也能幫助我重拾信心。這段歷程讓我不只完成專案，更讓我在轉職路上踏實前進。因為有妳，我才能一步步踏實地向夢想靠近。最後，感謝當時的自己選擇了妳，更感謝妳是我實現夢想路上的推手。思宇，謝謝妳。',
  },
];

export default function TeachingSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % feedbacks.length);
    }, 4000); // 每4秒換一個
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <section className="mb-16 py-14">
        <Container>
          {/* 標題 */}
          <div className="flex items-center">
            <div className="w-1/2 flex justify-center lg:justify-start mb-24">
              <h2 className="relative text-sm md:text-base lg:text-lg font-semibold tracking-widest cursor-default group">
                [ TEACHING EXPERIENCE ]
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </h2>
            </div>
            <div className="w-1/2">
              {timeline.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 pb-[120px]">
                  <div className="relative flex-shrink-0 w-4 h-4 rounded-full border-2 border-border bg-transparent flex justify-center items-center">
                    {idx !== timeline.length - 1 && (
                      <div className="absolute top-0 w-[1px] h-[120px] bg-border"></div>
                    )}
                  </div>
                  <div className="text-3xl font-bold text-muted-foreground/50">
                    <p>{item.date}</p>
                    <motion.div
                      key={idx}
                      className="text-sm md:text-base font-normal text-muted-foreground"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.15 }}
                    >
                      {item.content}
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="mb-16">
        <Container>
          <div className="w-full lg:w-1/2">
            {/* Feedback Content */}
            <div className="relative max-w-2xl mx-auto px-8 md:px-10">
              <div className="absolute top-0 left-0 w-7 aspect-square rounded-full bg-border/30 flex justify-center items-center">
                <i className="fa-solid fa-quote-left text-sm text-primary"></i>
              </div>
              <div className="absolute bottom-0 right-0 w-7 aspect-square rounded-full bg-border/30 flex justify-center items-center">
                <i className="fa-solid fa-quote-right text-sm text-primary"></i>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={feedbacks[activeIndex].role}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="text-muted-foreground md:text-base text-center"
                >
                  <p className="mb-2 noto-serif-tc text-base leading-relaxed">
                    {feedbacks[activeIndex].content}
                  </p>
                  <p className="text-primary noto-serif-tc text-base leading-relaxed">
                    — {feedbacks[activeIndex].role}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
