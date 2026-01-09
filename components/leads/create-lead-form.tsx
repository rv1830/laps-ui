"use client"

import { useState } from "react"
import { leadService } from "@/services/lead"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { 
  Loader2, User, Mail, Phone, Building2, 
  Globe, MessageSquare, Briefcase, PlusCircle, 
  Sparkles, ShieldCheck, AlertCircle 
} from "lucide-react"
import { cn } from "@/lib/utils"

interface CreateLeadFormProps {
  workspaceId: string
  onSuccess: () => void
}

export function CreateLeadForm({ workspaceId, onSuccess }: CreateLeadFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    source: "manual",
    stageId: "", // Backend will pick default if empty
    notes: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // BACKEND VALIDATION: At least email or phone required
    if (!formData.email && !formData.phone) {
      toast.error("Contact details missing", {
        description: "Please provide at least an Email address or a Phone number.",
        icon: <AlertCircle className="h-5 w-5 text-destructive" />
      })
      return
    }

    setIsLoading(true)

    try {
      // Mapping to exact Backend Payload
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email || null,
        phone: formData.phone || null,
        company: formData.company,
        source: formData.source,
        stageId: formData.stageId || undefined,
        customFields: {
          notes: formData.notes // Notes sent inside customFields
        }
      }

      await leadService.createLead(workspaceId, payload)
      toast.success("Lead Created Successfully", {
        description: `${formData.firstName || formData.email} has been added to the pipeline.`,
        icon: <ShieldCheck className="h-5 w-5 text-emerald-500" />
      })
      onSuccess()
    } catch (error: any) {
      const errorMsg = error.response?.data?.error || "Failed to create lead"
      toast.error(errorMsg)
      console.error("Lead Creation Error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* SECTION 1: PERSONAL INFORMATION */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-border/50">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <User className="h-4 w-4" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-foreground/70">Personal Details</h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2 group">
            <Label className="text-[10px] font-black uppercase text-muted-foreground group-focus-within:text-primary transition-colors">
              First Name
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground/50" />
              <Input 
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                placeholder="John" 
                className="pl-9 h-11 bg-secondary/20 border-border/50 focus:bg-background transition-all" 
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase text-muted-foreground">
              Last Name
            </Label>
            <Input 
              value={formData.lastName}
              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              placeholder="Doe" 
              className="h-11 bg-secondary/20 border-border/50 focus:bg-background transition-all" 
            />
          </div>
        </div>
      </div>

      {/* SECTION 2: CONTACT INFORMATION */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-border/50">
          <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
            <Mail className="h-4 w-4" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-foreground/70">Contact Channels</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2 group">
            <Label className={cn(
              "text-[10px] font-black uppercase transition-colors",
              !formData.email && !formData.phone ? "text-orange-500" : "text-muted-foreground"
            )}>
              Email Address {!formData.phone && "*"}
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground/50" />
              <Input 
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="john@company.com" 
                className="pl-9 h-11 bg-secondary/20 border-border/50 focus:bg-background transition-all" 
              />
            </div>
          </div>
          <div className="space-y-2 group">
            <Label className={cn(
              "text-[10px] font-black uppercase transition-colors",
              !formData.email && !formData.phone ? "text-orange-500" : "text-muted-foreground"
            )}>
              Phone Number {!formData.email && "*"}
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground/50" />
              <Input 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="+1 234 567 890" 
                className="pl-9 h-11 bg-secondary/20 border-border/50 focus:bg-background transition-all" 
              />
            </div>
          </div>
        </div>
        {!formData.email && !formData.phone && (
          <p className="text-[10px] font-bold text-orange-500 flex items-center gap-1.5 animate-pulse">
            <AlertCircle className="h-3 w-3" /> Either Email or Phone is required for backend sync.
          </p>
        )}
      </div>

      {/* SECTION 3: PROFESSIONAL & PIPELINE */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-border/50">
          <div className="h-8 w-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
            <Briefcase className="h-4 w-4" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-foreground/70">Pipeline Info</h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2 group">
            <Label className="text-[10px] font-black uppercase text-muted-foreground">Company</Label>
            <div className="relative">
              <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground/50" />
              <Input 
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                placeholder="Google Inc." 
                className="pl-9 h-11 bg-secondary/20 border-border/50 focus:bg-background transition-all" 
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase text-muted-foreground flex items-center gap-1">
              Lead Source <Sparkles className="h-3 w-3 text-orange-400" />
            </Label>
            <Select 
              value={formData.source} 
              onValueChange={(val) => setFormData({...formData, source: val})}
            >
              <SelectTrigger className="h-11 bg-secondary/20 border-border/50">
                <SelectValue placeholder="Select Source" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-border/50">
                <SelectItem value="manual" className="rounded-lg">Manual Entry</SelectItem>
                <SelectItem value="website" className="rounded-lg">Official Website</SelectItem>
                <SelectItem value="linkedin" className="rounded-lg">LinkedIn Prospect</SelectItem>
                <SelectItem value="referral" className="rounded-lg">Referral</SelectItem>
                <SelectItem value="ads" className="rounded-lg">Paid Ads</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* NOTES AREA */}
      <div className="space-y-2">
        <Label className="text-[10px] font-black uppercase text-muted-foreground flex items-center gap-2">
          <MessageSquare className="h-3 w-3" /> Additional Context (Notes)
        </Label>
        <Textarea 
          value={formData.notes}
          onChange={(e) => setFormData({...formData, notes: e.target.value})}
          placeholder="What's this lead looking for? Any previous interaction details..." 
          className="min-h-[100px] rounded-2xl bg-secondary/20 border-border/50 focus:bg-background transition-all resize-none" 
        />
      </div>

      {/* FOOTER ACTIONS */}
      <div className="flex items-center justify-between pt-6 border-t border-border/50">
        <p className="text-[10px] text-muted-foreground max-w-[200px]">
          Lead will be placed in the <span className="font-bold text-primary">Initial Stage</span> by default.
        </p>
        <div className="flex gap-3">
          <Button 
            type="button" 
            variant="ghost" 
            onClick={onSuccess} 
            disabled={isLoading}
            className="rounded-full hover:bg-secondary/80"
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            className="h-11 px-8 rounded-full bg-primary hover:bg-primary/90 text-white font-bold shadow-xl shadow-primary/20 active:scale-95 transition-all" 
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" /> Synchronizing...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <PlusCircle className="h-4 w-4" /> Finalize & Create
              </span>
            )}
          </Button>
        </div>
      </div>
    </form>
  )
}