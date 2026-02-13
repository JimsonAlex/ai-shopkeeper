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
  <section id="how-it-works" className="py-20 md:py-32 bg-background relative overflow-hidden">
    {/* Layered background */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--accent)/0.04),transparent_50%)]" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/[0.02] blur-[100px] pointer-events-none" />

    <div className="container mx-auto px-4 md:px-8 relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center max-w-2xl mx-auto mb-16 md:mb-24"
      >
        <span className="inline-flex items-center rounded-full border border-accent/20 bg-accent/[0.06] px-4 py-1.5 text-accent text-[11px] font-bold uppercase tracking-[0.15em] mb-8">
          How It Works
        </span>
        <h2 className="font-display text-4xl sm:text-5xl md:text-[3.75rem] font-bold text-foreground leading-[1.08] tracking-tight">
          Three steps to{" "}
          <span className="bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent">
            financial clarity
          </span>
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto relative">
        {/* Connector line on desktop */}
        <div className="hidden md:block absolute top-[5rem] left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
        
        {steps.map((s, i) => (
          <motion.div
            key={s.num}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.15, ease: "easeOut" }}
            whileHover={{ y: -8, transition: { duration: 0.25 } }}
            className="rounded-2xl p-7 md:p-9 text-center relative border border-border/60 bg-gradient-to-b from-card to-card/80 hover:border-accent/25 hover:shadow-2xl hover:shadow-accent/[0.06] transition-all duration-300"
          >
            <motion.span
              className="font-display text-8xl font-black text-accent/[0.05] absolute top-2 right-4 select-none"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.1, type: "spring" }}
            >
              {s.num}
            </motion.span>
            <div className="w-16 h-16 rounded-2xl bg-accent/[0.08] flex items-center justify-center mx-auto mb-7 relative z-10">
              <s.icon className="h-7 w-7 text-accent" strokeWidth={1.6} />
            </div>
            <h3 className="font-display text-lg font-bold text-foreground mb-4 tracking-tight">{s.title}</h3>
            <p className="text-muted-foreground text-[13px] leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorksSection;
