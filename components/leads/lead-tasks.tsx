"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Phone, Mail, Clock, Calendar, AlertCircle, 
  CheckCircle2, Circle, MessageSquare, Laptop 
} from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// Next Level Type-based styling
const taskTypeConfig: Record<string, { icon: any, color: string, bg: string }> = { 
  call: { icon: Phone, color: "text-blue-600", bg: "bg-blue-100" }, 
  email: { icon: Mail, color: "text-purple-600", bg: "bg-purple-100" }, 
  follow_up: { icon: Clock, color: "text-orange-600", bg: "bg-orange-100" },
  meeting: { icon: Calendar, color: "text-rose-600", bg: "bg-rose-100" },
  message: { icon: MessageSquare, color: "text-emerald-600", bg: "bg-emerald-100" },
  demo: { icon: Laptop, color: "text-indigo-600", bg: "bg-indigo-100" }
}

const priorityConfig = {
  high: { dot: "bg-red-500", bg: "bg-red-50", text: "text-red-700", border: "border-red-100" },
  medium: { dot: "bg-yellow-500", bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-100" },
  low: { dot: "bg-blue-500", bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-100" }
}

export function LeadTasks({ tasks }: { tasks: any[] }) {
  return (
    <Card className="shadow-sm border-primary/10 overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between py-3 px-4 bg-muted/30 border-b">
        <CardTitle className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
          <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> Pending Tasks
        </CardTitle>
        <Badge variant="secondary" className="text-[10px] h-5 px-1.5 font-bold bg-primary/10 text-primary border-none">
          {tasks.filter(t => t.status !== "completed").length}
        </Badge>
      </CardHeader>
      
      <CardContent className="p-0">
        {tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-3">
              <CheckCircle2 className="h-6 w-6 text-muted-foreground/40" />
            </div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Zero Tasks</p>
          </div>
        ) : (
          <div className="divide-y divide-border/40">
            {tasks.map((task) => {
              const typeCfg = taskTypeConfig[task.type] || taskTypeConfig.follow_up
              const prioCfg = priorityConfig[task.priority as keyof typeof priorityConfig] || priorityConfig.low
              const Icon = typeCfg.icon
              const isOverdue = task.status !== "completed" && task.dueAt && new Date(task.dueAt) < new Date()
              const isCompleted = task.status === "completed"
              
              return (
                <div 
                  key={task.id} 
                  className={cn(
                    "group flex items-start gap-3 p-4 transition-all hover:bg-muted/10", 
                    isOverdue && !isCompleted && "bg-red-50/30"
                  )}
                >
                  {/* Next Level Icon Box */}
                  <div className={cn(
                    "mt-0.5 p-1.5 rounded-lg shrink-0 transition-transform group-hover:scale-110",
                    isCompleted ? "bg-green-50" : typeCfg.bg
                  )}>
                    <Icon className={cn("h-3.5 w-3.5", isCompleted ? "text-green-600" : typeCfg.color)} />
                  </div>

                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <p className={cn(
                          "text-xs font-bold truncate tracking-tight", 
                          isCompleted ? "line-through text-muted-foreground" : "text-foreground"
                        )}>
                          {task.title}
                        </p>
                        
                        {/* Status Badge Tagda Style */}
                        <span className={cn(
                          "text-[7px] px-1.5 py-0.5 rounded-sm font-black uppercase tracking-tighter border",
                          isCompleted 
                            ? "bg-green-50 text-green-700 border-green-200" 
                            : "bg-amber-50 text-amber-700 border-amber-200"
                        )}>
                          {task.status}
                        </span>
                      </div>
                      
                      {isOverdue && !isCompleted && (
                        <div className="flex items-center gap-0.5 animate-pulse">
                          <AlertCircle className="h-2.5 w-2.5 text-red-600" />
                          <span className="text-[8px] font-black text-red-600 uppercase">Overdue</span>
                        </div>
                      )}
                    </div>

                    {/* Description ki jagah Priority dikhaya */}
                    <div className="flex items-center gap-2">
                       <span className={cn(
                         "text-[8px] px-2 py-0.5 rounded-full font-bold uppercase tracking-widest border flex items-center gap-1",
                         prioCfg.bg, prioCfg.text, prioCfg.border
                       )}>
                         <div className={cn("h-1 w-1 rounded-full", prioCfg.dot)} />
                         {task.priority} Priority
                       </span>
                    </div>

                    {/* Footer Metadata */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-2">
                        {task.dueAt && (
                          <div className={cn(
                            "flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded-md",
                            isOverdue && !isCompleted ? "text-red-700 bg-red-100" : "text-muted-foreground bg-muted/50"
                          )}>
                            <Clock className="h-2.5 w-2.5" />
                            {format(new Date(task.dueAt), "MMM dd, p")}
                          </div>
                        )}
                      </div>

                      {/* Assignee Avatar */}
                      {task.assignee && (
                        <div className="relative group/avatar">
                          <Avatar className="h-5 w-5 ring-2 ring-background shadow-sm transition-transform group-hover/avatar:-translate-y-0.5">
                            <AvatarFallback className="text-[8px] font-bold bg-primary text-primary-foreground">
                              {task.assignee.firstName?.[0]}{task.assignee.lastName?.[0]}
                            </AvatarFallback>
                          </Avatar>
                        </div>
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