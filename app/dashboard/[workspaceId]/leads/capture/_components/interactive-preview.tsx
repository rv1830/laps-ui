"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronRight, Timer, Zap, MousePointer2, CheckSquare, ArrowRight } from "lucide-react"
import { Question } from "./survey-accelerator"

// Props mein onComplete function add kiya hai submission handle karne ke liye
export function InteractivePreview({ 
  questions, 
  isTypeform, 
  onComplete 
}: { 
  questions: Question[], 
  isTypeform: boolean,
  onComplete?: (responses: any) => void 
}) {
  const [current, setCurrent] = useState(0)
  const [timeLeft, setTimeLeft] = useState(900)
  const [answers, setAnswers] = useState<Record<string, any>>({}) // Answers store karne ke liye state

  // Reset current question if questions list changes and current is out of bounds
  useEffect(() => {
    if (current >= questions.length) {
      setCurrent(Math.max(0, questions.length - 1))
    }
  }, [questions.length, current])

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0)), 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  // Answer handle karne ka logic
  const handleAnswerChange = (label: string, value: any) => {
    setAnswers(prev => ({ ...prev, [label]: value }))
  }

  const handleFinalSubmit = () => {
    if (onComplete) {
      onComplete(answers)
    }
  }

  // --- STANDARD MODE (The Scrollable Form) ---
  if (!isTypeform) {
    return (
      <Card className="rounded-[2.5rem] border-[6px] border-secondary bg-background min-h-[500px] shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-500">
        <div className="p-8 flex-1 space-y-8 overflow-y-auto max-h-[500px] custom-scrollbar">
          <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
             <div className="flex items-center gap-2 text-primary font-black text-[10px] bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
              <Timer className="h-3.5 w-3.5" /> {formatTime(timeLeft)}
            </div>
            <span className="text-[9px] font-black uppercase text-muted-foreground tracking-widest">Static Mode</span>
          </div>

          {questions.map((q, i) => (
            <div key={q.id} className="space-y-4 animate-in fade-in slide-in-from-bottom-3">
              <label className="text-sm font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-secondary text-foreground border border-border text-[10px] font-black">{i + 1}</span>
                {q.label}
              </label>

              {q.type === 'text' && (
                <Input 
                  placeholder="Type your response..." 
                  className="h-14 rounded-2xl bg-secondary/20" 
                  value={answers[q.label] || ""}
                  onChange={(e) => handleAnswerChange(q.label, e.target.value)}
                />
              )}
              {q.type === 'number' && (
                <Input 
                  type="number" 
                  placeholder="0.00" 
                  className="h-14 rounded-2xl bg-secondary/20" 
                  value={answers[q.label] || ""}
                  onChange={(e) => handleAnswerChange(q.label, e.target.value)}
                />
              )}
              
              {(q.type === 'radio' || q.type === 'multiselect') && (
                <div className="grid gap-2">
                  {q.options?.map(opt => (
                    <div 
                      key={opt} 
                      onClick={() => handleAnswerChange(q.label, opt)}
                      className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all cursor-pointer ${answers[q.label] === opt ? "border-primary bg-primary/5" : "border-secondary hover:border-primary/40"}`}
                    >
                      <div className={q.type === 'radio' ? "h-5 w-5 rounded-full border-2 border-muted" : "h-5 w-5 rounded-md border-2 border-muted"} />
                      <span className="font-bold text-sm text-foreground/80">{opt}</span>
                    </div>
                  ))}
                </div>
              )}

              {q.type === 'dropdown' && (
                <Select onValueChange={(val) => handleAnswerChange(q.label, val)} value={answers[q.label]}>
                  <SelectTrigger className="h-14 rounded-2xl bg-secondary/20 border-border font-bold">
                    <SelectValue placeholder="Choose an option" />
                  </SelectTrigger>
                  <SelectContent>
                    {q.options?.map(opt => (
                      <SelectItem key={opt} value={opt} className="font-bold">{opt}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          ))}
        </div>
        <div className="p-8 bg-secondary/10 border-t border-border">
          <Button onClick={handleFinalSubmit} className="w-full h-14 rounded-2xl font-black uppercase tracking-widest gap-2">
            Submit Lead Info <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    )
  }

  // --- INTERACTIVE MODE (Typeform Feel) ---
  const activeQuestion = questions[current]

  return (
    <div className="bg-background border-[6px] border-secondary rounded-[3rem] h-[550px] flex flex-col relative shadow-2xl overflow-hidden group transition-all duration-500 animate-in fade-in zoom-in-95">
      
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-muted">
        <div 
          className="h-full bg-primary transition-all duration-700 ease-in-out shadow-[0_0_20px_rgba(var(--primary),0.8)]" 
          style={{ width: `${((current + 1) / questions.length) * 100}%` }}
        />
      </div>

      <div className="flex-1 flex flex-col justify-center px-8 lg:px-12 space-y-12">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
             <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground font-black italic text-xs shadow-lg shadow-primary/30 animate-bounce">Q{current + 1}</span>
             <div className="h-px flex-1 bg-border" />
          </div>
          <h2 className="text-2xl lg:text-3xl font-black text-foreground leading-[1.1] tracking-tighter max-w-sm">
            {activeQuestion?.label}
          </h2>
        </div>
        
        <div className="space-y-8">
          <div className="relative group/input">
            {activeQuestion?.type === 'text' || activeQuestion?.type === 'number' ? (
              <input 
                autoFocus
                type={activeQuestion.type}
                value={answers[activeQuestion.label] || ""}
                onChange={(e) => handleAnswerChange(activeQuestion.label, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    current < questions.length - 1 ? setCurrent(current + 1) : handleFinalSubmit()
                  }
                }}
                className="w-full bg-transparent border-b-4 border-muted py-6 text-2xl lg:text-3xl font-bold text-foreground outline-none focus:border-primary transition-all duration-500 placeholder:text-muted-foreground/30"
                placeholder="Type here..."
                key={activeQuestion.id} 
              />
            ) : (
              <div className="grid gap-3 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                {activeQuestion?.options?.map((opt, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => {
                      handleAnswerChange(activeQuestion.label, opt)
                      setTimeout(() => {
                        if (current < questions.length - 1) setCurrent(current + 1)
                      }, 400)
                    }}
                    className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all group/opt cursor-pointer ${answers[activeQuestion.label] === opt ? "border-primary bg-primary/5" : "border-muted hover:border-primary hover:bg-primary/5"}`}
                  >
                    <span className={`h-7 w-7 rounded-lg flex items-center justify-center text-[10px] font-black transition-colors uppercase ${answers[activeQuestion.label] === opt ? "bg-primary text-primary-foreground" : "bg-secondary group-hover/opt:bg-primary group-hover/opt:text-primary-foreground"}`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="font-bold text-sm">{opt}</span>
                  </div>
                ))}
              </div>
            )}
            <MousePointer2 className="absolute -bottom-10 right-0 h-5 w-5 text-primary animate-pulse opacity-50" />
          </div>
          
          <div className="flex items-center gap-8 pt-4">
            <Button 
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-black h-16 px-12 rounded-[1.5rem] shadow-2xl shadow-primary/40 text-sm uppercase tracking-widest transform active:scale-95 transition-all group/btn"
              onClick={() => current < questions.length - 1 ? setCurrent(current + 1) : handleFinalSubmit()}
            >
              {current === questions.length - 1 ? "Complete" : "Continue"} 
              <Zap className="ml-3 h-5 w-5 fill-current group-hover/btn:animate-bounce" />
            </Button>
            <div className="hidden sm:block">
               <p className="text-[9px] text-muted-foreground font-black uppercase tracking-[0.2em] leading-none">
                 Press <kbd className="text-foreground bg-muted px-2 py-1 rounded border border-border mx-1 font-mono uppercase">Enter</kbd>
               </p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 bg-muted/30 backdrop-blur-xl border-t border-border flex justify-between items-center">
        <div className="flex items-center gap-2">
           <div className="h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary),0.8)] animate-pulse" />
           <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Logic Engine v2.5 Active</p>
        </div>
        <div className="flex -space-x-3">
          {[1,2,3,4].map(i => (
            <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-secondary flex items-center justify-center overflow-hidden">
               <div className="w-full h-full bg-primary/20" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}