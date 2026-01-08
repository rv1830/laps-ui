"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, Scale, Zap, Ban, CreditCard, Info } from "lucide-react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

export default function TermsOfService() {
  const rules = [
    {
      icon: Zap,
      title: "Account & Automation",
      text: "You are responsible for your LAPS ID. By enabling 'Autopilot', you authorize LAPS to send emails and schedule meetings on your behalf."
    },
    {
      icon: Ban,
      title: "Compliance",
      text: "Users must comply with local laws (CAN-SPAM, GDPR). LAPS provides unsubscribe handling and suppression lists to protect your reputation."
    },
    {
      icon: CreditCard,
      title: "Payments",
      text: "LAPS is a subscription engine. Invoices are generated per deal, but LAPS never holds your funds—payments go directly to your integrated provider."
    }
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.03)_0%,transparent_70%)]" />
      
      <div className="container mx-auto px-6 py-8 flex justify-between items-center relative z-20">
        <Link href="/" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-all group">
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Home
        </Link>
        <ThemeToggle />
      </div>

      <main className="container mx-auto px-6 pb-24 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-card border border-border/60 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            
            <div className="flex flex-col items-center text-center mb-10">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
                <Scale className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter italic uppercase mb-4">Terms of Service</h1>
              <p className="text-muted-foreground font-medium italic">Standard Operating Procedures for LAPS Engine</p>
            </div>

            <div className="space-y-4">
              {rules.map((rule, i) => (
                <div key={i} className="flex gap-6 p-6 rounded-3xl hover:bg-muted/30 transition-colors group">
                  <div className="w-12 h-12 rounded-2xl bg-background border border-border flex items-center justify-center flex-shrink-0 group-hover:border-primary/50 transition-colors">
                    <rule.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-black uppercase tracking-widest text-sm mb-2">{rule.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{rule.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-border/40 flex items-center justify-center gap-4">
              <Info className="w-4 h-4 text-primary" />
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                By using LAPS, you agree to these automated loop protocols.
              </p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}