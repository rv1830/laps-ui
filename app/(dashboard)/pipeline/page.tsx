"use client"

import { useState } from "react"
import { TopHeader } from "@/components/layout/top-header"
import { PipelineBoard } from "@/components/pipeline/pipeline-board"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Settings, LayoutGrid, List } from "lucide-react"
import Link from "next/link"

export default function PipelinePage() {
  const [viewMode, setViewMode] = useState<"board" | "timeline">("board")

  return (
    <div className="flex flex-col h-full">
      <TopHeader
        title="Pipeline"
        subtitle="Visual view of your sales pipeline"
        actions={
          <div className="flex items-center gap-2">
            <div className="flex items-center border border-border rounded-lg overflow-hidden">
              <Button
                variant="ghost"
                size="sm"
                className={`rounded-none ${viewMode === "board" ? "bg-muted" : ""}`}
                onClick={() => setViewMode("board")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Link href="/pipeline/timeline">
                <Button variant="ghost" size="sm" className="rounded-none">
                  <List className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <Select defaultValue="all">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Pipelines" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Pipelines</SelectItem>
                <SelectItem value="sales">Sales Pipeline</SelectItem>
                <SelectItem value="consulting">Consulting</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>

            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Lead
            </Button>
          </div>
        }
      />

      <div className="flex-1 overflow-hidden">
        <PipelineBoard />
      </div>
    </div>
  )
}
