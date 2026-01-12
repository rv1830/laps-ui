"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Mail, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

const taskIcons: Record<string, any> = { call: Phone, email: Mail, follow_up: Clock }

export function LeadTasks({ tasks }: { tasks: any[] }) {
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
                <div 
                  key={task.id} 
                  className={cn(
                    "flex items-start gap-3 p-3 rounded-xl border transition-all", 
                    isOverdue ? "bg-destructive/5 border-destructive/20" : "bg-background border-border/50"
                  )}
                >
                  <div className="mt-1">
                    <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className={cn("text-sm font-bold truncate", task.status === "completed" && "line-through text-muted-foreground")}>
                        {task.title}
                      </p>
                    </div>
                    <p className="text-[10px] text-muted-foreground truncate">{task.description || "No description"}</p>
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