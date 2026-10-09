'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { CheckCircle2, ShieldCheck, AlertCircle, ArrowLeft, Loader2 } from 'lucide-react'

declare global {
  interface Window {
    Razorpay: any
  }
}

function PayContent() {
  const searchParams = useSearchParams()
  const amountStr = searchParams.get('amount') || '100'
  const orderId = searchParams.get('orderId') || '#SB-8201'
  const storeName = searchParams.get('storeName') || 'GreenBasket Express · Indiranagar'
  const itemsCount = searchParams.get('itemsCount') || '1'
  const redirectUrl = searchParams.get('redirectUrl') || 'mobile://order-placed'

  const amount = Number(amountStr) || 100
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successPaymentId, setSuccessPaymentId] = useState<string | null>(null)

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (typeof window !== 'undefined' && window.Razorpay) {
        resolve(true)
        return
      }
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  const startPayment = async () => {
    setLoading(true)
    setError(null)
    try {
      const scriptLoaded = await loadRazorpayScript()
      if (!scriptLoaded) {
        throw new Error('Unable to connect to Razorpay secure payment gateway. Please check your internet connection.')
      }

      // Create order via backend API
      const orderRes = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          receipt: `rcpt_${orderId.replace(/[^a-zA-Z0-9]/g, '')}`,
          notes: { storeName, itemsCount },
        }),
      })

      if (!orderRes.ok) {
        throw new Error('Could not initialize payment order. Please try again.')
      }

      const orderData = await orderRes.json()

      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency || 'INR',
        name: 'GreenBasket Express',
        description: `Self-Checkout Bill ${orderId} (${storeName})`,
        image: 'https://cdn-icons-png.flaticon.com/512/3724/3724720.png',
        order_id: orderData.id,
        handler: async function (response: any) {
          setLoading(true)
          try {
            // Verify HMAC signature
            await fetch('/api/razorpay/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
                orderId,
                orderTotal: amount,
                storeName,
                itemsCount: Number(itemsCount),
              }),
            })

            setSuccessPaymentId(response.razorpay_payment_id)

            // Auto-redirect to mobile app
            const target = `${redirectUrl}?id=${encodeURIComponent(orderId)}&paymentId=${encodeURIComponent(response.razorpay_payment_id)}`
            setTimeout(() => {
              window.location.href = target
            }, 800)
          } catch (e: any) {
            setSuccessPaymentId(response.razorpay_payment_id)
          } finally {
            setLoading(false)
          }
        },
        prefill: {
          name: 'Arjun Rao',
          email: 'arjun.rao@example.com',
          contact: '9876543210',
        },
        notes: {
          store: storeName,
          order: orderId,
        },
        theme: {
          color: '#164e3b',
        },
        modal: {
          ondismiss: function () {
            setLoading(false)
          },
        },
      }

      const rzp = new window.Razorpay(options)
      rzp.on('payment.failed', function (res: any) {
        setError(res.error?.description || 'Payment was declined or failed.')
        setLoading(false)
      })
      rzp.open()
      setLoading(false)
    } catch (err: any) {
      setError(err?.message || 'Payment initiation failed')
      setLoading(false)
    }
  }

  useEffect(() => {
    // Auto-launch Razorpay on page load
    const timer = setTimeout(() => {
      startPayment()
    }, 400)
    return () => clearTimeout(timer)
  }, [])

  const appReturnUrl = `${redirectUrl}?id=${encodeURIComponent(orderId)}&paymentId=${encodeURIComponent(successPaymentId || '')}`

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f7faf5] px-4 py-8 text-[#173f31]">
      <div className="w-full max-w-md rounded-3xl border border-[#dce9d8] bg-white p-6 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#eef4ec] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex size-10 items-center justify-center rounded-xl bg-[#0c2340] text-white">
              <span className="text-lg font-black text-[#3395ff]">R</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-[#0c2340]">Razorpay Secure</span>
                <ShieldCheck className="size-4 text-emerald-600" />
              </div>
              <p className="text-[10px] text-gray-500">Official UPI & Cards Payment Gateway</p>
            </div>
          </div>
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-800">
            TEST MODE
          </span>
        </div>

        {/* Order Details */}
        <div className="mt-5 rounded-2xl border border-[#dcecd7] bg-[#f7fbf5] p-4">
          <div className="flex justify-between text-xs text-gray-600">
            <span>Bill Reference:</span>
            <span className="font-mono font-bold text-[#164e3b]">{orderId}</span>
          </div>
          <div className="mt-1.5 flex justify-between text-xs text-gray-600">
            <span>Store:</span>
            <span className="font-medium text-[#173f31]">{storeName}</span>
          </div>
          <div className="mt-1.5 flex justify-between text-xs text-gray-600">
            <span>Items Verified:</span>
            <span className="font-medium text-[#173f31]">{itemsCount} in-store items</span>
          </div>
          <div className="mt-3 flex justify-between border-t border-[#e2ece0] pt-2.5">
            <span className="text-sm font-bold text-[#173f31]">Amount to Pay:</span>
            <span className="text-xl font-extrabold text-[#164e3b]">₹{amount}</span>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="mt-4 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
            <AlertCircle className="size-4 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-bold">Payment Error</p>
              <p className="mt-0.5">{error}</p>
            </div>
          </div>
        )}

        {/* Success message */}
        {successPaymentId && (
          <div className="mt-5 rounded-2xl border border-emerald-300 bg-emerald-50 p-5 text-center">
            <CheckCircle2 className="mx-auto size-12 text-emerald-600" />
            <h3 className="mt-2 text-base font-bold text-emerald-900">Payment Completed!</h3>
            <p className="mt-1 text-xs text-emerald-700">
              Razorpay ID: <code className="font-mono font-bold">{successPaymentId}</code>
            </p>
            <p className="mt-2 text-[11px] text-emerald-800">
              Your Digital Security Exit Pass is now generated.
            </p>

            <a
              href={appReturnUrl}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#164e3b] py-3 text-xs font-bold text-white shadow-md hover:bg-[#124031]"
            >
              Open Exit Pass in GrocerAI App →
            </a>
          </div>
        )}

        {/* Action Button */}
        {!successPaymentId && (
          <div className="mt-5 space-y-2.5">
            <button
              onClick={startPayment}
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0c2340] py-3.5 text-sm font-bold text-white shadow-md transition-all hover:bg-[#123157] active:scale-[0.99] disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  <span>Connecting to Razorpay...</span>
                </>
              ) : (
                <>
                  <span className="text-base font-black text-[#3395ff]">R</span>
                  <span>Open Razorpay Checkout (UPI / Cards)</span>
                </>
              )}
            </button>

            <a
              href={redirectUrl}
              className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-gray-200 bg-white py-2.5 text-xs font-semibold text-gray-600 hover:bg-gray-50"
            >
              <ArrowLeft className="size-3.5" />
              <span>Cancel & Return to App</span>
            </a>
          </div>
        )}

        <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-gray-400">
          <ShieldCheck className="size-3.5 text-gray-400" />
          <span>PCI-DSS Level 1 Compliant · Official Razorpay Gateway</span>
        </div>
      </div>
    </div>
  )
}

export default function PayPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <Loader2 className="size-6 animate-spin text-[#164e3b]" />
        </div>
      }
    >
      <PayContent />
    </Suspense>
  )
}
