"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, ArrowRight, Sparkles, Bot, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

const funnelData = [
  { stage: "New Leads", count: 248, percentage: 100, color: "from-primary to-primary/60" },
  { stage: "Contacted", count: 186, percentage: 75, color: "from-primary/80 to-accent/60", isAI: true },
  { stage: "Replied", count: 112, percentage: 45, color: "from-accent to-accent/60" },
  { stage: "Qualified", count: 68, percentage: 27, color: "from-accent/80 to-chart-3/60" },
  { stage: "Call Booked", count: 42, percentage: 17, color: "from-chart-3 to-chart-3/60", isAI: true },
  { stage: "Presented", count: 28, percentage: 11, color: "from-chart-3/80 to-info/60" },
  { stage: "Proposal Sent", count: 18, percentage: 7, color: "from-info to-info/60", isAI: true },
  { stage: "Won", count: 8, percentage: 3, color: "from-success to-success/60" },
]

export function FunnelChart() {
  return (
    <Card className="border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/5 to-transparent rounded-full blur-3xl" />
      <CardHeader className="relative flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            Sales Funnel
            <span className="flex h-5 items-center gap-1 rounded-full bg-success/10 px-2 text-[10px] font-semibold text-success">
              <Zap className="h-3 w-3" /> +12% this week
            </span>
          </CardTitle>
          <p className="text-xs text-muted-foreground mt-0.5">Lead progression overview</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5 text-xs bg-accent/5 border-accent/30 text-accent hover:bg-accent/10 hover:border-accent/50 ai-glow-subtle"
        >
          <Bot className="h-3.5 w-3.5" />
          AI Insights
        </Button>
      </CardHeader>
      <CardContent className="relative pt-4">
        <div className="space-y-3">
          {funnelData.map((item, index) => {
            const convRate = index > 0 ? Math.round((item.count / funnelData[index - 1].count) * 100) : 100
            return (
              <div key={item.stage} className="group">
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">{item.stage}</span>
                    {item.isAI && (
                      <div className="flex h-4 items-center gap-1 rounded-full bg-accent/20 px-1.5">
                        <Sparkles className="h-2.5 w-2.5 text-accent" />
                      </div>
                    )}
                    {index > 0 && (
                      <span
                        className={cn(
                          "flex items-center gap-0.5 text-[10px] font-semibold px-1.5 py-0.5 rounded-full",
                          convRate >= 50
                            ? "bg-success/10 text-success"
                            : convRate >= 30
                              ? "bg-warning/10 text-warning"
                              : "bg-muted text-muted-foreground",
                        )}
                      >
                        <ArrowRight className="h-2.5 w-2.5" />
                        {convRate}%
                      </span>
                    )}
                  </div>
                  <span className="font-bold text-foreground tabular-nums">{item.count}</span>
                </div>
                <div className="relative h-9 bg-muted/20 rounded-xl overflow-hidden border border-border/30">
                  <div
                    className={cn(
                      "absolute inset-y-0 left-0 bg-gradient-to-r rounded-xl transition-all duration-500",
                      item.color,
                    )}
                    style={{ width: `${item.percentage}%` }}
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>

        {/* Summary Stats */}
        <div className="mt-6 pt-4 border-t border-border/30 grid grid-cols-3 gap-4">
          <div className="text-center p-3 rounded-xl bg-muted/20">
            <p className="text-2xl font-bold text-foreground">3.2%</p>
            <p className="text-xs text-muted-foreground">Overall Conv.</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-success/5 border border-success/20">
            <div className="flex items-center justify-center gap-1">
              <TrendingUp className="h-4 w-4 text-success" />
              <p className="text-2xl font-bold text-success">+12%</p>
            </div>
            <p className="text-xs text-muted-foreground">vs Last Period</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-primary/5 border border-primary/20">
            <p className="text-2xl font-bold text-primary">$24.5K</p>
            <p className="text-xs text-muted-foreground">Pipeline Value</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
