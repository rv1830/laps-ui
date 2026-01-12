"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LeadActivityTimeline } from "@/components/leads/lead-activity-timeline"
import { taskService } from "@/services/task"
import { useParams, useRouter } from "next/navigation"
import { toast } from "sonner"
import type { Activity } from "@/lib/types"
import { CheckCircle2, Circle } from "lucide-react"

interface LeadDetailTabsProps {
  activities: Activity[]
  tasks: any[] // Added tasks prop
}

export function LeadDetailTabs({ activities, tasks }: LeadDetailTabsProps) {
  const params = useParams()
  const router = useRouter()
  const workspaceId = params.workspaceId as string

  const handleToggleTask = async (taskId: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === "completed" ? "pending" : "completed"
      await taskService.updateTask(workspaceId, taskId, { status: newStatus })
      toast.success(`Task marked as ${newStatus}`)
      router.refresh()
    } catch (err) {
      toast.error("Failed to update task")
    }
  }

  return (
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
                  onClick={() => handleToggleTask(task.id, task.status)}
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
  )
}