"use client"

import { cn } from "@/lib/utils"
import { useRangeStore } from "@/lib/store"
import type { ActionType } from "@/lib/types"

interface RangeChartProps {
  isEditable: boolean
}

export function RangeChart({ isEditable }: RangeChartProps) {
  const { selectedPosition, getHandMatrix, updateHandAction, getActionColor } = useRangeStore()

  const handMatrix = getHandMatrix(selectedPosition, false)
  const ranks = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"]

  // Handle cell click to cycle through actions
  const handleCellClick = (row: number, col: number) => {
    if (!isEditable) return

    const currentAction = handMatrix[row][col]
    let nextAction: ActionType

    // Cycle through actions: Raise -> Call -> 3-bet -> Fold -> null
    switch (currentAction) {
      case "raise":
        nextAction = "call"
        break
      case "call":
        nextAction = "3bet"
        break
      case "3bet":
        nextAction = "fold"
        break
      case "fold":
        nextAction = null
        break
      default:
        nextAction = "raise"
    }

    updateHandAction(selectedPosition, row, col, nextAction)
  }

  // Generate hand notation (e.g., "AKs" or "AKo")
  const getHandNotation = (row: number, col: number) => {
    if (row === col) {
      return `${ranks[row]}${ranks[col]}`
    } else if (row < col) {
      return `${ranks[row]}${ranks[col]}s`
    } else {
      return `${ranks[col]}${ranks[row]}o`
    }
  }

  // Determine if a hand is a pair, suited, or offsuit
  const getHandType = (row: number, col: number) => {
    if (row === col) return "pair"
    if (row < col) return "suited"
    return "offsuit"
  }

  return (
    <div className="range-chart-container">
      <table className="range-chart">
        <tbody>
          {ranks.map((rowRank, rowIndex) => (
            <tr key={`row-${rowRank}`}>
              {ranks.map((colRank, colIndex) => {
                const action = handMatrix[rowIndex][colIndex]
                const handType = getHandType(rowIndex, colIndex)

                return (
                  <td
                    key={`cell-${rowIndex}-${colIndex}`}
                    className={cn(
                      "hand-cell",
                      `hand-type-${handType}`,
                      action && getActionColor(action),
                      isEditable && "editable",
                    )}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                  >
                    {getHandNotation(rowIndex, colIndex)}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
