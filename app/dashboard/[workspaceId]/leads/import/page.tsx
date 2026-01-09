"use client"

import React, { useState, useCallback, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useParams, useRouter } from "next/navigation"
import Papa from "papaparse"
import { toast } from "sonner"
import { useTheme } from "next-themes"
import { 
  Upload, FileSpreadsheet, CheckCircle2, ArrowRight, X, 
  Loader2, Zap, ShieldCheck, Database, Sparkles,
  Layout, Sun, Moon, Monitor, Bell, Calendar, FileText, Settings, Info, ChevronLeft
} from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { leadService } from "@/services/lead"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"

type ImportStep = "upload" | "preview" | "importing" | "complete"

export default function LeadImportPage() {
  const [step, setStep] = useState<ImportStep>("upload")
  const [isDragging, setIsDragging] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const params = useParams()
  const router = useRouter()
  const workspaceId = params.workspaceId as string
  
  const [parsedLeads, setParsedLeads] = useState<any[]>([])
  const [progress, setProgress] = useState(0)
  const [results, setResults] = useState({ imported: 0, skipped: 0, errors: 0 })

  useEffect(() => setMounted(true), [])

  const onFileSelect = useCallback((selectedFile: File) => {
    if (!selectedFile.name.endsWith('.csv')) {
      toast.error("Please upload a valid CSV file");
      return;
    }
    
    Papa.parse(selectedFile, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const formattedData = results.data.map((row: any) => ({
          firstName: row.firstName || row.first_name || row.Name?.split(' ')[0] || row["First Name"] || "",
          lastName: row.lastName || row.last_name || row.Name?.split(' ')[1] || row["Last Name"] || "",
          email: row.email || row.Email || row["Email Address"] || "",
          phone: row.phone || row.Phone || row["Phone Number"] || "",
          company: row.company || row.Company || row.Organization || "",
          source: row.source || "CSV_Import",
        }))

        setParsedLeads(formattedData)
        setStep("preview")
      }
    })
  }, [])

  const handleStartImport = async () => {
    setStep("importing")
    let p = 0
    const interval = setInterval(() => {
      p += 2
      if (p <= 100) setProgress(p)
    }, 50)

    try {
      const response = await leadService.importLeads(workspaceId, parsedLeads)
      clearInterval(interval)
      setProgress(100)
      setResults({
        imported: response.imported || 0,
        skipped: response.skipped || 0,
        errors: response.errors?.length || 0
      })
      setTimeout(() => setStep("complete"), 500)
      toast.success("Intelligence Sync Complete")
    } catch (error: any) {
      clearInterval(interval)
      toast.error(error.response?.data?.error || "Import failed")
      setStep("upload")
    }
  }

  if (!mounted) return null

  return (
    <div className="flex flex-col h-screen bg-background text-foreground overflow-hidden font-sans transition-colors duration-300">
      
      {/* HEADER */}
      <header className="h-20 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50 px-8 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Button 
            variant="outline" 
            onClick={() => router.push(`/dashboard/${workspaceId}/leads`)}
            className="rounded-full border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 px-6 font-black uppercase tracking-tighter text-[11px] h-9 cursor-pointer"
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Leads
          </Button>
          
          <div className="hidden lg:block h-6 w-[1px] bg-border mx-2" />

          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                <Database className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tighter uppercase leading-none mb-1">Import Hub</h1>
              <p className="text-[10px] uppercase tracking-widest font-bold text-primary opacity-80">
                Data Synchronization Engine
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* THEME SELECTOR - REVEAL ON HOVER */}
          <div className="group relative flex items-center justify-center">
            <Button variant="outline" size="icon" className="rounded-full h-10 w-10 border-border bg-background cursor-pointer z-20">
              {theme === 'light' ? <Sun className="h-4 w-4 text-primary" /> : 
               theme === 'dark' ? <Moon className="h-4 w-4 text-primary" /> : 
               <Monitor className="h-4 w-4 text-primary" />}
            </Button>

            <div className="absolute top-0 right-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:right-12 transition-all duration-300 ease-out flex bg-secondary/80 backdrop-blur-md p-1 rounded-full border border-border h-10 items-center gap-1 z-10">
              <button onClick={() => setTheme('light')} className={cn("h-8 w-8 rounded-full flex items-center justify-center cursor-pointer transition-colors", theme === 'light' ? "bg-background text-primary shadow-sm" : "text-muted-foreground hover:text-foreground")}>
                <Sun className="h-3.5 w-3.5" />
              </button>
              <button onClick={() => setTheme('dark')} className={cn("h-8 w-8 rounded-full flex items-center justify-center cursor-pointer transition-colors", theme === 'dark' ? "bg-background text-primary shadow-sm" : "text-muted-foreground hover:text-foreground")}>
                <Moon className="h-3.5 w-3.5" />
              </button>
              <button onClick={() => setTheme('system')} className={cn("h-8 w-8 rounded-full flex items-center justify-center cursor-pointer transition-colors", theme === 'system' ? "bg-background text-primary shadow-sm" : "text-muted-foreground hover:text-foreground")}>
                <Monitor className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-10 w-10 rounded-full border-border bg-background p-0 hover:border-primary/50 group cursor-pointer">
                <Zap className="h-4 w-4 text-primary group-hover:fill-primary" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 rounded-2xl p-2 shadow-2xl border-border bg-popover text-popover-foreground backdrop-blur-xl">
              <DropdownMenuLabel className="text-[10px] uppercase tracking-widest text-muted-foreground px-3 py-2">Quick Commands</DropdownMenuLabel>
              <DropdownMenuItem className="gap-3 py-3 rounded-xl cursor-pointer hover:bg-accent transition-colors">
                <Calendar className="h-4 w-4 text-blue-500" />
                <span className="font-bold text-sm">Schedule Sync</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-3 py-3 rounded-xl cursor-pointer hover:bg-accent transition-colors">
                <FileText className="h-4 w-4 text-orange-500" />
                <span className="font-bold text-sm">Log History</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-3 py-2 rounded-xl cursor-pointer text-muted-foreground hover:text-foreground transition-colors">
                <Settings className="h-4 w-4" />
                <span className="font-bold text-xs uppercase">Engine Config</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" size="icon" className="rounded-full h-10 w-10 border-border relative bg-background hover:bg-secondary transition-colors cursor-pointer">
            <Bell className="h-4 w-4 text-muted-foreground" />
            <span className="absolute top-3 right-3.5 h-2 w-2 bg-primary rounded-full border-2 border-background animate-pulse" />
          </Button>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-gradient-to-b from-background to-secondary/20">
        <div className="max-w-5xl mx-auto space-y-8">
          
          <div className="flex items-center justify-center gap-4 mb-12">
            {["Upload", "Analyze", "Sync"].map((label, idx) => (
              <React.Fragment key={label}>
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "h-10 w-10 rounded-2xl flex items-center justify-center font-bold transition-all duration-500 shadow-sm border",
                    ["upload", "preview", "importing", "complete"].indexOf(step) >= idx
                      ? "bg-primary text-primary-foreground border-primary rotate-3 shadow-primary/20"
                      : "bg-muted text-muted-foreground border-border"
                  )}>
                    {idx + 1}
                  </div>
                  <span className={cn("text-xs font-black uppercase tracking-widest italic", 
                    ["upload", "preview", "importing", "complete"].indexOf(step) >= idx ? "text-foreground" : "text-muted-foreground")}>
                    {label}
                  </span>
                </div>
                {idx < 2 && <div className="w-12 h-[2px] bg-border" />}
              </React.Fragment>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {/* UPLOAD VIEW */}
            {step === "upload" && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="group relative">
                <div 
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={(e) => { e.preventDefault(); setIsDragging(false); if (e.dataTransfer.files[0]) onFileSelect(e.dataTransfer.files[0]); }}
                  className={cn(
                    "relative overflow-hidden border-2 border-dashed rounded-[2.5rem] p-24 text-center transition-all duration-500 bg-card/40 backdrop-blur-md cursor-pointer",
                    isDragging ? "border-primary bg-primary/5 scale-[1.02]" : "border-border hover:border-primary/40"
                  )}
                >
                  <input type="file" accept=".csv" onChange={(e) => e.target.files?.[0] && onFileSelect(e.target.files?.[0])} className="hidden" id="file-upload" />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <div className="h-20 w-20 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-primary/20 group-hover:rotate-6 transition-transform">
                      <Upload className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-3xl font-black tracking-tighter uppercase italic mb-3 text-foreground">Intelligence Dropzone</h3>
                    <p className="text-muted-foreground font-medium mb-8 max-w-sm mx-auto italic">Drop CSV file to initialize mass lead synchronization into your secure vault.</p>
                    <div className="flex items-center justify-center gap-4">
                      <Badge variant="secondary" className="px-4 py-1 rounded-full font-bold uppercase text-[10px]">CSV Supported</Badge>
                      <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-1 rounded-full font-bold uppercase text-[10px]">Auto-Map Active</Badge>
                    </div>
                  </label>
                </div>
              </motion.div>
            )}

            {/* PREVIEW VIEW */}
            {step === "preview" && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
                <Card className="border-border shadow-2xl bg-card rounded-[2.5rem] overflow-hidden">
                  <div className="p-8 border-b border-border flex items-center justify-between bg-muted/30">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        <FileSpreadsheet className="h-6 w-6" />
                      </div>
                      <div>
                        <h2 className="text-xl font-black uppercase tracking-tighter italic text-foreground">Preview Dataset</h2>
                        <p className="text-xs font-bold text-primary uppercase tracking-widest">{parsedLeads.length} Records Detected</p>
                      </div>
                    </div>
                    <Button variant="ghost" className="rounded-full font-bold text-muted-foreground hover:bg-destructive/10 hover:text-destructive cursor-pointer" onClick={() => setStep("upload")}>
                      <X className="h-4 w-4 mr-2" /> Reset
                    </Button>
                  </div>
                  <CardContent className="p-0 overflow-x-auto">
                    <Table>
                      <TableHeader className="bg-muted/50">
                        <TableRow className="border-none hover:bg-transparent">
                          <TableHead className="text-[10px] font-black uppercase tracking-widest py-5 pl-8 text-muted-foreground">Lead Name</TableHead>
                          <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Email Address</TableHead>
                          <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Organization</TableHead>
                          <TableHead className="text-[10px] font-black uppercase tracking-widest text-right pr-8 text-muted-foreground">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {parsedLeads.slice(0, 6).map((lead, i) => (
                          <TableRow key={i} className="border-border/50 hover:bg-accent/50 transition-colors">
                            <TableCell className="font-bold text-sm py-4 pl-8 text-foreground">{lead.firstName} {lead.lastName}</TableCell>
                            <TableCell className="text-xs text-muted-foreground font-medium">{lead.email}</TableCell>
                            <TableCell className="text-xs font-bold text-muted-foreground uppercase">{lead.company || "N/A"}</TableCell>
                            <TableCell className="text-right pr-8">
                                <Badge className="bg-primary/10 text-primary border-none text-[9px] font-black italic">READY</Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <div className="p-8 border-t border-border flex items-center justify-between bg-muted/20">
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest italic">
                        {parsedLeads.length > 6 ? `Batch Analysis: 6 of ${parsedLeads.length} records shown.` : "Analysis Complete."}
                      </p>
                      <Button onClick={handleStartImport} className="h-12 px-10 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-black uppercase italic tracking-tighter transition-all shadow-lg shadow-primary/20 cursor-pointer">
                        Synchronize Now <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* IMPORTING VIEW - HEAVY ANIMATION */}
            {step === "importing" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-24 text-center space-y-12 relative overflow-hidden">
                {/* Falling Data Particles Animation */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(15)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ y: -50, x: Math.random() * 400 - 200, opacity: 0, scale: 0.5 }}
                      animate={{ 
                        y: 400, 
                        opacity: [0, 1, 0],
                        rotate: 360 
                      }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity, 
                        delay: Math.random() * 2,
                        ease: "linear"
                      }}
                      className="absolute left-1/2"
                    >
                      <div className="h-3 w-3 bg-primary rounded-sm shadow-[0_0_10px_rgba(var(--primary),0.8)]" />
                    </motion.div>
                  ))}
                </div>

                <div className="relative inline-block group">
                   {/* Liquid Fill Card Effect */}
                  <div className="h-40 w-32 rounded-3xl bg-card border-2 border-primary/20 relative overflow-hidden shadow-2xl">
                    <motion.div 
                      initial={{ height: "0%" }}
                      animate={{ height: `${progress}%` }}
                      className="absolute bottom-0 left-0 right-0 bg-primary/20 backdrop-blur-sm"
                      transition={{ ease: "easeOut" }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Database className={cn("h-12 w-12 transition-colors duration-500", progress > 50 ? "text-primary-foreground" : "text-primary")} />
                    </div>
                    {/* Wavy Top Effect */}
                    <motion.div 
                      animate={{ x: [-100, 0] }}
                      transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                      style={{ bottom: `${progress}%` }}
                      className="absolute left-0 w-[200%] h-4 bg-primary/20 rounded-[100%] blur-sm"
                    />
                  </div>
                </div>

                <div className="space-y-3 z-10 relative">
                  <h2 className="text-3xl font-black tracking-tighter uppercase italic text-foreground">Injecting Intelligence</h2>
                  <p className="text-primary font-black uppercase text-xs tracking-[0.4em]">{progress}% Secured</p>
                </div>

                <div className="max-w-md mx-auto px-10 relative">
                  <Progress value={progress} className="h-3 bg-primary/10" />
                  <motion.div 
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="absolute -right-2 -top-1"
                  >
                    <Sparkles className="h-5 w-5 text-primary" />
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* COMPLETE VIEW */}
            {step === "complete" && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                <Card className="border border-border shadow-2xl bg-card rounded-[3rem] overflow-hidden text-center">
                  <CardContent className="p-12">
                    <motion.div 
                      initial={{ rotate: -20, scale: 0 }}
                      animate={{ rotate: 0, scale: 1 }}
                      className="h-24 w-24 bg-primary text-primary-foreground rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-primary/40"
                    >
                      <ShieldCheck className="h-12 w-12" />
                    </motion.div>
                    <h2 className="text-4xl font-black tracking-tighter uppercase italic mb-2 text-foreground">Sync Successful</h2>
                    <p className="text-muted-foreground font-bold mb-10 uppercase tracking-[0.2em] text-[10px] italic">Operational data has been secured in the workspace.</p>
                    
                    <div className="grid grid-cols-3 gap-6 mb-10">
                      {[
                        { label: "Imported", val: results.imported, color: "text-primary" },
                        { label: "Skipped", val: results.skipped, color: "text-orange-500" },
                        { label: "Errors", val: results.errors, color: "text-red-500" }
                      ].map(res => (
                        <div key={res.label} className="p-6 rounded-3xl bg-muted/50 border border-border shadow-inner">
                          <p className={cn("text-3xl font-black tracking-tighter mb-1", res.color)}>{res.val}</p>
                          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{res.label}</p>
                        </div>
                      ))}
                    </div>

                    {results.skipped > 0 && (
                      <div className="mb-10 p-6 bg-orange-500/5 border border-orange-500/20 rounded-[2rem] text-left">
                        <div className="flex items-center gap-3 mb-3">
                          <Info className="h-5 w-5 text-orange-500" />
                          <h4 className="text-xs font-black uppercase tracking-widest text-orange-600">Why were some leads skipped?</h4>
                        </div>
                        <ul className="space-y-3">
                          <li className="text-[11px] text-muted-foreground font-medium flex gap-2">
                            <span className="text-orange-500 font-bold">•</span>
                            <span><strong>Duplicate Records:</strong> These leads already exist in your workspace with the same <strong>Email</strong> or <strong>Phone Number</strong>.</span>
                          </li>
                          <li className="text-[11px] text-muted-foreground font-medium flex gap-2">
                            <span className="text-orange-500 font-bold">•</span>
                            <span><strong>Note on Empty Data:</strong> Leads without an email or phone are still imported and labeled as <strong>"Unknown Lead"</strong> so you don't lose any data.</span>
                          </li>
                        </ul>
                      </div>
                    )}

                    <div className="flex gap-4 max-w-md mx-auto">
                      <Button variant="outline" onClick={() => setStep("upload")} className="flex-1 h-14 rounded-2xl font-black uppercase italic tracking-tighter border-border hover:bg-accent text-foreground cursor-pointer transition-all hover:scale-105">
                        New Sync
                      </Button>
                      <Button onClick={() => router.push(`/dashboard/${workspaceId}/leads`)} className="flex-1 h-14 rounded-2xl bg-primary text-primary-foreground font-black uppercase italic tracking-tighter hover:bg-primary/90 shadow-xl shadow-primary/20 cursor-pointer transition-all hover:scale-105">
                        View Hub <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}