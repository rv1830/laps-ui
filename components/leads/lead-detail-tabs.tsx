"use client"

import { useState, useEffect, useCallback } from "react"
import { useParams, useRouter } from "next/navigation"
import { toast } from "sonner"
import { format } from "date-fns"
import {
  CheckCircle2,
  Circle,
  Trash2,
  Loader2,
  Settings2,
  CalendarIcon,
  AlignLeft,
  User,
  CheckCircle,
  Clock,
  UserPlus
} from "lucide-react"

// UI Components
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LeadActivityTimeline } from "@/components/leads/lead-activity-timeline"
import { taskService } from "@/services/task"
import { api } from "@/lib/api"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
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

interface LeadDetailTabsProps {
  activities: any[]
  tasks: any[]
  isLoading?: boolean // Loading prop added
}

export function LeadDetailTabs({ activities: initialActivities, tasks: initialTasks, isLoading }: LeadDetailTabsProps) {
  const params = useParams()
  const router = useRouter()

  const workspaceId = params.workspaceId as string
  const leadId = (params.leadId || params.id) as string

  const [leadData, setLeadData] = useState<any>(null)
  const [tasks, setTasks] = useState<any[]>(initialTasks || [])
  const [editingTask, setEditingTask] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  const [editTime, setEditTime] = useState("09:00")

  // 1. Fetching Tasks
  const fetchTasks = useCallback(async () => {
    if (!workspaceId || !leadId || leadId === 'undefined') return
    try {
      const data = await taskService.getTasks(workspaceId, { leadId })
      setTasks(data)
    } catch (err) {
      console.error("Task Fetch Error:", err)
    }
  }, [workspaceId, leadId])

  // 2. Fetching Lead Data
  const fetchLeadData = useCallback(async () => {
    if (!workspaceId || !leadId || leadId === 'undefined') return
    setIsFetching(true)
    try {
      const res = await api.get(`/leads/workspaces/${workspaceId}/${leadId}`)
      setLeadData(res.data)
    } catch (err) {
      toast.error("Failed to fetch lead details")
    } finally {
      setIsFetching(false)
    }
  }, [workspaceId, leadId])

  useEffect(() => {
    fetchLeadData()
    fetchTasks()
  }, [fetchLeadData, fetchTasks])

  // Actions Handler
  const handleAction = async (action: 'status' | 'update' | 'delete', taskData?: any) => {
    setLoading(true)
    try {
      const taskId = action === 'status' ? taskData.id : (taskData?.id || editingTask?.id)

      if (action === 'status') {
        const newStatus = taskData.status === "completed" ? "pending" : "completed"
        await taskService.updateTask(workspaceId, taskId, { status: newStatus })
        toast.success(`Task marked as ${newStatus}`)
      }
      else if (action === 'update') {
        const updatedDate = new Date(editingTask.dueAt || new Date())
        const [hours, minutes] = editTime.split(":").map(Number)
        updatedDate.setHours(hours, minutes)

        await taskService.updateTask(workspaceId, taskId, {
          ...editingTask,
          dueAt: updatedDate.toISOString()
        })
        toast.success("Task updated")
        setEditingTask(null)
      }
      else if (action === 'delete') {
        await taskService.deleteTask(workspaceId, taskId)
        toast.success("Task deleted")
        if (editingTask) setEditingTask(null)
      }

      await fetchTasks()
      router.refresh()
    } catch (err) {
      toast.error("Operation failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full">
      <Tabs defaultValue="activity" className="w-full">
        <TabsList className="bg-transparent border-b rounded-none w-full justify-start h-auto p-0 gap-6">
          <TabsTrigger value="activity" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary px-0 py-2 font-bold uppercase text-[10px] tracking-widest">
            Activity
          </TabsTrigger>
          <TabsTrigger value="tasks" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary px-0 py-2 font-bold uppercase text-[10px] tracking-widest">
            Tasks ({tasks?.length || 0})
          </TabsTrigger>
          <TabsTrigger value="emails" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary px-0 py-2 font-bold uppercase text-[10px] tracking-widest">
            Emails
          </TabsTrigger>
          <TabsTrigger value="notes" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary px-0 py-2 font-bold uppercase text-[10px] tracking-widest">
            Notes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="activity" className="mt-4">
          {isLoading ? (
            <div className="space-y-6 bg-background border rounded-xl p-8">
               <div className="flex justify-between items-center mb-6">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-9 w-24 rounded-md" />
              </div>
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="flex gap-4">
                  <Skeleton className="h-10 w-10 rounded-lg shrink-0" />
                  <div className="flex-1 space-y-2 pt-1">
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-1/3" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                    <Skeleton className="h-3 w-1/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <LeadActivityTimeline activities={leadData?.activities || initialActivities} />
          )}
        </TabsContent>

        <TabsContent value="tasks" className="mt-4 space-y-3">
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map(i => <Skeleton key={i} className="h-24 w-full rounded-xl" />)}
            </div>
          ) : (
            tasks.map((task: any) => (
              <div
                key={task.id}
                className={cn(
                  "group relative flex flex-col gap-3 p-4 rounded-xl border transition-all shadow-sm",
                  task.status === "completed" ? "bg-muted/40 opacity-80" : "bg-card hover:border-primary/40"
                )}
              >
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => handleAction('status', task)}
                    disabled={loading}
                    className="mt-1 transition-transform active:scale-90 cursor-pointer disabled:cursor-not-allowed"
                  >
                    {task.status === "completed" ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500 fill-green-500/10" />
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                    )}
                  </button>

                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] bg-primary/10 text-primary border border-primary/20 px-1.5 py-0.5 rounded font-black uppercase tracking-tighter">
                        {task.type}
                      </span>
                      <p className={cn(
                        "text-sm font-bold leading-none",
                        task.status === "completed" ? "line-through text-muted-foreground" : "text-foreground"
                      )}>
                        {task.title}
                      </p>
                      <span className={cn(
                        "text-[8px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-widest ml-auto",
                        task.status === "completed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                      )}>
                        {task.status}
                      </span>
                    </div>

                    {task.description && (
                      <div className="flex items-start gap-2 text-muted-foreground opacity-80">
                        <AlignLeft className="h-3 w-3 mt-1 shrink-0" />
                        <p className="text-xs italic leading-relaxed">{task.description}</p>
                      </div>
                    )}

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1">
                      <div className="flex items-center gap-1.5">
                        <div className={cn(
                          "w-2 h-2 rounded-full",
                          task.priority === "high" ? "bg-red-500" : task.priority === "medium" ? "bg-yellow-500" : "bg-blue-500"
                        )} />
                        <span className="text-[10px] font-black uppercase tracking-widest text-foreground">
                          {task.priority}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <CalendarIcon className="h-3 w-3" />
                        <span className="text-[10px] font-bold uppercase">
                          {task.dueAt ? `Due: ${format(new Date(task.dueAt), "MMM dd, yyyy")}` : "No Due Date"}
                        </span>
                      </div>

                      {task.assignee && (
                        <div className="flex items-center gap-1.5 text-muted-foreground border-l pl-4">
                          <User className="h-3 w-3 text-primary" />
                          <span className="text-[10px] font-bold uppercase text-primary">
                            {task.assignee.firstName} {task.assignee.lastName}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 cursor-pointer"
                      onClick={() => {
                        setEditingTask(task)
                        if (task.dueAt) setEditTime(format(new Date(task.dueAt), "HH:mm"))
                      }}
                    >
                      <Settings2 className="h-4 w-4" />
                    </Button>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10 cursor-pointer">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Task?</AlertDialogTitle>
                          <AlertDialogDescription>Are you sure you want to remove this task? This cannot be undone.</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleAction('delete', task)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            ))
          )}
        </TabsContent>
      </Tabs>

      {/* --- TAGDA EDIT MODAL --- */}
      {editingTask && (
        <Dialog open={!!editingTask} onOpenChange={() => !loading && setEditingTask(null)}>
          <DialogContent className="sm:max-w-[480px]">
            <DialogHeader>
              <DialogTitle className="font-black italic uppercase flex items-center gap-2 text-xl tracking-tight text-primary">
                <Settings2 className="h-5 w-5" /> EDIT TASK
              </DialogTitle>
            </DialogHeader>

            <div className="py-4 space-y-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-bold uppercase text-muted-foreground">Task Title *</Label>
                <Input placeholder="e.g. Call to discuss pricing" value={editingTask.title} onChange={e => setEditingTask({ ...editingTask, title: e.target.value })} />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-1.5">
                  <UserPlus className="h-3 w-3" /> Assign To
                </Label>
                <Select value={editingTask.assignedTo || ""} onValueChange={val => setEditingTask({ ...editingTask, assignedTo: val })}>
                  <SelectTrigger><SelectValue placeholder="Select team member" /></SelectTrigger>
                  <SelectContent><SelectItem value="placeholder-1">Select Member...</SelectItem></SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-1.5"><CalendarIcon className="h-3 w-3" /> Due Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start font-normal cursor-pointer">
                        {editingTask.dueAt ? format(new Date(editingTask.dueAt), "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={editingTask.dueAt ? new Date(editingTask.dueAt) : undefined} onSelect={date => setEditingTask({ ...editingTask, dueAt: date?.toISOString() })} />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-1.5"><Clock className="h-3 w-3" /> Time</Label>
                  <Input type="time" value={editTime} onChange={e => setEditTime(e.target.value)} />
                </div>
              </div>

              {/* Status Section Added Here */}
              <div className="space-y-1.5">
                <Label className="text-xs font-bold uppercase text-muted-foreground">Task Status</Label>
                <Select value={editingTask.status} onValueChange={v => setEditingTask({ ...editingTask, status: v })}>
                  <SelectTrigger><SelectValue placeholder="Select Status" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">⏳ Pending</SelectItem>
                    <SelectItem value="completed">✅ Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold uppercase text-muted-foreground">Priority</Label>
                  <Select value={editingTask.priority} onValueChange={v => setEditingTask({ ...editingTask, priority: v })}>
                    <SelectTrigger><SelectValue placeholder="Select Priority" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold uppercase text-muted-foreground">Type</Label>
                  <Select value={editingTask.type} onValueChange={v => setEditingTask({ ...editingTask, type: v })}>
                    <SelectTrigger><SelectValue placeholder="Select Type" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="call">Call</SelectItem>
                      <SelectItem value="meeting">Meeting</SelectItem>
                      <SelectItem value="follow_up">Follow Up</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-2">
                <Label className="text-xs font-bold uppercase text-muted-foreground">Notes / Description</Label>
                <Textarea placeholder="Enter specific details..." value={editingTask.description || ""} onChange={e => setEditingTask({ ...editingTask, description: e.target.value })} className="h-24 resize-none" />
              </div>
            </div>

            <DialogFooter className="flex justify-between border-t pt-4 gap-2">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="sm" disabled={loading} className="text-destructive hover:bg-destructive/10 cursor-pointer">
                    <Trash2 className="h-4 w-4 mr-2" /> Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>This will permanently delete this task. This action cannot be undone.</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleAction('delete')} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <Button onClick={() => handleAction('update')} disabled={loading} className="px-8 font-bold cursor-pointer">
                {loading ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : <CheckCircle className="h-4 w-4 mr-2" />}
                SAVE CHANGES
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}