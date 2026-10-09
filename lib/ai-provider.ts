import { stores, products, expiringProducts, wastedProducts } from '@/lib/mock-data'
import { headOfficeStoreRankings, storeOperationalDiagnosis } from '@/lib/head-office-ops'

export interface CopilotMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export interface CopilotRequest {
  prompt: string
  conversationHistory?: CopilotMessage[]
  apiKey?: string
  provider?: 'gemini' | 'openai'
  contextType?: 'operations' | 'shopping'
}

export interface CopilotResponse {
  answer: string
  providerUsed: 'gemini' | 'openai' | 'fallback'
  model: string
  suggestedActions?: string[]
}

const SYSTEM_PROMPT_OPERATIONS = `You are GrocerAI's Principal Retail Operations & Supply Chain AI Specialist.
You have real-time access to the store network:
STORES RANKED BY URGENCY:
1. Whitefield Hypermarket: Urgency Score 88/100 (Tier 1 Critical). Issue: 48 Milk units stranded expiring in <6h, PO #8921 +40% over-order, heavy rain -32% footfall, missed T-24h markdown. Chiller 2 thermal breach (+6.8°C spike), 18-unit dairy variance. Core breakfast stockouts (bread & eggs). Margin at risk: ₹28,400.
2. Koramangala Superstore: Urgency Score 66/100 (Tier 2 High). Produce overstock (Tomatoes, leafy greens), morning velocity gap -18%, PO #8310 vendor delayed 3h.
3. Malleshwaram Express: Urgency Score 54/100 (Tier 2 Medium). Evening snack stockouts, inventory count mismatch.
4. Jayanagar Metro: Urgency Score 24/100 (Tier 3 Benchmark). Smooth ops, 96% on-time logistics.
5. Indiranagar Premium: Urgency Score 16/100 (Tier 3 Benchmark). Top performer, +14% sales vs forecast, waste 1.8%.

CORE RULES:
- Connect signals together (Procurement + Weather/Footfall + Algorithmic logic; Logistics + Rush velocity + Staffing; IoT cold chain + Mechanical gaskets + Inventory discrepancy).
- Never just list isolated KPIs. Explain the chain of causality.
- Provide actionable recommendations in 4 categories when appropriate: Replenishment, Markdown, Wastage Fix, Task / Escalation.
- Tone: Highly knowledgeable, concise, decisive, retail executive tone.`

const SYSTEM_PROMPT_SHOPPING = `You are GrocerAI's Customer Shopping Copilot.
You have access to live inventory at GreenBasket Indiranagar:
- Amul Taaza Milk (500ml, ₹28)
- Fresh Paneer (200g, ₹95)
- Amul Salted Butter (100g, ₹58)
- Organic Bananas (500g, ₹42, 15% OFF)
- Shimla Royal Apples (4 pcs, ₹140)
- Hybrid Tomatoes (1kg, ₹34)
- Aashirvaad Atta (5kg, ₹310)
- India Gate Basmati Rice (1kg, ₹125)
- Fortune Sunflower Oil (1L, ₹145)
- Harvest Gold Bread (400g, ₹45)

Help customers with recipes, healthy meal plans, budget bundles, and dynamic shopping lists. Be enthusiastic, helpful, and suggest exact products and prices.`

export async function generateCopilotResponse(req: CopilotRequest): Promise<CopilotResponse> {
  const { prompt, conversationHistory = [], provider = 'gemini', contextType = 'operations' } = req

  // Priority 1: User-supplied key in request, or Environment variable
  const geminiKey = req.apiKey || process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY
  const openaiKey = req.apiKey || process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY

  const systemInstruction = contextType === 'shopping' ? SYSTEM_PROMPT_SHOPPING : SYSTEM_PROMPT_OPERATIONS

  // 1. TRY GEMINI (Live Real-Time)
  if (provider === 'gemini' && geminiKey) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`
      
      const contents = [
        {
          role: 'user',
          parts: [{ text: `${systemInstruction}\n\nUser Question: ${prompt}` }]
        }
      ]

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents,
          generationConfig: {
            temperature: 0.4,
            maxOutputTokens: 800,
          }
        })
      })

      if (res.ok) {
        const data = await res.json()
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text
        if (text) {
          return {
            answer: text,
            providerUsed: 'gemini',
            model: 'gemini-1.5-flash',
            suggestedActions: [
              'Simulate 40% clearance markdown on Whitefield milk',
              'Dispatch emergency bread transfer from Indiranagar',
              'Review Chiller 2 IoT maintenance ticket'
            ]
          }
        }
      }
    } catch (err) {
      console.warn('Gemini live call error, using operational fallback:', err)
    }
  }

  // 2. TRY OPENAI (Live Real-Time)
  if (provider === 'openai' && openaiKey) {
    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openaiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemInstruction },
            ...conversationHistory.map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content: prompt }
          ],
          temperature: 0.4,
          max_tokens: 800
        })
      })

      if (res.ok) {
        const data = await res.json()
        const text = data?.choices?.[0]?.message?.content
        if (text) {
          return {
            answer: text,
            providerUsed: 'openai',
            model: 'gpt-4o-mini',
            suggestedActions: [
              'Execute automated price markdown sync',
              'Alert Whitefield store manager',
              'Verify vendor delivery SLA penalty'
            ]
          }
        }
      }
    } catch (err) {
      console.warn('OpenAI live call error, using operational fallback:', err)
    }
  }

  // 3. REAL-TIME LOCAL CONTEXTUAL REASONING ENGINE (Instant fallback if API key is not yet set)
  return generateContextualFallback(prompt, contextType)
}

function generateContextualFallback(prompt: string, contextType: 'operations' | 'shopping'): CopilotResponse {
  const p = prompt.toLowerCase()

  if (contextType === 'operations') {
    if (p.includes('whitefield') || p.includes('urgent') || p.includes('rank 1') || p.includes('highest')) {
      return {
        answer: `**Whitefield Hypermarket (Rank #1 · Critical Intervention)** holds an Urgency Score of **88/100** with **₹28,400 daily margin exposure**.

**Connected Causal Breakdown:**
1. **Expiry Hazard**: 48 units of fresh pasteurized milk are stranded (<6h to shelf expiration). This was triggered by a +40% procurement over-order on PO #8921 combined with a -32% rain-induced footfall plunge and an automated rule failure at T-24h.
2. **Thermal Spike**: Cold-Chain Chiller 2 sustained a +6.8°C breach for 140 minutes due to door gasket unlatching and evaporator frost.
3. **Breakfast Depletion**: Core staples (Harvest Gold Bread & Farm Fresh Eggs) hit 0-cover because delivery truck PO #8412 broke down for 4.5 hours while morning demand spiked to 3.4x baseline.

**Recommended Actions:**
- **Replenishment**: Dispatch 35 loaves emergency courier transfer from Indiranagar hub.
- **Markdown**: Push 40% clearance discount to Electronic Shelf Labels immediately.
- **Wastage Fix**: Dampen auto-PO replenishment logic with 48h weather forecasts.
- **Task**: CoolTech HVAC dispatch under 2h SLA.`,
        providerUsed: 'fallback',
        model: 'grocerAI-decision-kernel-v2',
        suggestedActions: [
          'Approve 40% Flash Markdown',
          'Dispatch Indiranagar stock transfer',
          'Check Chiller 2 IoT telemetry'
        ]
      }
    }

    if (p.includes('chiller') || p.includes('temp') || p.includes('temperature') || p.includes('cold')) {
      return {
        answer: `**Chiller Unit 2 Thermal Incident Analysis:**
- **IoT Telemetry**: Sensor #CH-2 logged a continuous thermal rise peaking at **+6.8°C (baseline: +2.0°C)** across a 140-minute window.
- **Root Cause Synthesis**: Physical floor inspection discovered the magnetic latch failed to seal shut, coupled with heavy evaporator coil frost obstructing thermal circulation.
- **Shrinkage Link**: A spot audit of Dairy Bay 2 revealed an 18-unit inventory discrepancy due to unrecorded spoiled stock discarded during the shift.
- **Resolution**: Automated technician dispatch logged with CoolTech HVAC under contract SLA. Emergency transfer of surviving perishables to Chiller Unit 1 completed.`,
        providerUsed: 'fallback',
        model: 'grocerAI-decision-kernel-v2',
        suggestedActions: [
          'Verify Chiller 1 load capacity',
          'Confirm CoolTech technician ETA',
          'Recalibrate magnetic door buzzer'
        ]
      }
    }

    if (p.includes('waste') || p.includes('spoilage') || p.includes('expiry') || p.includes('reduce')) {
      return {
        answer: `**Network Wastage Optimization Strategy:**
- **Current Metric**: Network wastage is currently running at **3.12% of sales** (₹42,680 at risk across 12 product lines).
- **Primary Spoilage Vectors**: Short-shelf-life dairy (Amul Milk, Malai Paneer) and bakery staples represent 74% of total spoilage value.
- **Key Levers to Cut Spoilage by 25%:**
  1. **Dynamic T-18h Price Decay**: Auto-trigger 35% markdowns when sell-through velocity drops below 60% of forecast at T-18 hours.
  2. **Inter-Store Load Balancing**: Automatically balance excess stock from Whitefield to high-velocity Koramangala stores via morning transit shuttles.
  3. **Weather Dampened Procurement**: Connect meteorological rain radar feeds directly into supplier PO generation to cut order volume by 20–35% ahead of forecasted storm days.`,
        providerUsed: 'fallback',
        model: 'grocerAI-decision-kernel-v2',
        suggestedActions: [
          'Review 14-day wastage trend chart',
          'Enable weather-dampened ordering',
          'Automate T-18h ESL price decay'
        ]
      }
    }

    return {
      answer: `**GrocerAI Real-Time Network Status Summary:**
- **Stores Monitored**: 5 active locations across Bengaluru.
- **Urgency Distribution**:
  - **Tier 1 (Immediate Action)**: Whitefield Hypermarket (Urgency 88) — ₹28,400 daily margin exposure.
  - **Tier 2 (Watchlist)**: Koramangala (Urgency 66), Malleshwaram (Urgency 54).
  - **Tier 3 (Healthy)**: Jayanagar (Urgency 24), Indiranagar (Urgency 16).
- **Active Interventions**: 1 flash markdown awaiting manager authorization, 1 HVAC dispatch in progress, 1 inter-store transfer route calculated.`,
      providerUsed: 'fallback',
      model: 'grocerAI-decision-kernel-v2',
      suggestedActions: [
        'Open Whitefield store action plan',
        'Inspect network wastage trends',
        'View central inventory thresholds'
      ]
    }
  }

  // Shopping Fallback
  return {
    answer: `Here are today's top fresh deals and curated grocery bundles:
- **Chef's Fresh Paneer Makhani Bundle**: Fresh Paneer (200g, ₹95) + Hybrid Tomatoes (1kg, ₹34) + Amul Salted Butter (100g, ₹58) = **₹187 total**.
- **Healthy High-Protein Breakfast**: Farm Fresh Eggs (6 pcs, ₹52) + Harvest Gold Whole Wheat Bread (400g, ₹45) + Amul Taaza Milk (500ml, ₹28) = **₹125 total**.
All items in stock at Indiranagar with 18-minute rapid dispatch!`,
    providerUsed: 'fallback',
    model: 'grocerAI-decision-kernel-v2',
    suggestedActions: [
      'Add Paneer Makhani bundle to cart',
      'Show 15% off produce deals',
      'View breakfast staples'
    ]
  }
}
