import { customerProducts, type CustomerProduct } from './mock-data';

export type AIMessage = {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedProducts?: { product: CustomerProduct; qty: number; reason: string }[];
  recipeMeta?: {
    title: string;
    prepTime: string;
    servings: string;
    calories: string;
    steps: string[];
  };
  totalBundlePrice?: number;
  chips?: string[];
};

export const AI_PROMPT_CHIPS = [
  '🍲 Paneer & Tomato Dinner for 2',
  '🥗 High-Protein Breakfast (~₹200)',
  '💰 Weekly Staples Basket under ₹600',
  '⏱️ Quick 10-Min Evening Snack',
  '🥛 Dairy Freshness & Storage Tips',
];

export function getAIResponse(prompt: string): AIMessage {
  const p = prompt.toLowerCase();

  // 1. RECIPE: Paneer / Dinner
  if (p.includes('paneer') || p.includes('dinner') || p.includes('lunch') || p.includes('recipe')) {
    const paneer = customerProducts.find((i) => i.name === 'Fresh Paneer')!;
    const tomato = customerProducts.find((i) => i.name === 'Hybrid Tomatoes')!;
    const butter = customerProducts.find((i) => i.name === 'Amul Salted Butter')!;
    const atta = customerProducts.find((i) => i.name === 'Aashirvaad Atta')!;

    const bundle = [
      { product: paneer, qty: 1, reason: 'Fresh malai paneer (200g)' },
      { product: tomato, qty: 1, reason: 'Juicy gravy base (1kg)' },
      { product: butter, qty: 1, reason: 'Rich tempering & taste (100g)' },
    ];
    const totalPrice = bundle.reduce((s, b) => s + b.product.price * b.qty, 0);

    return {
      id: Math.random().toString(36).substring(7),
      sender: 'assistant',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: `Here's a delicious, chef-crafted **Paneer Makhani & Roti** meal plan! All ingredients are in stock at GreenBasket Indiranagar and ready for instant delivery in 18 mins.`,
      recipeMeta: {
        title: 'Quick Restaurant-Style Paneer Makhani',
        prepTime: '20 mins',
        servings: '2 - 3 people',
        calories: '~420 kcal/serving',
        steps: [
          'Purée ripe tomatoes with ginger & garlic.',
          'Melt Amul Butter in a pan, add aromatic spices and tomato gravy.',
          'Simmer for 8 mins until oil separates, then stir in fresh paneer cubes.',
          'Garnish with fresh cream and serve hot with rotis or basmati rice.',
        ],
      },
      suggestedProducts: bundle,
      totalBundlePrice: totalPrice,
      chips: ['Add fresh coriander?', 'Show Basmati rice option', 'High-protein diet ideas'],
    };
  }

  // 2. HIGH PROTEIN / HEALTHY
  if (p.includes('protein') || p.includes('gym') || p.includes('diet') || p.includes('healthy') || p.includes('breakfast')) {
    const paneer = customerProducts.find((i) => i.name === 'Fresh Paneer')!;
    const bananas = customerProducts.find((i) => i.name === 'Organic Bananas')!;
    const milk = customerProducts.find((i) => i.name === 'Amul Taaza Milk')!;

    const bundle = [
      { product: paneer, qty: 1, reason: '18g pure protein per 100g' },
      { product: milk, qty: 1, reason: 'Calcium & slow-digesting casein' },
      { product: bananas, qty: 1, reason: 'Pre-workout potassium & energy' },
    ];
    const totalPrice = bundle.reduce((s, b) => s + b.product.price * b.qty, 0);

    return {
      id: Math.random().toString(36).substring(7),
      sender: 'assistant',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: `Based on your nutritional goals, I assembled a **High-Protein Vegetarian Power Basket** delivering ~46g total protein under ₹170.`,
      recipeMeta: {
        title: 'Banana Protein Smoothie + Grilled Paneer',
        prepTime: '8 mins',
        servings: '1 person',
        calories: '380 kcal · 42g protein',
        steps: [
          'Blend chilled Amul Milk with 2 Organic Bananas.',
          'Lightly pan-sear 100g Fresh Paneer cubes with a pinch of black pepper and rock salt.',
          'Enjoy as a post-workout breakfast fuel.',
        ],
      },
      suggestedProducts: bundle,
      totalBundlePrice: totalPrice,
      chips: ['What about snacks?', 'Budget under ₹500', 'Check dairy shelf life'],
    };
  }

  // 3. BUDGET BASKET / UNDER ₹500 or ₹600
  if (p.includes('budget') || p.includes('under') || p.includes('weekly') || p.includes('staple')) {
    const atta = customerProducts.find((i) => i.name === 'Aashirvaad Atta')!;
    const rice = customerProducts.find((i) => i.name === 'India Gate Basmati Rice')!;
    const oil = customerProducts.find((i) => i.name === 'Fortune Sunflower Oil')!;

    const bundle = [
      { product: atta, qty: 1, reason: 'Core wholewheat grain (5kg)' },
      { product: rice, qty: 1, reason: 'Long-grain aged basmati (1kg)' },
      { product: oil, qty: 1, reason: 'Fortified cooking medium (1L)' },
    ];
    const totalPrice = bundle.reduce((s, b) => s + b.product.price * b.qty, 0);

    return {
      id: Math.random().toString(36).substring(7),
      sender: 'assistant',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: `Optimized your **Weekly Essentials Basket**! You get essential grains and cooking oil for **₹${totalPrice}**, staying well within your target budget with zero compromise on quality.`,
      suggestedProducts: bundle,
      totalBundlePrice: totalPrice,
      chips: ['Add salt & spices', 'Include fresh vegetables', 'Apply GB120 coupon'],
    };
  }

  // 4. SNACK / QUICK BITES
  if (p.includes('snack') || p.includes('tea') || p.includes('chips') || p.includes('biscuit') || p.includes('quick')) {
    const chips = customerProducts.find((i) => i.name === "Lay's Classic Salted")!;
    const bhujia = customerProducts.find((i) => i.name === "Haldiram's Aloo Bhujia")!;
    const choco = customerProducts.find((i) => i.name === 'Dark Fantasy Choco Fills')!;

    const bundle = [
      { product: chips, qty: 1, reason: 'Crispy classic salted treat' },
      { product: bhujia, qty: 1, reason: 'Spicy tea-time favorite' },
      { product: choco, qty: 1, reason: 'Molten chocolate indulgence' },
    ];
    const totalPrice = bundle.reduce((s, b) => s + b.product.price * b.qty, 0);

    return {
      id: Math.random().toString(36).substring(7),
      sender: 'assistant',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: `Here's the top-rated **Tea-Time Snack Trio**! Fast-moving shelf favorites paired together with current in-store discounts.`,
      suggestedProducts: bundle,
      totalBundlePrice: totalPrice,
      chips: ['Add cold drinks', 'Healthy baked options', 'Paneer recipes'],
    };
  }

  // 5. FRESHNESS / EXPIRY ADVICE
  if (p.includes('fresh') || p.includes('expiry') || p.includes('spoil') || p.includes('storage') || p.includes('store')) {
    const milk = customerProducts.find((i) => i.name === 'Amul Taaza Milk')!;
    const bread = customerProducts.find((i) => i.name === 'Harvest Gold Bread')!;

    return {
      id: Math.random().toString(36).substring(7),
      sender: 'assistant',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: `💡 **grocerAI Freshness Insights & Smart Storage**:\n\n• **Milk & Dairy**: Store between 2°C–4°C in the main fridge body (not the door). Best within 48h of breaking the seal.\n• **Bread & Bakery**: Store in a cool dry breadbox or freeze slices. Avoid plastic moisture buildup.\n• **Tomatoes**: Keep at room temp until ripe to preserve flavour enzymes; chill only once soft.`,
      suggestedProducts: [
        { product: milk, qty: 1, reason: 'Pasteurized UHT fresh batch' },
        { product: bread, qty: 1, reason: 'Baked fresh this morning' },
      ],
      totalBundlePrice: milk.price + bread.price,
      chips: ['How to store paneer?', 'View weekly discount items', 'Suggest a dinner recipe'],
    };
  }

  // DEFAULT SMART SEARCH
  const matched = customerProducts.filter(
    (item) =>
      item.name.toLowerCase().includes(p) ||
      item.category.toLowerCase().includes(p) ||
      item.size.toLowerCase().includes(p),
  );

  const bundle = (matched.length > 0 ? matched.slice(0, 3) : customerProducts.slice(0, 3)).map(
    (prod) => ({
      product: prod,
      qty: 1,
      reason: `${prod.category} · In stock with instant delivery`,
    }),
  );

  const totalPrice = bundle.reduce((s, b) => s + b.product.price * b.qty, 0);

  return {
    id: Math.random().toString(36).substring(7),
    sender: 'assistant',
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    text: `I searched our live catalog for **"${prompt}"** and matched these fresh options from GreenBasket Indiranagar:`,
    suggestedProducts: bundle,
    totalBundlePrice: totalPrice,
    chips: ['Show recipe ideas', 'Cheapest options', 'High-protein diet'],
  };
}
