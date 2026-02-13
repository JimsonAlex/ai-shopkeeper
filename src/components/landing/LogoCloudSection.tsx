import { motion } from "framer-motion";

const partners = [
  "Safaricom",
  "M-Pesa",
  "Equity Bank",
  "KCB",
  "Jumia",
  "Twiga Foods",
];

// Double the list for seamless loop
const marqueeItems = [...partners, ...partners];

const LogoCloudSection = () => (
  <section className="py-14 md:py-16 bg-background relative overflow-hidden">
    <div className="container mx-auto px-4 md:px-8">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center text-muted-foreground/50 text-xs uppercase tracking-[0.2em] font-medium mb-10"
      >
        Trusted by leading businesses across Africa
      </motion.p>
    </div>

    {/* Marquee container */}
    <div className="relative">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex items-center gap-16 md:gap-24 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          x: {
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          },
        }}
      >
        {marqueeItems.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="font-display text-xl md:text-2xl font-bold text-foreground/[0.1] hover:text-foreground/[0.25] transition-colors duration-300 select-none tracking-tight whitespace-nowrap"
          >
            {name}
          </span>
        ))}
      </motion.div>
    </div>
  </section>
);

export default LogoCloudSection;
