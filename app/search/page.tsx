import { Suspense } from 'react'
import SearchResults from './SearchResults'

export default function SearchPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">搜索结果</h1>
      <Suspense fallback={<div>加载中...</div>}>
        <SearchResults />
      </Suspense>
    </div>
  )
}

