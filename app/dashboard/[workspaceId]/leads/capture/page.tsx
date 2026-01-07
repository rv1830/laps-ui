"use client"

import { useState } from "react"
import { TopHeader } from "@/components/layout/top-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { FileCode, Link2, Webhook, Plus, Copy, ExternalLink, Settings } from "lucide-react"

const captureSources = [
  { id: "1", name: "Website Contact Form", type: "form", leads: 48, status: "active" },
  { id: "2", name: "Landing Page A", type: "form", leads: 23, status: "active" },
  { id: "3", name: "Blog CTA", type: "link", leads: 12, status: "active" },
  { id: "4", name: "Typeform Integration", type: "integration", leads: 89, status: "active" },
]

export default function LeadCapturePage() {
  const [webhookUrl] = useState("https://api.laps.io/webhooks/leads/abc123xyz")

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="flex flex-col h-full">
      <TopHeader
        title="Lead Capture Sources"
        subtitle="Manage forms, tracking links, and integrations"
        actions={
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            New Source
          </Button>
        }
      />

      <div className="flex-1 overflow-y-auto p-6">
        <Tabs defaultValue="sources" className="space-y-6">
          <TabsList>
            <TabsTrigger value="sources">Sources</TabsTrigger>
            <TabsTrigger value="forms">Native Forms</TabsTrigger>
            <TabsTrigger value="links">Tracking Links</TabsTrigger>
            <TabsTrigger value="webhook">Webhook/API</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>

          {/* Sources List */}
          <TabsContent value="sources" className="space-y-4">
            {captureSources.map((source) => (
              <Card key={source.id}>
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      {source.type === "form" && <FileCode className="h-5 w-5 text-primary" />}
                      {source.type === "link" && <Link2 className="h-5 w-5 text-primary" />}
                      {source.type === "integration" && <Webhook className="h-5 w-5 text-primary" />}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{source.name}</p>
                      <p className="text-sm text-muted-foreground capitalize">{source.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="font-medium text-foreground">{source.leads}</p>
                      <p className="text-xs text-muted-foreground">Leads captured</p>
                    </div>
                    <Badge variant={source.status === "active" ? "default" : "secondary"} className="capitalize">
                      {source.status}
                    </Badge>
                    <Button variant="ghost" size="icon">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Native Forms */}
          <TabsContent value="forms">
            <Card>
              <CardHeader>
                <CardTitle>Create a Native Form</CardTitle>
                <CardDescription>Build a lightweight form to capture leads directly</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Form Name</Label>
                      <Input placeholder="Contact Form" />
                    </div>
                    <div className="space-y-2">
                      <Label>Redirect URL (after submission)</Label>
                      <Input placeholder="https://yoursite.com/thank-you" />
                    </div>
                    <div className="space-y-4">
                      <Label>Form Fields</Label>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <span className="text-sm text-foreground">Name</span>
                          <Badge>Required</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <span className="text-sm text-foreground">Email</span>
                          <Badge>Required</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <span className="text-sm text-foreground">Phone</span>
                          <Badge variant="outline">Optional</Badge>
                        </div>
                        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                          <Plus className="h-4 w-4" /> Add Field
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <Label>Preview</Label>
                    <div className="p-6 bg-muted rounded-lg space-y-4">
                      <div className="space-y-2">
                        <Label className="text-sm">Name *</Label>
                        <Input placeholder="John Doe" className="bg-card" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm">Email *</Label>
                        <Input placeholder="john@example.com" className="bg-card" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm">Phone</Label>
                        <Input placeholder="+1 555 000 0000" className="bg-card" />
                      </div>
                      <Button className="w-full">Submit</Button>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <Button variant="outline">Save as Draft</Button>
                  <Button>Create Form</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tracking Links */}
          <TabsContent value="links">
            <Card>
              <CardHeader>
                <CardTitle>Tracking Links</CardTitle>
                <CardDescription>Generate unique links to track lead sources and campaigns</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Link Name</Label>
                      <Input placeholder="LinkedIn Campaign Q4" />
                    </div>
                    <div className="space-y-2">
                      <Label>Destination URL</Label>
                      <Input placeholder="https://yoursite.com/landing" />
                    </div>
                    <div className="space-y-2">
                      <Label>UTM Source</Label>
                      <Input placeholder="linkedin" />
                    </div>
                    <div className="space-y-2">
                      <Label>UTM Campaign</Label>
                      <Input placeholder="q4-outreach" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <Label>Generated Link</Label>
                    <div className="p-4 bg-muted rounded-lg">
                      <code className="text-sm text-foreground break-all">
                        https://go.laps.io/l/abc123?utm_source=linkedin&utm_campaign=q4-outreach
                      </code>
                    </div>
                    <Button variant="outline" className="gap-2 bg-transparent">
                      <Copy className="h-4 w-4" /> Copy Link
                    </Button>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button>Create Tracking Link</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Webhook/API */}
          <TabsContent value="webhook">
            <Card>
              <CardHeader>
                <CardTitle>Webhook Endpoint</CardTitle>
                <CardDescription>Send leads to LAPS from any external service</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Your Webhook URL</Label>
                  <div className="flex gap-2">
                    <Input value={webhookUrl} readOnly className="font-mono text-sm" />
                    <Button variant="outline" onClick={() => copyToClipboard(webhookUrl)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Sample Payload</Label>
                  <pre className="p-4 bg-muted rounded-lg text-sm overflow-x-auto">
                    {`{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1 555 000 0000",
  "company": "Acme Inc",
  "source": "my-app",
  "custom_fields": {
    "budget": "10000",
    "timeline": "Q1 2025"
  }
}`}
                  </pre>
                </div>

                <div className="p-4 bg-muted rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Secret Token Validation</p>
                      <p className="text-sm text-muted-foreground">
                        Require a secret token in the Authorization header
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Input value="sk_live_xxxxxxxxxxxxxxxxxxxx" readOnly type="password" className="font-mono text-sm" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Integrations */}
          <TabsContent value="integrations">
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: "Typeform", connected: true, leads: 89 },
                { name: "Tally", connected: false, leads: 0 },
                { name: "Google Forms", connected: false, leads: 0 },
                { name: "Webflow", connected: true, leads: 34 },
                { name: "Zapier", connected: false, leads: 0 },
                { name: "Make", connected: false, leads: 0 },
              ].map((integration) => (
                <Card key={integration.name}>
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                        <ExternalLink className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{integration.name}</p>
                        {integration.connected && (
                          <p className="text-sm text-muted-foreground">{integration.leads} leads captured</p>
                        )}
                      </div>
                    </div>
                    {integration.connected ? (
                      <Badge className="bg-success/10 text-success">Connected</Badge>
                    ) : (
                      <Button variant="outline" size="sm">
                        Connect
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
