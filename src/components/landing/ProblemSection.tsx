import { Shield, Zap, DollarSign, Sparkles } from "lucide-react";
import FadeIn from "./FadeIn";
import { motion } from "framer-motion";

const benefits = [
  {
    icon: Shield,
    title: "Maximum Security",
    desc: "Your financial data is protected with bank-grade encryption and complete tenant isolation.",
  },
  {
    icon: Zap,
    title: "Instant Recording",
    desc: "Record sales in real-time via voice, photo, or text — no delays, no manual entry.",
  },
  {
    icon: DollarSign,
    title: "Know Your Profit",
    desc: "See your true margins, not just revenue. AI-powered double-entry gives you real numbers.",
  },
  {
    icon: Sparkles,
    title: "Premium Interface",
    desc: "An elegant, intuitive design that's easy to use, even for beginners with zero accounting knowledge.",
  },
];

const subtitle = "Simplicity, performance, and security, empowering you to navigate retail finances with confidence and agility.";

const ProblemSection = () => (
  <section id="why-nexus" className="py-24 md:py-32 bg-primary relative">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--accent)/0.06),transparent_60%)]" />
    <div className="container mx-auto px-4 md:px-8 relative">
      <FadeIn>
        <div className="text-center max-w-3xl mx-auto mb-6">
          <h3 className="font-display text-lg md:text-xl text-primary-foreground/70 leading-relaxed font-medium">
            {subtitle}
          </h3>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground leading-tight">
            Why Choose <span className="text-accent">Nexus</span>?
          </h2>
          <p className="text-primary-foreground/40 mt-4 text-base">
            Benefits designed to provide a seamless, secure, and accessible experience for all users.
          </p>
        </div>
      </FadeIn>

      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
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
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="glass-dark rounded-2xl p-7 hover:border-accent/20 transition-all duration-300 flex flex-col"
          >
            <motion.div
              className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5"
              whileInView={{ rotate: [0, -8, 8, 0] }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <b.icon className="h-5 w-5 text-accent" />
            </motion.div>
            <h3 className="font-display text-lg font-semibold text-primary-foreground mb-2">{b.title}</h3>
            <p className="text-primary-foreground/40 text-sm leading-relaxed">{b.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default ProblemSection;
