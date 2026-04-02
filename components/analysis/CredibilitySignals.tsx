import { CredibilitySignal } from '@/types/gemini'
import Card from '@/components/ui/Card'

interface Props {
  signals: CredibilitySignal[]
}

const severityStyles = {
  green: {
    tag: 'bg-green-100 text-green-800',
    dot: 'bg-green-500',
  },
  amber: {
    tag: 'bg-amber-100 text-amber-800',
    dot: 'bg-amber-500',
  },
  red: {
    tag: 'bg-red-100 text-red-800',
    dot: 'bg-red-500',
  },
}

export default function CredibilitySignals({ signals }: Props) {
  return (
    <Card>
      <h2 className="text-base font-semibold text-gray-900 mb-1">Credibility Signals</h2>
      <p className="text-xs text-gray-500 mb-4">
        Green signals indicate good practice. Amber and red flag areas worth scrutinising.
      </p>
      <div className="space-y-4">
        {signals.map((signal, index) => {
          const styles = severityStyles[signal.severity]
          return (
            <div key={index} className="space-y-1">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full shrink-0 ${styles.dot}`} />
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${styles.tag}`}>
                  {signal.label}
                </span>
              </div>
              <p className="text-sm text-gray-600 pl-4">{signal.explanation}</p>
            </div>
          )
        })}
      </div>
    </Card>
  )
}