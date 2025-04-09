"use client"

import { useState, useEffect } from "react"
import Die from "./die"
import ScoreCard from "./score-card"
import { calculateScore } from "@/lib/yahtzee-scoring"
import confetti from "canvas-confetti"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Dices, Trophy, RotateCcw, User, Cpu, Users } from "lucide-react"

type GameMode = "single" | "vsComputer" | null

export default function YahtzeeGame() {
  // Game mode selection
  const [gameMode, setGameMode] = useState<GameMode>("single")
  const [diceRollSound, setDiceRollSound] = useState<HTMLAudioElement | null>(null)

  // Initialize audio on client side
  useEffect(() => {
    setDiceRollSound(new Audio("/dice-roll.mp3"))
  }, [])

  // Player states
  const [currentPlayer, setCurrentPlayer] = useState<"human" | "computer">("human")
  const [dice, setDice] = useState([1, 2, 3, 4, 5])
  const [keptDice, setKeptDice] = useState([false, false, false, false, false])
  const [rollsLeft, setRollsLeft] = useState(3)
  const [isRolling, setIsRolling] = useState(false)
  const [computerThinking, setComputerThinking] = useState(false)

  // Score states
  const [humanScores, setHumanScores] = useState({
    ones: null,
    twos: null,
    threes: null,
    fours: null,
    fives: null,
    sixes: null,
    threeOfAKind: null,
    fourOfAKind: null,
    fullHouse: null,
    smallStraight: null,
    largeStraight: null,
    yahtzee: null,
    chance: null,
  })

  const [computerScores, setComputerScores] = useState({
    ones: null,
    twos: null,
    threes: null,
    fours: null,
    fives: null,
    sixes: null,
    threeOfAKind: null,
    fourOfAKind: null,
    fullHouse: null,
    smallStraight: null,
    largeStraight: null,
    yahtzee: null,
    chance: null,
  })

  const [humanYahtzeeBonus, setHumanYahtzeeBonus] = useState(0)
  const [computerYahtzeeBonus, setComputerYahtzeeBonus] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [winner, setWinner] = useState<"human" | "computer" | "tie" | null>(null)
  const [humanTotalScore, setHumanTotalScore] = useState(0)
  const [computerTotalScore, setComputerTotalScore] = useState(0)
  const [computerMessage, setComputerMessage] = useState("")

  // Calculate potential scores based on current dice
  const potentialScores = calculateScore(dice)

  // Calculate total scores whenever scores change
  useEffect(() => {
    const newHumanTotalScore = calculateTotalScore(humanScores, humanYahtzeeBonus)
    setHumanTotalScore(newHumanTotalScore)

    if (gameMode === "vsComputer") {
      const newComputerTotalScore = calculateTotalScore(computerScores, computerYahtzeeBonus)
      setComputerTotalScore(newComputerTotalScore)
    }
  }, [humanScores, computerScores, humanYahtzeeBonus, computerYahtzeeBonus, gameMode])

  // Computer's turn logic
  useEffect(() => {
    if (gameMode === "vsComputer" && currentPlayer === "computer" && !gameOver) {
      handleComputerTurn()
    }
  }, [currentPlayer, gameOver, gameMode])

  // Check if game is over
  useEffect(() => {
    if (gameMode === "single") {
      const isHumanDone = Object.values(humanScores).every((score) => score !== null)

      if (isHumanDone && !gameOver) {
        setGameOver(true)
        setTimeout(() => {
          triggerConfetti()
        }, 500)
      }
    } else if (gameMode === "vsComputer") {
      const isHumanDone = Object.values(humanScores).every((score) => score !== null)
      const isComputerDone = Object.values(computerScores).every((score) => score !== null)

      if (isHumanDone && isComputerDone && !gameOver) {
        setGameOver(true)

        // Determine winner
        if (humanTotalScore > computerTotalScore) {
          setWinner("human")
        } else if (computerTotalScore > humanTotalScore) {
          setWinner("computer")
        } else {
          setWinner("tie")
        }

        setTimeout(() => {
          triggerConfetti()
        }, 500)
      }
    }
  }, [humanScores, computerScores, humanTotalScore, computerTotalScore, gameOver, gameMode])

  const toggleKeepDie = (index) => {
    if (
      (gameMode === "single" || (gameMode === "vsComputer" && currentPlayer === "human")) &&
      rollsLeft < 3 &&
      !isRolling
    ) {
      const newKeptDice = [...keptDice]
      newKeptDice[index] = !newKeptDice[index]
      setKeptDice(newKeptDice)
    }
  }

  const rollDice = () => {
    if (
      rollsLeft > 0 &&
      !gameOver &&
      !isRolling &&
      (gameMode === "single" || (gameMode === "vsComputer" && currentPlayer === "human"))
    ) {
      setIsRolling(true)
      // Play dice roll sound if available
      diceRollSound?.play()

      // Animation timing
      const rollDuration = 800

      // Create new dice array
      const newDice = [...dice]

      // Roll animation with multiple values
      const rollAnimation = setInterval(() => {
        const animDice = [...newDice]
        for (let i = 0; i < animDice.length; i++) {
          if (!keptDice[i]) {
            animDice[i] = Math.floor(Math.random() * 6) + 1
          }
        }
        setDice(animDice)
      }, 100)

      // Set final values after animation
      setTimeout(() => {
        clearInterval(rollAnimation)

        const finalDice = [...newDice]
        for (let i = 0; i < finalDice.length; i++) {
          if (!keptDice[i]) {
            finalDice[i] = Math.floor(Math.random() * 6) + 1
          }
        }
        setDice(finalDice)
        setRollsLeft(rollsLeft - 1)
        setIsRolling(false)

        // Check for Yahtzee
        const allSame = finalDice.every((die) => die === finalDice[0])
        if (allSame && humanScores.yahtzee !== null && humanScores.yahtzee > 0) {
          // Yahtzee bonus!
          setHumanYahtzeeBonus(humanYahtzeeBonus + 100)
          triggerConfetti()
        }
      }, rollDuration)
    }
  }

  const scoreCategory = (category) => {
    if (
      (gameMode === "single" || (gameMode === "vsComputer" && currentPlayer === "human")) &&
      humanScores[category] === null &&
      rollsLeft < 3 &&
      !gameOver &&
      !isRolling
    ) {
      const newScores = { ...humanScores }
      newScores[category] = potentialScores[category]
      setHumanScores(newScores)

      // Reset for next turn
      setRollsLeft(3)
      setKeptDice([false, false, false, false, false])

      // If playing against computer, switch to computer's turn
      if (gameMode === "vsComputer") {
        setCurrentPlayer("computer")
      }
    }
  }

  const handleComputerTurn = async () => {
    setComputerThinking(true)
    setComputerMessage("Computer is thinking...")

    // Add a small delay to simulate "thinking"
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Computer's turn logic - 3 rolls with strategy
    let remainingRolls = 3
    let currentDice = [...dice]
    let currentKeptDice = [false, false, false, false, false]

    while (remainingRolls > 0) {
      setRollsLeft(remainingRolls)

      // Roll the dice
      setIsRolling(true)
      setComputerMessage("Computer is rolling the dice...")
      setKeptDice(currentKeptDice) // Show which dice are being kept
      // Play dice roll sound if available
      diceRollSound?.play()

      // Animation for rolling
      const rollAnimation = setInterval(() => {
        const animDice = [...currentDice]
        for (let i = 0; i < animDice.length; i++) {
          if (!currentKeptDice[i]) {
            animDice[i] = Math.floor(Math.random() * 6) + 1
          }
        }
        setDice(animDice)
      }, 100)

      // Wait for animation
      await new Promise((resolve) => setTimeout(resolve, 800))
      clearInterval(rollAnimation)

      // Set final dice values
      const finalDice = [...currentDice]
      for (let i = 0; i < finalDice.length; i++) {
        if (!currentKeptDice[i]) {
          finalDice[i] = Math.floor(Math.random() * 6) + 1
        }
      }
      currentDice = finalDice
      setDice(currentDice)
      setIsRolling(false)

      // Check for Yahtzee bonus
      const allSame = currentDice.every((die) => die === currentDice[0])
      if (allSame && computerScores.yahtzee !== null && computerScores.yahtzee > 0) {
        setComputerYahtzeeBonus(computerYahtzeeBonus + 100)
        setComputerMessage("Computer got a Yahtzee bonus! +100 points")
        await new Promise((resolve) => setTimeout(resolve, 1000))
      }

      remainingRolls--
      setRollsLeft(remainingRolls)

      if (remainingRolls > 0) {
        // Computer strategy for keeping dice
        setComputerMessage("Computer is deciding which dice to keep...")
        await new Promise((resolve) => setTimeout(resolve, 800))

        // Simple strategy: count occurrences of each value
        const counts = {}
        for (const die of currentDice) {
          counts[die] = (counts[die] || 0) + 1
        }

        // Keep dice with the highest count
        let highestCount = 0
        let highestValue = 0

        for (const [value, count] of Object.entries(counts)) {
          if (count > highestCount) {
            highestCount = count
            highestValue = Number.parseInt(value)
          } else if (count === highestCount && Number.parseInt(value) > highestValue) {
            // If tied, prefer higher values
            highestValue = Number.parseInt(value)
          }
        }

        // If we have a pair or better, keep those dice
        if (highestCount >= 2) {
          currentKeptDice = currentDice.map((die) => die === highestValue)
          setComputerMessage(`Computer keeps all ${highestValue}'s (${highestCount} dice)`)
        }
        // Check for potential straights
        else if (new Set(currentDice).size >= 4) {
          // Keep all unique dice for potential straight
          const uniqueValues = new Set()
          currentKeptDice = currentDice.map((die) => {
            if (!uniqueValues.has(die)) {
              uniqueValues.add(die)
              return true
            }
            return false
          })
          setComputerMessage("Computer keeps dice for a potential straight")
        }
        // Otherwise, keep highest value dice
        else {
          const maxDie = Math.max(...currentDice)
          currentKeptDice = currentDice.map((die) => die === maxDie)
          setComputerMessage(`Computer keeps all ${maxDie}'s (highest value)`)
        }

        setKeptDice(currentKeptDice)
        await new Promise((resolve) => setTimeout(resolve, 1200))
      }
    }

    // Choose category to score
    setComputerMessage("Computer is choosing a category...")
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const potentialScores = calculateScore(currentDice)

    // Find best scoring category
    let bestCategory = null
    let bestScore = -1

    // Check all available categories
    for (const category in computerScores) {
      if (computerScores[category] === null) {
        const score = potentialScores[category]

        // Prioritize Yahtzee if available
        if (category === "yahtzee" && score === 50) {
          bestCategory = category
          break
        }

        // Prioritize full house, small straight, large straight if available
        if (
          (category === "fullHouse" && score === 25) ||
          (category === "smallStraight" && score === 30) ||
          (category === "largeStraight" && score === 40)
        ) {
          bestCategory = category
          break
        }

        // Otherwise choose highest scoring category
        if (score > bestScore) {
          bestScore = score
          bestCategory = category
        }
      }
    }

    // If no good options, choose first available category
    if (bestCategory === null) {
      bestCategory = Object.keys(computerScores).find((category) => computerScores[category] === null)
    }

    // Score the chosen category
    const newScores = { ...computerScores }
    newScores[bestCategory] = potentialScores[bestCategory]

    setComputerMessage(`Computer scores ${potentialScores[bestCategory]} in ${formatCategoryName(bestCategory)}`)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setComputerScores(newScores)
    setComputerThinking(false)

    // Reset for human's turn
    setRollsLeft(3)
    setKeptDice([false, false, false, false, false])
    setCurrentPlayer("human")
    setComputerMessage("")
  }

  const resetGame = () => {
    setDice([1, 2, 3, 4, 5])
    setKeptDice([false, false, false, false, false])
    setRollsLeft(3)
    setHumanScores({
      ones: null,
      twos: null,
      threes: null,
      fours: null,
      fives: null,
      sixes: null,
      threeOfAKind: null,
      fourOfAKind: null,
      fullHouse: null,
      smallStraight: null,
      largeStraight: null,
      yahtzee: null,
      chance: null,
    })
    setComputerScores({
      ones: null,
      twos: null,
      threes: null,
      fours: null,
      fives: null,
      sixes: null,
      threeOfAKind: null,
      fourOfAKind: null,
      fullHouse: null,
      smallStraight: null,
      largeStraight: null,
      yahtzee: null,
      chance: null,
    })
    setHumanYahtzeeBonus(0)
    setComputerYahtzeeBonus(0)
    setGameOver(false)
    setWinner(null)
    setCurrentPlayer("human")
    setComputerMessage("")
    // Don't reset game mode
  }

  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 },
      colors: ["#FFD700", "#FFA500", "#FF4500"],
    })
  }

  // Calculate total score
  const calculateTotalScore = (scores, yahtzeeBonus) => {
    let upperSectionSum = 0
    const upperCategories = ["ones", "twos", "threes", "fours", "fives", "sixes"]

    upperCategories.forEach((category) => {
      if (scores[category] !== null) {
        upperSectionSum += scores[category]
      }
    })

    const upperBonus = upperSectionSum >= 63 ? 35 : 0

    let lowerSectionSum = 0
    const lowerCategories = [
      "threeOfAKind",
      "fourOfAKind",
      "fullHouse",
      "smallStraight",
      "largeStraight",
      "yahtzee",
      "chance",
    ]

    lowerCategories.forEach((category) => {
      if (scores[category] !== null) {
        lowerSectionSum += scores[category]
      }
    })

    return upperSectionSum + upperBonus + lowerSectionSum + yahtzeeBonus
  }

  // Format category names for display
  const formatCategoryName = (category) => {
    switch (category) {
      case "ones":
        return "Ones"
      case "twos":
        return "Twos"
      case "threes":
        return "Threes"
      case "fours":
        return "Fours"
      case "fives":
        return "Fives"
      case "sixes":
        return "Sixes"
      case "threeOfAKind":
        return "Three of a Kind"
      case "fourOfAKind":
        return "Four of a Kind"
      case "fullHouse":
        return "Full House"
      case "smallStraight":
        return "Small Straight"
      case "largeStraight":
        return "Large Straight"
      case "yahtzee":
        return "YAHTZEE"
      case "chance":
        return "Chance"
      default:
        return category
    }
  }

  return (
    <div id="yahtzee-game" className="flex flex-col items-center">
      {/* Game board with wooden texture */}
      <div className="w-full max-w-6xl bg-[url('/wood-texture.jpg')] bg-cover rounded-xl shadow-2xl p-3 md:p-6 mb-4 md:mb-8">
        {/* Main game layout - side by side on larger screens */}
        <div className="flex flex-col lg:flex-row lg:gap-6">
          {/* Left side - Dice and controls */}
          <div className="lg:w-1/2">
            {/* Current player and score display */}
            <div className="flex justify-between items-center mb-4 md:mb-6">
              <div
                className={`flex items-center gap-1 md:gap-2 px-2 py-1 md:px-4 md:py-2 rounded-lg ${
                  gameMode === "single" || (gameMode === "vsComputer" && currentPlayer === "human")
                    ? "bg-blue-600 text-white"
                    : "bg-black/70 text-white"
                }`}
              >
                <User className="w-4 h-4 md:w-5 md:h-5 text-white" />
                <span className="text-sm md:text-base font-bold">You: {humanTotalScore}</span>
              </div>

              <div className="bg-black/70 text-white px-2 py-1 md:px-4 md:py-2 rounded-lg flex items-center">
                <span className="text-sm md:text-base mr-1 md:mr-2">Rolls left:</span>
                <div className="flex space-x-1">
                  {[...Array(rollsLeft)].map((_, i) => (
                    <div key={i} className="w-2 h-2 md:w-3 md:h-3 bg-yellow-400 rounded-full"></div>
                  ))}
                  {[...Array(3 - rollsLeft)].map((_, i) => (
                    <div key={i} className="w-2 h-2 md:w-3 md:h-3 bg-gray-600 rounded-full"></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Computer thinking message */}
            {gameMode === "vsComputer" && computerThinking && (
              <div className="mb-4 px-4 py-2 bg-red-100/30 rounded-lg text-center">
                <p className="text-sm md:text-base text-red-700 font-medium">{computerMessage}</p>
              </div>
            )}

            <div className="relative">
              {gameMode === "vsComputer" && (
                <>
                  {currentPlayer === "computer" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-2 py-0.5 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-bold z-10 flex items-center gap-1"
                    >
                      <Cpu className="w-3 h-3 md:w-4 md:h-4" />
                      <span>Computer's Turn</span>
                    </motion.div>
                  )}

                  {currentPlayer === "human" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-2 py-0.5 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-bold z-10 flex items-center gap-1"
                    >
                      <User className="w-3 h-3 md:w-4 md:h-4" />
                      <span>Your Turn</span>
                    </motion.div>
                  )}
                </>
              )}

              <motion.div
                className={`dice-container flex flex-wrap justify-center gap-1 md:gap-4 mb-4 md:mb-8 mt-4 p-2 md:p-4 rounded-lg ${
                  gameMode === "vsComputer"
                    ? currentPlayer === "computer"
                      ? "bg-red-100/30"
                      : "bg-blue-100/30"
                    : "bg-blue-100/30"
                }`}
                layout
              >
                {dice.map((die, index) => (
                  <Die
                    key={index}
                    value={die}
                    kept={keptDice[index]}
                    onClick={() => toggleKeepDie(index)}
                    disabled={
                      rollsLeft === 3 || isRolling || (gameMode === "vsComputer" && currentPlayer === "computer")
                    }
                    isRolling={isRolling && !keptDice[index]}
                    isComputer={gameMode === "vsComputer" && currentPlayer === "computer"}
                  />
                ))}
              </motion.div>
            </div>

            {/* Roll button */}
            <div className="flex justify-center mb-4 md:mb-8">
              <Button
                onClick={rollDice}
                disabled={
                  rollsLeft === 0 ||
                  gameOver ||
                  isRolling ||
                  (gameMode === "vsComputer" && currentPlayer === "computer")
                }
                className={`text-base md:text-lg py-4 md:py-6 px-6 md:px-8 rounded-xl shadow-lg transition-all ${
                  rollsLeft > 0 &&
                  !gameOver &&
                  !isRolling &&
                  (gameMode === "single" || (gameMode === "vsComputer" && currentPlayer === "human"))
                    ? "bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white"
                    : "bg-gray-400 text-gray-700"
                }`}
              >
                <Dices className="w-5 h-5 md:w-6 md:h-6 mr-2" />
                Roll Dice
              </Button>
            </div>

            {/* Game mode toggle - Only visible on mobile */}
            <div className="flex justify-center mb-4 lg:hidden">
              <Button
                onClick={() => {
                  if (!gameOver) {
                    // Reset game state when switching modes
                    setDice([1, 2, 3, 4, 5])
                    setKeptDice([false, false, false, false, false])
                    setRollsLeft(3)
                    setHumanScores({
                      ones: null,
                      twos: null,
                      threes: null,
                      fours: null,
                      fives: null,
                      sixes: null,
                      threeOfAKind: null,
                      fourOfAKind: null,
                      fullHouse: null,
                      smallStraight: null,
                      largeStraight: null,
                      yahtzee: null,
                      chance: null,
                    })
                    setComputerScores({
                      ones: null,
                      twos: null,
                      threes: null,
                      fours: null,
                      fives: null,
                      sixes: null,
                      threeOfAKind: null,
                      fourOfAKind: null,
                      fullHouse: null,
                      smallStraight: null,
                      largeStraight: null,
                      yahtzee: null,
                      chance: null,
                    })
                    setHumanYahtzeeBonus(0)
                    setComputerYahtzeeBonus(0)
                    setGameOver(false)
                    setWinner(null)
                    setCurrentPlayer("human")
                    setComputerMessage("")

                    // Toggle game mode
                    setGameMode(gameMode === "single" ? "vsComputer" : "single")
                  }
                }}
                variant="outline"
                className={`text-sm py-2 px-4 rounded-full ${gameOver ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={gameOver}
              >
                <div className="flex items-center gap-2">
                  {gameMode === "single" ? (
                    <>
                      <Users className="w-4 h-4" />
                      <span>Switch to vs Computer</span>
                    </>
                  ) : (
                    <>
                      <User className="w-4 h-4" />
                      <span>Switch to Single Player</span>
                    </>
                  )}
                </div>
              </Button>
            </div>
          </div>

          {/* Right side - Scorecard */}
          <div className="lg:w-1/2">
            <div className="bg-white/90 p-4 rounded-lg shadow-inner h-full">
              {gameMode === "single" ? (
                <ScoreCard
                  humanScores={humanScores}
                  computerScores={null}
                  potentialScores={potentialScores}
                  onScoreCategory={scoreCategory}
                  humanYahtzeeBonus={humanYahtzeeBonus}
                  computerYahtzeeBonus={0}
                  rollsUsed={3 - rollsLeft}
                  isRolling={isRolling}
                  currentPlayer="human"
                  gameMode={gameMode}
                />
              ) : (
                <ScoreCard
                  humanScores={humanScores}
                  computerScores={computerScores}
                  potentialScores={potentialScores}
                  onScoreCategory={scoreCategory}
                  humanYahtzeeBonus={humanYahtzeeBonus}
                  computerYahtzeeBonus={computerYahtzeeBonus}
                  rollsUsed={3 - rollsLeft}
                  isRolling={isRolling}
                  currentPlayer={currentPlayer}
                  gameMode={gameMode}
                />
              )}
            </div>
          </div>
        </div>

        {/* Game mode toggle - Only visible on desktop, at the bottom */}
        <div className="hidden lg:flex justify-center mt-6">
          <Button
            onClick={() => {
              if (!gameOver) {
                // Reset game state when switching modes
                setDice([1, 2, 3, 4, 5])
                setKeptDice([false, false, false, false, false])
                setRollsLeft(3)
                setHumanScores({
                  ones: null,
                  twos: null,
                  threes: null,
                  fours: null,
                  fives: null,
                  sixes: null,
                  threeOfAKind: null,
                  fourOfAKind: null,
                  fullHouse: null,
                  smallStraight: null,
                  largeStraight: null,
                  yahtzee: null,
                  chance: null,
                })
                setComputerScores({
                  ones: null,
                  twos: null,
                  threes: null,
                  fours: null,
                  fives: null,
                  sixes: null,
                  threeOfAKind: null,
                  fourOfAKind: null,
                  fullHouse: null,
                  smallStraight: null,
                  largeStraight: null,
                  yahtzee: null,
                  chance: null,
                })
                setHumanYahtzeeBonus(0)
                setComputerYahtzeeBonus(0)
                setGameOver(false)
                setWinner(null)
                setCurrentPlayer("human")
                setComputerMessage("")

                // Toggle game mode
                setGameMode(gameMode === "single" ? "vsComputer" : "single")
              }
            }}
            variant="outline"
            className={`text-sm py-2 px-4 rounded-full ${gameOver ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={gameOver}
          >
            <div className="flex items-center gap-2">
              {gameMode === "single" ? (
                <>
                  <Users className="w-4 h-4" />
                  <span>Switch to vs Computer</span>
                </>
              ) : (
                <>
                  <User className="w-4 h-4" />
                  <span>Switch to Single Player</span>
                </>
              )}
            </div>
          </Button>
        </div>
      </div>

      {/* Game over modal */}
      <AnimatePresence>
        {gameOver && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 flex items-center justify-center z-50 bg-black/60"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4 text-center">
              <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
              <h3 className="text-3xl font-bold mb-2">Game Over!</h3>

              {gameMode === "single" ? (
                <div className="mb-4">
                  <p className="text-2xl font-bold text-blue-600">Your Final Score</p>
                  <p className="text-4xl font-bold text-blue-600 mt-2">{humanTotalScore}</p>
                </div>
              ) : (
                <>
                  {winner === "human" && (
                    <div className="mb-4">
                      <p className="text-2xl font-bold text-green-600">You Win!</p>
                      <p className="text-gray-600">Congratulations!</p>
                    </div>
                  )}

                  {winner === "computer" && (
                    <div className="mb-4">
                      <p className="text-2xl font-bold text-red-600">Computer Wins!</p>
                      <p className="text-gray-600">Better luck next time!</p>
                    </div>
                  )}

                  {winner === "tie" && (
                    <div className="mb-4">
                      <p className="text-2xl font-bold text-blue-600">It's a Tie!</p>
                      <p className="text-gray-600">Great minds think alike!</p>
                    </div>
                  )}

                  <div className="flex justify-between items-center mb-6 px-4">
                    <div className="text-center">
                      <p className="text-lg font-bold">Your Score</p>
                      <p className="text-3xl font-bold text-blue-600">{humanTotalScore}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold">Computer</p>
                      <p className="text-3xl font-bold text-red-600">{computerTotalScore}</p>
                    </div>
                  </div>
                </>
              )}

              <div className="flex flex-col gap-4">
                <Button
                  onClick={resetGame}
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-lg py-6 px-8 rounded-xl shadow-lg"
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Play Again
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
