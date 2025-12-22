"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Phone, Mail, CheckCircle, Clock, AlertCircle, ChevronRight, Sparkles, ArrowRight, Target } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const tasks = {
  today: [
    {
      id: "1",
      type: "call",
      lead: "Sarah Chen",
      company: "TechCorp",
      stage: "Qualified",
      dueTime: "10:00 AM",
      mood: "positive",
    },
    {
      id: "2",
      type: "email",
      lead: "Mike Johnson",
      company: "StartupXYZ",
      stage: "Replied",
      dueTime: "2:00 PM",
      mood: "neutral",
    },
    {
      id: "3",
      type: "approval",
      lead: "Emma Wilson",
      company: "Agency Plus",
      stage: "Proposal",
      dueTime: "4:00 PM",
      mood: "positive",
    },
  ],
  overdue: [
    {
      id: "4",
      type: "call",
      lead: "John Smith",
      company: "Enterprise Co",
      stage: "Contacted",
      dueTime: "Yesterday",
      mood: "negative",
    },
  ],
  approvals: [
    {
      id: "5",
      type: "approval",
      lead: "Lisa Park",
      company: "Design Studio",
      stage: "Proposal",
      action: "Send Proposal",
      mood: "positive",
    },
    {
      id: "6",
      type: "approval",
      lead: "Tom Brown",
      company: "Consulting Inc",
      stage: "Invoice",
      action: "Send Invoice",
      mood: "neutral",
    },
  ],
}

const moodColors = {
  positive: "bg-success",
  neutral: "bg-warning",
  negative: "bg-destructive",
}

export function ActionQueue() {
  return (
    <Card className="border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden">
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-primary/5 to-transparent rounded-full blur-3xl" />
      <CardHeader className="relative flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary/20">
              <Target className="h-3.5 w-3.5 text-primary" />
            </div>
            Action Queue
          </CardTitle>
          <p className="text-xs text-muted-foreground mt-0.5">Tasks requiring your attention</p>
        </div>
        <Link href="/tasks">
          <Button variant="ghost" size="sm" className="gap-1 text-xs">
            View All <ChevronRight className="h-3 w-3" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="relative pt-2">
        <Tabs defaultValue="today">
          <TabsList className="grid w-full grid-cols-3 mb-4 bg-muted/20 p-1 h-auto rounded-xl">
            <TabsTrigger
              value="today"
              className="gap-1.5 text-xs py-2.5 rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-md transition-all"
            >
              <Clock className="h-3.5 w-3.5" />
              Today
              <Badge className="ml-0.5 h-5 min-w-5 px-1.5 text-[10px] bg-primary/20 text-primary border-0 rounded-full">
                {tasks.today.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger
              value="overdue"
              className="gap-1.5 text-xs py-2.5 rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-md transition-all"
            >
              <AlertCircle className="h-3.5 w-3.5" />
              Overdue
              <Badge className="ml-0.5 h-5 min-w-5 px-1.5 text-[10px] bg-destructive/20 text-destructive border-0 rounded-full">
                {tasks.overdue.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger
              value="approvals"
              className="gap-1.5 text-xs py-2.5 rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-md transition-all"
            >
              <CheckCircle className="h-3.5 w-3.5" />
              AI Approvals
              <Badge className="ml-0.5 h-5 min-w-5 px-1.5 text-[10px] bg-accent/20 text-accent border-0 rounded-full">
                {tasks.approvals.length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="space-y-2 mt-0">
            {tasks.today.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </TabsContent>

          <TabsContent value="overdue" className="space-y-2 mt-0">
            {tasks.overdue.map((task) => (
              <TaskItem key={task.id} task={task} isOverdue />
            ))}
          </TabsContent>

          <TabsContent value="approvals" className="space-y-2 mt-0">
            {tasks.approvals.map((task) => (
              <ApprovalItem key={task.id} task={task} />
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

function TaskItem({
  task,
  isOverdue,
}: {
  task: (typeof tasks.today)[0]
  isOverdue?: boolean
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between p-3 rounded-xl border transition-all hover:shadow-md group",
        isOverdue
          ? "border-destructive/30 bg-gradient-to-r from-destructive/5 to-transparent"
          : "border-border/50 hover:border-primary/30 bg-card/50",
      )}
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <Avatar className="h-11 w-11 border-2 border-card shadow-md transition-transform group-hover:scale-105">
            <AvatarFallback
              className={cn(
                "text-xs font-bold",
                task.type === "call"
                  ? "bg-gradient-to-br from-primary/20 to-primary/10 text-primary"
                  : task.type === "email"
                    ? "bg-gradient-to-br from-info/20 to-info/10 text-info"
                    : "bg-gradient-to-br from-accent/20 to-accent/10 text-accent",
              )}
            >
              {task.lead
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div
            className={cn(
              "absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-card",
              moodColors[task.mood as keyof typeof moodColors],
            )}
          />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">{task.lead}</p>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span>{task.company}</span>
            <ArrowRight className="h-2.5 w-2.5" />
            <Badge variant="outline" className="text-[10px] py-0 h-4 px-1.5 font-medium border-primary/30 text-primary">
              {task.stage}
            </Badge>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className={cn("text-xs font-medium", isOverdue ? "text-destructive" : "text-muted-foreground")}>
          {task.dueTime}
        </span>
        {task.type === "call" ? (
          <Button size="sm" className="gap-1.5 h-8 px-3 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
            <Phone className="h-3 w-3" /> Call
          </Button>
        ) : task.type === "email" ? (
          <Button
            size="sm"
            variant="outline"
            className="gap-1.5 h-8 px-3 bg-transparent border-info/30 text-info hover:bg-info/10"
          >
            <Mail className="h-3 w-3" /> Email
          </Button>
        ) : (
          <Button
            size="sm"
            className="gap-1.5 h-8 px-3 bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg shadow-accent/20"
          >
            <Sparkles className="h-3 w-3" /> Review
          </Button>
        )}
      </div>
    </div>
  )
}

function ApprovalItem({ task }: { task: (typeof tasks.approvals)[0] }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl border border-accent/30 bg-gradient-to-r from-accent/5 to-transparent transition-all hover:shadow-md hover:border-accent/50 group ai-glow-subtle">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Avatar className="h-11 w-11 border-2 border-card shadow-md transition-transform group-hover:scale-105">
            <AvatarFallback className="bg-gradient-to-br from-accent/20 to-primary/10 text-accent text-xs font-bold">
              {task.lead
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full border-2 border-card bg-accent flex items-center justify-center">
            <Sparkles className="h-2 w-2 text-accent-foreground" />
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">{task.lead}</p>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span>{task.company}</span>
            <ArrowRight className="h-2.5 w-2.5" />
            <span className="text-accent font-semibold">{task.action}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button size="sm" variant="outline" className="h-8 px-3 bg-transparent text-xs border-border/50">
          Preview
        </Button>
        <Button
          size="sm"
          className="h-8 px-3 bg-success hover:bg-success/90 text-success-foreground gap-1.5 shadow-lg shadow-success/20"
        >
          <CheckCircle className="h-3 w-3" />
          Approve
        </Button>
      </div>
    </div>
  )
}
