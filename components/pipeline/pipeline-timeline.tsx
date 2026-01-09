"use client"

import React, { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { leadService } from "@/services/lead"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { 
  Clock, 
  ArrowRight, 
  Loader2, 
  Zap, 
  Target, 
  History, 
  TrendingUp,
  Mail,
  MoreVertical,
} from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"

export function PipelineTimeline() {
  const { workspaceId } = useParams() as { workspaceId: string }
  const [activities, setActivities] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (workspaceId) {
      loadActivities()
    }
  }, [workspaceId])

  const loadActivities = async () => {
    try {
      setLoading(true)
      const data = await leadService.getLeads(workspaceId)
      
      const sorted = (data.leads || []).sort((a: any, b: any) => 
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      )
      setActivities(sorted)
    } catch (error) {
      console.error("Timeline Error:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return (
    <div className="max-w-3xl mx-auto p-6 space-y-10">
      <div className="flex items-end justify-between px-2 animate-pulse">
        <div className="space-y-2">
          <div className="h-3 w-20 bg-muted rounded" />
          <div className="h-8 w-48 bg-muted rounded" />
        </div>
        <div className="h-3 w-32 bg-muted rounded" />
      </div>

      <div className="relative space-y-1">
        <div className="absolute left-[21px] top-2 bottom-2 w-[2px] bg-border opacity-30" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="relative pl-12 pb-8 animate-pulse">
            <div className="absolute left-0 top-1 h-[44px] w-[44px] rounded-2xl bg-muted border-4 border-background z-10" />
            <Card className="border-none rounded-[1.5rem] bg-card/40">
              <CardContent className="p-5 space-y-4">
                <div className="flex justify-between">
                  <div className="flex gap-3">
                    <div className="h-10 w-10 rounded-full bg-muted" />
                    <div className="space-y-2">
                      <div className="h-4 w-32 bg-muted rounded" />
                      <div className="h-3 w-20 bg-muted rounded" />
                    </div>
                  </div>
                  <div className="h-6 w-24 bg-muted rounded-md" />
                </div>
                <div className="h-12 w-full bg-muted/30 rounded-xl" />
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center justify-center gap-2 pt-4">
        <Loader2 className="h-5 w-5 animate-spin text-primary/50" />
        <span className="text-[10px] font-black uppercase tracking-[0.3em] italic text-muted-foreground animate-pulse">Streaming Intelligence...</span>
      </div>
    </div>
  )

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-10">
      
      {/* HEADER: Minimal & Sharp */}
      <div className="flex items-end justify-between px-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary">
            <TrendingUp className="h-4 w-4" />
            <span className="text-[10px] font-black uppercase tracking-widest italic">Live Feed</span>
          </div>
          <h2 className="text-2xl font-black uppercase tracking-tighter italic leading-none">Activity Log</h2>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Workspace Engine v2.0</span>
        </div>
      </div>
      
      {/* TIMELINE CONTAINER */}
      <div className="relative space-y-1">
        {/* The Vertical Connector Line */}
        <div className="absolute left-[21px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-primary via-border to-transparent opacity-30" />

        <AnimatePresence mode="popLayout">
          {activities.map((lead, idx) => (
            <motion.div
              key={lead.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="relative pl-12 pb-8 last:pb-0"
            >
              {/* Timeline Indicator Node */}
              <div className={cn(
                "absolute left-0 top-1 h-[44px] w-[44px] rounded-2xl flex items-center justify-center z-10 transition-all duration-500 border-4 border-background shadow-xl",
                idx === 0 
                  ? "bg-primary text-primary-foreground shadow-primary/20 scale-110 ring-4 ring-primary/10" 
                  : "bg-muted text-muted-foreground border-muted/50"
              )}>
                {idx === 0 ? <Zap className="h-4 w-4 fill-current" /> : <History className="h-4 w-4" />}
              </div>

              {/* Activity Card */}
              <Card className={cn(
                "border-none transition-all duration-300 rounded-[1.5rem] group overflow-hidden",
                idx === 0 
                  ? "bg-card shadow-lg ring-1 ring-primary/10" 
                  : "bg-card/40 backdrop-blur-sm hover:bg-card/60"
              )}>
                <CardContent className="p-0">
                  {/* Top Bar: Pulse effect for latest */}
                  {idx === 0 && <div className="h-1 w-full bg-primary animate-pulse opacity-50" />}
                  
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="h-10 w-10 border-2 border-background shadow-sm">
                            <AvatarFallback className="bg-primary/5 text-primary text-[10px] font-black italic">
                              {lead.firstName?.[0]}{lead.lastName?.[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div className={cn(
                            "absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background",
                            lead.moodLabel === 'positive' ? "bg-green-500" : "bg-amber-500"
                          )} />
                        </div>
                        <div>
                          <h4 className="text-sm font-black uppercase tracking-tight italic flex items-center gap-2">
                            {lead.fullName}
                            {idx === 0 && (
                              <Badge className="h-4 px-1.5 bg-primary text-[8px] font-black italic animate-bounce">NEW</Badge>
                            )}
                          </h4>
                          <p className="text-[10px] font-bold text-muted-foreground uppercase opacity-70">
                            {lead.company || "Independent Unit"}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end gap-1">
                        <div className="flex items-center gap-1.5 text-[9px] font-black text-muted-foreground uppercase tracking-widest bg-muted px-2 py-1 rounded-md">
                          <Clock className="h-3 w-3" />
                          {formatDistanceToNow(new Date(lead.updatedAt), { addSuffix: true })}
                        </div>
                      </div>
                    </div>

                    {/* Action Description */}
                    <div className="flex items-center gap-4 bg-muted/30 rounded-xl p-3 border border-border/20">
                      <div className="flex flex-col">
                        <span className="text-[9px] font-black text-muted-foreground uppercase tracking-tighter">Current Stage</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black italic uppercase text-primary">{lead.stage?.name || 'Synced'}</span>
                          <ArrowRight className="h-3 w-3 text-muted-foreground" />
                        </div>
                      </div>
                      
                      <div className="ml-auto flex gap-2">
                        {lead.qualificationLabel && (
                          <Badge variant="outline" className="h-6 text-[9px] font-black uppercase italic border-primary/20">
                            <Target className="h-2.5 w-2.5 mr-1" /> {lead.qualificationLabel}
                          </Badge>
                        )}
                        <Button variant="ghost" size="icon" className="h-6 w-6 rounded-lg">
                            <Mail className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>

        {activities.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="py-20 text-center"
          >
            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-4 opacity-20">
              <History className="h-6 w-6" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground italic">No events detected in current workspace</p>
          </motion.div>
        )}
      </div>

      <div className="flex justify-center pt-4">
        <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest italic text-muted-foreground hover:text-primary transition-all">
          Load Full History <ArrowRight className="ml-2 h-3 w-3" />
        </Button>
      </div>
    </div>
  )
}