"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LeadActivityTimeline } from "@/components/leads/lead-activity-timeline"
import { taskService } from "@/services/task"
import { useParams, useRouter } from "next/navigation"
import { toast } from "sonner"
import type { Activity } from "@/lib/types"
import { CheckCircle2, Circle, Trash2, Loader2, Settings2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface LeadDetailTabsProps {
  activities: Activity[]
  tasks: any[]
}

export function LeadDetailTabs({ activities, tasks }: LeadDetailTabsProps) {
  const params = useParams()
  const router = useRouter()
  const workspaceId = params.workspaceId as string
  const [editingTask, setEditingTask] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  // Combined function for Status, Update, and Delete
  const handleAction = async (action: 'status' | 'update' | 'delete', taskData?: any) => {
    setLoading(true)
    try {
      if (action === 'status') {
        const newStatus = taskData.status === "completed" ? "pending" : "completed"
        await taskService.updateTask(workspaceId, taskData.id, { status: newStatus })
        toast.success(`Task marked as ${newStatus}`)
      } 
      else if (action === 'update') {
        await taskService.updateTask(workspaceId, editingTask.id, editingTask)
        toast.success("Task updated")
        setEditingTask(null)
      } 
      else if (action === 'delete') {
        if (!confirm("Delete this task?")) return
        await taskService.deleteTask(workspaceId, editingTask.id)
        toast.success("Task deleted")
        setEditingTask(null)
      }
      
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
          <TabsTrigger value="activity" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 py-2 font-bold uppercase text-[10px] tracking-widest">
            Activity
          </TabsTrigger>
          <TabsTrigger value="tasks" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 py-2 font-bold uppercase text-[10px] tracking-widest">
            Tasks ({tasks?.length || 0})
          </TabsTrigger>
          <TabsTrigger value="emails" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 py-2 font-bold uppercase text-[10px] tracking-widest">
            Emails
          </TabsTrigger>
          <TabsTrigger value="notes" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 py-2 font-bold uppercase text-[10px] tracking-widest">
            Notes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="activity" className="mt-4">
          <LeadActivityTimeline activities={activities} />
        </TabsContent>

        <TabsContent value="tasks" className="mt-4">
          <div className="space-y-3">
            {tasks && tasks.length > 0 ? (
              tasks.map((task) => (
                <div key={task.id} className="flex items-center gap-4 p-4 rounded-xl border bg-card hover:border-primary/50 transition-all group">
                  <button 
                    onClick={() => handleAction('status', task)} 
                    disabled={loading}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {task.status === "completed" ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : (
                      <Circle className="h-5 w-5" />
                    )}
                  </button>
                  
                  <div className="flex-1">
                    <p className={`text-sm font-bold ${task.status === "completed" ? "line-through text-muted-foreground" : "text-foreground"}`}>
                      {task.title}
                    </p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-tight">
                      Priority: {task.priority} • Added {new Date(task.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 opacity-0 group-hover:opacity-100"
                    onClick={() => setEditingTask(task)}
                  >
                    <Settings2 className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
              ))
            ) : (
              <div className="text-center py-10 border border-dashed rounded-xl">
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">No tasks found</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="emails" className="mt-4">
          <LeadActivityTimeline activities={activities.filter((a) => a.type.includes("email"))} />
        </TabsContent>

        <TabsContent value="notes" className="mt-4">
          <LeadActivityTimeline activities={activities.filter((a) => a.type === "note")} />
        </TabsContent>
      </Tabs>

      {/* EDIT TASK DIALOG */}
      {editingTask && (
        <Dialog open={!!editingTask} onOpenChange={() => !loading && setEditingTask(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-black italic uppercase">Edit Task</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input 
                  value={editingTask.title} 
                  onChange={e => setEditingTask({...editingTask, title: e.target.value})} 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select 
                    value={editingTask.priority} 
                    onValueChange={v => setEditingTask({...editingTask, priority: v})}
                  >
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter className="flex justify-between items-center w-full">
              <Button 
                variant="destructive" 
                size="icon" 
                onClick={() => handleAction('delete')} 
                disabled={loading}
              >
                {loading ? <Loader2 className="animate-spin h-4 w-4" /> : <Trash2 className="h-4 w-4" />}
              </Button>
              <Button onClick={() => handleAction('update')} disabled={loading}>
                {loading ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : null}
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}