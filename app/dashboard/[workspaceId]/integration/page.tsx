"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { integrationService } from "@/services/integration";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { 
  CheckCircle2, 
  ArrowRight, 
  RefreshCw, 
  Settings2, 
  ExternalLink, 
  ShieldCheck, 
  Zap, 
  Database,
  ChevronLeft
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// ThemeToggle Import
import ThemeToggle from "@/components/ThemeToggle";

export default function HubSpotIntegrationPage() {
  const { workspaceId } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isConnected = searchParams.get("hubspot_connected") === "true";

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      const { url } = await integrationService.getHubSpotAuthUrl(workspaceId as string);
      window.location.href = url;
    } catch (err) {
      toast.error("Authentication failed. Please check your HubSpot developer settings.");
    } finally {
      setIsConnecting(false);
    }
  };

  const handleImportLeads = async () => {
    setLoading(true);
    try {
      const response = await integrationService.importHubSpotContacts(workspaceId as string);
      toast.success("Synchronization Complete", {
        description: response.message || "100 contacts have been mapped to your pipeline.",
      });
      router.push(`/dashboard/${workspaceId}/leads`);
    } catch (error) {
      toast.error("Sync Failed", {
        description: "An error occurred while fetching HubSpot data.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background transition-colors duration-300 relative overflow-hidden">
      {/* Background Interactive Element - Next Level Subtle Glow */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3] 
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[100px]" 
        />
      </div>

      {/* Dynamic Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container flex h-20 items-center justify-between max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-6">
            {/* Back to Leads - Left Corner */}
            <Button 
              variant="outline" 
              onClick={() => router.push(`/dashboard/${workspaceId}/leads`)}
              className="rounded-full border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 px-6 font-black uppercase tracking-tighter text-[11px] h-9 cursor-pointer transition-all hover:-translate-x-1"
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Back to Leads
            </Button>

            <div className="hidden md:flex items-center gap-2">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Settings2 className="w-5 h-5 text-primary" />
              </div>
              <nav className="flex items-center space-x-1 text-sm font-medium text-muted-foreground">
                <span className="hover:text-foreground cursor-pointer">Workspace</span>
                <ArrowRight className="w-3 h-3" />
                <span className="text-foreground">Integrations</span>
              </nav>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container max-w-5xl mx-auto py-12 px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Title Section */}
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
              Power up your <span className="text-primary italic">Workflow.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl font-medium">
              Connect LAPS with the world&apos;s leading CRM tools to automate lead capture and streamline your sales pipeline.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Main Integration Card */}
            <Card className="md:col-span-2 overflow-hidden border-primary/20 bg-gradient-to-b from-card to-secondary/10 shadow-xl relative">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    {/* HubSpot Icon with Infinite Next-Level Animation */}
                    <div className="relative group/hubspot">
                      {/* Infinite Pulsing Glow */}
                      <motion.div 
                        animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.4, 0.2] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 bg-[#ff7a59] rounded-2xl blur-xl"
                      />
                      <motion.div 
                        whileHover={{ scale: 1.15, rotate: 0 }}
                        initial={{ rotate: -3 }}
                        className="w-16 h-16 bg-[#ff7a59] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#ff7a59]/20 transition-all duration-300 relative z-10"
                      >
                        <span className="font-black text-2xl">H</span>
                      </motion.div>
                      <div className="absolute -bottom-1 -right-1 bg-background p-1 rounded-full border z-20">
                         <Zap className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      </div>
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-bold">HubSpot CRM</CardTitle>
                      <CardDescription className="flex items-center gap-2 font-semibold">
                        Official Partner Integration
                        {isConnected && (
                          <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:border-emerald-800 animate-pulse">
                            Live Sync Active
                          </Badge>
                        )}
                      </CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <AnimatePresence mode="wait">
                  {!isConnected ? (
                    <motion.div 
                      key="connect"
                      initial={{ opacity: 0, x: -10 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      exit={{ opacity: 0, x: 10 }}
                      className="space-y-4"
                    >
                      <div className="bg-muted/50 p-4 rounded-xl border border-dashed border-muted-foreground/30 italic">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Link your HubSpot workspace to import contacts, companies, and deals directly into LAPS. We support OAuth 2.0 for maximum security.
                        </p>
                      </div>
                      <Button
                        onClick={handleConnect}
                        disabled={isConnecting}
                        className="w-full md:w-auto px-8 h-12 bg-[#ff7a59] hover:bg-[#ff7a59]/90 text-white font-black rounded-xl transition-all shadow-lg hover:shadow-[#ff7a59]/30 cursor-pointer uppercase tracking-tight"
                      >
                        {isConnecting ? (
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <ExternalLink className="mr-2 h-4 w-4" />
                        )}
                        Authorize HubSpot Account
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="sync"
                      initial={{ opacity: 0, x: 10 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center gap-3 p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20 shadow-inner">
                        <div className="p-2 bg-emerald-500 rounded-full shadow-md">
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-tight">Connection Verified</p>
                          <p className="text-xs text-muted-foreground font-medium">Successfully linked via Secure Bridge</p>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button
                          onClick={handleImportLeads}
                          disabled={loading}
                          className="flex-1 h-12 text-md font-black shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform"
                        >
                          {loading ? (
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <Database className="mr-2 h-4 w-4" />
                          )}
                          Sync All Contacts Now
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => router.push(`/dashboard/${workspaceId}/leads`)}
                          className="h-12 px-8 rounded-xl border-muted-foreground/20 font-bold"
                        >
                          View Hub
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>

              <CardFooter className="bg-muted/30 border-t py-4 px-6">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  <ShieldCheck className="w-4 h-4 text-primary animate-pulse" />
                  Military-Grade Encryption Active
                </div>
              </CardFooter>
            </Card>

            {/* Side Info Cards */}
            <div className="space-y-6">
              <Card className="border-none bg-primary/5 shadow-none group">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-black uppercase tracking-widest flex items-center gap-2 text-primary">
                    <Zap className="w-4 h-4 fill-current animate-bounce" />
                    How it works
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-[11px] text-muted-foreground space-y-4 font-bold uppercase leading-relaxed">
                  <p className="flex items-start gap-2"><span className="text-primary">01</span> Authorize LAPS via HubSpot OAuth.</p>
                  <p className="flex items-start gap-2"><span className="text-primary">02</span> Fetch up to 100 active contacts.</p>
                  <p className="flex items-start gap-2"><span className="text-primary">03</span> Automatic Pipeline Mapping.</p>
                </CardContent>
              </Card>

              {/* Status Dot Interactive */}
              <div className="px-6 py-4 rounded-2xl bg-secondary/20 border border-border flex items-center gap-3">
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest italic text-muted-foreground">API Status: Healthy</span>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}