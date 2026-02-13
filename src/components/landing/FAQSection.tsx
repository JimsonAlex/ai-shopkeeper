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
  <section id="faq" className="py-20 md:py-32 bg-background relative overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(var(--accent)/0.04),transparent_50%)]" />
    <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] rounded-full bg-accent/[0.03] blur-[120px] pointer-events-none" />

    <div className="container mx-auto px-4 md:px-8 relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center max-w-2xl mx-auto mb-16 md:mb-24"
      >
        <span className="inline-flex items-center rounded-full border border-accent/20 bg-accent/[0.06] px-4 py-1.5 text-accent text-[11px] font-bold uppercase tracking-[0.15em] mb-8">
          FAQ
        </span>
        <h2 className="font-display text-4xl sm:text-5xl md:text-[3.75rem] font-bold text-foreground leading-[1.08] tracking-tight">
          Got questions?{" "}
          <span className="bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent">
            We've got answers
          </span>
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        className="max-w-3xl mx-auto"
      >
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="rounded-2xl px-7 border border-border/60 bg-gradient-to-r from-card to-card/80 data-[state=open]:border-accent/25 data-[state=open]:shadow-xl data-[state=open]:shadow-accent/[0.04] transition-all"
            >
              <AccordionTrigger className="text-left font-display font-bold text-foreground hover:no-underline py-6 text-[15px] tracking-tight">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-6">
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
