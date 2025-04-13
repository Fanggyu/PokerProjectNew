"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { defaultRanges } from "./default-ranges"
import type { ActionType, CustomRanges, HandMatrix, PositionType, RangeData } from "./types"

interface RangeState {
  // State
  selectedPosition: PositionType
  userRanges: RangeData
  customRanges: CustomRanges
  compareMode: boolean

  // Actions
  setSelectedPosition: (position: PositionType) => void
  updateHandAction: (position: PositionType, row: number, col: number, action: ActionType) => void
  saveCustomRange: (position: PositionType, name: string) => void
  loadCustomRange: (position: PositionType, name: string) => void
  resetToDefault: () => void
  toggleCompareMode: () => void
  initializeStore: () => void

  // Selectors
  getHandMatrix: (position: PositionType, isDefault: boolean) => HandMatrix
  getActionColor: (action: ActionType) => string
}

export const useRangeStore = create<RangeState>()(
  persist(
    (set, get) => ({
      // Initial state
      selectedPosition: "UTG",
      userRanges: JSON.parse(JSON.stringify(defaultRanges)), // Deep clone default ranges
      customRanges: {},
      compareMode: false,

      // Actions
      setSelectedPosition: (position) => set({ selectedPosition: position }),

      updateHandAction: (position, row, col, action) => {
        set((state) => {
          const newUserRanges = { ...state.userRanges }
          newUserRanges[position] = [...newUserRanges[position]]
          newUserRanges[position][row] = [...newUserRanges[position][row]]
          newUserRanges[position][row][col] = action
          return { userRanges: newUserRanges }
        })
      },

      saveCustomRange: (position, name) => {
        set((state) => {
          const newCustomRanges = { ...state.customRanges }
          if (!newCustomRanges[position]) {
            newCustomRanges[position] = {}
          }
          // Deep clone the current user range for this position
          newCustomRanges[position]![name] = JSON.parse(JSON.stringify(state.userRanges[position]))
          return { customRanges: newCustomRanges }
        })
      },

      loadCustomRange: (position, name) => {
        set((state) => {
          const customRange = state.customRanges[position]?.[name]
          if (!customRange) return state

          const newUserRanges = { ...state.userRanges }
          newUserRanges[position] = JSON.parse(JSON.stringify(customRange))
          return { userRanges: newUserRanges }
        })
      },

      resetToDefault: () => {
        set((state) => {
          const newUserRanges = { ...state.userRanges }
          newUserRanges[state.selectedPosition] = JSON.parse(JSON.stringify(defaultRanges[state.selectedPosition]))
          return { userRanges: newUserRanges }
        })
      },

      toggleCompareMode: () => set((state) => ({ compareMode: !state.compareMode })),

      initializeStore: () => {
        // This function ensures the store is properly initialized
        // It's called when the app loads
        set((state) => {
          // If userRanges is empty, initialize it with default ranges
          if (!state.userRanges || Object.keys(state.userRanges).length === 0) {
            return { userRanges: JSON.parse(JSON.stringify(defaultRanges)) }
          }
          return state
        })
      },

      // Selectors
      getHandMatrix: (position, isDefault) => {
        return isDefault ? defaultRanges[position] : get().userRanges[position]
      },

      getActionColor: (action) => {
        switch (action) {
          case "raise":
            return "bg-green-500"
          case "call":
            return "bg-blue-500"
          case "3bet":
            return "bg-purple-500"
          case "fold":
            return "bg-red-500"
          default:
            return "bg-gray-200"
        }
      },
    }),
    {
      name: "poker-range-storage",
      partialize: (state) => ({
        userRanges: state.userRanges,
        customRanges: state.customRanges,
      }),
    },
  ),
)
