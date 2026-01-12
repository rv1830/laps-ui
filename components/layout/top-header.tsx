"use client"

import React, { useState, useEffect } from "react"
import { Bell, HelpCircle, Plus, Sparkles, Bot, ChevronDown, ChevronLeft, Sun, Moon, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "next-themes"
import { useRouter, useParams } from "next/navigation"
import { cn } from "@/lib/utils"

interface TopHeaderProps {
  title: string
  subtitle?: React.ReactNode
  actions?: React.ReactNode
}

export function TopHeader({ title, subtitle, actions }: TopHeaderProps) {
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const params = useParams()
  const workspaceId = params.workspaceId as string
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  return (
    <header className="flex h-20 items-center justify-between border-b border-border/50 bg-card/30 backdrop-blur-md px-6 transition-colors duration-300">
      <div className="flex items-center gap-6">
        {/* LEFT CORNER: BACK TO LEADS */}
        <Button
          variant="outline"
          onClick={() => router.push(`/dashboard/${workspaceId}/leads`)}
          className="rounded-full border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 px-5 font-black uppercase tracking-tighter text-[11px] h-9 cursor-pointer transition-all active:scale-95"
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Back to Leads
        </Button>

        <div className="hidden lg:block h-6 w-[1px] bg-border mx-1" />

        <div>
          <h1 className="text-xl font-semibold text-foreground tracking-tight">{title}</h1>
          {subtitle && <div className="text-sm text-muted-foreground">{subtitle}</div>}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Yahan se Right wala 'Back to Leads' button (jo actions mein pass ho raha tha) hat jayega agar aap main page se pass nahi karenge */}
        {actions}

        {/* THEME TOGGLE: HOVER INTEGRATED */}
        {mounted && (
          <div className="group relative flex items-center justify-center">
            <Button variant="outline" size="icon" className="rounded-full h-10 w-10 border-border bg-background cursor-pointer z-20 hover:border-primary/50 transition-all">
              {theme === 'light' ? <Sun className="h-4 w-4 text-primary" /> :
                theme === 'dark' ? <Moon className="h-4 w-4 text-primary" /> :
                  <Monitor className="h-4 w-4 text-primary" />}
            </Button>

            <div className="absolute top-0 right-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:right-12 transition-all duration-300 ease-out flex bg-secondary/80 backdrop-blur-md p-1 rounded-full border border-border h-10 items-center gap-1 z-10 shadow-xl">
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
        )}

        <Button
          variant="outline"
          size="sm"
          className="gap-2 border-accent/40 text-accent hover:bg-accent/10 hover:text-accent hover:border-accent/60 bg-accent/5 transition-all ai-glow-subtle"
        >
          <Bot className="h-4 w-4" />
          <span className="hidden sm:inline font-medium">AI Assist</span>
          <Badge variant="secondary" className="ml-1 h-4 px-1 text-[9px] bg-accent/20 text-accent border-0">
            BETA
          </Badge>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="sm"
              className="gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/20 transition-all"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline font-medium">Quick Add</span>
              <ChevronDown className="h-3 w-3 opacity-70" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuItem className="gap-3 py-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary text-xs font-bold">
                L
              </span>
              <div>
                <p className="font-medium">New Lead</p>
                <p className="text-xs text-muted-foreground">Add a contact</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-3 py-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary text-xs font-bold">
                T
              </span>
              <div>
                <p className="font-medium">New Task</p>
                <p className="text-xs text-muted-foreground">Create a task</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-3 py-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <Sparkles className="h-3.5 w-3.5" />
              </span>
              <div>
                <p className="font-medium">New Sequence</p>
                <p className="text-xs text-muted-foreground">AI-powered</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-3 py-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <Sparkles className="h-3.5 w-3.5" />
              </span>
              <div>
                <p className="font-medium">New Workflow</p>
                <p className="text-xs text-muted-foreground">Automate actions</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-3 py-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-success/10 text-success text-xs font-bold">
                P
              </span>
              <div>
                <p className="font-medium">New Proposal</p>
                <p className="text-xs text-muted-foreground">Send a quote</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-3 py-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-success/10 text-success text-xs font-bold">
                I
              </span>
              <div>
                <p className="font-medium">New Invoice</p>
                <p className="text-xs text-muted-foreground">Bill a client</p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="h-6 w-px bg-border/50 mx-1" />

        <Button variant="ghost" size="icon" className="relative h-9 w-9 hover:bg-accent/10 transition-all">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1 right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent"></span>
          </span>
        </Button>

        <Button variant="ghost" size="icon" className="h-9 w-9 hover:bg-muted transition-all">
          <HelpCircle className="h-4 w-4" />
        </Button>
      </div>
    </header>
  )
}