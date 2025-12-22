"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, MessageSquare, Calendar, FileText, ArrowRight, Users, ChevronRight, Activity, Bot } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

const activities = [
  {
    id: "1",
    type: "email_sent",
    lead: "Sarah Chen",
    description: "Email sent: Follow-up on proposal",
    time: "5 min ago",
    isAI: true,
  },
  {
    id: "2",
    type: "reply_received",
    lead: "Mike Johnson",
    description: "Replied to your email",
    time: "15 min ago",
    isAI: false,
  },
  {
    id: "3",
    type: "meeting_booked",
    lead: "Emma Wilson",
    description: "Booked a demo call for tomorrow",
    time: "1 hr ago",
    isAI: false,
  },
  {
    id: "4",
    type: "proposal_sent",
    lead: "Tom Brown",
    description: "Proposal sent: Enterprise Package",
    time: "2 hrs ago",
    isAI: true,
  },
  {
    id: "5",
    type: "stage_change",
    lead: "Lisa Park",
    description: "Moved from Qualified to Call Booked",
    time: "3 hrs ago",
    isAI: true,
  },
  {
    id: "6",
    type: "lead_created",
    lead: "New Lead",
    description: "Lead captured from website form",
    time: "4 hrs ago",
    isAI: false,
  },
]

const activityConfig: Record<
  string,
  { icon: React.ComponentType<{ className?: string }>; color: string; bgColor: string; gradient: string }
> = {
  email_sent: { icon: Mail, color: "text-primary", bgColor: "bg-primary/10", gradient: "from-primary/20 to-primary/5" },
  reply_received: {
    icon: MessageSquare,
    color: "text-success",
    bgColor: "bg-success/10",
    gradient: "from-success/20 to-success/5",
  },
  meeting_booked: { icon: Calendar, color: "text-info", bgColor: "bg-info/10", gradient: "from-info/20 to-info/5" },
  proposal_sent: {
    icon: FileText,
    color: "text-accent",
    bgColor: "bg-accent/10",
    gradient: "from-accent/20 to-accent/5",
  },
  stage_change: {
    icon: ArrowRight,
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
    gradient: "from-chart-3/20 to-chart-3/5",
  },
  lead_created: {
    icon: Users,
    color: "text-primary",
    bgColor: "bg-primary/10",
    gradient: "from-primary/20 to-primary/5",
  },
}

export function RecentActivity() {
  return (
    <Card className="border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden">
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-accent/5 to-transparent rounded-full blur-3xl" />
      <CardHeader className="relative flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-chart-3/20">
              <Activity className="h-3.5 w-3.5 text-chart-3" />
            </div>
            Recent Activity
          </CardTitle>
          <p className="text-xs text-muted-foreground mt-0.5">Latest updates from your sales loop</p>
        </div>
        <Link href="/pipeline/timeline">
          <Button variant="ghost" size="sm" className="gap-1 text-xs">
            Full Timeline <ChevronRight className="h-3 w-3" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="relative pt-2">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[22px] top-0 bottom-0 w-px bg-gradient-to-b from-primary/30 via-accent/20 to-transparent" />

          <div className="space-y-1">
            {activities.map((activity, index) => {
              const config = activityConfig[activity.type] || activityConfig.lead_created
              const Icon = config.icon
              return (
                <div
                  key={activity.id}
                  className="relative flex items-start gap-4 p-3 rounded-xl hover:bg-muted/20 transition-all group cursor-pointer"
                >
                  {/* Icon */}
                  <div
                    className={cn(
                      "relative z-10 p-2.5 rounded-xl shadow-sm border border-border/30 transition-transform group-hover:scale-105",
                      `bg-gradient-to-br ${config.gradient}`,
                    )}
                  >
                    <Icon className={cn("h-4 w-4", config.color)} />
                    {activity.isAI && (
                      <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-accent flex items-center justify-center border-2 border-card shadow-sm">
                        <Bot className="h-2 w-2 text-accent-foreground" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 pt-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-foreground">{activity.lead}</span>
                      {activity.isAI && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-accent/20 text-accent font-bold tracking-wide">
                          AI ACTION
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{activity.description}</p>
                  </div>

                  {/* Time */}
                  <span className="text-xs text-muted-foreground whitespace-nowrap pt-1 font-medium">
                    {activity.time}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
