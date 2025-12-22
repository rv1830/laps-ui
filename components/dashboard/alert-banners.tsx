"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X, Mail, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface AlertBanner {
  id: string
  type: "warning" | "error" | "info" | "ai"
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  action?: {
    label: string
    href: string
  }
}

const initialAlerts: AlertBanner[] = [
  {
    id: "1",
    type: "warning",
    icon: Mail,
    title: "Email account disconnected",
    description: "Reconnect your Gmail to continue sending automated emails.",
    action: { label: "Reconnect", href: "/settings/email" },
  },
]

const alertStyles = {
  warning: {
    container: "border-warning/40 bg-gradient-to-r from-warning/10 via-warning/5 to-transparent",
    icon: "bg-warning/20 text-warning",
    button: "border-warning/40 text-warning hover:bg-warning/20 bg-warning/10",
    glow: "",
  },
  error: {
    container: "border-destructive/40 bg-gradient-to-r from-destructive/10 via-destructive/5 to-transparent",
    icon: "bg-destructive/20 text-destructive",
    button: "border-destructive/40 text-destructive hover:bg-destructive/20 bg-destructive/10",
    glow: "",
  },
  info: {
    container: "border-info/40 bg-gradient-to-r from-info/10 via-info/5 to-transparent",
    icon: "bg-info/20 text-info",
    button: "border-info/40 text-info hover:bg-info/20 bg-info/10",
    glow: "",
  },
  ai: {
    container: "border-accent/40 bg-gradient-to-r from-accent/10 via-primary/5 to-transparent",
    icon: "bg-accent/20 text-accent",
    button: "border-accent/40 text-accent hover:bg-accent/20 bg-accent/10",
    glow: "ai-glow-subtle",
  },
}

export function AlertBanners() {
  const [alerts, setAlerts] = useState(initialAlerts)

  const dismissAlert = (id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id))
  }

  if (alerts.length === 0) return null

  return (
    <div className="space-y-2">
      {alerts.map((alert) => {
        const Icon = alert.icon
        const styles = alertStyles[alert.type]
        return (
          <div
            key={alert.id}
            className={cn(
              "relative flex items-center gap-4 p-4 rounded-2xl border transition-all",
              styles.container,
              styles.glow,
            )}
          >
            <div className={cn("flex items-center justify-center h-11 w-11 rounded-xl shrink-0", styles.icon)}>
              <Icon className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-foreground">{alert.title}</h4>
              <p className="text-sm text-muted-foreground">{alert.description}</p>
            </div>
            {alert.action && (
              <Button variant="outline" size="sm" className={cn("gap-1.5 shrink-0 font-semibold", styles.button)}>
                {alert.action.label}
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 h-7 w-7 opacity-50 hover:opacity-100 rounded-lg"
              onClick={() => dismissAlert(alert.id)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )
      })}
    </div>
  )
}
