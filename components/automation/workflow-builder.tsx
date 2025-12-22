"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Plus, Trash2, Zap, Filter, Play, ArrowDown, Users, Mail, CheckSquare, ArrowRight, Tag } from "lucide-react"

interface WorkflowNode {
  id: string
  type: "trigger" | "condition" | "action"
  config: Record<string, string>
}

const triggerTypes = [
  { value: "lead_created", label: "Lead Created", icon: Users },
  { value: "stage_changed", label: "Stage Changed", icon: ArrowRight },
  { value: "email_reply", label: "Email Reply Received", icon: Mail },
  { value: "no_reply", label: "No Reply After X Days", icon: Mail },
  { value: "meeting_booked", label: "Meeting Booked", icon: Zap },
  { value: "meeting_completed", label: "Meeting Completed", icon: CheckSquare },
  { value: "manual", label: "Manual Trigger", icon: Play },
]

const conditionTypes = [
  { value: "has_email", label: "Lead has email" },
  { value: "stage_is", label: "Stage is" },
  { value: "mood_is", label: "Mood score is" },
  { value: "source_is", label: "Source is" },
  { value: "tag_has", label: "Has tag" },
]

const actionTypes = [
  { value: "enroll_sequence", label: "Enroll in Sequence", icon: Mail },
  { value: "send_email", label: "Send Email", icon: Mail },
  { value: "create_task", label: "Create Task", icon: CheckSquare },
  { value: "change_stage", label: "Change Stage", icon: ArrowRight },
  { value: "add_tag", label: "Add Tag", icon: Tag },
  { value: "generate_proposal", label: "Generate Proposal Draft", icon: Zap },
]

export function WorkflowBuilder() {
  const [nodes, setNodes] = useState<WorkflowNode[]>([
    { id: "trigger-1", type: "trigger", config: { triggerType: "" } },
  ])

  const addNode = (type: "condition" | "action") => {
    const newNode: WorkflowNode = {
      id: `${type}-${Date.now()}`,
      type,
      config: type === "condition" ? { conditionType: "", value: "" } : { actionType: "" },
    }
    setNodes([...nodes, newNode])
  }

  const removeNode = (id: string) => {
    setNodes(nodes.filter((n) => n.id !== id))
  }

  const updateNodeConfig = (id: string, key: string, value: string) => {
    setNodes(nodes.map((n) => (n.id === id ? { ...n, config: { ...n.config, [key]: value } } : n)))
  }

  return (
    <div className="flex h-full">
      {/* Sidebar - Node Palette */}
      <div className="w-64 border-r border-border bg-card p-4 space-y-6">
        <div>
          <h3 className="text-sm font-medium text-foreground mb-3">Add Nodes</h3>
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start gap-2 bg-transparent"
              onClick={() => addNode("condition")}
            >
              <Filter className="h-4 w-4 text-warning" />
              Add Condition
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start gap-2 bg-transparent"
              onClick={() => addNode("action")}
            >
              <Play className="h-4 w-4 text-success" />
              Add Action
            </Button>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-foreground mb-3">Quick Templates</h3>
          <div className="space-y-2 text-sm">
            <Button variant="ghost" className="w-full justify-start text-muted-foreground">
              New Lead Follow-up
            </Button>
            <Button variant="ghost" className="w-full justify-start text-muted-foreground">
              No Reply Reminder
            </Button>
            <Button variant="ghost" className="w-full justify-start text-muted-foreground">
              Post-Meeting Flow
            </Button>
          </div>
        </div>
      </div>

      {/* Main Canvas */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-2xl mx-auto space-y-4">
          {nodes.map((node, index) => (
            <div key={node.id}>
              {node.type === "trigger" && (
                <TriggerNode node={node} onUpdate={(key, value) => updateNodeConfig(node.id, key, value)} />
              )}

              {node.type === "condition" && (
                <ConditionNode
                  node={node}
                  onUpdate={(key, value) => updateNodeConfig(node.id, key, value)}
                  onRemove={() => removeNode(node.id)}
                />
              )}

              {node.type === "action" && (
                <ActionNode
                  node={node}
                  onUpdate={(key, value) => updateNodeConfig(node.id, key, value)}
                  onRemove={() => removeNode(node.id)}
                />
              )}

              {index < nodes.length - 1 && (
                <div className="flex justify-center py-2">
                  <ArrowDown className="h-5 w-5 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}

          {/* Add Node Buttons */}
          <div className="flex justify-center gap-4 pt-4">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent" onClick={() => addNode("condition")}>
              <Plus className="h-4 w-4" /> Condition
            </Button>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent" onClick={() => addNode("action")}>
              <Plus className="h-4 w-4" /> Action
            </Button>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Node Config */}
      <div className="w-80 border-l border-border bg-card p-4">
        <h3 className="text-sm font-medium text-foreground mb-4">Configuration</h3>
        <p className="text-sm text-muted-foreground">Select a node to configure its settings</p>
      </div>
    </div>
  )
}

function TriggerNode({ node, onUpdate }: { node: WorkflowNode; onUpdate: (key: string, value: string) => void }) {
  const selectedTrigger = triggerTypes.find((t) => t.value === node.config.triggerType)
  const Icon = selectedTrigger?.icon || Zap

  return (
    <Card className="border-primary">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-primary/10">
            <Icon className="h-4 w-4 text-primary" />
          </div>
          Trigger
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>When this happens...</Label>
          <Select value={node.config.triggerType} onValueChange={(v) => onUpdate("triggerType", v)}>
            <SelectTrigger>
              <SelectValue placeholder="Select trigger" />
            </SelectTrigger>
            <SelectContent>
              {triggerTypes.map((trigger) => (
                <SelectItem key={trigger.value} value={trigger.value}>
                  {trigger.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {node.config.triggerType === "stage_changed" && (
          <div className="space-y-2">
            <Label>To stage</Label>
            <Select value={node.config.stage || ""} onValueChange={(v) => onUpdate("stage", v)}>
              <SelectTrigger>
                <SelectValue placeholder="Select stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="qualified">Qualified</SelectItem>
                <SelectItem value="presented">Presented</SelectItem>
                <SelectItem value="won">Won</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {node.config.triggerType === "no_reply" && (
          <div className="space-y-2">
            <Label>Days without reply</Label>
            <Input
              type="number"
              placeholder="3"
              value={node.config.days || ""}
              onChange={(e) => onUpdate("days", e.target.value)}
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function ConditionNode({
  node,
  onUpdate,
  onRemove,
}: { node: WorkflowNode; onUpdate: (key: string, value: string) => void; onRemove: () => void }) {
  return (
    <Card className="border-warning">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-warning/10">
              <Filter className="h-4 w-4 text-warning" />
            </div>
            Condition
          </CardTitle>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onRemove}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>If...</Label>
          <Select value={node.config.conditionType} onValueChange={(v) => onUpdate("conditionType", v)}>
            <SelectTrigger>
              <SelectValue placeholder="Select condition" />
            </SelectTrigger>
            <SelectContent>
              {conditionTypes.map((cond) => (
                <SelectItem key={cond.value} value={cond.value}>
                  {cond.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {(node.config.conditionType === "stage_is" ||
          node.config.conditionType === "mood_is" ||
          node.config.conditionType === "source_is" ||
          node.config.conditionType === "tag_has") && (
          <div className="space-y-2">
            <Label>Value</Label>
            <Input
              placeholder="Enter value"
              value={node.config.value || ""}
              onChange={(e) => onUpdate("value", e.target.value)}
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function ActionNode({
  node,
  onUpdate,
  onRemove,
}: { node: WorkflowNode; onUpdate: (key: string, value: string) => void; onRemove: () => void }) {
  const selectedAction = actionTypes.find((a) => a.value === node.config.actionType)
  const Icon = selectedAction?.icon || Play

  return (
    <Card className="border-success">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-success/10">
              <Icon className="h-4 w-4 text-success" />
            </div>
            Action
          </CardTitle>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onRemove}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Then do this...</Label>
          <Select value={node.config.actionType} onValueChange={(v) => onUpdate("actionType", v)}>
            <SelectTrigger>
              <SelectValue placeholder="Select action" />
            </SelectTrigger>
            <SelectContent>
              {actionTypes.map((action) => (
                <SelectItem key={action.value} value={action.value}>
                  {action.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {node.config.actionType === "enroll_sequence" && (
          <div className="space-y-2">
            <Label>Sequence</Label>
            <Select value={node.config.sequence || ""} onValueChange={(v) => onUpdate("sequence", v)}>
              <SelectTrigger>
                <SelectValue placeholder="Select sequence" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="welcome">New Lead Welcome</SelectItem>
                <SelectItem value="followup">Post-Call Follow-up</SelectItem>
                <SelectItem value="nurture">Re-engagement</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {node.config.actionType === "change_stage" && (
          <div className="space-y-2">
            <Label>New Stage</Label>
            <Select value={node.config.stage || ""} onValueChange={(v) => onUpdate("stage", v)}>
              <SelectTrigger>
                <SelectValue placeholder="Select stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="qualified">Qualified</SelectItem>
                <SelectItem value="presented">Presented</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {node.config.actionType === "create_task" && (
          <div className="space-y-2">
            <Label>Task Title</Label>
            <Input
              placeholder="Follow up with lead"
              value={node.config.taskTitle || ""}
              onChange={(e) => onUpdate("taskTitle", e.target.value)}
            />
          </div>
        )}

        {node.config.actionType === "add_tag" && (
          <div className="space-y-2">
            <Label>Tag</Label>
            <Input
              placeholder="hot-lead"
              value={node.config.tag || ""}
              onChange={(e) => onUpdate("tag", e.target.value)}
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
