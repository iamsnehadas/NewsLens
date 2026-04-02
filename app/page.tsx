import HomeInput from '@/components/home/HomeInput'
import HeadlinesGrid from '@/components/home/HeadlinesGrid'
import { NewsArticle, ApiResponse } from '@/types/api'

async function getHeadlines(): Promise<NewsArticle[]> {
  try {
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000'

    const res = await fetch(`${baseUrl}/api/headlines`, {
      next: { revalidate: 300 },
    })
    const json: ApiResponse<NewsArticle[]> = await res.json()
    if (json.error || !json.data) return []
    return json.data
  } catch {
    return []
  }
}

export default async function Home() {
  const articles = await getHeadlines()

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">News Lens</h1>
          <p className="text-sm text-gray-500">
            Analyse news articles for credibility signals, framing, and source context.
          </p>
        </div>

        {/* Input block */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-10">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">
            Paste an article URL or text to analyse
          </h2>
          <HomeInput />
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">Or browse trending headlines</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Headlines grid */}
        <HeadlinesGrid articles={articles} />

      </div>
    </main>
  )
}