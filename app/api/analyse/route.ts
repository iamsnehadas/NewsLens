import { NextRequest, NextResponse } from 'next/server'
import { analyseArticle } from '@/lib/gemini'
import { analyseWithGroq } from '@/lib/groq'
import { sanitiseArticleText } from '@/lib/utils'
import { ApiResponse } from '@/types/api'
import { GeminiAnalysisResponse } from '@/types/gemini'

export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiResponse<GeminiAnalysisResponse>>> {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ data: null, error: 'Invalid request body.' }, { status: 400 })
  }

  if (typeof body !== 'object' || body === null || !('text' in body)) {
    return NextResponse.json(
      { data: null, error: 'Missing required field: text.' },
      { status: 400 }
    )
  }

  const { text } = body as { text: unknown }

  if (typeof text !== 'string') {
    return NextResponse.json(
      { data: null, error: 'Field "text" must be a string.' },
      { status: 400 }
    )
  }

  const sanitised = sanitiseArticleText(text)

  if (!sanitised.valid) {
    return NextResponse.json(
      { data: null, error: sanitised.error ?? 'Invalid input.' },
      { status: 400 }
    )
  }

  try {
    const analysis = await analyseArticle(text.trim())
    return NextResponse.json({ data: analysis, error: null })
  } catch (error) {
    const message = error instanceof Error ? error.message : ''

    if (message === 'GEMINI_503') {
      console.error('[/api/analyse] Gemini unavailable, falling back to Groq')
      try {
        const fallback = await analyseWithGroq(text.trim())
        return NextResponse.json({ data: fallback, error: null })
      } catch (groqError) {
        console.error('[/api/analyse] Groq fallback also failed:', groqError)
        return NextResponse.json(
          { data: null, error: 'Analysis temporarily unavailable. Please try again in a moment.' },
          { status: 500 }
        )
      }
    }

    console.error('[/api/analyse] Gemini analysis failed:', error)
    return NextResponse.json(
      { data: null, error: 'Analysis unavailable. Please try again.' },
      { status: 500 }
    )
  }
}