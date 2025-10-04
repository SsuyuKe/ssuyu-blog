'use client';

import React, { useState, useMemo } from 'react';
import BlogCard from '@/components/blog-card';
import Paginator from './paginator';
import { PostData } from '@/types/post';

export default function LatestPosts({ posts }: { posts: PostData[] }) {
  // 每頁幾篇文章
  const postsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  // 根據目前頁數切資料
  const currentPosts = useMemo(() => {
    const start = (currentPage - 1) * postsPerPage;
    return posts.slice(start, start + postsPerPage);
  }, [posts, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // 換頁滑回頂部
  };

  return (
    <div className="">
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 ">
        {currentPosts.map(post => (
          <BlogCard
            key={post.slug}
            cover={post.metadata.cover}
            category={post.metadata.category}
            title={post.metadata.title}
            desc={post.metadata.description}
            date={post.metadata.publishedAt}
          />
        ))}
      </div>
      <Paginator
        totalPages={totalPages}
        initialPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
