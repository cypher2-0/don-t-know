import { customerProducts, stores, expiringProducts } from '@/lib/mock-data'
import { generateCopilotResponse } from '@/lib/ai-provider'

export interface UserEvent {
  id: string
  timestamp: string
  type: 'CART_ADD' | 'CART_REMOVE' | 'ORDER_PLACED' | 'BARCODE_SCAN' | 'SEARCH' | 'STORE_SWITCH'
  storeName: string
  productName?: string
  quantity?: number
  orderId?: string
  orderTotal?: number
  details: string
}

export interface DemandVelocity {
  productName: string
  storeName: string
  currentVelocityPerHour: number
  baselineVelocityPerHour: number
  velocityRatio: number
  unitsRemaining: number
  estimatedHoursToStockout: number
  riskLevel: 'CRITICAL' | 'WARNING' | 'HEALTHY'
}

export interface BackendAiAlert {
  id: string
  timestamp: string
  severity: 'CRITICAL' | 'WARNING' | 'OPPORTUNITY'
  title: string
  connectedCause: string
  recommendedAction: string
  storeName: string
  actionType: 'REPLENISHMENT' | 'MARKDOWN' | 'LOGISTICS' | 'STAFF'
  status: 'PENDING' | 'EXECUTED'
}

// In-memory persistent state across requests in Node server process
class BackendIntelligenceStore {
  private events: UserEvent[] = [
    {
      id: 'evt-init-1',
      timestamp: new Date(Date.now() - 1000 * 60 * 12).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'ORDER_PLACED',
      storeName: 'GreenBasket Indiranagar',
      productName: 'Amul Taaza Milk',
      quantity: 2,
      orderId: '#GB-2498',
      orderTotal: 251,
      details: 'Customer checkout: 2x Amul Milk, 1x Fresh Paneer'
    },
    {
      id: 'evt-init-2',
      timestamp: new Date(Date.now() - 1000 * 60 * 8).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'CART_ADD',
      storeName: 'GreenBasket Indiranagar',
      productName: 'Fresh Paneer',
      quantity: 1,
      details: 'Added 1x Fresh Paneer via Chef Makhani meal plan'
    },
    {
      id: 'evt-init-3',
      timestamp: new Date(Date.now() - 1000 * 60 * 4).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'BARCODE_SCAN',
      storeName: 'Whitefield Hypermarket',
      productName: 'Harvest Gold Bread',
      quantity: 1,
      details: 'In-store customer Scan & Go self-checkout attempt'
    }
  ]

  private stockLevels: Record<string, number> = {
    'Amul Taaza Milk': 42,
    'Fresh Paneer': 19,
    'Amul Salted Butter': 24,
    'Harvest Gold Bread': 6,
    'Farm Fresh Eggs': 4,
    'Organic Bananas': 38,
    'Hybrid Tomatoes': 45,
    'Aashirvaad Atta': 16,
  }

  private alerts: BackendAiAlert[] = [
    {
      id: 'alert-1',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      severity: 'CRITICAL',
      title: 'Real-Time Demand Spike Outpacing Inventory',
      storeName: 'Whitefield Hypermarket',
      connectedCause: 'Real customer app cart additions for Bread & Eggs hit 3.4x morning velocity while vendor logistics vehicle PO #8412 is delayed 4.5 hours.',
      recommendedAction: 'Dispatch emergency 35-unit bread courier transfer from Indiranagar and allocate 2 associates to fast-track checkouts.',
      actionType: 'REPLENISHMENT',
      status: 'PENDING'
    }
  ]

  // Add event from user app
  public recordEvent(event: Omit<UserEvent, 'id' | 'timestamp'>): UserEvent {
    const newEvent: UserEvent = {
      ...event,
      id: `evt-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    }

    this.events.unshift(newEvent)
    if (this.events.length > 50) this.events.pop()

    // Deduct stock if order placed or cart added
    if (event.productName && event.quantity) {
      const current = this.stockLevels[event.productName] ?? 20
      if (event.type === 'ORDER_PLACED') {
        this.stockLevels[event.productName] = Math.max(0, current - event.quantity)
      }
    }

    this.recomputeIntelligence(newEvent)
    return newEvent
  }

  // Calculate live demand velocities
  public getDemandVelocities(): DemandVelocity[] {
    const productNames = Object.keys(this.stockLevels)
    return productNames.map((pName) => {
      // Calculate velocity based on recent events
      const recentAdds = this.events.filter(
        (e) => e.productName === pName && (e.type === 'CART_ADD' || e.type === 'ORDER_PLACED')
      )
      const count = recentAdds.reduce((sum, e) => sum + (e.quantity || 1), 0)
      const currentVel = Math.max(1.2, count * 2.5 + (pName.includes('Milk') ? 4.2 : pName.includes('Bread') ? 3.8 : 1.5))
      const baselineVel = pName.includes('Milk') ? 2.5 : pName.includes('Bread') ? 1.8 : 1.2
      const ratio = Number((currentVel / baselineVel).toFixed(2))
      const stock = this.stockLevels[pName] ?? 15
      const hoursToStockout = Number((stock / currentVel).toFixed(1))

      return {
        productName: pName,
        storeName: 'GreenBasket Indiranagar',
        currentVelocityPerHour: currentVel,
        baselineVelocityPerHour: baselineVel,
        velocityRatio: ratio,
        unitsRemaining: stock,
        estimatedHoursToStockout: hoursToStockout,
        riskLevel: hoursToStockout <= 2 ? 'CRITICAL' : hoursToStockout <= 5 ? 'WARNING' : 'HEALTHY'
      }
    })
  }

  public getEvents(): UserEvent[] {
    return this.events
  }

  public getAlerts(): BackendAiAlert[] {
    return this.alerts
  }

  public getStockLevels(): Record<string, number> {
    return this.stockLevels
  }

  // Recomputes live alerts based on new real user actions
  private recomputeIntelligence(latestEvent: UserEvent) {
    if (latestEvent.type === 'ORDER_PLACED' && latestEvent.orderTotal && latestEvent.orderTotal > 400) {
      this.alerts.unshift({
        id: `alert-${Date.now()}`,
        timestamp: latestEvent.timestamp,
        severity: 'OPPORTUNITY',
        title: `High-Basket Customer Order (${latestEvent.orderId}) Processed`,
        storeName: latestEvent.storeName,
        connectedCause: `User app placed high-value order of ₹${latestEvent.orderTotal}. Cross-sell bundle (Dairy + Staples) successfully converted without margin decay.`,
        recommendedAction: 'Trigger automated rapid delivery dispatch slot and log positive basket margin lift.',
        actionType: 'LOGISTICS',
        status: 'EXECUTED'
      })
    }

    if (latestEvent.productName && (latestEvent.productName.includes('Bread') || latestEvent.productName.includes('Eggs'))) {
      const remaining = this.stockLevels[latestEvent.productName] ?? 5
      if (remaining <= 5) {
        this.alerts.unshift({
          id: `alert-${Date.now()}`,
          timestamp: latestEvent.timestamp,
          severity: 'CRITICAL',
          title: `Real-Time Stockout Risk: ${latestEvent.productName} (<${remaining} units left)`,
          storeName: latestEvent.storeName,
          connectedCause: `Consecutive customer app checkout actions depleted shelf stock to ${remaining} units. At current velocity of 3.8 units/hr, shelf will be empty in 1.3 hours.`,
          recommendedAction: 'Trigger automated stock transfer order from Indiranagar regional warehouse.',
          actionType: 'REPLENISHMENT',
          status: 'PENDING'
        })
      }
    }

    if (this.alerts.length > 20) this.alerts.pop()
  }

  // Deep AI Synthesis leveraging real user actions
  public async generateDeepAiAnalysis(customPrompt?: string): Promise<string> {
    const velocities = this.getDemandVelocities()
    const criticalItems = velocities.filter((v) => v.riskLevel === 'CRITICAL')
    const recentOrders = this.events.filter((e) => e.type === 'ORDER_PLACED')

    const promptContext = `CURRENT REAL USER APP ACTIVITY:
- Recent events logged from customer app: ${this.events.length} events
- Recent customer checkouts: ${recentOrders.length} completed orders
- Critical SKUs near stockout due to user purchases: ${criticalItems.map((c) => `${c.productName} (${c.unitsRemaining} units left, ${c.estimatedHoursToStockout}h to 0)`).join(', ')}
- Current stock levels: ${JSON.stringify(this.stockLevels)}

PROMPT: ${customPrompt || 'Analyze real customer purchase velocity and synthesize automated operational interventions.'}`

    const res = await generateCopilotResponse({
      prompt: promptContext,
      contextType: 'operations'
    })

    return res.answer
  }
}

// Global singleton instance
export const backendIntelligence = new BackendIntelligenceStore()
