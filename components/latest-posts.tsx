import React from 'react';
import { getBlogPosts } from '@/lib/mdx';
import BlogCard from '@/components/blog-card';
import { sortByPublishedAtDesc } from '@/lib/utils';

export default function LatestPosts() {
  const posts = getBlogPosts();
  console.log(posts);
  return (
    <div className="container mx-auto px-4 grid gap-8 grid-cols-1 sm:grid-cols-3 lg:grid-cols-4">
      {sortByPublishedAtDesc(posts).map(post => {
        const { metadata } = post;
        if (!metadata.isPublished) return null; // 如果文章未發布，則不顯示
        return (
          <BlogCard
            key={post.slug}
            cover={post.metadata.cover}
            category={post.metadata.category}
            title={post.metadata.title}
            desc={post.metadata.description}
            date={post.metadata.publishedAt}
          />
        );
      })}
    </div>
  );
}
