"use client"

import { useState } from "react"
import Link from "next/link"
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  MoreHorizontal, Mail, Phone, Calendar, FileText, 
  RefreshCw, Trash2, Send, Zap, 
  AlertCircle, Pencil, CheckCircle2, User, Loader2
} from "lucide-react"
import { moodColors } from "@/lib/mock-data"
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
  
  // Edit State
  const [editingLead, setEditingLead] = useState<any>(null)
  const [isUpdateLoading, setIsUpdateLoading] = useState(false)

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

  const handleUpdateLead = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingLead) return
    
    try {
      setIsUpdateLoading(true)
      await leadService.updateLead(workspaceId, editingLead.id, { 
        fullName: editingLead.fullName, 
        email: editingLead.email, 
        phone: editingLead.phone,
        company: editingLead.company,
        jobTitle: editingLead.jobTitle,
        source: editingLead.source,
        qualificationLabel: editingLead.qualificationLabel,
        moodLabel: editingLead.moodLabel,
        moodScore: Number(editingLead.moodScore),
        stageId: editingLead.stageId // Added stage update support
      })
      toast.success("Lead updated successfully")
      setEditingLead(null) 
      await onRefresh()
    } catch (error) {
      toast.error("Failed to update lead")
    } finally {
      setIsUpdateLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full relative">
      {/* Bulk Actions */}
      {selectedLeads.length > 0 && (
        <div className="p-3 bg-primary/5 border-b border-border flex items-center gap-4 animate-in fade-in slide-in-from-top-2">
          <span className="text-xs text-foreground font-bold uppercase tracking-wider">
            {selectedLeads.length} leads selected
          </span>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" className="h-7 text-[10px] font-bold uppercase tracking-tighter">
              <Zap className="h-3 w-3 mr-1" /> Sequence
            </Button>
            <Button size="sm" variant="outline" className="h-7 text-[10px] font-bold uppercase tracking-tighter text-destructive">
              <Trash2 className="h-3 w-3 mr-1" /> Delete
            </Button>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-auto">
        <Table>
          <TableHeader className="sticky top-0 bg-card z-10 shadow-sm">
            <TableRow className="hover:bg-transparent border-b">
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
          <TableBody className="relative">
            {/* CARD LOADER OVERLAY */}
            {(isLoading || isUpdateLoading) && (
              <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/40 backdrop-blur-[1px]">
                <div className="bg-card p-6 rounded-xl shadow-2xl border border-primary/20 flex flex-col items-center gap-3">
                  <Loader2 className="h-10 w-10 animate-spin text-primary" />
                  <span className="text-xs font-bold uppercase tracking-tighter text-primary">Processing...</span>
                </div>
              </div>
            )}

            {displayedLeads.length === 0 && !isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="h-32 text-center">
                   <div className="flex flex-col items-center justify-center gap-2">
                      <AlertCircle className="h-8 w-8 text-muted-foreground/50" />
                      <p className="text-muted-foreground font-medium">No leads found.</p>
                   </div>
                </TableCell>
              </TableRow>
            ) : (
              displayedLeads.map((lead) => {
                const displayName = lead.fullName || lead.email;
                const initials = displayName.substring(0, 2).toUpperCase();
                
                return (
                  <TableRow 
                    key={lead.id} 
                    className="group transition-all duration-300 border-b border-muted/50 hover:bg-muted/40 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
                  >
                    <TableCell onClick={(e) => e.stopPropagation()}>
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
                            {displayName}
                          </p>
                          <p className="text-[11px] text-muted-foreground font-medium truncate max-w-[180px]">
                            {lead.jobTitle ? `${lead.jobTitle} @ ` : ""}{lead.company && lead.company !== "NA" ? lead.company : lead.email}
                          </p>
                        </div>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1.5">
                        <Badge 
                          variant="outline" 
                          className="text-[9px] w-fit uppercase font-black px-2 py-0 border-2 bg-background"
                          style={{ borderColor: lead.stage?.color || '#e2e8f0', color: lead.stage?.color || 'inherit' }}
                        >
                          {lead.stage?.name || "New Lead"}
                        </Badge>
                        <Badge className={cn("text-[9px] w-fit h-4 font-bold capitalize", 
                          lead.qualificationLabel === 'qualified' ? "bg-green-500 hover:bg-green-500" : 
                          lead.qualificationLabel === 'unqualified' ? "bg-red-500 hover:bg-red-500" : "bg-muted text-muted-foreground")}>
                          {lead.qualificationLabel || "unqualified"}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2">
                           <div className="w-12 h-1 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-primary" style={{ width: `${lead.moodScore || 50}%` }} />
                           </div>
                           <span className="text-[10px] font-bold text-muted-foreground">{lead.moodScore || 50}%</span>
                        </div>
                        <Badge variant="outline" className={cn("text-[9px] w-fit uppercase font-black px-1.5 py-0 border-2 bg-background", moodColors[lead.moodLabel] || "border-muted")}>
                           {lead.moodLabel || "neutral"}
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
                    <TableCell className="text-right pr-6" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/10 hover:text-primary">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-56 p-1">
                            <DropdownMenuItem 
                              className="text-xs font-bold py-2 cursor-pointer"
                              onClick={() => setEditingLead({ ...lead, stageId: lead.stage?.id })}
                            >
                              <Pencil className="mr-2 h-4 w-4 text-orange-500" /> Edit Details
                            </DropdownMenuItem>
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

      {/* UPDATE LEAD PROFILE DIALOG */}
      <Dialog open={!!editingLead} onOpenChange={(open) => !open && setEditingLead(null)}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold flex items-center gap-2">
              <User className="h-5 w-5 text-primary" /> Update Lead Profile
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdateLead} className="space-y-6 py-4">
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Full Name</Label>
                <Input value={editingLead?.fullName || ""} onChange={(e) => setEditingLead({...editingLead, fullName: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Email</Label>
                <Input type="email" value={editingLead?.email || ""} onChange={(e) => setEditingLead({...editingLead, email: e.target.value})} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Phone</Label>
                <Input value={editingLead?.phone || ""} onChange={(e) => setEditingLead({...editingLead, phone: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Company</Label>
                <Input value={editingLead?.company || ""} onChange={(e) => setEditingLead({...editingLead, company: e.target.value})} />
              </div>
            </div>

            {/* PIPELINE & QUALIFICATION SECTION */}
            <div className="grid grid-cols-2 gap-4 border-t pt-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Lead Stage</Label>
                <Select value={editingLead?.stageId || ""} onValueChange={(v) => setEditingLead({...editingLead, stageId: v})}>
                  <SelectTrigger className="font-bold"><SelectValue placeholder="Select Stage" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="replied">Replied</SelectItem>
                    <SelectItem value="qualified">Qualified</SelectItem>
                    <SelectItem value="call_booked">Call Booked</SelectItem>
                    <SelectItem value="presented">Presented</SelectItem>
                    <SelectItem value="proposal_sent">Proposal Sent</SelectItem>
                    <SelectItem value="invoice_sent">Invoice Sent</SelectItem>
                    <SelectItem value="won">Won</SelectItem>
                    <SelectItem value="lost">Lost</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Qualification</Label>
                <Select value={editingLead?.qualificationLabel || "unqualified"} onValueChange={(v) => setEditingLead({...editingLead, qualificationLabel: v})}>
                  <SelectTrigger className="font-bold"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unqualified">Unqualified</SelectItem>
                    <SelectItem value="qualified">Qualified</SelectItem>
                    <SelectItem value="disqualified">Disqualified</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* SOURCE & MOOD SECTION */}
            <div className="grid grid-cols-2 gap-4 border-t pt-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Lead Source</Label>
                <Select value={editingLead?.source || "Website Form"} onValueChange={(v) => setEditingLead({...editingLead, source: v})}>
                  <SelectTrigger className="font-bold"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Website Form">Website Form</SelectItem>
                    <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                    <SelectItem value="Referral">Referral</SelectItem>
                    <SelectItem value="Cold Outreach">Cold Outreach</SelectItem>
                    <SelectItem value="Google Ads">Google Ads</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Mood Label</Label>
                <Select value={editingLead?.moodLabel || "neutral"} onValueChange={(v) => setEditingLead({...editingLead, moodLabel: v})}>
                  <SelectTrigger className="font-bold"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="positive">Positive</SelectItem>
                    <SelectItem value="neutral">Neutral</SelectItem>
                    <SelectItem value="negative">Negative</SelectItem>
                    <SelectItem value="unknown">Unknown</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Mood Score ({editingLead?.moodScore || 50}%)</Label>
              <Input type="number" min="0" max="100" value={editingLead?.moodScore || 50} onChange={(e) => setEditingLead({...editingLead, moodScore: e.target.value})} />
            </div>

            <DialogFooter className="pt-4 border-t">
              <Button type="button" variant="ghost" className="text-xs font-bold" onClick={() => setEditingLead(null)}>Cancel</Button>
              <Button type="submit" className="text-xs font-bold bg-green-600 hover:bg-green-700" disabled={isUpdateLoading}>
                {isUpdateLoading ? <RefreshCw className="h-3 w-3 animate-spin mr-2" /> : <CheckCircle2 className="h-3 w-3 mr-2" />}
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}