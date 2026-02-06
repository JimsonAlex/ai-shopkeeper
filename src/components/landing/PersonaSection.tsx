import { User, ShieldCheck } from "lucide-react";
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
  <section className="py-20 md:py-28 bg-muted/50">
    <div className="container mx-auto px-4 md:px-8">
      <FadeIn>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">Built For You</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3">
            Whether you own the shop or run the counter
          </h2>
        </div>
      </FadeIn>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {personas.map((p, i) => (
          <FadeIn key={p.name} delay={i * 0.15}>
            <div className={`rounded-2xl p-8 border h-full ${p.accent ? "bg-primary text-primary-foreground border-primary-foreground/10" : "bg-card text-foreground border-border"}`}>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${p.accent ? "bg-accent/20" : "bg-accent/10"}`}>
                <p.icon className="h-6 w-6 text-accent" />
              </div>
              <p className="text-sm font-medium text-accent mb-1">{p.role}</p>
              <h3 className="font-display text-2xl font-bold mb-3">{p.name}</h3>
              <blockquote className={`text-lg italic mb-4 ${p.accent ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                "{p.quote}"
              </blockquote>
              <p className={`text-sm leading-relaxed ${p.accent ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
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
