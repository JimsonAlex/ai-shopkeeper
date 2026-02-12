import { Shield, Lock, Star } from "lucide-react";
import { motion } from "framer-motion";

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
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center max-w-2xl mx-auto mb-14"
      >
        <motion.span
          className="text-accent font-semibold text-sm uppercase tracking-widest inline-block"
          initial={{ opacity: 0, letterSpacing: "0.05em" }}
          whileInView={{ opacity: 1, letterSpacing: "0.2em" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Social Proof
        </motion.span>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mt-3 leading-tight">
          Trusted by shop owners who demand accuracy
        </h2>
        <p className="text-primary-foreground/50 mt-5 text-lg">
          Early adopters are already seeing the difference.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-16">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" as const }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="glass-dark rounded-2xl p-8"
          >
            <div className="flex gap-1 mb-4">
              {Array.from({ length: t.stars }).map((_, j) => (
                <motion.div
                  key={j}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.3 + j * 0.08, type: "spring" }}
                >
                  <Star className="h-4 w-4 fill-accent text-accent" />
                </motion.div>
              ))}
            </div>
            <p className="text-primary-foreground/80 italic mb-5 leading-relaxed">"{t.quote}"</p>
            <div>
              <p className="text-accent text-sm font-semibold">{t.author}</p>
              <p className="text-primary-foreground/40 text-xs">{t.business}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="flex flex-wrap justify-center gap-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
      >
        {badges.map((b, i) => (
          <motion.div
            key={b.label}
            className="flex items-center gap-3 text-primary-foreground/60"
            initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.1, ease: "easeOut" }}
          >
            <div className="w-10 h-10 rounded-xl glass-dark flex items-center justify-center">
              <b.icon className="h-5 w-5 text-accent" />
            </div>
            <span className="text-sm font-medium">{b.label}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default TrustSection;
