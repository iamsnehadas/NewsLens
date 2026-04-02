import { GeminiAnalysisResponse } from '@/types/gemini'

const GEMINI_API_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent'

const SYSTEM_INSTRUCTION = `You are a critical reading assistant. You analyse news articles and return structured observations to help readers think carefully before sharing. You do not determine whether an article is true or false. You identify signals and ask useful questions. You always respond in valid JSON only, with no preamble, no markdown, and no conversational text.`

function buildPrompt(articleText: string): string {
  return `Analyse the following news article. Return a JSON object with exactly these fields:

  (1) credibilitySignals — an array of objects each with: label (string), severity ('green'/'amber'/'red'), and explanation (string under 60 words).

  For credibilitySignals, only flag things that genuinely matter to a critical reader. Green signals should highlight good journalistic practice worth noting. Amber and red signals should only appear for real concerns : vague sourcing without any named sources, emotionally loaded or fear-based language, headline that clearly misrepresents the article body, or a single perspective presented as fact with no acknowledgement of other views. Do NOT flag easily verifiable factual claims if they are true. Be selective. 3 to 5 signals total is ideal. More is not better. 

  (2) crossReferenceKeywords — a string of 2 to 4 keywords representing the core topic, suitable for a news search query.

  (3) criticalSummary — an object with: coreClaim (string, one short paragraph), omissions (array of strings, 2 to 4 items), questionsToAsk (array of strings, 2 to 3 items).

  Article text: ${articleText}`
}

function stripMarkdownFences(text: string): string {
  return text.replace(/^```(?:json)?\n?/i, '').replace(/\n?```$/i, '').trim()
}

function validateGeminiResponse(parsed: unknown): parsed is GeminiAnalysisResponse {
  if (typeof parsed !== 'object' || parsed === null) return false

  const obj = parsed as Record<string, unknown>

  if (!Array.isArray(obj.credibilitySignals)) return false
  if (typeof obj.crossReferenceKeywords !== 'string') return false
  if (typeof obj.criticalSummary !== 'object' || obj.criticalSummary === null) return false

  const summary = obj.criticalSummary as Record<string, unknown>
  if (typeof summary.coreClaim !== 'string') return false
  if (!Array.isArray(summary.omissions)) return false
  if (!Array.isArray(summary.questionsToAsk)) return false

  return true
}

export async function analyseArticle(articleText: string): Promise<GeminiAnalysisResponse> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 30000)

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
        contents: [{ parts: [{ text: buildPrompt(articleText) }] }],
        generationConfig: { responseMimeType: 'application/json' },
      }),
    })

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`)
    }

    const json = await response.json()
    const rawText: string = json.candidates?.[0]?.content?.parts?.[0]?.text ?? ''

    if (!rawText) {
      throw new Error('Gemini returned an empty response')
    }

    const cleaned = stripMarkdownFences(rawText)

    let parsed: unknown
    try {
      parsed = JSON.parse(cleaned)
    } catch {
      throw new Error('Gemini response could not be parsed as JSON')
    }

    if (!validateGeminiResponse(parsed)) {
      throw new Error('Gemini response is missing required fields')
    }

    return parsed
  } finally {
    clearTimeout(timeout)
  }
}