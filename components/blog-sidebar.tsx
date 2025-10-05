import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { formatDate } from '@/lib/time';
import { useState } from 'react';

const categories = ['全部', '前端開發', 'React', '職涯轉職', '面試題'];
const defaultImage =
  'https://images.unsplash.com/photo-1734009617600-ff7b688d4a72?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
const popularPosts = [
  {
    slug: 'frontend-roadmap',
    title: '2025 前端學習路線懶人包',
    cover: defaultImage,
    publishedAt: '2024-05-06',
  },
  {
    slug: 'vue3-tips',
    title: 'Vue 3 實戰中最實用的 5 個技巧',
    cover: defaultImage,
    publishedAt: '2024-05-06',
  },
  {
    slug: 'career-change',
    title: '我如何從非本科轉職成前端工程師',
    cover: defaultImage,
    publishedAt: '2024-05-06',
  },
];

export default function BlogSidebar({
  onCategoryChange,
}: {
  onCategoryChange: (category: string) => void;
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    onCategoryChange(category);
  };

  return (
    <div className=" w-full sticky top-20 rounded-md border bg-card/30 backdrop-blur-sm shadow-sm p-3 sm:p-4 md:p-5">
      <div>
        <h3 className="text-sm font-semibold text-muted-foreground mb-2 tracking-wide">
          分類
        </h3>
        {/* 分類 */}
        <div className="overflow-x-auto md:overflow-visible scrollbar">
          <div className="flex md:grid md:grid-cols-3 gap-2 pb-2 min-w-max">
            {categories.map(category => {
              const isActive = selectedCategory === category;
              return (
                <span
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={`
            block text-center px-3 py-1 text-sm rounded cursor-pointer transition-colors duration-200
            ${
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground'
            }
          `}
                >
                  {category}
                </span>
              );
            })}
          </div>
        </div>
      </div>
      <div className="mt-5 md:pt-4 md:border-t w-full ">
        <h3 className="text-sm font-semibold text-muted-foreground mb-2 tracking-wide">
          熱門文章
        </h3>

        <ul className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
          {popularPosts.map(post => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="block group rounded-md p-3 bg-muted/30 hover:bg-muted/40 transition-all duration-200"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  {/* 分類 */}
                  <Badge className="text-xs rounded-md bg-muted text-muted-foreground">
                    {/* {post.category} */}前端
                  </Badge>
                  {/* 標題 */}
                  <h4 className="text-sm font-medium group-hover:text-primary line-clamp-2 truncate">
                    {post.title}
                  </h4>
                </div>
                {/* 日期 */}
                <div className="flex justify-between items-end text-xs text-muted-foreground">
                  <p>{formatDate(post.publishedAt)}</p>
                  <span className="group-hover:text-primary">閱讀更多 →</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
