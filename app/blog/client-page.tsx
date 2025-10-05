'use client';

import React, { useState, useMemo } from 'react';
import Paginator from '@/components/paginator';
import BlogSidebar from '@/components/blog-sidebar';
import { PostData } from '@/types/post';
import EmptyPosts from '@/components/empty-posts';
import BlogToolbar from '@/components/blog-toolbar';
import BlogList from '@/components/blog-list';

export default function BlogClientPage({ posts }: { posts: PostData[] }) {
  const postsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');

  // 先排序文章
  const sortedPosts = useMemo(() => {
    return [...posts].sort((a, b) => {
      const dateA = new Date(a.metadata.publishedAt).getTime();
      const dateB = new Date(b.metadata.publishedAt).getTime();
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });
  }, [posts, sortOrder]);

  // 篩選 + 搜尋
  const filteredPosts = useMemo(() => {
    let filtered = sortedPosts;

    if (selectedCategory !== '全部') {
      filtered = filtered.filter(
        post => post.metadata.category === selectedCategory
      );
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter(post =>
        [post.metadata.title, post.metadata.description].some(field =>
          field.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    return filtered;
  }, [sortedPosts, selectedCategory, searchQuery]);

  // 根據目前頁數切資料
  const currentPosts = useMemo(() => {
    const start = (currentPage - 1) * postsPerPage;
    return filteredPosts.slice(start, start + postsPerPage);
  }, [filteredPosts, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // 換頁滑回頂部
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <aside className="w-full md:w-72 md:flex-shrink-0">
        <BlogSidebar
          onCategoryChange={category => {
            setSelectedCategory(category);
            setCurrentPage(1);
          }}
        />
      </aside>
      <main className="flex-1">
        <BlogToolbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />
        {filteredPosts.length === 0 ? (
          <EmptyPosts />
        ) : (
          <BlogList posts={currentPosts} viewMode={viewMode} />
        )}
        {filteredPosts.length > 0 && (
          <Paginator
            totalPages={Math.ceil(filteredPosts.length / postsPerPage)}
            initialPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </main>
    </div>
  );
}
