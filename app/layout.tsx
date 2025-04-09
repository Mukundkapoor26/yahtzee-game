import type { Metadata, Viewport } from 'next'
import './globals.css'

// JSON-LD structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Yahtzee Online",
  "description": "Play the classic Yahtzee dice game online for free. Roll dice, score combinations, and compete against the computer.",
  "url": "https://freeyahtzeegame.com",
  "image": "https://freeyahtzeegame.com/og-image.jpg",
  "author": {
    "@type": "Person",
    "name": "Free Yahtzee Game"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Free Yahtzee Game",
    "logo": {
      "@type": "ImageObject",
      "url": "https://freeyahtzeegame.com/icon-512x512.png"
    }
  },
  "genre": "Dice Game",
  "gamePlatform": "Web Browser",
  "operatingSystem": "Any",
  "applicationCategory": "Game",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  }
}

export const metadata: Metadata = {
  metadataBase: new URL('https://freeyahtzeegame.com'),
  title: 'Yahtzee Game - Play Classic Dice Game Online',
  description: 'Play the classic Yahtzee dice game online for free. Roll dice, score combinations, and compete against the computer. A modern web version of the beloved family dice game.',
  keywords: 'yahtzee, dice game, online game, board game, family game, multiplayer game, browser game, free game',
  authors: [{ name: 'Free Yahtzee Game' }],
  creator: 'Free Yahtzee Game',
  publisher: 'Free Yahtzee Game',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: 'Yahtzee Game - Play Classic Dice Game Online',
    description: 'Play the classic Yahtzee dice game online for free. Roll dice, score combinations, and compete against the computer.',
    url: 'https://freeyahtzeegame.com',
    siteName: 'Yahtzee Online',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Yahtzee Game Screenshot',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yahtzee Game - Play Classic Dice Game Online',
    description: 'Play the classic Yahtzee dice game online for free. Roll dice, score combinations, and compete against the computer.',
    images: ['/twitter-image.jpg'],
    creator: '@freeyahtzeegame',
  },
  category: 'game',
}

// Separate viewport export
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#065f46',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-gradient-to-b from-emerald-800 to-emerald-950">
        {children}
      </body>
    </html>
  )
}
