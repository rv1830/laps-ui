import { TopHeader } from "@/components/layout/top-header"
import { InvoiceBuilder } from "@/components/invoices/invoice-builder"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewInvoicePage() {
  return (
    <div className="flex flex-col h-full">
      <TopHeader
        title="New Invoice"
        actions={
          <Link href="/invoices">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Invoices
            </Button>
          </Link>
        }
      />

      <div className="flex-1 overflow-y-auto p-6">
        <InvoiceBuilder />
      </div>
    </div>
  )
}
