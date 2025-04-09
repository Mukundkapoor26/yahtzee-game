export function calculateScore(dice: number[]) {
  // Sort dice for easier calculations
  const sortedDice = [...dice].sort((a, b) => a - b)

  // Count occurrences of each die value
  const counts = {}
  for (const die of dice) {
    counts[die] = (counts[die] || 0) + 1
  }

  // Calculate sum of all dice
  const sum = dice.reduce((total, die) => total + die, 0)

  // Upper section scores
  const ones = dice.filter((die) => die === 1).reduce((total, die) => total + die, 0)
  const twos = dice.filter((die) => die === 2).reduce((total, die) => total + die, 0)
  const threes = dice.filter((die) => die === 3).reduce((total, die) => total + die, 0)
  const fours = dice.filter((die) => die === 4).reduce((total, die) => total + die, 0)
  const fives = dice.filter((die) => die === 5).reduce((total, die) => total + die, 0)
  const sixes = dice.filter((die) => die === 6).reduce((total, die) => total + die, 0)

  // Check for three of a kind
  const hasThreeOfAKind = Object.values(counts).some((count) => count >= 3)
  const threeOfAKind = hasThreeOfAKind ? sum : 0

  // Check for four of a kind
  const hasFourOfAKind = Object.values(counts).some((count) => count >= 4)
  const fourOfAKind = hasFourOfAKind ? sum : 0

  // Check for full house (three of one number and two of another)
  const hasFullHouse = Object.values(counts).includes(3) && Object.values(counts).includes(2)
  const fullHouse = hasFullHouse ? 25 : 0

  // Check for small straight (four consecutive numbers)
  const hasSmallStraight = checkForSmallStraight(sortedDice)
  const smallStraight = hasSmallStraight ? 30 : 0

  // Check for large straight (five consecutive numbers)
  const hasLargeStraight =
    (sortedDice[0] === 1 && sortedDice[1] === 2 && sortedDice[2] === 3 && sortedDice[3] === 4 && sortedDice[4] === 5) ||
    (sortedDice[0] === 2 && sortedDice[1] === 3 && sortedDice[2] === 4 && sortedDice[3] === 5 && sortedDice[4] === 6)
  const largeStraight = hasLargeStraight ? 40 : 0

  // Check for Yahtzee (five of a kind)
  const hasYahtzee = Object.values(counts).some((count) => count === 5)
  const yahtzee = hasYahtzee ? 50 : 0

  // Chance is always the sum of all dice
  const chance = sum

  return {
    ones,
    twos,
    threes,
    fours,
    fives,
    sixes,
    threeOfAKind,
    fourOfAKind,
    fullHouse,
    smallStraight,
    largeStraight,
    yahtzee,
    chance,
  }
}

// Helper function to check for small straight
function checkForSmallStraight(sortedDice: number[]) {
  // Remove duplicates
  const uniqueDice = [...new Set(sortedDice)]

  // Check for sequences of 4 consecutive numbers
  if (uniqueDice.length >= 4) {
    // Check for 1-2-3-4
    if (uniqueDice.includes(1) && uniqueDice.includes(2) && uniqueDice.includes(3) && uniqueDice.includes(4)) {
      return true
    }
    // Check for 2-3-4-5
    if (uniqueDice.includes(2) && uniqueDice.includes(3) && uniqueDice.includes(4) && uniqueDice.includes(5)) {
      return true
    }
    // Check for 3-4-5-6
    if (uniqueDice.includes(3) && uniqueDice.includes(4) && uniqueDice.includes(5) && uniqueDice.includes(6)) {
      return true
    }
  }

  return false
}
