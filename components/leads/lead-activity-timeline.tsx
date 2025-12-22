"use client"

import type React from "react"
import type { Activity } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MessageSquare, Calendar, FileText, ArrowRight, StickyNote, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { useState } from "react"

interface LeadActivityTimelineProps {
  activities: Activity[]
}

const activityIcons: Record<string, { icon: React.ComponentType<{ className?: string }>; color: string }> = {
  email_sent: { icon: Mail, color: "text-primary bg-primary/10" },
  email_received: { icon: MessageSquare, color: "text-success bg-success/10" },
  meeting: { icon: Calendar, color: "text-chart-2 bg-chart-2/10" },
  note: { icon: StickyNote, color: "text-chart-3 bg-chart-3/10" },
  stage_change: { icon: ArrowRight, color: "text-chart-4 bg-chart-4/10" },
  proposal: { icon: FileText, color: "text-chart-5 bg-chart-5/10" },
  task_created: { icon: Plus, color: "text-muted-foreground bg-muted" },
  invoice: { icon: FileText, color: "text-warning bg-warning/10" },
}

export function LeadActivityTimeline({ activities }: LeadActivityTimelineProps) {
  const [showAddNote, setShowAddNote] = useState(false)
  const [newNote, setNewNote] = useState("")

  const handleAddNote = () => {
    if (newNote.trim()) {
      // In a real app, this would save the note
      setNewNote("")
      setShowAddNote(false)
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base font-medium">Activity Timeline</CardTitle>
        <Button variant="outline" size="sm" onClick={() => setShowAddNote(!showAddNote)}>
          Add Note
        </Button>
      </CardHeader>
      <CardContent>
        {showAddNote && (
          <div className="mb-6 space-y-3">
            <Textarea
              placeholder="Add a note about this lead..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              rows={3}
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowAddNote(false)}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleAddNote}>
                Save Note
              </Button>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {activities.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No activity yet</p>
          ) : (
            activities.map((activity, index) => {
              const { icon: Icon, color } = activityIcons[activity.type] || activityIcons.note
              return (
                <div key={activity.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={cn("p-2 rounded-full", color)}>
                      <Icon className="h-4 w-4" />
                    </div>
                    {index < activities.length - 1 && <div className="w-px flex-1 bg-border mt-2" />}
                  </div>
                  <div className="flex-1 pb-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-foreground">{activity.title}</p>
                      <span className="text-xs text-muted-foreground">
                        {format(activity.createdAt, "MMM d, h:mm a")}
                      </span>
                    </div>
                    {activity.description && (
                      <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
                    )}
                  </div>
                </div>
              )
            })
          )}
        </div>
      </CardContent>
    </Card>
  )
}
