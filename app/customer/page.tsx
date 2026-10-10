'use client'

import CustomerApp from '@/components/customer-app'
import { useRouter } from 'next/navigation'

export default function CustomerPage() {
  const router = useRouter()
  return (
    <div className="flex min-h-screen justify-center bg-[#f0f4f1] sm:p-4">
      <div className="w-full max-w-5xl bg-white min-h-screen shadow-2xl sm:rounded-3xl overflow-hidden relative">
        <CustomerApp onBack={() => router.push('/')} />
      </div>
    </div>
  )
}
