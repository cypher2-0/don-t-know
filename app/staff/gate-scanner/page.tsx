'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import StaffGateScannerWeb from '@/components/staff-gate-scanner-web'

export default function StaffGateScannerPage() {
  return (
    <div className="min-h-screen bg-[#07100b] text-white">
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="mb-4 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3.5 py-2 text-xs font-bold text-white hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="size-4" />
            <span>Back to Store Ops Dashboard</span>
          </Link>
          <span className="font-mono text-xs text-white/50">Turnstile Kiosk Mode · v2.4</span>
        </div>

        <StaffGateScannerWeb isFullScreenPage={true} />
      </div>
    </div>
  )
}
