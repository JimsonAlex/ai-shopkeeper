import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Sun, Moon, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import FadeIn from "./FadeIn";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";
import dashboardImg from "@/assets/dashboard-mockup.png";
import { useState } from "react";

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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/80 backdrop-blur-xl border-b border-primary-foreground/5">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-8">
        <span className="font-display text-xl font-bold text-primary-foreground tracking-tight">
          Nexus
        </span>
        <div className="hidden md:flex items-center gap-8 text-sm text-primary-foreground/50 font-medium">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={(e) => { e.preventDefault(); document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-primary-foreground transition-colors duration-200">{link.label}</a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-primary-foreground/50 hover:text-primary-foreground hover:bg-primary-foreground/5 transition-colors duration-200"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <Link to="/register" className="hidden sm:block">
            <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold shadow-lg shadow-accent/20 rounded-lg">
              Get Started
            </Button>
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-primary-foreground/50 hover:text-primary-foreground hover:bg-primary-foreground/5 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden border-t border-primary-foreground/5 bg-primary/95 backdrop-blur-xl"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); setMobileOpen(false); document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/5 px-4 py-3 rounded-lg text-sm font-medium transition-colors"
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
  <section className="relative min-h-screen flex flex-col items-center justify-center bg-primary overflow-hidden pt-20">
    {/* Aurora curtain glow - wide diffused effect like Cryptix */}
    <div className="absolute top-0 left-0 right-0 h-[700px] overflow-hidden pointer-events-none">
      {/* Main wide aurora */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px]"
         style={{
           background: `
             radial-gradient(ellipse 100% 80% at 50% 0%, hsl(166 81% 42% / 0.15) 0%, transparent 70%),
             radial-gradient(ellipse 60% 60% at 40% 0%, hsl(166 81% 42% / 0.1) 0%, transparent 60%),
             radial-gradient(ellipse 60% 60% at 60% 0%, hsl(166 81% 42% / 0.1) 0%, transparent 60%)
           `
        }}
      />
      {/* Vertical light streaks */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[500px]">
        {[-120, -80, -40, -15, 0, 15, 40, 80, 120].map((offset, i) => (
          <div
            key={i}
            className="absolute top-0 h-full"
            style={{
              left: `calc(50% + ${offset}px)`,
              width: i === 4 ? '3px' : '2px',
              background: `linear-gradient(to bottom, hsl(166 81% 42% / ${i === 4 ? 0.4 : 0.15 + Math.random() * 0.15}), transparent 70%)`,
              filter: 'blur(1px)',
            }}
          />
        ))}
      </div>
      {/* Wide ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[400px]"
        style={{
          background: 'radial-gradient(ellipse 100% 100% at 50% 0%, hsl(166 81% 42% / 0.08) 0%, transparent 70%)'
        }}
      />
    </div>

    <div className="container mx-auto px-4 md:px-8 py-20 md:py-32 relative z-10 text-center">
      <FadeIn>
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-[1.1] mb-6 max-w-4xl mx-auto">
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            Take Control of Your
          </motion.span>
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          >
            <span className="text-accent">Retail Finances</span>
          </motion.span>
        </h1>
      </FadeIn>

      <FadeIn delay={0.2}>
        <p className="text-base md:text-lg text-primary-foreground/50 max-w-xl mx-auto mb-10 leading-relaxed">
          Nexus offers a seamless, AI-powered experience for managing your shop's accounting. Voice input, automatic bookkeeping, and real-time profit tracking.
        </p>
      </FadeIn>

      <FadeIn delay={0.3}>
        <Link to="/register">
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block"
          >
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-base px-10 h-14 shadow-lg shadow-accent/25 rounded-xl">
              Get started now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </Link>
      </FadeIn>

      {/* Trust badge */}
      <FadeIn delay={0.4}>
        <div className="mt-10 flex flex-col items-center gap-2">
          <p className="text-primary-foreground/30 text-sm">They trust us</p>
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4].map((i) => (
              <Star key={i} className="h-4 w-4 fill-accent text-accent" />
            ))}
            <Star className="h-4 w-4 fill-accent/40 text-accent/40" />
            <span className="text-primary-foreground/60 text-sm font-semibold ml-1.5">4,9</span>
          </div>
        </div>
      </FadeIn>

      {/* Dashboard mockup */}
      <FadeIn delay={0.5}>
        <motion.div
          className="mt-16 max-w-5xl mx-auto rounded-2xl overflow-hidden border border-primary-foreground/8 shadow-2xl shadow-black/30"
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <img
            src={dashboardImg}
            alt="Nexus Dashboard - AI-powered retail accounting"
            className="w-full h-auto"
            loading="lazy"
          />
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
