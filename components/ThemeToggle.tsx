"use client";

import * as React from "react";
import { Moon, Sun, Monitor, Check } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);

  React.useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-10 h-10" />;

  const themes = [
    { id: "light", icon: Sun, color: "text-amber-500" },
    { id: "dark", icon: Moon, color: "text-blue-400" },
    { id: "system", icon: Monitor, color: "text-emerald-400" },
  ];

  return (
    <div 
      className="relative flex items-center cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 10, filter: "blur(8px)" }}
            animate={{ opacity: 1, x: -12, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: 10, filter: "blur(8px)" }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-background/40 backdrop-blur-2xl border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.2)] ring-1 ring-white/5"
          >
            {themes.map((t) => {
              const Icon = t.icon;
              const isActive = theme === t.id;
              
              return (
                <motion.button
                  key={t.id}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setTheme(t.id)}
                  className={`
                    relative p-2.5 rounded-xl transition-all duration-300 cursor-pointer
                    ${isActive 
                      ? `bg-white/10 ${t.color} shadow-[0_0_15px_rgba(255,255,255,0.05)]` 
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"}
                  `}
                >
                  <Icon className="w-4 h-4" />
                  {isActive && (
                    <motion.div 
                      layoutId="activeGlow"
                      className="absolute inset-0 rounded-xl bg-primary/5 blur-md"
                    />
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative group">
        <Button
          variant="ghost"
          size="icon"
          className="w-11 h-11 rounded-2xl bg-muted/30 border border-border/40 hover:bg-primary/5 transition-all duration-500 shrink-0 cursor-pointer"
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0 text-amber-500" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100 text-blue-400" />
          </div>
        </Button>
        
        {/* Halka sa bottom glow icon ke niche */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-primary/20 blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </div>
  );
};

export default ThemeToggle;