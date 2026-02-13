import { Mic, Camera, MessageSquare, BarChart3, TrendingUp, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import FadeIn from "./FadeIn";

const metrics = [
  { icon: Wallet, label: "Cash", value: "KES 142K", change: "+12%", positive: true },
  { icon: TrendingUp, label: "Revenue", value: "KES 380K", change: "+8%", positive: true },
  { icon: BarChart3, label: "Profit", value: "KES 95K", change: "+15%", positive: true },
];

const inputModes = [
  { icon: Mic, label: "Voice", desc: "Send a voice note" },
  { icon: Camera, label: "Photo", desc: "Snap a receipt" },
  { icon: MessageSquare, label: "Text", desc: "Type it out" },
];

const SolutionSection = () => (
  <section id="solution" className="py-16 md:py-28 bg-background relative overflow-hidden">
    <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-accent/[0.04] blur-[150px] pointer-events-none" />
    <div className="container mx-auto px-4 md:px-8 relative">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
        {/* Left: metrics display */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-3"
        >
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-xl p-5 flex items-center gap-4 border border-border/80 bg-card hover:border-accent/15 transition-colors duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-accent/[0.08] flex items-center justify-center flex-shrink-0">
                <m.icon className="h-5 w-5 text-accent" strokeWidth={1.8} />
              </div>
              <div className="flex-1">
                <p className="text-muted-foreground text-[11px] uppercase tracking-wider font-medium">{m.label}</p>
                <p className="text-foreground font-display text-xl font-bold tracking-tight">{m.value}</p>
              </div>
              <span className={`text-sm font-semibold ${m.positive ? "text-accent" : "text-destructive"}`}>
                {m.change}
              </span>
            </motion.div>
          ))}

          <div className="flex gap-2.5 pt-4">
            {inputModes.map((mode, i) => (
              <motion.div
                key={mode.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                className="flex-1 rounded-xl p-4 text-center border border-border/80 bg-card hover:border-accent/15 transition-colors duration-300"
              >
                <mode.icon className="h-5 w-5 text-accent mx-auto mb-2" strokeWidth={1.8} />
                <p className="text-foreground text-xs font-semibold">{mode.label}</p>
                <p className="text-muted-foreground text-[10px] mt-0.5">{mode.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right: text */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <FadeIn>
            <span className="inline-flex items-center rounded-full border border-accent/20 bg-accent/[0.06] px-3.5 py-1 text-accent text-xs font-semibold uppercase tracking-widest mb-6">
              One Platform
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-[3.25rem] font-bold text-foreground mt-1 mb-6 leading-[1.1] tracking-tight">
              Record, track, and profit — all in one place
            </h2>
            <p className="text-muted-foreground text-[15px] leading-relaxed mb-10">
              Voice notes, receipt photos, or quick text — record sales your way. The AI creates proper double-entry accounting behind the scenes. See your real profit, cash position, and who owes you.
            </p>
            <Link to="/register">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-8 h-12 rounded-xl shadow-xl shadow-accent/20 text-sm">
                Start tracking now
              </Button>
            </Link>
          </FadeIn>
        </motion.div>
      </div>
    </div>
  </section>
);

export default SolutionSection;
