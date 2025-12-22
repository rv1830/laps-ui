"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Mail, Phone, Calendar, FileText, Plus, GripVertical } from "lucide-react"
import { cn } from "@/lib/utils"
import { mockLeads, moodColors } from "@/lib/mock-data"
import type { Lead, LeadStage } from "@/lib/types"
import Link from "next/link"

interface Stage {
  id: LeadStage
  label: string
  color: string
}

const stages: Stage[] = [
  { id: "new", label: "New", color: "bg-chart-5" },
  { id: "contacted", label: "Contacted", color: "bg-chart-2" },
  { id: "replied", label: "Replied", color: "bg-chart-1" },
  { id: "qualified", label: "Qualified", color: "bg-primary" },
  { id: "call_booked", label: "Call Booked", color: "bg-chart-3" },
  { id: "presented", label: "Presented", color: "bg-chart-4" },
  { id: "proposal_sent", label: "Proposal Sent", color: "bg-warning" },
  { id: "won", label: "Won", color: "bg-success" },
  { id: "lost", label: "Lost", color: "bg-destructive" },
]

export function PipelineBoard() {
  const [leads, setLeads] = useState(mockLeads)
  const [draggedLead, setDraggedLead] = useState<Lead | null>(null)
  const [dragOverStage, setDragOverStage] = useState<LeadStage | null>(null)

  const handleDragStart = (lead: Lead) => {
    setDraggedLead(lead)
  }

  const handleDragOver = (e: React.DragEvent, stageId: LeadStage) => {
    e.preventDefault()
    setDragOverStage(stageId)
  }

  const handleDragLeave = () => {
    setDragOverStage(null)
  }

  const handleDrop = (stageId: LeadStage) => {
    if (draggedLead) {
      setLeads((prev) => prev.map((lead) => (lead.id === draggedLead.id ? { ...lead, stage: stageId } : lead)))
    }
    setDraggedLead(null)
    setDragOverStage(null)
  }

  const getLeadsForStage = (stageId: LeadStage) => leads.filter((lead) => lead.stage === stageId)

  return (
    <div className="flex h-full overflow-x-auto p-4 gap-4">
      {stages.map((stage) => {
        const stageLeads = getLeadsForStage(stage.id)
        const isDragOver = dragOverStage === stage.id

        return (
          <div
            key={stage.id}
            className="flex flex-col w-72 min-w-72 flex-shrink-0"
            onDragOver={(e) => handleDragOver(e, stage.id)}
            onDragLeave={handleDragLeave}
            onDrop={() => handleDrop(stage.id)}
          >
            {/* Stage Header */}
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="flex items-center gap-2">
                <div className={cn("w-3 h-3 rounded-full", stage.color)} />
                <span className="font-medium text-foreground text-sm">{stage.label}</span>
                <Badge variant="secondary" className="text-xs">
                  {stageLeads.length}
                </Badge>
              </div>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* Stage Column */}
            <div
              className={cn(
                "flex-1 rounded-lg p-2 space-y-2 overflow-y-auto transition-colors",
                isDragOver ? "bg-primary/10 border-2 border-dashed border-primary" : "bg-muted/30",
              )}
            >
              {stageLeads.map((lead) => (
                <PipelineCard key={lead.id} lead={lead} onDragStart={() => handleDragStart(lead)} />
              ))}

              {stageLeads.length === 0 && (
                <div className="text-center py-8 text-sm text-muted-foreground">No leads in this stage</div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function PipelineCard({ lead, onDragStart }: { lead: Lead; onDragStart: () => void }) {
  return (
    <Card
      draggable
      onDragStart={onDragStart}
      className="cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow group"
    >
      <CardContent className="p-3">
        <div className="flex items-start justify-between mb-2">
          <Link href={`/leads/${lead.id}`} className="flex items-center gap-2 hover:opacity-80">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary/10 text-primary text-xs">
                {lead.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-foreground leading-tight">{lead.name}</p>
              <p className="text-xs text-muted-foreground">{lead.company}</p>
            </div>
          </Link>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Mail className="mr-2 h-4 w-4" /> Send Email
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Phone className="mr-2 h-4 w-4" /> Call
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Calendar className="mr-2 h-4 w-4" /> Book Meeting
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FileText className="mr-2 h-4 w-4" /> Create Proposal
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>View Details</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Badge variant="outline" className={cn("text-xs capitalize", moodColors[lead.moodScore])}>
            {lead.moodScore}
          </Badge>
          {lead.source && <span className="text-xs text-muted-foreground">{lead.source}</span>}
        </div>

        {lead.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {lead.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs py-0">
                {tag}
              </Badge>
            ))}
            {lead.tags.length > 2 && (
              <Badge variant="secondary" className="text-xs py-0">
                +{lead.tags.length - 2}
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
