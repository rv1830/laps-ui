"use client"

import React, { useEffect, useState, useRef, useCallback } from "react"
import { useParams, useRouter } from "next/navigation"
import { pipelineService } from "@/services/pipeline"
import { leadService } from "@/services/lead"
import { PipelineCard } from "./pipeline-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Plus, 
  Loader2, 
  Users, 
  Bell, 
  Sparkles, 
  Search, 
  Moon, 
  Sun, 
  Monitor,
  MoreHorizontal,
  ArrowLeft,
  Zap,
  Filter,
  X,
  Trash2,
  Edit2,
  AlertCircle
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { useTheme } from "next-themes"
import { Skeleton } from "@/components/ui/skeleton"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"

export function PipelineBoard() {
  const { workspaceId } = useParams() as { workspaceId: string }
  const router = useRouter()
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  
  const [stages, setStages] = useState<any[]>([])
  const [leads, setLeads] = useState<any[]>([])
  const [totalLeads, setTotalLeads] = useState(0)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [dragOverStage, setDragOverStage] = useState<string | null>(null)

  // --- NEW CARD STATES (NO ALERTS) ---
  const [showCard, setShowCard] = useState<'create' | 'edit' | 'delete' | null>(null)
  const [targetStage, setTargetStage] = useState<any>(null)
  const [formName, setFormName] = useState("")
  const [formColor, setFormColor] = useState("#3b82f6")
  
  const observer = useRef<IntersectionObserver | null>(null)

  // Hydration safety
  useEffect(() => setMounted(true), [])

  const lastElementRef = useCallback((node: HTMLDivElement) => {
    if (loading || loadingMore) return
    if (observer.current) observer.current.disconnect()
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prev => prev + 1)
      }
    })
    
    if (node) observer.current.observe(node)
  }, [loading, loadingMore, hasMore])

  const loadLeads = async (pageNum: number, isInitial: boolean) => {
    try {
      if (!isInitial) setLoadingMore(true)
      const data = await leadService.getLeads(workspaceId, { page: pageNum, limit: 50 })
      if (isInitial) {
        setLeads(data.leads || [])
      } else {
        setLeads(prev => [...prev, ...(data.leads || [])])
      }
      setTotalLeads(data.totalCount || 0)
      setHasMore(data.leads.length === 50) 
    } catch (error) {
      console.error("API Error:", error)
    } finally {
      setLoadingMore(false)
      if (isInitial) setLoading(false)
    }
  }

  useEffect(() => {
    if (workspaceId) {
      const init = async () => {
        const stagesData = await pipelineService.getStages(workspaceId)
        setStages(stagesData)
        await loadLeads(1, true)
      }
      init()
    }
  }, [workspaceId])

  useEffect(() => {
    if (page > 1) { loadLeads(page, false) }
  }, [page])

  const onDragOver = (e: React.DragEvent, stageId: string) => {
    e.preventDefault()
    setDragOverStage(stageId)
  }

  const onDrop = async (e: React.DragEvent, targetStageId: string) => {
    const leadId = e.dataTransfer.getData("leadId")
    setDragOverStage(null)
    if (!leadId) return
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, stageId: targetStageId } : l))
    try {
      await leadService.updateLead(workspaceId, leadId, { stageId: targetStageId })
    } catch (error) {
      console.error("Move Error:", error)
    }
  }

  // --- REFRESH ACTION ---
  const handleRefresh = async () => {
    setLoading(true); // START LOADER IMMEDIATELY
    const stagesData = await pipelineService.getStages(workspaceId)
    setStages(stagesData)
    await loadLeads(1, true)
  }

  // --- CARD ACTIONS ---
  const executeAction = async () => {
    const type = showCard;
    setShowCard(null);
    setLoading(true); // TRIGGER SKELETON IMMEDIATELY
    try {
      if (type === 'create') await pipelineService.createStage(workspaceId, { name: formName, color: formColor });
      if (type === 'edit') await pipelineService.updateStage(workspaceId, targetStage.id, { name: formName, color: formColor });
      if (type === 'delete') await pipelineService.deleteStage(workspaceId, targetStage.id);
      await handleRefresh();
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  }

  if (!mounted) return null

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background relative">
      
      {/* --- PREMIUM ENHANCED HEADER --- */}
      <header className="flex items-center justify-between px-6 py-3 border-b bg-card/50 backdrop-blur-md sticky top-0 z-50">
        
        {/* Left Side: Back Arrow, Title & Stats */}
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full h-9 w-9 cursor-pointer" 
            onClick={() => router.push(`/dashboard/${workspaceId}`)}
          >
            <ArrowLeft className="h-3 w-3 " />
          </Button>
          <div className="bg-primary/10 p-2.5 rounded-xl shadow-sm border border-primary/20">
            <Users className="h-5 w-5 text-primary" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold tracking-tight">Workspace Pipeline</h2>
              <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 font-mono">
                {totalLeads} Leads
              </Badge>
            </div>
            <p className="text-[11px] text-muted-foreground flex items-center gap-1.5 font-medium">
              <span className="flex h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
              Live Sync Active • Showing {leads.length} leads
            </p>
          </div>
        </div>

        {/* Right Side: Actions (With New Theme System) */}
        <div className="flex items-center gap-3">
          
          {/* Search Bar (Restored) */}
          <div className="relative hidden md:block">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input 
              placeholder="Quick search..." 
              className="w-64 h-9 pl-9 bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-primary/30 font-medium text-xs"
            />
            <kbd className="absolute right-2 top-1/2 -translate-y-1/2 h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground flex">
              <span className="text-xs">⌘</span>K
            </kbd>
          </div>

          <div className="h-6 w-[1px] bg-border mx-1" />

          {/* AI Insights Button (Restored) */}
          <Button variant="outline" size="sm" className="gap-2 border-primary/20 bg-primary/5 hover:bg-primary/10 text-primary transition-all active:scale-95 font-bold uppercase text-[10px] tracking-tighter italic">
            <Sparkles className="h-4 w-4 fill-primary/20" />
            <span className="hidden sm:inline">AI Insights</span>
          </Button>

          {/* NEW THEME SELECTOR - HOVER SYSTEM (From Import Page) */}
          <div className="group relative flex items-center justify-center">
            <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 border-border bg-background/50 cursor-pointer z-20">
              {theme === 'light' ? <Sun className="h-4 w-4 text-primary" /> : 
               theme === 'dark' ? <Moon className="h-4 w-4 text-primary" /> : 
               <Monitor className="h-4 w-4 text-primary" />}
            </Button>

            <div className="absolute top-0 right-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:right-11 transition-all duration-300 ease-out flex bg-secondary/90 backdrop-blur-md p-1 rounded-full border border-border h-9 items-center gap-1 z-10">
              <button onClick={() => setTheme('light')} className={cn("h-7 w-7 rounded-full flex items-center justify-center cursor-pointer transition-colors", theme === 'light' ? "bg-background text-primary shadow-sm" : "text-muted-foreground hover:text-foreground")}>
                <Sun className="h-3 w-3" />
              </button>
              <button onClick={() => setTheme('dark')} className={cn("h-7 w-7 rounded-full flex items-center justify-center cursor-pointer transition-colors", theme === 'dark' ? "bg-background text-primary shadow-sm" : "text-muted-foreground hover:text-foreground")}>
                <Moon className="h-3 w-3" />
              </button>
              <button onClick={() => setTheme('system')} className={cn("h-7 w-7 rounded-full flex items-center justify-center cursor-pointer transition-colors", theme === 'system' ? "bg-background text-primary shadow-sm" : "text-muted-foreground hover:text-foreground")}>
                <Monitor className="h-3 w-3" />
              </button>
            </div>
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative h-9 w-9 hover:bg-muted transition-colors">
            <Bell className="h-4 w-4" />
            <span className="absolute top-2 right-2.5 h-2 w-2 bg-destructive rounded-full border-2 border-background" />
          </Button>

          {/* Quick Add Button -> Map to ADD STAGE */}
          <Button 
            onClick={() => { setFormName(""); setFormColor("#3b82f6"); setShowCard('create'); }}
            size="sm" 
            className="gap-2 shadow-lg shadow-primary/20 px-4 transition-all active:scale-95 font-bold uppercase tracking-tighter italic text-[11px] cursor-pointer"
          >
            <Plus className="h-4 w-4 stroke-[3px]" />
            Add Stage
          </Button>
        </div>
      </header>

      {/* --- BOARD CONTENT / SKELETON LOADER --- */}
      <div className="flex-1 overflow-x-auto p-6 flex gap-6 items-start relative custom-scrollbar bg-muted/20">
        {loading ? (
          // CARD TYPE SKELETON LOADER
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col w-80 min-w-[340px] gap-4">
              <div className="flex justify-between items-center px-1">
                <Skeleton className="h-6 w-32 bg-muted/40" />
                <Skeleton className="h-5 w-8 rounded-full bg-muted/40" />
              </div>
              <div className="space-y-3 rounded-2xl p-3 bg-card/40 border border-border/50">
                <Skeleton className="h-32 w-full rounded-xl bg-muted/30" />
                <Skeleton className="h-32 w-full rounded-xl bg-muted/30" />
                <Skeleton className="h-32 w-full rounded-xl bg-muted/30" />
              </div>
            </div>
          ))
        ) : (
          stages.map((stage) => {
            const stageLeads = leads.filter((lead) => lead.stageId === stage.id)

            return (
              <div
                key={stage.id}
                className="flex flex-col w-80 min-w-[340px] max-h-full group"
                onDragOver={(e) => onDragOver(e, stage.id)}
                onDrop={(e) => onDrop(e, stage.id)}
              >
                {/* Stage Header */}
                <div className="flex items-center justify-between mb-4 px-1">
                  <div className="flex items-center gap-2.5">
                    <div 
                      className="w-2.5 h-2.5 rounded-full ring-4 ring-background shadow-sm" 
                      style={{ backgroundColor: stage.color }} 
                    />
                    <span className="font-bold text-sm tracking-tight">{stage.name}</span>
                    <Badge variant="secondary" className="px-1.5 py-0 text-[10px] font-bold bg-background shadow-sm border-none">
                      {stageLeads.length}
                    </Badge>
                  </div>
                  <div className="flex opacity-0 group-hover:opacity-100 transition-opacity">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7 cursor-pointer"><MoreHorizontal className="h-3.5 w-3.5" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => { setTargetStage(stage); setFormName(stage.name); setFormColor(stage.color); setShowCard('edit'); }}>
                          <Edit2 className="h-3.5 w-3.5 mr-2 cursor-pointer" /> Rename
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive font-bold cursor-pointer" onClick={() => { setTargetStage(stage); setShowCard('delete'); }}>
                          <Trash2 className="h-3.5 w-3.5 mr-2 cursor-pointer" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button variant="ghost" size="icon" className="h-7 w-7"><Plus className="h-3.5 w-3.5" /></Button>
                  </div>
                </div>

                {/* Lead Cards Container */}
                <div className={cn(
                    "flex-1 rounded-2xl p-3 space-y-3 overflow-y-auto bg-card/40 backdrop-blur-[2px] min-h-[500px] border-2 border-dashed border-transparent transition-all duration-200 shadow-inner",
                    dragOverStage === stage.id && "border-primary/40 bg-primary/5 scale-[1.01]"
                )}>
                  {stageLeads.map((lead) => (
                    <PipelineCard key={lead.id} lead={lead} workspaceId={workspaceId} />
                  ))}
                  
                  {/* Infinite Scroll Sentinel */}
                  {stage.id === stages[stages.length - 1].id && (
                     <div ref={lastElementRef} className="h-20 w-full flex items-center justify-center">
                        {loadingMore && (
                          <div className="flex flex-col items-center gap-2">
                            <Loader2 className="h-5 w-5 animate-spin text-primary" />
                            <span className="text-[10px] text-muted-foreground font-medium">Fetching leads...</span>
                          </div>
                        )}
                     </div>
                  )}
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* --- OVERLAY CARD COMPONENTS (NO ALERTS) --- */}
      {showCard && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-[2px] p-4">
          <div className="bg-card w-full max-w-sm rounded-[2rem] shadow-2xl border border-border p-6 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-black tracking-tight uppercase italic">
                {showCard === 'create' ? "New Stage" : showCard === 'edit' ? "Edit Stage" : "Delete Stage"}
              </h3>
              <button onClick={() => setShowCard(null)} className="p-2 hover:bg-muted rounded-full transition-colors"><X className="h-4 w-4"/></button>
            </div>

            {showCard !== 'delete' ? (
              <div className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-muted-foreground ml-1">Stage Name</label>
                  <Input 
                    value={formName} 
                    onChange={(e) => setFormName(e.target.value)} 
                    className="bg-muted/50 border-none h-12 rounded-2xl font-bold focus-visible:ring-1 focus-visible:ring-primary/30"
                    placeholder="E.g. In Progress"
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-2xl border border-border/50">
                  <span className="text-xs font-bold uppercase text-muted-foreground">Tag Color</span>
                  <input 
                    type="color" 
                    value={formColor} 
                    onChange={(e) => setFormColor(e.target.value)}
                    className="w-8 h-8 rounded-full border-none bg-transparent cursor-pointer" 
                  />
                </div>
              </div>
            ) : (
              <div className="p-5 bg-destructive/10 rounded-3xl border border-destructive/20 flex gap-4 items-start mb-6">
                <AlertCircle className="h-6 w-6 text-destructive shrink-0 mt-0.5" />
                <p className="text-sm font-bold text-destructive leading-tight">
                  Warning: Deleting this stage will erase all associated leads permanently.
                </p>
              </div>
            )}

            <div className="mt-8 flex gap-3">
              <Button variant="ghost" className="flex-1 rounded-2xl font-bold h-12 cursor-pointer" onClick={() => setShowCard(null)}>Cancel</Button>
              <Button 
                className={cn("flex-1 rounded-2xl font-bold h-12 cursor-pointer", showCard === 'delete' && "bg-destructive hover:bg-destructive/90")}
                onClick={executeAction}
              >
                {showCard === 'delete' ? "Delete All" : "Save Stage"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}