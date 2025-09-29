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

interface BlogCardProps {
  cover: string;
  category: string;
  title: string;
  desc: string;
  date: string;
}

// TODO: 動畫回彈效果
export default function BlogCard({
  cover,
  category,
  title,
  desc,
  date,
}: BlogCardProps) {
  return (
    <Card className="group bg-card text-card-foreground overflow-hidden rounded-lg shadow-md hover:shadow-lg hover:border-primary hover:-translate-y-1.5 transition-all pt-0 cursor-pointer">
      {/* 封面 */}
      <div className="relative w-full h-52 overflow-hidden">
        <Image
          src={cover}
          alt={title}
          width={400}
          height={200}
          className="w-full h-full object-cover transition-transform group-hover:scale-125"
        />
      </div>

      {/* 內容區 */}
      <CardHeader className="space-y-2">
        <Badge className="bg-primary text-primary-foreground w-fit">
          {category}
        </Badge>
        <h3 className="text-lg font-semibold leading-tight line-clamp-2 hover:text-primary transition-colors">
          {title}
        </h3>
      </CardHeader>

      <CardContent>
        <p className="text-muted-foreground text-sm line-clamp-3">{desc}</p>
      </CardContent>

      <CardFooter className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{formatDate(date)}</span>
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
