"use client"

import React, { useEffect, useState, useRef, useCallback } from "react"
import { useParams } from "next/navigation"
import { pipelineService } from "@/services/pipeline"
import { leadService } from "@/services/lead"
import { PipelineCard } from "./pipeline-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, Loader2, Users } from "lucide-react"
import { cn } from "@/lib/utils"

export function PipelineBoard() {
  const { workspaceId } = useParams() as { workspaceId: string }
  
  const [stages, setStages] = useState<any[]>([])
  const [leads, setLeads] = useState<any[]>([])
  const [totalLeads, setTotalLeads] = useState(0)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [dragOverStage, setDragOverStage] = useState<string | null>(null)
  
  const observer = useRef<IntersectionObserver | null>(null)

  // Infinite Scroll Trigger Logic
  const lastElementRef = useCallback((node: HTMLDivElement) => {
    if (loading || loadingMore) return
    if (observer.current) observer.current.disconnect()
    
    observer.current = new IntersectionObserver(entries => {
      // Agar sentinel div screen par dikha aur data bacha hai, to next page load karo
      if (entries[0].isIntersecting && hasMore) {
        console.log("Fetching next page:", page + 1)
        setPage(prev => prev + 1)
      }
    })
    
    if (node) observer.current.observe(node)
  }, [loading, loadingMore, hasMore, page])

  const loadLeads = async (pageNum: number, isInitial: boolean) => {
    try {
      if (!isInitial) setLoadingMore(true)
      
      // Backend se 50 leads mangwana
      const data = await leadService.getLeads(workspaceId, { 
        page: pageNum, 
        limit: 50 
      })
      
      if (isInitial) {
        setLeads(data.leads || [])
      } else {
        // Purane leads mein naye leads jodna
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
    if (page > 1) {
      loadLeads(page, false)
    }
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

  if (loading) return (
    <div className="flex items-center justify-center h-full">
      <Loader2 className="animate-spin mr-2" /> Initializing Board...
    </div>
  )

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Total Count Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b bg-background">
        <div className="flex items-center gap-4">
          <div className="bg-primary/10 p-2 rounded-md">
            <Users className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-sm font-bold">Workspace Pipeline</h2>
            <p className="text-xs text-muted-foreground">
              Total Leads: <span className="font-bold text-foreground">{totalLeads}</span>
            </p>
          </div>
        </div>
        <div className="text-xs text-muted-foreground font-mono">
          Showing {leads.length} of {totalLeads} leads
        </div>
      </div>

      {/* Board Columns */}
      <div className="flex-1 overflow-x-auto p-4 flex gap-4 items-start relative custom-scrollbar">
        {stages.map((stage) => {
          const stageLeads = leads.filter((lead) => lead.stageId === stage.id)

          return (
            <div
              key={stage.id}
              className="flex flex-col w-80 min-w-[320px] max-h-full"
              onDragOver={(e) => onDragOver(e, stage.id)}
              onDrop={(e) => onDrop(e, stage.id)}
            >
              <div className="flex items-center justify-between mb-3 px-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: stage.color }} />
                  <span className="font-semibold text-sm">{stage.name}</span>
                  <Badge variant="secondary" className="text-[10px]">{stageLeads.length}</Badge>
                </div>
                <Button variant="ghost" size="icon" className="h-7 w-7"><Plus className="h-4 w-4" /></Button>
              </div>

              <div className={cn(
                  "flex-1 rounded-xl p-2 space-y-3 overflow-y-auto bg-muted/30 min-h-[500px] border border-transparent",
                  dragOverStage === stage.id && "border-primary bg-primary/5"
              )}>
                {stageLeads.map((lead) => (
                  <PipelineCard key={lead.id} lead={lead} workspaceId={workspaceId} />
                ))}
                
                {/* Agar ye aakhri stage hai, to iske niche trigger lagao */}
                {stage.id === stages[stages.length - 1].id && (
                   <div ref={lastElementRef} className="h-10 w-full flex items-center justify-center">
                      {loadingMore && <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />}
                   </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}