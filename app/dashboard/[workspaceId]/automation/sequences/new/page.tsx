"use client"

import { useState } from "react"
import { TopHeader } from "@/components/layout/top-header"
import { SequenceBuilder } from "@/components/automation/sequence-builder"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Save, Play } from "lucide-react"
import Link from "next/link"

export default function NewSequencePage() {
  const [sequenceName, setSequenceName] = useState("Untitled Sequence")

  return (
    <div className="flex flex-col h-full">
      <TopHeader
        title=""
        actions={
          <div className="flex items-center gap-4">
            <Link href="/automation/sequences">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            </Link>

            <Input
              value={sequenceName}
              onChange={(e) => setSequenceName(e.target.value)}
              className="w-64 font-medium"
            />

            <Button variant="outline" className="gap-2 bg-transparent">
              <Play className="h-4 w-4" />
              Send Test
            </Button>

            <Button className="gap-2">
              <Save className="h-4 w-4" />
              Save Sequence
            </Button>
          </div>
        }
      />

      <div className="flex-1 overflow-hidden">
        <SequenceBuilder />
      </div>
    </div>
  )
}
