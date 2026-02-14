import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Store, DollarSign, Package, Users,
  Send, Mic, Camera, Paperclip,
  CheckCircle2, ArrowLeft, Bot, Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/* ───── Phase definitions ───── */
const PHASES = [
  { id: "basics", label: "Shop Details", icon: Store, description: "Name, type & location" },
  { id: "finances", label: "Opening Balance", icon: DollarSign, description: "Cash & debts" },
  { id: "inventory", label: "Inventory", icon: Package, description: "Products & stock" },
  { id: "team", label: "Team", icon: Users, description: "Clerks & roles" },
] as const;

type PhaseId = (typeof PHASES)[number]["id"];

interface Message {
  id: string;
  role: "ai" | "user";
  content: string;
  timestamp: Date;
  inputHint?: "text" | "voice" | "photo" | "file";
}

/* ───── Scripted AI messages per phase (demo / placeholder) ───── */
const PHASE_INTROS: Record<PhaseId, string[]> = {
  basics: [
    "Welcome to Shop AI Copilot! 🎉 I'm your setup assistant — think of me as your invisible accountant.",
    "Let's start simple. **What's the name of your shop?**",
  ],
  finances: [
    "Great — now let's figure out your starting finances. Don't worry about being exact, I'll help clean it up.",
    "**How much cash do you have on hand right now?** (drawer, M-Pesa, bank — total it up)",
  ],
  inventory: [
    "Time for stock! You can tell me what's on your shelves, snap a photo, or upload a CSV — whatever works.",
    "**What products do you sell?** Start with your top sellers. You can say something like:\n\n_\"20 bags of cement at 15,000 each, 50 kg nails at 3,000...\"_",
  ],
  team: [
    "Almost done! Let's set up your team so they can log in and record sales too.",
    "**Do you have any clerks or employees?** Tell me their names and I'll send them an invite.",
  ],
};

/* ───── Component ───── */
const Onboarding = () => {
  const [currentPhase, setCurrentPhase] = useState<PhaseId>("basics");
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [completedPhases, setCompletedPhases] = useState<Set<PhaseId>>(new Set());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => { scrollToBottom(); }, [messages, isTyping]);

  /* Send intro messages for the current phase */
  useEffect(() => {
    const intros = PHASE_INTROS[currentPhase];
    let cancelled = false;

    const send = async () => {
      setIsTyping(true);
      for (const text of intros) {
        await new Promise((r) => setTimeout(r, 800));
        if (cancelled) return;
        setMessages((prev) => [
          ...prev,
          { id: crypto.randomUUID(), role: "ai", content: text, timestamp: new Date() },
        ]);
      }
      setIsTyping(false);
    };
    send();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPhase]);

  /* Handle user send */
  const handleSend = () => {
    if (!inputValue.trim()) return;

    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), role: "user", content: inputValue.trim(), timestamp: new Date() },
    ]);
    setInputValue("");

    // Simulate AI acknowledgement then advance phase
    setIsTyping(true);
    setTimeout(() => {
      const phaseIdx = PHASES.findIndex((p) => p.id === currentPhase);
      const isLast = phaseIdx === PHASES.length - 1;

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "ai",
          content: isLast
            ? "🎉 **You're all set!** Your shop is ready. Head to the dashboard to start recording sales."
            : `Got it! ✅ Let me save that and move on to the next step...`,
          timestamp: new Date(),
        },
      ]);
      setCompletedPhases((prev) => new Set(prev).add(currentPhase));
      setIsTyping(false);

      if (!isLast) {
        setTimeout(() => setCurrentPhase(PHASES[phaseIdx + 1].id), 600);
      }
    }, 1200);
  };

  const currentPhaseIdx = PHASES.findIndex((p) => p.id === currentPhase);
  const allDone = completedPhases.size === PHASES.length;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* ── Top bar ── */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-30">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span className="font-display font-bold text-lg text-accent">Nexus</span>
          </Link>

          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            AI-guided setup
          </div>
        </div>
      </header>

      <div className="flex-1 flex max-w-5xl w-full mx-auto">
        {/* ── Phase sidebar (desktop) ── */}
        <aside className="hidden md:flex flex-col w-56 border-r border-border p-4 gap-1 pt-6">
          <p className="text-[11px] uppercase tracking-widest text-muted-foreground font-medium mb-3">Setup Progress</p>
          {PHASES.map((phase, idx) => {
            const Icon = phase.icon;
            const isActive = phase.id === currentPhase;
            const isDone = completedPhases.has(phase.id);
            return (
              <button
                key={phase.id}
                onClick={() => { if (isDone || isActive) setCurrentPhase(phase.id); }}
                disabled={!isDone && !isActive}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors text-sm
                  ${isActive ? "bg-accent/10 text-accent font-medium" : ""}
                  ${isDone ? "text-foreground/70 hover:bg-secondary" : ""}
                  ${!isDone && !isActive ? "text-muted-foreground/40 cursor-not-allowed" : ""}
                `}
              >
                <div className={`flex h-7 w-7 items-center justify-center rounded-full border transition-colors
                  ${isActive ? "border-accent bg-accent/10 text-accent" : ""}
                  ${isDone ? "border-accent bg-accent text-accent-foreground" : ""}
                  ${!isDone && !isActive ? "border-border text-muted-foreground/40" : ""}
                `}>
                  {isDone ? <CheckCircle2 className="h-4 w-4" /> : <Icon className="h-3.5 w-3.5" />}
                </div>
                <div>
                  <p className="leading-tight">{phase.label}</p>
                  <p className="text-[10px] text-muted-foreground/60 leading-tight">{phase.description}</p>
                </div>
              </button>
            );
          })}

          {/* Progress bar */}
          <div className="mt-auto pt-6">
            <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-1.5">
              <span>Progress</span>
              <span>{Math.round((completedPhases.size / PHASES.length) * 100)}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-accent"
                initial={{ width: 0 }}
                animate={{ width: `${(completedPhases.size / PHASES.length) * 100}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>
        </aside>

        {/* ── Mobile phase tabs ── */}
        <div className="md:hidden sticky top-[57px] z-20 bg-card/90 backdrop-blur-sm border-b border-border px-4 py-2 flex gap-2 overflow-x-auto scrollbar-hide">
          {PHASES.map((phase, idx) => {
            const Icon = phase.icon;
            const isActive = phase.id === currentPhase;
            const isDone = completedPhases.has(phase.id);
            return (
              <button
                key={phase.id}
                disabled={!isDone && !isActive}
                onClick={() => { if (isDone || isActive) setCurrentPhase(phase.id); }}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap border transition-colors
                  ${isActive ? "border-accent bg-accent/10 text-accent" : ""}
                  ${isDone ? "border-accent/30 text-accent/70" : ""}
                  ${!isDone && !isActive ? "border-border text-muted-foreground/40 cursor-not-allowed" : ""}
                `}
              >
                {isDone ? <CheckCircle2 className="h-3 w-3" /> : <Icon className="h-3 w-3" />}
                {phase.label}
              </button>
            );
          })}
        </div>

        {/* ── Chat area ── */}
        <main className="flex-1 flex flex-col min-h-0">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-4">
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "ai" && (
                    <div className="flex-shrink-0 mr-2.5 mt-1">
                      <div className="h-8 w-8 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
                        <Bot className="h-4 w-4 text-accent" />
                      </div>
                    </div>
                  )}

                  <div
                    className={`max-w-[80%] md:max-w-[65%] rounded-2xl px-4 py-3 text-sm leading-relaxed
                      ${msg.role === "user"
                        ? "bg-accent text-accent-foreground rounded-br-md"
                        : "bg-card border border-border text-card-foreground rounded-bl-md"
                      }`}
                  >
                    {/* Basic markdown bold rendering */}
                    {msg.content.split(/(\*\*.*?\*\*)/g).map((part, i) =>
                      part.startsWith("**") && part.endsWith("**") ? (
                        <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>
                      ) : part.startsWith("_") && part.endsWith("_") ? (
                        <em key={i} className="opacity-70">{part.slice(1, -1)}</em>
                      ) : (
                        <span key={i}>{part}</span>
                      )
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2.5"
              >
                <div className="h-8 w-8 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-accent" />
                </div>
                <div className="bg-card border border-border rounded-2xl rounded-bl-md px-4 py-3 flex gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* ── Input area ── */}
          {!allDone ? (
            <div className="border-t border-border bg-card/80 backdrop-blur-sm px-4 md:px-8 py-3">
              <form
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex items-center gap-2 max-w-2xl mx-auto"
              >
                {/* Accessory buttons */}
                <div className="hidden sm:flex items-center gap-1">
                  <Button type="button" variant="ghost" size="icon" className="text-muted-foreground hover:text-accent h-9 w-9" aria-label="Voice input">
                    <Mic className="h-4 w-4" />
                  </Button>
                  <Button type="button" variant="ghost" size="icon" className="text-muted-foreground hover:text-accent h-9 w-9" aria-label="Take photo">
                    <Camera className="h-4 w-4" />
                  </Button>
                  <Button type="button" variant="ghost" size="icon" className="text-muted-foreground hover:text-accent h-9 w-9" aria-label="Attach file">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                </div>

                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your answer, or use voice/photo..."
                  className="flex-1 bg-background border-border focus-visible:ring-accent"
                  disabled={isTyping}
                />

                <Button
                  type="submit"
                  size="icon"
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-accent text-accent-foreground hover:bg-accent/90 h-9 w-9 rounded-lg"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>

              <p className="text-[10px] text-muted-foreground/50 text-center mt-2">
                You can type, send a voice note, snap a photo, or upload a file — whatever's easiest.
              </p>
            </div>
          ) : (
            <div className="border-t border-border bg-card/80 px-4 py-6 text-center">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-medium px-6">
                Go to Dashboard →
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Onboarding;
