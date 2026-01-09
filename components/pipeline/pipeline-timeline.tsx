"use client"

import React, { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { leadService } from "@/services/lead"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Clock, ArrowRight, Loader2 } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { cn } from "@/lib/utils"

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
      // Yaha hum lead ki current state ko activity ki tarah dikha rahe hain
      setActivities(data.leads || [])
    } catch (error) {
      console.error("Timeline Error:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="p-8 text-center"><Loader2 className="h-6 w-6 animate-spin mx-auto" /></div>

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Recent Pipeline Activity</h2>
      </div>
      
      <div className="space-y-4">
        {activities.map((lead) => (
          <Card key={lead.id} className="border-none shadow-sm bg-background">
            <CardContent className="p-4 flex gap-4">
              <div className="p-2 rounded-full h-fit bg-primary/10 text-primary">
                <ArrowRight className="h-4 w-4" />
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-[8px]">{lead.fullName[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-bold">{lead.fullName}</span>
                  </div>
                  <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatDistanceToNow(new Date(lead.updatedAt), { addSuffix: true })}
                  </span>
                </div>
                
                <div className="mt-2 flex items-center gap-2">
                  <p className="text-sm text-muted-foreground">
                    Lead is currently in 
                  </p>
                  <Badge variant="secondary" className="text-[10px] h-5">
                    {lead.stage?.name || 'Initial Stage'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {activities.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">No recent activity found.</div>
        )}
      </div>
    </div>
  )
}