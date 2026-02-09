import { BookOpen, Mic, Package, CreditCard, Scale, ShieldAlert, Undo2, HelpCircle, Users, Lock } from "lucide-react";
import FadeIn from "./FadeIn";
import { motion } from "framer-motion";

const features = [
  {
    icon: BookOpen,
    title: "Immutable Double-Entry Ledger",
    desc: "Every transaction auto-balanced across assets, liabilities, equity, revenue, and expenses. The ledger is append-only — no deletions, ever.",
    tag: "Core",
    detail: "Bank-grade accuracy",
  },
  {
    icon: Mic,
    title: "AI-Driven Data Capture",
    desc: "Voice notes, receipt photos, or quick text — the AI parses amounts, products, and payment terms, then creates proper journal entries.",
    tag: "AI",
    detail: "3 input modes",
  },
  {
    icon: Package,
    title: "Hybrid Inventory (FIFO)",
    desc: "High-value items like cement get real-time stock tracking. High-velocity items like nails are inferred and updated via periodic cycle counts.",
    tag: "Inventory",
    detail: "Explicit + Implicit",
  },
  {
    icon: Undo2,
    title: "Reversing Entry Corrections",
    desc: "Made a mistake? Corrections are posted as reversing entries — your original record stays intact and the audit trail remains clean.",
    tag: "Audit",
    detail: "Immutable history",
  },
  {
    icon: HelpCircle,
    title: "Suspense Account Routing",
    desc: "Can't categorize an input? It's booked to a Suspense account — never ignored, never lost. Resolve it later when you have clarity.",
    tag: "Safety",
    detail: "Zero data loss",
  },
  {
    icon: CreditCard,
    title: "Credit Sale Management",
    desc: "Track who owes you with automatic reminders. Partial payments, payment terms, and aging reports — all handled.",
    tag: "Sales",
    detail: "Debt tracking",
  },
  {
    icon: Scale,
    title: "Daily Reconciliation",
    desc: "End-of-day cash count vs. system balance. Spot discrepancies instantly before they become problems.",
    tag: "Finance",
    detail: "Every shilling tracked",
  },
  {
    icon: ShieldAlert,
    title: "AI Fraud Detection",
    desc: "Pattern analysis flags suspicious voids, unusual refunds, and inventory shortages before they snowball.",
    tag: "Security",
    detail: "Early warning system",
  },
  {
    icon: Lock,
    title: "Absolute Tenant Isolation",
    desc: "Each shop's data is completely walled off. No cross-tenant access, no shared databases. Your numbers are yours alone.",
    tag: "Privacy",
    detail: "Zero-trust architecture",
  },
];

const FeaturesSection = () => (
  <section id="features" className="py-24 md:py-32 bg-background relative">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(var(--accent)/0.06),transparent_60%)]" />
    <div className="container mx-auto px-4 md:px-8 relative">
      <FadeIn>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">Features</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-3 leading-tight">
            Ramp for chaotic retail — every feature earns its place
          </h2>
          <p className="text-muted-foreground mt-5 text-lg">
            Double-entry is mandatory. The ledger is immutable. Nothing gets lost.
          </p>
        </div>
      </FadeIn>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {features.map((f, i) => (
          <FadeIn key={f.title} delay={i * 0.06}>
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="group glass-card rounded-2xl p-7 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300 h-full flex flex-col"
            >
              <div className="flex items-start justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-accent/10 group-hover:bg-accent/15 flex items-center justify-center transition-colors">
                  <f.icon className="h-5 w-5 text-accent" />
                </div>
                <span className="text-xs font-medium text-muted-foreground px-2.5 py-1 rounded-full bg-accent/5 border border-accent/10">{f.tag}</span>
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed flex-1">{f.desc}</p>
              <div className="mt-4 pt-3 border-t border-border/50">
                <span className="text-xs font-medium text-accent">{f.detail}</span>
              </div>
            </motion.div>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
