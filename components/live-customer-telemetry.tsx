'use client'

import { useState, useEffect } from 'react'
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Bot,
  CheckCircle2,
  Clock,
  Flame,
  Package,
  RefreshCw,
  ShoppingBag,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react'
import type { UserEvent, DemandVelocity, BackendAiAlert } from '@/lib/backend-intelligence'

export default function LiveCustomerTelemetryFeed({
  onTriggerAction,
}: {
  onTriggerAction?: (actionText: string) => void
}) {
  const [events, setEvents] = useState<UserEvent[]>([])
  const [velocities, setVelocities] = useState<DemandVelocity[]>([])
  const [alerts, setAlerts] = useState<BackendAiAlert[]>([])
  const [loading, setLoading] = useState(false)
  const [analyzingAi, setAnalyzingAi] = useState(false)
  const [aiAnalysisResult, setAiAnalysisResult] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<string>('')

  const fetchStream = async () => {
    try {
      const res = await fetch('/api/telemetry/stream')
      if (res.ok) {
        const data = await res.json()
        setEvents(data.events || [])
        setVelocities(data.velocities || [])
        setAlerts(data.alerts || [])
        setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }))
      }
    } catch (err) {
      console.debug('Failed to fetch telemetry stream:', err)
    }
  }

  useEffect(() => {
    fetchStream()
    const interval = setInterval(fetchStream, 4000)
    return () => clearInterval(interval)
  }, [])

  const runDeepAiAnalysis = async () => {
    setAnalyzingAi(true)
    try {
      const res = await fetch('/api/ai/backend-intelligence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: 'Synthesize real user app purchases with current cold-chain and vendor logistics. Provide executive operational directives.'
        })
      })
      if (res.ok) {
        const data = await res.json()
        setAiAnalysisResult(data.analysis)
      }
    } catch (err) {
      console.error('Deep AI analysis failed:', err)
    } finally {
      setAnalyzingAi(false)
    }
  }

  const criticalVelocities = velocities.filter((v) => v.riskLevel === 'CRITICAL')

  return (
    <section className="rounded-2xl border border-border/80 bg-white p-5 shadow-[0_2px_12px_rgba(15,59,45,0.03)]">
      {/* Feed Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-lg bg-emerald-100 text-[#164e3b]">
              <Activity className="size-4 animate-pulse" />
            </div>
            <h2 className="text-[15px] font-bold text-[#163f32]">Real-Time User App Telemetry & Backend Intelligence</h2>
            <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[9px] font-bold text-emerald-800">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-ping" />
              LIVE STREAM
            </span>
          </div>
          <p className="mt-1 text-[11px] text-muted-foreground">
            Ingests live customer cart additions, checkout orders, and scans to drive automated supply chain decisions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {lastUpdated && (
            <span className="text-[10px] text-muted-foreground font-mono">
              Updated {lastUpdated}
            </span>
          )}
          <button
            onClick={runDeepAiAnalysis}
            disabled={analyzingAi}
            className="flex items-center gap-1.5 rounded-xl bg-[#164e3b] px-3.5 py-2 text-[11px] font-bold text-white shadow-xs hover:bg-[#124031] disabled:opacity-50 transition-opacity"
          >
            {analyzingAi ? (
              <RefreshCw className="size-3.5 animate-spin" />
            ) : (
              <Sparkles className="size-3.5 text-emerald-300" />
            )}
            <span>Run Backend AI Synthesis</span>
          </button>
        </div>
      </div>

      {/* Grid: Live Events vs Demand Velocity vs AI Alerts */}
      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        {/* Column 1: Live Customer Events */}
        <div className="flex flex-col rounded-xl border border-slate-100 bg-[#fbfdfa] p-3.5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <span className="flex items-center gap-1.5 text-[12px] font-bold text-[#143d31]">
              <Users className="size-3.5 text-emerald-600" /> Live Customer Actions
            </span>
            <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[9px] font-semibold text-slate-500">
              {events.length} logged
            </span>
          </div>
          <div className="mt-3 flex-1 space-y-2.5 overflow-y-auto max-h-[300px] pr-1">
            {events.length === 0 ? (
              <p className="text-[11px] text-muted-foreground py-4 text-center">No customer actions yet. Try adding items to cart in customer app!</p>
            ) : (
              events.slice(0, 7).map((evt) => (
                <div
                  key={evt.id}
                  className="rounded-xl border border-border/50 bg-white p-2.5 text-xs shadow-2xs transition-all hover:border-emerald-200"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`rounded px-1.5 py-0.5 text-[9px] font-bold ${
                        evt.type === 'ORDER_PLACED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : evt.type === 'CART_ADD'
                            ? 'bg-sky-100 text-sky-800'
                            : evt.type === 'BARCODE_SCAN'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {evt.type}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-mono">{evt.timestamp}</span>
                  </div>
                  <p className="mt-1.5 text-[11px] font-semibold text-[#1a4b3b] leading-4">{evt.details}</p>
                  <p className="mt-1 text-[9px] text-muted-foreground">{evt.storeName}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Column 2: Real-Time Demand Velocity & Stock Burn */}
        <div className="flex flex-col rounded-xl border border-slate-100 bg-[#fbfdfa] p-3.5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <span className="flex items-center gap-1.5 text-[12px] font-bold text-[#143d31]">
              <Flame className="size-3.5 text-amber-500" /> Customer App Demand Burn
            </span>
            <span className="rounded-md bg-amber-50 px-1.5 py-0.5 text-[9px] font-bold text-amber-700">
              {criticalVelocities.length} at risk
            </span>
          </div>
          <div className="mt-3 flex-1 space-y-2.5 overflow-y-auto max-h-[300px] pr-1">
            {velocities.slice(0, 5).map((vel) => (
              <div
                key={vel.productName}
                className={`rounded-xl border p-2.5 text-xs ${
                  vel.riskLevel === 'CRITICAL'
                    ? 'border-red-200 bg-red-50/40'
                    : vel.riskLevel === 'WARNING'
                      ? 'border-amber-200 bg-amber-50/30'
                      : 'border-border/60 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#143d31]">{vel.productName}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${
                      vel.riskLevel === 'CRITICAL'
                        ? 'bg-red-100 text-red-700'
                        : vel.riskLevel === 'WARNING'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-emerald-100 text-emerald-700'
                    }`}
                  >
                    {vel.estimatedHoursToStockout}h to stockout
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between text-[10px] text-muted-foreground">
                  <span>Velocity: <b className="text-foreground">{vel.currentVelocityPerHour} units/hr</b> ({vel.velocityRatio}x baseline)</span>
                  <span>Stock: <b className="text-foreground">{vel.unitsRemaining} left</b></span>
                </div>
                {/* Visual Progress Bar */}
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    style={{ width: `${Math.min(100, (vel.unitsRemaining / 40) * 100)}%` }}
                    className={`h-full ${
                      vel.riskLevel === 'CRITICAL' ? 'bg-red-500' : vel.riskLevel === 'WARNING' ? 'bg-amber-500' : 'bg-emerald-500'
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column 3: Backend AI Autonomous Interventions */}
        <div className="flex flex-col rounded-xl border border-slate-100 bg-[#fbfdfa] p-3.5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <span className="flex items-center gap-1.5 text-[12px] font-bold text-[#143d31]">
              <Zap className="size-3.5 text-emerald-600" /> AI Autonomous Directives
            </span>
            <span className="rounded-md bg-emerald-100 px-1.5 py-0.5 text-[9px] font-bold text-emerald-800">
              {alerts.length} active
            </span>
          </div>
          <div className="mt-3 flex-1 space-y-2.5 overflow-y-auto max-h-[300px] pr-1">
            {alerts.slice(0, 4).map((alt) => (
              <div
                key={alt.id}
                className="rounded-xl border border-emerald-100 bg-white p-3 text-xs shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#164e3b]">{alt.title}</span>
                  <span className="rounded bg-[#e8f3e5] px-1.5 py-0.5 text-[9px] font-bold text-[#20694e]">
                    {alt.actionType}
                  </span>
                </div>
                <p className="mt-1.5 text-[10px] leading-4 text-slate-600">
                  <b className="text-[#143d31]">Connected Cause:</b> {alt.connectedCause}
                </p>
                <div className="mt-2.5 rounded-lg bg-[#f4f9f2] p-2">
                  <p className="text-[10px] font-medium text-[#1b5b43]">
                    <b className="text-[#123e2e]">Action:</b> {alt.recommendedAction}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Deep AI Synthesis Result Output */}
      {aiAnalysisResult && (
        <div className="mt-5 rounded-2xl border border-emerald-200 bg-[#f5fbf3] p-4 text-xs">
          <div className="flex items-center justify-between border-b border-emerald-200 pb-2">
            <div className="flex items-center gap-2">
              <Bot className="size-4 text-[#164e3b]" />
              <span className="font-bold text-[#164e3b]">
                Backend Cloud AI Deep Operational Synthesis (Powered by Live Customer Activity)
              </span>
            </div>
            <button
              onClick={() => setAiAnalysisResult(null)}
              className="text-[10px] text-muted-foreground hover:text-foreground"
            >
              Dismiss
            </button>
          </div>
          <div className="mt-3 whitespace-pre-wrap leading-5 text-slate-800">
            {aiAnalysisResult}
          </div>
        </div>
      )}
    </section>
  )
}
