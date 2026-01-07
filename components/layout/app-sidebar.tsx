"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useParams, useRouter } from "next/navigation"
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
  LogOut,
  User,
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
import { authService } from "@/services/auth"
import { toast } from "sonner"

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: number
  isAI?: boolean
  children?: { title: string; href: string }[]
}

const getNavItems = (workspaceId: string): NavItem[] => [
  {
    title: "Dashboard",
    href: `/dashboard/${workspaceId}`,
    icon: LayoutDashboard,
  },
  {
    title: "Leads",
    href: `/dashboard/${workspaceId}/leads`,
    icon: Users,
    badge: 12,
    children: [
      { title: "All Leads", href: `/dashboard/${workspaceId}/leads` },
      { title: "Import", href: `/dashboard/${workspaceId}/leads/import` },
      { title: "Capture Sources", href: `/dashboard/${workspaceId}/leads/capture` },
    ],
  },
  {
    title: "Pipeline",
    href: `/dashboard/${workspaceId}/pipeline`,
    icon: Kanban,
    children: [
      { title: "Board View", href: `/dashboard/${workspaceId}/pipeline` },
      { title: "Timeline", href: `/dashboard/${workspaceId}/pipeline/timeline` },
    ],
  },
  {
    title: "Tasks",
    href: `/dashboard/${workspaceId}/tasks`,
    icon: CheckSquare,
    badge: 5,
  },
  {
    title: "Automation",
    href: `/dashboard/${workspaceId}/automation`,
    icon: Zap,
    isAI: true,
    children: [
      { title: "Workflows", href: `/dashboard/${workspaceId}/automation` },
      { title: "Email Sequences", href: `/dashboard/${workspaceId}/automation/sequences` },
      { title: "Run Logs", href: `/dashboard/${workspaceId}/automation/logs` },
    ],
  },
  {
    title: "Appointments",
    href: `/dashboard/${workspaceId}/appointments`,
    icon: Calendar,
    children: [
      { title: "Calendar", href: `/dashboard/${workspaceId}/appointments` },
      { title: "Booking Settings", href: `/dashboard/${workspaceId}/appointments/settings` },
    ],
  },
  {
    title: "Proposals",
    href: `/dashboard/${workspaceId}/proposals`,
    icon: FileText,
    children: [
      { title: "All Proposals", href: `/dashboard/${workspaceId}/proposals` },
      { title: "Templates", href: `/dashboard/${workspaceId}/proposals/templates` },
    ],
  },
  {
    title: "Invoices",
    href: `/dashboard/${workspaceId}/invoices`,
    icon: Receipt,
    children: [
      { title: "All Invoices", href: `/dashboard/${workspaceId}/invoices` },
      { title: "Templates", href: `/dashboard/${workspaceId}/invoices/templates` },
    ],
  },
  {
    title: "Offers",
    href: `/dashboard/${workspaceId}/offers`,
    icon: Package,
  },
  {
    title: "Analytics",
    href: `/dashboard/${workspaceId}/analytics`,
    icon: BarChart3,
  },
]

const getSettingsItems = (workspaceId: string): NavItem[] => [
  {
    title: "Settings",
    href: `/dashboard/${workspaceId}/settings`,
    icon: Settings,
    children: [
      { title: "Workspace", href: `/dashboard/${workspaceId}/settings/workspace` },
      { title: "Team & RBAC", href: `/dashboard/${workspaceId}/settings/team` },
      { title: "Email", href: `/dashboard/${workspaceId}/settings/email` },
    ],
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const params = useParams()
  const router = useRouter()
  const workspaceId = params.workspaceId as string
  
  const [openSections, setOpenSections] = useState<string[]>(["Leads", "Pipeline", "Automation"])
  const [userData, setUserData] = useState<any>(null)
  const [workspaces, setWorkspaces] = useState<any[]>([])

  // Fetch real data on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const [statusRes, workspaceRes] = await Promise.all([
          authService.checkStatus(),
          authService.getWorkspaces()
        ]);
        setUserData(statusRes.user);
        setWorkspaces(workspaceRes.workspaces);
      } catch (error) {
        console.error("Failed to load sidebar data", error);
      }
    };
    loadData();
  }, []);

  const currentWorkspace = workspaces.find(w => w.id === workspaceId) || workspaces[0]

  const toggleSection = (title: string) => {
    setOpenSections((prev) => (prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]))
  }

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/")

  const handleWorkspaceSwitch = (id: string) => {
    const newPath = pathname.replace(workspaceId, id)
    router.push(newPath)
  }

  const handleLogout = async () => {
    try {
      await authService.logout();
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <aside className="flex h-screen w-[260px] flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-primary to-accent shadow-lg ai-glow-subtle">
            <Zap className="h-5 w-5 text-primary-foreground" />
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
              className="w-full justify-between h-auto py-2.5 px-3 bg-sidebar-accent/50 hover:bg-sidebar-accent border border-sidebar-border/50 text-sidebar-accent-foreground rounded-xl transition-all"
            >
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 text-primary">
                  <Building2 className="h-4 w-4" />
                </div>
                <div className="text-left overflow-hidden">
                  <p className="text-sm font-medium truncate">{currentWorkspace?.name || "Loading..."}</p>
                  <p className="text-[10px] text-muted-foreground capitalize">{currentWorkspace?.role || "Owner"}</p>
                </div>
              </div>
              <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-64">
            <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {workspaces.map((workspace) => (
              <DropdownMenuItem
                key={workspace.id}
                onClick={() => handleWorkspaceSwitch(workspace.id)}
                className="cursor-pointer"
              >
                <Building2 className="mr-2 h-4 w-4" />
                <div className="flex-1 overflow-hidden">
                  <p className={cn("font-medium truncate", workspace.id === workspaceId && "text-primary")}>
                    {workspace.name}
                  </p>
                </div>
                {workspace.id === workspaceId && <div className="h-2 w-2 rounded-full bg-primary ml-2" />}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <Link href="/create-workspace">
              <DropdownMenuItem className="cursor-pointer">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Workspace
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="px-4 py-3">
        <button className="flex w-full items-center gap-3 rounded-xl border border-sidebar-border/50 bg-sidebar-accent/30 px-3 py-2.5 text-sm text-muted-foreground hover:bg-sidebar-accent hover:border-primary/30 transition-all group">
          <Search className="h-4 w-4 group-hover:text-primary transition-colors" />
          <span className="flex-1 text-left">Search...</span>
          <kbd className="flex items-center gap-0.5 rounded-md bg-sidebar-accent px-1.5 py-0.5 text-[10px] font-medium border border-sidebar-border/50">
            <Command className="h-3 w-3" />K
          </kbd>
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 pb-4">
        <div className="space-y-1">
          {getNavItems(workspaceId).map((item) => (
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
            {getSettingsItems(workspaceId).map((item) => (
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

      {/* Profile & Logout Section */}
      <div className="p-3 border-t border-sidebar-border/50">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-auto py-2.5 px-2 hover:bg-sidebar-accent rounded-xl"
            >
              <div className="relative">
                <Avatar className="h-9 w-9 border-2 border-primary/30">
                  <AvatarImage src={userData?.avatar} />
                  <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold uppercase">
                    {userData?.firstName?.charAt(0)}{userData?.lastName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-500 border-2 border-sidebar" />
              </div>
              <div className="text-left flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{userData?.firstName} {userData?.lastName}</p>
                <p className="text-xs text-muted-foreground truncate text-[10px]">{userData?.email}</p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href={`/dashboard/${workspaceId}/settings/profile`}>
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" /> Profile Details
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-destructive cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" /> Log out
            </DropdownMenuItem>
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
              <Icon className={cn("h-4 w-4", active ? "text-primary" : "text-muted-foreground")} />
              <span className="text-sm font-medium">{item.title}</span>
            </span>
            <span className="flex items-center gap-2">
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
                  "w-full justify-start h-8 px-3 text-sm font-medium hover:bg-sidebar-accent rounded-lg",
                  isActive(child.href) && "bg-sidebar-accent/50 text-primary",
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
          "w-full justify-start gap-3 h-10 px-3 hover:bg-sidebar-accent rounded-xl transition-all",
          active && "bg-sidebar-accent text-primary border border-primary/20",
        )}
      >
        <Icon className={cn("h-4 w-4", active ? "text-primary" : "text-muted-foreground")} />
        <span className="text-sm font-medium">{item.title}</span>
        {item.badge && (
          <Badge className="ml-auto h-5 min-w-5 px-1.5 text-[10px] font-bold bg-primary/20 text-primary border-0 rounded-full">
            {item.badge}
          </Badge>
        )}
      </Button>
    </Link>
  )
}