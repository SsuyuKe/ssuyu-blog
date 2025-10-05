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
      className="border-b border-border/40 hover:bg-muted/30 transition-all px-5"
    >
      <article className="group flex flex-col md:flex-row gap-6 py-8 last:border-0 transition-colors">
        {/* 封面圖 */}
        {post.cover && (
          <div className="relative w-full md:w-1/3 aspect-video overflow-hidden rounded-md bg-muted/20">
            <Image
              src={post.cover}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}

        {/* 右側文字內容 */}
        <div className="flex-1 flex flex-col justify-between">
          {/* 類別與日期 */}
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mb-2">
            <span className="text-primary font-medium">{post.category}</span>
            <span>•</span>
            <span>思宇 Ssuyu</span>
            <span>•</span>
            <span>{formatDate(post.publishedAt)}</span>
          </div>

          {/* 標題 */}
          <h2 className="text-2xl font-semibold mb-2 leading-tight">
            <Link
              href={`/blog/${post.category}/${slug}`}
              className="hover:text-primary transition-colors duration-200"
            >
              {post.title}
            </Link>
          </h2>

          {/* 內文摘要 */}
          <p className="text-muted-foreground text-base line-clamp-3 mb-4">
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
