"use client"

import { useState } from "react"
import { TopHeader } from "@/components/layout/top-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, CheckCircle, XCircle, Clock, RotateCcw, Eye } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

interface RunLog {
  id: string
  workflowName: string
  trigger: string
  leadName: string
  status: "success" | "failed" | "pending" | "waiting_approval"
  startedAt: Date
  completedAt?: Date
  stepsCompleted: number
  totalSteps: number
  error?: string
}

const runLogs: RunLog[] = [
  {
    id: "1",
    workflowName: "New Lead Auto-Enroll",
    trigger: "Lead Created",
    leadName: "Alex Rivera",
    status: "success",
    startedAt: new Date(Date.now() - 30 * 60 * 1000),
    completedAt: new Date(Date.now() - 28 * 60 * 1000),
    stepsCompleted: 2,
    totalSteps: 2,
  },
  {
    id: "2",
    workflowName: "Meeting Completed Follow-up",
    trigger: "Meeting Completed",
    leadName: "Sarah Chen",
    status: "waiting_approval",
    startedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    stepsCompleted: 1,
    totalSteps: 3,
  },
  {
    id: "3",
    workflowName: "No Reply Reminder",
    trigger: "No Reply After 3 Days",
    leadName: "John Smith",
    status: "failed",
    startedAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    completedAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    stepsCompleted: 1,
    totalSteps: 2,
    error: "Email account disconnected",
  },
  {
    id: "4",
    workflowName: "New Lead Auto-Enroll",
    trigger: "Lead Created",
    leadName: "Emma Wilson",
    status: "success",
    startedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    completedAt: new Date(Date.now() - 24 * 60 * 60 * 1000 + 2 * 60 * 1000),
    stepsCompleted: 2,
    totalSteps: 2,
  },
  {
    id: "5",
    workflowName: "Meeting Completed Follow-up",
    trigger: "Meeting Completed",
    leadName: "Mike Johnson",
    status: "success",
    startedAt: new Date(Date.now() - 48 * 60 * 60 * 1000),
    completedAt: new Date(Date.now() - 48 * 60 * 60 * 1000 + 5 * 60 * 1000),
    stepsCompleted: 3,
    totalSteps: 3,
  },
]

const statusConfig = {
  success: { icon: CheckCircle, color: "text-success bg-success/10", label: "Success" },
  failed: { icon: XCircle, color: "text-destructive bg-destructive/10", label: "Failed" },
  pending: { icon: Clock, color: "text-warning bg-warning/10", label: "Pending" },
  waiting_approval: { icon: Clock, color: "text-chart-2 bg-chart-2/10", label: "Waiting Approval" },
}

export default function AutomationLogsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  let filteredLogs = runLogs
  if (statusFilter !== "all") {
    filteredLogs = filteredLogs.filter((log) => log.status === statusFilter)
  }
  if (searchQuery) {
    filteredLogs = filteredLogs.filter(
      (log) =>
        log.workflowName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.leadName.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }

  return (
    <div className="flex flex-col h-full">
      <TopHeader title="Automation Logs" subtitle="Monitor workflow runs and troubleshoot issues" />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by workflow or lead..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="success">Success</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="waiting_approval">Waiting Approval</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Logs List */}
        <div className="space-y-3">
          {filteredLogs.map((log) => {
            const { icon: StatusIcon, color, label } = statusConfig[log.status]
            return (
              <Card key={log.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={cn("p-2 rounded-lg", color)}>
                        <StatusIcon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-foreground">{log.workflowName}</p>
                          <Badge variant="outline">{label}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Triggered by: {log.trigger} • Lead: {log.leadName}
                        </p>
                        {log.error && <p className="text-sm text-destructive mt-1">Error: {log.error}</p>}
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-sm text-foreground">
                          {log.stepsCompleted}/{log.totalSteps} steps
                        </p>
                        <p className="text-xs text-muted-foreground">{format(log.startedAt, "MMM d, h:mm a")}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        {log.status === "failed" && (
                          <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                            <RotateCcw className="h-4 w-4" /> Retry
                          </Button>
                        )}
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
