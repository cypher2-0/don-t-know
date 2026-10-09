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

export const customerProducts = [
  { name: 'Amul Taaza Milk', size: '500 ml', price: 28, category: 'Dairy', color: 'bg-emerald-100' },
  { name: 'Aashirvaad Atta', size: '5 kg', price: 310, category: 'Staples', color: 'bg-amber-100' },
  { name: 'Fresh Paneer', size: '200 g', price: 95, category: 'Dairy', color: 'bg-slate-100' },
  { name: 'Harvest Gold Bread', size: '400 g', price: 45, category: 'Bakery', color: 'bg-orange-100' },
  { name: 'Lay’s Classic', size: '50 g', price: 20, category: 'Snacks', color: 'bg-yellow-100' },
]

export const hourlySales = [18, 24, 31, 42, 38, 56, 71, 64, 82, 76, 91, 86]
export const activity = [
  ['09:42 AM', 'Restock request approved', 'Whitefield · 12 items', 'green'],
  ['09:18 AM', 'Expiry alert triggered', 'Amul Taaza Milk · 48 units', 'red'],
  ['08:56 AM', 'New incident reported', 'Koramangala · Stock mismatch', 'amber'],
  ['08:30 AM', 'Daily forecast refreshed', 'All 10 stores · 94% confidence', 'blue'],
]
