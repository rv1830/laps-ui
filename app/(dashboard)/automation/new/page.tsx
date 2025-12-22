"use client"

import { useState } from "react"
import { TopHeader } from "@/components/layout/top-header"
import { WorkflowBuilder } from "@/components/automation/workflow-builder"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save, Play } from "lucide-react"
import Link from "next/link"

export default function NewWorkflowPage() {
  const [workflowName, setWorkflowName] = useState("Untitled Workflow")
  const [mode, setMode] = useState("assisted")

  return (
    <div className="flex flex-col h-full">
      <TopHeader
        title=""
        actions={
          <div className="flex items-center gap-4">
            <Link href="/automation">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            </Link>

            <Input
              value={workflowName}
              onChange={(e) => setWorkflowName(e.target.value)}
              className="w-64 font-medium"
            />

            <Select value={mode} onValueChange={setMode}>
              <SelectTrigger className="w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="manual">Manual</SelectItem>
                <SelectItem value="assisted">Assisted</SelectItem>
                <SelectItem value="autopilot">Autopilot</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="gap-2 bg-transparent">
              <Play className="h-4 w-4" />
              Test Run
            </Button>

            <Button className="gap-2">
              <Save className="h-4 w-4" />
              Save Workflow
            </Button>
          </div>
        }
      />

      <div className="flex-1 overflow-hidden">
        <WorkflowBuilder />
      </div>
    </div>
  )
}
