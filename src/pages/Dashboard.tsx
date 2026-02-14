import { motion } from "framer-motion";
import {
  DollarSign, TrendingUp, TrendingDown, Package,
  ArrowUpRight, ArrowDownRight, AlertTriangle, Clock,
  ShoppingCart, Receipt, CreditCard, Wallet,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

const LOW_STOCK = [
  { name: "Cement (50kg)", stock: 3, reorder: 10, value: "TZS 45,000" },
  { name: "Roofing Nails (kg)", stock: 5, reorder: 20, value: "TZS 15,000" },
  { name: "White Paint (4L)", stock: 2, reorder: 8, value: "TZS 60,000" },
];

const ACTIVITY = [
  { id: 1, type: "sale", desc: "Cash sale — 5 bags cement to John", amount: "+TZS 75,000", time: "2 min ago", icon: ShoppingCart },
  { id: 2, type: "expense", desc: "Transport — delivery fuel", amount: "-TZS 15,000", time: "18 min ago", icon: Receipt },
  { id: 3, type: "credit", desc: "Credit sale — Aisha Bakery (50% paid)", amount: "+TZS 120,000", time: "45 min ago", icon: CreditCard },
  { id: 4, type: "sale", desc: "Cash sale — 20kg nails + 2 padlocks", amount: "+TZS 38,000", time: "1 hr ago", icon: ShoppingCart },
  { id: 5, type: "expense", desc: "Restock — 20 bags cement from supplier", amount: "-TZS 280,000", time: "2 hr ago", icon: Receipt },
];

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

export default function Dashboard() {
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <motion.div {...fadeUp} transition={{ duration: 0.3 }}>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
          Good afternoon, Musa 👋
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Here's how your shop is doing today — <span className="text-foreground font-medium">Feb 14, 2026</span>
        </p>
      </motion.div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {KPI.map((kpi, i) => {
          const Icon = kpi.icon;
          const isUp = kpi.trend === "up";
          return (
            <motion.div key={kpi.label} {...fadeUp} transition={{ duration: 0.3, delay: i * 0.05 }}>
              <Card className="bg-card border-border hover:border-accent/20 transition-colors">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="h-9 w-9 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Icon className="h-4.5 w-4.5 text-accent" />
                    </div>
                    <span className={`flex items-center gap-0.5 text-xs font-medium ${isUp ? "text-emerald-500" : "text-rose-500"}`}>
                      {isUp ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                      {kpi.change}
                    </span>
                  </div>
                  <p className="font-display text-xl font-bold text-foreground">{kpi.value}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{kpi.label}</p>
                  <p className="text-[10px] text-muted-foreground/60 mt-1">{kpi.detail}</p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Two-column: Inventory Alerts + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Inventory Alerts */}
        <motion.div className="lg:col-span-2" {...fadeUp} transition={{ duration: 0.3, delay: 0.2 }}>
          <Card className="bg-card border-border h-full">
            <CardHeader className="pb-3">
              <CardTitle className="font-display text-base font-semibold flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                Low Stock Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {LOW_STOCK.map((item) => {
                const pct = Math.round((item.stock / item.reorder) * 100);
                return (
                  <div key={item.name} className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground font-medium">{item.name}</span>
                      <span className="text-[11px] text-muted-foreground">{item.value}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1.5 rounded-full bg-secondary overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${pct < 30 ? "bg-rose-500" : pct < 60 ? "bg-amber-500" : "bg-accent"}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-muted-foreground w-16 text-right">
                        {item.stock} / {item.reorder}
                      </span>
                    </div>
                  </div>
                );
              })}
              <button className="text-xs text-accent hover:underline mt-2">View all inventory →</button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div className="lg:col-span-3" {...fadeUp} transition={{ duration: 0.3, delay: 0.25 }}>
          <Card className="bg-card border-border h-full">
            <CardHeader className="pb-3">
              <CardTitle className="font-display text-base font-semibold flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {ACTIVITY.map((a) => {
                  const Icon = a.icon;
                  const isIncome = a.amount.startsWith("+");
                  return (
                    <div
                      key={a.id}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-secondary/50 transition-colors"
                    >
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${isIncome ? "bg-emerald-500/10" : "bg-rose-500/10"}`}>
                        <Icon className={`h-3.5 w-3.5 ${isIncome ? "text-emerald-500" : "text-rose-500"}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground truncate">{a.desc}</p>
                        <p className="text-[10px] text-muted-foreground">{a.time}</p>
                      </div>
                      <span className={`text-sm font-medium whitespace-nowrap ${isIncome ? "text-emerald-500" : "text-rose-500"}`}>
                        {a.amount}
                      </span>
                    </div>
                  );
                })}
              </div>
              <button className="text-xs text-accent hover:underline mt-3">View full ledger →</button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
