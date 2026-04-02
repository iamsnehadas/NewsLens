import { NewsAPIResponse, NewsArticle } from '@/types/api'

const BASE_URL = 'https://newsapi.org/v2'

export async function getTopHeadlines(): Promise<NewsArticle[]> {
  const response = await fetch(
    `${BASE_URL}/top-headlines?country=us&pageSize=12&apiKey=${process.env.NEWSAPI_KEY}`,
    { next: { revalidate: 300 } }
  )

  if (!response.ok) {
    throw new Error(`NewsAPI error: ${response.status}`)
  }

  const json: NewsAPIResponse = await response.json()

  if (json.status !== 'ok') {
    throw new Error('NewsAPI returned a non-ok status')
  }

  return json.articles
}

export async function searchArticles(keywords: string): Promise<NewsArticle[]> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 15000)

  try {
    const response = await fetch(
      `${BASE_URL}/everything?q=${encodeURIComponent(keywords)}&pageSize=5&sortBy=publishedAt&apiKey=${process.env.NEWSAPI_KEY}`,
      { signal: controller.signal }
    )

    if (!response.ok) {
      throw new Error(`NewsAPI error: ${response.status}`)
    }

    const json: NewsAPIResponse = await response.json()

    if (json.status !== 'ok') {
      throw new Error('NewsAPI returned a non-ok status')
    }

    return json.articles
  } finally {
    clearTimeout(timeout)
  }
}