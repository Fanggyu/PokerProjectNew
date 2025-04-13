"use client"

import { useRangeStore } from "@/lib/store"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

export function LoadRangeSelector() {
  const { selectedPosition, customRanges, loadCustomRange } = useRangeStore()
  const { toast } = useToast()

  // Get custom ranges for the current position
  const positionRanges = customRanges[selectedPosition] || {}
  const rangeNames = Object.keys(positionRanges)

  const handleLoadRange = (rangeName: string) => {
    loadCustomRange(selectedPosition, rangeName)
    toast({
      title: "Range Loaded",
      description: `Loaded custom range "${rangeName}" for ${selectedPosition}.`,
    })
  }

  if (rangeNames.length === 0) {
    return <div className="text-gray-500 italic">No custom ranges saved for {selectedPosition} position.</div>
  }

  return (
    <div className="flex gap-2">
      <Select onValueChange={handleLoadRange}>
        <SelectTrigger className="flex-1">
          <SelectValue placeholder="Select a saved range" />
        </SelectTrigger>
        <SelectContent>
          {rangeNames.map((name) => (
            <SelectItem key={name} value={name}>
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
