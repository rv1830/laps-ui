"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Flame, Clock, Calendar, Plus } from "lucide-react"
import type React from "react"

interface Segment {
  id: string
  label: string
  count: number
  icon: React.ComponentType<{ className?: string }>
}

const segments: Segment[] = [
  { id: "all", label: "All Leads", count: 248, icon: Users },
  { id: "new", label: "New", count: 12, icon: Users },
  { id: "hot", label: "Hot Leads", count: 18, icon: Flame },
  { id: "no_response", label: "No Response 7d", count: 34, icon: Clock },
  { id: "booked_this_week", label: "Booked This Week", count: 8, icon: Calendar },
]

interface LeadSegmentsProps {
  selectedSegment: string
  onSelectSegment: (segment: string) => void
}

export function LeadSegments({ selectedSegment, onSelectSegment }: LeadSegmentsProps) {
  return (
    <aside className="w-56 border-r border-border bg-card p-4 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-foreground">Segments</h3>
        <Button variant="ghost" size="icon" className="h-7 w-7">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <nav className="space-y-1 flex-1">
        {segments.map((segment) => {
          const Icon = segment.icon
          const isActive = selectedSegment === segment.id
          return (
            <Button
              key={segment.id}
              variant="ghost"
              className={cn(
                "w-full justify-between h-9 px-3",
                isActive && "bg-primary/10 text-primary hover:bg-primary/10",
              )}
              onClick={() => onSelectSegment(segment.id)}
            >
              <span className="flex items-center gap-2">
                <Icon className="h-4 w-4" />
                <span className="text-sm">{segment.label}</span>
              </span>
              <Badge variant="secondary" className="text-xs">
                {segment.count}
              </Badge>
            </Button>
          )
        })}
      </nav>

      <div className="pt-4 border-t border-border">
        <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-muted-foreground">
          <Plus className="h-4 w-4" />
          Create Segment
        </Button>
      </div>
    </aside>
  )
}
