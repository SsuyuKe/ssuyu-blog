import { Search } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

export default function EmptyPosts() {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4">
      <Alert className="max-w-xs w-full text-center border-dashed border-2 border-muted/50 bg-muted/10">
        <Search className="mx-auto mb-2 w-12 h-12 text-muted-foreground" />
        <AlertDescription>
          沒有符合搜尋條件的文章
          <br />
          試試其他關鍵字吧。
        </AlertDescription>
      </Alert>
    </div>
  );
}
