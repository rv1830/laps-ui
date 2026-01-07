"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Users, ShieldCheck, Mail, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TeamSettingsPage() {
  // Mocking team data based on your schema
  const team = [
    { name: "Ravi Raj", email: "raviraj.bvcoe@gmail.com", role: "Admin", status: "Active" },
    { name: "System Bot", email: "ai@laps.ai", role: "AI Assistant", status: "Active" }
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">Team Management</h1>
          <p className="text-sm text-muted-foreground">Manage workspace members and their access levels</p>
        </div>
        <Button size="sm" className="gap-2">
          <UserPlus className="w-4 h-4" /> Invite Member
        </Button>
      </div>

      <Card className="border-sidebar-border bg-sidebar/30">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" /> Active Members
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {team.map((member, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-sidebar-border/30 bg-background/40">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback className="bg-primary/10 text-primary">{member.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-bold">{member.name}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Mail className="w-3 h-3" /> {member.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="gap-1">
                    <ShieldCheck className="w-3 h-3" /> {member.role}
                  </Badge>
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}