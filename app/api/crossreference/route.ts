import { NextRequest, NextResponse } from 'next/server'
import { searchArticles } from '@/lib/newsapi'
import { ApiResponse } from '@/types/api'
import { NewsArticle } from '@/types/api'

export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiResponse<NewsArticle[]>>> {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ data: null, error: 'Invalid request body.' }, { status: 400 })
  }

  if (typeof body !== 'object' || body === null || !('keywords' in body)) {
    return NextResponse.json(
      { data: null, error: 'Missing required field: keywords.' },
      { status: 400 }
    )
  }

  const { keywords } = body as { keywords: unknown }

  if (typeof keywords !== 'string' || keywords.trim().length === 0) {
    return NextResponse.json(
      { data: null, error: 'Field "keywords" must be a non-empty string.' },
      { status: 400 }
    )
  }

  try {
    const articles = await searchArticles(keywords.trim())
    return NextResponse.json({ data: articles, error: null })
  } catch (error) {
    console.error('[/api/crossreference] NewsAPI search failed:', error)
    return NextResponse.json(
      { data: null, error: 'Could not fetch related articles. Please try again.' },
      { status: 500 }
    )
  }
}