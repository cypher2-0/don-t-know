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
};

export const customerProducts: CustomerProduct[] = [
  { name: 'Amul Taaza Milk', size: '500 ml', price: 28, category: 'Dairy', color: 'bg-emerald-100', rating: 4.8, barcode: '8901262010053' },
  { name: 'Fresh Paneer', size: '200 g', price: 95, category: 'Dairy', color: 'bg-slate-100', rating: 4.7, barcode: '8901262020106' },
  { name: 'Amul Salted Butter', size: '100 g', price: 58, category: 'Dairy', color: 'bg-yellow-100', rating: 4.9, barcode: '8901262030013' },
  { name: 'Organic Bananas', size: '500 g (3-4 pcs)', price: 42, category: 'Produce', color: 'bg-lime-100', rating: 4.6, discount: '15% OFF', barcode: '8901000100012' },
  { name: 'Shimla Royal Apples', size: '4 pcs (~600 g)', price: 140, category: 'Produce', color: 'bg-rose-100', rating: 4.9, barcode: '8901000100029' },
  { name: 'Hybrid Tomatoes', size: '1 kg', price: 34, category: 'Produce', color: 'bg-red-100', rating: 4.5, barcode: '8901000100036' },
  { name: 'Aashirvaad Atta', size: '5 kg', price: 310, category: 'Staples', color: 'bg-amber-100', rating: 4.8, barcode: '8901725181222' },
  { name: 'India Gate Basmati Rice', size: '1 kg', price: 125, category: 'Staples', color: 'bg-amber-50', rating: 4.7, barcode: '8901140001019' },
  { name: 'Fortune Sunflower Oil', size: '1 L pouch', price: 145, category: 'Staples', color: 'bg-yellow-50', rating: 4.6, barcode: '8906007280014' },
  { name: 'Harvest Gold Bread', size: '400 g', price: 45, category: 'Bakery', color: 'bg-orange-100', rating: 4.7, barcode: '8906014430013' },
  { name: 'The Baker\'s Dozen Sourdough', size: '250 g', price: 110, category: 'Bakery', color: 'bg-orange-50', rating: 4.8, barcode: '8908011223344' },
  { name: "Lay's Classic Salted", size: '50 g', price: 20, category: 'Snacks', color: 'bg-yellow-200', rating: 4.5, barcode: '8901491101837' },
  { name: 'Haldiram\'s Aloo Bhujia', size: '200 g', price: 55, category: 'Snacks', color: 'bg-amber-200', rating: 4.8, barcode: '8904004400123' },
  { name: 'Dark Fantasy Choco Fills', size: '75 g', price: 40, category: 'Snacks', color: 'bg-stone-200', rating: 4.9, discount: '10% OFF', barcode: '8901725132019' },
];

export const paymentMethods = [
  { id: 'upi', name: 'UPI (GPay / PhonePe / Paytm)', subtitle: 'Fastest · Instant refund', badge: 'RECOMMENDED' },
  { id: 'cod', name: 'Cash on Delivery', subtitle: 'Pay via cash or UPI at delivery', badge: null },
  { id: 'card', name: 'Credit / Debit Card', subtitle: 'Visa, Mastercard, RuPay', badge: null },
  { id: 'wallet', name: 'GreenBasket Wallet', subtitle: 'Balance: ₹2,480 pts (₹248 val)', badge: null },
];

export const shopCategories = ['All', 'Dairy', 'Produce', 'Staples', 'Bakery', 'Snacks'];

export const storeInfo = {
  name: 'GreenBasket · Indiranagar',
  distance: '1.2 km away',
  hours: 'Open until 10 PM',
  address: '4th Main Rd, Indiranagar, Bengaluru 560038',
  deliveryTime: '15-20 mins',
};

export const deliverySlots = ['In 20 mins', '6 – 8 PM', '8 – 10 PM', 'Tomorrow morning (7 – 9 AM)'];

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
];

const DESCRIPTIONS: Record<string, string> = {
  Dairy: 'Farm-fresh dairy, kept cold-chained at <4°C from our warehouse to your doorstep. Best consumed within the printed date.',
  Produce: 'Farm-fresh, hand-picked daily from local organic farms. Washed and hygienically packed with zero chemical wax.',
  Staples: 'Premium-grade pantry essentials, triple-checked for purity and packed in multi-layer moisture-resistant bags.',
  Bakery: 'Baked fresh every morning before sunrise at our artisanal kitchen — strictly no artificial preservatives.',
  Snacks: 'Crunchy favourites and tea-time savouries, packed with nitrogen flush to preserve crispiness.',
};

export const productDescription = (category: string) =>
  DESCRIPTIONS[category] ?? 'Quality-checked at the store and packed fresh for your order.';
