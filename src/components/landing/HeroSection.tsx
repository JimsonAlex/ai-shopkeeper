import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Mic, Camera, MessageSquare, Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";
import FadeIn from "./FadeIn";
import { motion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-dark">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-8">
        <span className="font-display text-xl font-bold text-primary-foreground tracking-tight">
          Nexus
        </span>
        <div className="hidden md:flex items-center gap-8 text-sm text-primary-foreground/60 font-medium">
          <a href="#problem" className="hover:text-primary-foreground transition-colors duration-200">Problem</a>
          <a href="#solution" className="hover:text-primary-foreground transition-colors duration-200">Solution</a>
          <a href="#features" className="hover:text-primary-foreground transition-colors duration-200">Features</a>
          <a href="#pricing" className="hover:text-primary-foreground transition-colors duration-200">Pricing</a>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/10 transition-colors duration-200"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <Link to="/login">
            <Button size="sm" variant="ghost" className="text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/10 font-medium">
              Sign In
            </Button>
          </Link>
          <Link to="/register">
            <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold shadow-lg shadow-accent/20">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

const FloatingInput = ({ icon: Icon, label, delay }: { icon: React.ElementType; label: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8, y: 20 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
    className="glass-dark flex items-center gap-2.5 px-4 py-2.5 rounded-xl"
  >
    <Icon className="h-4 w-4 text-accent" />
    <span className="text-primary-foreground/60 text-sm font-medium">{label}</span>
  </motion.div>
);

const Hero = () => (
  <section className="relative min-h-screen flex items-center bg-primary overflow-hidden pt-20">
    {/* Glow effects */}
    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent/10 blur-[150px] pointer-events-none" />
    <div className="absolute bottom-1/3 right-0 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px] pointer-events-none" />
    <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />

    <div className="container mx-auto px-4 md:px-8 py-20 md:py-32 relative z-10">
      <div className="max-w-3xl">
        <FadeIn>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-dark text-accent text-sm font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            AI-Powered Retail Accounting
          </span>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-[1.08] mb-6">
            <span className="block text-primary-foreground/50 text-2xl md:text-3xl lg:text-4xl font-semibold mb-2 tracking-wide uppercase">
              Bank-Grade Accounting
            </span>
            <span className="block">
              for{" "}
              <span className="relative inline-block">
                <span className="text-accent">Chaotic Retail</span>
                <motion.span
                  className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-accent/60 via-accent to-accent/60 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
              </span>
            </span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="text-lg md:text-xl text-primary-foreground/60 max-w-xl mb-10 leading-relaxed">
            Record sales via voice, photo, or text. The AI handles double-entry accounting, 
            inventory, and reconciliation — automatically.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="flex flex-col sm:flex-row gap-4 mb-14">
            <Link to="/register">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-base px-8 h-13 shadow-lg shadow-accent/25 transition-all hover:shadow-xl hover:shadow-accent/30">
                Get Started Free <ArrowRight className="ml-1 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-primary-foreground/15 text-primary-foreground hover:bg-primary-foreground/5 font-semibold text-base px-8 h-13">
              <Play className="mr-1 h-4 w-4" /> See How It Works
            </Button>
          </div>
        </FadeIn>

        {/* Input method pills */}
        <div className="flex flex-wrap gap-3">
          <FloatingInput icon={Mic} label="Voice notes" delay={0.5} />
          <FloatingInput icon={Camera} label="Receipt photos" delay={0.6} />
          <FloatingInput icon={MessageSquare} label="Text messages" delay={0.7} />
        </div>
      </div>
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
