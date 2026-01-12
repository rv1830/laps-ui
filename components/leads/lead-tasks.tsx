"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Mail, Clock, Calendar, AlertCircle, CheckCircle2, Circle } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const taskIcons: Record<string, any> = { 
  call: Phone, 
  email: Mail, 
  follow_up: Clock,
  meeting: Calendar 
}

const priorityColors = {
  high: "bg-red-500",
  medium: "bg-yellow-500",
  low: "bg-blue-500"
}

export function LeadTasks({ tasks }: { tasks: any[] }) {
  return (
    <Card className="shadow-sm border-primary/10 overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between py-3 px-4 bg-muted/30 border-b">
        <CardTitle className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
          <Clock className="h-3.5 w-3.5 text-primary" /> Active Tasks
        </CardTitle>
        <Badge variant="secondary" className="text-[10px] h-5 px-1.5 font-bold">
          {tasks.filter(t => t.status !== "completed").length}
        </Badge>
      </CardHeader>
      
      <CardContent className="p-0">
        {tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-3">
              <CheckCircle2 className="h-6 w-6 text-muted-foreground/40" />
            </div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">All caught up!</p>
            <p className="text-[9px] text-muted-foreground mt-1">No pending tasks for this lead.</p>
          </div>
        ) : (
          <div className="divide-y divide-border/40">
            {tasks.map((task) => {
              const Icon = taskIcons[task.type] || Clock
              const isOverdue = task.status !== "completed" && task.dueAt && new Date(task.dueAt) < new Date()
              const isCompleted = task.status === "completed"
              
              return (
                <div 
                  key={task.id} 
                  className={cn(
                    "group flex items-start gap-3 p-4 transition-colors hover:bg-muted/20", 
                    isOverdue && !isCompleted && "bg-destructive/[0.02]"
                  )}
                >
                  {/* Status Indicator */}
                  <div className="mt-0.5">
                    {isCompleted ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ) : (
                      <Circle className={cn("h-4 w-4 text-muted-foreground", isOverdue && "text-destructive")} />
                    )}
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <p className={cn(
                          "text-xs font-bold truncate tracking-tight", 
                          isCompleted ? "line-through text-muted-foreground" : "text-foreground"
                        )}>
                          {task.title}
                        </p>
                        {isOverdue && !isCompleted && (
                          <AlertCircle className="h-3 w-3 text-destructive shrink-0" />
                        )}
                      </div>
                      
                      {/* Priority Dot */}
                      <div className={cn(
                        "h-1.5 w-1.5 rounded-full shrink-0",
                        priorityColors[task.priority as keyof typeof priorityColors] || "bg-slate-300"
                      )} />
                    </div>

                    <p className="text-[10px] text-muted-foreground line-clamp-1 italic">
                      {task.description || "No additional notes"}
                    </p>

                    {/* Footer Metadata */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-tighter text-muted-foreground">
                          <Icon className="h-3 w-3" />
                          {task.type.replace('_', ' ')}
                        </div>
                        {task.dueAt && (
                          <span className={cn(
                            "text-[9px] font-black px-1 rounded",
                            isOverdue && !isCompleted ? "text-destructive bg-destructive/10" : "text-muted-foreground bg-muted"
                          )}>
                            {format(new Date(task.dueAt), "MMM dd, p")}
                          </span>
                        )}
                      </div>

                      {/* Assignee Avatar */}
                      {task.assignee && (
                        <Avatar className="h-5 w-5 border border-background">
                          <AvatarFallback className="text-[8px] font-bold bg-primary/10 text-primary">
                            {task.assignee.firstName?.[0]}{task.assignee.lastName?.[0]}
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
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