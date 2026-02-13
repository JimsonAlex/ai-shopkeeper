import { motion } from "framer-motion";

const partnersRow1 = [
  "Safaricom",
  "M-Pesa",
  "Equity Bank",
  "KCB",
  "Jumia",
  "Twiga Foods",
];

const partnersRow2 = [
  "Flutterwave",
  "Paystack",
  "Cellulant",
  "Copia",
  "MarketForce",
  "Wasoko",
];

const marqueeRow1 = [...partnersRow1, ...partnersRow1];
const marqueeRow2 = [...partnersRow2, ...partnersRow2];

const MarqueeRow = ({
  items,
  reverse = false,
  duration = 20,
}: {
  items: string[];
  reverse?: boolean;
  duration?: number;
}) => (
  <div className="relative">
    <div className="absolute left-0 top-0 bottom-0 w-28 md:w-48 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
    <div className="absolute right-0 top-0 bottom-0 w-28 md:w-48 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

    <motion.div
      className="flex items-center gap-20 md:gap-28 w-max"
      animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
      transition={{
        x: {
          duration,
          repeat: Infinity,
          ease: "linear",
        },
      }}
    >
      {items.map((name, i) => (
        <span
          key={`${name}-${i}`}
          className="font-display text-2xl md:text-3xl font-bold text-foreground/[0.08] hover:text-foreground/[0.2] transition-colors duration-500 select-none tracking-tight whitespace-nowrap"
        >
          {name}
        </span>
      ))}
    </motion.div>
  </div>
);

const LogoCloudSection = () => (
  <section className="py-16 md:py-20 bg-background relative overflow-hidden">
    <div className="container mx-auto px-4 md:px-8">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center text-muted-foreground/40 text-[11px] uppercase tracking-[0.2em] font-semibold mb-12"
      >
        Trusted by leading businesses across Africa
      </motion.p>
    </div>

    <div className="space-y-8">
      <MarqueeRow items={marqueeRow1} duration={22} />
      <MarqueeRow items={marqueeRow2} reverse duration={26} />
    </div>
  </section>
);

export default LogoCloudSection;
