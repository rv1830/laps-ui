"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Search, Cpu } from "lucide-react";

export default function NotFound() {
  return (
    // 'dark:' prefix se colors automatic switch honge
    <div className="relative min-h-screen w-full bg-[#f8fafc] dark:bg-[#020617] flex items-center justify-center overflow-hidden font-sans transition-colors duration-300">
      
      {/* Background Glows - Dark mode mein thode dim rakhe hain */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#00b368]/10 dark:bg-[#00b368]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-blue-400/10 dark:bg-blue-900/10 rounded-full blur-3xl" />

      <div className="container relative z-10 mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00b368]/10 text-[#00b368] text-sm font-medium mb-6">
            <Cpu size={16} />
            <span>AI Diagnostic: Route Not Found</span>
          </div>
          
          <h1 className="text-8xl font-black text-[#1e293b] dark:text-white mb-4">
            404<span className="text-[#00b368]">.</span>
          </h1>
          
          <h2 className="text-3xl font-bold text-[#1e293b] dark:text-slate-100 mb-6">
            Oops! This lead went cold.
          </h2>
          
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-md leading-relaxed">
            The page you are looking for has been moved or deleted from our sales engine. 
            Let's get you back to the command center.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/">
              <button className="flex items-center gap-2 bg-[#00b368] hover:bg-[#009a59] text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-green-200 dark:shadow-none active:scale-95">
                <ArrowLeft size={20} />
                Back to Dashboard
              </button>
            </Link>
            
            <button className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 px-8 py-4 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95">
              <Search size={20} />
              Contact Support
            </button>
          </div>
        </motion.div>

        {/* Right Side: 3D Floating Element */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex justify-center"
        >
          {/* Main Card */}
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-slate-100 dark:border-slate-800 relative z-20 w-full max-w-md"
          >
            <div className="flex justify-between items-center mb-8">
              <div className="w-12 h-12 bg-red-50 dark:bg-red-900/20 rounded-xl flex items-center justify-center text-red-500 font-bold">
                !
              </div>
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-slate-200 dark:bg-slate-700" />
                <div className="w-2 h-2 rounded-full bg-slate-200 dark:bg-slate-700" />
                <div className="w-2 h-2 rounded-full bg-[#00b368]" />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="h-4 w-3/4 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse" />
              <div className="h-4 w-full bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse" />
              <div className="h-20 w-full bg-[#00b368]/5 dark:bg-[#00b368]/10 border border-dashed border-[#00b368]/20 rounded-xl flex items-center justify-center text-[#00b368] font-mono text-xs md:text-sm">
                ERROR_NODE_DISCONNECTED
              </div>
            </div>
          </motion.div>

          {/* Floating Accents */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-20px] left-[-20px] z-10 hidden sm:block"
          >
            <div className="w-16 h-16 bg-blue-500/10 rounded-2xl backdrop-blur-md border border-blue-500/20" />
          </motion.div>
          
          <motion.div 
            animate={{ y: [0, 30, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-[-30px] right-[20px] z-30"
          >
            <div className="px-4 py-2 bg-white dark:bg-slate-800 shadow-xl rounded-full border border-slate-50 dark:border-slate-700 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#00b368] animate-ping" />
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase">System Live</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#1e293b 1px, transparent 1px)`, backgroundSize: '30px 30px' }} />
    </div>
  );
}