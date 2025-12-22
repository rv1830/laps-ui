"use client"

import type { Lead } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Calendar, FileText, Receipt, Zap, Sparkles } from "lucide-react"

interface LeadQuickActionsProps {
  lead: Lead
}

export function LeadQuickActions({ lead }: LeadQuickActionsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
          <Mail className="h-4 w-4" />
          Send Email
        </Button>
        <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
          <Zap className="h-4 w-4" />
          Add to Sequence
        </Button>
        <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
          <Calendar className="h-4 w-4" />
          Book Meeting
        </Button>
        <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
          <FileText className="h-4 w-4" />
          Generate Proposal
        </Button>
        <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
          <Receipt className="h-4 w-4" />
          Generate Invoice
        </Button>
        <div className="pt-3 border-t border-border">
          <Button variant="secondary" className="w-full justify-start gap-2">
            <Sparkles className="h-4 w-4" />
            AI: Suggest Next Action
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
