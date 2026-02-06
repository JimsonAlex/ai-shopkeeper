import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import FadeIn from "./FadeIn";

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-md border-b border-primary-foreground/10">
    <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-8">
      <span className="font-display text-xl font-bold text-primary-foreground tracking-tight">
        Shop AI <span className="text-accent">Copilot</span>
      </span>
      <div className="hidden md:flex items-center gap-8 text-sm text-primary-foreground/70">
        <a href="#problem" className="hover:text-primary-foreground transition-colors">Problem</a>
        <a href="#solution" className="hover:text-primary-foreground transition-colors">Solution</a>
        <a href="#features" className="hover:text-primary-foreground transition-colors">Features</a>
        <a href="#how-it-works" className="hover:text-primary-foreground transition-colors">How It Works</a>
      </div>
      <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
        Join Waitlist
      </Button>
    </div>
  </nav>
);

const Hero = () => (
  <section className="relative min-h-screen flex items-center bg-primary overflow-hidden pt-20">
    {/* Glow effect */}
    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/10 blur-[120px] pointer-events-none" />
    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />

    <div className="container mx-auto px-4 md:px-8 py-20 md:py-32 relative z-10">
      <div className="max-w-3xl">
        <FadeIn>
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/15 text-accent text-sm font-medium mb-6 border border-accent/20">
            Built for African Retail
          </span>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-[1.1] mb-6">
            Bank-Grade Accounting for{" "}
            <span className="text-accent">Chaotic Retail</span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="text-lg md:text-xl text-primary-foreground/70 max-w-xl mb-10 leading-relaxed">
            Record sales via voice, photo, or text. The AI handles double-entry accounting, 
            inventory, and reconciliation — automatically.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-base px-8 h-13 shadow-lg shadow-accent/25">
              Get Started Free <ArrowRight className="ml-1 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 font-semibold text-base px-8 h-13">
              <Play className="mr-1 h-4 w-4" /> See How It Works
            </Button>
          </div>
        </FadeIn>
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
