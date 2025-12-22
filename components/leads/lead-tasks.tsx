"use client"

import type React from "react"

import type { Task } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Phone, Mail, Clock } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface LeadTasksProps {
  tasks: Task[]
}

const taskIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  call: Phone,
  email: Mail,
  follow_up: Clock,
}

export function LeadTasks({ tasks }: LeadTasksProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base font-medium">Tasks</CardTitle>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Plus className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        {tasks.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">No tasks</p>
        ) : (
          <div className="space-y-3">
            {tasks.map((task) => {
              const Icon = taskIcons[task.type] || Clock
              const isOverdue = task.status !== "completed" && new Date(task.dueDate) < new Date()
              return (
                <div
                  key={task.id}
                  className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <Checkbox checked={task.status === "completed"} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                      <p
                        className={cn(
                          "text-sm font-medium text-foreground",
                          task.status === "completed" && "line-through",
                        )}
                      >
                        {task.title}
                      </p>
                    </div>
                    <p className={cn("text-xs mt-1", isOverdue ? "text-destructive" : "text-muted-foreground")}>
                      {isOverdue ? "Overdue: " : "Due: "}
                      {format(task.dueDate, "MMM d, h:mm a")}
                    </p>
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
