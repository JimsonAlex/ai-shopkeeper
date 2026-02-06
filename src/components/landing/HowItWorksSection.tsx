import { MessageSquare, Zap, Eye } from "lucide-react";
import FadeIn from "./FadeIn";

const steps = [
  {
    icon: MessageSquare,
    num: "1",
    title: "Onboard in Minutes",
    desc: "AI asks simple questions: how much cash do you have? What's in stock? Who owes you? Answer by voice, text, or photo.",
  },
  {
    icon: Zap,
    num: "2",
    title: "Run Your Day",
    desc: "Record sales, expenses, and purchases naturally. The system creates perfect accounting entries behind the scenes.",
  },
  {
    icon: Eye,
    num: "3",
    title: "See the Truth",
    desc: "Real-time profit, cash flow, and inventory — at a glance. Know exactly where every shilling went.",
  },
];

const HowItWorksSection = () => (
  <section id="how-it-works" className="py-20 md:py-28 bg-background">
    <div className="container mx-auto px-4 md:px-8">
      <FadeIn>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">How It Works</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3">
            Three steps to financial clarity
          </h2>
        </div>
      </FadeIn>

      <div className="max-w-3xl mx-auto space-y-0">
        {steps.map((s, i) => (
          <FadeIn key={s.num} delay={i * 0.15}>
            <div className="flex gap-6 md:gap-8 relative">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="absolute left-[27px] top-16 bottom-0 w-px bg-border" />
              )}
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center relative z-10">
                  <s.icon className="h-6 w-6 text-accent" />
                </div>
              </div>
              <div className="pb-12">
                <span className="text-accent font-display font-bold text-sm">Step {s.num}</span>
                <h3 className="font-display text-xl font-semibold text-foreground mt-1 mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-md">{s.desc}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorksSection;
