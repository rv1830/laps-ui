"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Zap, ShieldAlert, CheckCircle2 } from "lucide-react"

export default function EmailSettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Email Integrations</h1>
        <p className="text-sm text-muted-foreground">Connect your provider to start sending automated sequences</p>
      </div>

      <div className="grid gap-6">
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" /> AI Smart Sending
              </CardTitle>
              <CheckCircle2 className="w-5 h-5 text-primary" />
            </div>
            <CardDescription>AI-powered email drafting is currently active for this workspace</CardDescription>
          </CardHeader>
        </Card>

        <Card className="border-sidebar-border bg-sidebar/30">
          <CardHeader>
            <CardTitle className="text-lg">Primary Connection</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-6 rounded-2xl border border-dashed border-sidebar-border bg-background/20">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                  <Mail className="w-6 h-6 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-bold">Google Workspace / Outlook</p>
                  <p className="text-sm text-muted-foreground">No account connected yet</p>
                </div>
              </div>
              <Button variant="outline">Connect Provider</Button>
            </div>

            <div className="rounded-xl bg-amber-500/10 border border-amber-500/20 p-4 flex gap-3 items-start">
              <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-600 leading-relaxed font-medium">
                Important: Connecting your email allows LAPS to monitor replies and update lead stages automatically. 
                Ensure your workspace admin has enabled SMTP/IMAP permissions.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}