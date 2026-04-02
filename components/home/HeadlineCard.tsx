'use client'

import { NewsArticle } from '@/types/api'
import { formatPublishedAt } from '@/lib/utils'

interface Props {
  article: NewsArticle
}

export default function HeadlineCard({ article }: Props) {
  function handleClick() {
    window.open(article.url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer bg-white rounded-xl border border-gray-200 p-4 hover:border-gray-400 hover:shadow-sm transition-all duration-150"
    >
      <p className="text-sm font-medium text-gray-900 line-clamp-3 mb-3">
        {article.title}
      </p>
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>{article.source.name}</span>
        <div className="flex items-center gap-1.5">
          <span>{formatPublishedAt(article.publishedAt)}</span>
          <span className="text-gray-300">↗</span>
        </div>
      </div>
    </div>
  )
}