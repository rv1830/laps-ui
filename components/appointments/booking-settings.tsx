"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, ExternalLink, Plus, Trash2 } from "lucide-react"

const meetingTypes = [
  { id: "1", name: "Discovery Call", duration: 30, color: "bg-blue-500" },
  { id: "2", name: "Product Demo", duration: 45, color: "bg-purple-500" },
  { id: "3", name: "Follow-up Call", duration: 15, color: "bg-emerald-500" },
  { id: "4", name: "Strategy Session", duration: 60, color: "bg-amber-500" },
]

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

export function BookingSettings() {
  const [availability, setAvailability] = useState({
    Monday: { enabled: true, start: "09:00", end: "17:00" },
    Tuesday: { enabled: true, start: "09:00", end: "17:00" },
    Wednesday: { enabled: true, start: "09:00", end: "17:00" },
    Thursday: { enabled: true, start: "09:00", end: "17:00" },
    Friday: { enabled: true, start: "09:00", end: "17:00" },
    Saturday: { enabled: false, start: "09:00", end: "17:00" },
    Sunday: { enabled: false, start: "09:00", end: "17:00" },
  })

  return (
    <Tabs defaultValue="availability" className="w-full">
      <TabsList>
        <TabsTrigger value="availability">Availability</TabsTrigger>
        <TabsTrigger value="meeting-types">Meeting Types</TabsTrigger>
        <TabsTrigger value="booking-page">Booking Page</TabsTrigger>
        <TabsTrigger value="reminders">Reminders</TabsTrigger>
      </TabsList>

      <TabsContent value="availability" className="mt-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Working Hours</CardTitle>
            <CardDescription>Set your availability for appointments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {daysOfWeek.map((day) => (
              <div key={day} className="flex items-center gap-4">
                <div className="w-32 flex items-center gap-2">
                  <Switch
                    checked={availability[day as keyof typeof availability].enabled}
                    onCheckedChange={(checked) =>
                      setAvailability((prev) => ({
                        ...prev,
                        [day]: { ...prev[day as keyof typeof prev], enabled: checked },
                      }))
                    }
                  />
                  <span className="text-sm font-medium">{day}</span>
                </div>
                {availability[day as keyof typeof availability].enabled && (
                  <div className="flex items-center gap-2">
                    <Input
                      type="time"
                      value={availability[day as keyof typeof availability].start}
                      onChange={(e) =>
                        setAvailability((prev) => ({
                          ...prev,
                          [day]: { ...prev[day as keyof typeof prev], start: e.target.value },
                        }))
                      }
                      className="w-32"
                    />
                    <span className="text-muted-foreground">to</span>
                    <Input
                      type="time"
                      value={availability[day as keyof typeof availability].end}
                      onChange={(e) =>
                        setAvailability((prev) => ({
                          ...prev,
                          [day]: { ...prev[day as keyof typeof prev], end: e.target.value },
                        }))
                      }
                      className="w-32"
                    />
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Buffer Time</CardTitle>
            <CardDescription>Add buffer time before and after meetings</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Before meetings</Label>
              <Select defaultValue="10">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">No buffer</SelectItem>
                  <SelectItem value="5">5 minutes</SelectItem>
                  <SelectItem value="10">10 minutes</SelectItem>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>After meetings</Label>
              <Select defaultValue="10">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">No buffer</SelectItem>
                  <SelectItem value="5">5 minutes</SelectItem>
                  <SelectItem value="10">10 minutes</SelectItem>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="meeting-types" className="mt-6 space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Meeting Types</CardTitle>
              <CardDescription>Configure different types of meetings you offer</CardDescription>
            </div>
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Type
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {meetingTypes.map((type) => (
                <div key={type.id} className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${type.color}`} />
                    <div>
                      <p className="font-medium">{type.name}</p>
                      <p className="text-sm text-muted-foreground">{type.duration} minutes</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="booking-page" className="mt-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Public Booking Page</CardTitle>
            <CardDescription>Customize your public booking page</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Booking Link</Label>
              <div className="flex gap-2">
                <Input value="https://laps.app/book/john-doe" readOnly className="flex-1" />
                <Button variant="outline" size="icon">
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Page Title</Label>
              <Input defaultValue="Schedule a meeting with John Doe" />
            </div>

            <div className="space-y-2">
              <Label>Welcome Message</Label>
              <Textarea
                defaultValue="Thanks for your interest! Please select a convenient time for our meeting."
                rows={3}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Require Phone Number</Label>
                <p className="text-sm text-muted-foreground">Ask for phone number when booking</p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Allow Rescheduling</Label>
                <p className="text-sm text-muted-foreground">Let leads reschedule their appointments</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="reminders" className="mt-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Email Reminders</CardTitle>
            <CardDescription>Configure automatic appointment reminders</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg border">
              <div>
                <p className="font-medium">24 hours before</p>
                <p className="text-sm text-muted-foreground">Send reminder email 24 hours before appointment</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg border">
              <div>
                <p className="font-medium">1 hour before</p>
                <p className="text-sm text-muted-foreground">Send reminder email 1 hour before appointment</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg border">
              <div>
                <p className="font-medium">After appointment</p>
                <p className="text-sm text-muted-foreground">Send follow-up email after appointment ends</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>SMS Reminders</CardTitle>
            <CardDescription>Configure SMS notifications (requires phone number)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg border">
              <div className="flex items-center gap-3">
                <div>
                  <p className="font-medium">15 minutes before</p>
                  <p className="text-sm text-muted-foreground">Send SMS 15 minutes before appointment</p>
                </div>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
