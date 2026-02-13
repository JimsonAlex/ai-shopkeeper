import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

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

const TestimonialCard = ({ t, index }: { t: typeof testimonials[0]; index: number }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
    }}
    whileHover={{ y: -4, transition: { duration: 0.2 } }}
    className="rounded-2xl p-6 md:p-8 border border-border/80 bg-card hover:border-accent/15 hover:shadow-xl hover:shadow-accent/[0.04] transition-all duration-300 relative"
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
);

const TrustSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const scrollLeft = el.scrollLeft;
      const cardWidth = el.firstElementChild?.getBoundingClientRect().width ?? 280;
      const gap = 12;
      const index = Math.round(scrollLeft / (cardWidth + gap));
      setActiveIndex(Math.min(index, testimonials.length - 1));
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="testimonials" className="py-16 md:py-28 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--accent)/0.03),transparent_50%)]" />
      <div className="container mx-auto px-4 md:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto mb-12 md:mb-20"
        >
          <span className="inline-flex items-center rounded-full border border-accent/20 bg-accent/[0.06] px-3.5 py-1 text-accent text-xs font-semibold uppercase tracking-widest mb-6">
            Testimonials
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-[3.25rem] font-bold text-foreground leading-[1.1] tracking-tight">
            Trusted by shop owners who demand accuracy
          </h2>
        </motion.div>

        {/* Mobile: horizontal snap carousel */}
        <div className="sm:hidden">
          <motion.div
            ref={scrollRef}
            className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 scrollbar-hide"
            style={{ WebkitOverflowScrolling: "touch" }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
          >
            {testimonials.map((t, i) => (
              <div key={i} className="snap-start shrink-0 w-[280px]">
                <TestimonialCard t={t} index={i} />
              </div>
            ))}
          </motion.div>

          <div className="flex items-center justify-center gap-1.5 mt-4">
            {testimonials.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeIndex ? "w-6 bg-accent" : "w-1.5 bg-muted-foreground/20"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Desktop: grid */}
        <motion.div
          className="hidden sm:grid md:grid-cols-3 gap-4 max-w-5xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
        >
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} t={t} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustSection;
