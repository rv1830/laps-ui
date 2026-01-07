"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {
    Building2,
    Globe,
    Users,
    Clock,
    Briefcase,
    Plus,
    Sparkles,
    Rocket
} from "lucide-react";
import { motion } from "framer-motion";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ThemeToggle from "@/components/ThemeToggle";

export default function CreateWorkspace() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        industry: "",
        website: "",
        companySize: "",
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC"
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Direct API call since we need 'workspace' prefix based on your routes
            const res = await api.post('/workspaces', formData);
            toast.success("Workspace & Pipeline created successfully!");
            router.push("/dashboard");
        } catch (err: any) {
            toast.error(err.response?.data?.error || "Failed to create workspace");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-background selection:bg-primary/30">
            {/* Left Column: Branding & Info */}
            <div className="hidden lg:flex w-[40%] bg-muted/30 border-r border-border flex-col p-12 justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-primary rounded-full blur-[100px]" />
                </div>

                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-12">
                        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                            <Rocket className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <span className="text-2xl font-black tracking-tighter">LAPS</span>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h1 className="text-4xl font-bold tracking-tight mb-6">
                            Establish your <span className="text-primary italic">Command Center.</span>
                        </h1>
                        <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                            Creating a workspace automatically initializes 9 professional sales stages,
                            AI-driven lead enrichment, and your dedicated neural pipeline.
                        </p>

                        <div className="space-y-6">
                            {[
                                { icon: Sparkles, text: "Automated 9-Stage Pipeline" },
                                { icon: Globe, text: "Global Compliance (GDPR Ready)" },
                                { icon: Briefcase, text: "Industry-Specific AI Drafting" }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4 text-sm font-semibold">
                                    <div className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center">
                                        <item.icon className="w-4 h-4 text-primary" />
                                    </div>
                                    {item.text}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                <div className="text-xs text-muted-foreground font-mono uppercase tracking-widest">
                    laps
                </div>
            </div>

            {/* Right Column: Form */}
            <div className="flex-1 flex flex-col justify-center p-6 lg:p-24 relative">
                <div className="absolute top-6 right-6">
                    <ThemeToggle />
                </div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="max-w-md w-full mx-auto"
                >
                    <div className="mb-10 text-center lg:text-left">
                        <h2 className="text-3xl font-bold mb-2">Workspace Configuration</h2>
                        <p className="text-muted-foreground">Define the environment for your sales operations.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name" className="text-xs font-bold uppercase tracking-widest">Workspace Name</Label>
                            <div className="relative group">
                                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                <Input
                                    id="name" placeholder="Acme Corp Sales" className="pl-10 h-12 bg-muted/20 border-border/60" required
                                    value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label className="text-xs font-bold uppercase tracking-widest">Industry</Label>
                                <Select onValueChange={(val) => setFormData({ ...formData, industry: val })}>
                                    <SelectTrigger className="h-12 bg-muted/20 border-border/60">
                                        <SelectValue placeholder="SaaS" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="saas">SaaS</SelectItem>
                                        <SelectItem value="fintech">Fintech</SelectItem>
                                        <SelectItem value="healthcare">Healthcare</SelectItem>
                                        <SelectItem value="agency">Agency</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid gap-2">
                                <Label className="text-xs font-bold uppercase tracking-widest">Company Size</Label>
                                <Select onValueChange={(val) => setFormData({ ...formData, companySize: val })}>
                                    <SelectTrigger className="h-12 bg-muted/20 border-border/60">
                                        <SelectValue placeholder="1-10" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1-10">1-10</SelectItem>
                                        <SelectItem value="11-50">11-50</SelectItem>
                                        <SelectItem value="51-200">51-200</SelectItem>
                                        <SelectItem value="201+">201+</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="website" className="text-xs font-bold uppercase tracking-widest">Company Website</Label>
                            <div className="relative group">
                                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                <Input
                                    id="website" placeholder="https://acme.ai" className="pl-10 h-12 bg-muted/20 border-border/60"
                                    value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="timezone" className="text-xs font-bold uppercase tracking-widest">Operations Timezone</Label>
                            <div className="relative group">
                                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                <Input
                                    id="timezone" value={formData.timezone} disabled className="pl-10 h-12 bg-muted/5 border-border/40 opacity-70"
                                />
                            </div>
                        </div>

                        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                            <Button type="submit" disabled={loading} className="w-full h-14 text-lg font-bold shadow-2xl shadow-primary/20 transition-all">
                                {loading ? "Deploying Workspace..." : "Initialize Workspace"} <Plus className="w-5 h-5 ml-2" />
                            </Button>
                        </motion.div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}