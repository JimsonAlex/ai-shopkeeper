import { BookOpen, Mic, Package, CreditCard, Scale, ShieldAlert } from "lucide-react";
import FadeIn from "./FadeIn";
import { motion } from "framer-motion";

const features = [
  { icon: BookOpen, title: "Automatic Double-Entry", desc: "Every transaction balanced, every time. No exceptions.", tag: "Core" },
  { icon: Mic, title: "Voice & Photo Input", desc: "Say it or snap it — the AI figures out the rest.", tag: "AI" },
  { icon: Package, title: "Smart Inventory (FIFO)", desc: "Cost layer tracking, low stock alerts, real-time valuation.", tag: "Inventory" },
  { icon: CreditCard, title: "Credit Sale Management", desc: "Track who owes you. Get reminders. Never forget a debt.", tag: "Sales" },
  { icon: Scale, title: "Daily Reconciliation", desc: "Know exactly where every shilling went before you close.", tag: "Finance" },
  { icon: ShieldAlert, title: "AI Fraud Detection", desc: "Spot shortages and suspicious patterns before they grow.", tag: "Security" },
];

const FeaturesSection = () => (
  <section id="features" className="py-24 md:py-32 bg-background relative">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(var(--accent)/0.03),transparent_60%)]" />
    <div className="container mx-auto px-4 md:px-8 relative">
      <FadeIn>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">Features</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-3 leading-tight">
            Everything your shop needs — nothing it doesn't
          </h2>
        </div>
      </FadeIn>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {features.map((f, i) => (
          <FadeIn key={f.title} delay={i * 0.08}>
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="group bg-card border border-border rounded-2xl p-7 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300 h-full"
            >
              <div className="flex items-start justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-accent/10 group-hover:bg-accent/15 flex items-center justify-center transition-colors">
                  <f.icon className="h-5 w-5 text-accent" />
                </div>
                <span className="text-xs font-medium text-muted-foreground px-2.5 py-1 rounded-full bg-muted">{f.tag}</span>
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
