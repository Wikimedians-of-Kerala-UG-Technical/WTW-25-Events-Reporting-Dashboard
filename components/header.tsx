"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface HeaderProps {
  title: string
  dateRange: { from: string; to: string }
  onDateChange: (range: { from: string; to: string }) => void
}

export default function Header({ title, dateRange, onDateChange }: HeaderProps) {
  return (
    <header className="bg-white px-8 py-6 border-b border-slate-200 flex justify-between items-center flex-wrap gap-4 sticky top-0 z-40 max-md:px-4 max-md:py-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
        <p className="text-slate-500 text-sm mt-1">Combined Wikimedia Projects Overview</p>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <label className="text-sm text-slate-500 font-medium">From:</label>
          <Input
            type="date"
            value={dateRange.from}
            onChange={(e) => onDateChange({ ...dateRange, from: e.target.value })}
            className="w-36"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-slate-500 font-medium">To:</label>
          <Input
            type="date"
            value={dateRange.to}
            onChange={(e) => onDateChange({ ...dateRange, to: e.target.value })}
            className="w-36"
          />
        </div>
        <Button>Apply Filter</Button>
      </div>
    </header>
  )
}
