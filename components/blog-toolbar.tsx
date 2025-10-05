'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { List, Grid, Filter, Search, ChevronDown, Check } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ViewMode, SortOrder } from '@/types/post';

interface BlogToolbarProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  sortOrder: SortOrder;
  setSortOrder: (value: SortOrder) => void;
  viewMode: ViewMode;
  setViewMode: (value: ViewMode) => void;
}

// 搜尋框 + 篩選排序 + 切換顯示模式
export default function BlogToolbar({
  searchQuery,
  setSearchQuery,
  sortOrder,
  setSortOrder,
  viewMode,
  setViewMode,
}: BlogToolbarProps) {
  const sortOptions = [
    { label: '由新到舊', value: 'desc' },
    { label: '由舊到新', value: 'asc' },
  ] as const;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <div className="relative flex-grow sm:w-80 md:w-96">
          <Input
            placeholder="搜尋文章..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="pr-10"
          />
          <Search
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={18}
          />
        </div>

        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-1">
              <Filter size={18} />
              <ChevronDown size={14} className="text-muted-foreground" />
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

      <div className="flex items-center justify-end gap-2">
        <Button
          size="icon"
          variant={viewMode === 'grid' ? 'default' : 'outline'}
          onClick={() => setViewMode('grid')}
        >
          <Grid size={18} />
        </Button>
        <Button
          size="icon"
          variant={viewMode === 'list' ? 'default' : 'outline'}
          onClick={() => setViewMode('list')}
        >
          <List size={18} />
        </Button>
      </div>
    </div>
  );
}
