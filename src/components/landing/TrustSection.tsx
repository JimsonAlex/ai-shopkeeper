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

const TestimonialCard = ({ t }: { t: typeof testimonials[0] }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
    }}
    whileHover={{ y: -6, transition: { duration: 0.25 } }}
    className="rounded-2xl p-7 md:p-9 border border-border/60 bg-gradient-to-b from-card to-card/80 hover:border-accent/25 hover:shadow-2xl hover:shadow-accent/[0.06] transition-all duration-300 relative"
  >
    <Quote className="h-10 w-10 text-accent/[0.08] absolute top-6 right-6" />
    <div className="flex gap-0.5 mb-6">
      {Array.from({ length: t.stars }).map((_, j) => (
        <Star key={j} className="h-4 w-4 fill-accent text-accent" />
      ))}
    </div>
    <p className="text-foreground/85 text-[15px] leading-relaxed mb-9 font-medium">"{t.quote}"</p>
    <div className="flex items-center gap-4">
      <div className="w-11 h-11 rounded-full bg-accent/[0.08] flex items-center justify-center text-accent font-display font-bold text-sm">
        {t.author.charAt(0)}
      </div>
      <div>
        <p className="text-foreground font-bold text-sm tracking-tight">{t.author}</p>
        <p className="text-muted-foreground text-xs mt-0.5">{t.role}</p>
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
    <section id="testimonials" className="py-20 md:py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--accent)/0.04),transparent_50%)]" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-accent/[0.03] blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto mb-16 md:mb-24"
        >
          <span className="inline-flex items-center rounded-full border border-accent/20 bg-accent/[0.06] px-4 py-1.5 text-accent text-[11px] font-bold uppercase tracking-[0.15em] mb-8">
            Testimonials
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-[3.75rem] font-bold text-foreground leading-[1.08] tracking-tight">
            Trusted by shop owners who{" "}
            <span className="bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent">
              demand accuracy
            </span>
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
                <TestimonialCard t={t} />
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
          className="hidden sm:grid md:grid-cols-3 gap-5 max-w-5xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustSection;
