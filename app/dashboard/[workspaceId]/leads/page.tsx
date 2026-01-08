"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { TopHeader } from "@/components/layout/top-header"
import { LeadTable } from "@/components/leads/lead-table"
import { LeadFilters } from "@/components/leads/lead-filters"
import { LeadSegments } from "@/components/leads/lead-segments"
import { Button } from "@/components/ui/button"
import { Plus, Upload, Download } from "lucide-react"
import Link from "next/link"
import { leadService } from "@/services/lead" // Import service
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
  const params = useParams()
  const workspaceId = params.workspaceId as string

  const [selectedSegment, setSelectedSegment] = useState("all")
  const [filters, setFilters] = useState<any>({ search: "", stageId: "" })
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [leadsData, setLeadsData] = useState({ leads: [], pagination: {} })
  const [loading, setLoading] = useState(true)

  const fetchLeads = async () => {
    try {
      setLoading(true)
      const data = await leadService.getLeads(workspaceId, {
        search: filters.search,
        stageId: filters.stage === "all" ? undefined : filters.stage
      })
      setLeadsData(data)
    } catch (error) {
      console.error("Error fetching leads:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLeads()
  }, [workspaceId, filters, selectedSegment])

  return (
    <div className="flex flex-col h-full">
      <TopHeader
        title="Leads"
        subtitle="Manage and track all your leads"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Download className="h-4 w-4" /> Export
            </Button>
            <Link href={`/dashboard/${workspaceId}/leads/import`}>
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Upload className="h-4 w-4" /> Import
              </Button>
            </Link>
            <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-2">
                  <Plus className="h-4 w-4" /> New Lead
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Create New Lead</DialogTitle>
                  <DialogDescription>Add a new lead to your database.</DialogDescription>
                </DialogHeader>
                <CreateLeadForm
                  workspaceId={workspaceId}
                  onSuccess={() => {
                    setCreateDialogOpen(false)
                    fetchLeads()
                  }}
                />
              </DialogContent>
            </Dialog>
          </div>
        }
      />

      <div className="flex flex-1 overflow-hidden">
        <LeadSegments selectedSegment={selectedSegment} onSelectSegment={setSelectedSegment} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <LeadFilters filters={filters} onFiltersChange={setFilters} />
          <div className="flex-1 overflow-hidden">
            <LeadTable
              leads={leadsData.leads}
              isLoading={loading}
              onRefresh={fetchLeads}
              workspaceId={workspaceId}
            />
          </div>
        </div>
      </div>
    </div>
  )
}