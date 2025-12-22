"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LeadActivityTimeline } from "@/components/leads/lead-activity-timeline"
import type { Activity } from "@/lib/types"

interface LeadDetailTabsProps {
  activities: Activity[]
}

export function LeadDetailTabs({ activities }: LeadDetailTabsProps) {
  return (
    <Tabs defaultValue="activity" className="w-full">
      <TabsList>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="emails">Emails</TabsTrigger>
        <TabsTrigger value="notes">Notes</TabsTrigger>
      </TabsList>
      <TabsContent value="activity" className="mt-4">
        <LeadActivityTimeline activities={activities} />
      </TabsContent>
      <TabsContent value="emails" className="mt-4">
        <LeadActivityTimeline activities={activities.filter((a) => a.type.includes("email"))} />
      </TabsContent>
      <TabsContent value="notes" className="mt-4">
        <LeadActivityTimeline activities={activities.filter((a) => a.type === "note")} />
      </TabsContent>
    </Tabs>
  )
}
