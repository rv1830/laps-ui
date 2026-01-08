"use client";

import React, { useRef } from "react";
import { 
  Users, Mail, Calendar, FileText, 
  ArrowRight, CheckCircle, Sparkles, MoveRight 
} from "lucide-react";
import { motion, useScroll, useSpring } from "framer-motion";

const HowItWorks = () => {
  const containerRef = useRef(null);
  
  // Scroll animation for the timeline line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const steps = [
    {
      number: "01",
      icon: Users,
      title: "Capture & Qualify Leads",
      description: "AI-driven lead ingestion from any source. Automatically score and prioritize high-intent prospects using digital footprint analysis.",
      features: ["Smart deduplication", "AI qualification", "Source tracking"],
      color: "from-blue-500 to-cyan-400",
      glow: "bg-blue-500/20"
    },
    {
      number: "02",
      icon: Mail,
      title: "Nurture with Autopilot",
      description: "Deploy mood-aware email sequences that adapt based on recipient sentiment. Choose between manual oversight or full AI autonomy.",
      features: ["Personalized sequences", "Reply detection", "Approval workflows"],
      color: "from-purple-500 to-pink-500",
      glow: "bg-purple-500/20"
    },
    {
      number: "03",
      icon: Calendar,
      title: "Schedule & Present",
      description: "Frictionless booking synced with your global calendar. AI prepares agendas and product decks before you even hop on the call.",
      features: ["Calendar sync", "Booking pages", "Reminder automation"],
      color: "from-orange-500 to-amber-400",
      glow: "bg-orange-500/20"
    },
    {
      number: "04",
      icon: FileText,
      title: "Close & Get Paid",
      description: "Close deals with smart proposals and instant invoicing. Payment links integrated directly so revenue hits your account instantly.",
      features: ["Proposal templates", "Invoice generation", "Payment integration"],
      color: "from-emerald-500 to-teal-400",
      glow: "bg-emerald-500/20"
    },
  ];

  return (
    <section id="how-it-works" ref={containerRef} className="relative py-32 bg-background overflow-hidden">
      {/* Background Decorative Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">The Blueprint</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 leading-tight">
            The Complete <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Sales Loop.</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            From first touch to settled invoice, LAPS orchestrates every movement of your sales cycle with military precision.
          </p>
        </div>

        {/* Timeline Content */}
        <div className="relative">
          
          {/* Central Timeline Line (Desktop) */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-border/40 -translate-x-1/2 hidden lg:block overflow-hidden">
            <motion.div 
              style={{ scaleY }}
              className="absolute top-0 left-0 right-0 h-full bg-gradient-to-b from-primary via-blue-500 to-emerald-500 origin-top"
            />
          </div>

          <div className="space-y-20 lg:space-y-40">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;

              return (
                <div key={step.number} className="relative">
                  
                  {/* Step Row */}
                  <div className={`flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-0`}>
                    
                    {/* Content Card Side */}
                    <motion.div 
                      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8, type: "spring" }}
                      className={`w-full lg:w-[45%] ${!isEven ? 'lg:order-2' : ''}`}
                    >
                      <div className={`group relative p-8 rounded-[2.5rem] bg-card/40 backdrop-blur-xl border border-border/50 hover:border-primary/40 transition-all duration-500 overflow-hidden`}>
                        {/* Glow Effect */}
                        <div className={`absolute -top-24 -right-24 w-48 h-48 ${step.glow} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity`} />
                        
                        <div className="flex items-center gap-6 mb-6">
                           <span className="text-5xl font-black text-primary/10 tracking-tighter group-hover:text-primary/20 transition-colors uppercase italic leading-none">{step.number}</span>
                           <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} p-px`}>
                              <div className="w-full h-full bg-background rounded-[14px] flex items-center justify-center">
                                 <step.icon className="w-7 h-7 text-foreground" />
                              </div>
                           </div>
                        </div>

                        <h3 className="text-2xl font-black tracking-tight mb-4 text-foreground">{step.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-8">{step.description}</p>

                        {/* Features Tags */}
                        <div className="flex flex-wrap gap-2">
                          {step.features.map((feature) => (
                            <div key={feature} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/10">
                              <CheckCircle className="w-3.5 h-3.5 text-primary" />
                              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>

                    {/* Timeline Center Dot */}
                    <div className="absolute left-1/2 -translate-x-1/2 hidden lg:flex items-center justify-center z-20">
                      <motion.div 
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        className={`w-12 h-12 rounded-full bg-background border-2 border-border flex items-center justify-center ring-8 ring-background`}
                      >
                         <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${step.color} shadow-[0_0_15px_rgba(0,0,0,0.2)]`} />
                      </motion.div>
                    </div>

                    {/* Visual Decor / Empty Side (Desktop) */}
                    <div className={`hidden lg:block w-[45%] ${isEven ? 'lg:order-2 pl-20' : 'lg:order-1 pr-20 text-right'}`}>
                       <motion.div
                         initial={{ opacity: 0, scale: 0.8 }}
                         whileInView={{ opacity: 1, scale: 1 }}
                         className="flex flex-col items-center justify-center opacity-20 group"
                       >
                          <step.icon className="w-32 h-32 text-primary/40 stroke-[1px]" />
                          <div className={`h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent mt-8`} />
                       </motion.div>
                    </div>

                  </div>

                  {/* Mobile Connecting Arrow */}
                  {index !== steps.length - 1 && (
                    <div className="flex justify-center py-10 lg:hidden">
                      <motion.div 
                        animate={{ y: [0, 10, 0] }} 
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="p-3 rounded-full bg-primary/10 text-primary border border-primary/20"
                      >
                        <MoveRight className="w-6 h-6 rotate-90" />
                      </motion.div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Final Connector Text */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-32 text-center"
        >
           <div className="inline-flex items-center gap-4 px-8 py-6 rounded-[2.5rem] bg-primary text-primary-foreground shadow-2xl shadow-primary/40">
              <span className="text-lg font-bold">Ready to close the loop?</span>
              <div className="w-8 h-px bg-white/30" />
              <ArrowRight className="w-6 h-6" />
           </div>
        </motion.div>

      </div>
    </section>
  );
};

export default HowItWorks;