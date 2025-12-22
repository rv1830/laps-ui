"use client"

import { useState } from "react"
import { TopHeader } from "@/components/layout/top-header"
import { TasksList } from "@/components/tasks/tasks-list"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Plus, Clock, AlertCircle, CheckCircle, Inbox } from "lucide-react"

export default function TasksPage() {
  const [activeTab, setActiveTab] = useState("today")

  return (
    <div className="flex flex-col h-full">
      <TopHeader
        title="Tasks"
        subtitle="Your action queue for daily execution"
        actions={
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            New Task
          </Button>
        }
      />

      <div className="flex-1 overflow-y-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="today" className="gap-2">
              <Clock className="h-4 w-4" />
              Due Today
              <Badge variant="secondary">5</Badge>
            </TabsTrigger>
            <TabsTrigger value="overdue" className="gap-2">
              <AlertCircle className="h-4 w-4" />
              Overdue
              <Badge variant="destructive">2</Badge>
            </TabsTrigger>
            <TabsTrigger value="approvals" className="gap-2">
              <CheckCircle className="h-4 w-4" />
              Approvals
              <Badge variant="secondary">3</Badge>
            </TabsTrigger>
            <TabsTrigger value="all" className="gap-2">
              <Inbox className="h-4 w-4" />
              All Tasks
            </TabsTrigger>
          </TabsList>

          <TabsContent value="today">
            <TasksList filter="today" />
          </TabsContent>
          <TabsContent value="overdue">
            <TasksList filter="overdue" />
          </TabsContent>
          <TabsContent value="approvals">
            <TasksList filter="approvals" />
          </TabsContent>
          <TabsContent value="all">
            <TasksList filter="all" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
