"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Phone, Mail, Clock, MoreHorizontal, Calendar, FileText, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { mockLeads } from "@/lib/mock-data"
import Link from "next/link"

interface TasksListProps {
  filter: "today" | "overdue" | "approvals" | "all"
}

interface Task {
  id: string
  type: "call" | "email" | "follow_up" | "review" | "approval"
  title: string
  description?: string
  lead: (typeof mockLeads)[0]
  dueDate: Date
  status: "pending" | "completed" | "overdue"
  approvalType?: "email" | "proposal" | "invoice"
}

// Generate mock tasks
const generateTasks = (): Task[] => {
  const now = new Date()
  const tasks: Task[] = []

  // Today's tasks
  tasks.push(
    {
      id: "1",
      type: "call",
      title: "Follow-up call with Sarah",
      description: "Discuss proposal details",
      lead: mockLeads[0],
      dueDate: new Date(now.setHours(10, 0, 0, 0)),
      status: "pending",
    },
    {
      id: "2",
      type: "email",
      title: "Send case study to Mike",
      lead: mockLeads[1],
      dueDate: new Date(now.setHours(14, 0, 0, 0)),
      status: "pending",
    },
    {
      id: "3",
      type: "follow_up",
      title: "Prepare demo presentation",
      lead: mockLeads[2],
      dueDate: new Date(now.setHours(16, 0, 0, 0)),
      status: "pending",
    },
  )

  // Overdue tasks
  tasks.push(
    {
      id: "4",
      type: "call",
      title: "Call back John Smith",
      lead: mockLeads[3],
      dueDate: new Date(now.getTime() - 24 * 60 * 60 * 1000),
      status: "overdue",
    },
    {
      id: "5",
      type: "email",
      title: "Send pricing to Alex",
      lead: mockLeads[6],
      dueDate: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
      status: "overdue",
    },
  )

  // Approval tasks
  tasks.push(
    {
      id: "6",
      type: "approval",
      title: "Approve email before sending",
      description: "Follow-up sequence email #2",
      lead: mockLeads[4],
      dueDate: new Date(),
      status: "pending",
      approvalType: "email",
    },
    {
      id: "7",
      type: "approval",
      title: "Review proposal before sending",
      lead: mockLeads[5],
      dueDate: new Date(),
      status: "pending",
      approvalType: "proposal",
    },
    {
      id: "8",
      type: "approval",
      title: "Approve invoice",
      lead: mockLeads[5],
      dueDate: new Date(),
      status: "pending",
      approvalType: "invoice",
    },
  )

  return tasks
}

const allTasks = generateTasks()

const taskIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  call: Phone,
  email: Mail,
  follow_up: Clock,
  review: FileText,
  approval: CheckCircle,
}

export function TasksList({ filter }: TasksListProps) {
  let filteredTasks = allTasks

  if (filter === "today") {
    filteredTasks = allTasks.filter((t) => t.status === "pending" && t.type !== "approval")
  } else if (filter === "overdue") {
    filteredTasks = allTasks.filter((t) => t.status === "overdue")
  } else if (filter === "approvals") {
    filteredTasks = allTasks.filter((t) => t.type === "approval")
  }

  return (
    <div className="space-y-3">
      {filteredTasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}

      {filteredTasks.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <CheckCircle className="h-12 w-12 mx-auto mb-4 text-success" />
          <p className="text-lg font-medium">All caught up!</p>
          <p className="text-sm">No tasks in this category</p>
        </div>
      )}
    </div>
  )
}

function TaskCard({ task }: { task: Task }) {
  const Icon = taskIcons[task.type] || Clock
  const isOverdue = task.status === "overdue"
  const isApproval = task.type === "approval"

  return (
    <Card className={cn(isOverdue && "border-destructive/50", isApproval && "border-warning/50")}>
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          {!isApproval && <Checkbox className="mt-1" />}

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "p-2 rounded-lg",
                    isApproval && "bg-warning/10",
                    !isApproval && isOverdue && "bg-destructive/10",
                    !isApproval && !isOverdue && "bg-muted",
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4",
                      isApproval && "text-warning",
                      !isApproval && isOverdue && "text-destructive",
                      !isApproval && !isOverdue && "text-muted-foreground",
                    )}
                  />
                </div>
                <div>
                  <p className="font-medium text-foreground">{task.title}</p>
                  {task.description && <p className="text-sm text-muted-foreground">{task.description}</p>}
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Mark Complete</DropdownMenuItem>
                  <DropdownMenuItem>Snooze</DropdownMenuItem>
                  <DropdownMenuItem>Reassign</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex items-center justify-between mt-3">
              <Link href={`/leads/${task.lead.id}`} className="flex items-center gap-2 hover:opacity-80">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">
                    {task.lead.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-muted-foreground">{task.lead.name}</span>
                <span className="text-xs text-muted-foreground">• {task.lead.company}</span>
              </Link>

              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "text-xs flex items-center gap-1",
                    isOverdue ? "text-destructive" : "text-muted-foreground",
                  )}
                >
                  <Calendar className="h-3 w-3" />
                  {isOverdue ? "Overdue: " : "Due: "}
                  {format(task.dueDate, "MMM d, h:mm a")}
                </span>

                {isApproval ? (
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      Review
                    </Button>
                    <Button size="sm">Approve</Button>
                  </div>
                ) : (
                  <Button size="sm" variant="outline" className="gap-1 bg-transparent">
                    {task.type === "call" && (
                      <>
                        <Phone className="h-3 w-3" /> Call
                      </>
                    )}
                    {task.type === "email" && (
                      <>
                        <Mail className="h-3 w-3" /> Email
                      </>
                    )}
                    {task.type === "follow_up" && (
                      <>
                        <Clock className="h-3 w-3" /> Start
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
