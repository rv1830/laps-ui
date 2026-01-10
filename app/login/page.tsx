"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Zap, Mail, Lock, ArrowRight, ShieldCheck, Sparkles, Globe, ChevronLeft, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";
import { authService } from "@/services/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await authService.login(formData);
      toast.success("Welcome back!");

      if (res.nextStep === "SETUP_PROFILE") {
        router.push("/setup-profile");
      } else if (res.nextStep === "CREATE_WORKSPACE") {
        router.push("/create-workspace");
      } else if (res.nextStep === "DASHBOARD" && res.workspaces && res.workspaces.length > 0) {
        const workspaceId = res.workspaces[0].id;
        router.push(`/dashboard/${workspaceId}`);
      } else {
        router.push("/login");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-background overflow-hidden selection:bg-primary/30 transition-colors duration-300">
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-12 relative z-10 bg-background/80 backdrop-blur-sm">
        
        {/* Back Arrow Button */}
        <div className="absolute top-6 left-6 z-20">
          <Link href="/" className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors group">
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>

        <div className="absolute top-6 right-6 flex items-center gap-4">
          <ThemeToggle />
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mx-auto w-full max-w-sm">
          <Link href="/" className="flex items-center gap-2 mb-12 group w-fit">
            <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shadow-lg shadow-primary/5 group-hover:bg-primary/20 transition-all">
              <Zap className="w-6 h-6 text-primary" />
            </motion.div>
            <span className="text-2xl font-black tracking-tighter text-foreground">LAPS</span>
          </Link>

          <div className="mb-10">
            <h1 className="text-3xl font-bold tracking-tight mb-2 text-foreground">Welcome back</h1>
            <p className="text-muted-foreground flex items-center gap-2 text-sm">
              <ShieldCheck className="w-4 h-4 text-primary" /> Secure AI-Powered Access
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            {/* Google Button with Official Colors */}
            <Button variant="outline" className="w-full gap-2 h-12 border-border/60 hover:bg-muted/50 transition-all bg-transparent text-foreground" size="lg">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </Button>

            {/* Microsoft Button with Official Colors */}
            <Button variant="outline" className="w-full gap-2 h-12 border-border/60 hover:bg-muted/50 transition-all bg-transparent text-foreground" size="lg">
              <svg className="w-5 h-5" viewBox="0 0 23 23">
                <path fill="#f35325" d="M1 1h10v10H1z"/><path fill="#81bc06" d="M12 1h10v10H12z"/><path fill="#05a6f0" d="M1 12h10v10H1z"/><path fill="#ffba08" d="M12 12h10v10H12z"/>
              </svg>
              Microsoft
            </Button>
          </div>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border/50" /></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-4 text-muted-foreground font-medium tracking-widest">Digital ID</span></div>
          </div>

          <form className="space-y-5" onSubmit={handleLogin}>
            <div className="grid gap-2">
              <Label htmlFor="email">Work Email</Label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input 
                  id="email" type="email" placeholder="name@laps.ai" className="pl-10 h-12 bg-muted/30 focus:bg-background border-border/60 transition-all text-foreground" required 
                  value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/forgot-password" title="Forgot Password" className="text-xs text-primary font-medium hover:text-primary/80">
                  Reset key?
                </Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  className="pl-10 pr-10 h-12 bg-muted/30 focus:bg-background border-border/60 transition-all text-foreground" required 
                  value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                {/* Eye Toggle for Password */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
              <Button type="submit" disabled={loading} className="w-full h-12 text-base font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all cursor-pointer">
                {loading ? "Entering..." : "Enter Dashboard"} <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          </form>

          <p className="mt-10 text-center text-sm text-muted-foreground">New to the engine? <Link href="/signup" className="text-primary font-bold hover:underline decoration-2 underline-offset-4">Create ID</Link></p>
        </motion.div>
      </div>

      {/* Right Column (Aesthetic Side) */}
      <div className="hidden lg:flex flex-1 relative bg-slate-50 dark:bg-slate-950 items-center justify-center overflow-hidden transition-colors duration-500">
        <div className="absolute inset-0">
          <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 8, repeat: Infinity }} className="absolute top-[-10%] right-[-10%] w-[80%] h-[80%] bg-primary/20 rounded-full blur-[120px]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        </div>
        <div className="relative z-10 max-w-lg text-center px-8">
          <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 100, delay: 0.2 }} className="w-24 h-24 rounded-3xl bg-background border border-border flex items-center justify-center mx-auto mb-10 shadow-2xl relative">
            <Zap className="w-12 h-12 text-primary fill-primary/20" />
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="absolute inset-0 border-2 border-dashed border-primary/30 rounded-3xl scale-125" />
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-6 leading-tight">Powering the Future of <span className="text-primary">Sales Intelligence</span></motion.h2>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="flex flex-col gap-4">
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">Join 5,000+ teams automating their entire sales loop with LAPS engine.</p>
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-white/60 uppercase tracking-tighter transition-colors"><Globe className="w-4 h-4 text-primary" /> Global Scale</div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-white/60 uppercase tracking-tighter transition-colors"><Sparkles className="w-4 h-4 text-primary" /> AI Optimized</div>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end opacity-10 dark:opacity-20 pointer-events-none transition-opacity">
          <div className="text-[120px] font-black text-slate-900 dark:text-white select-none tracking-tighter italic">LAPS</div>
          <div className="h-32 w-[1px] bg-gradient-to-t from-primary/50 to-transparent" />
        </div>
      </div>
    </div>
  );
}