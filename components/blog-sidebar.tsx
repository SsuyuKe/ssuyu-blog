import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const categories = ['所有文章', '前端開發', 'React', '職涯轉職', '面試題'];

export default function BlogSidebar({
  onCategoryChange,
}: {
  onCategoryChange: (category: string) => void;
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>('所有文章');

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    onCategoryChange(category);
  };

  return (
    <div className="w-full sticky top-20">
      <div className="mb-3">
        <h3 className="font-semibold text-muted-foreground mb-3 tracking-wide">
          關於我
        </h3>
        {/* 關於我 */}
        <div className="flex flex-col justify-center items-center w-full gap-3">
          <Image
            src="/avatar.jpg"
            width={100}
            height={100}
            className="w-32 aspect-square rounded-full object-cover"
            alt="avatar"
          />
          <div className="text-[15px] text-muted-foreground text-center">
            <p className="mb-2 font-medium">思宇 Ssuyu</p>
            <p>轉職前端教練｜前端工程師</p>
          </div>
        </div>
      </div>
      <div>
        <h3 className="font-semibold text-muted-foreground mb-3 tracking-wide">
          分類
        </h3>
        {/* 分類 */}
        <ul className="space-y-4 min-w-max mb-5">
          {categories.map(category => (
            <li
              key={category}
              className={cn(
                'flex items-center gap-2 group text-muted-foreground font-medium hover:text-primary/90 hover:font-semibold transition-all duration-200 cursor-pointer',
                selectedCategory === category && 'text-primary'
              )}
              onClick={() => handleCategoryClick(category)}
            >
              <ChevronRight
                size={16}
                className="opacity-50 group-hover:translate-x-1 group-hover:opacity-100 transition-all"
              />
              <span className="text-[15px]">{category}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* TODO: 熱門文章或放大補帖訂閱電子報 */}
    </div>
  );
}
