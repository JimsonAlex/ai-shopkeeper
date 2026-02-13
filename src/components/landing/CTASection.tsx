import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CTASection = () => (
  <section className="py-28 md:py-40 bg-primary relative overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--accent)/0.08),transparent_55%)]" />
    {/* Subtle side glows */}
    <div className="absolute top-1/2 -translate-y-1/2 -left-32 w-64 h-64 rounded-full bg-accent/[0.04] blur-[100px]" />
    <div className="absolute top-1/2 -translate-y-1/2 -right-32 w-64 h-64 rounded-full bg-accent/[0.04] blur-[100px]" />
    <div className="container mx-auto px-4 md:px-8 relative">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-3xl mx-auto text-center"
      >
        <h2 className="font-display text-3xl sm:text-4xl md:text-[3.25rem] font-bold text-primary-foreground mb-6 leading-[1.1] tracking-tight">
          Ready to stop guessing and start <span className="text-accent">knowing</span>?
        </h2>
        <p className="text-primary-foreground/35 text-lg mb-12 max-w-xl mx-auto">
          Free to start. No credit card required. Set up in minutes.
        </p>
        <Link to="/register">
          <motion.div
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block"
          >
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-sm px-10 h-13 shadow-xl shadow-accent/25 rounded-xl">
              Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </Link>
      </motion.div>
    </div>
  </section>
);

export default CTASection;
