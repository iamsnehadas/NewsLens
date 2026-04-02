# News Lens

AI-powered news analysis and source intelligence.

**Live:** [news-lens-delta.vercel.app](https://news-lens-delta.vercel.app) &nbsp;|&nbsp; **Stack:** Next.js 16 · TypeScript · Tailwind CSS · Gemini 2.5 Flash · NewsAPI

---

## What it does

News Lens is a reading companion that adds a layer of critical context to news articles. Paste any article text and get three structured outputs:

- **Credibility Signals** : flags emotional language, vague sourcing, headline-body mismatches, and one-sided framing. Green signals highlight good journalistic practice. Amber and red flag areas worth scrutinising.
- **Source Cross-Reference** : extracts the core topic and searches NewsAPI for other outlets covering the same story, showing how widely a claim is being reported.
- **Critical Summary** : plain-language breakdown of what the article is actually claiming, what it leaves out, and questions worth asking before sharing.

What it is not: a fact-checker, a bias detector, or a replacement for reading the article. It is a supplement to it.

---

## Tech

| Layer | Choice |
|---|---|
| Frontend | Next.js 16 App Router, TypeScript |
| Styling | Tailwind CSS v4 |
| AI | Gemini 2.5 Flash via Google AI Studio |
| News Data | NewsAPI.org |
| Deployment | Vercel |

All API calls to Gemini and NewsAPI are made server-side via Next.js API routes. API keys are never exposed to the client.

---

## Running locally

**Prerequisites:** Node.js 18+, a [Google AI Studio](https://aistudio.google.com) API key, a [NewsAPI](https://newsapi.org) key.
```bash
git clone https://github.com/iamsnehadas/NewsLens.git
cd NewsLens
npm install
```

Create a `.env.local` file in the project root:
```
GEMINI_API_KEY=your_gemini_key_here
NEWSAPI_KEY=your_newsapi_key_here
```
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project structure
```
/app/api/          → headlines, analyse, crossreference route handlers
/app/analyse/      → analysis page
/app/about/        → about page
/components/ui/    → Button, Card, Loader, ErrorMessage
/components/home/  → HomeInput, HeadlineCard, HeadlinesGrid
/components/analysis/ → CredibilitySignals, CrossReference, CriticalSummary
/lib/              → gemini.ts, newsapi.ts, utils.ts
/types/            → api.ts, gemini.ts
```

---

## Known limitations

- **URL extraction is not supported.** Many news sites block server-side scraping. Paste the article text directly, this is the intended flow.
- **NewsAPI free tier is development-only** by their terms of service. Sufficient for portfolio demonstration.
- **No persistent storage.** Analysis results are not saved. Every session starts fresh, a deliberate choice to avoid data handling concerns.
- **Gemini analysis quality varies** on short articles and opinion pieces.

---

## Prompt engineering

The Gemini prompt is structured to return strict JSON only. No markdown, no preamble. The response is stripped of any markdown fences, parsed, and shape-validated before it reaches the UI. If any required field is missing, the route returns a structured error rather than crashing.

The prompt instructs the model to be selective : 2 to 5 credibility signals is the target. It explicitly avoids flagging easily verifiable factual claims or routine journalistic language, which would make the tool feel paranoid rather than useful.

---

## License

MIT