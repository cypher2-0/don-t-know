import fs from 'fs'
import path from 'path'

// Helper to parse CSV
function parseCSV(filePath: string): Record<string, string>[] {
  const content = fs.readFileSync(filePath, 'utf-8')
  const lines = content.split(/\r?\n/).filter(line => line.trim().length > 0)
  if (lines.length < 2) return []

  const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''))
  const records: Record<string, string>[] = []

  for (let i = 1; i < lines.length; i++) {
    // Basic CSV parser handling potential commas inside quotes if needed
    const row = lines[i]
    let inQuotes = false
    let currentField = ''
    const fields: string[] = []

    for (let charIndex = 0; charIndex < row.length; charIndex++) {
      const char = row[charIndex]
      if (char === '"') {
        inQuotes = !inQuotes
      } else if (char === ',' && !inQuotes) {
        fields.push(currentField.trim())
        currentField = ''
      } else {
        currentField += char
      }
    }
    fields.push(currentField.trim())

    const record: Record<string, string> = {}
    headers.forEach((h, idx) => {
      record[h] = (fields[idx] || '').replace(/^"|"$/g, '')
    })
    records.push(record)
  }

  return records
}

const dataDir = path.join(process.cwd(), 'data', 'franchise_ops')

const stores = parseCSV(path.join(dataDir, 'stores.csv'))
const products = parseCSV(path.join(dataDir, 'products.csv'))
const inventory = parseCSV(path.join(dataDir, 'inventory.csv'))
const purchaseOrders = parseCSV(path.join(dataDir, 'purchase_orders.csv'))
const compliance = parseCSV(path.join(dataDir, 'compliance.csv'))
const customers = parseCSV(path.join(dataDir, 'customers.csv'))
const staff = parseCSV(path.join(dataDir, 'staff.csv'))
const sales = parseCSV(path.join(dataDir, 'sales.csv'))
const wastage = parseCSV(path.join(dataDir, 'wastage.csv'))

console.log(`Loaded: ${stores.length} stores, ${products.length} products, ${sales.length} sales, ${wastage.length} waste`)

// Map products by sku
const productMap: Record<string, any> = {}
products.forEach(p => {
  productMap[p.sku] = {
    sku: p.sku,
    product: p.product,
    category: p.category,
    price: parseFloat(p.price) || 0,
    perishability: p.perishability,
    shelfLifeDays: parseInt(p.shelf_life_days) || 1
  }
})

// Calculate store metrics
const storeMetrics: Record<string, any> = {}

stores.forEach(s => {
  const storeId = s.store
  storeMetrics[storeId] = {
    storeId,
    name: `${s.location} (${s.store})`,
    location: s.location,
    franchisee: s.franchisee,
    format: s.format,
    operatingStatus: s.operating_status,
    totalRevenue: 0,
    totalQtySold: 0,
    recentDailyRevenue: 0,
    totalWastageValue: 0,
    totalWastageQty: 0,
    stockoutCount: 0,
    totalSkus: 0,
    stockoutSkus: [] as string[],
    avgFootfall: 0,
    recentFootfall: 0,
    footfallCount: 0,
    avgStaffingRatio: 0,
    staffCount: 0,
    pendingPOs: 0,
    delayedPOs: 0,
    complianceScore: 100,
    openComplianceIssues: 0,
    complianceNotes: [] as string[],
  }
})

// Ingest sales
sales.forEach(row => {
  const store = storeMetrics[row.store]
  if (store) {
    const rev = parseFloat(row.revenue) || 0
    const qty = parseInt(row.qty_sold) || 0
    store.totalRevenue += rev
    store.totalQtySold += qty
    if (row.date >= '2026-11-10') {
      store.recentDailyRevenue += rev / 5 // approx daily recent
    }
  }
})

// Ingest wastage
wastage.forEach(row => {
  const store = storeMetrics[row.store]
  const prod = productMap[row.sku]
  if (store && prod) {
    const qty = parseInt(row.qty_wasted) || 0
    const val = qty * prod.price
    store.totalWastageValue += val
    store.totalWastageQty += qty
  }
})

// Ingest inventory
inventory.forEach(row => {
  const store = storeMetrics[row.store]
  if (store) {
    store.totalSkus++
    const stock = parseInt(row.stock) || 0
    const reorder = parseInt(row.reorder_level) || 0
    if (stock <= reorder) {
      store.stockoutCount++
      const prodName = productMap[row.sku]?.product || row.sku
      if (store.stockoutSkus.length < 5) {
        store.stockoutSkus.push(prodName)
      }
    }
  }
})

// Ingest footfall
customers.forEach(row => {
  const store = storeMetrics[row.store]
  if (store) {
    const ff = parseInt(row.footfall) || 0
    store.avgFootfall += ff
    store.footfallCount++
    if (row.date >= '2026-11-14') {
      store.recentFootfall = ff
    }
  }
})

stores.forEach(s => {
  const sm = storeMetrics[s.store]
  if (sm && sm.footfallCount > 0) {
    sm.avgFootfall = Math.round(sm.avgFootfall / sm.footfallCount)
  }
})

// Ingest staff
staff.forEach(row => {
  const store = storeMetrics[row.store]
  if (store) {
    const present = parseInt(row.staff_present) || 0
    const level = parseInt(row.staffing_level) || 1
    store.avgStaffingRatio += present / level
    store.staffCount++
  }
})

stores.forEach(s => {
  const sm = storeMetrics[s.store]
  if (sm && sm.staffCount > 0) {
    sm.avgStaffingRatio = Math.round((sm.avgStaffingRatio / sm.staffCount) * 100)
  }
})

// Ingest POs
purchaseOrders.forEach(row => {
  const store = storeMetrics[row.store]
  if (store) {
    if (row.status !== 'Delivered') {
      store.pendingPOs++
      if (row.expected_date < '2026-11-16') {
        store.delayedPOs++
      }
    }
  }
})

// Ingest compliance
compliance.forEach(row => {
  const store = storeMetrics[row.store]
  if (store) {
    const score = parseInt(row.checklist_score) || 100
    store.complianceScore = score
    store.openComplianceIssues = parseInt(row.open_issues) || 0
    if (row.issue_notes && row.issue_notes.trim()) {
      store.complianceNotes.push(row.issue_notes)
    }
  }
})

// Compute urgency score & tier for each store
const storeRankings = Object.values(storeMetrics).map(sm => {
  // Urgency Formula (0-100):
  // 35% Wastage severity + 25% Stockouts + 20% Staffing deficits + 10% PO delays + 10% Compliance issues
  const wasteScore = Math.min(100, (sm.totalWastageValue / 85000) * 100)
  const stockoutScore = Math.min(100, (sm.stockoutCount / 18) * 100)
  const staffScore = Math.max(0, 100 - sm.avgStaffingRatio) * 1.5
  const poScore = sm.delayedPOs * 30
  const compScore = Math.max(0, 100 - sm.complianceScore) * 2

  let urgencyScore = Math.round(
    wasteScore * 0.35 + stockoutScore * 0.25 + staffScore * 0.20 + poScore * 0.10 + compScore * 0.10
  )
  urgencyScore = Math.max(8, Math.min(96, urgencyScore))

  let tier = 'Tier 3: Operational Benchmark'
  if (urgencyScore >= 65) tier = 'Tier 1: Immediate Intervention'
  else if (urgencyScore >= 40) tier = 'Tier 2: Watchlist & Risk Emerging'

  const dailyMarginLoss = Math.round(
    (sm.totalWastageValue / 60) * 1.4 + sm.stockoutCount * 1250 + sm.delayedPOs * 2400
  )

  const primaryIssue =
    sm.stockoutCount > 10
      ? `${sm.stockoutCount} SKUs below reorder level (${sm.stockoutSkus.slice(0, 2).join(', ')}) + ₹${Math.round(sm.totalWastageValue / 60)}/day waste`
      : sm.totalWastageValue > 50000
      ? `Elevated perishable waste (₹${Math.round(sm.totalWastageValue)} total) + ${sm.delayedPOs} delayed inbound POs`
      : sm.avgStaffingRatio < 80
      ? `Chronic staffing shortfall (${sm.avgStaffingRatio}% avg fill) impacting shelf replenishment`
      : `Nominal operations; ${sm.openComplianceIssues} minor inspection notes`

  return {
    ...sm,
    urgencyScore,
    tier,
    dailyMarginLoss,
    primaryIssue
  }
})

// Sort rankings by urgencyScore descending
storeRankings.sort((a, b) => b.urgencyScore - a.urgencyScore)
storeRankings.forEach((s, idx) => {
  s.rank = idx + 1
})

const outputPath = path.join(dataDir, 'aggregated_franchise_ops.json')
fs.writeFileSync(outputPath, JSON.stringify({
  generatedAt: new Date().toISOString(),
  totalStores: storeRankings.length,
  totalProducts: products.length,
  totalSalesRows: sales.length,
  totalWastageRows: wastage.length,
  stores: storeRankings
}, null, 2))

console.log(`Saved aggregated data to ${outputPath} with ${storeRankings.length} stores ranked.`)
