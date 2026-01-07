"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Zap, TrendingUp, Users, Mail, Calendar, FileText, CheckCircle } from "lucide-react";
import Link from "next/link"; // Next.js Link replacement

const Hero = () => {
  const stats = [
    { icon: Users, value: "48", label: "New Leads", change: "+12%" },
    { icon: Mail, value: "156", label: "Contacted", change: "+8%" },
    { icon: Calendar, value: "18", label: "Calls Booked", change: "+22%" },
    { icon: FileText, value: "5", label: "Won Deals", change: "+50%" },
  ];

  const features = [
    "AI-powered lead qualification",
    "Automated email sequences",
    "Smart calendar scheduling",
    "Proposal & invoice generation",
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 bg-primary/5 opacity-50" />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Sales Automation Platform</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-[1.1]">
              Your Complete
              <span className="block text-primary">Sales Command</span>
              <span className="block">Center</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed">
              Stop juggling CRMs, email tools, and automation platforms. LAPS unifies lead capture, nurturing, scheduling, proposals, and invoicing into one powerful sales loop.
            </p>

            {/* Feature List */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Button asChild size="lg" className="w-full sm:w-auto group h-12 px-8">
                {/* Changed 'to' to 'href' */}
                <Link href="/signup">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto group h-12 px-8">
                <Play className="w-4 h-4 mr-2 fill-current" />
                Watch Demo
              </Button>
            </div>

            {/* Social Proof */}
            <div className="mt-10 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground mb-3">Trusted by 2,000+ sales teams worldwide</p>
              <div className="flex flex-wrap items-center gap-6 opacity-60">
                <span className="text-lg font-bold">TechFlow</span>
                <span className="text-lg font-bold">ScaleUp</span>
                <span className="text-lg font-bold">Velocity</span>
                <span className="text-lg font-bold hidden sm:block">Acme</span>
              </div>
            </div>
          </div>

          {/* Right Column - Dashboard Preview */}
          <div className="relative lg:block hidden">
            {/* Glow Effect */}
            <div className="absolute -inset-4 bg-primary/20 rounded-3xl blur-3xl opacity-30" />

            {/* Dashboard Card */}
            <div className="relative bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="p-4 sm:p-6 border-b border-border bg-muted/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Command Center</h3>
                      <p className="text-xs text-muted-foreground">AI-powered sales cockpit</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-xs text-primary font-medium">Live</span>
                  </div>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="p-4 sm:p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Key Metrics</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="p-3 sm:p-4 rounded-xl bg-muted/50 border border-border group hover:border-primary/30 transition-all duration-300"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <stat.icon className="w-4 h-4 text-primary" />
                      </div>
                      <div className="text-xl font-bold text-foreground mb-0.5">
                        {stat.value}
                      </div>
                      <div className="text-xs text-muted-foreground mb-1">
                        {stat.label}
                      </div>
                      <div className="flex items-center gap-1 text-xs font-medium text-emerald-500">
                        <TrendingUp className="w-3 h-3" />
                        {stat.change}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;