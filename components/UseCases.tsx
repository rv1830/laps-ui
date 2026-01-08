"use client";

import React from "react";
import { 
  Briefcase, Users, Building2, Rocket, 
  Target, Heart, Sparkles, Quote 
} from "lucide-react";
import { motion } from "framer-motion";

const UseCases = () => {
  const useCases = [
    {
      icon: Users,
      title: "Solo Founders",
      description: "Automate your entire sales loop so you can focus on building, not chasing leads.",
      example: "I book 20+ calls/mo on autopilot.",
      color: "from-blue-500/20 to-cyan-500/20"
    },
    {
      icon: Building2,
      title: "Growth Agencies",
      description: "Standardize your process across multiple pipelines and ensure zero lead leakage.",
      example: "Closed 40% more deals in Q1.",
      color: "from-purple-500/20 to-pink-500/20"
    },
    {
      icon: Briefcase,
      title: "Small Sales Teams",
      description: "One source of truth with role-based permissions and smart approval workflows.",
      example: "5 reps operating like a 15-person team.",
      color: "from-orange-500/20 to-amber-500/20"
    },
    {
      icon: Rocket,
      title: "SaaS Startups",
      description: "Scale outbound without scaling headcount. AI qualification filters the noise.",
      example: "Demo bookings up 300% with same SDRs.",
      color: "from-emerald-500/20 to-teal-500/20"
    },
    {
      icon: Target,
      title: "Coaches & Creators",
      description: "Turn followers into high-ticket clients with automated friction-less booking.",
      example: "Converted list into $50k in sales.",
      color: "from-rose-500/20 to-orange-500/20"
    },
    {
      icon: Heart,
      title: "Service Businesses",
      description: "Manage the entire journey from first inquiry to paid invoice in one cockpit.",
      example: "Cut admin time by 80%. My evenings are back.",
      color: "from-slate-500/20 to-indigo-500/20"
    },
  ];

  return (
    <section id="use-cases" className="relative py-32 bg-background overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Industry Focus</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 leading-tight">
            Built for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Sellers Like You.</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            LAPS isn't a generic tool. It's an adaptable engine designed for the specific pressures of modern selling.
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group relative"
            >
              {/* Card Container */}
              <div className="h-full p-8 rounded-[2.5rem] bg-card/40 backdrop-blur-xl border border-border/50 hover:border-primary/40 transition-all duration-500 flex flex-col relative z-10 overflow-hidden">
                
                {/* Hover Gradient Glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${useCase.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`} />

                {/* Top Row: Icon */}
                <div className="w-14 h-14 rounded-2xl bg-background border border-border flex items-center justify-center mb-8 shadow-xl group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                  <useCase.icon className="w-7 h-7 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-black tracking-tight mb-3 text-foreground transition-colors group-hover:text-primary">
                  {useCase.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-grow">
                  {useCase.description}
                </p>

                {/* Example Quote Badge */}
                <div className="mt-auto relative">
                   <div className="absolute -top-4 -left-2 opacity-10">
                      <Quote className="w-8 h-8 text-primary" />
                   </div>
                   <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 group-hover:bg-primary/10 transition-colors">
                      <p className="text-[11px] font-bold text-primary italic leading-tight tracking-tight">
                        "{useCase.example}"
                      </p>
                   </div>
                </div>
              </div>

              {/* Decorative Beam (Visual effect behind card) */}
              <div className="absolute -inset-px bg-gradient-to-r from-primary/50 to-blue-500/50 rounded-[2.5rem] blur-sm opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;