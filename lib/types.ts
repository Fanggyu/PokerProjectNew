export type ActionType = "raise" | "call" | "3bet" | "fold" | null

export type PositionType = "UTG" | "MP" | "CO" | "BTN" | "SB" | "BB"

export type HandMatrix = ActionType[][]

export type RangeData = {
  [position in PositionType]: HandMatrix
}

export type CustomRanges = {
  [position in PositionType]?: {
    [name: string]: HandMatrix
  }
}
