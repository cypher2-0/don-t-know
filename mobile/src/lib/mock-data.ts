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
  aisle?: string;
};

export const customerProducts: CustomerProduct[] = [
  // Dairy (Aisle 1)
  { name: 'Amul Taaza Milk', size: '500 ml', price: 28, category: 'Dairy', color: 'bg-emerald-100', rating: 4.8, barcode: '8901262010053', aisle: 'Aisle 1 · Chiller 2' },
  { name: 'Fresh Paneer', size: '200 g', price: 95, category: 'Dairy', color: 'bg-slate-100', rating: 4.7, barcode: '8901262020106', aisle: 'Aisle 1 · Chiller 3' },
  { name: 'Amul Salted Butter', size: '100 g', price: 58, category: 'Dairy', color: 'bg-yellow-100', rating: 4.9, barcode: '8901262030013', aisle: 'Aisle 1 · Chiller 1' },
  { name: 'Farm Fresh Eggs', size: '12-pack', price: 90, category: 'Dairy', color: 'bg-amber-100', rating: 4.8, barcode: '8901262040019', aisle: 'Aisle 1 · Rack A' },
  { name: 'Amul Masti Dahi', size: '400 g cup', price: 35, category: 'Dairy', color: 'bg-cyan-100', rating: 4.7, barcode: '8901262050018', aisle: 'Aisle 1 · Chiller 4' },
  { name: 'Greek Yogurt Blueberry', size: '100 g', price: 55, category: 'Dairy', color: 'bg-indigo-100', rating: 4.6, barcode: '8901262060017', aisle: 'Aisle 1 · Chiller 4' },
  { name: 'Britannia Cheese Slices', size: '200 g (10 pcs)', price: 130, category: 'Dairy', color: 'bg-yellow-200', rating: 4.8, discount: '10% OFF', barcode: '8901063141121', aisle: 'Aisle 1 · Chiller 2' },

  // Produce (Aisle 2)
  { name: 'Organic Bananas', size: '500 g (3-4 pcs)', price: 42, category: 'Produce', color: 'bg-lime-100', rating: 4.6, discount: '15% OFF', barcode: '8901000100012', aisle: 'Aisle 2 · Fresh Bay 1' },
  { name: 'Shimla Royal Apples', size: '4 pcs (~600 g)', price: 140, category: 'Produce', color: 'bg-rose-100', rating: 4.9, barcode: '8901000100029', aisle: 'Aisle 2 · Fruit Crate 3' },
  { name: 'Hybrid Tomatoes', size: '1 kg', price: 34, category: 'Produce', color: 'bg-red-100', rating: 4.5, barcode: '8901000100036', aisle: 'Aisle 2 · Veg Bin 2' },
  { name: 'Nashik Red Onions', size: '1 kg net', price: 38, category: 'Produce', color: 'bg-purple-100', rating: 4.7, barcode: '8901000100074', aisle: 'Aisle 2 · Veg Bin 1' },
  { name: 'Fresh Coriander', size: '1 bunch (100 g)', price: 15, category: 'Produce', color: 'bg-emerald-100', rating: 4.6, barcode: '8901000100043', aisle: 'Aisle 2 · Herbs Shelf' },
  { name: 'Spinach Bunch (Palak)', size: '250 g bunch', price: 25, category: 'Produce', color: 'bg-green-200', rating: 4.5, barcode: '8901000100050', aisle: 'Aisle 2 · Leafy Rack' },
  { name: 'Iceberg Lettuce', size: '1 pc (~350 g)', price: 45, category: 'Produce', color: 'bg-teal-100', rating: 4.6, barcode: '8901000100067', aisle: 'Aisle 2 · Fresh Bay 2' },

  // Staples (Aisle 3)
  { name: 'Aashirvaad Atta', size: '5 kg bag', price: 310, category: 'Staples', color: 'bg-amber-100', rating: 4.8, barcode: '8901725181222', aisle: 'Aisle 3 · Shelf 1' },
  { name: 'India Gate Basmati Rice', size: '1 kg pouch', price: 125, category: 'Staples', color: 'bg-amber-50', rating: 4.7, barcode: '8901140001019', aisle: 'Aisle 3 · Shelf 2' },
  { name: 'Fortune Sunflower Oil', size: '1 L pouch', price: 145, category: 'Staples', color: 'bg-yellow-50', rating: 4.6, barcode: '8906007280014', aisle: 'Aisle 3 · Shelf 3' },
  { name: 'Tata Sampann Toor Dal', size: '1 kg unpolished', price: 165, category: 'Staples', color: 'bg-orange-100', rating: 4.7, barcode: '8901140001026', aisle: 'Aisle 3 · Pulses Bay' },
  { name: 'Maggi 2-Minute Noodles', size: '4-pack (280 g)', price: 56, category: 'Staples', color: 'bg-yellow-100', rating: 4.9, barcode: '8901058852315', aisle: 'Aisle 3 · Instant Foods' },

  // Bakery (Aisle 4)
  { name: 'Harvest Gold Bread', size: '400 g loaf', price: 45, category: 'Bakery', color: 'bg-orange-100', rating: 4.7, barcode: '8906014430013', aisle: 'Aisle 4 · Bread Stand' },
  { name: 'The Baker\'s Dozen Sourdough', size: '250 g', price: 110, category: 'Bakery', color: 'bg-orange-50', rating: 4.8, barcode: '8908011223344', aisle: 'Aisle 4 · Artisanal' },
  { name: 'Butter Croissant', size: '2 pcs (120 g)', price: 95, category: 'Bakery', color: 'bg-amber-100', rating: 4.8, barcode: '8906014430020', aisle: 'Aisle 4 · Pastry Case' },
  { name: 'Multigrain Brown Bread', size: '400 g', price: 55, category: 'Bakery', color: 'bg-stone-100', rating: 4.6, barcode: '8906014430037', aisle: 'Aisle 4 · Bread Stand' },
  { name: 'Modern Milk Buns', size: '4 pcs (200 g)', price: 30, category: 'Bakery', color: 'bg-orange-50', rating: 4.5, barcode: '8906014430044', aisle: 'Aisle 4 · Buns Bay' },

  // Snacks & Beverages (Aisle 5)
  { name: "Lay's Classic Salted", size: '50 g', price: 20, category: 'Snacks', color: 'bg-yellow-200', rating: 4.5, barcode: '8901491101837', aisle: 'Aisle 5 · Chips Bay' },
  { name: 'Haldiram\'s Aloo Bhujia', size: '200 g', price: 55, category: 'Snacks', color: 'bg-amber-200', rating: 4.8, barcode: '8904004400123', aisle: 'Aisle 5 · Namkeen Rack' },
  { name: 'Dark Fantasy Choco Fills', size: '75 g', price: 40, category: 'Snacks', color: 'bg-stone-200', rating: 4.9, discount: '10% OFF', barcode: '8901725132019', aisle: 'Aisle 5 · Biscuits Shelf' },
  { name: 'Kurkure Masala Munch', size: '85 g', price: 20, category: 'Snacks', color: 'bg-orange-200', rating: 4.7, barcode: '8901491101844', aisle: 'Aisle 5 · Chips Bay' },
  { name: 'Cadbury Dairy Milk Silk', size: '60 g bar', price: 85, category: 'Snacks', color: 'bg-purple-100', rating: 4.9, barcode: '8901233024881', aisle: 'Aisle 5 · Chocolates' },

  // Frozen (Aisle 6)
  { name: 'Yummiez Veg Crispy Nuggets', size: '350 g pack', price: 120, category: 'Frozen', color: 'bg-blue-100', rating: 4.7, discount: '20% OFF', barcode: '8902088011223', aisle: 'Aisle 6 · Deep Freezer 1' },
  { name: 'McCain French Fries', size: '420 g pack', price: 110, category: 'Frozen', color: 'bg-cyan-100', rating: 4.6, barcode: '8902088011230', aisle: 'Aisle 6 · Deep Freezer 2' },
];

export const storesList = [
  { name: 'GreenBasket Express · Indiranagar', address: '4th Main Rd, Indiranagar, Bengaluru', exitGate: 'Turnstile Exit #2', hours: 'Open until 11 PM', distance: 'In-Store (Aisle 2 Beacon)' },
  { name: 'GreenBasket Superstore · Koramangala', address: '80 Feet Rd, 4th Block, Koramangala', exitGate: 'Turnstile Exit #1', hours: 'Open until 11 PM', distance: '3.4 km away' },
  { name: 'GreenBasket Hypermarket · Whitefield', address: 'ITPL Main Rd, Whitefield', exitGate: 'Express Turnstile #3', hours: 'Open until 11 PM', distance: '8.2 km away' },
  { name: 'GreenBasket Express · Jayanagar', address: '11th Main, 4th Block, Jayanagar', exitGate: 'Turnstile Exit #1', hours: 'Open until 10:30 PM', distance: '5.1 km away' },
  { name: 'GreenBasket Superstore · Malleshwaram', address: 'Sampige Rd, Malleshwaram', exitGate: 'Express Gate #2', hours: 'Open until 10:30 PM', distance: '7.8 km away' },
];

export const paymentMethods = [
  { id: 'razorpay', name: 'Razorpay Instant UPI & Cards', subtitle: 'GPay, PhonePe, Paytm, RuPay · Instant Exit Pass', badge: 'FASTEST EXIT' },
  { id: 'upi', name: 'Direct UPI App', subtitle: 'Google Pay, PhonePe, BHIM', badge: null },
  { id: 'card', name: 'Credit / Debit Card', subtitle: 'Visa, Mastercard, RuPay', badge: null },
  { id: 'wallet', name: 'GreenBasket Loyalty Wallet', subtitle: 'Balance: ₹2,480 pts (₹248 val)', badge: null },
  { id: 'cash_desk', name: 'Pay at Express Security Gate', subtitle: 'Pay cash directly at exit turnstile desk', badge: null },
];

export const shopCategories = ['All', 'Dairy', 'Produce', 'Staples', 'Bakery', 'Snacks', 'Frozen'];

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
