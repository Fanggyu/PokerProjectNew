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
    <div className="flex flex-wrap justify-center gap-2">
      {positions.map((position) => (
        <Button
          key={position.value}
          variant="outline"
          className={cn(
            "min-w-[80px] text-gold-500",
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
