// Core types for LAPS platform

export type LeadStage =
  | "new"
  | "contacted"
  | "replied"
  | "qualified"
  | "call_booked"
  | "presented"
  | "proposal_sent"
  | "invoice_sent"
  | "won"
  | "lost"
  | "nurture"

export type MoodScore = "negative" | "neutral" | "positive" | "unknown"

export type AutomationMode = "manual" | "assisted" | "autopilot"

export type TaskStatus = "pending" | "completed" | "overdue" | "snoozed"

export type TaskType = "call" | "email" | "follow_up" | "review" | "approval" | "custom"

export interface Lead {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  stage: LeadStage
  moodScore: MoodScore
  moodConfidence: number
  source?: string
  tags: string[]
  owner?: string
  createdAt: Date
  lastActivity: Date
  customFields?: Record<string, string | number | boolean>
}

export interface Task {
  id: string
  leadId: string
  type: TaskType
  title: string
  description?: string
  status: TaskStatus
  dueDate: Date
  createdAt: Date
  completedAt?: Date
}

export interface Activity {
  id: string
  leadId: string
  type:
    | "email_sent"
    | "email_received"
    | "call"
    | "meeting"
    | "note"
    | "stage_change"
    | "task_created"
    | "proposal"
    | "invoice"
  title: string
  description?: string
  metadata?: Record<string, unknown>
  createdAt: Date
}

export interface EmailSequence {
  id: string
  name: string
  status: "active" | "paused" | "draft"
  steps: EmailSequenceStep[]
  enrolledCount: number
  replyRate: number
  createdAt: Date
}

export interface EmailSequenceStep {
  id: string
  type: "email" | "delay" | "condition"
  templateId?: string
  delayDays?: number
  condition?: string
}

export interface Workflow {
  id: string
  name: string
  trigger: WorkflowTrigger
  conditions: WorkflowCondition[]
  actions: WorkflowAction[]
  status: "active" | "paused" | "draft"
  mode: AutomationMode
  lastRun?: Date
  failedRuns: number
}

export interface WorkflowTrigger {
  type:
    | "lead_created"
    | "stage_changed"
    | "email_reply"
    | "no_reply"
    | "meeting_booked"
    | "meeting_completed"
    | "proposal_created"
    | "invoice_paid"
    | "manual"
  config?: Record<string, unknown>
}

export interface WorkflowCondition {
  field: string
  operator: "equals" | "not_equals" | "contains" | "greater_than" | "less_than"
  value: string | number | boolean
}

export interface WorkflowAction {
  type:
    | "enroll_sequence"
    | "send_email"
    | "create_task"
    | "change_stage"
    | "assign_owner"
    | "generate_proposal"
    | "generate_invoice"
    | "add_tag"
  config: Record<string, unknown>
}

export interface Meeting {
  id: string
  leadId: string
  type: "discovery" | "demo" | "presentation" | "follow_up"
  title: string
  scheduledAt: Date
  duration: number
  location?: string
  meetingLink?: string
  status: "scheduled" | "completed" | "cancelled" | "no_show"
}

export interface Offer {
  id: string
  type: "product" | "package" | "custom"
  name: string
  description: string
  price: number
  currency: string
  deliverables: string[]
}

export interface Proposal {
  id: string
  leadId: string
  templateId: string
  offers: Offer[]
  customItems: { name: string; price: number }[]
  totalAmount: number
  status: "draft" | "sent" | "viewed" | "accepted" | "declined"
  createdAt: Date
  sentAt?: Date
}

export interface Invoice {
  id: string
  leadId: string
  proposalId?: string
  items: { name: string; quantity: number; unitPrice: number }[]
  subtotal: number
  tax: number
  total: number
  status: "draft" | "sent" | "paid" | "overdue"
  dueDate: Date
  paymentLink?: string
  createdAt: Date
  paidAt?: Date
}

export interface Workspace {
  id: string
  name: string
  industry?: string
  role: "owner" | "admin" | "member" | "viewer"
  integrationsConnected: {
    email: boolean
    calendar: boolean
    payment: boolean
  }
}

export interface KPIData {
  label: string
  value: number
  change: number
  changeType: "increase" | "decrease" | "neutral"
  period: string
}
