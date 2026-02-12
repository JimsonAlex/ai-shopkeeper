import { Mic, Brain, BarChart3, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: Mic,
    num: "01",
    title: "Speak, Snap, or Type",
    desc: "Record a sale in seconds — send a voice note, snap a receipt, or just type it out.",
  },
  {
    icon: Brain,
    num: "02",
    title: "AI Handles the Math",
    desc: "Automatic double-entry accounting behind the scenes. Every debit has a credit. Always balanced.",
  },
  {
    icon: BarChart3,
    num: "03",
    title: "Know Your Profit",
    desc: "Real-time dashboard showing cash, margins, inventory, and who owes you — at a glance.",
  },
];

const SolutionSection = () => (
  <section id="solution" className="py-24 md:py-32 bg-primary relative overflow-hidden">
    <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-accent/8 blur-[120px] pointer-events-none" />
    <div className="container mx-auto px-4 md:px-8 relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center max-w-2xl mx-auto mb-16"
      >
        <motion.span
          className="text-accent font-semibold text-sm uppercase tracking-widest inline-block"
          initial={{ opacity: 0, letterSpacing: "0.05em" }}
          whileInView={{ opacity: 1, letterSpacing: "0.2em" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Meet Your AI Copilot
        </motion.span>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mt-3 leading-tight">
          No accounting knowledge required
        </h2>
        <p className="text-primary-foreground/50 mt-5 text-lg">
          You run your shop. The AI runs your books.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {steps.map((s, i) => (
          <motion.div
            key={s.num}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.15, ease: "easeOut" as const }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="relative rounded-2xl p-8 glass-dark hover:border-accent/20 transition-all duration-300 h-full"
          >
            <span className="font-display text-6xl font-bold text-accent/10 absolute top-4 right-6">{s.num}</span>
            <motion.div
              className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center mb-6"
              initial={{ rotate: -20, opacity: 0 }}
              whileInView={{ rotate: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.15, type: "spring" }}
            >
              <s.icon className="h-6 w-6 text-accent" />
            </motion.div>
            <h3 className="font-display text-xl font-semibold text-primary-foreground mb-3">{s.title}</h3>
            <p className="text-primary-foreground/50 text-sm leading-relaxed">{s.desc}</p>
            {i < steps.length - 1 && (
              <ArrowRight className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-accent/30 translate-x-full" />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default SolutionSection;
