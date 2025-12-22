"use client"

import { TopHeader } from "@/components/layout/top-header"
import { LeadDetailHeader } from "@/components/leads/lead-detail-header"
import { LeadInfoCard } from "@/components/leads/lead-info-card"
import { LeadTasks } from "@/components/leads/lead-tasks"
import { LeadAutomationStatus } from "@/components/leads/lead-automation-status"
import { LeadQuickActions } from "@/components/leads/lead-quick-actions"
import { LeadDetailTabs } from "@/components/leads/lead-detail-tabs"
import { mockLeads, mockActivities, mockTasks } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function LeadDetailPage({ params }: PageProps) {
  const { id } = await params
  const lead = mockLeads.find((l) => l.id === id) || mockLeads[0]
  const activities = mockActivities.filter((a) => a.leadId === lead.id)
  const tasks = mockTasks.filter((t) => t.leadId === lead.id)

  return (
    <div className="flex flex-col h-full">
      <TopHeader
        title=""
        actions={
          <Link href="/leads">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Leads
            </Button>
          </Link>
        }
      />

      <div className="flex-1 overflow-y-auto">
        <LeadDetailHeader lead={lead} />

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <LeadDetailTabs activities={activities} />
            </div>

            <div className="space-y-6">
              <LeadInfoCard lead={lead} />
              <LeadTasks tasks={tasks} />
              <LeadAutomationStatus leadId={lead.id} />
              <LeadQuickActions lead={lead} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
