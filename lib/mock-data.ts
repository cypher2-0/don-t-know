// Auto-generated from 04_franchise_ops dataset (25 stores, 42 products, 54,021 sales, 8,926 waste records)
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

export const stores: Store[] = [
  {
    "name": "Marathahalli",
    "city": "Bengaluru",
    "status": "Watch",
    "risk": 53,
    "sales": "₹13.18L",
    "gap": "-13.9%",
    "waste": "3.0%",
    "stockouts": 13,
    "staff": "8 / 8",
    "reason": "Critical stockout risk: 13 SKUs below reorder level (Pav, Croissant).",
    "lat": 12.9591,
    "lng": 77.6974,
    "storeId": "FB-17",
    "franchisee": "Sri Lakshmi Retail",
    "format": "Standard"
  },
  {
    "name": "Vijayanagar",
    "city": "Bengaluru",
    "status": "Watch",
    "risk": 40,
    "sales": "₹20.06L",
    "gap": "-8.9%",
    "waste": "3.0%",
    "stockouts": 1,
    "staff": "7 / 12",
    "reason": "Elevated perishables waste (₹60,935 total) across fresh lines.",
    "lat": 12.9719,
    "lng": 77.5306,
    "storeId": "FB-12",
    "franchisee": "Nandi Enterprises",
    "format": "Large"
  },
  {
    "name": "Indiranagar",
    "city": "Bengaluru",
    "status": "Healthy",
    "risk": 39,
    "sales": "₹13.77L",
    "gap": "-1.6%",
    "waste": "7.4%",
    "stockouts": 1,
    "staff": "8 / 8",
    "reason": "Elevated perishables waste (₹101,935 total) across fresh lines.",
    "lat": 12.9784,
    "lng": 77.6408,
    "storeId": "FB-08",
    "franchisee": "Prakruti Foods",
    "format": "Standard"
  },
  {
    "name": "RT Nagar",
    "city": "Bengaluru",
    "status": "Healthy",
    "risk": 34,
    "sales": "₹21.32L",
    "gap": "-5.3%",
    "waste": "3.7%",
    "stockouts": 0,
    "staff": "12 / 12",
    "reason": "Elevated perishables waste (₹79,770 total) across fresh lines.",
    "lat": 13.0185,
    "lng": 77.5956,
    "storeId": "FB-13",
    "franchisee": "Green Leaf Ventures",
    "format": "Large"
  },
  {
    "name": "Hennur",
    "city": "Bengaluru",
    "status": "Healthy",
    "risk": 34,
    "sales": "₹20.34L",
    "gap": "-0.5%",
    "waste": "3.8%",
    "stockouts": 0,
    "staff": "12 / 12",
    "reason": "Elevated perishables waste (₹77,820 total) across fresh lines.",
    "lat": 13.0258,
    "lng": 77.6366,
    "storeId": "FB-22",
    "franchisee": "Green Leaf Ventures",
    "format": "Large"
  },
  {
    "name": "Nagarbhavi",
    "city": "Bengaluru",
    "status": "Healthy",
    "risk": 30,
    "sales": "₹13.62L",
    "gap": "+7.3%",
    "waste": "3.7%",
    "stockouts": 2,
    "staff": "8 / 8",
    "reason": "Consistent operations with 58% compliance score and healthy stock.",
    "lat": 12.9555,
    "lng": 77.5126,
    "storeId": "FB-21",
    "franchisee": "Annapoorna Foods",
    "format": "Standard"
  },
  {
    "name": "BTM Layout",
    "city": "Bengaluru",
    "status": "Healthy",
    "risk": 29,
    "sales": "₹13.94L",
    "gap": "+4.4%",
    "waste": "4.7%",
    "stockouts": 1,
    "staff": "8 / 8",
    "reason": "Elevated perishables waste (₹65,560 total) across fresh lines.",
    "lat": 12.9166,
    "lng": 77.6101,
    "storeId": "FB-02",
    "franchisee": "Kaveri Traders",
    "format": "Standard"
  },
  {
    "name": "Whitefield",
    "city": "Bengaluru",
    "status": "Healthy",
    "risk": 28,
    "sales": "₹13.49L",
    "gap": "+3.3%",
    "waste": "4.5%",
    "stockouts": 1,
    "staff": "8 / 8",
    "reason": "Elevated perishables waste (₹61,165 total) across fresh lines.",
    "lat": 12.9698,
    "lng": 77.75,
    "storeId": "FB-16",
    "franchisee": "Nandi Enterprises",
    "format": "Standard"
  },
  {
    "name": "Electronic City",
    "city": "Bengaluru",
    "status": "Healthy",
    "risk": 28,
    "sales": "₹13.85L",
    "gap": "+3.6%",
    "waste": "3.9%",
    "stockouts": 2,
    "staff": "8 / 8",
    "reason": "Consistent operations with 85% compliance score and healthy stock.",
    "lat": 12.8452,
    "lng": 77.6602,
    "storeId": "FB-19",
    "franchisee": "Vasavi Retail",
    "format": "Standard"
  },
  {
    "name": "Ulsoor",
    "city": "Bengaluru",
    "status": "Healthy",
    "risk": 28,
    "sales": "₹13.74L",
    "gap": "+3.3%",
    "waste": "3.6%",
    "stockouts": 2,
    "staff": "7 / 8",
    "reason": "Staffing shortfall (7/8 present) impacting inventory restocking.",
    "lat": 12.9817,
    "lng": 77.6285,
    "storeId": "FB-25",
    "franchisee": "Sowbhagya Stores",
    "format": "Standard"
  },
  {
    "name": "Kengeri",
    "city": "Bengaluru",
    "status": "Healthy",
    "risk": 26,
    "sales": "₹13.82L",
    "gap": "-8.9%",
    "waste": "3.4%",
    "stockouts": 1,
    "staff": "7 / 8",
    "reason": "Staffing shortfall (7/8 present) impacting inventory restocking.",
    "lat": 12.9081,
    "lng": 77.4842,
    "storeId": "FB-20",
    "franchisee": "Nandi Enterprises",
    "format": "Standard"
  },
  {
    "name": "Hebbal",
    "city": "Bengaluru",
    "status": "Healthy",
    "risk": 25,
    "sales": "₹13.87L",
    "gap": "-3.1%",
    "waste": "3.4%",
    "stockouts": 1,
    "staff": "7 / 8",
    "reason": "Staffing shortfall (7/8 present) impacting inventory restocking.",
    "lat": 13.0358,
    "lng": 77.597,
    "storeId": "FB-14",
    "franchisee": "Sri Lakshmi Retail",
    "format": "Standard"
  },
  {
    "name": "Kalyan Nagar",
    "city": "Bengaluru",
    "status": "Healthy",
    "risk": 25,
    "sales": "₹13.90L",
    "gap": "-4.8%",
    "waste": "3.7%",
    "stockouts": 1,
    "staff": "8 / 8",
    "reason": "Consistent operations with 82% compliance score and healthy stock.",
    "lat": 13.028,
    "lng": 77.6425,
    "storeId": "FB-23",
    "franchisee": "Prakruti Foods",
    "format": "Standard"
  },
  {
    "name": "Banashankari",
    "city": "Bengaluru",
    "status": "Healthy",
    "risk": 24,
    "sales": "₹9.57L",
    "gap": "-1.8%",
    "waste": "3.9%",
    "stockouts": 5,
    "staff": "5 / 5",
    "reason": "Consistent operations with 87% compliance score and healthy stock.",
    "lat": 12.9255,
    "lng": 77.5468,
    "storeId": "FB-03",
    "franchisee": "Prakruti Foods",
    "format": "Express"
  },
  {
    "name": "Sahakar Nagar",
    "city": "Bengaluru",
    "status": "Healthy",
    "risk": 24,
    "sales": "₹9.85L",
    "gap": "+3.3%",
    "waste": "3.8%",
    "stockouts": 4,
    "staff": "5 / 5",
    "reason": "Consistent operations with 83% compliance score and healthy stock.",
    "lat": 13.0624,
    "lng": 77.5907,
    "storeId": "FB-24",
    "franchisee": "Sri Lakshmi Retail",
    "format": "Express"
  },
  {
    "name": "Basavanagudi",
    "city": "Bengaluru",
    "status": "Healthy",
    "risk": 23,
    "sales": "₹13.92L",
    "gap": "-4.9%",
    "waste": "3.4%",
    "stockouts": 1,
    "staff": "8 / 8",
    "reason": "Consistent operations with 84% compliance score and healthy stock.",
    "lat": 12.9422,
    "lng": 77.5756,
    "storeId": "FB-04",
    "franchisee": "Sowbhagya Stores",
    "format": "Standard"
  },
  {
    "name": "Rajajinagar",
    "city": "Bengaluru",
    "status": "Healthy",
    "risk": 23,
    "sales": "₹9.62L",
    "gap": "-1.4%",
    "waste": "3.7%",
    "stockouts": 4,
    "staff": "5 / 5",
    "reason": "Consistent operations with 82% compliance score and healthy stock.",
    "lat": 12.9915,
    "lng": 77.5521,
    "storeId": "FB-11",
    "franchisee": "Vasavi Retail",
    "format": "Express"
  },
  {
    "name": "Jayanagar",
    "city": "Bengaluru",
    "status": "Healthy",
    "risk": 22,
    "sales": "₹9.71L",
    "gap": "-0.2%",
    "waste": "4.0%",
    "stockouts": 3,
    "staff": "5 / 5",
    "reason": "Consistent operations with 86% compliance score and healthy stock.",
    "lat": 12.925,
    "lng": 77.5938,
    "storeId": "FB-01",
    "franchisee": "Vasavi Retail",
    "format": "Express"
  },
  {
    "name": "Koramangala",
    "city": "Bengaluru",
    "status": "Healthy",
    "risk": 22,
    "sales": "₹13.77L",
    "gap": "-3.9%",
    "waste": "3.4%",
    "stockouts": 1,
    "staff": "8 / 8",
    "reason": "Consistent operations with 96% compliance score and healthy stock.",
    "lat": 12.9352,
    "lng": 77.6245,
    "storeId": "FB-06",
    "franchisee": "Sri Lakshmi Retail",
    "format": "Standard"
  },
  {
    "name": "Domlur",
    "city": "Bengaluru",
    "status": "Healthy",
    "risk": 22,
    "sales": "₹9.46L",
    "gap": "+1.3%",
    "waste": "3.7%",
    "stockouts": 4,
    "staff": "5 / 5",
    "reason": "Consistent operations with 89% compliance score and healthy stock.",
    "lat": 12.9609,
    "lng": 77.6387,
    "storeId": "FB-09",
    "franchisee": "Sowbhagya Stores",
    "format": "Express"
  },
  {
    "name": "Malleshwaram",
    "city": "Bengaluru",
    "status": "Healthy",
    "risk": 21,
    "sales": "₹9.43L",
    "gap": "+1.5%",
    "waste": "4.2%",
    "stockouts": 2,
    "staff": "5 / 5",
    "reason": "Consistent operations with 88% compliance score and healthy stock.",
    "lat": 13.0035,
    "lng": 77.5709,
    "storeId": "FB-10",
    "franchisee": "Green Leaf Ventures",
    "format": "Express"
  },
  {
    "name": "Bellandur",
    "city": "Bengaluru",
    "status": "Healthy",
    "risk": 21,
    "sales": "₹9.68L",
    "gap": "-0.7%",
    "waste": "4.0%",
    "stockouts": 2,
    "staff": "5 / 5",
    "reason": "Consistent operations with 84% compliance score and healthy stock.",
    "lat": 12.9279,
    "lng": 77.6771,
    "storeId": "FB-18",
    "franchisee": "Green Leaf Ventures",
    "format": "Express"
  },
  {
    "name": "JP Nagar",
    "city": "Bengaluru",
    "status": "Healthy",
    "risk": 20,
    "sales": "₹13.17L",
    "gap": "-3.1%",
    "waste": "2.8%",
    "stockouts": 2,
    "staff": "8 / 8",
    "reason": "Consistent operations with 91% compliance score and healthy stock.",
    "lat": 12.9063,
    "lng": 77.5857,
    "storeId": "FB-05",
    "franchisee": "Annapoorna Foods",
    "format": "Standard"
  },
  {
    "name": "HSR Layout",
    "city": "Bengaluru",
    "status": "Healthy",
    "risk": 19,
    "sales": "₹9.77L",
    "gap": "-5.1%",
    "waste": "3.6%",
    "stockouts": 3,
    "staff": "5 / 5",
    "reason": "Consistent operations with 96% compliance score and healthy stock.",
    "lat": 12.9121,
    "lng": 77.6446,
    "storeId": "FB-07",
    "franchisee": "Vasavi Retail",
    "format": "Express"
  },
  {
    "name": "Yelahanka",
    "city": "Bengaluru",
    "status": "Healthy",
    "risk": 19,
    "sales": "₹9.32L",
    "gap": "+3.6%",
    "waste": "3.8%",
    "stockouts": 2,
    "staff": "5 / 5",
    "reason": "Consistent operations with 87% compliance score and healthy stock.",
    "lat": 13.1007,
    "lng": 77.5963,
    "storeId": "FB-15",
    "franchisee": "Nandi Enterprises",
    "format": "Express"
  }
]

export const expiringProducts = [
  {
    "product": "Toned Milk 500ml",
    "store": "Whitefield",
    "qty": 42,
    "expiry": "Today, 6:00 PM",
    "cost": "₹5,040",
    "action": "Apply 35% discount",
    "tone": "critical"
  },
  {
    "product": "Curd 400g",
    "store": "Koramangala",
    "qty": 28,
    "expiry": "Tonight, 9:00 PM",
    "cost": "₹840",
    "action": "Apply 25% discount",
    "tone": "critical"
  },
  {
    "product": "Paneer 200g",
    "store": "Indiranagar",
    "qty": 18,
    "expiry": "Tomorrow morning",
    "cost": "₹1,080",
    "action": "Prioritize front-shelf",
    "tone": "warning"
  },
  {
    "product": "Milk Bread",
    "store": "Jayanagar",
    "qty": 35,
    "expiry": "Today, 8:00 PM",
    "cost": "₹2,100",
    "action": "Flash 40% markdown",
    "tone": "critical"
  },
  {
    "product": "Spinach",
    "store": "Bellandur",
    "qty": 24,
    "expiry": "Today, 5:00 PM",
    "cost": "₹10,800",
    "action": "Immediate clearance bundle",
    "tone": "critical"
  },
  {
    "product": "Idli Batter 1kg",
    "store": "JP Nagar",
    "qty": 15,
    "expiry": "Tomorrow, 7:00 AM",
    "cost": "₹1,200",
    "action": "Transfer to BTM store",
    "tone": "warning"
  },
  {
    "product": "Brown Bread",
    "store": "Malleshwaram",
    "qty": 20,
    "expiry": "Tomorrow noon",
    "cost": "₹1,200",
    "action": "Apply 30% discount",
    "tone": "warning"
  },
  {
    "product": "Tomato 1kg",
    "store": "HSR Layout",
    "qty": 45,
    "expiry": "Tomorrow afternoon",
    "cost": "₹2,025",
    "action": "Bundle offer (2kg for ₹70)",
    "tone": "warning"
  },
  {
    "product": "Croissant",
    "store": "Domlur",
    "qty": 12,
    "expiry": "Today, 6:30 PM",
    "cost": "₹1,440",
    "action": "Flash 50% discount",
    "tone": "critical"
  },
  {
    "product": "Coriander",
    "store": "Marathahalli",
    "qty": 30,
    "expiry": "Today, 7:00 PM",
    "cost": "₹900",
    "action": "Apply 40% clearance",
    "tone": "critical"
  }
]

export const salesData = [
  {
    "day": "Mon",
    "actual": 4.9,
    "forecast": 4.6
  },
  {
    "day": "Tue",
    "actual": 5.1,
    "forecast": 5
  },
  {
    "day": "Wed",
    "actual": 5.1,
    "forecast": 5.2
  },
  {
    "day": "Thu",
    "actual": 5.2,
    "forecast": 4.9
  },
  {
    "day": "Fri",
    "actual": 5.3,
    "forecast": 5.2
  },
  {
    "day": "Sat",
    "actual": 5.9,
    "forecast": 6
  },
  {
    "day": "Sun",
    "actual": 5.7,
    "forecast": 5.4
  }
]

export const products = [
  [
    "Milk Bread",
    "Bakery",
    "₹60",
    "167",
    "3"
  ],
  [
    "Brown Bread",
    "Bakery",
    "₹60",
    "74",
    "2"
  ],
  [
    "Pav",
    "Bakery",
    "₹30",
    "414",
    "7"
  ],
  [
    "Croissant",
    "Bakery",
    "₹120",
    "354",
    "6"
  ],
  [
    "Banana Cake",
    "Bakery",
    "₹60",
    "441",
    "8"
  ],
  [
    "Rusk",
    "Bakery",
    "₹60",
    "267",
    "5"
  ],
  [
    "Toned Milk 500ml",
    "Dairy",
    "₹120",
    "146",
    "3"
  ],
  [
    "Curd 400g",
    "Dairy",
    "₹30",
    "112",
    "2"
  ],
  [
    "Paneer 200g",
    "Dairy",
    "₹60",
    "192",
    "3"
  ],
  [
    "Butter 100g",
    "Dairy",
    "₹80",
    "236",
    "4"
  ],
  [
    "Buttermilk",
    "Dairy",
    "₹250",
    "499",
    "8"
  ],
  [
    "Ghee 200ml",
    "Dairy",
    "₹45",
    "235",
    "4"
  ],
  [
    "Tomato 1kg",
    "Fruits & Veg",
    "₹45",
    "388",
    "7"
  ],
  [
    "Onion 1kg",
    "Fruits & Veg",
    "₹450",
    "542",
    "10"
  ],
  [
    "Banana (dozen)",
    "Fruits & Veg",
    "₹80",
    "125",
    "2"
  ],
  [
    "Spinach",
    "Fruits & Veg",
    "₹450",
    "42",
    "2"
  ],
  [
    "Coriander",
    "Fruits & Veg",
    "₹30",
    "252",
    "4"
  ],
  [
    "Potato 1kg",
    "Fruits & Veg",
    "₹60",
    "83",
    "2"
  ],
  [
    "Apple 1kg",
    "Fruits & Veg",
    "₹60",
    "256",
    "4"
  ],
  [
    "Carrot 500g",
    "Fruits & Veg",
    "₹80",
    "193",
    "3"
  ],
  [
    "Idli Batter 1kg",
    "Ready to Eat",
    "₹80",
    "179",
    "3"
  ],
  [
    "Dosa Batter 1kg",
    "Ready to Eat",
    "₹120",
    "492",
    "9"
  ],
  [
    "Chapati (10)",
    "Ready to Eat",
    "₹60",
    "608",
    "11"
  ],
  [
    "Veg Sandwich",
    "Ready to Eat",
    "₹30",
    "226",
    "4"
  ],
  [
    "Fruit Bowl",
    "Ready to Eat",
    "₹45",
    "290",
    "5"
  ],
  [
    "Sona Masoori Rice 5kg",
    "Staples",
    "₹30",
    "669",
    "10"
  ],
  [
    "Toor Dal 1kg",
    "Staples",
    "₹450",
    "1312",
    "19"
  ],
  [
    "Atta 5kg",
    "Staples",
    "₹450",
    "208",
    "3"
  ],
  [
    "Sugar 1kg",
    "Staples",
    "₹450",
    "685",
    "10"
  ],
  [
    "Sunflower Oil 1L",
    "Staples",
    "₹45",
    "1925",
    "28"
  ],
  [
    "Salt 1kg",
    "Staples",
    "₹120",
    "975",
    "14"
  ],
  [
    "Ragi Flour 1kg",
    "Staples",
    "₹120",
    "2289",
    "34"
  ],
  [
    "Biscuits",
    "FMCG",
    "₹250",
    "176",
    "3"
  ],
  [
    "Instant Noodles",
    "FMCG",
    "₹120",
    "244",
    "3"
  ],
  [
    "Tea 250g",
    "FMCG",
    "₹30",
    "234",
    "3"
  ],
  [
    "Coffee Powder 200g",
    "FMCG",
    "₹45",
    "363",
    "5"
  ],
  [
    "Detergent 1kg",
    "FMCG",
    "₹120",
    "839",
    "12"
  ],
  [
    "Soap",
    "FMCG",
    "₹60",
    "695",
    "10"
  ],
  [
    "Toothpaste",
    "FMCG",
    "₹250",
    "979",
    "14"
  ],
  [
    "Namkeen",
    "FMCG",
    "₹450",
    "494",
    "7"
  ],
  [
    "Chocolate Bar",
    "FMCG",
    "₹450",
    "176",
    "3"
  ],
  [
    "Soft Drink 750ml",
    "FMCG",
    "₹120",
    "2678",
    "40"
  ]
]

export const categories = [
  "All items",
  "Bakery",
  "Dairy",
  "Fruits & Veg",
  "Ready to Eat",
  "Staples",
  "FMCG"
]

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

export const customerProducts: CustomerProductItem[] = [
  {
    "barcode": "8901252000111",
    "name": "Milk Bread",
    "size": "Standard pack",
    "price": 60,
    "category": "Bakery",
    "color": "bg-amber-100",
    "rating": 4.6,
    "discount": "15% OFF",
    "image": "/images/products/milk-bread.jpg"
  },
  {
    "barcode": "8901252000222",
    "name": "Brown Bread",
    "size": "Standard pack",
    "price": 60,
    "category": "Bakery",
    "color": "bg-amber-100",
    "rating": 4.699999999999999,
    "image": "/images/products/brown-bread.jpg"
  },
  {
    "barcode": "8901252000333",
    "name": "Pav",
    "size": "Standard pack",
    "price": 30,
    "category": "Bakery",
    "color": "bg-amber-100",
    "rating": 4.8,
    "image": "/images/products/pav.jpg"
  },
  {
    "barcode": "8901252000444",
    "name": "Croissant",
    "size": "Standard pack",
    "price": 120,
    "category": "Bakery",
    "color": "bg-amber-100",
    "rating": 4.8999999999999995,
    "discount": "15% OFF",
    "image": "/images/products/croissant.jpg"
  },
  {
    "barcode": "8901252000555",
    "name": "Banana Cake",
    "size": "Standard pack",
    "price": 60,
    "category": "Bakery",
    "color": "bg-amber-100",
    "rating": 4.6,
    "image": "/images/products/banana-cake.jpg"
  },
  {
    "barcode": "8901252000666",
    "name": "Rusk",
    "size": "Standard pack",
    "price": 60,
    "category": "Bakery",
    "color": "bg-amber-100",
    "rating": 4.699999999999999,
    "image": "/images/products/rusk.jpg"
  },
  {
    "barcode": "8901252000777",
    "name": "Toned Milk 500ml",
    "size": "500 ml",
    "price": 120,
    "category": "Dairy",
    "color": "bg-sky-100",
    "rating": 4.8,
    "discount": "15% OFF",
    "image": "/images/products/toned-milk-500ml.jpg"
  },
  {
    "barcode": "8901252000888",
    "name": "Curd 400g",
    "size": "500 ml",
    "price": 30,
    "category": "Dairy",
    "color": "bg-sky-100",
    "rating": 4.8999999999999995,
    "image": "/images/products/curd-400g.jpg"
  },
  {
    "barcode": "8901252000999",
    "name": "Paneer 200g",
    "size": "500 ml",
    "price": 60,
    "category": "Dairy",
    "color": "bg-sky-100",
    "rating": 4.6,
    "image": "/images/products/paneer-200g.jpg"
  },
  {
    "barcode": "8901252001110",
    "name": "Butter 100g",
    "size": "500 ml",
    "price": 80,
    "category": "Dairy",
    "color": "bg-sky-100",
    "rating": 4.699999999999999,
    "discount": "15% OFF",
    "image": "/images/products/butter-100g.jpg"
  },
  {
    "barcode": "8901252001221",
    "name": "Buttermilk",
    "size": "500 ml",
    "price": 250,
    "category": "Dairy",
    "color": "bg-sky-100",
    "rating": 4.8,
    "image": "/images/products/buttermilk.jpg"
  },
  {
    "barcode": "8901252001332",
    "name": "Ghee 200ml",
    "size": "500 ml",
    "price": 45,
    "category": "Dairy",
    "color": "bg-sky-100",
    "rating": 4.8999999999999995,
    "image": "/images/products/ghee-200ml.jpg"
  },
  {
    "barcode": "8901252001443",
    "name": "Tomato 1kg",
    "size": "1 kg",
    "price": 45,
    "category": "Fruits & Veg",
    "color": "bg-lime-100",
    "rating": 4.6,
    "discount": "15% OFF",
    "image": "/images/products/tomato-1kg.jpg"
  },
  {
    "barcode": "8901252001554",
    "name": "Onion 1kg",
    "size": "1 kg",
    "price": 450,
    "category": "Fruits & Veg",
    "color": "bg-lime-100",
    "rating": 4.699999999999999,
    "image": "/images/products/onion-1kg.jpg"
  },
  {
    "barcode": "8901252001665",
    "name": "Banana (dozen)",
    "size": "1 kg",
    "price": 80,
    "category": "Fruits & Veg",
    "color": "bg-lime-100",
    "rating": 4.8,
    "image": "/images/products/banana--dozen-.jpg"
  },
  {
    "barcode": "8901252001776",
    "name": "Spinach",
    "size": "1 kg",
    "price": 450,
    "category": "Fruits & Veg",
    "color": "bg-lime-100",
    "rating": 4.8999999999999995,
    "discount": "15% OFF",
    "image": "/images/products/spinach.jpg"
  },
  {
    "barcode": "8901252001887",
    "name": "Coriander",
    "size": "1 kg",
    "price": 30,
    "category": "Fruits & Veg",
    "color": "bg-lime-100",
    "rating": 4.6,
    "image": "/images/products/coriander.jpg"
  },
  {
    "barcode": "8901252001998",
    "name": "Potato 1kg",
    "size": "1 kg",
    "price": 60,
    "category": "Fruits & Veg",
    "color": "bg-lime-100",
    "rating": 4.699999999999999,
    "image": "/images/products/potato-1kg.jpg"
  },
  {
    "barcode": "8901252002109",
    "name": "Apple 1kg",
    "size": "1 kg",
    "price": 60,
    "category": "Fruits & Veg",
    "color": "bg-lime-100",
    "rating": 4.8,
    "discount": "15% OFF",
    "image": "/images/products/apple-1kg.jpg"
  },
  {
    "barcode": "8901252002220",
    "name": "Carrot 500g",
    "size": "1 kg",
    "price": 80,
    "category": "Fruits & Veg",
    "color": "bg-lime-100",
    "rating": 4.8999999999999995,
    "image": "/images/products/carrot-500g.jpg"
  },
  {
    "barcode": "8901252002331",
    "name": "Idli Batter 1kg",
    "size": "Standard pack",
    "price": 80,
    "category": "Ready to Eat",
    "color": "bg-emerald-100",
    "rating": 4.6,
    "image": "/images/products/idli-batter-1kg.jpg"
  },
  {
    "barcode": "8901252002442",
    "name": "Dosa Batter 1kg",
    "size": "Standard pack",
    "price": 120,
    "category": "Ready to Eat",
    "color": "bg-emerald-100",
    "rating": 4.699999999999999,
    "discount": "15% OFF",
    "image": "/images/products/dosa-batter-1kg.jpg"
  },
  {
    "barcode": "8901252002553",
    "name": "Chapati (10)",
    "size": "Standard pack",
    "price": 60,
    "category": "Ready to Eat",
    "color": "bg-emerald-100",
    "rating": 4.8,
    "image": "/images/products/chapati--10-.jpg"
  },
  {
    "barcode": "8901252002664",
    "name": "Veg Sandwich",
    "size": "Standard pack",
    "price": 30,
    "category": "Ready to Eat",
    "color": "bg-emerald-100",
    "rating": 4.8999999999999995,
    "image": "/images/products/veg-sandwich.jpg"
  },
  {
    "barcode": "8901252002775",
    "name": "Fruit Bowl",
    "size": "Standard pack",
    "price": 45,
    "category": "Ready to Eat",
    "color": "bg-emerald-100",
    "rating": 4.6,
    "discount": "15% OFF",
    "image": "/images/products/fruit-bowl.jpg"
  },
  {
    "barcode": "8901252002886",
    "name": "Sona Masoori Rice 5kg",
    "size": "Standard pack",
    "price": 30,
    "category": "Staples",
    "color": "bg-yellow-100",
    "rating": 4.699999999999999,
    "image": "/images/products/sona-masoori-rice-5kg.jpg"
  },
  {
    "barcode": "8901252002997",
    "name": "Toor Dal 1kg",
    "size": "Standard pack",
    "price": 450,
    "category": "Staples",
    "color": "bg-yellow-100",
    "rating": 4.8,
    "image": "/images/products/toor-dal-1kg.jpg"
  },
  {
    "barcode": "8901252003108",
    "name": "Atta 5kg",
    "size": "Standard pack",
    "price": 450,
    "category": "Staples",
    "color": "bg-yellow-100",
    "rating": 4.8999999999999995,
    "image": "/images/products/atta-5kg.jpg"
  },
  {
    "barcode": "8901252003219",
    "name": "Sugar 1kg",
    "size": "Standard pack",
    "price": 450,
    "category": "Staples",
    "color": "bg-yellow-100",
    "rating": 4.6,
    "image": "/images/products/sugar-1kg.jpg"
  },
  {
    "barcode": "8901252003330",
    "name": "Sunflower Oil 1L",
    "size": "Standard pack",
    "price": 45,
    "category": "Staples",
    "color": "bg-yellow-100",
    "rating": 4.699999999999999,
    "image": "/images/products/sunflower-oil-1l.jpg"
  },
  {
    "barcode": "8901252003441",
    "name": "Salt 1kg",
    "size": "Standard pack",
    "price": 120,
    "category": "Staples",
    "color": "bg-yellow-100",
    "rating": 4.8,
    "image": "/images/products/salt-1kg.jpg"
  },
  {
    "barcode": "8901252003552",
    "name": "Ragi Flour 1kg",
    "size": "Standard pack",
    "price": 120,
    "category": "Staples",
    "color": "bg-yellow-100",
    "rating": 4.8999999999999995,
    "image": "/images/products/ragi-flour-1kg.jpg"
  },
  {
    "barcode": "8901252003663",
    "name": "Biscuits",
    "size": "Standard pack",
    "price": 250,
    "category": "FMCG",
    "color": "bg-indigo-100",
    "rating": 4.6,
    "image": "/images/products/biscuits.jpg"
  },
  {
    "barcode": "8901252003774",
    "name": "Instant Noodles",
    "size": "Standard pack",
    "price": 120,
    "category": "FMCG",
    "color": "bg-indigo-100",
    "rating": 4.699999999999999,
    "image": "/images/products/instant-noodles.jpg"
  },
  {
    "barcode": "8901252003885",
    "name": "Tea 250g",
    "size": "Standard pack",
    "price": 30,
    "category": "FMCG",
    "color": "bg-indigo-100",
    "rating": 4.8,
    "image": "/images/products/tea-250g.jpg"
  },
  {
    "barcode": "8901252003996",
    "name": "Coffee Powder 200g",
    "size": "Standard pack",
    "price": 45,
    "category": "FMCG",
    "color": "bg-indigo-100",
    "rating": 4.8999999999999995,
    "image": "/images/products/coffee-powder-200g.jpg"
  },
  {
    "barcode": "8901252004107",
    "name": "Detergent 1kg",
    "size": "Standard pack",
    "price": 120,
    "category": "FMCG",
    "color": "bg-indigo-100",
    "rating": 4.6,
    "image": "/images/products/detergent-1kg.jpg"
  },
  {
    "barcode": "8901252004218",
    "name": "Soap",
    "size": "Standard pack",
    "price": 60,
    "category": "FMCG",
    "color": "bg-indigo-100",
    "rating": 4.699999999999999,
    "image": "/images/products/soap.jpg"
  },
  {
    "barcode": "8901252004329",
    "name": "Toothpaste",
    "size": "Standard pack",
    "price": 250,
    "category": "FMCG",
    "color": "bg-indigo-100",
    "rating": 4.8,
    "image": "/images/products/toothpaste.jpg"
  },
  {
    "barcode": "8901252004440",
    "name": "Namkeen",
    "size": "Standard pack",
    "price": 450,
    "category": "FMCG",
    "color": "bg-indigo-100",
    "rating": 4.8999999999999995,
    "image": "/images/products/namkeen.jpg"
  },
  {
    "barcode": "8901252004551",
    "name": "Chocolate Bar",
    "size": "Standard pack",
    "price": 450,
    "category": "FMCG",
    "color": "bg-indigo-100",
    "rating": 4.6,
    "image": "/images/products/chocolate-bar.jpg"
  },
  {
    "barcode": "8901252004662",
    "name": "Soft Drink 750ml",
    "size": "Standard pack",
    "price": 120,
    "category": "FMCG",
    "color": "bg-indigo-100",
    "rating": 4.699999999999999,
    "image": "/images/products/soft-drink-750ml.jpg"
  }
]

export type WastageDay = { day: string; date: string; wastedCost: number; salesRevenue: number }
export const wastageDaily: WastageDay[] = [
  {
    "day": "Mon",
    "date": "19 Oct",
    "wastedCost": 20805,
    "salesRevenue": 525205
  },
  {
    "day": "Tue",
    "date": "20 Oct",
    "wastedCost": 22270,
    "salesRevenue": 519935
  },
  {
    "day": "Wed",
    "date": "21 Oct",
    "wastedCost": 19420,
    "salesRevenue": 516075
  },
  {
    "day": "Thu",
    "date": "22 Oct",
    "wastedCost": 20935,
    "salesRevenue": 535250
  },
  {
    "day": "Fri",
    "date": "23 Oct",
    "wastedCost": 21735,
    "salesRevenue": 539930
  },
  {
    "day": "Sat",
    "date": "24 Oct",
    "wastedCost": 19690,
    "salesRevenue": 604905
  },
  {
    "day": "Sun",
    "date": "25 Oct",
    "wastedCost": 19795,
    "salesRevenue": 610550
  },
  {
    "day": "Mon",
    "date": "26 Oct",
    "wastedCost": 21555,
    "salesRevenue": 541485
  },
  {
    "day": "Tue",
    "date": "27 Oct",
    "wastedCost": 16950,
    "salesRevenue": 506710
  },
  {
    "day": "Wed",
    "date": "28 Oct",
    "wastedCost": 23740,
    "salesRevenue": 534885
  },
  {
    "day": "Thu",
    "date": "29 Oct",
    "wastedCost": 16890,
    "salesRevenue": 524875
  },
  {
    "day": "Fri",
    "date": "30 Oct",
    "wastedCost": 20765,
    "salesRevenue": 509405
  },
  {
    "day": "Sat",
    "date": "31 Oct",
    "wastedCost": 20880,
    "salesRevenue": 593825
  },
  {
    "day": "Sun",
    "date": "01 Nov",
    "wastedCost": 20450,
    "salesRevenue": 605345
  },
  {
    "day": "Mon",
    "date": "02 Nov",
    "wastedCost": 26385,
    "salesRevenue": 492825
  },
  {
    "day": "Tue",
    "date": "03 Nov",
    "wastedCost": 18590,
    "salesRevenue": 510380
  },
  {
    "day": "Wed",
    "date": "04 Nov",
    "wastedCost": 16425,
    "salesRevenue": 541065
  },
  {
    "day": "Thu",
    "date": "05 Nov",
    "wastedCost": 18960,
    "salesRevenue": 513480
  },
  {
    "day": "Fri",
    "date": "06 Nov",
    "wastedCost": 20540,
    "salesRevenue": 514495
  },
  {
    "day": "Sat",
    "date": "07 Nov",
    "wastedCost": 21255,
    "salesRevenue": 568550
  },
  {
    "day": "Sun",
    "date": "08 Nov",
    "wastedCost": 20050,
    "salesRevenue": 552820
  },
  {
    "day": "Mon",
    "date": "09 Nov",
    "wastedCost": 21540,
    "salesRevenue": 491760
  },
  {
    "day": "Tue",
    "date": "10 Nov",
    "wastedCost": 17815,
    "salesRevenue": 513685
  },
  {
    "day": "Wed",
    "date": "11 Nov",
    "wastedCost": 19945,
    "salesRevenue": 510775
  },
  {
    "day": "Thu",
    "date": "12 Nov",
    "wastedCost": 20740,
    "salesRevenue": 523910
  },
  {
    "day": "Fri",
    "date": "13 Nov",
    "wastedCost": 20380,
    "salesRevenue": 533490
  },
  {
    "day": "Sat",
    "date": "14 Nov",
    "wastedCost": 22300,
    "salesRevenue": 589815
  },
  {
    "day": "Sun",
    "date": "15 Nov",
    "wastedCost": 22680,
    "salesRevenue": 571900
  }
]

export type WastedProduct = { product: string; store: string; qty: number; unitCost: number; reason: string }
export const wastedProducts: WastedProduct[] = [
  {
    "product": "Buttermilk",
    "store": "Indiranagar",
    "qty": 138,
    "unitCost": 250,
    "reason": "Near-expiry date passed"
  },
  {
    "product": "Onion 1kg",
    "store": "RT Nagar",
    "qty": 42,
    "unitCost": 450,
    "reason": "Near-expiry date passed"
  },
  {
    "product": "Onion 1kg",
    "store": "Hennur",
    "qty": 37,
    "unitCost": 450,
    "reason": "Near-expiry date passed"
  },
  {
    "product": "Onion 1kg",
    "store": "BTM Layout",
    "qty": 33,
    "unitCost": 450,
    "reason": "Near-expiry date passed"
  },
  {
    "product": "Onion 1kg",
    "store": "Nagarbhavi",
    "qty": 26,
    "unitCost": 450,
    "reason": "Near-expiry date passed"
  },
  {
    "product": "Onion 1kg",
    "store": "Whitefield",
    "qty": 26,
    "unitCost": 450,
    "reason": "Near-expiry date passed"
  },
  {
    "product": "Onion 1kg",
    "store": "Hebbal",
    "qty": 25,
    "unitCost": 450,
    "reason": "Near-expiry date passed"
  },
  {
    "product": "Onion 1kg",
    "store": "Rajajinagar",
    "qty": 22,
    "unitCost": 450,
    "reason": "Near-expiry date passed"
  },
  {
    "product": "Buttermilk",
    "store": "RT Nagar",
    "qty": 38,
    "unitCost": 250,
    "reason": "Near-expiry date passed"
  },
  {
    "product": "Onion 1kg",
    "store": "Malleshwaram",
    "qty": 21,
    "unitCost": 450,
    "reason": "Near-expiry date passed"
  },
  {
    "product": "Onion 1kg",
    "store": "Indiranagar",
    "qty": 21,
    "unitCost": 450,
    "reason": "Near-expiry date passed"
  },
  {
    "product": "Onion 1kg",
    "store": "Koramangala",
    "qty": 20,
    "unitCost": 450,
    "reason": "Near-expiry date passed"
  },
  {
    "product": "Onion 1kg",
    "store": "Whitefield",
    "qty": 20,
    "unitCost": 450,
    "reason": "Quality audit reject"
  },
  {
    "product": "Onion 1kg",
    "store": "Kalyan Nagar",
    "qty": 20,
    "unitCost": 450,
    "reason": "Near-expiry date passed"
  },
  {
    "product": "Onion 1kg",
    "store": "Sahakar Nagar",
    "qty": 19,
    "unitCost": 450,
    "reason": "Near-expiry date passed"
  }
]

export const shopCategories = [
  "Bakery",
  "Dairy",
  "Fruits & Veg",
  "Ready to Eat",
  "Staples",
  "FMCG"
]

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
export const activity = [
  [
    "09:45 AM",
    "Restock PO approved",
    "HSR Layout (FB-07) · 84 units Scheduled",
    "green"
  ],
  [
    "09:15 AM",
    "Delayed supplier PO",
    "Whitefield (FB-16) · Nandini Dairy delayed",
    "red"
  ],
  [
    "08:50 AM",
    "Critical inspection issue",
    "JP Nagar (FB-05) · Chiller temperature audit",
    "amber"
  ],
  [
    "08:30 AM",
    "Chain AI forecast synced",
    "All 25 stores · 96.2% confidence",
    "blue"
  ],
  [
    "08:05 AM",
    "Flash markdown initiated",
    "Koramangala (FB-06) · 28 units Curd 400g",
    "amber"
  ]
]

export type FastMover = { product: string; latePO: boolean; daysOfCover: number | 'OUT' }
export type StoreExpiringItem = { product: string; category: string; units: number; cost: number; hoursLeft: number }
export type TeamMember = { initials: string; name: string; role: string; shift: string; status: 'On shift' | 'Late' | 'Off' | 'Break' }
export type StoreWastagePoint = { day: number; value: number }

export const fastMoversPerStore: Record<string, FastMover[]> = {
  "Marathahalli": [
    {
      "product": "Chapati (10)",
      "latePO": true,
      "daysOfCover": 0.3
    },
    {
      "product": "Onion 1kg",
      "latePO": true,
      "daysOfCover": 0.3
    },
    {
      "product": "Banana Cake",
      "latePO": true,
      "daysOfCover": 0.2
    },
    {
      "product": "Dosa Batter 1kg",
      "latePO": true,
      "daysOfCover": 0.2
    },
    {
      "product": "Buttermilk",
      "latePO": true,
      "daysOfCover": 0.2
    },
    {
      "product": "Soft Drink 750ml",
      "latePO": true,
      "daysOfCover": 1.3
    },
    {
      "product": "Tomato 1kg",
      "latePO": false,
      "daysOfCover": 0.3
    },
    {
      "product": "Croissant",
      "latePO": false,
      "daysOfCover": 0.3
    }
  ],
  "FB-17": [
    {
      "product": "Chapati (10)",
      "latePO": true,
      "daysOfCover": 0.3
    },
    {
      "product": "Onion 1kg",
      "latePO": true,
      "daysOfCover": 0.3
    },
    {
      "product": "Banana Cake",
      "latePO": true,
      "daysOfCover": 0.2
    },
    {
      "product": "Dosa Batter 1kg",
      "latePO": true,
      "daysOfCover": 0.2
    },
    {
      "product": "Buttermilk",
      "latePO": true,
      "daysOfCover": 0.2
    },
    {
      "product": "Soft Drink 750ml",
      "latePO": true,
      "daysOfCover": 1.3
    },
    {
      "product": "Tomato 1kg",
      "latePO": false,
      "daysOfCover": 0.3
    },
    {
      "product": "Croissant",
      "latePO": false,
      "daysOfCover": 0.3
    }
  ],
  "Vijayanagar": [
    {
      "product": "Chapati (10)",
      "latePO": false,
      "daysOfCover": 1.8
    },
    {
      "product": "Onion 1kg",
      "latePO": false,
      "daysOfCover": 1.8
    },
    {
      "product": "Banana Cake",
      "latePO": false,
      "daysOfCover": 1.9
    },
    {
      "product": "Buttermilk",
      "latePO": false,
      "daysOfCover": 2
    },
    {
      "product": "Dosa Batter 1kg",
      "latePO": false,
      "daysOfCover": 1.8
    },
    {
      "product": "Soft Drink 750ml",
      "latePO": false,
      "daysOfCover": 12.5
    },
    {
      "product": "Tomato 1kg",
      "latePO": false,
      "daysOfCover": 2
    },
    {
      "product": "Pav",
      "latePO": false,
      "daysOfCover": 2.6
    }
  ],
  "FB-12": [
    {
      "product": "Chapati (10)",
      "latePO": false,
      "daysOfCover": 1.8
    },
    {
      "product": "Onion 1kg",
      "latePO": false,
      "daysOfCover": 1.8
    },
    {
      "product": "Banana Cake",
      "latePO": false,
      "daysOfCover": 1.9
    },
    {
      "product": "Buttermilk",
      "latePO": false,
      "daysOfCover": 2
    },
    {
      "product": "Dosa Batter 1kg",
      "latePO": false,
      "daysOfCover": 1.8
    },
    {
      "product": "Soft Drink 750ml",
      "latePO": false,
      "daysOfCover": 12.5
    },
    {
      "product": "Tomato 1kg",
      "latePO": false,
      "daysOfCover": 2
    },
    {
      "product": "Pav",
      "latePO": false,
      "daysOfCover": 2.6
    }
  ],
  "Indiranagar": [
    {
      "product": "Chapati (10)",
      "latePO": false,
      "daysOfCover": 1.8
    },
    {
      "product": "Onion 1kg",
      "latePO": false,
      "daysOfCover": 1.9
    },
    {
      "product": "Dosa Batter 1kg",
      "latePO": false,
      "daysOfCover": 2.7
    },
    {
      "product": "Buttermilk",
      "latePO": true,
      "daysOfCover": 4.7
    },
    {
      "product": "Banana Cake",
      "latePO": false,
      "daysOfCover": 2.3
    },
    {
      "product": "Soft Drink 750ml",
      "latePO": false,
      "daysOfCover": 13.1
    },
    {
      "product": "Pav",
      "latePO": false,
      "daysOfCover": 3
    },
    {
      "product": "Tomato 1kg",
      "latePO": false,
      "daysOfCover": 1.9
    }
  ],
  "FB-08": [
    {
      "product": "Chapati (10)",
      "latePO": false,
      "daysOfCover": 1.8
    },
    {
      "product": "Onion 1kg",
      "latePO": false,
      "daysOfCover": 1.9
    },
    {
      "product": "Dosa Batter 1kg",
      "latePO": false,
      "daysOfCover": 2.7
    },
    {
      "product": "Buttermilk",
      "latePO": true,
      "daysOfCover": 4.7
    },
    {
      "product": "Banana Cake",
      "latePO": false,
      "daysOfCover": 2.3
    },
    {
      "product": "Soft Drink 750ml",
      "latePO": false,
      "daysOfCover": 13.1
    },
    {
      "product": "Pav",
      "latePO": false,
      "daysOfCover": 3
    },
    {
      "product": "Tomato 1kg",
      "latePO": false,
      "daysOfCover": 1.9
    }
  ],
  "RT Nagar": [
    {
      "product": "Chapati (10)",
      "latePO": false,
      "daysOfCover": 2.1
    },
    {
      "product": "Onion 1kg",
      "latePO": false,
      "daysOfCover": 1.9
    },
    {
      "product": "Dosa Batter 1kg",
      "latePO": false,
      "daysOfCover": 2.7
    },
    {
      "product": "Soft Drink 750ml",
      "latePO": false,
      "daysOfCover": 15.8
    },
    {
      "product": "Banana Cake",
      "latePO": false,
      "daysOfCover": 2.2
    },
    {
      "product": "Buttermilk",
      "latePO": false,
      "daysOfCover": 2.5
    },
    {
      "product": "Tomato 1kg",
      "latePO": false,
      "daysOfCover": 2.1
    },
    {
      "product": "Pav",
      "latePO": false,
      "daysOfCover": 2.3
    }
  ],
  "FB-13": [
    {
      "product": "Chapati (10)",
      "latePO": false,
      "daysOfCover": 2.1
    },
    {
      "product": "Onion 1kg",
      "latePO": false,
      "daysOfCover": 1.9
    },
    {
      "product": "Dosa Batter 1kg",
      "latePO": false,
      "daysOfCover": 2.7
    },
    {
      "product": "Soft Drink 750ml",
      "latePO": false,
      "daysOfCover": 15.8
    },
    {
      "product": "Banana Cake",
      "latePO": false,
      "daysOfCover": 2.2
    },
    {
      "product": "Buttermilk",
      "latePO": false,
      "daysOfCover": 2.5
    },
    {
      "product": "Tomato 1kg",
      "latePO": false,
      "daysOfCover": 2.1
    },
    {
      "product": "Pav",
      "latePO": false,
      "daysOfCover": 2.3
    }
  ],
  "Hennur": [
    {
      "product": "Chapati (10)",
      "latePO": false,
      "daysOfCover": 2.3
    },
    {
      "product": "Onion 1kg",
      "latePO": false,
      "daysOfCover": 1.8
    },
    {
      "product": "Dosa Batter 1kg",
      "latePO": false,
      "daysOfCover": 1.9
    },
    {
      "product": "Banana Cake",
      "latePO": false,
      "daysOfCover": 1.6
    },
    {
      "product": "Buttermilk",
      "latePO": false,
      "daysOfCover": 2
    },
    {
      "product": "Tomato 1kg",
      "latePO": false,
      "daysOfCover": 2
    },
    {
      "product": "Pav",
      "latePO": false,
      "daysOfCover": 2.3
    },
    {
      "product": "Soft Drink 750ml",
      "latePO": false,
      "daysOfCover": 13.5
    }
  ],
  "FB-22": [
    {
      "product": "Chapati (10)",
      "latePO": false,
      "daysOfCover": 2.3
    },
    {
      "product": "Onion 1kg",
      "latePO": false,
      "daysOfCover": 1.8
    },
    {
      "product": "Dosa Batter 1kg",
      "latePO": false,
      "daysOfCover": 1.9
    },
    {
      "product": "Banana Cake",
      "latePO": false,
      "daysOfCover": 1.6
    },
    {
      "product": "Buttermilk",
      "latePO": false,
      "daysOfCover": 2
    },
    {
      "product": "Tomato 1kg",
      "latePO": false,
      "daysOfCover": 2
    },
    {
      "product": "Pav",
      "latePO": false,
      "daysOfCover": 2.3
    },
    {
      "product": "Soft Drink 750ml",
      "latePO": false,
      "daysOfCover": 13.5
    }
  ],
  "Nagarbhavi": [
    {
      "product": "Onion 1kg",
      "latePO": false,
      "daysOfCover": 2.1
    },
    {
      "product": "Chapati (10)",
      "latePO": false,
      "daysOfCover": 2.4
    },
    {
      "product": "Buttermilk",
      "latePO": false,
      "daysOfCover": 2.1
    },
    {
      "product": "Dosa Batter 1kg",
      "latePO": false,
      "daysOfCover": 2
    },
    {
      "product": "Banana Cake",
      "latePO": false,
      "daysOfCover": 1.9
    },
    {
      "product": "Soft Drink 750ml",
      "latePO": false,
      "daysOfCover": 17.8
    },
    {
      "product": "Tomato 1kg",
      "latePO": false,
      "daysOfCover": 2.1
    },
    {
      "product": "Pav",
      "latePO": false,
      "daysOfCover": 2.4
    }
  ],
  "FB-21": [
    {
      "product": "Onion 1kg",
      "latePO": false,
      "daysOfCover": 2.1
    },
    {
      "product": "Chapati (10)",
      "latePO": false,
      "daysOfCover": 2.4
    },
    {
      "product": "Buttermilk",
      "latePO": false,
      "daysOfCover": 2.1
    },
    {
      "product": "Dosa Batter 1kg",
      "latePO": false,
      "daysOfCover": 2
    },
    {
      "product": "Banana Cake",
      "latePO": false,
      "daysOfCover": 1.9
    },
    {
      "product": "Soft Drink 750ml",
      "latePO": false,
      "daysOfCover": 17.8
    },
    {
      "product": "Tomato 1kg",
      "latePO": false,
      "daysOfCover": 2.1
    },
    {
      "product": "Pav",
      "latePO": false,
      "daysOfCover": 2.4
    }
  ],
  "BTM Layout": [
    {
      "product": "Chapati (10)",
      "latePO": false,
      "daysOfCover": 1.9
    },
    {
      "product": "Onion 1kg",
      "latePO": false,
      "daysOfCover": 1.9
    },
    {
      "product": "Dosa Batter 1kg",
      "latePO": false,
      "daysOfCover": 2.9
    },
    {
      "product": "Buttermilk",
      "latePO": false,
      "daysOfCover": 2.9
    },
    {
      "product": "Banana Cake",
      "latePO": false,
      "daysOfCover": 1.9
    },
    {
      "product": "Soft Drink 750ml",
      "latePO": false,
      "daysOfCover": 17.5
    },
    {
      "product": "Ragi Flour 1kg",
      "latePO": false,
      "daysOfCover": 12.8
    },
    {
      "product": "Pav",
      "latePO": false,
      "daysOfCover": 2.4
    }
  ],
  "FB-02": [
    {
      "product": "Chapati (10)",
      "latePO": false,
      "daysOfCover": 1.9
    },
    {
      "product": "Onion 1kg",
      "latePO": false,
      "daysOfCover": 1.9
    },
    {
      "product": "Dosa Batter 1kg",
      "latePO": false,
      "daysOfCover": 2.9
    },
    {
      "product": "Buttermilk",
      "latePO": false,
      "daysOfCover": 2.9
    },
    {
      "product": "Banana Cake",
      "latePO": false,
      "daysOfCover": 1.9
    },
    {
      "product": "Soft Drink 750ml",
      "latePO": false,
      "daysOfCover": 17.5
    },
    {
      "product": "Ragi Flour 1kg",
      "latePO": false,
      "daysOfCover": 12.8
    },
    {
      "product": "Pav",
      "latePO": false,
      "daysOfCover": 2.4
    }
  ],
  "Whitefield": [
    {
      "product": "Chapati (10)",
      "latePO": false,
      "daysOfCover": 2
    },
    {
      "product": "Onion 1kg",
      "latePO": false,
      "daysOfCover": 2.5
    },
    {
      "product": "Banana Cake",
      "latePO": false,
      "daysOfCover": 1.9
    },
    {
      "product": "Soft Drink 750ml",
      "latePO": false,
      "daysOfCover": 13.8
    },
    {
      "product": "Dosa Batter 1kg",
      "latePO": false,
      "daysOfCover": 2
    },
    {
      "product": "Buttermilk",
      "latePO": false,
      "daysOfCover": 2.9
    },
    {
      "product": "Tomato 1kg",
      "latePO": false,
      "daysOfCover": 2.4
    },
    {
      "product": "Pav",
      "latePO": false,
      "daysOfCover": 2.4
    }
  ],
  "FB-16": [
    {
      "product": "Chapati (10)",
      "latePO": false,
      "daysOfCover": 2
    },
    {
      "product": "Onion 1kg",
      "latePO": false,
      "daysOfCover": 2.5
    },
    {
      "product": "Banana Cake",
      "latePO": false,
      "daysOfCover": 1.9
    },
    {
      "product": "Soft Drink 750ml",
      "latePO": false,
      "daysOfCover": 13.8
    },
    {
      "product": "Dosa Batter 1kg",
      "latePO": false,
      "daysOfCover": 2
    },
    {
      "product": "Buttermilk",
      "latePO": false,
      "daysOfCover": 2.9
    },
    {
      "product": "Tomato 1kg",
      "latePO": false,
      "daysOfCover": 2.4
    },
    {
      "product": "Pav",
      "latePO": false,
      "daysOfCover": 2.4
    }
  ],
  "Electronic City": [
    {
      "product": "Chapati (10)",
      "latePO": false,
      "daysOfCover": 2.7
    },
    {
      "product": "Onion 1kg",
      "latePO": false,
      "daysOfCover": 2.3
    },
    {
      "product": "Banana Cake",
      "latePO": false,
      "daysOfCover": 2.6
    },
    {
      "product": "Dosa Batter 1kg",
      "latePO": false,
      "daysOfCover": 2
    },
    {
      "product": "Soft Drink 750ml",
      "latePO": false,
      "daysOfCover": 12.8
    },
    {
      "product": "Buttermilk",
      "latePO": true,
      "daysOfCover": 2.8
    },
    {
      "product": "Tomato 1kg",
      "latePO": false,
      "daysOfCover": 3.1
    },
    {
      "product": "Pav",
      "latePO": false,
      "daysOfCover": 2.1
    }
  ],
  "FB-19": [
    {
      "product": "Chapati (10)",
      "latePO": false,
      "daysOfCover": 2.7
    },
    {
      "product": "Onion 1kg",
      "latePO": false,
      "daysOfCover": 2.3
    },
    {
      "product": "Banana Cake",
      "latePO": false,
      "daysOfCover": 2.6
    },
    {
      "product": "Dosa Batter 1kg",
      "latePO": false,
      "daysOfCover": 2
    },
    {
      "product": "Soft Drink 750ml",
      "latePO": false,
      "daysOfCover": 12.8
    },
    {
      "product": "Buttermilk",
      "latePO": true,
      "daysOfCover": 2.8
    },
    {
      "product": "Tomato 1kg",
      "latePO": false,
      "daysOfCover": 3.1
    },
    {
      "product": "Pav",
      "latePO": false,
      "daysOfCover": 2.1
    }
  ],
  "Ulsoor": [
    {
      "product": "Onion 1kg",
      "latePO": false,
      "daysOfCover": 1.7
    },
    {
      "product": "Chapati (10)",
      "latePO": false,
      "daysOfCover": 1.7
    },
    {
      "product": "Banana Cake",
      "latePO": false,
      "daysOfCover": 1.8
    },
    {
      "product": "Dosa Batter 1kg",
      "latePO": false,
      "daysOfCover": 2
    },
    {
      "product": "Soft Drink 750ml",
      "latePO": false,
      "daysOfCover": 12.4
    },
    {
      "product": "Buttermilk",
      "latePO": false,
      "daysOfCover": 2.2
    },
    {
      "product": "Tomato 1kg",
      "latePO": false,
      "daysOfCover": 2.1
    },
    {
      "product": "Pav",
      "latePO": false,
      "daysOfCover": 2.1
    }
  ],
  "FB-25": [
    {
      "product": "Onion 1kg",
      "latePO": false,
      "daysOfCover": 1.7
    },
    {
      "product": "Chapati (10)",
      "latePO": false,
      "daysOfCover": 1.7
    },
    {
      "product": "Banana Cake",
      "latePO": false,
      "daysOfCover": 1.8
    },
    {
      "product": "Dosa Batter 1kg",
      "latePO": false,
      "daysOfCover": 2
    },
    {
      "product": "Soft Drink 750ml",
      "latePO": false,
      "daysOfCover": 12.4
    },
    {
      "product": "Buttermilk",
      "latePO": false,
      "daysOfCover": 2.2
    },
    {
      "product": "Tomato 1kg",
      "latePO": false,
      "daysOfCover": 2.1
    },
    {
      "product": "Pav",
      "latePO": false,
      "daysOfCover": 2.1
    }
  ],
  "Kengeri": [
    {
      "product": "Chapati (10)",
      "latePO": false,
      "daysOfCover": 2.2
    },
    {
      "product": "Onion 1kg",
      "latePO": false,
      "daysOfCover": 1.9
    },
    {
      "product": "Dosa Batter 1kg",
      "latePO": false,
      "daysOfCover": 2.7
    },
    {
      "product": "Banana Cake",
      "latePO": false,
      "daysOfCover": 2.6
    },
    {
      "product": "Buttermilk",
      "latePO": false,
      "daysOfCover": 2.3
    },
    {
      "product": "Soft Drink 750ml",
      "latePO": false,
      "daysOfCover": 11.8
    },
    {
      "product": "Pav",
      "latePO": false,
      "daysOfCover": 1.8
    },
    {
      "product": "Ragi Flour 1kg",
      "latePO": false,
      "daysOfCover": 14.1
    }
  ],
  "FB-20": [
    {
      "product": "Chapati (10)",
      "latePO": false,
      "daysOfCover": 2.2
    },
    {
      "product": "Onion 1kg",
      "latePO": false,
      "daysOfCover": 1.9
    },
    {
      "product": "Dosa Batter 1kg",
      "latePO": false,
      "daysOfCover": 2.7
    },
    {
      "product": "Banana Cake",
      "latePO": false,
      "daysOfCover": 2.6
    },
    {
      "product": "Buttermilk",
      "latePO": false,
      "daysOfCover": 2.3
    },
    {
      "product": "Soft Drink 750ml",
      "latePO": false,
      "daysOfCover": 11.8
    },
    {
      "product": "Pav",
      "latePO": false,
      "daysOfCover": 1.8
    },
    {
      "product": "Ragi Flour 1kg",
      "latePO": false,
      "daysOfCover": 14.1
    }
  ],
  "Hebbal": [
    {
      "product": "Chapati (10)",
      "latePO": false,
      "daysOfCover": 2.4
    },
    {
      "product": "Onion 1kg",
      "latePO": false,
      "daysOfCover": 2.7
    },
    {
      "product": "Banana Cake",
      "latePO": false,
      "daysOfCover": 2.2
    },
    {
      "product": "Dosa Batter 1kg",
      "latePO": false,
      "daysOfCover": 2.6
    },
    {
      "product": "Buttermilk",
      "latePO": false,
      "daysOfCover": 1.7
    },
    {
      "product": "Soft Drink 750ml",
      "latePO": false,
      "daysOfCover": 15.1
    },
    {
      "product": "Pav",
      "latePO": false,
      "daysOfCover": 2.8
    },
    {
      "product": "Ragi Flour 1kg",
      "latePO": true,
      "daysOfCover": 11.9
    }
  ],
  "FB-14": [
    {
      "product": "Chapati (10)",
      "latePO": false,
      "daysOfCover": 2.4
    },
    {
      "product": "Onion 1kg",
      "latePO": false,
      "daysOfCover": 2.7
    },
    {
      "product": "Banana Cake",
      "latePO": false,
      "daysOfCover": 2.2
    },
    {
      "product": "Dosa Batter 1kg",
      "latePO": false,
      "daysOfCover": 2.6
    },
    {
      "product": "Buttermilk",
      "latePO": false,
      "daysOfCover": 1.7
    },
    {
      "product": "Soft Drink 750ml",
      "latePO": false,
      "daysOfCover": 15.1
    },
    {
      "product": "Pav",
      "latePO": false,
      "daysOfCover": 2.8
    },
    {
      "product": "Ragi Flour 1kg",
      "latePO": true,
      "daysOfCover": 11.9
    }
  ],
  "Kalyan Nagar": [
    {
      "product": "Chapati (10)",
      "latePO": false,
      "daysOfCover": 2.3
    },
    {
      "product": "Onion 1kg",
      "latePO": false,
      "daysOfCover": 2.4
    },
    {
      "product": "Banana Cake",
      "latePO": false,
      "daysOfCover": 2.2
    },
    {
      "product": "Dosa Batter 1kg",
      "latePO": false,
      "daysOfCover": 2.7
    },
    {
      "product": "Buttermilk",
      "latePO": false,
      "daysOfCover": 2.6
    },
    {
      "product": "Soft Drink 750ml",
      "latePO": false,
      "daysOfCover": 15.4
    },
    {
      "product": "Ragi Flour 1kg",
      "latePO": false,
      "daysOfCover": 14.4
    },
    {
      "product": "Croissant",
      "latePO": false,
      "daysOfCover": 2
    }
  ],
  "FB-23": [
    {
      "product": "Chapati (10)",
      "latePO": false,
      "daysOfCover": 2.3
    },
    {
      "product": "Onion 1kg",
      "latePO": false,
      "daysOfCover": 2.4
    },
    {
      "product": "Banana Cake",
      "latePO": false,
      "daysOfCover": 2.2
    },
    {
      "product": "Dosa Batter 1kg",
      "latePO": false,
      "daysOfCover": 2.7
    },
    {
      "product": "Buttermilk",
      "latePO": false,
      "daysOfCover": 2.6
    },
    {
      "product": "Soft Drink 750ml",
      "latePO": false,
      "daysOfCover": 15.4
    },
    {
      "product": "Ragi Flour 1kg",
      "latePO": false,
      "daysOfCover": 14.4
    },
    {
      "product": "Croissant",
      "latePO": false,
      "daysOfCover": 2
    }
  ],
  "Banashankari": [
    {
      "product": "Chapati (10)",
      "latePO": false,
      "daysOfCover": 2
    },
    {
      "product": "Onion 1kg",
      "latePO": false,
      "daysOfCover": 1.6
    },
    {
      "product": "Dosa Batter 1kg",
      "latePO": false,
      "daysOfCover": 2.4
    },
    {
      "product": "Buttermilk",
      "latePO": false,
      "daysOfCover": 2.7
    },
    {
      "product": "Banana Cake",
      "latePO": false,
      "daysOfCover": 2.3
    },
    {
      "product": "Soft Drink 750ml",
      "latePO": false,
      "daysOfCover": 11.5
    },
    {
      "product": "Ragi Flour 1kg",
      "latePO": false,
      "daysOfCover": 11.8
    },
    {
      "product": "Pav",
      "latePO": false,
      "daysOfCover": 2.4
    }
  ],
  "FB-03": [
    {
      "product": "Chapati (10)",
      "latePO": false,
      "daysOfCover": 2
    },
    {
      "product": "Onion 1kg",
      "latePO": false,
      "daysOfCover": 1.6
    },
    {
      "product": "Dosa Batter 1kg",
      "latePO": false,
      "daysOfCover": 2.4
    },
    {
      "product": "Buttermilk",
      "latePO": false,
      "daysOfCover": 2.7
    },
    {
      "product": "Banana Cake",
      "latePO": false,
      "daysOfCover": 2.3
    },
    {
      "product": "Soft Drink 750ml",
      "latePO": false,
      "daysOfCover": 11.5
    },
    {
      "product": "Ragi Flour 1kg",
      "latePO": false,
      "daysOfCover": 11.8
    },
    {
      "product": "Pav",
      "latePO": false,
      "daysOfCover": 2.4
    }
  ],
  "Sahakar Nagar": [
    {
      "product": "Chapati (10)",
      "latePO": false,
      "daysOfCover": 2.6
    },
    {
      "product": "Onion 1kg",
      "latePO": false,
      "daysOfCover": 2.8
    },
    {
      "product": "Buttermilk",
      "latePO": false,
      "daysOfCover": 2.3
    },
    {
      "product": "Dosa Batter 1kg",
      "latePO": false,
      "daysOfCover": 1.9
    },
    {
      "product": "Soft Drink 750ml",
      "latePO": false,
      "daysOfCover": 11.4
    },
    {
      "product": "Banana Cake",
      "latePO": false,
      "daysOfCover": 2.2
    },
    {
      "product": "Pav",
      "latePO": false,
      "daysOfCover": 2.5
    },
    {
      "product": "Croissant",
      "latePO": false,
      "daysOfCover": 2.6
    }
  ],
  "FB-24": [
    {
      "product": "Chapati (10)",
      "latePO": false,
      "daysOfCover": 2.6
    },
    {
      "product": "Onion 1kg",
      "latePO": false,
      "daysOfCover": 2.8
    },
    {
      "product": "Buttermilk",
      "latePO": false,
      "daysOfCover": 2.3
    },
    {
      "product": "Dosa Batter 1kg",
      "latePO": false,
      "daysOfCover": 1.9
    },
    {
      "product": "Soft Drink 750ml",
      "latePO": false,
      "daysOfCover": 11.4
    },
    {
      "product": "Banana Cake",
      "latePO": false,
      "daysOfCover": 2.2
    },
    {
      "product": "Pav",
      "latePO": false,
      "daysOfCover": 2.5
    },
    {
      "product": "Croissant",
      "latePO": false,
      "daysOfCover": 2.6
    }
  ],
  "Basavanagudi": [
    {
      "product": "Onion 1kg",
      "latePO": false,
      "daysOfCover": 1.7
    },
    {
      "product": "Chapati (10)",
      "latePO": false,
      "daysOfCover": 2.1
    },
    {
      "product": "Dosa Batter 1kg",
      "latePO": false,
      "daysOfCover": 2.3
    },
    {
      "product": "Buttermilk",
      "latePO": false,
      "daysOfCover": 2.3
    },
    {
      "product": "Banana Cake",
      "latePO": false,
      "daysOfCover": 1.9
    },
    {
      "product": "Soft Drink 750ml",
      "latePO": false,
      "daysOfCover": 14
    },
    {
      "product": "Ragi Flour 1kg",
      "latePO": false,
      "daysOfCover": 14.5
    },
    {
      "product": "Pav",
      "latePO": false,
      "daysOfCover": 2.5
    }
  ],
  "FB-04": [
    {
      "product": "Onion 1kg",
      "latePO": false,
      "daysOfCover": 1.7
    },
    {
      "product": "Chapati (10)",
      "latePO": false,
      "daysOfCover": 2.1
    },
    {
      "product": "Dosa Batter 1kg",
      "latePO": false,
      "daysOfCover": 2.3
    },
    {
      "product": "Buttermilk",
      "latePO": false,
      "daysOfCover": 2.3
    },
    {
      "product": "Banana Cake",
      "latePO": false,
      "daysOfCover": 1.9
    },
    {
      "product": "Soft Drink 750ml",
      "latePO": false,
      "daysOfCover": 14
    },
    {
      "product": "Ragi Flour 1kg",
      "latePO": false,
      "daysOfCover": 14.5
    },
    {
      "product": "Pav",
      "latePO": false,
      "daysOfCover": 2.5
    }
  ],
  "Rajajinagar": [
    {
      "product": "Chapati (10)",
      "latePO": false,
      "daysOfCover": 1.8
    },
    {
      "product": "Onion 1kg",
      "latePO": false,
      "daysOfCover": 1.8
    },
    {
      "product": "Banana Cake",
      "latePO": false,
      "daysOfCover": 1.8
    },
    {
      "product": "Dosa Batter 1kg",
      "latePO": false,
      "daysOfCover": 2
    },
    {
      "product": "Buttermilk",
      "latePO": false,
      "daysOfCover": 3
    },
    {
      "product": "Tomato 1kg",
      "latePO": false,
      "daysOfCover": 1.8
    },
    {
      "product": "Soft Drink 750ml",
      "latePO": false,
      "daysOfCover": 12.6
    },
    {
      "product": "Pav",
      "latePO": false,
      "daysOfCover": 2.2
    }
  ],
  "FB-11": [
    {
      "product": "Chapati (10)",
      "latePO": false,
      "daysOfCover": 1.8
    },
    {
      "product": "Onion 1kg",
      "latePO": false,
      "daysOfCover": 1.8
    },
    {
      "product": "Banana Cake",
      "latePO": false,
      "daysOfCover": 1.8
    },
    {
      "product": "Dosa Batter 1kg",
      "latePO": false,
      "daysOfCover": 2
    },
    {
      "product": "Buttermilk",
      "latePO": false,
      "daysOfCover": 3
    },
    {
      "product": "Tomato 1kg",
      "latePO": false,
      "daysOfCover": 1.8
    },
    {
      "product": "Soft Drink 750ml",
      "latePO": false,
      "daysOfCover": 12.6
    },
    {
      "product": "Pav",
      "latePO": false,
      "daysOfCover": 2.2
    }
  ],
  "Jayanagar": [
    {
      "product": "Chapati (10)",
      "latePO": false,
      "daysOfCover": 2.7
    },
    {
      "product": "Onion 1kg",
      "latePO": false,
      "daysOfCover": 1.9
    },
    {
      "product": "Banana Cake",
      "latePO": false,
      "daysOfCover": 2.1
    },
    {
      "product": "Dosa Batter 1kg",
      "latePO": false,
      "daysOfCover": 2.8
    },
    {
      "product": "Buttermilk",
      "latePO": false,
      "daysOfCover": 2.7
    },
    {
      "product": "Soft Drink 750ml",
      "latePO": false,
      "daysOfCover": 11
    },
    {
      "product": "Ragi Flour 1kg",
      "latePO": false,
      "daysOfCover": 11.8
    },
    {
      "product": "Tomato 1kg",
      "latePO": false,
      "daysOfCover": 2.2
    }
  ],
  "FB-01": [
    {
      "product": "Chapati (10)",
      "latePO": false,
      "daysOfCover": 2.7
    },
    {
      "product": "Onion 1kg",
      "latePO": false,
      "daysOfCover": 1.9
    },
    {
      "product": "Banana Cake",
      "latePO": false,
      "daysOfCover": 2.1
    },
    {
      "product": "Dosa Batter 1kg",
      "latePO": false,
      "daysOfCover": 2.8
    },
    {
      "product": "Buttermilk",
      "latePO": false,
      "daysOfCover": 2.7
    },
    {
      "product": "Soft Drink 750ml",
      "latePO": false,
      "daysOfCover": 11
    },
    {
      "product": "Ragi Flour 1kg",
      "latePO": false,
      "daysOfCover": 11.8
    },
    {
      "product": "Tomato 1kg",
      "latePO": false,
      "daysOfCover": 2.2
    }
  ],
  "Koramangala": [
    {
      "product": "Chapati (10)",
      "latePO": false,
      "daysOfCover": 1.9
    },
    {
      "product": "Onion 1kg",
      "latePO": false,
      "daysOfCover": 2.1
    },
    {
      "product": "Buttermilk",
      "latePO": false,
      "daysOfCover": 1.7
    },
    {
      "product": "Dosa Batter 1kg",
      "latePO": false,
      "daysOfCover": 2.4
    },
    {
      "product": "Banana Cake",
      "latePO": false,
      "daysOfCover": 2.2
    },
    {
      "product": "Soft Drink 750ml",
      "latePO": false,
      "daysOfCover": 17.1
    },
    {
      "product": "Pav",
      "latePO": false,
      "daysOfCover": 2.1
    },
    {
      "product": "Ragi Flour 1kg",
      "latePO": false,
      "daysOfCover": 17
    }
  ],
  "FB-06": [
    {
      "product": "Chapati (10)",
      "latePO": false,
      "daysOfCover": 1.9
    },
    {
      "product": "Onion 1kg",
      "latePO": false,
      "daysOfCover": 2.1
    },
    {
      "product": "Buttermilk",
      "latePO": false,
      "daysOfCover": 1.7
    },
    {
      "product": "Dosa Batter 1kg",
      "latePO": false,
      "daysOfCover": 2.4
    },
    {
      "product": "Banana Cake",
      "latePO": false,
      "daysOfCover": 2.2
    },
    {
      "product": "Soft Drink 750ml",
      "latePO": false,
      "daysOfCover": 17.1
    },
    {
      "product": "Pav",
      "latePO": false,
      "daysOfCover": 2.1
    },
    {
      "product": "Ragi Flour 1kg",
      "latePO": false,
      "daysOfCover": 17
    }
  ],
  "Domlur": [
    {
      "product": "Chapati (10)",
      "latePO": false,
      "daysOfCover": 2.4
    },
    {
      "product": "Onion 1kg",
      "latePO": false,
      "daysOfCover": 2.4
    },
    {
      "product": "Banana Cake",
      "latePO": false,
      "daysOfCover": 2.4
    },
    {
      "product": "Dosa Batter 1kg",
      "latePO": false,
      "daysOfCover": 2.3
    },
    {
      "product": "Buttermilk",
      "latePO": false,
      "daysOfCover": 3
    },
    {
      "product": "Tomato 1kg",
      "latePO": false,
      "daysOfCover": 1.7
    },
    {
      "product": "Soft Drink 750ml",
      "latePO": false,
      "daysOfCover": 18.7
    },
    {
      "product": "Pav",
      "latePO": false,
      "daysOfCover": 2.4
    }
  ],
  "FB-09": [
    {
      "product": "Chapati (10)",
      "latePO": false,
      "daysOfCover": 2.4
    },
    {
      "product": "Onion 1kg",
      "latePO": false,
      "daysOfCover": 2.4
    },
    {
      "product": "Banana Cake",
      "latePO": false,
      "daysOfCover": 2.4
    },
    {
      "product": "Dosa Batter 1kg",
      "latePO": false,
      "daysOfCover": 2.3
    },
    {
      "product": "Buttermilk",
      "latePO": false,
      "daysOfCover": 3
    },
    {
      "product": "Tomato 1kg",
      "latePO": false,
      "daysOfCover": 1.7
    },
    {
      "product": "Soft Drink 750ml",
      "latePO": false,
      "daysOfCover": 18.7
    },
    {
      "product": "Pav",
      "latePO": false,
      "daysOfCover": 2.4
    }
  ],
  "Malleshwaram": [
    {
      "product": "Chapati (10)",
      "latePO": false,
      "daysOfCover": 1.8
    },
    {
      "product": "Onion 1kg",
      "latePO": false,
      "daysOfCover": 2.4
    },
    {
      "product": "Buttermilk",
      "latePO": false,
      "daysOfCover": 2
    },
    {
      "product": "Banana Cake",
      "latePO": false,
      "daysOfCover": 3
    },
    {
      "product": "Dosa Batter 1kg",
      "latePO": false,
      "daysOfCover": 2.2
    },
    {
      "product": "Soft Drink 750ml",
      "latePO": false,
      "daysOfCover": 13.8
    },
    {
      "product": "Tomato 1kg",
      "latePO": false,
      "daysOfCover": 2
    },
    {
      "product": "Pav",
      "latePO": false,
      "daysOfCover": 2.6
    }
  ],
  "FB-10": [
    {
      "product": "Chapati (10)",
      "latePO": false,
      "daysOfCover": 1.8
    },
    {
      "product": "Onion 1kg",
      "latePO": false,
      "daysOfCover": 2.4
    },
    {
      "product": "Buttermilk",
      "latePO": false,
      "daysOfCover": 2
    },
    {
      "product": "Banana Cake",
      "latePO": false,
      "daysOfCover": 3
    },
    {
      "product": "Dosa Batter 1kg",
      "latePO": false,
      "daysOfCover": 2.2
    },
    {
      "product": "Soft Drink 750ml",
      "latePO": false,
      "daysOfCover": 13.8
    },
    {
      "product": "Tomato 1kg",
      "latePO": false,
      "daysOfCover": 2
    },
    {
      "product": "Pav",
      "latePO": false,
      "daysOfCover": 2.6
    }
  ],
  "Bellandur": [
    {
      "product": "Chapati (10)",
      "latePO": false,
      "daysOfCover": 2.3
    },
    {
      "product": "Onion 1kg",
      "latePO": false,
      "daysOfCover": 2
    },
    {
      "product": "Dosa Batter 1kg",
      "latePO": false,
      "daysOfCover": 2.7
    },
    {
      "product": "Banana Cake",
      "latePO": false,
      "daysOfCover": 2.3
    },
    {
      "product": "Soft Drink 750ml",
      "latePO": false,
      "daysOfCover": 12.7
    },
    {
      "product": "Buttermilk",
      "latePO": false,
      "daysOfCover": 2.3
    },
    {
      "product": "Tomato 1kg",
      "latePO": false,
      "daysOfCover": 2.2
    },
    {
      "product": "Ragi Flour 1kg",
      "latePO": false,
      "daysOfCover": 11.2
    }
  ],
  "FB-18": [
    {
      "product": "Chapati (10)",
      "latePO": false,
      "daysOfCover": 2.3
    },
    {
      "product": "Onion 1kg",
      "latePO": false,
      "daysOfCover": 2
    },
    {
      "product": "Dosa Batter 1kg",
      "latePO": false,
      "daysOfCover": 2.7
    },
    {
      "product": "Banana Cake",
      "latePO": false,
      "daysOfCover": 2.3
    },
    {
      "product": "Soft Drink 750ml",
      "latePO": false,
      "daysOfCover": 12.7
    },
    {
      "product": "Buttermilk",
      "latePO": false,
      "daysOfCover": 2.3
    },
    {
      "product": "Tomato 1kg",
      "latePO": false,
      "daysOfCover": 2.2
    },
    {
      "product": "Ragi Flour 1kg",
      "latePO": false,
      "daysOfCover": 11.2
    }
  ],
  "JP Nagar": [
    {
      "product": "Chapati (10)",
      "latePO": true,
      "daysOfCover": 2
    },
    {
      "product": "Onion 1kg",
      "latePO": false,
      "daysOfCover": 1.9
    },
    {
      "product": "Buttermilk",
      "latePO": false,
      "daysOfCover": 2.3
    },
    {
      "product": "Soft Drink 750ml",
      "latePO": false,
      "daysOfCover": 10.6
    },
    {
      "product": "Dosa Batter 1kg",
      "latePO": false,
      "daysOfCover": 1.6
    },
    {
      "product": "Banana Cake",
      "latePO": false,
      "daysOfCover": 1.5
    },
    {
      "product": "Tomato 1kg",
      "latePO": false,
      "daysOfCover": 1.8
    },
    {
      "product": "Ragi Flour 1kg",
      "latePO": false,
      "daysOfCover": 12.7
    }
  ],
  "FB-05": [
    {
      "product": "Chapati (10)",
      "latePO": true,
      "daysOfCover": 2
    },
    {
      "product": "Onion 1kg",
      "latePO": false,
      "daysOfCover": 1.9
    },
    {
      "product": "Buttermilk",
      "latePO": false,
      "daysOfCover": 2.3
    },
    {
      "product": "Soft Drink 750ml",
      "latePO": false,
      "daysOfCover": 10.6
    },
    {
      "product": "Dosa Batter 1kg",
      "latePO": false,
      "daysOfCover": 1.6
    },
    {
      "product": "Banana Cake",
      "latePO": false,
      "daysOfCover": 1.5
    },
    {
      "product": "Tomato 1kg",
      "latePO": false,
      "daysOfCover": 1.8
    },
    {
      "product": "Ragi Flour 1kg",
      "latePO": false,
      "daysOfCover": 12.7
    }
  ],
  "HSR Layout": [
    {
      "product": "Chapati (10)",
      "latePO": false,
      "daysOfCover": 2.7
    },
    {
      "product": "Onion 1kg",
      "latePO": false,
      "daysOfCover": 2.8
    },
    {
      "product": "Dosa Batter 1kg",
      "latePO": false,
      "daysOfCover": 2.7
    },
    {
      "product": "Buttermilk",
      "latePO": false,
      "daysOfCover": 1.9
    },
    {
      "product": "Banana Cake",
      "latePO": false,
      "daysOfCover": 2.5
    },
    {
      "product": "Soft Drink 750ml",
      "latePO": false,
      "daysOfCover": 9.8
    },
    {
      "product": "Pav",
      "latePO": false,
      "daysOfCover": 3
    },
    {
      "product": "Ragi Flour 1kg",
      "latePO": false,
      "daysOfCover": 18.4
    }
  ],
  "FB-07": [
    {
      "product": "Chapati (10)",
      "latePO": false,
      "daysOfCover": 2.7
    },
    {
      "product": "Onion 1kg",
      "latePO": false,
      "daysOfCover": 2.8
    },
    {
      "product": "Dosa Batter 1kg",
      "latePO": false,
      "daysOfCover": 2.7
    },
    {
      "product": "Buttermilk",
      "latePO": false,
      "daysOfCover": 1.9
    },
    {
      "product": "Banana Cake",
      "latePO": false,
      "daysOfCover": 2.5
    },
    {
      "product": "Soft Drink 750ml",
      "latePO": false,
      "daysOfCover": 9.8
    },
    {
      "product": "Pav",
      "latePO": false,
      "daysOfCover": 3
    },
    {
      "product": "Ragi Flour 1kg",
      "latePO": false,
      "daysOfCover": 18.4
    }
  ],
  "Yelahanka": [
    {
      "product": "Chapati (10)",
      "latePO": false,
      "daysOfCover": 1.7
    },
    {
      "product": "Onion 1kg",
      "latePO": false,
      "daysOfCover": 2.1
    },
    {
      "product": "Buttermilk",
      "latePO": false,
      "daysOfCover": 2
    },
    {
      "product": "Banana Cake",
      "latePO": false,
      "daysOfCover": 2.2
    },
    {
      "product": "Dosa Batter 1kg",
      "latePO": false,
      "daysOfCover": 2.8
    },
    {
      "product": "Soft Drink 750ml",
      "latePO": false,
      "daysOfCover": 11.8
    },
    {
      "product": "Pav",
      "latePO": false,
      "daysOfCover": 2.6
    },
    {
      "product": "Tomato 1kg",
      "latePO": false,
      "daysOfCover": 2.6
    }
  ],
  "FB-15": [
    {
      "product": "Chapati (10)",
      "latePO": false,
      "daysOfCover": 1.7
    },
    {
      "product": "Onion 1kg",
      "latePO": false,
      "daysOfCover": 2.1
    },
    {
      "product": "Buttermilk",
      "latePO": false,
      "daysOfCover": 2
    },
    {
      "product": "Banana Cake",
      "latePO": false,
      "daysOfCover": 2.2
    },
    {
      "product": "Dosa Batter 1kg",
      "latePO": false,
      "daysOfCover": 2.8
    },
    {
      "product": "Soft Drink 750ml",
      "latePO": false,
      "daysOfCover": 11.8
    },
    {
      "product": "Pav",
      "latePO": false,
      "daysOfCover": 2.6
    },
    {
      "product": "Tomato 1kg",
      "latePO": false,
      "daysOfCover": 2.6
    }
  ]
}
export const storeExpiringItems: Record<string, StoreExpiringItem[]> = {
  "Marathahalli": [
    {
      "product": "Milk Bread",
      "category": "Bakery",
      "units": 10,
      "cost": 600,
      "hoursLeft": 42
    },
    {
      "product": "Brown Bread",
      "category": "Bakery",
      "units": 4,
      "cost": 240,
      "hoursLeft": 42
    },
    {
      "product": "Pav",
      "category": "Bakery",
      "units": 1,
      "cost": 30,
      "hoursLeft": 14
    },
    {
      "product": "Croissant",
      "category": "Bakery",
      "units": 2,
      "cost": 240,
      "hoursLeft": 14
    },
    {
      "product": "Banana Cake",
      "category": "Bakery",
      "units": 2,
      "cost": 120,
      "hoursLeft": 42
    }
  ],
  "FB-17": [
    {
      "product": "Milk Bread",
      "category": "Bakery",
      "units": 10,
      "cost": 600,
      "hoursLeft": 42
    },
    {
      "product": "Brown Bread",
      "category": "Bakery",
      "units": 4,
      "cost": 240,
      "hoursLeft": 42
    },
    {
      "product": "Pav",
      "category": "Bakery",
      "units": 1,
      "cost": 30,
      "hoursLeft": 14
    },
    {
      "product": "Croissant",
      "category": "Bakery",
      "units": 2,
      "cost": 240,
      "hoursLeft": 14
    },
    {
      "product": "Banana Cake",
      "category": "Bakery",
      "units": 2,
      "cost": 120,
      "hoursLeft": 42
    }
  ],
  "Vijayanagar": [
    {
      "product": "Milk Bread",
      "category": "Bakery",
      "units": 10,
      "cost": 600,
      "hoursLeft": 42
    },
    {
      "product": "Brown Bread",
      "category": "Bakery",
      "units": 5,
      "cost": 300,
      "hoursLeft": 42
    },
    {
      "product": "Pav",
      "category": "Bakery",
      "units": 29,
      "cost": 870,
      "hoursLeft": 14
    },
    {
      "product": "Croissant",
      "category": "Bakery",
      "units": 23,
      "cost": 2760,
      "hoursLeft": 14
    },
    {
      "product": "Banana Cake",
      "category": "Bakery",
      "units": 25,
      "cost": 1500,
      "hoursLeft": 42
    }
  ],
  "FB-12": [
    {
      "product": "Milk Bread",
      "category": "Bakery",
      "units": 10,
      "cost": 600,
      "hoursLeft": 42
    },
    {
      "product": "Brown Bread",
      "category": "Bakery",
      "units": 5,
      "cost": 300,
      "hoursLeft": 42
    },
    {
      "product": "Pav",
      "category": "Bakery",
      "units": 29,
      "cost": 870,
      "hoursLeft": 14
    },
    {
      "product": "Croissant",
      "category": "Bakery",
      "units": 23,
      "cost": 2760,
      "hoursLeft": 14
    },
    {
      "product": "Banana Cake",
      "category": "Bakery",
      "units": 25,
      "cost": 1500,
      "hoursLeft": 42
    }
  ],
  "Indiranagar": [
    {
      "product": "Milk Bread",
      "category": "Bakery",
      "units": 7,
      "cost": 420,
      "hoursLeft": 42
    },
    {
      "product": "Brown Bread",
      "category": "Bakery",
      "units": 3,
      "cost": 180,
      "hoursLeft": 42
    },
    {
      "product": "Pav",
      "category": "Bakery",
      "units": 24,
      "cost": 720,
      "hoursLeft": 14
    },
    {
      "product": "Croissant",
      "category": "Bakery",
      "units": 14,
      "cost": 1680,
      "hoursLeft": 14
    },
    {
      "product": "Banana Cake",
      "category": "Bakery",
      "units": 21,
      "cost": 1260,
      "hoursLeft": 42
    }
  ],
  "FB-08": [
    {
      "product": "Milk Bread",
      "category": "Bakery",
      "units": 7,
      "cost": 420,
      "hoursLeft": 42
    },
    {
      "product": "Brown Bread",
      "category": "Bakery",
      "units": 3,
      "cost": 180,
      "hoursLeft": 42
    },
    {
      "product": "Pav",
      "category": "Bakery",
      "units": 24,
      "cost": 720,
      "hoursLeft": 14
    },
    {
      "product": "Croissant",
      "category": "Bakery",
      "units": 14,
      "cost": 1680,
      "hoursLeft": 14
    },
    {
      "product": "Banana Cake",
      "category": "Bakery",
      "units": 21,
      "cost": 1260,
      "hoursLeft": 42
    }
  ],
  "RT Nagar": [
    {
      "product": "Milk Bread",
      "category": "Bakery",
      "units": 10,
      "cost": 600,
      "hoursLeft": 42
    },
    {
      "product": "Brown Bread",
      "category": "Bakery",
      "units": 5,
      "cost": 300,
      "hoursLeft": 42
    },
    {
      "product": "Pav",
      "category": "Bakery",
      "units": 27,
      "cost": 810,
      "hoursLeft": 14
    },
    {
      "product": "Croissant",
      "category": "Bakery",
      "units": 20,
      "cost": 2400,
      "hoursLeft": 14
    },
    {
      "product": "Banana Cake",
      "category": "Bakery",
      "units": 29,
      "cost": 1740,
      "hoursLeft": 42
    }
  ],
  "FB-13": [
    {
      "product": "Milk Bread",
      "category": "Bakery",
      "units": 10,
      "cost": 600,
      "hoursLeft": 42
    },
    {
      "product": "Brown Bread",
      "category": "Bakery",
      "units": 5,
      "cost": 300,
      "hoursLeft": 42
    },
    {
      "product": "Pav",
      "category": "Bakery",
      "units": 27,
      "cost": 810,
      "hoursLeft": 14
    },
    {
      "product": "Croissant",
      "category": "Bakery",
      "units": 20,
      "cost": 2400,
      "hoursLeft": 14
    },
    {
      "product": "Banana Cake",
      "category": "Bakery",
      "units": 29,
      "cost": 1740,
      "hoursLeft": 42
    }
  ],
  "Hennur": [
    {
      "product": "Milk Bread",
      "category": "Bakery",
      "units": 9,
      "cost": 540,
      "hoursLeft": 42
    },
    {
      "product": "Brown Bread",
      "category": "Bakery",
      "units": 4,
      "cost": 240,
      "hoursLeft": 42
    },
    {
      "product": "Pav",
      "category": "Bakery",
      "units": 28,
      "cost": 840,
      "hoursLeft": 14
    },
    {
      "product": "Croissant",
      "category": "Bakery",
      "units": 28,
      "cost": 3360,
      "hoursLeft": 14
    },
    {
      "product": "Banana Cake",
      "category": "Bakery",
      "units": 23,
      "cost": 1380,
      "hoursLeft": 42
    }
  ],
  "FB-22": [
    {
      "product": "Milk Bread",
      "category": "Bakery",
      "units": 9,
      "cost": 540,
      "hoursLeft": 42
    },
    {
      "product": "Brown Bread",
      "category": "Bakery",
      "units": 4,
      "cost": 240,
      "hoursLeft": 42
    },
    {
      "product": "Pav",
      "category": "Bakery",
      "units": 28,
      "cost": 840,
      "hoursLeft": 14
    },
    {
      "product": "Croissant",
      "category": "Bakery",
      "units": 28,
      "cost": 3360,
      "hoursLeft": 14
    },
    {
      "product": "Banana Cake",
      "category": "Bakery",
      "units": 23,
      "cost": 1380,
      "hoursLeft": 42
    }
  ],
  "Nagarbhavi": [
    {
      "product": "Milk Bread",
      "category": "Bakery",
      "units": 5,
      "cost": 300,
      "hoursLeft": 42
    },
    {
      "product": "Brown Bread",
      "category": "Bakery",
      "units": 3,
      "cost": 180,
      "hoursLeft": 42
    },
    {
      "product": "Pav",
      "category": "Bakery",
      "units": 19,
      "cost": 570,
      "hoursLeft": 14
    },
    {
      "product": "Croissant",
      "category": "Bakery",
      "units": 18,
      "cost": 2160,
      "hoursLeft": 14
    },
    {
      "product": "Banana Cake",
      "category": "Bakery",
      "units": 17,
      "cost": 1020,
      "hoursLeft": 42
    }
  ],
  "FB-21": [
    {
      "product": "Milk Bread",
      "category": "Bakery",
      "units": 5,
      "cost": 300,
      "hoursLeft": 42
    },
    {
      "product": "Brown Bread",
      "category": "Bakery",
      "units": 3,
      "cost": 180,
      "hoursLeft": 42
    },
    {
      "product": "Pav",
      "category": "Bakery",
      "units": 19,
      "cost": 570,
      "hoursLeft": 14
    },
    {
      "product": "Croissant",
      "category": "Bakery",
      "units": 18,
      "cost": 2160,
      "hoursLeft": 14
    },
    {
      "product": "Banana Cake",
      "category": "Bakery",
      "units": 17,
      "cost": 1020,
      "hoursLeft": 42
    }
  ],
  "BTM Layout": [
    {
      "product": "Milk Bread",
      "category": "Bakery",
      "units": 5,
      "cost": 300,
      "hoursLeft": 42
    },
    {
      "product": "Brown Bread",
      "category": "Bakery",
      "units": 4,
      "cost": 240,
      "hoursLeft": 42
    },
    {
      "product": "Pav",
      "category": "Bakery",
      "units": 17,
      "cost": 510,
      "hoursLeft": 14
    },
    {
      "product": "Croissant",
      "category": "Bakery",
      "units": 14,
      "cost": 1680,
      "hoursLeft": 14
    },
    {
      "product": "Banana Cake",
      "category": "Bakery",
      "units": 17,
      "cost": 1020,
      "hoursLeft": 42
    }
  ],
  "FB-02": [
    {
      "product": "Milk Bread",
      "category": "Bakery",
      "units": 5,
      "cost": 300,
      "hoursLeft": 42
    },
    {
      "product": "Brown Bread",
      "category": "Bakery",
      "units": 4,
      "cost": 240,
      "hoursLeft": 42
    },
    {
      "product": "Pav",
      "category": "Bakery",
      "units": 17,
      "cost": 510,
      "hoursLeft": 14
    },
    {
      "product": "Croissant",
      "category": "Bakery",
      "units": 14,
      "cost": 1680,
      "hoursLeft": 14
    },
    {
      "product": "Banana Cake",
      "category": "Bakery",
      "units": 17,
      "cost": 1020,
      "hoursLeft": 42
    }
  ],
  "Whitefield": [
    {
      "product": "Milk Bread",
      "category": "Bakery",
      "units": 9,
      "cost": 540,
      "hoursLeft": 42
    },
    {
      "product": "Brown Bread",
      "category": "Bakery",
      "units": 4,
      "cost": 240,
      "hoursLeft": 42
    },
    {
      "product": "Pav",
      "category": "Bakery",
      "units": 17,
      "cost": 510,
      "hoursLeft": 14
    },
    {
      "product": "Croissant",
      "category": "Bakery",
      "units": 15,
      "cost": 1800,
      "hoursLeft": 14
    },
    {
      "product": "Banana Cake",
      "category": "Bakery",
      "units": 19,
      "cost": 1140,
      "hoursLeft": 42
    }
  ],
  "FB-16": [
    {
      "product": "Milk Bread",
      "category": "Bakery",
      "units": 9,
      "cost": 540,
      "hoursLeft": 42
    },
    {
      "product": "Brown Bread",
      "category": "Bakery",
      "units": 4,
      "cost": 240,
      "hoursLeft": 42
    },
    {
      "product": "Pav",
      "category": "Bakery",
      "units": 17,
      "cost": 510,
      "hoursLeft": 14
    },
    {
      "product": "Croissant",
      "category": "Bakery",
      "units": 15,
      "cost": 1800,
      "hoursLeft": 14
    },
    {
      "product": "Banana Cake",
      "category": "Bakery",
      "units": 19,
      "cost": 1140,
      "hoursLeft": 42
    }
  ],
  "Electronic City": [
    {
      "product": "Milk Bread",
      "category": "Bakery",
      "units": 7,
      "cost": 420,
      "hoursLeft": 42
    },
    {
      "product": "Brown Bread",
      "category": "Bakery",
      "units": 3,
      "cost": 180,
      "hoursLeft": 42
    },
    {
      "product": "Pav",
      "category": "Bakery",
      "units": 17,
      "cost": 510,
      "hoursLeft": 14
    },
    {
      "product": "Croissant",
      "category": "Bakery",
      "units": 13,
      "cost": 1560,
      "hoursLeft": 14
    },
    {
      "product": "Banana Cake",
      "category": "Bakery",
      "units": 26,
      "cost": 1560,
      "hoursLeft": 42
    }
  ],
  "FB-19": [
    {
      "product": "Milk Bread",
      "category": "Bakery",
      "units": 7,
      "cost": 420,
      "hoursLeft": 42
    },
    {
      "product": "Brown Bread",
      "category": "Bakery",
      "units": 3,
      "cost": 180,
      "hoursLeft": 42
    },
    {
      "product": "Pav",
      "category": "Bakery",
      "units": 17,
      "cost": 510,
      "hoursLeft": 14
    },
    {
      "product": "Croissant",
      "category": "Bakery",
      "units": 13,
      "cost": 1560,
      "hoursLeft": 14
    },
    {
      "product": "Banana Cake",
      "category": "Bakery",
      "units": 26,
      "cost": 1560,
      "hoursLeft": 42
    }
  ],
  "Ulsoor": [
    {
      "product": "Milk Bread",
      "category": "Bakery",
      "units": 7,
      "cost": 420,
      "hoursLeft": 42
    },
    {
      "product": "Brown Bread",
      "category": "Bakery",
      "units": 2,
      "cost": 120,
      "hoursLeft": 42
    },
    {
      "product": "Pav",
      "category": "Bakery",
      "units": 17,
      "cost": 510,
      "hoursLeft": 14
    },
    {
      "product": "Croissant",
      "category": "Bakery",
      "units": 12,
      "cost": 1440,
      "hoursLeft": 14
    },
    {
      "product": "Banana Cake",
      "category": "Bakery",
      "units": 18,
      "cost": 1080,
      "hoursLeft": 42
    }
  ],
  "FB-25": [
    {
      "product": "Milk Bread",
      "category": "Bakery",
      "units": 7,
      "cost": 420,
      "hoursLeft": 42
    },
    {
      "product": "Brown Bread",
      "category": "Bakery",
      "units": 2,
      "cost": 120,
      "hoursLeft": 42
    },
    {
      "product": "Pav",
      "category": "Bakery",
      "units": 17,
      "cost": 510,
      "hoursLeft": 14
    },
    {
      "product": "Croissant",
      "category": "Bakery",
      "units": 12,
      "cost": 1440,
      "hoursLeft": 14
    },
    {
      "product": "Banana Cake",
      "category": "Bakery",
      "units": 18,
      "cost": 1080,
      "hoursLeft": 42
    }
  ],
  "Kengeri": [
    {
      "product": "Milk Bread",
      "category": "Bakery",
      "units": 10,
      "cost": 600,
      "hoursLeft": 42
    },
    {
      "product": "Brown Bread",
      "category": "Bakery",
      "units": 4,
      "cost": 240,
      "hoursLeft": 42
    },
    {
      "product": "Pav",
      "category": "Bakery",
      "units": 14,
      "cost": 420,
      "hoursLeft": 14
    },
    {
      "product": "Croissant",
      "category": "Bakery",
      "units": 16,
      "cost": 1920,
      "hoursLeft": 14
    },
    {
      "product": "Banana Cake",
      "category": "Bakery",
      "units": 23,
      "cost": 1380,
      "hoursLeft": 42
    }
  ],
  "FB-20": [
    {
      "product": "Milk Bread",
      "category": "Bakery",
      "units": 10,
      "cost": 600,
      "hoursLeft": 42
    },
    {
      "product": "Brown Bread",
      "category": "Bakery",
      "units": 4,
      "cost": 240,
      "hoursLeft": 42
    },
    {
      "product": "Pav",
      "category": "Bakery",
      "units": 14,
      "cost": 420,
      "hoursLeft": 14
    },
    {
      "product": "Croissant",
      "category": "Bakery",
      "units": 16,
      "cost": 1920,
      "hoursLeft": 14
    },
    {
      "product": "Banana Cake",
      "category": "Bakery",
      "units": 23,
      "cost": 1380,
      "hoursLeft": 42
    }
  ],
  "Hebbal": [
    {
      "product": "Milk Bread",
      "category": "Bakery",
      "units": 8,
      "cost": 480,
      "hoursLeft": 42
    },
    {
      "product": "Brown Bread",
      "category": "Bakery",
      "units": 3,
      "cost": 180,
      "hoursLeft": 42
    },
    {
      "product": "Pav",
      "category": "Bakery",
      "units": 22,
      "cost": 660,
      "hoursLeft": 14
    },
    {
      "product": "Croissant",
      "category": "Bakery",
      "units": 15,
      "cost": 1800,
      "hoursLeft": 14
    },
    {
      "product": "Banana Cake",
      "category": "Bakery",
      "units": 20,
      "cost": 1200,
      "hoursLeft": 42
    }
  ],
  "FB-14": [
    {
      "product": "Milk Bread",
      "category": "Bakery",
      "units": 8,
      "cost": 480,
      "hoursLeft": 42
    },
    {
      "product": "Brown Bread",
      "category": "Bakery",
      "units": 3,
      "cost": 180,
      "hoursLeft": 42
    },
    {
      "product": "Pav",
      "category": "Bakery",
      "units": 22,
      "cost": 660,
      "hoursLeft": 14
    },
    {
      "product": "Croissant",
      "category": "Bakery",
      "units": 15,
      "cost": 1800,
      "hoursLeft": 14
    },
    {
      "product": "Banana Cake",
      "category": "Bakery",
      "units": 20,
      "cost": 1200,
      "hoursLeft": 42
    }
  ],
  "Kalyan Nagar": [
    {
      "product": "Milk Bread",
      "category": "Bakery",
      "units": 7,
      "cost": 420,
      "hoursLeft": 42
    },
    {
      "product": "Brown Bread",
      "category": "Bakery",
      "units": 3,
      "cost": 180,
      "hoursLeft": 42
    },
    {
      "product": "Pav",
      "category": "Bakery",
      "units": 18,
      "cost": 540,
      "hoursLeft": 14
    },
    {
      "product": "Croissant",
      "category": "Bakery",
      "units": 14,
      "cost": 1680,
      "hoursLeft": 14
    },
    {
      "product": "Banana Cake",
      "category": "Bakery",
      "units": 20,
      "cost": 1200,
      "hoursLeft": 42
    }
  ],
  "FB-23": [
    {
      "product": "Milk Bread",
      "category": "Bakery",
      "units": 7,
      "cost": 420,
      "hoursLeft": 42
    },
    {
      "product": "Brown Bread",
      "category": "Bakery",
      "units": 3,
      "cost": 180,
      "hoursLeft": 42
    },
    {
      "product": "Pav",
      "category": "Bakery",
      "units": 18,
      "cost": 540,
      "hoursLeft": 14
    },
    {
      "product": "Croissant",
      "category": "Bakery",
      "units": 14,
      "cost": 1680,
      "hoursLeft": 14
    },
    {
      "product": "Banana Cake",
      "category": "Bakery",
      "units": 20,
      "cost": 1200,
      "hoursLeft": 42
    }
  ],
  "Banashankari": [
    {
      "product": "Brown Bread",
      "category": "Bakery",
      "units": 3,
      "cost": 180,
      "hoursLeft": 42
    },
    {
      "product": "Pav",
      "category": "Bakery",
      "units": 12,
      "cost": 360,
      "hoursLeft": 14
    },
    {
      "product": "Croissant",
      "category": "Bakery",
      "units": 15,
      "cost": 1800,
      "hoursLeft": 14
    },
    {
      "product": "Banana Cake",
      "category": "Bakery",
      "units": 14,
      "cost": 840,
      "hoursLeft": 42
    },
    {
      "product": "Rusk",
      "category": "Bakery",
      "units": 6,
      "cost": 360,
      "hoursLeft": 42
    }
  ],
  "FB-03": [
    {
      "product": "Brown Bread",
      "category": "Bakery",
      "units": 3,
      "cost": 180,
      "hoursLeft": 42
    },
    {
      "product": "Pav",
      "category": "Bakery",
      "units": 12,
      "cost": 360,
      "hoursLeft": 14
    },
    {
      "product": "Croissant",
      "category": "Bakery",
      "units": 15,
      "cost": 1800,
      "hoursLeft": 14
    },
    {
      "product": "Banana Cake",
      "category": "Bakery",
      "units": 14,
      "cost": 840,
      "hoursLeft": 42
    },
    {
      "product": "Rusk",
      "category": "Bakery",
      "units": 6,
      "cost": 360,
      "hoursLeft": 42
    }
  ],
  "Sahakar Nagar": [
    {
      "product": "Milk Bread",
      "category": "Bakery",
      "units": 4,
      "cost": 240,
      "hoursLeft": 42
    },
    {
      "product": "Brown Bread",
      "category": "Bakery",
      "units": 1,
      "cost": 60,
      "hoursLeft": 42
    },
    {
      "product": "Pav",
      "category": "Bakery",
      "units": 15,
      "cost": 450,
      "hoursLeft": 14
    },
    {
      "product": "Croissant",
      "category": "Bakery",
      "units": 13,
      "cost": 1560,
      "hoursLeft": 14
    },
    {
      "product": "Banana Cake",
      "category": "Bakery",
      "units": 13,
      "cost": 780,
      "hoursLeft": 42
    }
  ],
  "FB-24": [
    {
      "product": "Milk Bread",
      "category": "Bakery",
      "units": 4,
      "cost": 240,
      "hoursLeft": 42
    },
    {
      "product": "Brown Bread",
      "category": "Bakery",
      "units": 1,
      "cost": 60,
      "hoursLeft": 42
    },
    {
      "product": "Pav",
      "category": "Bakery",
      "units": 15,
      "cost": 450,
      "hoursLeft": 14
    },
    {
      "product": "Croissant",
      "category": "Bakery",
      "units": 13,
      "cost": 1560,
      "hoursLeft": 14
    },
    {
      "product": "Banana Cake",
      "category": "Bakery",
      "units": 13,
      "cost": 780,
      "hoursLeft": 42
    }
  ],
  "Basavanagudi": [
    {
      "product": "Milk Bread",
      "category": "Bakery",
      "units": 7,
      "cost": 420,
      "hoursLeft": 42
    },
    {
      "product": "Brown Bread",
      "category": "Bakery",
      "units": 3,
      "cost": 180,
      "hoursLeft": 42
    },
    {
      "product": "Pav",
      "category": "Bakery",
      "units": 20,
      "cost": 600,
      "hoursLeft": 14
    },
    {
      "product": "Croissant",
      "category": "Bakery",
      "units": 11,
      "cost": 1320,
      "hoursLeft": 14
    },
    {
      "product": "Banana Cake",
      "category": "Bakery",
      "units": 17,
      "cost": 1020,
      "hoursLeft": 42
    }
  ],
  "FB-04": [
    {
      "product": "Milk Bread",
      "category": "Bakery",
      "units": 7,
      "cost": 420,
      "hoursLeft": 42
    },
    {
      "product": "Brown Bread",
      "category": "Bakery",
      "units": 3,
      "cost": 180,
      "hoursLeft": 42
    },
    {
      "product": "Pav",
      "category": "Bakery",
      "units": 20,
      "cost": 600,
      "hoursLeft": 14
    },
    {
      "product": "Croissant",
      "category": "Bakery",
      "units": 11,
      "cost": 1320,
      "hoursLeft": 14
    },
    {
      "product": "Banana Cake",
      "category": "Bakery",
      "units": 17,
      "cost": 1020,
      "hoursLeft": 42
    }
  ],
  "Rajajinagar": [
    {
      "product": "Milk Bread",
      "category": "Bakery",
      "units": 5,
      "cost": 300,
      "hoursLeft": 42
    },
    {
      "product": "Brown Bread",
      "category": "Bakery",
      "units": 2,
      "cost": 120,
      "hoursLeft": 42
    },
    {
      "product": "Pav",
      "category": "Bakery",
      "units": 11,
      "cost": 330,
      "hoursLeft": 14
    },
    {
      "product": "Croissant",
      "category": "Bakery",
      "units": 13,
      "cost": 1560,
      "hoursLeft": 14
    },
    {
      "product": "Banana Cake",
      "category": "Bakery",
      "units": 11,
      "cost": 660,
      "hoursLeft": 42
    }
  ],
  "FB-11": [
    {
      "product": "Milk Bread",
      "category": "Bakery",
      "units": 5,
      "cost": 300,
      "hoursLeft": 42
    },
    {
      "product": "Brown Bread",
      "category": "Bakery",
      "units": 2,
      "cost": 120,
      "hoursLeft": 42
    },
    {
      "product": "Pav",
      "category": "Bakery",
      "units": 11,
      "cost": 330,
      "hoursLeft": 14
    },
    {
      "product": "Croissant",
      "category": "Bakery",
      "units": 13,
      "cost": 1560,
      "hoursLeft": 14
    },
    {
      "product": "Banana Cake",
      "category": "Bakery",
      "units": 11,
      "cost": 660,
      "hoursLeft": 42
    }
  ],
  "Jayanagar": [
    {
      "product": "Milk Bread",
      "category": "Bakery",
      "units": 6,
      "cost": 360,
      "hoursLeft": 42
    },
    {
      "product": "Brown Bread",
      "category": "Bakery",
      "units": 2,
      "cost": 120,
      "hoursLeft": 42
    },
    {
      "product": "Pav",
      "category": "Bakery",
      "units": 12,
      "cost": 360,
      "hoursLeft": 14
    },
    {
      "product": "Croissant",
      "category": "Bakery",
      "units": 14,
      "cost": 1680,
      "hoursLeft": 14
    },
    {
      "product": "Banana Cake",
      "category": "Bakery",
      "units": 15,
      "cost": 900,
      "hoursLeft": 42
    }
  ],
  "FB-01": [
    {
      "product": "Milk Bread",
      "category": "Bakery",
      "units": 6,
      "cost": 360,
      "hoursLeft": 42
    },
    {
      "product": "Brown Bread",
      "category": "Bakery",
      "units": 2,
      "cost": 120,
      "hoursLeft": 42
    },
    {
      "product": "Pav",
      "category": "Bakery",
      "units": 12,
      "cost": 360,
      "hoursLeft": 14
    },
    {
      "product": "Croissant",
      "category": "Bakery",
      "units": 14,
      "cost": 1680,
      "hoursLeft": 14
    },
    {
      "product": "Banana Cake",
      "category": "Bakery",
      "units": 15,
      "cost": 900,
      "hoursLeft": 42
    }
  ],
  "Koramangala": [
    {
      "product": "Milk Bread",
      "category": "Bakery",
      "units": 6,
      "cost": 360,
      "hoursLeft": 42
    },
    {
      "product": "Brown Bread",
      "category": "Bakery",
      "units": 3,
      "cost": 180,
      "hoursLeft": 42
    },
    {
      "product": "Pav",
      "category": "Bakery",
      "units": 17,
      "cost": 510,
      "hoursLeft": 14
    },
    {
      "product": "Croissant",
      "category": "Bakery",
      "units": 15,
      "cost": 1800,
      "hoursLeft": 14
    },
    {
      "product": "Banana Cake",
      "category": "Bakery",
      "units": 20,
      "cost": 1200,
      "hoursLeft": 42
    }
  ],
  "FB-06": [
    {
      "product": "Milk Bread",
      "category": "Bakery",
      "units": 6,
      "cost": 360,
      "hoursLeft": 42
    },
    {
      "product": "Brown Bread",
      "category": "Bakery",
      "units": 3,
      "cost": 180,
      "hoursLeft": 42
    },
    {
      "product": "Pav",
      "category": "Bakery",
      "units": 17,
      "cost": 510,
      "hoursLeft": 14
    },
    {
      "product": "Croissant",
      "category": "Bakery",
      "units": 15,
      "cost": 1800,
      "hoursLeft": 14
    },
    {
      "product": "Banana Cake",
      "category": "Bakery",
      "units": 20,
      "cost": 1200,
      "hoursLeft": 42
    }
  ],
  "Domlur": [
    {
      "product": "Milk Bread",
      "category": "Bakery",
      "units": 7,
      "cost": 420,
      "hoursLeft": 42
    },
    {
      "product": "Brown Bread",
      "category": "Bakery",
      "units": 2,
      "cost": 120,
      "hoursLeft": 42
    },
    {
      "product": "Pav",
      "category": "Bakery",
      "units": 12,
      "cost": 360,
      "hoursLeft": 14
    },
    {
      "product": "Croissant",
      "category": "Bakery",
      "units": 14,
      "cost": 1680,
      "hoursLeft": 14
    },
    {
      "product": "Banana Cake",
      "category": "Bakery",
      "units": 17,
      "cost": 1020,
      "hoursLeft": 42
    }
  ],
  "FB-09": [
    {
      "product": "Milk Bread",
      "category": "Bakery",
      "units": 7,
      "cost": 420,
      "hoursLeft": 42
    },
    {
      "product": "Brown Bread",
      "category": "Bakery",
      "units": 2,
      "cost": 120,
      "hoursLeft": 42
    },
    {
      "product": "Pav",
      "category": "Bakery",
      "units": 12,
      "cost": 360,
      "hoursLeft": 14
    },
    {
      "product": "Croissant",
      "category": "Bakery",
      "units": 14,
      "cost": 1680,
      "hoursLeft": 14
    },
    {
      "product": "Banana Cake",
      "category": "Bakery",
      "units": 17,
      "cost": 1020,
      "hoursLeft": 42
    }
  ],
  "Malleshwaram": [
    {
      "product": "Milk Bread",
      "category": "Bakery",
      "units": 4,
      "cost": 240,
      "hoursLeft": 42
    },
    {
      "product": "Brown Bread",
      "category": "Bakery",
      "units": 3,
      "cost": 180,
      "hoursLeft": 42
    },
    {
      "product": "Pav",
      "category": "Bakery",
      "units": 13,
      "cost": 390,
      "hoursLeft": 14
    },
    {
      "product": "Croissant",
      "category": "Bakery",
      "units": 12,
      "cost": 1440,
      "hoursLeft": 14
    },
    {
      "product": "Banana Cake",
      "category": "Bakery",
      "units": 18,
      "cost": 1080,
      "hoursLeft": 42
    }
  ],
  "FB-10": [
    {
      "product": "Milk Bread",
      "category": "Bakery",
      "units": 4,
      "cost": 240,
      "hoursLeft": 42
    },
    {
      "product": "Brown Bread",
      "category": "Bakery",
      "units": 3,
      "cost": 180,
      "hoursLeft": 42
    },
    {
      "product": "Pav",
      "category": "Bakery",
      "units": 13,
      "cost": 390,
      "hoursLeft": 14
    },
    {
      "product": "Croissant",
      "category": "Bakery",
      "units": 12,
      "cost": 1440,
      "hoursLeft": 14
    },
    {
      "product": "Banana Cake",
      "category": "Bakery",
      "units": 18,
      "cost": 1080,
      "hoursLeft": 42
    }
  ],
  "Bellandur": [
    {
      "product": "Milk Bread",
      "category": "Bakery",
      "units": 6,
      "cost": 360,
      "hoursLeft": 42
    },
    {
      "product": "Brown Bread",
      "category": "Bakery",
      "units": 2,
      "cost": 120,
      "hoursLeft": 42
    },
    {
      "product": "Pav",
      "category": "Bakery",
      "units": 10,
      "cost": 300,
      "hoursLeft": 14
    },
    {
      "product": "Croissant",
      "category": "Bakery",
      "units": 12,
      "cost": 1440,
      "hoursLeft": 14
    },
    {
      "product": "Banana Cake",
      "category": "Bakery",
      "units": 16,
      "cost": 960,
      "hoursLeft": 42
    }
  ],
  "FB-18": [
    {
      "product": "Milk Bread",
      "category": "Bakery",
      "units": 6,
      "cost": 360,
      "hoursLeft": 42
    },
    {
      "product": "Brown Bread",
      "category": "Bakery",
      "units": 2,
      "cost": 120,
      "hoursLeft": 42
    },
    {
      "product": "Pav",
      "category": "Bakery",
      "units": 10,
      "cost": 300,
      "hoursLeft": 14
    },
    {
      "product": "Croissant",
      "category": "Bakery",
      "units": 12,
      "cost": 1440,
      "hoursLeft": 14
    },
    {
      "product": "Banana Cake",
      "category": "Bakery",
      "units": 16,
      "cost": 960,
      "hoursLeft": 42
    }
  ],
  "JP Nagar": [
    {
      "product": "Milk Bread",
      "category": "Bakery",
      "units": 5,
      "cost": 300,
      "hoursLeft": 42
    },
    {
      "product": "Brown Bread",
      "category": "Bakery",
      "units": 2,
      "cost": 120,
      "hoursLeft": 42
    },
    {
      "product": "Pav",
      "category": "Bakery",
      "units": 11,
      "cost": 330,
      "hoursLeft": 14
    },
    {
      "product": "Croissant",
      "category": "Bakery",
      "units": 14,
      "cost": 1680,
      "hoursLeft": 14
    },
    {
      "product": "Banana Cake",
      "category": "Bakery",
      "units": 12,
      "cost": 720,
      "hoursLeft": 42
    }
  ],
  "FB-05": [
    {
      "product": "Milk Bread",
      "category": "Bakery",
      "units": 5,
      "cost": 300,
      "hoursLeft": 42
    },
    {
      "product": "Brown Bread",
      "category": "Bakery",
      "units": 2,
      "cost": 120,
      "hoursLeft": 42
    },
    {
      "product": "Pav",
      "category": "Bakery",
      "units": 11,
      "cost": 330,
      "hoursLeft": 14
    },
    {
      "product": "Croissant",
      "category": "Bakery",
      "units": 14,
      "cost": 1680,
      "hoursLeft": 14
    },
    {
      "product": "Banana Cake",
      "category": "Bakery",
      "units": 12,
      "cost": 720,
      "hoursLeft": 42
    }
  ],
  "HSR Layout": [
    {
      "product": "Milk Bread",
      "category": "Bakery",
      "units": 6,
      "cost": 360,
      "hoursLeft": 42
    },
    {
      "product": "Brown Bread",
      "category": "Bakery",
      "units": 1,
      "cost": 60,
      "hoursLeft": 42
    },
    {
      "product": "Pav",
      "category": "Bakery",
      "units": 18,
      "cost": 540,
      "hoursLeft": 14
    },
    {
      "product": "Croissant",
      "category": "Bakery",
      "units": 10,
      "cost": 1200,
      "hoursLeft": 14
    },
    {
      "product": "Banana Cake",
      "category": "Bakery",
      "units": 15,
      "cost": 900,
      "hoursLeft": 42
    }
  ],
  "FB-07": [
    {
      "product": "Milk Bread",
      "category": "Bakery",
      "units": 6,
      "cost": 360,
      "hoursLeft": 42
    },
    {
      "product": "Brown Bread",
      "category": "Bakery",
      "units": 1,
      "cost": 60,
      "hoursLeft": 42
    },
    {
      "product": "Pav",
      "category": "Bakery",
      "units": 18,
      "cost": 540,
      "hoursLeft": 14
    },
    {
      "product": "Croissant",
      "category": "Bakery",
      "units": 10,
      "cost": 1200,
      "hoursLeft": 14
    },
    {
      "product": "Banana Cake",
      "category": "Bakery",
      "units": 15,
      "cost": 900,
      "hoursLeft": 42
    }
  ],
  "Yelahanka": [
    {
      "product": "Milk Bread",
      "category": "Bakery",
      "units": 7,
      "cost": 420,
      "hoursLeft": 42
    },
    {
      "product": "Brown Bread",
      "category": "Bakery",
      "units": 3,
      "cost": 180,
      "hoursLeft": 42
    },
    {
      "product": "Pav",
      "category": "Bakery",
      "units": 13,
      "cost": 390,
      "hoursLeft": 14
    },
    {
      "product": "Croissant",
      "category": "Bakery",
      "units": 7,
      "cost": 840,
      "hoursLeft": 14
    },
    {
      "product": "Banana Cake",
      "category": "Bakery",
      "units": 13,
      "cost": 780,
      "hoursLeft": 42
    }
  ],
  "FB-15": [
    {
      "product": "Milk Bread",
      "category": "Bakery",
      "units": 7,
      "cost": 420,
      "hoursLeft": 42
    },
    {
      "product": "Brown Bread",
      "category": "Bakery",
      "units": 3,
      "cost": 180,
      "hoursLeft": 42
    },
    {
      "product": "Pav",
      "category": "Bakery",
      "units": 13,
      "cost": 390,
      "hoursLeft": 14
    },
    {
      "product": "Croissant",
      "category": "Bakery",
      "units": 7,
      "cost": 840,
      "hoursLeft": 14
    },
    {
      "product": "Banana Cake",
      "category": "Bakery",
      "units": 13,
      "cost": 780,
      "hoursLeft": 42
    }
  ]
}
export const teamPerStore: Record<string, TeamMember[]> = {
  "Marathahalli": [
    {
      "initials": "AN",
      "name": "Arjun Nambiar",
      "role": "Store manager",
      "shift": "08:00–18:00",
      "status": "On shift"
    },
    {
      "initials": "RK",
      "name": "Rahul K.",
      "role": "Shift lead",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "DP",
      "name": "Divya P.",
      "role": "Cashier",
      "shift": "09:00–17:00",
      "status": "On shift"
    },
    {
      "initials": "IA",
      "name": "Imran A.",
      "role": "Fresh associate",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "SB",
      "name": "Suresh B.",
      "role": "Stock associate",
      "shift": "06:00–14:00",
      "status": "On shift"
    }
  ],
  "FB-17": [
    {
      "initials": "AN",
      "name": "Arjun Nambiar",
      "role": "Store manager",
      "shift": "08:00–18:00",
      "status": "On shift"
    },
    {
      "initials": "RK",
      "name": "Rahul K.",
      "role": "Shift lead",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "DP",
      "name": "Divya P.",
      "role": "Cashier",
      "shift": "09:00–17:00",
      "status": "On shift"
    },
    {
      "initials": "IA",
      "name": "Imran A.",
      "role": "Fresh associate",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "SB",
      "name": "Suresh B.",
      "role": "Stock associate",
      "shift": "06:00–14:00",
      "status": "On shift"
    }
  ],
  "Vijayanagar": [
    {
      "initials": "PS",
      "name": "Priya Sharma",
      "role": "Store manager",
      "shift": "08:00–18:00",
      "status": "On shift"
    },
    {
      "initials": "RK",
      "name": "Rahul K.",
      "role": "Shift lead",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "DP",
      "name": "Divya P.",
      "role": "Cashier",
      "shift": "09:00–17:00",
      "status": "On shift"
    },
    {
      "initials": "IA",
      "name": "Imran A.",
      "role": "Fresh associate",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "SB",
      "name": "Suresh B.",
      "role": "Stock associate",
      "shift": "06:00–14:00",
      "status": "On shift"
    }
  ],
  "FB-12": [
    {
      "initials": "PS",
      "name": "Priya Sharma",
      "role": "Store manager",
      "shift": "08:00–18:00",
      "status": "On shift"
    },
    {
      "initials": "RK",
      "name": "Rahul K.",
      "role": "Shift lead",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "DP",
      "name": "Divya P.",
      "role": "Cashier",
      "shift": "09:00–17:00",
      "status": "On shift"
    },
    {
      "initials": "IA",
      "name": "Imran A.",
      "role": "Fresh associate",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "SB",
      "name": "Suresh B.",
      "role": "Stock associate",
      "shift": "06:00–14:00",
      "status": "On shift"
    }
  ],
  "Indiranagar": [
    {
      "initials": "RK",
      "name": "Ravi Kumar",
      "role": "Store manager",
      "shift": "08:00–18:00",
      "status": "On shift"
    },
    {
      "initials": "RK",
      "name": "Rahul K.",
      "role": "Shift lead",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "DP",
      "name": "Divya P.",
      "role": "Cashier",
      "shift": "09:00–17:00",
      "status": "On shift"
    },
    {
      "initials": "IA",
      "name": "Imran A.",
      "role": "Fresh associate",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "SB",
      "name": "Suresh B.",
      "role": "Stock associate",
      "shift": "06:00–14:00",
      "status": "On shift"
    }
  ],
  "FB-08": [
    {
      "initials": "RK",
      "name": "Ravi Kumar",
      "role": "Store manager",
      "shift": "08:00–18:00",
      "status": "On shift"
    },
    {
      "initials": "RK",
      "name": "Rahul K.",
      "role": "Shift lead",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "DP",
      "name": "Divya P.",
      "role": "Cashier",
      "shift": "09:00–17:00",
      "status": "On shift"
    },
    {
      "initials": "IA",
      "name": "Imran A.",
      "role": "Fresh associate",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "SB",
      "name": "Suresh B.",
      "role": "Stock associate",
      "shift": "06:00–14:00",
      "status": "On shift"
    }
  ],
  "RT Nagar": [
    {
      "initials": "MS",
      "name": "Meena Sundaram",
      "role": "Store manager",
      "shift": "08:00–18:00",
      "status": "On shift"
    },
    {
      "initials": "RK",
      "name": "Rahul K.",
      "role": "Shift lead",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "DP",
      "name": "Divya P.",
      "role": "Cashier",
      "shift": "09:00–17:00",
      "status": "On shift"
    },
    {
      "initials": "IA",
      "name": "Imran A.",
      "role": "Fresh associate",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "SB",
      "name": "Suresh B.",
      "role": "Stock associate",
      "shift": "06:00–14:00",
      "status": "On shift"
    }
  ],
  "FB-13": [
    {
      "initials": "MS",
      "name": "Meena Sundaram",
      "role": "Store manager",
      "shift": "08:00–18:00",
      "status": "On shift"
    },
    {
      "initials": "RK",
      "name": "Rahul K.",
      "role": "Shift lead",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "DP",
      "name": "Divya P.",
      "role": "Cashier",
      "shift": "09:00–17:00",
      "status": "On shift"
    },
    {
      "initials": "IA",
      "name": "Imran A.",
      "role": "Fresh associate",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "SB",
      "name": "Suresh B.",
      "role": "Stock associate",
      "shift": "06:00–14:00",
      "status": "On shift"
    }
  ],
  "Hennur": [
    {
      "initials": "DM",
      "name": "Deepak Murthy",
      "role": "Store manager",
      "shift": "08:00–18:00",
      "status": "On shift"
    },
    {
      "initials": "RK",
      "name": "Rahul K.",
      "role": "Shift lead",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "DP",
      "name": "Divya P.",
      "role": "Cashier",
      "shift": "09:00–17:00",
      "status": "On shift"
    },
    {
      "initials": "IA",
      "name": "Imran A.",
      "role": "Fresh associate",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "SB",
      "name": "Suresh B.",
      "role": "Stock associate",
      "shift": "06:00–14:00",
      "status": "On shift"
    }
  ],
  "FB-22": [
    {
      "initials": "DM",
      "name": "Deepak Murthy",
      "role": "Store manager",
      "shift": "08:00–18:00",
      "status": "On shift"
    },
    {
      "initials": "RK",
      "name": "Rahul K.",
      "role": "Shift lead",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "DP",
      "name": "Divya P.",
      "role": "Cashier",
      "shift": "09:00–17:00",
      "status": "On shift"
    },
    {
      "initials": "IA",
      "name": "Imran A.",
      "role": "Fresh associate",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "SB",
      "name": "Suresh B.",
      "role": "Stock associate",
      "shift": "06:00–14:00",
      "status": "On shift"
    }
  ],
  "Nagarbhavi": [
    {
      "initials": "GM",
      "name": "Ganesh Madhav",
      "role": "Store manager",
      "shift": "08:00–18:00",
      "status": "On shift"
    },
    {
      "initials": "RK",
      "name": "Rahul K.",
      "role": "Shift lead",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "DP",
      "name": "Divya P.",
      "role": "Cashier",
      "shift": "09:00–17:00",
      "status": "On shift"
    },
    {
      "initials": "IA",
      "name": "Imran A.",
      "role": "Fresh associate",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "SB",
      "name": "Suresh B.",
      "role": "Stock associate",
      "shift": "06:00–14:00",
      "status": "On shift"
    }
  ],
  "FB-21": [
    {
      "initials": "GM",
      "name": "Ganesh Madhav",
      "role": "Store manager",
      "shift": "08:00–18:00",
      "status": "On shift"
    },
    {
      "initials": "RK",
      "name": "Rahul K.",
      "role": "Shift lead",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "DP",
      "name": "Divya P.",
      "role": "Cashier",
      "shift": "09:00–17:00",
      "status": "On shift"
    },
    {
      "initials": "IA",
      "name": "Imran A.",
      "role": "Fresh associate",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "SB",
      "name": "Suresh B.",
      "role": "Stock associate",
      "shift": "06:00–14:00",
      "status": "On shift"
    }
  ],
  "BTM Layout": [
    {
      "initials": "AK",
      "name": "Anil Kumble",
      "role": "Store manager",
      "shift": "08:00–18:00",
      "status": "On shift"
    },
    {
      "initials": "RK",
      "name": "Rahul K.",
      "role": "Shift lead",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "DP",
      "name": "Divya P.",
      "role": "Cashier",
      "shift": "09:00–17:00",
      "status": "On shift"
    },
    {
      "initials": "IA",
      "name": "Imran A.",
      "role": "Fresh associate",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "SB",
      "name": "Suresh B.",
      "role": "Stock associate",
      "shift": "06:00–14:00",
      "status": "On shift"
    }
  ],
  "FB-02": [
    {
      "initials": "AK",
      "name": "Anil Kumble",
      "role": "Store manager",
      "shift": "08:00–18:00",
      "status": "On shift"
    },
    {
      "initials": "RK",
      "name": "Rahul K.",
      "role": "Shift lead",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "DP",
      "name": "Divya P.",
      "role": "Cashier",
      "shift": "09:00–17:00",
      "status": "On shift"
    },
    {
      "initials": "IA",
      "name": "Imran A.",
      "role": "Fresh associate",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "SB",
      "name": "Suresh B.",
      "role": "Stock associate",
      "shift": "06:00–14:00",
      "status": "On shift"
    }
  ],
  "Whitefield": [
    {
      "initials": "SR",
      "name": "Sunil Rao",
      "role": "Store manager",
      "shift": "08:00–18:00",
      "status": "On shift"
    },
    {
      "initials": "RK",
      "name": "Rahul K.",
      "role": "Shift lead",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "DP",
      "name": "Divya P.",
      "role": "Cashier",
      "shift": "09:00–17:00",
      "status": "On shift"
    },
    {
      "initials": "IA",
      "name": "Imran A.",
      "role": "Fresh associate",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "SB",
      "name": "Suresh B.",
      "role": "Stock associate",
      "shift": "06:00–14:00",
      "status": "On shift"
    }
  ],
  "FB-16": [
    {
      "initials": "SR",
      "name": "Sunil Rao",
      "role": "Store manager",
      "shift": "08:00–18:00",
      "status": "On shift"
    },
    {
      "initials": "RK",
      "name": "Rahul K.",
      "role": "Shift lead",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "DP",
      "name": "Divya P.",
      "role": "Cashier",
      "shift": "09:00–17:00",
      "status": "On shift"
    },
    {
      "initials": "IA",
      "name": "Imran A.",
      "role": "Fresh associate",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "SB",
      "name": "Suresh B.",
      "role": "Stock associate",
      "shift": "06:00–14:00",
      "status": "On shift"
    }
  ],
  "Electronic City": [
    {
      "initials": "AN",
      "name": "Arjun Nambiar",
      "role": "Store manager",
      "shift": "08:00–18:00",
      "status": "On shift"
    },
    {
      "initials": "RK",
      "name": "Rahul K.",
      "role": "Shift lead",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "DP",
      "name": "Divya P.",
      "role": "Cashier",
      "shift": "09:00–17:00",
      "status": "On shift"
    },
    {
      "initials": "IA",
      "name": "Imran A.",
      "role": "Fresh associate",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "SB",
      "name": "Suresh B.",
      "role": "Stock associate",
      "shift": "06:00–14:00",
      "status": "On shift"
    }
  ],
  "FB-19": [
    {
      "initials": "AN",
      "name": "Arjun Nambiar",
      "role": "Store manager",
      "shift": "08:00–18:00",
      "status": "On shift"
    },
    {
      "initials": "RK",
      "name": "Rahul K.",
      "role": "Shift lead",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "DP",
      "name": "Divya P.",
      "role": "Cashier",
      "shift": "09:00–17:00",
      "status": "On shift"
    },
    {
      "initials": "IA",
      "name": "Imran A.",
      "role": "Fresh associate",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "SB",
      "name": "Suresh B.",
      "role": "Stock associate",
      "shift": "06:00–14:00",
      "status": "On shift"
    }
  ],
  "Ulsoor": [
    {
      "initials": "PS",
      "name": "Priya Sharma",
      "role": "Store manager",
      "shift": "08:00–18:00",
      "status": "On shift"
    },
    {
      "initials": "RK",
      "name": "Rahul K.",
      "role": "Shift lead",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "DP",
      "name": "Divya P.",
      "role": "Cashier",
      "shift": "09:00–17:00",
      "status": "On shift"
    },
    {
      "initials": "IA",
      "name": "Imran A.",
      "role": "Fresh associate",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "SB",
      "name": "Suresh B.",
      "role": "Stock associate",
      "shift": "06:00–14:00",
      "status": "On shift"
    }
  ],
  "FB-25": [
    {
      "initials": "PS",
      "name": "Priya Sharma",
      "role": "Store manager",
      "shift": "08:00–18:00",
      "status": "On shift"
    },
    {
      "initials": "RK",
      "name": "Rahul K.",
      "role": "Shift lead",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "DP",
      "name": "Divya P.",
      "role": "Cashier",
      "shift": "09:00–17:00",
      "status": "On shift"
    },
    {
      "initials": "IA",
      "name": "Imran A.",
      "role": "Fresh associate",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "SB",
      "name": "Suresh B.",
      "role": "Stock associate",
      "shift": "06:00–14:00",
      "status": "On shift"
    }
  ],
  "Kengeri": [
    {
      "initials": "RK",
      "name": "Ravi Kumar",
      "role": "Store manager",
      "shift": "08:00–18:00",
      "status": "On shift"
    },
    {
      "initials": "RK",
      "name": "Rahul K.",
      "role": "Shift lead",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "DP",
      "name": "Divya P.",
      "role": "Cashier",
      "shift": "09:00–17:00",
      "status": "On shift"
    },
    {
      "initials": "IA",
      "name": "Imran A.",
      "role": "Fresh associate",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "SB",
      "name": "Suresh B.",
      "role": "Stock associate",
      "shift": "06:00–14:00",
      "status": "On shift"
    }
  ],
  "FB-20": [
    {
      "initials": "RK",
      "name": "Ravi Kumar",
      "role": "Store manager",
      "shift": "08:00–18:00",
      "status": "On shift"
    },
    {
      "initials": "RK",
      "name": "Rahul K.",
      "role": "Shift lead",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "DP",
      "name": "Divya P.",
      "role": "Cashier",
      "shift": "09:00–17:00",
      "status": "On shift"
    },
    {
      "initials": "IA",
      "name": "Imran A.",
      "role": "Fresh associate",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "SB",
      "name": "Suresh B.",
      "role": "Stock associate",
      "shift": "06:00–14:00",
      "status": "On shift"
    }
  ],
  "Hebbal": [
    {
      "initials": "MS",
      "name": "Meena Sundaram",
      "role": "Store manager",
      "shift": "08:00–18:00",
      "status": "On shift"
    },
    {
      "initials": "RK",
      "name": "Rahul K.",
      "role": "Shift lead",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "DP",
      "name": "Divya P.",
      "role": "Cashier",
      "shift": "09:00–17:00",
      "status": "On shift"
    },
    {
      "initials": "IA",
      "name": "Imran A.",
      "role": "Fresh associate",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "SB",
      "name": "Suresh B.",
      "role": "Stock associate",
      "shift": "06:00–14:00",
      "status": "On shift"
    }
  ],
  "FB-14": [
    {
      "initials": "MS",
      "name": "Meena Sundaram",
      "role": "Store manager",
      "shift": "08:00–18:00",
      "status": "On shift"
    },
    {
      "initials": "RK",
      "name": "Rahul K.",
      "role": "Shift lead",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "DP",
      "name": "Divya P.",
      "role": "Cashier",
      "shift": "09:00–17:00",
      "status": "On shift"
    },
    {
      "initials": "IA",
      "name": "Imran A.",
      "role": "Fresh associate",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "SB",
      "name": "Suresh B.",
      "role": "Stock associate",
      "shift": "06:00–14:00",
      "status": "On shift"
    }
  ],
  "Kalyan Nagar": [
    {
      "initials": "DM",
      "name": "Deepak Murthy",
      "role": "Store manager",
      "shift": "08:00–18:00",
      "status": "On shift"
    },
    {
      "initials": "RK",
      "name": "Rahul K.",
      "role": "Shift lead",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "DP",
      "name": "Divya P.",
      "role": "Cashier",
      "shift": "09:00–17:00",
      "status": "On shift"
    },
    {
      "initials": "IA",
      "name": "Imran A.",
      "role": "Fresh associate",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "SB",
      "name": "Suresh B.",
      "role": "Stock associate",
      "shift": "06:00–14:00",
      "status": "On shift"
    }
  ],
  "FB-23": [
    {
      "initials": "DM",
      "name": "Deepak Murthy",
      "role": "Store manager",
      "shift": "08:00–18:00",
      "status": "On shift"
    },
    {
      "initials": "RK",
      "name": "Rahul K.",
      "role": "Shift lead",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "DP",
      "name": "Divya P.",
      "role": "Cashier",
      "shift": "09:00–17:00",
      "status": "On shift"
    },
    {
      "initials": "IA",
      "name": "Imran A.",
      "role": "Fresh associate",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "SB",
      "name": "Suresh B.",
      "role": "Stock associate",
      "shift": "06:00–14:00",
      "status": "On shift"
    }
  ],
  "Banashankari": [
    {
      "initials": "GM",
      "name": "Ganesh Madhav",
      "role": "Store manager",
      "shift": "08:00–18:00",
      "status": "On shift"
    },
    {
      "initials": "RK",
      "name": "Rahul K.",
      "role": "Shift lead",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "DP",
      "name": "Divya P.",
      "role": "Cashier",
      "shift": "09:00–17:00",
      "status": "On shift"
    },
    {
      "initials": "IA",
      "name": "Imran A.",
      "role": "Fresh associate",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "SB",
      "name": "Suresh B.",
      "role": "Stock associate",
      "shift": "06:00–14:00",
      "status": "On shift"
    }
  ],
  "FB-03": [
    {
      "initials": "GM",
      "name": "Ganesh Madhav",
      "role": "Store manager",
      "shift": "08:00–18:00",
      "status": "On shift"
    },
    {
      "initials": "RK",
      "name": "Rahul K.",
      "role": "Shift lead",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "DP",
      "name": "Divya P.",
      "role": "Cashier",
      "shift": "09:00–17:00",
      "status": "On shift"
    },
    {
      "initials": "IA",
      "name": "Imran A.",
      "role": "Fresh associate",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "SB",
      "name": "Suresh B.",
      "role": "Stock associate",
      "shift": "06:00–14:00",
      "status": "On shift"
    }
  ],
  "Sahakar Nagar": [
    {
      "initials": "AK",
      "name": "Anil Kumble",
      "role": "Store manager",
      "shift": "08:00–18:00",
      "status": "On shift"
    },
    {
      "initials": "RK",
      "name": "Rahul K.",
      "role": "Shift lead",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "DP",
      "name": "Divya P.",
      "role": "Cashier",
      "shift": "09:00–17:00",
      "status": "On shift"
    },
    {
      "initials": "IA",
      "name": "Imran A.",
      "role": "Fresh associate",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "SB",
      "name": "Suresh B.",
      "role": "Stock associate",
      "shift": "06:00–14:00",
      "status": "On shift"
    }
  ],
  "FB-24": [
    {
      "initials": "AK",
      "name": "Anil Kumble",
      "role": "Store manager",
      "shift": "08:00–18:00",
      "status": "On shift"
    },
    {
      "initials": "RK",
      "name": "Rahul K.",
      "role": "Shift lead",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "DP",
      "name": "Divya P.",
      "role": "Cashier",
      "shift": "09:00–17:00",
      "status": "On shift"
    },
    {
      "initials": "IA",
      "name": "Imran A.",
      "role": "Fresh associate",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "SB",
      "name": "Suresh B.",
      "role": "Stock associate",
      "shift": "06:00–14:00",
      "status": "On shift"
    }
  ],
  "Basavanagudi": [
    {
      "initials": "SR",
      "name": "Sunil Rao",
      "role": "Store manager",
      "shift": "08:00–18:00",
      "status": "On shift"
    },
    {
      "initials": "RK",
      "name": "Rahul K.",
      "role": "Shift lead",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "DP",
      "name": "Divya P.",
      "role": "Cashier",
      "shift": "09:00–17:00",
      "status": "On shift"
    },
    {
      "initials": "IA",
      "name": "Imran A.",
      "role": "Fresh associate",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "SB",
      "name": "Suresh B.",
      "role": "Stock associate",
      "shift": "06:00–14:00",
      "status": "On shift"
    }
  ],
  "FB-04": [
    {
      "initials": "SR",
      "name": "Sunil Rao",
      "role": "Store manager",
      "shift": "08:00–18:00",
      "status": "On shift"
    },
    {
      "initials": "RK",
      "name": "Rahul K.",
      "role": "Shift lead",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "DP",
      "name": "Divya P.",
      "role": "Cashier",
      "shift": "09:00–17:00",
      "status": "On shift"
    },
    {
      "initials": "IA",
      "name": "Imran A.",
      "role": "Fresh associate",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "SB",
      "name": "Suresh B.",
      "role": "Stock associate",
      "shift": "06:00–14:00",
      "status": "On shift"
    }
  ],
  "Rajajinagar": [
    {
      "initials": "AN",
      "name": "Arjun Nambiar",
      "role": "Store manager",
      "shift": "08:00–18:00",
      "status": "On shift"
    },
    {
      "initials": "RK",
      "name": "Rahul K.",
      "role": "Shift lead",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "DP",
      "name": "Divya P.",
      "role": "Cashier",
      "shift": "09:00–17:00",
      "status": "On shift"
    },
    {
      "initials": "IA",
      "name": "Imran A.",
      "role": "Fresh associate",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "SB",
      "name": "Suresh B.",
      "role": "Stock associate",
      "shift": "06:00–14:00",
      "status": "On shift"
    }
  ],
  "FB-11": [
    {
      "initials": "AN",
      "name": "Arjun Nambiar",
      "role": "Store manager",
      "shift": "08:00–18:00",
      "status": "On shift"
    },
    {
      "initials": "RK",
      "name": "Rahul K.",
      "role": "Shift lead",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "DP",
      "name": "Divya P.",
      "role": "Cashier",
      "shift": "09:00–17:00",
      "status": "On shift"
    },
    {
      "initials": "IA",
      "name": "Imran A.",
      "role": "Fresh associate",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "SB",
      "name": "Suresh B.",
      "role": "Stock associate",
      "shift": "06:00–14:00",
      "status": "On shift"
    }
  ],
  "Jayanagar": [
    {
      "initials": "PS",
      "name": "Priya Sharma",
      "role": "Store manager",
      "shift": "08:00–18:00",
      "status": "On shift"
    },
    {
      "initials": "RK",
      "name": "Rahul K.",
      "role": "Shift lead",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "DP",
      "name": "Divya P.",
      "role": "Cashier",
      "shift": "09:00–17:00",
      "status": "On shift"
    },
    {
      "initials": "IA",
      "name": "Imran A.",
      "role": "Fresh associate",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "SB",
      "name": "Suresh B.",
      "role": "Stock associate",
      "shift": "06:00–14:00",
      "status": "On shift"
    }
  ],
  "FB-01": [
    {
      "initials": "PS",
      "name": "Priya Sharma",
      "role": "Store manager",
      "shift": "08:00–18:00",
      "status": "On shift"
    },
    {
      "initials": "RK",
      "name": "Rahul K.",
      "role": "Shift lead",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "DP",
      "name": "Divya P.",
      "role": "Cashier",
      "shift": "09:00–17:00",
      "status": "On shift"
    },
    {
      "initials": "IA",
      "name": "Imran A.",
      "role": "Fresh associate",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "SB",
      "name": "Suresh B.",
      "role": "Stock associate",
      "shift": "06:00–14:00",
      "status": "On shift"
    }
  ],
  "Koramangala": [
    {
      "initials": "RK",
      "name": "Ravi Kumar",
      "role": "Store manager",
      "shift": "08:00–18:00",
      "status": "On shift"
    },
    {
      "initials": "RK",
      "name": "Rahul K.",
      "role": "Shift lead",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "DP",
      "name": "Divya P.",
      "role": "Cashier",
      "shift": "09:00–17:00",
      "status": "On shift"
    },
    {
      "initials": "IA",
      "name": "Imran A.",
      "role": "Fresh associate",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "SB",
      "name": "Suresh B.",
      "role": "Stock associate",
      "shift": "06:00–14:00",
      "status": "On shift"
    }
  ],
  "FB-06": [
    {
      "initials": "RK",
      "name": "Ravi Kumar",
      "role": "Store manager",
      "shift": "08:00–18:00",
      "status": "On shift"
    },
    {
      "initials": "RK",
      "name": "Rahul K.",
      "role": "Shift lead",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "DP",
      "name": "Divya P.",
      "role": "Cashier",
      "shift": "09:00–17:00",
      "status": "On shift"
    },
    {
      "initials": "IA",
      "name": "Imran A.",
      "role": "Fresh associate",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "SB",
      "name": "Suresh B.",
      "role": "Stock associate",
      "shift": "06:00–14:00",
      "status": "On shift"
    }
  ],
  "Domlur": [
    {
      "initials": "MS",
      "name": "Meena Sundaram",
      "role": "Store manager",
      "shift": "08:00–18:00",
      "status": "On shift"
    },
    {
      "initials": "RK",
      "name": "Rahul K.",
      "role": "Shift lead",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "DP",
      "name": "Divya P.",
      "role": "Cashier",
      "shift": "09:00–17:00",
      "status": "On shift"
    },
    {
      "initials": "IA",
      "name": "Imran A.",
      "role": "Fresh associate",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "SB",
      "name": "Suresh B.",
      "role": "Stock associate",
      "shift": "06:00–14:00",
      "status": "On shift"
    }
  ],
  "FB-09": [
    {
      "initials": "MS",
      "name": "Meena Sundaram",
      "role": "Store manager",
      "shift": "08:00–18:00",
      "status": "On shift"
    },
    {
      "initials": "RK",
      "name": "Rahul K.",
      "role": "Shift lead",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "DP",
      "name": "Divya P.",
      "role": "Cashier",
      "shift": "09:00–17:00",
      "status": "On shift"
    },
    {
      "initials": "IA",
      "name": "Imran A.",
      "role": "Fresh associate",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "SB",
      "name": "Suresh B.",
      "role": "Stock associate",
      "shift": "06:00–14:00",
      "status": "On shift"
    }
  ],
  "Malleshwaram": [
    {
      "initials": "DM",
      "name": "Deepak Murthy",
      "role": "Store manager",
      "shift": "08:00–18:00",
      "status": "On shift"
    },
    {
      "initials": "RK",
      "name": "Rahul K.",
      "role": "Shift lead",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "DP",
      "name": "Divya P.",
      "role": "Cashier",
      "shift": "09:00–17:00",
      "status": "On shift"
    },
    {
      "initials": "IA",
      "name": "Imran A.",
      "role": "Fresh associate",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "SB",
      "name": "Suresh B.",
      "role": "Stock associate",
      "shift": "06:00–14:00",
      "status": "On shift"
    }
  ],
  "FB-10": [
    {
      "initials": "DM",
      "name": "Deepak Murthy",
      "role": "Store manager",
      "shift": "08:00–18:00",
      "status": "On shift"
    },
    {
      "initials": "RK",
      "name": "Rahul K.",
      "role": "Shift lead",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "DP",
      "name": "Divya P.",
      "role": "Cashier",
      "shift": "09:00–17:00",
      "status": "On shift"
    },
    {
      "initials": "IA",
      "name": "Imran A.",
      "role": "Fresh associate",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "SB",
      "name": "Suresh B.",
      "role": "Stock associate",
      "shift": "06:00–14:00",
      "status": "On shift"
    }
  ],
  "Bellandur": [
    {
      "initials": "GM",
      "name": "Ganesh Madhav",
      "role": "Store manager",
      "shift": "08:00–18:00",
      "status": "On shift"
    },
    {
      "initials": "RK",
      "name": "Rahul K.",
      "role": "Shift lead",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "DP",
      "name": "Divya P.",
      "role": "Cashier",
      "shift": "09:00–17:00",
      "status": "On shift"
    },
    {
      "initials": "IA",
      "name": "Imran A.",
      "role": "Fresh associate",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "SB",
      "name": "Suresh B.",
      "role": "Stock associate",
      "shift": "06:00–14:00",
      "status": "On shift"
    }
  ],
  "FB-18": [
    {
      "initials": "GM",
      "name": "Ganesh Madhav",
      "role": "Store manager",
      "shift": "08:00–18:00",
      "status": "On shift"
    },
    {
      "initials": "RK",
      "name": "Rahul K.",
      "role": "Shift lead",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "DP",
      "name": "Divya P.",
      "role": "Cashier",
      "shift": "09:00–17:00",
      "status": "On shift"
    },
    {
      "initials": "IA",
      "name": "Imran A.",
      "role": "Fresh associate",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "SB",
      "name": "Suresh B.",
      "role": "Stock associate",
      "shift": "06:00–14:00",
      "status": "On shift"
    }
  ],
  "JP Nagar": [
    {
      "initials": "AK",
      "name": "Anil Kumble",
      "role": "Store manager",
      "shift": "08:00–18:00",
      "status": "On shift"
    },
    {
      "initials": "RK",
      "name": "Rahul K.",
      "role": "Shift lead",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "DP",
      "name": "Divya P.",
      "role": "Cashier",
      "shift": "09:00–17:00",
      "status": "On shift"
    },
    {
      "initials": "IA",
      "name": "Imran A.",
      "role": "Fresh associate",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "SB",
      "name": "Suresh B.",
      "role": "Stock associate",
      "shift": "06:00–14:00",
      "status": "On shift"
    }
  ],
  "FB-05": [
    {
      "initials": "AK",
      "name": "Anil Kumble",
      "role": "Store manager",
      "shift": "08:00–18:00",
      "status": "On shift"
    },
    {
      "initials": "RK",
      "name": "Rahul K.",
      "role": "Shift lead",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "DP",
      "name": "Divya P.",
      "role": "Cashier",
      "shift": "09:00–17:00",
      "status": "On shift"
    },
    {
      "initials": "IA",
      "name": "Imran A.",
      "role": "Fresh associate",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "SB",
      "name": "Suresh B.",
      "role": "Stock associate",
      "shift": "06:00–14:00",
      "status": "On shift"
    }
  ],
  "HSR Layout": [
    {
      "initials": "SR",
      "name": "Sunil Rao",
      "role": "Store manager",
      "shift": "08:00–18:00",
      "status": "On shift"
    },
    {
      "initials": "RK",
      "name": "Rahul K.",
      "role": "Shift lead",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "DP",
      "name": "Divya P.",
      "role": "Cashier",
      "shift": "09:00–17:00",
      "status": "On shift"
    },
    {
      "initials": "IA",
      "name": "Imran A.",
      "role": "Fresh associate",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "SB",
      "name": "Suresh B.",
      "role": "Stock associate",
      "shift": "06:00–14:00",
      "status": "On shift"
    }
  ],
  "FB-07": [
    {
      "initials": "SR",
      "name": "Sunil Rao",
      "role": "Store manager",
      "shift": "08:00–18:00",
      "status": "On shift"
    },
    {
      "initials": "RK",
      "name": "Rahul K.",
      "role": "Shift lead",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "DP",
      "name": "Divya P.",
      "role": "Cashier",
      "shift": "09:00–17:00",
      "status": "On shift"
    },
    {
      "initials": "IA",
      "name": "Imran A.",
      "role": "Fresh associate",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "SB",
      "name": "Suresh B.",
      "role": "Stock associate",
      "shift": "06:00–14:00",
      "status": "On shift"
    }
  ],
  "Yelahanka": [
    {
      "initials": "AN",
      "name": "Arjun Nambiar",
      "role": "Store manager",
      "shift": "08:00–18:00",
      "status": "On shift"
    },
    {
      "initials": "RK",
      "name": "Rahul K.",
      "role": "Shift lead",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "DP",
      "name": "Divya P.",
      "role": "Cashier",
      "shift": "09:00–17:00",
      "status": "On shift"
    },
    {
      "initials": "IA",
      "name": "Imran A.",
      "role": "Fresh associate",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "SB",
      "name": "Suresh B.",
      "role": "Stock associate",
      "shift": "06:00–14:00",
      "status": "On shift"
    }
  ],
  "FB-15": [
    {
      "initials": "AN",
      "name": "Arjun Nambiar",
      "role": "Store manager",
      "shift": "08:00–18:00",
      "status": "On shift"
    },
    {
      "initials": "RK",
      "name": "Rahul K.",
      "role": "Shift lead",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "DP",
      "name": "Divya P.",
      "role": "Cashier",
      "shift": "09:00–17:00",
      "status": "On shift"
    },
    {
      "initials": "IA",
      "name": "Imran A.",
      "role": "Fresh associate",
      "shift": "07:00–15:00",
      "status": "On shift"
    },
    {
      "initials": "SB",
      "name": "Suresh B.",
      "role": "Stock associate",
      "shift": "06:00–14:00",
      "status": "On shift"
    }
  ]
}
export const storeWastageTrend: Record<string, StoreWastagePoint[]> = {
  "Marathahalli": [
    {
      "day": 1,
      "value": 6.7
    },
    {
      "day": 2,
      "value": 5.6
    },
    {
      "day": 3,
      "value": 3.8
    },
    {
      "day": 4,
      "value": 3.5
    },
    {
      "day": 5,
      "value": 2.8
    },
    {
      "day": 6,
      "value": 5
    },
    {
      "day": 7,
      "value": 2.4
    },
    {
      "day": 8,
      "value": 3
    },
    {
      "day": 9,
      "value": 2.1
    },
    {
      "day": 10,
      "value": 3.3
    },
    {
      "day": 11,
      "value": 3
    },
    {
      "day": 12,
      "value": 1.3
    },
    {
      "day": 13,
      "value": 2.2
    },
    {
      "day": 14,
      "value": 3
    }
  ],
  "FB-17": [
    {
      "day": 1,
      "value": 6.7
    },
    {
      "day": 2,
      "value": 5.6
    },
    {
      "day": 3,
      "value": 3.8
    },
    {
      "day": 4,
      "value": 3.5
    },
    {
      "day": 5,
      "value": 2.8
    },
    {
      "day": 6,
      "value": 5
    },
    {
      "day": 7,
      "value": 2.4
    },
    {
      "day": 8,
      "value": 3
    },
    {
      "day": 9,
      "value": 2.1
    },
    {
      "day": 10,
      "value": 3.3
    },
    {
      "day": 11,
      "value": 3
    },
    {
      "day": 12,
      "value": 1.3
    },
    {
      "day": 13,
      "value": 2.2
    },
    {
      "day": 14,
      "value": 3
    }
  ],
  "Vijayanagar": [
    {
      "day": 1,
      "value": 3.3
    },
    {
      "day": 2,
      "value": 4
    },
    {
      "day": 3,
      "value": 2.7
    },
    {
      "day": 4,
      "value": 1.6
    },
    {
      "day": 5,
      "value": 5
    },
    {
      "day": 6,
      "value": 2.5
    },
    {
      "day": 7,
      "value": 3.4
    },
    {
      "day": 8,
      "value": 1.7
    },
    {
      "day": 9,
      "value": 3.3
    },
    {
      "day": 10,
      "value": 1.6
    },
    {
      "day": 11,
      "value": 3.6
    },
    {
      "day": 12,
      "value": 1.2
    },
    {
      "day": 13,
      "value": 4.6
    },
    {
      "day": 14,
      "value": 5.5
    }
  ],
  "FB-12": [
    {
      "day": 1,
      "value": 3.3
    },
    {
      "day": 2,
      "value": 4
    },
    {
      "day": 3,
      "value": 2.7
    },
    {
      "day": 4,
      "value": 1.6
    },
    {
      "day": 5,
      "value": 5
    },
    {
      "day": 6,
      "value": 2.5
    },
    {
      "day": 7,
      "value": 3.4
    },
    {
      "day": 8,
      "value": 1.7
    },
    {
      "day": 9,
      "value": 3.3
    },
    {
      "day": 10,
      "value": 1.6
    },
    {
      "day": 11,
      "value": 3.6
    },
    {
      "day": 12,
      "value": 1.2
    },
    {
      "day": 13,
      "value": 4.6
    },
    {
      "day": 14,
      "value": 5.5
    }
  ],
  "Indiranagar": [
    {
      "day": 1,
      "value": 9.7
    },
    {
      "day": 2,
      "value": 12
    },
    {
      "day": 3,
      "value": 7.6
    },
    {
      "day": 4,
      "value": 8.2
    },
    {
      "day": 5,
      "value": 7.1
    },
    {
      "day": 6,
      "value": 9.1
    },
    {
      "day": 7,
      "value": 5.6
    },
    {
      "day": 8,
      "value": 12
    },
    {
      "day": 9,
      "value": 9.9
    },
    {
      "day": 10,
      "value": 6.4
    },
    {
      "day": 11,
      "value": 7.1
    },
    {
      "day": 12,
      "value": 6
    },
    {
      "day": 13,
      "value": 12
    },
    {
      "day": 14,
      "value": 7.5
    }
  ],
  "FB-08": [
    {
      "day": 1,
      "value": 9.7
    },
    {
      "day": 2,
      "value": 12
    },
    {
      "day": 3,
      "value": 7.6
    },
    {
      "day": 4,
      "value": 8.2
    },
    {
      "day": 5,
      "value": 7.1
    },
    {
      "day": 6,
      "value": 9.1
    },
    {
      "day": 7,
      "value": 5.6
    },
    {
      "day": 8,
      "value": 12
    },
    {
      "day": 9,
      "value": 9.9
    },
    {
      "day": 10,
      "value": 6.4
    },
    {
      "day": 11,
      "value": 7.1
    },
    {
      "day": 12,
      "value": 6
    },
    {
      "day": 13,
      "value": 12
    },
    {
      "day": 14,
      "value": 7.5
    }
  ],
  "RT Nagar": [
    {
      "day": 1,
      "value": 6.4
    },
    {
      "day": 2,
      "value": 1.7
    },
    {
      "day": 3,
      "value": 2
    },
    {
      "day": 4,
      "value": 3.7
    },
    {
      "day": 5,
      "value": 4.4
    },
    {
      "day": 6,
      "value": 4
    },
    {
      "day": 7,
      "value": 3.9
    },
    {
      "day": 8,
      "value": 6.5
    },
    {
      "day": 9,
      "value": 2.9
    },
    {
      "day": 10,
      "value": 5.5
    },
    {
      "day": 11,
      "value": 6.7
    },
    {
      "day": 12,
      "value": 3.2
    },
    {
      "day": 13,
      "value": 1.5
    },
    {
      "day": 14,
      "value": 5.3
    }
  ],
  "FB-13": [
    {
      "day": 1,
      "value": 6.4
    },
    {
      "day": 2,
      "value": 1.7
    },
    {
      "day": 3,
      "value": 2
    },
    {
      "day": 4,
      "value": 3.7
    },
    {
      "day": 5,
      "value": 4.4
    },
    {
      "day": 6,
      "value": 4
    },
    {
      "day": 7,
      "value": 3.9
    },
    {
      "day": 8,
      "value": 6.5
    },
    {
      "day": 9,
      "value": 2.9
    },
    {
      "day": 10,
      "value": 5.5
    },
    {
      "day": 11,
      "value": 6.7
    },
    {
      "day": 12,
      "value": 3.2
    },
    {
      "day": 13,
      "value": 1.5
    },
    {
      "day": 14,
      "value": 5.3
    }
  ],
  "Hennur": [
    {
      "day": 1,
      "value": 7.9
    },
    {
      "day": 2,
      "value": 5.1
    },
    {
      "day": 3,
      "value": 5.5
    },
    {
      "day": 4,
      "value": 2.8
    },
    {
      "day": 5,
      "value": 3.6
    },
    {
      "day": 6,
      "value": 6.1
    },
    {
      "day": 7,
      "value": 2.1
    },
    {
      "day": 8,
      "value": 2.4
    },
    {
      "day": 9,
      "value": 3.6
    },
    {
      "day": 10,
      "value": 5.6
    },
    {
      "day": 11,
      "value": 3.9
    },
    {
      "day": 12,
      "value": 2.8
    },
    {
      "day": 13,
      "value": 6.2
    },
    {
      "day": 14,
      "value": 2.2
    }
  ],
  "FB-22": [
    {
      "day": 1,
      "value": 7.9
    },
    {
      "day": 2,
      "value": 5.1
    },
    {
      "day": 3,
      "value": 5.5
    },
    {
      "day": 4,
      "value": 2.8
    },
    {
      "day": 5,
      "value": 3.6
    },
    {
      "day": 6,
      "value": 6.1
    },
    {
      "day": 7,
      "value": 2.1
    },
    {
      "day": 8,
      "value": 2.4
    },
    {
      "day": 9,
      "value": 3.6
    },
    {
      "day": 10,
      "value": 5.6
    },
    {
      "day": 11,
      "value": 3.9
    },
    {
      "day": 12,
      "value": 2.8
    },
    {
      "day": 13,
      "value": 6.2
    },
    {
      "day": 14,
      "value": 2.2
    }
  ],
  "Nagarbhavi": [
    {
      "day": 1,
      "value": 5.8
    },
    {
      "day": 2,
      "value": 1.7
    },
    {
      "day": 3,
      "value": 5
    },
    {
      "day": 4,
      "value": 4.6
    },
    {
      "day": 5,
      "value": 6.2
    },
    {
      "day": 6,
      "value": 3.5
    },
    {
      "day": 7,
      "value": 2.8
    },
    {
      "day": 8,
      "value": 3.1
    },
    {
      "day": 9,
      "value": 3.4
    },
    {
      "day": 10,
      "value": 4.5
    },
    {
      "day": 11,
      "value": 2.7
    },
    {
      "day": 12,
      "value": 4.9
    },
    {
      "day": 13,
      "value": 4.3
    },
    {
      "day": 14,
      "value": 3
    }
  ],
  "FB-21": [
    {
      "day": 1,
      "value": 5.8
    },
    {
      "day": 2,
      "value": 1.7
    },
    {
      "day": 3,
      "value": 5
    },
    {
      "day": 4,
      "value": 4.6
    },
    {
      "day": 5,
      "value": 6.2
    },
    {
      "day": 6,
      "value": 3.5
    },
    {
      "day": 7,
      "value": 2.8
    },
    {
      "day": 8,
      "value": 3.1
    },
    {
      "day": 9,
      "value": 3.4
    },
    {
      "day": 10,
      "value": 4.5
    },
    {
      "day": 11,
      "value": 2.7
    },
    {
      "day": 12,
      "value": 4.9
    },
    {
      "day": 13,
      "value": 4.3
    },
    {
      "day": 14,
      "value": 3
    }
  ],
  "BTM Layout": [
    {
      "day": 1,
      "value": 7.6
    },
    {
      "day": 2,
      "value": 2.5
    },
    {
      "day": 3,
      "value": 2.5
    },
    {
      "day": 4,
      "value": 4.8
    },
    {
      "day": 5,
      "value": 2.3
    },
    {
      "day": 6,
      "value": 1.8
    },
    {
      "day": 7,
      "value": 3.3
    },
    {
      "day": 8,
      "value": 5.9
    },
    {
      "day": 9,
      "value": 3.3
    },
    {
      "day": 10,
      "value": 3.9
    },
    {
      "day": 11,
      "value": 4.8
    },
    {
      "day": 12,
      "value": 3.3
    },
    {
      "day": 13,
      "value": 3.4
    },
    {
      "day": 14,
      "value": 8.5
    }
  ],
  "FB-02": [
    {
      "day": 1,
      "value": 7.6
    },
    {
      "day": 2,
      "value": 2.5
    },
    {
      "day": 3,
      "value": 2.5
    },
    {
      "day": 4,
      "value": 4.8
    },
    {
      "day": 5,
      "value": 2.3
    },
    {
      "day": 6,
      "value": 1.8
    },
    {
      "day": 7,
      "value": 3.3
    },
    {
      "day": 8,
      "value": 5.9
    },
    {
      "day": 9,
      "value": 3.3
    },
    {
      "day": 10,
      "value": 3.9
    },
    {
      "day": 11,
      "value": 4.8
    },
    {
      "day": 12,
      "value": 3.3
    },
    {
      "day": 13,
      "value": 3.4
    },
    {
      "day": 14,
      "value": 8.5
    }
  ],
  "Whitefield": [
    {
      "day": 1,
      "value": 2.9
    },
    {
      "day": 2,
      "value": 4
    },
    {
      "day": 3,
      "value": 2.6
    },
    {
      "day": 4,
      "value": 4.1
    },
    {
      "day": 5,
      "value": 2.6
    },
    {
      "day": 6,
      "value": 1.7
    },
    {
      "day": 7,
      "value": 10.8
    },
    {
      "day": 8,
      "value": 7.4
    },
    {
      "day": 9,
      "value": 3.7
    },
    {
      "day": 10,
      "value": 4.6
    },
    {
      "day": 11,
      "value": 8.5
    },
    {
      "day": 12,
      "value": 4.4
    },
    {
      "day": 13,
      "value": 6.1
    },
    {
      "day": 14,
      "value": 2.8
    }
  ],
  "FB-16": [
    {
      "day": 1,
      "value": 2.9
    },
    {
      "day": 2,
      "value": 4
    },
    {
      "day": 3,
      "value": 2.6
    },
    {
      "day": 4,
      "value": 4.1
    },
    {
      "day": 5,
      "value": 2.6
    },
    {
      "day": 6,
      "value": 1.7
    },
    {
      "day": 7,
      "value": 10.8
    },
    {
      "day": 8,
      "value": 7.4
    },
    {
      "day": 9,
      "value": 3.7
    },
    {
      "day": 10,
      "value": 4.6
    },
    {
      "day": 11,
      "value": 8.5
    },
    {
      "day": 12,
      "value": 4.4
    },
    {
      "day": 13,
      "value": 6.1
    },
    {
      "day": 14,
      "value": 2.8
    }
  ],
  "Electronic City": [
    {
      "day": 1,
      "value": 8
    },
    {
      "day": 2,
      "value": 5.8
    },
    {
      "day": 3,
      "value": 1.8
    },
    {
      "day": 4,
      "value": 1.9
    },
    {
      "day": 5,
      "value": 4.8
    },
    {
      "day": 6,
      "value": 4.2
    },
    {
      "day": 7,
      "value": 2.1
    },
    {
      "day": 8,
      "value": 7.5
    },
    {
      "day": 9,
      "value": 3.1
    },
    {
      "day": 10,
      "value": 0.8
    },
    {
      "day": 11,
      "value": 5.1
    },
    {
      "day": 12,
      "value": 1.8
    },
    {
      "day": 13,
      "value": 1.5
    },
    {
      "day": 14,
      "value": 0.8
    }
  ],
  "FB-19": [
    {
      "day": 1,
      "value": 8
    },
    {
      "day": 2,
      "value": 5.8
    },
    {
      "day": 3,
      "value": 1.8
    },
    {
      "day": 4,
      "value": 1.9
    },
    {
      "day": 5,
      "value": 4.8
    },
    {
      "day": 6,
      "value": 4.2
    },
    {
      "day": 7,
      "value": 2.1
    },
    {
      "day": 8,
      "value": 7.5
    },
    {
      "day": 9,
      "value": 3.1
    },
    {
      "day": 10,
      "value": 0.8
    },
    {
      "day": 11,
      "value": 5.1
    },
    {
      "day": 12,
      "value": 1.8
    },
    {
      "day": 13,
      "value": 1.5
    },
    {
      "day": 14,
      "value": 0.8
    }
  ],
  "Ulsoor": [
    {
      "day": 1,
      "value": 2.8
    },
    {
      "day": 2,
      "value": 3.1
    },
    {
      "day": 3,
      "value": 4
    },
    {
      "day": 4,
      "value": 3.8
    },
    {
      "day": 5,
      "value": 3.8
    },
    {
      "day": 6,
      "value": 2.8
    },
    {
      "day": 7,
      "value": 2.4
    },
    {
      "day": 8,
      "value": 3.9
    },
    {
      "day": 9,
      "value": 2
    },
    {
      "day": 10,
      "value": 1.9
    },
    {
      "day": 11,
      "value": 1.6
    },
    {
      "day": 12,
      "value": 3.6
    },
    {
      "day": 13,
      "value": 1.8
    },
    {
      "day": 14,
      "value": 2.4
    }
  ],
  "FB-25": [
    {
      "day": 1,
      "value": 2.8
    },
    {
      "day": 2,
      "value": 3.1
    },
    {
      "day": 3,
      "value": 4
    },
    {
      "day": 4,
      "value": 3.8
    },
    {
      "day": 5,
      "value": 3.8
    },
    {
      "day": 6,
      "value": 2.8
    },
    {
      "day": 7,
      "value": 2.4
    },
    {
      "day": 8,
      "value": 3.9
    },
    {
      "day": 9,
      "value": 2
    },
    {
      "day": 10,
      "value": 1.9
    },
    {
      "day": 11,
      "value": 1.6
    },
    {
      "day": 12,
      "value": 3.6
    },
    {
      "day": 13,
      "value": 1.8
    },
    {
      "day": 14,
      "value": 2.4
    }
  ],
  "Kengeri": [
    {
      "day": 1,
      "value": 5.8
    },
    {
      "day": 2,
      "value": 2.7
    },
    {
      "day": 3,
      "value": 3.5
    },
    {
      "day": 4,
      "value": 1.7
    },
    {
      "day": 5,
      "value": 5.4
    },
    {
      "day": 6,
      "value": 2.4
    },
    {
      "day": 7,
      "value": 4.8
    },
    {
      "day": 8,
      "value": 3.2
    },
    {
      "day": 9,
      "value": 6.1
    },
    {
      "day": 10,
      "value": 1.6
    },
    {
      "day": 11,
      "value": 1.7
    },
    {
      "day": 12,
      "value": 4.9
    },
    {
      "day": 13,
      "value": 5.1
    },
    {
      "day": 14,
      "value": 4.1
    }
  ],
  "FB-20": [
    {
      "day": 1,
      "value": 5.8
    },
    {
      "day": 2,
      "value": 2.7
    },
    {
      "day": 3,
      "value": 3.5
    },
    {
      "day": 4,
      "value": 1.7
    },
    {
      "day": 5,
      "value": 5.4
    },
    {
      "day": 6,
      "value": 2.4
    },
    {
      "day": 7,
      "value": 4.8
    },
    {
      "day": 8,
      "value": 3.2
    },
    {
      "day": 9,
      "value": 6.1
    },
    {
      "day": 10,
      "value": 1.6
    },
    {
      "day": 11,
      "value": 1.7
    },
    {
      "day": 12,
      "value": 4.9
    },
    {
      "day": 13,
      "value": 5.1
    },
    {
      "day": 14,
      "value": 4.1
    }
  ],
  "Hebbal": [
    {
      "day": 1,
      "value": 6.3
    },
    {
      "day": 2,
      "value": 2.1
    },
    {
      "day": 3,
      "value": 2.8
    },
    {
      "day": 4,
      "value": 0.8
    },
    {
      "day": 5,
      "value": 4.7
    },
    {
      "day": 6,
      "value": 3.8
    },
    {
      "day": 7,
      "value": 2
    },
    {
      "day": 8,
      "value": 4.3
    },
    {
      "day": 9,
      "value": 3.7
    },
    {
      "day": 10,
      "value": 3.3
    },
    {
      "day": 11,
      "value": 3.1
    },
    {
      "day": 12,
      "value": 7.6
    },
    {
      "day": 13,
      "value": 1.2
    },
    {
      "day": 14,
      "value": 5.3
    }
  ],
  "FB-14": [
    {
      "day": 1,
      "value": 6.3
    },
    {
      "day": 2,
      "value": 2.1
    },
    {
      "day": 3,
      "value": 2.8
    },
    {
      "day": 4,
      "value": 0.8
    },
    {
      "day": 5,
      "value": 4.7
    },
    {
      "day": 6,
      "value": 3.8
    },
    {
      "day": 7,
      "value": 2
    },
    {
      "day": 8,
      "value": 4.3
    },
    {
      "day": 9,
      "value": 3.7
    },
    {
      "day": 10,
      "value": 3.3
    },
    {
      "day": 11,
      "value": 3.1
    },
    {
      "day": 12,
      "value": 7.6
    },
    {
      "day": 13,
      "value": 1.2
    },
    {
      "day": 14,
      "value": 5.3
    }
  ],
  "Kalyan Nagar": [
    {
      "day": 1,
      "value": 2.9
    },
    {
      "day": 2,
      "value": 1.5
    },
    {
      "day": 3,
      "value": 2.1
    },
    {
      "day": 4,
      "value": 5.7
    },
    {
      "day": 5,
      "value": 6.5
    },
    {
      "day": 6,
      "value": 3.8
    },
    {
      "day": 7,
      "value": 3.3
    },
    {
      "day": 8,
      "value": 4.1
    },
    {
      "day": 9,
      "value": 2.9
    },
    {
      "day": 10,
      "value": 2.9
    },
    {
      "day": 11,
      "value": 3.2
    },
    {
      "day": 12,
      "value": 8.3
    },
    {
      "day": 13,
      "value": 1.7
    },
    {
      "day": 14,
      "value": 2.4
    }
  ],
  "FB-23": [
    {
      "day": 1,
      "value": 2.9
    },
    {
      "day": 2,
      "value": 1.5
    },
    {
      "day": 3,
      "value": 2.1
    },
    {
      "day": 4,
      "value": 5.7
    },
    {
      "day": 5,
      "value": 6.5
    },
    {
      "day": 6,
      "value": 3.8
    },
    {
      "day": 7,
      "value": 3.3
    },
    {
      "day": 8,
      "value": 4.1
    },
    {
      "day": 9,
      "value": 2.9
    },
    {
      "day": 10,
      "value": 2.9
    },
    {
      "day": 11,
      "value": 3.2
    },
    {
      "day": 12,
      "value": 8.3
    },
    {
      "day": 13,
      "value": 1.7
    },
    {
      "day": 14,
      "value": 2.4
    }
  ],
  "Banashankari": [
    {
      "day": 1,
      "value": 4.7
    },
    {
      "day": 2,
      "value": 2.5
    },
    {
      "day": 3,
      "value": 0.9
    },
    {
      "day": 4,
      "value": 6.7
    },
    {
      "day": 5,
      "value": 1.6
    },
    {
      "day": 6,
      "value": 3.7
    },
    {
      "day": 7,
      "value": 6
    },
    {
      "day": 8,
      "value": 3.1
    },
    {
      "day": 9,
      "value": 6.3
    },
    {
      "day": 10,
      "value": 6.4
    },
    {
      "day": 11,
      "value": 10.1
    },
    {
      "day": 12,
      "value": 5.6
    },
    {
      "day": 13,
      "value": 2.5
    },
    {
      "day": 14,
      "value": 3.6
    }
  ],
  "FB-03": [
    {
      "day": 1,
      "value": 4.7
    },
    {
      "day": 2,
      "value": 2.5
    },
    {
      "day": 3,
      "value": 0.9
    },
    {
      "day": 4,
      "value": 6.7
    },
    {
      "day": 5,
      "value": 1.6
    },
    {
      "day": 6,
      "value": 3.7
    },
    {
      "day": 7,
      "value": 6
    },
    {
      "day": 8,
      "value": 3.1
    },
    {
      "day": 9,
      "value": 6.3
    },
    {
      "day": 10,
      "value": 6.4
    },
    {
      "day": 11,
      "value": 10.1
    },
    {
      "day": 12,
      "value": 5.6
    },
    {
      "day": 13,
      "value": 2.5
    },
    {
      "day": 14,
      "value": 3.6
    }
  ],
  "Sahakar Nagar": [
    {
      "day": 1,
      "value": 3.4
    },
    {
      "day": 2,
      "value": 5
    },
    {
      "day": 3,
      "value": 2.8
    },
    {
      "day": 4,
      "value": 4.7
    },
    {
      "day": 5,
      "value": 3.8
    },
    {
      "day": 6,
      "value": 3.1
    },
    {
      "day": 7,
      "value": 2.6
    },
    {
      "day": 8,
      "value": 2.4
    },
    {
      "day": 9,
      "value": 1.9
    },
    {
      "day": 10,
      "value": 1.2
    },
    {
      "day": 11,
      "value": 0.8
    },
    {
      "day": 12,
      "value": 4.4
    },
    {
      "day": 13,
      "value": 1.1
    },
    {
      "day": 14,
      "value": 3.5
    }
  ],
  "FB-24": [
    {
      "day": 1,
      "value": 3.4
    },
    {
      "day": 2,
      "value": 5
    },
    {
      "day": 3,
      "value": 2.8
    },
    {
      "day": 4,
      "value": 4.7
    },
    {
      "day": 5,
      "value": 3.8
    },
    {
      "day": 6,
      "value": 3.1
    },
    {
      "day": 7,
      "value": 2.6
    },
    {
      "day": 8,
      "value": 2.4
    },
    {
      "day": 9,
      "value": 1.9
    },
    {
      "day": 10,
      "value": 1.2
    },
    {
      "day": 11,
      "value": 0.8
    },
    {
      "day": 12,
      "value": 4.4
    },
    {
      "day": 13,
      "value": 1.1
    },
    {
      "day": 14,
      "value": 3.5
    }
  ],
  "Basavanagudi": [
    {
      "day": 1,
      "value": 9.2
    },
    {
      "day": 2,
      "value": 1.8
    },
    {
      "day": 3,
      "value": 2.8
    },
    {
      "day": 4,
      "value": 2.9
    },
    {
      "day": 5,
      "value": 1.2
    },
    {
      "day": 6,
      "value": 1.5
    },
    {
      "day": 7,
      "value": 2.8
    },
    {
      "day": 8,
      "value": 1
    },
    {
      "day": 9,
      "value": 2.3
    },
    {
      "day": 10,
      "value": 6.5
    },
    {
      "day": 11,
      "value": 2.6
    },
    {
      "day": 12,
      "value": 3.7
    },
    {
      "day": 13,
      "value": 4.8
    },
    {
      "day": 14,
      "value": 2.7
    }
  ],
  "FB-04": [
    {
      "day": 1,
      "value": 9.2
    },
    {
      "day": 2,
      "value": 1.8
    },
    {
      "day": 3,
      "value": 2.8
    },
    {
      "day": 4,
      "value": 2.9
    },
    {
      "day": 5,
      "value": 1.2
    },
    {
      "day": 6,
      "value": 1.5
    },
    {
      "day": 7,
      "value": 2.8
    },
    {
      "day": 8,
      "value": 1
    },
    {
      "day": 9,
      "value": 2.3
    },
    {
      "day": 10,
      "value": 6.5
    },
    {
      "day": 11,
      "value": 2.6
    },
    {
      "day": 12,
      "value": 3.7
    },
    {
      "day": 13,
      "value": 4.8
    },
    {
      "day": 14,
      "value": 2.7
    }
  ],
  "Rajajinagar": [
    {
      "day": 1,
      "value": 3.1
    },
    {
      "day": 2,
      "value": 1.7
    },
    {
      "day": 3,
      "value": 5.3
    },
    {
      "day": 4,
      "value": 6.4
    },
    {
      "day": 5,
      "value": 2.6
    },
    {
      "day": 6,
      "value": 3.5
    },
    {
      "day": 7,
      "value": 4.8
    },
    {
      "day": 8,
      "value": 6.8
    },
    {
      "day": 9,
      "value": 3.4
    },
    {
      "day": 10,
      "value": 2.1
    },
    {
      "day": 11,
      "value": 2.3
    },
    {
      "day": 12,
      "value": 4.5
    },
    {
      "day": 13,
      "value": 6.4
    },
    {
      "day": 14,
      "value": 1.8
    }
  ],
  "FB-11": [
    {
      "day": 1,
      "value": 3.1
    },
    {
      "day": 2,
      "value": 1.7
    },
    {
      "day": 3,
      "value": 5.3
    },
    {
      "day": 4,
      "value": 6.4
    },
    {
      "day": 5,
      "value": 2.6
    },
    {
      "day": 6,
      "value": 3.5
    },
    {
      "day": 7,
      "value": 4.8
    },
    {
      "day": 8,
      "value": 6.8
    },
    {
      "day": 9,
      "value": 3.4
    },
    {
      "day": 10,
      "value": 2.1
    },
    {
      "day": 11,
      "value": 2.3
    },
    {
      "day": 12,
      "value": 4.5
    },
    {
      "day": 13,
      "value": 6.4
    },
    {
      "day": 14,
      "value": 1.8
    }
  ],
  "Jayanagar": [
    {
      "day": 1,
      "value": 5
    },
    {
      "day": 2,
      "value": 4.2
    },
    {
      "day": 3,
      "value": 3.5
    },
    {
      "day": 4,
      "value": 1.6
    },
    {
      "day": 5,
      "value": 1
    },
    {
      "day": 6,
      "value": 5.4
    },
    {
      "day": 7,
      "value": 4.7
    },
    {
      "day": 8,
      "value": 4.3
    },
    {
      "day": 9,
      "value": 6.5
    },
    {
      "day": 10,
      "value": 4.2
    },
    {
      "day": 11,
      "value": 2.8
    },
    {
      "day": 12,
      "value": 3.4
    },
    {
      "day": 13,
      "value": 5.6
    },
    {
      "day": 14,
      "value": 3.6
    }
  ],
  "FB-01": [
    {
      "day": 1,
      "value": 5
    },
    {
      "day": 2,
      "value": 4.2
    },
    {
      "day": 3,
      "value": 3.5
    },
    {
      "day": 4,
      "value": 1.6
    },
    {
      "day": 5,
      "value": 1
    },
    {
      "day": 6,
      "value": 5.4
    },
    {
      "day": 7,
      "value": 4.7
    },
    {
      "day": 8,
      "value": 4.3
    },
    {
      "day": 9,
      "value": 6.5
    },
    {
      "day": 10,
      "value": 4.2
    },
    {
      "day": 11,
      "value": 2.8
    },
    {
      "day": 12,
      "value": 3.4
    },
    {
      "day": 13,
      "value": 5.6
    },
    {
      "day": 14,
      "value": 3.6
    }
  ],
  "Koramangala": [
    {
      "day": 1,
      "value": 1.5
    },
    {
      "day": 2,
      "value": 1.9
    },
    {
      "day": 3,
      "value": 2.2
    },
    {
      "day": 4,
      "value": 6
    },
    {
      "day": 5,
      "value": 3.5
    },
    {
      "day": 6,
      "value": 3.2
    },
    {
      "day": 7,
      "value": 1.2
    },
    {
      "day": 8,
      "value": 4.6
    },
    {
      "day": 9,
      "value": 2.7
    },
    {
      "day": 10,
      "value": 1.4
    },
    {
      "day": 11,
      "value": 5.5
    },
    {
      "day": 12,
      "value": 3.9
    },
    {
      "day": 13,
      "value": 4.7
    },
    {
      "day": 14,
      "value": 4
    }
  ],
  "FB-06": [
    {
      "day": 1,
      "value": 1.5
    },
    {
      "day": 2,
      "value": 1.9
    },
    {
      "day": 3,
      "value": 2.2
    },
    {
      "day": 4,
      "value": 6
    },
    {
      "day": 5,
      "value": 3.5
    },
    {
      "day": 6,
      "value": 3.2
    },
    {
      "day": 7,
      "value": 1.2
    },
    {
      "day": 8,
      "value": 4.6
    },
    {
      "day": 9,
      "value": 2.7
    },
    {
      "day": 10,
      "value": 1.4
    },
    {
      "day": 11,
      "value": 5.5
    },
    {
      "day": 12,
      "value": 3.9
    },
    {
      "day": 13,
      "value": 4.7
    },
    {
      "day": 14,
      "value": 4
    }
  ],
  "Domlur": [
    {
      "day": 1,
      "value": 6.1
    },
    {
      "day": 2,
      "value": 7.5
    },
    {
      "day": 3,
      "value": 1.5
    },
    {
      "day": 4,
      "value": 5.3
    },
    {
      "day": 5,
      "value": 2.7
    },
    {
      "day": 6,
      "value": 2.6
    },
    {
      "day": 7,
      "value": 0.8
    },
    {
      "day": 8,
      "value": 6.5
    },
    {
      "day": 9,
      "value": 0.9
    },
    {
      "day": 10,
      "value": 6.6
    },
    {
      "day": 11,
      "value": 0.8
    },
    {
      "day": 12,
      "value": 1.3
    },
    {
      "day": 13,
      "value": 3
    },
    {
      "day": 14,
      "value": 5.7
    }
  ],
  "FB-09": [
    {
      "day": 1,
      "value": 6.1
    },
    {
      "day": 2,
      "value": 7.5
    },
    {
      "day": 3,
      "value": 1.5
    },
    {
      "day": 4,
      "value": 5.3
    },
    {
      "day": 5,
      "value": 2.7
    },
    {
      "day": 6,
      "value": 2.6
    },
    {
      "day": 7,
      "value": 0.8
    },
    {
      "day": 8,
      "value": 6.5
    },
    {
      "day": 9,
      "value": 0.9
    },
    {
      "day": 10,
      "value": 6.6
    },
    {
      "day": 11,
      "value": 0.8
    },
    {
      "day": 12,
      "value": 1.3
    },
    {
      "day": 13,
      "value": 3
    },
    {
      "day": 14,
      "value": 5.7
    }
  ],
  "Malleshwaram": [
    {
      "day": 1,
      "value": 4.9
    },
    {
      "day": 2,
      "value": 3.4
    },
    {
      "day": 3,
      "value": 2.1
    },
    {
      "day": 4,
      "value": 1.7
    },
    {
      "day": 5,
      "value": 0.8
    },
    {
      "day": 6,
      "value": 1.6
    },
    {
      "day": 7,
      "value": 3.3
    },
    {
      "day": 8,
      "value": 3.2
    },
    {
      "day": 9,
      "value": 1
    },
    {
      "day": 10,
      "value": 1
    },
    {
      "day": 11,
      "value": 6.7
    },
    {
      "day": 12,
      "value": 2.3
    },
    {
      "day": 13,
      "value": 1.6
    },
    {
      "day": 14,
      "value": 3.3
    }
  ],
  "FB-10": [
    {
      "day": 1,
      "value": 4.9
    },
    {
      "day": 2,
      "value": 3.4
    },
    {
      "day": 3,
      "value": 2.1
    },
    {
      "day": 4,
      "value": 1.7
    },
    {
      "day": 5,
      "value": 0.8
    },
    {
      "day": 6,
      "value": 1.6
    },
    {
      "day": 7,
      "value": 3.3
    },
    {
      "day": 8,
      "value": 3.2
    },
    {
      "day": 9,
      "value": 1
    },
    {
      "day": 10,
      "value": 1
    },
    {
      "day": 11,
      "value": 6.7
    },
    {
      "day": 12,
      "value": 2.3
    },
    {
      "day": 13,
      "value": 1.6
    },
    {
      "day": 14,
      "value": 3.3
    }
  ],
  "Bellandur": [
    {
      "day": 1,
      "value": 3.4
    },
    {
      "day": 2,
      "value": 2.4
    },
    {
      "day": 3,
      "value": 2.2
    },
    {
      "day": 4,
      "value": 2.9
    },
    {
      "day": 5,
      "value": 9.7
    },
    {
      "day": 6,
      "value": 6.5
    },
    {
      "day": 7,
      "value": 5.6
    },
    {
      "day": 8,
      "value": 0.8
    },
    {
      "day": 9,
      "value": 1.9
    },
    {
      "day": 10,
      "value": 2.2
    },
    {
      "day": 11,
      "value": 1.5
    },
    {
      "day": 12,
      "value": 2.9
    },
    {
      "day": 13,
      "value": 3.1
    },
    {
      "day": 14,
      "value": 1
    }
  ],
  "FB-18": [
    {
      "day": 1,
      "value": 3.4
    },
    {
      "day": 2,
      "value": 2.4
    },
    {
      "day": 3,
      "value": 2.2
    },
    {
      "day": 4,
      "value": 2.9
    },
    {
      "day": 5,
      "value": 9.7
    },
    {
      "day": 6,
      "value": 6.5
    },
    {
      "day": 7,
      "value": 5.6
    },
    {
      "day": 8,
      "value": 0.8
    },
    {
      "day": 9,
      "value": 1.9
    },
    {
      "day": 10,
      "value": 2.2
    },
    {
      "day": 11,
      "value": 1.5
    },
    {
      "day": 12,
      "value": 2.9
    },
    {
      "day": 13,
      "value": 3.1
    },
    {
      "day": 14,
      "value": 1
    }
  ],
  "JP Nagar": [
    {
      "day": 1,
      "value": 3.5
    },
    {
      "day": 2,
      "value": 4.1
    },
    {
      "day": 3,
      "value": 1.2
    },
    {
      "day": 4,
      "value": 5.9
    },
    {
      "day": 5,
      "value": 4.4
    },
    {
      "day": 6,
      "value": 2.7
    },
    {
      "day": 7,
      "value": 2.1
    },
    {
      "day": 8,
      "value": 2.6
    },
    {
      "day": 9,
      "value": 2.8
    },
    {
      "day": 10,
      "value": 5.5
    },
    {
      "day": 11,
      "value": 2.7
    },
    {
      "day": 12,
      "value": 3.9
    },
    {
      "day": 13,
      "value": 2
    },
    {
      "day": 14,
      "value": 5.2
    }
  ],
  "FB-05": [
    {
      "day": 1,
      "value": 3.5
    },
    {
      "day": 2,
      "value": 4.1
    },
    {
      "day": 3,
      "value": 1.2
    },
    {
      "day": 4,
      "value": 5.9
    },
    {
      "day": 5,
      "value": 4.4
    },
    {
      "day": 6,
      "value": 2.7
    },
    {
      "day": 7,
      "value": 2.1
    },
    {
      "day": 8,
      "value": 2.6
    },
    {
      "day": 9,
      "value": 2.8
    },
    {
      "day": 10,
      "value": 5.5
    },
    {
      "day": 11,
      "value": 2.7
    },
    {
      "day": 12,
      "value": 3.9
    },
    {
      "day": 13,
      "value": 2
    },
    {
      "day": 14,
      "value": 5.2
    }
  ],
  "HSR Layout": [
    {
      "day": 1,
      "value": 3.6
    },
    {
      "day": 2,
      "value": 6.5
    },
    {
      "day": 3,
      "value": 2.2
    },
    {
      "day": 4,
      "value": 2.4
    },
    {
      "day": 5,
      "value": 5.3
    },
    {
      "day": 6,
      "value": 3
    },
    {
      "day": 7,
      "value": 3.7
    },
    {
      "day": 8,
      "value": 7.4
    },
    {
      "day": 9,
      "value": 3
    },
    {
      "day": 10,
      "value": 10.6
    },
    {
      "day": 11,
      "value": 1.7
    },
    {
      "day": 12,
      "value": 4.4
    },
    {
      "day": 13,
      "value": 3.2
    },
    {
      "day": 14,
      "value": 9.4
    }
  ],
  "FB-07": [
    {
      "day": 1,
      "value": 3.6
    },
    {
      "day": 2,
      "value": 6.5
    },
    {
      "day": 3,
      "value": 2.2
    },
    {
      "day": 4,
      "value": 2.4
    },
    {
      "day": 5,
      "value": 5.3
    },
    {
      "day": 6,
      "value": 3
    },
    {
      "day": 7,
      "value": 3.7
    },
    {
      "day": 8,
      "value": 7.4
    },
    {
      "day": 9,
      "value": 3
    },
    {
      "day": 10,
      "value": 10.6
    },
    {
      "day": 11,
      "value": 1.7
    },
    {
      "day": 12,
      "value": 4.4
    },
    {
      "day": 13,
      "value": 3.2
    },
    {
      "day": 14,
      "value": 9.4
    }
  ],
  "Yelahanka": [
    {
      "day": 1,
      "value": 8.1
    },
    {
      "day": 2,
      "value": 1.4
    },
    {
      "day": 3,
      "value": 2.6
    },
    {
      "day": 4,
      "value": 2.3
    },
    {
      "day": 5,
      "value": 2.8
    },
    {
      "day": 6,
      "value": 2.3
    },
    {
      "day": 7,
      "value": 3.7
    },
    {
      "day": 8,
      "value": 2
    },
    {
      "day": 9,
      "value": 3.8
    },
    {
      "day": 10,
      "value": 4.7
    },
    {
      "day": 11,
      "value": 7.1
    },
    {
      "day": 12,
      "value": 4.6
    },
    {
      "day": 13,
      "value": 0.8
    },
    {
      "day": 14,
      "value": 3.4
    }
  ],
  "FB-15": [
    {
      "day": 1,
      "value": 8.1
    },
    {
      "day": 2,
      "value": 1.4
    },
    {
      "day": 3,
      "value": 2.6
    },
    {
      "day": 4,
      "value": 2.3
    },
    {
      "day": 5,
      "value": 2.8
    },
    {
      "day": 6,
      "value": 2.3
    },
    {
      "day": 7,
      "value": 3.7
    },
    {
      "day": 8,
      "value": 2
    },
    {
      "day": 9,
      "value": 3.8
    },
    {
      "day": 10,
      "value": 4.7
    },
    {
      "day": 11,
      "value": 7.1
    },
    {
      "day": 12,
      "value": 4.6
    },
    {
      "day": 13,
      "value": 0.8
    },
    {
      "day": 14,
      "value": 3.4
    }
  ]
}
