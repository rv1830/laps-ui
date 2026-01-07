"use client"

import { useState } from "react"
import { TopHeader } from "@/components/layout/top-header"
import { LeadTable } from "@/components/leads/lead-table"
import { LeadFilters } from "@/components/leads/lead-filters"
import { LeadSegments } from "@/components/leads/lead-segments"
import { Button } from "@/components/ui/button"
import { Plus, Upload, Download } from "lucide-react"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CreateLeadForm } from "@/components/leads/create-lead-form"

export default function LeadsPage() {
  const [selectedSegment, setSelectedSegment] = useState("all")
  const [filters, setFilters] = useState({})
  const [createDialogOpen, setCreateDialogOpen] = useState(false)

  return (
    <div className="flex flex-col h-full">
      <TopHeader
        title="Leads"
        subtitle="Manage and track all your leads"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Link href="/leads/import">
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Upload className="h-4 w-4" />
                Import
              </Button>
            </Link>
            <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  New Lead
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Create New Lead</DialogTitle>
                  <DialogDescription>
                    Add a new lead to your database. Fill in the required information.
                  </DialogDescription>
                </DialogHeader>
                <CreateLeadForm onSuccess={() => setCreateDialogOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>
        }
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Segments Sidebar */}
        <LeadSegments selectedSegment={selectedSegment} onSelectSegment={setSelectedSegment} />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Filters */}
          <LeadFilters filters={filters} onFiltersChange={setFilters} />

          {/* Table */}
          <div className="flex-1 overflow-hidden">
            <LeadTable segment={selectedSegment} filters={filters} />
          </div>
        </div>
      </div>
    </div>
  )
}
