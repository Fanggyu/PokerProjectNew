import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Poker Dream Winning Secret',
  description: 'Poker Dream Winning Secret',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full">{children}</body>
    </html>
  )
}
