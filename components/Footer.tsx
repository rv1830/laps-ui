"use client";

import { Zap, Github, Twitter, Linkedin, Slack, Globe, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const Footer = () => {
  const links = {
    Product: [
      { name: "Features", href: "#features" },
      { name: "Pricing", href: "#pricing" },
      { name: "Integrations", href: "#integrations" },
      { name: "How it Works", href: "#how-it-works" }
    ],
    Resources: [
      { name: "Documentation", href: "/docs" },
      { name: "API Reference", href: "/api-docs" },
      { name: "Community", href: "#" },
      { name: "Blog", href: "/blog" }
    ],
    Legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "Security", href: "/security" }
    ],
  };

  return (
    <footer className="relative bg-background border-t border-border/40 overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <motion.div 
                whileHover={{ rotate: 5, scale: 1.1 }}
                className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-all"
              >
                <Zap className="w-5 h-5 text-primary fill-primary/20" />
              </motion.div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tighter text-foreground uppercase italic">LAPS</span>
                <span className="text-[10px] text-primary font-bold uppercase tracking-widest -mt-1">AI Sales Engine</span>
              </div>
            </Link>
            
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm font-medium">
              The centralized sales execution cockpit. We help solo founders and agencies automate their entire sales loop without losing the human touch.
            </p>

            <div className="flex gap-3">
              {[Twitter, Linkedin, Github, Slack].map((Icon, i) => (
                <motion.a 
                  key={i} 
                  href="#" 
                  whileHover={{ y: -3 }}
                  className="w-10 h-10 rounded-xl bg-muted/50 border border-border/60 flex items-center justify-center hover:bg-primary/10 hover:border-primary/30 transition-all group"
                >
                  <Icon className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title} className="space-y-5">
              <h4 className="font-bold text-[11px] uppercase tracking-[0.2em] text-foreground/50">{title}</h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.name}>
                    <Link 
                      href={item.href} 
                      className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium flex items-center group"
                    >
                      <span className="w-0 h-px bg-primary group-hover:w-3 transition-all mr-0 group-hover:mr-2" />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6 text-[12px] font-bold text-muted-foreground/60 uppercase tracking-widest">
            <p>© {new Date().getFullYear()} LAPS Engine</p>
            <div className="flex items-center gap-2">
               <Globe className="w-3.5 h-3.5" /> Made for Sellers Global
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/20 text-[10px] font-black uppercase text-emerald-500 tracking-tighter shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              All Systems Operational
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase text-muted-foreground/40 tracking-widest">
               <ShieldCheck className="w-4 h-4" /> ISO 27001 Compliant
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;