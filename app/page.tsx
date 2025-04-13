"use client"

import { useEffect } from "react"
import { RangeChart } from "@/components/range-chart"
import { PositionSelector } from "@/components/position-selector"
import { ActionLegend } from "@/components/action-legend"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useRangeStore } from "@/lib/store"
import TestGemini from '@/components/TestGemini'

export default function HomePage() {
  const { selectedPosition, compareMode, toggleCompareMode, resetToDefault, initializeStore } = useRangeStore()

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

      <div className="flex flex-col lg:flex-row gap-6 mb-6">
        <div className="flex-1 casino-card p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gold-500">{compareMode ? "Your Range" : `Range for ${selectedPosition}`}</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <Switch id="compare-mode" checked={compareMode} onCheckedChange={toggleCompareMode} />
                <Label htmlFor="compare-mode" className="text-gold-500">Compare Mode</Label>
              </div>
              <Button variant="outline" onClick={resetToDefault} className="border-gold-500 text-gold-500 hover:bg-gold-500/10">
                Reset to Default
              </Button>
            </div>
          </div>
          <RangeChart isEditable={true} isDefaultRange={false} />
        </div>

        {compareMode && (
          <div className="flex-1 casino-card p-4">
            <h2 className="text-xl font-semibold mb-4 text-gold-500">Daniel's Default Range</h2>
            <RangeChart isEditable={false} isDefaultRange={true} />
          </div>
        )}
      </div>

      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <TestGemini />
      </div>
    </main>
  )
}
