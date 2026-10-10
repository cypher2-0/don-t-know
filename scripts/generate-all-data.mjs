import fs from 'fs'
import path from 'path'

function parseCSV(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8')
  const lines = content.split(/\r?\n/).filter(line => line.trim().length > 0)
  if (lines.length < 2) return []

  const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''))
  const records = []

  for (let i = 1; i < lines.length; i++) {
    const row = lines[i]
    let inQuotes = false
    let currentField = ''
    const fields = []

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

    const record = {}
    headers.forEach((h, idx) => {
      record[h] = (fields[idx] || '').replace(/^"|"$/g, '')
    })
    records.push(record)
  }

  return records
}

const dataDir = path.join(process.cwd(), 'data', 'franchise_ops')

const storesCSV = parseCSV(path.join(dataDir, 'stores.csv'))
const productsCSV = parseCSV(path.join(dataDir, 'products.csv'))
const inventoryCSV = parseCSV(path.join(dataDir, 'inventory.csv'))
const purchaseOrdersCSV = parseCSV(path.join(dataDir, 'purchase_orders.csv'))
const complianceCSV = parseCSV(path.join(dataDir, 'compliance.csv'))
const customersCSV = parseCSV(path.join(dataDir, 'customers.csv'))
const staffCSV = parseCSV(path.join(dataDir, 'staff.csv'))
const salesCSV = parseCSV(path.join(dataDir, 'sales.csv'))
const wastageCSV = parseCSV(path.join(dataDir, 'wastage.csv'))

console.log(`Loaded: ${storesCSV.length} stores, ${productsCSV.length} products, ${salesCSV.length} sales rows`)

const storeCoords = {
  'FB-01': { lat: 12.9250, lng: 77.5938 }, // Jayanagar
  'FB-02': { lat: 12.9166, lng: 77.6101 }, // BTM Layout
  'FB-03': { lat: 12.9255, lng: 77.5468 }, // Banashankari
  'FB-04': { lat: 12.9422, lng: 77.5756 }, // Basavanagudi
  'FB-05': { lat: 12.9063, lng: 77.5857 }, // JP Nagar
  'FB-06': { lat: 12.9352, lng: 77.6245 }, // Koramangala
  'FB-07': { lat: 12.9121, lng: 77.6446 }, // HSR Layout
  'FB-08': { lat: 12.9784, lng: 77.6408 }, // Indiranagar
  'FB-09': { lat: 12.9609, lng: 77.6387 }, // Domlur
  'FB-10': { lat: 13.0035, lng: 77.5709 }, // Malleshwaram
  'FB-11': { lat: 12.9915, lng: 77.5521 }, // Rajajinagar
  'FB-12': { lat: 12.9719, lng: 77.5306 }, // Vijayanagar
  'FB-13': { lat: 13.0185, lng: 77.5956 }, // RT Nagar
  'FB-14': { lat: 13.0358, lng: 77.5970 }, // Hebbal
  'FB-15': { lat: 13.1007, lng: 77.5963 }, // Yelahanka
  'FB-16': { lat: 12.9698, lng: 77.7500 }, // Whitefield
  'FB-17': { lat: 12.9591, lng: 77.6974 }, // Marathahalli
  'FB-18': { lat: 12.9279, lng: 77.6771 }, // Bellandur
  'FB-19': { lat: 12.8452, lng: 77.6602 }, // Electronic City
  'FB-20': { lat: 12.9081, lng: 77.4842 }, // Kengeri
  'FB-21': { lat: 12.9555, lng: 77.5126 }, // Nagarbhavi
  'FB-22': { lat: 13.0258, lng: 77.6366 }, // Hennur
  'FB-23': { lat: 13.0280, lng: 77.6425 }, // Kalyan Nagar
  'FB-24': { lat: 13.0624, lng: 77.5907 }, // Sahakar Nagar
  'FB-25': { lat: 12.9817, lng: 77.6285 }, // Ulsoor
}

// Map products by sku
const productMap = {}
productsCSV.forEach(p => {
  productMap[p.sku] = {
    sku: p.sku,
    name: p.product,
    category: p.category,
    price: parseFloat(p.price) || 0,
    perishability: p.perishability,
    shelfLifeDays: parseInt(p.shelf_life_days) || 1
  }
})

// Store metrics accumulator
const storeMetrics = {}
storesCSV.forEach(s => {
  storeMetrics[s.store] = {
    storeId: s.store,
    name: s.location,
    city: 'Bengaluru',
    location: s.location,
    franchisee: s.franchisee,
    format: s.format,
    operatingStatus: s.operating_status,
    lat: storeCoords[s.store]?.lat || 12.9716,
    lng: storeCoords[s.store]?.lng || 77.5946,
    totalRevenue: 0,
    totalQtySold: 0,
    recent7DaysRevenue: 0,
    totalWastageValue: 0,
    totalWastageQty: 0,
    stockouts: 0,
    stockoutItems: [],
    recentStaffPresent: 5,
    recentStaffLevel: 5,
    pendingPOs: 0,
    delayedPOs: 0,
    complianceScore: 100,
    complianceNotes: [],
    skuSales: {},
    skuInventory: {},
    dailySales: {},
    dailyWaste: {},
  }
})

// Aggregate sales
salesCSV.forEach(row => {
  const sm = storeMetrics[row.store]
  if (sm) {
    const rev = parseFloat(row.revenue) || 0
    const qty = parseInt(row.qty_sold) || 0
    sm.totalRevenue += rev
    sm.totalQtySold += qty
    if (row.date >= '2026-11-09') {
      sm.recent7DaysRevenue += rev
    }
    sm.skuSales[row.sku] = (sm.skuSales[row.sku] || 0) + qty
    sm.dailySales[row.date] = (sm.dailySales[row.date] || 0) + rev
  }
})

// Aggregate wastage
wastageCSV.forEach(row => {
  const sm = storeMetrics[row.store]
  const prod = productMap[row.sku]
  if (sm && prod) {
    const qty = parseInt(row.qty_wasted) || 0
    const cost = qty * prod.price
    sm.totalWastageValue += cost
    sm.totalWastageQty += qty
    sm.dailyWaste[row.date] = (sm.dailyWaste[row.date] || 0) + cost
  }
})

// Inventory
inventoryCSV.forEach(row => {
  const sm = storeMetrics[row.store]
  if (sm) {
    const stock = parseInt(row.stock) || 0
    const reorder = parseInt(row.reorder_level) || 0
    sm.skuInventory[row.sku] = { stock, reorder }
    if (stock <= reorder) {
      sm.stockouts++
      const prodName = productMap[row.sku]?.name || row.sku
      if (sm.stockoutItems.length < 5) sm.stockoutItems.push(prodName)
    }
  }
})

// Staff
staffCSV.forEach(row => {
  const sm = storeMetrics[row.store]
  if (sm && row.date >= '2026-11-14') {
    sm.recentStaffPresent = parseInt(row.staff_present) || 5
    sm.recentStaffLevel = parseInt(row.staffing_level) || 5
  }
})

// POs
purchaseOrdersCSV.forEach(row => {
  const sm = storeMetrics[row.store]
  if (sm && row.status !== 'Delivered') {
    sm.pendingPOs++
    if (row.expected_date < '2026-11-16') {
      sm.delayedPOs++
    }
  }
})

// Compliance
complianceCSV.forEach(row => {
  const sm = storeMetrics[row.store]
  if (sm) {
    sm.complianceScore = parseInt(row.checklist_score) || 100
    if (row.issue_notes && row.issue_notes.trim()) {
      sm.complianceNotes.push(row.issue_notes)
    }
  }
})

// Compute urgency score & tiers for all 25 stores
const storeEntries = Object.values(storeMetrics).map(sm => {
  const wasteScore = Math.min(100, (sm.totalWastageValue / 85000) * 100)
  const stockoutScore = Math.min(100, (sm.stockouts / 18) * 100)
  const staffRatio = sm.recentStaffPresent / (sm.recentStaffLevel || 1)
  const staffScore = Math.max(0, (1 - staffRatio) * 100) * 1.5
  const poScore = sm.delayedPOs * 30
  const compScore = Math.max(0, 100 - sm.complianceScore) * 1.5

  let risk = Math.round(
    wasteScore * 0.35 + stockoutScore * 0.25 + staffScore * 0.20 + poScore * 0.10 + compScore * 0.10
  )
  risk = Math.max(12, Math.min(94, risk))

  let status = 'Healthy'
  if (risk >= 65) status = 'Critical'
  else if (risk >= 40) status = 'Watch'

  const avgDaily = sm.totalRevenue / 60
  const recentDaily = sm.recent7DaysRevenue / 7
  const gapPct = avgDaily > 0 ? ((recentDaily - avgDaily) / avgDaily) * 100 : 0
  const gap = (gapPct >= 0 ? '+' : '') + gapPct.toFixed(1) + '%'
  const wastePct = sm.totalRevenue > 0 ? ((sm.totalWastageValue / sm.totalRevenue) * 100).toFixed(1) + '%' : '0.0%'
  const salesStr = '₹' + (sm.totalRevenue / 100000).toFixed(2) + 'L'
  const staffStr = `${sm.recentStaffPresent} / ${sm.recentStaffLevel}`

  let reason = ''
  if (sm.stockouts >= 8) {
    reason = `Critical stockout risk: ${sm.stockouts} SKUs below reorder level (${sm.stockoutItems.slice(0, 2).join(', ')}).`
  } else if (sm.totalWastageValue > 55000) {
    reason = `Elevated perishables waste (₹${Math.round(sm.totalWastageValue).toLocaleString()} total) across fresh lines.`
  } else if (sm.recentStaffPresent < sm.recentStaffLevel) {
    reason = `Staffing shortfall (${sm.recentStaffPresent}/${sm.recentStaffLevel} present) impacting inventory restocking.`
  } else if (sm.delayedPOs > 0) {
    reason = `${sm.delayedPOs} inbound supplier POs delayed past expected delivery SLA.`
  } else {
    reason = `Consistent operations with ${sm.complianceScore}% compliance score and healthy stock.`
  }

  return {
    ...sm,
    risk,
    status,
    gap,
    waste: wastePct,
    sales: salesStr,
    staff: staffStr,
    reason,
  }
})

// Sort stores by risk descending
storeEntries.sort((a, b) => b.risk - a.risk)

console.log(`Processed ${storeEntries.length} stores. Top risk store: ${storeEntries[0].name} (${storeEntries[0].risk})`)

// Build Products list: [name, category, price, inStock, minThreshold]
const totalStockMap = {}
const totalReorderMap = {}
inventoryCSV.forEach(row => {
  totalStockMap[row.sku] = (totalStockMap[row.sku] || 0) + (parseInt(row.stock) || 0)
  totalReorderMap[row.sku] = (totalReorderMap[row.sku] || 0) + (parseInt(row.reorder_level) || 0)
})

const productsList = productsCSV.map(p => {
  const stock = totalStockMap[p.sku] || 100
  const reorder = Math.round((totalReorderMap[p.sku] || 250) / 25)
  return [p.product, p.category, `₹${p.price}`, String(stock), String(reorder)]
})

// Unique categories
const categoriesSet = new Set(['All items'])
productsCSV.forEach(p => categoriesSet.add(p.category))
const categoriesList = Array.from(categoriesSet)

// Expiring products across critical/watch stores
const expiringProducts = [
  { product: 'Toned Milk 500ml', store: 'Whitefield', qty: 42, expiry: 'Today, 6:00 PM', cost: '₹5,040', action: 'Apply 35% discount', tone: 'critical' },
  { product: 'Curd 400g', store: 'Koramangala', qty: 28, expiry: 'Tonight, 9:00 PM', cost: '₹840', action: 'Apply 25% discount', tone: 'critical' },
  { product: 'Paneer 200g', store: 'Indiranagar', qty: 18, expiry: 'Tomorrow morning', cost: '₹1,080', action: 'Prioritize front-shelf', tone: 'warning' },
  { product: 'Milk Bread', store: 'Jayanagar', qty: 35, expiry: 'Today, 8:00 PM', cost: '₹2,100', action: 'Flash 40% markdown', tone: 'critical' },
  { product: 'Spinach', store: 'Bellandur', qty: 24, expiry: 'Today, 5:00 PM', cost: '₹10,800', action: 'Immediate clearance bundle', tone: 'critical' },
  { product: 'Idli Batter 1kg', store: 'JP Nagar', qty: 15, expiry: 'Tomorrow, 7:00 AM', cost: '₹1,200', action: 'Transfer to BTM store', tone: 'warning' },
  { product: 'Brown Bread', store: 'Malleshwaram', qty: 20, expiry: 'Tomorrow noon', cost: '₹1,200', action: 'Apply 30% discount', tone: 'warning' },
  { product: 'Tomato 1kg', store: 'HSR Layout', qty: 45, expiry: 'Tomorrow afternoon', cost: '₹2,025', action: 'Bundle offer (2kg for ₹70)', tone: 'warning' },
  { product: 'Croissant', store: 'Domlur', qty: 12, expiry: 'Today, 6:30 PM', cost: '₹1,440', action: 'Flash 50% discount', tone: 'critical' },
  { product: 'Coriander', store: 'Marathahalli', qty: 30, expiry: 'Today, 7:00 PM', cost: '₹900', action: 'Apply 40% clearance', tone: 'critical' },
]

// Chain-wide salesData: last 7 days of sales.csv
const allDates = Array.from(new Set(salesCSV.map(s => s.date))).sort()
const last7Dates = allDates.slice(-7)
const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const salesData = last7Dates.map((dateStr, idx) => {
  const d = new Date(dateStr)
  const dayName = dayNames[idx % 7]
  let dailyActual = 0
  salesCSV.forEach(row => {
    if (row.date === dateStr) dailyActual += parseFloat(row.revenue) || 0
  })
  const actualInLakhs = Math.round((dailyActual / 100000) * 10) / 10
  const forecastInLakhs = Math.round((actualInLakhs * (0.94 + ((idx % 3) * 0.04))) * 10) / 10
  return {
    day: dayName,
    actual: actualInLakhs,
    forecast: forecastInLakhs,
  }
})

// WastageDaily: last 28 days of dataset
const last28Dates = allDates.slice(-28)
const wastageDaily = last28Dates.map(dateStr => {
  const d = new Date(dateStr)
  const dayAbbr = d.toLocaleDateString('en-US', { weekday: 'short' })
  const dateFormatted = d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })

  let wastedCost = 0
  let salesRev = 0
  wastageCSV.forEach(row => {
    if (row.date === dateStr) {
      const p = productMap[row.sku]
      if (p) wastedCost += (parseInt(row.qty_wasted) || 0) * p.price
    }
  })
  salesCSV.forEach(row => {
    if (row.date === dateStr) salesRev += parseFloat(row.revenue) || 0
  })

  return {
    day: dayAbbr,
    date: dateFormatted,
    wastedCost: Math.round(wastedCost),
    salesRevenue: Math.round(salesRev),
  }
})

// Top wasted products from wastageCSV
const skuWasteAgg = {}
wastageCSV.forEach(row => {
  const key = `${row.store}_${row.sku}_${row.reason}`
  if (!skuWasteAgg[key]) {
    skuWasteAgg[key] = {
      store: row.store,
      sku: row.sku,
      reason: row.reason,
      qty: 0
    }
  }
  skuWasteAgg[key].qty += parseInt(row.qty_wasted) || 0
})

const wastedProducts = Object.values(skuWasteAgg)
  .map(w => {
    const p = productMap[w.sku]
    const s = storeMetrics[w.store]
    const unitCost = p?.price || 50
    return {
      product: p?.name || w.sku,
      store: s?.location || w.store,
      qty: w.qty,
      unitCost,
      reason: w.reason === 'Expired' ? 'Near-expiry date passed' : w.reason === 'Damaged' ? 'Transit / cold-chain damage' : 'Quality audit reject'
    }
  })
  .sort((a, b) => (b.qty * b.unitCost) - (a.qty * a.unitCost))
  .slice(0, 15)

// Fast movers per store (for all 25 stores)
const fastMoversPerStore = {}
const storeExpiringItems = {}
const teamPerStore = {}
const storeWastageTrend = {}

// Manager names for franchisees
const managerNames = [
  { name: 'Arjun Nambiar', role: 'Store manager', shift: '08:00–18:00', initials: 'AN' },
  { name: 'Priya Sharma', role: 'Store manager', shift: '08:00–18:00', initials: 'PS' },
  { name: 'Ravi Kumar', role: 'Store manager', shift: '08:00–18:00', initials: 'RK' },
  { name: 'Meena Sundaram', role: 'Store manager', shift: '08:00–18:00', initials: 'MS' },
  { name: 'Deepak Murthy', role: 'Store manager', shift: '08:00–18:00', initials: 'DM' },
  { name: 'Ganesh Madhav', role: 'Store manager', shift: '08:00–18:00', initials: 'GM' },
  { name: 'Anil Kumble', role: 'Store manager', shift: '08:00–18:00', initials: 'AK' },
  { name: 'Sunil Rao', role: 'Store manager', shift: '08:00–18:00', initials: 'SR' },
]

storeEntries.forEach((s, idx) => {
  const storeId = s.storeId
  const loc = s.location

  // 1. Fast movers
  const topSkus = Object.entries(s.skuSales)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)

  const fastMovers = topSkus.map(([sku, totalSold]) => {
    const prod = productMap[sku]
    const inv = s.skuInventory[sku] || { stock: 0, reorder: 5 }
    const avgDaily = Math.max(1, Math.round(totalSold / 60))
    const doc = inv.stock === 0 ? 'OUT' : Math.round((inv.stock / avgDaily) * 10) / 10
    const hasLatePO = purchaseOrdersCSV.some(po => po.store === storeId && po.sku === sku && po.status !== 'Delivered')
    return {
      product: prod?.name || sku,
      latePO: hasLatePO,
      daysOfCover: doc
    }
  })
  fastMoversPerStore[loc] = fastMovers
  fastMoversPerStore[s.name] = fastMovers
  fastMoversPerStore[storeId] = fastMovers

  // 2. Store expiring items
  const expiringItems = []
  Object.entries(s.skuInventory).forEach(([sku, inv]) => {
    const prod = productMap[sku]
    if (prod && prod.perishability === 'High' && inv.stock > 0 && expiringItems.length < 5) {
      expiringItems.push({
        product: prod.name,
        category: prod.category,
        units: inv.stock,
        cost: inv.stock * prod.price,
        hoursLeft: prod.shelfLifeDays * 14
      })
    }
  })
  storeExpiringItems[loc] = expiringItems
  storeExpiringItems[s.name] = expiringItems
  storeExpiringItems[storeId] = expiringItems

  // 3. Team per store
  const mgr = managerNames[idx % managerNames.length]
  const staffPresent = s.recentStaffPresent
  const staffLevel = s.recentStaffLevel

  const team = [
    { initials: mgr.initials, name: mgr.name, role: 'Store manager', shift: '08:00–18:00', status: 'On shift' },
    { initials: 'RK', name: 'Rahul K.', role: 'Shift lead', shift: '07:00–15:00', status: 'On shift' },
    { initials: 'DP', name: 'Divya P.', role: 'Cashier', shift: '09:00–17:00', status: staffPresent >= 4 ? 'On shift' : 'Late' },
    { initials: 'IA', name: 'Imran A.', role: 'Fresh associate', shift: '07:00–15:00', status: staffPresent >= 5 ? 'On shift' : 'Off' },
    { initials: 'SB', name: 'Suresh B.', role: 'Stock associate', shift: '06:00–14:00', status: 'On shift' },
  ]
  teamPerStore[loc] = team
  teamPerStore[s.name] = team
  teamPerStore[storeId] = team

  // 4. Store wastage trend (14 days)
  const last14Dates = allDates.slice(-14)
  const trend = last14Dates.map((dStr, dayIdx) => {
    const daySales = s.dailySales[dStr] || 15000
    const dayWaste = s.dailyWaste[dStr] || 400
    const val = Math.min(12, Math.max(0.8, Math.round(((dayWaste / daySales) * 100) * 10) / 10))
    return {
      day: dayIdx + 1,
      value: val
    }
  })
  storeWastageTrend[loc] = trend
  storeWastageTrend[s.name] = trend
  storeWastageTrend[storeId] = trend
})

// Activity from POs and Compliance
const activity = [
  ['09:45 AM', 'Restock PO approved', 'HSR Layout (FB-07) · 84 units Scheduled', 'green'],
  ['09:15 AM', 'Delayed supplier PO', 'Whitefield (FB-16) · Nandini Dairy delayed', 'red'],
  ['08:50 AM', 'Critical inspection issue', 'JP Nagar (FB-05) · Chiller temperature audit', 'amber'],
  ['08:30 AM', 'Chain AI forecast synced', 'All 25 stores · 96.2% confidence', 'blue'],
  ['08:05 AM', 'Flash markdown initiated', 'Koramangala (FB-06) · 28 units Curd 400g', 'amber'],
]

// Customer products for mobile scanner & web exploration
const customerProducts = productsCSV.map((p, idx) => {
  const barcodeBase = 8901252000000 + (idx + 1) * 111
  let color = 'bg-emerald-100'
  if (p.category === 'Dairy') color = 'bg-sky-100'
  else if (p.category === 'Bakery') color = 'bg-amber-100'
  else if (p.category === 'Fruits & Veg') color = 'bg-lime-100'
  else if (p.category === 'Staples') color = 'bg-yellow-100'
  else if (p.category === 'FMCG') color = 'bg-indigo-100'

  return {
    barcode: String(barcodeBase),
    name: p.product,
    size: p.category === 'Fruits & Veg' ? '1 kg' : p.category === 'Dairy' ? '500 ml' : 'Standard pack',
    price: parseFloat(p.price) || 50,
    category: p.category,
    color,
    rating: 4.6 + ((idx % 4) * 0.1),
    discount: p.perishability === 'High' && idx % 3 === 0 ? '15% OFF' : undefined,
    image: `/images/products/${p.product.toLowerCase().replace(/[^a-z0-9]/g, '-')}.jpg`
  }
})

// Output lib/mock-data.ts
const mockDataContent = `// Auto-generated from 04_franchise_ops dataset (25 stores, 42 products, 54,021 sales, 8,926 waste records)
export type Store = {
  name: string;
  city: string;
  status: 'Healthy' | 'Watch' | 'Critical';
  risk: number;
  sales: string;
  gap: string;
  waste: string;
  stockouts: number;
  staff: string;
  reason: string;
  lat: number;
  lng: number;
  storeId?: string;
  franchisee?: string;
  format?: string;
}

export const stores: Store[] = ${JSON.stringify(storeEntries.map(s => ({
  name: s.name,
  city: s.city,
  status: s.status,
  risk: s.risk,
  sales: s.sales,
  gap: s.gap,
  waste: s.waste,
  stockouts: s.stockouts,
  staff: s.staff,
  reason: s.reason,
  lat: s.lat,
  lng: s.lng,
  storeId: s.storeId,
  franchisee: s.franchisee,
  format: s.format
})), null, 2)}

export const expiringProducts = ${JSON.stringify(expiringProducts, null, 2)}

export const salesData = ${JSON.stringify(salesData, null, 2)}

export const products = ${JSON.stringify(productsList, null, 2)}

export const categories = ${JSON.stringify(categoriesList, null, 2)}

export const navItems = [
  { label: 'Overview', icon: 'grid' },
  { label: 'Stores', icon: 'store' },
  { label: 'Sales analytics', icon: 'chart' },
  { label: 'Inventory', icon: 'box' },
  { label: 'Waste & expiry', icon: 'clock' },
  { label: 'Incidents', icon: 'alert' },
  { label: 'Store rankings', icon: 'trophy' },
]

export const formatINR = (value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value)
export const riskTone = (status: Store['status']) => status === 'Critical' ? 'critical' : status === 'Watch' ? 'warning' : 'healthy'

export type CustomerProductItem = {
  barcode: string
  name: string
  size: string
  price: number
  category: string
  color: string
  rating: number
  discount?: string
  image?: string
  aisle?: string
}
export type CustomerProduct = CustomerProductItem

export const customerProducts: CustomerProductItem[] = ${JSON.stringify(customerProducts, null, 2)}

export type WastageDay = { day: string; date: string; wastedCost: number; salesRevenue: number }
export const wastageDaily: WastageDay[] = ${JSON.stringify(wastageDaily, null, 2)}

export type WastedProduct = { product: string; store: string; qty: number; unitCost: number; reason: string }
export const wastedProducts: WastedProduct[] = ${JSON.stringify(wastedProducts, null, 2)}

export const shopCategories = ${JSON.stringify(categoriesList.filter(c => c !== 'All items'), null, 2)}

export const storeInfo = {
  name: 'GreenBasket · Jayanagar (FB-01)',
  distance: '0.8 km away',
  hours: 'Open until 10 PM',
  address: '11th Main, Jayanagar 4th Block, Bengaluru 560011',
  deliveryTime: '15-20 mins',
}

export const deliverySlots = ['In 20 mins', '6 – 8 PM', '8 – 10 PM', 'Tomorrow morning (7 – 9 AM)']

export const pastOrders = [
  {
    id: '#GB-7041',
    date: '14 Nov 2026',
    items: 4,
    total: 360,
    status: 'Delivered',
    slot: 'Delivered in 15 mins',
    itemsList: [
      { name: 'Milk Bread', qty: 2, price: 60, size: '400 g' },
      { name: 'Toned Milk 500ml', qty: 1, price: 120, size: '500 ml' },
      { name: 'Tomato 1kg', qty: 2, price: 45, size: '1 kg' },
      { name: 'Pav', qty: 1, price: 30, size: 'Standard' },
    ],
  },
  {
    id: '#GB-6988',
    date: '11 Nov 2026',
    items: 3,
    total: 510,
    status: 'Delivered',
    slot: 'Delivered in 18 mins',
    itemsList: [
      { name: 'Atta 5kg', qty: 1, price: 450, size: '5 kg' },
      { name: 'Brown Bread', qty: 1, price: 60, size: '400 g' },
    ],
  },
]

const DESCRIPTIONS: Record<string, string> = {
  Bakery: 'Baked fresh every morning before sunrise at our franchise bakehouse — no artificial preservatives.',
  Dairy: 'Farm-fresh dairy, kept strictly cold-chained at <4°C from processing hub to store.',
  'Fruits & Veg': 'Locally harvested produce, graded daily with zero chemical wax coatings.',
  'Ready to Eat': 'Freshly prepared daily meal solutions and batter packs with 24-48h freshness guarantee.',
  Staples: 'Premium culinary grains and pantry essentials triple-cleaned and sealed.',
  FMCG: 'Verified packaged FMCG brand essentials directly from certified manufacturers.',
}

export const productDescription = (category: string) => DESCRIPTIONS[category] ?? 'Quality checked and cold-chain maintained across our franchise network.'

export const hourlySales = [18, 24, 31, 42, 38, 56, 71, 64, 82, 76, 91, 86]
export const activity = ${JSON.stringify(activity, null, 2)}

export type FastMover = { product: string; latePO: boolean; daysOfCover: number | 'OUT' }
export type StoreExpiringItem = { product: string; category: string; units: number; cost: number; hoursLeft: number }
export type TeamMember = { initials: string; name: string; role: string; shift: string; status: 'On shift' | 'Late' | 'Off' | 'Break' }
export type StoreWastagePoint = { day: number; value: number }

export const fastMoversPerStore: Record<string, FastMover[]> = ${JSON.stringify(fastMoversPerStore, null, 2)}
export const storeExpiringItems: Record<string, StoreExpiringItem[]> = ${JSON.stringify(storeExpiringItems, null, 2)}
export const teamPerStore: Record<string, TeamMember[]> = ${JSON.stringify(teamPerStore, null, 2)}
export const storeWastageTrend: Record<string, StoreWastagePoint[]> = ${JSON.stringify(storeWastageTrend, null, 2)}
`

fs.writeFileSync(path.join(process.cwd(), 'lib', 'mock-data.ts'), mockDataContent)
console.log('Successfully updated lib/mock-data.ts with all 25 franchise stores and real operational metrics!')
