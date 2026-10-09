import { NextRequest, NextResponse } from 'next/server'
import { backendIntelligence } from '@/lib/backend-intelligence'

export async function POST(req: NextRequest) {
  try {
    let customPrompt: string | undefined
    try {
      const body = await req.json()
      customPrompt = body?.prompt
    } catch {
      // Prompt is optional
    }

    const analysis = await backendIntelligence.generateDeepAiAnalysis(customPrompt)
    return NextResponse.json({
      success: true,
      analysis,
      eventsCount: backendIntelligence.getEvents().length,
      criticalVelocities: backendIntelligence.getDemandVelocities().filter(v => v.riskLevel === 'CRITICAL'),
      alerts: backendIntelligence.getAlerts()
    })
  } catch (error: any) {
    console.error('Error generating backend intelligence analysis:', error)
    return NextResponse.json({ error: error?.message || 'Failed to generate analysis' }, { status: 500 })
  }
}
