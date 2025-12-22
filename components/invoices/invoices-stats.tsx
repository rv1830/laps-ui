import { Card, CardContent } from "@/components/ui/card"
import { FileText, Clock, CheckCircle, AlertTriangle, DollarSign } from "lucide-react"

const stats = [
  { label: "Total Invoices", value: "89", icon: FileText, color: "text-blue-500" },
  { label: "Pending", value: "12", icon: Clock, color: "text-amber-500" },
  { label: "Paid", value: "71", icon: CheckCircle, color: "text-emerald-500" },
  { label: "Overdue", value: "6", icon: AlertTriangle, color: "text-red-500" },
  { label: "Outstanding", value: "$42,300", icon: DollarSign, color: "text-amber-500" },
]

export function InvoicesStats() {
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
