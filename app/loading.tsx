export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative w-24 h-24">
        <div className="absolute top-0 left-0 w-full h-full border-8 border-white/20 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-8 border-transparent border-t-white rounded-full animate-spin"></div>
      </div>
    </div>
  )
} 