import { Button } from "@/components/ui/button"
import Link from "next/link"
import GameHeader from "@/components/game-header"
import { ArrowLeft } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Yahtzee Rules | How to Play Yahtzee | Official Game Rules",
  description:
    "Learn the official Yahtzee rules, scoring system, and winning strategies. Complete guide on how to play Yahtzee with detailed examples and expert tips.",
  keywords:
    "Yahtzee rules, how to play Yahtzee, Yahtzee instructions, Yahtzee scoring, Yahtzee strategy, Yahtzee game rules, Yahtzee dice game, Yahtzee combinations",
  openGraph: {
    title: "Official Yahtzee Rules | How to Play Yahtzee",
    description:
      "Learn how to play Yahtzee with our comprehensive rules guide. Includes scoring system, strategies, and expert tips for winning.",
    type: "website",
    locale: "en_US",
    url: "https://yahtzee-game.vercel.app/rules",
  },
}

export default function RulesPage() {
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
          <h1 className="text-4xl font-bold text-center text-white drop-shadow-lg">RULES</h1>
          <div className="w-[100px]"></div> {/* Spacer for centering */}
        </div>

        {/* Hero section */}
        <div className="bg-emerald-800/50 rounded-xl p-8 mb-8">
          <h2 className="text-3xl font-bold mb-4 text-yellow-300">The Official Rules of Yahtzee</h2>
          <p className="text-xl">
            Yahtzee is a classic dice game that combines luck and strategy. The objective is to score points by rolling
            five dice to make certain combinations. The game is played over 13 rounds, and the player with the highest
            total score wins.
          </p>
        </div>

        {/* Game Overview */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 border-b border-emerald-600 pb-2">Game Overview</h2>
          <div className="bg-emerald-800/30 p-6 rounded-lg">
            <p className="mb-4">
              <strong>Players:</strong> 1 or more players
            </p>
            <p className="mb-4">
              <strong>Equipment:</strong> Five six-sided dice, Yahtzee score card
            </p>
            <p className="mb-4">
              <strong>Objective:</strong> Score the most points by rolling dice combinations that match scoring
              categories
            </p>
            <p>
              <strong>Game Length:</strong> 13 rounds (one for each scoring category)
            </p>
          </div>
        </section>

        {/* How to Play */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 border-b border-emerald-600 pb-2">How to Play</h2>
          <div className="bg-emerald-800/30 p-6 rounded-lg">
            <ol className="space-y-4 list-decimal pl-5">
              <li>
                <strong>Roll the Dice:</strong> On your turn, roll all five dice.
              </li>
              <li>
                <strong>Evaluate and Keep:</strong> After rolling, you may set aside any dice you want to keep and
                reroll the others. You can keep different dice on each roll.
              </li>
              <li>
                <strong>Second Roll:</strong> Roll the dice you didn't keep. After this roll, you again decide which
                dice to keep.
              </li>
              <li>
                <strong>Final Roll:</strong> Roll the dice you didn't keep from the second roll. You now have your final
                dice combination.
              </li>
              <li>
                <strong>Score:</strong> Choose one of the 13 scoring categories to record your score. Each category can
                only be used once per game.
              </li>
              <li>
                <strong>Next Turn:</strong> The next player takes their turn, or you continue if playing solo.
              </li>
              <li>
                <strong>Game End:</strong> The game ends when all 13 categories have been filled on each player's score
                card.
              </li>
            </ol>
          </div>
        </section>

        {/* Scoring Categories */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 border-b border-emerald-600 pb-2">Scoring Categories</h2>

          <h3 className="text-xl font-bold mt-6 mb-3 text-emerald-300">Upper Section</h3>
          <div className="bg-emerald-800/30 p-6 rounded-lg mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-bold mb-2">Ones</h4>
                <p className="mb-1">Sum of all dice showing 1</p>
                <p className="text-sm text-emerald-400">Example: 1,1,3,4,5 scores 2 points</p>
              </div>
              <div>
                <h4 className="font-bold mb-2">Twos</h4>
                <p className="mb-1">Sum of all dice showing 2</p>
                <p className="text-sm text-emerald-400">Example: 2,2,3,4,6 scores 4 points</p>
              </div>
              <div>
                <h4 className="font-bold mb-2">Threes</h4>
                <p className="mb-1">Sum of all dice showing 3</p>
                <p className="text-sm text-emerald-400">Example: 1,3,3,5,6 scores 6 points</p>
              </div>
              <div>
                <h4 className="font-bold mb-2">Fours</h4>
                <p className="mb-1">Sum of all dice showing 4</p>
                <p className="text-sm text-emerald-400">Example: 2,4,4,4,5 scores 12 points</p>
              </div>
              <div>
                <h4 className="font-bold mb-2">Fives</h4>
                <p className="mb-1">Sum of all dice showing 5</p>
                <p className="text-sm text-emerald-400">Example: 1,3,5,5,6 scores 10 points</p>
              </div>
              <div>
                <h4 className="font-bold mb-2">Sixes</h4>
                <p className="mb-1">Sum of all dice showing 6</p>
                <p className="text-sm text-emerald-400">Example: 2,4,6,6,6 scores 18 points</p>
              </div>
            </div>
            <div className="mt-4 p-3 bg-yellow-900/30 rounded-lg border border-yellow-600/30">
              <h4 className="font-bold text-yellow-300">Upper Section Bonus</h4>
              <p>If your total score in the upper section is 63 or more, you get a bonus of 35 points</p>
              <p className="text-sm text-yellow-400 mt-1">
                Note: 63 points is equivalent to scoring three of each number (3×1 + 3×2 + 3×3 + 3×4 + 3×5 + 3×6 = 63)
              </p>
            </div>
          </div>

          <h3 className="text-xl font-bold mt-6 mb-3 text-emerald-300">Lower Section</h3>
          <div className="bg-emerald-800/30 p-6 rounded-lg">
            <div className="space-y-4">
              <div>
                <h4 className="font-bold mb-2">Three of a Kind</h4>
                <p className="mb-1">At least three dice showing the same number</p>
                <p className="text-sm text-emerald-400">Score: Sum of all dice</p>
                <p className="text-sm text-emerald-400">Example: 3,3,3,4,5 scores 18 points (3+3+3+4+5)</p>
              </div>

              <div>
                <h4 className="font-bold mb-2">Four of a Kind</h4>
                <p className="mb-1">At least four dice showing the same number</p>
                <p className="text-sm text-emerald-400">Score: Sum of all dice</p>
                <p className="text-sm text-emerald-400">Example: 2,2,2,2,5 scores 13 points (2+2+2+2+5)</p>
              </div>

              <div>
                <h4 className="font-bold mb-2">Full House</h4>
                <p className="mb-1">Three of one number and two of another</p>
                <p className="text-sm text-emerald-400">Score: 25 points</p>
                <p className="text-sm text-emerald-400">Example: 3,3,3,5,5 scores 25 points</p>
              </div>

              <div>
                <h4 className="font-bold mb-2">Small Straight</h4>
                <p className="mb-1">Four sequential dice (1-2-3-4, 2-3-4-5, or 3-4-5-6)</p>
                <p className="text-sm text-emerald-400">Score: 30 points</p>
                <p className="text-sm text-emerald-400">Example: 1,2,3,4,6 scores 30 points</p>
              </div>

              <div>
                <h4 className="font-bold mb-2">Large Straight</h4>
                <p className="mb-1">Five sequential dice (1-2-3-4-5 or 2-3-4-5-6)</p>
                <p className="text-sm text-emerald-400">Score: 40 points</p>
                <p className="text-sm text-emerald-400">Example: 1,2,3,4,5 scores 40 points</p>
              </div>

              <div>
                <h4 className="font-bold mb-2">Chance</h4>
                <p className="mb-1">Any combination of dice</p>
                <p className="text-sm text-emerald-400">Score: Sum of all dice</p>
                <p className="text-sm text-emerald-400">Example: 2,3,4,5,6 scores 20 points (2+3+4+5+6)</p>
              </div>

              <div className="p-3 bg-yellow-900/30 rounded-lg border border-yellow-600/30">
                <h4 className="font-bold text-yellow-300">YAHTZEE</h4>
                <p className="mb-1">Five of a kind (all five dice showing the same number)</p>
                <p className="text-sm text-yellow-400">Score: 50 points</p>
                <p className="text-sm text-yellow-400">Example: 4,4,4,4,4 scores 50 points</p>
              </div>

              <div className="p-3 bg-red-900/30 rounded-lg border border-red-600/30">
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

        {/* Strategy Tips */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 border-b border-emerald-600 pb-2">Strategy Tips</h2>
          <div className="bg-emerald-800/30 p-6 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-bold mb-3 text-emerald-300">Upper Section Strategy</h3>
                <ul className="space-y-2 list-disc pl-5">
                  <li>Aim for at least three of each number to reach the 63-point threshold for the bonus</li>
                  <li>Prioritize higher numbers (fours, fives, sixes) when possible</li>
                  <li>If you're unlikely to get the bonus, consider sacrificing lower numbers</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-3 text-emerald-300">Advanced Tips</h3>
                <ul className="space-y-2 list-disc pl-5">
                  <li>Early in the game, focus on the upper section to secure your bonus</li>
                  <li>If you roll a Yahtzee early, try to get additional Yahtzees for the 100-point bonuses</li>
                  <li>Sometimes it's better to take a zero in a low-value category than to waste a good roll</li>
                  <li>Keep track of which categories you've filled to plan your strategy for remaining rolls</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Joker Rules */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 border-b border-emerald-600 pb-2">Special Rules</h2>
          <div className="bg-emerald-800/30 p-6 rounded-lg">
            <h3 className="text-lg font-bold mb-3 text-emerald-300">Joker Rules</h3>
            <p className="mb-4">
              If you roll a Yahtzee but have already filled the Yahtzee category, special rules apply:
            </p>
            <ul className="space-y-2 list-disc pl-5">
              <li>If you scored 50 in the Yahtzee category, you get a 100-point Yahtzee bonus</li>
              <li>
                You can use this Yahtzee as a "joker" in the lower section, meaning you can place it in any lower
                section category
              </li>
              <li>If the corresponding upper section category is still open, you must use it there</li>
            </ul>
          </div>
        </section>

        {/* Call to Action */}
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">Ready to Play Yahtzee?</h2>
          <p className="mb-6">Now that you know the rules, it's time to put your skills to the test!</p>
          <Link href="/#yahtzee-game" aria-label="Play Yahtzee now">
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-6 py-3 rounded-lg">
              Play Yahtzee Now
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
