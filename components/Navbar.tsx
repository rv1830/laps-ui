"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Zap, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Pricing", href: "#pricing" },
    { name: "Integrations", href: "#integrations" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] transition-all duration-500 flex justify-center pt-4 px-4 pointer-events-none">
      <nav 
        className={`
          pointer-events-auto
          flex items-center justify-between 
          transition-all duration-500 ease-in-out
          ${scrolled 
            ? "w-full max-w-[1200px] h-14 px-6 rounded-2xl bg-background/70 backdrop-blur-xl border border-border/50 shadow-[0_8px_32px_rgba(0,0,0,0.1)]" 
            : "w-full max-w-[1400px] h-18 px-8 rounded-none bg-transparent border-transparent"
          }
        `}
      >
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-3 group relative">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 group-hover:bg-primary/20 group-hover:border-primary/40 transition-all shadow-inner"
          >
            <Zap className="w-5 h-5 text-primary fill-primary/20" />
            <motion.div 
               animate={{ opacity: [0, 1, 0] }} 
               transition={{ duration: 2, repeat: Infinity }}
               className="absolute inset-0 rounded-xl bg-primary/10 blur-sm" 
            />
          </motion.div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tighter text-foreground uppercase italic leading-none">LAPS</span>
            <span className="text-[8px] text-primary font-bold tracking-[0.2em] uppercase mt-0.5">AI Engine</span>
          </div>
        </Link>

        {/* Desktop Links - Floating Hover Effect */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-all rounded-lg hover:bg-primary/5 relative group"
            >
              {link.name}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary transition-all group-hover:w-1/2" />
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <ThemeToggle />
          <div className="h-4 w-px bg-border/60 mx-1" />
          <Link href="/login" className="text-xs font-bold uppercase tracking-widest text-foreground hover:text-primary transition-colors">
            Log in
          </Link>
          <Button asChild size="sm" className="h-10 px-6 rounded-xl font-bold bg-primary shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all">
            <Link href="/signup" className="flex items-center gap-2">
              Start Loop <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex items-center gap-3">
          <ThemeToggle />
          <button 
            className="p-2 rounded-xl bg-muted/50 border border-border/60 text-foreground transition-all active:scale-90" 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu - Full Screen Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-4 top-24 z-[99] lg:hidden p-8 rounded-[2.5rem] bg-background/95 backdrop-blur-2xl border border-border shadow-2xl pointer-events-auto"
          >
            <div className="flex flex-col gap-6 text-center">
              {navLinks.map((link, i) => (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={link.name}
                >
                  <Link 
                    href={link.href} 
                    className="text-2xl font-black tracking-tighter uppercase italic text-foreground hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              
              <div className="h-px bg-border/60 my-2" />
              
              <div className="flex flex-col gap-4">
                <Button asChild variant="outline" className="h-14 rounded-2xl font-bold text-lg border-border/60">
                  <Link href="/login" onClick={() => setIsOpen(false)}>Login ID</Link>
                </Button>
                <Button asChild className="h-14 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20">
                  <Link href="/signup" onClick={() => setIsOpen(false)} className="flex items-center gap-2">
                    Create Loop <Sparkles className="w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;