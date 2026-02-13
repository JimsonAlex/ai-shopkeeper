import { useState, useRef, useEffect } from "react";
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

const PricingCard = ({ plan, yearly }: { plan: typeof plans[0]; yearly: boolean }) => {
  const price = yearly ? plan.yearlyPrice : plan.monthlyPrice;
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
      }}
      whileHover={{ y: -8, transition: { duration: 0.25 } }}
      className={`rounded-2xl p-7 md:p-9 flex flex-col border transition-all duration-300 ${
        plan.featured
          ? "border-accent/30 bg-gradient-to-b from-card to-accent/[0.03] shadow-2xl shadow-accent/[0.08] relative ring-1 ring-accent/15"
          : "border-border/60 bg-gradient-to-b from-card to-card/80 hover:border-accent/20 hover:shadow-xl hover:shadow-accent/[0.04]"
      }`}
    >
      {plan.featured && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full bg-accent text-accent-foreground text-[10px] font-bold uppercase tracking-[0.12em] shadow-lg shadow-accent/30">
          Most Popular
        </span>
      )}
      <div className="mb-8">
        <h3 className="font-display text-base font-bold text-foreground mb-4 tracking-tight">{plan.name}</h3>
        <div className="flex items-baseline gap-1.5">
          <motion.span
            key={price}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="font-display text-5xl font-bold text-foreground tracking-tight"
          >
            {price}
          </motion.span>
          {plan.period && <span className="text-muted-foreground text-sm">{plan.period}</span>}
        </div>
        {yearly && price !== "Free" && (
          <p className="text-xs text-accent font-semibold mt-2">Billed annually — save 20%</p>
        )}
        <p className="text-sm mt-4 text-muted-foreground leading-relaxed">{plan.desc}</p>
      </div>

      <ul className="space-y-4 mb-10 flex-1">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-sm">
            <div className="w-5 h-5 rounded-full bg-accent/[0.08] flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check className="h-3 w-3 text-accent" strokeWidth={3} />
            </div>
            <span className="text-muted-foreground">{f}</span>
          </li>
        ))}
      </ul>

      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button
          className={`w-full font-bold rounded-xl h-12 text-sm tracking-wide ${
            plan.featured
              ? "bg-accent text-accent-foreground hover:bg-accent/90 shadow-xl shadow-accent/25"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          {plan.cta} {plan.featured && <ArrowRight className="ml-1.5 h-4 w-4" />}
        </Button>
      </motion.div>
    </motion.div>
  );
};

const PricingSection = () => {
  const [yearly, setYearly] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(1);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const cardWidth = 280;
    const gap = 12;
    el.scrollLeft = (cardWidth + gap) * 1;

    const handleScroll = () => {
      const scrollLeft = el.scrollLeft;
      const cw = el.firstElementChild?.getBoundingClientRect().width ?? cardWidth;
      const index = Math.round(scrollLeft / (cw + gap));
      setActiveIndex(Math.min(index, plans.length - 1));
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="pricing" className="py-20 md:py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--accent)/0.04),transparent_60%)]" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-accent/[0.03] blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto mb-16 md:mb-24"
        >
          <span className="inline-flex items-center rounded-full border border-accent/20 bg-accent/[0.06] px-4 py-1.5 text-accent text-[11px] font-bold uppercase tracking-[0.15em] mb-8">
            Pricing
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-[3.75rem] font-bold text-foreground leading-[1.08] tracking-tight">
            Simple pricing,{" "}
            <span className="bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent">
              no surprises
            </span>
          </h2>
          <p className="text-muted-foreground mt-6 text-base leading-relaxed">
            Start free. Upgrade when you're ready.
          </p>

          {/* Billing toggle */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <span className={`text-sm font-semibold transition-colors ${!yearly ? "text-foreground" : "text-muted-foreground"}`}>
              Monthly
            </span>
            <button
              onClick={() => setYearly(!yearly)}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                yearly ? "bg-accent" : "bg-border"
              }`}
              aria-label="Toggle yearly billing"
            >
              <span
                className={`inline-block h-6 w-6 rounded-full bg-white shadow-md transition-transform ${
                  yearly ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
            <span className={`text-sm font-semibold transition-colors ${yearly ? "text-foreground" : "text-muted-foreground"}`}>
              Yearly
            </span>
            {yearly && (
              <span className="text-[11px] font-bold text-accent bg-accent/[0.08] px-3 py-1 rounded-full">
                Save 20%
              </span>
            )}
          </div>
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
            {plans.map((plan) => (
              <div key={plan.name} className="snap-start shrink-0 w-[280px]">
                <PricingCard plan={plan} yearly={yearly} />
              </div>
            ))}
          </motion.div>

          <div className="flex items-center justify-center gap-1.5 mt-4">
            {plans.map((_, i) => (
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
          className="hidden sm:grid md:grid-cols-3 gap-5 max-w-md sm:max-w-lg md:max-w-5xl mx-auto items-start"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {plans.map((plan) => (
            <PricingCard key={plan.name} plan={plan} yearly={yearly} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
