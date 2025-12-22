import { TopHeader } from "@/components/layout/top-header"
import { ProposalBuilder } from "@/components/proposals/proposal-builder"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewProposalPage() {
  return (
    <div className="flex flex-col h-full">
      <TopHeader
        title="New Proposal"
        actions={
          <Link href="/proposals">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Proposals
            </Button>
          </Link>
        }
      />

      <div className="flex-1 overflow-y-auto p-6">
        <ProposalBuilder />
      </div>
    </div>
  )
}
