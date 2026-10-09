import { NextRequest, NextResponse } from 'next/server'
import { verifyRazorpaySignature } from '@/lib/razorpay'
import { backendIntelligence } from '@/lib/backend-intelligence'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      orderId,
      orderTotal,
      storeName,
      itemsCount
    } = body

    if (!razorpayOrderId || !razorpayPaymentId) {
      return NextResponse.json({ error: 'Missing payment details' }, { status: 400 })
    }

    const isValid = verifyRazorpaySignature({
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature: razorpaySignature || ''
    })

    if (!isValid) {
      return NextResponse.json({ error: 'Payment signature verification failed' }, { status: 400 })
    }

    // Record verified transaction in backend intelligence event stream
    backendIntelligence.recordEvent({
      type: 'ORDER_PLACED',
      storeName: storeName || 'GreenBasket Indiranagar',
      orderId: orderId || razorpayOrderId,
      orderTotal: orderTotal || 0,
      quantity: itemsCount || 1,
      details: `Razorpay Payment Verified (${razorpayPaymentId}) for ${orderId || razorpayOrderId} (₹${orderTotal || 0})`
    })

    return NextResponse.json({
      success: true,
      verified: true,
      paymentId: razorpayPaymentId,
      orderId: orderId || razorpayOrderId,
      status: 'captured'
    })
  } catch (error: any) {
    console.error('Error in /api/razorpay/verify-payment:', error)
    return NextResponse.json(
      { error: error?.message || 'Payment verification failed' },
      { status: 500 }
    )
  }
}
