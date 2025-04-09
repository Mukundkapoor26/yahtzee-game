"use client"

import { motion } from "framer-motion"
import { User, Cpu } from "lucide-react"

interface ScoreCardProps {
  humanScores: Record<string, number | null>
  computerScores: Record<string, number | null> | null
  potentialScores: Record<string, number>
  onScoreCategory: (category: string) => void
  humanYahtzeeBonus: number
  computerYahtzeeBonus: number
  rollsUsed: number
  isRolling: boolean
  currentPlayer: "human" | "computer"
  gameMode: "single" | "vsComputer"
}

export default function ScoreCard({
  humanScores,
  computerScores,
  potentialScores,
  onScoreCategory,
  humanYahtzeeBonus,
  computerYahtzeeBonus,
  rollsUsed,
  isRolling,
  currentPlayer,
  gameMode,
}: ScoreCardProps) {
  // Calculate upper section total and bonus for human
  const upperSectionCategories = ["ones", "twos", "threes", "fours", "fives", "sixes"]
  const humanUpperSectionTotal = upperSectionCategories.reduce((total, category) => {
    return total + (humanScores[category] ?? 0)
  }, 0)
  const humanUpperBonus = humanUpperSectionTotal >= 63 ? 35 : 0

  // Calculate lower section total for human
  const lowerSectionCategories = [
    "threeOfAKind",
    "fourOfAKind",
    "fullHouse",
    "smallStraight",
    "largeStraight",
    "yahtzee",
    "chance",
  ]
  const humanLowerSectionTotal = lowerSectionCategories.reduce((total, category) => {
    return total + (humanScores[category] ?? 0)
  }, 0)

  // Calculate upper section total and bonus for computer (if playing vs computer)
  const computerUpperSectionTotal = computerScores
    ? upperSectionCategories.reduce((total, category) => {
        return total + (computerScores[category] ?? 0)
      }, 0)
    : 0
  const computerUpperBonus = computerUpperSectionTotal >= 63 ? 35 : 0

  // Calculate lower section total for computer (if playing vs computer)
  const computerLowerSectionTotal = computerScores
    ? lowerSectionCategories.reduce((total, category) => {
        return total + (computerScores[category] ?? 0)
      }, 0)
    : 0

  // Format category names for display
  const formatCategoryName = (category: string) => {
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

  // Get description for each category
  const getCategoryDescription = (category: string) => {
    switch (category) {
      case "ones":
        return "Sum of all Ones"
      case "twos":
        return "Sum of all Twos"
      case "threes":
        return "Sum of all Threes"
      case "fours":
        return "Sum of all Fours"
      case "fives":
        return "Sum of all Fives"
      case "sixes":
        return "Sum of all Sixes"
      case "threeOfAKind":
        return "Sum of all dice"
      case "fourOfAKind":
        return "Sum of all dice"
      case "fullHouse":
        return "25 points"
      case "smallStraight":
        return "30 points"
      case "largeStraight":
        return "40 points"
      case "yahtzee":
        return "50 points"
      case "chance":
        return "Sum of all dice"
      default:
        return ""
    }
  }

  // Single player scorecard
  if (gameMode === "single") {
    return (
      <div className="overflow-x-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Upper Section */}
          <div>
            <h3 className="text-lg font-bold mb-2 text-emerald-800">Upper Section</h3>
            <div className="bg-emerald-50 rounded-lg overflow-hidden shadow">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-emerald-700 text-white">
                    <th className="px-4 py-2 text-left">Category</th>
                    <th className="px-4 py-2 text-center w-20">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {upperSectionCategories.map((category) => (
                    <tr key={category} className="border-b border-emerald-100">
                      <td className="px-4 py-3">
                        <div className="font-medium">{formatCategoryName(category)}</div>
                        <div className="text-xs text-gray-500">{getCategoryDescription(category)}</div>
                      </td>
                      <td
                        className={`px-4 py-3 text-center ${
                          rollsUsed > 0 && humanScores[category] === null && !isRolling
                            ? "bg-yellow-100 cursor-pointer hover:bg-yellow-200"
                            : humanScores[category] !== null
                              ? "bg-emerald-50"
                              : ""
                        }`}
                        onClick={
                          rollsUsed > 0 && humanScores[category] === null && !isRolling
                            ? () => onScoreCategory(category)
                            : undefined
                        }
                      >
                        {humanScores[category] !== null ? (
                          <motion.span
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="font-bold"
                          >
                            {humanScores[category]}
                          </motion.span>
                        ) : rollsUsed > 0 && !isRolling ? (
                          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gray-600">
                            {potentialScores[category]}
                          </motion.span>
                        ) : (
                          ""
                        )}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-emerald-100">
                    <td className="px-4 py-2 font-medium">Bonus (if ≥63)</td>
                    <td className="px-4 py-2 text-center font-bold">
                      {humanUpperBonus > 0 ? (
                        <motion.span
                          initial={{ scale: 0.8 }}
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.5 }}
                          className="text-emerald-600"
                        >
                          {humanUpperBonus}
                        </motion.span>
                      ) : (
                        <span className="text-gray-400">{humanUpperBonus}</span>
                      )}
                    </td>
                  </tr>
                  <tr className="bg-emerald-200">
                    <td className="px-4 py-2 font-bold">Upper Total</td>
                    <td className="px-4 py-2 text-center font-bold">{humanUpperSectionTotal + humanUpperBonus}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Lower Section */}
          <div>
            <h3 className="text-lg font-bold mb-2 text-emerald-800">Lower Section</h3>
            <div className="bg-emerald-50 rounded-lg overflow-hidden shadow">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-emerald-700 text-white">
                    <th className="px-4 py-2 text-left">Category</th>
                    <th className="px-4 py-2 text-center w-20">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {lowerSectionCategories.map((category) => (
                    <tr key={category} className="border-b border-emerald-100">
                      <td className="px-4 py-3">
                        <div className={`font-medium ${category === "yahtzee" ? "text-red-600 font-bold" : ""}`}>
                          {formatCategoryName(category)}
                        </div>
                        <div className="text-xs text-gray-500">{getCategoryDescription(category)}</div>
                      </td>
                      <td
                        className={`px-4 py-3 text-center ${
                          rollsUsed > 0 && humanScores[category] === null && !isRolling
                            ? "bg-yellow-100 cursor-pointer hover:bg-yellow-200"
                            : humanScores[category] !== null
                              ? "bg-emerald-50"
                              : ""
                        }`}
                        onClick={
                          rollsUsed > 0 && humanScores[category] === null && !isRolling
                            ? () => onScoreCategory(category)
                            : undefined
                        }
                      >
                        {humanScores[category] !== null ? (
                          <motion.span
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className={`font-bold ${
                              category === "yahtzee" && humanScores[category] > 0 ? "text-red-600" : ""
                            }`}
                          >
                            {humanScores[category]}
                          </motion.span>
                        ) : rollsUsed > 0 && !isRolling ? (
                          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gray-600">
                            {potentialScores[category]}
                          </motion.span>
                        ) : (
                          ""
                        )}
                      </td>
                    </tr>
                  ))}
                  {humanYahtzeeBonus > 0 && (
                    <tr className="bg-red-50">
                      <td className="px-4 py-2 font-medium text-red-600">Yahtzee Bonus</td>
                      <td className="px-4 py-2 text-center font-bold text-red-600">{humanYahtzeeBonus}</td>
                    </tr>
                  )}
                  <tr className="bg-emerald-200">
                    <td className="px-4 py-2 font-bold">Lower Total</td>
                    <td className="px-4 py-2 text-center font-bold">{humanLowerSectionTotal + humanYahtzeeBonus}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Grand Total */}
        <div className="mt-6 bg-emerald-700 text-white rounded-lg p-4 flex justify-between items-center">
          <span className="text-xl font-bold">GRAND TOTAL</span>
          <span className="text-2xl font-bold">
            {humanUpperSectionTotal + humanUpperBonus + humanLowerSectionTotal + humanYahtzeeBonus}
          </span>
        </div>
      </div>
    )
  }

  // Multiplayer scorecard (vs computer)
  return (
    <div className="overflow-x-auto">
      <div className="grid grid-cols-1 gap-6">
        {/* Score Table */}
        <div className="bg-emerald-50 rounded-lg overflow-hidden shadow">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-emerald-700 text-white">
                <th className="px-4 py-2 text-left">Category</th>
                <th className="px-4 py-2 text-center w-20">
                  <div className="flex items-center justify-center gap-1">
                    <User className="w-4 h-4" />
                    <span>You</span>
                  </div>
                </th>
                <th className="px-4 py-2 text-center w-20">
                  <div className="flex items-center justify-center gap-1">
                    <Cpu className="w-4 h-4" />
                    <span>CPU</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Upper Section */}
              <tr className="bg-emerald-100">
                <td colSpan={3} className="px-4 py-2 font-bold text-emerald-800">
                  Upper Section
                </td>
              </tr>
              {upperSectionCategories.map((category) => (
                <tr key={category} className="border-b border-emerald-100">
                  <td className="px-4 py-3">
                    <div className="font-medium">{formatCategoryName(category)}</div>
                    <div className="text-xs text-gray-500">{getCategoryDescription(category)}</div>
                  </td>
                  <td
                    className={`px-4 py-3 text-center ${
                      currentPlayer === "human" && rollsUsed > 0 && humanScores[category] === null && !isRolling
                        ? "bg-yellow-100 cursor-pointer hover:bg-yellow-200"
                        : humanScores[category] !== null
                          ? "bg-emerald-50"
                          : ""
                    }`}
                    onClick={
                      currentPlayer === "human" && rollsUsed > 0 && humanScores[category] === null && !isRolling
                        ? () => onScoreCategory(category)
                        : undefined
                    }
                  >
                    {humanScores[category] !== null ? (
                      <motion.span
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="font-bold"
                      >
                        {humanScores[category]}
                      </motion.span>
                    ) : currentPlayer === "human" && rollsUsed > 0 && !isRolling ? (
                      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gray-600">
                        {potentialScores[category]}
                      </motion.span>
                    ) : (
                      ""
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {computerScores && computerScores[category] !== null ? (
                      <motion.span
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="font-bold"
                      >
                        {computerScores[category]}
                      </motion.span>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
              ))}
              <tr className="bg-emerald-100">
                <td className="px-4 py-2 font-medium">Bonus (if ≥63)</td>
                <td className="px-4 py-2 text-center font-bold">
                  {humanUpperBonus > 0 ? (
                    <motion.span
                      initial={{ scale: 0.8 }}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.5 }}
                      className="text-emerald-600"
                    >
                      {humanUpperBonus}
                    </motion.span>
                  ) : (
                    <span className="text-gray-400">{humanUpperBonus}</span>
                  )}
                </td>
                <td className="px-4 py-2 text-center font-bold">
                  {computerUpperBonus > 0 ? (
                    <motion.span
                      initial={{ scale: 0.8 }}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.5 }}
                      className="text-emerald-600"
                    >
                      {computerUpperBonus}
                    </motion.span>
                  ) : (
                    <span className="text-gray-400">{computerUpperBonus}</span>
                  )}
                </td>
              </tr>
              <tr className="bg-emerald-200">
                <td className="px-4 py-2 font-bold">Upper Total</td>
                <td className="px-4 py-2 text-center font-bold">{humanUpperSectionTotal + humanUpperBonus}</td>
                <td className="px-4 py-2 text-center font-bold">{computerUpperSectionTotal + computerUpperBonus}</td>
              </tr>

              {/* Lower Section */}
              <tr className="bg-emerald-100">
                <td colSpan={3} className="px-4 py-2 font-bold text-emerald-800">
                  Lower Section
                </td>
              </tr>
              {lowerSectionCategories.map((category) => (
                <tr key={category} className="border-b border-emerald-100">
                  <td className="px-4 py-3">
                    <div className={`font-medium ${category === "yahtzee" ? "text-red-600 font-bold" : ""}`}>
                      {formatCategoryName(category)}
                    </div>
                    <div className="text-xs text-gray-500">{getCategoryDescription(category)}</div>
                  </td>
                  <td
                    className={`px-4 py-3 text-center ${
                      currentPlayer === "human" && rollsUsed > 0 && humanScores[category] === null && !isRolling
                        ? "bg-yellow-100 cursor-pointer hover:bg-yellow-200"
                        : humanScores[category] !== null
                          ? "bg-emerald-50"
                          : ""
                    }`}
                    onClick={
                      currentPlayer === "human" && rollsUsed > 0 && humanScores[category] === null && !isRolling
                        ? () => onScoreCategory(category)
                        : undefined
                    }
                  >
                    {humanScores[category] !== null ? (
                      <motion.span
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className={`font-bold ${
                          category === "yahtzee" && humanScores[category] > 0 ? "text-red-600" : ""
                        }`}
                      >
                        {humanScores[category]}
                      </motion.span>
                    ) : currentPlayer === "human" && rollsUsed > 0 && !isRolling ? (
                      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gray-600">
                        {potentialScores[category]}
                      </motion.span>
                    ) : (
                      ""
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {computerScores && computerScores[category] !== null ? (
                      <motion.span
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className={`font-bold ${
                          category === "yahtzee" && computerScores[category] > 0 ? "text-red-600" : ""
                        }`}
                      >
                        {computerScores[category]}
                      </motion.span>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
              ))}
              {(humanYahtzeeBonus > 0 || computerYahtzeeBonus > 0) && (
                <tr className="bg-red-50">
                  <td className="px-4 py-2 font-medium text-red-600">Yahtzee Bonus</td>
                  <td className="px-4 py-2 text-center font-bold text-red-600">{humanYahtzeeBonus}</td>
                  <td className="px-4 py-2 text-center font-bold text-red-600">{computerYahtzeeBonus}</td>
                </tr>
              )}
              <tr className="bg-emerald-200">
                <td className="px-4 py-2 font-bold">Lower Total</td>
                <td className="px-4 py-2 text-center font-bold">{humanLowerSectionTotal + humanYahtzeeBonus}</td>
                <td className="px-4 py-2 text-center font-bold">{computerLowerSectionTotal + computerYahtzeeBonus}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Grand Total */}
        <div className="mt-2 bg-emerald-700 text-white rounded-lg p-4 flex justify-between items-center">
          <span className="text-xl font-bold">GRAND TOTAL</span>
          <div className="flex gap-8">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span className="text-2xl font-bold">
                {humanUpperSectionTotal + humanUpperBonus + humanLowerSectionTotal + humanYahtzeeBonus}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">
                {computerUpperSectionTotal + computerUpperBonus + computerLowerSectionTotal + computerYahtzeeBonus}
              </span>
              <Cpu className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
