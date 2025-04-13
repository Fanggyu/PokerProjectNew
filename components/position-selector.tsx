"use client"

import { useRangeStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { PositionType } from "@/lib/types"

export function PositionSelector() {
  const { selectedPosition, setSelectedPosition } = useRangeStore()

  const positions: { label: string; value: PositionType }[] = [
    { label: "UTG", value: "UTG" },
    { label: "MP", value: "MP" },
    { label: "CO", value: "CO" },
    { label: "BTN", value: "BTN" },
    { label: "SB", value: "SB" },
    { label: "BB", value: "BB" },
  ]

  return (
    <div className="flex flex-nowrap justify-between gap-1.5">
      {positions.map((position) => (
        <Button
          key={position.value}
          variant="outline"
          className={cn(
            "flex-1 min-w-0 px-2 py-1 text-xs sm:text-sm text-gold-500",
            selectedPosition === position.value 
              ? "font-extrabold border-2 border-gold-500 hover:text-gold-600" 
              : "border-gold-500 hover:bg-gold-500/10"
          )}
          onClick={() => setSelectedPosition(position.value)}
        >
          {position.label}
        </Button>
      ))}
    </div>
  )
}
