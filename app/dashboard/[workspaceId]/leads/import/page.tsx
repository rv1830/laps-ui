"use client"

import type React from "react"

import { useState } from "react"
import { TopHeader } from "@/components/layout/top-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Upload, FileSpreadsheet, CheckCircle2, ArrowRight, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useParams } from "next/navigation"
import { leadService } from "@/services/lead"
import { toast } from "sonner"

type ImportStep = "upload" | "mapping" | "preview" | "importing" | "complete"

const samplePreviewData = [
  { name: "John Doe", email: "john@example.com", company: "Acme Inc", phone: "+1 555 123 4567" },
  { name: "Jane Smith", email: "jane@startup.io", company: "StartupCo", phone: "+1 555 234 5678" },
  { name: "Bob Wilson", email: "bob@enterprise.com", company: "Enterprise Ltd", phone: "+1 555 345 6789" },
]

export default function LeadImportPage() {
  const [step, setStep] = useState<ImportStep>("upload")
  const params = useParams()
  const workspaceId = params.workspaceId as string
  const [file, setFile] = useState<File | null>(null)
  const [progress, setProgress] = useState(0)
  const [duplicateHandling, setDuplicateHandling] = useState("skip")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setStep("mapping")
    }
  }


  const handleStartImport = async () => {
    setStep("importing")
    try {
      // leads array would come from your CSV parser logic (e.g., papaparse)
      const dummyLeads = [{ name: "Imported Lead", email: "test@test.com" }];
      await leadService.importLeads(workspaceId, dummyLeads);

      // Simulate progress UI
      let p = 0;
      const interval = setInterval(() => {
        p += 20;
        setProgress(p);
        if (p >= 100) {
          clearInterval(interval);
          setStep("complete");
        }
      }, 200);
    } catch (error) {
      toast.error("Import failed");
      setStep("upload");
    }
  }

  return (
    <div className="flex flex-col h-full">
      <TopHeader title="Import Leads" subtitle="Import leads from a CSV file" />

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8">
            {["Upload", "Map Fields", "Preview", "Import"].map((label, index) => {
              const stepNames: ImportStep[] = ["upload", "mapping", "preview", "importing"]
              const currentStepIndex = stepNames.indexOf(step)
              const isComplete = index < currentStepIndex || step === "complete"
              const isCurrent = index === currentStepIndex

              return (
                <div key={label} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium",
                        isComplete && "bg-success text-success-foreground",
                        isCurrent && "bg-primary text-primary-foreground",
                        !isComplete && !isCurrent && "bg-muted text-muted-foreground",
                      )}
                    >
                      {isComplete ? <CheckCircle2 className="h-5 w-5" /> : index + 1}
                    </div>
                    <span className="text-xs mt-2 text-muted-foreground">{label}</span>
                  </div>
                  {index < 3 && <div className={cn("w-24 h-px mx-4", isComplete ? "bg-success" : "bg-border")} />}
                </div>
              )
            })}
          </div>

          {/* Upload Step */}
          {step === "upload" && (
            <Card>
              <CardHeader>
                <CardTitle>Upload CSV File</CardTitle>
                <CardDescription>
                  Upload a CSV file containing your leads. The file should have headers.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary/50 transition-colors">
                  <input type="file" accept=".csv" onChange={handleFileChange} className="hidden" id="file-upload" />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-lg font-medium text-foreground mb-2">
                      Drop your CSV file here or click to upload
                    </p>
                    <p className="text-sm text-muted-foreground">Supports .csv files up to 10MB</p>
                  </label>
                </div>

                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <h4 className="font-medium text-foreground mb-2">CSV Format Requirements</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>First row must contain column headers</li>
                    <li>Required: At least email OR phone</li>
                    <li>Recommended: name, company, source</li>
                    <li>Dates should be in YYYY-MM-DD format</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Mapping Step */}
          {step === "mapping" && (
            <Card>
              <CardHeader>
                <CardTitle>Map CSV Columns</CardTitle>
                <CardDescription>Match your CSV columns to lead fields</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                  <FileSpreadsheet className="h-8 w-8 text-primary" />
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{file?.name}</p>
                    <p className="text-sm text-muted-foreground">3 columns detected</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setFile(null)
                      setStep("upload")
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 items-center">
                    <div>
                      <Label className="text-muted-foreground">CSV Column</Label>
                      <p className="font-medium text-foreground">full_name</p>
                    </div>
                    <div>
                      <Label>Map to Field</Label>
                      <Select defaultValue="name">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="name">Name</SelectItem>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="phone">Phone</SelectItem>
                          <SelectItem value="company">Company</SelectItem>
                          <SelectItem value="skip">Skip this column</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 items-center">
                    <div>
                      <Label className="text-muted-foreground">CSV Column</Label>
                      <p className="font-medium text-foreground">email_address</p>
                    </div>
                    <div>
                      <Label>Map to Field</Label>
                      <Select defaultValue="email">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="name">Name</SelectItem>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="phone">Phone</SelectItem>
                          <SelectItem value="company">Company</SelectItem>
                          <SelectItem value="skip">Skip this column</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 items-center">
                    <div>
                      <Label className="text-muted-foreground">CSV Column</Label>
                      <p className="font-medium text-foreground">organization</p>
                    </div>
                    <div>
                      <Label>Map to Field</Label>
                      <Select defaultValue="company">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="name">Name</SelectItem>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="phone">Phone</SelectItem>
                          <SelectItem value="company">Company</SelectItem>
                          <SelectItem value="skip">Skip this column</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <Label>Duplicate Handling</Label>
                  <Select value={duplicateHandling} onValueChange={setDuplicateHandling}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="skip">Skip duplicates</SelectItem>
                      <SelectItem value="overwrite">Overwrite existing</SelectItem>
                      <SelectItem value="create">Create new leads</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setStep("upload")}>
                    Back
                  </Button>
                  <Button onClick={() => setStep("preview")}>
                    Continue to Preview <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Preview Step */}
          {step === "preview" && (
            <Card>
              <CardHeader>
                <CardTitle>Preview Import</CardTitle>
                <CardDescription>Review the first 20 rows before importing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                  <div>
                    <p className="font-medium text-foreground">150 leads ready to import</p>
                    <p className="text-sm text-muted-foreground">3 duplicates will be skipped</p>
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {samplePreviewData.map((row, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium">{row.name}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>{row.company}</TableCell>
                        <TableCell>{row.phone}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-success/10 text-success">
                            Valid
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setStep("mapping")}>
                    Back
                  </Button>
                  <Button onClick={handleStartImport}>
                    Start Import <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Importing Step */}
          {step === "importing" && (
            <Card>
              <CardHeader>
                <CardTitle>Importing Leads...</CardTitle>
                <CardDescription>Please wait while we import your leads</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
                <p className="text-sm text-muted-foreground text-center">
                  Importing {Math.floor(progress * 1.5)} of 150 leads...
                </p>
              </CardContent>
            </Card>
          )}

          {/* Complete Step */}
          {step === "complete" && (
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-success/10 flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-6 w-6 text-success" />
                </div>
                <CardTitle>Import Complete!</CardTitle>
                <CardDescription>Your leads have been successfully imported</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-2xl font-semibold text-foreground">147</p>
                    <p className="text-sm text-muted-foreground">Imported</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-2xl font-semibold text-foreground">3</p>
                    <p className="text-sm text-muted-foreground">Duplicates Skipped</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-2xl font-semibold text-foreground">0</p>
                    <p className="text-sm text-muted-foreground">Errors</p>
                  </div>
                </div>

                <div className="flex justify-center gap-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setStep("upload")
                      setFile(null)
                      setProgress(0)
                    }}
                  >
                    Import More
                  </Button>
                  <Button asChild>
                    <a href="/leads">View Leads</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
