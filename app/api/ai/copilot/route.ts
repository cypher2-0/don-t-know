import { NextRequest, NextResponse } from 'next/server'
import { generateCopilotResponse, CopilotRequest } from '@/lib/ai-provider'

export async function POST(req: NextRequest) {
  try {
    const body: CopilotRequest = await req.json()

    if (!body.prompt || typeof body.prompt !== 'string') {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
    }

    const response = await generateCopilotResponse(body)
    return NextResponse.json(response)
  } catch (error: any) {
    console.error('API /api/ai/copilot error:', error)
    return NextResponse.json(
      { error: error?.message || 'Internal AI service error' },
      { status: 500 }
    )
  }
}
