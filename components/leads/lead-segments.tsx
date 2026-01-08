"use client"

import { useMemo } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Flame, Clock, Calendar, Plus, Sparkles, Star } from "lucide-react"
import { isToday, subDays, parseISO } from "date-fns"

export function LeadSegments({ 
  apiResponse, // Pura API response pass karein (jisme data.leads ho)
  selectedSegment, 
  onSelectSegment 
}: any) {
  
  // API se leads nikalna (safely handle karna agar data na ho)
  const leads = useMemo(() => apiResponse?.leads || [], [apiResponse]);

  const segmentStats = useMemo(() => {
    const now = new Date();
    const sevenDaysAgo = subDays(now, 7);

    return {
      all: leads.length,
      // New: Jo aaj create hue hain
      new: leads.filter((l: any) => l.createdAt && isToday(parseISO(l.createdAt))).length,
      // Hot: MoodScore >= 80 (Aapke data mein 83 hai, toh ye 1 dikhayega)
      hot: leads.filter((l: any) => (l.moodScore || 0) >= 80).length,
      // No Response: Jinka lastContactedAt null hai aur 7 din se purane leads hain
      no_response: leads.filter((l: any) => {
        const createdDate = parseISO(l.createdAt);
        return !l.lastContactedAt && createdDate < sevenDaysAgo;
      }).length,
      // Booked: Stage name se match karega (Aapke data mein "Call Booked" hai)
      booked: leads.filter((l: any) => 
        l.stage?.name?.toLowerCase().includes('booked')
      ).length,
    }
  }, [leads]);

  const segments = [
    { id: "all", label: "All Leads", count: segmentStats.all, icon: Users, color: "text-blue-500" },
    { id: "new", label: "New Leads", count: segmentStats.new, icon: Sparkles, color: "text-emerald-500" },
    { id: "hot", label: "Hot Leads", count: segmentStats.hot, icon: Flame, color: "text-orange-500" },
    { id: "no_response", label: "No Response", count: segmentStats.no_response, icon: Clock, color: "text-rose-500" },
    { id: "booked", label: "Booked", count: segmentStats.booked, icon: Calendar, color: "text-violet-500" },
  ]

  return (
    <aside className="w-64 border-r border-border/40 bg-card/30 backdrop-blur-xl p-4 flex flex-col h-full">
      <div className="flex items-center justify-between mb-6 px-2">
        <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground/70">
          Smart Filters
        </h3>
        <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full hover:bg-primary/10">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <nav className="space-y-1.5 flex-1">
        {segments.map((segment) => {
          const Icon = segment.icon
          const isActive = selectedSegment === segment.id
          
          return (
            <button
              key={segment.id}
              onClick={() => onSelectSegment(segment.id)}
              className={cn(
                "w-full group relative flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-300",
                isActive 
                  ? "bg-primary/[0.08] text-primary shadow-sm" 
                  : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
              )}
            >
              {isActive && (
                <div className="absolute left-0 top-2 bottom-2 w-1 bg-primary rounded-r-full shadow-[0_0_8px_rgba(var(--primary),0.4)]" />
              )}
              
              <div className="flex items-center gap-3">
                <div className={cn(
                  "flex items-center justify-center h-8 w-8 rounded-lg border border-transparent transition-all",
                  isActive ? "bg-background shadow-sm border-primary/10 scale-110" : "bg-secondary/40"
                )}>
                  <Icon className={cn("h-4 w-4", segment.color)} />
                </div>
                <span className={cn("text-sm font-medium", isActive && "font-bold")}>
                  {segment.label}
                </span>
              </div>

              <Badge variant={isActive ? "default" : "secondary"} className="text-[10px] px-1.5 h-5 min-w-[20px] justify-center">
                {segment.count}
              </Badge>
            </button>
          )
        })}
      </nav>

      {/* Dynamic Insight Card */}
      <div className="mt-auto pt-4">
        <div className="rounded-2xl bg-gradient-to-br from-orange-500/10 via-transparent to-transparent p-4 border border-orange-500/10 relative overflow-hidden group">
          <div className="absolute -right-2 -top-2 opacity-10 group-hover:rotate-12 transition-transform">
            <Flame className="h-12 w-12 text-orange-500" />
          </div>
          <p className="text-[11px] font-bold text-orange-600 dark:text-orange-400 flex items-center gap-2 mb-1">
            <Sparkles className="h-3 w-3" /> ACTION REQUIRED
          </p>
          <p className="text-[10px] text-muted-foreground leading-tight">
            Aapke paas <span className="text-foreground font-bold">{segmentStats.hot} Hot Leads</span> hain jo conversion ke kaafi kareeb hain!
          </p>
        </div>
      </div>
    </aside>
  )
}