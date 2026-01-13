"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, ChevronRight, Timer, Users, Zap } from "lucide-react"

export function InteractivePreview({ questions, isTypeform }: { questions: any[], isTypeform: boolean }) {
  const [current, setCurrent] = useState(0)
  const [timeLeft, setTimeLeft] = useState(900) // 15 minutes timer for CF style urgency

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0)), 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  if (!isTypeform) {
    return (
      <Card className="p-8 border-2 border-emerald-500/10 shadow-xl bg-white dark:bg-zinc-950 h-[500px] overflow-hidden">
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <h3 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 italic tracking-tight">Accelerator Funnel</h3>
            <div className="flex items-center gap-2 text-emerald-600 font-mono text-sm font-bold bg-emerald-50 px-2 py-1 rounded">
              <Timer className="h-4 w-4" /> {formatTime(timeLeft)}
            </div>
          </div>
          <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            {questions.map((q, i) => (
              <div key={i} className="space-y-2 animate-in fade-in slide-in-from-bottom-2">
                <label className="text-sm font-semibold text-zinc-600 dark:text-zinc-400 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px]">{i + 1}</span>
                  {q.label}
                </label>
                <div className="h-11 w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg focus-within:ring-2 ring-emerald-500/20" />
              </div>
            ))}
          </div>
          <Button className="w-full h-14 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg shadow-lg shadow-emerald-500/20">
            CLAIM YOUR OFFER NOW <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <div className="bg-zinc-950 border-4 border-emerald-500/20 rounded-3xl h-[500px] flex flex-col relative shadow-2xl overflow-hidden group">
      {/* Typeform Progress & Urgency Bar */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-zinc-900 flex">
        <div 
          className="h-full bg-emerald-500 transition-all duration-700 ease-in-out shadow-[0_0_20px_rgba(16,185,129,0.8)]" 
          style={{ width: `${((current + 1) / questions.length) * 100}%` }}
        />
      </div>

      <div className="absolute top-4 right-6 flex items-center gap-4 animate-pulse">
        <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-500 uppercase tracking-tighter bg-emerald-500/10 px-2 py-1 rounded">
          <Users className="h-3 w-3" /> 12 people viewing
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center px-12 space-y-10">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="bg-emerald-500 text-black font-black px-2 py-0.5 rounded text-sm italic">Q{current + 1}</span>
            <div className="h-px flex-1 bg-zinc-800" />
          </div>
          <h2 className="text-3xl font-bold text-white leading-tight tracking-tight max-w-md">
            {questions[current]?.label}
          </h2>
        </div>
        
        <div className="space-y-6">
          <input 
            autoFocus
            className="w-full bg-transparent border-b-4 border-zinc-800 py-6 text-3xl text-white outline-none focus:border-emerald-500 transition-all duration-500 placeholder:text-zinc-900"
            placeholder="Your answer..."
          />
          
          <div className="flex items-center gap-8">
            <Button 
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-black h-16 px-12 rounded-2xl shadow-xl shadow-emerald-500/30 text-xl transform active:scale-95 transition-all"
              onClick={() => current < questions.length - 1 && setCurrent(current + 1)}
            >
              {current === questions.length - 1 ? "FINISH LOOP" : "NEXT STEP"} 
              <Zap className="ml-2 h-6 w-6 fill-current" />
            </Button>
            <div className="hidden sm:block">
               <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em]">Press <span className="text-zinc-200 border border-zinc-700 px-1 rounded">ENTER</span> to proceed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Social Proof Bottom Bar */}
      <div className="p-4 bg-emerald-500/5 border-t border-emerald-500/10 flex justify-between items-center">
        <p className="text-[9px] font-bold text-zinc-500 uppercase">Step {current + 1} of {questions.length} • Qualification Engine v1</p>
        <div className="flex -space-x-2">
          {[1,2,3].map(i => <div key={i} className="w-5 h-5 rounded-full border-2 border-zinc-950 bg-zinc-800" />)}
        </div>
      </div>
    </div>
  )
}