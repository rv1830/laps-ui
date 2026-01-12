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

  // Error State: Agar loading khatam ho gayi aur lead nahi mila
  if (!loading && !lead) {
    return (
      <div className="flex flex-col h-screen items-center justify-center gap-4">
        <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
          <ArrowLeft className="h-8 w-8 text-muted-foreground" />
        </div>
        <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Lead Intelligence Not Found</p>
       
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-background/50">
      {/* 1. Header fixed hai, turant dikhega */}
      <TopHeader 
  title="Lead Intelligence" 
  subtitle={
    loading ? (
      <Skeleton className="h-3 w-40 mt-1 opacity-50" />
    ) : (
      `Managing ${lead?.fullName}`
    )
  }
/>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {/* 2. LeadDetailHeader: Agar lead hai toh dikhao, warna shimmer */}
        {loading ? (
          <div className="p-8 bg-background border-b">
            <div className="max-w-[1600px] mx-auto flex gap-5 items-center">
              <Skeleton className="h-16 w-16 rounded-full" />
              <div className="space-y-3">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-4 w-48" />
              </div>
            </div>
          </div>
        ) : (
          <LeadDetailHeader lead={lead} workspaceId={workspaceId} />
        )}
        
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column: Components khud apna isLoading handle karenge */}
            <div className="lg:col-span-2 space-y-6">
              <LeadDetailTabs 
                activities={lead?.activities || []} 
                tasks={lead?.tasks || []} 
                isLoading={loading} 
              />
            </div>

            {/* Right Column: Profile & Widgets */}
            <div className="space-y-6">
              <LeadInfoCard lead={lead} isLoading={loading} />
              
              <LeadTasks tasks={lead?.tasks || []} isLoading={loading} />
              
              {/* <LeadAutomationStatus leadId={id} isLoading={loading} /> */}
              
              {/* Quick Actions fixed data pe hai toh lead pass kardo direct */}
              <LeadQuickActions lead={lead} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}