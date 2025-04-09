"use client"

import { CheckCircle2, Dices, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"

// FAQ Accordion Component
const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-emerald-700/30 last:border-0">
      <button
        className="w-full text-left py-4 px-2 flex justify-between items-center focus:outline-none"
        onClick={onClick}
      >
        <h3 className="text-lg font-medium">{question}</h3>
        {isOpen ? <ChevronUp className="w-5 h-5 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 flex-shrink-0" />}
      </button>
      {isOpen && <div className="pb-4 px-2 text-emerald-100">{answer}</div>}
    </div>
  )
}

export default function LandingPage() {
  const scrollToGame = () => {
    document.getElementById("yahtzee-game")?.scrollIntoView({
      behavior: "smooth",
    })
  }

  // FAQ state
  const [openFAQ, setOpenFAQ] = useState(null)

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  // FAQ data
  const faqs = [
    {
      question: "How do you play Yahtzee?",
      answer: (
        <div>
          <p>Yahtzee is played with five dice and a scorecard. Here's how to play:</p>
          <ol className="list-decimal pl-5 mt-2 space-y-1">
            <li>Roll all five dice up to three times per turn.</li>
            <li>After each roll, you can set aside any dice you want to keep and roll the others.</li>
            <li>After your final roll, choose a category on your scorecard to record your score.</li>
            <li>Each category can only be used once per game.</li>
            <li>The game ends when all 13 categories are filled.</li>
            <li>The player with the highest total score wins!</li>
          </ol>
          <p className="mt-2">
            <Link href="/rules" className="text-emerald-300 hover:underline">
              See our detailed rules page for more information.
            </Link>
          </p>
        </div>
      ),
    },
    {
      question: "What does Yahtzee mean?",
      answer: (
        <p>
          "Yahtzee" refers to the highest-scoring combination in the game - when all five dice show the same number
          (five of a kind). When a player rolls this combination, they traditionally yell "YAHTZEE!" in celebration. The
          game was created by Milton Bradley (now Hasbro) in 1956 and the name has become synonymous with the excitement
          of rolling five matching dice.
        </p>
      ),
    },
    {
      question: "Is Yahtzee a game of skill?",
      answer: (
        <p>
          Yahtzee is a combination of luck and skill. While the dice rolls introduce an element of chance, strategic
          decision-making plays a significant role. Skilled players must decide which dice to keep, when to take risks,
          and which scoring categories to use at optimal times. Statistical analysis and probability assessment can
          greatly improve your performance, making Yahtzee a game where skill can overcome bad luck in the long run.
        </p>
      ),
    },
    {
      question: "Is Yahtzee just luck?",
      answer: (
        <p>
          No, Yahtzee is not just luck. While dice rolls introduce randomness, the game requires significant strategic
          thinking. Players must make decisions about which dice to keep, which to reroll, and which scoring categories
          to use when. Understanding probability, managing risk, and planning ahead are all important skills. A skilled
          player will consistently outperform a novice over multiple games, demonstrating that strategy and
          decision-making significantly impact outcomes.
        </p>
      ),
    },
    {
      question: "What does Yahtzee teach you?",
      answer: (
        <div>
          <p>Yahtzee teaches several valuable skills:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Probability and statistics - understanding the likelihood of different dice combinations</li>
            <li>Decision-making under uncertainty - choosing the best strategy with incomplete information</li>
            <li>Risk management - knowing when to play it safe vs. when to take chances</li>
            <li>Planning and foresight - thinking several moves ahead</li>
            <li>Mental math - quickly calculating potential scores</li>
            <li>Patience and adaptability - adjusting strategy based on how the dice fall</li>
          </ul>
          <p className="mt-2">
            These skills make Yahtzee not just entertaining but also educational for players of all ages.
          </p>
        </div>
      ),
    },
    {
      question: "Is Yahtzee a kids game?",
      answer: (
        <p>
          While Yahtzee is family-friendly and accessible to children (typically 8+), it's enjoyed by players of all
          ages. The game's combination of luck and strategy makes it engaging for both casual and serious players.
          Adults appreciate the deeper strategic elements and probability calculations, while children benefit from
          practicing math skills and decision-making. Yahtzee has endured for decades precisely because it offers
          different levels of engagement for different ages, making it a true multi-generational game rather than just a
          "kids game."
        </p>
      ),
    },
    {
      question: "How rare is a Yahtzee?",
      answer: (
        <p>
          A Yahtzee (five of a kind) is relatively rare. The probability of rolling a Yahtzee in a single roll is
          approximately 1 in 1,296 (or about 0.077%). However, since players get up to three rolls per turn and can keep
          dice between rolls, the chances of achieving a Yahtzee during a complete turn are much better - approximately
          1 in 22 (or about 4.6%). This rarity is why a Yahtzee is worth 50 points, making it one of the highest-scoring
          combinations in the game and a moment of excitement when achieved.
        </p>
      ),
    },
  ]

  return (
    <div className="w-full max-w-6xl mx-auto text-white">
      {/* Hero Section - with more visible dice */}
      <section className="relative overflow-hidden rounded-xl bg-emerald-900 p-8 mb-12">
        {/* Dice background with higher opacity and dots */}
        <div className="absolute inset-0">
          {/* Die 1 */}
          <div className="absolute top-[10%] left-[10%] w-24 h-24 bg-white opacity-30 rounded-lg transform rotate-12 flex items-center justify-center">
            <div className="w-5 h-5 bg-emerald-900 rounded-full"></div>
          </div>

          {/* Die 2 */}
          <div className="absolute top-[60%] left-[20%] w-24 h-24 bg-white opacity-30 rounded-lg transform -rotate-12">
            <div className="absolute top-1/4 left-1/4 w-5 h-5 bg-emerald-900 rounded-full"></div>
            <div className="absolute bottom-1/4 right-1/4 w-5 h-5 bg-emerald-900 rounded-full"></div>
          </div>

          {/* Die 3 */}
          <div className="absolute top-[15%] right-[15%] w-24 h-24 bg-white opacity-30 rounded-lg transform rotate-6">
            <div className="absolute top-1/4 left-1/4 w-5 h-5 bg-emerald-900 rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-emerald-900 rounded-full"></div>
            <div className="absolute bottom-1/4 right-1/4 w-5 h-5 bg-emerald-900 rounded-full"></div>
          </div>

          {/* Die 4 */}
          <div className="absolute top-[65%] right-[25%] w-24 h-24 bg-white opacity-30 rounded-lg transform -rotate-6">
            <div className="absolute top-1/4 left-1/4 w-5 h-5 bg-emerald-900 rounded-full"></div>
            <div className="absolute top-1/4 right-1/4 w-5 h-5 bg-emerald-900 rounded-full"></div>
            <div className="absolute bottom-1/4 left-1/4 w-5 h-5 bg-emerald-900 rounded-full"></div>
            <div className="absolute bottom-1/4 right-1/4 w-5 h-5 bg-emerald-900 rounded-full"></div>
          </div>

          {/* Die 5 */}
          <div className="absolute top-[40%] left-[40%] w-32 h-32 bg-white opacity-25 rounded-lg transform rotate-45">
            <div className="absolute top-1/4 left-1/4 w-6 h-6 bg-emerald-900 rounded-full"></div>
            <div className="absolute top-1/4 right-1/4 w-6 h-6 bg-emerald-900 rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-emerald-900 rounded-full"></div>
            <div className="absolute bottom-1/4 left-1/4 w-6 h-6 bg-emerald-900 rounded-full"></div>
            <div className="absolute bottom-1/4 right-1/4 w-6 h-6 bg-emerald-900 rounded-full"></div>
          </div>
        </div>

        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Play Yahtzee Online Free</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8 text-white/80">
            The classic dice game you love - now available to play online for free! No download required.
          </p>

          <div className="flex justify-center mb-8">
            <Button
              onClick={scrollToGame}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-6 py-3 rounded-lg text-lg"
            >
              <Dices className="w-5 h-5 mr-2" />
              Play Free Yahtzee
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mr-1" />
              <span>Free Online Yahtzee</span>
            </div>
            <div className="flex items-center">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mr-1" />
              <span>No Download Required</span>
            </div>
            <div className="flex items-center">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mr-1" />
              <span>Play Yahtzee Anywhere</span>
            </div>
          </div>
        </div>
      </section>

      {/* What is Yahtzee Section */}
      <section className="mb-12 px-4">
        <div className="bg-emerald-800/30 backdrop-blur-sm rounded-xl p-8 border border-emerald-700/30">
          <h2 className="text-3xl font-bold text-center mb-6">What is Yahtzee?</h2>

          <p className="mb-4">
            <strong>Yahtzee</strong> is a classic dice game that combines luck and strategy. The game uses five dice and
            a scorecard with 13 different categories. The goal is to score the most points by rolling specific dice
            combinations.
          </p>
          <p>
            The name "Yahtzee" comes from the game's highest-scoring combination - five of the same number, which earns
            you 50 points and the right to yell "YAHTZEE!" in celebration.
          </p>
        </div>
      </section>

      {/* How to Play Yahtzee */}
      <section className="mb-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">How to Play Yahtzee</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-emerald-800/20 rounded-xl p-6 border border-emerald-700/20">
            <div className="bg-emerald-700 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <span className="text-white font-bold text-xl">1</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Roll the Dice</h3>
            <p className="text-emerald-100">
              Start by rolling all five dice. You get up to three rolls per turn. After each roll, you can set aside any
              dice you want to keep and roll the rest.
            </p>
          </div>

          <div className="bg-emerald-800/20 rounded-xl p-6 border border-emerald-700/20">
            <div className="bg-emerald-700 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <span className="text-white font-bold text-xl">2</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Choose a Category</h3>
            <p className="text-emerald-100">
              After your rolls, you must choose one of the 13 categories on your Yahtzee score card to record your
              score. Each category can only be used once per game.
            </p>
          </div>

          <div className="bg-emerald-800/20 rounded-xl p-6 border border-emerald-700/20">
            <div className="bg-emerald-700 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <span className="text-white font-bold text-xl">3</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Complete the Game</h3>
            <p className="text-emerald-100">
              The game ends when all 13 categories on the Yahtzee scoring sheet are filled. Add up your scores to
              determine your final total. The highest score wins!
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/rules">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-lg">
                Learn More About Yahtzee Rules
              </Button>
            </Link>
            <Link href="/score-card">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-lg">
                Yahtzee Score Card
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Game Modes */}
      <section className="mb-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Yahtzee Game Modes</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-blue-800/40 to-blue-900/40 rounded-xl p-6 border border-blue-700/30">
            <div className="flex items-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-gamepad-2 w-8 h-8 text-blue-400 mr-3"
              >
                <rect width="16" height="12" x="4" y="6" rx="2" />
                <path d="M16 18v-6" />
                <path d="M8 18v-6" />
                <circle cx="7.5" cy="15.5" r=".5" />
                <circle cx="16.5" cy="9.5" r=".5" />
              </svg>
              <h3 className="text-2xl font-bold text-blue-300">Single Player</h3>
            </div>
            <p className="mb-4 text-blue-100">
              Play Yahtzee online free in single-player mode. Challenge yourself to beat your own high score and perfect
              your strategy.
            </p>
          </div>

          <div className="bg-gradient-to-br from-red-800/40 to-red-900/40 rounded-xl p-6 border border-red-700/30">
            <div className="flex items-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-users w-8 h-8 text-red-400 mr-3"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <h3 className="text-2xl font-bold text-red-300">VS Computer</h3>
            </div>
            <p className="mb-4 text-red-100">
              Play Yahtzee against the computer. Test your skills and strategy against an AI opponent that will
              challenge your decision-making.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mb-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>

        <div className="bg-emerald-800/30 backdrop-blur-sm rounded-xl border border-emerald-700/30 overflow-hidden">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openFAQ === index}
              onClick={() => toggleFAQ(index)}
            />
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="mb-12 px-4 text-center">
        <div className="bg-gradient-to-r from-emerald-900 to-emerald-800 rounded-xl p-6 md:p-8 border border-emerald-700 relative overflow-hidden">
          {/* Background dice */}
          <div className="absolute inset-0 opacity-50">
            <div className="absolute top-[20%] left-[15%] w-12 h-12 md:w-16 md:h-16 bg-white opacity-20 rounded-lg transform rotate-12"></div>
            <div className="absolute bottom-[20%] right-[15%] w-12 h-12 md:w-16 md:h-16 bg-white opacity-20 rounded-lg transform -rotate-12"></div>
          </div>

          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4">Ready to Play Yahtzee Online?</h2>
            <p className="text-base md:text-xl mb-4 md:mb-8 max-w-2xl mx-auto">
              Start playing the classic dice game for free right now - no download required!
            </p>

            <Button
              onClick={scrollToGame}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-5 py-3 md:px-8 md:py-6 rounded-lg text-base md:text-xl"
            >
              <Dices className="w-5 h-5 md:w-6 md:h-6 mr-2" />
              Play Free Yahtzee Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
