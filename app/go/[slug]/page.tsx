"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { InteractivePreview } from "@/app/dashboard/[workspaceId]/leads/capture/_components/interactive-preview"
import { acceleratorService } from "@/services/accelerator"
import { toast } from "sonner"
import { Loader2, Zap, CheckCircle2, Link2, Smartphone } from "lucide-react"
import { cn } from "@/lib/utils"

export default function PublicAcceleratorPage() {
  const params = useParams()
  const slug = params.slug as string

  const [config, setConfig] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    const fetchAccelerator = async () => {
      try {
        const data = await acceleratorService.getPublicData(slug)
        setConfig(data)

        // logic: Agar ye TRACKING_LINK hai, toh turant redirect karo
        if (data.type === "TRACKING_LINK" && data.config?.targetUrl) {
          window.location.href = data.config.targetUrl
        }
      } catch (err) {
        console.error("Fetch error:", err)
        toast.error("Accelerator not found or inactive")
      } finally {
        setLoading(false)
      }
    }

    if (slug) fetchAccelerator()
  }, [slug])

  const handleSubmit = async (responses: any) => {
    try {
      // API call: Lead capture logic
      await acceleratorService.submitLead(slug, {
        email: responses.Email || responses.email || "anonymous@laps.io",
        firstName: responses.FirstName || responses.name || "",
        responses: responses,
        source: config.name || "Survey Accelerator"
      })

      setIsSubmitted(true)
      toast.success("Response accelerated successfully!")
    } catch (error) {
      toast.error("Cloud sync failed. Please check your connection.")
    }
  }

  // --- LOADING VIEW ---
  if (loading) return (
    <div className="h-screen bg-background flex flex-col items-center justify-center space-y-6">
      <div className="relative">
        <Loader2 className="h-12 w-12 text-primary animate-spin" />
        <Zap className="h-6 w-6 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fill-current" />
      </div>
      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary animate-pulse">
        Initializing Laps Engine...
      </p>
    </div>
  )

  // --- SUCCESS VIEW ---
  if (isSubmitted) return (
    <div className="h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
      <div className="h-20 w-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-8 animate-in zoom-in duration-500">
        <CheckCircle2 className="h-10 w-10 text-primary shadow-[0_0_20px_rgba(var(--primary),0.5)]" />
      </div>
      <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-2">Accelerated!</h2>
      <p className="text-muted-foreground font-bold uppercase text-[10px] tracking-widest max-w-[250px] leading-relaxed">
        Your data has been securely synced with our neural sales network.
      </p>
      
      <div className="mt-12 flex items-center gap-2 opacity-30">
        <Zap className="h-3 w-3 text-primary fill-current" />
        <span className="text-[8px] font-black uppercase tracking-widest text-foreground">Powered by Laps AI</span>
      </div>
    </div>
  )

  // --- BIO-LINK VIEW (Agar type BIO_LINK hai) ---
  if (config?.type === "BIO_LINK") {
    return (
      <main className="min-h-screen bg-gradient-to-b from-background to-secondary/10 flex flex-col items-center p-6 md:p-12">
        <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          {/* Profile Header */}
          <div className="text-center space-y-4">
            <div className="h-24 w-24 rounded-full bg-primary mx-auto flex items-center justify-center shadow-2xl shadow-primary/30 border-4 border-background">
              <Smartphone className="h-10 w-10 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-black uppercase tracking-tighter italic">@yourbrand</h1>
              <p className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">Verified Growth Hub</p>
            </div>
          </div>

          {/* Links List */}
          <div className="space-y-4">
            {config.config.links?.map((link: any) => (
              <a 
                key={link.id}
                href={link.url}
                target="_blank"
                className="block w-full p-5 bg-card border border-border rounded-2xl text-center font-black uppercase tracking-widest text-[11px] hover:border-primary/50 hover:bg-secondary/50 transition-all active:scale-95 group shadow-sm"
              >
                <span className="group-hover:text-primary transition-colors">{link.title}</span>
              </a>
            ))}
          </div>

          {/* Footer */}
          <div className="pt-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/30 rounded-full border border-border">
              <Zap className="h-3 w-3 text-primary fill-current" />
              <span className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">Built with Laps Accelerator</span>
            </div>
          </div>
        </div>
      </main>
    )
  }

  // --- DEFAULT VIEW (Survey) ---
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-2xl animate-in fade-in duration-1000">
        {config?.config?.questions && (
          <InteractivePreview 
            questions={config.config.questions} 
            isTypeform={config.config.isTypeformMode}
            onComplete={handleSubmit} 
          />
        )}
      </div>

      {/* Subtle branding footer */}
      <footer className="fixed bottom-8 flex items-center gap-2 opacity-20 hover:opacity-50 transition-opacity">
        <div className="h-6 w-6 rounded-lg bg-primary flex items-center justify-center">
          <Zap className="h-3 w-3 text-primary-foreground fill-current" />
        </div>
        <span className="text-[9px] font-black uppercase tracking-[0.3em]">Laps System Active</span>
      </footer>
    </main>
  )
}