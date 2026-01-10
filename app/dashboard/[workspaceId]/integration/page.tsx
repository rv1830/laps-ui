"use client";

import { useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { integrationService } from "@/services/integration";
import { Button } from "@/components/ui/button"; // Shadcn
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react"; // Icons for better UI

export default function HubSpotIntegrationPage() {
  const { workspaceId } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  // URL se check kar rahe hain ki kya user just authorize karke aaya hai
  const isConnected = searchParams.get("hubspot_connected") === "true";

  // Step 1: Redirect to HubSpot OAuth
  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      const { url } = await integrationService.getHubSpotAuthUrl(workspaceId as string);
      window.location.href = url;
    } catch (err) {
      toast.error("HubSpot connection start karne mein error aaya");
    } finally {
      setIsConnecting(false);
    }
  };

  // Step 2: Import Leads after successful connection
  const handleImportLeads = async () => {
    setLoading(true);
    try {
      const response = await integrationService.importHubSpotContacts(workspaceId as string);
      toast.success(response.message || "Contacts successfully import ho gaye!");

      // Success ke baad Leads dashboard par bhej do
      router.push(`/dashboard/${workspaceId}/leads`);
    } catch (error) {
      console.error(error);
      toast.error("Contacts sync karne mein dikkat aayi, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Integrations</h1>
        <p className="text-muted-foreground">Apne external tools ko LAPS ke saath connect karein.</p>
      </header>

      <div className="border rounded-xl bg-white shadow-sm overflow-hidden">
        {/* Header Section */}
        <div className="p-6 border-b bg-slate-50/50 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#ff7a59] rounded-lg flex items-center justify-center text-white">
              <span className="font-bold text-xl">H</span>
            </div>
            <div>
              <h2 className="text-lg font-bold">HubSpot CRM</h2>
              <p className="text-sm text-gray-500">Sync contacts and manage leads automatically.</p>
            </div>
          </div>
          {isConnected && (
            <span className="flex items-center gap-1 text-xs font-medium bg-green-100 text-green-700 px-2.5 py-0.5 rounded-full">
              <CheckCircle2 className="w-3 h-3" /> Connected
            </span>
          )}
        </div>

        {/* Action Body */}
        <div className="p-8">
          {!isConnected ? (
            <div className="max-w-md">
              <h3 className="font-semibold mb-2">Connect your account</h3>
              <p className="text-sm text-gray-600 mb-6">
                HubSpot connect karne ke baad aap apne saare contacts ko ek click mein LAPS CRM mein la sakte hain.
              </p>
              <Button
                onClick={handleConnect}
                disabled={isConnecting}
                className="bg-[#ff7a59] hover:bg-[#ff8f73] text-white"
              >
                {isConnecting ? "Redirecting..." : "Connect HubSpot"}
              </Button>
            </div>
          ) : (
            <div className="max-w-md">
              <div className="flex items-center gap-2 text-green-700 mb-4">
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-medium">Authorization Successful!</span>
              </div>
              <p className="text-sm text-gray-600 mb-6">
                Aapka HubSpot account link ho chuka hai. Ab aap niche diye gaye button se sync start kar sakte hain.
              </p>

              <div className="flex gap-3">
                <Button
                  onClick={handleImportLeads}
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {loading ? "Syncing Data..." : "Import All Contacts Now"}
                </Button>

                <Button variant="outline" onClick={() => router.push(`/dashboard/${workspaceId}/leads`)}>
                  Go to Leads
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div className="px-6 py-4 bg-gray-50 border-t">
          <p className="text-xs text-gray-500 text-center">
            By connecting, you agree to allow LAPS to read your HubSpot contact data.
          </p>
        </div>
      </div>
    </div>
  );
}