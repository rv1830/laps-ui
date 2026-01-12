"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Mail, Calendar as CalendarIcon, FileText, Receipt, Zap, Sparkles,
  Trash2, Loader2, MessageSquarePlus, CheckSquare, PlusCircle, UserPlus, Clock
} from "lucide-react"
import { leadService } from "@/services/lead"
import { taskService, type CreateTaskData } from "@/services/task"
import { workspaceService } from "@/services/workspace" // Users fetch karne ke liye
import { toast } from "sonner"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

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

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"

import { Skeleton } from "@/components/ui/skeleton"

interface LeadQuickActionsProps {
  lead: any
  isLoading?: boolean
}

export function LeadQuickActions({ lead, isLoading }: LeadQuickActionsProps) {
  const params = useParams()
  const router = useRouter()
  const workspaceId = params.workspaceId as string

  // UI States
  const [isDeleting, setIsDeleting] = useState(false)
  const [isTaskLoading, setIsTaskLoading] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [workspaceUsers, setWorkspaceUsers] = useState<any[]>([])

  // Form States
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState("09:00")
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "medium" as "low" | "medium" | "high",
    status: "pending" as "pending" | "completed",
    type: "follow_up",
    assignedTo: lead?.ownerId || "" // Defaulting to lead owner
  })

  if (isLoading) {
    return (
      <Card className="shadow-sm border-primary/10 overflow-hidden">
        <CardHeader className="bg-muted/30 pb-3">
          <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
            <Zap className="h-3 w-3 text-primary" /> Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 grid grid-cols-1 gap-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <div className="mt-2 pt-2 border-t space-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!lead) return null;

  // Fetch users when dialog opens
  // useEffect(() => {
  //   if (isDialogOpen && workspaceId) {
  //     const fetchUsers = async () => {
  //       try {
  //         const users = await workspaceService.getWorkspaceUsers(workspaceId)
  //         setWorkspaceUsers(users)
  //       } catch (error) {
  //         console.error("Failed to load users")
  //         toast.error("Could not load team members")
  //       }
  //     }
  //     fetchUsers()
  //   }
  // }, [isDialogOpen, workspaceId])

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

    // Strict Validation
    if (!taskData.title.trim()) return toast.error("Task title is required")
    if (!date) return toast.error("Please select a due date")
    if (!taskData.assignedTo) return toast.error("Please assign this task")

    try {
      setIsTaskLoading(true)

      // Merge Date and Time
      const [hours, minutes] = time.split(":").map(Number)
      const finalDueAt = new Date(date)
      finalDueAt.setHours(hours, minutes)

      const payload: CreateTaskData = {
        leadId: lead.id,
        title: taskData.title,
        description: taskData.description,
        priority: taskData.priority,
        status: taskData.status,
        type: taskData.type,
        //  assignedToId: taskData.assignedTo,
        dueAt: finalDueAt.toISOString(),
      }

      await taskService.createTask(workspaceId, payload)
      toast.success("Task created and assigned successfully")

      // Reset Form
      setTaskData({
        title: "",
        description: "",
        priority: "medium",
        status: "pending",
        type: "follow_up",
        assignedTo: lead.ownerId || ""
      })
      setDate(undefined)
      setIsDialogOpen(false)
      router.refresh()
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to create task")
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
            <Button variant="outline" className="w-full justify-start gap-3 h-10 font-medium hover:bg-primary/5 hover:text-primary border-dashed cursor-pointer">
              <CheckSquare className="h-4 w-4 text-primary" /> Add Task
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[480px]">
            <form onSubmit={handleCreateTask}>
              <DialogHeader>
                <DialogTitle className="text-xl font-bold flex items-center gap-2">
                  <PlusCircle className="h-5 w-5 text-primary" />
                  New Task for {lead.fullName}
                </DialogTitle>
              </DialogHeader>

              <div className="py-6 space-y-5">
                {/* Title Field */}
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase text-muted-foreground">Task Title *</Label>
                  <Input
                    placeholder="e.g. Follow up on proposal"
                    value={taskData.title}
                    onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
                    className="focus-visible:ring-primary"
                  />
                </div>

                {/* Assign To Select */}
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-2">
                    <UserPlus className="h-3 w-3" /> Assign To *
                  </Label>
                  <Select
                    value={taskData.assignedTo}
                    onValueChange={(val) => setTaskData({ ...taskData, assignedTo: val })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select team member" />
                    </SelectTrigger>
                    <SelectContent>
                      {workspaceUsers.map((user) => (
                        <SelectItem key={user.id} value={user.id}>
                          {user.name || user.email} {user.id === lead.ownerId && "(Owner)"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Calendar Picker */}
                  <div className="space-y-2 flex flex-col">
                    <Label className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-2">
                      <CalendarIcon className="h-3 w-3" /> Due Date *
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          {date ? format(date, "PPP") : <span>Pick date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                          disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Time Picker */}
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-2">
                      <Clock className="h-3 w-3" /> Time
                    </Label>
                    <Input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Priority Select */}
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase text-muted-foreground">Priority</Label>
                    <Select
                      value={taskData.priority}
                      onValueChange={(val: any) => setTaskData({ ...taskData, priority: val })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">🟢 Low</SelectItem>
                        <SelectItem value="medium">🟡 Medium</SelectItem>
                        <SelectItem value="high">🔴 High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Task Type Select */}
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase text-muted-foreground">Type</Label>
                    <Select
                      value={taskData.type}
                      onValueChange={(val: any) => setTaskData({ ...taskData, type: val })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="call">📞 Call</SelectItem>
                        <SelectItem value="email">📧 Email</SelectItem>
                        <SelectItem value="meeting">🤝 Meeting</SelectItem>
                        <SelectItem value="follow_up">🔄 Follow up</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Status Selection */}
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase text-muted-foreground">Task Status</Label>
                  <Select
                    value={taskData.status}
                    onValueChange={(v) => setTaskData({ ...taskData, status: v as "pending" | "completed" })}
                  >
                    <SelectTrigger><SelectValue placeholder="Select Status" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">⏳ Pending</SelectItem>
                      <SelectItem value="completed">✅ Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Description Field */}
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase text-muted-foreground">Notes</Label>
                  <Textarea
                    placeholder="Add specific instructions..."
                    value={taskData.description}
                    onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
                    className="resize-none h-20"
                  />
                </div>
              </div>

              <DialogFooter>
                <Button
                  type="submit"
                  disabled={isTaskLoading}
                  className="w-full font-bold uppercase tracking-wider h-11 cursor-pointer"
                >
                  {isTaskLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <PlusCircle className="mr-2 h-4 w-4" />
                  )}
                  Create & Assign Task
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* OTHER ACTIONS */}
        <Button variant="outline" className="w-full justify-start gap-3 h-10 font-medium hover:bg-primary/5 hover:text-primary border-dashed">
          <Mail className="h-4 w-4 text-primary" /> Send Email
        </Button>

        <Button variant="outline" className="w-full justify-start gap-3 h-10 font-medium hover:bg-primary/5 hover:text-primary border-dashed">
          <MessageSquarePlus className="h-4 w-4 text-primary" /> Add to Sequence
        </Button>

        <Button variant="outline" className="w-full justify-start gap-3 h-10 font-medium hover:bg-primary/5 hover:text-primary border-dashed">
          <CalendarIcon className="h-4 w-4 text-primary" /> Book Meeting
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
                  This will permanently delete <strong>{lead.fullName}</strong> and all associated activities.
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