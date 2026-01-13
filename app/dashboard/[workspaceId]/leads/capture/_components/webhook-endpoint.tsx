"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Copy, Webhook, CheckCircle2, ShieldCheck, Terminal, Code2, Zap, Braces } from "lucide-react"
import { toast } from "sonner"

export function WebhookEndpoint() {
  const [webhookUrl] = useState("https://api.laps.io/webhooks/v1/workspace_abc123")
  const [copied, setCopied] = useState(false)

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    toast.success("Webhook URL Copied")
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Subtle Electric Glow Background */}
      <div className="absolute -inset-1 bg-primary/5 rounded-[2.5rem] blur-2xl transition duration-1000 group-hover:opacity-10"></div>
      
      <Card className="relative border-border bg-background shadow-2xl rounded-[2.5rem] overflow-hidden">
        <CardHeader className="bg-secondary/30 border-b border-border p-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-[0_0_20px_rgba(var(--primary),0.3)]">
                <Code2 className="h-8 w-8" />
              </div>
              <div>
                <CardTitle className="text-3xl font-black tracking-tighter uppercase italic">API Accelerator</CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                  <p className="text-[11px] font-black uppercase tracking-[0.3em] text-primary">High-Velocity Ingestion Engine</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-background border border-border px-4 py-2 rounded-xl shadow-inner">
               <Zap className="h-4 w-4 text-primary fill-primary" />
               <span className="text-[10px] font-black uppercase text-foreground tracking-widest">v2.5 Private Endpoint</span>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-10 space-y-12">
          {/* URL SECTION */}
          <div className="space-y-4">
            <Label className="text-[11px] font-black text-muted-foreground uppercase tracking-[0.2em] ml-2">Your Private Webhook Gateway</Label>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1 group/input">
                <Input 
                  value={webhookUrl} 
                  readOnly 
                  className="h-16 bg-secondary/20 border-border font-mono text-xs pl-8 pr-12 focus-visible:ring-primary/20 rounded-2xl transition-all" 
                />
                <Webhook className="absolute right-5 top-1/2 -translate-y-1/2 h-5 w-5 text-primary opacity-20 group-hover/input:opacity-50 transition-opacity" />
              </div>
              <Button 
                variant="outline" 
                className="h-16 px-10 gap-3 border-2 border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground font-black tracking-tighter rounded-2xl transition-all active:scale-95"
                onClick={() => handleCopy(webhookUrl)}
              >
                {copied ? <CheckCircle2 className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                {copied ? "COPIED" : "COPY GATEWAY URL"}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* PAYLOAD SPEC SECTION */}
            <div className="space-y-5">
              <div className="flex items-center justify-between px-2">
                <Label className="text-[11px] font-black text-muted-foreground uppercase tracking-[0.2em] flex items-center gap-2">
                  <Braces className="h-4 w-4 text-primary" />
                  JSON Payload Schema
                </Label>
                <span className="text-[9px] font-bold text-primary/50 uppercase tracking-widest">HTTP POST</span>
              </div>
              <div className="relative rounded-[2rem] overflow-hidden border-2 border-zinc-900 bg-zinc-950 shadow-2xl">
                <div className="absolute top-0 w-full h-10 bg-zinc-900/50 flex items-center px-6 gap-2 border-b border-white/5">
                   <div className="h-2.5 w-2.5 rounded-full bg-red-500/20" />
                   <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/20" />
                   <div className="h-2.5 w-2.5 rounded-full bg-primary/20" />
                </div>
                <pre className="p-10 pt-16 text-primary font-mono text-[11px] leading-relaxed overflow-x-auto selection:bg-primary selection:text-primary-foreground">
{`{
  "name": "John Doe",
  "email": "john@example.com",
  "source": "fb_campaign_q4",
  "intent_score": 85,
  "metadata": {
    "plan": "Enterprise",
    "region": "NA"
  }
}`}
                </pre>
              </div>
            </div>

            {/* SECURITY & TIPS SECTION */}
            <div className="space-y-8">
              <div className="p-8 bg-secondary/10 rounded-[2rem] border border-border space-y-6 relative overflow-hidden group/security">
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover/security:opacity-100 transition-opacity" />
                <div className="flex items-start gap-6 relative z-10">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-background border border-border shadow-xl">
                    <ShieldCheck className="h-8 w-8 text-primary shadow-[0_0_15px_rgba(var(--primary),0.4)]" />
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-black text-foreground uppercase tracking-tighter text-sm">Bearer Token Auth</p>
                      <Switch defaultChecked className="data-[state=checked]:bg-primary" />
                    </div>
                    <p className="text-[11px] text-muted-foreground font-bold leading-relaxed">Require encrypted tokens for all inbound lead data pipelines.</p>
                  </div>
                </div>
                <div className="relative z-10">
                  <Input value="laps_sk_live_9201938210" type="password" readOnly className="bg-background/50 border-border font-mono text-[10px] h-12 rounded-xl tracking-widest" />
                </div>
              </div>

              <div className="bg-primary rounded-[2.5rem] p-10 text-primary-foreground shadow-2xl shadow-primary/30 relative overflow-hidden group/tip">
                 <div className="absolute -right-10 -bottom-10 opacity-10 group-hover/tip:opacity-20 transition-all duration-700 group-hover/tip:scale-110">
                   <Webhook className="h-40 w-40" />
                 </div>
                 <div className="flex items-center gap-4 mb-4">
                   <div className="p-2 bg-white/20 rounded-lg backdrop-blur-md">
                     <Terminal className="h-5 w-5" />
                   </div>
                   <p className="font-black text-lg uppercase tracking-tighter italic">Universal Loop Sync</p>
                 </div>
                 <p className="text-xs font-bold leading-relaxed opacity-90 uppercase tracking-wide">
                   Connect Webflow, Zapier, or custom scripts to instantly pipe leads into your <strong>AI Sales Loop</strong>.
                 </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}