import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wallet, ShoppingCart, Receipt, TrendingUp,
  ArrowUpRight, ArrowDownRight, AlertTriangle, Clock,
  CreditCard, Mic, Camera, ChevronRight, Users,
  MessageSquare,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";
import SmartTextInput from "@/components/dashboard/SmartTextInput";
import AuditLogCard from "@/components/dashboard/AuditLogCard";

/* ───── Mock data ───── */
const KPI = [
  {
    label: "Cash Position",
    value: "$24,500",
    shortValue: "$24.5K",
    change: "+12.5%",
    trend: "up" as const,
    icon: Wallet,
    detail: "Cash + Digital + Bank",
  },
  {
    label: "Today's Sales",
    value: "$6,800",
    shortValue: "$6.8K",
    change: "+8.2%",
    trend: "up" as const,
    icon: ShoppingCart,
    detail: "42 transactions",
  },
  {
    label: "Today's Expenses",
    value: "$1,250",
    shortValue: "$1.25K",
    change: "-3.1%",
    trend: "down" as const,
    icon: Receipt,
    detail: "7 entries",
  },
  {
    label: "Gross Profit",
    value: "32.4%",
    shortValue: "32.4%",
    change: "+1.8%",
    trend: "up" as const,
    icon: TrendingUp,
    detail: "$2,203 today",
  },
];

const SALES_TREND = [
  { day: "Mon", sales: 520000, expenses: 98000 },
  { day: "Tue", sales: 610000, expenses: 145000 },
  { day: "Wed", sales: 480000, expenses: 72000 },
  { day: "Thu", sales: 750000, expenses: 110000 },
  { day: "Fri", sales: 690000, expenses: 130000 },
  { day: "Sat", sales: 830000, expenses: 95000 },
  { day: "Today", sales: 680000, expenses: 125000 },
];

const LOW_STOCK = [
  { name: "Premium Blend Coffee (1kg)", stock: 3, reorder: 10, value: "$45" },
  { name: "Organic Honey (500ml)", stock: 5, reorder: 20, value: "$18" },
  { name: "Matcha Powder (200g)", stock: 2, reorder: 8, value: "$32" },
];

const CREDITS = [
  { name: "Bloom Café", owed: "$600", due: "3 days", status: "warning" },
  { name: "Marcus Chen", owed: "$1,200", due: "Overdue", status: "danger" },
  { name: "Lena Torres", owed: "$350", due: "1 week", status: "ok" },
];

const ACTIVITY = [
  { id: 1, type: "sale", desc: "Walk-in sale — 5 units to Marcus", amount: "+$750", time: "2 min ago", icon: ShoppingCart },
  { id: 2, type: "expense", desc: "Logistics — courier delivery", amount: "-$150", time: "18 min ago", icon: Receipt },
  { id: 3, type: "credit", desc: "Net-30 sale — Bloom Café (50% paid)", amount: "+$1,200", time: "45 min ago", icon: CreditCard },
  { id: 4, type: "sale", desc: "Online order — matcha + honey bundle", amount: "+$380", time: "1 hr ago", icon: ShoppingCart },
  { id: 5, type: "expense", desc: "Restock — supplier shipment received", amount: "-$2,800", time: "2 hr ago", icon: Receipt },
];

/* ───── Universal input methods ───── */
const INPUT_METHODS = [
  {
    label: "Voice",
    icon: Mic,
    hint: "Speak naturally",
    bgClass: "bg-accent/15",
    iconClass: "text-accent",
    activeClass: "bg-accent text-accent-foreground",
  },
  {
    label: "Text",
    icon: MessageSquare,
    hint: "Type anything",
    bgClass: "bg-secondary",
    iconClass: "text-foreground",
    activeClass: "bg-foreground text-background",
  },
  {
    label: "Photo",
    icon: Camera,
    hint: "Snap a receipt",
    bgClass: "bg-amber-500/10",
    iconClass: "text-amber-500",
    activeClass: "bg-amber-500 text-white",
  },
];

/* ───── Animation variants ───── */
const staggerContainer = {
  animate: { transition: { staggerChildren: 0.06 } },
};

const cardEntrance = {
  initial: { opacity: 0, y: 20, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] },
};

const sectionEntrance = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

/* ───── Custom chart tooltip ───── */
function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-lg">
      <p className="text-xs font-medium text-foreground mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.dataKey} className="text-[11px] text-muted-foreground">
          {p.dataKey === "sales" ? "Sales" : "Expenses"}: <span className="font-medium text-foreground">${(p.value / 1000).toFixed(0)}k</span>
        </p>
      ))}
    </div>
  );
}

export default function Dashboard() {
  const [expandedActivity, setExpandedActivity] = useState<number | null>(null);
  const [activeInput, setActiveInput] = useState<string | null>(null);

  const handleCloseInput = useCallback(() => setActiveInput(null), []);

  return (
    <div className="p-5 md:p-8 lg:p-10 max-w-7xl mx-auto space-y-8 pb-28 md:pb-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
      >
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            Good afternoon 👋
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Here's your business at a glance — <span className="text-foreground font-medium">Feb 14, 2026</span>
          </p>
        </div>

        {/* Desktop input methods — inline */}
        <div className="hidden sm:flex items-center gap-2">
          {INPUT_METHODS.map((m) => (
            <motion.button
              key={m.label}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setActiveInput(activeInput === m.label ? null : m.label)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-medium transition-all ${
                activeInput === m.label ? m.activeClass : `${m.bgClass} ${m.iconClass}`
              }`}
            >
              <m.icon className="h-4 w-4" />
              {m.label}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Desktop: expanded input area */}
      <AnimatePresence>
        {activeInput === "Text" && (
          <div className="hidden sm:block">
            <SmartTextInput isVisible variant="desktop" onClose={handleCloseInput} />
          </div>
        )}
        {activeInput && activeInput !== "Text" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="hidden sm:block overflow-hidden"
          >
            <Card className="bg-card border-border border-dashed">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
                  {activeInput === "Voice" && <Mic className="h-5 w-5 text-accent" />}
                  {activeInput === "Photo" && <Camera className="h-5 w-5 text-amber-500" />}
                </div>
                <div className="flex-1">
                <p className="text-sm text-foreground font-medium">
                    {activeInput === "Voice" && "Tap and speak — \"Sold 5 units to Marcus for $750\""}
                    {activeInput === "Photo" && "Take a photo of a receipt or invoice"}
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    AI will automatically detect if it's a sale, expense, or stock update
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* KPI Grid */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5"
      >
        {KPI.map((kpi) => {
          const Icon = kpi.icon;
          const isUp = kpi.trend === "up";
          return (
            <motion.div key={kpi.label} variants={cardEntrance}>
              <Card className="bg-card border-border hover:border-primary/20 transition-all hover:shadow-lg hover:shadow-primary/5 cursor-pointer group active:scale-[0.98]">
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center justify-between mb-2 md:mb-4">
                    <div className="h-8 w-8 md:h-10 md:w-10 rounded-xl bg-primary/8 flex items-center justify-center group-hover:bg-primary/12 transition-colors">
                      <Icon className="h-4 w-4 md:h-[18px] md:w-[18px] text-primary" />
                    </div>
                    <span className={`flex items-center gap-0.5 text-[10px] md:text-xs font-medium ${isUp ? "text-emerald-500" : "text-rose-500"}`}>
                      {isUp ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                      {kpi.change}
                    </span>
                  </div>
                  <p className="font-display text-base md:text-2xl font-bold text-foreground tracking-tight truncate">
                    <span className="md:hidden">{kpi.shortValue}</span>
                    <span className="hidden md:inline">{kpi.value}</span>
                  </p>
                  <p className="text-[11px] md:text-xs text-muted-foreground mt-1 font-medium">{kpi.label}</p>
                  <p className="text-[10px] text-muted-foreground/50 mt-0.5 hidden sm:block">{kpi.detail}</p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Sales Trend Chart */}
      <motion.div {...sectionEntrance} transition={{ duration: 0.4, delay: 0.2 }}>
        <Card className="bg-card border-border">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="font-display text-base font-semibold flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              Weekly Sales Trend
            </CardTitle>
            <span className="text-[10px] text-muted-foreground">Last 7 days</span>
          </CardHeader>
          <CardContent className="pt-2 pb-4">
            <div className="h-52 md:h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={SALES_TREND} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(243 75% 59%)" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="hsl(243 75% 59%)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(0 84% 60%)" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="hsl(0 84% 60%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "hsl(220 5% 55%)", fontSize: 11 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "hsl(220 5% 55%)", fontSize: 10 }} tickFormatter={(v) => `${v / 1000}k`} />
                  <Tooltip content={<ChartTooltip />} />
                  <Area type="monotone" dataKey="sales" stroke="hsl(243 75% 59%)" strokeWidth={2} fill="url(#salesGrad)" />
                  <Area type="monotone" dataKey="expenses" stroke="hsl(0 84% 60%)" strokeWidth={1.5} strokeDasharray="5 5" fill="url(#expenseGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center gap-4 mt-2 justify-center">
              <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-primary" /> Sales
              </span>
              <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-destructive" /> Expenses
              </span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Three-column: Low Stock + Credits + Activity */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-40px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
      >
        {/* Inventory Alerts */}
        <motion.div variants={cardEntrance}>
          <Card className="bg-card border-border h-full">
            <CardHeader className="pb-3">
              <CardTitle className="font-display text-sm font-semibold flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                Low Stock Alerts
                <span className="ml-auto text-[10px] font-normal text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full">
                  {LOW_STOCK.length} items
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {LOW_STOCK.map((item) => {
                const pct = Math.round((item.stock / item.reorder) * 100);
                return (
                  <div key={item.name} className="space-y-1.5 group cursor-pointer">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground font-medium group-hover:text-primary transition-colors">{item.name}</span>
                      <span className="text-[11px] text-muted-foreground">{item.value}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1.5 rounded-full bg-secondary overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full ${pct < 30 ? "bg-rose-500" : pct < 60 ? "bg-amber-500" : "bg-accent"}`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.3 }}
                        />
                      </div>
                      <span className="text-[10px] text-muted-foreground w-12 text-right">
                        {item.stock}/{item.reorder}
                      </span>
                    </div>
                  </div>
                );
              })}
              <button className="text-xs text-primary hover:text-primary/80 transition-colors mt-2 flex items-center gap-1 min-h-[44px] py-2">
                View all inventory <ChevronRight className="h-3 w-3" />
              </button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Credit / Debtors */}
        <motion.div variants={cardEntrance}>
          <Card className="bg-card border-border h-full">
            <CardHeader className="pb-3">
              <CardTitle className="font-display text-sm font-semibold flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-500" />
                Outstanding Credits
                <span className="ml-auto text-[10px] font-normal text-foreground bg-secondary px-2 py-0.5 rounded-full">
                  $2,150
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {CREDITS.map((c) => (
                <motion.div
                  key={c.name}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2.5 md:gap-3 rounded-lg px-2.5 md:px-3 py-3 hover:bg-secondary/50 active:bg-secondary/70 transition-colors cursor-pointer group min-h-[52px]"
                >
                  <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-blue-500">{c.name.charAt(0)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="text-sm text-foreground font-medium truncate group-hover:text-primary transition-colors">{c.name}</p>
                      <span className="text-xs font-semibold text-foreground whitespace-nowrap flex-shrink-0">
                        {c.owed}
                      </span>
                    </div>
                    <p className={`text-[10px] mt-0.5 ${c.status === "danger" ? "text-rose-500" : c.status === "warning" ? "text-amber-500" : "text-muted-foreground"}`}>
                      Due: {c.due}
                    </p>
                  </div>
                </motion.div>
              ))}
              <button className="text-xs text-primary hover:text-primary/80 transition-colors mt-1 flex items-center gap-1 min-h-[44px] py-2">
                View all debtors <ChevronRight className="h-3 w-3" />
              </button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div className="md:col-span-2 lg:col-span-1" variants={cardEntrance}>
          <Card className="bg-card border-border h-full">
            <CardHeader className="pb-3">
              <CardTitle className="font-display text-sm font-semibold flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-0.5">
                {ACTIVITY.map((a) => {
                  const Icon = a.icon;
                  const isIncome = a.amount.startsWith("+");
                  const isExpanded = expandedActivity === a.id;
                  return (
                    <motion.div
                      key={a.id}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setExpandedActivity(isExpanded ? null : a.id)}
                      className="flex items-center gap-2.5 md:gap-3 rounded-lg px-2.5 md:px-3 py-3 hover:bg-secondary/50 active:bg-secondary/70 transition-all cursor-pointer min-h-[52px]"
                    >
                      <div className={`h-7 w-7 rounded-full flex items-center justify-center flex-shrink-0 ${isIncome ? "bg-emerald-500/10" : "bg-rose-500/10"}`}>
                        <Icon className={`h-3.5 w-3.5 ${isIncome ? "text-emerald-500" : "text-rose-500"}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground truncate">{a.desc}</p>
                        <p className="text-[10px] text-muted-foreground">{a.time}</p>
                      </div>
                      <span className={`text-xs md:text-sm font-medium whitespace-nowrap ${isIncome ? "text-emerald-500" : "text-rose-500"}`}>
                        {a.amount}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
              <button className="text-xs text-primary hover:text-primary/80 transition-colors mt-3 flex items-center gap-1 min-h-[44px] py-2">
                View full ledger <ChevronRight className="h-3 w-3" />
              </button>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* AI Audit Log */}
      <motion.div
        {...sectionEntrance}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <AuditLogCard />
      </motion.div>

      {/* ═══ Mobile floating input bar ═══ */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40">
        {/* Expanded input — Text gets SmartTextInput, others get hint */}
        <AnimatePresence>
          {activeInput === "Text" && (
            <SmartTextInput isVisible variant="mobile" onClose={handleCloseInput} />
          )}
          {activeInput && activeInput !== "Text" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
              className="mx-4 mb-2 rounded-xl bg-card border border-border shadow-lg px-4 py-3"
            >
              <p className="text-sm text-foreground font-medium">
                {activeInput === "Voice" && "🎙️ Speak naturally — \"Sold 5 units for $750\""}
                {activeInput === "Photo" && "📸 Snap a receipt or invoice"}
              </p>
              <p className="text-[11px] text-muted-foreground mt-1">
                AI detects if it's a sale, expense, or stock update
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input method buttons */}
        <div className="bg-card/95 backdrop-blur-md border-t border-border px-6 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <div className="flex items-center justify-around max-w-xs mx-auto">
            {INPUT_METHODS.map((m) => {
              const isActive = activeInput === m.label;
              return (
                <motion.button
                  key={m.label}
                  whileTap={{ scale: 0.88 }}
                  onClick={() => setActiveInput(isActive ? null : m.label)}
                  className="flex flex-col items-center gap-1.5 min-w-[64px] min-h-[56px] justify-center"
                >
                  <motion.div
                    animate={isActive ? { scale: 1.15 } : { scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className={`h-11 w-11 rounded-full flex items-center justify-center transition-colors ${
                      isActive ? m.activeClass : m.bgClass
                    }`}
                  >
                    <m.icon className={`h-5 w-5 ${isActive ? "" : m.iconClass}`} />
                  </motion.div>
                  <span className={`text-[10px] font-medium transition-colors ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                    {m.label}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
