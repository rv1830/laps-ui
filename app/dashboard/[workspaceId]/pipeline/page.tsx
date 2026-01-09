"use client"

import { PipelineBoard } from "@/components/pipeline/pipeline-board"

export default function PipelinePage() {
  return (
    <div className="h-full w-full">
      {/* Saara header aur actions hata diye gaye hain */}
      <PipelineBoard />
    </div>
  )
}