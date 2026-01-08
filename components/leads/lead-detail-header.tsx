"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { stageLabels, moodColors } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { Sparkles, Loader2, User, Mail, ChevronRight, Activity } from "lucide-react"
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
    <div className="sticky top-0 z-10 w-full border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6 py-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        
        {/* Left Side: Lead Profile Info */}
        <div className="flex items-center gap-6">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-blue-600 rounded-full opacity-20 group-hover:opacity-40 transition duration-300 blur"></div>
            <Avatar className="h-16 w-16 border-2 border-background shadow-xl">
              <AvatarImage src={lead.avatarUrl} alt={lead.fullName} />
              <AvatarFallback className="bg-gradient-to-br from-primary/10 to-primary/5 text-primary text-xl font-bold uppercase">
                {(lead.fullName || lead.email).substring(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className={cn(
              "absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-background",
              lead.moodScore > 70 ? "bg-green-500" : "bg-orange-500"
            )} />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl font-extrabold tracking-tight text-foreground/90">
                {lead.fullName || lead.email}
              </h1>
              <Badge 
                variant="secondary" 
                className={cn(
                  "font-semibold transition-all duration-300 shadow-sm border", 
                  moodColors[lead.moodLabel]
                )}
              >
                <Activity className="mr-1 h-3 w-3" />
                {lead.moodLabel}
              </Badge>
            </div>
            
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-sm font-medium text-muted-foreground">
              <div className="flex items-center gap-1.5 hover:text-foreground transition-colors cursor-default">
                <User className="h-4 w-4 text-primary/70" />
                <span>{lead.owner ? `${lead.owner.firstName} ${lead.owner.lastName}` : "Unassigned"}</span>
              </div>
              <span className="hidden md:inline text-border">•</span>
              <div className="flex items-center gap-1.5 hover:text-foreground transition-colors cursor-default">
                <Mail className="h-4 w-4 text-primary/70" />
                <span>{lead.email}</span>
              </div>
              <span className="hidden md:inline text-border">•</span>
              <div className="flex items-center gap-3 bg-secondary/30 px-2.5 py-1 rounded-full border border-border/50">
                <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-blue-500 transition-all duration-500" 
                    style={{ width: `${lead.moodScore}%` }} 
                  />
                </div>
                <span className="text-[11px] uppercase tracking-wider font-bold text-foreground/70">{lead.moodScore}% Score</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Actions */}
        <div className="flex items-center gap-3 self-end md:self-center">
          <div className="flex items-center rounded-lg border border-border bg-muted/30 p-1">
            <Select 
              defaultValue={lead.stage?.id || lead.stageId} 
              onValueChange={handleStageChange} 
              disabled={isUpdating}
            >
              <SelectTrigger className="w-40 h-8 border-none bg-transparent focus:ring-0 shadow-none font-semibold text-sm">
                {isUpdating ? <Loader2 className="h-4 w-4 animate-spin" /> : <SelectValue placeholder="Stage" />}
              </SelectTrigger>
              <SelectContent align="end" className="rounded-xl">
                {Object.entries(stageLabels).map(([id, label]) => (
                  <SelectItem key={id} value={id} className="rounded-lg m-1 cursor-pointer">
                    <div className="flex items-center gap-2">
                       <ChevronRight className="h-3 w-3 opacity-50" />
                       {label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button 
            variant="default" 
            size="sm" 
            className="h-9 px-4 gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 transition-all active:scale-95"
          >
            <Sparkles className="h-4 w-4 fill-current" /> 
            <span className="hidden sm:inline">AI Insights</span>
            <span className="sm:hidden">AI</span>
          </Button>
        </div>
      </div>
    </div>
  )
}