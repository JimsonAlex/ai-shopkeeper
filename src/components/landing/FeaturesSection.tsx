import { BookOpen, Mic, Package, CreditCard, Scale, ShieldAlert, Undo2, HelpCircle, Lock } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: BookOpen,
    title: "Double-Entry Ledger",
    desc: "Every transaction auto-balanced. The ledger is append-only — no deletions, ever.",
  },
  {
    icon: Mic,
    title: "AI Data Capture",
    desc: "Voice, photo, or text — the AI parses everything and creates proper journal entries.",
  },
  {
    icon: Package,
    title: "FIFO Inventory",
    desc: "Real-time stock for high-value items. Inferred tracking for fast-movers.",
  },
  {
    icon: Undo2,
    title: "Reversing Corrections",
    desc: "Mistakes fixed via reversing entries. Original records stay intact.",
  },
  {
    icon: HelpCircle,
    title: "Suspense Routing",
    desc: "Can't categorize? Booked to Suspense — never lost. Resolve later.",
  },
  {
    icon: CreditCard,
    title: "Credit Management",
    desc: "Track who owes you with reminders, partial payments, and aging reports.",
  },
  {
    icon: Scale,
    title: "Daily Reconciliation",
    desc: "Cash count vs. system balance. Spot discrepancies before they grow.",
  },
  {
    icon: ShieldAlert,
    title: "Fraud Detection",
    desc: "AI flags suspicious voids, unusual refunds, and inventory shortages.",
  },
  {
    icon: Lock,
    title: "Tenant Isolation",
    desc: "Each shop's data is walled off. No cross-tenant access. Your data is yours.",
  },
];

const FeaturesSection = () => (
  <section id="features" className="py-16 md:py-28 bg-background relative">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(var(--accent)/0.03),transparent_60%)]" />
    <div className="container mx-auto px-4 md:px-8 relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center max-w-2xl mx-auto mb-12 md:mb-20"
      >
        <span className="inline-flex items-center rounded-full border border-accent/20 bg-accent/[0.06] px-3.5 py-1 text-accent text-xs font-semibold uppercase tracking-widest mb-6">
          Features
        </span>
        <h2 className="font-display text-3xl sm:text-4xl md:text-[3.25rem] font-bold text-foreground leading-[1.1] tracking-tight">
          Everything your shop needs
        </h2>
        <p className="text-muted-foreground mt-5 text-[15px]">
          Built for chaotic retail — every feature earns its place.
        </p>
      </motion.div>

      <motion.div
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
      >
        {features.map((f) => (
          <motion.div
            key={f.title}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
            }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="group rounded-2xl p-6 md:p-8 border border-border/80 bg-card hover:border-accent/20 hover:shadow-xl hover:shadow-accent/[0.04] transition-all duration-300"
          >
            <div className="w-11 h-11 rounded-xl bg-accent/[0.08] group-hover:bg-accent/[0.12] flex items-center justify-center mb-5 transition-colors duration-300">
              <f.icon className="h-5 w-5 text-accent" strokeWidth={1.8} />
            </div>
            <h3 className="font-display text-[15px] font-semibold text-foreground mb-2">{f.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default FeaturesSection;
