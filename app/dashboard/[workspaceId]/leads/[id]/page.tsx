"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { leadService } from "@/services/lead"
import { TopHeader } from "@/components/layout/top-header"
import { LeadDetailHeader } from "@/components/leads/lead-detail-header"
import { LeadInfoCard } from "@/components/leads/lead-info-card"
import { LeadTasks } from "@/components/leads/lead-tasks"
import { LeadAutomationStatus } from "@/components/leads/lead-automation-status"
import { LeadQuickActions } from "@/components/leads/lead-quick-actions"
import { LeadDetailTabs } from "@/components/leads/lead-detail-tabs"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function LeadDetailPage() {
  const params = useParams()
  const workspaceId = params.workspaceId as string
  const id = params.id as string

  const [lead, setLead] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadLead = async () => {
      try {
        setLoading(true)
        const data = await leadService.getLeadDetails(workspaceId, id)
        setLead(data)
      } catch (err) {
        console.error("Error loading lead details:", err)
      } finally {
        setLoading(false)
      }
    }
    if (workspaceId && id) {
      loadLead()
    }
  }, [workspaceId, id])

  // --- NEXT LEVEL CARD SKELETON LOADER (Based on your screenshot) ---
  if (loading) {
    return (
      <div className="flex flex-col h-full bg-background/50">
        {/* Top Header Mockup */}
        <div className="h-14 border-b bg-background flex items-center justify-between px-6">
           <Skeleton className="h-4 w-32" />
           <div className="flex gap-2">
             <Skeleton className="h-8 w-24 rounded-md" />
             <Skeleton className="h-8 w-24 rounded-md" />
           </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Lead Header Skeleton (Sherry Garza section) */}
          <div className="p-8 bg-background border-b">
            <div className="max-w-[1600px] mx-auto flex justify-between items-center">
              <div className="flex gap-5 items-center">
                <Skeleton className="h-16 w-16 rounded-full" /> {/* SH Avatar */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-8 w-48" /> {/* Name */}
                    <Skeleton className="h-5 w-20 rounded-full" /> {/* neutral badge */}
                  </div>
                  <div className="flex gap-4">
                    <Skeleton className="h-4 w-32" /> {/* Owner */}
                    <Skeleton className="h-4 w-40" /> {/* Email */}
                    <Skeleton className="h-4 w-28" /> {/* Score */}
                  </div>
                </div>
              </div>
              <Skeleton className="h-10 w-32 rounded-lg" /> {/* AI Insights Button */}
            </div>
          </div>

          <div className="p-6 max-w-[1600px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left Column: Timeline & Tabs */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex gap-8 border-b pb-2 mb-4">
                  <Skeleton className="h-4 w-16" /> {/* Activity Tab */}
                  <Skeleton className="h-4 w-16" /> {/* Tasks Tab */}
                  <Skeleton className="h-4 w-16" /> {/* Emails Tab */}
                  <Skeleton className="h-4 w-16" /> {/* Notes Tab */}
                </div>
                
                {/* Timeline Items Mockup */}
                <div className="bg-background border rounded-xl p-8 space-y-8">
                  <div className="flex justify-between items-center mb-6">
                    <Skeleton className="h-6 w-32" /> {/* Title */}
                    <Skeleton className="h-9 w-24 rounded-md" /> {/* Add Note button */}
                  </div>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex gap-4">
                      <Skeleton className="h-10 w-10 rounded-lg shrink-0" /> {/* Icon box */}
                      <div className="flex-1 space-y-2 pt-1">
                        <div className="flex justify-between">
                          <Skeleton className="h-4 w-1/3" /> {/* Activity text */}
                          <Skeleton className="h-3 w-24" /> {/* Date */}
                        </div>
                        <Skeleton className="h-3 w-1/4" /> {/* Sub-details */}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Info Cards */}
              <div className="space-y-6">
                {/* Lead Details Card */}
                <div className="bg-background border rounded-xl p-6 space-y-6">
                  <div className="flex justify-between">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-5 w-20 rounded-full" />
                  </div>
                  <div className="space-y-4 pt-2">
                    <Skeleton className="h-12 w-full rounded-lg" />
                    <Skeleton className="h-12 w-full rounded-lg" />
                    <Skeleton className="h-12 w-full rounded-lg" />
                  </div>
                </div>

                {/* Pending Tasks Card */}
                <div className="bg-background border rounded-xl p-6 space-y-4">
                   <div className="flex justify-between">
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-5 w-6 rounded-full" />
                  </div>
                  <Skeleton className="h-20 w-full rounded-xl" />
                </div>

                {/* Automation & Quick Actions */}
                <Skeleton className="h-40 w-full rounded-xl" />
                <Skeleton className="h-64 w-full rounded-xl" />
              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!lead) {
    return (
      <div className="flex flex-col h-screen items-center justify-center gap-4">
        <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
          <ArrowLeft className="h-8 w-8 text-muted-foreground" />
        </div>
        <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Lead Intelligence Not Found</p>
        <Link href={`/dashboard/${workspaceId}/leads`}>
          <Button variant="outline" className="rounded-full px-8 uppercase font-black text-xs">
            Back to Hub
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-background/50">
      <TopHeader
        title=""
        actions={
          <Link href={`/dashboard/${workspaceId}/leads`}>
            <Button variant="ghost" size="sm" className="gap-2 font-bold hover:text-primary transition-colors">
              <ArrowLeft className="h-4 w-4" /> Back to Leads
            </Button>
          </Link>
        }
      />

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <LeadDetailHeader lead={lead} workspaceId={workspaceId} />
        
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <LeadDetailTabs 
                activities={lead.activities || []} 
                tasks={lead.tasks || []} 
              />
            </div>

            <div className="space-y-6">
              <LeadInfoCard lead={lead} />
              <LeadTasks tasks={lead.tasks || []} />
              <LeadAutomationStatus leadId={lead.id} />
              <LeadQuickActions lead={lead} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}