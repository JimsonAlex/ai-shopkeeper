import { Shield, Zap, DollarSign, Sparkles } from "lucide-react";
import FadeIn from "./FadeIn";
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
  <section id="why-nexus" className="py-16 md:py-28 bg-background relative">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--accent)/0.04),transparent_60%)]" />
    <div className="container mx-auto px-4 md:px-8 relative">
      <FadeIn>
        <div className="text-center max-w-3xl mx-auto mb-6">
          <span className="inline-flex items-center rounded-full border border-accent/20 bg-accent/[0.06] px-3.5 py-1 text-accent text-xs font-semibold uppercase tracking-widest mb-6">
            Why Nexus
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-[3.25rem] font-bold text-foreground leading-[1.1] tracking-tight">
            Built for shops that move fast
          </h2>
        </div>
      </FadeIn>

      <FadeIn delay={0.05}>
        <div className="text-center max-w-xl mx-auto mb-12 md:mb-20">
          <p className="text-muted-foreground text-[15px] leading-relaxed">
            Simplicity, performance, and security — empowering you to navigate retail finances with confidence.
          </p>
        </div>
      </FadeIn>

      <motion.div
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
      >
        {benefits.map((b) => (
          <motion.div
            key={b.title}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
            }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="group rounded-2xl p-6 md:p-8 border border-border/80 bg-card hover:border-accent/20 hover:shadow-xl hover:shadow-accent/[0.04] transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-accent/[0.08] group-hover:bg-accent/[0.12] flex items-center justify-center mb-6 transition-colors duration-300">
              <b.icon className="h-5 w-5 text-accent" strokeWidth={1.8} />
            </div>
            <h3 className="font-display text-[15px] font-semibold text-foreground mb-2.5">{b.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{b.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default ProblemSection;
