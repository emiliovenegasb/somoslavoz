"use client"

import type { MinisterioAgenda } from "@/lib/agenda"
import { MINISTERIO_FILTERS } from "@/lib/agenda"
import { cn } from "@/lib/utils"

type FilterValue = MinisterioAgenda | "Todos"

export function AgendaFilters({
  value,
  onChange,
}: {
  value: FilterValue
  onChange: (value: FilterValue) => void
}) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none -mx-1 px-1">
      {MINISTERIO_FILTERS.map((filter) => (
        <button
          key={filter}
          type="button"
          onClick={() => onChange(filter)}
          className={cn(
            "shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
            value === filter
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground",
          )}
        >
          {filter === "Mujeres" ? "Mujeres" : filter}
        </button>
      ))}
    </div>
  )
}
