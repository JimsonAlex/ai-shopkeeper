import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart, Receipt, Package, CreditCard,
  Send, X, Sparkles, User, ChevronRight,
} from "lucide-react";
import { auditLogStore } from "@/stores/auditLog";

/* ───── Known accounts & products for auto-fill ───── */
const KNOWN_ACCOUNTS = [
  { name: "John Msafiri", type: "customer", recent: true },
  { name: "Aisha Bakery", type: "customer", recent: true },
  { name: "Mama Halima", type: "customer", recent: true },
  { name: "Ali Hardware", type: "supplier", recent: false },
  { name: "Kariakoo Wholesale", type: "supplier", recent: false },
  { name: "M-Pesa Agent", type: "other", recent: true },
];

const KNOWN_PRODUCTS = [
  { name: "Cement (50kg)", price: 15000 },
  { name: "Roofing Nails (kg)", price: 3000 },
  { name: "White Paint (4L)", price: 30000 },
  { name: "Padlock (medium)", price: 5000 },
  { name: "Iron Sheet (gauge 30)", price: 12000 },
  { name: "PVC Pipe (1 inch)", price: 4500 },
];

/* ───── Intent detection — keyword-based ───── */
type IntentType = "sale" | "expense" | "credit" | "stock" | null;

interface DetectedIntent {
  type: IntentType;
  confidence: "high" | "medium" | "low";
  label: string;
  icon: typeof ShoppingCart;
  colorClass: string;
  bgClass: string;
}

interface ParsedField {
  label: string;
  value: string;
}

const SALE_KEYWORDS = ["sold", "sale", "sell", "bought", "purchased", "cash sale", "customer"];
const EXPENSE_KEYWORDS = ["paid", "expense", "spent", "fuel", "rent", "transport", "salary", "electricity", "water", "airtime", "delivery"];
const CREDIT_KEYWORDS = ["credit", "owes", "owed", "loan", "debt", "on credit", "will pay", "pay later"];
const STOCK_KEYWORDS = ["restock", "received", "stock", "inventory", "arrived", "supply", "supplier", "ordered"];

function detectIntent(text: string): DetectedIntent | null {
  const lower = text.toLowerCase().trim();
  if (lower.length < 3) return null;

  const score = (keywords: string[]) =>
    keywords.reduce((s, kw) => s + (lower.includes(kw) ? 1 : 0), 0);

  const scores: { type: IntentType; s: number }[] = [
    { type: "sale", s: score(SALE_KEYWORDS) },
    { type: "expense", s: score(EXPENSE_KEYWORDS) },
    { type: "credit", s: score(CREDIT_KEYWORDS) },
    { type: "stock", s: score(STOCK_KEYWORDS) },
  ];

  const best = scores.reduce((a, b) => (b.s > a.s ? b : a));
  if (best.s === 0) return null;

  const conf = best.s >= 2 ? "high" : "medium";

  const meta: Record<string, Omit<DetectedIntent, "type" | "confidence">> = {
    sale: { label: "Sale", icon: ShoppingCart, colorClass: "text-emerald-500", bgClass: "bg-emerald-500/10" },
    expense: { label: "Expense", icon: Receipt, colorClass: "text-rose-500", bgClass: "bg-rose-500/10" },
    credit: { label: "Credit Sale", icon: CreditCard, colorClass: "text-blue-500", bgClass: "bg-blue-500/10" },
    stock: { label: "Stock Update", icon: Package, colorClass: "text-amber-500", bgClass: "bg-amber-500/10" },
  };

  return { type: best.type, confidence: conf, ...meta[best.type!] };
}

/* ───── Extract amount from text ───── */
function extractAmount(text: string): string | null {
  // Match patterns: 75,000 | 75000 | 75k | TZS 75,000
  const patterns = [
    /(?:tzs\s*)?(\d{1,3}(?:,\d{3})+)/i,
    /(?:tzs\s*)?(\d+)k\b/i,
    /(?:tzs\s*)(\d{4,})/i,
  ];
  for (const p of patterns) {
    const m = text.match(p);
    if (m) {
      let val = m[1].replace(/,/g, "");
      if (text.match(/\d+k\b/i)) val = String(Number(val) * 1000);
      return `TZS ${Number(val).toLocaleString()}`;
    }
  }
  return null;
}

/* ───── Extract quantity from text ───── */
function extractQuantity(text: string): string | null {
  const m = text.match(/(\d+)\s*(?:bags?|kg|pieces?|pcs|litres?|liters?|sheets?|boxes?|rolls?|packets?)/i);
  return m ? m[0] : null;
}

/* ───── Match known account ───── */
function matchAccount(text: string): typeof KNOWN_ACCOUNTS[number] | null {
  const lower = text.toLowerCase();
  return KNOWN_ACCOUNTS.find((a) => lower.includes(a.name.toLowerCase().split(" ")[0].toLowerCase())) ?? null;
}

/* ───── Match known product ───── */
function matchProduct(text: string): typeof KNOWN_PRODUCTS[number] | null {
  const lower = text.toLowerCase();
  return KNOWN_PRODUCTS.find((p) => lower.includes(p.name.toLowerCase().split(" ")[0].toLowerCase())) ?? null;
}

/* ───── Build parsed fields from text ───── */
function parseFields(text: string, intent: DetectedIntent | null): ParsedField[] {
  const fields: ParsedField[] = [];

  if (intent) fields.push({ label: "Type", value: intent.label });

  const amount = extractAmount(text);
  if (amount) fields.push({ label: "Amount", value: amount });

  const qty = extractQuantity(text);
  if (qty) fields.push({ label: "Quantity", value: qty });

  const account = matchAccount(text);
  if (account) fields.push({ label: account.type === "supplier" ? "Supplier" : "Customer", value: account.name });

  const product = matchProduct(text);
  if (product) fields.push({ label: "Item", value: product.name });

  return fields;
}

/* ───── Suggestion chips ───── */
function getAccountSuggestions(text: string): typeof KNOWN_ACCOUNTS {
  if (text.length < 2) return [];
  const lower = text.toLowerCase();

  // Show suggestions when text ends with "to " or "from " or similar prepositions
  const endsWithPrep = /(?:to|from|for|by)\s+\w{0,3}$/i.test(lower);
  if (!endsWithPrep && lower.length > 5) return [];

  const lastWord = lower.split(/\s+/).pop() ?? "";
  if (lastWord.length < 1) return KNOWN_ACCOUNTS.filter((a) => a.recent).slice(0, 3);

  return KNOWN_ACCOUNTS
    .filter((a) => a.name.toLowerCase().includes(lastWord))
    .slice(0, 3);
}

/* ═══════════════════════════════════════════
   SmartTextInput Component
   ═══════════════════════════════════════════ */
interface SmartTextInputProps {
  isVisible: boolean;
  onClose: () => void;
  /** "mobile" renders full-width above floating bar, "desktop" renders inline card */
  variant: "mobile" | "desktop";
}

export default function SmartTextInput({ isVisible, onClose, variant }: SmartTextInputProps) {
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when visible
  useEffect(() => {
    if (isVisible && inputRef.current) {
      const t = setTimeout(() => inputRef.current?.focus(), 150);
      return () => clearTimeout(t);
    }
  }, [isVisible]);

  const intent = useMemo(() => detectIntent(text), [text]);
  const parsedFields = useMemo(() => parseFields(text, intent), [text, intent]);
  const suggestions = useMemo(() => getAccountSuggestions(text), [text]);

  const handleSubmit = useCallback(() => {
    if (!text.trim()) return;

    // Log to audit trail
    auditLogStore.addEntry({
      rawText: text.trim(),
      detectedIntent: intent?.type ?? null,
      confidence: intent?.confidence ?? "low",
      parsedFields: parsedFields.map((f) => ({ label: f.label, value: f.value })),
      status: "confirmed",
    });

    setSubmitted(true);
    setTimeout(() => {
      setText("");
      setSubmitted(false);
      onClose();
    }, 1500);
  }, [text, intent, parsedFields, onClose]);

  const handleSuggestionClick = useCallback((name: string) => {
    // Replace the last partial word with the full name
    const words = text.split(/\s+/);
    words[words.length - 1] = name;
    setText(words.join(" ") + " ");
    inputRef.current?.focus();
  }, [text]);

  if (!isVisible) return null;

  const isMobile = variant === "mobile";

  return (
    <motion.div
      initial={{ opacity: 0, y: isMobile ? 8 : -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: isMobile ? 8 : -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`${
        isMobile
          ? "mx-4 mb-2 rounded-2xl bg-card border border-border shadow-xl"
          : "rounded-xl bg-card border border-border"
      }`}
    >
      {/* Success state */}
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="p-4 flex items-center gap-3"
          >
            <div className="h-10 w-10 rounded-full bg-accent/15 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Got it! Entry recorded.</p>
              <p className="text-[11px] text-muted-foreground">
                {intent ? `Detected as ${intent.label.toLowerCase()}` : "Processing..."}
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div key="input" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Input row */}
            <div className="flex items-center gap-2 px-3 py-2.5">
              {/* Intent indicator */}
              <AnimatePresence mode="wait">
                {intent ? (
                  <motion.div
                    key={intent.type}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                    className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${intent.bgClass}`}
                  >
                    <intent.icon className={`h-4 w-4 ${intent.colorClass}`} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0"
                  >
                    <Sparkles className="h-4 w-4 text-muted-foreground" />
                  </motion.div>
                )}
              </AnimatePresence>

              <input
                ref={inputRef}
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value.slice(0, 200))}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                placeholder="e.g. Sold 5 bags cement to John for 75k"
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none min-w-0"
                autoComplete="off"
                maxLength={200}
              />

              <div className="flex items-center gap-1 flex-shrink-0">
                {text.length > 0 && (
                  <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileTap={{ scale: 0.85 }}
                    onClick={() => { setText(""); inputRef.current?.focus(); }}
                    className="h-7 w-7 rounded-full bg-secondary flex items-center justify-center"
                  >
                    <X className="h-3.5 w-3.5 text-muted-foreground" />
                  </motion.button>
                )}
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  onClick={handleSubmit}
                  disabled={!text.trim()}
                  className={`h-8 w-8 rounded-full flex items-center justify-center transition-colors ${
                    text.trim()
                      ? "bg-accent text-accent-foreground"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  <Send className="h-4 w-4" />
                </motion.button>
              </div>
            </div>

            {/* Intent badge + parsed fields */}
            <AnimatePresence>
              {parsedFields.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.15 }}
                  className="overflow-hidden"
                >
                  <div className="px-3 pb-2 flex flex-wrap gap-1.5">
                    {parsedFields.map((f) => (
                      <motion.span
                        key={f.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-1 rounded-md ${
                          f.label === "Type" && intent
                            ? `${intent.bgClass} ${intent.colorClass}`
                            : "bg-secondary text-foreground"
                        }`}
                      >
                        <span className="text-muted-foreground">{f.label}:</span>
                        {f.value}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Account / product suggestions */}
            <AnimatePresence>
              {suggestions.length > 0 && text.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.15 }}
                  className="overflow-hidden border-t border-border"
                >
                  <div className="px-2 py-1.5 space-y-0.5">
                    {suggestions.map((s) => (
                      <motion.button
                        key={s.name}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleSuggestionClick(s.name)}
                        className="flex items-center gap-2.5 w-full rounded-lg px-2.5 py-2 hover:bg-secondary/50 active:bg-secondary/70 transition-colors min-h-[40px]"
                      >
                        <div className="h-6 w-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                          <User className="h-3 w-3 text-accent" />
                        </div>
                        <div className="flex-1 text-left min-w-0">
                          <p className="text-sm text-foreground truncate">{s.name}</p>
                          <p className="text-[9px] text-muted-foreground capitalize">{s.type}</p>
                        </div>
                        <ChevronRight className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Hint text when empty */}
            {text.length === 0 && (
              <div className="px-3 pb-2.5">
                <p className="text-[10px] text-muted-foreground/60">
                  AI auto-detects sale, expense, credit, or stock update
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
