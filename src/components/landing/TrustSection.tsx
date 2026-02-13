import { Star } from "lucide-react";
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
  <section id="testimonials" className="py-24 md:py-32 bg-background relative overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--accent)/0.03),transparent_50%)]" />
    <div className="container mx-auto px-4 md:px-8 relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center max-w-2xl mx-auto mb-14"
      >
        <span className="text-accent font-semibold text-sm uppercase tracking-widest">Testimonials</span>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-3 leading-tight">
          Trusted by shop owners who demand accuracy
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="rounded-2xl p-7 border border-border bg-card hover:border-accent/15 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex gap-0.5 mb-4">
              {Array.from({ length: t.stars }).map((_, j) => (
                <Star key={j} className="h-4 w-4 fill-accent text-accent" />
              ))}
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">"{t.quote}"</p>
            <div>
              <p className="text-foreground font-semibold text-sm">{t.author}</p>
              <p className="text-muted-foreground text-xs">{t.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustSection;
