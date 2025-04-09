import Link from "next/link"
import { Button } from "@/components/ui/button"
import GameHeader from "@/components/game-header"
import { Download, ArrowLeft } from "lucide-react"
import Image from "next/image"
import type { Metadata } from "next"

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Yahtzee Score Card | Free Printable Yahtzee Score Sheet",
  description:
    "Download a free printable Yahtzee score card PDF. Learn how to keep score in Yahtzee with our detailed scoring guide and downloadable score sheet template.",
  keywords:
    "Yahtzee score card, Yahtzee score sheet, printable Yahtzee score card, Yahtzee scoring, how to score Yahtzee, Yahtzee PDF, Yahtzee rules, Yahtzee game sheet",
  openGraph: {
    title: "Free Printable Yahtzee Score Card | Download PDF",
    description:
      "Get your free printable Yahtzee score card. Learn how to score in Yahtzee with our detailed guide and downloadable PDF template.",
    type: "website",
    locale: "en_US",
    url: "https://yahtzee-game.vercel.app/score-card",
  },
}

export default function ScoreCardPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-800 to-emerald-950 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto text-white">
        <GameHeader />

        <div className="mb-8 flex items-center justify-between">
          <Link href="/" aria-label="Back to Yahtzee game">
            <Button variant="secondary" className="bg-white/20 hover:bg-white/40 text-white border-white/40">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Game
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-center text-white drop-shadow-lg">SCORE CARD</h1>
          <div className="w-[100px]"></div> {/* Spacer for centering */}
        </div>

        {/* Hero section */}
        <div className="bg-emerald-800/50 rounded-xl p-8 mb-8">
          <h2 className="text-3xl font-bold mb-4 text-yellow-300">Yahtzee Score Card</h2>
          <p className="text-xl">
            The Yahtzee score card is essential for tracking your progress and calculating your final score. Download
            our free printable score card to enjoy Yahtzee with friends and family offline.
          </p>
          <div className="mt-6 flex justify-center">
            <a
              href="/yahtzee-score-card.pdf"
              download="yahtzee-score-card.pdf"
              aria-label="Download Yahtzee score card PDF"
            >
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-6 py-3 rounded-lg flex items-center">
                <Download className="w-5 h-5 mr-2" />
                Download Yahtzee Score Card
              </Button>
            </a>
          </div>
        </div>

        {/* PDF Viewer */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 border-b border-emerald-600 pb-2">Preview Score Card</h2>
          <div className="bg-white rounded-lg p-4 shadow-lg">
            <div className="w-full">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/my%20screenshots%202025-04-09%20at%208.31.59%E2%80%AFAM-C1ErMINjHacb0TOL6EKjMzRehB6Ss0.png"
                alt="Yahtzee Score Card with columns for player name, upper section (ones through sixes), lower section (three of a kind through chance), and Yahtzee bonus"
                width={1200}
                height={800}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </section>

        {/* Score Card Explanation */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 border-b border-emerald-600 pb-2">
            Understanding the Yahtzee Score Card
          </h2>
          <div className="bg-emerald-800/30 p-6 rounded-lg">
            <p className="mb-4">
              The Yahtzee score card is divided into two main sections: the Upper Section and the Lower Section. Each
              section contains different scoring categories that you'll fill in during the game.
            </p>

            <h3 className="text-xl font-bold mt-6 mb-3 text-emerald-300">Upper Section</h3>
            <p className="mb-4">In the Upper Section, you score based on the total value of specific dice numbers:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-emerald-700/30 p-4 rounded-lg">
                <h4 className="font-bold mb-2">Aces (Ones)</h4>
                <p>Sum of all dice showing 1</p>
                <p className="text-sm text-emerald-400 mt-1">Example: 1,1,3,4,5 scores 2 points</p>
              </div>
              <div className="bg-emerald-700/30 p-4 rounded-lg">
                <h4 className="font-bold mb-2">Twos</h4>
                <p>Sum of all dice showing 2</p>
                <p className="text-sm text-emerald-400 mt-1">Example: 2,2,3,4,6 scores 4 points</p>
              </div>
              <div className="bg-emerald-700/30 p-4 rounded-lg">
                <h4 className="font-bold mb-2">Threes</h4>
                <p>Sum of all dice showing 3</p>
                <p className="text-sm text-emerald-400 mt-1">Example: 1,3,3,5,6 scores 6 points</p>
              </div>
              <div className="bg-emerald-700/30 p-4 rounded-lg">
                <h4 className="font-bold mb-2">Fours</h4>
                <p>Sum of all dice showing 4</p>
                <p className="text-sm text-emerald-400 mt-1">Example: 2,4,4,4,5 scores 12 points</p>
              </div>
              <div className="bg-emerald-700/30 p-4 rounded-lg">
                <h4 className="font-bold mb-2">Fives</h4>
                <p>Sum of all dice showing 5</p>
                <p className="text-sm text-emerald-400 mt-1">Example: 1,3,5,5,6 scores 10 points</p>
              </div>
              <div className="bg-emerald-700/30 p-4 rounded-lg">
                <h4 className="font-bold mb-2">Sixes</h4>
                <p>Sum of all dice showing 6</p>
                <p className="text-sm text-emerald-400 mt-1">Example: 2,4,6,6,6 scores 18 points</p>
              </div>
            </div>

            <div className="p-4 bg-yellow-900/30 rounded-lg border border-yellow-600/30 mb-6">
              <h4 className="font-bold text-yellow-300">Upper Section Bonus</h4>
              <p>If your total score in the upper section is 63 or more, you get a bonus of 35 points</p>
              <p className="text-sm text-yellow-400 mt-1">
                Note: 63 points is equivalent to scoring three of each number (3×1 + 3×2 + 3×3 + 3×4 + 3×5 + 3×6 = 63)
              </p>
            </div>

            <h3 className="text-xl font-bold mt-6 mb-3 text-emerald-300">Lower Section</h3>
            <p className="mb-4">In the Lower Section, you score based on specific dice combinations:</p>
            <div className="space-y-4 mb-6">
              <div className="bg-emerald-700/30 p-4 rounded-lg">
                <h4 className="font-bold mb-2">Three of a Kind</h4>
                <p>At least three dice showing the same number</p>
                <p className="text-sm text-emerald-400 mt-1">Score: Sum of all dice</p>
                <p className="text-sm text-emerald-400">Example: 3,3,3,4,5 scores 18 points (3+3+3+4+5)</p>
              </div>

              <div className="bg-emerald-700/30 p-4 rounded-lg">
                <h4 className="font-bold mb-2">Four of a Kind</h4>
                <p>At least four dice showing the same number</p>
                <p className="text-sm text-emerald-400 mt-1">Score: Sum of all dice</p>
                <p className="text-sm text-emerald-400">Example: 2,2,2,2,5 scores 13 points (2+2+2+2+5)</p>
              </div>

              <div className="bg-emerald-700/30 p-4 rounded-lg">
                <h4 className="font-bold mb-2">Full House</h4>
                <p>Three of one number and two of another</p>
                <p className="text-sm text-emerald-400 mt-1">Score: 25 points</p>
                <p className="text-sm text-emerald-400">Example: 3,3,3,5,5 scores 25 points</p>
              </div>

              <div className="bg-emerald-700/30 p-4 rounded-lg">
                <h4 className="font-bold mb-2">Small Straight</h4>
                <p>Four sequential dice (1-2-3-4, 2-3-4-5, or 3-4-5-6)</p>
                <p className="text-sm text-emerald-400 mt-1">Score: 30 points</p>
                <p className="text-sm text-emerald-400">Example: 1,2,3,4,6 scores 30 points</p>
              </div>

              <div className="bg-emerald-700/30 p-4 rounded-lg">
                <h4 className="font-bold mb-2">Large Straight</h4>
                <p>Five sequential dice (1-2-3-4-5 or 2-3-4-5-6)</p>
                <p className="text-sm text-emerald-400 mt-1">Score: 40 points</p>
                <p className="text-sm text-emerald-400">Example: 1,2,3,4,5 scores 40 points</p>
              </div>

              <div className="bg-emerald-700/30 p-4 rounded-lg">
                <h4 className="font-bold mb-2">Chance</h4>
                <p>Any combination of dice</p>
                <p className="text-sm text-emerald-400 mt-1">Score: Sum of all dice</p>
                <p className="text-sm text-emerald-400">Example: 2,3,4,5,6 scores 20 points (2+3+4+5+6)</p>
              </div>

              <div className="p-4 bg-yellow-900/30 rounded-lg border border-yellow-600/30">
                <h4 className="font-bold text-yellow-300">YAHTZEE</h4>
                <p className="mb-1">Five of a kind (all five dice showing the same number)</p>
                <p className="text-sm text-yellow-400">Score: 50 points</p>
                <p className="text-sm text-yellow-400">Example: 4,4,4,4,4 scores 50 points</p>
              </div>

              <div className="p-4 bg-red-900/30 rounded-lg border border-red-600/30">
                <h4 className="font-bold text-red-300">Yahtzee Bonus</h4>
                <p className="mb-1">If you roll additional Yahtzees after scoring 50 in the Yahtzee category</p>
                <p className="text-sm text-red-400">Score: 100 points bonus for each additional Yahtzee</p>
                <p className="text-sm text-red-400">
                  Note: If your first Yahtzee was scored as 0, you do not get a Yahtzee bonus
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Download Section */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-emerald-900 to-emerald-800 rounded-xl p-8 border border-emerald-700 text-center">
            <h2 className="text-3xl font-bold mb-4">Download Your Free Yahtzee Score Card</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">Print as many copies as you need for your next game night!</p>

            <a
              href="/yahtzee-score-card.pdf"
              download="yahtzee-score-card.pdf"
              aria-label="Download Yahtzee score card PDF"
            >
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-6 rounded-lg text-xl">
                <Download className="w-6 h-6 mr-2" />
                Download PDF Score Card
              </Button>
            </a>

            <p className="mt-4 text-sm text-emerald-300">
              PDF format • Printable on standard 8.5" x 11" paper • No registration required
            </p>
          </div>
        </section>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Link href="/" aria-label="Play Yahtzee online">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-lg">
              Play Yahtzee Online
            </Button>
          </Link>
          <Link href="/rules" aria-label="View Yahtzee rules">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-lg">
              View Yahtzee Rules
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
