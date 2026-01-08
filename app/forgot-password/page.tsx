"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Zap, Mail, ArrowRight, ChevronLeft, Send, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";
import { authService } from "@/services/auth";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.forgotPassword(email);
      setSubmitted(true);
      toast.success("Reset link dispatched!");
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-background items-center justify-center p-6 relative selection:bg-primary/30 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.1, 0.05] }} 
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]" 
        />
      </div>

      {/* Top Navigation */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20">
        <Link 
          href="/login" 
          className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-all group"
        >
          <div className="p-2 rounded-xl group-hover:bg-primary/10 transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </div>
          <span className="hidden sm:inline">Back to Login</span>
        </Link>
        <ThemeToggle />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }} 
        animate={{ opacity: 1, scale: 1, y: 0 }} 
        className="w-full max-w-md bg-card border border-border/60 p-8 rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden transition-colors duration-300"
      >
        {/* Aesthetic Glows */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
        
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <div className="flex flex-col items-center mb-10">
                <motion.div 
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  className="w-20 h-20 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 shadow-inner"
                >
                  <Zap className="w-10 h-10 text-primary fill-primary/10" />
                </motion.div>
                <h1 className="text-3xl font-black tracking-tight text-foreground text-center">Recover Access</h1>
                <p className="text-muted-foreground text-sm mt-3 text-center max-w-[280px]">
                  Enter your email and we'll send a secure digital key to your inbox.
                </p>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid gap-2">
                  <Label htmlFor="email" className="ml-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">Work Email</Label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="name@laps.ai" 
                      className="pl-12 h-14 bg-muted/30 focus:bg-background border-border/60 rounded-2xl transition-all text-foreground" 
                      required 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    type="submit" 
                    disabled={loading} 
                    className="w-full h-14 rounded-2xl text-base font-bold shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all flex items-center justify-center gap-2"
                  >
                    {loading ? "Dispatching..." : "Send Reset Link"} 
                    <Send className="w-4 h-4" />
                  </Button>
                </motion.div>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-4"
            >
              <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold mb-3">Link Sent!</h2>
              <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
                We've sent a recovery link to <br />
                <span className="font-bold text-foreground">{email}</span>. <br />
                Please check your inbox and spam folder.
              </p>
              
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  onClick={() => setSubmitted(false)} 
                  className="w-full h-12 rounded-xl border-border/60"
                >
                  Try another email
                </Button>
                <Link href="/login" className="block text-sm font-bold text-primary hover:underline underline-offset-4 mt-4">
                  Back to Login
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-8 pt-6 border-t border-border/40 text-center">
          <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-2">
            <div className="w-1 h-1 rounded-full bg-primary animate-pulse" />
            LAPS Identity Protection
          </p>
        </div>
      </motion.div>
    </div>
  );
}