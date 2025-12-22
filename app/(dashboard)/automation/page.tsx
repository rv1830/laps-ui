"use client"

import { useState } from "react"
import { TopHeader } from "@/components/layout/top-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Plus, Search, MoreHorizontal, Play, Pause, Copy, Trash2, Zap, Clock, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"

interface Workflow {
  id: string
  name: string
  trigger: string
  actionsCount: number
  status: "active" | "paused" | "draft"
  mode: "manual" | "assisted" | "autopilot"
  lastRun?: Date
  totalRuns: number
  failedRuns: number
}

const workflows: Workflow[] = [
  {
    id: "1",
    name: "New Lead Auto-Enroll",
    trigger: "When lead is created",
    actionsCount: 2,
    status: "active",
    mode: "autopilot",
    lastRun: new Date(Date.now() - 2 * 60 * 60 * 1000),
    totalRuns: 248,
    failedRuns: 0,
  },
  {
    id: "2",
    name: "Meeting Completed Follow-up",
    trigger: "When meeting is completed",
    actionsCount: 3,
    status: "active",
    mode: "assisted",
    lastRun: new Date(Date.now() - 5 * 60 * 60 * 1000),
    totalRuns: 42,
    failedRuns: 1,
  },
  {
    id: "3",
    name: "No Reply Reminder",
    trigger: "No reply after 3 days",
    actionsCount: 2,
    status: "active",
    mode: "assisted",
    lastRun: new Date(Date.now() - 24 * 60 * 60 * 1000),
    totalRuns: 156,
    failedRuns: 3,
  },
  {
    id: "4",
    name: "Proposal Auto-send",
    trigger: "When stage changes to Presented",
    actionsCount: 2,
    status: "paused",
    mode: "manual",
    lastRun: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    totalRuns: 18,
    failedRuns: 0,
  },
  {
    id: "5",
    name: "Won Deal Celebration",
    trigger: "When stage changes to Won",
    actionsCount: 1,
    status: "draft",
    mode: "autopilot",
    totalRuns: 0,
    failedRuns: 0,
  },
]

const modeColors = {
  manual: "bg-muted text-muted-foreground",
  assisted: "bg-warning/10 text-warning",
  autopilot: "bg-success/10 text-success",
}

export default function AutomationPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredWorkflows = workflows.filter((w) => w.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const activeCount = workflows.filter((w) => w.status === "active").length
  const failedCount = workflows.reduce((acc, w) => acc + w.failedRuns, 0)

  return (
    <div className="flex flex-col h-full">
      <TopHeader
        title="Automation"
        subtitle="Manage your workflows and automations"
        actions={
          <Link href="/automation/new">
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              New Workflow
            </Button>
          </Link>
        }
      />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-foreground">{workflows.length}</p>
                  <p className="text-sm text-muted-foreground">Total Workflows</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-success/10">
                  <Play className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-foreground">{activeCount}</p>
                  <p className="text-sm text-muted-foreground">Active</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-chart-2/10">
                  <Clock className="h-5 w-5 text-chart-2" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-foreground">
                    {workflows.reduce((acc, w) => acc + w.totalRuns, 0)}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Runs</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-destructive/10">
                  <AlertCircle className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-foreground">{failedCount}</p>
                  <p className="text-sm text-muted-foreground">Failed Runs</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search workflows..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Workflows List */}
        <div className="space-y-4">
          {filteredWorkflows.map((workflow) => (
            <WorkflowCard key={workflow.id} workflow={workflow} />
          ))}
        </div>
      </div>
    </div>
  )
}

function WorkflowCard({ workflow }: { workflow: Workflow }) {
  const [isActive, setIsActive] = useState(workflow.status === "active")

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Switch checked={isActive} onCheckedChange={setIsActive} disabled={workflow.status === "draft"} />
            <div>
              <div className="flex items-center gap-2">
                <Link href={`/automation/${workflow.id}`} className="font-medium text-foreground hover:text-primary">
                  {workflow.name}
                </Link>
                <Badge
                  variant="outline"
                  className={cn(
                    workflow.status === "active" && "bg-success/10 text-success",
                    workflow.status === "paused" && "bg-muted text-muted-foreground",
                    workflow.status === "draft" && "bg-warning/10 text-warning",
                  )}
                >
                  {workflow.status}
                </Badge>
                <Badge variant="outline" className={modeColors[workflow.mode]}>
                  {workflow.mode}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {workflow.trigger} • {workflow.actionsCount} actions
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">{workflow.totalRuns} runs</p>
              {workflow.lastRun && (
                <p className="text-xs text-muted-foreground">
                  Last run {formatDistanceToNow(workflow.lastRun, { addSuffix: true })}
                </p>
              )}
            </div>

            {workflow.failedRuns > 0 && (
              <Badge variant="destructive" className="gap-1">
                <AlertCircle className="h-3 w-3" />
                {workflow.failedRuns} failed
              </Badge>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Play className="mr-2 h-4 w-4" /> Run Now
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Pause className="mr-2 h-4 w-4" /> Pause
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Copy className="mr-2 h-4 w-4" /> Duplicate
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
