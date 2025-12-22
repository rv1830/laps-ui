"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Eye, Send, Copy, Trash2, Download, RefreshCw } from "lucide-react"
import Link from "next/link"

interface InvoicesListProps {
  filter: "all" | "draft" | "sent" | "paid" | "overdue"
}

const mockInvoices = [
  {
    id: "INV-001",
    title: "Software License",
    client: "TechCorp Inc.",
    amount: 15000,
    status: "paid" as const,
    issuedAt: new Date(2025, 4, 15),
    dueAt: new Date(2025, 5, 15),
    paidAt: new Date(2025, 5, 10),
  },
  {
    id: "INV-002",
    title: "Consulting Services - May",
    client: "GrowthLabs",
    amount: 8500,
    status: "sent" as const,
    issuedAt: new Date(2025, 5, 1),
    dueAt: new Date(2025, 6, 1),
  },
  {
    id: "INV-003",
    title: "Implementation Phase 1",
    client: "DataFlow Systems",
    amount: 22000,
    status: "overdue" as const,
    issuedAt: new Date(2025, 4, 1),
    dueAt: new Date(2025, 5, 1),
  },
  {
    id: "INV-004",
    title: "Monthly Retainer - June",
    client: "InnovateTech",
    amount: 5000,
    status: "draft" as const,
    issuedAt: new Date(2025, 5, 20),
    dueAt: new Date(2025, 6, 20),
  },
  {
    id: "INV-005",
    title: "Training Package",
    client: "StartupXYZ",
    amount: 4000,
    status: "paid" as const,
    issuedAt: new Date(2025, 4, 20),
    dueAt: new Date(2025, 5, 20),
    paidAt: new Date(2025, 5, 18),
  },
  {
    id: "INV-006",
    title: "Support Contract Q2",
    client: "Enterprise Solutions",
    amount: 12000,
    status: "sent" as const,
    issuedAt: new Date(2025, 5, 10),
    dueAt: new Date(2025, 6, 10),
  },
]

const statusConfig = {
  draft: { color: "bg-slate-500/10 text-slate-600 border-slate-500/20", label: "Draft" },
  sent: { color: "bg-blue-500/10 text-blue-600 border-blue-500/20", label: "Sent" },
  paid: { color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20", label: "Paid" },
  overdue: { color: "bg-red-500/10 text-red-600 border-red-500/20", label: "Overdue" },
}

export function InvoicesList({ filter }: InvoicesListProps) {
  const filteredInvoices = filter === "all" ? mockInvoices : mockInvoices.filter((inv) => inv.status === filter)

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Issued</TableHead>
              <TableHead>Due</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInvoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>
                  <Link href={`/invoices/${invoice.id}`} className="hover:underline">
                    <div>
                      <p className="font-medium">{invoice.id}</p>
                      <p className="text-xs text-muted-foreground">{invoice.title}</p>
                    </div>
                  </Link>
                </TableCell>
                <TableCell>{invoice.client}</TableCell>
                <TableCell className="font-medium">${invoice.amount.toLocaleString()}</TableCell>
                <TableCell className="text-muted-foreground">
                  {invoice.issuedAt.toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {invoice.dueAt.toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={statusConfig[invoice.status].color}>
                    {statusConfig[invoice.status].label}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="gap-2">
                        <Eye className="h-4 w-4" /> View
                      </DropdownMenuItem>
                      {invoice.status === "draft" && (
                        <DropdownMenuItem className="gap-2">
                          <Send className="h-4 w-4" /> Send
                        </DropdownMenuItem>
                      )}
                      {invoice.status === "overdue" && (
                        <DropdownMenuItem className="gap-2">
                          <RefreshCw className="h-4 w-4" /> Send Reminder
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem className="gap-2">
                        <Copy className="h-4 w-4" /> Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <Download className="h-4 w-4" /> Download PDF
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2 text-destructive">
                        <Trash2 className="h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
