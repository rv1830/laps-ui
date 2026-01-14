"use client"

import { useState } from "react"
import { useParams } from "next/navigation" // Workspace context ke liye add kiya
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Plus, 
  GripVertical, 
  Link2, 
  Trash2, 
  Smartphone,
  Monitor,
  Tablet,
  Zap,
  CheckCircle2,
  Loader2 
} from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { acceleratorService } from "@/services/accelerator" 

export function BioLinkAccelerator() {
  const params = useParams()
  const workspaceId = params.workspaceId as string

  const [links, setLinks] = useState([
    { id: "1", title: "Official Website", url: "https://laps.io" },
    { id: "2", title: "Join Community", url: "https://discord.gg/laps" }
  ])
  
  // Device View State
  const [view, setView] = useState<"mobile" | "tablet" | "desktop">("mobile")
  const [isDeploying, setIsDeploying] = useState(false) 

  const addLink = () => {
    const newId = Math.random().toString(36).substr(2, 9)
    setLinks([...links, { id: newId, title: "New Resource Link", url: "" }])
    toast.success("Link Slot Added")
  }

  const removeLink = (id: string) => {
    if (links.length > 1) {
      setLinks(links.filter(l => l.id !== id))
    }
  }

  // --- API INTEGRATION ---
  const handleDeploy = async () => {
    if (!workspaceId) return toast.error("Workspace context missing");
    
    setIsDeploying(true);
    const slug = "bio_" + Math.random().toString(36).substr(2, 6); 

    try {
      // Service call fixed with workspaceId parameter
      await acceleratorService.save(workspaceId, {
        name: "Bio-Link Hub",
        type: "BIO_LINK",
        slug: slug,
        config: { 
          links,
          brandHandle: "@yourbrand" 
        }
      });

      const publicUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/go/${slug}`;
      toast.success("Bio-Link Hub Deployed Successfully!");
      
      navigator.clipboard.writeText(publicUrl);
      toast.info("Link copied to clipboard");
      window.open(publicUrl, "_blank");
    } catch (error) {
      console.error(error);
      toast.error("Failed to sync with Laps Cloud");
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700 p-6">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-start max-w-7xl mx-auto">
        
        {/* CONFIGURATION PANEL (LEFT SIDE) */}
        <div className="space-y-6">
          <Card className="border-border bg-card shadow-2xl rounded-[2.5rem] overflow-hidden">
            <div className="p-8 border-b border-border bg-muted/30 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black uppercase tracking-tighter italic">Bio-Link Hub</h3>
                <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Personalized URL Engine</p>
              </div>
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                <Link2 className="h-5 w-5 text-primary" />
              </div>
            </div>
            
            <CardContent className="p-8 space-y-4">
              {links.map((link, idx) => (
                <div key={link.id} className="flex items-center gap-4 p-4 bg-muted/20 border border-border rounded-2xl group transition-all hover:border-primary/30">
                  <div className="flex flex-col items-center gap-1">
                    <GripVertical className="h-4 w-4 text-muted-foreground/30" />
                    <span className="text-[9px] font-black text-muted-foreground">{idx + 1}</span>
                  </div>
                  
                  <div className="flex-1 space-y-1">
                    <input 
                      value={link.title} 
                      onChange={(e) => {
                        const newLinks = [...links];
                        newLinks[idx].title = e.target.value;
                        setLinks(newLinks);
                      }}
                      className="w-full bg-transparent border-none font-bold text-sm p-0 focus:outline-none text-foreground placeholder:opacity-30" 
                      placeholder="Link Title"
                    />
                    <input 
                      value={link.url} 
                      onChange={(e) => {
                        const newLinks = [...links];
                        newLinks[idx].url = e.target.value;
                        setLinks(newLinks);
                      }}
                      className="w-full bg-transparent border-none text-[11px] p-0 text-muted-foreground focus:outline-none placeholder:opacity-30" 
                      placeholder="https://your-link.com"
                    />
                  </div>

                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => removeLink(link.id)}
                    className="opacity-0 group-hover:opacity-100 h-8 w-8 text-muted-foreground hover:text-destructive transition-all"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              
              <div className="flex gap-4 pt-4">
                <Button 
                  onClick={addLink}
                  variant="outline" 
                  className="flex-1 h-12 rounded-2xl border-dashed border-2 border-primary/20 hover:border-primary hover:bg-primary/5 font-black text-[10px] uppercase tracking-widest gap-2 bg-transparent"
                >
                  <Plus className="h-4 w-4" /> Add Link
                </Button>
                <Button 
                  onClick={handleDeploy}
                  disabled={isDeploying}
                  className="flex-1 h-12 rounded-2xl bg-primary font-black text-[10px] uppercase tracking-widest shadow-lg shadow-primary/20"
                >
                  {isDeploying ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  Deploy Hub
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* MULTI-DEVICE PREVIEW PANEL (RIGHT SIDE) */}
        <div className="lg:sticky lg:top-24 space-y-8 flex flex-col items-center">
          
          {/* DEVICE SWITCHER BUTTONS */}
          <div className="flex items-center gap-2 p-1.5 bg-muted/50 border border-border rounded-2xl shadow-inner">
            <button 
              onClick={() => setView("mobile")}
              className={cn("h-10 w-12 flex items-center justify-center rounded-xl transition-all", view === "mobile" ? "bg-background text-primary shadow-md" : "text-muted-foreground hover:text-foreground")}
            >
              <Smartphone className="h-5 w-5" />
            </button>
            <button 
              onClick={() => setView("tablet")}
              className={cn("h-10 w-12 flex items-center justify-center rounded-xl transition-all", view === "tablet" ? "bg-background text-primary shadow-md" : "text-muted-foreground hover:text-foreground")}
            >
              <Tablet className="h-5 w-5" />
            </button>
            <button 
              onClick={() => setView("desktop")}
              className={cn("h-10 w-12 flex items-center justify-center rounded-xl transition-all", view === "desktop" ? "bg-background text-primary shadow-md" : "text-muted-foreground hover:text-foreground")}
            >
              <Monitor className="h-5 w-5" />
            </button>
          </div>

          {/* DYNAMIC FRAME (The Live Preview) */}
          <div className={cn(
            "bg-background border-[8px] border-card shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] relative overflow-hidden flex flex-col items-center transition-all duration-700 ease-in-out",
            view === "mobile" && "w-[300px] h-[580px] rounded-[3rem] p-6",
            view === "tablet" && "w-[450px] h-[600px] rounded-[2.5rem] p-8",
            view === "desktop" && "w-full max-w-[800px] h-[500px] rounded-3xl p-10"
          )}>
            
            {/* Phone Notch (Only visible in mobile) */}
            {view === "mobile" && <div className="w-24 h-5 bg-card rounded-b-2xl absolute top-0 z-10" />}

            {/* Profile Section - Changes layout on Desktop */}
            <div className={cn(
              "text-center space-y-4 w-full flex flex-col items-center",
              view === "desktop" ? "mt-4 flex-row text-left space-y-0 border-b border-border pb-8 items-center gap-6" : "mt-10"
            )}>
              <div className={cn(
                "rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center shadow-xl shadow-primary/20 shrink-0",
                view === "desktop" ? "h-24 w-24" : "h-20 w-20"
              )}>
                <Smartphone className="h-8 w-8 text-primary-foreground" />
              </div>
              <div className={cn("flex-1", view === "desktop" ? "text-left" : "text-center")}>
                <div className={cn("flex items-center gap-2", view === "desktop" ? "justify-start" : "justify-center")}>
                    <h4 className="font-black text-foreground text-xl tracking-tighter uppercase italic">@yourbrand</h4>
                    <CheckCircle2 className="h-4 w-4 text-primary fill-current" />
                </div>
                <p className="text-[9px] text-muted-foreground font-black uppercase tracking-widest leading-none mt-1">Laps Certified Marketing Hub</p>
              </div>
            </div>

            {/* Links Section - Grid on Desktop, List on Mobile/Tablet */}
            <div className={cn(
              "w-full mt-10 flex-1 overflow-y-auto custom-scrollbar pr-1",
              view === "desktop" ? "grid grid-cols-2 gap-4 mt-8" : "flex flex-col gap-3"
            )}>
              {links.map((link) => (
                <div 
                  key={link.id}
                  className={cn(
                    "bg-muted/40 border border-border rounded-2xl flex items-center justify-center px-4 hover:border-primary/50 hover:bg-muted/60 transition-all cursor-pointer group",
                    view === "desktop" ? "h-24 flex-col text-center gap-1" : "h-14 w-full"
                  )}
                >
                  <span className="text-[10px] font-black uppercase tracking-[0.15em] text-foreground group-hover:text-primary transition-colors">
                    {link.title || "Untitled Link"}
                  </span>
                  {view === "desktop" && <span className="text-[8px] text-muted-foreground font-bold italic opacity-60">laps.io/redirect</span>}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="py-6 mt-auto">
              <div className="flex items-center gap-2 opacity-40">
                <Zap className="h-3 w-3 text-primary fill-current" />
                <span className="text-[8px] font-black uppercase tracking-[0.2em] text-foreground">Powered by Laps Accelerator</span>
              </div>
            </div>
          </div>
          
          <p className="text-[10px] font-black text-muted-foreground/50 uppercase tracking-widest">
            {view.toUpperCase()} PREVIEW ACTIVE
          </p>
        </div>
      </div>
    </div>
  )
}