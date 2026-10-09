'use client'

import CustomerApp from '@/components/customer-app'
import { useRouter } from 'next/navigation'

export default function CustomerPage() {
  const router = useRouter()
  return (
    <div className="min-h-screen bg-[#f4f7f2]">
      <CustomerApp onBack={() => router.push('/')} />
    </div>
  )
}
