import LatestPosts from '@/components/latest-posts';
import Container from '@/components/container';
import { sortByPublishedAtDesc } from '@/lib/utils';
import { getBlogPosts } from '@/lib/mdx';

// TODO: margin-top之後會再更改，先暫時
// TODO: 切換列表/網格
//TODO: SEO
//TODO: loading(加上TopProgressBar)
// TODO: error handling(空的狀態)
// TODO: category filter
// TODO: 新舊排序
// TODO: search功能

// TODO: 效能優化(像是用static generation)

// TODO: 做Container component

export default function BlogPage() {
  const posts = sortByPublishedAtDesc(getBlogPosts()).filter(
    post => post.metadata.isPublished
  );
  console.log(posts);

  return (
    <div className="mt-[100px]">
      <Container>
        <LatestPosts posts={posts} />
      </Container>
    </div>
  );
}
