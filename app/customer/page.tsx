'use client'

import Link from 'next/link'
import { Smartphone, ArrowRight, ShieldCheck } from 'lucide-react'

export default function CustomerPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f0f4ec] p-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-xl border border-emerald-100">
        <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl bg-[#0d4f3c] text-white">
          <Smartphone className="size-8" />
        </div>
        <h1 className="text-xl font-bold text-[#123c31]">Customer App is Native Mobile</h1>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          The customer scan-and-go self-checkout runs on the <strong>grocerAI Mobile App (Expo / React Native)</strong>. The web portal serves as the <strong>Store Operations &amp; Admin Panel</strong>.
        </p>
        <div className="mt-6 flex flex-col gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0d4f3c] px-4 py-3 text-xs font-bold text-white shadow-md hover:bg-[#155b43] transition-all"
          >
            <span>Open Store Admin Panel</span>
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/staff/gate-scanner"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-xs font-bold text-emerald-800 hover:bg-emerald-100 transition-all"
          >
            <ShieldCheck className="size-4 text-emerald-600" />
            <span>Turnstile Security Kiosk</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
