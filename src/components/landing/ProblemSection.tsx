import { Wallet, TrendingDown, Clock, Puzzle } from "lucide-react";
import FadeIn from "./FadeIn";
import { motion } from "framer-motion";

const pains = [
  {
    icon: Wallet,
    title: "Money Disappears",
    desc: "Cash goes into pockets, drawers, and M-Pesa — with no trail to follow.",
    stat: "60%",
    statLabel: "of shops can't track daily cash",
  },
  {
    icon: TrendingDown,
    title: "Profit Is a Mystery",
    desc: "You're selling all day, but have no clue if you're actually making money.",
    stat: "3x",
    statLabel: "revenue ≠ profit confusion",
  },
  {
    icon: Clock,
    title: "No Time for Bookkeeping",
    desc: "You're too busy running the shop to sit down and enter numbers.",
    stat: "2hrs",
    statLabel: "wasted on manual entry daily",
  },
  {
    icon: Puzzle,
    title: "Tools Don't Fit",
    desc: "POS apps ignore accounting. Accounting software ignores your reality.",
    stat: "80%",
    statLabel: "abandon complex tools",
  },
];

const ProblemSection = () => (
  <section id="problem" className="py-24 md:py-32 bg-background relative">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--accent)/0.06),transparent_60%)]" />
    <div className="container mx-auto px-4 md:px-8 relative">
      <FadeIn>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">The Retail Reality</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-3 leading-tight">
            Your shop is bleeding money — and you can't see where
          </h2>
        </div>
      </FadeIn>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {pains.map((p, i) => (
          <FadeIn key={p.title} delay={i * 0.1}>
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="glass-card rounded-2xl p-7 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300 h-full flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                <p.icon className="h-5 w-5 text-accent" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">{p.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5 flex-1">{p.desc}</p>
              <div className="pt-4 border-t border-border/50">
                <span className="font-display text-2xl font-bold text-accent">{p.stat}</span>
                <p className="text-muted-foreground text-xs mt-0.5">{p.statLabel}</p>
              </div>
            </motion.div>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);

export default ProblemSection;
