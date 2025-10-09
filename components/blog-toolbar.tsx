'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Filter, Search, ChevronDown, Check } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SortOrder } from '@/types/post';
import { cn } from '@/lib/utils';

interface BlogToolbarProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  sortOrder: SortOrder;
  setSortOrder: (value: SortOrder) => void;
  className?: string;
}

// 搜尋框 + 篩選排序 + 切換顯示模式
export default function BlogToolbar({
  searchQuery,
  setSearchQuery,
  sortOrder,
  setSortOrder,
  className,
}: BlogToolbarProps) {
  const sortOptions = [
    { label: '由新到舊', value: 'desc' },
    { label: '由舊到新', value: 'asc' },
  ] as const;

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-between gap-3',
        className
      )}
    >
      <div className="flex items-center gap-2 w-full">
        <div className="relative flex-grow">
          <Input
            placeholder="搜尋文章..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="focus-visible:ring-0 focus-visible:border-border pr-10 border-t-0 border-x-0 border-b border-border rounded-none shadow-none"
          />
          <Search
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={18}
          />
        </div>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'flex items-center gap-1',
                'border-none shadow-none bg-none text-muted-foreground hover:text-muted-foreground'
              )}
            >
              <Filter size={18} />
              <ChevronDown size={14} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {sortOptions.map(({ label, value }) => (
              <DropdownMenuItem
                key={value}
                onClick={() => setSortOrder(value)}
                disabled={sortOrder === value}
                className={`flex items-center justify-between ${
                  sortOrder === value
                    ? 'text-primary font-medium cursor-default'
                    : 'cursor-pointer'
                }`}
              >
                {label}
                {sortOrder === value && (
                  <Check size={14} className="text-primary" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
