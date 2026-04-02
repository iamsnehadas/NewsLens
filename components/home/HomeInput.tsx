'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'

export default function HomeInput() {
  const [input, setInput] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleAnalyse() {
    setError('')

    if (input.trim().length < 100) {
      setError('Please paste more content — minimum 100 characters.')
      return
    }

    setLoading(true)

    try {
      const params = new URLSearchParams({ text: input.trim() })
      router.push(`/analyse?${params.toString()}`)
    } catch {
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="space-y-3">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste the article text here to analyse it..."
        rows={6}
        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none"
      />
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      <Button onClick={handleAnalyse} disabled={loading} fullWidth>
        {loading ? 'Analysing...' : 'Analyse'}
      </Button>
    </div>
  )
}