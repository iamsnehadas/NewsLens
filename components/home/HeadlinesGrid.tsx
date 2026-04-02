import { NewsArticle } from '@/types/api'
import HeadlineCard from './HeadlineCard'

interface Props {
  articles: NewsArticle[]
}

export default function HeadlinesGrid({ articles }: Props) {
  if (articles.length === 0) {
    return (
      <p className="text-sm text-gray-500 text-center py-6">
        Trending headlines are unavailable right now. You can still paste an article above to analyse it.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {articles.map((article) => (
        <HeadlineCard key={article.url} article={article} />
      ))}
    </div>
  )
}