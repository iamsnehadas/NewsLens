import { NextResponse } from 'next/server'
import { getTopHeadlines } from '@/lib/newsapi'
import { ApiResponse } from '@/types/api'
import { NewsArticle } from '@/types/api'

export async function GET(): Promise<NextResponse<ApiResponse<NewsArticle[]>>> {
  try {
    const articles = await getTopHeadlines()
    return NextResponse.json({ data: articles, error: null })
  } catch (error) {
    console.error('[/api/headlines] Failed to fetch headlines:', error)
    return NextResponse.json(
      { data: null, error: 'Failed to fetch headlines. Please try again later.' },
      { status: 500 }
    )
  }
}