import { NextRequest, NextResponse } from 'next/server'
import { ApiResponse } from '@/types/api'

export async function GET(request: NextRequest): Promise<NextResponse<ApiResponse<string>>> {
  const url = request.nextUrl.searchParams.get('url')

  if (!url) {
    return NextResponse.json({ data: null, error: 'Missing url parameter.' }, { status: 400 })
  }

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 10000)

    let response: Response
    try {
      response = await fetch(url, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        },
      })
    } finally {
      clearTimeout(timeout)
    }

    if (!response.ok) {
      return NextResponse.json(
        { data: null, error: 'Could not fetch the article. Please paste the text directly.' },
        { status: 422 }
      )
    }

    const html = await response.text()
    const text = extractTextFromHtml(html)

    if (!text || text.length < 100) {
      return NextResponse.json(
        { data: null, error: 'Could not extract enough text from that URL. Please paste the text directly.' },
        { status: 422 }
      )
    }

    return NextResponse.json({ data: text, error: null })

  } catch (error) {
    console.error('[/api/extract] Failed to extract article:', error)
    return NextResponse.json(
      { data: null, error: 'Could not fetch the article. Please paste the text directly.' },
      { status: 500 }
    )
  }
}

function extractTextFromHtml(html: string): string {
  // Remove script and style blocks entirely
  let cleaned = html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, '')
    .replace(/<header[^>]*>[\s\S]*?<\/header>/gi, '')
    .replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, '')

  // Strip remaining tags
  cleaned = cleaned.replace(/<[^>]+>/g, ' ')

  // Decode common HTML entities
  cleaned = cleaned
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')

  // Collapse whitespace
  cleaned = cleaned.replace(/\s+/g, ' ').trim()

  // Return first 8000 chars max
  return cleaned.slice(0, 8000)
}