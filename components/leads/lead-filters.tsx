"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface LeadFiltersProps {
  filters: Record<string, string>
  onFiltersChange: (filters: Record<string, string>) => void
}

export function LeadFilters({ filters, onFiltersChange }: LeadFiltersProps) {
  const activeFilters = Object.entries(filters).filter(([key, value]) => value && key !== 'page')

  const handleFilterUpdate = (key: string, value: string) => {
    const newFilters: Record<string, string> = { ...filters, page: "1" }; 
    if (value === "all" || !value) {
      delete newFilters[key];
    } else {
      newFilters[key] = value;
    }
    onFiltersChange(newFilters);
  }

  const clearFilter = (key: string) => {
    const newFilters: Record<string, string> = { ...filters, page: "1" }
    delete newFilters[key]
    onFiltersChange(newFilters)
  }

  const clearAllFilters = () => {
    onFiltersChange({ page: "1" })
  }

  return (
    <div className="p-4 border-b border-border bg-card">
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search leads by name, email, or company..."
            className="pl-9"
            value={filters.search || ""}
            onChange={(e) => onFiltersChange({ ...filters, search: e.target.value, page: "1" })}
          />
        </div>

        {/* Stage Filter - Values strictly matched with WorkspaceController names */}
        <Select
          value={filters.stageId || "all"}
          onValueChange={(value) => handleFilterUpdate("stageId", value)}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="All Stages" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Stages</SelectItem>
            <SelectItem value="New Lead">New Lead</SelectItem>
            <SelectItem value="Contacted">Contacted</SelectItem>
            <SelectItem value="Replied">Replied</SelectItem>
            <SelectItem value="Call Booked">Call Booked</SelectItem>
            <SelectItem value="Presented">Presented</SelectItem>
            <SelectItem value="Proposal Sent">Proposal Sent</SelectItem>
            <SelectItem value="Won">Won</SelectItem>
            <SelectItem value="Lost">Lost</SelectItem>
          </SelectContent>
        </Select>

        {/* Source Filter */}
        <Select
          value={filters.source || "all"}
          onValueChange={(value) => handleFilterUpdate("source", value)}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="All Sources" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="text-xs">All Sources</SelectItem>
            <SelectItem value="manual" className="text-xs">Manual Entry</SelectItem>
            <SelectItem value="website" className="text-xs">Website Form</SelectItem>
            <SelectItem value="linkedin" className="text-xs">LinkedIn</SelectItem>
            <SelectItem value="referral" className="text-xs">Referral</SelectItem>
            <SelectItem value="cold_outreach" className="text-xs">Cold Outreach</SelectItem>
            <SelectItem value="google_ads" className="text-xs">Google Ads</SelectItem>
            <SelectItem value="others" className="text-xs">Others</SelectItem>
          </SelectContent>
        </Select>

        {/* Mood Filter */}
        <Select
          value={filters.moodLabel || "all"}
          onValueChange={(value) => handleFilterUpdate("moodLabel", value)}
        >
          <SelectTrigger className="w-36">
            <SelectValue placeholder="All Moods" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Moods</SelectItem>
            <SelectItem value="positive">Positive</SelectItem>
            <SelectItem value="neutral">Neutral</SelectItem>
            <SelectItem value="negative">Negative</SelectItem>
            <SelectItem value="unknown">Unknown</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" size="icon">
          <SlidersHorizontal className="h-4 w-4" />
        </Button>
      </div>

      {/* Active Filters Display */}
      {activeFilters.length > 0 && (
        <div className="flex items-center gap-2 mt-3">
          <span className="text-xs text-muted-foreground">Active filters:</span>
          {activeFilters.map(([key, value]) => (
            <Badge key={key} variant="secondary" className="gap-1">
              {key === 'stageId' ? 'Stage' : key === 'moodLabel' ? 'Mood' : key}: {value}
              <button onClick={() => clearFilter(key)} className="ml-1 hover:text-destructive">
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          <Button variant="ghost" size="sm" className="h-6 text-xs" onClick={clearAllFilters}>
            Clear all
          </Button>
        </div>
      )}
    </div>
  )
}