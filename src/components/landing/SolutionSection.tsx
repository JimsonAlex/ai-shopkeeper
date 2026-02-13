import { Mic, Camera, MessageSquare, BarChart3, TrendingUp, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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
  <section id="solution" className="py-20 md:py-32 bg-background relative overflow-hidden">
    {/* Layered background */}
    <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full bg-accent/[0.04] blur-[150px] pointer-events-none" />
    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-accent/[0.03] blur-[120px] pointer-events-none" />

    <div className="container mx-auto px-4 md:px-8 relative">
      <div className="grid lg:grid-cols-2 gap-14 lg:gap-24 items-center max-w-6xl mx-auto">
        {/* Left: metrics display */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-4"
        >
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="rounded-2xl p-6 flex items-center gap-5 border border-border/60 bg-gradient-to-r from-card to-card/80 hover:border-accent/20 hover:shadow-xl hover:shadow-accent/[0.04] transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/[0.08] flex items-center justify-center flex-shrink-0">
                <m.icon className="h-5 w-5 text-accent" strokeWidth={1.6} />
              </div>
              <div className="flex-1">
                <p className="text-muted-foreground text-[10px] uppercase tracking-[0.15em] font-semibold">{m.label}</p>
                <p className="text-foreground font-display text-2xl font-bold tracking-tight">{m.value}</p>
              </div>
              <span className={`text-sm font-bold px-3 py-1 rounded-full ${m.positive ? "text-accent bg-accent/[0.08]" : "text-destructive bg-destructive/10"}`}>
                {m.change}
              </span>
            </motion.div>
          ))}

          <div className="flex gap-3 pt-5">
            {inputModes.map((mode, i) => (
              <motion.div
                key={mode.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                className="flex-1 rounded-2xl p-5 text-center border border-border/60 bg-gradient-to-b from-card to-card/80 hover:border-accent/20 hover:shadow-lg hover:shadow-accent/[0.04] transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-accent/[0.08] flex items-center justify-center mx-auto mb-3">
                  <mode.icon className="h-5 w-5 text-accent" strokeWidth={1.6} />
                </div>
                <p className="text-foreground text-xs font-bold tracking-tight">{mode.label}</p>
                <p className="text-muted-foreground text-[10px] mt-1">{mode.desc}</p>
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
          <span className="inline-flex items-center rounded-full border border-accent/20 bg-accent/[0.06] px-4 py-1.5 text-accent text-[11px] font-bold uppercase tracking-[0.15em] mb-8">
            One Platform
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-[3.75rem] font-bold text-foreground mt-1 mb-7 leading-[1.08] tracking-tight">
            Record, track, and{" "}
            <span className="bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent">
              profit
            </span>
            {" "}— all in one place
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed mb-12 max-w-lg">
            Voice notes, receipt photos, or quick text — record sales your way. The AI creates proper double-entry accounting behind the scenes. See your real profit, cash position, and who owes you.
          </p>
          <Link to="/register">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-block"
            >
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold px-10 h-13 rounded-xl shadow-2xl shadow-accent/25 text-sm tracking-wide">
                Start tracking now
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </div>
  </section>
);

export default SolutionSection;
