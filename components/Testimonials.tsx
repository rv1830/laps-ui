"use client";

import React from "react";
import { Star, Quote, Sparkles, Heart } from "lucide-react";
import { motion } from "framer-motion";

const Testimonials = () => {
  const testimonials = [
    {
      quote: "LAPS replaced our CRM, Calendly, and email tool. We went from 5 sales meetings a week to 25 without adding headcount. The automation is genuinely game-changing.",
      author: "Sarah Chen",
      role: "VP of Sales",
      company: "TechFlow",
      avatar: "SC",
      color: "from-blue-500/20 to-cyan-500/20"
    },
    {
      quote: "The AI qualification saved us hundreds of hours. It correctly identifies hot leads 90% of the time, so my team only focuses on prospects ready to buy.",
      author: "Marcus Johnson",
      role: "Sales Director",
      company: "ScaleUp Inc",
      avatar: "MJ",
      color: "from-purple-500/20 to-pink-500/20"
    },
    {
      quote: "We were paying $800/month for 6 different tools. LAPS gave us everything in one place for a fraction of the cost. The proposal generator alone was worth switching.",
      author: "Emily Rodriguez",
      role: "Founder",
      company: "Velocity Agency",
      avatar: "ER",
      color: "from-emerald-500/20 to-teal-500/20"
    },
    {
      quote: "Finally, an automation tool that lets me stay in control. The Assisted mode means nothing goes out without my approval, but I still save 10+ hours per week.",
      author: "David Kim",
      role: "Consultant",
      company: "Growth Partners",
      avatar: "DK",
      color: "from-orange-500/20 to-amber-500/20"
    },
    {
      quote: "The booking links + automatic reminders cut our no-show rate from 30% to 5%. That's real money back in our pipeline every single month.",
      author: "Lisa Thompson",
      role: "Head of Sales",
      company: "CloudNine",
      avatar: "LT",
      color: "from-rose-500/20 to-red-500/20"
    },
    {
      quote: "I was skeptical about another 'all-in-one' tool, but LAPS actually delivers. The workflow builder is more powerful than Zapier for sales-specific use cases.",
      author: "Alex Rivera",
      role: "CEO",
      company: "Momentum Labs",
      avatar: "AR",
      color: "from-indigo-500/20 to-blue-500/20"
    },
  ];

  return (
    <section id="testimonials" className="relative py-32 bg-background overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 backdrop-blur-sm"
          >
            <Heart className="w-4 h-4 text-primary fill-primary/20" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Wall of Love</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 leading-tight text-foreground">
            Trusted by the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Fastest Growing Teams.</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Don't just take our word for it. Join 5,000+ sales leaders who've built their empire on the LAPS engine.
          </p>
        </div>

        {/* Testimonials Masonry-ish Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="break-inside-avoid"
            >
              <div className="group relative p-8 rounded-[2rem] bg-card/40 backdrop-blur-xl border border-border/50 hover:border-primary/40 transition-all duration-500 overflow-hidden">
                
                {/* Hover Glow Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Stars & Quote Icon */}
                <div className="relative z-10 flex justify-between items-start mb-6">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-primary/10 group-hover:text-primary/20 transition-colors" />
                </div>

                {/* Quote Text */}
                <p className="relative z-10 text-foreground/90 leading-relaxed font-medium text-sm mb-8 italic">
                  "{testimonial.quote}"
                </p>

                {/* Author Info */}
                <div className="relative z-10 flex items-center gap-4 pt-6 border-t border-border/40">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${testimonial.color} p-px`}>
                    <div className="w-full h-full bg-background rounded-[14px] flex items-center justify-center">
                       <span className="text-xs font-black text-foreground tracking-tighter">{testimonial.avatar}</span>
                    </div>
                  </div>
                  <div>
                    <div className="font-black text-foreground text-sm tracking-tight">{testimonial.author}</div>
                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-0.5">
                      {testimonial.role} <span className="text-primary/40 mx-1">•</span> {testimonial.company}
                    </div>
                  </div>
                </div>

                {/* Subtle Decorative Sparkle */}
                <Sparkles className="absolute -bottom-2 -right-2 w-12 h-12 text-primary/5 group-hover:text-primary/10 transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Global Social Proof Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 py-10 border-y border-border/40 flex flex-col md:flex-row items-center justify-center gap-12 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
        >
           <span className="text-2xl font-black italic tracking-tighter">TechFlow</span>
           <span className="text-2xl font-black italic tracking-tighter">ScaleUp</span>
           <span className="text-2xl font-black italic tracking-tighter">Velocity</span>
           <span className="text-2xl font-black italic tracking-tighter">Momentum</span>
           <span className="text-2xl font-black italic tracking-tighter">CloudNine</span>
        </motion.div>

      </div>
    </section>
  );
};

export default Testimonials;