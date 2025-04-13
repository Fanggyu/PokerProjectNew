import type { RangeData } from "./types"

// Generate a 13x13 matrix with default values
const generateDefaultMatrix = () => {
  return Array(13)
    .fill(null)
    .map(() => Array(13).fill(null))
}

// Create default ranges for each position
// This is a simplified example - in a real app, you'd have more accurate ranges
export const defaultRanges: RangeData = {
  UTG: generateDefaultMatrix().map((row, rowIndex) =>
    row.map((_, colIndex) => {
      // Pairs (diagonal)
      if (rowIndex === colIndex) {
        return rowIndex < 6 ? "raise" : rowIndex < 8 ? "call" : "fold"
      }
      // Suited hands (above diagonal)
      else if (rowIndex < colIndex) {
        if (rowIndex < 2 && colIndex < 4) return "raise"
        if (rowIndex < 3 && colIndex < 5) return "call"
        return "fold"
      }
      // Offsuit hands (below diagonal)
      else {
        if (rowIndex < 3 && colIndex < 2) return "raise"
        if (rowIndex < 4 && colIndex < 3) return "call"
        return "fold"
      }
    }),
  ),

  MP: generateDefaultMatrix().map((row, rowIndex) =>
    row.map((_, colIndex) => {
      // Slightly wider range than UTG
      if (rowIndex === colIndex) {
        return rowIndex < 7 ? "raise" : rowIndex < 9 ? "call" : "fold"
      } else if (rowIndex < colIndex) {
        if (rowIndex < 3 && colIndex < 5) return "raise"
        if (rowIndex < 4 && colIndex < 6) return "call"
        return "fold"
      } else {
        if (rowIndex < 4 && colIndex < 3) return "raise"
        if (rowIndex < 5 && colIndex < 4) return "call"
        return "fold"
      }
    }),
  ),

  CO: generateDefaultMatrix().map((row, rowIndex) =>
    row.map((_, colIndex) => {
      // Wider range than MP
      if (rowIndex === colIndex) {
        return rowIndex < 8 ? "raise" : rowIndex < 10 ? "call" : "fold"
      } else if (rowIndex < colIndex) {
        if (rowIndex < 4 && colIndex < 6) return "raise"
        if (rowIndex < 5 && colIndex < 7) return "call"
        return "fold"
      } else {
        if (rowIndex < 5 && colIndex < 4) return "raise"
        if (rowIndex < 6 && colIndex < 5) return "call"
        return "fold"
      }
    }),
  ),

  BTN: generateDefaultMatrix().map((row, rowIndex) =>
    row.map((_, colIndex) => {
      // Much wider range on the button
      if (rowIndex === colIndex) {
        return rowIndex < 10 ? "raise" : "call"
      } else if (rowIndex < colIndex) {
        if (rowIndex < 5 && colIndex < 8) return "raise"
        if (rowIndex < 7 && colIndex < 10) return "call"
        return "fold"
      } else {
        if (rowIndex < 6 && colIndex < 5) return "raise"
        if (rowIndex < 8 && colIndex < 7) return "call"
        return "fold"
      }
    }),
  ),

  SB: generateDefaultMatrix().map((row, rowIndex) =>
    row.map((_, colIndex) => {
      // SB has more 3bets
      if (rowIndex === colIndex) {
        return rowIndex < 6 ? "3bet" : rowIndex < 9 ? "call" : "fold"
      } else if (rowIndex < colIndex) {
        if (rowIndex < 3 && colIndex < 5) return "3bet"
        if (rowIndex < 6 && colIndex < 8) return "call"
        return "fold"
      } else {
        if (rowIndex < 4 && colIndex < 3) return "3bet"
        if (rowIndex < 7 && colIndex < 6) return "call"
        return "fold"
      }
    }),
  ),

  BB: generateDefaultMatrix().map((row, rowIndex) =>
    row.map((_, colIndex) => {
      // BB defends wider
      if (rowIndex === colIndex) {
        return rowIndex < 5 ? "3bet" : "call"
      } else if (rowIndex < colIndex) {
        if (rowIndex < 3 && colIndex < 5) return "3bet"
        if (rowIndex < 8 && colIndex < 10) return "call"
        return "fold"
      } else {
        if (rowIndex < 4 && colIndex < 3) return "3bet"
        if (rowIndex < 9 && colIndex < 8) return "call"
        return "fold"
      }
    }),
  ),
}
