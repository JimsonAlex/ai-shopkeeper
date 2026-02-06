import { Shield, Lock, Globe } from "lucide-react";
import FadeIn from "./FadeIn";

const badges = [
  { icon: Shield, label: "Bank-Grade Accuracy" },
  { icon: Lock, label: "Your Data Stays Yours" },
  { icon: Globe, label: "Built for African Retail" },
];

const TrustSection = () => (
  <section className="py-20 md:py-28 bg-primary">
    <div className="container mx-auto px-4 md:px-8">
      <FadeIn>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground">
            Trusted by shop owners who demand accuracy
          </h2>
          <p className="text-primary-foreground/60 mt-4 text-lg">
            Early adopters are already seeing the difference.
          </p>
        </div>
      </FadeIn>

      {/* Placeholder testimonials */}
      <FadeIn delay={0.1}>
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-16">
          {[
            { quote: "I finally know my actual profit — not just my revenue.", author: "Early Adopter, Hardware Shop" },
            { quote: "My clerk sends voice notes and the books are always balanced. Magic.", author: "Early Adopter, General Store" },
          ].map((t, i) => (
            <div key={i} className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-xl p-6">
              <p className="text-primary-foreground/80 italic mb-4">"{t.quote}"</p>
              <p className="text-accent text-sm font-medium">— {t.author}</p>
            </div>
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="flex flex-wrap justify-center gap-8">
          {badges.map((b) => (
            <div key={b.label} className="flex items-center gap-3 text-primary-foreground/70">
              <b.icon className="h-5 w-5 text-accent" />
              <span className="text-sm font-medium">{b.label}</span>
            </div>
          ))}
        </div>
      </FadeIn>
    </div>
  </section>
);

export default TrustSection;
