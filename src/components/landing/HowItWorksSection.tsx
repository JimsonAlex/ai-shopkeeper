import { MessageSquare, Zap, Eye } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: MessageSquare,
    num: "01",
    title: "Onboard in Minutes",
    desc: "Answer simple questions — cash on hand, stock count, who owes you. The AI builds your opening balances automatically.",
  },
  {
    icon: Zap,
    num: "02",
    title: "Record Sales Naturally",
    desc: "Voice note, receipt photo, or text — the AI creates proper double-entry journal entries, balanced every time.",
  },
  {
    icon: Eye,
    num: "03",
    title: "See Your Truth",
    desc: "Real-time dashboard with cash position, true profit margins, FIFO inventory, and outstanding debts — at a glance.",
  },
];

const HowItWorksSection = () => (
  <section id="how-it-works" className="py-24 md:py-32 bg-primary relative overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--accent)/0.04),transparent_50%)]" />
    <div className="container mx-auto px-4 md:px-8 relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center max-w-2xl mx-auto mb-20"
      >
        <span className="text-accent font-semibold text-sm uppercase tracking-widest">How It Works</span>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mt-3 leading-tight">
          Three steps to financial clarity
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {steps.map((s, i) => (
          <motion.div
            key={s.num}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.15, ease: "easeOut" }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="glass-dark rounded-2xl p-8 text-center relative"
          >
            <motion.span
              className="font-display text-6xl font-black text-accent/10 absolute top-4 right-6"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.1, type: "spring" }}
            >
              {s.num}
            </motion.span>
            <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
              <s.icon className="h-6 w-6 text-accent" />
            </div>
            <h3 className="font-display text-xl font-bold text-primary-foreground mb-3">{s.title}</h3>
            <p className="text-primary-foreground/40 text-sm leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorksSection;
