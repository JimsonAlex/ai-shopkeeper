import { User, ShieldCheck, Quote } from "lucide-react";
import FadeIn from "./FadeIn";

const personas = [
  {
    icon: User,
    name: "Musa",
    role: "Shop Owner",
    quote: "Too busy to do bookkeeping? Just send a voice note.",
    detail: "50+ transactions a day. Money in pockets, drawers, and M-Pesa. Musa needs the system to think for him — not the other way around.",
    accent: true,
  },
  {
    icon: ShieldCheck,
    name: "Aisha",
    role: "Shop Clerk",
    quote: "Prove every sale was done right. The system protects you.",
    detail: "Aisha fears being accused of shortages. She wants a system that records everything — so the numbers speak for her at end of day.",
    accent: false,
  },
];

const PersonaSection = () => (
  <section className="py-24 md:py-32 bg-muted/40 relative">
    <div className="container mx-auto px-4 md:px-8">
      <FadeIn>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">Built For You</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-3 leading-tight">
            Whether you own the shop or run the counter
          </h2>
        </div>
      </FadeIn>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {personas.map((p, i) => (
          <FadeIn key={p.name} delay={i * 0.15}>
            <div className={`rounded-2xl p-8 md:p-10 border h-full relative overflow-hidden ${p.accent ? "bg-primary text-primary-foreground border-primary-foreground/8" : "bg-card text-foreground border-border"}`}>
              <Quote className={`absolute top-6 right-6 h-12 w-12 ${p.accent ? "text-accent/10" : "text-muted/50"}`} />
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${p.accent ? "bg-accent/15" : "bg-accent/10"}`}>
                <p.icon className="h-6 w-6 text-accent" />
              </div>
              <p className="text-sm font-semibold text-accent mb-1 uppercase tracking-wide">{p.role}</p>
              <h3 className="font-display text-2xl font-bold mb-4">{p.name}</h3>
              <blockquote className={`text-lg italic mb-5 leading-relaxed ${p.accent ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                "{p.quote}"
              </blockquote>
              <p className={`text-sm leading-relaxed ${p.accent ? "text-primary-foreground/50" : "text-muted-foreground"}`}>
                {p.detail}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);

export default PersonaSection;
