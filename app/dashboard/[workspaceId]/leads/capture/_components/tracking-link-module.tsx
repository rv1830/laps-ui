"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Copy, Link2, ExternalLink, MousePointer2, CheckCircle2, Zap, Target, Globe } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

export function TrackingLinkModule() {
  const [targetUrl, setTargetUrl] = useState("")
  const [source, setSource] = useState("")
  const [campaign, setCampaign] = useState("")
  const [copied, setCopied] = useState(false)

  // Generate a dynamic tracking link preview with neon logic
  const generatedLink = `laps.io/l/${Math.random().toString(36).substr(2, 6)}?src=${source || 'direct'}`

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLink)
    setCopied(true)
    toast.success("Tracking Link Copied!")
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Neon Glow background effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary/20 rounded-[2.5rem] opacity-5 blur-2xl transition duration-1000 group-hover:opacity-10"></div>
      
      <Card className="relative border-border bg-background shadow-2xl rounded-[2.5rem] overflow-hidden">
        <CardHeader className="bg-secondary/30 border-b border-border p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-xl shadow-primary/30">
                <Target className="h-7 w-7" />
              </div>
              <div>
                <CardTitle className="text-2xl font-black tracking-tighter uppercase italic">Link Accelerator</CardTitle>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Conversion Tracking Engine</p>
                </div>
              </div>
            </div>
            <div className="hidden sm:flex h-10 px-4 rounded-full bg-background border border-border items-center gap-2 shadow-inner">
               <Globe className="h-3.5 w-3.5 text-muted-foreground" />
               <span className="text-[9px] font-black uppercase text-foreground tracking-widest">Global Routing active</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-10 space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* INPUT SECTION */}
            <div className="space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] ml-1">Target Destination URL</label>
                <div className="relative">
                  <Input 
                    placeholder="https://yourwebsite.com/promo" 
                    value={targetUrl}
                    onChange={(e) => setTargetUrl(e.target.value)}
                    className="h-14 bg-secondary/20 border-border focus:border-primary focus:ring-primary/10 rounded-2xl font-bold text-sm pl-12 transition-all" 
                  />
                  <ExternalLink className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground opacity-50" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] ml-1">UTM Source</label>
                  <Input 
                    placeholder="linkedin" 
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    className="h-14 bg-secondary/20 border-border focus:border-primary rounded-2xl font-bold text-sm transition-all" 
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] ml-1">Campaign</label>
                  <Input 
                    placeholder="winter_sale" 
                    value={campaign}
                    onChange={(e) => setCampaign(e.target.value)}
                    className="h-14 bg-secondary/20 border-border focus:border-primary rounded-2xl font-bold text-sm transition-all" 
                  />
                </div>
              </div>
            </div>
            
            {/* GENERATED PREVIEW SECTION */}
            <div className="bg-secondary/10 rounded-[2.5rem] p-10 border-2 border-dashed border-primary/20 flex flex-col justify-center items-center text-center space-y-8 shadow-inner relative group/link overflow-hidden">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover/link:opacity-100 transition-opacity" />
              
              <div className="relative z-10 p-5 bg-primary text-primary-foreground rounded-2xl shadow-2xl shadow-primary/40 -rotate-2 group-hover/link:rotate-0 transition-transform duration-500">
                 <Link2 className="h-8 w-8" />
              </div>

              <div className="space-y-3 relative z-10 w-full px-4">
                <div className="inline-flex items-center gap-2 bg-background border border-border px-3 py-1 rounded-full mb-2">
                   <Zap className="h-3 w-3 text-primary fill-primary" />
                   <span className="text-[9px] font-black uppercase text-foreground">Secure Path Generated</span>
                </div>
                <p className="text-xl font-black text-foreground tracking-tighter underline decoration-primary/30 underline-offset-8 truncate">
                  {generatedLink}
                </p>
                <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest pt-2 flex items-center justify-center gap-2 opacity-60">
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                  Auto-Attribution Syncing
                </p>
              </div>

              <Button 
                onClick={handleCopy}
                className={cn(
                  "relative z-10 h-14 w-full max-w-[280px] gap-3 font-black text-[11px] uppercase tracking-widest rounded-2xl transition-all active:scale-95 shadow-2xl",
                  copied ? "bg-emerald-500 text-white shadow-emerald-500/20" : "bg-primary text-primary-foreground shadow-primary/30"
                )}
              >
                {copied ? <CheckCircle2 className="h-5 w-5" /> : <Zap className="h-5 w-5 fill-current animate-pulse" />}
                {copied ? "COPIED TO CLIPBOARD" : "ACTIVATE TRACKING"}
              </Button>
            </div>

          </div>

          {/* ATTRIBUTION FOOTER */}
          <div className="pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
             <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Leads captured via this link will auto-tag as <span className="text-foreground">#{source || 'direct'}</span></p>
             </div>
             <div className="flex items-center gap-2 text-[9px] font-black text-primary uppercase bg-primary/5 px-4 py-2 rounded-full border border-primary/20">
                <MousePointer2 className="h-3 w-3" /> Real-time Analytics Enabled
             </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}