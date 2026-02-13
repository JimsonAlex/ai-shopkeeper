import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
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
      "Basic reports",
      "Single user",
    ],
    cta: "Start Free",
    featured: false,
  },
  {
    name: "Growth",
    price: "$9",
    period: "/month",
    desc: "Full power for serious shop owners.",
    features: [
      "Unlimited transactions",
      "Voice, photo & text",
      "Full accounting suite",
      "AI fraud detection",
      "FIFO inventory",
      "Daily reconciliation",
      "Up to 3 users",
    ],
    cta: "Join Waitlist",
    featured: true,
  },
  {
    name: "Business",
    price: "$29",
    period: "/month",
    desc: "For multi-shop operations.",
    features: [
      "Everything in Growth",
      "Unlimited shops & users",
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
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--accent)/0.04),transparent_60%)]" />
    <div className="container mx-auto px-4 md:px-8 relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center max-w-2xl mx-auto mb-16"
      >
        <span className="text-accent font-semibold text-sm uppercase tracking-widest">Pricing</span>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-3 leading-tight">
          Simple pricing, no surprises
        </h2>
        <p className="text-muted-foreground mt-4 text-sm">
          Start free. Upgrade when you're ready.
        </p>
      </motion.div>

      <motion.div
        className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        {plans.map((plan) => (
          <motion.div
            key={plan.name}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
            }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className={`rounded-2xl p-8 flex flex-col border ${
              plan.featured
                ? "border-accent/30 bg-card shadow-2xl shadow-accent/5 relative"
                : "border-border bg-card"
            }`}
          >
            {plan.featured && (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-accent text-accent-foreground text-xs font-bold uppercase tracking-wide">
                Most Popular
              </span>
            )}
            <div className="mb-6">
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1">
                <span className="font-display text-4xl font-bold text-foreground">{plan.price}</span>
                {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
              </div>
              <p className="text-sm mt-2 text-muted-foreground">{plan.desc}</p>
            </div>

            <ul className="space-y-3 mb-8 flex-1">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm">
                  <Check className="h-4 w-4 mt-0.5 flex-shrink-0 text-accent" />
                  <span className="text-muted-foreground">{f}</span>
                </li>
              ))}
            </ul>

            <Button
              className={`w-full font-semibold rounded-xl h-11 ${
                plan.featured
                  ? "bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/20"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {plan.cta} {plan.featured && <ArrowRight className="ml-1 h-4 w-4" />}
            </Button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default PricingSection;
