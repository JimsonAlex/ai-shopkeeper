import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import FadeIn from "./FadeIn";

const faqs = [
  {
    q: "Do I need to know accounting to use this?",
    a: "Absolutely not. You just record what happened — sold something, bought stock, paid rent. The AI automatically creates correct double-entry accounting records behind the scenes. You see profit, cash flow, and inventory without touching a single journal entry.",
  },
  {
    q: "How does voice input work?",
    a: "Just send a voice note like you would on WhatsApp: 'Sold 5 bags of cement to John, he paid half.' Our AI transcribes it, identifies the products, amounts, and payment terms, then creates the proper accounting entries. You confirm with one tap.",
  },
  {
    q: "Is my data safe?",
    a: "Your data is encrypted at rest and in transit. Each shop's data is completely isolated — no one else can see your numbers. We use bank-grade security practices and never share your financial data with third parties.",
  },
  {
    q: "Can I use this with M-Pesa?",
    a: "Yes! Shop AI Copilot tracks M-Pesa payments alongside cash. In upcoming releases, we'll add automatic M-Pesa statement reconciliation to match payments with sales records automatically.",
  },
  {
    q: "What happens if the AI makes a mistake?",
    a: "Every AI-suggested entry requires your confirmation before it's posted. If an error slips through, corrections are made via reversing entries — your audit trail stays clean and complete. The original record is never deleted.",
  },
  {
    q: "Can my clerk use the app too?",
    a: "Yes. On the Growth plan, you can add up to 3 users with different permission levels. Your clerk can record sales while you keep oversight of the finances. Every action is logged and attributed.",
  },
];

const FAQSection = () => (
  <section id="faq" className="py-24 md:py-32 bg-muted/40 relative">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(var(--accent)/0.04),transparent_50%)]" />
    <div className="container mx-auto px-4 md:px-8 relative">
      <FadeIn>
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">FAQ</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-3 leading-tight">
            Got questions? We've got answers
          </h2>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="glass-card rounded-xl px-6 data-[state=open]:border-accent/30 transition-colors"
              >
                <AccordionTrigger className="text-left font-display font-semibold text-foreground hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </FadeIn>
    </div>
  </section>
);

export default FAQSection;
