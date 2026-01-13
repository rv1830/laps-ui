"use client"

import { TopHeader } from "@/components/layout/top-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Plus, Zap } from "lucide-react"

// Modular Components Import
import { SurveyAccelerator } from "./_components/survey-accelerator"
import { TrackingLinkModule } from "./_components/tracking-link-module"
import { WebhookEndpoint } from "./_components/webhook-endpoint"

export default function LeadCapturePage() {
  return (
    <div className="flex flex-col h-full bg-white dark:bg-zinc-950 transition-colors duration-300">
      <TopHeader
        title="Revenue Accelerators"
        subtitle="Deploy modular high-conversion tools to fuel your sales loop"
        actions={
          <Button size="sm" className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/20 border-none transition-all active:scale-95">
            <Plus className="h-4 w-4" />
            New Accelerator
          </Button>
        }
      />

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {/* Accelerator Navigation */}
        <Tabs defaultValue="surveys" className="space-y-8">
          <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-2">
            <TabsList className="bg-transparent h-auto p-0 gap-8">
              <TabsTrigger 
                value="surveys" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-zinc-500 data-[state=active]:text-emerald-600 dark:data-[state=active]:text-emerald-400 font-bold px-0 pb-3 transition-all"
              >
                Survey Builder
              </TabsTrigger>
              <TabsTrigger 
                value="links" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-zinc-500 data-[state=active]:text-emerald-600 dark:data-[state=active]:text-emerald-400 font-bold px-0 pb-3 transition-all"
              >
                Tracking Links
              </TabsTrigger>
              <TabsTrigger 
                value="webhook" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-zinc-500 data-[state=active]:text-emerald-600 dark:data-[state=active]:text-emerald-400 font-bold px-0 pb-3 transition-all"
              >
                Inbound API
              </TabsTrigger>
            </TabsList>
            
            <div className="hidden md:flex items-center gap-2 text-[10px] font-black text-emerald-600/50 dark:text-emerald-400/30 uppercase tracking-[0.2em]">
              <Zap className="h-3 w-3 fill-current" />
              LAPS Accelerator Engine v2.0
            </div>
          </div>

          {/* Module Rendering */}
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <TabsContent value="surveys" className="mt-0 outline-none">
              <SurveyAccelerator />
            </TabsContent>

            <TabsContent value="links" className="mt-0 outline-none">
              <TrackingLinkModule />
            </TabsContent>

            <TabsContent value="webhook" className="mt-0 outline-none">
              <WebhookEndpoint />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}