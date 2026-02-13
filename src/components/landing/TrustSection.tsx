import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "I finally know my actual profit — not just my revenue. Nexus changed everything.",
    author: "Musa K.",
    role: "Hardware Shop Owner",
    stars: 5,
  },
  {
    quote: "My clerk sends voice notes and the books are always balanced. Pure magic.",
    author: "Aisha M.",
    role: "General Store Manager",
    stars: 5,
  },
  {
    quote: "The daily reconciliation caught a KES 8,000 discrepancy on day one. Paid for itself instantly.",
    author: "James O.",
    role: "Building Materials Supplier",
    stars: 5,
  },
];

const TrustSection = () => (
  <section id="testimonials" className="py-28 md:py-40 bg-background relative overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--accent)/0.03),transparent_50%)]" />
    <div className="container mx-auto px-4 md:px-8 relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center max-w-2xl mx-auto mb-20"
      >
        <span className="inline-flex items-center rounded-full border border-accent/20 bg-accent/[0.06] px-3.5 py-1 text-accent text-xs font-semibold uppercase tracking-widest mb-6">
          Testimonials
        </span>
        <h2 className="font-display text-3xl sm:text-4xl md:text-[3.25rem] font-bold text-foreground leading-[1.1] tracking-tight">
          Trusted by shop owners who demand accuracy
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="rounded-2xl p-8 border border-border/80 bg-card hover:border-accent/15 hover:shadow-xl hover:shadow-accent/[0.04] transition-all duration-300 relative"
          >
            <Quote className="h-8 w-8 text-accent/[0.1] absolute top-6 right-6" />
            <div className="flex gap-0.5 mb-5">
              {Array.from({ length: t.stars }).map((_, j) => (
                <Star key={j} className="h-3.5 w-3.5 fill-accent text-accent" />
              ))}
            </div>
            <p className="text-foreground/80 text-sm leading-relaxed mb-8">"{t.quote}"</p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-accent/[0.08] flex items-center justify-center text-accent font-display font-bold text-xs">
                {t.author.charAt(0)}
              </div>
              <div>
                <p className="text-foreground font-semibold text-sm">{t.author}</p>
                <p className="text-muted-foreground text-xs">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustSection;
