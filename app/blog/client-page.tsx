'use client';

import React, { useState, useMemo } from 'react';
import Paginator from '@/components/paginator';
import BlogSidebar from '@/components/blog-sidebar';
import { PostData } from '@/types/post';
import EmptyPosts from '@/components/empty-posts';
import BlogToolbar from '@/components/blog-toolbar';
import BlogList from '@/components/blog-list';
// import ViewModeSwitcher from '@/components/view-mode-switcher';

export default function BlogClientPage({ posts }: { posts: PostData[] }) {
  const postsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  // const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('所有文章');

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

    if (selectedCategory !== '所有文章') {
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
    <div className="flex flex-col md:flex-row gap-12 pt-10">
      <div className="flex-1">
        <div className="flex items-end justify-between mb-5">
          <h2 className="font-semibold flex-1 text-2xl">
            CATEGORY： <span className="text-primary">{selectedCategory}</span>
          </h2>
          {/* <ViewModeSwitcher viewMode={viewMode} setViewMode={setViewMode} /> */}
        </div>
        {filteredPosts.length === 0 ? (
          <EmptyPosts />
        ) : (
          <BlogList posts={currentPosts} viewMode="list" />
        )}
        {filteredPosts.length > 0 && (
          <Paginator
            totalPages={Math.ceil(filteredPosts.length / postsPerPage)}
            initialPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>
      <aside className="w-full md:w-72 md:flex-shrink-0">
        <BlogToolbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          className="mb-5"
        />
        <BlogSidebar
          onCategoryChange={category => {
            setSelectedCategory(category);
            setCurrentPage(1);
          }}
        />
      </aside>
    </div>
  );
}
