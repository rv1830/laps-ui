"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
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
  Sparkles,
  Bot,
  LogOut,
  User,
  Globe,
  Briefcase,
  Clock,
  ShieldCheck,
  Link2,
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
import { authService } from "@/services/auth"
import { toast } from "sonner"
import { Skeleton } from "@/components/ui/skeleton" // Ensure you have this from shadcn

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: number
  isAI?: boolean
  children?: { title: string; href: string }[]
}

const getNavItems = (workspaceId: string): NavItem[] => [
  { title: "Dashboard", href: `/dashboard/${workspaceId}`, icon: LayoutDashboard },
  {
    title: "Leads",
    href: `/dashboard/${workspaceId}/leads`,
    icon: Users,
    badge: 12,
    children: [
      { title: "All Leads", href: `/dashboard/${workspaceId}/leads` },
      { title: "Import", href: `/dashboard/${workspaceId}/leads/import` },
      { title: "Capture Sources", href: `/dashboard/${workspaceId}/leads/capture` },
      { title: "Integrations", href: `/dashboard/${workspaceId}/integration` },
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
  { title: "Tasks", href: `/dashboard/${workspaceId}/tasks`, icon: CheckSquare, badge: 5 },
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
  { title: "Offers", href: `/dashboard/${workspaceId}/offers`, icon: Package },
  { title: "Analytics", href: `/dashboard/${workspaceId}/analytics`, icon: BarChart3 },
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
  const [hoveredWorkspace, setHoveredWorkspace] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true)
        const [statusRes, workspaceRes] = await Promise.all([
          authService.checkStatus(),
          authService.getWorkspaces()
        ]);
        setUserData(statusRes.user);
        setWorkspaces(workspaceRes.workspaces);
      } catch (error) {
        console.error("Failed to load sidebar data", error);
      } finally {
        setIsLoading(false)
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

  const handleMouseEnter = (workspace: any) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
    setHoveredWorkspace(workspace)
  }

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredWorkspace(null)
    }, 250)
  }

  return (
    <aside className="flex h-screen w-[280px] flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border shadow-2xl relative z-40">
      <div className="p-6">
        <div className="flex items-center gap-3.5 mb-8 select-none">
          <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary via-primary/90 to-accent shadow-[0_0_20px_rgba(var(--primary),0.3)] ai-glow-subtle">
            <Zap className="h-6 w-6 text-primary-foreground fill-primary-foreground" />
          </div>
          <div>
            <span className="text-xl pr-1 font-black tracking-tighter bg-gradient-to-r from-foreground to-foreground/90 bg-clip-text text-transparent italic text-nowrap">
              LAPS
            </span>
            <div className="flex items-center gap-1.5">
              <div className="flex h-4 w-4 items-center justify-center rounded-sm bg-accent/20">
                <Bot className="h-2.5 w-2.5 text-accent" />
              </div>
              <span className="text-[9px] text-accent tracking-[0.1em] uppercase">AI SALES ENGINE</span>
            </div>
          </div>
        </div>

        {/* Workspace Switcher with Skeleton Loader */}
        <DropdownMenu onOpenChange={(open) => !open && setHoveredWorkspace(null)}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-between h-auto py-4 px-4 bg-sidebar-accent/40 hover:bg-sidebar-accent border border-sidebar-border/60 text-sidebar-accent-foreground rounded-2xl transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-center gap-3 overflow-hidden w-full">
                {isLoading ? (
                  <div className="flex items-center gap-3 w-full">
                    <Skeleton className="h-9 w-9 shrink-0 rounded-xl bg-sidebar-border" />
                    <div className="space-y-1.5 flex-1">
                      <Skeleton className="h-4 w-24 bg-sidebar-border" />
                      <Skeleton className="h-3 w-12 bg-sidebar-border" />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-primary/10 to-accent/10 text-primary border border-primary/20 group-hover:scale-110 transition-transform">
                      <Building2 className="h-5 w-5" />
                    </div>
                    <div className="text-left overflow-hidden">
                      <p className="text-sm truncate tracking-tight">{currentWorkspace?.name}</p>
                      <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">{currentWorkspace?.role}</p>
                    </div>
                  </>
                )}
              </div>
              {!isLoading && <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />}
            </Button>
          </DropdownMenuTrigger>
          
          <DropdownMenuContent 
            align="start" 
            side="right" 
            sideOffset={15} 
            className="w-72 p-2 rounded-2xl border-sidebar-border shadow-2xl bg-popover/95 backdrop-blur-xl flex flex-col gap-1 overflow-visible"
          >
            {hoveredWorkspace && (
              <div 
                className="absolute left-[102%] top-0 w-80 bg-card border border-sidebar-border shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-2xl p-6 animate-in fade-in slide-in-from-left-4 duration-300 z-50"
                onMouseEnter={() => { if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current) }}
                onMouseLeave={handleMouseLeave}
              >
                <div className="flex items-center gap-4 mb-5">
                   <div className="h-14 w-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 text-2xl border border-emerald-500/20 font-bold">
                      {hoveredWorkspace.name.charAt(0).toUpperCase()}
                   </div>
                   <div className="overflow-hidden text-left">
                      <h4 className="text-lg font-bold tracking-tight mb-1">{hoveredWorkspace.name}</h4>
                      <Badge variant="outline" className="mt-1 h-5 bg-emerald-500/10 text-emerald-500 border-none text-[9px] uppercase px-2 py-0.5 rounded-full font-bold">{hoveredWorkspace.role?.toUpperCase()}</Badge>
                   </div>
                </div>

                <div className="space-y-4 border-t border-sidebar-border/40 pt-5">
                   <div className="flex items-center justify-between text-[11px] font-bold tracking-wide">
                      <div className="flex items-center gap-3 text-emerald-500">
                         <Briefcase className="h-4 w-4" />
                         <span className="text-muted-foreground uppercase tracking-widest text-[9px] w-20">Industry</span>
                      </div>
                      <span className="truncate ml-auto">{hoveredWorkspace.industry || "Not Set"}</span>
                   </div>

                   <div className="flex items-center justify-between text-[11px] font-bold tracking-wide">
                      <div className="flex items-center gap-3 text-emerald-500">
                         <Globe className="h-4 w-4" />
                         <span className="text-muted-foreground uppercase tracking-widest text-[9px] w-20">Website</span>
                      </div>
                      <span className="truncate ml-auto text-blue-500 font-medium italic">
                        {hoveredWorkspace.website ? (
                          <a href={hoveredWorkspace.website} target="_blank" rel="noopener noreferrer" className="hover:underline">Visit Site</a>
                        ) : "None"}
                      </span>
                   </div>

                   <div className="flex items-center justify-between text-[11px] font-bold tracking-wide">
                      <div className="flex items-center gap-3 text-emerald-500">
                         <ShieldCheck className="h-4 w-4" />
                         <span className="text-muted-foreground uppercase tracking-widest text-[9px] w-20">Access</span>
                      </div>
                      <span className="ml-auto">{hoveredWorkspace.role}</span>
                   </div>

                  <div className="flex items-center justify-between text-[11px] font-bold tracking-wide">
                    <div className="flex items-center gap-3 text-emerald-500">
                      <Globe className="h-4 w-4" />
                      <span className="text-muted-foreground uppercase tracking-widest text-[9px] w-20">Timezone</span>
                    </div>
                    <span className="ml-auto opacity-70 text-zinc-200">
                      {hoveredWorkspace.timezone || "Not Set"}
                    </span>
</div>
                </div>
              </div>
            )}

            <DropdownMenuLabel className="px-3 py-2 text-[10px] text-muted-foreground uppercase tracking-[0.2em] opacity-70">Switch Workspace</DropdownMenuLabel>
            <DropdownMenuSeparator className="mx-2 opacity-50" />
            
            {workspaces.map((workspace) => (
              <DropdownMenuItem
                key={workspace.id}
                onMouseEnter={() => handleMouseEnter(workspace)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleWorkspaceSwitch(workspace.id)}
                className={cn(
                  "cursor-pointer p-3.5 rounded-xl gap-3 transition-all duration-200 group/item",
                  workspace.id === workspaceId ? "bg-primary/10 text-primary" : "hover:bg-sidebar-accent"
                )}
              >
                <Building2 className={cn("h-4 w-4 transition-transform group-hover/item:scale-110", workspace.id === workspaceId ? "text-primary" : "text-muted-foreground")} />
                <span className="flex-1 truncate font-bold text-sm tracking-tight">{workspace.name}</span>
                {workspace.id === workspaceId && <div className="h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_rgba(var(--primary),0.8)]" />}
              </DropdownMenuItem>
            ))}
            
            <DropdownMenuSeparator className="mx-2 opacity-50" />
            <Link href="/create-workspace" className="w-full cursor-pointer">
              <DropdownMenuItem className="cursor-pointer p-3.5 rounded-xl hover:bg-primary/5 hover:text-primary transition-colors gap-3 text-sm">
                <PlusCircle className="h-4 w-4" />
                <span>Create Workspace</span>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 pb-6 space-y-8 mt-4 custom-scrollbar">
        <div className="space-y-1.5">
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

        <div className="pt-8 border-t border-sidebar-border/30">
          <p className="px-4 mb-4 text-[10px] text-muted-foreground uppercase tracking-[0.2em] opacity-60">System Config</p>
          <div className="space-y-1.5">
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

      <div className="p-4 bg-sidebar-accent/20 border-t border-sidebar-border/30 mt-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start gap-4 h-auto py-3.5 px-3 hover:bg-sidebar-accent rounded-2xl border border-transparent hover:border-sidebar-border/50 transition-all cursor-pointer group"
            >
              <div className="relative">
                <Avatar className="h-11 w-11 border-2 border-primary/20 group-hover:border-primary/50 transition-all">
                  <AvatarImage src={userData?.avatar} />
                  <AvatarFallback className="bg-primary/10 text-primary text-xs uppercase tracking-tighter">
                    {userData?.firstName?.charAt(0)}{userData?.lastName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full bg-green-500 border-[3px] border-sidebar shadow-sm" />
              </div>
              <div className="text-left flex-1 min-w-0">
                <p className="text-sm truncate group-hover:text-primary transition-colors">{userData?.firstName} {userData?.lastName}</p>
                <p className="text-[10px] text-muted-foreground truncate font-bold opacity-70">{userData?.email}</p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" side="top" sideOffset={12} className="w-64 p-2 rounded-2xl shadow-2xl border-sidebar-border">
            <DropdownMenuLabel className="px-3 py-2 text-xs text-muted-foreground uppercase opacity-70">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="opacity-50" />
            <Link href={`/dashboard/${workspaceId}/settings/profile`} className="cursor-pointer">
              <DropdownMenuItem className="cursor-pointer p-3.5 rounded-xl gap-3 font-bold text-sm">
                <User className="h-4 w-4 text-primary" /> Profile Details
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator className="opacity-50" />
            <DropdownMenuItem 
              onClick={handleLogout} 
              className="text-destructive cursor-pointer p-3.5 rounded-xl gap-3 hover:bg-destructive/10 text-sm"
            >
              <LogOut className="h-4 w-4" /> Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  )
}

function NavItemComponent({ item, isActive, isOpen, onToggle }: any) {
  const Icon = item.icon
  const hasChildren = item.children && item.children.length > 0
  const active = isActive(item.href)

  return (
    <div className="space-y-1">
      {hasChildren ? (
        <Collapsible open={isOpen} onOpenChange={onToggle}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-between h-12 px-4 hover:bg-sidebar-accent rounded-xl transition-all cursor-pointer group",
                active && "bg-sidebar-accent/60 text-primary border border-primary/20 shadow-sm",
              )}
            >
              <span className="flex items-center gap-4">
                <Icon className={cn("h-5 w-5 transition-colors", active ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                <span className="text-sm tracking-tight">{item.title}</span>
              </span>
              <div className="flex items-center gap-2">
                {item.isAI && <Sparkles className="h-3 w-3 text-accent fill-accent animate-pulse" />}
                {isOpen ? <ChevronDown className="h-4 w-4 opacity-50 transition-transform duration-300" /> : <ChevronRight className="h-4 w-4 opacity-50 transition-transform duration-300" />}
              </div>
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="pl-12 mt-1 space-y-1 border-l-2 border-sidebar-border/30 ml-6 animate-in slide-in-from-top-1 duration-200">
            {item.children.map((child: any) => (
              <Link key={child.href} href={child.href} className="cursor-pointer">
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start h-10 px-4 text-[13px] font-bold rounded-xl transition-all cursor-pointer relative group/child",
                    isActive(child.href) ? "text-primary bg-primary/5 shadow-inner" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {isActive(child.href) && <div className="absolute -left-[27px] w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_10px_rgba(var(--primary),0.8)]" />}
                  {child.title}
                </Button>
              </Link>
            ))}
          </CollapsibleContent>
        </Collapsible>
      ) : (
        <Link href={item.href} className="cursor-pointer">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start gap-4 h-12 px-4 hover:bg-sidebar-accent rounded-xl transition-all cursor-pointer group",
              active && "bg-sidebar-accent/60 text-primary border border-primary/20 shadow-sm",
            )}
          >
            <Icon className={cn("h-5 w-5 transition-colors", active ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
            <span className="text-sm tracking-tight">{item.title}</span>
            {item.badge && (
              <Badge className="ml-auto h-5 min-w-5 px-1.5 text-[9px] bg-primary text-primary-foreground border-0 rounded-full shadow-lg">
                {item.badge}
              </Badge>
            )}
          </Button>
        </Link>
      )}
    </div>
  )
}