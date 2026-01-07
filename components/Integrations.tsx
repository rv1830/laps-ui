import { CheckCircle } from "lucide-react";

const Integrations = () => {
  const integrationGroups = [
    {
      title: "Email & Calendar",
      description: "Connect your existing accounts",
      integrations: [
        { name: "Gmail", logo: "G" },
        { name: "Outlook", logo: "O" },
        { name: "Google Calendar", logo: "GC" },
        { name: "Microsoft Calendar", logo: "MC" },
      ],
    },
    {
      title: "Lead Capture",
      description: "Import from your forms",
      integrations: [
        { name: "Typeform", logo: "T" },
        { name: "Tally", logo: "Ta" },
        { name: "Webflow", logo: "W" },
        { name: "Webhooks", logo: "⚡" },
      ],
    },
    {
      title: "Payments",
      description: "Get paid directly",
      integrations: [
        { name: "Stripe", logo: "S" },
        { name: "Razorpay", logo: "R" },
        { name: "PayPal", logo: "P" },
      ],
    },
    {
      title: "Meetings",
      description: "Video conferencing",
      integrations: [
        { name: "Zoom", logo: "Z" },
        { name: "Google Meet", logo: "GM" },
        { name: "Teams", logo: "T" },
      ],
    },
  ];

  return (
    <section id="integrations" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-muted/30" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-4">
            Integrations
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Works With Your <span className="text-gradient">Existing Stack</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Connect the tools you already use. LAPS integrates seamlessly so you can get started in minutes.
          </p>
        </div>

        {/* Integration Groups */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {integrationGroups.map((group) => (
            <div
              key={group.title}
              className="p-6 rounded-2xl bg-card border border-border"
            >
              <h3 className="font-semibold text-foreground mb-1">{group.title}</h3>
              <p className="text-sm text-muted-foreground mb-6">{group.description}</p>
              
              <div className="grid grid-cols-2 gap-3">
                {group.integrations.map((integration) => (
                  <div
                    key={integration.name}
                    className="flex items-center gap-2 p-3 rounded-xl bg-muted/50 border border-border"
                  >
                    <div className="w-8 h-8 rounded-lg bg-background border border-border flex items-center justify-center text-xs font-bold text-muted-foreground">
                      {integration.logo}
                    </div>
                    <span className="text-xs font-medium text-foreground truncate">{integration.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* API & Webhooks */}
        <div className="mt-12 max-w-3xl mx-auto">
          <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border text-center">
            <h3 className="text-lg font-semibold text-foreground mb-2">Need Custom Integration?</h3>
            <p className="text-muted-foreground mb-6">
              Our REST API and webhooks let you connect LAPS to virtually any tool or build custom workflows.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-primary" />
                Full REST API
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-primary" />
                Webhook events
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-primary" />
                SDK libraries
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Integrations;
