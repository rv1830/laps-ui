"use client"

import { useState } from "react"
import { leadService } from "@/services/lead"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Loader2, User, Mail, Phone, Building2, Globe, MessageSquare } from "lucide-react"

interface CreateLeadFormProps {
  workspaceId: string
  onSuccess: () => void
}

export function CreateLeadForm({ workspaceId, onSuccess }: CreateLeadFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    
    const formData = new FormData(e.currentTarget)
    // Backend controller expects these exact fields
    const payload = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      company: formData.get("company"),
      source: formData.get("source") || "manual",
      stageId: formData.get("stageId"), // Optional, backend picks default if null
      customFields: {}
    }

    try {
      await leadService.createLead(workspaceId, payload)
      toast.success("Lead created successfully!")
      onSuccess()
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to create lead")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 py-2">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-2">
            <User className="h-3 w-3" /> First Name
          </Label>
          <Input name="firstName" placeholder="John" className="h-10 focus-visible:ring-primary" />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-2">
            Last Name
          </Label>
          <Input name="lastName" placeholder="Doe" className="h-10" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-2">
            <Mail className="h-3 w-3" /> Email *
          </Label>
          <Input name="email" type="email" placeholder="john@company.com" required className="h-10" />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-2">
            <Phone className="h-3 w-3" /> Phone
          </Label>
          <Input name="phone" placeholder="+1 234 567 890" className="h-10" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-2">
            <Building2 className="h-3 w-3" /> Company
          </Label>
          <Input name="company" placeholder="Acme Inc." className="h-10" />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-2">
            <Globe className="h-3 w-3" /> Lead Source
          </Label>
          <Select name="source" defaultValue="manual">
            <SelectTrigger className="h-10">
              <SelectValue placeholder="Select source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="manual">Manual Entry</SelectItem>
              <SelectItem value="website">Website</SelectItem>
              <SelectItem value="linkedin">LinkedIn</SelectItem>
              <SelectItem value="referral">Referral</SelectItem>
              <SelectItem value="ads">Paid Ads</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-2">
          <MessageSquare className="h-3 w-3" /> Initial Notes
        </Label>
        <Textarea name="notes" placeholder="Any context about this lead..." className="min-h-[80px] resize-none" />
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button type="button" variant="ghost" onClick={onSuccess} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" className="px-8 shadow-lg shadow-primary/20" disabled={isLoading}>
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" /> Creating...
            </span>
          ) : (
            "Create Lead"
          )}
        </Button>
      </div>
    </form>
  )
}