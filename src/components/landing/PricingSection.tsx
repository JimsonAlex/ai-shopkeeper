import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Starter",
    monthlyPrice: "Free",
    yearlyPrice: "Free",
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
    monthlyPrice: "$9",
    yearlyPrice: "$7",
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
    monthlyPrice: "$29",
    yearlyPrice: "$24",
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

const PricingSection = () => {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" className="py-16 md:py-28 bg-background relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--accent)/0.03),transparent_60%)]" />
      <div className="container mx-auto px-4 md:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto mb-12 md:mb-20"
        >
          <span className="inline-flex items-center rounded-full border border-accent/20 bg-accent/[0.06] px-3.5 py-1 text-accent text-xs font-semibold uppercase tracking-widest mb-6">
            Pricing
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-[3.25rem] font-bold text-foreground leading-[1.1] tracking-tight">
            Simple pricing, no surprises
          </h2>
          <p className="text-muted-foreground mt-5 text-[15px]">
            Start free. Upgrade when you're ready.
          </p>

          {/* Billing toggle */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <span className={`text-sm font-medium transition-colors ${!yearly ? "text-foreground" : "text-muted-foreground"}`}>
              Monthly
            </span>
            <button
              onClick={() => setYearly(!yearly)}
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                yearly ? "bg-accent" : "bg-border"
              }`}
              aria-label="Toggle yearly billing"
            >
              <span
                className={`inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                  yearly ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span className={`text-sm font-medium transition-colors ${yearly ? "text-foreground" : "text-muted-foreground"}`}>
              Yearly
            </span>
            {yearly && (
              <span className="text-[11px] font-semibold text-accent bg-accent/[0.08] px-2.5 py-0.5 rounded-full">
                Save 20%
              </span>
            )}
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-4 md:grid-cols-3 max-w-md sm:max-w-lg md:max-w-5xl mx-auto items-start"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {plans.map((plan) => {
            const price = yearly ? plan.yearlyPrice : plan.monthlyPrice;
            return (
              <motion.div
                key={plan.name}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
                }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className={`rounded-2xl p-6 md:p-8 flex flex-col border ${
                  plan.featured
                    ? "border-accent/25 bg-card shadow-2xl shadow-accent/[0.06] relative ring-1 ring-accent/10"
                    : "border-border/80 bg-card"
                }`}
              >
                {plan.featured && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-accent text-accent-foreground text-[11px] font-bold uppercase tracking-wider">
                    Most Popular
                  </span>
                )}
                <div className="mb-7">
                  <h3 className="font-display text-base font-semibold text-foreground mb-3">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <motion.span
                      key={price}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25 }}
                      className="font-display text-4xl font-bold text-foreground tracking-tight"
                    >
                      {price}
                    </motion.span>
                    {plan.period && <span className="text-muted-foreground text-sm">{plan.period}</span>}
                  </div>
                  {yearly && price !== "Free" && (
                    <p className="text-xs text-muted-foreground mt-1.5">
                      Billed annually
                    </p>
                  )}
                  <p className="text-sm mt-3 text-muted-foreground">{plan.desc}</p>
                </div>

                <ul className="space-y-3.5 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <Check className="h-4 w-4 mt-0.5 flex-shrink-0 text-accent" strokeWidth={2.5} />
                      <span className="text-muted-foreground">{f}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full font-semibold rounded-xl h-11 text-sm ${
                    plan.featured
                      ? "bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/20"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {plan.cta} {plan.featured && <ArrowRight className="ml-1 h-4 w-4" />}
                </Button>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
