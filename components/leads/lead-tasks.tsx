"use client"

import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Phone, Mail, Clock, AlertCircle } from "lucide-react"
import { format, isValid, parseISO } from "date-fns"
import { cn } from "@/lib/utils"
import { taskService } from "@/services/task"
import { useParams, useRouter } from "next/navigation"
import { toast } from "sonner"

interface LeadTasksProps {
  tasks: any[]
}

const taskIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  call: Phone,
  email: Mail,
  follow_up: Clock,
}

export function LeadTasks({ tasks }: LeadTasksProps) {
  const params = useParams()
  const router = useRouter()
  const workspaceId = params.workspaceId as string

  const handleStatusChange = async (taskId: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === "completed" ? "pending" : "completed"
      await taskService.updateTask(workspaceId, taskId, { status: newStatus })
      toast.success(`Task marked as ${newStatus}`)
      router.refresh()
    } catch (error) {
      toast.error("Failed to update task")
    }
  }

  const safeFormat = (dateStr: any) => {
    if (!dateStr) return "No deadline"
    const date = new Date(dateStr)
    if (!isValid(date)) return "Invalid date"
    return format(date, "MMM d, h:mm a")
  }

  return (
    <Card className="shadow-sm border-primary/10">
      <CardHeader className="flex flex-row items-center justify-between py-4 bg-muted/30">
        <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
          <Clock className="h-3 w-3 text-primary" /> Tasks
        </CardTitle>
        <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-primary/10 hover:text-primary">
          <Plus className="h-4 w-4" />
        </Button>
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
              const dateObj = task.dueAt ? new Date(task.dueAt) : null
              const isOverdue = task.status !== "completed" && dateObj && dateObj < new Date()

              return (
                <div
                  key={task.id}
                  className={cn(
                    "flex items-start gap-3 p-3 rounded-xl border transition-all",
                    isOverdue ? "bg-destructive/5 border-destructive/20" : "bg-background border-border/50 hover:border-primary/30"
                  )}
                >
                  <Checkbox 
                    checked={task.status === "completed"} 
                    onCheckedChange={() => handleStatusChange(task.id, task.status)}
                    className="mt-1"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                      <p className={cn(
                        "text-sm font-bold truncate",
                        task.status === "completed" && "line-through text-muted-foreground"
                      )}>
                        {task.title}
                      </p>
                    </div>
                    <p className={cn(
                      "text-[10px] font-medium mt-1 flex items-center gap-1",
                      isOverdue ? "text-destructive" : "text-muted-foreground"
                    )}>
                      {isOverdue && <AlertCircle className="h-3 w-3" />}
                      {isOverdue ? "Overdue: " : "Due: "}
                      {safeFormat(task.dueAt)}
                    </p>
                  </div>
                  <div className={cn(
                    "text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase",
                    task.priority === "high" ? "bg-red-500/10 text-red-500" : "bg-blue-500/10 text-blue-500"
                  )}>
                    {task.priority}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}