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
  Clock
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
export function LeadDetailTabs({ activities: initialActivities }: { activities: any[] }) {
  const params = useParams()
  const router = useRouter()
  
  const workspaceId = params.workspaceId as string
  const leadId = (params.leadId || params.id) as string 

  const [leadData, setLeadData] = useState<any>(null)
  const [tasks, setTasks] = useState<any[]>([])
  const [editingTask, setEditingTask] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(false)

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
      const taskId = action === 'status' ? taskData.id : editingTask.id
      
      if (action === 'status') {
        const newStatus = taskData.status === "completed" ? "pending" : "completed"
        await taskService.updateTask(workspaceId, taskId, { status: newStatus })
        toast.success(`Task marked as ${newStatus}`)
      } 
      else if (action === 'update') {
        await taskService.updateTask(workspaceId, taskId, editingTask)
        toast.success("Task updated")
        setEditingTask(null)
      } 
      else if (action === 'delete') {
        await taskService.deleteTask(workspaceId, taskId)
        toast.success("Task deleted")
        setEditingTask(null)
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

        <TabsContent value="tasks" className="mt-4 space-y-3">
          {tasks.map((task: any) => (
            <div 
              key={task.id} 
              className={cn(
                "group relative flex flex-col gap-3 p-4 rounded-xl border transition-all shadow-sm",
                task.status === "completed" ? "bg-muted/40 opacity-80" : "bg-card hover:border-primary/40"
              )}
            >
              <div className="flex items-start gap-4">
                {/* Status Toggle Button with Pointer Cursor */}
                <button 
                  onClick={() => handleAction('status', task)} 
                  disabled={loading} 
                  className="mt-1 transition-transform active:scale-90 cursor-pointer disabled:cursor-not-allowed"
                  title={task.status === "completed" ? "Mark as Pending" : "Mark as Completed"}
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
                  </div>

                  {task.description && (
                    <div className="flex items-start gap-2 text-muted-foreground opacity-80">
                      <AlignLeft className="h-3 w-3 mt-1 shrink-0" />
                      <p className="text-xs italic leading-relaxed">{task.description}</p>
                    </div>
                  )}

                  {/* Metadata Row */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1">
                    <div className="flex items-center gap-1.5">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        task.priority === "high" ? "bg-red-500" : task.priority === "medium" ? "bg-yellow-500" : "bg-blue-500"
                      )} />
                      <span className="text-[10px] font-black uppercase tracking-widest">
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
                        <User className="h-3 w-3" />
                        <span className="text-[10px] font-bold uppercase">
                          {task.assignee.firstName} {task.assignee.lastName}
                        </span>
                      </div>
                    )}

                    {task.status === "completed" && task.updatedAt && (
                      <div className="flex items-center gap-1.5 text-green-600/80 border-l pl-4">
                        <CheckCircle className="h-3 w-3" />
                        <span className="text-[10px] font-bold uppercase">
                          Completed
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-all cursor-pointer" 
                  onClick={() => setEditingTask(task)}
                >
                  <Settings2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}

          {tasks.length === 0 && (
            <div className="text-center py-10 border border-dashed rounded-xl italic text-muted-foreground text-xs uppercase tracking-widest">
              No tasks found
            </div>
          )}
        </TabsContent>

        <TabsContent value="activity" className="mt-4">
          <LeadActivityTimeline activities={leadData?.activities || initialActivities} />
        </TabsContent>
      </Tabs>

      {/* EDIT MODAL */}
      {editingTask && (
        <Dialog open={!!editingTask} onOpenChange={() => !loading && setEditingTask(null)}>
          <DialogContent className="sm:max-w-[450px]">
            <DialogHeader>
              <DialogTitle className="font-black italic uppercase flex items-center gap-2">
                <Settings2 className="h-5 w-5 text-primary" /> Edit Task
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label className="text-[10px] uppercase font-bold text-muted-foreground">Task Title</Label>
                <Input value={editingTask.title} onChange={e => setEditingTask({...editingTask, title: e.target.value})} />
              </div>
              
              <div className="grid gap-2">
                <Label className="text-[10px] uppercase font-bold text-muted-foreground">Description</Label>
                <Textarea value={editingTask.description || ""} onChange={e => setEditingTask({...editingTask, description: e.target.value})} className="h-24 resize-none" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label className="text-[10px] uppercase font-bold text-muted-foreground">Priority</Label>
                  <Select value={editingTask.priority} onValueChange={v => setEditingTask({...editingTask, priority: v})}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label className="text-[10px] uppercase font-bold text-muted-foreground">Type</Label>
                  <Select value={editingTask.type} onValueChange={v => setEditingTask({...editingTask, type: v})}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
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
                <Label className="text-[10px] uppercase font-bold text-muted-foreground">Due Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start font-normal cursor-pointer">
                      <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                      {editingTask.dueAt ? format(new Date(editingTask.dueAt), "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar 
                      mode="single" 
                      selected={editingTask.dueAt ? new Date(editingTask.dueAt) : undefined} 
                      onSelect={date => setEditingTask({...editingTask, dueAt: date})} 
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <DialogFooter className="flex justify-between border-t pt-4 gap-2">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="icon" disabled={loading} className="cursor-pointer">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <DialogHeader>
                    <DialogTitle>Delete Task?</DialogTitle>
                    <p className="text-sm text-muted-foreground">Are you sure you want to remove this task? This cannot be undone.</p>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="ghost" onClick={() => {}}>Cancel</Button>
                    <Button variant="destructive" onClick={() => handleAction('delete')}>Delete</Button>
                  </DialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <Button onClick={() => handleAction('update')} disabled={loading} className="flex-1 font-bold cursor-pointer">
                {loading && <Loader2 className="animate-spin h-4 w-4 mr-2" />} SAVE CHANGES
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}