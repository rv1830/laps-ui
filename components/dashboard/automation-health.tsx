"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Clock, ChevronRight, Play, Pause, Sparkles, Bot, Activity } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const automationData = {
  running: 12,
  pending: 3,
  failed: 1,
  workflows: [
    { name: "New Lead Follow-up", status: "active", lastRun: "2 min ago", runs: 48, isAI: true },
    { name: "Meeting Reminder", status: "active", lastRun: "15 min ago", runs: 12, isAI: false },
    { name: "Proposal Auto-send", status: "paused", lastRun: "1 hr ago", runs: 5, isAI: true },
  ],
}

export function AutomationHealth() {
  return (
    <Card className="border-border/50 bg-card/80 backdrop-blur-sm h-full overflow-hidden">
      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-accent/10 to-transparent rounded-full blur-3xl" />
      <CardHeader className="relative flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-accent/20">
              <Bot className="h-3.5 w-3.5 text-accent" />
            </div>
            AI Automation
          </CardTitle>
          <p className="text-xs text-muted-foreground mt-0.5">Real-time workflow status</p>
        </div>
        <Link href="/automation">
          <Button variant="ghost" size="sm" className="gap-1 text-xs">
            View All <ChevronRight className="h-3 w-3" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="relative space-y-4 pt-2">
        {/* Status Overview */}
        <div className="grid grid-cols-3 gap-2">
          <div className="relative overflow-hidden flex flex-col items-center p-3 rounded-xl bg-gradient-to-br from-success/10 to-success/5 border border-success/20">
            <div className="absolute top-0 right-0 w-16 h-16 bg-success/20 rounded-full blur-2xl" />
            <div className="relative flex items-center justify-center h-9 w-9 rounded-xl bg-success/20 mb-1.5">
              <Activity className="h-4 w-4 text-success" />
            </div>
            <span className="text-xl font-bold text-foreground">{automationData.running}</span>
            <span className="text-[10px] text-success font-semibold">Running</span>
          </div>
          <div className="relative overflow-hidden flex flex-col items-center p-3 rounded-xl bg-gradient-to-br from-warning/10 to-warning/5 border border-warning/20">
            <div className="absolute top-0 right-0 w-16 h-16 bg-warning/20 rounded-full blur-2xl" />
            <div className="relative flex items-center justify-center h-9 w-9 rounded-xl bg-warning/20 mb-1.5">
              <Clock className="h-4 w-4 text-warning" />
            </div>
            <span className="text-xl font-bold text-foreground">{automationData.pending}</span>
            <span className="text-[10px] text-warning font-semibold">Pending</span>
          </div>
          <div className="relative overflow-hidden flex flex-col items-center p-3 rounded-xl bg-gradient-to-br from-destructive/10 to-destructive/5 border border-destructive/20">
            <div className="absolute top-0 right-0 w-16 h-16 bg-destructive/20 rounded-full blur-2xl" />
            <div className="relative flex items-center justify-center h-9 w-9 rounded-xl bg-destructive/20 mb-1.5">
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </div>
            <span className="text-xl font-bold text-foreground">{automationData.failed}</span>
            <span className="text-[10px] text-destructive font-semibold">Failed</span>
          </div>
        </div>

        {/* Recent Workflows */}
        <div className="space-y-2">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Active Workflows</p>
          {automationData.workflows.map((workflow) => (
            <div
              key={workflow.name}
              className={cn(
                "flex items-center justify-between p-3 rounded-xl border transition-all hover:shadow-md cursor-pointer group",
                workflow.status === "active"
                  ? "border-success/30 bg-gradient-to-r from-success/5 to-transparent hover:border-success/50"
                  : "border-border/50 bg-muted/10 hover:border-border",
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex items-center justify-center h-8 w-8 rounded-lg transition-transform group-hover:scale-105",
                    workflow.status === "active" ? "bg-success/20" : "bg-muted",
                  )}
                >
                  {workflow.status === "active" ? (
                    <Play className="h-3.5 w-3.5 text-success fill-success" />
                  ) : (
                    <Pause className="h-3.5 w-3.5 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-medium text-foreground">{workflow.name}</span>
                    {workflow.isAI && (
                      <div className="flex h-4 items-center gap-0.5 rounded-full bg-accent/20 px-1.5">
                        <Sparkles className="h-2.5 w-2.5 text-accent" />
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] text-muted-foreground">{workflow.runs} runs today</span>
                </div>
              </div>
              <Badge
                variant="outline"
                className={cn(
                  "text-[10px] font-medium",
                  workflow.status === "active"
                    ? "border-success/30 text-success bg-success/10"
                    : "border-muted-foreground/30 text-muted-foreground",
                )}
              >
                {workflow.lastRun}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
