"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, ChevronRight, Timer, Users, Zap, MousePointer2 } from "lucide-react"
import { cn } from "@/lib/utils"

export function InteractivePreview({ questions, isTypeform }: { questions: any[], isTypeform: boolean }) {
  const [current, setCurrent] = useState(0)
  const [timeLeft, setTimeLeft] = useState(900) // 15 min urgency timer

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0)), 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  // --- STANDARD MODE (Dashboard Style) ---
  if (!isTypeform) {
    return (
      <Card className="relative p-8 border-border bg-background shadow-2xl h-[500px] overflow-hidden rounded-[2.5rem] group transition-all duration-500">
        {/* Subtle background glow */}
        <div className="absolute -top-24 -right-24 h-48 w-48 bg-primary/10 blur-[100px] rounded-full group-hover:bg-primary/20 transition-all" />
        
        <div className="space-y-6 relative z-10">
          <div className="flex items-center justify-between border-b border-border pb-5">
            <div className="flex items-center gap-3">
               <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                  <Zap className="h-4 w-4 text-primary-foreground fill-current" />
               </div>
               <h3 className="text-sm font-black text-foreground tracking-tighter uppercase italic">Standard Funnel</h3>
            </div>
            <div className="flex items-center gap-2 text-primary font-black text-[11px] bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
              <Timer className="h-3.5 w-3.5" /> {formatTime(timeLeft)}
            </div>
          </div>

          <div className="space-y-5 max-h-[280px] overflow-y-auto pr-3 custom-scrollbar">
            {questions.map((q, i) => (
              <div key={i} className="space-y-2 animate-in fade-in slide-in-from-bottom-2">
                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-md bg-secondary text-primary border border-primary/20 text-[9px] font-black">{i + 1}</span>
                  {q.label}
                </label>
                <div className="h-12 w-full bg-secondary/30 border border-border rounded-2xl transition-all focus-within:border-primary/50" />
              </div>
            ))}
          </div>

          <Button className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-primary/20 rounded-2xl gap-2 active:scale-95 transition-all mt-2">
            Claim Offer Now <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    )
  }

  // --- INTERACTIVE MODE (Neon Typeform Style) ---
  return (
    <div className="bg-zinc-950 border-[6px] border-zinc-900 rounded-[3rem] h-[500px] flex flex-col relative shadow-[0_32px_64px_-12px_rgba(0,0,0,0.8)] overflow-hidden group">
      
      {/* Neon Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-zinc-900">
        <div 
          className="h-full bg-primary transition-all duration-1000 ease-in-out shadow-[0_0_20px_rgba(var(--primary),0.8)]" 
          style={{ width: `${((current + 1) / questions.length) * 100}%`, backgroundColor: 'hsl(var(--primary))' }}
        />
      </div>

      {/* Social Proof Badge */}
      <div className="absolute top-6 right-8 flex items-center gap-4">
        <div className="flex items-center gap-2 text-[9px] font-black text-primary uppercase tracking-widest bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20 animate-pulse">
          <Users className="h-3 w-3" /> 24 active viewers
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center px-12 space-y-12">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
             <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground font-black italic text-xs shadow-lg shadow-primary/30">Q{current + 1}</span>
             <div className="h-px flex-1 bg-zinc-800/50" />
          </div>
          <h2 className="text-3xl font-black text-white leading-[1.1] tracking-tighter max-w-sm">
            {questions[current]?.label}
          </h2>
        </div>
        
        <div className="space-y-8">
          <div className="relative group/input">
             <input 
                autoFocus
                className="w-full bg-transparent border-b-4 border-zinc-800 py-6 text-3xl font-bold text-white outline-none focus:border-primary transition-all duration-500 placeholder:text-zinc-900"
                placeholder="Type here..."
              />
              <MousePointer2 className="absolute -bottom-10 right-0 h-5 w-5 text-primary animate-bounce opacity-50" />
          </div>
          
          <div className="flex items-center gap-8 pt-4">
            <Button 
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-black h-16 px-12 rounded-[1.5rem] shadow-2xl shadow-primary/40 text-sm uppercase tracking-widest transform active:scale-95 transition-all group/btn"
              onClick={() => current < questions.length - 1 && setCurrent(current + 1)}
            >
              {current === questions.length - 1 ? "Complete Flow" : "Continue"} 
              <Zap className="ml-3 h-5 w-5 fill-current group-hover/btn:animate-bounce" />
            </Button>
            <div className="hidden sm:block">
               <p className="text-[9px] text-zinc-600 font-black uppercase tracking-[0.2em] leading-none">
                 Press <kbd className="text-zinc-300 bg-zinc-800 px-2 py-1 rounded border border-zinc-700 mx-1 font-mono uppercase">Enter</kbd>
               </p>
            </div>
          </div>
        </div>
      </div>

      {/* Social Proof Bottom Bar */}
      <div className="p-6 bg-zinc-900/50 backdrop-blur-xl border-t border-white/5 flex justify-between items-center">
        <div className="flex items-center gap-2">
           <div className="h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary),0.8)]" />
           <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Logic Engine v2.5 Active</p>
        </div>
        <div className="flex -space-x-3">
          {[1,2,3,4].map(i => (
            <div key={i} className="w-8 h-8 rounded-full border-2 border-zinc-950 bg-gradient-to-br from-zinc-800 to-zinc-700 flex items-center justify-center overflow-hidden">
               <div className="w-full h-full bg-primary/10" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}