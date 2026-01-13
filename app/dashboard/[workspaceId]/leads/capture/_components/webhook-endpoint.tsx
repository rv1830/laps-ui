"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Copy, Webhook, CheckCircle2, ShieldCheck, Terminal, Code2 } from "lucide-react"

export function WebhookEndpoint() {
  const [webhookUrl] = useState("https://api.laps.io/webhooks/leads/v1/workspace_abc123")
  const [copied, setCopied] = useState(false)

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="border-2 border-emerald-500/10 dark:border-emerald-500/20 shadow-sm bg-white dark:bg-zinc-950 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <CardHeader className="bg-emerald-50/30 dark:bg-emerald-500/5 border-b border-emerald-500/10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-100 dark:bg-emerald-500/20 rounded-lg text-emerald-600 dark:text-emerald-400">
            <Code2 className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-lg">Inbound API Accelerator</CardTitle>
            <CardDescription>Connect external forms or custom lead sources via JSON</CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-8 space-y-8">
        <div className="space-y-3">
          <Label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Your Private Webhook Endpoint</Label>
          <div className="flex gap-2">
            <Input value={webhookUrl} readOnly className="h-12 bg-zinc-50 dark:bg-zinc-900 font-mono text-sm border-zinc-200 dark:border-zinc-800 focus-visible:ring-emerald-500" />
            <Button 
              variant="outline" 
              className="h-12 px-6 gap-2 border-emerald-500/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/5 transition-all"
              onClick={() => handleCopy(webhookUrl)}
            >
              {copied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied" : "Copy API URL"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-3">
            <Label className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
              <Terminal className="h-3 w-3" /> Sample Request Body
            </Label>
            <div className="relative group">
              <pre className="p-6 bg-zinc-950 rounded-2xl text-emerald-500/80 text-xs font-mono border-4 border-zinc-900 shadow-xl overflow-x-auto">
{`{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 9876543210",
  "source": "facebook_ads",
  "metadata": {
    "budget": "5000",
    "interest": "High"
  }
}`}
              </pre>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-6 bg-emerald-50/50 dark:bg-emerald-500/5 rounded-2xl border-2 border-dashed border-emerald-500/20 space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-sm mt-1">
                  <ShieldCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-bold text-zinc-800 dark:text-zinc-200 tracking-tight">Secret Key Security</p>
                    <Switch defaultChecked className="data-[state=checked]:bg-emerald-500" />
                  </div>
                  <p className="text-xs text-zinc-500 leading-normal">
                    Secure your data pipeline by requiring a Bearer token in the header.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-emerald-600 rounded-2xl p-6 text-white shadow-lg shadow-emerald-500/20">
               <div className="flex items-center gap-3 mb-2">
                 <Webhook className="h-4 w-4" />
                 <p className="font-bold text-sm italic">Universal Loop Connector</p>
               </div>
               <p className="text-xs text-emerald-50 leading-relaxed">
                 Paste this URL into Webflow, Typeform, or Tally webhooks to automatically pipe leads into LAPS.
               </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}