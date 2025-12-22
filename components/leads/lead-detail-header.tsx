"use client"

import type { Lead } from "@/lib/types"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { stageLabels, moodColors } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { Sparkles, Info } from "lucide-react"

interface LeadDetailHeaderProps {
  lead: Lead
}

export function LeadDetailHeader({ lead }: LeadDetailHeaderProps) {
  return (
    <div className="px-6 py-4 border-b border-border bg-card">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="bg-primary/10 text-primary text-xl">
              {lead.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold text-foreground">{lead.name}</h1>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge variant="outline" className={cn("capitalize gap-1", moodColors[lead.moodScore])}>
                      {lead.moodScore}
                      <Info className="h-3 w-3" />
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Mood confidence: {lead.moodConfidence}%</p>
                    <p className="text-xs text-muted-foreground">Based on email sentiment analysis</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <p className="text-muted-foreground">
              {lead.company} • {lead.email}
            </p>
            <div className="flex items-center gap-2 mt-2">
              {lead.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Stage Selector */}
          <Select defaultValue={lead.stage}>
            <SelectTrigger className="w-44">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(stageLabels).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* AI Actions */}
          <Button variant="outline" className="gap-2 bg-transparent">
            <Sparkles className="h-4 w-4" />
            AI Assist
          </Button>
        </div>
      </div>
    </div>
  )
}
