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
  MessageSquare, Briefcase, PlusCircle, 
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
    stageId: "", 
    notes: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.email && !formData.phone) {
      toast.error("Contact details missing", {
        description: "Please provide at least an Email address or a Phone number.",
        icon: <AlertCircle className="h-5 w-5 text-destructive" />
      })
      return
    }

    setIsLoading(true)
    try {
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email || null,
        phone: formData.phone || null,
        company: formData.company,
        source: formData.source,
        stageId: formData.stageId || undefined,
        customFields: {
          notes: formData.notes 
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
    <form onSubmit={handleSubmit} className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        
        {/* LEFT COLUMN */}
        <div className="space-y-4">
          {/* SECTION 1: PERSONAL INFORMATION */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 pb-1 border-b border-border/50">
              <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <User className="h-3.5 w-3.5" />
              </div>
              <h3 className="text-[10px] font-black uppercase tracking-widest text-foreground/70">Personal Details</h3>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1 group">
                <Label className="text-[9px] font-black uppercase text-muted-foreground group-focus-within:text-primary transition-colors">
                  First Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground/50" />
                  <Input 
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    placeholder="John" 
                    className="pl-9 h-9 bg-secondary/20 border-border/50 focus:bg-background transition-all text-xs" 
                  />
                </div>
              </div>
              <div className="space-y-1">
                <Label className="text-[9px] font-black uppercase text-muted-foreground">
                  Last Name
                </Label>
                <Input 
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  placeholder="Doe" 
                  className="h-9 bg-secondary/20 border-border/50 focus:bg-background transition-all text-xs" 
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: CONTACT INFORMATION */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 pb-1 border-b border-border/50">
              <div className="h-7 w-7 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                <Mail className="h-3.5 w-3.5" />
              </div>
              <h3 className="text-[10px] font-black uppercase tracking-widest text-foreground/70">Contact Channels</h3>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <div className="space-y-1 group">
                <Label className={cn(
                  "text-[9px] font-black uppercase transition-colors",
                  !formData.email && !formData.phone ? "text-orange-500" : "text-muted-foreground"
                )}>
                  Email Address {!formData.phone && "*"}
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground/50" />
                  <Input 
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="john@company.com" 
                    className="pl-9 h-9 bg-secondary/20 border-border/50 focus:bg-background transition-all text-xs" 
                  />
                </div>
              </div>
              <div className="space-y-1 group">
                <Label className={cn(
                  "text-[9px] font-black uppercase transition-colors",
                  !formData.email && !formData.phone ? "text-orange-500" : "text-muted-foreground"
                )}>
                  Phone Number {!formData.email && "*"}
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground/50" />
                  <Input 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="+1 234 567 890" 
                    className="pl-9 h-9 bg-secondary/20 border-border/50 focus:bg-background transition-all text-xs" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-4">
          {/* SECTION 3: PROFESSIONAL & PIPELINE */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 pb-1 border-b border-border/50">
              <div className="h-7 w-7 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <Briefcase className="h-3.5 w-3.5" />
              </div>
              <h3 className="text-[10px] font-black uppercase tracking-widest text-foreground/70">Pipeline Info</h3>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1 group">
                <Label className="text-[9px] font-black uppercase text-muted-foreground">Company</Label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground/50" />
                  <Input 
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    placeholder="Google Inc." 
                    className="pl-9 h-9 bg-secondary/20 border-border/50 focus:bg-background transition-all text-xs" 
                  />
                </div>
              </div>
              <div className="space-y-1">
                <Label className="text-[9px] font-black uppercase text-muted-foreground flex items-center gap-1">
                  Lead Source <Sparkles className="h-2.5 w-2.5 text-orange-400" />
                </Label>
                <Select 
                  value={formData.source} 
                  onValueChange={(val) => setFormData({...formData, source: val})}
                >
                  <SelectTrigger className="h-9 bg-secondary/20 border-border/50 text-xs">
                    <SelectValue placeholder="Select Source" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-border/50">
                    <SelectItem value="manual" className="text-xs">Manual Entry</SelectItem>
                    <SelectItem value="website" className="text-xs">Official Website</SelectItem>
                    <SelectItem value="linkedin" className="text-xs">LinkedIn Prospect</SelectItem>
                    <SelectItem value="referral" className="text-xs">Referral</SelectItem>
                    <SelectItem value="ads" className="text-xs">Paid Ads</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* NOTES AREA */}
          <div className="space-y-1">
            <Label className="text-[9px] font-black uppercase text-muted-foreground flex items-center gap-2">
              <MessageSquare className="h-3 w-3" /> Additional Context (Notes)
            </Label>
            <Textarea 
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              placeholder="What's this lead looking for?..." 
              className="min-h-[85px] h-[85px] rounded-xl bg-secondary/20 border-border/50 focus:bg-background transition-all resize-none text-xs" 
            />
          </div>
        </div>
      </div>

      {/* FOOTER ACTIONS */}
      <div className="flex items-center justify-between pt-3 border-t border-border/50">
        <p className="text-[9px] text-muted-foreground max-w-[200px] leading-tight italic">
          Default placement: <span className="font-bold text-primary">Initial Stage</span>.
        </p>
        <div className="flex gap-3">
          <Button 
            type="button" 
            variant="ghost" 
            onClick={onSuccess} 
            disabled={isLoading}
            className="rounded-full hover:bg-secondary/80 h-9 text-xs"
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            className="h-9 px-6 rounded-full bg-primary hover:bg-primary/90 text-white font-bold shadow-lg shadow-primary/20 active:scale-95 transition-all text-xs" 
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-3 w-3 animate-spin" /> Syncing...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <PlusCircle className="h-3.5 w-3.5" /> Finalize Lead
              </span>
            )}
          </Button>
        </div>
      </div>
    </form>
  )
}