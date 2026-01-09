"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Mail, Phone, GripVertical } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

export function PipelineCard({ lead, workspaceId }: { lead: any, workspaceId: string }) {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("leadId", lead.id)
    e.currentTarget.classList.add("opacity-50")
  }

  const handleDragEnd = (e: React.DragEvent) => {
    e.currentTarget.classList.remove("opacity-50")
  }

  return (
    <Card
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className="cursor-grab active:cursor-grabbing hover:shadow-md transition-all group border-none shadow-sm bg-background"
    >
      <CardContent className="p-3">
        <div className="flex items-start justify-between mb-3">
          <Link href={`/dashboard/${workspaceId}/leads/${lead.id}`} className="flex items-center gap-2 min-w-0">
            <Avatar className="h-8 w-8 border border-muted">
              <AvatarFallback className="bg-primary/5 text-primary text-[10px] font-bold">
                {lead.fullName?.substring(0, 2).toUpperCase() || "L"}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="text-sm font-semibold truncate text-foreground leading-tight">
                {lead.fullName}
              </p>
              <p className="text-[11px] text-muted-foreground truncate uppercase tracking-wider">
                {lead.company || "No Company"}
              </p>
            </div>
          </Link>

          <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="text-xs">
                  <Mail className="mr-2 h-3 w-3" /> Send Email
                </DropdownMenuItem>
                <DropdownMenuItem className="text-xs text-destructive">
                  Delete Lead
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <GripVertical className="h-4 w-4 text-muted-foreground/30 ml-1" />
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <Badge 
            variant="outline" 
            className={cn("text-[10px] px-1.5 py-0 font-medium capitalize", 
              lead.moodLabel === 'positive' && 'border-green-200 text-green-700 bg-green-50',
              lead.moodLabel === 'negative' && 'border-red-200 text-red-700 bg-red-50',
              lead.moodLabel === 'neutral' && 'border-blue-200 text-blue-700 bg-blue-50'
            )}
          >
            {lead.moodLabel || 'Neutral'}
          </Badge>
          
          <span className="text-[10px] text-muted-foreground font-medium italic">
            {lead.source || 'Import'}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}