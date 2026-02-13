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
  <section id="how-it-works" className="py-20 md:py-28 bg-background relative overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--accent)/0.03),transparent_50%)]" />
    <div className="container mx-auto px-4 md:px-8 relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center max-w-2xl mx-auto mb-20"
      >
        <span className="inline-flex items-center rounded-full border border-accent/20 bg-accent/[0.06] px-3.5 py-1 text-accent text-xs font-semibold uppercase tracking-widest mb-6">
          How It Works
        </span>
        <h2 className="font-display text-3xl sm:text-4xl md:text-[3.25rem] font-bold text-foreground leading-[1.1] tracking-tight">
          Three steps to financial clarity
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto relative">
        {/* Connector line on desktop */}
        <div className="hidden md:block absolute top-[4.5rem] left-[16%] right-[16%] h-px bg-border" />
        
        {steps.map((s, i) => (
          <motion.div
            key={s.num}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.15, ease: "easeOut" }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="rounded-2xl p-8 text-center relative border border-border/80 bg-card hover:border-accent/20 hover:shadow-xl hover:shadow-accent/[0.04] transition-all duration-300"
          >
            <motion.span
              className="font-display text-7xl font-black text-accent/[0.06] absolute top-3 right-5 select-none"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.1, type: "spring" }}
            >
              {s.num}
            </motion.span>
            <div className="w-14 h-14 rounded-2xl bg-accent/[0.08] flex items-center justify-center mx-auto mb-6 relative z-10">
              <s.icon className="h-6 w-6 text-accent" strokeWidth={1.8} />
            </div>
            <h3 className="font-display text-lg font-bold text-foreground mb-3 tracking-tight">{s.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorksSection;
