"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Eye, Send, Copy, Trash2, Download } from "lucide-react"
import Link from "next/link"

interface ProposalsListProps {
  filter: "all" | "draft" | "sent" | "accepted" | "declined"
}

const mockProposals = [
  {
    id: "1",
    title: "Enterprise Software Solution",
    client: "TechCorp Inc.",
    value: 45000,
    status: "sent" as const,
    createdAt: new Date(2025, 5, 15),
    expiresAt: new Date(2025, 6, 15),
    viewedAt: new Date(2025, 5, 18),
  },
  {
    id: "2",
    title: "Marketing Automation Package",
    client: "GrowthLabs",
    value: 12500,
    status: "accepted" as const,
    createdAt: new Date(2025, 5, 10),
    expiresAt: new Date(2025, 6, 10),
    acceptedAt: new Date(2025, 5, 14),
  },
  {
    id: "3",
    title: "Annual Support Contract",
    client: "DataFlow Systems",
    value: 8400,
    status: "draft" as const,
    createdAt: new Date(2025, 5, 20),
    expiresAt: new Date(2025, 6, 20),
  },
  {
    id: "4",
    title: "Custom Integration Project",
    client: "InnovateTech",
    value: 28000,
    status: "sent" as const,
    createdAt: new Date(2025, 5, 18),
    expiresAt: new Date(2025, 6, 18),
  },
  {
    id: "5",
    title: "Consulting Services",
    client: "StartupXYZ",
    value: 15000,
    status: "declined" as const,
    createdAt: new Date(2025, 5, 5),
    expiresAt: new Date(2025, 6, 5),
    declinedAt: new Date(2025, 5, 12),
  },
  {
    id: "6",
    title: "Platform License",
    client: "Enterprise Solutions",
    value: 36000,
    status: "accepted" as const,
    createdAt: new Date(2025, 5, 1),
    expiresAt: new Date(2025, 6, 1),
    acceptedAt: new Date(2025, 5, 8),
  },
]

const statusConfig = {
  draft: { color: "bg-slate-500/10 text-slate-600 border-slate-500/20", label: "Draft" },
  sent: { color: "bg-blue-500/10 text-blue-600 border-blue-500/20", label: "Sent" },
  accepted: { color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20", label: "Accepted" },
  declined: { color: "bg-red-500/10 text-red-600 border-red-500/20", label: "Declined" },
  expired: { color: "bg-amber-500/10 text-amber-600 border-amber-500/20", label: "Expired" },
}

export function ProposalsList({ filter }: ProposalsListProps) {
  const filteredProposals = filter === "all" ? mockProposals : mockProposals.filter((p) => p.status === filter)

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Proposal</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Expires</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProposals.map((proposal) => (
              <TableRow key={proposal.id}>
                <TableCell>
                  <Link href={`/proposals/${proposal.id}`} className="font-medium hover:underline">
                    {proposal.title}
                  </Link>
                </TableCell>
                <TableCell>{proposal.client}</TableCell>
                <TableCell className="font-medium">${proposal.value.toLocaleString()}</TableCell>
                <TableCell className="text-muted-foreground">
                  {proposal.createdAt.toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {proposal.expiresAt.toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={statusConfig[proposal.status].color}>
                    {statusConfig[proposal.status].label}
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
                      {proposal.status === "draft" && (
                        <DropdownMenuItem className="gap-2">
                          <Send className="h-4 w-4" /> Send
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
