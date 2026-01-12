"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Phone, Mail, Clock, AlertCircle, Edit2, Trash2, Loader2 } from "lucide-react"
import { format, isValid } from "date-fns"
import { cn } from "@/lib/utils"
import { taskService } from "@/services/task"
import { useParams, useRouter } from "next/navigation"
import { toast } from "sonner"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const taskIcons: Record<string, any> = { call: Phone, email: Mail, follow_up: Clock }

export function LeadTasks({ tasks }: { tasks: any[] }) {
  const params = useParams()
  const router = useRouter()
  const workspaceId = params.workspaceId as string
  const [editingTask, setEditingTask] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleStatusChange = async (taskId: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === "completed" ? "pending" : "completed"
      await taskService.updateTask(workspaceId, taskId, { status: newStatus })
      toast.success(`Task marked as ${newStatus}`)
      router.refresh()
    } catch (error) { toast.error("Update failed") }
  }

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await taskService.updateTask(workspaceId, editingTask.id, editingTask)
      toast.success("Task updated")
      setEditingTask(null)
      router.refresh()
    } catch (error) { toast.error("Update failed") }
    finally { setLoading(false) }
  }

  const handleDeleteTask = async (taskId: string) => {
    if (!confirm("Delete this task?")) return
    try {
      await taskService.deleteTask(workspaceId, taskId)
      toast.success("Task deleted")
      router.refresh()
    } catch (error) { toast.error("Delete failed") }
  }

  return (
    <Card className="shadow-sm border-primary/10">
      <CardHeader className="flex flex-row items-center justify-between py-4 bg-muted/30">
        <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
          <Clock className="h-3 w-3 text-primary" /> Tasks
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        {tasks.length === 0 ? (
          <div className="text-center py-6 border border-dashed rounded-xl">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">No Active Tasks</p>
          </div>
        ) : (
          <div className="space-y-2">
            {tasks.map((task) => {
              const Icon = taskIcons[task.type] || Clock
              const isOverdue = task.status !== "completed" && task.dueAt && new Date(task.dueAt) < new Date()
              return (
                <div key={task.id} className={cn("flex items-start gap-3 p-3 rounded-xl border transition-all group", isOverdue ? "bg-destructive/5 border-destructive/20" : "bg-background border-border/50 hover:border-primary/30")}>
                  <Checkbox checked={task.status === "completed"} onCheckedChange={() => handleStatusChange(task.id, task.status)} />
                  <div className="flex-1 min-w-0 cursor-pointer" onClick={() => setEditingTask(task)}>
                    <div className="flex items-center gap-2">
                      <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                      <p className={cn("text-sm font-bold truncate", task.status === "completed" && "line-through text-muted-foreground")}>{task.title}</p>
                    </div>
                    <p className="text-[10px] text-muted-foreground truncate">{task.description || "No description"}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => handleDeleteTask(task.id)}>
                    <Trash2 className="h-3.5 w-3.5 text-destructive" />
                  </Button>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>

      {/* UPDATE TASK DIALOG */}
      <Dialog open={!!editingTask} onOpenChange={() => setEditingTask(null)}>
        <DialogContent>
          <form onSubmit={handleUpdateSubmit}>
            <DialogHeader><DialogTitle className="uppercase font-black italic tracking-tighter">Edit Task</DialogTitle></DialogHeader>
            <div className="py-4 space-y-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input value={editingTask?.title || ""} onChange={(e) => setEditingTask({...editingTask, title: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Input value={editingTask?.description || ""} onChange={(e) => setEditingTask({...editingTask, description: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select value={editingTask?.priority} onValueChange={(val) => setEditingTask({...editingTask, priority: val})}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent><SelectItem value="low">Low</SelectItem><SelectItem value="medium">Medium</SelectItem><SelectItem value="high">High</SelectItem></SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Due Date</Label>
                  <Input type="datetime-local" value={editingTask?.dueAt ? new Date(editingTask.dueAt).toISOString().slice(0, 16) : ""} onChange={(e) => setEditingTask({...editingTask, dueAt: e.target.value})} />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={loading}>{loading ? <Loader2 className="animate-spin" /> : "Update Task"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  )
}