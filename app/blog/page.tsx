import Container from '@/components/container';
import { sortByPublishedAtDesc } from '@/lib/utils';
import { getBlogPosts } from '@/lib/mdx';
import ClientPage from './client-page';

//TODO: SEO

// TODO: margin-top之後會再更改，先暫時
//TODO: loading(加上TopProgressBar)
// TODO: 文章內頁 => 影片
// TODO: header
//TODO: footer

// TODO: 效能優化(像是用static generation)

export default function BlogPage() {
  const posts = sortByPublishedAtDesc(getBlogPosts()).filter(
    post => post.metadata.isPublished
  );
  return (
    <Container>
      <ClientPage posts={posts} />
    </Container>
  );
}
