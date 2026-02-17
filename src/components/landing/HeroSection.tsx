import { ArrowRight, Sun, Moon, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import FadeIn from "./FadeIn";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const rotatingWords = [
  "Retail Finances",
  "Daily Sales",
  "Expense Tracking",
  "Profit Insights",
];

const navLinks = [
  { href: "#why-nexus", label: "Why Nexus?" },
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#faq", label: "FAQ" },
];

const AnnouncementBar = () => (
  <div className="bg-foreground text-background text-center text-sm py-2.5 px-4 font-medium">
    See how Nexus can transform your business –{" "}
    <a href="#how-it-works" onClick={(e) => { e.preventDefault(); document.querySelector('#how-it-works')?.scrollIntoView({ behavior: 'smooth' }); }} className="underline underline-offset-2 hover:opacity-80 transition-opacity">
      Watch the demo
    </a>
  </div>
);

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-8">
        <span className="font-display text-xl font-bold text-foreground tracking-tight">
          Nexus
        </span>
        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground font-medium">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' }); }}
              className="hover:text-foreground transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors duration-200"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <Link to="/register" className="hidden sm:block">
            <Button size="sm" className="bg-foreground text-background hover:bg-foreground/90 font-semibold rounded-lg text-xs px-5">
              Get Nexus Free
            </Button>
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors duration-200"
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
            className="md:hidden overflow-hidden border-t border-border/50 bg-background/95 backdrop-blur-xl"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); setMobileOpen(false); document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="text-muted-foreground hover:text-foreground hover:bg-secondary px-4 py-3 rounded-lg text-sm font-medium transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <Link to="/register" onClick={() => setMobileOpen(false)} className="mt-2">
                <Button className="w-full bg-foreground text-background hover:bg-foreground/90 font-semibold rounded-lg">
                  Get Nexus Free
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
  <section className="relative min-h-[85dvh] flex flex-col items-center justify-center overflow-hidden bg-background">
    {/* Content */}
    <div className="container mx-auto px-4 md:px-8 py-20 md:py-32 relative z-10 text-center">
      {/* Tagline pill */}
      <FadeIn>
        <motion.div
          className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-5 py-2 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-muted-foreground text-sm font-medium">
            Trusted by 2,000+ shop owners
          </span>
        </motion.div>
      </FadeIn>

      {/* Massive headline with rotating word */}
      <FadeIn>
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold text-foreground leading-[1.05] mb-8 max-w-5xl mx-auto tracking-tight">
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            Take Control of Your
          </motion.span>
          <span className="block relative h-[1.15em] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={rotatingWords[wordIndex]}
                className="absolute inset-x-0"
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -60, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {rotatingWords[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
        </h1>
      </FadeIn>

      <FadeIn delay={0.2}>
        <p className="text-base md:text-lg text-muted-foreground max-w-lg mx-auto mb-12 leading-relaxed">
          AI-powered accounting that turns voice notes, receipts, and texts into real-time profit insights — automatically.
        </p>
      </FadeIn>

      <FadeIn delay={0.3}>
        <Link to="/register">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group inline-flex items-center gap-2.5 bg-foreground text-background font-semibold text-sm sm:text-base px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl shadow-lg transition-colors hover:bg-foreground/90"
          >
            Start for free
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </motion.button>
        </Link>
      </FadeIn>
    </div>

    {/* Purple-blue gradient wave at bottom — Nexa signature */}
    <div className="absolute bottom-0 left-0 right-0 h-[25%] pointer-events-none overflow-hidden">
      {/* Main wave shape */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[160%] h-full"
        style={{
          background: 'linear-gradient(135deg, hsl(260 70% 55%), hsl(243 75% 59%), hsl(220 80% 50%))',
          borderRadius: '50% 50% 0 0',
          transform: 'translateX(-50%) translateY(30%)',
        }}
      />
      {/* Lighter overlay for depth */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[180%] h-[80%] opacity-40"
        style={{
          background: 'linear-gradient(120deg, hsl(280 60% 65% / 0.6), hsl(240 70% 60% / 0.4), transparent)',
          borderRadius: '50% 50% 0 0',
          transform: 'translateX(-50%) translateY(25%)',
        }}
      />
    </div>
  </section>
  );
};

const HeroSection = () => (
  <>
    <AnnouncementBar />
    <Navbar />
    <Hero />
  </>
);

export default HeroSection;
