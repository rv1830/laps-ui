"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Clock, User, Video, Phone, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"

const mockAppointments = [
  {
    id: "1",
    title: "Discovery Call",
    leadName: "Sarah Chen",
    date: new Date(2025, 5, 22, 10, 0),
    duration: 30,
    type: "video" as const,
    status: "confirmed" as const,
  },
  {
    id: "2",
    title: "Product Demo",
    leadName: "Michael Roberts",
    date: new Date(2025, 5, 22, 14, 30),
    duration: 45,
    type: "video" as const,
    status: "confirmed" as const,
  },
  {
    id: "3",
    title: "Follow-up Call",
    leadName: "Emily Watson",
    date: new Date(2025, 5, 23, 11, 0),
    duration: 15,
    type: "phone" as const,
    status: "pending" as const,
  },
  {
    id: "4",
    title: "Contract Review",
    leadName: "David Kim",
    date: new Date(2025, 5, 24, 9, 0),
    duration: 60,
    type: "in-person" as const,
    status: "confirmed" as const,
  },
  {
    id: "5",
    title: "Onboarding Session",
    leadName: "Lisa Park",
    date: new Date(2025, 5, 25, 15, 0),
    duration: 45,
    type: "video" as const,
    status: "confirmed" as const,
  },
]

const typeIcons = {
  video: Video,
  phone: Phone,
  "in-person": MapPin,
}

const statusColors = {
  confirmed: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  pending: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  cancelled: "bg-red-500/10 text-red-600 border-red-500/20",
}

export function AppointmentsCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 5, 22))
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date(2025, 5, 22))

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const getAppointmentsForDate = (day: number) => {
    return mockAppointments.filter((apt) => {
      return (
        apt.date.getDate() === day &&
        apt.date.getMonth() === currentDate.getMonth() &&
        apt.date.getFullYear() === currentDate.getFullYear()
      )
    })
  }

  const selectedDateAppointments = selectedDate
    ? mockAppointments.filter(
        (apt) =>
          apt.date.getDate() === selectedDate.getDate() &&
          apt.date.getMonth() === selectedDate.getMonth() &&
          apt.date.getFullYear() === selectedDate.getFullYear(),
      )
    : []

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-semibold">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </CardTitle>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={prevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map((day) => (
              <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`empty-${i}`} className="h-24 p-1" />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1
              const appointments = getAppointmentsForDate(day)
              const isSelected = selectedDate?.getDate() === day && selectedDate?.getMonth() === currentDate.getMonth()
              const isToday = day === 22 && currentDate.getMonth() === 5

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
                  className={cn(
                    "h-24 p-1 text-left border rounded-lg transition-colors hover:bg-muted/50",
                    isSelected && "border-primary bg-primary/5",
                    isToday && !isSelected && "border-primary/50",
                    !isSelected && "border-border",
                  )}
                >
                  <span className={cn("text-sm font-medium", isToday && "text-primary")}>{day}</span>
                  <div className="mt-1 space-y-0.5">
                    {appointments.slice(0, 2).map((apt) => (
                      <div key={apt.id} className="text-xs truncate px-1 py-0.5 rounded bg-primary/10 text-primary">
                        {apt.date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </div>
                    ))}
                    {appointments.length > 2 && (
                      <div className="text-xs text-muted-foreground px-1">+{appointments.length - 2} more</div>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            {selectedDate ? (
              <>{selectedDate.toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" })}</>
            ) : (
              "Select a Date"
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {selectedDateAppointments.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">No appointments scheduled</p>
          ) : (
            <div className="space-y-3">
              {selectedDateAppointments.map((apt) => {
                const Icon = typeIcons[apt.type]
                return (
                  <div
                    key={apt.id}
                    className="p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-sm">{apt.title}</h4>
                      <Badge variant="outline" className={statusColors[apt.status]}>
                        {apt.status}
                      </Badge>
                    </div>
                    <div className="space-y-1.5 text-xs text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <User className="h-3 w-3" />
                        {apt.leadName}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3" />
                        {apt.date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} ({apt.duration} min)
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon className="h-3 w-3" />
                        {apt.type === "in-person" ? "In Person" : apt.type.charAt(0).toUpperCase() + apt.type.slice(1)}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
