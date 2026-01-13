"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, Layout, Copy, Share2, Mail, Code, ExternalLink, Zap } from "lucide-react"
import { InteractivePreview } from "./interactive-preview"

export function SurveyAccelerator() {
  const [isTypeformMode, setIsTypeformMode] = useState(true)
  const [questions, setQuestions] = useState([
    { id: "1", label: "What is your monthly revenue goal?", type: "text" },
    { id: "2", label: "How many leads do you currently manage?", type: "number" }
  ])

  // --- Core Functionality ---
  const addQuestion = () => {
    const newId = Math.random().toString(36).substr(2, 9)
    setQuestions([...questions, { id: newId, label: "New Question Step", type: "text" }])
  }

  const removeQuestion = (id: string) => {
    if (questions.length > 1) {
      setQuestions(questions.filter(q => q.id !== id))
    }
  }

  const updateQuestionLabel = (id: string, newLabel: string) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, label: newLabel } : q))
  }

  const publicUrl = `https://laps.io/s/survey-${Math.random().toString(36).substr(2, 5)}`

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card className="border-2 border-emerald-500/10 dark:border-emerald-500/20 shadow-sm bg-white dark:bg-zinc-950">
            <CardHeader className="bg-emerald-50/30 dark:bg-emerald-500/5 border-b border-emerald-500/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-100 dark:bg-emerald-500/20 rounded-lg text-emerald-600 dark:text-emerald-400">
                    <Layout className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Survey Config</CardTitle>
                    <CardDescription>Setup your qualification steps</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-white dark:bg-zinc-900 px-3 py-1.5 rounded-full border border-emerald-500/20 shadow-sm">
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 tracking-tighter uppercase">Typeform Mode</span>
                  <Switch 
                    checked={isTypeformMode} 
                    onCheckedChange={setIsTypeformMode}
                    className="data-[state=checked]:bg-emerald-500"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {questions.map((q, idx) => (
                <div key={q.id} className="group relative flex gap-4 items-end animate-in slide-in-from-left-4 duration-300">
                  <div className="flex-1 space-y-2">
                    <Label className="text-xs font-semibold text-zinc-500 uppercase">Step {idx + 1}</Label>
                    <Input 
                      value={q.label} 
                      onChange={(e) => updateQuestionLabel(q.id, e.target.value)}
                      className="h-11 focus-visible:ring-emerald-500 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900" 
                    />
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => removeQuestion(q.id)}
                    className="mb-1 text-zinc-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              
              <Button 
                variant="outline" 
                onClick={addQuestion}
                className="w-full h-11 border-dashed border-2 border-emerald-500/20 hover:bg-emerald-50 dark:hover:bg-emerald-500/5 mt-4 text-emerald-600 dark:text-emerald-400 font-bold"
              >
                <Plus className="h-4 w-4 mr-2" /> Add Question Step
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Live Preview Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-zinc-400 tracking-widest uppercase ml-1">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Live Customer Experience
          </div>
          <InteractivePreview questions={questions} isTypeform={isTypeformMode} />
        </div>
      </div>

      {/* --- MODULAR SHARE OPTIONS (ClickFunnels/Typeform Style) --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-2 border-emerald-500/10 dark:border-emerald-500/20 bg-white dark:bg-zinc-950 shadow-md hover:shadow-lg transition-all">
          <CardContent className="p-6 space-y-4">
            <div className="p-3 bg-emerald-100 dark:bg-emerald-500/10 w-fit rounded-xl text-emerald-600">
              <Share2 className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-base">Share the link</h4>
              <p className="text-xs text-zinc-500">Bhejo social media ya bio mein leads lane ke liye.</p>
            </div>
            <div className="pt-2">
              <Button variant="secondary" className="w-full gap-2 font-bold" onClick={() => navigator.clipboard.writeText(publicUrl)}>
                <Copy className="h-4 w-4" /> Copy Direct Link
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-emerald-500/10 dark:border-emerald-500/20 bg-white dark:bg-zinc-950 shadow-md hover:shadow-lg transition-all">
          <CardContent className="p-6 space-y-4">
            <div className="p-3 bg-emerald-100 dark:bg-emerald-500/10 w-fit rounded-xl text-emerald-600">
              <Mail className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-base">Embed in an email</h4>
              <p className="text-xs text-zinc-500">Seedha email body se response capture karein.</p>
            </div>
            <div className="pt-2">
              <Button className="w-full gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold">
                <Zap className="h-4 w-4" /> Generate Email Code
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-emerald-500/10 dark:border-emerald-500/20 bg-white dark:bg-zinc-950 shadow-md hover:shadow-lg transition-all">
          <CardContent className="p-6 space-y-4">
            <div className="p-3 bg-emerald-100 dark:bg-emerald-500/10 w-fit rounded-xl text-emerald-600">
              <Code className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-base">Embed in a web page</h4>
              <p className="text-xs text-zinc-500">Apni website ya landing page par chipkayein.</p>
            </div>
            <div className="pt-2">
              <Button variant="outline" className="w-full gap-2 border-emerald-500/20 text-emerald-600 font-bold hover:bg-emerald-50">
                <ExternalLink className="h-4 w-4" /> Get Iframe Code
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}