"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, Play, Zap, TrendingUp, Users, 
  Mail, Calendar, FileText, CheckCircle, MousePointer2 
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const Hero = () => {
  const stats = [
    { icon: Users, value: "48", label: "New Leads", change: "+12%", color: "text-blue-500" },
    { icon: Mail, value: "156", label: "Contacted", change: "+8%", color: "text-purple-500" },
    { icon: Calendar, value: "18", label: "Calls Booked", change: "+22%", color: "text-amber-500" },
    { icon: FileText, value: "5", label: "Won Deals", change: "+50%", color: "text-emerald-500" },
  ];

  const features = [
    "AI Lead Qualification",
    "Auto Email Sequences",
    "Smart Scheduling",
    "Smart Proposals",
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-32 pb-20 bg-background">
      {/* --- ADVANCED BACKGROUND --- */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px]" />
        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* --- LEFT COLUMN: CONTENT --- */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-8 backdrop-blur-md"
            >
              <Zap className="w-4 h-4 text-primary fill-primary/20" />
              <span className="text-xs font-bold tracking-widest uppercase text-primary">v2.0 is now live</span>
            </motion.div>

            <h1 className="text-5xl lg:text-7xl font-black tracking-tighter mb-6 leading-[0.9] text-foreground">
              Automate Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-500 to-primary bg-[size:200%] animate-gradient">
                Sales Engine
              </span>
            </h1>

            <p className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-xl">
              LAPS unifies your entire sales loop. From high-intent lead capture to automated closing—powered by AI sales intelligence.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Button asChild size="lg" className="h-14 px-8 rounded-2xl bg-primary text-primary-foreground shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all font-bold group">
                <Link href="/signup">
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="h-14 px-8 rounded-2xl border-border/60 backdrop-blur-sm font-bold group hover:bg-muted/50">
                <Play className="w-4 h-4 mr-2 fill-primary text-primary" />
                Watch Demo
              </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 opacity-50 grayscale hover:grayscale-0 transition-all duration-500 cursor-default">
               {['TechFlow', 'ScaleUp', 'Velocity', 'Acme'].map((brand) => (
                 <span key={brand} className="text-lg font-black tracking-tighter italic">{brand}</span>
               ))}
            </div>
          </motion.div>

          {/* --- RIGHT COLUMN: ENHANCED DASHBOARD --- */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative perspective-1000 lg:block hidden"
          >
            {/* Floating Elements */}
            <motion.div 
              animate={{ y: [0, -15, 0] }} 
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 z-20 bg-background/80 backdrop-blur-xl border border-border p-4 rounded-2xl shadow-2xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 font-bold">
                  $
                </div>
                <div>
                  <p className="text-[10px] uppercase font-black text-muted-foreground">Revenue Growth</p>
                  <p className="text-lg font-bold text-foreground">+42.5%</p>
                </div>
              </div>
            </motion.div>

            {/* Main Card */}
            <div className="relative group overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-b from-white/10 to-white/5 dark:from-white/5 dark:to-transparent backdrop-blur-2xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)]">
              
              {/* Card Header */}
              <div className="px-8 py-6 border-b border-white/10 flex items-center justify-between bg-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 ring-4 ring-primary/10">
                    <Zap className="w-6 h-6 text-white fill-white/20" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg leading-none">Command Center</h3>
                    <div className="flex items-center gap-2 mt-1">
                       <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                       <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">AI Loop Active</p>
                    </div>
                  </div>
                </div>
                <MousePointer2 className="w-5 h-5 text-primary animate-bounce" />
              </div>

              {/* Card Body */}
              <div className="p-8">
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, idx) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + idx * 0.1 }}
                      className="p-5 rounded-[1.5rem] bg-background/40 border border-white/5 hover:border-primary/40 transition-all group/stat relative overflow-hidden"
                    >
                      {/* Subtle Hover Glow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover/stat:opacity-100 transition-opacity" />
                      
                      <div className={`p-2 rounded-lg ${stat.color} bg-current/10 w-fit mb-4`}>
                        <stat.icon className="w-5 h-5" />
                      </div>
                      <div className="relative z-10">
                        <div className="text-3xl font-black tracking-tighter mb-1">{stat.value}</div>
                        <div className="text-xs font-medium text-muted-foreground mb-3">{stat.label}</div>
                        <div className="flex items-center gap-1.5 text-[10px] font-black bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded-full w-fit">
                          <TrendingUp className="w-3 h-3" />
                          {stat.change}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Bottom Bar Feature */}
                <div className="mt-8 p-4 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-between">
                   <div className="flex items-center gap-3 text-sm font-bold">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      AI Lead Scored: 98/100
                   </div>
                   <div className="text-[10px] uppercase font-black text-primary hover:underline cursor-pointer">View Report</div>
                </div>
              </div>
            </div>

            {/* Background Glows for the card */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl z-[-1]" />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;