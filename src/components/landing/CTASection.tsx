import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CTASection = () => (
  <section className="py-24 md:py-36 relative overflow-hidden isolate">
    {/* Rich layered background */}
    <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-[hsl(249,40%,14%)]" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(var(--accent)/0.15),transparent_50%)]" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(var(--accent)/0.10),transparent_50%)]" />

    {/* Animated glow orbs */}
    <motion.div
      animate={{ scale: [1, 1.2, 1], opacity: [0.06, 0.12, 0.06] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-accent blur-[120px]"
    />
    <motion.div
      animate={{ scale: [1.2, 1, 1.2], opacity: [0.04, 0.08, 0.04] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-accent blur-[140px]"
    />

    <div className="container mx-auto px-4 md:px-8 relative">
      <motion.div
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-2xl mx-auto text-center"
      >
        {/* Pill badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/[0.08] mb-8"
        >
          <Sparkles className="h-3.5 w-3.5 text-accent" />
          <span className="text-xs font-medium text-accent tracking-wide uppercase">Free to start</span>
        </motion.div>

        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-primary-foreground mb-5 leading-[1.05] tracking-tight">
          Stop guessing.{" "}
          <br className="hidden sm:block" />
          Start <span className="text-accent">knowing</span>.
        </h2>

        <p className="text-primary-foreground/70 text-base sm:text-lg mb-10 max-w-md mx-auto leading-relaxed">
          No credit card required. Set up in minutes. See your first insights today.
        </p>

        {/* CTA button */}
        <Link to="/register">
          <motion.button
            whileHover={{ scale: 1.03, boxShadow: "0 0 40px hsl(166 81% 38% / 0.35)" }}
            whileTap={{ scale: 0.97 }}
            className="group relative inline-flex items-center gap-2.5 bg-accent text-accent-foreground font-semibold text-sm sm:text-base px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl shadow-2xl shadow-accent/30 transition-colors hover:bg-accent/90"
          >
            Get Started Free
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </motion.button>
        </Link>

        {/* Trust nudge */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-6 text-xs text-primary-foreground/50"
        >
          Join 2,000+ retailers already saving hours every week
        </motion.p>
      </motion.div>
    </div>
  </section>
);

export default CTASection;
