import { Shield, Lock, Star } from "lucide-react";
import FadeIn from "./FadeIn";

const badges = [
  { icon: Shield, label: "Bank-Grade Accuracy" },
  { icon: Lock, label: "Your Data Stays Yours" },
];

const testimonials = [
  { quote: "I finally know my actual profit — not just my revenue.", author: "Early Adopter", business: "Hardware Shop", stars: 5 },
  { quote: "My clerk sends voice notes and the books are always balanced. Magic.", author: "Early Adopter", business: "General Store", stars: 5 },
];

const TrustSection = () => (
  <section className="py-24 md:py-32 bg-primary relative overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-accent/8 blur-[120px] pointer-events-none" />
    <div className="container mx-auto px-4 md:px-8 relative">
      <FadeIn>
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">Social Proof</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mt-3 leading-tight">
            Trusted by shop owners who demand accuracy
          </h2>
          <p className="text-primary-foreground/50 mt-5 text-lg">
            Early adopters are already seeing the difference.
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-16">
          {testimonials.map((t, i) => (
            <div key={i} className="glass-dark rounded-2xl p-8">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-primary-foreground/80 italic mb-5 leading-relaxed">"{t.quote}"</p>
              <div>
                <p className="text-accent text-sm font-semibold">{t.author}</p>
                <p className="text-primary-foreground/40 text-xs">{t.business}</p>
              </div>
            </div>
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="flex flex-wrap justify-center gap-10">
          {badges.map((b) => (
            <div key={b.label} className="flex items-center gap-3 text-primary-foreground/60">
              <div className="w-10 h-10 rounded-xl glass-dark flex items-center justify-center">
                <b.icon className="h-5 w-5 text-accent" />
              </div>
              <span className="text-sm font-medium">{b.label}</span>
            </div>
          ))}
        </div>
      </FadeIn>
    </div>
  </section>
);

export default TrustSection;
