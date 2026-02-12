import { MessageSquare, Zap, Eye, Mic, Camera, Type, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: MessageSquare,
    num: "01",
    title: "Onboard in Minutes",
    desc: "The AI asks simple questions — cash on hand, stock count, who owes you. Answer naturally and it builds your opening balances.",
    visual: (
      <div className="rounded-2xl bg-primary/5 border border-border/50 p-5 space-y-3">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Zap className="w-4 h-4 text-accent" />
          </div>
          <div className="glass-card rounded-xl px-4 py-3 text-sm text-muted-foreground flex-1">
            How much cash do you have on hand right now?
          </div>
        </div>
        <div className="flex items-start gap-3 justify-end">
          <div className="bg-accent/10 rounded-xl px-4 py-3 text-sm text-foreground">
            About 45,000 in the drawer
          </div>
          <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-xs font-bold text-accent-foreground">Y</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-accent pt-1">
          <CheckCircle2 className="w-3.5 h-3.5" />
          Opening balance recorded: KES 45,000
        </div>
      </div>
    ),
  },
  {
    icon: Zap,
    num: "02",
    title: "Run Your Day Naturally",
    desc: "Record sales, expenses, and purchases your way. The AI creates proper double-entry journal entries — balanced every time.",
    visual: (
      <div className="rounded-2xl bg-primary/5 border border-border/50 p-5 space-y-2.5">
        <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium uppercase tracking-wider mb-2">
          <Mic className="w-3.5 h-3.5 text-accent" /> Voice transcription
        </div>
        <div className="bg-accent/10 rounded-xl px-4 py-3 text-sm text-foreground italic">
          "Sold 5 bags of cement to John, 3 cash 2 on credit"
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground py-1">
          <ArrowRight className="w-3 h-3" /> AI processed
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="glass-card rounded-lg p-3">
            <span className="text-muted-foreground">Debit</span>
            <p className="text-foreground font-medium mt-1">Cash: KES 15,000</p>
            <p className="text-foreground font-medium">Receivable: KES 10,000</p>
          </div>
          <div className="glass-card rounded-lg p-3">
            <span className="text-muted-foreground">Credit</span>
            <p className="text-foreground font-medium mt-1">Revenue: KES 25,000</p>
            <p className="text-foreground font-medium">Inventory: -5 bags</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    icon: Eye,
    num: "03",
    title: "See the Truth at a Glance",
    desc: "Real-time dashboard — cash position, true profit margins, FIFO inventory, and who owes you. Full audit trail included.",
    visual: (
      <div className="rounded-2xl bg-primary/5 border border-border/50 p-5 space-y-3">
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Cash", value: "KES 142K", trend: "+12%" },
            { label: "Profit", value: "KES 38K", trend: "+8%" },
            { label: "Owed", value: "KES 24K", trend: "3 debtors" },
          ].map((m) => (
            <div key={m.label} className="glass-card rounded-lg p-3 text-center">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{m.label}</p>
              <p className="text-sm font-bold text-foreground mt-1">{m.value}</p>
              <p className="text-[10px] text-accent mt-0.5">{m.trend}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
            <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-accent to-accent/60" />
          </div>
          <span className="text-xs text-muted-foreground">68% margin</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-accent">
          <CheckCircle2 className="w-3.5 h-3.5" />
          All 47 transactions reconciled today
        </div>
      </div>
    ),
  },
];

const inputMethods = [
  {
    icon: Mic,
    label: "Voice Note",
    example: "\"Sold 3 bags of rice at 5,000 each, M-Pesa\"",
    color: "from-accent/20 to-accent/5",
  },
  {
    icon: Camera,
    label: "Receipt Photo",
    example: "Snap a receipt → AI extracts items, amounts & dates automatically",
    color: "from-accent/15 to-accent/5",
  },
  {
    icon: Type,
    label: "Quick Text",
    example: "Type a sale or expense in plain language — the AI handles the rest",
    color: "from-accent/10 to-accent/5",
  },
];

const HowItWorksSection = () => (
  <section id="how-it-works" className="py-24 md:py-32 bg-background relative overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--accent)/0.04),transparent_50%)]" />
    <div className="container mx-auto px-4 md:px-8 relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center max-w-2xl mx-auto mb-20"
      >
        <motion.span
          className="text-accent font-semibold text-sm uppercase tracking-widest inline-block"
          initial={{ opacity: 0, letterSpacing: "0.05em" }}
          whileInView={{ opacity: 1, letterSpacing: "0.2em" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          How It Works
        </motion.span>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-3 leading-tight">
          Three steps to financial clarity
        </h2>
        <p className="text-muted-foreground mt-5 text-lg">
          You talk to your shop. The AI talks to your ledger.
        </p>
      </motion.div>

      {/* Steps — alternating layout */}
      <div className="max-w-5xl mx-auto space-y-16 md:space-y-24 mb-24">
        {steps.map((s, i) => (
          <div
            key={s.num}
            className={`flex flex-col ${i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} gap-8 md:gap-14 items-center`}
          >
            {/* Text side */}
            <motion.div
              className="flex-1 space-y-4"
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="flex items-center gap-3">
                <motion.span
                  className="font-display text-4xl md:text-5xl font-black text-accent/15"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1, type: "spring" }}
                >
                  {s.num}
                </motion.span>
                <motion.div
                  className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center"
                  initial={{ rotate: -20, opacity: 0 }}
                  whileInView={{ rotate: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
                >
                  <s.icon className="h-5 w-5 text-accent" />
                </motion.div>
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground">{s.title}</h3>
              <p className="text-muted-foreground leading-relaxed max-w-md">{s.desc}</p>
            </motion.div>
            {/* Visual side */}
            <motion.div
              className="flex-1 w-full"
              initial={{ opacity: 0, x: i % 2 === 0 ? 50 : -50, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
            >
              {s.visual}
            </motion.div>
          </div>
        ))}
      </div>

      {/* Input methods — bolder cards */}
      <div className="max-w-4xl mx-auto">
        <motion.h3
          className="font-display text-xl md:text-2xl font-bold text-foreground text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Three ways to talk to your books
        </motion.h3>
        <div className="grid md:grid-cols-3 gap-6">
          {inputMethods.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" as const }}
              whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.25 } }}
              className={`relative rounded-2xl border border-border/50 p-7 bg-gradient-to-b ${m.color} overflow-hidden group`}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
              <div className="relative">
                <motion.div
                  className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors"
                  initial={{ rotate: -15, opacity: 0 }}
                  whileInView={{ rotate: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1, type: "spring" }}
                >
                  <m.icon className="h-6 w-6 text-accent" />
                </motion.div>
                <h4 className="font-display font-bold text-foreground text-lg mb-3">{m.label}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{m.example}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default HowItWorksSection;
