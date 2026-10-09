export type UrgencyTier = 'Tier 1: Immediate Intervention' | 'Tier 2: Watchlist & Risk Emerging' | 'Tier 3: Operational Benchmark'

export type StoreUrgencyRanking = {
  rank: number
  storeId: string
  name: string
  city: string
  urgencyScore: number // 0-100
  tier: UrgencyTier
  primaryIssue: string
  expiryRiskValue: number
  stockoutSkus: number
  shrinkageAnomaly: string
  rosterGap: string
  estimatedDailyMarginLoss: number
  lat: number
  lng: number
}

export const headOfficeStoreRankings: StoreUrgencyRanking[] = [
  {
    rank: 1,
    storeId: 'whitefield',
    name: 'Whitefield',
    city: 'Bengaluru East',
    urgencyScore: 88,
    tier: 'Tier 1: Immediate Intervention',
    primaryIssue: 'Perishables expiry hazard + high-velocity bread stockout + freezer breach',
    expiryRiskValue: 5457,
    stockoutSkus: 14,
    shrinkageAnomaly: '+6.2°C thermal breach on Chiller 2',
    rosterGap: '3 of 11 associates absent/late',
    estimatedDailyMarginLoss: 38400,
    lat: 12.9698,
    lng: 77.75,
  },
  {
    rank: 2,
    storeId: 'koramangala',
    name: 'Koramangala',
    city: 'Bengaluru South',
    urgencyScore: 66,
    tier: 'Tier 2: Watchlist & Risk Emerging',
    primaryIssue: 'Elevated dairy waste + delayed vendor morning PO',
    expiryRiskValue: 3400,
    stockoutSkus: 6,
    shrinkageAnomaly: '12-unit POS scan variance on butter',
    rosterGap: '2 of 12 associates on break simultaneously',
    estimatedDailyMarginLoss: 16200,
    lat: 12.9352,
    lng: 77.6245,
  },
  {
    rank: 3,
    storeId: 'malleshwaram',
    name: 'Malleshwaram',
    city: 'Bengaluru North',
    urgencyScore: 54,
    tier: 'Tier 2: Watchlist & Risk Emerging',
    primaryIssue: 'Soft evening footfall + near-expiry frozen nuggets',
    expiryRiskValue: 2750,
    stockoutSkus: 8,
    shrinkageAnomaly: 'Slow freezer turnover',
    rosterGap: 'Full roster, 1 supervisor late',
    estimatedDailyMarginLoss: 12800,
    lat: 13.0035,
    lng: 77.5709,
  },
  {
    rank: 4,
    storeId: 'jayanagar',
    name: 'Jayanagar',
    city: 'Bengaluru South',
    urgencyScore: 24,
    tier: 'Tier 3: Operational Benchmark',
    primaryIssue: 'Perishable greens trim waste at evening close',
    expiryRiskValue: 820,
    stockoutSkus: 3,
    shrinkageAnomaly: 'Nominal (<0.5%)',
    rosterGap: '100% attendance',
    estimatedDailyMarginLoss: 3200,
    lat: 12.925,
    lng: 77.5938,
  },
  {
    rank: 5,
    storeId: 'indiranagar',
    name: 'Indiranagar',
    city: 'Bengaluru East',
    urgencyScore: 16,
    tier: 'Tier 3: Operational Benchmark',
    primaryIssue: 'High sales velocity, minor stock buffer depletion',
    expiryRiskValue: 640,
    stockoutSkus: 2,
    shrinkageAnomaly: 'Zero discrepancy',
    rosterGap: 'Full 12/12 roster active',
    estimatedDailyMarginLoss: 1800,
    lat: 12.9784,
    lng: 77.6408,
  },
]

export type ConnectedProblem = {
  id: string
  title: string
  problemType: 'Imminent Expiry Spoilage' | 'Fast-Mover Stockout Delay' | 'Thermal Breach & Shrinkage'
  severity: 'Critical' | 'High' | 'Medium'
  timeWindow: string
  affectedItems: string
  atRiskValue: number

  // Signal connection (NOT just a KPI list!)
  signals: {
    domain: string
    signalText: string
    severityScore: string
  }[]
  causalSynthesis: string

  // Recommended actions across all 4 categories
  actions: {
    replenishment: string
    markdown: string
    wastageFix: string
    taskOrEscalation: string
  }

  // Interactive simulated action specification
  simulation: {
    actionTitle: string
    actionType: 'markdown' | 'replenishment' | 'maintenance'
    proposedIntervention: string
    originalCost: number
    projectedRecoveryValue: number
    recoveryPercent: number
    expectedClearanceHours: number
    clearanceProbability: number
    nearbyShoppersTargeted: number
    shelfLabelUpdateMode: string
  }
}

export const storeOperationalDiagnosis: Record<string, {
  storeName: string
  todaySummary: string
  actionPriorities: ConnectedProblem[]
}> = {
  Whitefield: {
    storeName: 'Whitefield',
    todaySummary: '3 critical operational failures active. Prioritize T-6h milk markdown before midday peak, authorize inter-store bread transfer from Indiranagar, and inspect Walk-in Chiller Unit 2.',
    actionPriorities: [
      {
        id: 'prob-1-expiry',
        title: 'Imminent Expiry Hazard: 48 Units of Milk Stranded',
        problemType: 'Imminent Expiry Spoilage',
        severity: 'Critical',
        timeWindow: 'T-6 Hours (Expires Today 6:00 PM)',
        affectedItems: 'Amul Taaza Milk 500ml · 48 units',
        atRiskValue: 2016,
        signals: [
          {
            domain: 'Procurement Signal',
            signalText: 'Friday bulk order volume was set +40% above historical baseline by automated replenishment.',
            severityScore: 'High (+40% SKU Inflow)',
          },
          {
            domain: 'Weather & Footfall Signal',
            signalText: 'Unseasonal heavy rain on Sunday afternoon triggered a 32% drop in walk-in store visitors.',
            severityScore: '-32% Store Footfall',
          },
          {
            domain: 'Algorithm Execution Signal',
            signalText: 'Dynamic markdown rule failed to trigger at T-24h due to an unconfigured regional margin floor threshold.',
            severityScore: 'Rule Trigger Skipped',
          },
        ],
        causalSynthesis:
          'A +40% procurement spike collided with a 32% rainfall footfall drop on Sunday. Because the automated markdown engine skipped the T-24h clearance step, 48 units aged past the safe buffer into the critical 6-hour expiry window without organic velocity.',
        actions: {
          replenishment: 'Freeze upcoming Tuesday AM dairy replenishment PO #9012 by 35% to prevent stack-up.',
          markdown: 'Apply 40% clearance markdown (₹42 → ₹25) on shelf tags and app deal feed.',
          wastageFix: 'Recalibrate local replenishment algorithm to incorporate 48-hour localized weather forecast dampening.',
          taskOrEscalation: 'Assign Associate Rajesh to apply yellow discount collar tags to Dairy Rack 3 immediately.',
        },
        simulation: {
          actionTitle: 'Simulate 40% Clearance Markdown on 48 Milk Units',
          actionType: 'markdown',
          proposedIntervention: 'Drop price from ₹42 to ₹25. Broadcast flash deal to 380 active mobile shoppers within 1.5 km.',
          originalCost: 2016,
          projectedRecoveryValue: 1200,
          recoveryPercent: 59.5,
          expectedClearanceHours: 2.8,
          clearanceProbability: 94,
          nearbyShoppersTargeted: 380,
          shelfLabelUpdateMode: 'Instant ESL wireless sync & POS override',
        },
      },
      {
        id: 'prob-2-stockout',
        title: 'Core Breakfast Stockout: Bread Depleted with PO Delayed',
        problemType: 'Fast-Mover Stockout Delay',
        severity: 'Critical',
        timeWindow: 'Active Now (0 Days of Cover)',
        affectedItems: 'Harvest Gold White Bread 400g & Farm Eggs 12-Pack',
        atRiskValue: 4200,
        signals: [
          {
            domain: 'Vendor Logistics Signal',
            signalText: 'Vendor PO #8412 truck experienced mechanical breakdown at Hoskote depot, causing a 4.5-hour delivery delay.',
            severityScore: '4.5h Dispatch Delay',
          },
          {
            domain: 'Hourly Velocity Signal',
            signalText: 'Peak breakfast rush (08:00 - 09:30 AM) registered 3.4x regular demand velocity across IT-corridor households.',
            severityScore: '3.4x Velocity Surge',
          },
          {
            domain: 'Staffing Coverage Signal',
            signalText: 'Morning roster short by 3 associates (72% coverage); backroom staging was not pre-sorted before opening.',
            severityScore: '28% Labor Shortage',
          },
        ],
        causalSynthesis:
          'A 4.5-hour vendor delivery breakdown coincided with a 3.4x morning demand rush. Because morning associate coverage dropped to 72%, backroom safety reserves were depleted within 45 minutes, creating zero days of cover and leaking ₹4,200/hr in lost grocery baskets.',
        actions: {
          replenishment: 'Authorize emergency dispatch of 35 bread loaves from Indiranagar hub via intra-city express courier.',
          markdown: 'Temporarily boost visibility of premium Sourdough and Multigrain alternatives with 10% bundle tag.',
          wastageFix: 'Mandate 1-day safety buffer on top-3 breakfast SKUs at highway transit stores.',
          taskOrEscalation: 'Issue vendor breach notice to Harvest Gold regional logistics manager and log SLA violation.',
        },
        simulation: {
          actionTitle: 'Simulate Emergency Inter-Store Transfer from Indiranagar Hub',
          actionType: 'replenishment',
          proposedIntervention: 'Transfer 35 bread units from Indiranagar (excess cover: 2.4 days) via 18-minute courier transit.',
          originalCost: 1575,
          projectedRecoveryValue: 3950,
          recoveryPercent: 250.7,
          expectedClearanceHours: 1.5,
          clearanceProbability: 98,
          nearbyShoppersTargeted: 240,
          shelfLabelUpdateMode: 'Automatic inventory allocation transfer in POS',
        },
      },
      {
        id: 'prob-3-chiller',
        title: 'Chiller Unit 2 Thermal Breach: Condensation & Soft-Waste Risk',
        problemType: 'Thermal Breach & Shrinkage',
        severity: 'High',
        timeWindow: 'Discovered at 06:15 AM Opening Audit',
        affectedItems: 'Yummiez Veg Nuggets & Frozen Peas · 146 units',
        atRiskValue: 5840,
        signals: [
          {
            domain: 'IoT Cold Chain Sensor',
            signalText: 'Temperature sensor #CH-2 logged thermal spike to +6.8°C (norm: < -18°C) for 140 minutes between 03:10 AM and 05:30 AM.',
            severityScore: '+24.8°C Delta Breach',
          },
          {
            domain: 'Store Facility Physical Audit',
            signalText: 'Morning manager noted magnetic door seal gasket was unlatched and ice defrost coils had iced over.',
            severityScore: 'Physical Gasket Fault',
          },
          {
            domain: 'Audit Shrinkage Variance',
            signalText: 'Cycle audit identified 18 units missing/scanned incorrectly over the weekend shift transition.',
            severityScore: '18 Units Unreconciled',
          },
        ],
        causalSynthesis:
          'A faulty magnetic door gasket allowed warm ambient air into Chiller 2, causing compressor defrost failure (+6.8°C breach for 140 min). The resulting condensation softened cardboard packaging across 146 frozen units, creating immediate spoilage risk.',
        actions: {
          replenishment: 'Hold frozen shipment delivery until technician certifies temperature stability below -18°C.',
          markdown: 'Perform quality inspection: apply 25% instant clearance on intact items with cosmetic box softening.',
          wastageFix: 'Replace silicone magnetic door gasket and install automated audible high-temp alarm buzzer.',
          taskOrEscalation: 'Dispatch HVAC maintenance contractor (Vendor: CoolTech, SLA: 2 hours) and escalate facility ticket #FAC-441.',
        },
        simulation: {
          actionTitle: 'Simulate Rapid Product Inspection & 25% Flash Clearance',
          actionType: 'maintenance',
          proposedIntervention: 'Inspect core temperature of all 146 units. Separate safe stock (120 units) for 25% markdown; write off 26 damaged units.',
          originalCost: 5840,
          projectedRecoveryValue: 3600,
          recoveryPercent: 61.6,
          expectedClearanceHours: 4.0,
          clearanceProbability: 88,
          nearbyShoppersTargeted: 510,
          shelfLabelUpdateMode: 'Technician dispatch #FAC-441 triggered + POS clearance override',
        },
      },
    ],
  },
  Koramangala: {
    storeName: 'Koramangala',
    todaySummary: 'Elevated dairy waste trending up 38%. Harvest Gold Bread at near-expiry requires proactive clearance, and morning replenishment PO needs expedited tracking.',
    actionPriorities: [
      {
        id: 'kora-prob-1',
        title: 'Dairy Short-Dated Buffer: 32 Loaves & 18 Butter Packs',
        problemType: 'Imminent Expiry Spoilage',
        severity: 'High',
        timeWindow: 'T-18 Hours (Expires Tomorrow Morning)',
        affectedItems: 'Harvest Gold Bread (32 units) & Amul Butter 500g (18 units)',
        atRiskValue: 5890,
        signals: [
          {
            domain: 'Procurement Signal',
            signalText: 'Standing reorder was configured for Friday delivery without factoring in long-weekend holiday departures.',
            severityScore: '+25% Over-allocated',
          },
          {
            domain: 'Neighborhood Demographics',
            signalText: '30% student/tech apartment vacancy over holiday weekend dampened dairy consumption.',
            severityScore: '-22% Student Footfall',
          },
          {
            domain: 'POS Scan Variance',
            signalText: '12-unit scan discrepancy identified on butter inventory during Sunday closing tally.',
            severityScore: 'Inventory Mismatch',
          },
        ],
        causalSynthesis:
          'Static Friday automated orders failed to account for student holiday departures in Koramangala, leaving 32 loaves and 18 butter packs moving at half standard velocity. Inventory discrepancy further obscured stock age until morning audit.',
        actions: {
          replenishment: 'Reduce Friday standing reorder by 25% during holiday weeks.',
          markdown: 'Bundle Harvest Gold Bread with Amul Butter for instant ₹30 breakfast pairing discount.',
          wastageFix: 'Switch dairy replenishment to dynamic student-calendar adjusted demand forecasting.',
          taskOrEscalation: 'Assign Associate Sneha to conduct 10-minute cycle count on Dairy Bay 2.',
        },
        simulation: {
          actionTitle: 'Simulate Breakfast Pairing Bundle Markdown (Save ₹30)',
          actionType: 'markdown',
          proposedIntervention: 'Bundle Bread + Butter at ₹280 (₹30 discount) to liquidate stock before tomorrow 10 AM.',
          originalCost: 5890,
          projectedRecoveryValue: 4950,
          recoveryPercent: 84.0,
          expectedClearanceHours: 4.2,
          clearanceProbability: 92,
          nearbyShoppersTargeted: 410,
          shelfLabelUpdateMode: 'Combo POS promotion published',
        },
      },
    ],
  },
}
