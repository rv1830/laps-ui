import { 
  Bot, 
  Mail, 
  Users, 
  BarChart3, 
  Zap, 
  Calendar,
  FileText,
  Shield,
  Workflow,
  Target,
  Clock,
  Sparkles
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Users,
      title: "Lead Management",
      description: "Centralized database with smart deduplication, custom fields, and visual pipeline boards. Never lose track of a prospect again.",
      color: "primary",
    },
    {
      icon: Bot,
      title: "AI-Powered Qualification",
      description: "Intelligent lead scoring with mood detection and intent analysis. Know exactly who's ready to buy and when to reach out.",
      color: "cyan",
    },
    {
      icon: Mail,
      title: "Email Sequences",
      description: "Automated multi-step campaigns with personalization, A/B testing, and reply detection. Stop deals from dying due to inconsistent follow-up.",
      color: "orange",
    },
    {
      icon: Workflow,
      title: "Automation Engine",
      description: "Replace Zapier and n8n with native triggers, conditions, and actions. Build workflows that run in Manual, Assisted, or Autopilot modes.",
      color: "purple",
    },
    {
      icon: Calendar,
      title: "Smart Scheduling",
      description: "Built-in booking links, calendar sync with Google/Outlook, automatic reminders, and no-show recovery workflows.",
      color: "blue",
    },
    {
      icon: FileText,
      title: "Proposals & Invoices",
      description: "Generate branded proposals and invoices from templates. Attach payment links from Stripe or Razorpay—money goes directly to you.",
      color: "yellow",
    },
    {
      icon: Target,
      title: "Lead Capture",
      description: "Native form builder, tracking links, and webhook integrations with Typeform, Tally, Webflow, and more. Own your lead generation.",
      color: "primary",
    },
    {
      icon: BarChart3,
      title: "Funnel Analytics",
      description: "Track every metric that matters: conversion rates, time-to-response, source performance, and revenue attribution.",
      color: "cyan",
    },
    {
      icon: Shield,
      title: "Compliance Built-in",
      description: "Unsubscribe handling, suppression lists, rate limiting, and consent management. Stay out of spam folders and legal trouble.",
      color: "orange",
    },
  ];

  const getIconColor = (color: string) => {
    switch (color) {
      case "primary": return "text-primary bg-primary/10 border-primary/20";
      case "cyan": return "text-accent-cyan bg-accent-cyan/10 border-accent-cyan/20";
      case "orange": return "text-accent-orange bg-accent-orange/10 border-accent-orange/20";
      case "yellow": return "text-accent-yellow bg-accent-yellow/10 border-accent-yellow/20";
      case "purple": return "text-accent-purple bg-accent-purple/10 border-accent-purple/20";
      case "blue": return "text-accent-blue bg-accent-blue/10 border-accent-blue/20";
      default: return "text-primary bg-primary/10 border-primary/20";
    }
  };

  return (
    <section id="features" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-muted/30" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Powerful Features</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Everything You Need in
            <span className="text-gradient"> One Platform</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Stop paying for 10 different tools. LAPS replaces your CRM, email automation, calendar scheduler, proposal generator, and invoicing software.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative p-6 rounded-2xl bg-card border border-border card-hover"
            >
              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center border mb-5 ${getIconColor(feature.color)}`}>
                <feature.icon className="w-6 h-6" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-card border border-border">
            <Clock className="w-5 h-5 text-primary" />
            <span className="text-muted-foreground">Average setup time:</span>
            <span className="font-semibold text-foreground">15 minutes</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
