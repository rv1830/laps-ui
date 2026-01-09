"use client"

import { useMemo } from "react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Flame, Clock, Calendar, Sparkles, PanelLeftClose } from "lucide-react"
import { isToday, subDays, parseISO } from "date-fns"

export function LeadSegments({ 
  apiResponse, 
  selectedSegment, 
  onSelectSegment,
  onClose // Prop to handle sidebar closing
}: any) {
  
  const leads = useMemo(() => apiResponse?.leads || [], [apiResponse]);

  const segmentStats = useMemo(() => {
    const now = new Date();
    const sevenDaysAgo = subDays(now, 7);

    return {
      all: leads.length,
      new: leads.filter((l: any) => l.createdAt && isToday(parseISO(l.createdAt))).length,
      hot: leads.filter((l: any) => (l.moodScore || 0) >= 80).length,
      no_response: leads.filter((l: any) => {
        const createdDate = parseISO(l.createdAt);
        return !l.lastContactedAt && createdDate < sevenDaysAgo;
      }).length,
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
    <aside className="w-64 border-r border-border/50 bg-card/20 backdrop-blur-md flex flex-col h-full overflow-hidden select-none">
      {/* Header Section With Close Arrow */}
      <div className="flex items-center justify-between mt-6 mb-6 px-6">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/80">
          Smart Filters
        </h3>
        {/* Sidebar Close Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onClose}
          className="h-7 w-7 rounded-lg hover:bg-primary/10 hover:text-primary text-muted-foreground transition-all duration-300"
        >
          <PanelLeftClose className="h-4 w-4" />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="px-3 space-y-1 flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
        {segments.map((segment) => {
          const Icon = segment.icon
          const isActive = selectedSegment === segment.id
          
          return (
            <button
              key={segment.id}
              onClick={() => onSelectSegment(segment.id)}
              className={cn(
                "w-full group relative flex items-center justify-between px-3 py-3 rounded-xl transition-all duration-200",
                isActive 
                  ? "bg-primary/[0.06] text-primary shadow-[inset_0_0_0_1px_rgba(var(--primary),0.1)]" 
                  : "text-muted-foreground hover:bg-secondary/40 hover:text-foreground"
              )}
            >
              {isActive && (
                <div className="absolute left-0 top-3 bottom-3 w-1 bg-primary rounded-r-full shadow-[2px_0_8px_rgba(var(--primary),0.3)]" />
              )}
              
              <div className="flex items-center gap-3">
                <div className={cn(
                  "flex items-center justify-center h-8 w-8 rounded-lg transition-all border",
                  isActive 
                    ? "bg-background border-primary/20 shadow-sm scale-105" 
                    : "bg-secondary/30 border-transparent"
                )}>
                  <Icon className={cn("h-4 w-4", segment.color)} />
                </div>
                <span className={cn("text-sm font-medium tracking-tight", isActive && "font-bold text-foreground")}>
                  {segment.label}
                </span>
              </div>

              <Badge 
                variant={isActive ? "default" : "secondary"} 
                className={cn(
                  "text-[10px] px-1.5 h-5 min-w-[20px] justify-center font-bold",
                  !isActive && "bg-secondary/50 text-muted-foreground border-none"
                )}
              >
                {segment.count}
              </Badge>
            </button>
          )
        })}
      </nav>

      {/* Insight Card */}
      <div className="p-4 mt-auto">
        <div className="rounded-2xl bg-gradient-to-br from-orange-500/[0.07] via-orange-500/[0.02] to-transparent p-4 border border-orange-500/20 relative overflow-hidden group shadow-sm">
          <div className="absolute -right-1 -top-1 opacity-[0.08] transition-transform duration-500">
            <Flame className="h-14 w-14 text-orange-500" />
          </div>
          
          <div className="relative z-10">
            <p className="text-[10px] font-black text-orange-600 dark:text-orange-400 flex items-center gap-1.5 mb-2 tracking-widest uppercase">
              <Sparkles className="h-3 w-3 fill-orange-500/20" /> Action Required
            </p>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              You have <span className="text-foreground font-bold">{segmentStats.hot} Hot Leads</span> ready for conversion. Follow up now!
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}