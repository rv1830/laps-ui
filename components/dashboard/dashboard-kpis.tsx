"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Users,
  Mail,
  MessageSquare,
  Calendar,
  Phone,
  FileText,
  Receipt,
  Trophy,
  TrendingUp,
  TrendingDown,
  Minus,
  ArrowUpRight,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { KPIData } from "@/lib/types"

const kpiData: (KPIData & { icon: React.ComponentType<{ className?: string }>; color: string; isAI?: boolean })[] = [
  {
    label: "New Leads",
    value: 48,
    change: 12,
    changeType: "increase",
    period: "vs last week",
    icon: Users,
    color: "primary",
  },
  {
    label: "Contacted",
    value: 156,
    change: 8,
    changeType: "increase",
    period: "vs last week",
    icon: Mail,
    color: "info",
    isAI: true,
  },
  {
    label: "Replies",
    value: 42,
    change: -3,
    changeType: "decrease",
    period: "vs last week",
    icon: MessageSquare,
    color: "warning",
  },
  {
    label: "Calls Booked",
    value: 18,
    change: 22,
    changeType: "increase",
    period: "vs last week",
    icon: Calendar,
    color: "accent",
    isAI: true,
  },
  {
    label: "Calls Done",
    value: 14,
    change: 0,
    changeType: "neutral",
    period: "vs last week",
    icon: Phone,
    color: "muted",
  },
  {
    label: "Proposals",
    value: 8,
    change: 15,
    changeType: "increase",
    period: "vs last week",
    icon: FileText,
    color: "ai",
    isAI: true,
  },
  {
    label: "Invoices",
    value: 5,
    change: 25,
    changeType: "increase",
    period: "vs last week",
    icon: Receipt,
    color: "success",
  },
  {
    label: "Won Deals",
    value: 3,
    change: 50,
    changeType: "increase",
    period: "vs last week",
    icon: Trophy,
    color: "success",
  },
]

const colorMap: Record<string, { bg: string; text: string; iconBg: string; gradient: string }> = {
  primary: {
    bg: "bg-primary/5",
    text: "text-primary",
    iconBg: "bg-gradient-to-br from-primary/20 to-primary/10",
    gradient: "from-primary/10 to-transparent",
  },
  info: {
    bg: "bg-info/5",
    text: "text-info",
    iconBg: "bg-gradient-to-br from-info/20 to-info/10",
    gradient: "from-info/10 to-transparent",
  },
  warning: {
    bg: "bg-warning/5",
    text: "text-warning",
    iconBg: "bg-gradient-to-br from-warning/20 to-warning/10",
    gradient: "from-warning/10 to-transparent",
  },
  accent: {
    bg: "bg-accent/5",
    text: "text-accent",
    iconBg: "bg-gradient-to-br from-accent/20 to-accent/10",
    gradient: "from-accent/10 to-transparent",
  },
  muted: {
    bg: "bg-muted/50",
    text: "text-muted-foreground",
    iconBg: "bg-muted",
    gradient: "from-muted/50 to-transparent",
  },
  ai: {
    bg: "bg-accent/5",
    text: "text-accent",
    iconBg: "bg-gradient-to-br from-accent/30 to-primary/20",
    gradient: "from-accent/10 via-primary/5 to-transparent",
  },
  success: {
    bg: "bg-success/5",
    text: "text-success",
    iconBg: "bg-gradient-to-br from-success/20 to-success/10",
    gradient: "from-success/10 to-transparent",
  },
}

export function DashboardKPIs() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
      {kpiData.map((kpi) => {
        const Icon = kpi.icon
        const colors = colorMap[kpi.color]
        return (
          <Card
            key={kpi.label}
            className={cn(
              "group relative overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-300 cursor-pointer card-hover",
              "bg-card/80 backdrop-blur-sm",
            )}
          >
            <div className={cn("absolute inset-0 bg-gradient-to-br opacity-50", colors.gradient)} />

            <CardContent className="relative p-4">
              <div className="flex items-start justify-between mb-3">
                <div className={cn("inline-flex p-2 rounded-xl", colors.iconBg)}>
                  <Icon className={cn("h-4 w-4", colors.text)} />
                </div>
                {kpi.isAI && (
                  <div className="flex h-5 items-center gap-1 rounded-full bg-accent/20 px-1.5 ai-glow-subtle">
                    <Sparkles className="h-2.5 w-2.5 text-accent" />
                  </div>
                )}
              </div>

              <p className="text-2xl font-bold text-foreground tracking-tight">{kpi.value}</p>
              <p className="text-xs text-muted-foreground font-medium mt-0.5">{kpi.label}</p>

              <div className="flex items-center gap-1 mt-2">
                {kpi.changeType === "increase" && (
                  <div className="flex items-center gap-0.5 text-success">
                    <TrendingUp className="h-3 w-3" />
                    <span className="text-xs font-semibold">+{kpi.change}%</span>
                  </div>
                )}
                {kpi.changeType === "decrease" && (
                  <div className="flex items-center gap-0.5 text-destructive">
                    <TrendingDown className="h-3 w-3" />
                    <span className="text-xs font-semibold">{kpi.change}%</span>
                  </div>
                )}
                {kpi.changeType === "neutral" && (
                  <div className="flex items-center gap-0.5 text-muted-foreground">
                    <Minus className="h-3 w-3" />
                    <span className="text-xs font-semibold">0%</span>
                  </div>
                )}
              </div>

              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight className="h-4 w-4 text-primary" />
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
