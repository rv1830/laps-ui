"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Mail, Phone, GripVertical, Building2, MessageCircle, Target } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

export function PipelineCard({ lead, workspaceId }: { lead: any, workspaceId: string }) {
  // Mapping display fields from your JSON structure
  const displayPhone = lead.phone;
  const displayEmail = lead.email;
  const initials = `${lead.firstName?.[0] || ""}${lead.lastName?.[0] || ""}`.toUpperCase();

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("leadId", lead.id)
    e.currentTarget.classList.add("opacity-50", "scale-95")
  }

  const handleDragEnd = (e: React.DragEvent) => {
    e.currentTarget.classList.remove("opacity-50", "scale-95")
  }

  return (
    <Card
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className="cursor-grab active:cursor-grabbing hover:shadow-md transition-all group border-none shadow-sm bg-background/80 backdrop-blur-sm hover:ring-1 hover:ring-primary/20"
    >
      <CardContent className="p-4">
        {/* Header: Avatar & Info */}
        <div className="flex items-start justify-between mb-4">
          <Link href={`/dashboard/${workspaceId}/leads/${lead.id}`} className="flex items-center gap-3 min-w-0">
            <div className="relative">
              <Avatar className="h-9 w-9 border border-muted shadow-sm">
                <AvatarFallback className="bg-primary/5 text-primary text-[10px] font-black uppercase italic">
                  {initials || "L"}
                </AvatarFallback>
              </Avatar>
              {/* Discrete Mood Score Dot */}
              {lead.moodScore && (
                <span className={cn(
                  "absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-background",
                  lead.moodScore > 60 ? "bg-green-500" : lead.moodScore > 30 ? "bg-amber-500" : "bg-red-500"
                )} />
              )}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold truncate text-foreground leading-tight tracking-tight">
                {lead.fullName || `${lead.firstName} ${lead.lastName}`}
              </p>
              <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-0.5">
                <Building2 className="h-2.5 w-2.5" />
                <span className="truncate">{lead.company || "Personal"}</span>
              </div>
            </div>
          </Link>

          <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full">
                  <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="rounded-xl shadow-xl border-border">
                <DropdownMenuItem className="text-xs font-bold uppercase tracking-tighter italic cursor-pointer">
                  <Mail className="mr-2 h-3 w-3" /> Send Email
                </DropdownMenuItem>
                {displayPhone && (
                  <DropdownMenuItem className="text-xs font-bold uppercase tracking-tighter italic cursor-pointer">
                    <MessageCircle className="mr-2 h-3 w-3 text-green-500" /> WhatsApp
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem className="text-xs font-bold uppercase tracking-tighter italic cursor-pointer text-destructive">
                  Delete Lead
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <GripVertical className="h-4 w-4 text-muted-foreground/30 ml-1" />
          </div>
        </div>

        {/* Contact Details (Email & Phone) */}
        <div className="space-y-2 mb-4">
          {displayEmail ? (
            <div className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group/item">
              <Mail className="h-3 w-3 shrink-0 opacity-70 group-hover/item:opacity-100" />
              <span className="text-[11px] font-medium truncate">{displayEmail}</span>
            </div>
          ) : (
            <div className="text-[10px] text-muted-foreground/40 italic">No email provided</div>
          )}

          {displayPhone ? (
            <div className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group/item">
              <Phone className="h-3 w-3 shrink-0 opacity-70 group-hover/item:opacity-100" />
              <span className="text-[11px] font-medium truncate">{displayPhone}</span>
            </div>
          ) : (
            <div className="text-[10px] text-muted-foreground/40 italic">No phone provided</div>
          )}
        </div>

        {/* Footer: Mood, Qualification & Source */}
        <div className="flex items-center justify-between pt-3 border-t border-border/50">
          <div className="flex items-center gap-2">
            <Badge 
              variant="outline" 
              className={cn("text-[9px] px-2 py-0.5 font-black uppercase italic border-none shadow-sm", 
                lead.moodLabel === 'positive' && 'bg-green-500/10 text-green-600',
                lead.moodLabel === 'negative' && 'bg-red-500/10 text-red-600',
                lead.moodLabel === 'neutral' && 'bg-blue-500/10 text-blue-600',
                !lead.moodLabel && 'bg-muted text-muted-foreground'
              )}
            >
              {lead.moodLabel || 'Neutral'}
            </Badge>

            {/* Added Qualification Label for intelligence feel */}
            {lead.qualificationLabel && lead.qualificationLabel !== 'unqualified' && (
              <Badge className="text-[9px] px-2 py-0.5 font-black bg-primary/10 text-primary border-none uppercase italic">
                <Target className="h-2 w-2 mr-1" /> {lead.qualificationLabel}
              </Badge>
            )}
          </div>
          
          <span className="text-[9px] text-muted-foreground font-black uppercase tracking-widest italic opacity-60">
            {lead.source?.replace('_', ' ') || 'Import'}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}