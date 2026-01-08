"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Phone, Building2, Briefcase, Globe, Copy, CalendarDays } from "lucide-react"
import { format, isValid } from "date-fns"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"

export function LeadInfoCard({ lead }: { lead: any }) {
  const copyToClipboard = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text)
    toast.success("Copied to clipboard")
  }

  const formatDate = (d: any) => d && isValid(new Date(d)) ? format(new Date(d), "MMM d, yyyy") : "N/A";

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3 border-b flex flex-row items-center justify-between bg-muted/20">
        <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Lead Details</CardTitle>
        <Badge className="bg-orange-100 text-orange-700 border-orange-200 capitalize hover:bg-orange-100">
          {lead.qualificationLabel}
        </Badge>
      </CardHeader>
      <CardContent className="pt-5 space-y-4">
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <Mail className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground font-medium mb-0.5">Email Address</p>
              <p className="text-sm font-semibold truncate">{lead.email}</p>
            </div>
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyToClipboard(lead.email)}>
              <Copy className="h-3 w-3" />
            </Button>
          </div>

          <div className="flex items-start gap-3">
            <Briefcase className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground font-medium mb-0.5">Company & Role</p>
              <p className="text-sm font-semibold italic">
                {lead.jobTitle || "No Title"} at {lead.company || "No Company"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Globe className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground font-medium mb-0.5">Marketing Source</p>
              <p className="text-sm font-semibold capitalize">{lead.source || "Direct / Unknown"}</p>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-dashed space-y-3">
          <div className="flex justify-between items-center bg-muted/30 p-2 rounded-md">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground font-medium">Lead Created</span>
            </div>
            <span className="text-xs font-bold text-foreground">{formatDate(lead.createdAt)}</span>
          </div>
          
          {lead.lastActivityAt && (
            <div className="flex justify-between items-center px-2">
              <span className="text-xs text-muted-foreground font-medium">Last Activity</span>
              <span className="text-xs font-bold text-foreground">{formatDate(lead.lastActivityAt)}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}