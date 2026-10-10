export type Store = { name: string; city: string; status: 'Healthy' | 'Watch' | 'Critical'; risk: number; sales: string; gap: string; waste: string; stockouts: number; staff: string; reason: string; lat: number; lng: number }

export const stores: Store[] = [
  { name: 'Indiranagar', city: 'Bengaluru', status: 'Healthy', risk: 18, sales: '₹4.82L', gap: '+8.4%', waste: '1.8%', stockouts: 2, staff: '12 / 12', reason: 'Strong sales momentum and healthy inventory coverage.', lat: 12.9784, lng: 77.6408 },
  { name: 'Koramangala', city: 'Bengaluru', status: 'Watch', risk: 42, sales: '₹3.96L', gap: '-4.2%', waste: '3.9%', stockouts: 6, staff: '10 / 12', reason: 'Waste is elevated and two essential SKUs need replenishment.', lat: 12.9352, lng: 77.6245 },
  { name: 'Whitefield', city: 'Bengaluru', status: 'Critical', risk: 76, sales: '₹2.84L', gap: '-18.0%', waste: '7.2%', stockouts: 14, staff: '8 / 11', reason: 'Sales are 18% below forecast, with high waste and staff shortage.', lat: 12.9698, lng: 77.75 },
  { name: 'Jayanagar', city: 'Bengaluru', status: 'Healthy', risk: 22, sales: '₹4.35L', gap: '+3.1%', waste: '2.1%', stockouts: 3, staff: '11 / 11', reason: 'Consistent performance across sales, staffing, and stock health.', lat: 12.925, lng: 77.5938 },
  { name: 'Malleshwaram', city: 'Bengaluru', status: 'Watch', risk: 51, sales: '₹3.42L', gap: '-7.8%', waste: '4.4%', stockouts: 8, staff: '9 / 11', reason: 'Traffic is soft and staff coverage is below the required level.', lat: 13.0035, lng: 77.5709 },
]

export const expiringProducts = [
  { product: 'Amul Taaza Milk', store: 'Whitefield', qty: 48, expiry: 'Today, 6:00 PM', cost: '₹2,016', action: 'Apply 30% discount', tone: 'critical' },
  { product: 'Harvest Gold Bread', store: 'Koramangala', qty: 32, expiry: 'Tomorrow', cost: '₹1,120', action: 'Prioritize selling', tone: 'warning' },
  { product: 'Yummiez Veg Nuggets', store: 'Malleshwaram', qty: 18, expiry: 'Tomorrow', cost: '₹1,620', action: 'Transfer to Indiranagar', tone: 'warning' },
  { product: 'Fresh Paneer 200g', store: 'Whitefield', qty: 15, expiry: 'In 36 hours', cost: '₹1,425', action: 'Apply 50% discount', tone: 'critical' },
]

export const salesData = [
  { day: 'Mon', actual: 3.8, forecast: 3.5 }, { day: 'Tue', actual: 4.3, forecast: 4.1 }, { day: 'Wed', actual: 4.0, forecast: 4.2 }, { day: 'Thu', actual: 4.8, forecast: 4.5 }, { day: 'Fri', actual: 5.2, forecast: 4.9 }, { day: 'Sat', actual: 6.1, forecast: 5.8 }, { day: 'Sun', actual: 5.6, forecast: 5.5 },
]

export const products = [
  ['Amul Taaza Milk', 'Dairy', '₹42', '148', '12'], ['India Gate Basmati Rice', 'Staples', '₹189', '86', '20'], ['Aashirvaad Atta 5kg', 'Staples', '₹310', '42', '15'], ['Fortune Sunflower Oil', 'Cooking', '₹145', '18', '20'], ['Harvest Gold Bread', 'Bakery', '₹45', '32', '12'], ['Tata Toor Dal', 'Staples', '₹165', '74', '20'], ['Fresh Paneer 200g', 'Dairy', '₹95', '15', '18'], ['Lay’s Classic Salted', 'Snacks', '₹20', '236', '50'],
]

export const categories = ['All items', 'Staples', 'Dairy', 'Bakery', 'Cooking', 'Snacks']

export const navItems = [
  { label: 'Overview', icon: 'grid' }, { label: 'Stores', icon: 'store' }, { label: 'Sales analytics', icon: 'chart' }, { label: 'Inventory', icon: 'box' }, { label: 'Waste & expiry', icon: 'clock' }, { label: 'Incidents', icon: 'alert' }, { label: 'Store rankings', icon: 'trophy' },
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

export const customerProducts: CustomerProductItem[] = [
  { barcode: '8901252010057', name: 'Amul Taaza Milk', size: '500 ml', price: 28, category: 'Dairy', color: 'bg-emerald-100', rating: 4.8, image: '/images/products/milk.jpg' },
  { barcode: '8901262040013', name: 'Fresh Paneer', size: '200 g', price: 95, category: 'Dairy', color: 'bg-slate-100', rating: 4.7, image: '/images/products/paneer.jpg' },
  { barcode: '8901262020039', name: 'Amul Salted Butter', size: '100 g', price: 58, category: 'Dairy', color: 'bg-yellow-100', rating: 4.9, image: '/images/products/butter.jpg' },
  { barcode: '2000000000015', name: 'Organic Bananas', size: '500 g', price: 42, category: 'Produce', color: 'bg-lime-100', rating: 4.6, discount: '15% OFF', image: '/images/products/bananas.jpg' },
  { barcode: '2000000000022', name: 'Shimla Royal Apples', size: '4 pcs', price: 140, category: 'Produce', color: 'bg-rose-100', rating: 4.9, image: '/images/products/apples.jpg' },
  { barcode: '2000000000039', name: 'Hybrid Tomatoes', size: '1 kg', price: 34, category: 'Produce', color: 'bg-red-100', rating: 4.5, image: '/images/products/tomatoes.jpg' },
  { barcode: '8901725132149', name: 'Aashirvaad Atta', size: '5 kg', price: 310, category: 'Staples', color: 'bg-amber-100', rating: 4.8, image: 'https://www.bigbasket.com/media/uploads/p/l/126906_8-aashirvaad-atta-whole-wheat.jpg' },
  { barcode: '8901725110123', name: 'India Gate Basmati Rice', size: '1 kg', price: 125, category: 'Staples', color: 'bg-amber-50', rating: 4.7, image: 'https://www.bigbasket.com/media/uploads/p/l/241600_7-india-gate-basmati-rice-feast-rozzana.jpg' },
  { barcode: '8901725140151', name: 'Fortune Sunflower Oil', size: '1 L pouch', price: 145, category: 'Staples', color: 'bg-yellow-50', rating: 4.6, image: '/images/products/oil.jpg' },
  { barcode: '8904043511238', name: 'Harvest Gold Bread', size: '400 g', price: 45, category: 'Bakery', color: 'bg-orange-100', rating: 4.7, image: '/images/products/bread.jpg' },
  { barcode: '8904043511245', name: "The Baker's Dozen Sourdough", size: '250 g', price: 110, category: 'Bakery', color: 'bg-orange-50', rating: 4.8, image: '/images/products/sourdough.jpg' },
  { barcode: '8901491101516', name: "Lay's Classic Salted", size: '50 g', price: 20, category: 'Snacks', color: 'bg-yellow-200', rating: 4.5, image: '/images/products/chips.jpg' },
  { barcode: '8901491101523', name: "Haldiram's Aloo Bhujia", size: '200 g', price: 55, category: 'Snacks', color: 'bg-amber-200', rating: 4.8, image: '/images/products/bhujia.jpg' },
  { barcode: '8901491101530', name: 'Dark Fantasy Choco Fills', size: '75 g', price: 40, category: 'Snacks', color: 'bg-stone-200', rating: 4.9, discount: '10% OFF', image: '/images/products/choco-fills.jpg' },
  { barcode: '8901058812343', name: 'Maggi 2-Minute Noodles', size: '70 g', price: 14, category: 'Snacks', color: 'bg-yellow-100', rating: 4.8, image: 'https://www.bigbasket.com/media/uploads/p/l/266109_19-maggi-2-minute-instant-noodles-masala.jpg' },
  { barcode: '8901058812350', name: 'Coca-Cola', size: '1.5 L', price: 95, category: 'Beverages', color: 'bg-red-50', rating: 4.6, image: 'https://www.bigbasket.com/media/uploads/p/l/251014_11-coca-cola-diet-coke-soft-drink.jpg' },
  { barcode: '8901058812367', name: 'Cadbury Dairy Milk', size: '50 g', price: 40, category: 'Snacks', color: 'bg-purple-100', rating: 4.9, image: 'https://www.bigbasket.com/media/uploads/p/l/40018532_6-cadbury-dairy-milk-chocolate.jpg' },
  { barcode: '8901058812374', name: 'Tata Salt', size: '1 kg', price: 28, category: 'Staples', color: 'bg-slate-50', rating: 4.7, image: 'https://www.bigbasket.com/media/uploads/p/l/241600_7-india-gate-basmati-rice-feast-rozzana.jpg' },
  { barcode: '8901058812381', name: 'Brooke Bond Red Label', size: '250 g', price: 130, category: 'Beverages', color: 'bg-red-100', rating: 4.5, image: 'https://www.bigbasket.com/media/uploads/p/l/266160_17-brooke-bond-red-label-tea.jpg' },
  { barcode: '8901058812398', name: 'Parle-G Biscuits', size: '80 g', price: 10, category: 'Snacks', color: 'bg-yellow-50', rating: 4.7, image: 'https://www.bigbasket.com/media/uploads/p/l/102061_8-parle-g-biscuits.jpg' },
  { barcode: '8901058812404', name: 'Surf Excel Easy Wash', size: '1 kg', price: 135, category: 'Household', color: 'bg-blue-100', rating: 4.8, image: 'https://www.bigbasket.com/media/uploads/p/l/266946_17-surf-excel-easy-wash-detergent-powder.jpg' },
  { barcode: '8901058812411', name: 'Dettol Handwash', size: '200 ml', price: 99, category: 'Personal Care', color: 'bg-emerald-50', rating: 4.6, image: 'https://www.bigbasket.com/media/uploads/p/l/40118742_5-dettol-liquid-handwash-refill-original-germ-protection.jpg' },
  { barcode: '8901058812428', name: 'Nivea Soft Cream', size: '100 ml', price: 160, category: 'Personal Care', color: 'bg-sky-100', rating: 4.7, image: 'https://www.bigbasket.com/media/uploads/p/l/40001083_6-nivea-soft-light-moisturiser.jpg' },
  { barcode: '8901058812435', name: 'Tropicana Orange Juice', size: '1 L', price: 120, category: 'Beverages', color: 'bg-orange-100', rating: 4.5, image: 'https://www.bigbasket.com/media/uploads/p/l/266580_14-tropicana-100-orange-juice.jpg' },
  { barcode: '8901058812442', name: "Kellogg's Corn Flakes", size: '475 g', price: 180, category: 'Breakfast', color: 'bg-yellow-100', rating: 4.8, image: 'https://www.bigbasket.com/media/uploads/p/l/264478_9-kelloggs-corn-flakes-original.jpg' },
  { barcode: '8901725013790', name: 'Bingo! Mad Angles', size: '60 g', price: 20, category: 'Snacks', color: 'bg-orange-200', rating: 4.8, image: 'https://www.bigbasket.com/media/uploads/p/l/40125439_3-bingo-mad-angles-tomato-madness.jpg' },
]


// Simulated 28-day waste dataset. The last 14 entries are the "current" window;
// the 14 before that are the comparison window. UI labels this data as simulated.
export type WastageDay = { day: string; date: string; wastedCost: number; salesRevenue: number }
export const wastageDaily: WastageDay[] = [
  { day: 'Tue', date: '16 Apr', wastedCost: 38500, salesRevenue: 1610000 },
  { day: 'Wed', date: '17 Apr', wastedCost: 36900, salesRevenue: 1580000 },
  { day: 'Thu', date: '18 Apr', wastedCost: 42100, salesRevenue: 1720000 },
  { day: 'Fri', date: '19 Apr', wastedCost: 39800, salesRevenue: 1650000 },
  { day: 'Sat', date: '20 Apr', wastedCost: 45200, salesRevenue: 1830000 },
  { day: 'Sun', date: '21 Apr', wastedCost: 47800, salesRevenue: 1870000 },
  { day: 'Mon', date: '22 Apr', wastedCost: 44100, salesRevenue: 1790000 },
  { day: 'Tue', date: '23 Apr', wastedCost: 41200, salesRevenue: 1680000 },
  { day: 'Wed', date: '24 Apr', wastedCost: 43500, salesRevenue: 1740000 },
  { day: 'Thu', date: '25 Apr', wastedCost: 46900, salesRevenue: 1810000 },
  { day: 'Fri', date: '26 Apr', wastedCost: 40200, salesRevenue: 1620000 },
  { day: 'Sat', date: '27 Apr', wastedCost: 48600, salesRevenue: 1890000 },
  { day: 'Sun', date: '28 Apr', wastedCost: 50100, salesRevenue: 1900000 },
  { day: 'Mon', date: '29 Apr', wastedCost: 47300, salesRevenue: 1800000 },
  { day: 'Tue', date: '30 Apr', wastedCost: 52400, salesRevenue: 1820000 },
  { day: 'Wed', date: '01 May', wastedCost: 54800, salesRevenue: 1850000 },
  { day: 'Thu', date: '02 May', wastedCost: 57200, salesRevenue: 1880000 },
  { day: 'Fri', date: '03 May', wastedCost: 55600, salesRevenue: 1810000 },
  { day: 'Sat', date: '04 May', wastedCost: 60300, salesRevenue: 1920000 },
  { day: 'Sun', date: '05 May', wastedCost: 64200, salesRevenue: 1960000 },
  { day: 'Mon', date: '06 May', wastedCost: 61800, salesRevenue: 1880000 },
  { day: 'Tue', date: '07 May', wastedCost: 67500, salesRevenue: 1930000 },
  { day: 'Wed', date: '08 May', wastedCost: 72100, salesRevenue: 1990000 },
  { day: 'Thu', date: '09 May', wastedCost: 69800, salesRevenue: 1910000 },
  { day: 'Fri', date: '10 May', wastedCost: 76400, salesRevenue: 2020000 },
  { day: 'Sat', date: '11 May', wastedCost: 81200, salesRevenue: 2050000 },
  { day: 'Sun', date: '12 May', wastedCost: 78900, salesRevenue: 1980000 },
  { day: 'Mon', date: '13 May', wastedCost: 84600, salesRevenue: 2040000 },
]

// Simulated tracked waste events backing the "Investigate Wastage" breakdown.
export type WastedProduct = { product: string; store: string; qty: number; unitCost: number; reason: string }
export const wastedProducts: WastedProduct[] = [
  { product: 'Amul Taaza Milk', store: 'Whitefield', qty: 312, unitCost: 42, reason: 'Overstock on weekend order' },
  { product: 'Fresh Paneer 200g', store: 'Whitefield', qty: 168, unitCost: 95, reason: 'Short shelf life vs demand dip' },
  { product: 'Harvest Gold Bread', store: 'Koramangala', qty: 274, unitCost: 35, reason: 'Near-expiry, discounted too late' },
  { product: 'Yummiez Veg Nuggets', store: 'Malleshwaram', qty: 146, unitCost: 90, reason: 'Excess stock, low freezer turnover' },
  { product: 'Amul Butter 500g', store: 'Koramangala', qty: 72, unitCost: 265, reason: 'Order quantity too high' },
  { product: 'Fresho Coriander', store: 'Jayanagar', qty: 210, unitCost: 15, reason: 'Perishable, unsold at close' },
  { product: 'Mother Dairy Curd 400g', store: 'Whitefield', qty: 190, unitCost: 40, reason: 'Expiry within 48 hours' },
  { product: 'Britannia Cheese Slices', store: 'Malleshwaram', qty: 84, unitCost: 130, reason: 'Slow sales, nearing expiry' },
  { product: 'Modern Buns', store: 'Indiranagar', qty: 160, unitCost: 30, reason: 'Overproduction vs demand' },
  { product: 'Farm Fresh Tomatoes 1kg', store: 'Whitefield', qty: 240, unitCost: 28, reason: 'Rapid spoilage, grading rejects' },
]

export const shopCategories = ['All', 'Dairy', 'Produce', 'Staples', 'Bakery', 'Snacks']

export const storeInfo = {
  name: 'GreenBasket · Indiranagar',
  distance: '1.2 km away',
  hours: 'Open until 10 PM',
  address: '4th Main Rd, Indiranagar, Bengaluru 560038',
  deliveryTime: '15-20 mins',
}

export const deliverySlots = ['In 20 mins', '6 – 8 PM', '8 – 10 PM', 'Tomorrow morning (7 – 9 AM)']

export const pastOrders = [
  {
    id: '#GB-2481',
    date: '12 May',
    items: 4,
    total: 742,
    status: 'Delivered',
    slot: 'Delivered in 18 mins',
    itemsList: [
      { name: 'Aashirvaad Atta', qty: 1, price: 310, size: '5 kg' },
      { name: 'India Gate Basmati Rice', qty: 2, price: 125, size: '1 kg' },
      { name: 'Harvest Gold Bread', qty: 2, price: 45, size: '400 g' },
      { name: 'Amul Taaza Milk', qty: 2, price: 28, size: '500 ml' },
    ],
  },
  {
    id: '#GB-2398',
    date: '8 May',
    items: 3,
    total: 486,
    status: 'Delivered',
    slot: 'Delivered in 22 mins',
    itemsList: [
      { name: 'Fresh Paneer', qty: 2, price: 95, size: '200 g' },
      { name: 'Shimla Royal Apples', qty: 1, price: 140, size: '4 pcs' },
      { name: 'Fortune Sunflower Oil', qty: 1, price: 145, size: '1 L' },
    ],
  },
  {
    id: '#GB-2311',
    date: '2 May',
    items: 6,
    total: 1290,
    status: 'Delivered',
    slot: 'Delivered in 15 mins',
    itemsList: [
      { name: 'Aashirvaad Atta', qty: 2, price: 310, size: '5 kg' },
      { name: 'India Gate Basmati Rice', qty: 3, price: 125, size: '1 kg' },
      { name: 'Amul Salted Butter', qty: 3, price: 58, size: '100 g' },
    ],
  },
]

const DESCRIPTIONS: Record<string, string> = {
  Dairy: 'Farm-fresh dairy, kept cold-chained at <4°C from our warehouse to your doorstep. Best consumed within the printed date.',
  Produce: 'Farm-fresh, hand-picked daily from local organic farms. Washed and hygienically packed with zero chemical wax.',
  Staples: 'Premium-grade pantry essentials, triple-checked for purity and packed in multi-layer moisture-resistant bags.',
  Bakery: 'Baked fresh every morning before sunrise at our artisanal kitchen — strictly no artificial preservatives.',
  Snacks: 'Crunchy favourites and tea-time savouries, packed with nitrogen flush to preserve crispiness.',
}

export const productDescription = (category: string) =>
  DESCRIPTIONS[category] ?? 'Quality-checked at the store and packed fresh for your order.'

export const hourlySales = [18, 24, 31, 42, 38, 56, 71, 64, 82, 76, 91, 86]
export const activity = [
  ['09:42 AM', 'Restock request approved', 'Whitefield · 12 items', 'green'],
  ['09:18 AM', 'Expiry alert triggered', 'Amul Taaza Milk · 48 units', 'red'],
  ['08:56 AM', 'New incident reported', 'Koramangala · Stock mismatch', 'amber'],
  ['08:30 AM', 'Daily forecast refreshed', 'All 10 stores · 94% confidence', 'blue'],
]

// ── Store detail view data ──────────────────────────────────────────────

export type FastMover = { product: string; latePO: boolean; daysOfCover: number | 'OUT' }
export type StoreExpiringItem = { product: string; category: string; units: number; cost: number; hoursLeft: number }
export type TeamMember = { initials: string; name: string; role: string; shift: string; status: 'On shift' | 'Late' | 'Off' | 'Break' }
export type StoreWastagePoint = { day: number; value: number }

export const fastMoversPerStore: Record<string, FastMover[]> = {
  Indiranagar: [
    { product: 'Amul Taaza 500ml', latePO: true, daysOfCover: 'OUT' },
    { product: 'Harvest Gold Bread', latePO: true, daysOfCover: 'OUT' },
    { product: 'Farm Eggs 12-pack', latePO: true, daysOfCover: 'OUT' },
    { product: 'Banana Robu...', latePO: true, daysOfCover: 'OUT' },
    { product: 'Amul Masti C...', latePO: true, daysOfCover: 'OUT' },
    { product: 'Tomato 1 kg', latePO: false, daysOfCover: 0.0 },
    { product: 'Onion 1 kg', latePO: true, daysOfCover: 0.1 },
    { product: 'Paneer 200g', latePO: true, daysOfCover: 0.0 },
    { product: 'Aashirvaad ...', latePO: true, daysOfCover: 0.2 },
    { product: 'Maggi 4-pack', latePO: false, daysOfCover: 0.1 },
  ],
  Koramangala: [
    { product: 'Fresh Paneer 200g', latePO: true, daysOfCover: 'OUT' },
    { product: 'Amul Butter 500g', latePO: true, daysOfCover: 'OUT' },
    { product: 'Curd 400g', latePO: false, daysOfCover: 0.3 },
    { product: 'Toor Dal 1kg', latePO: true, daysOfCover: 0.1 },
    { product: 'Rice 5kg', latePO: false, daysOfCover: 0.5 },
    { product: 'Sunflower Oil', latePO: true, daysOfCover: 0.2 },
  ],
  Whitefield: [
    { product: 'Amul Taaza Milk', latePO: true, daysOfCover: 'OUT' },
    { product: 'Paneer 200g', latePO: true, daysOfCover: 'OUT' },
    { product: 'Tomato 1 kg', latePO: true, daysOfCover: 'OUT' },
    { product: 'Coriander bunch', latePO: true, daysOfCover: 'OUT' },
    { product: 'Bread loaf', latePO: false, daysOfCover: 0.1 },
    { product: 'Eggs 6-pack', latePO: true, daysOfCover: 0.0 },
    { product: 'Onion 1 kg', latePO: false, daysOfCover: 0.2 },
    { product: 'Banana 6-pack', latePO: true, daysOfCover: 0.1 },
  ],
  Jayanagar: [
    { product: 'Harvest Gold Bread', latePO: true, daysOfCover: 'OUT' },
    { product: 'Amul Masti Curd', latePO: false, daysOfCover: 0.2 },
    { product: 'Tomato 1 kg', latePO: true, daysOfCover: 0.1 },
    { product: 'Onion 2 kg', latePO: false, daysOfCover: 0.4 },
  ],
  Malleshwaram: [
    { product: 'Cheese Slices', latePO: true, daysOfCover: 'OUT' },
    { product: 'Veg Nuggets', latePO: true, daysOfCover: 'OUT' },
    { product: 'Paneer 200g', latePO: true, daysOfCover: 'OUT' },
    { product: 'Amul Butter', latePO: true, daysOfCover: 0.1 },
    { product: 'Bread loaf', latePO: false, daysOfCover: 0.3 },
    { product: 'Curd 400g', latePO: true, daysOfCover: 0.0 },
    { product: 'Eggs 12-pack', latePO: false, daysOfCover: 0.2 },
  ],
}

export const storeExpiringItems: Record<string, StoreExpiringItem[]> = {
  Indiranagar: [
    { product: 'Butter croissant 4 ...', category: 'Bakery', units: 34, cost: 3200, hoursLeft: 20 },
    { product: 'Spinach bunch', category: 'Greens', units: 46, cost: 828, hoursLeft: 18 },
    { product: 'Iceberg lettuce', category: 'Greens', units: 14, cost: 630, hoursLeft: 22 },
    { product: 'Multigrain bread 4...', category: 'Bakery', units: 22, cost: 836, hoursLeft: 40 },
    { product: 'Greek yogurt 100g', category: 'Dairy', units: 18, cost: 990, hoursLeft: 44 },
  ],
  Koramangala: [
    { product: 'Harvest Gold Bread', category: 'Bakery', units: 32, cost: 1120, hoursLeft: 12 },
    { product: 'Fresh Paneer 200g', category: 'Dairy', units: 24, cost: 2280, hoursLeft: 8 },
    { product: 'Amul Butter 500g', category: 'Dairy', units: 18, cost: 4770, hoursLeft: 36 },
    { product: 'Mother Dairy Curd', category: 'Dairy', units: 28, cost: 1120, hoursLeft: 16 },
  ],
  Whitefield: [
    { product: 'Amul Taaza Milk', category: 'Dairy', units: 48, cost: 2016, hoursLeft: 6 },
    { product: 'Fresh Paneer 200g', category: 'Dairy', units: 15, cost: 1425, hoursLeft: 36 },
    { product: 'Farm Fresh Tomatoes', category: 'Vegetables', units: 40, cost: 1120, hoursLeft: 14 },
    { product: 'Coriander bunch', category: 'Greens', units: 30, cost: 450, hoursLeft: 10 },
    { product: 'Modern Buns', category: 'Bakery', units: 22, cost: 660, hoursLeft: 18 },
  ],
  Jayanagar: [
    { product: 'Fresho Coriander', category: 'Greens', units: 42, cost: 630, hoursLeft: 8 },
    { product: 'Brown bread loaf', category: 'Bakery', units: 18, cost: 540, hoursLeft: 24 },
    { product: 'Hung curd 200g', category: 'Dairy', units: 12, cost: 720, hoursLeft: 30 },
  ],
  Malleshwaram: [
    { product: 'Yummiez Veg Nuggets', category: 'Frozen', units: 18, cost: 1620, hoursLeft: 28 },
    { product: 'Cheese Slices', category: 'Dairy', units: 14, cost: 1820, hoursLeft: 20 },
    { product: 'Paneer 200g', category: 'Dairy', units: 20, cost: 1900, hoursLeft: 16 },
    { product: 'Milk bread loaf', category: 'Bakery', units: 16, cost: 480, hoursLeft: 12 },
  ],
}

export const teamPerStore: Record<string, TeamMember[]> = {
  Indiranagar: [
    { initials: 'RK', name: 'Ravi Kumar', role: 'Store manager', shift: '08:00–18:00', status: 'On shift' },
    { initials: 'MS', name: 'Meena S.', role: 'Shift lead', shift: '07:00–15:00', status: 'On shift' },
    { initials: 'RK', name: 'Rahul K.', role: 'Cashier', shift: '07:00–15:00', status: 'On shift' },
    { initials: 'DP', name: 'Divya P.', role: 'Cashier', shift: '09:00–17:00', status: 'Late' },
    { initials: 'IA', name: 'Imran A.', role: 'Fresh associate', shift: '07:00–15:00', status: 'On shift' },
    { initials: 'SB', name: 'Suresh B.', role: 'Stock associate', shift: '06:00–14:00', status: 'On shift' },
    { initials: 'PK', name: 'Priya K.', role: 'Cashier', shift: '14:00–22:00', status: 'Off' },
  ],
  Koramangala: [
    { initials: 'AK', name: 'Anil K.', role: 'Store manager', shift: '08:00–18:00', status: 'On shift' },
    { initials: 'NR', name: 'Neha R.', role: 'Shift lead', shift: '07:00–15:00', status: 'On shift' },
    { initials: 'VG', name: 'Vijay G.', role: 'Cashier', shift: '07:00–15:00', status: 'On shift' },
    { initials: 'SP', name: 'Sneha P.', role: 'Fresh associate', shift: '07:00–15:00', status: 'Late' },
    { initials: 'RD', name: 'Ramesh D.', role: 'Stock associate', shift: '06:00–14:00', status: 'On shift' },
  ],
  Whitefield: [
    { initials: 'SK', name: 'Sunil K.', role: 'Store manager', shift: '08:00–18:00', status: 'On shift' },
    { initials: 'PV', name: 'Pooja V.', role: 'Shift lead', shift: '07:00–15:00', status: 'Late' },
    { initials: 'MK', name: 'Manoj K.', role: 'Cashier', shift: '07:00–15:00', status: 'On shift' },
    { initials: 'AS', name: 'Anita S.', role: 'Cashier', shift: '09:00–17:00', status: 'Off' },
    { initials: 'RB', name: 'Rajesh B.', role: 'Fresh associate', shift: '07:00–15:00', status: 'On shift' },
    { initials: 'KG', name: 'Kiran G.', role: 'Stock associate', shift: '06:00–14:00', status: 'On shift' },
  ],
  Jayanagar: [
    { initials: 'DM', name: 'Deepak M.', role: 'Store manager', shift: '08:00–18:00', status: 'On shift' },
    { initials: 'LS', name: 'Lakshmi S.', role: 'Shift lead', shift: '07:00–15:00', status: 'On shift' },
    { initials: 'AM', name: 'Arjun M.', role: 'Cashier', shift: '07:00–15:00', status: 'On shift' },
    { initials: 'RN', name: 'Rekha N.', role: 'Fresh associate', shift: '07:00–15:00', status: 'On shift' },
    { initials: 'VK', name: 'Vinod K.', role: 'Stock associate', shift: '06:00–14:00', status: 'On shift' },
  ],
  Malleshwaram: [
    { initials: 'GM', name: 'Ganesh M.', role: 'Store manager', shift: '08:00–18:00', status: 'On shift' },
    { initials: 'SJ', name: 'Sunita J.', role: 'Shift lead', shift: '07:00–15:00', status: 'On shift' },
    { initials: 'PB', name: 'Praveen B.', role: 'Cashier', shift: '07:00–15:00', status: 'Late' },
    { initials: 'NK', name: 'Nandini K.', role: 'Cashier', shift: '09:00–17:00', status: 'On shift' },
    { initials: 'RG', name: 'Raju G.', role: 'Fresh associate', shift: '07:00–15:00', status: 'Off' },
  ],
}

export const storeWastageTrend: Record<string, StoreWastagePoint[]> = {
  Indiranagar: [
    { day: 1, value: 4.8 }, { day: 2, value: 5.1 }, { day: 3, value: 5.0 }, { day: 4, value: 5.4 },
    { day: 5, value: 5.2 }, { day: 6, value: 5.6 }, { day: 7, value: 5.8 }, { day: 8, value: 5.5 },
    { day: 9, value: 5.9 }, { day: 10, value: 6.1 }, { day: 11, value: 5.7 }, { day: 12, value: 6.3 },
    { day: 13, value: 6.5 }, { day: 14, value: 6.8 },
  ],
  Koramangala: [
    { day: 1, value: 3.2 }, { day: 2, value: 3.5 }, { day: 3, value: 3.1 }, { day: 4, value: 3.8 },
    { day: 5, value: 3.6 }, { day: 6, value: 4.0 }, { day: 7, value: 3.9 }, { day: 8, value: 4.2 },
    { day: 9, value: 4.1 }, { day: 10, value: 4.4 }, { day: 11, value: 4.6 }, { day: 12, value: 4.3 },
    { day: 13, value: 4.8 }, { day: 14, value: 3.9 },
  ],
  Whitefield: [
    { day: 1, value: 5.4 }, { day: 2, value: 5.8 }, { day: 3, value: 6.2 }, { day: 4, value: 6.0 },
    { day: 5, value: 6.5 }, { day: 6, value: 6.8 }, { day: 7, value: 7.0 }, { day: 8, value: 6.9 },
    { day: 9, value: 7.2 }, { day: 10, value: 7.4 }, { day: 11, value: 7.1 }, { day: 12, value: 7.6 },
    { day: 13, value: 7.8 }, { day: 14, value: 7.2 },
  ],
  Jayanagar: [
    { day: 1, value: 2.0 }, { day: 2, value: 2.2 }, { day: 3, value: 2.1 }, { day: 4, value: 2.3 },
    { day: 5, value: 2.1 }, { day: 6, value: 2.4 }, { day: 7, value: 2.2 }, { day: 8, value: 2.3 },
    { day: 9, value: 2.5 }, { day: 10, value: 2.4 }, { day: 11, value: 2.2 }, { day: 12, value: 2.3 },
    { day: 13, value: 2.1 }, { day: 14, value: 2.1 },
  ],
  Malleshwaram: [
    { day: 1, value: 3.8 }, { day: 2, value: 4.0 }, { day: 3, value: 4.2 }, { day: 4, value: 4.1 },
    { day: 5, value: 4.4 }, { day: 6, value: 4.6 }, { day: 7, value: 4.3 }, { day: 8, value: 4.5 },
    { day: 9, value: 4.7 }, { day: 10, value: 4.9 }, { day: 11, value: 4.6 }, { day: 12, value: 5.0 },
    { day: 13, value: 5.2 }, { day: 14, value: 4.4 },
  ],
}
