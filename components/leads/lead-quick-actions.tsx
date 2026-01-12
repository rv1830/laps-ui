"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Mail, Calendar, FileText, Receipt, Zap, Sparkles, 
  Trash2, Loader2, MessageSquarePlus, CheckSquare, PlusCircle 
} from "lucide-react"
import { leadService } from "@/services/lead"
import { taskService, type CreateTaskData } from "@/services/task" // CreateTaskData import kiya
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function LeadQuickActions({ lead }: { lead: any }) {
  const params = useParams()
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)
  const [isTaskLoading, setIsTaskLoading] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  
  // FIX: Priority ko explicitly type assign kiya
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "medium" as "low" | "medium" | "high", 
    type: "follow_up",
    dueAt: ""
  })
  
  const workspaceId = params.workspaceId as string

  const handleDelete = async () => {
    try {
      setIsDeleting(true)
      await leadService.deleteLead(workspaceId, lead.id)
      toast.success("Lead deleted successfully")
      router.push(`/dashboard/${workspaceId}/leads`)
      router.refresh()
    } catch (error) {
      toast.error("Failed to delete lead")
    } finally {
      setIsDeleting(false)
    }
  }

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!taskData.title.trim()) return
    
    try {
      setIsTaskLoading(true)
      
      // Payload ko explicitly cast kiya taaki TS error na de
      const payload: CreateTaskData = {
        leadId: lead.id,
        title: taskData.title,
        description: taskData.description,
        priority: taskData.priority,
        type: taskData.type,
        dueAt: taskData.dueAt
      }

      await taskService.createTask(workspaceId, payload)
      toast.success("Task created successfully")
      setTaskData({ title: "", description: "", priority: "medium", type: "follow_up", dueAt: "" })
      setIsDialogOpen(false)
      router.refresh()
    } catch (error) {
      toast.error("Failed to create task")
    } finally {
      setIsTaskLoading(false)
    }
  }

  return (
    <Card className="shadow-sm border-primary/10 overflow-hidden">
      <CardHeader className="bg-muted/30 pb-3">
        <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
          <Zap className="h-3 w-3 text-primary" /> Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 grid grid-cols-1 gap-2">
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full justify-start gap-3 h-10 font-medium hover:bg-primary/5 hover:text-primary border-dashed">
              <CheckSquare className="h-4 w-4 text-primary" /> Add Task
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleCreateTask}>
              <DialogHeader>
                <DialogTitle className="uppercase italic font-black tracking-tighter text-primary">New Task for {lead.fullName}</DialogTitle>
              </DialogHeader>
              <div className="py-4 space-y-4">
                <div className="space-y-2">
                  <Label>Title *</Label>
                  <Input 
                    placeholder="e.g. Call to discuss pricing" 
                    value={taskData.title} 
                    onChange={(e) => setTaskData({...taskData, title: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Input 
                    placeholder="Additional details..." 
                    value={taskData.description} 
                    onChange={(e) => setTaskData({...taskData, description: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <Select 
                      value={taskData.priority} 
                      onValueChange={(val: "low" | "medium" | "high") => setTaskData({...taskData, priority: val})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Due Date</Label>
                    <Input 
                      type="datetime-local" 
                      value={taskData.dueAt} 
                      onChange={(e) => setTaskData({...taskData, dueAt: e.target.value})}
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isTaskLoading} className="w-full">
                  {isTaskLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <PlusCircle className="mr-2 h-4 w-4" />}
                  Create Task
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <Button variant="outline" className="w-full justify-start gap-3 h-10 font-medium hover:bg-primary/5 hover:text-primary border-dashed">
          <Mail className="h-4 w-4 text-primary" /> Send Email
        </Button>
        
        <Button variant="outline" className="w-full justify-start gap-3 h-10 font-medium hover:bg-primary/5 hover:text-primary border-dashed">
          <MessageSquarePlus className="h-4 w-4 text-primary" /> Add to Sequence
        </Button>

        <Button variant="outline" className="w-full justify-start gap-3 h-10 font-medium hover:bg-primary/5 hover:text-primary border-dashed">
          <Calendar className="h-4 w-4 text-primary" /> Book Meeting
        </Button>

        <Button variant="outline" className="w-full justify-start gap-3 h-10 font-medium hover:bg-primary/5 hover:text-primary border-dashed">
          <FileText className="h-4 w-4 text-primary" /> Generate Proposal
        </Button>

        <Button variant="outline" className="w-full justify-start gap-3 h-10 font-medium hover:bg-primary/5 hover:text-primary border-dashed">
          <Receipt className="h-4 w-4 text-primary" /> Generate Invoice
        </Button>

        <div className="mt-2 pt-2 border-t space-y-2">
          <Button variant="secondary" className="w-full justify-start gap-3 h-10 bg-primary/10 text-primary hover:bg-primary/20 border-none">
            <Sparkles className="h-4 w-4" /> AI Suggestion
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" className="w-full justify-start gap-3 h-10 text-destructive hover:bg-destructive/10 hover:text-destructive">
                {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                Delete Lead
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete <strong>{lead.fullName}</strong> and all associated activities. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  )
}