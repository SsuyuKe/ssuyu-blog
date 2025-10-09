import PageContainer from '@/components/page-container';
import { sortByPublishedAtDesc } from '@/lib/utils';
import { getBlogPosts } from '@/lib/mdx';
import ClientPage from './client-page';

//TODO: SEO
//TODO: loading(加上TopProgressBar)
// TODO: 文章內頁 => 影片
// TODO: header
//TODO: footer
// TODO: i18n
// TODO: 串IG, FB, Line
// TODO: 背景加上白色背景
// TODO: TG 聊天室
// TODO: 經營Linkdin

// TODO: 效能優化(像是用static generation)

export default function BlogPage() {
  const posts = sortByPublishedAtDesc(getBlogPosts()).filter(
    post => post.metadata.isPublished
  );
  return (
    <PageContainer>
      <ClientPage posts={posts} />
    </PageContainer>
  );
}
