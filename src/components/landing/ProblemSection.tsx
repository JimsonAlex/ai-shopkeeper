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

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: i * 0.12,
      ease: "easeOut" as const,
    },
  }),
};

const ProblemSection = () => (
  <section id="problem" className="py-24 md:py-32 bg-primary relative">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--accent)/0.08),transparent_60%)]" />
    <div className="container mx-auto px-4 md:px-8 relative">
      <FadeIn>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            className="text-accent font-semibold text-sm uppercase tracking-widest inline-block"
            initial={{ opacity: 0, letterSpacing: "0.05em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.2em" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            The Retail Reality
          </motion.span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mt-3 leading-tight">
            Your shop is bleeding money — and you can't see where
          </h2>
        </div>
      </FadeIn>

      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {pains.map((p, i) => (
          <motion.div
            key={p.title}
            custom={i}
            variants={cardVariants}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="glass-dark rounded-2xl p-7 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300 h-full flex flex-col"
          >
            <motion.div
              className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5"
              whileInView={{ rotate: [0, -10, 10, 0] }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.12 }}
            >
              <p.icon className="h-5 w-5 text-accent" />
            </motion.div>
            <h3 className="font-display text-lg font-semibold text-primary-foreground mb-2">{p.title}</h3>
            <p className="text-primary-foreground/50 text-sm leading-relaxed mb-5 flex-1">{p.desc}</p>
            <div className="pt-4 border-t border-primary-foreground/10">
              <motion.span
                className="font-display text-2xl font-bold text-accent inline-block"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.12, type: "spring" }}
              >
                {p.stat}
              </motion.span>
              <p className="text-primary-foreground/40 text-xs mt-0.5">{p.statLabel}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default ProblemSection;
