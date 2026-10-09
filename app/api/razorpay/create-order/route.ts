import { NextRequest, NextResponse } from 'next/server'
import { createRazorpayOrder } from '@/lib/razorpay'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { amount, receipt, notes } = body

    if (!amount || typeof amount !== 'number' || amount <= 0) {
      return NextResponse.json({ error: 'Valid amount is required' }, { status: 400 })
    }

    const order = await createRazorpayOrder({
      amount,
      receipt,
      notes: notes || {}
    })

    return NextResponse.json(order)
  } catch (error: any) {
    console.error('Error in /api/razorpay/create-order:', error)
    return NextResponse.json(
      { error: error?.message || 'Failed to create Razorpay order' },
      { status: 500 }
    )
  }
}
