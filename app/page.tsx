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
    <main className="w-full max-w-[393px] mx-auto px-2 py-4">
      <h1 className="text-xl font-bold mb-4 text-center text-gold-500">Poker Dream Winning Secret</h1>

      <div className="mb-3 casino-card p-2">
        <PositionSelector />
      </div>

      <div className="mb-3 casino-card p-2">
        <ActionLegend />
      </div>

      <div className="casino-card p-2">
        <div className="flex flex-col gap-2 mb-3">
          <h2 className="text-base font-semibold text-gold-500">Range for {selectedPosition}</h2>
          <Button 
            variant="outline" 
            onClick={resetToDefault} 
            className="w-full border-gold-500 text-gold-500 hover:bg-gold-500/10"
          >
            Reset to Default
          </Button>
        </div>
        <RangeChart isEditable={true} />
      </div>

      <div className="mt-4">
        <TestGemini />
      </div>
    </main>
  )
}
