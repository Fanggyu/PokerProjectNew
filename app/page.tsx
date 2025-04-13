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
    <main className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-4xl font-bold mb-8 text-center text-gold-500">Poker Dream Winning Secret</h1>

      <div className="mb-6 casino-card p-4">
        <PositionSelector />
      </div>

      <div className="mb-6 casino-card p-4">
        <ActionLegend />
      </div>

      <div className="casino-card p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gold-500">Range for {selectedPosition}</h2>
          <Button variant="outline" onClick={resetToDefault} className="border-gold-500 text-gold-500 hover:bg-gold-500/10">
            Reset to Default
          </Button>
        </div>
        <RangeChart isEditable={true} />
      </div>

      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <TestGemini />
      </div>
    </main>
  )
}
