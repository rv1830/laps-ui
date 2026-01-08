"use client";

import React from "react";
import { CheckCircle, Sparkles, Terminal, Cpu, Share2, Zap } from "lucide-react";
import { motion } from "framer-motion";

const Integrations = () => {
  const integrationGroups = [
    {
      title: "Email & Calendar",
      description: "Seamless sync with your workflow",
      integrations: ["Gmail", "Outlook", "Google Cal", "iCal"],
      color: "from-blue-500/10 to-blue-600/10",
    },
    {
      title: "Lead Capture",
      description: "Import leads instantly",
      integrations: ["Typeform", "Tally", "Webflow", "Zapier"],
      color: "from-purple-500/10 to-indigo-600/10",
    },
    {
      title: "Payments",
      description: "Direct-to-bank settlements",
      integrations: ["Stripe", "Razorpay", "PayPal", "Wise"],
      color: "from-emerald-500/10 to-teal-600/10",
    },
    {
      title: "Meetings",
      description: "Virtual closing rooms",
      integrations: ["Zoom", "Meet", "Teams", "Webex"],
      color: "from-orange-500/10 to-amber-600/10",
    },
  ];

  return (
    <section id="integrations" className="relative py-32 bg-background overflow-hidden">
      {/* --- DECORATIVE BACKGROUND --- */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:30px_30px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 backdrop-blur-sm"
          >
            <Share2 className="w-4 h-4 text-primary" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Connected Ecosystem</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 leading-tight">
            One Engine. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">All Your Tools.</span>
          </h2>
          
          <p className="text-lg text-muted-foreground leading-relaxed">
            LAPS doesn't replace your favorites—it superpowers them. Connect your stack in clicks, not weeks.
          </p>
        </div>

        {/* Integration Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {integrationGroups.map((group, idx) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className={`relative group p-8 rounded-[2.5rem] bg-card/40 backdrop-blur-xl border border-border/50 hover:border-primary/40 transition-all duration-500 overflow-hidden`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${group.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
              
              <div className="relative z-10">
                <h3 className="text-lg font-black tracking-tight text-foreground mb-1">{group.title}</h3>
                <p className="text-xs text-muted-foreground mb-8 font-medium italic">{group.description}</p>
                
                <div className="grid grid-cols-2 gap-3">
                  {group.integrations.map((item) => (
                    <div
                      key={item}
                      className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-background/50 border border-border/40 group-hover:bg-background transition-all"
                    >
                      <div className="w-10 h-10 rounded-xl bg-muted/30 flex items-center justify-center font-black text-primary/40 text-[10px] tracking-tighter border border-border/40 uppercase group-hover:text-primary transition-colors">
                        {item.substring(0, 2)}
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- DEV SECTION: API & WEBHOOKS --- */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-20 max-w-4xl mx-auto"
        >
          <div className="relative p-1 rounded-[3rem] bg-gradient-to-r from-primary/20 via-blue-500/20 to-primary/20 shadow-2xl overflow-hidden group">
             {/* Animated Line Effect */}
             <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)] -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
             
             <div className="relative p-8 sm:p-12 rounded-[2.8rem] bg-card/90 backdrop-blur-3xl flex flex-col lg:flex-row items-center gap-10">
                <div className="flex-1 text-center lg:text-left">
                   <div className="inline-flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-[0.3em] mb-4">
                      <Terminal className="w-4 h-4" /> Developer Focused
                   </div>
                   <h3 className="text-3xl font-black tracking-tighter mb-4 text-foreground">Custom Logic? We got you.</h3>
                   <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-md">
                     Use our robust REST API and real-time Webhooks to build bespoke sales automations that fit your unique business model perfectly.
                   </p>
                   
                   <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                      {["Full REST API", "Webhooks", "SDKs"].map((feature) => (
                        <div key={feature} className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10">
                           <CheckCircle className="w-3.5 h-3.5 text-primary" />
                           <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                   </div>
                </div>

                <div className="w-full lg:w-72 h-48 rounded-[2rem] bg-zinc-950 p-6 font-mono text-[10px] text-primary/80 border border-white/5 shadow-inner overflow-hidden relative">
                   <div className="flex gap-2 mb-4 opacity-50">
                      <div className="w-2 h-2 rounded-full bg-red-500" />
                      <div className="w-2 h-2 rounded-full bg-amber-500" />
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                   </div>
                   <div className="space-y-1">
                      <p><span className="text-purple-400">POST</span> /api/v1/loops</p>
                      <p className="text-zinc-500">{"{"}</p>
                      <p className="pl-4">"lead_id": <span className="text-emerald-400">"usr_9821"</span>,</p>
                      <p className="pl-4">"trigger": <span className="text-emerald-400">"close_deal"</span></p>
                      <p className="text-zinc-500">{"}"}</p>
                      <motion.div 
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                        className="inline-block w-1 h-3 bg-primary ml-1" 
                      />
                   </div>
                   <Zap className="absolute bottom-4 right-4 w-12 h-12 text-primary opacity-5" />
                </div>
             </div>
          </div>
        </motion.div>

        {/* --- BOTTOM CTA --- */}
        <div className="mt-20 text-center">
           <p className="text-muted-foreground text-xs font-medium italic">
             + 2,000 more via Zapier & n8n
           </p>
        </div>
      </div>
    </section>
  );
};

export default Integrations;