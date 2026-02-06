import { Mic, Brain, BarChart3 } from "lucide-react";
import FadeIn from "./FadeIn";

const steps = [
  {
    icon: Mic,
    num: "01",
    title: "Speak, Snap, or Type",
    desc: "Record a sale in seconds — send a voice note, snap a receipt, or just type it out.",
  },
  {
    icon: Brain,
    num: "02",
    title: "AI Handles the Math",
    desc: "Automatic double-entry accounting behind the scenes. Every debit has a credit. Always balanced.",
  },
  {
    icon: BarChart3,
    num: "03",
    title: "Know Your Profit",
    desc: "Real-time dashboard showing cash, margins, inventory, and who owes you — at a glance.",
  },
];

const SolutionSection = () => (
  <section id="solution" className="py-20 md:py-28 bg-primary">
    <div className="container mx-auto px-4 md:px-8">
      <FadeIn>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">Meet Your AI Copilot</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mt-3">
            No accounting knowledge required
          </h2>
          <p className="text-primary-foreground/60 mt-4 text-lg">
            You run your shop. The AI runs your books.
          </p>
        </div>
      </FadeIn>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {steps.map((s, i) => (
          <FadeIn key={s.num} delay={i * 0.15}>
            <div className="relative bg-primary-foreground/5 border border-primary-foreground/10 rounded-2xl p-8 hover:bg-primary-foreground/10 transition-all duration-300">
              <span className="font-display text-5xl font-bold text-accent/20 absolute top-4 right-6">{s.num}</span>
              <div className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center mb-5">
                <s.icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-display text-xl font-semibold text-primary-foreground mb-3">{s.title}</h3>
              <p className="text-primary-foreground/60 text-sm leading-relaxed">{s.desc}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);

export default SolutionSection;
