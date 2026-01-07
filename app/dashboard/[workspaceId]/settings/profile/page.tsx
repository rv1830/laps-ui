"use client"

import { useEffect, useState } from "react"
import { authService } from "@/services/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    User, Mail, Phone, Calendar, Globe, Shield,
    Clock, Hash, CheckCircle2, XCircle
} from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export default function ProfilePage() {
    const [userData, setUserData] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await authService.checkStatus()
                setUserData(res.user)
            } catch (error) {
                console.error("Error fetching profile:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchProfile()
    }, [])

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
    )

    if (!userData) return <div>User not found.</div>

    return (
        <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
            {/* Header Card */}
            <Card className="overflow-hidden border-none shadow-xl bg-gradient-to-br from-sidebar to-background">
                <CardContent className="p-8">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="relative">
                            <Avatar className="h-24 w-24 border-4 border-primary/20 shadow-2xl">
                                <AvatarImage src={userData.avatar} />
                                <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">
                                    {userData.firstName?.[0]}{userData.lastName?.[0]}
                                </AvatarFallback>
                            </Avatar>
                            <div className="absolute -bottom-1 -right-1 bg-background p-1 rounded-full border border-border">
                                {userData.isActive ? (
                                    <CheckCircle2 className="h-5 w-5 text-green-500 fill-green-500/10" />
                                ) : (
                                    <XCircle className="h-5 w-5 text-destructive" />
                                )}
                            </div>
                        </div>

                        <div className="text-center md:text-left space-y-2">
                            <h1 className="text-3xl font-bold tracking-tight">
                                {userData.firstName} {userData.lastName}
                            </h1>
                            <div className="flex flex-wrap justify-center md:justify-start gap-2">
                                <Badge variant="secondary" className="bg-primary/10 text-primary border-none">
                                    <Shield className="w-3 h-3 mr-1" /> Authorized User
                                </Badge>
                                <Badge variant="outline" className="text-muted-foreground uppercase text-[10px] tracking-widest">
                                    {userData.timezone || "UTC"}
                                </Badge>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Contact Information */}
                <Card className="border-sidebar-border bg-sidebar/30 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <User className="w-4 h-4 text-primary" /> Personal Identity
                        </CardTitle>
                        <CardDescription>Verified personal details from your ID</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <InfoRow icon={Mail} label="Email Address" value={userData.email} />
                        <InfoRow icon={Phone} label="Phone Number" value={userData.phoneNumber} />
                        <InfoRow
                            icon={Calendar}
                            label="Date of Birth"
                            value={userData.dob ? format(new Date(userData.dob), "PPP") : "Not set"}
                        />
                    </CardContent>
                </Card>

                {/* System Details */}
                <Card className="border-sidebar-border bg-sidebar/30 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Shield className="w-4 h-4 text-primary" /> Account Metadata
                        </CardTitle>
                        <CardDescription>System generated access information</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <InfoRow icon={Hash} label="User ID" value={userData.id} isCode />
                        <InfoRow icon={Clock} label="Last Login" value={userData.lastLoginAt ? format(new Date(userData.lastLoginAt), "PPpp") : "Never"} />
                        <InfoRow icon={Globe} label="Default Timezone" value={userData.timezone || "UTC"} />
                    </CardContent>
                </Card>
            </div>

            {/* Security Status Card */}
            <Card className="border-sidebar-border bg-sidebar/30">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <Shield className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <p className="font-medium">Security Verification</p>
                                <p className="text-sm text-muted-foreground">
                                    Email verification status and connected accounts
                                </p>
                            </div>
                        </div>
                        <Badge variant={userData.emailVerified ? "default" : "destructive"}>
                            {userData.emailVerified ? "Verified" : "Unverified"}
                        </Badge>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

function InfoRow({ icon: Icon, label, value, isCode }: any) {
    return (
        <div className="flex items-start gap-3 py-1">
            <Icon className="w-4 h-4 text-muted-foreground mt-1" />
            <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</p>
                <p className={cn("text-sm font-semibold", isCode && "font-mono text-[11px] bg-muted px-1.5 py-0.5 rounded")}>
                    {value || "Not available"}
                </p>
            </div>
        </div>
    )
}