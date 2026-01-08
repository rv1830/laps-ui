"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { workspaceService } from "@/services/workspace"
import { authService } from "@/services/auth" // Import kiya workspaces check karne ke liye
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Building2, Globe, Factory, Users2, Calendar, 
  Settings2, Edit3, Trash2, Save, AlertTriangle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Dialog, DialogContent, DialogDescription, 
  DialogFooter, DialogHeader, DialogTitle, DialogTrigger 
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { motion } from "framer-motion"

export default function WorkspaceSettingsPage() {
  const { workspaceId } = useParams()
  const router = useRouter()
  const [workspace, setWorkspace] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)
  
  const [editData, setEditData] = useState<any>({
    name: "", industry: "", website: "", companySize: "", timezone: ""
  })

  useEffect(() => {
    fetchWorkspace()
  }, [workspaceId])

  const fetchWorkspace = async () => {
    try {
      const res = await workspaceService.getWorkspace(workspaceId as string)
      setWorkspace(res.workspace)
      setEditData({
        name: res.workspace.name,
        industry: res.workspace.industry || "",
        website: res.workspace.website || "",
        companySize: res.workspace.companySize || "",
        timezone: res.workspace.timezone || "UTC"
      })
    } catch (err) {
      toast.error("Failed to load workspace data")
    } finally {
      setLoading(false)
    }
  }

  const handleUpdate = async () => {
    setIsUpdating(true)
    try {
      await workspaceService.updateWorkspace(workspaceId as string, editData)
      toast.success("Workspace configuration updated")
      fetchWorkspace()
    } catch (err) {
      toast.error("Failed to sync updates")
    } finally {
      setIsUpdating(false)
    }
  }

  // --- SMART REDIRECTION LOGIC ---
  const handleDelete = async () => {
    try {
      await workspaceService.deleteWorkspace(workspaceId as string)
      toast.success("Workspace engine decommissioned")
      
      // Delete ke baad user ki bachi hui workspaces mangwao
      const { workspaces } = await authService.getWorkspaces()
      
      if (workspaces && workspaces.length > 0) {
        // Agar workspaces hain, toh pehle waale ke dashboard pe bhej do
        router.push(`/dashboard/${workspaces[0].id}`)
      } else {
        // Agar ek bhi nahi bacha, toh onboarding flow (create workspace) pe bhej do
        router.push("/create-workspace")
      }
    } catch (err) {
      toast.error("Decommissioning failed")
    }
  }

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-96 space-y-4" style={{ paddingTop: 'calc(var(--spacing) * 10)' }}>
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      <p className="text-xs font-black uppercase tracking-widest text-muted-foreground animate-pulse">Initializing cockpit...</p>
    </div>
  )

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto space-y-8 pb-16 px-6"
      style={{ paddingTop: 'calc(var(--spacing) * 10)' }}
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-card/40 border border-border/50 p-8 rounded-[2.5rem] backdrop-blur-xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none text-primary"><Building2 size={120} /></div>
        <div className="flex items-center gap-5 relative z-10">
          <div className="h-20 w-20 rounded-[1.5rem] bg-primary/10 border border-primary/20 flex items-center justify-center shadow-inner"><Building2 className="w-10 h-10 text-primary" /></div>
          <div>
            <h1 className="text-4xl font-black tracking-tighter italic uppercase text-foreground">{workspace?.name}</h1>
            <p className="text-muted-foreground text-xs font-mono mt-1 opacity-60">INSTANCE_ID: {workspace?.id}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 relative z-10">
          <Badge className="px-4 py-1.5 rounded-xl uppercase font-black tracking-widest text-[10px]" variant={workspace?.isActive ? "default" : "destructive"}>{workspace?.isActive ? "Active Instance" : "Offline"}</Badge>
          <Dialog>
            <DialogTrigger asChild><Button variant="outline" className="rounded-2xl gap-2 font-bold hover:bg-primary/5 h-12 px-6 cursor-pointer transition-all"> <Edit3 className="w-4 h-4" /> Edit Config</Button></DialogTrigger>
            <DialogContent className="sm:max-w-[500px] rounded-[2.5rem] border-border/40 bg-card/95 backdrop-blur-2xl">
              <DialogHeader>
                <DialogTitle className="text-3xl font-black italic uppercase tracking-tighter">Edit Workspace</DialogTitle>
                <DialogDescription className="font-medium text-muted-foreground italic text-xs">Modify parameters for this instance.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-6">
                <div className="space-y-2"><Label>Engine Name</Label><Input value={editData.name} onChange={(e) => setEditData({...editData, name: e.target.value})} className="h-12 rounded-xl bg-muted/20" /></div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2"><Label>Industry</Label><Input value={editData.industry} onChange={(e) => setEditData({...editData, industry: e.target.value})} className="h-12 rounded-xl bg-muted/20" /></div>
                    <div className="space-y-2"><Label>Website</Label><Input value={editData.website} onChange={(e) => setEditData({...editData, website: e.target.value})} className="h-12 rounded-xl bg-muted/20" /></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2"><Label>Size</Label><Input value={editData.companySize} onChange={(e) => setEditData({...editData, companySize: e.target.value})} className="h-12 rounded-xl bg-muted/20" /></div>
                    <div className="space-y-2"><Label>Timezone</Label><Input value={editData.timezone} onChange={(e) => setEditData({...editData, timezone: e.target.value})} className="h-12 rounded-xl bg-muted/20" /></div>
                </div>
              </div>
              <DialogFooter><Button onClick={handleUpdate} disabled={isUpdating} className="w-full h-14 rounded-2xl font-black text-base shadow-xl"> <Save className="w-5 h-5 mr-2" /> {isUpdating ? "Syncing..." : "Update Engine"}</Button></DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats and Danger Zone Logic Same as Previous Response */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-border/40 bg-card/30 backdrop-blur-xl rounded-[2.5rem] overflow-hidden shadow-xl">
          <CardHeader className="border-b border-border/40 bg-muted/10 p-8">
            <CardTitle className="text-xl font-black italic uppercase">Core Metadata</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-8">
            <DetailBox icon={Factory} label="Industry Segment" value={workspace?.industry} />
            <DetailBox icon={Globe} label="Digital Domain" value={workspace?.website} />
            <DetailBox icon={Users2} label="Workforce Scale" value={workspace?.companySize} />
            <DetailBox icon={Calendar} label="Temporal Zone" value={workspace?.timezone} />
          </CardContent>
        </Card>

        <Card className="border-border/40 bg-card/30 backdrop-blur-xl rounded-[2.5rem] overflow-hidden shadow-xl">
          <CardHeader className="bg-muted/10 border-b border-border/40 p-8"><CardTitle className="text-lg font-black uppercase italic">Regional Logic</CardTitle></CardHeader>
          <CardContent className="p-8 space-y-6">
             <div className="space-y-2">
                <p className="text-[10px] uppercase font-black text-muted-foreground/60">Date Format</p>
                <div className="bg-background/50 p-4 rounded-2xl border border-border/40 font-mono text-sm font-bold">{workspace?.settings?.dateFormat}</div>
             </div>
             <div className="space-y-2">
                <p className="text-[10px] uppercase font-black text-muted-foreground/60">Operational Days</p>
                <div className="bg-background/50 p-4 rounded-2xl border border-border/40 text-xs font-bold italic text-primary uppercase tracking-tighter leading-relaxed">{workspace?.settings?.workingDays?.join(" • ")}</div>
             </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-destructive/30 bg-destructive/5 rounded-[2.5rem] overflow-hidden">
        <div className="p-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-5">
            <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center border border-destructive/20 shadow-lg shadow-destructive/5"><AlertTriangle className="w-8 h-8 text-destructive" /></div>
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-black text-destructive italic uppercase">Decommission Instance</h3>
              <p className="text-sm font-medium text-muted-foreground/80 mt-1 max-w-md italic">Terminating this engine will freeze all pipelines immediately.</p>
            </div>
          </div>
          <Dialog>
            <DialogTrigger asChild><Button variant="destructive" className="rounded-2xl px-10 h-14 font-black uppercase tracking-widest shadow-xl shadow-destructive/20 cursor-pointer"> <Trash2 className="w-5 h-5 mr-2" /> Deactivate Engine</Button></DialogTrigger>
            <DialogContent className="rounded-[2.5rem] border-destructive/40 bg-card/95 backdrop-blur-3xl">
              <DialogHeader>
                <div className="w-14 h-14 rounded-2xl bg-destructive/10 flex items-center justify-center mb-4"><AlertTriangle className="text-destructive w-8 h-8" /></div>
                <DialogTitle className="text-destructive text-3xl font-black uppercase tracking-tighter">Confirm Termination</DialogTitle>
              </DialogHeader>
              <DialogFooter className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button variant="outline" className="rounded-xl flex-1 h-12 font-bold cursor-pointer">Abort Process</Button>
                <Button variant="destructive" onClick={handleDelete} className="rounded-xl flex-1 h-12 font-black cursor-pointer">Yes, Terminate</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </Card>
    </motion.div>
  )
}

function DetailBox({ icon: Icon, label, value }: any) {
  return (
    <div className="flex items-center gap-4 p-5 rounded-[1.5rem] bg-background/50 border border-border/40 group hover:border-primary/40 transition-all duration-500 shadow-sm">
      <div className="p-3 rounded-xl bg-primary/5 group-hover:bg-primary/10 transition-colors shadow-inner"><Icon className="w-6 h-6 text-primary" /></div>
      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60 font-black mb-1">{label}</p>
        <p className="text-base font-bold tracking-tight text-foreground truncate">{value || "NOT_INITIALIZED"}</p>
      </div>
    </div>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="text-[10px] uppercase font-black tracking-[0.2em] text-muted-foreground/80 pl-1 mb-2 block">{children}</label>
}