import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      quote: "LAPS replaced our CRM, Calendly, and email tool. We went from 5 sales meetings a week to 25 without adding headcount. The automation is genuinely game-changing.",
      author: "Sarah Chen",
      role: "VP of Sales",
      company: "TechFlow",
      avatar: "SC",
    },
    {
      quote: "The AI qualification saved us hundreds of hours. It correctly identifies hot leads 90% of the time, so my team only focuses on prospects ready to buy.",
      author: "Marcus Johnson",
      role: "Sales Director",
      company: "ScaleUp Inc",
      avatar: "MJ",
    },
    {
      quote: "We were paying $800/month for 6 different tools. LAPS gave us everything in one place for a fraction of the cost. The proposal generator alone was worth switching.",
      author: "Emily Rodriguez",
      role: "Founder",
      company: "Velocity Agency",
      avatar: "ER",
    },
    {
      quote: "Finally, an automation tool that lets me stay in control. The Assisted mode means nothing goes out without my approval, but I still save 10+ hours per week.",
      author: "David Kim",
      role: "Consultant",
      company: "Growth Partners",
      avatar: "DK",
    },
    {
      quote: "The booking links + automatic reminders cut our no-show rate from 30% to 5%. That's real money back in our pipeline every single month.",
      author: "Lisa Thompson",
      role: "Head of Sales",
      company: "CloudNine",
      avatar: "LT",
    },
    {
      quote: "I was skeptical about another 'all-in-one' tool, but LAPS actually delivers. The workflow builder is more powerful than Zapier for sales-specific use cases.",
      author: "Alex Rivera",
      role: "CEO",
      company: "Momentum Labs",
      avatar: "AR",
    },
  ];

  return (
    <section id="testimonials" className="section-padding relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Loved by <span className="text-gradient">Sales Teams</span> Everywhere
          </h2>
          <p className="text-lg text-muted-foreground">
            Join thousands of sellers who've transformed their sales process with LAPS.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.author}
              className="group p-6 rounded-2xl bg-card border border-border card-hover"
            >
              {/* Stars */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent-yellow text-accent-yellow" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-foreground leading-relaxed mb-6 text-sm">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <span className="text-xs font-semibold text-primary">{testimonial.avatar}</span>
                </div>
                <div>
                  <div className="font-semibold text-foreground text-sm">{testimonial.author}</div>
                  <div className="text-xs text-muted-foreground">
                    {testimonial.role}, {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
