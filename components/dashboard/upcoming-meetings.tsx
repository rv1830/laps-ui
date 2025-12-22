"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Video, ChevronRight, Calendar, Clock, ExternalLink, Sparkles } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const meetings = [
  {
    id: "1",
    lead: "Sarah Chen",
    company: "TechCorp",
    type: "Discovery",
    time: "10:00 AM",
    duration: "30 min",
    isNext: true,
    isAIBooked: true,
  },
  {
    id: "2",
    lead: "Mike Johnson",
    company: "StartupXYZ",
    type: "Demo",
    time: "2:00 PM",
    duration: "45 min",
    isNext: false,
    isAIBooked: false,
  },
  {
    id: "3",
    lead: "Emma Wilson",
    company: "Agency Plus",
    type: "Closing",
    time: "4:30 PM",
    duration: "30 min",
    isNext: false,
    isAIBooked: true,
  },
]

const typeColors: Record<string, string> = {
  Discovery: "bg-primary/10 text-primary border-primary/30",
  Demo: "bg-accent/10 text-accent border-accent/30",
  Closing: "bg-success/10 text-success border-success/30",
}

export function UpcomingMeetings() {
  return (
    <Card className="border-border/50 bg-card/80 backdrop-blur-sm h-full overflow-hidden">
      <div className="absolute top-0 left-0 w-48 h-48 bg-gradient-to-br from-info/10 to-transparent rounded-full blur-3xl" />
      <CardHeader className="relative flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-info/20">
              <Calendar className="h-3.5 w-3.5 text-info" />
            </div>
            Today's Meetings
          </CardTitle>
          <p className="text-xs text-muted-foreground mt-0.5">{meetings.length} calls scheduled</p>
        </div>
        <Link href="/appointments">
          <Button variant="ghost" size="sm" className="gap-1 text-xs">
            View All <ChevronRight className="h-3 w-3" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="relative space-y-2 pt-2">
        {meetings.map((meeting) => (
          <div
            key={meeting.id}
            className={cn(
              "relative flex items-center justify-between p-3 rounded-xl border transition-all hover:shadow-md cursor-pointer group",
              meeting.isNext
                ? "border-primary/40 bg-gradient-to-r from-primary/10 to-transparent hover:border-primary/60"
                : "border-border/50 bg-card/50 hover:border-border",
            )}
          >
            {meeting.isNext && (
              <div className="absolute -left-px top-1/2 -translate-y-1/2 w-1 h-10 bg-gradient-to-b from-primary to-accent rounded-r-full" />
            )}
            <div className="flex items-center gap-3">
              <Avatar
                className={cn(
                  "h-11 w-11 border-2 shadow-md transition-transform group-hover:scale-105",
                  meeting.isNext ? "border-primary/50" : "border-card",
                )}
              >
                <AvatarFallback
                  className={cn(
                    "text-xs font-bold",
                    meeting.isNext
                      ? "bg-gradient-to-br from-primary/20 to-accent/10 text-primary"
                      : "bg-muted text-muted-foreground",
                  )}
                >
                  {meeting.lead
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-1.5">
                  <p className="text-sm font-semibold text-foreground">{meeting.lead}</p>
                  {meeting.isAIBooked && (
                    <div className="flex h-4 items-center gap-0.5 rounded-full bg-accent/20 px-1">
                      <Sparkles className="h-2.5 w-2.5 text-accent" />
                    </div>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{meeting.company}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-right">
                <Badge
                  variant="outline"
                  className={cn("text-[10px] mb-1 border font-semibold", typeColors[meeting.type])}
                >
                  {meeting.type}
                </Badge>
                <div className="flex items-center gap-1 text-xs text-muted-foreground justify-end">
                  <Clock className="h-3 w-3" />
                  {meeting.time}
                </div>
              </div>
              <Button
                size="icon"
                variant={meeting.isNext ? "default" : "ghost"}
                className={cn(
                  "h-9 w-9 transition-transform group-hover:scale-105",
                  meeting.isNext && "bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20",
                )}
              >
                {meeting.isNext ? <Video className="h-4 w-4" /> : <ExternalLink className="h-3.5 w-3.5" />}
              </Button>
            </div>
          </div>
        ))}

        {meetings.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No meetings scheduled</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
