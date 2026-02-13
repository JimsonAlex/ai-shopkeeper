import { ArrowRight, Star, Sun, Moon, Menu, X, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import FadeIn from "./FadeIn";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";
import dashboardImg from "@/assets/dashboard-mockup.png";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "#why-nexus", label: "Why Nexus?" },
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#faq", label: "FAQ" },
];

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/90 backdrop-blur-2xl border-b border-primary-foreground/[0.04]">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-8">
        <span className="font-display text-xl font-bold text-primary-foreground tracking-tight">
          Nexus
        </span>
        <div className="hidden md:flex items-center gap-10 text-[13px] text-primary-foreground/40 font-medium">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={(e) => { e.preventDefault(); document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-primary-foreground transition-colors duration-200">{link.label}</a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-primary-foreground/40 hover:text-primary-foreground hover:bg-primary-foreground/5 transition-colors duration-200"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <Link to="/register" className="hidden sm:block">
            <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold shadow-lg shadow-accent/20 rounded-lg text-xs px-5">
              Get Started
            </Button>
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-primary-foreground/40 hover:text-primary-foreground hover:bg-primary-foreground/5 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden border-t border-primary-foreground/[0.04] bg-primary/95 backdrop-blur-2xl"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); setMobileOpen(false); document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="text-primary-foreground/50 hover:text-primary-foreground hover:bg-primary-foreground/5 px-4 py-3 rounded-lg text-sm font-medium transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <Link to="/register" onClick={() => setMobileOpen(false)} className="mt-2">
                <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold shadow-lg shadow-accent/20 rounded-lg">
                  Get Started
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => (
  <section className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden pt-16 md:pt-20 isolate">
    {/* Layered gradient background — matches CTA style */}
    <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-[hsl(249,40%,14%)]" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(var(--accent)/0.15),transparent_50%)]" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(var(--accent)/0.08),transparent_50%)]" />

    {/* Animated glow orbs */}
    <motion.div
      animate={{ scale: [1, 1.3, 1], opacity: [0.06, 0.14, 0.06] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-[10%] left-[20%] w-[500px] h-[500px] rounded-full bg-accent blur-[160px]"
    />
    <motion.div
      animate={{ scale: [1.2, 1, 1.2], opacity: [0.04, 0.1, 0.04] }}
      transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      className="absolute bottom-[20%] right-[15%] w-[400px] h-[400px] rounded-full bg-accent blur-[140px]"
    />

    {/* Subtle vertical light streaks */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[450px] opacity-40 pointer-events-none">
      {[-100, -50, 0, 50, 100].map((offset, i) => (
        <div
          key={i}
          className="absolute top-0 h-full"
          style={{
            left: `calc(50% + ${offset}px)`,
            width: '1px',
            background: `linear-gradient(to bottom, hsl(166 81% 38% / ${i === 2 ? 0.25 : 0.1}), transparent 60%)`,
          }}
        />
      ))}
    </div>

    <div className="container mx-auto px-4 md:px-8 py-16 md:py-36 relative z-10 text-center">
      {/* Social proof pill — elevated style */}
      <FadeIn>
        <motion.div
          className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/[0.08] px-4 py-1.5 mb-8"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Sparkles className="h-3.5 w-3.5 text-accent" />
          <span className="text-accent text-xs font-medium tracking-wide uppercase">Trusted by 2,000+ shop owners</span>
        </motion.div>
      </FadeIn>

      <FadeIn>
        <h1 className="font-display text-[2.75rem] sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-[1.05] mb-7 max-w-4xl mx-auto tracking-tight">
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            Take Control of Your
          </motion.span>
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-accent">Retail Finances</span>
          </motion.span>
        </h1>
      </FadeIn>

      <FadeIn delay={0.2}>
        <p className="text-base md:text-lg text-primary-foreground/40 max-w-md mx-auto mb-12 leading-relaxed">
          AI-powered accounting that turns voice notes, receipts, and texts into real-time profit insights — automatically.
        </p>
      </FadeIn>

      <FadeIn delay={0.3}>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/register">
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: "0 0 40px hsl(166 81% 38% / 0.35)" }}
              whileTap={{ scale: 0.97 }}
              className="group relative inline-flex items-center gap-2.5 bg-accent text-accent-foreground font-semibold text-sm sm:text-base px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl shadow-2xl shadow-accent/30 transition-colors hover:bg-accent/90"
            >
              Start for free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </motion.button>
          </Link>
          <a href="#how-it-works" onClick={(e) => { e.preventDefault(); document.querySelector('#how-it-works')?.scrollIntoView({ behavior: 'smooth' }); }}>
            <Button variant="ghost" size="lg" className="text-primary-foreground/40 hover:text-primary-foreground hover:bg-primary-foreground/5 font-medium text-sm px-8 h-12 rounded-xl">
              See how it works
            </Button>
          </a>
        </div>
      </FadeIn>

      {/* Star rating */}
      <FadeIn delay={0.4}>
        <div className="mt-10 flex items-center justify-center gap-3">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4].map((i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" />
            ))}
            <Star className="h-3.5 w-3.5 fill-accent/30 text-accent/30" />
          </div>
          <span className="text-primary-foreground/25 text-xs font-medium">4.9 from 500+ reviews</span>
        </div>
      </FadeIn>

      {/* Dashboard mockup with elevated frame */}
      <FadeIn delay={0.5}>
        <motion.div
          className="mt-14 md:mt-24 max-w-5xl mx-auto relative"
          initial={{ opacity: 0, y: 60, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Glow behind mockup */}
          <div className="absolute -inset-6 bg-accent/[0.06] rounded-3xl blur-3xl" />
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-accent/20 to-transparent" />
          <div className="relative rounded-2xl overflow-hidden border border-primary-foreground/[0.06] shadow-[0_40px_100px_-16px_rgba(0,0,0,0.6)]">
            <img
              src={dashboardImg}
              alt="Nexus Dashboard - AI-powered retail accounting"
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
        </motion.div>
      </FadeIn>
    </div>
  </section>
);

const HeroSection = () => (
  <>
    <Navbar />
    <Hero />
  </>
);

export default HeroSection;
