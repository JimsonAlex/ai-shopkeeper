import { Shield, Zap, DollarSign, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const benefits = [
  {
    icon: Shield,
    title: "Maximum Security",
    desc: "Bank-grade encryption and complete tenant isolation protect every transaction.",
  },
  {
    icon: Zap,
    title: "Instant Recording",
    desc: "Voice, photo, or text — record sales in real-time with zero manual entry.",
  },
  {
    icon: DollarSign,
    title: "Know Your Profit",
    desc: "See true margins, not just revenue. AI-powered double-entry gives you real numbers.",
  },
  {
    icon: Sparkles,
    title: "Premium Interface",
    desc: "Elegant, intuitive design — easy to use, even with zero accounting knowledge.",
  },
];

const ProblemSection = () => (
  <section id="why-nexus" className="py-20 md:py-32 bg-background relative overflow-hidden">
    {/* Layered background */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--accent)/0.05),transparent_60%)]" />
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-accent/[0.03] blur-[120px] pointer-events-none" />

    <div className="container mx-auto px-4 md:px-8 relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center max-w-3xl mx-auto mb-6"
      >
        <span className="inline-flex items-center rounded-full border border-accent/20 bg-accent/[0.06] px-4 py-1.5 text-accent text-[11px] font-bold uppercase tracking-[0.15em] mb-8">
          Why Nexus
        </span>
        <h2 className="font-display text-4xl sm:text-5xl md:text-[3.75rem] font-bold text-foreground leading-[1.08] tracking-tight">
          Built for shops that{" "}
          <span className="bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent">
            move fast
          </span>
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-center max-w-xl mx-auto mb-16 md:mb-24"
      >
        <p className="text-muted-foreground text-base leading-relaxed">
          Simplicity, performance, and security — empowering you to navigate retail finances with confidence.
        </p>
      </motion.div>

      <motion.div
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        {benefits.map((b) => (
          <motion.div
            key={b.title}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
            }}
            whileHover={{ y: -8, transition: { duration: 0.25 } }}
            className="group rounded-2xl p-7 md:p-8 border border-border/60 bg-gradient-to-b from-card to-card/80 hover:border-accent/25 hover:shadow-2xl hover:shadow-accent/[0.06] transition-all duration-300"
          >
            <div className="w-14 h-14 rounded-2xl bg-accent/[0.08] group-hover:bg-accent/[0.15] flex items-center justify-center mb-7 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-accent/10">
              <b.icon className="h-6 w-6 text-accent" strokeWidth={1.6} />
            </div>
            <h3 className="font-display text-base font-bold text-foreground mb-3 tracking-tight">{b.title}</h3>
            <p className="text-muted-foreground text-[13px] leading-relaxed">{b.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default ProblemSection;
