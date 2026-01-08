"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Mail, Calendar, FileText, Receipt, Zap, Sparkles, 
  Trash2, Loader2, MessageSquarePlus 
} from "lucide-react"
import { leadService } from "@/services/lead"
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function LeadQuickActions({ lead }: { lead: any }) {
  const params = useParams()
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)
  const workspaceId = params.workspaceId as string

  const handleDelete = async () => {
    try {
      setIsDeleting(true)
      await leadService.deleteLead(workspaceId, lead.id)
      toast.success("Lead deleted successfully")
      router.push(`/dashboard/${workspaceId}/leads`)
      router.refresh()
    } catch (error) {
      toast.error("Failed to delete lead")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Card className="shadow-sm border-primary/10 overflow-hidden">
      <CardHeader className="bg-muted/30 pb-3">
        <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
          <Zap className="h-3 w-3 text-primary" /> Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 grid grid-cols-1 gap-2">
        <Button variant="outline" className="w-full justify-start gap-3 h-10 font-medium hover:bg-primary/5 hover:text-primary border-dashed">
          <Mail className="h-4 w-4 text-primary" /> Send Email
        </Button>
        
        <Button variant="outline" className="w-full justify-start gap-3 h-10 font-medium hover:bg-primary/5 hover:text-primary border-dashed">
          <MessageSquarePlus className="h-4 w-4 text-primary" /> Add to Sequence
        </Button>

        <Button variant="outline" className="w-full justify-start gap-3 h-10 font-medium hover:bg-primary/5 hover:text-primary border-dashed">
          <Calendar className="h-4 w-4 text-primary" /> Book Meeting
        </Button>

        <Button variant="outline" className="w-full justify-start gap-3 h-10 font-medium hover:bg-primary/5 hover:text-primary border-dashed">
          <FileText className="h-4 w-4 text-primary" /> Generate Proposal
        </Button>

        <Button variant="outline" className="w-full justify-start gap-3 h-10 font-medium hover:bg-primary/5 hover:text-primary border-dashed">
          <Receipt className="h-4 w-4 text-primary" /> Generate Invoice
        </Button>

        <div className="mt-2 pt-2 border-t space-y-2">
          <Button variant="secondary" className="w-full justify-start gap-3 h-10 bg-primary/10 text-primary hover:bg-primary/20 border-none">
            <Sparkles className="h-4 w-4" /> AI Suggestion
          </Button>

          {/* Delete Action with Alert Dialog */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" className="w-full justify-start gap-3 h-10 text-destructive hover:bg-destructive/10 hover:text-destructive">
                {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                Delete Lead
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete <strong>{lead.fullName}</strong> and all associated activities. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  )
}