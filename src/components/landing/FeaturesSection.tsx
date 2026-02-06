import { BookOpen, Mic, Package, CreditCard, Scale, ShieldAlert } from "lucide-react";
import FadeIn from "./FadeIn";

const features = [
  { icon: BookOpen, title: "Automatic Double-Entry", desc: "Every transaction balanced, every time. No exceptions." },
  { icon: Mic, title: "Voice & Photo Input", desc: "Say it or snap it — the AI figures out the rest." },
  { icon: Package, title: "Smart Inventory (FIFO)", desc: "Cost layer tracking, low stock alerts, real-time valuation." },
  { icon: CreditCard, title: "Credit Sale Management", desc: "Track who owes you. Get reminders. Never forget a debt." },
  { icon: Scale, title: "Daily Reconciliation", desc: "Know exactly where every shilling went before you close." },
  { icon: ShieldAlert, title: "AI Fraud Detection", desc: "Spot shortages and suspicious patterns before they grow." },
];

const FeaturesSection = () => (
  <section id="features" className="py-20 md:py-28 bg-background">
    <div className="container mx-auto px-4 md:px-8">
      <FadeIn>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">Features</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3">
            Everything your shop needs — nothing it doesn't
          </h2>
        </div>
      </FadeIn>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {features.map((f, i) => (
          <FadeIn key={f.title} delay={i * 0.08}>
            <div className="group bg-card border border-border rounded-xl p-6 hover:border-accent/40 hover:shadow-lg transition-all duration-300">
              <div className="w-11 h-11 rounded-lg bg-accent/10 group-hover:bg-accent/20 flex items-center justify-center mb-4 transition-colors">
                <f.icon className="h-5 w-5 text-accent" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
