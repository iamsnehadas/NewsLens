export interface CredibilitySignal {
  label: string
  severity: 'green' | 'amber' | 'red'
  explanation: string
}

export interface CriticalSummary {
  coreClaim: string
  omissions: string[]
  questionsToAsk: string[]
}

export interface GeminiAnalysisResponse {
  credibilitySignals: CredibilitySignal[]
  crossReferenceKeywords: string
  criticalSummary: CriticalSummary
}