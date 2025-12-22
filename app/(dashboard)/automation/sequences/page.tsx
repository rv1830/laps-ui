"use client"

import { useState } from "react"
import { TopHeader } from "@/components/layout/top-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Plus, Search, MoreHorizontal, Play, Pause, Copy, Trash2, Mail, Users, TrendingUp } from "lucide-react"
import Link from "next/link"
import { mockSequences } from "@/lib/mock-data"

export default function SequencesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredSequences = mockSequences.filter((s) => s.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="flex flex-col h-full">
      <TopHeader
        title="Email Sequences"
        subtitle="Automated email campaigns for lead nurturing"
        actions={
          <Link href="/automation/sequences/new">
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              New Sequence
            </Button>
          </Link>
        }
      />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-foreground">{mockSequences.length}</p>
                  <p className="text-sm text-muted-foreground">Sequences</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-success/10">
                  <Users className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-foreground">
                    {mockSequences.reduce((acc, s) => acc + s.enrolledCount, 0)}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Enrolled</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-chart-2/10">
                  <TrendingUp className="h-5 w-5 text-chart-2" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-foreground">
                    {Math.round(mockSequences.reduce((acc, s) => acc + s.replyRate, 0) / mockSequences.length)}%
                  </p>
                  <p className="text-sm text-muted-foreground">Avg Reply Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-warning/10">
                  <Mail className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-foreground">
                    {mockSequences.reduce((acc, s) => acc + s.steps.filter((st) => st.type === "email").length, 0)}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Emails</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search sequences..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Sequences List */}
        <div className="space-y-4">
          {filteredSequences.map((sequence) => (
            <Card key={sequence.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Switch checked={sequence.status === "active"} />
                    <div>
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/automation/sequences/${sequence.id}`}
                          className="font-medium text-foreground hover:text-primary"
                        >
                          {sequence.name}
                        </Link>
                        <Badge
                          variant="outline"
                          className={
                            sequence.status === "active"
                              ? "bg-success/10 text-success"
                              : sequence.status === "paused"
                                ? "bg-muted text-muted-foreground"
                                : "bg-warning/10 text-warning"
                          }
                        >
                          {sequence.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {sequence.steps.filter((s) => s.type === "email").length} emails •{" "}
                        {sequence.steps
                          .filter((s) => s.type === "delay")
                          .reduce((acc, s) => acc + (s.delayDays || 0), 0)}{" "}
                        days total
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground">{sequence.enrolledCount} enrolled</p>
                      <p className="text-xs text-muted-foreground">{sequence.replyRate}% reply rate</p>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Play className="mr-2 h-4 w-4" /> Activate
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Pause className="mr-2 h-4 w-4" /> Pause
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="mr-2 h-4 w-4" /> Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
