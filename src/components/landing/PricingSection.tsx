import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import FadeIn from "./FadeIn";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    desc: "Perfect for getting started with your first shop.",
    features: [
      "Up to 50 transactions/month",
      "Voice & text input",
      "Basic accounting reports",
      "Single user",
      "1 shop",
    ],
    cta: "Start Free",
    featured: false,
  },
  {
    name: "Growth",
    price: "$9",
    period: "/month",
    desc: "For shops that need full power and real-time insights.",
    features: [
      "Unlimited transactions",
      "Voice, photo & text input",
      "Full accounting suite",
      "AI fraud detection",
      "FIFO inventory tracking",
      "Daily reconciliation",
      "Up to 3 users",
      "Priority support",
    ],
    cta: "Join Waitlist",
    featured: true,
  },
  {
    name: "Business",
    price: "$29",
    period: "/month",
    desc: "For multi-shop operations and growing teams.",
    features: [
      "Everything in Growth",
      "Unlimited shops",
      "Unlimited users",
      "Advanced analytics",
      "API access",
      "Dedicated support",
    ],
    cta: "Contact Sales",
    featured: false,
  },
];

const PricingSection = () => (
  <section id="pricing" className="py-24 md:py-32 bg-background relative">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--accent)/0.05),transparent_60%)]" />
    <div className="container mx-auto px-4 md:px-8 relative">
      <FadeIn>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">Pricing</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-3 leading-tight">
            Simple pricing, no surprises
          </h2>
          <p className="text-muted-foreground mt-5 text-lg">
            Start free. Upgrade when you're ready.
          </p>
        </div>
      </FadeIn>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">
        {plans.map((plan, i) => (
          <FadeIn key={plan.name} delay={i * 0.1}>
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className={`rounded-2xl p-8 h-full flex flex-col ${
                plan.featured
                  ? "glass-dark bg-primary/90 text-primary-foreground border-2 border-accent/30 shadow-2xl shadow-accent/10 relative"
                  : "glass-card text-foreground"
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-accent text-accent-foreground text-xs font-bold uppercase tracking-wide">
                  Most Popular
                </span>
              )}
              <div className="mb-6">
                <h3 className="font-display text-lg font-semibold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-4xl font-bold">{plan.price}</span>
                  {plan.period && <span className={plan.featured ? "text-primary-foreground/50" : "text-muted-foreground"}>{plan.period}</span>}
                </div>
                <p className={`text-sm mt-2 ${plan.featured ? "text-primary-foreground/50" : "text-muted-foreground"}`}>{plan.desc}</p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <Check className="h-4 w-4 mt-0.5 flex-shrink-0 text-accent" />
                    <span className={plan.featured ? "text-primary-foreground/70" : "text-muted-foreground"}>{f}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full font-semibold ${
                  plan.featured
                    ? "bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/25"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {plan.cta} {plan.featured && <ArrowRight className="ml-1 h-4 w-4" />}
              </Button>
            </motion.div>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);

export default PricingSection;
