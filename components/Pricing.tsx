"use client"; // Next.js client component directive

import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";
import { useState } from "react";
import Link from "next/link"; // Next.js Link replacement

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: "Starter",
      description: "Perfect for solo founders and freelancers",
      price: isAnnual ? 29 : 39,
      period: "/month",
      highlight: false,
      features: [
        "1 user",
        "500 leads",
        "1,000 emails/month",
        "Email sequences",
        "Calendar booking",
        "Basic analytics",
        "Email support",
      ],
    },
    {
      name: "Professional",
      description: "For growing teams and agencies",
      price: isAnnual ? 79 : 99,
      period: "/month",
      highlight: true,
      badge: "Most Popular",
      features: [
        "5 users",
        "5,000 leads",
        "10,000 emails/month",
        "AI lead qualification",
        "Workflow automation",
        "Advanced analytics",
        "Priority support",
        "Team permissions",
      ],
    },
    {
      name: "Enterprise",
      description: "For large teams with custom needs",
      price: isAnnual ? 199 : 249,
      period: "/month",
      highlight: false,
      features: [
        "Unlimited users",
        "Unlimited leads",
        "Unlimited emails",
        "Full AI suite",
        "Custom integrations",
        "API access",
        "Dedicated account manager",
        "SLA guarantee",
      ],
    },
  ];

  return (
    <section id="pricing" className="py-20 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-muted/30 -z-10" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Simple Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            One Platform, <span className="text-primary">Transparent Pricing</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            No hidden fees. No per-seat surprises. Just honest pricing that scales with your business.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-4 p-1.5 rounded-full bg-muted border border-border">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                !isAnnual ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                isAnnual ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Annual
              <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs">Save 25%</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative p-6 lg:p-8 rounded-2xl bg-card border transition-all duration-300 ${
                plan.highlight
                  ? "border-primary shadow-lg shadow-primary/10 lg:scale-[1.05]"
                  : "border-border hover:border-primary/30"
              }`}
            >
              {/* Badge for Recommended Plan */}
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold whitespace-nowrap">
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-4 min-h-[40px]">{plan.description}</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl lg:text-5xl font-bold text-foreground">${plan.price}</span>
                  <span className="text-muted-foreground text-sm">{plan.period}</span>
                </div>
              </div>

              {/* Features List */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Button
                asChild
                variant={plan.highlight ? "default" : "outline"}
                size="lg"
                className="w-full"
              >
                {/* Changed 'to' to 'href' */}
                <Link href="/signup">Get Started</Link>
              </Button>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <p className="text-center text-sm text-muted-foreground mt-10">
          All plans include a 14-day free trial. No credit card required.
        </p>
      </div>
    </section>
  );
};

export default Pricing;