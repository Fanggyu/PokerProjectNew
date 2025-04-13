"use client"

import { useEffect } from "react"
import { RangeChart } from "@/components/range-chart"
import { PositionSelector } from "@/components/position-selector"
import { ActionLegend } from "@/components/action-legend"
import { Button } from "@/components/ui/button"
import { useRangeStore } from "@/lib/store"
import TestGemini from '@/components/TestGemini'

export default function HomePage() {
  const { selectedPosition, resetToDefault, initializeStore } = useRangeStore()

  // Initialize the store on component mount
  useEffect(() => {
    initializeStore()
  }, [initializeStore])

  return (
    <main className="w-full max-w-[393px] mx-auto px-1 py-2">
      <h1 className="text-lg font-bold mb-2 text-center text-gold-500">Poker Dream Winning Secret</h1>

      <div className="mb-2 casino-card p-1">
        <PositionSelector />
      </div>

      <div className="mb-2 casino-card p-1">
        <ActionLegend />
      </div>

      <div className="casino-card p-1">
        <div className="flex flex-col gap-1 mb-2">
          <h2 className="text-sm font-semibold text-gold-500">Range for {selectedPosition}</h2>
          <Button 
            variant="outline" 
            onClick={resetToDefault} 
            className="w-full border-gold-500 text-gold-500 hover:bg-gold-500/10 py-1"
          >
            Reset to Default
          </Button>
        </div>
        <div className="w-full aspect-square">
          <RangeChart isEditable={true} />
        </div>
      </div>

      <div className="mt-2">
        <TestGemini />
      </div>
    </main>
  )
}
