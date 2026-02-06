import { Wallet, TrendingDown, Clock, Puzzle } from "lucide-react";
import FadeIn from "./FadeIn";

const pains = [
  {
    icon: Wallet,
    title: "Money Disappears",
    desc: "Cash goes into pockets, drawers, and M-Pesa — with no trail to follow.",
  },
  {
    icon: TrendingDown,
    title: "Profit Is a Mystery",
    desc: "You're selling all day, but have no clue if you're actually making money.",
  },
  {
    icon: Clock,
    title: "No Time for Bookkeeping",
    desc: "You're too busy running the shop to sit down and enter numbers.",
  },
  {
    icon: Puzzle,
    title: "Tools Don't Fit",
    desc: "POS apps ignore accounting. Accounting software ignores your reality.",
  },
];

const ProblemSection = () => (
  <section id="problem" className="py-20 md:py-28 bg-background">
    <div className="container mx-auto px-4 md:px-8">
      <FadeIn>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">The Retail Reality</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3">
            Your shop is bleeding money — and you can't see where
          </h2>
        </div>
      </FadeIn>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {pains.map((p, i) => (
          <FadeIn key={p.title} delay={i * 0.1}>
            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:border-accent/30 transition-all duration-300 h-full">
              <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <p.icon className="h-5 w-5 text-accent" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">{p.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);

export default ProblemSection;
