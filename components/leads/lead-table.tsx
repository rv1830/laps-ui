"use client"

import { useState } from "react"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Mail, Phone, Calendar, FileText, ArrowUpDown } from "lucide-react"
import { mockLeads, stageLabels, stageColors, moodColors } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { formatDistanceToNow } from "date-fns"

interface LeadTableProps {
  segment: string
  filters: Record<string, string>
}

export function LeadTable({ segment, filters }: LeadTableProps) {
  const [selectedLeads, setSelectedLeads] = useState<string[]>([])
  const [sortColumn, setSortColumn] = useState<string>("lastActivity")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  // Filter leads based on segment and filters
  let filteredLeads = [...mockLeads]

  if (segment === "new") {
    filteredLeads = filteredLeads.filter((lead) => lead.stage === "new")
  } else if (segment === "hot") {
    filteredLeads = filteredLeads.filter((lead) => lead.moodScore === "positive" && lead.moodConfidence > 70)
  }

  if (filters.search) {
    const search = filters.search.toLowerCase()
    filteredLeads = filteredLeads.filter(
      (lead) =>
        lead.name.toLowerCase().includes(search) ||
        lead.email.toLowerCase().includes(search) ||
        lead.company?.toLowerCase().includes(search),
    )
  }

  if (filters.stage && filters.stage !== "all") {
    filteredLeads = filteredLeads.filter((lead) => lead.stage === filters.stage)
  }

  // Sort leads
  filteredLeads.sort((a, b) => {
    const aValue = a[sortColumn as keyof typeof a]
    const bValue = b[sortColumn as keyof typeof b]
    if (aValue instanceof Date && bValue instanceof Date) {
      return sortDirection === "asc" ? aValue.getTime() - bValue.getTime() : bValue.getTime() - aValue.getTime()
    }
    return 0
  })

  const toggleSelectAll = () => {
    if (selectedLeads.length === filteredLeads.length) {
      setSelectedLeads([])
    } else {
      setSelectedLeads(filteredLeads.map((l) => l.id))
    }
  }

  const toggleSelectLead = (id: string) => {
    setSelectedLeads((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  const toggleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("desc")
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Bulk Actions */}
      {selectedLeads.length > 0 && (
        <div className="p-3 bg-primary/5 border-b border-border flex items-center gap-4">
          <span className="text-sm text-foreground font-medium">{selectedLeads.length} leads selected</span>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline">
              Add to Sequence
            </Button>
            <Button size="sm" variant="outline">
              Change Stage
            </Button>
            <Button size="sm" variant="outline">
              Add Tags
            </Button>
            <Button size="sm" variant="outline">
              Assign Owner
            </Button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <Table>
          <TableHeader className="sticky top-0 bg-card z-10">
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedLeads.length === filteredLeads.length && filteredLeads.length > 0}
                  onCheckedChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead>Lead</TableHead>
              <TableHead>
                <Button variant="ghost" size="sm" className="gap-1 -ml-3" onClick={() => toggleSort("stage")}>
                  Stage <ArrowUpDown className="h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>Mood</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>
                <Button variant="ghost" size="sm" className="gap-1 -ml-3" onClick={() => toggleSort("lastActivity")}>
                  Last Activity <ArrowUpDown className="h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead className="w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLeads.map((lead) => (
              <TableRow key={lead.id} className="group">
                <TableCell>
                  <Checkbox
                    checked={selectedLeads.includes(lead.id)}
                    onCheckedChange={() => toggleSelectLead(lead.id)}
                  />
                </TableCell>
                <TableCell>
                  <Link href={`/leads/${lead.id}`} className="flex items-center gap-3 hover:opacity-80">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {lead.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-foreground">{lead.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {lead.company} • {lead.email}
                      </p>
                    </div>
                  </Link>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={cn("text-xs", stageColors[lead.stage], "text-foreground")}>
                    {stageLabels[lead.stage]}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={cn("text-xs capitalize", moodColors[lead.moodScore])}>
                      {lead.moodScore}
                    </Badge>
                    {lead.moodConfidence > 0 && (
                      <span className="text-xs text-muted-foreground">{lead.moodConfidence}%</span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">{lead.source || "-"}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">
                    {formatDistanceToNow(lead.lastActivity, { addSuffix: true })}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Mail className="h-4 w-4" />
                    </Button>
                    {lead.phone && (
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Phone className="h-4 w-4" />
                      </Button>
                    )}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Calendar className="mr-2 h-4 w-4" /> Book Meeting
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <FileText className="mr-2 h-4 w-4" /> Create Proposal
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Edit Lead</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Delete Lead</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="p-4 border-t border-border bg-card flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Showing {filteredLeads.length} of 248 leads</span>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
