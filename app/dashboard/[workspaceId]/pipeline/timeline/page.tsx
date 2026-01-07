"use client"

import { TopHeader } from "@/components/layout/top-header"
import { PipelineTimeline } from "@/components/pipeline/pipeline-timeline"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LayoutGrid, List, Settings, Plus } from "lucide-react"
import Link from "next/link"

export default function PipelineTimelinePage() {
  return (
    <div className="flex flex-col h-full">
      <TopHeader
        title="Pipeline Timeline"
        subtitle="Activity stream view of your pipeline"
        actions={
          <div className="flex items-center gap-2">
            <div className="flex items-center border border-border rounded-lg overflow-hidden">
              <Link href="/pipeline">
                <Button variant="ghost" size="sm" className="rounded-none">
                  <LayoutGrid className="h-4 w-4" />
                </Button>
              </Link>
              <Button variant="ghost" size="sm" className="rounded-none bg-muted">
                <List className="h-4 w-4" />
              </Button>
            </div>

            <Select defaultValue="all">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Stages" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stages</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="qualified">Qualified</SelectItem>
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

      <div className="flex-1 overflow-y-auto">
        <PipelineTimeline />
      </div>
    </div>
  )
}
