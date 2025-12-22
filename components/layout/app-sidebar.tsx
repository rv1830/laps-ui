"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  Kanban,
  Zap,
  Calendar,
  FileText,
  Receipt,
  BarChart3,
  Settings,
  ChevronDown,
  ChevronRight,
  Package,
  CheckSquare,
  Building2,
  PlusCircle,
  Search,
  Sparkles,
  Command,
  Bot,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Workspace } from "@/lib/types"

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: number
  isAI?: boolean
  children?: { title: string; href: string }[]
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Leads",
    href: "/leads",
    icon: Users,
    badge: 12,
    children: [
      { title: "All Leads", href: "/leads" },
      { title: "Import", href: "/leads/import" },
      { title: "Capture Sources", href: "/leads/capture" },
    ],
  },
  {
    title: "Pipeline",
    href: "/pipeline",
    icon: Kanban,
    children: [
      { title: "Board View", href: "/pipeline" },
      { title: "Timeline", href: "/pipeline/timeline" },
    ],
  },
  {
    title: "Tasks",
    href: "/tasks",
    icon: CheckSquare,
    badge: 5,
  },
  {
    title: "Automation",
    href: "/automation",
    icon: Zap,
    isAI: true,
    children: [
      { title: "Workflows", href: "/automation" },
      { title: "Email Sequences", href: "/automation/sequences" },
      { title: "Run Logs", href: "/automation/logs" },
    ],
  },
  {
    title: "Appointments",
    href: "/appointments",
    icon: Calendar,
    children: [
      { title: "Calendar", href: "/appointments" },
      { title: "Booking Settings", href: "/appointments/settings" },
    ],
  },
  {
    title: "Proposals",
    href: "/proposals",
    icon: FileText,
    children: [
      { title: "All Proposals", href: "/proposals" },
      { title: "Templates", href: "/proposals/templates" },
    ],
  },
  {
    title: "Invoices",
    href: "/invoices",
    icon: Receipt,
    children: [
      { title: "All Invoices", href: "/invoices" },
      { title: "Templates", href: "/invoices/templates" },
    ],
  },
  {
    title: "Offers",
    href: "/offers",
    icon: Package,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
]

const settingsItems: NavItem[] = [
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
    children: [
      { title: "Workspace", href: "/settings/workspace" },
      { title: "Team & RBAC", href: "/settings/team" },
      { title: "Email", href: "/settings/email" },
      { title: "Calendar", href: "/settings/calendar" },
      { title: "AI Configuration", href: "/settings/ai" },
      { title: "Integrations", href: "/settings/integrations" },
      { title: "Compliance", href: "/settings/compliance" },
    ],
  },
]

const mockWorkspaces: Workspace[] = [
  {
    id: "1",
    name: "Acme Agency",
    industry: "Marketing",
    role: "owner",
    integrationsConnected: { email: true, calendar: true, payment: false },
  },
  {
    id: "2",
    name: "Personal Sales",
    role: "owner",
    integrationsConnected: { email: true, calendar: false, payment: false },
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const [openSections, setOpenSections] = useState<string[]>(["Leads", "Pipeline", "Automation"])
  const [currentWorkspace, setCurrentWorkspace] = useState(mockWorkspaces[0])

  const toggleSection = (title: string) => {
    setOpenSections((prev) => (prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]))
  }

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/")

  return (
    <aside className="flex h-screen w-[260px] flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-primary to-accent shadow-lg ai-glow-subtle">
            <Zap className="h-5 w-5 text-primary-foreground" />
            <div className="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
            </div>
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
              LAPS
            </span>
            <div className="flex items-center gap-1.5">
              <div className="flex h-4 w-4 items-center justify-center rounded bg-accent/20">
                <Bot className="h-2.5 w-2.5 text-accent" />
              </div>
              <span className="text-[10px] text-accent font-semibold tracking-wide">AI SALES ENGINE</span>
            </div>
          </div>
        </div>

        {/* Workspace Switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-between h-auto py-2.5 px-3 bg-sidebar-accent/50 hover:bg-sidebar-accent border border-sidebar-border/50 text-sidebar-accent-foreground rounded-xl transition-all hover:border-primary/30"
            >
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 text-primary">
                  <Building2 className="h-4 w-4" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium">{currentWorkspace.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{currentWorkspace.role}</p>
                </div>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {mockWorkspaces.map((workspace) => (
              <DropdownMenuItem
                key={workspace.id}
                onClick={() => setCurrentWorkspace(workspace)}
                className="cursor-pointer"
              >
                <Building2 className="mr-2 h-4 w-4" />
                <div>
                  <p className="font-medium">{workspace.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{workspace.role}</p>
                </div>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Workspace
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="px-4 py-3">
        <button className="flex w-full items-center gap-3 rounded-xl border border-sidebar-border/50 bg-sidebar-accent/30 px-3 py-2.5 text-sm text-muted-foreground hover:bg-sidebar-accent hover:border-primary/30 transition-all group">
          <Search className="h-4 w-4 group-hover:text-primary transition-colors" />
          <span className="flex-1 text-left">Search anything...</span>
          <kbd className="flex items-center gap-0.5 rounded-md bg-sidebar-accent px-1.5 py-0.5 text-[10px] font-medium border border-sidebar-border/50">
            <Command className="h-3 w-3" />K
          </kbd>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 pb-4">
        <div className="space-y-1">
          {navItems.map((item) => (
            <NavItemComponent
              key={item.href}
              item={item}
              isActive={isActive}
              isOpen={openSections.includes(item.title)}
              onToggle={() => toggleSection(item.title)}
            />
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-sidebar-border/50">
          <p className="px-3 mb-2 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
            Configuration
          </p>
          <div className="space-y-1">
            {settingsItems.map((item) => (
              <NavItemComponent
                key={item.href}
                item={item}
                isActive={isActive}
                isOpen={openSections.includes(item.title)}
                onToggle={() => toggleSection(item.title)}
              />
            ))}
          </div>
        </div>
      </nav>

      <div className="p-3 border-t border-sidebar-border/50">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-auto py-2.5 px-2 hover:bg-sidebar-accent rounded-xl transition-all"
            >
              <div className="relative">
                <Avatar className="h-9 w-9 border-2 border-primary/30 ring-2 ring-primary/10">
                  <AvatarImage src="/diverse-avatars.png" />
                  <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20 text-primary text-xs font-semibold">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-success border-2 border-sidebar flex items-center justify-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-success-foreground" />
                </div>
              </div>
              <div className="text-left flex-1 min-w-0">
                <p className="text-sm font-medium truncate">John Doe</p>
                <p className="text-xs text-muted-foreground truncate">john@example.com</p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Notifications</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  )
}

function NavItemComponent({
  item,
  isActive,
  isOpen,
  onToggle,
}: {
  item: NavItem
  isActive: (href: string) => boolean
  isOpen: boolean
  onToggle: () => void
}) {
  const Icon = item.icon
  const hasChildren = item.children && item.children.length > 0
  const active = isActive(item.href)

  if (hasChildren) {
    return (
      <Collapsible open={isOpen} onOpenChange={onToggle}>
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-between h-10 px-3 hover:bg-sidebar-accent rounded-xl transition-all",
              active && "bg-sidebar-accent text-primary border border-primary/20",
            )}
          >
            <span className="flex items-center gap-3">
              <div
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-lg transition-colors",
                  active ? "bg-primary/20 text-primary" : "text-muted-foreground",
                )}
              >
                <Icon className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium">{item.title}</span>
              {item.isAI && (
                <div className="flex h-4 items-center gap-1 rounded-full bg-accent/20 px-1.5">
                  <Sparkles className="h-2.5 w-2.5 text-accent" />
                  <span className="text-[9px] font-bold text-accent">AI</span>
                </div>
              )}
            </span>
            <span className="flex items-center gap-2">
              {item.badge && (
                <Badge className="h-5 min-w-5 px-1.5 text-[10px] font-bold bg-primary/20 text-primary border-0 rounded-full">
                  {item.badge}
                </Badge>
              )}
              {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </span>
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="pl-9 mt-1 space-y-0.5">
          {item.children?.map((child) => (
            <Link key={child.href} href={child.href}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start h-8 px-3 text-sm font-medium hover:bg-sidebar-accent rounded-lg transition-all",
                  isActive(child.href) && "bg-sidebar-accent text-primary",
                )}
              >
                {child.title}
              </Button>
            </Link>
          ))}
        </CollapsibleContent>
      </Collapsible>
    )
  }

  return (
    <Link href={item.href}>
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-between h-10 px-3 hover:bg-sidebar-accent rounded-xl transition-all",
          active && "bg-sidebar-accent text-primary border border-primary/20",
        )}
      >
        <span className="flex items-center gap-3">
          <div
            className={cn(
              "flex h-6 w-6 items-center justify-center rounded-lg transition-colors",
              active ? "bg-primary/20 text-primary" : "text-muted-foreground",
            )}
          >
            <Icon className="h-4 w-4" />
          </div>
          <span className="text-sm font-medium">{item.title}</span>
        </span>
        {item.badge && (
          <Badge className="h-5 min-w-5 px-1.5 text-[10px] font-bold bg-primary/20 text-primary border-0 rounded-full">
            {item.badge}
          </Badge>
        )}
      </Button>
    </Link>
  )
}
