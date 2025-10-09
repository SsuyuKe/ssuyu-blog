'use client';

import Link from 'next/link';
import { formatDate } from '@/lib/time';
import { PostMeta } from '@/types/post';
import Image from 'next/image';
import { Button } from './ui/button';

export default function BlogListItem({
  post,
  slug,
}: {
  post: PostMeta;
  slug: string;
}) {
  return (
    <Link
      href={`/blog/${post.category}/${slug}`}
      className="transition-all md:px-5 border-b last:border-0 border-border/40 hover:bg-muted/30"
    >
      <article className="group flex flex-col md:flex-row gap-6 py-8 last:border-0 transition-colors">
        {/* 封面圖 */}
        {post.cover && (
          <div className="relative w-full md:w-1/3 flex-shrink-0 aspect-video overflow-hidden bg-muted/20">
            <Image
              src={post.cover}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}

        {/* 右側文字內容 */}
        <div className="flex-1 flex flex-col justify-between gap-3">
          {/* 類別與日期 */}
          {/* TODO: 改成動態分類和標籤 */}
          <div className="flex flex-wrap items-center gap-2 text-sm text-primary font-medium">
            <span>{post.category}</span>
            <span>•</span>
            <span>React</span>
          </div>

          {/* 標題 */}
          <h2 className="text-xl font-semibold leading-tight hover:text-primary transition-colors duration-200">
            {post.title}
          </h2>

          {/* 時間 */}
          <p className="text-muted-foreground text-sm">
            {formatDate(post.publishedAt)}
          </p>

          {/* 內文摘要 */}
          <p className="text-muted-foreground text-base line-clamp-3">
            {post.description}
          </p>

          {/* 閱讀全文 */}
          <Button
            variant="link"
            className="text-primary text-sm font-medium hover:underline self-start p-0"
          >
            閱讀全文 →
          </Button>
        </div>
      </article>
    </Link>
  );
}
