import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-4xl font-bold text-white mb-4">404 - Page Not Found</h1>
      <p className="text-xl text-white/80 mb-8">The page you're looking for doesn't exist.</p>
      <Link 
        href="/" 
        className="px-6 py-3 bg-white text-emerald-800 font-semibold rounded-lg hover:bg-white/90 transition-colors"
      >
        Return Home
      </Link>
    </div>
  )
} 