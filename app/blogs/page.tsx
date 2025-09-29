import LatestPosts from '@/components/latest-posts'
// TODO: margin-top之後會再更改，先暫時
// TODO: 分頁功能
// TODO: 切換列表/網格
//TODO: SEO
//TODO: loading(加上TopProgressBar)
// TODO: error handling(空的狀態)
// TODO: category filter
// TODO: search功能

// TODO: 效能優化(像是用static generation)

// TODO: 做Container component

export default function BlogsPage() {
  return (
    <div className="mt-[100px]">
      <LatestPosts />
    </div>
  )
}
