"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  MoreHorizontal, Mail, Phone, Calendar, FileText, 
  ArrowUpDown, RefreshCw, Trash2, Send, Zap, 
  AlertCircle, CheckCircle2, Clock
} from "lucide-react"
import { stageColors, moodColors } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { formatDistanceToNow } from "date-fns"
import { leadService } from "@/services/lead"
import { toast } from "sonner"

interface LeadTableProps {
  leads: any[]
  isLoading: boolean
  onRefresh: () => Promise<void>
  workspaceId: string
}

export function LeadTable({ leads, isLoading, onRefresh, workspaceId }: LeadTableProps) {
  const [selectedLeads, setSelectedLeads] = useState<string[]>([])
  const [isActionLoading, setIsActionLoading] = useState<string | null>(null)

  const displayedLeads = leads || []

  const toggleSelectAll = () => {
    if (selectedLeads.length === displayedLeads.length) {
      setSelectedLeads([])
    } else {
      setSelectedLeads(displayedLeads.map((l) => l.id))
    }
  }

  const toggleSelectLead = (id: string) => {
    setSelectedLeads((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  const handleDeleteLead = async (id: string) => {
    try {
      setIsActionLoading(id)
      await leadService.deleteLead(workspaceId, id)
      toast.success("Lead deleted successfully")
      await onRefresh()
    } catch (error) {
      toast.error("Failed to delete lead")
    } finally {
      setIsActionLoading(null)
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Bulk Actions */}
      {selectedLeads.length > 0 && (
        <div className="p-3 bg-primary/5 border-b border-border flex items-center gap-4 animate-in fade-in slide-in-from-top-2">
          <span className="text-xs text-foreground font-bold uppercase tracking-wider">
            {selectedLeads.length} leads selected
          </span>
          <div className="flex items-center gap-2">
            <Button size="xs" variant="outline" className="h-7 text-[10px] font-bold uppercase tracking-tighter">
              <Zap className="h-3 w-3 mr-1" /> Sequence
            </Button>
            <Button size="xs" variant="outline" className="h-7 text-[10px] font-bold uppercase tracking-tighter text-destructive">
              <Trash2 className="h-3 w-3 mr-1" /> Delete
            </Button>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-auto">
        <Table>
          <TableHeader className="sticky top-0 bg-card z-10 shadow-sm">
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedLeads.length === displayedLeads.length && displayedLeads.length > 0}
                  onCheckedChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Lead Details</TableHead>
              <TableHead className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Status & Stage</TableHead>
              <TableHead className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Mood & Intent</TableHead>
              <TableHead className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Source</TableHead>
              <TableHead className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Created</TableHead>
              <TableHead className="w-24 text-right pr-6 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="h-32 text-center">
                  <div className="flex flex-col items-center justify-center gap-3 text-muted-foreground text-sm">
                    <RefreshCw className="h-6 w-6 animate-spin text-primary" />
                    <span className="font-medium animate-pulse">Fetching leads from workspace...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : displayedLeads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-32 text-center">
                   <div className="flex flex-col items-center justify-center gap-2">
                      <AlertCircle className="h-8 w-8 text-muted-foreground/50" />
                      <p className="text-muted-foreground font-medium">No leads found in this pipeline.</p>
                   </div>
                </TableCell>
              </TableRow>
            ) : (
              displayedLeads.map((lead) => {
                const initials = (lead.fullName || lead.email).substring(0, 2).toUpperCase();
                
                return (
                  <TableRow key={lead.id} className="group hover:bg-muted/40 transition-all border-b border-muted/50">
                    <TableCell>
                      <Checkbox
                        checked={selectedLeads.includes(lead.id)}
                        onCheckedChange={() => toggleSelectLead(lead.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <Link href={`/dashboard/${workspaceId}/leads/${lead.id}`} className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border shadow-sm group-hover:border-primary/50 transition-colors">
                          <AvatarFallback className="bg-primary/5 text-primary text-[10px] font-black tracking-tighter">
                            {initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col min-w-0">
                          <p className="text-sm font-bold text-foreground leading-none mb-1 group-hover:text-primary transition-colors truncate max-w-[180px]">
                            {lead.fullName || lead.email}
                          </p>
                          <p className="text-[11px] text-muted-foreground font-medium truncate max-w-[180px]">
                            {lead.jobTitle ? `${lead.jobTitle} @ ` : ""}{lead.company || lead.email}
                          </p>
                        </div>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1.5">
                        <Badge 
                          variant="outline" 
                          className={cn("text-[9px] w-fit uppercase font-black px-2 py-0 border-2", stageColors[lead.stage?.id] || "border-muted")}
                        >
                          {lead.stage?.name || "New Lead"}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Badge className={cn("text-[9px] h-4 font-bold capitalize", 
                            lead.qualificationLabel === 'qualified' ? "bg-green-500 hover:bg-green-500" : "bg-muted text-muted-foreground")}>
                            {lead.qualificationLabel}
                          </Badge>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2">
                           <div className="w-12 h-1 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-primary" style={{ width: `${lead.moodScore}%` }} />
                           </div>
                           <span className="text-[10px] font-bold text-muted-foreground">{lead.moodScore}%</span>
                        </div>
                        <Badge variant="outline" className={cn("text-[9px] w-fit uppercase font-black px-1.5 py-0 border-2", moodColors[lead.moodLabel])}>
                           {lead.moodLabel}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary/40" />
                        <span className="text-xs font-bold text-muted-foreground capitalize">{lead.source || "manual"}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-foreground whitespace-nowrap">
                          {formatDistanceToNow(new Date(lead.createdAt), { addSuffix: true })}
                        </span>
                        <span className="text-[10px] text-muted-foreground">Initial Capture</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <div className="flex items-center justify-end gap-1">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/10 hover:text-primary">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-56 p-1">
                            <DropdownMenuItem className="text-xs font-bold py-2 cursor-pointer">
                              <Mail className="mr-2 h-4 w-4 text-blue-500" /> Send Email
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-xs font-bold py-2 cursor-pointer">
                              <Zap className="mr-2 h-4 w-4 text-amber-500" /> Add to Sequence
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-xs font-bold py-2 cursor-pointer">
                              <Calendar className="mr-2 h-4 w-4 text-green-500" /> Book Meeting
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-xs font-bold py-2 cursor-pointer">
                              <Send className="mr-2 h-4 w-4 text-purple-500" /> Follow Up
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-xs font-bold py-2 cursor-pointer">
                              <FileText className="mr-2 h-4 w-4 text-muted-foreground" /> View Details
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-xs font-bold py-2 cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive"
                              onClick={() => handleDeleteLead(lead.id)}
                              disabled={isActionLoading === lead.id}
                            >
                              <Trash2 className="mr-2 h-4 w-4" /> 
                              {isActionLoading === lead.id ? "Deleting..." : "Delete Lead"}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}