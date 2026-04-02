import { CriticalSummary as CriticalSummaryType } from '@/types/gemini'
import Card from '@/components/ui/Card'

interface Props {
  summary: CriticalSummaryType
}

export default function CriticalSummary({ summary }: Props) {
  return (
    <Card>
      <h2 className="text-base font-semibold text-gray-900 mb-1">Critical Summary</h2>
      <p className="text-xs text-gray-500 mb-4">
        What the article claims, what it leaves out, and what to ask before sharing.
      </p>

      <div className="space-y-5">
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1.5">
            What it&apos;s claiming
          </h3>
          <p className="text-sm text-gray-700">{summary.coreClaim}</p>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1.5">
            What it&apos;s not addressing
          </h3>
          <ul className="space-y-1.5">
            {summary.omissions.map((item, index) => (
              <li key={index} className="flex gap-2 text-sm text-gray-700">
                <span className="text-gray-400 shrink-0">·</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1.5">
            Questions worth asking before sharing
          </h3>
          <ul className="space-y-1.5">
            {summary.questionsToAsk.map((question, index) => (
              <li key={index} className="flex gap-2 text-sm text-gray-700">
                <span className="text-gray-400 shrink-0">{index + 1}.</span>
                <span>{question}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  )
}