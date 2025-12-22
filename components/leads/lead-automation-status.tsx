"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Zap, Pause, Play, ChevronRight } from "lucide-react"
import Link from "next/link"

interface LeadAutomationStatusProps {
  leadId: string
}

export function LeadAutomationStatus({ leadId }: LeadAutomationStatusProps) {
  // Mock data - in real app would fetch based on leadId
  const automations = [
    { id: "1", name: "New Lead Welcome", status: "active", nextStep: "Email in 2 days" },
    { id: "2", name: "Meeting Follow-up", status: "paused", nextStep: "Pending approval" },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base font-medium">Active Automations</CardTitle>
        <Link href="/automation">
          <Button variant="ghost" size="sm" className="gap-1 h-8">
            View All <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        {automations.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-sm text-muted-foreground mb-3">No active automations</p>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Zap className="h-4 w-4" />
              Add to Sequence
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {automations.map((auto) => (
              <div key={auto.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                <div className="flex items-center gap-2">
                  <div
                    className={`h-2 w-2 rounded-full ${auto.status === "active" ? "bg-success" : "bg-muted-foreground"}`}
                  />
                  <div>
                    <p className="text-sm font-medium text-foreground">{auto.name}</p>
                    <p className="text-xs text-muted-foreground">{auto.nextStep}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  {auto.status === "active" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
