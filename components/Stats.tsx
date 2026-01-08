"use client";

import React from "react";
import { TrendingUp, Users, Mail, Clock, Zap, Globe, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const Stats = () => {
  const stats = [
    {
      icon: Users,
      value: "2,000+",
      label: "Active Users",
      description: "Global sales teams",
      color: "from-blue-500/20 to-cyan-500/20",
      textColor: "text-blue-500",
    },
    {
      icon: Mail,
      value: "5M+",
      label: "Emails Sent",
      description: "Automated at scale",
      color: "from-purple-500/20 to-pink-500/20",
      textColor: "text-purple-500",
    },
    {
      icon: TrendingUp,
      value: "35%",
      label: "Conversion Lift",
      description: "Above industry avg",
      color: "from-emerald-500/20 to-teal-500/20",
      textColor: "text-emerald-500",
    },
    {
      icon: Clock,
      value: "10hrs",
      label: "Time Saved",
      description: "Weekly per rep",
      color: "from-orange-500/20 to-yellow-500/20",
      textColor: "text-orange-500",
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-background/50 backdrop-blur-sm">
      {/* --- BACKGROUND AESTHETICS --- */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        {/* Subtle dot pattern */}
        <div className="absolute inset-0 opacity-[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" 
             style={{ backgroundImage: "radial-gradient(circle, #808080 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 mb-4">
            <Sparkles className="w-3 h-3 text-primary" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Performance Metrics</span>
          </div>
          <h2 className="text-3xl font-black tracking-tighter">Real results for real teams.</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="relative group p-8 rounded-[2rem] border border-border/50 bg-card/40 backdrop-blur-md overflow-hidden"
            >
              {/* Animated Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              {/* Icon with Ring */}
              <div className="relative z-10 mb-6">
                <div className={`w-14 h-14 rounded-2xl bg-background border border-border flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                  <stat.icon className={`w-7 h-7 ${stat.textColor}`} />
                </div>
              </div>

              {/* Text Content */}
              <div className="relative z-10">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black tracking-tighter text-foreground leading-none">
                    {stat.value}
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                </div>
                
                <div className="mt-4">
                  <div className="text-sm font-bold text-foreground uppercase tracking-wider">
                    {stat.label}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {stat.description}
                  </div>
                </div>
              </div>

              {/* Bottom Decorative Bar */}
              <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${stat.color} w-0 group-hover:w-full transition-all duration-700`} />
            </motion.div>
          ))}
        </div>

        {/* Global Reach Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 flex items-center justify-center gap-4 text-muted-foreground/60"
        >
          <div className="h-px w-12 bg-border" />
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
            <Globe className="w-3 h-3" /> Powered by LAPS Global Infrastructure
          </div>
          <div className="h-px w-12 bg-border" />
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;