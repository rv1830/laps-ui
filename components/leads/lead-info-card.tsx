"use client"

import type { Lead } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Phone, Building2, Edit, Copy } from "lucide-react"
import { format } from "date-fns"

interface LeadInfoCardProps {
  lead: Lead
}

export function LeadInfoCard({ lead }: LeadInfoCardProps) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base font-medium">Lead Information</CardTitle>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Edit className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <Mail className="h-4 w-4 text-muted-foreground" />
          <div className="flex-1 min-w-0">
            <p className="text-sm text-foreground truncate">{lead.email}</p>
          </div>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => copyToClipboard(lead.email)}>
            <Copy className="h-3 w-3" />
          </Button>
        </div>

        {lead.phone && (
          <div className="flex items-center gap-3">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground">{lead.phone}</p>
            </div>
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => copyToClipboard(lead.phone!)}>
              <Copy className="h-3 w-3" />
            </Button>
          </div>
        )}

        {lead.company && (
          <div className="flex items-center gap-3">
            <Building2 className="h-4 w-4 text-muted-foreground" />
            <p className="text-sm text-foreground">{lead.company}</p>
          </div>
        )}

        <div className="pt-4 border-t border-border space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Source</span>
            <span className="text-foreground">{lead.source || "-"}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Owner</span>
            <span className="text-foreground">{lead.owner || "Unassigned"}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Created</span>
            <span className="text-foreground">{format(lead.createdAt, "MMM d, yyyy")}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Last Activity</span>
            <span className="text-foreground">{format(lead.lastActivity, "MMM d, yyyy")}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
