import { NewsArticle } from '@/types/api'
import Card from '@/components/ui/Card'
import { formatPublishedAt } from '@/lib/utils'

interface Props {
  articles: NewsArticle[]
}

export default function CrossReference({ articles }: Props) {
  return (
    <Card>
      <h2 className="text-base font-semibold text-gray-900 mb-1">Source Cross-Reference</h2>
      <p className="text-xs text-gray-500 mb-4">
        Other outlets reporting on the same topic in the last 24 hours.
      </p>
      {articles.length === 0 ? (
        <p className="text-sm text-gray-500">
          No other sources found reporting on this topic in the last 24 hours.
        </p>
      ) : (
        <div className="space-y-3">
          {articles.map((article, index) => (<a            
              key={index}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-3 rounded-lg border border-gray-100 hover:border-gray-300 hover:bg-gray-50 transition-all duration-150"
            >
              <p className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                {article.title}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{article.source.name}</span>
                <span>{formatPublishedAt(article.publishedAt)}</span>
              </div>
            </a>
          ))}
        </div>
      )}
    </Card>
  )
}