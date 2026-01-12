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
import { taskService } from "@/services/task" // New Service
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

export function LeadQuickActions({ lead }: { lead: any }) {
  const params = useParams()
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)
  const [isTaskLoading, setIsTaskLoading] = useState(false)
  const [taskTitle, setTaskTitle] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  
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
    if (!taskTitle.trim()) return
    
    try {
      setIsTaskLoading(true)
      await taskService.createTask(workspaceId, {
        leadId: lead.id,
        title: taskTitle,
        priority: "medium",
        type: "follow_up"
      })
      toast.success("Task created successfully")
      setTaskTitle("")
      setIsDialogOpen(false)
      router.refresh() // Timeline and task list refresh karne ke liye
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
        
        {/* ADD TASK DIALOG */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full justify-start gap-3 h-10 font-medium hover:bg-primary/5 hover:text-primary border-dashed">
              <CheckSquare className="h-4 w-4 text-primary" /> Add Task
            </Button>
          </DialogTrigger>
          <DialogContent>
            <form onSubmit={handleCreateTask}>
              <DialogHeader>
                <DialogTitle className="uppercase italic font-black tracking-tighter">New Task for {lead.fullName}</DialogTitle>
              </DialogHeader>
              <div className="py-4 space-y-4">
                <div className="space-y-2">
                  <Label>Task Title</Label>
                  <Input 
                    placeholder="e.g. Call to discuss pricing" 
                    value={taskTitle} 
                    onChange={(e) => setTaskTitle(e.target.value)}
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isTaskLoading}>
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