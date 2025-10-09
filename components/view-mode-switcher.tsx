import { List, Grid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ViewMode } from '@/types/post';
import { cn } from '@/lib/utils';

export default function ViewModeSwitcher({
  viewMode,
  setViewMode,
  className,
}: {
  viewMode: ViewMode;
  setViewMode: (value: ViewMode) => void;
  className?: string;
}) {
  return (
    <div className={cn('flex items-center justify-end gap-2', className)}>
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
  );
}
