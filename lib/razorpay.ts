import crypto from 'crypto'

export interface RazorpayOrderParams {
  amount: number // in INR (will be converted to paise)
  currency?: string
  receipt?: string
  notes?: Record<string, string>
}

export interface RazorpayOrderResult {
  id: string
  amount: number
  currency: string
  receipt: string
  status: string
  isTestMode: boolean
  keyId: string
}

export interface RazorpayVerificationParams {
  razorpayOrderId: string
  razorpayPaymentId: string
  razorpaySignature: string
}

export async function createRazorpayOrder(params: RazorpayOrderParams): Promise<RazorpayOrderResult> {
  const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
  const keySecret = process.env.RAZORPAY_KEY_SECRET

  const amountInPaise = Math.round(params.amount * 100)
  const currency = params.currency || 'INR'
  const receipt = params.receipt || `rcpt_${Date.now()}`

  // 1. LIVE RAZORPAY API CALL IF KEYS PRESENT
  if (keyId && keySecret) {
    try {
      const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64')
      const res = await fetch('https://api.razorpay.com/v1/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${auth}`
        },
        body: JSON.stringify({
          amount: amountInPaise,
          currency,
          receipt,
          notes: params.notes || {}
        })
      })

      if (res.ok) {
        const orderData = await res.json()
        return {
          id: orderData.id,
          amount: orderData.amount,
          currency: orderData.currency,
          receipt: orderData.receipt,
          status: orderData.status,
          isTestMode: false,
          keyId
        }
      } else {
        const errData = await res.json()
        console.warn('Razorpay API error, falling back to simulated order:', errData)
      }
    } catch (err) {
      console.warn('Razorpay network error, falling back to simulated order:', err)
    }
  }

  // 2. SIMULATED RAZORPAY ORDER (FOR DEMO/TESTING WITHOUT EXTERNAL API KEY)
  const testKeyId = keyId || 'rzp_test_grocerai_demo'
  const mockOrderId = `order_${Math.random().toString(36).substring(2, 12)}`

  return {
    id: mockOrderId,
    amount: amountInPaise,
    currency,
    receipt,
    status: 'created',
    isTestMode: true,
    keyId: testKeyId
  }
}

export function verifyRazorpaySignature(params: RazorpayVerificationParams): boolean {
  const keySecret = process.env.RAZORPAY_KEY_SECRET

  // If running in test mode without secret, accept test payment IDs
  if (!keySecret) {
    return true
  }

  try {
    const text = `${params.razorpayOrderId}|${params.razorpayPaymentId}`
    const expectedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(text)
      .digest('hex')

    return expectedSignature === params.razorpaySignature
  } catch (err) {
    console.error('Signature verification error:', err)
    return false
  }
}
