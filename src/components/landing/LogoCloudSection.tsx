import { motion } from "framer-motion";

const partners = [
  "Safaricom",
  "M-Pesa",
  "Equity Bank",
  "KCB",
  "Jumia",
  "Twiga Foods",
];

const LogoCloudSection = () => (
  <section className="py-14 md:py-16 bg-background relative">
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
      <motion.div
        className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 max-w-4xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
      >
        {partners.map((name) => (
          <motion.span
            key={name}
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
            }}
            className="font-display text-lg md:text-xl font-bold text-foreground/[0.12] hover:text-foreground/[0.25] transition-colors duration-300 select-none tracking-tight"
          >
            {name}
          </motion.span>
        ))}
      </motion.div>
    </div>
  </section>
);

export default LogoCloudSection;
