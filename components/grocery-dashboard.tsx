"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import {
  AlertCircle,
  AlertTriangle,
  ArrowDownRight,
  ArrowLeft,
  ArrowUpRight,
  Bell,
  Box,
  CheckCircle2,
  ChevronDown,
  Clock3,
  CloudSun,
  FileText,
  Grid2X2,
  Lightbulb,
  MapPin,
  Menu,
  Minus,
  MoreHorizontal,
  PlayCircle,
  QrCode,
  RefreshCw,
  Search,
  Settings,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Store,
  Tag,
  Thermometer,
  TrendingDown,
  TrendingUp,
  Trophy,
  Truck,
  Users,
  X,
  Zap,
} from "lucide-react";
import {
  activity,
  categories,
  customerProducts,
  expiringProducts,
  fastMoversPerStore,
  formatINR,
  hourlySales,
  navItems,
  products,
  riskTone,
  salesData,
  storeExpiringItems,
  stores,
  storeWastageTrend,
  teamPerStore,
  wastageDaily,
  wastedProducts,
} from "@/lib/mock-data";
import type { Store as StoreType } from "@/lib/mock-data";
import {
  headOfficeStoreRankings,
  storeOperationalDiagnosis,
  type ConnectedProblem,
} from "@/lib/head-office-ops";
import CustomerApp from "@/components/customer-app";

type View =
  | "overview"
  | "stores"
  | "sales"
  | "inventory"
  | "waste"
  | "incidents"
  | "rankings";
const iconMap: Record<string, React.ElementType> = {
  grid: Grid2X2,
  store: Store,
  chart: FileText,
  box: Box,
  clock: Clock3,
  alert: AlertTriangle,
  trophy: Trophy,
};

function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex size-9 items-center justify-center rounded-xl bg-[#0d4f3c] text-white">
        <ShoppingBag className="size-5" />
      </div>
      <div>
        <p className="text-[15px] font-bold tracking-tight text-[#123c31]">
          grocer<span className="text-[#a6c83f]">AI</span>
        </p>
        <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          smart retail ops
        </p>
      </div>
    </div>
  );
}
function StatusDot({ tone }: { tone: string }) {
  return (
    <span
      className={`inline-block size-2 rounded-full ${tone === "critical" || tone === "red" ? "bg-red-500" : tone === "warning" || tone === "amber" ? "bg-amber-400" : tone === "blue" ? "bg-sky-500" : "bg-emerald-500"}`}
    />
  );
}
function Spark({ positive = true }: { positive?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-0.5 text-[11px] font-semibold ${positive ? "text-emerald-600" : "text-red-500"}`}
    >
      {positive ? (
        <ArrowUpRight className="size-3" />
      ) : (
        <ArrowDownRight className="size-3" />
      )}{" "}
      {positive ? "8.4%" : "3.2%"}
    </span>
  );
}
function Kpi({
  label,
  value,
  note,
  icon: Icon,
  tone = "green",
  positive = true,
}: {
  label: string;
  value: string;
  note: string;
  icon: React.ElementType;
  tone?: string;
  positive?: boolean;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/40 bg-white/60 p-5 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="flex items-start justify-between">
        <div
          className={`flex size-10 items-center justify-center rounded-2xl shadow-sm ${tone === "red" ? "bg-gradient-to-br from-red-100 to-red-50 text-red-600" : tone === "amber" ? "bg-gradient-to-br from-amber-100 to-amber-50 text-amber-600" : "bg-gradient-to-br from-[#e8f2df] to-[#f4f9f1] text-[#1e7755]"}`}
        >
          <Icon className="size-[18px]" />
        </div>
        <MoreHorizontal className="size-4 text-muted-foreground/50" />
      </div>
      <p className="mt-4 text-[11px] font-medium text-muted-foreground">
        {label}
      </p>
      <div className="mt-1 flex items-baseline gap-2">
        <p className="text-[22px] font-bold tracking-tight text-[#173d32]">
          {value}
        </p>
        <Spark positive={positive} />
      </div>
      <p className="mt-1 text-[10px] text-muted-foreground">{note}</p>
    </div>
  );
}

function getNavItemView(label: string): View {
  if (label === "Store rankings") return "rankings";
  if (label === "Overview") return "overview";
  if (label === "Stores") return "stores";
  if (label === "Sales analytics") return "sales";
  if (label === "Inventory") return "inventory";
  if (label === "Waste & expiry") return "waste";
  if (label === "Incidents") return "incidents";
  return "overview";
}

function Sidebar({
  view,
  setView,
  mobileOpen,
  onClose,
}: {
  view: View;
  setView: (v: View) => void;
  mobileOpen: boolean;
  onClose: () => void;
}) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-30 flex w-[240px] flex-col border-r border-white/20 bg-white/40 backdrop-blur-xl px-5 py-6 shadow-[4px_0_24px_rgb(0,0,0,0.02)] transition-transform lg:static lg:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="mb-8 flex items-center justify-between px-2">
        <Logo />
        <button onClick={onClose} className="lg:hidden">
          <X className="size-5" />
        </button>
      </div>
      <p className="px-3 text-[10px] font-bold uppercase tracking-[0.13em] text-muted-foreground">
        Command center
      </p>
      <nav className="mt-3 flex flex-col gap-1">
        {navItems.map((item) => {
          const Icon = iconMap[item.icon] || Store;
          const targetView = getNavItemView(item.label);
          const active = view === targetView;
          return (
            <button
              key={item.label}
              onClick={() => {
                setView(targetView);
                onClose();
              }}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[12px] font-medium transition-colors ${active ? "bg-[#dcefd5] text-[#155b43]" : "text-muted-foreground hover:bg-[#edf5e9] hover:text-foreground"}`}
            >
              <Icon className="size-[17px]" />
              {item.label}
              {item.label === "Waste & expiry" && (
                <span className="ml-auto rounded-md bg-red-100 px-1.5 py-0.5 text-[9px] font-bold text-red-600">
                  12
                </span>
              )}
            </button>
          );
        })}
      </nav>
      <div className="mt-auto rounded-2xl bg-[#e5f2df] p-3.5">
        <div className="mb-2 flex size-7 items-center justify-center rounded-lg bg-white text-[#287450]">
          <CloudSun className="size-4" />
        </div>
        <p className="text-[11px] font-semibold text-[#174c3a]">
          AI forecast updated
        </p>
        <p className="mt-1 text-[10px] leading-4 text-[#54806d]">
          Today&apos;s forecast is 94% confident across all stores.
        </p>
        <button className="mt-2 text-[10px] font-bold text-[#277052]">
          View insights →
        </button>
      </div>
      <div className="mt-4 flex items-center gap-3 border-t border-[#e1e9df] pt-4">
        <div className="flex size-8 items-center justify-center rounded-full bg-[#d5e4d3] text-[11px] font-bold text-[#28644d]">
          AR
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[11px] font-bold text-[#21483c]">
            Ananya Rao
          </p>
          <p className="text-[10px] text-muted-foreground">Chain admin</p>
        </div>
        <Settings className="size-4 text-muted-foreground" />
      </div>
    </aside>
  );
}

function Topbar({
  onMenu,
  onCustomer,
  onVerifyQR,
}: {
  onMenu: () => void;
  onCustomer: () => void;
  onVerifyQR: () => void;
}) {
  return (
    <header className="sticky top-0 z-20 flex h-[76px] items-center justify-between border-b border-white/20 bg-white/60 px-5 backdrop-blur-xl lg:px-8">
      <div className="flex items-center gap-3">
        <button onClick={onMenu} className="lg:hidden">
          <Menu className="size-5" />
        </button>
        <div className="hidden items-center gap-2 text-[11px] text-muted-foreground sm:flex">
          <span>Workspace</span>
          <span>/</span>
          <span className="font-semibold text-foreground">Overview</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onVerifyQR}
          className="hidden items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#e3f1dc] to-[#cbe3c0] px-4 py-2 text-[11px] font-bold text-[#1a5b42] shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md hover:brightness-105 active:scale-95 md:flex"
        >
          <QrCode className="size-3.5" /> Verify Exit
        </button>
        <div className="hidden items-center gap-2 rounded-xl border bg-[#fafcfa] px-3 py-2 sm:flex">
          <Search className="size-4 text-muted-foreground" />
          <span className="text-[11px] text-muted-foreground">
            Search anything...
          </span>
          <kbd className="ml-6 rounded border bg-white px-1.5 py-0.5 text-[9px] text-muted-foreground">
            ⌘ K
          </kbd>
        </div>
        <button className="relative rounded-xl p-2.5 hover:bg-muted">
          <Bell className="size-[17px] text-muted-foreground" />
          <span className="absolute right-2 top-2 size-1.5 rounded-full bg-red-500" />
        </button>
        <button
          onClick={onCustomer}
          className="hidden rounded-xl bg-gradient-to-r from-[#164e3b] to-[#0f3528] px-4 py-2 text-[11px] font-bold text-white shadow-[0_4px_14px_rgba(22,78,59,0.39)] transition-all duration-300 hover:scale-105 hover:shadow-[0_6px_20px_rgba(22,78,59,0.5)] active:scale-95 md:block"
        >
          Preview customer app
        </button>
      </div>
    </header>
  );
}

function TrendChart() {
  const max = 6.5;
  return (
    <div className="relative h-[190px] pt-3">
      <div className="absolute inset-0 flex flex-col justify-between pb-7 pt-2">
        {["₹6L", "₹4L", "₹2L", "₹0"].map((x) => (
          <div key={x} className="flex items-center gap-2">
            <span className="w-7 text-[9px] text-muted-foreground">{x}</span>
            <div className="h-px flex-1 bg-[#edf1ed]" />
          </div>
        ))}
      </div>
      <div className="absolute bottom-7 left-9 right-1 flex h-[145px] items-end gap-2 sm:gap-4">
        {salesData.map((item, i) => (
          <div
            key={item.day}
            className="relative flex h-full flex-1 items-end gap-0.5"
          >
            <div
              className="w-1/2 rounded-t-sm bg-[#cfe7c2]"
              style={{ height: `${(item.forecast / max) * 100}%` }}
            />
            <div
              className="w-1/2 rounded-t-sm bg-[#2e8b65]"
              style={{ height: `${(item.actual / max) * 100}%` }}
            />
            <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] text-muted-foreground">
              {item.day}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
const StoreMap = dynamic(() => import("@/components/store-map"), {
  ssr: false,
  loading: () => (
    <div className="h-[230px] animate-pulse rounded-xl bg-[#edf4e9]" />
  ),
});

function WastageChangeBadge({ change }: { change: number }) {
  const up = change > 1;
  const down = change < -1;
  const cls = up
    ? "bg-red-50 text-red-600"
    : down
      ? "bg-emerald-50 text-emerald-600"
      : "bg-slate-100 text-slate-500";
  const Icon = up ? TrendingUp : down ? TrendingDown : Minus;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-bold ${cls}`}
    >
      <Icon className="size-3.5" />
      {change >= 0 ? "+" : ""}
      {change.toFixed(1)}%
    </span>
  );
}
function Overview({ setView }: { setView: (v: View) => void }) {
  const [selectedStore, setSelectedStore] = useState(2);
  const [alertDismissed, setAlertDismissed] = useState<number[]>([]);
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold text-[#2e8b65]">
            Tuesday, 14 May 2024
          </p>
          <h1 className="mt-1 text-[25px] font-bold tracking-tight text-[#143d31]">
            Good morning, Ananya
          </h1>
          <p className="mt-1 text-[12px] text-muted-foreground">
            Here&apos;s what&apos;s happening across your grocery network.
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-xl border bg-white px-3.5 py-2.5 text-[11px] font-semibold text-foreground shadow-sm">
          <Clock3 className="size-3.5 text-muted-foreground" /> Last 7 days{" "}
          <ChevronDown className="size-3.5" />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        <Kpi
          label="Total sales today"
          value="₹19.4L"
          note="Across 10 stores"
          icon={ShoppingBag}
        />
        <Kpi
          label="Sales vs forecast"
          value="+6.8%"
          note="₹1.2L above target"
          icon={ArrowUpRight}
        />
        <Kpi
          label="Inventory value"
          value="₹2.84Cr"
          note="+2.1% from yesterday"
          icon={Box}
        />
        <Kpi
          label="Potential waste"
          value="₹42,680"
          note="12 products at risk"
          icon={AlertTriangle}
          tone="amber"
          positive={false}
        />
      </div>
      <div className="grid gap-5 xl:grid-cols-[1.05fr_1fr]">
        <section className="rounded-2xl border bg-white p-4 shadow-[0_2px_12px_rgba(15,59,45,0.03)]">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-[14px] font-bold text-[#163f32]">
                Store health map
              </h2>
              <p className="mt-0.5 text-[10px] text-muted-foreground">
                Live operational status by location
              </p>
            </div>
            <button className="rounded-lg border px-2.5 py-1.5 text-[10px] font-semibold text-muted-foreground">
              Filters <ChevronDown className="ml-1 inline size-3" />
            </button>
          </div>
          <StoreMap selected={selectedStore} onSelect={setSelectedStore} />
          <div className="mt-3 flex items-center gap-4 text-[10px] text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <StatusDot tone="healthy" /> Healthy{" "}
              <b className="text-foreground">6</b>
            </span>
            <span className="flex items-center gap-1.5">
              <StatusDot tone="warning" /> Watch{" "}
              <b className="text-foreground">3</b>
            </span>
            <span className="flex items-center gap-1.5">
              <StatusDot tone="critical" /> Critical{" "}
              <b className="text-foreground">1</b>
            </span>
            <button
              onClick={() => setView("stores")}
              className="ml-auto font-semibold text-[#287450]"
            >
              View all stores →
            </button>
          </div>
        </section>
        <section className="rounded-2xl border bg-white p-4 shadow-[0_2px_12px_rgba(15,59,45,0.03)]">
          <div className="mb-1 flex items-start justify-between">
            <div>
              <h2 className="text-[14px] font-bold text-[#163f32]">
                Sales performance
              </h2>
              <p className="mt-0.5 text-[10px] text-muted-foreground">
                Actual vs forecast · All stores
              </p>
            </div>
            <div className="flex gap-3 text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <i className="size-2 rounded-full bg-[#2e8b65]" />
                Actual
              </span>
              <span className="flex items-center gap-1">
                <i className="size-2 rounded-full bg-[#cfe7c2]" />
                Forecast
              </span>
            </div>
          </div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-xl font-bold text-[#163f32]">₹28.6L</span>
            <Spark />
          </div>
          <TrendChart />
        </section>
      </div>
      <WastageCard />
      <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-2xl border bg-white p-4 shadow-[0_2px_12px_rgba(15,59,45,0.03)]">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-[14px] font-bold text-[#163f32]">
                Store risk overview
              </h2>
              <p className="mt-0.5 text-[10px] text-muted-foreground">
                Explainable AI risk scoring
              </p>
            </div>
            <button
              onClick={() => setView("rankings")}
              className="text-[10px] font-bold text-[#287450]"
            >
              See rankings →
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[540px] text-left">
              <thead>
                <tr className="border-b text-[9px] uppercase tracking-wider text-muted-foreground">
                  <th className="pb-2 font-semibold">Store</th>
                  <th className="pb-2 font-semibold">Risk score</th>
                  <th className="pb-2 font-semibold">Sales gap</th>
                  <th className="pb-2 font-semibold">Status</th>
                  <th className="pb-2 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {stores
                  .slice()
                  .sort((a, b) => b.risk - a.risk)
                  .slice(0, 4)
                  .map((store) => (
                    <tr key={store.name} className="border-b last:border-0">
                      <td className="py-3 text-[11px] font-semibold text-[#21483c]">
                        {store.name}
                        <span className="ml-2 text-[9px] font-normal text-muted-foreground">
                          {store.city}
                        </span>
                      </td>
                      <td className="py-3">
                        <span className="text-[11px] font-bold">
                          {store.risk}
                        </span>
                        <span className="ml-1 text-[9px] text-muted-foreground">
                          /100
                        </span>
                      </td>
                      <td
                        className={`py-3 text-[11px] font-semibold ${store.gap.startsWith("-") ? "text-red-500" : "text-emerald-600"}`}
                      >
                        {store.gap}
                      </td>
                      <td className="py-3">
                        <span className="flex items-center gap-1.5 text-[10px]">
                          <StatusDot tone={riskTone(store.status)} />
                          {store.status}
                        </span>
                      </td>
                      <td className="py-3">
                        <button className="rounded-md border px-2 py-1 text-[9px] font-semibold">
                          Review
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </section>
        <section className="rounded-2xl border bg-white p-4 shadow-[0_2px_12px_rgba(15,59,45,0.03)]">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-[14px] font-bold text-[#163f32]">
                Critical alerts
              </h2>
              <p className="mt-0.5 text-[10px] text-muted-foreground">
                Needs your attention today
              </p>
            </div>
            <span className="rounded-md bg-red-50 px-2 py-1 text-[10px] font-bold text-red-600">
              {4 - alertDismissed.length} active
            </span>
          </div>
          <div className="flex flex-col gap-3">
            {activity.map(
              (item, i) =>
                !alertDismissed.includes(i) && (
                  <div key={item[1]} className="flex items-start gap-2.5">
                    <div className="mt-0.5">
                      <StatusDot tone={item[3]} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-semibold text-[#21483c]">
                        {item[1]}
                      </p>
                      <p className="mt-0.5 truncate text-[10px] text-muted-foreground">
                        {item[2]}
                      </p>
                    </div>
                    <button
                      onClick={() => setAlertDismissed([...alertDismissed, i])}
                      className="text-[9px] font-semibold text-muted-foreground hover:text-foreground"
                    >
                      Dismiss
                    </button>
                  </div>
                ),
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

function WastageTrendChart({
  data,
  increasing,
}: {
  data: { label: string; value: number }[];
  increasing: boolean;
}) {
  const w = 560,
    h = 160,
    padX = 34,
    padY = 18;
  const values = data.map((d) => d.value);
  const min = Math.min(...values),
    max = Math.max(...values),
    span = max - min || 1;
  const x = (i: number) =>
    padX + (i * (w - padX * 2)) / Math.max(1, data.length - 1);
  const y = (v: number) => h - padY - ((v - min) / span) * (h - padY * 2);
  const pts = data
    .map((d, i) => `${x(i).toFixed(1)},${y(d.value).toFixed(1)}`)
    .join(" ");
  const stroke = increasing ? "#ef4444" : "#10b981";
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="w-full"
      role="img"
      aria-label="Daily wastage percentage over 14 days"
    >
      <defs>
        <linearGradient id="wasteArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.18" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 0.5, 1].map((f) => {
        const gy = padY + f * (h - padY * 2);
        const gv = max - f * span;
        return (
          <g key={f}>
            <line
              x1={padX}
              y1={gy}
              x2={w - padX}
              y2={gy}
              stroke="#edf1ed"
              strokeWidth="1"
            />
            <text
              x={padX - 6}
              y={gy + 3}
              textAnchor="end"
              fontSize="9"
              fill="#94a3b8"
            >
              {gv.toFixed(1)}%
            </text>
          </g>
        );
      })}
      <polygon
        points={`${padX},${h - padY} ${pts} ${w - padX},${h - padY}`}
        fill="url(#wasteArea)"
      />
      <polyline
        points={pts}
        fill="none"
        stroke={stroke}
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {data.map((d, i) => (
        <circle
          key={i}
          cx={x(i)}
          cy={y(d.value)}
          r={i === data.length - 1 ? 4 : 2.5}
          fill="#fff"
          stroke={stroke}
          strokeWidth="2"
        />
      ))}
      {data.map((d, i) =>
        i % 3 === 0 || i === data.length - 1 ? (
          <text
            key={d.label}
            x={x(i)}
            y={h - 3}
            textAnchor="middle"
            fontSize="9"
            fill="#94a3b8"
          >
            {d.label}
          </text>
        ) : null,
      )}
    </svg>
  );
}

function WastageCard() {
  const [open, setOpen] = useState(false);
  const current = wastageDaily.slice(-14);
  const previous = wastageDaily.slice(-28, -14);
  const sum = (arr: typeof wastageDaily, k: "wastedCost" | "salesRevenue") =>
    arr.reduce((t, d) => t + d[k], 0);
  const curCost = sum(current, "wastedCost"),
    curSales = sum(current, "salesRevenue");
  const prevCost = sum(previous, "wastedCost"),
    prevSales = sum(previous, "salesRevenue");
  const pct = curSales ? (curCost / curSales) * 100 : 0;
  const prevPct = prevSales ? (prevCost / prevSales) * 100 : 0;
  const change = prevPct ? ((pct - prevPct) / prevPct) * 100 : 0;
  const increasing = change > 1;
  const decreasing = change < -1;
  const series = current.map((d) => ({
    label: d.date,
    value: d.salesRevenue ? (d.wastedCost / d.salesRevenue) * 100 : 0,
  }));
  const tracked = wastedProducts.map((p) => ({
    ...p,
    cost: p.qty * p.unitCost,
  }));
  const trackedTotal = tracked.reduce((t, p) => t + p.cost, 0);
  const topProduct = tracked.slice().sort((a, b) => b.cost - a.cost)[0];
  const storeTotals = Object.entries(
    tracked.reduce<Record<string, number>>((m, p) => {
      m[p.store] = (m[p.store] || 0) + p.cost;
      return m;
    }, {}),
  ).sort((a, b) => b[1] - a[1]);
  const topStore = storeTotals[0];
  const firstHalf = series.slice(0, 7).reduce((t, d) => t + d.value, 0) / 7;
  const secondHalf = series.slice(7).reduce((t, d) => t + d.value, 0) / 7;
  const recommendations = [
    `Apply 30–50% clearance discounts on ${expiringProducts[0].product} at ${expiringProducts[0].store} before it expires (${expiringProducts[0].expiry}).`,
    `${increasing ? "Reduce" : "Maintain"} upcoming order quantity for ${topProduct.product} by ~20% at ${topProduct.store}.`,
    `Transfer surplus stock from ${topStore[0]} to a higher-demand store to recover margin before expiry.`,
    `Tighten replenishment thresholds for dairy and bakery, where spoilage is trending ${increasing ? "up" : "down"}.`,
  ];
  const insight = `Wastage is ${pct.toFixed(2)}% of sales over the last 14 days, ${increasing ? "up" : decreasing ? "down" : "flat"} ${Math.abs(change).toFixed(1)}% vs the previous 14 days. ${topStore[0]} accounts for the largest share of tracked waste (${formatINR(topStore[1])}), led by ${topProduct.product} (${topProduct.qty} units, ${formatINR(topProduct.cost)}). Week-two average (${secondHalf.toFixed(2)}%) is ${secondHalf > firstHalf ? "above" : "below"} week-one (${firstHalf.toFixed(2)}%), aligning with ${expiringProducts.length} products nearing expiry and softer sales at watch-list stores. Likely drivers: overstocking on perishables and discounts applied too late.`;
  return (
    <section className="rounded-2xl border border-border/80 bg-white p-4 shadow-[0_2px_12px_rgba(15,59,45,0.03)]">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-[14px] font-bold text-[#163f32]">
              Wastage % of Sales — 14 Days
            </h2>
            <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[9px] font-bold text-slate-500">
              SIMULATED
            </span>
          </div>
          <p className="mt-0.5 text-[10px] text-muted-foreground">
            Cost value of wasted goods ÷ total sales revenue · daily trend
          </p>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="rounded-xl bg-[#123f31] px-3.5 py-2 text-[11px] font-semibold text-white hover:bg-[#1d5a45]"
        >
          Investigate Wastage
        </button>
      </div>
      <div className="grid gap-5 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="flex flex-col gap-3">
          <div className="rounded-xl border border-border/70 bg-[#fafcfa] p-3.5">
            <p className="text-[11px] font-medium text-muted-foreground">
              Current wastage
            </p>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-[28px] font-bold tracking-tight text-[#173d32]">
                {pct.toFixed(2)}%
              </span>
              <WastageChangeBadge change={change} />
            </div>
            <p className="mt-1 text-[10px] text-muted-foreground">
              {increasing
                ? "Higher than previous 14 days"
                : decreasing
                  ? "Lower than previous 14 days"
                  : "In line with previous 14 days"}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-border/70 p-3">
              <p className="text-[10px] font-medium text-muted-foreground">
                Total wastage value
              </p>
              <p className="mt-1 text-[15px] font-bold text-[#173d32]">
                {formatINR(curCost)}
              </p>
            </div>
            <div className="rounded-xl border border-border/70 p-3">
              <p className="text-[10px] font-medium text-muted-foreground">
                Previous 14 days
              </p>
              <p className="mt-1 text-[15px] font-bold text-[#173d32]">
                {prevPct.toFixed(2)}%
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border/70 p-3">
          <div className="mb-1 flex items-center justify-between">
            <p className="text-[11px] font-semibold text-[#21483c]">
              Daily wastage % (14 days)
            </p>
            <span
              className={`text-[10px] font-bold ${increasing ? "text-red-500" : decreasing ? "text-emerald-600" : "text-slate-400"}`}
            >
              {increasing
                ? "Upward trend"
                : decreasing
                  ? "Downward trend"
                  : "No significant change"}
            </span>
          </div>
          <WastageTrendChart data={series} increasing={increasing} />
        </div>
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-[#d9ead0] bg-[#f2f9ee] p-3.5">
          <div className="mb-1.5 flex items-center gap-2">
            <Sparkles className="size-4 text-[#2e8b65]" />
            <p className="text-[11px] font-bold text-[#174c3a]">AI insight</p>
          </div>
          <p className="text-[10px] leading-5 text-[#4b7861]">{insight}</p>
        </div>
        <div className="rounded-xl border border-border/70 p-3.5">
          <div className="mb-2 flex items-center gap-2">
            <Lightbulb className="size-4 text-amber-500" />
            <p className="text-[11px] font-bold text-[#21483c]">
              Recommended actions
            </p>
          </div>
          <ul className="flex flex-col gap-1.5">
            {recommendations.map((r) => (
              <li
                key={r}
                className="flex gap-2 text-[10px] leading-4 text-muted-foreground"
              >
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#2e8b65]" />
                {r}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 sm:items-center sm:p-6"
          onClick={() => setOpen(false)}
        >
          <div
            className="max-h-[88vh] w-full max-w-3xl overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-border/80 p-4">
              <div>
                <h3 className="text-[15px] font-bold text-[#163f32]">
                  Wastage breakdown
                </h3>
                <p className="mt-0.5 text-[10px] text-muted-foreground">
                  Tracked waste events · {formatINR(trackedTotal)} of{" "}
                  {formatINR(curCost)} total · 14-day window
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg p-1.5 hover:bg-muted"
              >
                <X className="size-4" />
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto p-4">
              <div className="mb-3 flex flex-wrap gap-2">
                {storeTotals.map(([store, total]) => (
                  <span
                    key={store}
                    className="rounded-lg bg-[#eef5e9] px-2.5 py-1 text-[10px] font-semibold text-[#287450]"
                  >
                    {store} · {formatINR(total)}
                  </span>
                ))}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[620px] text-left">
                  <thead>
                    <tr className="border-b text-[9px] uppercase tracking-wider text-muted-foreground">
                      <th className="pb-2 font-semibold">Product</th>
                      <th className="pb-2 font-semibold">Store</th>
                      <th className="pb-2 font-semibold">Qty</th>
                      <th className="pb-2 font-semibold">Unit cost</th>
                      <th className="pb-2 font-semibold">Cost value</th>
                      <th className="pb-2 font-semibold">Reason</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tracked
                      .slice()
                      .sort((a, b) => b.cost - a.cost)
                      .map((p) => (
                        <tr
                          key={p.product + p.store}
                          className="border-b last:border-0"
                        >
                          <td className="py-2.5 text-[11px] font-semibold text-[#21483c]">
                            {p.product}
                          </td>
                          <td className="py-2.5 text-[11px] text-muted-foreground">
                            {p.store}
                          </td>
                          <td className="py-2.5 text-[11px]">{p.qty}</td>
                          <td className="py-2.5 text-[11px]">
                            {formatINR(p.unitCost)}
                          </td>
                          <td className="py-2.5 text-[11px] font-semibold text-red-500">
                            {formatINR(p.cost)}
                          </td>
                          <td className="py-2.5 text-[10px] text-muted-foreground">
                            {p.reason}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function StoreDetailView({
  store,
  onBack,
}: {
  store: StoreType;
  onBack: () => void;
}) {
  const [activeStoreName, setActiveStoreName] = useState(store.name);
  const currentStore = stores.find((s) => s.name === activeStoreName) || store;
  const fastMovers = fastMoversPerStore[currentStore.name] || [];
  const expiring = storeExpiringItems[currentStore.name] || [];
  const team = teamPerStore[currentStore.name] || [];
  const wastageTrend = storeWastageTrend[currentStore.name] || [];
  const totalExpiryCost = expiring.reduce((t, p) => t + p.cost, 0);
  const rostered = team.length;
  const onShiftCount = team.filter((m) => m.status === "On shift").length;
  const lateCount = team.filter((m) => m.status === "Late").length;
  const shortCount = rostered - onShiftCount - lateCount;
  const sopFails = lateCount > 0 ? lateCount : 0;
  const currentWastage =
    wastageTrend.length > 0 ? wastageTrend[wastageTrend.length - 1].value : 0;
  const prevAvg =
    wastageTrend.length > 7
      ? wastageTrend.slice(0, 7).reduce((t, p) => t + p.value, 0) / 7
      : currentWastage;
  const wastageChange =
    prevAvg > 0 ? ((currentWastage - prevAvg) / prevAvg) * 100 : 0;

  // Diagnosis data
  const diagnosis =
    storeOperationalDiagnosis[currentStore.name] ||
    storeOperationalDiagnosis["Whitefield"];
  const [activeProblemId, setActiveProblemId] = useState(
    diagnosis.actionPriorities[0].id,
  );
  const selectedProblem =
    diagnosis.actionPriorities.find((p) => p.id === activeProblemId) ||
    diagnosis.actionPriorities[0];

  // Manager simulation and approval state
  const [simulatedActionId, setSimulatedActionId] = useState<string | null>(
    selectedProblem.id,
  );
  const [approvedActions, setApprovedActions] = useState<
    Record<
      string,
      { approvedBy: string; approvedAt: string; executionId: string }
    >
  >({});

  const isApproved = Boolean(approvedActions[selectedProblem.id]);

  const handleApproveAction = (problemId: string) => {
    setApprovedActions((prev) => ({
      ...prev,
      [problemId]: {
        approvedBy: "Ananya Rao · Chain Operations Admin",
        approvedAt: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        executionId: `EXEC-AUTO-${Math.floor(1000 + Math.random() * 9000)}`,
      },
    }));
  };

  const handleRevokeAction = (problemId: string) => {
    setApprovedActions((prev) => {
      const copy = { ...prev };
      delete copy[problemId];
      return copy;
    });
  };

  // Mini wastage chart
  const wData = wastageTrend;
  const wW = 200,
    wH = 80,
    wPadX = 4,
    wPadY = 8;
  const wVals = wData.map((d) => d.value);
  const wMin = Math.min(...wVals) - 0.5,
    wMax = Math.max(...wVals) + 0.5,
    wSpan = wMax - wMin || 1;
  const wX = (i: number) =>
    wPadX + (i * (wW - wPadX * 2)) / Math.max(1, wData.length - 1);
  const wY = (v: number) =>
    wH - wPadY - ((v - wMin) / wSpan) * (wH - wPadY * 2);
  const wPts = wData
    .map((d, i) => `${wX(i).toFixed(1)},${wY(d.value).toFixed(1)}`)
    .join(" ");
  const isIncreasing = wastageChange > 1;
  const wStroke = isIncreasing ? "#ef4444" : "#10b981";

  return (
    <div className="flex flex-col gap-6">
      {/* Top Breadcrumb & Store Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex size-9 items-center justify-center rounded-xl border bg-white hover:bg-muted transition-colors"
          >
            <ArrowLeft className="size-4 text-[#21483c]" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#2e8b65]">
                Store Command View
              </span>
              <span className="text-[10px] text-muted-foreground">/</span>
              <span className="text-[10px] font-semibold text-muted-foreground">
                Daily Operational Priority
              </span>
            </div>
            <h1 className="mt-0.5 text-[22px] font-bold tracking-tight text-[#143d31]">
              {currentStore.name}{" "}
              <span className="font-normal text-muted-foreground">
                · “What do I need to do today?”
              </span>
            </h1>
          </div>
        </div>

        {/* Quick store selector & urgency tier badge */}
        <div className="flex items-center gap-3">
          <select
            value={activeStoreName}
            onChange={(e) => {
              setActiveStoreName(e.target.value);
              const newDiag =
                storeOperationalDiagnosis[e.target.value] ||
                storeOperationalDiagnosis["Whitefield"];
              setActiveProblemId(newDiag.actionPriorities[0].id);
              setSimulatedActionId(newDiag.actionPriorities[0].id);
            }}
            className="rounded-xl border border-[#d2dfcd] bg-white px-3 py-2 text-[11px] font-semibold text-[#173f31] shadow-sm outline-none cursor-pointer"
          >
            {stores.map((s) => (
              <option key={s.name} value={s.name}>
                {s.name} ({s.status} · Risk {s.risk})
              </option>
            ))}
          </select>
          <span
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold ${currentStore.status === "Critical" ? "bg-red-50 text-red-600" : currentStore.status === "Watch" ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600"}`}
          >
            <StatusDot tone={riskTone(currentStore.status)} />
            {currentStore.status} · Risk {currentStore.risk}/100
          </span>
        </div>
      </div>

      {/* Hero "What do I need to do today?" Master Plan Card */}
      <section className="rounded-3xl border border-[#cfe3c8] bg-gradient-to-br from-[#f3faf0] to-[#eaf5e5] p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="flex size-6 items-center justify-center rounded-lg bg-[#164e3b] text-white">
                <Zap className="size-3.5" />
              </span>
              <h2 className="text-[14px] font-bold text-[#143d31]">
                Operational Action Directive for Today ·{" "}
                {new Date().toLocaleDateString("en-GB", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
              </h2>
            </div>
            <p className="mt-2 text-[12px] leading-5 text-[#305c49]">
              {diagnosis.todaySummary}
            </p>
          </div>
          <div className="flex gap-2">
            <div className="rounded-2xl border border-white/60 bg-white/80 p-3 shadow-xs text-center min-w-[110px]">
              <p className="text-[9px] uppercase font-bold tracking-wider text-muted-foreground">
                Failures Active
              </p>
              <p className="text-[18px] font-bold text-red-600">
                {diagnosis.actionPriorities.length} Critical
              </p>
            </div>
            <div className="rounded-2xl border border-white/60 bg-white/80 p-3 shadow-xs text-center min-w-[110px]">
              <p className="text-[9px] uppercase font-bold tracking-wider text-muted-foreground">
                Approved Today
              </p>
              <p className="text-[18px] font-bold text-[#164e3b]">
                {Object.keys(approvedActions).length} Actions
              </p>
            </div>
          </div>
        </div>

        {/* Chronological Daily Shift Action Roadmap */}
        <div className="mt-5 border-t border-[#d8e8d2] pt-4">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#3c6b56]">
            Shift Execution Schedule
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-[#d2e4cb] bg-white p-3 shadow-2xs">
              <span className="rounded bg-red-100 px-1.5 py-0.5 text-[9px] font-bold text-red-700">
                08:30 AM · PRIORITY 1
              </span>
              <p className="mt-1.5 text-[11px] font-bold text-[#173f31]">
                Flash Milk Markdown
              </p>
              <p className="mt-0.5 text-[10px] text-muted-foreground">
                Apply 40% discount on 48 milk units before midday peak.
              </p>
            </div>
            <div className="rounded-2xl border border-[#d2e4cb] bg-white p-3 shadow-2xs">
              <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[9px] font-bold text-amber-800">
                10:45 AM · PRIORITY 2
              </span>
              <p className="mt-1.5 text-[11px] font-bold text-[#173f31]">
                Authorize Bread Transfer
              </p>
              <p className="mt-0.5 text-[10px] text-muted-foreground">
                Dispatch 35 loaves from Indiranagar hub via courier.
              </p>
            </div>
            <div className="rounded-2xl border border-[#d2e4cb] bg-white p-3 shadow-2xs">
              <span className="rounded bg-sky-100 px-1.5 py-0.5 text-[9px] font-bold text-sky-800">
                01:30 PM · PRIORITY 3
              </span>
              <p className="mt-1.5 text-[11px] font-bold text-[#173f31]">
                Chiller 2 Gasket Inspection
              </p>
              <p className="mt-0.5 text-[10px] text-muted-foreground">
                CoolTech technician SLA dispatch for +6.8°C thermal breach.
              </p>
            </div>
            <div className="rounded-2xl border border-[#d2e4cb] bg-white p-3 shadow-2xs">
              <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[9px] font-bold text-emerald-800">
                04:30 PM · PRIORITY 4
              </span>
              <p className="mt-1.5 text-[11px] font-bold text-[#173f31]">
                Shift Cycle Count Audit
              </p>
              <p className="mt-0.5 text-[10px] text-muted-foreground">
                Conduct physical scan on Dairy Bay 2 for 18-unit variance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: 3 Distinct Problems Discovered with Connected Signal Explanations & Action Simulations */}
      <section className="flex flex-col gap-4">
        <div>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-[16px] font-bold text-[#163f32]">
                Root-Cause Diagnostics: Connected Signal Causal Chains
              </h2>
              <p className="text-[11px] text-muted-foreground">
                Antigravity AI connects cross-domain signals (procurement,
                weather, footfall, IoT sensors, vendor logistics) to explain
                root causes instead of listing raw KPIs.
              </p>
            </div>
          </div>

          {/* Problem Selector Tabs */}
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {diagnosis.actionPriorities.map((prob, idx) => {
              const active = prob.id === activeProblemId;
              const approved = Boolean(approvedActions[prob.id]);
              return (
                <button
                  key={prob.id}
                  onClick={() => {
                    setActiveProblemId(prob.id);
                    setSimulatedActionId(prob.id);
                  }}
                  className={`flex items-center gap-2 rounded-2xl border px-3.5 py-2.5 text-left transition-all ${
                    active
                      ? "border-[#164e3b] bg-white shadow-md ring-1 ring-[#164e3b]"
                      : "border-border/80 bg-white/70 hover:bg-white text-muted-foreground"
                  }`}
                >
                  <span
                    className={`flex size-6 items-center justify-center rounded-lg text-[10px] font-bold ${prob.severity === "Critical" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}`}
                  >
                    {idx + 1}
                  </span>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`text-[11px] font-bold ${active ? "text-[#164e3b]" : "text-[#21483c]"}`}
                      >
                        {prob.problemType}
                      </span>
                      {approved && (
                        <span className="flex items-center gap-0.5 rounded bg-emerald-100 px-1 py-0.2 text-[8px] font-bold text-emerald-700">
                          <CheckCircle2 className="size-2.5" /> Approved
                        </span>
                      )}
                    </div>
                    <p className="text-[9px] text-muted-foreground">
                      {prob.timeWindow}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Problem Deep-Dive Card */}
        <div className="rounded-3xl border border-border/80 bg-white p-5 shadow-[0_2px_14px_rgba(15,59,45,0.04)]">
          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border/60 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-red-50 px-2 py-0.5 text-[10px] font-bold text-red-600">
                  {selectedProblem.severity} Urgency
                </span>
                <span className="text-[11px] font-semibold text-muted-foreground">
                  {selectedProblem.timeWindow}
                </span>
              </div>
              <h3 className="mt-1.5 text-[18px] font-bold text-[#143d31]">
                {selectedProblem.title}
              </h3>
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                Affected:{" "}
                <b className="text-foreground">
                  {selectedProblem.affectedItems}
                </b>{" "}
                · Value exposed:{" "}
                <b className="text-red-600">
                  {formatINR(selectedProblem.atRiskValue)}
                </b>
              </p>
            </div>

            {/* Quick Status */}
            <div className="rounded-2xl bg-[#fafcfa] border p-3 text-right">
              <p className="text-[9px] text-muted-foreground uppercase font-bold">
                Manager Status
              </p>
              <p
                className={`mt-0.5 text-[12px] font-bold ${isApproved ? "text-emerald-600" : "text-amber-600"}`}
              >
                {isApproved
                  ? "Authorized & Executing"
                  : "Requires Manager Sign-Off"}
              </p>
            </div>
          </div>

          {/* Connected Signals Matrix (Connecting signals, not listing KPIs) */}
          <div className="mt-5">
            <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#2e8b65]">
              <Sparkles className="size-3.5" /> Connected Signal Breakdown
            </div>
            <div className="mt-3 grid gap-3 md:grid-cols-3">
              {selectedProblem.signals.map((sig, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-[#e1e9de] bg-[#f9faf7] p-3.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#1e6148]">
                      {sig.domain}
                    </span>
                    <span className="rounded bg-[#e6f2e1] px-1.5 py-0.5 text-[9px] font-bold text-[#20694e]">
                      {sig.severityScore}
                    </span>
                  </div>
                  <p className="mt-2 text-[11px] leading-5 text-[#374151]">
                    {sig.signalText}
                  </p>
                </div>
              ))}
            </div>

            {/* Causal Synthesis Box */}
            <div className="mt-3.5 rounded-2xl border border-[#cfe2ca] bg-[#f2f8ee] p-4">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#1e5c43]">
                AI Causal Synthesis (Cross-Signal Correlation)
              </p>
              <p className="mt-1 text-[12px] leading-5 text-[#21483c] font-medium">
                {selectedProblem.causalSynthesis}
              </p>
            </div>
          </div>

          {/* Recommended Actions Matrix across all 4 mandatory categories */}
          <div className="mt-6 border-t border-border/60 pt-5">
            <h4 className="text-[12px] font-bold uppercase tracking-wider text-[#163f32]">
              Recommended Multi-Action Interventions
            </h4>
            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {/* Action 1: Replenishment */}
              <div className="rounded-2xl border border-sky-100 bg-sky-50/40 p-3.5">
                <div className="flex items-center gap-1.5 text-sky-800">
                  <Truck className="size-4" />
                  <span className="text-[11px] font-bold">
                    1. Replenishment
                  </span>
                </div>
                <p className="mt-2 text-[11px] leading-5 text-sky-950 font-medium">
                  {selectedProblem.actions.replenishment}
                </p>
              </div>

              {/* Action 2: Markdown */}
              <div className="rounded-2xl border border-amber-100 bg-amber-50/40 p-3.5">
                <div className="flex items-center gap-1.5 text-amber-800">
                  <Tag className="size-4" />
                  <span className="text-[11px] font-bold">2. Markdown</span>
                </div>
                <p className="mt-2 text-[11px] leading-5 text-amber-950 font-medium">
                  {selectedProblem.actions.markdown}
                </p>
              </div>

              {/* Action 3: Wastage Fix */}
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-3.5">
                <div className="flex items-center gap-1.5 text-emerald-800">
                  <RefreshCw className="size-4" />
                  <span className="text-[11px] font-bold">3. Wastage Fix</span>
                </div>
                <p className="mt-2 text-[11px] leading-5 text-emerald-950 font-medium">
                  {selectedProblem.actions.wastageFix}
                </p>
              </div>

              {/* Action 4: Task or Escalation */}
              <div className="rounded-2xl border border-purple-100 bg-purple-50/40 p-3.5">
                <div className="flex items-center gap-1.5 text-purple-800">
                  <ShieldCheck className="size-4" />
                  <span className="text-[11px] font-bold">
                    4. Task / Escalation
                  </span>
                </div>
                <p className="mt-2 text-[11px] leading-5 text-purple-950 font-medium">
                  {selectedProblem.actions.taskOrEscalation}
                </p>
              </div>
            </div>
          </div>

          {/* INTERACTIVE ACTION SIMULATION & MANAGER APPROVAL BOX */}
          <div className="mt-6 rounded-2xl border-2 border-[#164e3b]/30 bg-gradient-to-r from-[#f7fbf5] via-[#f0f8ed] to-[#edf6ea] p-5 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-md bg-[#164e3b] px-2 py-0.5 text-[9px] font-bold text-white uppercase tracking-wider">
                  <PlayCircle className="size-3" /> Predictive Simulation &
                  Approval Engine
                </span>
                <h4 className="mt-2 text-[15px] font-bold text-[#143d31]">
                  {selectedProblem.simulation.actionTitle}
                </h4>
                <p className="mt-1 text-[11px] text-[#305e4c]">
                  {selectedProblem.simulation.proposedIntervention}
                </p>
              </div>

              {/* Simulation KPI projections */}
              <div className="flex gap-2.5">
                <div className="rounded-xl border bg-white p-2.5 text-center min-w-[90px]">
                  <p className="text-[8px] font-bold uppercase text-muted-foreground">
                    Projected Recovery
                  </p>
                  <p className="text-[14px] font-bold text-emerald-700">
                    {formatINR(
                      selectedProblem.simulation.projectedRecoveryValue,
                    )}
                  </p>
                  <p className="text-[8px] text-muted-foreground">
                    {selectedProblem.simulation.recoveryPercent}% of cost
                  </p>
                </div>
                <div className="rounded-xl border bg-white p-2.5 text-center min-w-[90px]">
                  <p className="text-[8px] font-bold uppercase text-muted-foreground">
                    Clearance Velocity
                  </p>
                  <p className="text-[14px] font-bold text-[#143d31]">
                    {selectedProblem.simulation.clearanceProbability}%
                  </p>
                  <p className="text-[8px] text-muted-foreground">
                    in ~{selectedProblem.simulation.expectedClearanceHours}h
                  </p>
                </div>
                <div className="rounded-xl border bg-white p-2.5 text-center min-w-[90px]">
                  <p className="text-[8px] font-bold uppercase text-muted-foreground">
                    Audience Reached
                  </p>
                  <p className="text-[14px] font-bold text-[#143d31]">
                    {selectedProblem.simulation.nearbyShoppersTargeted}
                  </p>
                  <p className="text-[8px] text-muted-foreground">
                    active shoppers
                  </p>
                </div>
              </div>
            </div>

            {/* Approval Execution Status Bar */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#d8e7d2] pt-4">
              <div className="text-[11px] text-[#2c5844]">
                <b>Execution Pipeline:</b>{" "}
                {selectedProblem.simulation.shelfLabelUpdateMode}
              </div>

              {isApproved ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 rounded-xl bg-emerald-100 px-3 py-1.5 text-[11px] font-bold text-emerald-800">
                    <CheckCircle2 className="size-4 text-emerald-600" />
                    <span>
                      Action Approved & Executed (
                      {approvedActions[selectedProblem.id].executionId})
                    </span>
                  </div>
                  <button
                    onClick={() => handleRevokeAction(selectedProblem.id)}
                    className="rounded-xl border border-red-200 bg-white px-3 py-1.5 text-[10px] font-bold text-red-600 hover:bg-red-50"
                  >
                    Revoke
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleApproveAction(selectedProblem.id)}
                  className="flex items-center gap-2 rounded-xl bg-[#164e3b] px-5 py-2.5 text-[11px] font-bold text-white shadow-md hover:bg-[#124031] active:scale-98 transition-all"
                >
                  <CheckCircle2 className="size-4" />
                  Approve & Execute Action as Manager
                </button>
              )}
            </div>

            {isApproved && (
              <div className="mt-3 rounded-xl border border-emerald-200 bg-white p-3 text-[10px] text-emerald-900 leading-4">
                ✅ <b>Manager Authorization Registered:</b> Approved by{" "}
                {approvedActions[selectedProblem.id].approvedBy} at{" "}
                {approvedActions[selectedProblem.id].approvedAt}. ESL price tags
                updated wirelessly. Push notification dispatched to customer
                apps.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4-panel operational metrics grid */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {/* Panel 1: Fast movers at risk */}
        <section className="rounded-2xl border border-border/80 bg-white shadow-[0_2px_12px_rgba(15,59,45,0.03)]">
          <div className="border-b border-border/60 px-4 py-3">
            <h2 className="text-[13px] font-bold text-[#163f32]">
              Fast movers at risk
            </h2>
            <p className="mt-0.5 text-[9px] text-muted-foreground">
              days_of_cover = on_hand ÷ avg_daily_sales
            </p>
          </div>
          <div className="max-h-[280px] overflow-y-auto px-4 py-2">
            {fastMovers.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between border-b border-border/40 py-2.5 last:border-0"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="truncate text-[11px] font-semibold text-[#21483c]">
                    {item.product}
                  </span>
                  {item.latePO && (
                    <span className="shrink-0 flex items-center gap-1 rounded px-1.5 py-0.5 bg-red-50 text-[8px] font-bold text-red-500">
                      <Clock3 className="size-2.5" />
                      late PO
                    </span>
                  )}
                </div>
                <span
                  className={`shrink-0 ml-2 text-[11px] font-bold ${item.daysOfCover === "OUT" ? "rounded bg-red-50 px-2 py-0.5 text-red-600" : "text-[#21483c]"}`}
                >
                  {item.daysOfCover === "OUT"
                    ? "OUT"
                    : `${item.daysOfCover.toFixed(1)}d`}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Panel 2: Expiring before it sells */}
        <section className="rounded-2xl border border-border/80 bg-white shadow-[0_2px_12px_rgba(15,59,45,0.03)]">
          <div className="border-b border-border/60 px-4 py-3">
            <h2 className="text-[13px] font-bold text-[#163f32]">
              Expiring before it sells
            </h2>
            <p className="mt-0.5 text-[9px] text-muted-foreground">
              {formatINR(totalExpiryCost)} at cost in the next 48 hrs
            </p>
          </div>
          <div className="max-h-[280px] overflow-y-auto px-4 py-2">
            {expiring.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between border-b border-border/40 py-2.5 last:border-0"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[11px] font-semibold text-[#21483c]">
                    {item.product}
                  </p>
                  <p className="text-[9px] text-muted-foreground">
                    {item.category} · {item.units} units
                  </p>
                </div>
                <div className="shrink-0 text-right ml-3">
                  <p className="text-[12px] font-bold text-[#21483c]">
                    {formatINR(item.cost)}
                  </p>
                  <p className="text-[9px] text-muted-foreground">
                    {item.hoursLeft}h left
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Panel 3: Team today */}
        <section className="rounded-2xl border border-border/80 bg-white shadow-[0_2px_12px_rgba(15,59,45,0.03)]">
          <div className="border-b border-border/60 px-4 py-3">
            <h2 className="text-[13px] font-bold text-[#163f32]">Team today</h2>
            <p className="mt-0.5 text-[9px] text-muted-foreground">
              {onShiftCount + lateCount} of {rostered} rostered ·{" "}
              {shortCount > 0 ? `${shortCount} short` : "full"} · {sopFails} SOP
              fails this week
            </p>
          </div>
          <div className="max-h-[280px] overflow-y-auto px-4 py-2">
            {team.map((member, i) => (
              <div
                key={i}
                className="flex items-center gap-3 border-b border-border/40 py-2.5 last:border-0"
              >
                <div
                  className={`flex size-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${member.status === "Late" ? "bg-amber-100 text-amber-700" : member.status === "Off" ? "bg-slate-100 text-slate-500" : "bg-[#d5e4d3] text-[#28644d]"}`}
                >
                  {member.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[11px] font-semibold text-[#21483c]">
                    {member.name}
                  </p>
                  <p className="text-[9px] text-muted-foreground">
                    {member.role} · {member.shift}
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2 py-1 text-[9px] font-bold ${
                    member.status === "On shift"
                      ? "bg-emerald-50 text-emerald-600"
                      : member.status === "Late"
                        ? "bg-amber-50 text-amber-600"
                        : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {member.status}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Panel 4: Wastage % of sales · 14 days */}
        <section className="rounded-2xl border border-border/80 bg-white shadow-[0_2px_12px_rgba(15,59,45,0.03)]">
          <div className="border-b border-border/60 px-4 py-3">
            <h2 className="text-[13px] font-bold text-[#163f32]">
              Wastage % of sales · 14 days
            </h2>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-[11px] font-medium text-muted-foreground">
                Now
              </span>
              <span className="text-[16px] font-bold text-[#173d32]">
                {currentWastage.toFixed(1)}%
              </span>
              <span
                className={`text-[10px] font-bold ${isIncreasing ? "text-red-500" : "text-emerald-600"}`}
              >
                {wastageChange >= 0 ? "+" : ""}
                {wastageChange.toFixed(0)}% vs last fortnight
              </span>
            </div>
          </div>
          <div className="px-4 py-3">
            <div className="relative">
              <svg viewBox={`0 0 ${wW} ${wH}`} className="w-full">
                <polygon
                  points={`${wPadX},${wH - wPadY} ${wPts} ${wW - wPadX},${wH - wPadY}`}
                  fill={
                    isIncreasing
                      ? "rgba(239,68,68,0.08)"
                      : "rgba(16,185,129,0.08)"
                  }
                />
                <polyline
                  points={wPts}
                  fill="none"
                  stroke={wStroke}
                  strokeWidth="2"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
                {wData.map((d, i) => (
                  <circle
                    key={i}
                    cx={wX(i)}
                    cy={wY(d.value)}
                    r={i === wData.length - 1 ? 3.5 : 2}
                    fill="#fff"
                    stroke={wStroke}
                    strokeWidth="1.5"
                  />
                ))}
              </svg>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className="rounded-lg bg-[#fafcfa] p-2">
                <p className="text-[9px] text-muted-foreground">Store waste</p>
                <p className="text-[13px] font-bold text-[#173d32]">
                  {currentStore.waste}
                </p>
              </div>
              <div className="rounded-lg bg-[#fafcfa] p-2">
                <p className="text-[9px] text-muted-foreground">Sales gap</p>
                <p
                  className={`text-[13px] font-bold ${currentStore.gap.startsWith("-") ? "text-red-500" : "text-emerald-600"}`}
                >
                  {currentStore.gap}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function DataPage({ view }: { view: View }) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All items");
  const [discounted, setDiscounted] = useState<string[]>([]);
  const [selectedStore, setSelectedStore] = useState<StoreType | null>(null);

  const filteredProducts = products.filter(
    (p) =>
      p[0].toLowerCase().includes(query.toLowerCase()) &&
      (selectedCategory === "All items" || p[1] === selectedCategory),
  );

  if (selectedStore && (view === "stores" || view === "rankings")) {
    return (
      <StoreDetailView
        store={selectedStore}
        onBack={() => setSelectedStore(null)}
      />
    );
  }

  // HEAD OFFICE STORE RANKING BY URGENCY VIEW
  if (view === "rankings") {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold text-[#2e8b65]">
              Head Office Operational Command
            </p>
            <h1 className="mt-1 text-[25px] font-bold tracking-tight text-[#143d31]">
              Store Urgency Rankings
            </h1>
            <p className="mt-1 text-[12px] text-muted-foreground">
              Cross-network operational ranking based on multi-signal risk
              synthesis (expiry velocity, stockout exposure, cold-chain
              breaches, and staffing gaps).
            </p>
          </div>
          <button className="rounded-xl border bg-white px-3 py-2 text-[11px] font-semibold text-[#173f31] shadow-sm">
            Export Head Office Report
          </button>
        </div>

        {/* Urgency Summary Badges */}
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-red-200 bg-red-50/60 p-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-red-800">
                Tier 1: Immediate Intervention
              </span>
              <span className="rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-bold text-white">
                1 Store
              </span>
            </div>
            <p className="mt-2 text-[18px] font-bold text-red-900">
              Whitefield (Urgency 88)
            </p>
            <p className="mt-1 text-[10px] text-red-700">
              Expires in &lt;6h, 14 stockouts, Chiller 2 thermal breach.
            </p>
          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-amber-800">
                Tier 2: Watchlist & Risk Emerging
              </span>
              <span className="rounded-full bg-amber-600 px-2 py-0.5 text-[10px] font-bold text-white">
                2 Stores
              </span>
            </div>
            <p className="mt-2 text-[18px] font-bold text-amber-900">
              Koramangala · Malleshwaram
            </p>
            <p className="mt-1 text-[10px] text-amber-700">
              Elevated dairy waste & slow freezer inventory turnover.
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-emerald-800">
                Tier 3: Operational Benchmark
              </span>
              <span className="rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] font-bold text-white">
                2 Stores
              </span>
            </div>
            <p className="mt-2 text-[18px] font-bold text-emerald-900">
              Indiranagar · Jayanagar
            </p>
            <p className="mt-1 text-[10px] text-emerald-700">
              Balanced coverage, minimal waste & 100% staff attendance.
            </p>
          </div>
        </div>

        {/* Head Office Comprehensive Urgency Table */}
        <section className="rounded-3xl border border-border/80 bg-white p-5 shadow-[0_2px_14px_rgba(15,59,45,0.03)]">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-[14px] font-bold text-[#163f32]">
                Network Store Urgency Priority Table
              </h2>
              <p className="text-[10px] text-muted-foreground">
                Click any store to open its full daily operational diagnosis
                (“What do I need to do today?”).
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left">
              <thead>
                <tr className="border-b text-[9px] uppercase tracking-wider text-muted-foreground">
                  <th className="pb-3 font-semibold">Rank</th>
                  <th className="pb-3 font-semibold">Store</th>
                  <th className="pb-3 font-semibold">Urgency Score</th>
                  <th className="pb-3 font-semibold">Urgency Tier</th>
                  <th className="pb-3 font-semibold">Primary Causal Hazard</th>
                  <th className="pb-3 font-semibold">Expiry Risk ₹</th>
                  <th className="pb-3 font-semibold">Stockouts</th>
                  <th className="pb-3 font-semibold">Daily Loss Exposure</th>
                  <th className="pb-3 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {headOfficeStoreRankings.map((st) => {
                  const sObj =
                    stores.find(
                      (s) => s.name.toLowerCase() === st.name.toLowerCase(),
                    ) || stores[0];
                  return (
                    <tr
                      key={st.storeId}
                      onClick={() => setSelectedStore(sObj)}
                      className="border-b last:border-0 cursor-pointer hover:bg-[#f3faf0] transition-colors"
                    >
                      <td className="py-3.5 text-[12px] font-bold text-muted-foreground">
                        #{st.rank}
                      </td>
                      <td className="py-3.5">
                        <p className="text-[12px] font-bold text-[#143d31] underline decoration-[#143d31]/30">
                          {st.name}
                        </p>
                        <p className="text-[9px] text-muted-foreground">
                          {st.city}
                        </p>
                      </td>
                      <td className="py-3.5">
                        <div className="flex items-center gap-2">
                          <span className="text-[14px] font-bold text-red-600">
                            {st.urgencyScore}
                          </span>
                          <div className="h-1.5 w-16 overflow-hidden rounded-full bg-slate-100">
                            <div
                              style={{ width: `${st.urgencyScore}%` }}
                              className={`h-full ${st.urgencyScore > 75 ? "bg-red-500" : st.urgencyScore > 40 ? "bg-amber-500" : "bg-emerald-500"}`}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5">
                        <span
                          className={`inline-block rounded-full px-2.5 py-0.5 text-[9px] font-bold ${
                            st.urgencyScore > 75
                              ? "bg-red-100 text-red-700"
                              : st.urgencyScore > 40
                                ? "bg-amber-100 text-amber-800"
                                : "bg-emerald-100 text-emerald-800"
                          }`}
                        >
                          {st.tier}
                        </span>
                      </td>
                      <td className="py-3.5 max-w-[260px] text-[10px] text-[#2c5344] font-medium leading-4">
                        {st.primaryIssue}
                      </td>
                      <td className="py-3.5 text-[11px] font-bold text-red-600">
                        {formatINR(st.expiryRiskValue)}
                      </td>
                      <td className="py-3.5 text-[11px] font-semibold text-foreground">
                        {st.stockoutSkus} SKUs
                      </td>
                      <td className="py-3.5 text-[11px] font-bold text-[#143d31]">
                        {formatINR(st.estimatedDailyMarginLoss)}
                      </td>
                      <td className="py-3.5">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedStore(sObj);
                          }}
                          className="rounded-xl bg-[#164e3b] px-3 py-1.5 text-[10px] font-bold text-white shadow-xs hover:bg-[#124031]"
                        >
                          Open Store View →
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    );
  }

  // WASTE & EXPIRY VIEW
  if (view === "waste") {
    return (
      <div className="flex flex-col gap-5">
        <PageTitle
          title="Waste & expiry"
          eyebrow="Loss prevention"
          desc="Turn expiring inventory into recovered revenue before it becomes waste."
        />
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Kpi
            label="Potential waste value"
            value="₹42,680"
            note="Across 12 products"
            icon={AlertTriangle}
            tone="amber"
            positive={false}
          />
          <Kpi
            label="Saved through actions"
            value="₹18,240"
            note="This month"
            icon={ArrowDownRight}
          />
          <Kpi
            label="Expiring today"
            value="4"
            note="Across 3 stores"
            icon={Clock3}
            tone="red"
            positive={false}
          />
          <Kpi
            label="Recovery rate"
            value="72.4%"
            note="+8.2% vs last month"
            icon={ArrowUpRight}
          />
        </div>
        <section className="rounded-2xl border bg-white p-4">
          <div className="mb-4">
            <h2 className="text-[14px] font-bold text-[#163f32]">
              AI expiry recommendations
            </h2>
            <p className="mt-1 text-[10px] text-muted-foreground">
              Actions are never recommended for expired or unsafe products.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] text-left">
              <thead>
                <tr className="border-b text-[9px] uppercase tracking-wider text-muted-foreground">
                  <th className="pb-3">Product</th>
                  <th className="pb-3">Store</th>
                  <th className="pb-3">Qty at risk</th>
                  <th className="pb-3">Expiry</th>
                  <th className="pb-3">Value</th>
                  <th className="pb-3">AI action</th>
                </tr>
              </thead>
              <tbody>
                {expiringProducts.map((p) => (
                  <tr key={p.product} className="border-b last:border-0">
                    <td className="py-3 text-[11px] font-semibold">
                      {p.product}
                    </td>
                    <td className="py-3 text-[11px] text-muted-foreground">
                      {p.store}
                    </td>
                    <td className="py-3 text-[11px]">{p.qty} units</td>
                    <td className="py-3 text-[10px] text-red-600">
                      {p.expiry}
                    </td>
                    <td className="py-3 text-[11px] font-semibold">{p.cost}</td>
                    <td className="py-3">
                      {discounted.includes(p.product) ? (
                        <span className="text-[10px] font-bold text-emerald-600">
                          Action applied
                        </span>
                      ) : (
                        <button
                          onClick={() =>
                            setDiscounted([...discounted, p.product])
                          }
                          className="rounded-lg bg-[#e3f1dc] px-2.5 py-1.5 text-[10px] font-bold text-[#246b4e]"
                        >
                          {p.action}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    );
  }

  // DEFAULT STORES OR INVENTORY VIEW
  return (
    <div className="flex flex-col gap-5">
      <PageTitle
        title={
          view === "inventory"
            ? "Central inventory"
            : view === "sales"
              ? "Sales analytics"
              : "Stores"
        }
        eyebrow="Operations"
        desc={
          view === "inventory"
            ? "Real-time stock thresholds across all distribution points."
            : "Monitor chain-wide performance and operational health."
        }
      />
      <div className="flex flex-wrap gap-2">
        <div className="flex min-w-[220px] flex-1 items-center gap-2 rounded-xl border bg-white px-3 py-2">
          <Search className="size-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search stores or products..."
            className="w-full bg-transparent text-xs outline-none"
          />
        </div>
        {view === "inventory" && (
          <div className="flex gap-1 overflow-x-auto rounded-xl border bg-white p-1">
            {categories.slice(0, 4).map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`whitespace-nowrap rounded-lg px-2.5 py-1.5 text-[10px] font-semibold ${selectedCategory === c ? "bg-[#dff0d8] text-[#21664b]" : "text-muted-foreground"}`}
              >
                {c}
              </button>
            ))}
          </div>
        )}
        <button className="rounded-xl border bg-white px-3 py-2 text-[10px] font-semibold">
          Export report
        </button>
      </div>

      <section className="rounded-2xl border bg-white p-4">
        <div className="overflow-x-auto">
          {view === "inventory" ? (
            <table className="w-full min-w-[700px] text-left">
              <thead>
                <tr className="border-b text-[9px] uppercase tracking-wider text-muted-foreground">
                  <th className="pb-3">Product</th>
                  <th className="pb-3">Category</th>
                  <th className="pb-3">Price</th>
                  <th className="pb-3">In stock</th>
                  <th className="pb-3">Min. threshold</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((p) => (
                  <tr key={p[0]} className="border-b last:border-0">
                    <td className="py-3 text-[11px] font-semibold">{p[0]}</td>
                    <td className="py-3 text-[11px] text-muted-foreground">
                      {p[1]}
                    </td>
                    <td className="py-3 text-[11px]">{p[2]}</td>
                    <td className="py-3 text-[11px] font-semibold">{p[3]}</td>
                    <td className="py-3 text-[11px] text-muted-foreground">
                      {p[4]}
                    </td>
                    <td className="py-3">
                      <span
                        className={`rounded-full px-2 py-1 text-[9px] font-bold ${Number(p[3]) <= Number(p[4]) ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600"}`}
                      >
                        {Number(p[3]) <= Number(p[4]) ? "Low stock" : "Healthy"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full min-w-[620px] text-left">
              <thead>
                <tr className="border-b text-[9px] uppercase tracking-wider text-muted-foreground">
                  <th className="pb-3">Store</th>
                  <th className="pb-3">Risk score</th>
                  <th className="pb-3">Sales gap</th>
                  <th className="pb-3">Waste</th>
                  <th className="pb-3">Staff</th>
                  <th className="pb-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {stores
                  .filter((s) =>
                    s.name.toLowerCase().includes(query.toLowerCase()),
                  )
                  .map((s) => (
                    <tr
                      key={s.name}
                      onClick={() => setSelectedStore(s)}
                      className="border-b last:border-0 cursor-pointer hover:bg-[#f4f9f1] transition-colors"
                    >
                      <td className="py-3 text-[11px] font-semibold text-[#287450] underline decoration-[#287450]/30">
                        {s.name}
                      </td>
                      <td className="py-3">
                        <span className="font-bold">{s.risk}</span>
                        <span className="text-[10px] text-muted-foreground">
                          {" "}
                          / 100
                        </span>
                      </td>
                      <td
                        className={`py-3 text-[11px] font-semibold ${s.gap.startsWith("-") ? "text-red-500" : "text-emerald-600"}`}
                      >
                        {s.gap}
                      </td>
                      <td className="py-3 text-[11px]">{s.waste}</td>
                      <td className="py-3 text-[11px]">{s.staff}</td>
                      <td className="py-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedStore(s);
                          }}
                          className="rounded-lg bg-[#e3f1dc] px-2 py-1 text-[10px] font-bold text-[#1f7956]"
                        >
                          Diagnose Today →
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </div>
  );
}
function PageTitle({
  title,
  eyebrow,
  desc,
}: {
  title: string;
  eyebrow: string;
  desc: string;
}) {
  return (
    <div>
      <p className="text-[11px] font-semibold text-[#2e8b65]">{eyebrow}</p>
      <h1 className="mt-1 text-[25px] font-bold tracking-tight text-[#143d31]">
        {title}
      </h1>
      <p className="mt-1 text-[12px] text-muted-foreground">{desc}</p>
    </div>
  );
}

export default function GroceryDashboard() {
  const [view, setView] = useState<View>("overview");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [customer, setCustomer] = useState(false);
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [qrToken, setQrToken] = useState("");
  const [verifyStatus, setVerifyStatus] = useState<any>(null);

  const handleVerifyQR = async () => {
    if (!qrToken) return;
    try {
      const res = await fetch("/api/verify-qr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ qrToken }),
      });
      const data = await res.json();
      setVerifyStatus(data);
    } catch (e) {
      setVerifyStatus({ success: false, error: "Network error" });
    }
  };

  if (customer) return <CustomerApp onBack={() => setCustomer(false)} />;

  return (
    <div className="flex min-h-screen bg-[#f0f4ec] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white via-[#f0f4ec] to-[#e8eee6] text-foreground">
      <Sidebar
        view={view}
        setView={setView}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar
          onMenu={() => setMobileOpen(true)}
          onCustomer={() => setCustomer(true)}
          onVerifyQR={() => setQrModalOpen(true)}
        />
        <main className="flex-1 overflow-auto px-4 py-6 sm:px-6 lg:px-8 lg:py-7">
          {view === "overview" ? (
            <Overview setView={setView} />
          ) : (
            <DataPage view={view} />
          )}
        </main>
      </div>

      {qrModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setQrModalOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-border/80 pb-3">
              <h3 className="text-[16px] font-bold text-[#143d31]">
                Verify Exit Receipt
              </h3>
              <button
                onClick={() => setQrModalOpen(false)}
                className="rounded-lg p-1 hover:bg-muted"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="mt-4">
              <p className="text-[12px] text-muted-foreground mb-2">
                Use hardware scanner or enter code manually:
              </p>
              <input
                value={qrToken}
                onChange={(e) => setQrToken(e.target.value)}
                placeholder="e.g. ORD-XYZ-VERIFIED-1234"
                className="w-full rounded-xl border border-border/80 px-4 py-2.5 text-[13px] font-medium outline-none focus:border-[#164e3b]"
              />
              <button
                onClick={handleVerifyQR}
                className="mt-3 w-full rounded-xl bg-[#164e3b] py-2.5 text-[12px] font-bold text-white hover:bg-[#124031]"
              >
                Verify
              </button>
            </div>

            {verifyStatus && (
              <div
                className={`mt-4 rounded-xl border p-4 ${verifyStatus.success ? "border-emerald-200 bg-emerald-50" : "border-red-200 bg-red-50"}`}
              >
                {verifyStatus.success ? (
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="size-8 text-emerald-600" />
                    <div>
                      <p className="text-[14px] font-bold text-emerald-900">
                        Valid Receipt
                      </p>
                      <p className="text-[11px] text-emerald-700">
                        Order {verifyStatus.orderNumber} is paid. Allow exit.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="size-8 text-red-600" />
                    <div>
                      <p className="text-[14px] font-bold text-red-900">
                        Verification Failed
                      </p>
                      <p className="text-[11px] text-red-700">
                        {verifyStatus.error}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
