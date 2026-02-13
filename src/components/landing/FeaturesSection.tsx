import { BookOpen, Mic, Package, CreditCard, Scale, ShieldAlert, Undo2, HelpCircle, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

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

const FeatureCard = ({ f }: { f: typeof features[0] }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
    }}
    whileHover={{ y: -6, transition: { duration: 0.25 } }}
    className="group rounded-2xl p-7 md:p-8 border border-border/60 bg-gradient-to-b from-card to-card/80 hover:border-accent/25 hover:shadow-2xl hover:shadow-accent/[0.06] transition-all duration-300"
  >
    <div className="w-12 h-12 rounded-xl bg-accent/[0.08] group-hover:bg-accent/[0.15] flex items-center justify-center mb-6 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-accent/10">
      <f.icon className="h-5 w-5 text-accent" strokeWidth={1.6} />
    </div>
    <h3 className="font-display text-base font-bold text-foreground mb-3 tracking-tight">{f.title}</h3>
    <p className="text-muted-foreground text-[13px] leading-relaxed">{f.desc}</p>
  </motion.div>
);

const FeaturesSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const scrollLeft = el.scrollLeft;
      const cardWidth = el.firstElementChild?.getBoundingClientRect().width ?? 280;
      const gap = 12;
      const index = Math.round(scrollLeft / (cardWidth + gap));
      setActiveIndex(Math.min(index, features.length - 1));
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="features" className="py-20 md:py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(var(--accent)/0.04),transparent_60%)]" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[400px] rounded-full bg-accent/[0.03] blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto mb-16 md:mb-24"
        >
          <span className="inline-flex items-center rounded-full border border-accent/20 bg-accent/[0.06] px-4 py-1.5 text-accent text-[11px] font-bold uppercase tracking-[0.15em] mb-8">
            Features
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-[3.75rem] font-bold text-foreground leading-[1.08] tracking-tight">
            Everything your shop{" "}
            <span className="bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent">
              needs
            </span>
          </h2>
          <p className="text-muted-foreground mt-6 text-base leading-relaxed">
            Built for chaotic retail — every feature earns its place.
          </p>
        </motion.div>

        {/* Mobile: horizontal snap carousel */}
        <div className="sm:hidden">
          <motion.div
            ref={scrollRef}
            className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 scrollbar-hide"
            style={{ WebkitOverflowScrolling: "touch" }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
          >
            {features.map((f) => (
              <div key={f.title} className="snap-start shrink-0 w-[280px]">
                <FeatureCard f={f} />
              </div>
            ))}
          </motion.div>

          <div className="flex items-center justify-center gap-1.5 mt-4">
            {features.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeIndex ? "w-6 bg-accent" : "w-1.5 bg-muted-foreground/20"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Desktop: grid */}
        <motion.div
          className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
        >
          {features.map((f) => (
            <FeatureCard key={f.title} f={f} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
