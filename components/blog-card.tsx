'use client';

import Image from 'next/image';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/time';
import { PostMeta } from '@/types/post';

// TODO: 動畫回彈效果
export default function BlogCard({ post }: { post: PostMeta }) {
  return (
    <Card className="gap-4 bg-card text-card-foreground overflow-hidden rounded-md shadow-md hover:shadow-lg hover:border-primary hover:-translate-y-1.5 transition-all pt-0 cursor-pointer">
      {/* 封面 */}
      <div className="relative w-full aspect-[16/10] overflow-hidden">
        <Image
          src={post.cover}
          alt={post.title}
          width={400}
          height={200}
          className="w-full h-full object-cover transition-transform"
        />
      </div>

      {/* 內容區 */}
      <CardHeader className="gap-3">
        <Badge className="bg-primary text-primary-foreground w-fit rounded">
          {post.category}
        </Badge>
        <h3 className="text-lg font-semibold leading-tight line-clamp-2 hover:text-primary transition-colors">
          {post.title}
        </h3>
      </CardHeader>

      <CardContent>
        <p className="text-muted-foreground text-sm line-clamp-3">
          {post.description}
        </p>
      </CardContent>

      <CardFooter className="flex items-end justify-between text-sm text-muted-foreground">
        <span>{formatDate(post.publishedAt)}</span>
        <Button
          variant="default"
          className="bg-primary hover:bg-primary-hover text-primary-foreground"
        >
          閱讀全文
        </Button>
      </CardFooter>
    </Card>
  );
}
