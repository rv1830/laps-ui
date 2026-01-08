"use client";

import React from "react";
import { 
  Bot, Mail, Users, BarChart3, Zap, Calendar,
  FileText, Shield, Workflow, Target, Clock, Sparkles 
} from "lucide-react";
import { motion } from "framer-motion";

const Features = () => {
  const features = [
    {
      icon: Users,
      title: "Lead Management",
      description: "Centralized database with smart deduplication and visual pipeline boards. Never lose track of a prospect.",
      color: "from-blue-500/20 to-cyan-500/20",
      textColor: "text-blue-500",
      span: "md:col-span-1"
    },
    {
      icon: Bot,
      title: "AI-Powered Qualification",
      description: "Intelligent lead scoring with mood detection and intent analysis. Know exactly who's ready to buy and when to reach out.",
      color: "from-primary/20 to-purple-500/20",
      textColor: "text-primary",
      span: "md:col-span-2" 
    },
    {
      icon: Mail,
      title: "Email Sequences",
      description: "Automated multi-step campaigns with personalization and A/B testing.",
      color: "from-orange-500/20 to-yellow-500/20",
      textColor: "text-orange-500",
      span: "md:col-span-1"
    },
    {
      icon: Workflow,
      title: "Automation Engine",
      description: "Native triggers and actions. Build workflows that run in Manual or Autopilot modes.",
      color: "from-purple-500/20 to-indigo-500/20",
      textColor: "text-purple-500",
      span: "md:col-span-1"
    },
    {
      icon: Calendar,
      title: "Smart Scheduling",
      description: "Built-in booking links, calendar sync, and automatic no-show recovery.",
      color: "from-blue-600/20 to-blue-400/20",
      textColor: "text-blue-400",
      span: "md:col-span-1"
    },
    {
      icon: FileText,
      title: "Proposals & Invoices",
      description: "Generate branded proposals and collect payments directly via Stripe or Razorpay.",
      color: "from-emerald-500/20 to-teal-500/20",
      textColor: "text-emerald-500",
      span: "md:col-span-2"
    },
    {
      icon: Target,
      title: "Lead Capture",
      description: "Native form builder and webhook integrations with Typeform, Webflow, and more.",
      color: "from-rose-500/20 to-pink-500/20",
      textColor: "text-rose-500",
      span: "md:col-span-1"
    },
    {
      icon: BarChart3,
      title: "Funnel Analytics",
      description: "Track conversion rates, time-to-response, and full revenue attribution.",
      color: "from-cyan-500/20 to-blue-500/20",
      textColor: "text-cyan-500",
      span: "md:col-span-1"
    },
    {
      icon: Shield,
      title: "Compliance Built-in",
      description: "Consent management and suppression lists to stay out of spam folders.",
      color: "from-slate-500/20 to-slate-400/20",
      textColor: "text-slate-400",
      span: "md:col-span-1"
    }
  ];

  return (
    <section id="features" className="relative py-24 bg-background overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary)/0.08)_0%,transparent_50%)] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Everything you need</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 leading-tight">
            One Engine. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Infinite Possibilities.</span>
          </h2>
          
          <p className="text-lg text-muted-foreground leading-relaxed">
            Stop juggling 10 different subscriptions. LAPS unifies your entire sales tech stack into one powerful, AI-driven command center.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className={`group relative p-8 rounded-[2.5rem] bg-card/40 backdrop-blur-xl border border-border/50 hover:border-primary/40 transition-all duration-500 overflow-hidden ${feature.span}`}
            >
              {/* Card Hover Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              {/* Icon Container */}
              <div className="relative z-10 mb-10">
                <div className="w-14 h-14 rounded-2xl bg-background border border-border flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                  <feature.icon className={`w-7 h-7 ${feature.textColor}`} />
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-xl font-black tracking-tight mb-3 text-foreground group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-foreground/80 transition-colors">
                  {feature.description}
                </p>
              </div>

              {/* Background Decor Icon */}
              <Zap className={`absolute -bottom-4 -right-4 w-24 h-24 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity ${feature.textColor}`} />
            </motion.div>
          ))}
        </div>

        {/* Bottom Stats Badge */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 flex justify-center"
        >
          <div className="inline-flex items-center gap-6 px-8 py-4 rounded-[2rem] bg-card/50 border border-border/60 shadow-2xl backdrop-blur-md">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-sm font-bold tracking-tight">15 Min Setup</span>
            </div>
            <div className="w-px h-4 bg-border" />
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-bold tracking-tight">Enterprise Grade Security</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Features;