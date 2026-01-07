"use client";

import { Zap, Github, Twitter, Linkedin } from "lucide-react";
import Link from "next/link"; // Next.js Link replacement

const Footer = () => {
  const links = {
    Product: [
      { name: "Features", href: "#features" }, 
      { name: "Pricing", href: "#pricing" }, 
      { name: "Integrations", href: "#integrations" }
    ],
    Company: [
      { name: "About", href: "#" }, 
      { name: "Blog", href: "#" }, 
      { name: "Careers", href: "#" }
    ],
    Resources: [
      { name: "Documentation", href: "#" }, 
      { name: "API", href: "#" }, 
      { name: "Help Center", href: "#" }
    ],
    Legal: [
      { name: "Privacy", href: "#" }, 
      { name: "Terms", href: "#" }, 
      { name: "Security", href: "#" }
    ],
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-8">
          <div className="col-span-2">
            {/* Logo Link fixed to href */}
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:border-primary/40 transition-all">
                <Zap className="w-4 h-4 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold">LAPS</span>
                <span className="text-[9px] text-primary font-medium uppercase -mt-1">AI Sales Engine</span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground mb-4 max-w-xs">
              Centralized sales automation with optional autopilot. Replace your CRM, email tool, and automation stack.
            </p>
            <div className="flex gap-3">
              {[Twitter, Linkedin, Github].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center hover:bg-primary/10 transition-colors"
                >
                  <Icon className="w-4 h-4 text-muted-foreground" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="font-semibold text-sm mb-3">{title}</h4>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.name}>
                    <a 
                      href={item.href} 
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} LAPS. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;