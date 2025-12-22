"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trash2, Mail, Clock, GitBranch, ArrowDown, GripVertical, Variable } from "lucide-react"
import { cn } from "@/lib/utils"

interface SequenceStep {
  id: string
  type: "email" | "delay" | "condition"
  subject?: string
  body?: string
  delayDays?: number
  condition?: string
}

const variablesList = [
  { name: "first_name", description: "Lead's first name" },
  { name: "company", description: "Lead's company" },
  { name: "booking_link", description: "Your booking link" },
  { name: "offer", description: "Selected offer/package" },
]

export function SequenceBuilder() {
  const [steps, setSteps] = useState<SequenceStep[]>([
    {
      id: "1",
      type: "email",
      subject: "Quick question about {{company}}",
      body: "Hi {{first_name}},\n\nI noticed you recently...",
    },
    { id: "2", type: "delay", delayDays: 3 },
    {
      id: "3",
      type: "email",
      subject: "Following up",
      body: "Hi {{first_name}},\n\nJust wanted to follow up on my previous email...",
    },
  ])
  const [selectedStep, setSelectedStep] = useState<string | null>("1")

  const addStep = (type: "email" | "delay" | "condition") => {
    const newStep: SequenceStep = {
      id: Date.now().toString(),
      type,
      ...(type === "email" && { subject: "", body: "" }),
      ...(type === "delay" && { delayDays: 1 }),
      ...(type === "condition" && { condition: "no_reply" }),
    }
    setSteps([...steps, newStep])
    setSelectedStep(newStep.id)
  }

  const removeStep = (id: string) => {
    setSteps(steps.filter((s) => s.id !== id))
    if (selectedStep === id) {
      setSelectedStep(null)
    }
  }

  const updateStep = (id: string, updates: Partial<SequenceStep>) => {
    setSteps(steps.map((s) => (s.id === id ? { ...s, ...updates } : s)))
  }

  const selectedStepData = steps.find((s) => s.id === selectedStep)

  return (
    <div className="flex h-full">
      {/* Left - Steps List */}
      <div className="w-80 border-r border-border bg-card p-4 space-y-4 overflow-y-auto">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-foreground">Sequence Steps</h3>
          <span className="text-xs text-muted-foreground">{steps.length} steps</span>
        </div>

        <div className="space-y-2">
          {steps.map((step, index) => (
            <div key={step.id}>
              <Card
                className={cn(
                  "cursor-pointer transition-colors hover:border-primary/50",
                  selectedStep === step.id && "border-primary bg-primary/5",
                )}
                onClick={() => setSelectedStep(step.id)}
              >
                <CardContent className="p-3">
                  <div className="flex items-start gap-2">
                    <GripVertical className="h-4 w-4 text-muted-foreground mt-0.5 cursor-grab" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        {step.type === "email" && (
                          <div className="p-1 rounded bg-primary/10">
                            <Mail className="h-3 w-3 text-primary" />
                          </div>
                        )}
                        {step.type === "delay" && (
                          <div className="p-1 rounded bg-warning/10">
                            <Clock className="h-3 w-3 text-warning" />
                          </div>
                        )}
                        {step.type === "condition" && (
                          <div className="p-1 rounded bg-chart-2/10">
                            <GitBranch className="h-3 w-3 text-chart-2" />
                          </div>
                        )}
                        <span className="text-xs text-muted-foreground">Step {index + 1}</span>
                      </div>
                      <p className="text-sm font-medium text-foreground mt-1 truncate">
                        {step.type === "email" && (step.subject || "Untitled Email")}
                        {step.type === "delay" && `Wait ${step.delayDays} day${step.delayDays !== 1 ? "s" : ""}`}
                        {step.type === "condition" && "If no reply"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {index < steps.length - 1 && (
                <div className="flex justify-center py-1">
                  <ArrowDown className="h-4 w-4 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Add Step Buttons */}
        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1 gap-1 bg-transparent" onClick={() => addStep("email")}>
            <Mail className="h-3 w-3" /> Email
          </Button>
          <Button variant="outline" size="sm" className="flex-1 gap-1 bg-transparent" onClick={() => addStep("delay")}>
            <Clock className="h-3 w-3" /> Delay
          </Button>
        </div>
      </div>

      {/* Center - Step Editor */}
      <div className="flex-1 p-6 overflow-y-auto">
        {selectedStepData ? (
          <div className="max-w-2xl mx-auto">
            {selectedStepData.type === "email" && (
              <EmailStepEditor
                step={selectedStepData}
                onUpdate={(updates) => updateStep(selectedStepData.id, updates)}
                onRemove={() => removeStep(selectedStepData.id)}
              />
            )}

            {selectedStepData.type === "delay" && (
              <DelayStepEditor
                step={selectedStepData}
                onUpdate={(updates) => updateStep(selectedStepData.id, updates)}
                onRemove={() => removeStep(selectedStepData.id)}
              />
            )}

            {selectedStepData.type === "condition" && (
              <ConditionStepEditor
                step={selectedStepData}
                onUpdate={(updates) => updateStep(selectedStepData.id, updates)}
                onRemove={() => removeStep(selectedStepData.id)}
              />
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Select a step to edit or add a new step
          </div>
        )}
      </div>

      {/* Right - Settings & Variables */}
      <div className="w-72 border-l border-border bg-card p-4 space-y-6">
        <div>
          <h3 className="text-sm font-medium text-foreground mb-3">Sending Settings</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs">Send Window</Label>
              <Select defaultValue="weekdays">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekdays">Weekdays only</SelectItem>
                  <SelectItem value="all">All days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Time Range</Label>
              <div className="flex gap-2">
                <Input type="time" defaultValue="09:00" className="flex-1" />
                <Input type="time" defaultValue="17:00" className="flex-1" />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Max Emails/Day</Label>
              <Input type="number" defaultValue="50" />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-foreground mb-3">Variables</h3>
          <div className="space-y-2">
            {variablesList.map((variable) => (
              <div
                key={variable.name}
                className="flex items-center gap-2 p-2 rounded-lg bg-muted hover:bg-muted/80 cursor-pointer"
              >
                <Variable className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-mono text-foreground">{`{{${variable.name}}}`}</p>
                  <p className="text-xs text-muted-foreground">{variable.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function EmailStepEditor({
  step,
  onUpdate,
  onRemove,
}: { step: SequenceStep; onUpdate: (updates: Partial<SequenceStep>) => void; onRemove: () => void }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base font-medium flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-primary/10">
            <Mail className="h-4 w-4 text-primary" />
          </div>
          Email Step
        </CardTitle>
        <Button variant="ghost" size="icon" onClick={onRemove}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="compose">
          <TabsList>
            <TabsTrigger value="compose">Compose</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          <TabsContent value="compose" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Subject Line</Label>
              <Input
                placeholder="Enter subject..."
                value={step.subject || ""}
                onChange={(e) => onUpdate({ subject: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Email Body</Label>
              <Textarea
                placeholder="Write your email..."
                className="min-h-[300px] font-mono text-sm"
                value={step.body || ""}
                onChange={(e) => onUpdate({ body: e.target.value })}
              />
            </div>
          </TabsContent>
          <TabsContent value="preview" className="mt-4">
            <div className="p-4 bg-muted rounded-lg">
              <p className="font-medium text-foreground mb-2">
                Subject: {step.subject?.replace(/\{\{(\w+)\}\}/g, "[Sample Value]") || "No subject"}
              </p>
              <div className="text-sm text-foreground whitespace-pre-wrap">
                {step.body?.replace(/\{\{(\w+)\}\}/g, "[Sample Value]") || "No content"}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

function DelayStepEditor({
  step,
  onUpdate,
  onRemove,
}: { step: SequenceStep; onUpdate: (updates: Partial<SequenceStep>) => void; onRemove: () => void }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base font-medium flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-warning/10">
            <Clock className="h-4 w-4 text-warning" />
          </div>
          Delay Step
        </CardTitle>
        <Button variant="ghost" size="icon" onClick={onRemove}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Wait Duration</Label>
          <div className="flex items-center gap-3">
            <Input
              type="number"
              min="1"
              className="w-24"
              value={step.delayDays || 1}
              onChange={(e) => onUpdate({ delayDays: Number.parseInt(e.target.value) || 1 })}
            />
            <span className="text-sm text-muted-foreground">days before next step</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          The sequence will wait {step.delayDays || 1} day{(step.delayDays || 1) !== 1 ? "s" : ""} before proceeding to
          the next step.
        </p>
      </CardContent>
    </Card>
  )
}

function ConditionStepEditor({
  step,
  onUpdate,
  onRemove,
}: { step: SequenceStep; onUpdate: (updates: Partial<SequenceStep>) => void; onRemove: () => void }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base font-medium flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-chart-2/10">
            <GitBranch className="h-4 w-4 text-chart-2" />
          </div>
          Condition Step
        </CardTitle>
        <Button variant="ghost" size="icon" onClick={onRemove}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Condition</Label>
          <Select value={step.condition || "no_reply"} onValueChange={(v) => onUpdate({ condition: v })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="no_reply">If no reply</SelectItem>
              <SelectItem value="opened">If email opened</SelectItem>
              <SelectItem value="clicked">If link clicked</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <p className="text-sm text-muted-foreground">
          The sequence will check this condition and only continue if it's met.
        </p>
      </CardContent>
    </Card>
  )
}
