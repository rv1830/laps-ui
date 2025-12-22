import { TopHeader } from "@/components/layout/top-header"
import { ProposalsList } from "@/components/proposals/proposals-list"
import { ProposalsStats } from "@/components/proposals/proposals-stats"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

export default function ProposalsPage() {
  return (
    <div className="flex flex-col h-full">
      <TopHeader
        title="Proposals"
        actions={
          <Link href="/proposals/new">
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              New Proposal
            </Button>
          </Link>
        }
      />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <ProposalsStats />

        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">All Proposals</TabsTrigger>
            <TabsTrigger value="draft">Draft</TabsTrigger>
            <TabsTrigger value="sent">Sent</TabsTrigger>
            <TabsTrigger value="accepted">Accepted</TabsTrigger>
            <TabsTrigger value="declined">Declined</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-6">
            <ProposalsList filter="all" />
          </TabsContent>
          <TabsContent value="draft" className="mt-6">
            <ProposalsList filter="draft" />
          </TabsContent>
          <TabsContent value="sent" className="mt-6">
            <ProposalsList filter="sent" />
          </TabsContent>
          <TabsContent value="accepted" className="mt-6">
            <ProposalsList filter="accepted" />
          </TabsContent>
          <TabsContent value="declined" className="mt-6">
            <ProposalsList filter="declined" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
