"use client"

import { useState, useEffect, useMemo } from "react"
import { useParams } from "next/navigation"
import { LeadTable } from "@/components/leads/lead-table"
import { LeadFilters } from "@/components/leads/lead-filters"
import { LeadSegments } from "@/components/leads/lead-segments"
import { Button } from "@/components/ui/button"
import { 
  Plus, Upload, Download, Filter, Layers, 
  Moon, Sun, Monitor, ChevronRight, Sparkles 
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
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CreateLeadForm } from "@/components/leads/create-lead-form"

export default function LeadsPage() {
  const params = useParams()
  const workspaceId = params.workspaceId as string
  const { setTheme } = useTheme()

  const [selectedSegment, setSelectedSegment] = useState("all")
  const [filters, setFilters] = useState<any>({ search: "", stage: "all" })
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [leadsData, setLeadsData] = useState({ leads: [], pagination: {} })
  const [loading, setLoading] = useState(true)

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

  return (
    <div className="flex flex-col h-screen bg-background transition-colors duration-300">
      
      {/* --- PREMIUM TOP HEADER --- */}
      <header className="h-20 border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-40 px-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-2 text-sm font-medium text-muted-foreground">
             <span>Workspace</span>
             <ChevronRight className="h-4 w-4 opacity-50" />
             <span className="text-foreground font-bold">Leads</span>
          </div>
          <div className="hidden lg:block h-6 w-[1px] bg-border/60 mx-2" />
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <Layers className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight leading-none mb-1">Lead Hub</h1>
              <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground opacity-70">
                {leadsData.pagination?.total || 0} Records Found
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* AI Assist Button - Wapas Add Kiya */}
          <Button variant="outline" size="sm" className="hidden sm:flex gap-2 border-primary/20 hover:bg-primary/5 text-primary rounded-full px-4">
            <Sparkles className="h-4 w-4" /> AI Assist
          </Button>

          {/* Theme Toggle Button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full h-9 w-9 border-border/50">
                <Sun className="h-[1.1rem] w-[1.1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.1rem] w-[1.1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-xl border-border/50">
              <DropdownMenuItem onClick={() => setTheme("light")} className="gap-2"><Sun className="h-4 w-4" /> Light</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")} className="gap-2"><Moon className="h-4 w-4" /> Dark</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")} className="gap-2"><Monitor className="h-4 w-4" /> System</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Quick Actions (Import/Export Group) */}
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

          {/* Quick Add Dialog (New Lead) */}
          <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="h-10 px-6 rounded-full bg-primary hover:bg-primary/90 text-white font-bold shadow-xl shadow-primary/20 active:scale-95 transition-all">
                <Plus className="h-4 w-4 mr-1 stroke-[3px]" /> QUICK ADD
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="text-2xl font-black">Create New Lead</DialogTitle>
                <DialogDescription>Add a new lead to your pipeline database.</DialogDescription>
              </DialogHeader>
              <CreateLeadForm
                workspaceId={workspaceId}
                onSuccess={() => {
                  setCreateDialogOpen(false)
                  fetchLeads()
                }}
              />
            </DialogContent>
          </Dialog>
        </div>
      </header>

      {/* --- CONTENT AREA (Aapke original colors ke saath) --- */}
      <main className="flex flex-1 overflow-hidden p-6 gap-6">
        {/* Sidebar Navigation */}
        <div className="w-56 flex flex-col border-r border-border bg-card overflow-hidden">
          <LeadSegments 
            apiResponse={leadsData} 
            selectedSegment={selectedSegment} 
            onSelectSegment={setSelectedSegment} 
          />
        </div>
        
        {/* Table Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden bg-card border border-border rounded-xl shadow-sm">
          {/* Dashboard Header Bar */}
          <div className="px-6 py-4 border-b border-border bg-card flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <h2 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Lead Explorer</h2>
            </div>
            <div className="flex items-center gap-2">
               <span className="text-[10px] font-bold bg-secondary px-2.5 py-1 rounded-full text-muted-foreground uppercase tracking-tight">
                 Active Segment: {selectedSegment.replace('_', ' ')}
               </span>
            </div>
          </div>
          
          <div className="p-4 bg-card">
            <LeadFilters filters={filters} onFiltersChange={setFilters} />
          </div>

          <div className="flex-1 overflow-hidden px-4 bg-card">
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