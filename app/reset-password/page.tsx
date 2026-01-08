"use client";

import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Zap, Lock, ShieldCheck, ArrowRight, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import { authService } from "@/services/auth";
import { toast } from "sonner";
import ThemeToggle from "@/components/ThemeToggle";
import Link from "next/link";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [loading, setLoading] = useState(false);
  const [passwords, setPasswords] = useState({ newPassword: "", confirmPassword: "" });

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      return toast.error("Passwords do not match!");
    }
    if (!token) return toast.error("Invalid or expired token link.");

    setLoading(true);
    try {
      await authService.resetPassword({ token, newPassword: passwords.newPassword });
      toast.success("Password updated successfully!");
      router.push("/login");
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-background items-center justify-center p-6 relative selection:bg-primary/30">
      {/* Top Navigation Bar */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20">
        <Link 
          href="/login" 
          className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors group"
        >
          <div className="p-2 rounded-lg group-hover:bg-primary/10 transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </div>
          Back to Login
        </Link>
        <ThemeToggle />
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="w-full max-w-md bg-card border border-border/60 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden transition-colors duration-300"
      >
        {/* Glow Effect */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col items-center mb-10 relative z-10">
          <motion.div 
            whileHover={{ scale: 1.05, rotate: -5 }}
            className="w-20 h-20 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 shadow-inner shadow-primary/5"
          >
            <ShieldCheck className="w-10 h-10 text-primary" />
          </motion.div>
          <h1 className="text-3xl font-black tracking-tight text-foreground">Secure Reset</h1>
          <p className="text-muted-foreground text-sm mt-2 text-center">
            Create a unique password to protect your LAPS account
          </p>
        </div>

        <form onSubmit={handleReset} className="space-y-5 relative z-10">
          <div className="grid gap-2">
            <Label htmlFor="newPassword">New Password</Label>
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input 
                id="newPassword" 
                type="password" 
                placeholder="••••••••"
                className="pl-10 h-12 bg-muted/30 focus:bg-background border-border/60 transition-all text-foreground" 
                required 
                value={passwords.newPassword} 
                onChange={(e) => setPasswords({...passwords, newPassword: e.target.value})}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input 
                id="confirmPassword" 
                type="password" 
                placeholder="••••••••"
                className="pl-10 h-12 bg-muted/30 focus:bg-background border-border/60 transition-all text-foreground" 
                required 
                value={passwords.confirmPassword} 
                onChange={(e) => setPasswords({...passwords, confirmPassword: e.target.value})}
              />
            </div>
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button 
              disabled={loading} 
              className="w-full h-14 mt-4 text-base font-bold shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all"
            >
              {loading ? "Re-encrypting..." : "Update Password"} 
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </form>

        <div className="mt-8 pt-6 border-t border-border/40 text-center">
          <p className="text-xs text-muted-foreground flex items-center justify-center gap-2">
             <Zap className="w-3 h-3 text-primary" /> End-to-end encrypted password reset
          </p>
        </div>
      </motion.div>
    </div>
  );
}