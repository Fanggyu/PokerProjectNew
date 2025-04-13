export function ActionLegend() {
  const legendItems = [
    { action: "raise", label: "Raise", color: "bg-green-500" },
    { action: "call", label: "Call", color: "bg-blue-500" },
    { action: "3bet", label: "3-Bet", color: "bg-purple-500" },
    { action: "fold", label: "Fold", color: "bg-red-500" },
  ]

  return (
    <div className="border rounded-md p-4">
      <div className="flex flex-wrap gap-4">
        {legendItems.map((item) => (
          <div key={item.action} className="flex items-center gap-2">
            <div className={`${item.color} w-6 h-6 border border-gray-300 rounded`}></div>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
