import { TrendingUp, Users, Mail, Clock, Award, Zap } from "lucide-react";

const Stats = () => {
  const stats = [
    {
      icon: Users,
      value: "2,000+",
      label: "Active Users",
      description: "Sales teams trust LAPS",
    },
    {
      icon: Mail,
      value: "5M+",
      label: "Emails Sent",
      description: "Through our platform",
    },
    {
      icon: TrendingUp,
      value: "35%",
      label: "Avg. Conversion Lift",
      description: "Compared to manual outreach",
    },
    {
      icon: Clock,
      value: "10hrs",
      label: "Weekly Time Saved",
      description: "Per sales rep on average",
    },
  ];

  return (
    <section className="relative py-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 mb-4">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-foreground mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-muted-foreground">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
