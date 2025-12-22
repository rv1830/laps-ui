"use client"

import type React from "react"

import { Bell, HelpCircle, Plus, Sparkles, Bot, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

interface TopHeaderProps {
  title: string
  subtitle?: string
  actions?: React.ReactNode
}

export function TopHeader({ title, subtitle, actions }: TopHeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-border/50 bg-card/30 backdrop-blur-md px-6">
      <div>
        <h1 className="text-xl font-semibold text-foreground tracking-tight">{title}</h1>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-2">
        {actions}

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

        {/* Help */}
        <Button variant="ghost" size="icon" className="h-9 w-9 hover:bg-muted transition-all">
          <HelpCircle className="h-4 w-4" />
        </Button>
      </div>
    </header>
  )
}
