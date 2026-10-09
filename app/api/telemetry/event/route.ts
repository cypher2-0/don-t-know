import { NextRequest, NextResponse } from 'next/server'
import { backendIntelligence } from '@/lib/backend-intelligence'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { type, storeName, productName, quantity, orderId, orderTotal, details } = body

    if (!type || !storeName) {
      return NextResponse.json({ error: 'Missing event type or storeName' }, { status: 400 })
    }

    const recorded = backendIntelligence.recordEvent({
      type,
      storeName,
      productName,
      quantity,
      orderId,
      orderTotal,
      details: details || `${type} on ${productName || 'product'}`
    })

    return NextResponse.json({
      success: true,
      event: recorded,
      demandVelocities: backendIntelligence.getDemandVelocities(),
      alerts: backendIntelligence.getAlerts()
    })
  } catch (error: any) {
    console.error('Error recording telemetry event:', error)
    return NextResponse.json({ error: error?.message || 'Failed to record event' }, { status: 500 })
  }
}
