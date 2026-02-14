import { useSyncExternalStore } from "react";

/* ───── Types ───── */
export type AuditIntentType = "sale" | "expense" | "credit" | "stock";

export interface AuditParsedField {
  label: string;
  value: string;
}

export interface AuditEntry {
  id: string;
  timestamp: Date;
  rawText: string;
  detectedIntent: AuditIntentType | null;
  confidence: "high" | "medium" | "low";
  parsedFields: AuditParsedField[];
  /** confirmed = user accepted, edited = user modified, rejected = user discarded */
  status: "confirmed" | "edited" | "rejected";
  /** If edited, what the user changed it to */
  editedIntent?: AuditIntentType;
}

/* ───── In-memory store (will migrate to backend later) ───── */
let entries: AuditEntry[] = [];
let listeners = new Set<() => void>();

function emitChange() {
  listeners.forEach((l) => l());
}

function generateId(): string {
  return `audit_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

export const auditLogStore = {
  addEntry(entry: Omit<AuditEntry, "id" | "timestamp">): AuditEntry {
    const newEntry: AuditEntry = {
      ...entry,
      id: generateId(),
      timestamp: new Date(),
    };
    // Prepend so newest is first
    entries = [newEntry, ...entries];
    emitChange();
    return newEntry;
  },

  updateStatus(id: string, status: AuditEntry["status"]) {
    entries = entries.map((e) => (e.id === id ? { ...e, status } : e));
    emitChange();
  },

  getEntries(): readonly AuditEntry[] {
    return entries;
  },

  subscribe(listener: () => void): () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  getSnapshot(): readonly AuditEntry[] {
    return entries;
  },
};

/* ───── React hook ───── */
export function useAuditLog(): readonly AuditEntry[] {
  return useSyncExternalStore(
    auditLogStore.subscribe,
    auditLogStore.getSnapshot,
    auditLogStore.getSnapshot,
  );
}
