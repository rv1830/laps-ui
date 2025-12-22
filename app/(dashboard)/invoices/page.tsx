import { TopHeader } from "@/components/layout/top-header"
import { InvoicesList } from "@/components/invoices/invoices-list"
import { InvoicesStats } from "@/components/invoices/invoices-stats"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

export default function InvoicesPage() {
  return (
    <div className="flex flex-col h-full">
      <TopHeader
        title="Invoices"
        actions={
          <Link href="/invoices/new">
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              New Invoice
            </Button>
          </Link>
        }
      />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <InvoicesStats />

        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">All Invoices</TabsTrigger>
            <TabsTrigger value="draft">Draft</TabsTrigger>
            <TabsTrigger value="sent">Sent</TabsTrigger>
            <TabsTrigger value="paid">Paid</TabsTrigger>
            <TabsTrigger value="overdue">Overdue</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-6">
            <InvoicesList filter="all" />
          </TabsContent>
          <TabsContent value="draft" className="mt-6">
            <InvoicesList filter="draft" />
          </TabsContent>
          <TabsContent value="sent" className="mt-6">
            <InvoicesList filter="sent" />
          </TabsContent>
          <TabsContent value="paid" className="mt-6">
            <InvoicesList filter="paid" />
          </TabsContent>
          <TabsContent value="overdue" className="mt-6">
            <InvoicesList filter="overdue" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
