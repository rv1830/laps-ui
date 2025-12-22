import { Card, CardContent } from "@/components/ui/card"
import { FileText, Send, CheckCircle, DollarSign } from "lucide-react"

const stats = [
  { label: "Total Proposals", value: "47", icon: FileText, color: "text-blue-500" },
  { label: "Sent", value: "32", icon: Send, color: "text-amber-500" },
  { label: "Accepted", value: "24", icon: CheckCircle, color: "text-emerald-500" },
  { label: "Win Rate", value: "75%", icon: CheckCircle, color: "text-purple-500" },
  { label: "Total Value", value: "$284,500", icon: DollarSign, color: "text-emerald-500" },
]

export function ProposalsStats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-muted ${stat.color}`}>
                <stat.icon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
