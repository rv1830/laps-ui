"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Sparkles, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const CTA = () => {
  const benefits = [
    "14-day free trial",
    "No credit card",
    "Cancel anytime",
  ];

  return (
    <section className="relative py-32 overflow-hidden bg-background">
      {/* --- NEXT-LEVEL GRID BACKGROUND --- */}
      <div className="absolute inset-0 z-0">
        {/* Animated Grid Pattern */}
        <div 
          className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" 
        />
        {/* Radial Glow behind the grid */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.05)_0%,transparent_70%)] pointer-events-none" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto relative group"
        >
          {/* --- EXTERNAL CARD SHADOW/GLOW --- */}
          <div className="absolute -inset-4 bg-primary/10 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          
          {/* Main Card Border with Glow */}
          <div className="relative p-[1px] rounded-[2.5rem] bg-gradient-to-br from-primary/40 via-border/50 to-primary/10 shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden">
            
            {/* Inner Content Card (Glass Layer) */}
            <div className="relative p-8 sm:p-12 lg:p-14 rounded-[2.4rem] bg-card/90 backdrop-blur-3xl overflow-hidden">
              
              {/* Internal Corner Glows */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative text-center z-10">
                {/* Badge */}
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-8 cursor-default"
                >
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Instant Onboarding</span>
                </motion.div>

                {/* Headline */}
                <h2 className="text-3xl sm:text-5xl font-black tracking-tighter mb-6 leading-[1.1] text-foreground">
                  Ready to Close the <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">Sales Loop?</span>
                </h2>

                <p className="text-base text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed font-medium">
                  Join 5,000+ high-performance teams. Consolidate your tech stack into the LAPS engine and start closing more deals today.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
                  <Button asChild size="lg" className="h-14 px-8 rounded-2xl text-sm font-bold shadow-xl shadow-primary/20 group/btn w-full sm:w-auto active:scale-95 transition-transform">
                    <Link href="/signup" className="flex items-center">
                      Start Free Trial
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  
                  <Button asChild variant="outline" size="lg" className="h-14 px-8 rounded-2xl text-sm font-bold border-border/60 backdrop-blur-sm w-full sm:w-auto hover:bg-muted/50 active:scale-95 transition-transform">
                    <Link href="/login">Book Demo</Link>
                  </Button>
                </div>

                {/* Benefits List */}
                <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 pt-8 border-t border-border/40">
                  {benefits.map((benefit) => (
                    <div key={benefit} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground/70">
                      <div className="p-0.5 rounded-full bg-primary/10">
                        <CheckCircle className="w-3.5 h-3.5 text-primary" />
                      </div>
                      {benefit}
                    </div>
                  ))}
                </div>

                {/* Infrastructure Note */}
                <div className="mt-8 flex items-center justify-center gap-2 text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground/40">
                   <ShieldCheck className="w-3 h-3" /> Enterprise Grade Infrastructure
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;