import Link from "next/link"
export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-12">

        <div className="mb-8">
          <Link href="/"
            className="text-xs text-gray-400 hover:text-gray-600 transition-colors mb-4 inline-block"
          >
            ← Back
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">About News Lens</h1>
        </div>

        <div className="space-y-6 text-sm text-gray-700 leading-relaxed">

          <div>
            <h2 className="text-base font-semibold text-gray-900 mb-2">What it is</h2>
            <p>
              News Lens is a reading companion that adds a layer of critical context to news articles.
              Most people encounter news in a feed, skim a headline, and share or form an opinion in
              under thirty seconds. This tool sits at that moment — helping you slow down and ask
              better questions before you act on what you read.
            </p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-gray-900 mb-2">What it is not</h2>
            <p>
              News Lens does not determine whether an article is true or false. That is not a problem
              software can reliably solve. It is not a political bias detector, and it does not tell
              you what to think. It surfaces signals — emotional language, missing sources, one-sided
              framing — and lets you decide what to do with them.
            </p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-gray-900 mb-2">How it works</h2>
            <p>
              Article text is sent to the Gemini 2.5 Flash API, which returns structured observations
              across three areas: credibility signals, a critical summary, and keywords used to
              cross-reference other sources via NewsAPI. All API calls happen server-side. No article
              text is stored. No account is required.
            </p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-gray-900 mb-2">Known limitations</h2>
            <p>
              URL text extraction is unreliable — many news sites block it. If a URL does not work,
              paste the article text directly. Analysis quality varies on short articles and opinion
              pieces. Results are not saved — every page reload starts fresh.
            </p>
          </div>

          <div className="pt-4 border-t border-gray-200 text-xs text-gray-400">
            Built with Next.js, Gemini 2.5 Flash, and NewsAPI. No personal data stored.
          </div>

        </div>
      </div>
    </main>
  )
}