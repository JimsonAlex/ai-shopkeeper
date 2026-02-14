import { useState } from "react";
import { motion } from "framer-motion";
import {
  Wallet, ShoppingCart, Receipt, TrendingUp,
  ArrowUpRight, ArrowDownRight, AlertTriangle, Clock,
  CreditCard, Plus, Mic, Camera, ChevronRight, Users,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";

/* ───── Mock data ───── */
const KPI = [
  {
    label: "Cash Position",
    value: "TZS 2,450,000",
    change: "+12.5%",
    trend: "up" as const,
    icon: Wallet,
    detail: "Drawer + M-Pesa + Bank",
  },
  {
    label: "Today's Sales",
    value: "TZS 680,000",
    change: "+8.2%",
    trend: "up" as const,
    icon: ShoppingCart,
    detail: "42 transactions",
  },
  {
    label: "Today's Expenses",
    value: "TZS 125,000",
    change: "-3.1%",
    trend: "down" as const,
    icon: Receipt,
    detail: "7 entries",
  },
  {
    label: "Gross Profit",
    value: "32.4%",
    change: "+1.8%",
    trend: "up" as const,
    icon: TrendingUp,
    detail: "TZS 220,320 today",
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
  { name: "Cement (50kg)", stock: 3, reorder: 10, value: "TZS 45,000" },
  { name: "Roofing Nails (kg)", stock: 5, reorder: 20, value: "TZS 15,000" },
  { name: "White Paint (4L)", stock: 2, reorder: 8, value: "TZS 60,000" },
];

const CREDITS = [
  { name: "Aisha Bakery", owed: "TZS 60,000", due: "3 days", status: "warning" },
  { name: "John Msafiri", owed: "TZS 120,000", due: "Overdue", status: "danger" },
  { name: "Mama Halima", owed: "TZS 35,000", due: "1 week", status: "ok" },
];

const ACTIVITY = [
  { id: 1, type: "sale", desc: "Cash sale — 5 bags cement to John", amount: "+TZS 75,000", time: "2 min ago", icon: ShoppingCart },
  { id: 2, type: "expense", desc: "Transport — delivery fuel", amount: "-TZS 15,000", time: "18 min ago", icon: Receipt },
  { id: 3, type: "credit", desc: "Credit sale — Aisha Bakery (50% paid)", amount: "+TZS 120,000", time: "45 min ago", icon: CreditCard },
  { id: 4, type: "sale", desc: "Cash sale — 20kg nails + 2 padlocks", amount: "+TZS 38,000", time: "1 hr ago", icon: ShoppingCart },
  { id: 5, type: "expense", desc: "Restock — 20 bags cement from supplier", amount: "-TZS 280,000", time: "2 hr ago", icon: Receipt },
];

const QUICK_ACTIONS = [
  { label: "Record Sale", icon: Plus, color: "bg-accent/15 text-accent hover:bg-accent/25" },
  { label: "Add Expense", icon: Receipt, color: "bg-destructive/10 text-destructive hover:bg-destructive/20" },
  { label: "Voice Entry", icon: Mic, color: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20" },
  { label: "Scan Receipt", icon: Camera, color: "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20" },
];

const fadeUp = {
  initial: { opacity: 0, y: 16 },
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
          {p.dataKey === "sales" ? "Sales" : "Expenses"}: <span className="font-medium text-foreground">TZS {(p.value / 1000).toFixed(0)}k</span>
        </p>
      ))}
    </div>
  );
}

export default function Dashboard() {
  const [expandedActivity, setExpandedActivity] = useState<number | null>(null);

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header + Quick Actions */}
      <motion.div {...fadeUp} transition={{ duration: 0.3 }} className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            Good afternoon, Musa 👋
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Here's how your shop is doing today — <span className="text-foreground font-medium">Feb 14, 2026</span>
          </p>
        </div>

        {/* Quick Actions — desktop */}
        <div className="hidden sm:flex items-center gap-2">
          {QUICK_ACTIONS.map((a) => (
            <Button
              key={a.label}
              variant="ghost"
              size="sm"
              className={`gap-1.5 rounded-lg text-xs font-medium transition-all ${a.color}`}
            >
              <a.icon className="h-3.5 w-3.5" />
              {a.label}
            </Button>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions — mobile horizontal scroll */}
      <div className="sm:hidden -mx-4 px-4">
        <motion.div {...fadeUp} transition={{ duration: 0.3, delay: 0.05 }} className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {QUICK_ACTIONS.map((a) => (
            <button
              key={a.label}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-medium whitespace-nowrap transition-all ${a.color}`}
            >
              <a.icon className="h-4 w-4" />
              {a.label}
            </button>
          ))}
        </motion.div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {KPI.map((kpi, i) => {
          const Icon = kpi.icon;
          const isUp = kpi.trend === "up";
          return (
            <motion.div key={kpi.label} {...fadeUp} transition={{ duration: 0.3, delay: i * 0.05 }}>
              <Card className="bg-card border-border hover:border-accent/20 transition-all hover:shadow-md hover:shadow-accent/5 cursor-pointer group">
                <CardContent className="p-4 md:p-5">
                  <div className="flex items-center justify-between mb-2 md:mb-3">
                    <div className="h-8 w-8 md:h-9 md:w-9 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/15 transition-colors">
                      <Icon className="h-4 w-4 text-accent" />
                    </div>
                    <span className={`flex items-center gap-0.5 text-[10px] md:text-xs font-medium ${isUp ? "text-emerald-500" : "text-rose-500"}`}>
                      {isUp ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                      {kpi.change}
                    </span>
                  </div>
                  <p className="font-display text-lg md:text-xl font-bold text-foreground">{kpi.value}</p>
                  <p className="text-[10px] md:text-[11px] text-muted-foreground mt-0.5">{kpi.label}</p>
                  <p className="text-[9px] md:text-[10px] text-muted-foreground/60 mt-1 hidden sm:block">{kpi.detail}</p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Sales Trend Chart */}
      <motion.div {...fadeUp} transition={{ duration: 0.3, delay: 0.15 }}>
        <Card className="bg-card border-border">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="font-display text-base font-semibold flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-accent" />
              Weekly Sales Trend
            </CardTitle>
            <span className="text-[10px] text-muted-foreground">Last 7 days</span>
          </CardHeader>
          <CardContent className="pt-2 pb-4">
            <div className="h-48 md:h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={SALES_TREND} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(166 81% 38%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(166 81% 38%)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(0 84% 60%)" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="hsl(0 84% 60%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "hsl(220 5% 55%)", fontSize: 11 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "hsl(220 5% 55%)", fontSize: 10 }}
                    tickFormatter={(v) => `${v / 1000}k`}
                  />
                  <Tooltip content={<ChartTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="sales"
                    stroke="hsl(166 81% 38%)"
                    strokeWidth={2}
                    fill="url(#salesGrad)"
                  />
                  <Area
                    type="monotone"
                    dataKey="expenses"
                    stroke="hsl(0 84% 60%)"
                    strokeWidth={1.5}
                    strokeDasharray="4 4"
                    fill="url(#expenseGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center gap-4 mt-2 justify-center">
              <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-accent" /> Sales
              </span>
              <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-destructive" /> Expenses
              </span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Three-column: Low Stock + Credits + Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Inventory Alerts */}
        <motion.div {...fadeUp} transition={{ duration: 0.3, delay: 0.2 }}>
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
                      <span className="text-sm text-foreground font-medium group-hover:text-accent transition-colors">{item.name}</span>
                      <span className="text-[11px] text-muted-foreground">{item.value}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1.5 rounded-full bg-secondary overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full ${pct < 30 ? "bg-rose-500" : pct < 60 ? "bg-amber-500" : "bg-accent"}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
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
              <button className="text-xs text-accent hover:text-accent/80 transition-colors mt-2 flex items-center gap-1">
                View all inventory <ChevronRight className="h-3 w-3" />
              </button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Credit / Debtors */}
        <motion.div {...fadeUp} transition={{ duration: 0.3, delay: 0.25 }}>
          <Card className="bg-card border-border h-full">
            <CardHeader className="pb-3">
              <CardTitle className="font-display text-sm font-semibold flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-500" />
                Outstanding Credits
                <span className="ml-auto text-[10px] font-normal text-foreground bg-secondary px-2 py-0.5 rounded-full">
                  TZS 215,000
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {CREDITS.map((c) => (
                <div
                  key={c.name}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-secondary/50 transition-colors cursor-pointer group"
                >
                  <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-blue-500">{c.name.charAt(0)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground font-medium truncate group-hover:text-accent transition-colors">{c.name}</p>
                    <p className={`text-[10px] ${c.status === "danger" ? "text-rose-500" : c.status === "warning" ? "text-amber-500" : "text-muted-foreground"}`}>
                      Due: {c.due}
                    </p>
                  </div>
                  <span className="text-sm font-medium text-foreground whitespace-nowrap">
                    {c.owed}
                  </span>
                </div>
              ))}
              <button className="text-xs text-accent hover:text-accent/80 transition-colors mt-1 flex items-center gap-1">
                View all debtors <ChevronRight className="h-3 w-3" />
              </button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div className="md:col-span-2 lg:col-span-1" {...fadeUp} transition={{ duration: 0.3, delay: 0.3 }}>
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
                    <div
                      key={a.id}
                      onClick={() => setExpandedActivity(isExpanded ? null : a.id)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-secondary/50 transition-all cursor-pointer"
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
                    </div>
                  );
                })}
              </div>
              <button className="text-xs text-accent hover:text-accent/80 transition-colors mt-3 flex items-center gap-1">
                View full ledger <ChevronRight className="h-3 w-3" />
              </button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
