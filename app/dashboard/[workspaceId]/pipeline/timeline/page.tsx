"use client"

import React, { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { 
  TrendingUp, 
  Settings, 
  Plus, 
  ChevronLeft, 
  Database,
  Sun,
  Moon,
  Monitor,
  Zap,
  Bell
} from "lucide-react"

import { PipelineTimeline } from "@/components/pipeline/pipeline-timeline"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

export default function PipelineTimelinePage() {
  const params = useParams()
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const workspaceId = params.workspaceId as string

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <div className="flex flex-col h-screen bg-background text-foreground overflow-hidden font-sans transition-colors duration-300">
      
      {/* HEADER */}
      <header className="h-20 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50 px-8 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Button 
            variant="outline" 
            onClick={() => router.push(`/dashboard/${workspaceId}/leads`)}
            className="rounded-full border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 px-6 font-black uppercase tracking-tighter text-[11px] h-9 cursor-pointer"
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Leads
          </Button>
          
          <div className="hidden lg:block h-6 w-[1px] bg-border mx-2" />

          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                <TrendingUp className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tighter uppercase leading-none mb-1">Pipeline Feed</h1>
              <p className="text-[10px] uppercase tracking-widest font-bold text-primary opacity-80">
                Activity Stream Engine
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          
          {/* THEME SELECTOR */}
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

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-10 w-10 rounded-full border-border bg-background p-0 hover:border-primary/50 group cursor-pointer">
                <Zap className="h-4 w-4 text-primary group-hover:fill-primary" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 rounded-2xl p-2 shadow-2xl border-border bg-popover text-popover-foreground backdrop-blur-xl">
              <DropdownMenuLabel className="text-[10px] uppercase tracking-widest text-muted-foreground px-3 py-2">Quick Commands</DropdownMenuLabel>
              <DropdownMenuItem className="gap-3 py-3 rounded-xl cursor-pointer hover:bg-accent transition-colors">
                <Plus className="h-4 w-4 text-blue-500" />
                <span className="font-bold text-sm">Add New Lead</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-3 py-3 rounded-xl cursor-pointer hover:bg-accent transition-colors">
                <Settings className="h-4 w-4 text-orange-500" />
                <span className="font-bold text-sm">Pipeline Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-3 py-2 rounded-xl cursor-pointer text-muted-foreground hover:text-foreground transition-colors">
                <Database className="h-4 w-4" />
                <span className="font-bold text-xs uppercase">Engine Config</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" size="icon" className="rounded-full h-10 w-10 border-border relative bg-background hover:bg-secondary transition-colors cursor-pointer">
            <Bell className="h-4 w-4 text-muted-foreground" />
            <span className="absolute top-3 right-3.5 h-2 w-2 bg-primary rounded-full border-2 border-background animate-pulse" />
          </Button>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 overflow-y-auto bg-gradient-to-b from-background to-secondary/20 p-8 custom-scrollbar">
        <div className="max-w-5xl mx-auto">
          <PipelineTimeline />
        </div>
      </div>
    </div>
  )
}