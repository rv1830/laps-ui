"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Mail, MessageSquare, Calendar, FileText, ArrowRight, Clock, AlertCircle, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { mockLeads, stageLabels, moodColors } from "@/lib/mock-data"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"

interface TimelineEvent {
  id: string
  leadId: string
  lead: (typeof mockLeads)[0]
  type: "email_sent" | "email_received" | "meeting" | "proposal" | "stage_change" | "inactivity" | "suggestion"
  title: string
  description?: string
  timestamp: Date
}

// Generate mock timeline events
const generateTimelineEvents = (): TimelineEvent[] => {
  const events: TimelineEvent[] = []
  const now = new Date()

  mockLeads.forEach((lead) => {
    // Add some events for each lead
    if (lead.stage !== "new") {
      events.push({
        id: `${lead.id}-1`,
        leadId: lead.id,
        lead,
        type: "email_sent",
        title: "Follow-up email sent",
        description: "Sent personalized follow-up discussing their requirements",
        timestamp: new Date(now.getTime() - Math.random() * 3 * 24 * 60 * 60 * 1000),
      })
    }

    if (lead.moodScore === "positive") {
      events.push({
        id: `${lead.id}-2`,
        leadId: lead.id,
        lead,
        type: "email_received",
        title: "Reply received",
        description: "Lead expressed interest in scheduling a call",
        timestamp: new Date(now.getTime() - Math.random() * 2 * 24 * 60 * 60 * 1000),
      })
    }

    if (lead.stage === "call_booked" || lead.stage === "presented") {
      events.push({
        id: `${lead.id}-3`,
        leadId: lead.id,
        lead,
        type: "meeting",
        title: "Meeting completed",
        description: "Discovery call - discussed budget and timeline",
        timestamp: new Date(now.getTime() - Math.random() * 5 * 24 * 60 * 60 * 1000),
      })
    }

    if (lead.stage === "nurture") {
      events.push({
        id: `${lead.id}-4`,
        leadId: lead.id,
        lead,
        type: "inactivity",
        title: "No activity in 14 days",
        description: "Consider sending a gentle follow-up",
        timestamp: new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000),
      })
    }
  })

  // Add some AI suggestions
  events.push({
    id: "suggestion-1",
    leadId: mockLeads[0].id,
    lead: mockLeads[0],
    type: "suggestion",
    title: "AI Suggestion",
    description: "Based on positive sentiment, recommend sending a proposal",
    timestamp: new Date(),
  })

  return events.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
}

const timelineEvents = generateTimelineEvents()

const eventIcons: Record<string, { icon: React.ComponentType<{ className?: string }>; color: string }> = {
  email_sent: { icon: Mail, color: "text-primary bg-primary/10" },
  email_received: { icon: MessageSquare, color: "text-success bg-success/10" },
  meeting: { icon: Calendar, color: "text-chart-2 bg-chart-2/10" },
  proposal: { icon: FileText, color: "text-chart-3 bg-chart-3/10" },
  stage_change: { icon: ArrowRight, color: "text-chart-4 bg-chart-4/10" },
  inactivity: { icon: AlertCircle, color: "text-warning bg-warning/10" },
  suggestion: { icon: Sparkles, color: "text-chart-5 bg-chart-5/10" },
}

export function PipelineTimeline() {
  // Group events by date
  const groupedEvents = timelineEvents.reduce(
    (groups, event) => {
      const date = event.timestamp.toDateString()
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(event)
      return groups
    },
    {} as Record<string, TimelineEvent[]>,
  )

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {Object.entries(groupedEvents).map(([date, events]) => (
        <div key={date}>
          <h3 className="text-sm font-medium text-muted-foreground mb-4">
            {new Date(date).toDateString() === new Date().toDateString() ? "Today" : date}
          </h3>
          <div className="space-y-4">
            {events.map((event) => (
              <TimelineEventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function TimelineEventCard({ event }: { event: TimelineEvent }) {
  const { icon: Icon, color } = eventIcons[event.type] || eventIcons.email_sent

  return (
    <Card className={cn(event.type === "suggestion" && "border-chart-5/50 bg-chart-5/5")}>
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className={cn("p-2 rounded-full h-fit", color)}>
            <Icon className="h-4 w-4" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <Link href={`/leads/${event.leadId}`} className="flex items-center gap-2 hover:opacity-80">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                      {event.lead.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-foreground">{event.lead.name}</p>
                    <p className="text-xs text-muted-foreground">{event.lead.company}</p>
                  </div>
                </Link>
                <Badge variant="outline" className={cn("capitalize text-xs", moodColors[event.lead.moodScore])}>
                  {event.lead.moodScore}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {stageLabels[event.lead.stage]}
                </Badge>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {formatDistanceToNow(event.timestamp, { addSuffix: true })}
                </span>
              </div>
            </div>

            <div className="mt-3">
              <p className="text-sm font-medium text-foreground">{event.title}</p>
              {event.description && <p className="text-sm text-muted-foreground mt-1">{event.description}</p>}
            </div>

            {event.type === "suggestion" && (
              <div className="flex gap-2 mt-3">
                <Button size="sm">Generate Proposal</Button>
                <Button size="sm" variant="outline">
                  Dismiss
                </Button>
              </div>
            )}

            {event.type === "inactivity" && (
              <div className="flex gap-2 mt-3">
                <Button size="sm" variant="outline" className="gap-1 bg-transparent">
                  <Mail className="h-4 w-4" /> Send Follow-up
                </Button>
                <Button size="sm" variant="ghost">
                  Snooze
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
