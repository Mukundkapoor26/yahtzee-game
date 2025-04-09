import YahtzeeGame from "@/components/yahtzee-game"
import LandingPage from "@/components/landing-page"
import GameHeader from "@/components/game-header"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Play Yahtzee Online Free | Classic Dice Game | No Download",
  description:
    "Play Yahtzee online for free with no download required. Roll dice, score points, and challenge the computer in this classic dice game. Perfect for all ages!",
  keywords:
    "Yahtzee, free Yahtzee, play Yahtzee online, Yahtzee game, dice game, online dice game, free dice game, Yahtzee rules, Yahtzee score card",
  openGraph: {
    title: "Play Yahtzee Online Free | Classic Dice Game",
    description:
      "Play the classic Yahtzee dice game online for free with no download required. Challenge yourself or play against the computer!",
    type: "website",
    locale: "en_US",
    url: "https://yahtzee-game.vercel.app/",
  },
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-800 to-emerald-950 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-auto">
        <GameHeader />
        <YahtzeeGame />

        {/* Landing page content below the game */}
        <div className="mt-16">
          <LandingPage />
        </div>
      </div>
    </main>
  )
}
