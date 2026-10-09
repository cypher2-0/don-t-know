'use client'

import CustomerApp from '@/components/customer-app'
import { useRouter } from 'next/navigation'

export default function CustomerPage() {
  const router = useRouter()
  return (
    <div className="flex min-h-screen justify-center bg-[#1e293b]">
      <div className="w-full max-w-md bg-white shadow-2xl min-h-screen">
        <CustomerApp onBack={() => router.push('/')} />
      </div>
    </div>
  )
}
