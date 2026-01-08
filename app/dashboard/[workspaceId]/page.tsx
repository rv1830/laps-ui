"use client"

import { useState } from "react"
import { TopHeader } from "@/components/layout/top-header"
import { DashboardKPIs } from "@/components/dashboard/dashboard-kpis"
import { FunnelChart } from "@/components/dashboard/funnel-chart"
import { ActionQueue } from "@/components/dashboard/action-queue"
import { AutomationHealth } from "@/components/dashboard/automation-health"
import { UpcomingMeetings } from "@/components/dashboard/upcoming-meetings"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { AlertBanners } from "@/components/dashboard/alert-banners"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Calendar, RefreshCw, Download, Filter, Sparkles, Bot } from "lucide-react"
import ThemeToggle from "@/components/ThemeToggle"

export default function DashboardPage() {
  const [dateRange, setDateRange] = useState("7d")

  return (
    <div className="flex flex-col h-full bg-background text-foreground transition-colors duration-300">
      <TopHeader
        title="Command Center"
        subtitle="Your AI-powered sales cockpit"
        actions={
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="outline"
              size="sm"
              className="gap-2 hidden sm:flex bg-transparent border-border hover:border-primary/30"
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[140px] h-9 bg-card border-border">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 bg-transparent border-border hover:border-primary/30"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        }
      />

      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6 bg-slate-50/30 dark:bg-transparent min-h-full transition-colors duration-300">
          <AlertBanners />

          {/* AI Status Bar - bg-white hata kar bg-card/bg-background ka logic lagaya hai */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-card border border-accent/20 dark:bg-gradient-to-r dark:from-accent/10 dark:via-primary/5 dark:to-accent/10 shadow-sm transition-all duration-300 ai-glow-subtle">
            <div className="flex items-center gap-3">
              {/* Icon container also fixed for light/dark */}
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 dark:bg-accent/20 ai-pulse">
                <Bot className="h-5 w-5 text-accent" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  {/* Text fixed to text-foreground */}
                  <span className="text-sm font-semibold text-foreground">AI Engine Active</span>
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  12 workflows running • 156 emails sent today • 3 proposals pending
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="gap-2 text-accent hover:text-accent hover:bg-accent/10">
                <Sparkles className="h-4 w-4" />
                View AI Activity
              </Button>
            </div>
          </div>

          <section>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Key Metrics</h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold">
                  Live
                </span>
              </div>
              <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-foreground gap-1.5 transition-colors">
                <Download className="h-3.5 w-3.5" />
                Export
              </Button>
            </div>
            <DashboardKPIs />
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <FunnelChart />
            </div>
            <div>
              <AutomationHealth />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ActionQueue />
            </div>
            <div>
              <UpcomingMeetings />
            </div>
          </div>

          <RecentActivity />
        </div>
      </div>
    </div>
  )
}