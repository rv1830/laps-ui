import { TopHeader } from "@/components/layout/top-header"
import { BookingSettings } from "@/components/appointments/booking-settings"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AppointmentSettingsPage() {
  return (
    <div className="flex flex-col h-full">
      <TopHeader
        title="Booking Settings"
        actions={
          <Link href="/appointments">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Appointments
            </Button>
          </Link>
        }
      />

      <div className="flex-1 overflow-y-auto p-6">
        <BookingSettings />
      </div>
    </div>
  )
}
