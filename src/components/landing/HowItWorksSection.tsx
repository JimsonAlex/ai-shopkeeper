import {
  Mic,
  Brain,
  BarChart3,
  Camera,
  MessageSquare,
  FileSpreadsheet,
  ArrowRight,
  BookOpen,
  TrendingUp,
  Wallet,
  Users,
  Package,
} from "lucide-react";
import { motion } from "framer-motion";

/* ── Step data ── */
const steps = [
  {
    icon: Mic,
    num: "01",
    title: "Talk, Snap, or Type",
    desc: "Send a voice note — \"Sold 5 bags of cement to John, half on credit.\" Snap a receipt. Paste from a notebook. The AI accepts your chaos and makes sense of it.",
    inputs: [
      { icon: Mic, label: "Voice" },
      { icon: Camera, label: "Photo" },
      { icon: MessageSquare, label: "Text" },
      { icon: FileSpreadsheet, label: "CSV" },
    ],
    color: "accent",
  },
  {
    icon: Brain,
    num: "02",
    title: "Double-Entry Engine Kicks In",
    desc: "The invisible CFO creates balanced journal entries — every sale debits cash & COGS, credits revenue & inventory. FIFO cost layers update automatically. No entry is ever unbalanced.",
    ledger: [
      { account: "DR  Cash", amount: "+75,000" },
      { account: "DR  COGS", amount: "+45,000" },
      { account: "CR  Sales Revenue", amount: "−75,000" },
      { account: "CR  Inventory", amount: "−45,000" },
    ],
    badge: "Zero accounting knowledge needed",
    color: "accent",
  },
  {
    icon: BarChart3,
    num: "03",
    title: "See Your Real Profit",
    desc: "Not just revenue — true profit. Real-time cash position, gross margins, FIFO inventory value, and outstanding debts. Every shilling accounted for, every transaction.",
    metrics: [
      { icon: Wallet, label: "Cash Position", value: "2.4M" },
      { icon: TrendingUp, label: "Gross Margin", value: "34%" },
      { icon: Package, label: "Inventory", value: "1.8M" },
      { icon: Users, label: "Receivables", value: "420K" },
    ],
    badge: "Updates after every transaction",
    color: "accent",
  },
];

/* ── Animated connector arrow (desktop) ── */
const ConnectorArrow = ({ delay }: { delay: number }) => (
  <motion.div
    className="hidden md:flex items-center justify-center absolute top-[4.5rem] z-20"
    initial={{ opacity: 0, scale: 0 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay, type: "spring", stiffness: 200 }}
  >
    <div className="w-9 h-9 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
      <ArrowRight className="h-4 w-4 text-accent" strokeWidth={2} />
    </div>
  </motion.div>
);

const HowItWorksSection = () => (
  <section id="how-it-works" className="py-20 md:py-32 bg-background relative overflow-hidden">
    {/* Layered background */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--accent)/0.04),transparent_50%)]" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-accent/[0.02] blur-[120px] pointer-events-none" />

    <div className="container mx-auto px-4 md:px-8 relative">
      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center max-w-2xl mx-auto mb-16 md:mb-24"
      >
        <span className="inline-flex items-center rounded-full border border-accent/20 bg-accent/[0.06] px-4 py-1.5 text-accent text-[11px] font-bold uppercase tracking-[0.15em] mb-8">
          How It Works
        </span>
        <h2 className="font-display text-4xl sm:text-5xl md:text-[3.75rem] font-bold text-foreground leading-[1.08] tracking-tight">
          From messy input to{" "}
          <span className="bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent">
            bank-grade books
          </span>
        </h2>
        <p className="mt-5 text-muted-foreground text-base leading-relaxed max-w-lg mx-auto">
          You sell. The AI enforces double-entry accounting behind every transaction — automatically, invisibly, perfectly.
        </p>
      </motion.div>

      {/* ── Steps grid ── */}
      <div className="grid md:grid-cols-3 gap-5 md:gap-6 max-w-[68rem] mx-auto relative">
        {/* Connector line */}
        <div className="hidden md:block absolute top-[4.5rem] left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-accent/15 to-transparent z-10" />

        {/* Connector arrows positioned between cards */}
        <div className="hidden md:block absolute top-0 left-[33.33%] -translate-x-1/2 z-20">
          <ConnectorArrow delay={0.5} />
        </div>
        <div className="hidden md:block absolute top-0 left-[66.66%] -translate-x-1/2 z-20">
          <ConnectorArrow delay={0.7} />
        </div>

        {steps.map((s, i) => (
          <motion.div
            key={s.num}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.15, ease: "easeOut" }}
            whileHover={{ y: -8, transition: { duration: 0.25 } }}
            className="rounded-2xl p-7 md:p-9 relative border border-border/60 bg-gradient-to-b from-card to-card/80 hover:border-accent/25 hover:shadow-2xl hover:shadow-accent/[0.06] transition-all duration-300 flex flex-col"
          >
            {/* Background number */}
            <motion.span
              className="font-display text-[7rem] font-black text-accent/[0.04] absolute -top-2 right-3 select-none leading-none"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.1, type: "spring" }}
            >
              {s.num}
            </motion.span>

            {/* Icon */}
            <div className="w-16 h-16 rounded-2xl bg-accent/[0.08] flex items-center justify-center mb-7 relative z-10">
              <s.icon className="h-7 w-7 text-accent" strokeWidth={1.6} />
            </div>

            <h3 className="font-display text-xl font-bold text-foreground mb-3 tracking-tight">{s.title}</h3>
            <p className="text-muted-foreground text-[13px] leading-relaxed mb-6 flex-1">{s.desc}</p>

            {/* ── Step 1: Input methods ── */}
            {s.inputs && (
              <div className="flex items-center gap-2 pt-4 border-t border-border/40">
                {s.inputs.map((item) => (
                  <span
                    key={item.label}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-accent/[0.06] border border-accent/10 px-2.5 py-1.5 text-[11px] text-accent/80 font-semibold"
                  >
                    <item.icon className="h-3.5 w-3.5" strokeWidth={1.8} />
                    {item.label}
                  </span>
                ))}
              </div>
            )}

            {/* ── Step 2: Live ledger preview ── */}
            {s.ledger && (
              <div className="space-y-3 pt-4 border-t border-border/40">
                <div className="flex items-center gap-1.5 mb-2">
                  <BookOpen className="h-3.5 w-3.5 text-accent/60" strokeWidth={1.8} />
                  <span className="text-[10px] text-accent/60 font-bold uppercase tracking-wider">Journal Entry</span>
                </div>
                <div className="rounded-lg bg-background/60 border border-border/40 overflow-hidden font-mono text-[11px]">
                  {s.ledger.map((entry, idx) => (
                    <div
                      key={entry.account}
                      className={`flex items-center justify-between px-3 py-1.5 ${
                        idx < s.ledger!.length - 1 ? "border-b border-border/30" : ""
                      } ${entry.account.startsWith("DR") ? "text-emerald-400/80" : "text-rose-400/70"}`}
                    >
                      <span className="truncate">{entry.account}</span>
                      <span className="font-semibold tabular-nums">{entry.amount}</span>
                    </div>
                  ))}
                </div>
                {s.badge && (
                  <span className="inline-flex items-center rounded-full bg-accent/[0.08] px-3 py-1 text-accent text-[10px] font-bold uppercase tracking-wider">
                    {s.badge}
                  </span>
                )}
              </div>
            )}

            {/* ── Step 3: Live metrics ── */}
            {s.metrics && (
              <div className="space-y-3 pt-4 border-t border-border/40">
                <div className="grid grid-cols-2 gap-2">
                  {s.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="rounded-lg bg-background/60 border border-border/40 px-3 py-2.5 text-center"
                    >
                      <m.icon className="h-4 w-4 text-accent/50 mx-auto mb-1" strokeWidth={1.6} />
                      <p className="font-display text-base font-bold text-foreground tabular-nums">{m.value}</p>
                      <p className="text-[10px] text-muted-foreground/60 font-medium">{m.label}</p>
                    </div>
                  ))}
                </div>
                {s.badge && (
                  <span className="inline-flex items-center rounded-full bg-accent/[0.08] px-3 py-1 text-accent text-[10px] font-bold uppercase tracking-wider">
                    {s.badge}
                  </span>
                )}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorksSection;
