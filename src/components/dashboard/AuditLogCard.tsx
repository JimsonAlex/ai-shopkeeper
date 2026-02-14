import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart, Receipt, CreditCard, Package,
  Clock, CheckCircle2, PenLine, XCircle,
  ChevronDown, ChevronUp, FileText,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuditLog, type AuditEntry, type AuditIntentType } from "@/stores/auditLog";
import { useState } from "react";

/* ───── Intent visual config ───── */
const INTENT_META: Record<AuditIntentType, { icon: typeof ShoppingCart; colorClass: string; bgClass: string; label: string }> = {
  sale: { icon: ShoppingCart, label: "Sale", colorClass: "text-emerald-500", bgClass: "bg-emerald-500/10" },
  expense: { icon: Receipt, label: "Expense", colorClass: "text-rose-500", bgClass: "bg-rose-500/10" },
  credit: { icon: CreditCard, label: "Credit", colorClass: "text-blue-500", bgClass: "bg-blue-500/10" },
  stock: { icon: Package, label: "Stock", colorClass: "text-amber-500", bgClass: "bg-amber-500/10" },
};

const STATUS_META: Record<AuditEntry["status"], { icon: typeof CheckCircle2; label: string; colorClass: string }> = {
  confirmed: { icon: CheckCircle2, label: "Confirmed", colorClass: "text-emerald-500" },
  edited: { icon: PenLine, label: "Edited", colorClass: "text-amber-500" },
  rejected: { icon: XCircle, label: "Rejected", colorClass: "text-rose-500" },
};

function formatTime(date: Date): string {
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

/* ───── Single audit row ───── */
function AuditRow({ entry }: { entry: AuditEntry }) {
  const [expanded, setExpanded] = useState(false);
  const intentMeta = entry.detectedIntent ? INTENT_META[entry.detectedIntent] : null;
  const statusMeta = STATUS_META[entry.status];
  const IntentIcon = intentMeta?.icon ?? FileText;
  const StatusIcon = statusMeta.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg border border-border bg-card overflow-hidden"
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-secondary/40 active:bg-secondary/60 transition-colors min-h-[48px]"
      >
        {/* Intent icon */}
        <div className={`h-7 w-7 rounded-full flex items-center justify-center flex-shrink-0 ${intentMeta?.bgClass ?? "bg-secondary"}`}>
          <IntentIcon className={`h-3.5 w-3.5 ${intentMeta?.colorClass ?? "text-muted-foreground"}`} />
        </div>

        {/* Main info */}
        <div className="flex-1 min-w-0 text-left">
          <p className="text-xs text-foreground truncate leading-tight">
            "{entry.rawText}"
          </p>
          <div className="flex items-center gap-2 mt-0.5">
            <span className={`text-[10px] font-medium ${intentMeta?.colorClass ?? "text-muted-foreground"}`}>
              {intentMeta?.label ?? "Unknown"}{" "}
              <span className="text-muted-foreground font-normal">({entry.confidence})</span>
            </span>
            <span className="text-[9px] text-muted-foreground/60">•</span>
            <span className={`flex items-center gap-0.5 text-[10px] ${statusMeta.colorClass}`}>
              <StatusIcon className="h-2.5 w-2.5" />
              {statusMeta.label}
            </span>
          </div>
        </div>

        {/* Time + expand */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <span className="text-[10px] text-muted-foreground">{formatTime(entry.timestamp)}</span>
          {expanded ? (
            <ChevronUp className="h-3 w-3 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-3 w-3 text-muted-foreground" />
          )}
        </div>
      </button>

      {/* Expanded detail */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.15 }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-3 pt-1 border-t border-border space-y-2">
              {/* Parsed fields */}
              {entry.parsedFields.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {entry.parsedFields.map((f) => (
                    <span
                      key={f.label}
                      className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-1 rounded-md bg-secondary text-foreground"
                    >
                      <span className="text-muted-foreground">{f.label}:</span>
                      {f.value}
                    </span>
                  ))}
                </div>
              )}
              {/* Timestamp */}
              <p className="text-[9px] text-muted-foreground/60">
                {entry.timestamp.toLocaleString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
                {" · ID: "}
                <span className="font-mono">{entry.id.slice(0, 16)}</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   AuditLogCard — Displays full audit trail
   ═══════════════════════════════════════════ */
export default function AuditLogCard() {
  const entries = useAuditLog();
  const [showAll, setShowAll] = useState(false);

  const visible = showAll ? entries : entries.slice(0, 5);

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="font-display text-sm font-semibold flex items-center gap-2">
          <Clock className="h-4 w-4 text-primary" />
          AI Audit Log
          {entries.length > 0 && (
            <span className="ml-auto text-[10px] font-normal text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
              {entries.length} {entries.length === 1 ? "entry" : "entries"}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {entries.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center mb-3">
              <FileText className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">No entries yet</p>
            <p className="text-[11px] text-muted-foreground/60 mt-1">
              Use Voice, Text, or Photo to add your first entry
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {visible.map((entry) => (
              <AuditRow key={entry.id} entry={entry} />
            ))}
            {entries.length > 5 && (
              <button
                onClick={() => setShowAll(!showAll)}
                className="text-xs text-accent hover:text-accent/80 transition-colors flex items-center gap-1 min-h-[44px] py-2 w-full justify-center"
              >
                {showAll ? "Show less" : `View all ${entries.length} entries`}
                {showAll ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
              </button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
