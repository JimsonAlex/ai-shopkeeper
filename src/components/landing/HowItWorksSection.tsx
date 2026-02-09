import { MessageSquare, Zap, Eye, Mic, Camera, Type, ShieldCheck, BarChart3 } from "lucide-react";
import FadeIn from "./FadeIn";
import { motion } from "framer-motion";

const steps = [
  {
    icon: MessageSquare,
    num: "1",
    title: "Onboard in Minutes",
    desc: "The AI asks simple questions: How much cash on hand? What's in stock? Who owes you? Answer by voice, text, or photo — it builds your opening balances automatically.",
    details: [
      "Opening cash & bank balances",
      "Explicit inventory count (high-value items)",
      "Implicit inventory estimates (fast-movers)",
      "Outstanding debts & credits",
    ],
  },
  {
    icon: Zap,
    num: "2",
    title: "Run Your Day Naturally",
    desc: "Record sales, expenses, and purchases using whichever input fits the moment. The AI creates proper double-entry journal entries behind the scenes — balanced every time.",
    details: [
      "Voice: \"Sold 5 bags of cement to John, half cash\"",
      "Photo: Snap a supplier receipt",
      "Text: Quick sale entry on the go",
      "Unrecognized items go to Suspense — never lost",
    ],
  },
  {
    icon: Eye,
    num: "3",
    title: "See the Truth at a Glance",
    desc: "Real-time dashboard showing cash position, true profit margins, FIFO inventory valuation, and who owes you — with a full audit trail your clerk can't tamper with.",
    details: [
      "Live P&L, cash flow, and balance sheet",
      "FIFO cost layers per product",
      "Aging report for credit sales",
      "End-of-day reconciliation in one tap",
    ],
  },
];

const inputMethods = [
  { icon: Mic, label: "Voice Note", example: "\"Sold 3 bags of rice at 5,000 each, M-Pesa\"" },
  { icon: Camera, label: "Receipt Photo", example: "Snap → AI extracts items, amounts, dates" },
  { icon: Type, label: "Quick Text", example: "Type a sale or expense in plain language" },
];

const HowItWorksSection = () => (
  <section id="how-it-works" className="py-24 md:py-32 bg-background relative">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,hsl(var(--accent)/0.04),transparent_50%)]" />
    <div className="container mx-auto px-4 md:px-8 relative">
      <FadeIn>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">How It Works</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-3 leading-tight">
            Three steps to financial clarity
          </h2>
          <p className="text-muted-foreground mt-5 text-lg">
            You talk to your shop. The AI talks to your ledger.
          </p>
        </div>
      </FadeIn>

      {/* Steps */}
      <div className="max-w-3xl mx-auto mb-20">
        {steps.map((s, i) => (
          <FadeIn key={s.num} delay={i * 0.15}>
            <div className="flex gap-6 md:gap-8 relative">
              {i < steps.length - 1 && (
                <div className="absolute left-[31px] top-[72px] bottom-0 w-px bg-gradient-to-b from-accent/30 to-border" />
              )}
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-2xl glass-card bg-accent/5 flex items-center justify-center relative z-10">
                  <s.icon className="h-6 w-6 text-accent" />
                </div>
              </div>
              <div className="pb-14 flex-1">
                <span className="inline-flex items-center gap-1.5 text-accent font-display font-bold text-sm mb-1">
                  <span className="w-5 h-5 rounded-md bg-accent/10 flex items-center justify-center text-xs">{s.num}</span>
                  Step {s.num}
                </span>
                <h3 className="font-display text-xl font-semibold text-foreground mt-1 mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-lg mb-4">{s.desc}</p>
                <ul className="space-y-1.5">
                  {s.details.map((d) => (
                    <li key={d} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="w-1 h-1 rounded-full bg-accent mt-2 flex-shrink-0" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Input methods showcase */}
      <FadeIn delay={0.3}>
        <div className="max-w-4xl mx-auto">
          <h3 className="font-display text-xl font-semibold text-foreground text-center mb-8">
            Three ways to talk to your books
          </h3>
          <div className="grid md:grid-cols-3 gap-5">
            {inputMethods.map((m, i) => (
              <motion.div
                key={m.label}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className="glass-card rounded-2xl p-6 text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <m.icon className="h-5 w-5 text-accent" />
                </div>
                <h4 className="font-display font-semibold text-foreground mb-2">{m.label}</h4>
                <p className="text-muted-foreground text-xs leading-relaxed italic">"{m.example}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </FadeIn>
    </div>
  </section>
);

export default HowItWorksSection;
