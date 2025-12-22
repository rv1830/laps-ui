"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Video, Phone, MapPin, CheckCircle, XCircle, Clock } from "lucide-react"

interface AppointmentsListProps {
  view: "all" | "upcoming"
}

const mockAppointments = [
  {
    id: "1",
    title: "Discovery Call",
    leadName: "Sarah Chen",
    leadEmail: "sarah@techcorp.com",
    date: new Date(2025, 5, 22, 10, 0),
    duration: 30,
    type: "video" as const,
    status: "confirmed" as const,
  },
  {
    id: "2",
    title: "Product Demo",
    leadName: "Michael Roberts",
    leadEmail: "michael@innovate.io",
    date: new Date(2025, 5, 22, 14, 30),
    duration: 45,
    type: "video" as const,
    status: "confirmed" as const,
  },
  {
    id: "3",
    title: "Follow-up Call",
    leadName: "Emily Watson",
    leadEmail: "emily@startup.co",
    date: new Date(2025, 5, 23, 11, 0),
    duration: 15,
    type: "phone" as const,
    status: "pending" as const,
  },
  {
    id: "4",
    title: "Contract Review",
    leadName: "David Kim",
    leadEmail: "david@enterprise.com",
    date: new Date(2025, 5, 24, 9, 0),
    duration: 60,
    type: "in-person" as const,
    status: "confirmed" as const,
  },
  {
    id: "5",
    title: "Onboarding Session",
    leadName: "Lisa Park",
    leadEmail: "lisa@growth.io",
    date: new Date(2025, 5, 25, 15, 0),
    duration: 45,
    type: "video" as const,
    status: "confirmed" as const,
  },
  {
    id: "6",
    title: "Strategy Call",
    leadName: "James Wilson",
    leadEmail: "james@scale.co",
    date: new Date(2025, 5, 20, 16, 0),
    duration: 30,
    type: "video" as const,
    status: "completed" as const,
  },
]

const typeIcons = {
  video: Video,
  phone: Phone,
  "in-person": MapPin,
}

const statusConfig = {
  confirmed: { color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20", icon: CheckCircle },
  pending: { color: "bg-amber-500/10 text-amber-600 border-amber-500/20", icon: Clock },
  cancelled: { color: "bg-red-500/10 text-red-600 border-red-500/20", icon: XCircle },
  completed: { color: "bg-blue-500/10 text-blue-600 border-blue-500/20", icon: CheckCircle },
}

export function AppointmentsList({ view }: AppointmentsListProps) {
  const today = new Date(2025, 5, 22)
  const filteredAppointments =
    view === "upcoming"
      ? mockAppointments.filter((apt) => apt.date >= today && apt.status !== "completed")
      : mockAppointments

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          {view === "upcoming" ? "Upcoming Appointments" : "All Appointments"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Meeting</TableHead>
              <TableHead>Lead</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAppointments.map((apt) => {
              const TypeIcon = typeIcons[apt.type]
              const statusInfo = statusConfig[apt.status as keyof typeof statusConfig]

              return (
                <TableRow key={apt.id}>
                  <TableCell className="font-medium">{apt.title}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{apt.leadName}</p>
                      <p className="text-xs text-muted-foreground">{apt.leadEmail}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">
                        {apt.date.toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {apt.date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{apt.duration} min</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <TypeIcon className="h-4 w-4 text-muted-foreground" />
                      <span className="capitalize">{apt.type === "in-person" ? "In Person" : apt.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusInfo.color}>
                      {apt.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Reschedule</DropdownMenuItem>
                        <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Cancel</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
