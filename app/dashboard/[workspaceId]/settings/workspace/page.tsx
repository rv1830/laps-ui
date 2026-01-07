"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { api } from "@/lib/api"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, Globe, Factory, Users2, Calendar, Settings2 } from "lucide-react"

export default function WorkspaceSettingsPage() {
  const { workspaceId } = useParams()
  const [workspace, setWorkspace] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWorkspace = async () => {
      try {
        const res = await api.get(`/workspaces/${workspaceId}`)
        setWorkspace(res.data.workspace)
      } catch (err) {
        console.error("Error fetching workspace", err)
      } finally {
        setLoading(false)
      }
    }
    fetchWorkspace()
  }, [workspaceId])

  if (loading) return <div className="animate-pulse h-64 bg-sidebar/20 rounded-xl" />

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Workspace Configuration</h1>
        <Badge variant={workspace?.isActive ? "default" : "destructive"}>
          {workspace?.isActive ? "Active Instance" : "Inactive"}
        </Badge>
      </div>

      <Card className="border-sidebar-border bg-sidebar/30">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Building2 className="w-6 h-6 text-primary" />
            </div>
            <div>
              <CardTitle>{workspace?.name}</CardTitle>
              <CardDescription>ID: {workspace?.id}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <DetailBox icon={Factory} label="Industry" value={workspace?.industry} />
          <DetailBox icon={Globe} label="Website" value={workspace?.website} />
          <DetailBox icon={Users2} label="Company Size" value={workspace?.companySize} />
          <DetailBox icon={Calendar} label="Timezone" value={workspace?.timezone} />
        </CardContent>
      </Card>

      <Card className="border-sidebar-border bg-sidebar/30">
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <Settings2 className="w-4 h-4" /> Operational Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between text-sm py-2 border-b border-sidebar-border/50">
            <span className="text-muted-foreground">Date Format</span>
            <span className="font-mono">{workspace?.settings?.dateFormat}</span>
          </div>
          <div className="flex justify-between text-sm py-2">
            <span className="text-muted-foreground">Working Days</span>
            <span className="font-medium">{workspace?.settings?.workingDays?.join(", ")}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function DetailBox({ icon: Icon, label, value }: any) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border border-sidebar-border/30">
      <Icon className="w-4 h-4 text-primary" />
      <div>
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">{label}</p>
        <p className="text-sm font-semibold">{value || "Not Specified"}</p>
      </div>
    </div>
  )
}