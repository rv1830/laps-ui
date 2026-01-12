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
import { ArrowLeft, Loader2 } from "lucide-react"
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
        // Backend includes leads, tasks, and activities in this response
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

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Loading Intelligence...</p>
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
            {/* Left Column: Intelligence, Activities & History */}
            <div className="lg:col-span-2 space-y-6">
              <LeadDetailTabs 
                activities={lead.activities || []} 
                tasks={lead.tasks || []} 
              />
            </div>

            {/* Right Column: Profile, Action Queue & Status */}
            <div className="space-y-6">
              <LeadInfoCard lead={lead} />
              
              {/* Task queue for quick viewing in sidebar */}
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