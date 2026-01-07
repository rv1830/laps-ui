import { Users, Mail, Calendar, FileText, ArrowRight, CheckCircle } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      icon: Users,
      title: "Capture & Qualify Leads",
      description: "Import leads from CSV, connect forms (Typeform, Tally, Webflow), or use native capture tools. AI automatically scores and qualifies each lead.",
      features: ["Smart deduplication", "AI qualification", "Source tracking"],
      color: "primary",
    },
    {
      number: "02",
      icon: Mail,
      title: "Nurture with Automation",
      description: "Build email sequences with personalization and mood-aware branching. Set automation to Manual, Assisted, or full Autopilot mode.",
      features: ["Personalized sequences", "Reply detection", "Approval workflows"],
      color: "cyan",
    },
    {
      number: "03",
      icon: Calendar,
      title: "Schedule & Present",
      description: "Generate booking links synced with your calendar. Run presentation calls with AI-powered agendas and product recommendations.",
      features: ["Calendar sync", "Booking pages", "Reminder automation"],
      color: "orange",
    },
    {
      number: "04",
      icon: FileText,
      title: "Close & Get Paid",
      description: "Generate proposals from templates, create invoices, and attach payment links. Money goes directly to your account—LAPS never holds funds.",
      features: ["Proposal templates", "Invoice generation", "Payment integration"],
      color: "purple",
    },
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case "primary": return { bg: "bg-primary/10", border: "border-primary/20", text: "text-primary" };
      case "cyan": return { bg: "bg-accent-cyan/10", border: "border-accent-cyan/20", text: "text-accent-cyan" };
      case "orange": return { bg: "bg-accent-orange/10", border: "border-accent-orange/20", text: "text-accent-orange" };
      case "purple": return { bg: "bg-accent-purple/10", border: "border-accent-purple/20", text: "text-accent-purple" };
      default: return { bg: "bg-primary/10", border: "border-primary/20", text: "text-primary" };
    }
  };

  return (
    <section id="how-it-works" className="section-padding relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-4">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            The Complete <span className="text-gradient">Sales Loop</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            From first touch to closed deal, LAPS handles every step of your sales process while keeping you in control.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="absolute left-[50%] top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent hidden lg:block" />

          <div className="space-y-12 lg:space-y-0">
            {steps.map((step, index) => {
              const colors = getColorClasses(step.color);
              const isEven = index % 2 === 0;

              return (
                <div
                  key={step.number}
                  className={`relative lg:grid lg:grid-cols-2 lg:gap-16 items-center ${index !== steps.length - 1 ? 'lg:mb-24' : ''}`}
                >
                  {/* Content - alternates sides on desktop */}
                  <div className={`${isEven ? 'lg:order-1' : 'lg:order-2 lg:text-right'}`}>
                    <div className={`p-6 sm:p-8 rounded-2xl bg-card border border-border ${isEven ? '' : 'lg:ml-auto'} max-w-xl`}>
                      {/* Number & Icon */}
                      <div className={`flex items-center gap-4 mb-4 ${isEven ? '' : 'lg:justify-end'}`}>
                        <span className="text-4xl font-bold text-muted-foreground/30">{step.number}</span>
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${colors.bg} ${colors.border}`}>
                          <step.icon className={`w-6 h-6 ${colors.text}`} />
                        </div>
                      </div>

                      {/* Title & Description */}
                      <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-3">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {step.description}
                      </p>

                      {/* Features */}
                      <div className={`flex flex-wrap gap-3 ${isEven ? '' : 'lg:justify-end'}`}>
                        {step.features.map((feature) => (
                          <div key={feature} className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${colors.bg} border ${colors.border}`}>
                            <CheckCircle className={`w-3.5 h-3.5 ${colors.text}`} />
                            <span className={`text-xs font-medium ${colors.text}`}>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Center dot for desktop */}
                  <div className={`hidden lg:flex absolute left-[50%] top-1/2 -translate-x-1/2 -translate-y-1/2 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className={`w-4 h-4 rounded-full ${colors.bg} border-4 border-background ring-2 ${colors.border}`} />
                  </div>

                  {/* Empty space for alternating layout */}
                  <div className={`hidden lg:block ${isEven ? 'lg:order-2' : 'lg:order-1'}`} />

                  {/* Arrow for mobile */}
                  {index !== steps.length - 1 && (
                    <div className="flex justify-center py-6 lg:hidden">
                      <ArrowRight className="w-6 h-6 text-primary rotate-90" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
