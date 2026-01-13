"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Copy, Link2, ExternalLink, MousePointer2, CheckCircle2 } from "lucide-react"

export function TrackingLinkModule() {
  const [targetUrl, setTargetUrl] = useState("")
  const [source, setSource] = useState("")
  const [campaign, setCampaign] = useState("")
  const [copied, setCopied] = useState(false)

  // Generate a dynamic tracking link preview
  const generatedLink = `https://laps.io/l/${Math.random().toString(36).substr(2, 6)}?src=${source || 'direct'}&cmp=${campaign || 'none'}`

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="border-2 border-emerald-500/10 dark:border-emerald-500/20 shadow-sm bg-white dark:bg-zinc-950 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <CardHeader className="bg-emerald-50/30 dark:bg-emerald-500/5 border-b border-emerald-500/10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-100 dark:bg-emerald-500/20 rounded-lg text-emerald-600 dark:text-emerald-400">
            <MousePointer2 className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-lg">Short Link Accelerator</CardTitle>
            <CardDescription>Track exactly where your leads are coming from</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-zinc-800 dark:text-zinc-200">
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-tighter">Target Destination URL</label>
              <Input 
                placeholder="https://yourwebsite.com/promo" 
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
                className="h-11 border-zinc-200 dark:border-zinc-800 focus-visible:ring-emerald-500" 
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-tighter">UTM Source</label>
                <Input 
                  placeholder="linkedin" 
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  className="h-11 border-zinc-200 dark:border-zinc-800 focus-visible:ring-emerald-500" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-tighter">Campaign Name</label>
                <Input 
                  placeholder="winter_sale" 
                  value={campaign}
                  onChange={(e) => setCampaign(e.target.value)}
                  className="h-11 border-zinc-200 dark:border-zinc-800 focus-visible:ring-emerald-500" 
                />
              </div>
            </div>
          </div>
          
          <div className="bg-emerald-50/50 dark:bg-emerald-500/5 rounded-2xl p-8 border-2 border-dashed border-emerald-500/20 flex flex-col justify-center items-center text-center space-y-4">
            <div className="p-3 bg-white dark:bg-zinc-900 rounded-full shadow-sm border border-emerald-500/20">
               <Link2 className="h-6 w-6 text-emerald-500" />
            </div>
            <div className="space-y-1 w-full">
              <p className="text-sm font-mono font-bold text-emerald-600 dark:text-emerald-400 underline decoration-emerald-500/30 underline-offset-4 tracking-tight truncate px-4">
                {generatedLink}
              </p>
              <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest pt-2">Your Generated Accelerator Link</p>
            </div>
            <Button 
              size="sm" 
              onClick={handleCopy}
              className={`gap-2 font-bold px-8 transition-all ${copied ? 'bg-zinc-800' : 'bg-emerald-600 hover:bg-emerald-700'}`}
            >
              {copied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Link Copied!" : "Copy Accelerator Link"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}