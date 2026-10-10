export type CustomerProduct = {
  name: string;
  size: string;
  price: number;
  category: string;
  color: string;
  rating?: number;
  discount?: string;
  unit?: string;
  barcode: string;
  barcodeImageUrl?: string;
  aisle?: string;
  image?: any;
  inStock?: boolean;
  stockQty?: number;
  bestSeller?: boolean;
  buyCount?: number; // how many people bought this in last 30 days
};

export const customerProducts: CustomerProduct[] = [
  // Dairy & Fresh (Aisle 1)
  {
    name: 'Amul Taaza Milk',
    size: '500 ml pouch',
    price: 28,
    category: 'Dairy',
    color: 'bg-emerald-100',
    rating: 4.8,
    barcode: '8901262010053',
    aisle: 'Aisle 1 · Chiller 2',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500&auto=format&fit=crop&q=80',
    inStock: true,
    stockQty: 45,
    bestSeller: true,
    buyCount: 312,
  },
  {
    name: 'Fresh Paneer',
    size: '200 g block',
    price: 95,
    category: 'Dairy',
    color: 'bg-slate-100',
    rating: 4.7,
    barcode: '8901262020106',
    aisle: 'Aisle 1 · Chiller 3',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&auto=format&fit=crop&q=80',
    inStock: true,
    stockQty: 18,
    buyCount: 178,
  },
  {
    name: 'Amul Salted Butter',
    size: '100 g pack',
    price: 58,
    category: 'Dairy',
    color: 'bg-yellow-100',
    rating: 4.9,
    barcode: '8901262030013',
    aisle: 'Aisle 1 · Chiller 1',
    image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=500&auto=format&fit=crop&q=80',
    inStock: true,
    stockQty: 32,
    bestSeller: true,
    buyCount: 267,
  },
  {
    name: 'Farm Fresh Eggs',
    size: '12-pack tray',
    price: 90,
    category: 'Dairy',
    color: 'bg-amber-100',
    rating: 4.8,
    barcode: '8901262040019',
    aisle: 'Aisle 1 · Rack A',
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=500&auto=format&fit=crop&q=80',
    inStock: true,
    stockQty: 22,
    buyCount: 198,
  },
  {
    name: 'Amul Masti Dahi',
    size: '400 g cup',
    price: 35,
    category: 'Dairy',
    color: 'bg-cyan-100',
    rating: 4.7,
    barcode: '8901262050018',
    aisle: 'Aisle 1 · Chiller 4',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500&auto=format&fit=crop&q=80',
    inStock: true,
    stockQty: 24,
    buyCount: 156,
  },
  {
    name: 'Amul Pure Cow Ghee',
    size: '500 ml jar',
    price: 320,
    category: 'Dairy',
    color: 'bg-amber-100',
    rating: 4.9,
    discount: '5% OFF',
    barcode: '8901262070016',
    aisle: 'Aisle 1 · Rack B',
    image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=500&auto=format&fit=crop&q=80',
    inStock: true,
    stockQty: 18,
    bestSeller: true,
    buyCount: 180,
  },
  {
    name: 'Britannia Cheese Slices',
    size: '200 g (10 pcs)',
    price: 130,
    category: 'Dairy',
    color: 'bg-yellow-200',
    rating: 4.8,
    discount: '10% OFF',
    barcode: '8901063141121',
    aisle: 'Aisle 1 · Chiller 2',
    image: 'https://images.unsplash.com/photo-1618164436241-4473940d1f5c?w=500&auto=format&fit=crop&q=80',
    inStock: true,
    stockQty: 15,
    buyCount: 134,
  },

  // Fresh Produce (Aisle 2)
  {
    name: 'Organic Bananas',
    size: '500 g (3-4 pcs)',
    price: 42,
    category: 'Produce',
    color: 'bg-lime-100',
    rating: 4.6,
    discount: '15% OFF',
    barcode: '8901000100012',
    aisle: 'Aisle 2 · Fresh Bay 1',
    image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=500&auto=format&fit=crop&q=80',
    inStock: true,
    stockQty: 60,
    bestSeller: true,
    buyCount: 289,
  },
  {
    name: 'Shimla Royal Apples',
    size: '4 pcs (~600 g)',
    price: 140,
    category: 'Produce',
    color: 'bg-rose-100',
    rating: 4.9,
    barcode: '8901000100029',
    aisle: 'Aisle 2 · Fruit Crate 3',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500&auto=format&fit=crop&q=80',
    inStock: true,
    stockQty: 25,
    buyCount: 167,
  },
  {
    name: 'Hybrid Tomatoes',
    size: '1 kg net',
    price: 34,
    category: 'Produce',
    color: 'bg-red-100',
    rating: 4.5,
    barcode: '8901000100036',
    aisle: 'Aisle 2 · Veg Bin 2',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop&q=80',
    inStock: true,
    stockQty: 40,
    buyCount: 201,
  },
  {
    name: 'Nashik Red Onions',
    size: '1 kg net',
    price: 38,
    category: 'Produce',
    color: 'bg-purple-100',
    rating: 4.7,
    barcode: '8901000100074',
    aisle: 'Aisle 2 · Veg Bin 1',
    image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=500&auto=format&fit=crop&q=80',
    inStock: true,
    stockQty: 55,
    buyCount: 245,
  },
  {
    name: 'Fresh Jyoti Potatoes',
    size: '1 kg bag',
    price: 35,
    category: 'Produce',
    color: 'bg-amber-100',
    rating: 4.7,
    barcode: '8901000100081',
    aisle: 'Aisle 2 · Veg Bin 3',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&auto=format&fit=crop&q=80',
    inStock: true,
    stockQty: 50,
    buyCount: 260,
  },
  {
    name: 'Fresh Coriander',
    size: '1 bunch (100 g)',
    price: 15,
    category: 'Produce',
    color: 'bg-emerald-100',
    rating: 4.6,
    barcode: '8901000100043',
    aisle: 'Aisle 2 · Herbs Shelf',
    image: 'https://images.unsplash.com/photo-1608797178974-15b35a61dd75?w=500&auto=format&fit=crop&q=80',
    inStock: true,
    stockQty: 30,
    buyCount: 112,
  },
  {
    name: 'Spinach Bunch (Palak)',
    size: '250 g bunch',
    price: 25,
    category: 'Produce',
    color: 'bg-green-200',
    rating: 4.5,
    barcode: '8901000100050',
    aisle: 'Aisle 2 · Leafy Rack',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500&auto=format&fit=crop&q=80',
    inStock: true,
    stockQty: 20,
    buyCount: 98,
  },

  // Staples & Oils (Aisle 3)
  {
    name: 'Aashirvaad Atta',
    size: '5 kg bag',
    price: 310,
    category: 'Staples',
    color: 'bg-amber-100',
    rating: 4.8,
    barcode: '8901725181222',
    aisle: 'Aisle 3 · Shelf 1',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=80',
    inStock: true,
    stockQty: 35,
    bestSeller: true,
    buyCount: 345,
  },
  {
    name: 'India Gate Basmati Rice',
    size: '1 kg pouch',
    price: 125,
    category: 'Staples',
    color: 'bg-amber-50',
    rating: 4.7,
    barcode: '8901140001019',
    aisle: 'Aisle 3 · Shelf 2',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop&q=80',
    inStock: true,
    stockQty: 28,
    bestSeller: true,
    buyCount: 298,
  },
  {
    name: 'Fortune Sunflower Oil',
    size: '1 L pouch',
    price: 145,
    category: 'Staples',
    color: 'bg-yellow-50',
    rating: 4.6,
    barcode: '8906007280014',
    aisle: 'Aisle 3 · Shelf 3',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&auto=format&fit=crop&q=80',
    inStock: true,
    stockQty: 20,
    bestSeller: true,
    buyCount: 187,
  },
  {
    name: 'Tata Sampann Toor Dal',
    size: '1 kg unpolished',
    price: 165,
    category: 'Staples',
    color: 'bg-orange-100',
    rating: 4.7,
    barcode: '8901140001026',
    aisle: 'Aisle 3 · Pulses Bay',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format&fit=crop&q=80',
    inStock: true,
    stockQty: 15,
    buyCount: 156,
  },
  {
    name: 'Tata Salt Vacuum Evaporated',
    size: '1 kg pack',
    price: 28,
    category: 'Staples',
    color: 'bg-slate-100',
    rating: 4.8,
    barcode: '8901058812374',
    aisle: 'Aisle 3 · Spices Rack',
    image: 'https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?w=500&auto=format&fit=crop&q=80',
    inStock: true,
    stockQty: 50,
    bestSeller: true,
    buyCount: 380,
  },
  {
    name: 'Maggi 2-Minute Noodles',
    size: '4-pack (280 g)',
    price: 56,
    category: 'Staples',
    color: 'bg-yellow-100',
    rating: 4.9,
    barcode: '8901058852315',
    aisle: 'Aisle 3 · Instant Foods',
    image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=500&auto=format&fit=crop&q=80',
    inStock: true,
    stockQty: 50,
    bestSeller: true,
    buyCount: 412,
  },
  {
    name: 'Harvest Gold Bread',
    size: '400 g loaf',
    price: 45,
    category: 'Staples',
    color: 'bg-orange-100',
    rating: 4.7,
    barcode: '8906014430013',
    aisle: 'Aisle 3 · Bread Bay',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=80',
    inStock: true,
    stockQty: 25,
    buyCount: 234,
  },

  // Snacks & Biscuits (Aisle 4)
  {
    name: 'Bingo! Mad Angles',
    size: '66 g pack',
    price: 20,
    category: 'Snacks',
    color: 'bg-orange-100',
    rating: 4.8,
    barcode: '8901725013790',
    aisle: 'Aisle 4 · Chips Bay',
    image: 'https://images.unsplash.com/photo-1621447504864-d8686e12698c?w=500&auto=format&fit=crop&q=80',
    inStock: true,
    stockQty: 45,
    bestSeller: true,
    buyCount: 389,
  },
  {
    name: "Lay's Classic Salted",
    size: '50 g pack',
    price: 20,
    category: 'Snacks',
    color: 'bg-yellow-200',
    rating: 4.5,
    barcode: '8901491101837',
    aisle: 'Aisle 4 · Chips Bay',
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=500&auto=format&fit=crop&q=80',
    inStock: true,
    stockQty: 55,
    bestSeller: true,
    buyCount: 367,
  },
  {
    name: "Haldiram's Aloo Bhujia",
    size: '200 g pack',
    price: 55,
    category: 'Snacks',
    color: 'bg-amber-200',
    rating: 4.8,
    barcode: '8904004400123',
    aisle: 'Aisle 4 · Namkeen Rack',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&auto=format&fit=crop&q=80',
    inStock: true,
    stockQty: 30,
    buyCount: 189,
  },
  {
    name: 'Dark Fantasy Choco Fills',
    size: '75 g pack',
    price: 40,
    category: 'Snacks',
    color: 'bg-stone-200',
    rating: 4.9,
    discount: '10% OFF',
    barcode: '8901725132019',
    aisle: 'Aisle 4 · Biscuits Shelf',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500&auto=format&fit=crop&q=80',
    inStock: true,
    stockQty: 42,
    bestSeller: true,
    buyCount: 356,
  },
  {
    name: 'Cadbury Dairy Milk Silk',
    size: '60 g bar',
    price: 85,
    category: 'Snacks',
    color: 'bg-purple-100',
    rating: 4.9,
    barcode: '8901233024881',
    aisle: 'Aisle 4 · Chocolates',
    image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=500&auto=format&fit=crop&q=80',
    inStock: true,
    stockQty: 35,
    bestSeller: true,
    buyCount: 423,
  },
  {
    name: 'Parle-G Gluco Biscuits',
    size: '250 g pack',
    price: 25,
    category: 'Snacks',
    color: 'bg-yellow-100',
    rating: 4.8,
    barcode: '8901058812398',
    aisle: 'Aisle 4 · Biscuits Shelf',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500&auto=format&fit=crop&q=80',
    inStock: true,
    stockQty: 60,
    buyCount: 390,
  },

  // Beverages & Household (Aisle 5)
  {
    name: 'Brooke Bond Red Label Tea',
    size: '500 g pack',
    price: 230,
    category: 'Beverages',
    color: 'bg-red-100',
    rating: 4.7,
    barcode: '8901058812381',
    aisle: 'Aisle 5 · Tea & Coffee Bay',
    image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=500&auto=format&fit=crop&q=80',
    inStock: true,
    stockQty: 30,
    bestSeller: true,
    buyCount: 280,
  },
  {
    name: 'Nescafé Classic Coffee',
    size: '50 g jar',
    price: 185,
    category: 'Beverages',
    color: 'bg-amber-100',
    rating: 4.8,
    barcode: '8901058812459',
    aisle: 'Aisle 5 · Tea & Coffee Bay',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500&auto=format&fit=crop&q=80',
    inStock: true,
    stockQty: 22,
    buyCount: 195,
  },
  {
    name: 'Surf Excel Easy Wash',
    size: '1 kg pack',
    price: 135,
    category: 'Household',
    color: 'bg-blue-100',
    rating: 4.8,
    barcode: '8901058812404',
    aisle: 'Aisle 5 · Detergents Shelf',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=80',
    inStock: true,
    stockQty: 25,
    buyCount: 210,
  },
  {
    name: 'Vim Lemon Dishwash Gel',
    size: '500 ml bottle',
    price: 110,
    category: 'Household',
    color: 'bg-lime-100',
    rating: 4.7,
    barcode: '8901058812466',
    aisle: 'Aisle 5 · Cleaners Bay',
    image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=500&auto=format&fit=crop&q=80',
    inStock: true,
    stockQty: 28,
    buyCount: 175,
  },
  {
    name: 'Dettol Original Handwash',
    size: '200 ml pump',
    price: 99,
    category: 'Household',
    color: 'bg-emerald-100',
    rating: 4.8,
    barcode: '8901058812411',
    aisle: 'Aisle 5 · Personal Care Bay',
    image: 'https://images.unsplash.com/photo-1607602132700-068258431c6c?w=500&auto=format&fit=crop&q=80',
    inStock: true,
    stockQty: 32,
    buyCount: 230,
  },
];

// "People who bought X also bought Y" recommendation mapping
export const recommendationMap: Record<string, string[]> = {
  'Aashirvaad Atta': ['Fortune Sunflower Oil', 'Tata Sampann Toor Dal', 'India Gate Basmati Rice', 'Nashik Red Onions'],
  'India Gate Basmati Rice': ['Tata Sampann Toor Dal', 'Aashirvaad Atta', 'Hybrid Tomatoes', 'Fortune Sunflower Oil'],
  'Amul Taaza Milk': ['Harvest Gold Bread', 'Amul Salted Butter', 'Farm Fresh Eggs', 'Bingo! Mad Angles'],
  'Amul Salted Butter': ['Harvest Gold Bread', 'Amul Taaza Milk', 'Farm Fresh Eggs', 'Tata Salt Vacuum Evaporated'],
  'Fresh Paneer': ['Hybrid Tomatoes', 'Nashik Red Onions', 'Fresh Coriander', 'Amul Pure Cow Ghee'],
  'Organic Bananas': ['Shimla Royal Apples', 'Amul Taaza Milk', 'Farm Fresh Eggs'],
  'Maggi 2-Minute Noodles': ["Lay's Classic Salted", 'Bingo! Mad Angles', 'Cadbury Dairy Milk Silk', 'Amul Taaza Milk'],
  'Cadbury Dairy Milk Silk': ['Dark Fantasy Choco Fills', "Lay's Classic Salted", 'Haldiram\'s Aloo Bhujia', 'Amul Taaza Milk'],
  "Lay's Classic Salted": ['Bingo! Mad Angles', 'Dark Fantasy Choco Fills', 'Cadbury Dairy Milk Silk', 'Maggi 2-Minute Noodles'],
  'Bingo! Mad Angles': ["Lay's Classic Salted", 'Dark Fantasy Choco Fills', 'Maggi 2-Minute Noodles', 'Brooke Bond Red Label Tea'],
  'Harvest Gold Bread': ['Amul Salted Butter', 'Amul Taaza Milk', 'Farm Fresh Eggs', 'Britannia Cheese Slices'],
  'Farm Fresh Eggs': ['Harvest Gold Bread', 'Amul Taaza Milk', 'Amul Salted Butter', 'Fresh Paneer'],
};

export function getRecommendations(productName: string): CustomerProduct[] {
  const recNames = recommendationMap[productName] ?? [];
  return recNames
    .map((n) => customerProducts.find((p) => p.name === n))
    .filter(Boolean) as CustomerProduct[];
}

export function getBestSellers(): CustomerProduct[] {
  return customerProducts
    .filter((p) => p.bestSeller && p.inStock !== false)
    .sort((a, b) => (b.buyCount ?? 0) - (a.buyCount ?? 0));
}

export function getOutOfStockProducts(): CustomerProduct[] {
  return customerProducts.filter((p) => p.inStock === false);
}

export type StoreLocation = {
  name: string;
  address: string;
  exitGate: string;
  hours: string;
  distance: string;
  lat: number;
  lng: number;
  hasRegularItems?: boolean;
  stockAvailability?: number; // percentage
};

export const storesList: StoreLocation[] = [
  { name: 'GreenBasket Express · Indiranagar', address: '4th Main Rd, Indiranagar, Bengaluru', exitGate: 'Turnstile Exit #2', hours: 'Open until 11 PM', distance: 'In-Store', lat: 12.9784, lng: 77.6408, hasRegularItems: true, stockAvailability: 94 },
  { name: 'GreenBasket Superstore · Koramangala', address: '80 Feet Rd, 4th Block, Koramangala', exitGate: 'Turnstile Exit #1', hours: 'Open until 11 PM', distance: '3.4 km', lat: 12.9352, lng: 77.6245, hasRegularItems: true, stockAvailability: 87 },
  { name: 'GreenBasket Hypermarket · Whitefield', address: 'ITPL Main Rd, Whitefield', exitGate: 'Express Turnstile #3', hours: 'Open until 11 PM', distance: '8.2 km', lat: 12.9698, lng: 77.7500, hasRegularItems: false, stockAvailability: 91 },
  { name: 'GreenBasket Express · Jayanagar', address: '11th Main, 4th Block, Jayanagar', exitGate: 'Turnstile Exit #1', hours: 'Open until 10:30 PM', distance: '5.1 km', lat: 12.9250, lng: 77.5938, hasRegularItems: true, stockAvailability: 82 },
  { name: 'GreenBasket Superstore · Malleshwaram', address: 'Sampige Rd, Malleshwaram', exitGate: 'Express Gate #2', hours: 'Open until 10:30 PM', distance: '7.8 km', lat: 12.9965, lng: 77.5695, hasRegularItems: false, stockAvailability: 89 },
];

export const paymentMethods = [
  { id: 'razorpay', name: 'Razorpay Instant UPI & Cards', subtitle: 'GPay, PhonePe, Paytm, RuPay · Instant Exit Pass', badge: 'FASTEST EXIT' },
  { id: 'upi', name: 'Direct UPI App', subtitle: 'Google Pay, PhonePe, BHIM', badge: null },
  { id: 'card', name: 'Credit / Debit Card', subtitle: 'Visa, Mastercard, RuPay', badge: null },
  { id: 'wallet', name: 'GreenBasket Loyalty Wallet', subtitle: 'Balance: 2,480 pts (₹248 val)', badge: null },
  { id: 'cash_desk', name: 'Pay at Express Security Gate', subtitle: 'Pay cash directly at exit turnstile desk', badge: null },
];

export const shopCategories = ['All', 'Dairy', 'Produce', 'Staples', 'Snacks', 'Beverages', 'Household'];

export const storeInfo = {
  name: 'GreenBasket Express · Indiranagar',
  distance: 'In-Store (Aisle 2 Beacon)',
  hours: 'Open until 11 PM',
  address: '4th Main Rd, Indiranagar, Bengaluru 560038',
  deliveryTime: '0 Min Wait (Skip the Line)',
  exitGate: 'Express Turnstile Gate 2',
};

export const deliverySlots = ['Instant Exit Pass', 'Valid for 30 mins'];

export const pastOrders = [
  {
    id: '#GB-PASS-2481',
    date: '12 May',
    items: 4,
    total: 742,
    status: 'Exit Cleared',
    slot: 'Scanned & paid at Turnstile 2',
    itemsList: [
      { name: 'Aashirvaad Atta', qty: 1, price: 310, size: '5 kg' },
      { name: 'India Gate Basmati Rice', qty: 2, price: 125, size: '1 kg' },
      { name: 'Harvest Gold Bread', qty: 2, price: 45, size: '400 g' },
      { name: 'Amul Taaza Milk', qty: 2, price: 28, size: '500 ml' },
    ],
  },
  {
    id: '#GB-PASS-2398',
    date: '8 May',
    items: 3,
    total: 486,
    status: 'Exit Cleared',
    slot: 'Scanned & paid at Turnstile 1',
    itemsList: [
      { name: 'Fresh Paneer', qty: 2, price: 95, size: '200 g' },
      { name: 'Shimla Royal Apples', qty: 1, price: 140, size: '4 pcs' },
      { name: 'Fortune Sunflower Oil', qty: 1, price: 145, size: '1 L' },
    ],
  },
  {
    id: '#GB-PASS-2311',
    date: '2 May',
    items: 6,
    total: 1290,
    status: 'Exit Cleared',
    slot: 'Self-Billing Express',
    itemsList: [
      { name: 'Aashirvaad Atta', qty: 2, price: 310, size: '5 kg' },
      { name: 'India Gate Basmati Rice', qty: 3, price: 125, size: '1 kg' },
      { name: 'Amul Salted Butter', qty: 3, price: 58, size: '100 g' },
    ],
  },
];

// Product suggestion tickets
export type ProductSuggestion = {
  id: string;
  productName: string;
  description: string;
  category: string;
  userName: string;
  storeName: string;
  timestamp: string;
  status: 'Pending' | 'Under Review' | 'Approved' | 'Declined';
};

export const productSuggestions: ProductSuggestion[] = [
  { id: 'SUG-001', productName: 'Organic Jaggery', description: 'Please bring organic jaggery powder, 500g packs', category: 'Staples', userName: 'Arjun Mehta', storeName: 'GreenBasket Express · Indiranagar', timestamp: '2 days ago', status: 'Under Review' },
  { id: 'SUG-002', productName: 'Oat Milk', description: 'Oatly or similar oat milk brand for lactose intolerant', category: 'Dairy', userName: 'Arjun Mehta', storeName: 'GreenBasket Express · Indiranagar', timestamp: '5 days ago', status: 'Approved' },
];

// Restock notification watchlist
export type RestockWatch = {
  productName: string;
  barcode: string;
  category: string;
  subscribedAt: string;
  notified: boolean;
};

const DESCRIPTIONS: Record<string, string> = {
  Dairy: 'Farm-fresh dairy, kept cold-chained at <4°C from our warehouse to your doorstep. Best consumed within the printed date.',
  Produce: 'Farm-fresh, hand-picked daily from local organic farms. Washed and hygienically packed with zero chemical wax.',
  Staples: 'Premium-grade pantry essentials, triple-checked for purity and packed in multi-layer moisture-resistant bags.',
  Bakery: 'Baked fresh every morning before sunrise at our artisanal kitchen — strictly no artificial preservatives.',
  Snacks: 'Crunchy favourites and tea-time savouries, packed with nitrogen flush to preserve crispiness.',
  Frozen: 'Stored at -18°C sub-zero freezer cold-chain. Ready-to-cook delicacies and quick bites.',
};

export const productDescription = (category: string) =>
  DESCRIPTIONS[category] ?? 'Quality-checked at the store and packed fresh for your order.';
