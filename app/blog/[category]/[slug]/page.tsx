import { notFound } from 'next/navigation';
import Link from 'next/link';
import Container from '@/components/container';
import { formatDate } from '@/lib/time';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import Breadcrumb from '@/components/breadcrumb';
import { getBlogPosts } from '@/lib/mdx';
import { extractTocFromMdx } from '@/lib/toc';
import CustomMDX from '@/components/custom-mdx';

const relatedPosts = [
  { title: '用 React 打造你的第一個作品集網站', slug: 'react-portfolio' },
  { title: '掌握 CSS Grid 排版技巧', slug: 'css-grid' },
  { title: '從 Vue 到 React：轉框架思維指南', slug: 'vue-to-react' },
];

export default async function Page({
  params,
}: {
  params: { category: string; slug: string };
}) {
  const post = getBlogPosts().find(post => post.slug === params.slug);
  if (!post) notFound();

  const toc = extractTocFromMdx(post.content);
  return (
    <Container>
      {/* --- 主內容 + 側欄 --- */}
      <div className="flex flex-col lg:flex-row gap-10">
        {/* 主內文 */}
        <div className="flex-1">
          {/* --- 麵包屑與封面 --- */}
          <Breadcrumb
            category={post.metadata.category}
            title={post.metadata.title || ''}
          />
          <div className="flex flex-col items-center gap-5 my-3">
            <h1 className="text-3xl font-bold leading-snug">
              {post.metadata.title}
            </h1>
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <span className="text-primary">思宇 Ssuyu</span>
              <span>/</span>
              <span>{formatDate(post.metadata.publishedAt)}</span>
            </div>
          </div>
          <article className="prose max-w-none">
            <CustomMDX source={post.content} />
          </article>
        </div>

        {/* 側欄 */}
        <aside className="w-full lg:w-80 flex-shrink-0 space-y-6 lg:sticky lg:top-20 self-start">
          {/* 目錄 */}
          <Card className="border-border/50 rounded-md gap-3">
            <CardHeader>
              <h3 className="text-base font-semibold">目錄</h3>
            </CardHeader>
            <CardContent>
              <ScrollArea className="max-h-48 pr-2">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {toc.map(item => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="hover:text-primary transition-colors"
                      >
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* 推薦文章 */}
          <Card className="border-border/50 rounded-md gap-3">
            <CardHeader>
              <h3 className="text-base font-semibold">你可能感興趣</h3>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm">
                {relatedPosts.map(p => (
                  <li key={p.slug}>
                    <Link
                      href={`/post/${p.slug}`}
                      className="text-primary hover:underline"
                    >
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </aside>
      </div>
    </Container>
  );
}
