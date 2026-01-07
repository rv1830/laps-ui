import { Briefcase, Users, Building2, Rocket, Target, Heart } from "lucide-react";

const UseCases = () => {
  const useCases = [
    {
      icon: Users,
      title: "Solo Founders & Consultants",
      description: "Automate your entire sales process so you can focus on delivering value to clients, not chasing leads.",
      example: "\"I book 20+ calls per month on autopilot while focusing on client work.\"",
    },
    {
      icon: Building2,
      title: "Agencies",
      description: "Standardize your sales process, manage multiple pipelines, and ensure no lead falls through the cracks.",
      example: "\"We closed 40% more deals in Q1 after switching from HubSpot + Calendly.\"",
    },
    {
      icon: Briefcase,
      title: "Small Sales Teams",
      description: "Give your team one source of truth with role-based permissions and approval workflows.",
      example: "\"Our 5-person team now operates like a 15-person team.\"",
    },
    {
      icon: Rocket,
      title: "SaaS Startups",
      description: "Scale your outbound without scaling headcount. AI qualification ensures you only talk to real prospects.",
      example: "\"Demo bookings up 300% with the same SDR team.\"",
    },
    {
      icon: Target,
      title: "Coaches & Creators",
      description: "Turn followers into clients with automated nurturing and frictionless booking.",
      example: "\"Converted my email list into $50k in course sales this month.\"",
    },
    {
      icon: Heart,
      title: "Service Businesses",
      description: "From first inquiry to paid invoice, manage the entire customer journey in one place.",
      example: "\"Cut admin time by 80%. My evenings are mine again.\"",
    },
  ];

  return (
    <section id="use-cases" className="section-padding relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-4">
            Use Cases
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Built for <span className="text-gradient">Sellers Like You</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Whether you're a solo consultant or a growing team, LAPS adapts to your sales process.
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase) => (
            <div
              key={useCase.title}
              className="group p-6 rounded-2xl bg-card border border-border card-hover"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5">
                <useCase.icon className="w-6 h-6 text-primary" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {useCase.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {useCase.description}
              </p>

              {/* Example Quote */}
              <div className="pt-4 border-t border-border">
                <p className="text-xs italic text-muted-foreground">
                  {useCase.example}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
