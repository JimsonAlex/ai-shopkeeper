import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import FadeIn from "./FadeIn";

const CTASection = () => (
  <section className="py-24 md:py-32 bg-background relative">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--accent)/0.05),transparent_60%)]" />
    <div className="container mx-auto px-4 md:px-8 relative">
      <FadeIn>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-5 leading-tight">
            Ready to stop guessing and start <span className="text-accent">knowing</span>?
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
            Free to start. No credit card required. Set up in minutes.
          </p>
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-base px-10 h-14 shadow-lg shadow-accent/25 transition-all hover:shadow-xl hover:shadow-accent/30">
            Join the Waitlist <ArrowRight className="ml-1 h-5 w-5" />
          </Button>
        </div>
      </FadeIn>
    </div>
  </section>
);

export default CTASection;
