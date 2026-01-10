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
  Moon, 
  Sun,
  Database
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "next-themes"; // Assuming you use next-themes

export default function HubSpotIntegrationPage() {
  const { workspaceId } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { theme, setTheme } = useTheme();

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
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Dynamic Header */}
      <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Settings2 className="w-5 h-5 text-primary" />
            </div>
            <nav className="flex items-center space-x-1 text-sm font-medium text-muted-foreground">
              <span className="hover:text-foreground cursor-pointer">Workspace</span>
              <ArrowRight className="w-3 h-3" />
              <span className="text-foreground">Integrations</span>
            </nav>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full"
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </header>

      <main className="container max-w-5xl mx-auto py-12 px-4">
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
            <p className="text-lg text-muted-foreground max-w-2xl">
              Connect LAPS with the world&apos;s leading CRM tools to automate lead capture and streamline your sales pipeline.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Main Integration Card */}
            <Card className="md:col-span-2 overflow-hidden border-primary/20 bg-gradient-to-b from-card to-secondary/10 shadow-xl">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-16 h-16 bg-[#ff7a59] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#ff7a59]/20 transform -rotate-3 group-hover:rotate-0 transition-transform">
                        <span className="font-black text-2xl">H</span>
                      </div>
                      <div className="absolute -bottom-1 -right-1 bg-background p-1 rounded-full border">
                         <Zap className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      </div>
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-bold">HubSpot CRM</CardTitle>
                      <CardDescription className="flex items-center gap-2">
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
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="space-y-4"
                    >
                      <div className="bg-muted/50 p-4 rounded-xl border border-dashed border-muted-foreground/30">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Link your HubSpot workspace to import contacts, companies, and deals directly into LAPS. We support OAuth 2.0 for maximum security.
                        </p>
                      </div>
                      <Button
                        onClick={handleConnect}
                        disabled={isConnecting}
                        className="w-full md:w-auto px-8 h-12 bg-[#ff7a59] hover:bg-[#ff7a59]/90 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-[#ff7a59]/30 cursor-pointer"
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
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center gap-3 p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                        <div className="p-2 bg-emerald-500 rounded-full">
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-foreground text-emerald-700 dark:text-emerald-400">Connection Verified</p>
                          <p className="text-xs text-muted-foreground">Successfully linked to HubSpot API</p>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button
                          onClick={handleImportLeads}
                          disabled={loading}
                          className="flex-1 h-12 text-md font-bold shadow-lg shadow-primary/20"
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
                          className="h-12 px-8 rounded-xl border-muted-foreground/20"
                        >
                          View Current Leads
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>

              <CardFooter className="bg-muted/30 border-t py-4 px-6">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  Your data is encrypted. We only access contacts you choose to import.
                </div>
              </CardFooter>
            </Card>

            {/* Side Info Cards */}
            <div className="space-y-6">
              <Card className="border-none bg-primary/5 shadow-none">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-bold flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" />
                    How it works
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-xs text-muted-foreground space-y-3">
                  <p>1. Authorize LAPS via HubSpot OAuth.</p>
                  <p>2. Fetch up to 100 active contacts in one click.</p>
                  <p>3. Leads are automatically mapped to your first pipeline stage.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}