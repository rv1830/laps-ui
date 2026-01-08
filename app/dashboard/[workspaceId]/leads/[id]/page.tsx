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
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!lead) {
    return (
      <div className="flex flex-col h-full items-center justify-center gap-4">
        <p className="text-muted-foreground">Lead not found</p>
        <Link href={`/dashboard/${workspaceId}/leads`}>
          <Button variant="outline">Back to Leads</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <TopHeader
        title=""
        actions={
          <Link href={`/dashboard/${workspaceId}/leads`}>
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Leads
            </Button>
          </Link>
        }
      />

      <div className="flex-1 overflow-y-auto">
        <LeadDetailHeader lead={lead} workspaceId={workspaceId} />
        
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column: Activities */}
            <div className="lg:col-span-2 space-y-6">
              <LeadDetailTabs activities={lead.activities || []} />
            </div>

            {/* Right Column: Info & Actions */}
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