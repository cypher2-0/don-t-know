import { NextResponse } from 'next/server'
import { backendIntelligence } from '@/lib/backend-intelligence'

export async function GET() {
  try {
    return NextResponse.json({
      events: backendIntelligence.getEvents(),
      velocities: backendIntelligence.getDemandVelocities(),
      alerts: backendIntelligence.getAlerts(),
      stockLevels: backendIntelligence.getStockLevels(),
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    console.error('Error fetching telemetry stream:', error)
    return NextResponse.json({ error: error?.message || 'Failed to fetch telemetry' }, { status: 500 })
  }
}
