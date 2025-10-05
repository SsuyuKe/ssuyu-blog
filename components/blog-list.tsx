'use client';

import BlogCard from '@/components/blog-card';
import BlogListItem from '@/components/blog-list-item';
import { PostData } from '@/types/post';
import { ViewMode } from '@/types/post';

export default function BlogList({
  posts,
  viewMode,
}: {
  posts: PostData[];
  viewMode: ViewMode;
}) {
  return viewMode === 'grid' ? (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map(post => (
        <BlogCard key={post.slug} post={post.metadata} />
      ))}
    </div>
  ) : (
    <div className="flex flex-col">
      {posts.map(post => (
        <BlogListItem key={post.slug} post={post.metadata} slug={post.slug} />
      ))}
    </div>
  );
}
