'use client'

import React, { useState, useEffect, useRef } from 'react'
import {
  AlertTriangle,
  ArrowRight,
  Camera,
  Check,
  CheckCircle2,
  Clock,
  ExternalLink,
  Lock,
  QrCode,
  RefreshCw,
  Scan,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Unlock,
  Users,
  Volume2,
  VolumeX,
  X,
  Zap,
} from 'lucide-react'

interface VerifiedOrder {
  orderId: string
  customerName: string
  phone: string
  storeName: string
  exitGate: string
  paymentMethod: string
  paymentId: string
  amount: number
  status: string
  paidAt: string
  items: Array<{
    name: string
    qty: number
    price: number
    image: string
  }>
}

interface StaffGateScannerWebProps {
  onClose?: () => void
  isFullScreenPage?: boolean
}

const samplePasses = [
  { code: 'GB-EXIT-100234', label: 'Arjun Sharma · 2 items (Milk, Paneer) · ₹123' },
  { code: 'GB-EXIT-884210', label: 'Priya Sundaram · 2 items (Atta, Oil) · ₹455' },
  { code: 'GB-EXIT-EXPIRED', label: 'Fraud Test · Already Exited (Anti-Theft)' },
]

export default function StaffGateScannerWeb({ onClose, isFullScreenPage = false }: StaffGateScannerWebProps) {
  const [scannedCode, setScannedCode] = useState('')
  const [manualCode, setManualCode] = useState('')
  const [verifying, setVerifying] = useState(false)
  const [verifiedOrder, setVerifiedOrder] = useState<VerifiedOrder | null>(null)
  const [verifyError, setVerifyError] = useState<string | null>(null)
  const [verifyTimeMs, setVerifyTimeMs] = useState<number | null>(null)
  const [gateUnlocked, setGateUnlocked] = useState(false)
  const [gateTimer, setGateTimer] = useState<number | null>(null)
  const [audioEnabled, setAudioEnabled] = useState(true)
  const [flaggedAlert, setFlaggedAlert] = useState(false)
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({})
  const [shiftStats, setShiftStats] = useState({
    exitedToday: 143,
    avgSpeed: '0.32s',
    fraudBlocked: 2,
  })

  // Play synthetic audio chime for turnstile feedback
  const playBeep = (type: 'success' | 'alert' | 'scan') => {
    if (!audioEnabled || typeof window === 'undefined') return
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
      if (!AudioCtx) return
      const ctx = new AudioCtx()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)

      if (type === 'success') {
        osc.type = 'sine'
        osc.frequency.setValueAtTime(880, ctx.currentTime) // A5
        osc.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.15) // A6
        gain.gain.setValueAtTime(0.3, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25)
        osc.start(ctx.currentTime)
        osc.stop(ctx.currentTime + 0.25)
      } else if (type === 'alert') {
        osc.type = 'sawtooth'
        osc.frequency.setValueAtTime(320, ctx.currentTime)
        osc.frequency.setValueAtTime(260, ctx.currentTime + 0.1)
        gain.gain.setValueAtTime(0.4, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35)
        osc.start(ctx.currentTime)
        osc.stop(ctx.currentTime + 0.35)
      } else {
        osc.type = 'triangle'
        osc.frequency.setValueAtTime(1200, ctx.currentTime)
        gain.gain.setValueAtTime(0.15, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08)
        osc.start(ctx.currentTime)
        osc.stop(ctx.currentTime + 0.08)
      }
    } catch {
      // AudioContext fallback
    }
  }

  const handleVerify = async (codeToVerify: string) => {
    if (!codeToVerify.trim()) return

    setVerifying(true)
    setVerifyError(null)
    setVerifiedOrder(null)
    setScannedCode(codeToVerify)
    setFlaggedAlert(false)
    setCheckedItems({})
    playBeep('scan')

    const startTime = performance.now()

    try {
      const response = await fetch('/api/verify-qr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          qrToken: codeToVerify,
          gateId: 'Gate 2 (Express Optical Turnstile)',
        }),
      })

      const data = await response.json()
      const elapsed = Math.round(performance.now() - startTime)
      setVerifyTimeMs(elapsed)

      if (data.success && data.order) {
        setVerifiedOrder(data.order)
        setGateUnlocked(true)
        playBeep('success')

        // Default all items to checked for swift verification
        const initialChecks: Record<string, boolean> = {}
        data.order.items.forEach((item: any) => {
          initialChecks[item.name] = true
        })
        setCheckedItems(initialChecks)

        setShiftStats((prev) => ({
          ...prev,
          exitedToday: prev.exitedToday + 1,
        }))

        // Auto relock gate after 8 seconds
        if (gateTimer) clearTimeout(gateTimer)
        const timer = window.setTimeout(() => {
          setGateUnlocked(false)
        }, 8000)
        setGateTimer(timer)
      } else {
        setVerifyError(data.error || 'Verification Failed: Unrecognized or invalid exit pass')
        setGateUnlocked(false)
        playBeep('alert')
        if (data.status === 'ALREADY_EXITED') {
          setShiftStats((prev) => ({
            ...prev,
            fraudBlocked: prev.fraudBlocked + 1,
          }))
        }
      }
    } catch {
      const elapsed = Math.round(performance.now() - startTime)
      setVerifyTimeMs(elapsed)
      setVerifyError('Network error connecting to verification engine')
      setGateUnlocked(false)
      playBeep('alert')
    } finally {
      setVerifying(false)
    }
  }

  const handleApproveTurnstile = async () => {
    if (!verifiedOrder) return
    try {
      await fetch('/api/verify-qr', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ qrToken: verifiedOrder.orderId }),
      })
    } catch {
      // Ignored
    }
    setGateUnlocked(true)
    playBeep('success')
  }

  const handleFlagDiscrepancy = () => {
    setFlaggedAlert(true)
    setGateUnlocked(false)
    playBeep('alert')
  }

  const handleReset = () => {
    setScannedCode('')
    setManualCode('')
    setVerifiedOrder(null)
    setVerifyError(null)
    setVerifyTimeMs(null)
    setGateUnlocked(false)
    setFlaggedAlert(false)
    setCheckedItems({})
    if (gateTimer) clearTimeout(gateTimer)
  }

  const toggleItemCheck = (itemName: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [itemName]: !prev[itemName],
    }))
  }

  return (
    <div
      className={`flex flex-col bg-[#0b1712] text-white selection:bg-[#287450] selection:text-white ${
        isFullScreenPage ? 'min-h-screen' : 'relative w-full rounded-3xl overflow-hidden shadow-2xl border border-white/10'
      }`}
    >
      {/* Top Turnstile Gate Control Header */}
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 bg-[#0f2119]/80 px-6 py-4 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#164e3b] to-[#0a3124] text-[#b7d66b] shadow-inner ring-1 ring-white/20">
            <Scan className="size-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-[17px] font-black tracking-tight text-white">
                Turnstile Exit Gate 2
              </h2>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400 ring-1 ring-emerald-500/30">
                <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                LIVE EXPRESS LANE
              </span>
            </div>
            <p className="text-[11px] font-medium text-white/60">
              Indiranagar Flagship · Guard Terminal ID: <span className="font-mono text-emerald-300">GRD-409</span>
            </p>
          </div>
        </div>

        {/* Action Controls & Sound */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setAudioEnabled(!audioEnabled)}
            className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[11px] font-bold text-white/80 hover:bg-white/10 transition-colors"
            title="Toggle Verification Beep"
          >
            {audioEnabled ? <Volume2 className="size-4 text-emerald-400" /> : <VolumeX className="size-4 text-red-400" />}
            <span>{audioEnabled ? 'Audio On' : 'Muted'}</span>
          </button>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[11px] font-bold text-white/80 hover:bg-white/10 transition-colors"
          >
            <RefreshCw className="size-3.5" />
            <span>Next Customer</span>
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="flex size-9 items-center justify-center rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <X className="size-5" />
            </button>
          )}
        </div>
      </header>

      {/* KPI Shift Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 border-b border-white/10 bg-[#091510] px-6 py-3 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
            <Users className="size-4" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-white/40">Exited Today</p>
            <p className="text-[15px] font-black text-white">{shiftStats.exitedToday} shoppers</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
            <Zap className="size-4 text-emerald-400" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-white/40">Audit Latency</p>
            <p className="text-[15px] font-black text-emerald-400">{shiftStats.avgSpeed} (Avg)</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
            <ShieldCheck className="size-4 text-emerald-400" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-white/40">Zero-Queue Rate</p>
            <p className="text-[15px] font-black text-white">100% Flow</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-lg bg-red-500/10 text-red-400">
            <ShieldAlert className="size-4 text-red-400" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-white/40">Fraud Blocked</p>
            <p className="text-[15px] font-black text-red-400">{shiftStats.fraudBlocked} attempts</p>
          </div>
        </div>
      </div>

      {/* Main Turnstile Two-Column Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6">
        {/* Left Column: Optical Camera Viewfinder & Pass Input */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Simulated High-Resolution Camera Scanner Viewfinder */}
          <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-[#07100b] p-6 shadow-2xl min-h-[360px]">
            {/* Viewfinder Grid Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(#1f4b36_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

            {/* Top Viewfinder HUD */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
              <span className="flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-[11px] font-mono text-emerald-400 backdrop-blur-md border border-white/10">
                <Camera className="size-3.5" />
                <span>60 FPS OPTICAL SENSOR</span>
              </span>
              <span className="flex items-center gap-1 rounded-full bg-emerald-500/20 px-2.5 py-1 text-[10px] font-bold text-emerald-300 ring-1 ring-emerald-500/40">
                <Zap className="size-3" />
                &lt; 1s Latency Engine
              </span>
            </div>

            {/* Central Optical Scan Targeting Bracket */}
            <div className="relative size-56 rounded-2xl border-2 border-dashed border-emerald-400/80 p-3 shadow-[0_0_40px_rgba(34,197,94,0.15)] flex flex-col items-center justify-center">
              {/* Corner Targeting Accents */}
              <div className="absolute -top-1 -left-1 size-4 border-t-2 border-l-2 border-emerald-300" />
              <div className="absolute -top-1 -right-1 size-4 border-t-2 border-r-2 border-emerald-300" />
              <div className="absolute -bottom-1 -left-1 size-4 border-b-2 border-l-2 border-emerald-300" />
              <div className="absolute -bottom-1 -right-1 size-4 border-b-2 border-r-2 border-emerald-300" />

              {/* Animated Laser Scanning Line */}
              <div className="absolute inset-x-2 top-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_12px_#ef4444] animate-bounce" />

              {/* Central Target Icon */}
              <div className="flex flex-col items-center justify-center text-center">
                <QrCode className="size-16 text-emerald-400/70" />
                <p className="mt-3 text-[11px] font-bold text-emerald-200">
                  Aim camera at customer&apos;s Exit QR pass
                </p>
                <p className="text-[9px] text-white/50">
                  Auto-focus triggered · Instant hardware verification
                </p>
              </div>
            </div>

            {/* Bottom Scanner status indicator */}
            <div className="absolute bottom-4 inset-x-4 flex items-center justify-center">
              {verifying ? (
                <div className="flex items-center gap-2 rounded-full bg-emerald-500/20 px-4 py-1.5 text-xs font-bold text-emerald-300 border border-emerald-500/40 animate-pulse">
                  <RefreshCw className="size-3.5 animate-spin" />
                  <span>Verifying digital exit token...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 rounded-full bg-black/60 px-4 py-1.5 text-[11px] font-mono text-white/70 border border-white/10">
                  <span>READY FOR CUSTOMER PASS</span>
                </div>
              )}
            </div>
          </div>

          {/* Rapid Test Passes & Hardware Barcode Gun Input */}
          <div className="rounded-2xl border border-white/10 bg-[#0f2119] p-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-white/60 mb-2">
              One-Click Test Shopper Passes
            </p>
            <div className="flex flex-col gap-2">
              {samplePasses.map((p) => (
                <button
                  key={p.code}
                  onClick={() => handleVerify(p.code)}
                  className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-xs font-semibold transition-all ${
                    scannedCode === p.code
                      ? 'border border-emerald-400 bg-emerald-950/60 text-emerald-200'
                      : 'border border-white/10 bg-white/5 text-white/90 hover:bg-white/10'
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[11px] text-emerald-300">{p.code}</p>
                    <p className="text-[11px] text-white/70 truncate">{p.label}</p>
                  </div>
                  <ArrowRight className="size-4 text-white/40 ml-2" />
                </button>
              ))}
            </div>

            {/* Manual Code / Barcode Gun Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleVerify(manualCode)
              }}
              className="mt-3 flex gap-2"
            >
              <input
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value)}
                placeholder="Scan barcode gun or enter token..."
                className="flex-1 rounded-xl border border-white/10 bg-black/40 px-3.5 py-2 text-xs font-mono text-white placeholder-white/30 outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                disabled={verifying || !manualCode.trim()}
                className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-500 disabled:opacity-50 transition-colors"
              >
                Verify
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Verification Result, Physical Bag Audit & Gate Controls */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Turnstile Gate Physical Hardware Simulator */}
          <div
            className={`flex items-center justify-between rounded-2xl border p-4 transition-all duration-300 ${
              gateUnlocked
                ? 'border-emerald-500/50 bg-gradient-to-r from-emerald-950/80 to-[#0e3020] shadow-[0_0_30px_rgba(16,185,129,0.2)]'
                : flaggedAlert
                ? 'border-red-500/60 bg-gradient-to-r from-red-950/80 to-[#3b0b0b] shadow-[0_0_30px_rgba(239,68,68,0.25)] animate-pulse'
                : 'border-white/10 bg-[#0d1c15]'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex size-12 items-center justify-center rounded-2xl ${
                  gateUnlocked
                    ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/30'
                    : flaggedAlert
                    ? 'bg-red-500 text-white shadow-lg shadow-red-500/30'
                    : 'bg-white/10 text-white/60'
                }`}
              >
                {gateUnlocked ? (
                  <Unlock className="size-6 animate-pulse" />
                ) : flaggedAlert ? (
                  <AlertTriangle className="size-6" />
                ) : (
                  <Lock className="size-6" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-extrabold text-white">
                    {gateUnlocked
                      ? 'TURNSTILE UNLOCKED 🔓'
                      : flaggedAlert
                      ? 'SECURITY LOCKDOWN TRIGGERED 🚨'
                      : 'OPTICAL TURNSTILE LOCKED 🔒'}
                  </h3>
                  {verifyTimeMs !== null && (
                    <span className="rounded-md bg-emerald-500/20 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-300 border border-emerald-500/30">
                      {verifyTimeMs}ms Response
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-white/70">
                  {gateUnlocked
                    ? 'Optical barrier open · Zero-Queue exit clearance granted.'
                    : flaggedAlert
                    ? 'Discrepancy detected · Store Guard intervention required.'
                    : 'Awaiting customer exit QR pass scan to release barrier.'}
                </p>
              </div>
            </div>

            {/* Barrier Gate Visual Graphic */}
            <div className="hidden sm:flex items-center gap-1.5 font-mono text-xs">
              <span className={`px-2 py-1 rounded-md font-bold ${gateUnlocked ? 'bg-emerald-500/20 text-emerald-300' : 'bg-white/5 text-white/40'}`}>
                {gateUnlocked ? 'BARRIER: OPEN' : 'BARRIER: CLOSED'}
              </span>
            </div>
          </div>

          {/* Verification Result Display */}
          {verifiedOrder && (
            <div className="flex flex-col gap-4 rounded-3xl border border-emerald-500/30 bg-[#0c1f17] p-5 shadow-xl animate-in fade-in duration-200">
              {/* Customer & Payment Meta Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-base font-bold text-white">{verifiedOrder.customerName}</p>
                    <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold text-emerald-300 border border-emerald-500/30">
                      PAID VERIFIED
                    </span>
                  </div>
                  <p className="text-xs text-white/60">
                    {verifiedOrder.phone} · Paid {new Date(verifiedOrder.paidAt).toLocaleTimeString()}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-lg font-black text-emerald-400">₹{verifiedOrder.amount}</p>
                  <p className="text-[10px] font-mono text-white/60">
                    {verifiedOrder.paymentMethod} · <span className="text-emerald-300">{verifiedOrder.paymentId}</span>
                  </p>
                </div>
              </div>

              {/* Bag Contents Checklist (Guard Audit) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">
                    Bag Contents Audit ({verifiedOrder.items.length} Paid Items)
                  </p>
                  <span className="text-[10px] text-white/60">
                    Guard: Tap item to verify physical bag match
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {verifiedOrder.items.map((item) => {
                    const isChecked = checkedItems[item.name] ?? false
                    return (
                      <div
                        key={item.name}
                        onClick={() => toggleItemCheck(item.name)}
                        className={`flex items-center gap-3 rounded-2xl border p-2.5 cursor-pointer transition-all ${
                          isChecked
                            ? 'border-emerald-500/40 bg-emerald-950/40 text-white'
                            : 'border-white/10 bg-black/20 text-white/80 hover:border-white/30'
                        }`}
                      >
                        <div className="size-12 rounded-xl overflow-hidden bg-white/5 border border-white/10 flex-shrink-0">
                          {item.image ? (
                            <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center text-xs text-white/40">No Img</div>
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold truncate text-white">{item.name}</p>
                          <p className="text-[11px] text-emerald-300 font-semibold">
                            ₹{item.price} each
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="rounded-lg bg-emerald-500/20 px-2 py-0.5 font-mono text-xs font-bold text-emerald-300">
                            Qty: {item.qty}
                          </span>
                          <div
                            className={`flex size-6 items-center justify-center rounded-lg border transition-colors ${
                              isChecked
                                ? 'border-emerald-400 bg-emerald-500 text-black'
                                : 'border-white/20 bg-white/5 text-transparent'
                            }`}
                          >
                            <Check className="size-3.5 stroke-[3]" />
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Guard Decision Control Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={handleApproveTurnstile}
                  className="flex-1 min-w-[200px] flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 py-3 text-xs font-bold text-white shadow-lg shadow-emerald-900/30 hover:brightness-110 active:scale-[0.98] transition-all"
                >
                  <Unlock className="size-4" />
                  <span>Approve & Release Turnstile</span>
                </button>

                <button
                  onClick={handleFlagDiscrepancy}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-red-500/40 bg-red-950/40 px-4 py-3 text-xs font-bold text-red-300 hover:bg-red-900/40 transition-colors"
                >
                  <AlertTriangle className="size-4" />
                  <span>Flag Bag Discrepancy</span>
                </button>
              </div>
            </div>
          )}

          {/* Verification Error / Anti-Theft Alert */}
          {verifyError && (
            <div className="flex flex-col gap-3 rounded-3xl border border-red-500/50 bg-[#290d0d] p-5 shadow-2xl animate-in shake duration-300">
              <div className="flex items-start gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-red-500 text-white">
                  <ShieldAlert className="size-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-black text-red-200">EXIT PASS VERIFICATION FAILED</h4>
                    {verifyTimeMs !== null && (
                      <span className="font-mono text-[10px] text-red-400 bg-red-950/60 px-2 py-0.5 rounded border border-red-800">
                        {verifyTimeMs}ms
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-red-300 leading-relaxed">{verifyError}</p>
                </div>
              </div>

              <div className="mt-2 flex items-center justify-between rounded-xl bg-black/40 p-3 text-xs border border-red-500/20">
                <span className="text-white/60">Turnstile Action:</span>
                <span className="font-bold text-red-400">GATES LOCKED · AUDIT REQUIRED</span>
              </div>
            </div>
          )}

          {/* Idle Instructions when no scan is active */}
          {!verifiedOrder && !verifyError && (
            <div className="flex flex-1 flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-[#07130d] p-8 text-center text-white/60">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-white/5 text-emerald-400 mb-3">
                <Scan className="size-7" />
              </div>
              <h4 className="text-sm font-bold text-white">Awaiting Customer Exit QR Scan</h4>
              <p className="mt-1 text-xs max-w-sm text-white/50">
                When a customer pays via the User App, their exit pass flashes at this camera.
                Verification and bag audit will display here in under 1 second.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
