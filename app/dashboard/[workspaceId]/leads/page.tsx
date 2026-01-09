"use client"

import { useState, useEffect, useMemo } from "react"
import { useParams } from "next/navigation"
import { LeadTable } from "@/components/leads/lead-table"
import { LeadFilters } from "@/components/leads/lead-filters"
import { LeadSegments } from "@/components/leads/lead-segments"
import { Button } from "@/components/ui/button"
import { 
  Plus, Upload, Download, Layers, 
  Moon, Sun, Monitor, ChevronRight, Sparkles,
  Bell, Calendar, FileText, Zap, 
  Mail, Phone, Target, Settings
} from "lucide-react"
import Link from "next/link"
import { leadService } from "@/services/lead"
import { isToday, parseISO, subDays } from "date-fns"
import { useTheme } from "next-themes"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { CreateLeadForm } from "@/components/leads/create-lead-form"
import { cn } from "@/lib/utils"

export default function LeadsPage() {
  const params = useParams()
  const workspaceId = params.workspaceId as string
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  const [selectedSegment, setSelectedSegment] = useState("all")
  const [filters, setFilters] = useState<any>({ search: "", stage: "all" })
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [leadsData, setLeadsData] = useState({ leads: [], pagination: {} })
  const [loading, setLoading] = useState(true)

  useEffect(() => setMounted(true), [])

  const fetchLeads = async () => {
    try {
      setLoading(true)
      const data = await leadService.getLeads(workspaceId, {
        search: filters.search,
        stageId: filters.stage === "all" ? undefined : filters.stage
      })
      setLeadsData(data)
    } catch (error) {
      console.error("Error fetching leads:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLeads()
  }, [workspaceId, filters])

  const filteredLeads = useMemo(() => {
    const leads = leadsData.leads || []
    const now = new Date()
    const sevenDaysAgo = subDays(now, 7)

    switch (selectedSegment) {
      case "new":
        return leads.filter((l: any) => l.createdAt && isToday(parseISO(l.createdAt)))
      case "hot":
        return leads.filter((l: any) => (l.moodScore || 0) >= 80)
      case "no_response":
        return leads.filter((l: any) => !l.lastContactedAt && parseISO(l.createdAt) < sevenDaysAgo)
      case "booked":
        return leads.filter((l: any) => l.stage?.name?.toLowerCase().includes('booked'))
      default:
        return leads
    }
  }, [leadsData.leads, selectedSegment])

  if (!mounted) return null

  return (
    <div className="flex flex-col h-screen bg-background transition-colors duration-300">
      
      {/* --- PREMIUM TOP HEADER --- */}
      <header className="h-20 border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-40 px-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-2 text-sm font-medium text-muted-foreground">
             <span>Workspace</span>
             <ChevronRight className="h-4 w-4 opacity-50" />
             <span className="text-foreground font-bold font-heading uppercase tracking-tighter">Leads</span>
          </div>
          <div className="hidden lg:block h-6 w-[1px] bg-border/60 mx-2" />
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <Layers className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tighter leading-none mb-1 text-foreground uppercase">Lead Hub</h1>
              <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground opacity-70">
                {leadsData.pagination?.total || 0} Records Found
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" className="hidden sm:flex gap-2 border-primary/20 hover:bg-primary/5 text-primary rounded-full px-4 hover:scale-105 transition-transform">
            <Sparkles className="h-4 w-4" /> AI Assist
          </Button>

          {/* --- ULTRA INTERACTIVE THEME SLIDER --- */}
          <div className="flex bg-secondary/50 p-1 rounded-full border border-border/40 relative w-[108px] h-9 items-center overflow-hidden">
             <div 
               className={cn(
                 "absolute h-7 w-7 bg-background rounded-full shadow-md transition-all duration-300 ease-in-out border border-border/20",
                 theme === 'light' ? "translate-x-0" : theme === 'dark' ? "translate-x-[34px]" : "translate-x-[68px]"
               )}
             />
             <button 
               onClick={() => setTheme('light')} 
               className={cn("z-10 flex-1 flex items-center justify-center transition-colors", theme === 'light' ? "text-primary scale-110" : "text-muted-foreground hover:text-foreground")}
             >
               <Sun className="h-3.5 w-3.5" />
             </button>
             <button 
               onClick={() => setTheme('dark')} 
               className={cn("z-10 flex-1 flex items-center justify-center transition-colors", theme === 'dark' ? "text-primary scale-110" : "text-muted-foreground hover:text-foreground")}
             >
               <Moon className="h-3.5 w-3.5" />
             </button>
             <button 
               onClick={() => setTheme('system')} 
               className={cn("z-10 flex-1 flex items-center justify-center transition-colors", theme === 'system' ? "text-primary scale-110" : "text-muted-foreground hover:text-foreground")}
             >
               <Monitor className="h-3.5 w-3.5" />
             </button>
          </div>

          <div className="hidden md:flex items-center gap-1 bg-secondary/30 p-1 rounded-full border border-border/40">
            <Button variant="ghost" size="sm" className="rounded-full h-8 px-4 text-[11px] font-bold hover:bg-background transition-all">
              <Download className="h-3.5 w-3.5 mr-1" /> EXPORT
            </Button>
            <Link href={`/dashboard/${workspaceId}/leads/import`}>
              <Button variant="ghost" size="sm" className="rounded-full h-8 px-4 text-[11px] font-bold hover:bg-background transition-all">
                <Upload className="h-3.5 w-3.5 mr-1" /> IMPORT
              </Button>
            </Link>
          </div>

          <Button 
            onClick={() => setCreateDialogOpen(true)}
            className="h-10 px-6 rounded-full bg-primary hover:bg-primary/90 text-white font-black shadow-xl shadow-primary/20 active:scale-95 transition-all"
          >
            <Plus className="h-4 w-4 mr-1.5 stroke-[3px]" /> NEW LEAD
          </Button>

          {/* --- EXTENDED QUICK ACTIONS (5 OPTIONS) --- */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-10 w-10 rounded-full border-border/50 bg-background/50 flex items-center justify-center p-0 hover:border-primary/50 transition-colors group">
                <Zap className="h-4 w-4 text-primary group-hover:fill-primary transition-all" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 rounded-2xl p-2 shadow-2xl border-border/50 backdrop-blur-xl">
              <DropdownMenuLabel className="text-[10px] uppercase tracking-widest text-muted-foreground px-3 py-2">Quick Commands</DropdownMenuLabel>
              
              <DropdownMenuItem className="gap-3 py-3 rounded-xl cursor-pointer hover:bg-blue-500/5 transition-colors">
                <div className="h-9 w-9 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-600">
                  <Calendar className="h-4 w-4" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-sm">Schedule Demo</span>
                  <span className="text-[10px] text-muted-foreground">Sync with Google Calendar</span>
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem className="gap-3 py-3 rounded-xl cursor-pointer hover:bg-orange-500/5 transition-colors">
                <div className="h-9 w-9 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-600">
                  <FileText className="h-4 w-4" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-sm">Create Task</span>
                  <span className="text-[10px] text-muted-foreground">Assign follow-up work</span>
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem className="gap-3 py-3 rounded-xl cursor-pointer hover:bg-green-500/5 transition-colors">
                <div className="h-9 w-9 rounded-lg bg-green-500/10 flex items-center justify-center text-green-600">
                  <Mail className="h-4 w-4" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-sm">Send Email</span>
                  <span className="text-[10px] text-muted-foreground">Use a saved template</span>
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem className="gap-3 py-3 rounded-xl cursor-pointer hover:bg-purple-500/5 transition-colors">
                <div className="h-9 w-9 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-600">
                  <Target className="h-4 w-4" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-sm">Launch Campaign</span>
                  <span className="text-[10px] text-muted-foreground">Automated sequence</span>
                </div>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="my-2" />
              
              <DropdownMenuItem className="gap-3 py-2 rounded-xl cursor-pointer text-muted-foreground hover:text-foreground transition-colors">
                <Settings className="h-4 w-4 ml-2.5" />
                <span className="font-bold text-xs uppercase tracking-tight">Pipeline Settings</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" size="icon" className="rounded-full h-10 w-10 border-border/50 relative bg-background/50 hover:bg-secondary/50 transition-colors">
            <Bell className="h-4 w-4" />
            <span className="absolute top-3 right-3.5 h-2 w-2 bg-red-500 rounded-full border-2 border-background animate-pulse" />
          </Button>

          <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
            <DialogContent className="sm:max-w-[500px] rounded-[2rem] border-none shadow-2xl p-0 overflow-hidden">
              <div className="bg-primary/5 p-8 border-b border-primary/10">
                <DialogHeader>
                  <DialogTitle className="text-3xl font-black tracking-tighter uppercase">Create Lead</DialogTitle>
                  <DialogDescription className="text-muted-foreground font-medium">Add a high-potential lead to your database.</DialogDescription>
                </DialogHeader>
              </div>
              <div className="p-8 bg-background">
                <CreateLeadForm
                  workspaceId={workspaceId}
                  onSuccess={() => {
                    setCreateDialogOpen(false)
                    fetchLeads()
                  }}
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      {/* --- CONTENT AREA --- */}
      <main className="flex flex-1 overflow-hidden p-6 gap-6">
        <div className="w-64 flex flex-col pr-4 overflow-y-auto">
          <LeadSegments 
            apiResponse={leadsData} 
            selectedSegment={selectedSegment} 
            onSelectSegment={setSelectedSegment} 
          />
        </div>
        
        <div className="flex-1 flex flex-col overflow-hidden bg-card border border-border/80 rounded-[2rem] shadow-sm relative">
          <div className="px-8 py-5 border-b border-border/50 bg-background/50 backdrop-blur-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <h2 className="text-xs font-black uppercase tracking-widest text-foreground">Lead Intelligence</h2>
            </div>
            <div className="flex items-center gap-2">
               <span className="text-[10px] font-black bg-primary/10 px-3 py-1.5 rounded-full text-primary uppercase tracking-tighter">
                 Segment: {selectedSegment.replace('_', ' ')}
               </span>
            </div>
          </div>
          
          <div className="p-6 bg-background/30">
            <LeadFilters filters={filters} onFiltersChange={setFilters} />
          </div>

          <div className="flex-1 overflow-hidden px-6 bg-background/20">
            <LeadTable
              leads={filteredLeads}
              isLoading={loading}
              onRefresh={fetchLeads}
              workspaceId={workspaceId}
            />
          </div>
        </div>
      </main>
    </div>
  )
}