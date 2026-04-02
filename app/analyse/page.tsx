'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { GeminiAnalysisResponse } from '@/types/gemini'
import { NewsArticle, ApiResponse } from '@/types/api'
import CredibilitySignals from '@/components/analysis/CredibilitySignals'
import CrossReference from '@/components/analysis/CrossReference'
import CriticalSummary from '@/components/analysis/CriticalSummary'
import Loader from '@/components/ui/Loader'
import ErrorMessage from '@/components/ui/ErrorMessage'
import Card from '@/components/ui/Card'
import Link from 'next/link'

export default function AnalysePage() {
  const searchParams = useSearchParams()

  const [analysis, setAnalysis] = useState<GeminiAnalysisResponse | null>(null)
  const [crossRef, setCrossRef] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const text = searchParams.get('text')

    if (!text) {
      setError('No article text provided. Please go back and paste an article.')
      setLoading(false)
      return
    }

    async function run() {
      try {
        const analyseRes = await fetch('/api/analyse', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text }),
        })

        const analyseJson: ApiResponse<GeminiAnalysisResponse> = await analyseRes.json()

        if (analyseJson.error || !analyseJson.data) {
          setError(analyseJson.error ?? 'Analysis failed. Please try again.')
          setLoading(false)
          return
        }

        setAnalysis(analyseJson.data)

        const crossRes = await fetch('/api/crossreference', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ keywords: analyseJson.data.crossReferenceKeywords }),
        })

        const crossJson: ApiResponse<NewsArticle[]> = await crossRes.json()
        if (!crossJson.error && crossJson.data) {
          setCrossRef(crossJson.data)
        }

      } catch {
        setError('Something went wrong. Please go back and try again.')
      } finally {
        setLoading(false)
      }
    }

    run()
  }, [searchParams])

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-12">

        <div className="mb-8">
          
           <Link href="/"
            className="text-xs text-gray-400 hover:text-gray-600 transition-colors mb-4 inline-block"
          >
            ← Back
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Analysis</h1>
          <p className="text-sm text-gray-500 mt-1">
            Signals and context to help you read more carefully.
          </p>
        </div>

        {loading && (
          <div className="space-y-4">
            <Card><Loader /></Card>
            <Card><Loader /></Card>
            <Card><Loader /></Card>
          </div>
        )}

        {!loading && error && (
          <ErrorMessage message={error} />
        )}

        {!loading && !error && analysis && (
          <div className="space-y-4">
            <CredibilitySignals signals={analysis.credibilitySignals} />
            <CrossReference articles={crossRef} />
            <CriticalSummary summary={analysis.criticalSummary} />
          </div>
        )}

      </div>
    </main>
  )
}