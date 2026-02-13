import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqs = [
  {
    q: "Do I need to know accounting to use this?",
    a: "Not at all. You just record what happened — sold something, bought stock, paid rent. The AI creates correct double-entry records automatically.",
  },
  {
    q: "How does voice input work?",
    a: "Send a voice note like WhatsApp: 'Sold 5 bags of cement to John, he paid half.' The AI transcribes, identifies products and amounts, then creates the proper entries.",
  },
  {
    q: "Is my data safe?",
    a: "Your data is encrypted at rest and in transit. Each shop is completely isolated — no one else can see your numbers.",
  },
  {
    q: "Can I use this with M-Pesa?",
    a: "Yes! Nexus tracks M-Pesa alongside cash. We're adding automatic M-Pesa statement reconciliation soon.",
  },
  {
    q: "What happens if the AI makes a mistake?",
    a: "Every entry requires your confirmation. If errors slip through, corrections are made via reversing entries — your audit trail stays clean.",
  },
  {
    q: "Can my clerk use the app too?",
    a: "Yes. Growth plan supports up to 3 users with different permissions. Every action is logged and attributed.",
  },
];

const FAQSection = () => (
  <section id="faq" className="py-28 md:py-40 bg-background relative">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(var(--accent)/0.03),transparent_50%)]" />
    <div className="container mx-auto px-4 md:px-8 relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center max-w-2xl mx-auto mb-20"
      >
        <span className="inline-flex items-center rounded-full border border-accent/20 bg-accent/[0.06] px-3.5 py-1 text-accent text-xs font-semibold uppercase tracking-widest mb-6">
          FAQ
        </span>
        <h2 className="font-display text-3xl sm:text-4xl md:text-[3.25rem] font-bold text-foreground leading-[1.1] tracking-tight">
          Got questions? We've got answers
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        className="max-w-3xl mx-auto"
      >
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="rounded-xl px-6 border border-border/80 bg-card data-[state=open]:border-accent/20 data-[state=open]:shadow-lg data-[state=open]:shadow-accent/[0.03] transition-all"
            >
              <AccordionTrigger className="text-left font-display font-semibold text-foreground hover:no-underline py-5 text-[15px]">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </div>
  </section>
);

export default FAQSection;
