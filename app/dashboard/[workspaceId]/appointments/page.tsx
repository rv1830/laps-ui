import { TopHeader } from "@/components/layout/top-header"
import { AppointmentsCalendar } from "@/components/appointments/appointments-calendar"
import { AppointmentsList } from "@/components/appointments/appointments-list"
import { Button } from "@/components/ui/button"
import { Plus, Settings } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

export default function AppointmentsPage() {
  return (
    <div className="flex flex-col h-full">
      <TopHeader
        title="Appointments"
        actions={
          <div className="flex items-center gap-2">
            <Link href="/appointments/settings">
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Settings className="h-4 w-4" />
                Booking Settings
              </Button>
            </Link>
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              New Appointment
            </Button>
          </div>
        }
      />

      <div className="flex-1 overflow-y-auto p-6">
        <Tabs defaultValue="calendar" className="w-full">
          <TabsList>
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          </TabsList>
          <TabsContent value="calendar" className="mt-6">
            <AppointmentsCalendar />
          </TabsContent>
          <TabsContent value="list" className="mt-6">
            <AppointmentsList view="all" />
          </TabsContent>
          <TabsContent value="upcoming" className="mt-6">
            <AppointmentsList view="upcoming" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
