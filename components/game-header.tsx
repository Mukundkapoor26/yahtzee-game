"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function GameHeader() {
  return (
    <div className="w-full mb-8">
      <div className="bg-gradient-to-r from-emerald-900 to-emerald-800 rounded-lg shadow-lg">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo and Title */}
          <div>
            <Link href="/" aria-label="Yahtzee Home">
              <h1 className="text-3xl font-bold text-white tracking-wide cursor-pointer">YAHTZEE</h1>
            </Link>
          </div>

          {/* Navigation */}
          <div className="flex gap-3">
            <Link href="/score-card" aria-label="View Yahtzee Score Card">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white border-none font-medium">
                Score Card
              </Button>
            </Link>
            <Link href="/rules" aria-label="View Yahtzee Rules">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white border-none font-medium">Rules</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
