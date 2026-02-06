import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import FadeIn from "./FadeIn";

const CTASection = () => (
  <section className="py-20 md:py-28 bg-background">
    <div className="container mx-auto px-4 md:px-8">
      <FadeIn>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            Ready to stop guessing and start <span className="text-accent">knowing</span>?
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Free to start. No credit card required. Set up in minutes.
          </p>
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-base px-10 h-13 shadow-lg shadow-accent/25">
            Join the Waitlist <ArrowRight className="ml-1 h-5 w-5" />
          </Button>
        </div>
      </FadeIn>
    </div>
  </section>
);

export default CTASection;
