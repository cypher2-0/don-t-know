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
  managerName: string
  managerPhone: string
}

export const headOfficeStoreRankings: StoreUrgencyRanking[] = [
  {
    "rank": 1,
    "storeId": "fb-17",
    "name": "Marathahalli",
    "city": "Bengaluru",
    "urgencyScore": 55,
    "tier": "Tier 2: Watchlist & Risk Emerging",
    "primaryIssue": "13 SKUs below reorder level (Pav, Croissant) + ₹656/day waste",
    "expiryRiskValue": 4918,
    "stockoutSkus": 13,
    "shrinkageAnomaly": "6 delayed inbound POs",
    "rosterGap": "96% staff attendance ratio",
    "estimatedDailyMarginLoss": 31568,
    "lat": 12.9591,
    "lng": 77.6974,
    "managerName": "Arjun Nambiar",
    "managerPhone": "+91 98450 21456"
  },
  {
    "rank": 2,
    "storeId": "fb-08",
    "name": "Indiranagar",
    "city": "Bengaluru",
    "urgencyScore": 40,
    "tier": "Tier 2: Watchlist & Risk Emerging",
    "primaryIssue": "Elevated perishable waste (₹101935 total) + 0 delayed inbound POs",
    "expiryRiskValue": 12742,
    "stockoutSkus": 1,
    "shrinkageAnomaly": "1 open compliance items",
    "rosterGap": "98% staff attendance ratio",
    "estimatedDailyMarginLoss": 3628,
    "lat": 12.9784,
    "lng": 77.6408,
    "managerName": "Priya Sharma",
    "managerPhone": "+91 98861 88321"
  },
  {
    "rank": 3,
    "storeId": "fb-13",
    "name": "RT Nagar",
    "city": "Bengaluru",
    "urgencyScore": 35,
    "tier": "Tier 3: Operational Benchmark",
    "primaryIssue": "Elevated perishable waste (₹79770 total) + 0 delayed inbound POs",
    "expiryRiskValue": 9971,
    "stockoutSkus": 0,
    "shrinkageAnomaly": "1 open compliance items",
    "rosterGap": "99% staff attendance ratio",
    "estimatedDailyMarginLoss": 1861,
    "lat": 13.0185,
    "lng": 77.5956,
    "managerName": "Karthik Rao",
    "managerPhone": "+91 94480 33129"
  },
  {
    "rank": 4,
    "storeId": "fb-22",
    "name": "Hennur",
    "city": "Bengaluru",
    "urgencyScore": 35,
    "tier": "Tier 3: Operational Benchmark",
    "primaryIssue": "Elevated perishable waste (₹77820 total) + 0 delayed inbound POs",
    "expiryRiskValue": 9728,
    "stockoutSkus": 0,
    "shrinkageAnomaly": "1 open compliance items",
    "rosterGap": "99% staff attendance ratio",
    "estimatedDailyMarginLoss": 1816,
    "lat": 13.0258,
    "lng": 77.6366,
    "managerName": "Deepa Hegde",
    "managerPhone": "+91 97412 55904"
  },
  {
    "rank": 5,
    "storeId": "fb-21",
    "name": "Nagarbhavi",
    "city": "Bengaluru",
    "urgencyScore": 32,
    "tier": "Tier 3: Operational Benchmark",
    "primaryIssue": "Elevated perishable waste (₹50125 total) + 0 delayed inbound POs",
    "expiryRiskValue": 6266,
    "stockoutSkus": 2,
    "shrinkageAnomaly": "5 open compliance items",
    "rosterGap": "98% staff attendance ratio",
    "estimatedDailyMarginLoss": 3670,
    "lat": 12.9555,
    "lng": 77.5126,
    "managerName": "Sanjay Verma",
    "managerPhone": "+91 99001 77218"
  },
  {
    "rank": 6,
    "storeId": "fb-02",
    "name": "BTM Layout",
    "city": "Bengaluru",
    "urgencyScore": 30,
    "tier": "Tier 3: Operational Benchmark",
    "primaryIssue": "Elevated perishable waste (₹65560 total) + 0 delayed inbound POs",
    "expiryRiskValue": 8195,
    "stockoutSkus": 1,
    "shrinkageAnomaly": "1 open compliance items",
    "rosterGap": "97% staff attendance ratio",
    "estimatedDailyMarginLoss": 2780,
    "lat": 12.9166,
    "lng": 77.6101,
    "managerName": "Rohan Joshi",
    "managerPhone": "+91 98455 12890"
  },
  {
    "rank": 7,
    "storeId": "fb-12",
    "name": "Vijayanagar",
    "city": "Bengaluru",
    "urgencyScore": 30,
    "tier": "Tier 3: Operational Benchmark",
    "primaryIssue": "Elevated perishable waste (₹60935 total) + 0 delayed inbound POs",
    "expiryRiskValue": 7617,
    "stockoutSkus": 1,
    "shrinkageAnomaly": "0 open compliance items",
    "rosterGap": "92% staff attendance ratio",
    "estimatedDailyMarginLoss": 2672,
    "lat": 12.9719,
    "lng": 77.5306,
    "managerName": "Sneha Patel",
    "managerPhone": "+91 98801 33452"
  },
  {
    "rank": 8,
    "storeId": "fb-16",
    "name": "Whitefield",
    "city": "Bengaluru",
    "urgencyScore": 29,
    "tier": "Tier 3: Operational Benchmark",
    "primaryIssue": "Elevated perishable waste (₹61165 total) + 0 delayed inbound POs",
    "expiryRiskValue": 7646,
    "stockoutSkus": 1,
    "shrinkageAnomaly": "0 open compliance items",
    "rosterGap": "98% staff attendance ratio",
    "estimatedDailyMarginLoss": 2677,
    "lat": 12.9698,
    "lng": 77.75,
    "managerName": "Vikram Singh",
    "managerPhone": "+91 94490 88219"
  },
  {
    "rank": 9,
    "storeId": "fb-19",
    "name": "Electronic City",
    "city": "Bengaluru",
    "urgencyScore": 29,
    "tier": "Tier 3: Operational Benchmark",
    "primaryIssue": "Elevated perishable waste (₹54715 total) + 0 delayed inbound POs",
    "expiryRiskValue": 6839,
    "stockoutSkus": 2,
    "shrinkageAnomaly": "1 open compliance items",
    "rosterGap": "99% staff attendance ratio",
    "estimatedDailyMarginLoss": 3777,
    "lat": 12.8452,
    "lng": 77.6602,
    "managerName": "Arjun Nambiar",
    "managerPhone": "+91 98450 21456"
  },
  {
    "rank": 10,
    "storeId": "fb-03",
    "name": "Banashankari",
    "city": "Bengaluru",
    "urgencyScore": 26,
    "tier": "Tier 3: Operational Benchmark",
    "primaryIssue": "Nominal operations; 0 minor inspection notes",
    "expiryRiskValue": 4676,
    "stockoutSkus": 5,
    "shrinkageAnomaly": "0 open compliance items",
    "rosterGap": "96% staff attendance ratio",
    "estimatedDailyMarginLoss": 7123,
    "lat": 12.9255,
    "lng": 77.5468,
    "managerName": "Priya Sharma",
    "managerPhone": "+91 98861 88321"
  },
  {
    "rank": 11,
    "storeId": "fb-23",
    "name": "Kalyan Nagar",
    "city": "Bengaluru",
    "urgencyScore": 26,
    "tier": "Tier 3: Operational Benchmark",
    "primaryIssue": "Elevated perishable waste (₹50795 total) + 0 delayed inbound POs",
    "expiryRiskValue": 6349,
    "stockoutSkus": 1,
    "shrinkageAnomaly": "1 open compliance items",
    "rosterGap": "99% staff attendance ratio",
    "estimatedDailyMarginLoss": 2435,
    "lat": 13.028,
    "lng": 77.6425,
    "managerName": "Karthik Rao",
    "managerPhone": "+91 94480 33129"
  },
  {
    "rank": 12,
    "storeId": "fb-25",
    "name": "Ulsoor",
    "city": "Bengaluru",
    "urgencyScore": 26,
    "tier": "Tier 3: Operational Benchmark",
    "primaryIssue": "Nominal operations; 0 minor inspection notes",
    "expiryRiskValue": 6098,
    "stockoutSkus": 2,
    "shrinkageAnomaly": "0 open compliance items",
    "rosterGap": "97% staff attendance ratio",
    "estimatedDailyMarginLoss": 3638,
    "lat": 12.9817,
    "lng": 77.6285,
    "managerName": "Deepa Hegde",
    "managerPhone": "+91 97412 55904"
  },
  {
    "rank": 13,
    "storeId": "fb-04",
    "name": "Basavanagudi",
    "city": "Bengaluru",
    "urgencyScore": 25,
    "tier": "Tier 3: Operational Benchmark",
    "primaryIssue": "Nominal operations; 0 minor inspection notes",
    "expiryRiskValue": 5981,
    "stockoutSkus": 1,
    "shrinkageAnomaly": "0 open compliance items",
    "rosterGap": "99% staff attendance ratio",
    "estimatedDailyMarginLoss": 2367,
    "lat": 12.9422,
    "lng": 77.5756,
    "managerName": "Sanjay Verma",
    "managerPhone": "+91 99001 77218"
  },
  {
    "rank": 14,
    "storeId": "fb-11",
    "name": "Rajajinagar",
    "city": "Bengaluru",
    "urgencyScore": 25,
    "tier": "Tier 3: Operational Benchmark",
    "primaryIssue": "Nominal operations; 1 minor inspection notes",
    "expiryRiskValue": 4487,
    "stockoutSkus": 4,
    "shrinkageAnomaly": "1 open compliance items",
    "rosterGap": "97% staff attendance ratio",
    "estimatedDailyMarginLoss": 5838,
    "lat": 12.9915,
    "lng": 77.5521,
    "managerName": "Rohan Joshi",
    "managerPhone": "+91 98455 12890"
  },
  {
    "rank": 15,
    "storeId": "fb-24",
    "name": "Sahakar Nagar",
    "city": "Bengaluru",
    "urgencyScore": 25,
    "tier": "Tier 3: Operational Benchmark",
    "primaryIssue": "Nominal operations; 0 minor inspection notes",
    "expiryRiskValue": 4703,
    "stockoutSkus": 4,
    "shrinkageAnomaly": "0 open compliance items",
    "rosterGap": "97% staff attendance ratio",
    "estimatedDailyMarginLoss": 5878,
    "lat": 13.0624,
    "lng": 77.5907,
    "managerName": "Sneha Patel",
    "managerPhone": "+91 98801 33452"
  },
  {
    "rank": 16,
    "storeId": "fb-01",
    "name": "Jayanagar",
    "city": "Bengaluru",
    "urgencyScore": 24,
    "tier": "Tier 3: Operational Benchmark",
    "primaryIssue": "Nominal operations; 1 minor inspection notes",
    "expiryRiskValue": 4854,
    "stockoutSkus": 3,
    "shrinkageAnomaly": "1 open compliance items",
    "rosterGap": "97% staff attendance ratio",
    "estimatedDailyMarginLoss": 4656,
    "lat": 12.925,
    "lng": 77.5938,
    "managerName": "Vikram Singh",
    "managerPhone": "+91 94490 88219"
  },
  {
    "rank": 17,
    "storeId": "fb-20",
    "name": "Kengeri",
    "city": "Bengaluru",
    "urgencyScore": 24,
    "tier": "Tier 3: Operational Benchmark",
    "primaryIssue": "Nominal operations; 1 minor inspection notes",
    "expiryRiskValue": 5802,
    "stockoutSkus": 1,
    "shrinkageAnomaly": "1 open compliance items",
    "rosterGap": "98% staff attendance ratio",
    "estimatedDailyMarginLoss": 2333,
    "lat": 12.9081,
    "lng": 77.4842,
    "managerName": "Arjun Nambiar",
    "managerPhone": "+91 98450 21456"
  },
  {
    "rank": 18,
    "storeId": "fb-06",
    "name": "Koramangala",
    "city": "Bengaluru",
    "urgencyScore": 23,
    "tier": "Tier 3: Operational Benchmark",
    "primaryIssue": "Nominal operations; 1 minor inspection notes",
    "expiryRiskValue": 5934,
    "stockoutSkus": 1,
    "shrinkageAnomaly": "1 open compliance items",
    "rosterGap": "97% staff attendance ratio",
    "estimatedDailyMarginLoss": 2358,
    "lat": 12.9352,
    "lng": 77.6245,
    "managerName": "Priya Sharma",
    "managerPhone": "+91 98861 88321"
  },
  {
    "rank": 19,
    "storeId": "fb-09",
    "name": "Domlur",
    "city": "Bengaluru",
    "urgencyScore": 23,
    "tier": "Tier 3: Operational Benchmark",
    "primaryIssue": "Nominal operations; 1 minor inspection notes",
    "expiryRiskValue": 4367,
    "stockoutSkus": 4,
    "shrinkageAnomaly": "1 open compliance items",
    "rosterGap": "97% staff attendance ratio",
    "estimatedDailyMarginLoss": 5815,
    "lat": 12.9609,
    "lng": 77.6387,
    "managerName": "Karthik Rao",
    "managerPhone": "+91 94480 33129"
  },
  {
    "rank": 20,
    "storeId": "fb-18",
    "name": "Bellandur",
    "city": "Bengaluru",
    "urgencyScore": 23,
    "tier": "Tier 3: Operational Benchmark",
    "primaryIssue": "Nominal operations; 0 minor inspection notes",
    "expiryRiskValue": 4817,
    "stockoutSkus": 2,
    "shrinkageAnomaly": "0 open compliance items",
    "rosterGap": "97% staff attendance ratio",
    "estimatedDailyMarginLoss": 3399,
    "lat": 12.9279,
    "lng": 77.6771,
    "managerName": "Deepa Hegde",
    "managerPhone": "+91 97412 55904"
  },
  {
    "rank": 21,
    "storeId": "fb-10",
    "name": "Malleshwaram",
    "city": "Bengaluru",
    "urgencyScore": 22,
    "tier": "Tier 3: Operational Benchmark",
    "primaryIssue": "Nominal operations; 1 minor inspection notes",
    "expiryRiskValue": 4919,
    "stockoutSkus": 2,
    "shrinkageAnomaly": "1 open compliance items",
    "rosterGap": "99% staff attendance ratio",
    "estimatedDailyMarginLoss": 3418,
    "lat": 13.0035,
    "lng": 77.5709,
    "managerName": "Sanjay Verma",
    "managerPhone": "+91 99001 77218"
  },
  {
    "rank": 22,
    "storeId": "fb-14",
    "name": "Hebbal",
    "city": "Bengaluru",
    "urgencyScore": 22,
    "tier": "Tier 3: Operational Benchmark",
    "primaryIssue": "Nominal operations; 1 minor inspection notes",
    "expiryRiskValue": 5949,
    "stockoutSkus": 1,
    "shrinkageAnomaly": "1 open compliance items",
    "rosterGap": "98% staff attendance ratio",
    "estimatedDailyMarginLoss": 2360,
    "lat": 13.0358,
    "lng": 77.597,
    "managerName": "Rohan Joshi",
    "managerPhone": "+91 98455 12890"
  },
  {
    "rank": 23,
    "storeId": "fb-07",
    "name": "HSR Layout",
    "city": "Bengaluru",
    "urgencyScore": 21,
    "tier": "Tier 3: Operational Benchmark",
    "primaryIssue": "Nominal operations; 0 minor inspection notes",
    "expiryRiskValue": 4454,
    "stockoutSkus": 3,
    "shrinkageAnomaly": "0 open compliance items",
    "rosterGap": "96% staff attendance ratio",
    "estimatedDailyMarginLoss": 4581,
    "lat": 12.9121,
    "lng": 77.6446,
    "managerName": "Sneha Patel",
    "managerPhone": "+91 98801 33452"
  },
  {
    "rank": 24,
    "storeId": "fb-15",
    "name": "Yelahanka",
    "city": "Bengaluru",
    "urgencyScore": 21,
    "tier": "Tier 3: Operational Benchmark",
    "primaryIssue": "Nominal operations; 0 minor inspection notes",
    "expiryRiskValue": 4436,
    "stockoutSkus": 2,
    "shrinkageAnomaly": "0 open compliance items",
    "rosterGap": "96% staff attendance ratio",
    "estimatedDailyMarginLoss": 3328,
    "lat": 13.1007,
    "lng": 77.5963,
    "managerName": "Vikram Singh",
    "managerPhone": "+91 94490 88219"
  },
  {
    "rank": 25,
    "storeId": "fb-05",
    "name": "JP Nagar",
    "city": "Bengaluru",
    "urgencyScore": 20,
    "tier": "Tier 3: Operational Benchmark",
    "primaryIssue": "Nominal operations; 1 minor inspection notes",
    "expiryRiskValue": 4672,
    "stockoutSkus": 2,
    "shrinkageAnomaly": "1 open compliance items",
    "rosterGap": "99% staff attendance ratio",
    "estimatedDailyMarginLoss": 3372,
    "lat": 12.9063,
    "lng": 77.5857,
    "managerName": "Arjun Nambiar",
    "managerPhone": "+91 98450 21456"
  }
]

export type ConnectedProblem = {
  id: string
  title: string
  problemType: 'Imminent Expiry Spoilage' | 'Fast-Mover Stockout Delay' | 'Thermal Breach & Shrinkage'
  severity: 'Critical' | 'High' | 'Medium'
  timeWindow: string
  affectedItems: string
  atRiskValue: number
  signals: {
    domain: string
    signalText: string
    severityScore: string
  }[]
  causalSynthesis: string
  actions: {
    replenishment: string
    markdown: string
    wastageFix: string
    taskOrEscalation: string
  }
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

// 5-Vector Root Cause Correlation Models
export type VectorType = 'Sales' | 'Footfall' | 'Wastage' | 'Staffing' | 'Deliveries'

export type StoreCorrelationProfile = {
  storeName: string
  overallCorrelationScore: number // 0-100 indicating degree of systemic coupling
  vectors: {
    vector: VectorType
    label: string
    actual: string
    benchmark: string
    divergence: number // e.g. -32 for -32%
    status: 'Severe' | 'Elevated' | 'Healthy'
    evidence: string
    keyMetric: string
  }[]
  correlations: {
    driverVector: VectorType
    impactedVector: VectorType
    correlationCoefficient: number // 0.0 - 1.0
    synthesis: string
  }[]
  causalTimeline: {
    time: string
    vector: VectorType
    event: string
    impactDescription: string
    severity: 'red' | 'amber' | 'blue'
  }[]
}

export const storeCorrelationProfiles: Record<string, StoreCorrelationProfile> = {
  Whitefield: {
    storeName: 'Whitefield',
    overallCorrelationScore: 92,
    vectors: [
      {
        vector: 'Sales',
        label: 'Sales Velocity',
        actual: '₹1,84,000 / day',
        benchmark: '₹2,40,000 target',
        divergence: -23.3,
        status: 'Severe',
        evidence: 'Breakfast rush surged 3.4x but collapsed after 9:30 AM due to empty bread shelves and milk expiry panic.',
        keyMetric: '-₹56,000 Sales Gap',
      },
      {
        vector: 'Footfall',
        label: 'Footfall & Weather',
        actual: '1,280 walk-ins',
        benchmark: '1,880 forecast',
        divergence: -31.9,
        status: 'Severe',
        evidence: 'Sunday unseasonal cloudburst created severe waterlogging on ITPL Main Rd; walk-ins dropped 32%.',
        keyMetric: '-31.9% Traffic Deficit',
      },
      {
        vector: 'Wastage',
        label: 'Wastage & Spoilage',
        actual: '₹5,457 at-risk',
        benchmark: '< ₹1,200 threshold',
        divergence: 354.8,
        status: 'Severe',
        evidence: '48 units Amul milk aging at T-6h; Chiller 2 logged +6.2°C thermal breach softening 146 frozen packets.',
        keyMetric: '3.5x Waste Ceiling',
      },
      {
        vector: 'Staffing',
        label: 'Staffing Coverage',
        actual: '8 / 11 associates',
        benchmark: '11 on active shift',
        divergence: -27.3,
        status: 'Severe',
        evidence: '3 associates absent; backroom inbound staging was unmanaged, delaying shelf replenishment by 3.5 hrs.',
        keyMetric: '72.7% Roster Fill',
      },
      {
        vector: 'Deliveries',
        label: 'Inbound Deliveries',
        actual: '4.5 hrs delayed',
        benchmark: 'On-time (07:00 AM)',
        divergence: -85.0,
        status: 'Severe',
        evidence: 'Harvest Gold bread truck broke down at Hoskote depot. Reached at 11:30 AM instead of 07:00 AM.',
        keyMetric: '+270 min Logistics Delay',
      },
    ],
    correlations: [
      {
        driverVector: 'Deliveries',
        impactedVector: 'Sales',
        correlationCoefficient: 0.94,
        synthesis: 'Vendor truck breakdown directly caused 14 high-velocity breakfast stockouts, triggering ₹4,200/hr lost basket margin.',
      },
      {
        driverVector: 'Footfall',
        impactedVector: 'Wastage',
        correlationCoefficient: 0.88,
        synthesis: 'Unseasonal rain lowered Sunday milk turnover by 32%, turning standing order surplus into an imminent 48-unit T-6h spoilage crisis.',
      },
      {
        driverVector: 'Staffing',
        impactedVector: 'Deliveries',
        correlationCoefficient: 0.82,
        synthesis: '72% associate coverage created a backroom bottleneck; even after delivery arrived, items stayed un-shelved for 75 minutes.',
      },
      {
        driverVector: 'Staffing',
        impactedVector: 'Wastage',
        correlationCoefficient: 0.79,
        synthesis: 'Lack of supervisor floor rounds missed the open Chiller 2 door seal for over 2 hours during shift handoff.',
      },
    ],
    causalTimeline: [
      {
        time: '03:15 AM',
        vector: 'Wastage',
        event: 'Chiller Unit 2 Door Seal Unlatched',
        impactDescription: 'Temp climbs from -18°C to +6.8°C for 140 min; condensation softens 146 frozen packs.',
        severity: 'red',
      },
      {
        time: '06:30 AM',
        vector: 'Staffing',
        event: 'Morning Roll-Call Shortage',
        impactDescription: '3 associates call in sick; 8 on floor leaving backroom staging unmanned.',
        severity: 'amber',
      },
      {
        time: '07:10 AM',
        vector: 'Deliveries',
        event: 'Vendor Truck Mechanical Failure',
        impactDescription: 'PO #8412 bread delivery stranded at Hoskote; dispatch ETA pushed to 11:30 AM.',
        severity: 'red',
      },
      {
        time: '08:30 AM',
        vector: 'Sales',
        event: 'Peak Breakfast Rush Stockout',
        impactDescription: 'Bread stock completely depleted; 3.4x velocity surge converts into zero basket sales.',
        severity: 'red',
      },
      {
        time: '11:00 AM',
        vector: 'Footfall',
        event: 'Sunday Downpour Dampening Traffic',
        impactDescription: 'Rain reduces footfall by 32%; 48 units of fresh milk age without organic sales.',
        severity: 'amber',
      },
    ],
  },
  Koramangala: {
    storeName: 'Koramangala',
    overallCorrelationScore: 71,
    vectors: [
      {
        vector: 'Sales',
        label: 'Sales Velocity',
        actual: '₹2,65,000 / day',
        benchmark: '₹2,90,000 target',
        divergence: -8.6,
        status: 'Elevated',
        evidence: 'Healthy staples sales offset by sluggish dairy turnover and student weekend departures.',
        keyMetric: '-₹25,000 Sales Gap',
      },
      {
        vector: 'Footfall',
        label: 'Footfall & Weather',
        actual: '2,140 walk-ins',
        benchmark: '2,450 forecast',
        divergence: -12.7,
        status: 'Elevated',
        evidence: 'University long weekend caused student apartment cluster vacancy; local footfall down 13%.',
        keyMetric: '-12.7% Footfall Dip',
      },
      {
        vector: 'Wastage',
        label: 'Wastage & Spoilage',
        actual: '₹3,400 at-risk',
        benchmark: '< ₹1,500 threshold',
        divergence: 126.7,
        status: 'Elevated',
        evidence: '32 loaves Harvest Gold Bread and 18 butter packs nearing 24h expiry window.',
        keyMetric: '2.3x Waste Buffer',
      },
      {
        vector: 'Staffing',
        label: 'Staffing Coverage',
        actual: '10 / 12 associates',
        benchmark: '12 on active shift',
        divergence: -16.7,
        status: 'Elevated',
        evidence: '2 associates took unscheduled concurrent break during midday floor audit.',
        keyMetric: '83.3% Coverage',
      },
      {
        vector: 'Deliveries',
        label: 'Inbound Deliveries',
        actual: '1.2 hrs delayed',
        benchmark: 'On-time',
        divergence: -24.0,
        status: 'Elevated',
        evidence: 'City peak traffic delayed morning replenishment truck from central distribution center.',
        keyMetric: '+72 min Delay',
      },
    ],
    correlations: [
      {
        driverVector: 'Footfall',
        impactedVector: 'Wastage',
        correlationCoefficient: 0.86,
        synthesis: 'Unanticipated student holiday departures reduced bread and butter velocity by 44%.',
      },
      {
        driverVector: 'Deliveries',
        impactedVector: 'Sales',
        correlationCoefficient: 0.73,
        synthesis: 'Midday stock replenishment delay caused temporary out-of-stock on premium dairy lines.',
      },
      {
        driverVector: 'Staffing',
        impactedVector: 'Wastage',
        correlationCoefficient: 0.68,
        synthesis: 'Concurrent breaks resulted in delayed markdown sticker placement on Bay 2 dairy.',
      },
      {
        driverVector: 'Sales',
        impactedVector: 'Deliveries',
        correlationCoefficient: 0.62,
        synthesis: 'Static automated reorders failed to flex down for predictable academic holidays.',
      },
    ],
    causalTimeline: [
      {
        time: '07:30 AM',
        vector: 'Deliveries',
        event: 'Morning Inbound Traffic Delay',
        impactDescription: 'Delivery van delayed by 72 mins on Hosur Road flyover.',
        severity: 'amber',
      },
      {
        time: '10:00 AM',
        vector: 'Footfall',
        event: 'Student Cluster Vacancy Recognized',
        impactDescription: 'Store footfall down 13%; morning milk and bread movement stagnant.',
        severity: 'amber',
      },
      {
        time: '01:30 PM',
        vector: 'Staffing',
        event: 'Unsynchronized Floor Breaks',
        impactDescription: 'Floor coverage dips to 83%; clearance tagging postponed.',
        severity: 'blue',
      },
      {
        time: '04:00 PM',
        vector: 'Wastage',
        event: 'Dairy Stock Crosses T-24h Buffer',
        impactDescription: '32 loaves and 18 butter packs enter high-risk waste category.',
        severity: 'amber',
      },
    ],
  },
  Malleshwaram: {
    storeName: 'Malleshwaram',
    overallCorrelationScore: 58,
    vectors: [
      {
        vector: 'Sales',
        label: 'Sales Velocity',
        actual: '₹2,10,000 / day',
        benchmark: '₹2,35,000 target',
        divergence: -10.6,
        status: 'Elevated',
        evidence: 'Staples and spices robust; frozen food velocity lagging behind plan.',
        keyMetric: '-₹25,000 Gap',
      },
      {
        vector: 'Footfall',
        label: 'Footfall & Weather',
        actual: '1,720 walk-ins',
        benchmark: '1,900 forecast',
        divergence: -9.5,
        status: 'Healthy',
        evidence: 'Normal footfall with slight evening dip around temple peak hours.',
        keyMetric: '-9.5% Footfall',
      },
      {
        vector: 'Wastage',
        label: 'Wastage & Spoilage',
        actual: '₹2,750 at-risk',
        benchmark: '< ₹1,200 threshold',
        divergence: 129.2,
        status: 'Elevated',
        evidence: 'Slow-moving frozen nuggets and packaged paneer near manufacturer date.',
        keyMetric: '2.3x Waste Limit',
      },
      {
        vector: 'Staffing',
        label: 'Staffing Coverage',
        actual: '10 / 11 associates',
        benchmark: '11 on active shift',
        divergence: -9.1,
        status: 'Healthy',
        evidence: 'Single late arrival; floor coverage well maintained.',
        keyMetric: '90.9% Coverage',
      },
      {
        vector: 'Deliveries',
        label: 'Inbound Deliveries',
        actual: '25 min delay',
        benchmark: 'On-time',
        divergence: -5.0,
        status: 'Healthy',
        evidence: 'Minor dock queue at Malleshwaram 8th Cross back-alley entrance.',
        keyMetric: '+25 min Delay',
      },
    ],
    correlations: [
      {
        driverVector: 'Sales',
        impactedVector: 'Wastage',
        correlationCoefficient: 0.81,
        synthesis: 'Low local customer adoption of frozen ready-to-eat products causing shelf staleness.',
      },
      {
        driverVector: 'Footfall',
        impactedVector: 'Sales',
        correlationCoefficient: 0.65,
        synthesis: 'Evening traffic concentrated on fresh produce rather than high-margin packaged food.',
      },
      {
        driverVector: 'Deliveries',
        impactedVector: 'Staffing',
        correlationCoefficient: 0.42,
        synthesis: 'Dock congestion briefly occupies warehouse clerk.',
      },
      {
        driverVector: 'Staffing',
        impactedVector: 'Wastage',
        correlationCoefficient: 0.38,
        synthesis: 'Routine rotation audit kept wastage contained compared to Whitefield.',
      },
    ],
    causalTimeline: [
      {
        time: '08:00 AM',
        vector: 'Deliveries',
        event: 'Morning Dock Arrival',
        impactDescription: 'Inbound goods checked in smoothly with minor 25 min delay.',
        severity: 'blue',
      },
      {
        time: '12:00 PM',
        vector: 'Wastage',
        event: 'Frozen Inventory Audit',
        impactDescription: 'Identified 8 SKUs of slow-moving frozen snacks requiring promotional bundling.',
        severity: 'amber',
      },
    ],
  },
  Jayanagar: {
    storeName: 'Jayanagar',
    overallCorrelationScore: 28,
    vectors: [
      {
        vector: 'Sales',
        label: 'Sales Velocity',
        actual: '₹3,20,000 / day',
        benchmark: '₹3,15,000 target',
        divergence: 1.6,
        status: 'Healthy',
        evidence: 'Exceeding sales targets across fresh vegetables, pulses, and organic milk.',
        keyMetric: '+₹5,000 Above Plan',
      },
      {
        vector: 'Footfall',
        label: 'Footfall & Weather',
        actual: '2,650 walk-ins',
        benchmark: '2,500 forecast',
        divergence: 6.0,
        status: 'Healthy',
        evidence: 'Strong loyal customer turnout during morning 7-10 AM walking hours.',
        keyMetric: '+6.0% Footfall Beat',
      },
      {
        vector: 'Wastage',
        label: 'Wastage & Spoilage',
        actual: '₹820 at-risk',
        benchmark: '< ₹1,500 threshold',
        divergence: -45.3,
        status: 'Healthy',
        evidence: 'Perishable greens trim waste minimal; disciplined morning FIFO rotation.',
        keyMetric: 'Well Within Limits',
      },
      {
        vector: 'Staffing',
        label: 'Staffing Coverage',
        actual: '10 / 10 associates',
        benchmark: '10 on active shift',
        divergence: 0.0,
        status: 'Healthy',
        evidence: '100% on-time attendance and prompt shift changeovers.',
        keyMetric: '100% Coverage',
      },
      {
        vector: 'Deliveries',
        label: 'Inbound Deliveries',
        actual: 'On-time (06:45 AM)',
        benchmark: '07:00 AM',
        divergence: 15.0,
        status: 'Healthy',
        evidence: 'Early delivery allowed complete pre-opening staging before doors opened.',
        keyMetric: '15 min Ahead of SLA',
      },
    ],
    correlations: [
      {
        driverVector: 'Staffing',
        impactedVector: 'Wastage',
        correlationCoefficient: 0.91,
        synthesis: 'Strict FIFO rotation by full staff contingent directly drove a 45% waste reduction.',
      },
      {
        driverVector: 'Deliveries',
        impactedVector: 'Sales',
        correlationCoefficient: 0.88,
        synthesis: 'Early staging ensured 100% on-shelf availability for the critical morning crowd.',
      },
      {
        driverVector: 'Footfall',
        impactedVector: 'Sales',
        correlationCoefficient: 0.85,
        synthesis: 'High footfall conversion supported by full shelves and zero out-of-stocks.',
      },
      {
        driverVector: 'Wastage',
        impactedVector: 'Sales',
        correlationCoefficient: 0.22,
        synthesis: 'Minimal markdown intervention needed to maintain high retail margins.',
      },
    ],
    causalTimeline: [
      {
        time: '06:45 AM',
        vector: 'Deliveries',
        event: 'Inbound PO Staged Early',
        impactDescription: 'Fresh produce unboxed and shelved 15 mins before store opening.',
        severity: 'blue',
      },
      {
        time: '07:00 AM',
        vector: 'Staffing',
        event: '100% Roster Checked In',
        impactDescription: 'All 10 team members in place for opening rush.',
        severity: 'blue',
      },
    ],
  },
  Indiranagar: {
    storeName: 'Indiranagar',
    overallCorrelationScore: 19,
    vectors: [
      {
        vector: 'Sales',
        label: 'Sales Velocity',
        actual: '₹3,95,000 / day',
        benchmark: '₹3,70,000 target',
        divergence: 6.8,
        status: 'Healthy',
        evidence: 'Top performing store in the network; high basket size driven by premium items and scan & go.',
        keyMetric: '+₹25,000 Beat',
      },
      {
        vector: 'Footfall',
        label: 'Footfall & Weather',
        actual: '3,420 walk-ins',
        benchmark: '3,200 forecast',
        divergence: 6.9,
        status: 'Healthy',
        evidence: 'Dense urban traffic and 100-feet road commercial activity.',
        keyMetric: '+6.9% Footfall',
      },
      {
        vector: 'Wastage',
        label: 'Wastage & Spoilage',
        actual: '₹640 at-risk',
        benchmark: '< ₹1,800 threshold',
        divergence: -64.4,
        status: 'Healthy',
        evidence: 'Excellent stock velocity; excess safety buffer available to assist sister stores.',
        keyMetric: 'Lowest Chain Waste',
      },
      {
        vector: 'Staffing',
        label: 'Staffing Coverage',
        actual: '12 / 12 associates',
        benchmark: '12 on active shift',
        divergence: 0.0,
        status: 'Healthy',
        evidence: 'Full team active with cross-trained customer assistance and turnstile checkout escorts.',
        keyMetric: '100% Staffing',
      },
      {
        vector: 'Deliveries',
        label: 'Inbound Deliveries',
        actual: 'On-time',
        benchmark: '06:30 AM',
        divergence: 0.0,
        status: 'Healthy',
        evidence: 'Direct priority routing from primary distribution hub.',
        keyMetric: 'On Time SLA 100%',
      },
    ],
    correlations: [
      {
        driverVector: 'Sales',
        impactedVector: 'Wastage',
        correlationCoefficient: 0.95,
        synthesis: 'High turnover rate liquidates stock before any product enters the T-48h aging window.',
      },
      {
        driverVector: 'Deliveries',
        impactedVector: 'Sales',
        correlationCoefficient: 0.90,
        synthesis: 'Reliable supplier routing supports seamless safety buffer replenishment.',
      },
      {
        driverVector: 'Staffing',
        impactedVector: 'Footfall',
        correlationCoefficient: 0.75,
        synthesis: 'Turnstile gate assistance keeps queue time under 45 seconds, encouraging repeat walk-ins.',
      },
      {
        driverVector: 'Deliveries',
        impactedVector: 'Wastage',
        correlationCoefficient: 0.20,
        synthesis: 'Cold chain verified at dock entry with zero thermal anomalies logged.',
      },
    ],
    causalTimeline: [
      {
        time: '06:30 AM',
        vector: 'Deliveries',
        event: 'Inbound Hub Truck Unloaded',
        impactDescription: 'Fresh bread, dairy, and cold-pressed juices verified and stocked.',
        severity: 'blue',
      },
      {
        time: '08:00 AM',
        vector: 'Sales',
        event: 'High Velocity Morning Rush',
        impactDescription: 'Scan & Go users account for 41% of transactions with zero wait time.',
        severity: 'blue',
      },
    ],
  },
}

// Store Manager Customized Daily To-Do Checklist
export type ManagerChecklistItem = {
  id: string
  shift: 'Morning Opening (06:00 - 09:00)' | 'Midday Rush (11:00 - 14:00)' | 'Afternoon Inbound (14:00 - 17:00)' | 'Evening Close (19:00 - 22:00)'
  title: string
  description: string
  assignee: string
  dueTime: string
  priority: 'Critical' | 'High' | 'Medium' | 'Routine'
  impactText: string
  completed: boolean
  triggerKey?: string
}

export const storeManagerChecklists: Record<string, ManagerChecklistItem[]> = {
  Whitefield: [
    {
      id: 'wf-1',
      shift: 'Morning Opening (06:00 - 09:00)',
      title: 'Inspect Chiller Unit 2 Door Seal & Cold Chain Log',
      description: 'Check magnetic gasket latch, clear defrost ice coils, and verify internal sensor returns below -18°C.',
      assignee: 'Rajesh Kumar (Facility Associate)',
      dueTime: '07:30 AM',
      priority: 'Critical',
      impactText: 'Protects ₹5,840 frozen inventory & halts defrost spoilage',
      completed: false,
      triggerKey: 'maintenance',
    },
    {
      id: 'wf-2',
      shift: 'Morning Opening (06:00 - 09:00)',
      title: 'Follow Up Delayed Bread Delivery PO #8412',
      description: 'Contact Harvest Gold regional logistics dispatch; log carrier breach ticket and request priority Hoskote transit.',
      assignee: 'Anita Desai (Inbound Lead)',
      dueTime: '08:00 AM',
      priority: 'Critical',
      impactText: 'Addresses 14 depleted breakfast SKUs leaking ₹4,200/hr',
      completed: false,
      triggerKey: 'replenishment',
    },
    {
      id: 'wf-3',
      shift: 'Morning Opening (06:00 - 09:00)',
      title: 'Re-assign Floor Associate to Unload Backroom Staging',
      description: 'Pull associate Amit from Bay 5 to clear staging backlog caused by 3 morning absences.',
      assignee: 'Arjun Nambiar (Store Manager)',
      dueTime: '08:45 AM',
      priority: 'High',
      impactText: 'Overcomes 72% staffing bottleneck before 9:00 AM footfall spike',
      completed: true,
    },
    {
      id: 'wf-4',
      shift: 'Midday Rush (11:00 - 14:00)',
      title: 'Execute 40% Clearance Markdown on 48 Milk Units (T-6h)',
      description: 'Affix yellow discount collar tags to Dairy Bay 3 and trigger wireless ESL price drop (₹42 → ₹25).',
      assignee: 'Rajesh Kumar (Floor Associate)',
      dueTime: '11:30 AM',
      priority: 'Critical',
      impactText: 'Liquidates 48 units before 6:00 PM expiry; recovers ₹1,200 margin',
      completed: false,
      triggerKey: 'markdown',
    },
    {
      id: 'wf-5',
      shift: 'Midday Rush (11:00 - 14:00)',
      title: 'Receive Emergency Bread Transfer from Indiranagar Hub',
      description: 'Receive 35 units Harvest Gold Bread via courier express, scan into POS, and place directly in bread aisle.',
      assignee: 'Vikram Singh (Floor Supervisor)',
      dueTime: '12:15 PM',
      priority: 'High',
      impactText: 'Restores core breakfast availability; recovers ₹3,950 sales loss',
      completed: false,
      triggerKey: 'transfer',
    },
    {
      id: 'wf-6',
      shift: 'Afternoon Inbound (14:00 - 17:00)',
      title: 'Verify CoolTech HVAC Technician Ticket #FAC-441',
      description: 'Escort arriving technician to Walk-In Chiller 2, inspect replacement gasket installation, and sign service voucher.',
      assignee: 'Anita Desai (Inbound Lead)',
      dueTime: '03:30 PM',
      priority: 'High',
      impactText: 'Permanently eliminates +6.2°C thermal leak before evening cycle',
      completed: false,
    },
    {
      id: 'wf-7',
      shift: 'Evening Close (19:00 - 22:00)',
      title: 'Perishable Produce Trim & Organic Green Markdowns',
      description: 'Inspect spinach, coriander, and leafy greens. Trim wilted stock and apply 30% evening close tag.',
      assignee: 'Meena R (Produce Specialist)',
      dueTime: '08:00 PM',
      priority: 'Medium',
      impactText: 'Cuts overnight trim shrinkage by 65%',
      completed: false,
    },
    {
      id: 'wf-8',
      shift: 'Evening Close (19:00 - 22:00)',
      title: 'Reconcile Turnstile Gate Logs vs POS Audit',
      description: 'Verify 0 exit pass exceptions across Staff Turnstile Gate 2; cross-check offline transactions.',
      assignee: 'Arjun Nambiar (Store Manager)',
      dueTime: '09:45 PM',
      priority: 'Routine',
      impactText: 'Maintains 0.0% unverified exit pass variance',
      completed: false,
    },
  ],
  Koramangala: [
    {
      id: 'kora-1',
      shift: 'Morning Opening (06:00 - 09:00)',
      title: 'Conduct Cycle Count on Butter & Dairy Bay 2',
      description: 'Physically reconcile 12-unit POS discrepancy identified during Sunday closing tally.',
      assignee: 'Sneha Patel (Inventory Lead)',
      dueTime: '07:45 AM',
      priority: 'High',
      impactText: 'Corrects inventory records and syncs reorder threshold',
      completed: true,
    },
    {
      id: 'kora-2',
      shift: 'Midday Rush (11:00 - 14:00)',
      title: 'Trigger Breakfast Pairing Bundle Discount (Bread + Butter)',
      description: 'Deploy bundle promotional POS rule (₹30 discount) to clear 32 short-dated loaves before student rush.',
      assignee: 'Priya Sharma (Store Manager)',
      dueTime: '11:15 AM',
      priority: 'Critical',
      impactText: 'Liquidates ₹5,890 short-dated dairy stock with 84% recovery',
      completed: false,
      triggerKey: 'markdown',
    },
    {
      id: 'kora-3',
      shift: 'Midday Rush (11:00 - 14:00)',
      title: 'Implement Staggered Associate Floor Break Schedule',
      description: 'Ensure maximum of 1 associate off-floor at any given time between 12:00 PM and 3:00 PM.',
      assignee: 'Priya Sharma (Store Manager)',
      dueTime: '12:00 PM',
      priority: 'High',
      impactText: 'Eliminates 16.7% midday coverage gap',
      completed: true,
    },
    {
      id: 'kora-4',
      shift: 'Afternoon Inbound (14:00 - 17:00)',
      title: 'Receive Hosur Road Replenishment Dispatch',
      description: 'Verify seal condition and temperature logs for incoming dairy replenishment.',
      assignee: 'Rohan Joshi (Dock Supervisor)',
      dueTime: '02:30 PM',
      priority: 'Medium',
      impactText: 'Replenishes safety buffer for evening peak',
      completed: false,
    },
    {
      id: 'kora-5',
      shift: 'Evening Close (19:00 - 22:00)',
      title: 'Update Dynamic Academic Calendar Demand Parameter',
      description: 'Adjust Friday automated reorder factor down by 25% for upcoming university semester recess.',
      assignee: 'Priya Sharma (Store Manager)',
      dueTime: '08:30 PM',
      priority: 'High',
      impactText: 'Prevents future ₹16,200 margin loss from uncalibrated holiday stock',
      completed: false,
    },
  ],
  Malleshwaram: [
    {
      id: 'mal-1',
      shift: 'Morning Opening (06:00 - 09:00)',
      title: 'Inspect Freezer Aisle 4 Stock Rotation (FIFO)',
      description: 'Bring near-date frozen nuggets to front row; verify cold temperatures.',
      assignee: 'Karthik Rao (Store Manager)',
      dueTime: '08:15 AM',
      priority: 'High',
      impactText: 'Prevents ₹2,750 frozen waste write-off',
      completed: true,
    },
    {
      id: 'mal-2',
      shift: 'Midday Rush (11:00 - 14:00)',
      title: 'Publish Flash Combo with Traditional Staples',
      description: 'Tag frozen snacks with 20% discount when purchased alongside premium cooking oil.',
      assignee: 'Sunil Gowda (Floor Lead)',
      dueTime: '11:45 AM',
      priority: 'Medium',
      impactText: 'Accelerates slow freezer turnover',
      completed: false,
      triggerKey: 'markdown',
    },
    {
      id: 'mal-3',
      shift: 'Evening Close (19:00 - 22:00)',
      title: 'Temple Festival Evening Footfall Preparation',
      description: 'Prepare express checkout lane and stock high-velocity flowers and incense sticks.',
      assignee: 'Karthik Rao (Store Manager)',
      dueTime: '06:00 PM',
      priority: 'Routine',
      impactText: 'Captures ₹18,000 peak evening walk-in sales',
      completed: false,
    },
  ],
  Jayanagar: [
    {
      id: 'jay-1',
      shift: 'Morning Opening (06:00 - 09:00)',
      title: 'Verify Fresh Organic Produce Pre-Staging',
      description: 'Ensure morning leafy greens and vegetables are misted and displayed on cold racks.',
      assignee: 'Deepa Hegde (Store Manager)',
      dueTime: '07:00 AM',
      priority: 'Routine',
      impactText: 'Maintains 99.5% customer freshness satisfaction',
      completed: true,
    },
    {
      id: 'jay-2',
      shift: 'Midday Rush (11:00 - 14:00)',
      title: 'Review Midday FIFO Movement on Dairy Bay',
      description: 'Perform visual spot check on curd and paneer packs.',
      assignee: 'Suresh B (Floor Lead)',
      dueTime: '01:00 PM',
      priority: 'Routine',
      impactText: 'Preserves 0.3% low wastage rate',
      completed: true,
    },
    {
      id: 'jay-3',
      shift: 'Evening Close (19:00 - 22:00)',
      title: 'Log Daily Benchmark Metrics & Staff Commendation',
      description: 'Publish 100% attendance and zero shrinkage audit report to Head Office portal.',
      assignee: 'Deepa Hegde (Store Manager)',
      dueTime: '09:00 PM',
      priority: 'Routine',
      impactText: 'Benchmark store operational integrity',
      completed: false,
    },
  ],
  Indiranagar: [
    {
      id: 'ind-1',
      shift: 'Morning Opening (06:00 - 09:00)',
      title: 'Verify Scan & Go Turnstile Exit Beacon Connectivity',
      description: 'Test BLE beacon ping on Gate 1 and Gate 2; ensure app checkout sync latency is <300ms.',
      assignee: 'Sanjay Verma (Store Manager)',
      dueTime: '07:15 AM',
      priority: 'High',
      impactText: 'Enables 0-wait checkout for 40%+ shoppers',
      completed: true,
    },
    {
      id: 'ind-2',
      shift: 'Midday Rush (11:00 - 14:00)',
      title: 'Stage 35 Units Bread for Emergency Courier Transfer to Whitefield',
      description: 'Pack excess buffer Harvest Gold Bread into thermal transit bins for inter-store dispatch.',
      assignee: 'Manoj Kumar (Logistics Lead)',
      dueTime: '11:45 AM',
      priority: 'Critical',
      impactText: 'Assists sister store Whitefield with urgent replenishment',
      completed: false,
      triggerKey: 'transfer',
    },
    {
      id: 'ind-3',
      shift: 'Evening Close (19:00 - 22:00)',
      title: 'Daily Premium Basket Velocity Review',
      description: 'Audit organic bakery and cold-pressed juice sales volumes against weekly target.',
      assignee: 'Sanjay Verma (Store Manager)',
      dueTime: '09:15 PM',
      priority: 'Routine',
      impactText: 'Confirms +6.8% sales forecast outperformance',
      completed: false,
    },
  ],
}

// Operational Diagnosis Definitions for all Stores
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
  Malleshwaram: {
    storeName: 'Malleshwaram',
    todaySummary: 'Soft evening footfall impacting frozen ready-to-eat turnover. Proactively bundle near-date frozen products with regional staples.',
    actionPriorities: [
      {
        id: 'mal-prob-1',
        title: 'Frozen Snacks Turnover Deceleration',
        problemType: 'Imminent Expiry Spoilage',
        severity: 'Medium',
        timeWindow: 'T-48 Hours (3 Days of Cover)',
        affectedItems: 'McCain Smiles & Yummiez Veg Nuggets · 64 units',
        atRiskValue: 2750,
        signals: [
          {
            domain: 'Category Sales Velocity',
            signalText: 'Frozen ready-to-eat category velocity tracking 34% below chain average in traditional North Bengaluru pocket.',
            severityScore: '-34% Sub-category Velocity',
          },
          {
            domain: 'Footfall Demographics',
            signalText: 'Walk-ins dominated by senior households with lower preference for Western frozen snack lines.',
            severityScore: 'Demographic Mismatch',
          },
        ],
        causalSynthesis:
          'Standard chain-wide freezer allocations overloaded Malleshwaram with Western frozen snacks that underperform relative to traditional fresh produce, creating gradual aging toward expiry limits.',
        actions: {
          replenishment: 'Lower standing frozen SKU allocation for Malleshwaram by 40% and re-allocate to Koramangala.',
          markdown: 'Launch 20% cross-category promotion with Fortune Sunflower Oil.',
          wastageFix: 'Localize store assortment algorithm to reflect neighborhood dietary profiles.',
          taskOrEscalation: 'Move frozen display to primary checkout aisle endcap.',
        },
        simulation: {
          actionTitle: 'Simulate 20% Endcap Clearance Promotion',
          actionType: 'markdown',
          proposedIntervention: 'Discount frozen items by 20% and reposition to Checkout Endcap 1.',
          originalCost: 2750,
          projectedRecoveryValue: 2200,
          recoveryPercent: 80.0,
          expectedClearanceHours: 6.0,
          clearanceProbability: 85,
          nearbyShoppersTargeted: 290,
          shelfLabelUpdateMode: 'Endcap promotional tag printed & ESL updated',
        },
      },
    ],
  },
  Jayanagar: {
    storeName: 'Jayanagar',
    todaySummary: 'Operational benchmark store. All 5 operational vectors within optimal limits. Minimal evening green trim waste requiring routine mitigation.',
    actionPriorities: [
      {
        id: 'jay-prob-1',
        title: 'Perishable Green Leafy Vegetable Trim Control',
        problemType: 'Imminent Expiry Spoilage',
        severity: 'Medium',
        timeWindow: 'T-8 Hours (Closing Trim)',
        affectedItems: 'Palak, Methi, Coriander · 18 bunches',
        atRiskValue: 820,
        signals: [
          {
            domain: 'Produce Freshness Audit',
            signalText: 'Leafy greens reach cosmetic wilt stage after 12 hours of ambient display.',
            severityScore: 'Cosmetic Moisture Loss',
          },
        ],
        causalSynthesis:
          'Routine end-of-day moisture loss on delicate produce. Handled via standard evening trim and 30% closing discount.',
        actions: {
          replenishment: 'Adjust morning intake batch to split into 2 daily dispatches.',
          markdown: 'Apply 30% evening close tag at 8:00 PM.',
          wastageFix: 'Install automated misting nozzle on Produce Rack 1.',
          taskOrEscalation: 'Assign Associate Suresh to conduct 8 PM trim and repackaging.',
        },
        simulation: {
          actionTitle: 'Simulate 30% Evening Misting Clearance',
          actionType: 'markdown',
          proposedIntervention: 'Discount remaining 18 bunches by 30% during evening walk-in peak.',
          originalCost: 820,
          projectedRecoveryValue: 574,
          recoveryPercent: 70.0,
          expectedClearanceHours: 1.8,
          clearanceProbability: 95,
          nearbyShoppersTargeted: 180,
          shelfLabelUpdateMode: 'Produce clearance basket tagged',
        },
      },
    ],
  },
  Indiranagar: {
    storeName: 'Indiranagar',
    todaySummary: 'Top-tier operational benchmark store. Excess safety buffer available to provide emergency replenishment support to sister stores.',
    actionPriorities: [
      {
        id: 'ind-prob-1',
        title: 'Inter-Store Emergency Stock Sharing Support',
        problemType: 'Fast-Mover Stockout Delay',
        severity: 'Medium',
        timeWindow: 'Immediate Dispatch Window',
        affectedItems: 'Harvest Gold Bread 400g · 35 units available for cross-docking',
        atRiskValue: 1575,
        signals: [
          {
            domain: 'Stock Buffer Health',
            signalText: 'Indiranagar maintains 2.4 days of excess bread cover following morning delivery beat.',
            severityScore: '+2.4 Days Cover Surplus',
          },
        ],
        causalSynthesis:
          'Indiranagar has optimal stock buffer and logistics capability to dispatch 35 units to relieve Whitefield breakfast stockout without jeopardizing own customer service levels.',
        actions: {
          replenishment: 'Pack 35 units into express courier bins for Whitefield dispatch.',
          markdown: 'None required.',
          wastageFix: 'Optimize network-wide buffer rebalancing.',
          taskOrEscalation: 'Log inter-store stock transfer voucher in SAP/POS.',
        },
        simulation: {
          actionTitle: 'Simulate Inter-Store Dispatch to Whitefield',
          actionType: 'replenishment',
          proposedIntervention: 'Dispatch 35 units via intra-city express courier (transit: 18 min).',
          originalCost: 1575,
          projectedRecoveryValue: 3950,
          recoveryPercent: 250.7,
          expectedClearanceHours: 1.5,
          clearanceProbability: 98,
          nearbyShoppersTargeted: 240,
          shelfLabelUpdateMode: 'Direct POS stock transfer voucher generated',
        },
      },
    ],
  },
}


// Franchise network proxy expansion: ensure all 25 stores have operational models
const franchiseLocations = ["Marathahalli","Indiranagar","RT Nagar","Hennur","Nagarbhavi","BTM Layout","Vijayanagar","Whitefield","Electronic City","Banashankari","Kalyan Nagar","Ulsoor","Basavanagudi","Rajajinagar","Sahakar Nagar","Jayanagar","Kengeri","Koramangala","Domlur","Bellandur","Malleshwaram","Hebbal","HSR Layout","Yelahanka","JP Nagar"];

franchiseLocations.forEach((loc) => {
  if (!storeCorrelationProfiles[loc]) {
    storeCorrelationProfiles[loc] = {
      ...storeCorrelationProfiles.Whitefield,
      storeName: loc,
    }
  }
  if (!storeManagerChecklists[loc]) {
    storeManagerChecklists[loc] = storeManagerChecklists.Whitefield.map(item => ({
      ...item,
      id: `${loc.toLowerCase().slice(0, 3)}-${item.id}`
    }))
  }
  if (!storeOperationalDiagnosis[loc]) {
    storeOperationalDiagnosis[loc] = {
      ...storeOperationalDiagnosis.Whitefield,
      storeName: loc,
    }
  }
})
