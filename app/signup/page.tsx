"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Zap, Mail, Lock, User, ArrowRight, CheckCircle, ShieldCheck, Sparkles, Globe } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";

export default function Signup() {
  const benefits = [
    "14-day free trial", 
    "No credit card required", 
    "Full feature access"
  ];

  return (
    <div className="min-h-screen flex bg-background text-foreground transition-colors duration-300 overflow-hidden selection:bg-primary/30">
      
      {/* Left - Registration Form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-12 relative z-10 bg-background/80 backdrop-blur-sm">
        
        {/* Decorative Background for Light Mode */}
        <div className="absolute inset-0 z-[-1] overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 dark:bg-primary/10 rounded-full blur-[100px]" />
        </div>

        <div className="absolute top-6 right-6 flex items-center gap-4">
          <ThemeToggle />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto w-full max-w-sm"
        >
          <Link href="/" className="flex items-center gap-2 mb-8 group w-fit">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shadow-lg shadow-primary/5 group-hover:bg-primary/20 transition-all"
            >
              <Zap className="w-5 h-5 text-primary" />
            </motion.div>
            <span className="text-xl font-black tracking-tighter text-foreground">LAPS</span>
          </Link>

          <h1 className="text-3xl font-bold tracking-tight mb-2 text-foreground">Create account</h1>
          <p className="text-muted-foreground mb-8 flex items-center gap-2 text-sm">
            <Sparkles className="w-4 h-4 text-primary" /> Start your 14-day free trial today
          </p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <Button variant="outline" className="w-full gap-2 h-11 border-border/60 bg-card hover:bg-accent transition-all text-foreground" size="lg">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </Button>
            <Button variant="outline" className="w-full gap-2 h-11 border-border/60 bg-card hover:bg-accent transition-all text-foreground" size="lg">
              <svg className="w-5 h-5" viewBox="0 0 23 23">
                <path fill="#f35325" d="M1 1h10v10H1z"/>
                <path fill="#81bc06" d="M12 1h10v10H12z"/>
                <path fill="#05a6f0" d="M1 12h10v10H1z"/>
                <path fill="#ffba08" d="M12 12h10v10H12z"/>
              </svg>
              Microsoft
            </Button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border/50" /></div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold">
              <span className="bg-background px-4 text-muted-foreground/60">Digital Onboarding</span>
            </div>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-foreground text-xs font-bold uppercase tracking-wider">Full name</Label>
              <div className="relative group">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input id="name" placeholder="John Doe" className="pl-10 h-11 bg-muted/20 focus:bg-background border-border/60 transition-all text-foreground" required />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-foreground text-xs font-bold uppercase tracking-wider">Work email</Label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input id="email" type="email" placeholder="you@company.com" className="pl-10 h-11 bg-muted/20 focus:bg-background border-border/60 transition-all text-foreground" required />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password" className="text-foreground text-xs font-bold uppercase tracking-wider">Password</Label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input id="password" type="password" placeholder="8+ characters" className="pl-10 h-11 bg-muted/20 focus:bg-background border-border/60 transition-all text-foreground" required />
              </div>
            </div>
            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
              <Button type="submit" className="w-full h-11 text-base font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all mt-2">
                Create account <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground font-medium">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-bold hover:underline decoration-2 underline-offset-4">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Right - Adaptive Branding/Marketing Section */}
      <div className="hidden lg:flex flex-1 relative bg-slate-50 dark:bg-slate-950 items-center justify-center overflow-hidden transition-colors duration-500">
        
        <div className="absolute inset-0">
          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute top-0 right-0 w-full h-full bg-primary/20 dark:bg-primary/10 rounded-full blur-[120px]" 
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        </div>

        <div className="relative z-10 max-w-md px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-16 h-16 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center mb-8 shadow-xl relative"
          >
            <Zap className="w-8 h-8 text-primary fill-primary/10" />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-6px] border border-dashed border-primary/20 rounded-[1.25rem]"
            />
          </motion.div>

          <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-4 leading-tight transition-colors">
            Start selling <span className="text-primary font-serif italic font-medium">smarter</span> today
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed font-medium transition-colors">
            Join 2,000+ sales teams using LAPS to automate their pipeline.
          </p>
          
          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                key={benefit} 
                className="flex items-center gap-3 p-4 bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl backdrop-blur-sm shadow-sm transition-colors group hover:border-primary/30"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
                <span className="font-semibold text-slate-700 dark:text-slate-200 transition-colors">{benefit}</span>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-white/10 flex items-center gap-8 opacity-40 grayscale">
             <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-tighter text-slate-900 dark:text-white"><Globe className="w-4 h-4" /> Global</div>
             <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-tighter text-slate-900 dark:text-white"><ShieldCheck className="w-4 h-4" /> Trusted</div>
             <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-tighter text-slate-900 dark:text-white"><Zap className="w-4 h-4" /> Instant</div>
          </div>
        </div>

        <div className="absolute bottom-10 right-10 opacity-10 dark:opacity-20 pointer-events-none">
          <div className="text-[100px] font-black text-slate-900 dark:text-white select-none tracking-tighter italic">LAPS</div>
        </div>
      </div>
    </div>
  );
}