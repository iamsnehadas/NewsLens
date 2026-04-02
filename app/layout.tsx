import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'News Lens',
  description: 'AI-powered news analysis and source intelligence.',
  icons: {
    icon: '/Logo.png',
    apple: '/Logo.png'
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 antialiased">
        <nav className="border-b border-gray-200 bg-white sticky top-0 z-10 h-20">
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/Logo.png"
                alt="News Lens"
                width={200}
                height={100}
                className="h-15 w-auto"
              />
            </Link>
            <div className="flex items-center gap-6">
              <Link href="/about" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                About
              </Link>
              <Link href="https://github.com/iamsnehadas/NewsLens"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >
                GitHub
              </Link>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}