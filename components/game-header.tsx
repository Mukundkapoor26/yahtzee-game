"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function GameHeader() {
  return (
    <div className="w-full mb-4 md:mb-8">
      <div className="bg-gradient-to-r from-emerald-900 to-emerald-800 rounded-lg shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-3 md:px-6 md:py-4 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-0">
          {/* Logo and Title */}
          <div className="mb-2 md:mb-0">
            <Link href="/" aria-label="Yahtzee Home">
              <h1 className="text-2xl md:text-3xl font-bold text-white tracking-wide cursor-pointer">YAHTZEE</h1>
            </Link>
          </div>

          {/* Navigation */}
          <div className="flex gap-2 md:gap-3">
            <Link href="/score-card" aria-label="View Yahtzee Score Card">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white border-none font-medium text-sm md:text-base px-3 py-1 md:px-4 md:py-2">
                Score Card
              </Button>
            </Link>
            <Link href="/rules" aria-label="View Yahtzee Rules">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white border-none font-medium text-sm md:text-base px-3 py-1 md:px-4 md:py-2">Rules</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
