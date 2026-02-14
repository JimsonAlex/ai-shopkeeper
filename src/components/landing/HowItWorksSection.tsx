import { Mic, Brain, BarChart3, Camera, MessageSquare, FileSpreadsheet } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: Mic,
    num: "01",
    title: "Talk, Snap, or Type",
    desc: "Send a voice note — \"Sold 5 bags of cement to John, half on credit.\" Snap a receipt photo. Paste from a notebook. The AI accepts your chaos.",
    supporting: [
      { icon: Camera, label: "Photo" },
      { icon: MessageSquare, label: "Text" },
      { icon: FileSpreadsheet, label: "CSV" },
    ],
  },
  {
    icon: Brain,
    num: "02",
    title: "AI Does the Accounting",
    desc: "Behind the scenes, the system creates balanced double-entry journals — debiting cash, crediting revenue, updating FIFO inventory layers. Bank-grade accuracy, zero effort.",
    highlight: "No accounting knowledge required",
  },
  {
    icon: BarChart3,
    num: "03",
    title: "Know Your Real Profit",
    desc: "See exactly where every shilling went. Real-time cash position, true profit margins (not just revenue), inventory value, and who owes you — all at a glance.",
    highlight: "Updated after every transaction",
  },
];

const HowItWorksSection = () => (
  <section id="how-it-works" className="py-20 md:py-32 bg-background relative overflow-hidden">
    {/* Layered background */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--accent)/0.04),transparent_50%)]" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/[0.02] blur-[100px] pointer-events-none" />

    <div className="container mx-auto px-4 md:px-8 relative">
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
            financial clarity
          </span>
        </h2>
        <p className="mt-5 text-muted-foreground text-base leading-relaxed max-w-lg mx-auto">
          You handle the selling. The AI handles the bookkeeping. Three steps — that's all it takes.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto relative">
        {/* Connector line on desktop */}
        <div className="hidden md:block absolute top-[5rem] left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

        {steps.map((s, i) => (
          <motion.div
            key={s.num}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.15, ease: "easeOut" }}
            whileHover={{ y: -8, transition: { duration: 0.25 } }}
            className="rounded-2xl p-7 md:p-9 text-center relative border border-border/60 bg-gradient-to-b from-card to-card/80 hover:border-accent/25 hover:shadow-2xl hover:shadow-accent/[0.06] transition-all duration-300"
          >
            {/* Large background number */}
            <motion.span
              className="font-display text-8xl font-black text-accent/[0.05] absolute top-2 right-4 select-none"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.1, type: "spring" }}
            >
              {s.num}
            </motion.span>

            {/* Icon */}
            <div className="w-16 h-16 rounded-2xl bg-accent/[0.08] flex items-center justify-center mx-auto mb-7 relative z-10">
              <s.icon className="h-7 w-7 text-accent" strokeWidth={1.6} />
            </div>

            <h3 className="font-display text-lg font-bold text-foreground mb-4 tracking-tight">{s.title}</h3>
            <p className="text-muted-foreground text-[13px] leading-relaxed mb-5">{s.desc}</p>

            {/* Supporting input icons for step 1 */}
            {s.supporting && (
              <div className="flex items-center justify-center gap-3 pt-2 border-t border-border/40">
                {s.supporting.map((item) => (
                  <span
                    key={item.label}
                    className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground/60 font-medium"
                  >
                    <item.icon className="h-3.5 w-3.5" strokeWidth={1.5} />
                    {item.label}
                  </span>
                ))}
              </div>
            )}

            {/* Highlight badge for steps 2 & 3 */}
            {s.highlight && (
              <span className="inline-flex items-center rounded-full bg-accent/[0.08] px-3 py-1 text-accent text-[10px] font-bold uppercase tracking-wider mt-1">
                {s.highlight}
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorksSection;
