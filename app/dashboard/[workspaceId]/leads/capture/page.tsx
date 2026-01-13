"use client"

import React, { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { 
  Zap, 
  Plus, 
  ChevronLeft, 
  Target, 
  Link2, 
  Terminal,
  Sparkles,
  LayoutGrid,
  Sun,
  Moon,
  Monitor
} from "lucide-react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Modular Components Import
import { SurveyAccelerator } from "./_components/survey-accelerator"
import { TrackingLinkModule } from "./_components/tracking-link-module"
import { WebhookEndpoint } from "./_components/webhook-endpoint"

export default function LeadCapturePage() {
  const params = useParams()
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const workspaceId = params.workspaceId as string

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <div className="flex flex-col h-screen bg-background text-foreground overflow-hidden font-sans transition-colors duration-300">
      
      {/* GLASSY HEADER WITH THEME SELECTOR */}
      <header className="h-20 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50 px-8 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Button 
            variant="outline" 
            onClick={() => router.push(`/dashboard/${workspaceId}/leads`)}
            className="rounded-full border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 px-6 font-black uppercase tracking-tighter text-[11px] h-9 cursor-pointer transition-all"
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Leads
          </Button>
          
          <div className="hidden lg:block h-6 w-[1px] bg-border mx-2" />

          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                <LayoutGrid className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tighter uppercase leading-none mb-1 italic">Growth Center</h1>
              <p className="text-[10px] uppercase tracking-widest font-bold text-primary opacity-80 flex items-center gap-2">
                <Sparkles className="h-3 w-3 fill-current" />
                Accelerator Engine
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* THEME SELECTOR - Pipeline Page Style */}
          <div className="group relative flex items-center justify-center">
            <Button variant="outline" size="icon" className="rounded-full h-10 w-10 border-border bg-background cursor-pointer z-20">
              {theme === 'light' ? <Sun className="h-4 w-4 text-primary" /> : 
               theme === 'dark' ? <Moon className="h-4 w-4 text-primary" /> : 
               <Monitor className="h-4 w-4 text-primary" />}
            </Button>

            <div className="absolute top-0 right-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:right-12 transition-all duration-300 ease-out flex bg-secondary/80 backdrop-blur-md p-1 rounded-full border border-border h-10 items-center gap-1 z-10">
              <button onClick={() => setTheme('light')} className={cn("h-8 w-8 rounded-full flex items-center justify-center cursor-pointer transition-colors", theme === 'light' ? "bg-background text-primary shadow-sm" : "text-muted-foreground hover:text-foreground")}>
                <Sun className="h-3.5 w-3.5" />
              </button>
              <button onClick={() => setTheme('dark')} className={cn("h-8 w-8 rounded-full flex items-center justify-center cursor-pointer transition-colors", theme === 'dark' ? "bg-background text-primary shadow-sm" : "text-muted-foreground hover:text-foreground")}>
                <Moon className="h-3.5 w-3.5" />
              </button>
              <button onClick={() => setTheme('system')} className={cn("h-8 w-8 rounded-full flex items-center justify-center cursor-pointer transition-colors", theme === 'system' ? "bg-background text-primary shadow-sm" : "text-muted-foreground hover:text-foreground")}>
                <Monitor className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <Button 
            className="h-10 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-6 font-black text-[11px] uppercase tracking-widest shadow-lg shadow-primary/20 active:scale-95 transition-all"
          >
            <Plus className="mr-2 h-4 w-4" /> New Accelerator
          </Button>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 overflow-y-auto bg-gradient-to-b from-background to-secondary/20 p-8 custom-scrollbar">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="surveys" className="space-y-10">
            <div className="flex items-center justify-center">
              <TabsList className="bg-secondary/40 backdrop-blur-md border border-border p-1.5 rounded-2xl h-auto gap-2">
                {[
                  { value: "surveys", label: "Survey Builder", icon: Target },
                  { value: "links", label: "Tracking Links", icon: Link2 },
                  { value: "webhook", label: "Inbound API", icon: Terminal },
                ].map((tab) => (
                  <TabsTrigger 
                    key={tab.value}
                    value={tab.value} 
                    className="rounded-xl px-8 py-3 data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-xl text-muted-foreground font-black text-[10px] uppercase tracking-widest transition-all gap-3 border border-transparent data-[state=active]:border-border"
                  >
                    <tab.icon className="h-4 w-4" />
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <div className="animate-in fade-in slide-in-from-bottom-6 duration-1000 ease-out">
              <TabsContent value="surveys" className="mt-0 outline-none focus:ring-0">
                <SurveyAccelerator />
              </TabsContent>

              <TabsContent value="links" className="mt-0 outline-none focus:ring-0">
                <TrackingLinkModule />
              </TabsContent>

              <TabsContent value="webhook" className="mt-0 outline-none focus:ring-0">
                <WebhookEndpoint />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  )
}