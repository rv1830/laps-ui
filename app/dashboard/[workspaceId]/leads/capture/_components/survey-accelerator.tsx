"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Plus, 
  Trash2, 
  Layout, 
  Copy, 
  Share2, 
  Mail, 
  Code, 
  Zap, 
  Sparkles, 
  Rocket,
  CheckCircle2,
  Target,
  ArrowRight
} from "lucide-react"
import { InteractivePreview } from "./interactive-preview"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

export function SurveyAccelerator() {
  const [isTypeformMode, setIsTypeformMode] = useState(true)
  const [isPublished, setIsPublished] = useState(false)
  const [questions, setQuestions] = useState([
    { id: "1", label: "What is your monthly revenue goal?", type: "text" },
    { id: "2", label: "How many leads do you currently manage?", type: "number" }
  ])

  const addQuestion = () => {
    const newId = Math.random().toString(36).substr(2, 9)
    setQuestions([...questions, { id: newId, label: "New Qualification Step", type: "text" }])
    toast.success("Logic Step Added")
  }

  const removeQuestion = (id: string) => {
    if (questions.length > 1) {
      setQuestions(questions.filter(q => q.id !== id))
    }
  }

  const updateQuestionLabel = (id: string, newLabel: string) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, label: newLabel } : q))
  }

  const formId = "acc_" + Math.random().toString(36).substr(2, 6)
  const publicUrl = `https://laps.io/s/${formId}`

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* CONFIGURATION PANEL */}
        <div className="space-y-6">
          <div className="relative group">
            {/* Electric Green Glow Effect */}
            <div className="absolute -inset-0.5 bg-primary rounded-3xl opacity-10 group-hover:opacity-20 blur transition duration-500"></div>
            
            <Card className="relative border-border bg-background shadow-2xl rounded-3xl overflow-hidden">
              <CardHeader className="border-b border-border bg-secondary/30 px-8 py-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                      <Target className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-black tracking-tighter uppercase">Funnel Engine</CardTitle>
                      <p className="text-[10px] uppercase tracking-widest font-bold text-primary italic">Logic Configurator</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-background border border-border p-1.5 rounded-full px-4 shadow-inner">
                    <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Interactive</span>
                    <Switch 
                      checked={isTypeformMode} 
                      onCheckedChange={setIsTypeformMode}
                      className="data-[state=checked]:bg-primary"
                    />
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-8 space-y-6">
                {questions.map((q, idx) => (
                  <div key={q.id} className="group relative animate-in slide-in-from-left-4 duration-300">
                    <div className="flex items-center justify-between mb-2 px-1">
                      <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Step {idx + 1}</Label>
                      <button 
                        onClick={() => removeQuestion(q.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div className="relative">
                      <Input 
                        value={q.label}
                        onChange={(e) => updateQuestionLabel(q.id, e.target.value)}
                        className="h-14 bg-secondary/20 border-border focus:border-primary focus:ring-primary/10 rounded-2xl font-bold text-sm pl-6 transition-all" 
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-primary/20" />
                    </div>
                  </div>
                ))}
                
                <div className="flex gap-4 pt-4">
                  <Button 
                    variant="outline" 
                    onClick={addQuestion}
                    className="flex-1 h-12 rounded-2xl border-dashed border-2 border-primary/20 hover:border-primary/50 hover:bg-primary/5 text-primary font-black text-[10px] uppercase tracking-widest gap-2 transition-all"
                  >
                    <Plus className="h-4 w-4" /> Add Sequence
                  </Button>
                  
                  <Button 
                    onClick={() => setIsPublished(true)}
                    className="flex-1 h-12 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-[10px] uppercase tracking-widest gap-2 shadow-lg shadow-primary/20 transition-all active:scale-95"
                  >
                    <Rocket className="h-4 w-4 fill-current" /> Publish Flow
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* PUBLISH STATUS */}
          {isPublished && (
            <Card className="border-primary/30 bg-primary/5 animate-in zoom-in-95 duration-500 rounded-[2.5rem] shadow-2xl shadow-primary/5">
              <CardContent className="p-8 space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-primary font-black text-[11px] uppercase tracking-widest">
                    <CheckCircle2 className="h-4 w-4" />
                    Accelerator Link Active
                  </div>
                  <Badge className="bg-primary text-primary-foreground font-black italic rounded-md text-[9px]">LIVE</Badge>
                </div>
                <div className="flex gap-2 p-2 bg-background border border-border rounded-2xl shadow-inner group">
                  <Input value={publicUrl} readOnly className="bg-transparent border-none font-mono text-[11px] h-10 text-muted-foreground focus-visible:ring-0" />
                  <Button onClick={() => { navigator.clipboard.writeText(publicUrl); toast.success("Link Copied") }} className="h-10 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground px-6 font-black text-[10px] uppercase tracking-widest">
                    Copy
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* PREVIEW PANEL */}
        <div className="space-y-4 lg:sticky lg:top-24">
          <div className="flex items-center justify-between px-4">
            <div className="flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_12px_rgba(var(--primary),0.8)]" />
              Live Lead Preview
            </div>
            <div className="h-6 px-3 rounded-full bg-secondary border border-border flex items-center gap-2">
               <Zap className="h-3 w-3 text-primary fill-primary" />
               <span className="text-[9px] font-black uppercase text-foreground">Engine v2.5</span>
            </div>
          </div>
          <InteractivePreview questions={questions} isTypeform={isTypeformMode} />
        </div>
      </div>

      {/* SHARE OPTIONS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "Direct Link", icon: Share2, desc: "Bhejo leads ko social media par.", color: "bg-blue-500" },
          { title: "Email Snippet", icon: Mail, desc: "Paste inside email sequences.", color: "bg-primary" },
          { title: "Web Embed", icon: Code, desc: "Add to your existing landing page.", color: "bg-orange-500" },
        ].map((opt) => (
          <Card key={opt.title} className="group border-border bg-background hover:bg-secondary/20 transition-all duration-500 rounded-[2rem] overflow-hidden">
            <CardContent className="p-8 space-y-6">
              <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center text-white shadow-2xl transform group-hover:rotate-6 transition-transform duration-500", opt.color)}>
                <opt.icon className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h4 className="font-black text-sm uppercase tracking-tighter">{opt.title}</h4>
                <p className="text-[11px] text-muted-foreground font-bold leading-relaxed uppercase opacity-70">{opt.desc}</p>
              </div>
              <Button 
                variant="outline"
                className="w-full h-12 rounded-2xl font-black text-[9px] uppercase tracking-[0.2em] gap-3 border-border group-hover:border-primary/50 group-hover:text-primary transition-all"
              >
                Get {opt.title.split(' ')[0]} <ArrowRight className="h-3 w-3" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}