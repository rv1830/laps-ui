"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ShieldCheck, Eye, Lock, Database, ArrowRight } from "lucide-react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

export default function PrivacyPolicy() {
    const sections = [
        {
            icon: Eye,
            title: "Data We Collect",
            content: "LAPS collects data to provide you with the best sales automation experience. This includes Identity Data (name, email), Communication Data (via Google/Outlook OAuth), and Lead Data you import."
        },
        {
            icon: Database,
            title: "How We Use Data",
            content: "We do not sell your data. We use it to automate follow-up sequences, qualify leads using AI (Mood/Intent scoring), and generate proposals on your behalf."
        },
        {
            icon: Lock,
            title: "Data Security",
            content: "We use industry-standard AES-256 encryption. Your payment data is never stored on LAPS; it is handled directly by Stripe or Razorpay."
        }
    ];

    return (
        <div className="min-h-screen bg-background relative overflow-hidden selection:bg-primary/30">
            {/* Background Decor */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />

            {/* Navigation */}
            <div className="container mx-auto px-6 py-8 flex justify-between items-center relative z-20">
                <Link href="/" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-all group">
                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Home
                </Link>
                <ThemeToggle />
            </div>

            <main className="container mx-auto px-6 pb-24 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto"
                >
                    {/* Header Card */}
                    <div className="bg-card border border-border/60 p-10 rounded-[2.5rem] shadow-2xl mb-8 relative overflow-hidden">
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />

                        <div className="flex flex-col items-center text-center mb-10">
                            <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
                                <ShieldCheck className="w-8 h-8 text-primary" />
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black tracking-tighter italic uppercase mb-4">Privacy Policy</h1>
                            <p className="text-muted-foreground font-medium">Last Updated: January 2025 • LAPS Identity Protection</p>
                        </div>

                        <div className="grid gap-6">
                            {sections.map((section, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="p-6 rounded-2xl bg-muted/30 border border-border/40 hover:border-primary/30 transition-all group"
                                >
                                    <div className="flex items-center gap-4 mb-3">
                                        <section.icon className="w-5 h-5 text-primary" />
                                        <h3 className="font-black uppercase tracking-widest text-sm">{section.title}</h3>
                                    </div>
                                    <p className="text-muted-foreground text-sm leading-relaxed">{section.content}</p>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-12 p-8 rounded-3xl bg-primary/5 border border-primary/10 text-center">
                            <p className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-4">Questions about your data?</p>
                            <Button variant="outline" className="rounded-xl font-bold">Contact Privacy Team</Button>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}