"use client"

import { useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { stageLabels, moodColors } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { Sparkles, Info, Loader2, User } from "lucide-react"
import { leadService } from "@/services/lead"
import { toast } from "sonner"

export function LeadDetailHeader({ lead, workspaceId }: { lead: any, workspaceId: string }) {
  const [isUpdating, setIsUpdating] = useState(false)

  const handleStageChange = async (newStage: string) => {
    try {
      setIsUpdating(true)
      await leadService.updateLead(workspaceId, lead.id, { stageId: newStage })
      toast.success("Stage updated successfully")
    } catch (error) {
      toast.error("Failed to update stage")
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="px-6 py-4 border-b border-border bg-card">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-5">
          <Avatar className="h-16 w-16 border-2 border-background shadow-sm">
            <AvatarFallback className="bg-primary/5 text-primary text-xl font-bold uppercase">
              {(lead.fullName || lead.email).substring(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                {lead.fullName || lead.email}
              </h1>
              <Badge variant="outline" className={cn("capitalize px-2 py-0", moodColors[lead.moodLabel])}>
                {lead.moodLabel}
              </Badge>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5" />
                <span>{lead.owner ? `${lead.owner.firstName} ${lead.owner.lastName}` : "Unassigned"}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-2">
                <div className="w-20 h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${lead.moodScore}%` }} />
                </div>
                <span className="text-xs font-medium">{lead.moodScore}% Mood</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Select defaultValue={lead.stage?.id || lead.stageId} onValueChange={handleStageChange} disabled={isUpdating}>
            <SelectTrigger className="w-48 h-9 font-medium">
              {isUpdating ? <Loader2 className="h-4 w-4 animate-spin" /> : <SelectValue placeholder="Move Stage" />}
            </SelectTrigger>
            <SelectContent>
              {Object.entries(stageLabels).map(([id, label]) => (
                <SelectItem key={id} value={id}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="gap-2 border-primary/20 hover:bg-primary/5 text-primary">
            <Sparkles className="h-4 w-4" /> AI Assist
          </Button>
        </div>
      </div>
    </div>
  )
}