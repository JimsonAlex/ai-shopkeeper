import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic, MicOff, Square, Sparkles, AlertCircle,
  ShoppingCart, Receipt, Package, CreditCard,
} from "lucide-react";
import { auditLogStore } from "@/stores/auditLog";

/* ───── Reuse intent detection from SmartTextInput ───── */
type IntentType = "sale" | "expense" | "credit" | "stock" | null;

const SALE_KEYWORDS = ["sold", "sale", "sell", "bought", "purchased", "cash sale", "customer"];
const EXPENSE_KEYWORDS = ["paid", "expense", "spent", "fuel", "rent", "transport", "salary", "electricity", "water", "airtime", "delivery"];
const CREDIT_KEYWORDS = ["credit", "owes", "owed", "loan", "debt", "on credit", "will pay", "pay later"];
const STOCK_KEYWORDS = ["restock", "received", "stock", "inventory", "arrived", "supply", "supplier", "ordered"];

const INTENT_META: Record<string, { icon: typeof ShoppingCart; label: string; colorClass: string; bgClass: string }> = {
  sale: { icon: ShoppingCart, label: "Sale", colorClass: "text-emerald-500", bgClass: "bg-emerald-500/10" },
  expense: { icon: Receipt, label: "Expense", colorClass: "text-rose-500", bgClass: "bg-rose-500/10" },
  credit: { icon: CreditCard, label: "Credit Sale", colorClass: "text-blue-500", bgClass: "bg-blue-500/10" },
  stock: { icon: Package, label: "Stock Update", colorClass: "text-amber-500", bgClass: "bg-amber-500/10" },
};

function detectIntent(text: string): { type: IntentType; confidence: "high" | "medium" | "low" } {
  const lower = text.toLowerCase().trim();
  if (lower.length < 3) return { type: null, confidence: "low" };

  const score = (keywords: string[]) =>
    keywords.reduce((s, kw) => s + (lower.includes(kw) ? 1 : 0), 0);

  const scores = [
    { type: "sale" as IntentType, s: score(SALE_KEYWORDS) },
    { type: "expense" as IntentType, s: score(EXPENSE_KEYWORDS) },
    { type: "credit" as IntentType, s: score(CREDIT_KEYWORDS) },
    { type: "stock" as IntentType, s: score(STOCK_KEYWORDS) },
  ];

  const best = scores.reduce((a, b) => (b.s > a.s ? b : a));
  if (best.s === 0) return { type: null, confidence: "low" };
  return { type: best.type, confidence: best.s >= 2 ? "high" : "medium" };
}

function extractAmount(text: string): string | null {
  const patterns = [
    /\$?\s*(\d{1,3}(?:,\d{3})+)/i,
    /\$?\s*(\d+)k\b/i,
    /\$\s*(\d+(?:\.\d{1,2})?)/i,
  ];
  for (const p of patterns) {
    const m = text.match(p);
    if (m) {
      let val = m[1].replace(/,/g, "");
      if (text.match(/\d+k\b/i)) val = String(Number(val) * 1000);
      return `$${Number(val).toLocaleString()}`;
    }
  }
  return null;
}

function extractQuantity(text: string): string | null {
  const m = text.match(/(\d+)\s*(?:bags?|kg|pieces?|pcs|units?|litres?|liters?|sheets?|boxes?|rolls?|packets?)/i);
  return m ? m[0] : null;
}

/* ───── Web Speech API type ───── */
interface SpeechRecognitionEvent {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent {
  error: string;
  message?: string;
}

/* ═══════════════════════════════════════════
   VoiceInput Component
   ═══════════════════════════════════════════ */
interface VoiceInputProps {
  isVisible: boolean;
  onClose: () => void;
  variant: "mobile" | "desktop";
}

type VoiceState = "idle" | "listening" | "processing" | "success" | "error" | "unsupported";

export default function VoiceInput({ isVisible, onClose, variant }: VoiceInputProps) {
  const [state, setState] = useState<VoiceState>("idle");
  const [transcript, setTranscript] = useState("");
  const [interimText, setInterimText] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [pulseLevel, setPulseLevel] = useState(0);
  const recognitionRef = useRef<any>(null);
  const pulseIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Check browser support
  const isSupported = typeof window !== "undefined" &&
    ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try { recognitionRef.current.abort(); } catch {}
      }
      if (pulseIntervalRef.current) clearInterval(pulseIntervalRef.current);
    };
  }, []);

  // Reset when hidden
  useEffect(() => {
    if (!isVisible) {
      setState("idle");
      setTranscript("");
      setInterimText("");
      setErrorMsg("");
      if (recognitionRef.current) {
        try { recognitionRef.current.abort(); } catch {}
      }
    }
  }, [isVisible]);

  const startListening = useCallback(async () => {
    if (!isSupported) {
      setState("unsupported");
      return;
    }

    // Request mic permission
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch {
      setErrorMsg("Microphone access denied. Please allow access and try again.");
      setState("error");
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setState("listening");
      setTranscript("");
      setInterimText("");
      // Simulate audio level pulse for visual feedback
      pulseIntervalRef.current = setInterval(() => {
        setPulseLevel(Math.random() * 0.7 + 0.3);
      }, 150);
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let final = "";
      let interim = "";
      for (let i = 0; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          final += result[0].transcript;
        } else {
          interim += result[0].transcript;
        }
      }
      if (final) setTranscript((prev) => prev + final);
      setInterimText(interim);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      if (event.error === "no-speech") {
        setErrorMsg("No speech detected. Try speaking louder or closer to the mic.");
      } else if (event.error === "not-allowed") {
        setErrorMsg("Microphone access denied.");
      } else {
        setErrorMsg(`Recognition error: ${event.error}`);
      }
      setState("error");
      if (pulseIntervalRef.current) clearInterval(pulseIntervalRef.current);
    };

    recognition.onend = () => {
      if (pulseIntervalRef.current) clearInterval(pulseIntervalRef.current);
      setPulseLevel(0);
      // Only auto-process if we were still listening (not manually stopped)
      if (state === "listening") {
        // Will be handled by stopListening
      }
    };

    recognitionRef.current = recognition;
    recognition.start();
  }, [isSupported, state]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch {}
    }
    if (pulseIntervalRef.current) clearInterval(pulseIntervalRef.current);
    setPulseLevel(0);

    const fullText = (transcript + " " + interimText).trim();

    if (!fullText) {
      setErrorMsg("No speech was captured. Please try again.");
      setState("error");
      return;
    }

    // Process the transcript
    setState("processing");
    const intent = detectIntent(fullText);
    const amount = extractAmount(fullText);
    const qty = extractQuantity(fullText);

    const parsedFields: { label: string; value: string }[] = [];
    if (intent.type) parsedFields.push({ label: "Type", value: INTENT_META[intent.type].label });
    if (amount) parsedFields.push({ label: "Amount", value: amount });
    if (qty) parsedFields.push({ label: "Quantity", value: qty });

    // Log to audit trail
    auditLogStore.addEntry({
      rawText: fullText,
      detectedIntent: intent.type,
      confidence: intent.confidence,
      parsedFields,
      status: "confirmed",
    });

    setTranscript(fullText);
    setState("success");

    setTimeout(() => {
      setState("idle");
      setTranscript("");
      setInterimText("");
      onClose();
    }, 2000);
  }, [transcript, interimText, onClose]);

  if (!isVisible) return null;

  const isMobile = variant === "mobile";
  const fullText = (transcript + " " + interimText).trim();
  const liveIntent = fullText.length > 3 ? detectIntent(fullText) : null;
  const IntentIcon = liveIntent?.type ? INTENT_META[liveIntent.type].icon : null;

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
      <div className="p-4 space-y-3">
        {/* ── Unsupported browser ── */}
        {state === "unsupported" && (
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Browser not supported</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                Voice input requires Chrome, Edge, or Safari. Try the Text input instead.
              </p>
            </div>
          </div>
        )}

        {/* ── Error state ── */}
        {state === "error" && (
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
              <MicOff className="h-5 w-5 text-destructive" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Couldn't capture audio</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{errorMsg}</p>
            </div>
            <button
              onClick={() => { setState("idle"); setErrorMsg(""); }}
              className="text-xs text-primary hover:text-primary/80 font-medium min-h-[44px] px-3"
            >
              Retry
            </button>
          </div>
        )}

        {/* ── Success state ── */}
        {state === "success" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-3"
          >
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Entry recorded from voice</p>
              <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2">
                "{transcript}"
              </p>
            </div>
          </motion.div>
        )}

        {/* ── Processing state ── */}
        {state === "processing" && (
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="h-5 w-5 text-primary" />
              </motion.div>
            </div>
            <p className="text-sm font-medium text-foreground">Processing your voice entry…</p>
          </div>
        )}

        {/* ── Idle state — ready to record ── */}
        {state === "idle" && (
          <div className="flex flex-col items-center gap-3 py-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
              onClick={startListening}
              className="h-16 w-16 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/25 transition-colors"
            >
              <Mic className="h-7 w-7 text-primary-foreground" />
            </motion.button>
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">Tap to start recording</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                Speak naturally — "Sold 5 units to Marcus for $750"
              </p>
            </div>
          </div>
        )}

        {/* ── Listening state — actively recording ── */}
        {state === "listening" && (
          <div className="space-y-3">
            {/* Waveform visualization */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-full bg-primary"
                />
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={stopListening}
                  className="relative h-12 w-12 rounded-full bg-primary flex items-center justify-center shadow-md"
                >
                  <Square className="h-4 w-4 text-primary-foreground fill-primary-foreground" />
                </motion.button>
              </div>

              {/* Audio bars */}
              <div className="flex-1 flex items-center gap-[2px] h-8">
                {Array.from({ length: 24 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 rounded-full bg-primary/40"
                    animate={{
                      height: `${Math.max(4, pulseLevel * (20 + Math.sin(i * 0.8 + Date.now() / 200) * 12))}px`,
                    }}
                    transition={{ duration: 0.1 }}
                  />
                ))}
              </div>

              <span className="text-[10px] text-muted-foreground font-mono flex-shrink-0">REC</span>
            </div>

            {/* Live transcript */}
            <div className="min-h-[32px]">
              {fullText ? (
                <p className="text-sm text-foreground leading-relaxed">
                  {transcript}
                  {interimText && (
                    <span className="text-muted-foreground">{interimText}</span>
                  )}
                </p>
              ) : (
                <p className="text-sm text-muted-foreground/50 italic">Listening…</p>
              )}
            </div>

            {/* Live intent detection */}
            <AnimatePresence>
              {liveIntent?.type && IntentIcon && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-2"
                >
                  <div className={`h-6 w-6 rounded-full flex items-center justify-center ${INTENT_META[liveIntent.type].bgClass}`}>
                    <IntentIcon className={`h-3 w-3 ${INTENT_META[liveIntent.type].colorClass}`} />
                  </div>
                  <span className={`text-[11px] font-medium ${INTENT_META[liveIntent.type].colorClass}`}>
                    Detected: {INTENT_META[liveIntent.type].label}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    ({liveIntent.confidence})
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            <p className="text-[10px] text-muted-foreground/50 text-center">
              Tap the stop button when you're done speaking
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
