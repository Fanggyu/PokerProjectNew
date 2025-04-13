"use client"

import { useState } from "react"
import { useRangeStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

export function SaveRangeForm() {
  const [rangeName, setRangeName] = useState("")
  const { selectedPosition, saveCustomRange } = useRangeStore()
  const { toast } = useToast()

  const handleSave = () => {
    if (!rangeName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a name for your range",
        variant: "destructive",
      })
      return
    }

    saveCustomRange(selectedPosition, rangeName)
    toast({
      title: "Range Saved",
      description: `Your custom range "${rangeName}" for ${selectedPosition} has been saved.`,
    })
    setRangeName("")
  }

  return (
    <div className="flex gap-2">
      <Input
        placeholder="Enter range name..."
        value={rangeName}
        onChange={(e) => setRangeName(e.target.value)}
        className="flex-1"
      />
      <Button onClick={handleSave}>Save Range</Button>
    </div>
  )
}
