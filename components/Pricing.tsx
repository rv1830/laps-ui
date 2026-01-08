"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, Zap, ShieldCheck, Globe, ZapIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);
  const [currency, setCurrency] = useState<"USD" | "INR">("USD");

  const plans = [
    {
      name: "Starter",
      description: "Ideal for solo hunters & freelancers",
      prices: {
        USD: isAnnual ? 29 : 39,
        INR: isAnnual ? 2400 : 3200,
      },
      highlight: false,
      features: ["1 User", "500 Leads/mo", "1,000 Emails", "Basic Sequences", "Calendar Booking"],
      color: "from-blue-500/10 to-transparent",
    },
    {
      name: "Professional",
      description: "Best for high-growth sales teams",
      prices: {
        USD: isAnnual ? 79 : 99,
        INR: isAnnual ? 6500 : 8200,
      },
      highlight: true,
      badge: "Most Popular",
      features: ["5 Users", "5,000 Leads/mo", "10,000 Emails", "AI Lead Scoring", "Workflow Autopilot", "Priority Support"],
      color: "from-primary/20 to-primary/5",
    },
    {
      name: "Enterprise",
      description: "Unrestricted power for large scale",
      prices: {
        USD: isAnnual ? 199 : 249,
        INR: isAnnual ? 16500 : 20500,
      },
      highlight: false,
      features: ["Unlimited Users", "Unlimited Leads", "Global Deliverability", "Custom API Access", "Dedicated Manager", "SLA Guarantee"],
      color: "from-purple-500/10 to-transparent",
    },
  ];

  return (
    <section id="pricing" className="relative py-32 bg-background overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 backdrop-blur-md"
          >
            <ZapIcon className="w-4 h-4 text-primary" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Flexible Investment</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 leading-tight">
            Stop Overpaying. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Start Closing.</span>
          </h2>

          {/* Toggles Container */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12">
            {/* Currency Toggle */}
            <div className="flex p-1 rounded-2xl bg-muted/50 border border-border/60 backdrop-blur-sm">
              <button 
                onClick={() => setCurrency("USD")}
                className={`px-6 py-2 rounded-xl text-xs font-black transition-all ${currency === "USD" ? "bg-background shadow-xl text-primary" : "text-muted-foreground"}`}
              >
                USD
              </button>
              <button 
                onClick={() => setCurrency("INR")}
                className={`px-6 py-2 rounded-xl text-xs font-black transition-all ${currency === "INR" ? "bg-background shadow-xl text-primary" : "text-muted-foreground"}`}
              >
                INR
              </button>
            </div>

            {/* Billing Toggle */}
            <div className="flex items-center gap-4 px-6 py-3 rounded-2xl bg-primary/5 border border-primary/10">
              <span className={`text-xs font-bold ${!isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>Monthly</span>
              <button 
                onClick={() => setIsAnnual(!isAnnual)}
                className="relative w-12 h-6 rounded-full bg-primary/20 transition-colors"
              >
                <motion.div 
                  animate={{ x: isAnnual ? 24 : 4 }}
                  className="absolute top-1 w-4 h-4 rounded-full bg-primary shadow-lg" 
                />
              </button>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold ${isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>Annual</span>
                <span className="px-2 py-0.5 rounded-md bg-emerald-500 text-[10px] font-black text-white animate-pulse">Save 25%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`relative group p-1 rounded-[2.8rem] transition-all duration-500 ${plan.highlight ? 'bg-gradient-to-b from-primary/50 via-primary/10 to-transparent shadow-2xl scale-105 z-20' : 'bg-border/40 hover:bg-border/80'}`}
            >
              <div className="relative h-full p-8 rounded-[2.6rem] bg-card flex flex-col overflow-hidden transition-colors">
                {/* Highlight Glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${plan.color} opacity-30 pointer-events-none`} />

                {plan.badge && (
                  <div className="absolute top-6 right-8">
                    <span className="px-3 py-1 rounded-full bg-primary text-[10px] font-black text-white uppercase tracking-widest">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="relative z-10 mb-8">
                  <h3 className="text-xl font-black tracking-tight mb-2 uppercase italic text-muted-foreground">{plan.name}</h3>
                  <p className="text-xs text-muted-foreground font-medium mb-8 leading-relaxed">{plan.description}</p>
                  
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm font-bold text-muted-foreground uppercase mr-1">
                      {currency === "USD" ? "$" : "₹"}
                    </span>
                    <AnimatePresence mode="wait">
                      <motion.span 
                        key={plan.prices[currency]}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-5xl font-black tracking-tighter"
                      >
                        {plan.prices[currency].toLocaleString()}
                      </motion.span>
                    </AnimatePresence>
                    <span className="text-xs font-bold text-muted-foreground uppercase ml-2">/ month</span>
                  </div>
                </div>

                <div className="space-y-4 mb-10 flex-grow relative z-10">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3 group/item">
                      <div className="p-1 rounded-full bg-primary/10 group-hover/item:bg-primary transition-colors">
                        <Check className="w-3 h-3 text-primary group-hover/item:text-white" />
                      </div>
                      <span className="text-sm font-medium text-muted-foreground group-hover/item:text-foreground transition-colors">{feature}</span>
                    </div>
                  ))}
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="relative z-10">
                  <Button 
                    asChild 
                    variant={plan.highlight ? "default" : "outline"}
                    className={`w-full h-14 rounded-2xl font-bold text-base shadow-xl transition-all ${plan.highlight ? 'shadow-primary/30' : ''}`}
                  >
                    <Link href="/signup">
                      Get Engine Access <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </motion.div>
                
                <div className="mt-6 flex items-center justify-center gap-2 opacity-50 relative z-10">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Secure Checkout</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Global Note */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 flex flex-col items-center gap-6"
        >
          <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-muted/30 border border-border/60">
            <Globe className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Regional pricing adjusted for global accessibility</span>
          </div>
          <p className="text-xs text-muted-foreground/60 font-medium">
            * 14-day full engine trial. No credit card required to start your loop.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

const ArrowRight = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

export default Pricing;