import { motion } from "framer-motion";

const partners = [
  "Safaricom",
  "M-Pesa",
  "Equity Bank",
  "KCB",
  "Jumia",
  "Twiga Foods",
  "Flutterwave",
  "Paystack",
  "Cellulant",
  "Copia",
  "MarketForce",
  "Wasoko",
];

const LogoCloudSection = () => (
  <section
    className="py-16 md:py-20 bg-background relative overflow-hidden"
    aria-label="Trusted partners"
  >
    <div className="container mx-auto px-4 md:px-8">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center text-muted-foreground/50 text-[11px] uppercase tracking-[0.2em] font-semibold mb-12"
      >
        Trusted by leading businesses across Africa
      </motion.p>

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-5 max-w-5xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
      >
        {partners.map((name) => (
          <motion.a
            key={name}
            href="#"
            role="link"
            tabIndex={0}
            aria-label={`Learn more about ${name}`}
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: "easeOut" } },
            }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="group flex items-center justify-center rounded-xl border border-border/50 bg-card/50 px-4 py-5 md:py-6 transition-all duration-300 hover:border-accent/30 hover:bg-accent/[0.04] hover:shadow-lg hover:shadow-accent/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <span className="font-display text-sm md:text-base font-bold text-foreground/40 group-hover:text-foreground/70 group-focus-visible:text-foreground/70 transition-colors duration-300 tracking-tight select-none">
              {name}
            </span>
          </motion.a>
        ))}
      </motion.div>
    </div>
  </section>
);

export default LogoCloudSection;
