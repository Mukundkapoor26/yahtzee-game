'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-4xl font-bold text-white mb-4">Something went wrong!</h1>
      <p className="text-xl text-white/80 mb-8">An unexpected error occurred.</p>
      <div className="flex gap-4">
        <button
          onClick={reset}
          className="px-6 py-3 bg-white text-emerald-800 font-semibold rounded-lg hover:bg-white/90 transition-colors"
        >
          Try again
        </button>
        <Link 
          href="/" 
          className="px-6 py-3 bg-transparent border border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
} 