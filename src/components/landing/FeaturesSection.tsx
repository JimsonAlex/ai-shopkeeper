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
  <section id="features" className="py-24 md:py-32 bg-primary relative">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(var(--accent)/0.04),transparent_60%)]" />
    <div className="container mx-auto px-4 md:px-8 relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center max-w-2xl mx-auto mb-16"
      >
        <span className="text-accent font-semibold text-sm uppercase tracking-widest">Features</span>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mt-3 leading-tight">
          Everything your shop needs
        </h2>
        <p className="text-primary-foreground/40 mt-4 text-base">
          Built for chaotic retail — every feature earns its place.
        </p>
      </motion.div>

      <motion.div
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
      >
        {features.map((f) => (
          <motion.div
            key={f.title}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
            }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="group rounded-2xl p-7 border border-primary-foreground/8 bg-primary-foreground/[0.02] hover:border-accent/20 hover:bg-primary-foreground/[0.04] transition-all duration-300"
          >
            <div className="w-11 h-11 rounded-xl bg-accent/10 group-hover:bg-accent/15 flex items-center justify-center mb-5 transition-colors">
              <f.icon className="h-5 w-5 text-accent" />
            </div>
            <h3 className="font-display text-base font-semibold text-primary-foreground mb-2">{f.title}</h3>
            <p className="text-primary-foreground/40 text-sm leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default FeaturesSection;
