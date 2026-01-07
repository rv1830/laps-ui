"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Zap, User, Calendar, Phone, ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";
import { authService } from "@/services/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function SetupProfile() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    phoneNumber: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await authService.setupProfile(formData);
      toast.success("Profile updated successfully!");
      
      // Backend logic: Dashboard ya Workspace creation pe redirect
      if (res.nextStep === 'DASHBOARD') {
        router.push('/dashboard');
      } else {
        router.push('/create-workspace');
      }
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-background overflow-hidden selection:bg-primary/30">
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-24 relative z-10 bg-background/80 backdrop-blur-sm transition-colors duration-300">
        <div className="absolute top-6 left-6 flex items-center gap-2">
           <Zap className="w-6 h-6 text-primary" />
           <span className="text-xl font-bold tracking-tighter">LAPS</span>
        </div>
        
        <div className="absolute top-6 right-6">
          <ThemeToggle />
        </div>

        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mx-auto w-full max-w-md"
        >
          <div className="mb-10">
            <h1 className="text-4xl font-black tracking-tight mb-3 text-foreground italic uppercase">Step 02</h1>
            <h2 className="text-2xl font-bold text-foreground mb-2">Initialize Your Identity</h2>
            <p className="text-muted-foreground text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" /> We need a few more details to calibrate your engine.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="firstName" className="text-xs font-bold uppercase tracking-widest">First Name</Label>
                <div className="relative group">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input 
                    id="firstName" placeholder="John" className="pl-10 h-12 bg-muted/20 border-border/60" required 
                    value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastName" className="text-xs font-bold uppercase tracking-widest">Last Name</Label>
                <Input 
                  id="lastName" placeholder="Doe" className="h-12 bg-muted/20 border-border/60" required 
                  value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="dob" className="text-xs font-bold uppercase tracking-widest">Date of Birth</Label>
              <div className="relative group">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input 
                  id="dob" type="date" className="pl-10 h-12 bg-muted/20 border-border/60" required 
                  value={formData.dob} onChange={(e) => setFormData({...formData, dob: e.target.value})}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-widest">Phone Number</Label>
              <div className="relative group">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input 
                  id="phone" type="tel" placeholder="+91 00000 00000" className="pl-10 h-12 bg-muted/20 border-border/60" required 
                  value={formData.phoneNumber} onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                />
              </div>
            </div>

            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
              <Button type="submit" disabled={loading} className="w-full h-14 text-lg font-black shadow-xl shadow-primary/20 transition-all uppercase tracking-widest italic">
                {loading ? "Syncing Data..." : "Complete Integration"} <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          </form>

          <p className="mt-8 text-center text-xs text-muted-foreground flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4" /> Your data is encrypted and processed via LAPS Secure-Core
          </p>
        </motion.div>
      </div>

      {/* Right side - Visual block */}
      <div className="hidden lg:flex flex-1 relative bg-slate-950 items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-50" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>
        
        <div className="relative z-10 text-center">
          <motion.div
            animate={{ 
              rotateY: [0, 360],
              filter: ["hue-rotate(0deg)", "hue-rotate(90deg)"] 
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-64 h-64 border-2 border-primary/30 rounded-full flex items-center justify-center backdrop-blur-3xl"
          >
            <Zap className="w-32 h-32 text-primary drop-shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
          </motion.div>
          <h3 className="mt-12 text-2xl font-black text-white tracking-widest uppercase italic">Neural Sync in Progress</h3>
          <div className="mt-4 flex justify-center gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <motion.div 
                key={i}
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                className="w-2 h-2 bg-primary rounded-full"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}