'use client'

import { useState, useEffect } from 'react'
import {
  ArrowUpDown,
  Award,
  Barcode,
  Bell,
  Bot,
  Camera,
  Check,
  ChefHat,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Clock,
  Clock3,
  CreditCard,
  FileText,
  Flame,
  Grid2X2,
  HelpCircle,
  MapPin,
  Minus,
  Package,
  PackageCheck,
  Plus,
  RotateCcw,
  Search,
  Send,
  Settings,
  ShieldCheck,
  ShoppingBag,
  ShoppingBasket,
  ShoppingCart,
  Sparkles,
  Star,
  Tag,
  Trash2,
  Trophy,
  Truck,
  Users,
  User,
  X,
  Zap,
  Milk,
  Apple,
  Wheat,
  Croissant,
  Cookie,
} from 'lucide-react'

import {
  customerProducts,
  deliverySlots,
  pastOrders,
  productDescription,
  shopCategories,
  storeInfo,
} from '@/lib/mock-data'
import RazorpayCheckoutModal from '@/components/razorpay-checkout'

type Product = (typeof customerProducts)[0]

type CartItem = {
  product: Product
  qty: number
}

type PlacedOrderItem = {
  name: string
  qty: number
  price: number
  size: string
}

type OrderRecord = {
  id: string
  date: string
  items: number
  total: number
  status: string
  slot?: string
  itemsList?: PlacedOrderItem[]
}

const DELIVERY_FEE = 0
const FREE_DELIVERY_OVER = 0

export default function CustomerApp({ onBack }: { onBack: () => void }) {
  const [showSplash, setShowSplash] = useState(true)

  // Auto-hide splash screen after 800ms for faster load
  useEffect(() => {
    if (showSplash) {
      const timer = setTimeout(() => setShowSplash(false), 800)
      return () => clearTimeout(timer)
    }
  }, [showSplash])

  // Navigation & tabs
  const [tab, setTab] = useState<'Home' | 'Explore' | 'Scan' | 'Orders' | 'Profile'>('Home')
  const [activeModal, setActiveModal] = useState<'none' | 'product' | 'cart' | 'order-placed' | 'ai'>('none')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [latestOrderId, setLatestOrderId] = useState<string>('')
  const [showRazorpay, setShowRazorpay] = useState(false)
  const [paidPaymentId, setPaidPaymentId] = useState<string | null>(null)
  const [paymentMode, setPaymentMode] = useState<'razorpay' | 'cod'>('razorpay')

  // AI Copilot state
  const [aiInput, setAiInput] = useState('')
  const [aiMessages, setAiMessages] = useState<
    Array<{
      id: string
      sender: 'user' | 'assistant'
      text: string
      recipe?: { title: string; prep: string; servings: string; calories: string; steps: string[] }
      bundle?: Array<{ product: Product; qty: number; reason: string }>
      chips?: string[]
    }>
  >([
    {
      id: '1',
      sender: 'assistant',
      text: "Hi Arjun! I'm your grocerAI Shopping Copilot 🤖. Ask me for recipes, diet meal plans, or budget shopping baskets, and I'll assemble your cart with 1 click!",
      chips: [
        '🍲 Paneer & Tomato Dinner for 2',
        '🥗 High-Protein Breakfast (~₹200)',
        '💰 Weekly Staples Basket under ₹600',
        '🥛 Dairy Freshness & Storage Tips',
      ],
    },
  ])

  const sendAiQuery = (prompt: string) => {
    const p = prompt.trim()
    if (!p) return
    const userMsg = {
      id: Math.random().toString(),
      sender: 'user' as const,
      text: p,
    }
    setAiMessages((prev) => [...prev, userMsg])
    setAiInput('')

    setTimeout(() => {
      const q = p.toLowerCase()
      let reply: (typeof aiMessages)[0]

      if (q.includes('paneer') || q.includes('dinner') || q.includes('recipe')) {
        const paneer = customerProducts.find((i) => i.name === 'Fresh Paneer')!
        const tomato = customerProducts.find((i) => i.name === 'Hybrid Tomatoes')!
        const butter = customerProducts.find((i) => i.name === 'Amul Salted Butter')!
        reply = {
          id: Math.random().toString(),
          sender: 'assistant',
          text: "Here is your chef-curated **Paneer Makhani** recipe! All 3 fresh ingredients are in stock at GreenBasket Indiranagar for 18-minute delivery.",
          recipe: {
            title: 'Quick Restaurant-Style Paneer Makhani',
            prep: '20 mins',
            servings: '2 - 3 people',
            calories: '~420 kcal/serving',
            steps: [
              'Purée fresh tomatoes with ginger & mild spices.',
              'Melt Amul Butter in pan, sauté tomato gravy until fragrant.',
              'Simmer gently and toss in fresh malai paneer cubes.',
              'Garnish and serve hot with rotis or basmati rice.',
            ],
          },
          bundle: [
            { product: paneer, qty: 1, reason: 'Fresh malai paneer (200g)' },
            { product: tomato, qty: 1, reason: 'Ripe tomatoes for gravy (1kg)' },
            { product: butter, qty: 1, reason: 'Rich tempering & taste (100g)' },
          ],
          chips: ['High-protein diet ideas', 'Budget under ₹500', 'Check dairy shelf life'],
        }
      } else if (q.includes('protein') || q.includes('diet') || q.includes('breakfast')) {
        const paneer = customerProducts.find((i) => i.name === 'Fresh Paneer')!
        const bananas = customerProducts.find((i) => i.name === 'Organic Bananas')!
        const milk = customerProducts.find((i) => i.name === 'Amul Taaza Milk')!
        reply = {
          id: Math.random().toString(),
          sender: 'assistant',
          text: "Assembled a **High-Protein Vegetarian Breakfast Basket** delivering 46g pure protein under ₹170:",
          recipe: {
            title: 'Banana Protein Shake + Pan-Seared Paneer',
            prep: '8 mins',
            servings: '1 person',
            calories: '380 kcal · 42g protein',
            steps: [
              'Blend chilled milk with 2 ripe bananas.',
              'Pan-sear 100g paneer with black pepper and salt.',
              'Enjoy as optimal morning workout fuel.',
            ],
          },
          bundle: [
            { product: paneer, qty: 1, reason: '18g pure protein per 100g' },
            { product: milk, qty: 1, reason: 'Calcium & casein protein' },
            { product: bananas, qty: 1, reason: 'Potassium & natural energy' },
          ],
          chips: ['Weekly staples basket', 'Quick evening snack'],
        }
      } else if (q.includes('budget') || q.includes('under') || q.includes('staple')) {
        const atta = customerProducts.find((i) => i.name === 'Aashirvaad Atta')!
        const rice = customerProducts.find((i) => i.name === 'India Gate Basmati Rice')!
        const oil = customerProducts.find((i) => i.name === 'Fortune Sunflower Oil')!
        reply = {
          id: Math.random().toString(),
          sender: 'assistant',
          text: "Optimized your **Weekly Essentials Basket**! You get staple grains and cooking oil for **₹580**, staying strictly under budget with zero quality compromise.",
          bundle: [
            { product: atta, qty: 1, reason: 'Wholewheat grain (5kg)' },
            { product: rice, qty: 1, reason: 'Long-grain aged basmati (1kg)' },
            { product: oil, qty: 1, reason: 'Fortified cooking oil (1L)' },
          ],
          chips: ['Add salt & spices', 'Apply GB120 coupon'],
        }
      } else {
        const matched = customerProducts.slice(0, 3)
        reply = {
          id: Math.random().toString(),
          sender: 'assistant',
          text: `Found top store matches for **"${p}"** at GreenBasket Indiranagar:`,
          bundle: matched.map((prod) => ({
            product: prod,
            qty: 1,
            reason: `${prod.category} · In stock with 15-min delivery`,
          })),
          chips: ['Paneer & Tomato Dinner for 2', 'Weekly Staples Basket under ₹600'],
        }
      }

      setAiMessages((prev) => [...prev, reply])
    }, 600)
  }

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: customerProducts[0], qty: 1 },
    { product: customerProducts[1], qty: 1 },
  ])
  const [placedOrdersList, setPlacedOrdersList] = useState<OrderRecord[]>([])

  // Home state
  const [homeQuery, setHomeQuery] = useState('')
  const [homeCategory, setHomeCategory] = useState('All')
  const [currentStore, setCurrentStore] = useState(storeInfo.name)
  const [homeStoreDropdown, setHomeStoreDropdown] = useState(false)

  // Explore state
  const [exploreQuery, setExploreQuery] = useState('')
  const [exploreCategory, setExploreCategory] = useState('All')
  const [exploreSort, setExploreSort] = useState<'featured' | 'price-asc' | 'rating'>('featured')

  // Scan state
  const [scanMode, setScanMode] = useState<'camera' | 'manual'>('camera')
  const [isScanning, setIsScanning] = useState(false)
  const [scannedItem, setScannedItem] = useState<Product | null>(null)
  const [manualCode, setManualCode] = useState('')

  // Orders state
  const [ordersFilter, setOrdersFilter] = useState<'All' | 'Active' | 'Delivered'>('All')
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null)

  // Cart checkout state
  const [selectedSlot, setSelectedSlot] = useState(deliverySlots[0])
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState('')
  const [couponDiscount, setCouponDiscount] = useState(0)
  const [tipAmount, setTipAmount] = useState(0)

  // Product detail state
  const [detailQty, setDetailQty] = useState(1)
  const [addedToast, setAddedToast] = useState(false)

  // Notification Banner
  const [bannerNotice, setBannerNotice] = useState<string | null>(null)

  const showNotice = (msg: string) => {
    setBannerNotice(msg)
    setTimeout(() => setBannerNotice(null), 3500)
  }

  // Cart helpers
  const cartCount = cartItems.reduce((acc, i) => acc + i.qty, 0)
  const cartSubtotal = cartItems.reduce((acc, i) => acc + i.qty * i.product.price, 0)
  const deliveryCost = cartSubtotal >= FREE_DELIVERY_OVER ? 0 : DELIVERY_FEE
  const effectiveCouponDiscount = Math.min(couponDiscount, cartSubtotal)
  const cartGrandTotal = Math.max(0, cartSubtotal - effectiveCouponDiscount + deliveryCost + tipAmount)

  const getItemQty = (name: string) => cartItems.find((i) => i.product.name === name)?.qty ?? 0

  const sendTelemetryEvent = (event: {
    type: 'CART_ADD' | 'CART_REMOVE' | 'ORDER_PLACED' | 'BARCODE_SCAN' | 'SEARCH' | 'STORE_SWITCH'
    productName?: string
    quantity?: number
    orderId?: string
    orderTotal?: number
    details?: string
  }) => {
    fetch('/api/telemetry/event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...event,
        storeName: currentStore,
        details: event.details || `${event.type}: ${event.productName || ''}`,
      }),
    }).catch(() => {})
  }

  const addToCart = (product: Product, qty = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.product.name === product.name)
      if (existing) {
        return prev.map((i) =>
          i.product.name === product.name ? { ...i, qty: i.qty + qty } : i,
        )
      }
      return [...prev, { product, qty }]
    })
    sendTelemetryEvent({
      type: 'CART_ADD',
      productName: product.name,
      quantity: qty,
      details: `Customer added ${qty}x ${product.name} to cart`,
    })
    showNotice(`Added ${qty} × ${product.name} to cart`)
  }

  const changeQty = (name: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((i) => (i.product.name === name ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0),
    )
    sendTelemetryEvent({
      type: delta > 0 ? 'CART_ADD' : 'CART_REMOVE',
      productName: name,
      quantity: Math.abs(delta),
      details: `Customer updated ${name} qty by ${delta > 0 ? '+' : ''}${delta}`,
    })
  }

  const removeItem = (name: string) => {
    setCartItems((prev) => prev.filter((i) => i.product.name !== name))
    sendTelemetryEvent({
      type: 'CART_REMOVE',
      productName: name,
      quantity: 1,
      details: `Customer removed ${name} from cart`,
    })
  }

  const handlePlaceOrder = (paymentId?: string) => {
    if (cartItems.length === 0) return
    const orderId = `#GB-${2501 + placedOrdersList.length}`
    const newOrder: OrderRecord = {
      id: orderId,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
      items: cartCount,
      total: cartGrandTotal,
      status: 'Confirmed',
      slot: selectedSlot,
      itemsList: cartItems.map((i) => ({
        name: i.product.name,
        qty: i.qty,
        price: i.product.price,
        size: i.product.size,
      })),
    }
    setPlacedOrdersList([newOrder, ...placedOrdersList])
    setLatestOrderId(orderId)
    if (paymentId) setPaidPaymentId(paymentId)
    sendTelemetryEvent({
      type: 'ORDER_PLACED',
      orderId,
      orderTotal: cartGrandTotal,
      quantity: cartCount,
      details: `Customer completed ${paymentId ? `Razorpay (${paymentId})` : 'COD'} checkout for Order ${orderId} (${cartCount} items, ₹${cartGrandTotal})`,
    })
    setCartItems([])
    setCouponDiscount(0)
    setAppliedCoupon('')
    setTipAmount(0)
    setActiveModal('order-placed')
  }

  const handleReorder = (order: OrderRecord) => {
    if (order.itemsList && order.itemsList.length > 0) {
      setCartItems((prev) => {
        const copy = [...prev]
        for (const item of order.itemsList!) {
          const found = customerProducts.find((p) => p.name === item.name)
          if (found) {
            const idx = copy.findIndex((ci) => ci.product.name === item.name)
            if (idx >= 0) {
              copy[idx] = { ...copy[idx], qty: copy[idx].qty + item.qty }
            } else {
              copy.push({ product: found, qty: item.qty })
            }
          }
        }
        return copy
      })
      showNotice(`${order.itemsList.length} items from ${order.id} added to cart!`)
      setActiveModal('cart')
    }
  }

  const applyCoupon = () => {
    const code = couponCode.trim().toUpperCase()
    if (code === 'GB120' || code === 'SMARTSAVE') {
      if (cartSubtotal < 250) {
        showNotice('Coupon GB120 requires minimum order value of ₹250.')
        return
      }
      setCouponDiscount(120)
      setAppliedCoupon('GB120 (-₹120)')
      setCouponCode('')
      showNotice('Promo code GB120 applied! Saved ₹120.')
    } else if (code === 'FREESHIP') {
      setCouponDiscount(DELIVERY_FEE)
      setAppliedCoupon('FREESHIP (-₹30)')
      setCouponCode('')
      showNotice('Free delivery coupon applied!')
    } else {
      showNotice('Invalid coupon. Try "GB120" to redeem points!')
    }
  }

  const openProductDetail = (p: Product) => {
    setSelectedProduct(p)
    setDetailQty(1)
    setActiveModal('product')
  }

  // Filtered products for Home
  const homeFiltered = customerProducts.filter(
    (p) =>
      (homeCategory === 'All' || p.category === homeCategory) &&
      p.name.toLowerCase().includes(homeQuery.trim().toLowerCase()),
  )

  // Filtered products for Explore
  let exploreFiltered = customerProducts.filter(
    (p) =>
      (exploreCategory === 'All' || p.category === exploreCategory) &&
      p.name.toLowerCase().includes(exploreQuery.trim().toLowerCase()),
  )
  if (exploreSort === 'price-asc') {
    exploreFiltered = [...exploreFiltered].sort((a, b) => a.price - b.price)
  } else if (exploreSort === 'rating') {
    exploreFiltered = [...exploreFiltered].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
  }

  // Barcode simulation
  const handleSimulateScan = () => {
    setIsScanning(true)
    setTimeout(() => {
      const random = customerProducts[Math.floor(Math.random() * customerProducts.length)]
      setScannedItem(random)
      setIsScanning(false)
      showNotice(`Identified barcode for ${random.name}!`)
    }, 600)
  }

  // Orders list
  const allOrders = [...placedOrdersList, ...pastOrders]
  const displayedOrders = allOrders.filter((o) => {
    if (ordersFilter === 'Active') return o.status === 'Confirmed' || o.status === 'Packing'
    if (ordersFilter === 'Delivered') return o.status === 'Delivered'
    return true
  })

  if (showSplash) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-[#0d4f3c] to-[#1a6b52] font-sans">
        <div className="flex flex-col items-center animate-in fade-in zoom-in duration-1000 slide-in-from-bottom-8">
          <div className="relative mb-8 flex h-32 w-32 items-center justify-center rounded-[2.5rem] bg-gradient-to-br from-[#ffffff] to-[#f0f8f1] shadow-[0_20px_50px_rgba(0,0,0,0.3)] shadow-[#092b20] transition-transform duration-700 hover:scale-105">
            <ShoppingBag className="h-16 w-16 text-[#164e3b] drop-shadow-md" />
            <div className="absolute -bottom-3 -right-3 flex items-center justify-center rounded-full bg-gradient-to-tr from-[#89ac2e] to-[#b6d669] p-3 text-white shadow-xl ring-4 ring-[#1a6b52] animate-[spin_4s_linear_infinite]">
              <Sparkles className="h-6 w-6" />
            </div>
          </div>
          <h1 className="text-5xl font-black tracking-tighter text-white drop-shadow-lg">
            grocer<span className="text-[#a6c83f]">AI</span>
          </h1>
          <p className="mt-4 text-[13px] font-bold tracking-[0.2em] text-[#d1e8d1] uppercase opacity-90 drop-shadow-sm">
            the grocery inventory
          </p>
        </div>
        <div className="absolute bottom-16 flex flex-col items-center animate-pulse">
          <div className="h-1.5 w-16 overflow-hidden rounded-full bg-white/20">
            <div className="h-full w-1/2 bg-[#a6c83f] rounded-full animate-[bounce_1s_infinite]"></div>
          </div>
          <p className="mt-3 text-xs font-semibold text-white/60">Preparing your store...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col bg-[#fbfdf9] font-sans h-full min-h-screen">
      <div className="relative mx-auto flex min-h-screen w-full flex-col bg-white">
        {/* App Topbar */}
        <header className="flex items-center justify-between bg-white px-5 pb-3 pt-5 sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <ShoppingBasket className="size-8 text-[#164e3b]" />
            <span className="text-[22px] font-bold tracking-tight text-[#173f31]">
              FreshBasket
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveModal('cart')}
              className="relative text-[#173f31] hover:text-[#164e3b]"
            >
              <ShoppingCart className="size-6" />
              {cartCount > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex size-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setTab('Profile')}
              className="flex size-8 items-center justify-center rounded-full bg-[#e3f1dc] text-[#164e3b]"
            >
              <User className="size-5" />
            </button>
          </div>
        </header>

        {/* Global Floating Notification Toast */}
        {bannerNotice && (
          <div className="absolute top-16 inset-x-4 z-50 flex items-center justify-between rounded-xl bg-[#173f31] px-4 py-2.5 text-white shadow-xl animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-2 text-[11px] font-semibold">
              <Sparkles className="size-3.5 text-[#bbf7d0]" />
              <span>{bannerNotice}</span>
            </div>
            <button onClick={() => setBannerNotice(null)} className="text-white/70 hover:text-white">
              <X className="size-3.5" />
            </button>
          </div>
        )}

        {/* ======================================================================= */}
        {/* TAB 1: HOME */}
        {/* ======================================================================= */}
        {/* ======================================================================= */}
        {tab === 'Home' && (
          <main className="flex-1 overflow-y-auto px-5 pb-32 pt-2">
            {/* Store Location Bar */}
            <div className="relative">
              <button
                onClick={() => setHomeStoreDropdown(!homeStoreDropdown)}
                className="w-full flex items-center justify-between rounded-2xl bg-[#f0f9f4] p-3 text-left transition-colors hover:bg-[#e4f3eb]"
              >
                <div className="flex items-center gap-3">
                  <MapPin className="size-5 text-[#2e8b65]" />
                  <div>
                    <p className="text-[14px] font-bold text-[#173f31]">{currentStore}</p>
                    <p className="text-[11px] text-[#4b7861]">
                      {storeInfo.distance} · {storeInfo.hours} · {storeInfo.deliveryTime}
                    </p>
                  </div>
                </div>
                <ChevronDown className="size-5 text-[#2e8b65]" />
              </button>

              {homeStoreDropdown && (
                <div className="absolute left-0 right-0 top-full z-40 mt-1.5 rounded-2xl border border-[#e5e7eb] bg-white p-2 shadow-xl animate-in fade-in">
                  <p className="px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-muted-foreground">Select Store</p>
                  {[
                    'GreenBasket · Indiranagar',
                    'GreenBasket · Koramangala',
                    'GreenBasket · HSR Layout',
                  ].map((storeName) => (
                    <button
                      key={storeName}
                      onClick={() => {
                        setCurrentStore(storeName)
                        setHomeStoreDropdown(false)
                        showNotice(`Switched to ${storeName}`)
                      }}
                      className={`w-full rounded-xl px-3 py-2 text-left text-[11px] font-medium transition-colors ${
                        currentStore === storeName ? 'bg-[#e3f1dc] font-bold text-[#173f31]' : 'hover:bg-muted text-gray-700'
                      }`}
                    >
                      {storeName}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search Bar */}
            <div className="mt-4 flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-3 shadow-sm">
              <Search className="size-5 text-gray-400" />
              <input
                value={homeQuery}
                onChange={(e) => setHomeQuery(e.target.value)}
                placeholder="Search milk, atta, apples, snacks..."
                className="flex-1 bg-transparent text-[14px] text-gray-800 outline-none placeholder:text-gray-400"
              />
              {homeQuery.length > 0 && (
                <button onClick={() => setHomeQuery('')}>
                  <X className="size-4 text-gray-400" />
                </button>
              )}
            </div>

            {/* grocerAI Shopping Copilot Banner */}
            <div
              onClick={() => setActiveModal('ai')}
              className="mt-4 flex cursor-pointer items-center justify-between rounded-3xl border border-[#c5e6bc] bg-[#eef8e8] p-4 shadow-sm transition-all hover:bg-[#e4f3db]"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="flex size-10 items-center justify-center rounded-full bg-white text-[#1f7956]">
                  <Bot className="size-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-bold text-[#173f31]">groceryAI Shopping Copilot</span>
                    <span className="rounded bg-[#d3ebd3] px-1.5 py-0.5 text-[9px] font-bold text-[#2e8b65]">AI RECIPES</span>
                  </div>
                  <p className="text-[12px] text-[#4b7861] mt-0.5">
                    Ask for dinner recipes, high-protein diet baskets & 1-click cart assembly.
                  </p>
                </div>
              </div>
              <button className="rounded-2xl bg-[#164e3b] px-4 py-2 text-[12px] font-bold text-white hover:bg-[#1a5d46]">
                Ask AI →
              </button>
            </div>

            {/* Welcome & Points Card */}
            <div className="mt-6 flex items-center justify-between">
              <div>
                <h1 className="text-[22px] font-bold text-[#173f31] flex items-center gap-2">
                  Good morning, Arjun <span className="text-[20px]">👋</span>
                </h1>
                <p className="text-[14px] text-gray-500 mt-1">Fresh stock arrived 10 mins ago</p>
              </div>
              <button
                onClick={() => {
                  setCouponCode('GB120')
                  setActiveModal('cart')
                  showNotice('Code GB120 applied! Check your cart.')
                }}
                className="flex items-center gap-1.5 rounded-full bg-[#fdfaf3] px-3 py-1.5 text-[14px] font-bold text-[#173f31] shadow-sm border border-yellow-200 hover:bg-[#fbf4e4]"
              >
                <Star className="size-4 fill-yellow-400 text-yellow-400" />
                2,460 pts {'>'}
              </button>
            </div>

            {/* Category Chips */}
            <div className="mt-5 flex gap-3 overflow-x-auto pb-2 no-scrollbar">
              <button
                onClick={() => setHomeCategory('All')}
                className={`whitespace-nowrap rounded-full px-6 py-2.5 text-[14px] font-bold transition-colors ${
                  homeCategory === 'All' ? 'bg-[#164e3b] text-white' : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                All
              </button>
              {shopCategories.filter(c => c !== 'All').map((c) => {
                const active = homeCategory === c
                let Icon = ShoppingBag
                if (c === 'Dairy') Icon = Milk
                if (c === 'Produce') Icon = Apple
                if (c === 'Staples') Icon = Wheat
                if (c === 'Bakery') Icon = Croissant
                if (c === 'Snacks') Icon = Cookie
                
                return (
                  <button
                    key={c}
                    onClick={() => setHomeCategory(c)}
                    className={`whitespace-nowrap flex items-center gap-2 rounded-full px-5 py-2.5 text-[14px] font-bold transition-colors ${
                      active ? 'bg-[#164e3b] text-white shadow-sm' : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className={`size-5 ${active ? 'text-white' : c === 'Dairy' ? 'text-blue-500' : c === 'Produce' ? 'text-green-500' : c === 'Staples' ? 'text-orange-400' : 'text-yellow-600'}`} />
                    {c}
                  </button>
                )
              })}
            </div>

            {/* Section Header */}
            <div className="mt-8 flex items-center justify-between">
              <h2 className="text-[20px] font-bold text-[#173f31]">Picked for you (14)</h2>
              <button onClick={() => setTab('Explore')} className="text-[14px] font-bold text-[#164e3b] hover:underline flex items-center gap-1">
                Explore all →
              </button>
            </div>

            {/* Product Grid */}
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {homeFiltered.map((p) => {
                const qty = getItemQty(p.name)
                return (
                  <div
                    key={p.name}
                    className="flex flex-col justify-between rounded-3xl bg-white p-4 shadow-sm border border-gray-100 transition-all hover:shadow-md"
                  >
                    <div
                      onClick={() => openProductDetail(p)}
                      className={`relative flex h-36 w-full cursor-pointer items-center justify-center rounded-2xl mb-3`}
                    >
                      {p.image ? (
                        <img
                          src={p.image}
                          alt={p.name}
                          className="h-full w-full object-contain transition-transform hover:scale-105 duration-300"
                        />
                      ) : (
                        <ShoppingBag className="size-12 text-gray-300" />
                      )}
                      {p.discount && (
                        <span className="absolute left-0 top-0 rounded-full bg-[#164e3b] px-2.5 py-1 text-[11px] font-bold tracking-wide text-white shadow-sm">
                          {p.discount}
                        </span>
                      )}
                    </div>

                    <div className="cursor-pointer flex-1" onClick={() => openProductDetail(p)}>
                      <p className="truncate text-[15px] font-bold text-[#173f31]">{p.name}</p>
                      <div className="mt-1 flex items-center justify-between text-[13px] text-gray-500">
                        <span>{p.size}</span>
                        {p.rating && (
                          <span className="flex items-center gap-1 font-bold text-yellow-500">
                            <Star className="size-3.5 fill-yellow-500" /> {p.rating}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-baseline gap-1">
                        <span className="text-[20px] font-bold text-[#173f31]">₹{p.price}</span>
                        {p.discount && <span className="text-[12px] text-gray-400 line-through">₹{Math.round(p.price * 1.15)}</span>}
                      </div>
                      {qty > 0 ? (
                        <div className="flex items-center rounded-xl border border-gray-200 bg-[#f8faf8] p-1 shadow-sm">
                          <button
                            onClick={() => changeQty(p.name, -1)}
                            className="flex size-7 items-center justify-center rounded-lg bg-white text-[16px] font-bold text-[#164e3b] shadow-sm transition-colors hover:bg-gray-50"
                          >
                            −
                          </button>
                          <span className="min-w-8 text-center text-[14px] font-bold text-[#164e3b]">{qty}</span>
                          <button
                            onClick={() => changeQty(p.name, 1)}
                            className="flex size-7 items-center justify-center rounded-lg bg-[#e3f1dc] text-[16px] font-bold text-[#164e3b] shadow-sm transition-colors hover:bg-[#d5eacb]"
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addToCart(p, 1)}
                          className="flex items-center gap-1.5 rounded-xl bg-[#164e3b] px-4 py-2 text-[13px] font-bold text-white shadow-sm transition-all hover:bg-[#124031] active:scale-95"
                        >
                          <ShoppingCart className="size-4" /> Add
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {homeFiltered.length === 0 && (
              <div className="mt-8 rounded-xl bg-white p-6 text-center text-xs text-muted-foreground">
                No items match &quot;{homeQuery}&quot; in this aisle.
              </div>
            )}

            {/* Smart Savings Reward Banner */}
            <div
              onClick={() => {
                setCouponCode('GB120')
                setActiveModal('cart')
              }}
              className="mt-6 flex cursor-pointer items-center justify-between rounded-3xl bg-gradient-to-br from-[#164e3b] to-[#0d3024] p-5 text-white shadow-xl hover:-translate-y-1 transition-all"
            >
              <div>
                <div className="inline-block rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-semibold text-[#c8e6c8] backdrop-blur-md">
                  Smart savings
                </div>
                <p className="mt-1.5 text-[16px] font-extrabold tracking-tight">Get ₹120 off your next bill</p>
                <p className="mt-1 text-[11px] font-medium text-[#c1dcc6] opacity-80">Tap to apply promo code GB120</p>
              </div>
              <div className="flex size-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md">
                <Trophy className="size-6 text-[#b6d669] drop-shadow-md" />
              </div>
            </div>
          </main>
        )}

        {/* ======================================================================= */}
        {/* TAB 2: EXPLORE */}
        {/* ======================================================================= */}
        {tab === 'Explore' && (
          <main className="flex-1 overflow-y-auto px-4 pb-32 pt-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#2e8b65]">Browse Aisles</p>
              <h1 className="text-[18px] font-bold text-[#173f31]">Explore Store</h1>
              <p className="text-[11px] text-muted-foreground">Fresh supermarket catalog with live inventory.</p>
            </div>

            {/* Search Input */}
            <div className="mt-4 flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-3 shadow-sm">
              <Search className="size-5 text-gray-400" />
              <input
                value={exploreQuery}
                onChange={(e) => setExploreQuery(e.target.value)}
                placeholder="Search all items..."
                className="flex-1 bg-transparent text-[14px] text-gray-800 outline-none placeholder:text-gray-400"
              />
              {exploreQuery.length > 0 && (
                <button onClick={() => setExploreQuery('')}>
                  <X className="size-4 text-gray-400" />
                </button>
              )}
            </div>

            {/* Categories */}
            <div className="mt-5 flex gap-3 overflow-x-auto pb-2 no-scrollbar">
              <button
                onClick={() => setExploreCategory('All')}
                className={`whitespace-nowrap rounded-full px-6 py-2.5 text-[14px] font-bold transition-colors ${
                  exploreCategory === 'All' ? 'bg-[#164e3b] text-white' : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                All
              </button>
              {shopCategories.filter(c => c !== 'All').map((c) => {
                const active = exploreCategory === c
                let Icon = ShoppingBag
                if (c === 'Dairy') Icon = Milk
                if (c === 'Produce') Icon = Apple
                if (c === 'Staples') Icon = Wheat
                if (c === 'Bakery') Icon = Croissant
                if (c === 'Snacks') Icon = Cookie
                
                return (
                  <button
                    key={c}
                    onClick={() => setExploreCategory(c)}
                    className={`whitespace-nowrap flex items-center gap-2 rounded-full px-5 py-2.5 text-[14px] font-bold transition-colors ${
                      active ? 'bg-[#164e3b] text-white shadow-sm' : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className={`size-5 ${active ? 'text-white' : c === 'Dairy' ? 'text-blue-500' : c === 'Produce' ? 'text-green-500' : c === 'Staples' ? 'text-orange-400' : 'text-yellow-600'}`} />
                    {c}
                  </button>
                )
              })}
            </div>

            {/* Sort bar */}
            <div className="mt-4 flex items-center justify-between border-b border-[#f0f3ee] pb-2 text-[11px]">
              <span className="font-bold text-[#173f31]">{exploreFiltered.length} items found</span>
              <button
                onClick={() =>
                  setExploreSort((prev) =>
                    prev === 'featured' ? 'price-asc' : prev === 'price-asc' ? 'rating' : 'featured',
                  )
                }
                className="flex items-center gap-1 font-semibold text-[#2e8b65]"
              >
                <ArrowUpDown className="size-3" />
                {exploreSort === 'featured' ? 'Featured' : exploreSort === 'price-asc' ? 'Price: Low ↑' : 'Top Rated ★'}
              </button>
            </div>

            {/* Product Grid */}
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {exploreFiltered.map((p) => {
                const qty = getItemQty(p.name)
                return (
                  <div
                    key={p.name}
                    className="flex flex-col justify-between rounded-3xl bg-white p-4 shadow-sm border border-gray-100 transition-all hover:shadow-md"
                  >
                    <div
                      onClick={() => openProductDetail(p)}
                      className={`relative flex h-36 w-full cursor-pointer items-center justify-center rounded-2xl mb-3`}
                    >
                      {p.image ? (
                        <img
                          src={p.image}
                          alt={p.name}
                          className="h-full w-full object-contain transition-transform hover:scale-105 duration-300"
                        />
                      ) : (
                        <ShoppingBag className="size-12 text-gray-300" />
                      )}
                      {p.discount && (
                        <span className="absolute left-0 top-0 rounded-full bg-[#164e3b] px-2.5 py-1 text-[11px] font-bold tracking-wide text-white shadow-sm">
                          {p.discount}
                        </span>
                      )}
                    </div>

                    <div className="cursor-pointer flex-1" onClick={() => openProductDetail(p)}>
                      <p className="truncate text-[15px] font-bold text-[#173f31]">{p.name}</p>
                      <div className="mt-1 flex items-center justify-between text-[13px] text-gray-500">
                        <span>{p.size} · {p.category}</span>
                        {p.rating && (
                          <span className="flex items-center gap-1 font-bold text-yellow-500">
                            <Star className="size-3.5 fill-yellow-500" /> {p.rating}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-baseline gap-1">
                        <span className="text-[20px] font-bold text-[#173f31]">₹{p.price}</span>
                        {p.discount && <span className="text-[12px] text-gray-400 line-through">₹{Math.round(p.price * 1.15)}</span>}
                      </div>
                      {qty > 0 ? (
                        <div className="flex items-center rounded-xl border border-gray-200 bg-[#f8faf8] p-1 shadow-sm">
                          <button
                            onClick={() => changeQty(p.name, -1)}
                            className="flex size-7 items-center justify-center rounded-lg bg-white text-[16px] font-bold text-[#164e3b] shadow-sm transition-colors hover:bg-gray-50"
                          >
                            −
                          </button>
                          <span className="min-w-8 text-center text-[14px] font-bold text-[#164e3b]">{qty}</span>
                          <button
                            onClick={() => changeQty(p.name, 1)}
                            className="flex size-7 items-center justify-center rounded-lg bg-[#e3f1dc] text-[16px] font-bold text-[#164e3b] shadow-sm transition-colors hover:bg-[#d5eacb]"
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addToCart(p, 1)}
                          className="flex items-center gap-1.5 rounded-xl bg-[#164e3b] px-4 py-2 text-[13px] font-bold text-white shadow-sm transition-all hover:bg-[#124031] active:scale-95"
                        >
                          <ShoppingCart className="size-4" /> Add
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </main>
        )}

        {/* ======================================================================= */}
        {/* TAB 3: SCAN & PAY SIMULATOR */}
        {/* ======================================================================= */}
        {tab === 'Scan' && (
          <main className="flex-1 overflow-y-auto px-5 pb-28 pt-4 flex flex-col items-center">
            <h1 className="text-[18px] font-bold text-[#173f31]">In-Store Scan & Pay</h1>
            <p className="mt-1 text-center text-[11px] text-muted-foreground">
              Scan product barcodes in-aisle at GreenBasket to skip the checkout queue.
            </p>

            {/* Mode switch */}
            <div className="mt-4 flex rounded-xl bg-[#e5e7eb] p-1 text-[11px] font-bold">
              <button
                onClick={() => setScanMode('camera')}
                className={`rounded-lg px-4 py-1.5 transition-colors ${
                  scanMode === 'camera' ? 'bg-white text-[#173f31] shadow-sm' : 'text-gray-600'
                }`}
              >
                Scan Viewfinder
              </button>
              <button
                onClick={() => setScanMode('manual')}
                className={`rounded-lg px-4 py-1.5 transition-colors ${
                  scanMode === 'manual' ? 'bg-white text-[#173f31] shadow-sm' : 'text-gray-600'
                }`}
              >
                Enter Code
              </button>
            </div>

            {scanMode === 'camera' ? (
              <div className="mt-6 flex flex-col items-center w-full">
                {/* Viewfinder box */}
                <div className="relative flex size-56 items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed border-[#2e8b65] bg-[#f2f8e8]">
                  <Barcode className="size-16 text-[#2e8b65]/70" />
                  {isScanning && (
                    <div className="absolute inset-x-0 h-1 bg-emerald-500 shadow-md animate-pulse" />
                  )}
                  <span className="absolute bottom-3 rounded-full bg-[#164e3b] px-3 py-1 text-[9px] font-semibold text-white">
                    {isScanning ? 'Reading barcode…' : 'Aim at product barcode'}
                  </span>
                </div>

                <button
                  onClick={handleSimulateScan}
                  disabled={isScanning}
                  className="mt-5 flex items-center gap-2 rounded-xl bg-[#164e3b] px-6 py-3 text-[12px] font-bold text-white shadow-md hover:bg-[#124031] active:scale-95 transition-all"
                >
                  <Camera className="size-4" />
                  {isScanning ? 'Scanning…' : 'Simulate barcode scan'}
                </button>
              </div>
            ) : (
              <div className="mt-6 w-full rounded-2xl border border-[#e5e7eb] bg-white p-4">
                <p className="text-[12px] font-bold text-[#173f31]">Enter product or barcode number</p>
                <div className="mt-3 flex gap-2">
                  <input
                    value={manualCode}
                    onChange={(e) => setManualCode(e.target.value)}
                    placeholder="e.g. Milk, Atta, 890123"
                    className="flex-1 rounded-xl border border-[#e5e7eb] bg-[#f9fafb] px-3 py-2 text-[12px] outline-none"
                  />
                  <button
                    onClick={() => {
                      const match = customerProducts.find((p) =>
                        p.name.toLowerCase().includes(manualCode.trim().toLowerCase()),
                      )
                      if (match) setScannedItem(match)
                      else showNotice('No product matching this barcode.')
                    }}
                    className="rounded-xl bg-[#164e3b] px-4 text-[11px] font-bold text-white"
                  >
                    Look up
                  </button>
                </div>
              </div>
            )}

            {/* Scanned product banner */}
            {scannedItem && (
              <div className="mt-6 w-full rounded-2xl border border-[#b7d66b] bg-[#f6fbf2] p-4 shadow-sm animate-in fade-in">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="flex items-center gap-1 font-bold text-[#1f7956]">
                    <Sparkles className="size-3.5" /> Barcode Recognized!
                  </span>
                  <span className="text-muted-foreground">EAN: 89010300{scannedItem.price}</span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div>
                    <p className="text-[13px] font-bold text-[#173f31]">{scannedItem.name}</p>
                    <p className="text-[10px] text-muted-foreground">{scannedItem.size} · {scannedItem.category}</p>
                  </div>
                  <span className="text-[15px] font-bold text-[#173f31]">₹{scannedItem.price}</span>
                </div>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => {
                      addToCart(scannedItem, 1)
                      showNotice(`${scannedItem.name} added to cart!`)
                    }}
                    className="flex flex-1 items-center justify-center gap-1 rounded-xl bg-[#164e3b] py-2.5 text-[11px] font-bold text-white hover:bg-[#124031]"
                  >
                    <Plus className="size-3.5" /> Add to cart
                  </button>
                  <button
                    onClick={() => openProductDetail(scannedItem)}
                    className="rounded-xl border border-[#e5e7eb] bg-white px-3 py-2.5 text-[11px] font-bold text-[#173f31]"
                  >
                    Details
                  </button>
                </div>
              </div>
            )}
          </main>
        )}

        {/* ======================================================================= */}
        {/* TAB 4: ORDERS */}
        {/* ======================================================================= */}
        {tab === 'Orders' && (
          <main className="flex-1 overflow-y-auto px-5 pb-28 pt-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#2e8b65]">Order History</p>
              <h1 className="text-[18px] font-bold text-[#173f31]">Your Orders</h1>
              <p className="text-[11px] text-muted-foreground">Live orders and past receipts from {currentStore}.</p>
            </div>

            {/* Filter pills */}
            <div className="mt-3 flex gap-2">
              {(['All', 'Active', 'Delivered'] as const).map((filter) => {
                const active = ordersFilter === filter
                return (
                  <button
                    key={filter}
                    onClick={() => setOrdersFilter(filter)}
                    className={`rounded-full px-3.5 py-1 text-[11px] font-semibold transition-colors ${
                      active ? 'bg-[#164e3b] text-white shadow-sm' : 'border border-[#e5e7eb] bg-white text-gray-600'
                    }`}
                  >
                    {filter}
                  </button>
                )
              })}
            </div>

            {/* Orders list */}
            <div className="mt-3.5 space-y-3">
              {displayedOrders.map((o) => {
                const isConfirmed = o.status === 'Confirmed'
                const isExpanded = expandedOrderId === o.id
                return (
                  <div key={o.id} className="rounded-2xl border border-[#e5e7eb] bg-white p-4 shadow-sm">
                    <div
                      onClick={() => setExpandedOrderId(isExpanded ? null : o.id)}
                      className="flex cursor-pointer items-center justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[13px] font-bold text-[#173f31]">{o.id}</span>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${
                              isConfirmed ? 'bg-[#dff0d8] text-[#1f7956]' : 'bg-[#e3f1dc] text-[#2e8b65]'
                            }`}
                          >
                            {o.status}
                          </span>
                        </div>
                        <p className="mt-1 text-[11px] text-muted-foreground">
                          {o.date} · {o.items} items · ₹{o.total}
                        </p>
                      </div>
                      {isExpanded ? <ChevronUp className="size-4 text-gray-500" /> : <ChevronDown className="size-4 text-gray-500" />}
                    </div>

                    {/* Expandable item details */}
                    {isExpanded && (
                      <div className="mt-3 border-t border-[#f0f2ef] pt-3 animate-in fade-in">
                        {isConfirmed ? (
                          <div className="mb-3 rounded-xl bg-[#e3f1dc] p-3 text-[11px]">
                            <div className="flex items-center gap-2 font-bold text-[#173f31]">
                              <PackageCheck className="size-4 text-[#2e8b65]" />
                              <span>Order is being packed at {currentStore}</span>
                            </div>
                            <p className="mt-1 text-[10px] text-[#4b7861]">
                              Slot: {o.slot ?? 'In 20 mins'} · Arriving in ~15 mins
                            </p>
                          </div>
                        ) : (
                          <div className="mb-2 flex items-center gap-2 text-[10px] text-muted-foreground">
                            <Clock className="size-3" /> Slot: {o.slot ?? 'Delivered'}
                          </div>
                        )}

                        {o.itemsList && o.itemsList.length > 0 && (
                          <div className="space-y-1.5 text-[11px]">
                            <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">Items Ordered:</p>
                            {o.itemsList.map((item, idx) => (
                              <div key={idx} className="flex justify-between text-gray-700">
                                <span>{item.qty} × {item.name} ({item.size})</span>
                                <span className="font-semibold">₹{item.price * item.qty}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Footer buttons */}
                    <div className="mt-3 flex items-center justify-between border-t border-[#f0f2ef] pt-3 text-[10px]">
                      <span className="text-muted-foreground">{currentStore}</span>
                      {isConfirmed ? (
                        <button
                          onClick={() => setExpandedOrderId(isExpanded ? null : o.id)}
                          className="flex items-center gap-1 rounded-lg bg-[#e3f1dc] px-2.5 py-1 font-bold text-[#1f7956]"
                        >
                          <Truck className="size-3" /> Live Tracking
                        </button>
                      ) : (
                        <button
                          onClick={() => handleReorder(o)}
                          className="flex items-center gap-1 rounded-lg bg-[#dff0d8] px-2.5 py-1 font-bold text-[#21664b] hover:bg-[#cfe7c2]"
                        >
                          <RotateCcw className="size-3" /> Reorder
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </main>
        )}

        {/* ======================================================================= */}
        {/* TAB 5: PROFILE */}
        {/* ======================================================================= */}
        {tab === 'Profile' && (
          <main className="flex-1 overflow-y-auto px-5 pb-28 pt-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#2e8b65]">Your Account</p>
              <h1 className="text-[18px] font-bold text-[#173f31]">Profile</h1>
            </div>

            {/* Member Profile Card */}
            <div className="mt-4 flex items-center gap-3.5 rounded-2xl border border-[#e5e7eb] bg-white p-4 shadow-sm">
              <div className="flex size-12 items-center justify-center rounded-full bg-[#164e3b] text-sm font-bold text-white">
                AM
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1.5">
                  <p className="text-[14px] font-bold text-[#173f31]">Arjun Mehta</p>
                  <ShieldCheck className="size-3.5 text-[#2e8b65]" />
                </div>
                <p className="text-[10px] text-muted-foreground">arjun@example.com · +91 98765 43210</p>
                <span className="mt-1 inline-block rounded-full bg-[#e3f1dc] px-2 py-0.5 text-[9px] font-bold text-[#2e8b65]">
                  2,480 GreenPoints ★
                </span>
              </div>
            </div>

            {/* Action rows */}
            <div className="mt-4 overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white text-[12px]">
              {[
                {
                  label: 'Saved addresses',
                  sub: 'Home, Office (2 saved)',
                  icon: MapPin,
                  action: () => showNotice('Home (Default): 4th Main Rd, Indiranagar'),
                },
                {
                  label: 'Payment methods',
                  sub: 'Google Pay UPI, Visa ••4821',
                  icon: CreditCard,
                  action: () => showNotice('Default payment: arjun@okhdfcbank'),
                },
                {
                  label: 'Order history',
                  sub: 'View all past receipts',
                  icon: Package,
                  action: () => setTab('Orders'),
                },
                {
                  label: 'Loyalty & Rewards',
                  sub: '2,480 GreenPoints earned',
                  icon: Award,
                  action: () => {
                    setCouponCode('GB120')
                    setActiveModal('cart')
                  },
                },
                {
                  label: 'Customer hotline',
                  sub: '24/7 store assistance',
                  icon: HelpCircle,
                  action: () => showNotice('GreenBasket hotline: 1800-200-GREEN'),
                },
              ].map((item, idx) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.label}
                    onClick={item.action}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-[#fafbfa] ${
                      idx > 0 ? 'border-t border-[#f0f2ef]' : ''
                    }`}
                  >
                    <div className="flex size-7 items-center justify-center rounded-lg bg-[#f0f4ee] text-[#2e8b65]">
                      <Icon className="size-4" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-[#173f31]">{item.label}</p>
                      <p className="text-[10px] text-muted-foreground">{item.sub}</p>
                    </div>
                    <ChevronRight className="size-4 text-gray-400" />
                  </button>
                )
              })}
            </div>

            <button
              onClick={() => showNotice('Signed out. See you soon Arjun!')}
              className="mt-4 w-full rounded-2xl border border-red-200 bg-white py-3 text-[11px] font-bold text-red-600 hover:bg-red-50"
            >
              Log out
            </button>
          </main>
        )}

        {/* ======================================================================= */}
        {/* PERSISTENT FLOATING CART PILL */}
        {/* ======================================================================= */}
        {cartCount > 0 && activeModal === 'none' && (
          <div className="absolute bottom-16 inset-x-4 z-30">
            <button
              onClick={() => setActiveModal('cart')}
              className="w-full flex items-center justify-between rounded-2xl bg-[#173f31] px-4 py-3.5 text-white shadow-xl hover:bg-[#123629] transition-all active:scale-[0.99]"
            >
              <div className="flex items-center gap-2.5">
                <div className="flex size-7 items-center justify-center rounded-lg bg-[#2e8b65]">
                  <ShoppingBag className="size-4 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-[12px] font-bold leading-tight">
                    {cartCount} {cartCount === 1 ? 'item' : 'items'} · ₹{cartGrandTotal}
                  </p>
                  <p className="text-[9px] text-[#bbf7d0]">
                    {cartSubtotal >= FREE_DELIVERY_OVER ? 'Free delivery unlocked!' : 'Free delivery over ₹499'}
                  </p>
                </div>
              </div>
              <span className="rounded-xl bg-[#2e8b65] px-3 py-1.5 text-[10px] font-bold text-white shadow-sm">
                View cart →
              </span>
            </button>
          </div>
        )}

        {/* ======================================================================= */}
        {/* BOTTOM NAVIGATION BAR */}
        {/* ======================================================================= */}
        <nav className="absolute bottom-0 inset-x-0 z-20 flex justify-around border-t border-[#e5e7eb] bg-white/95 px-2 py-2 backdrop-blur">
          {[
            { name: 'Home', icon: Grid2X2 },
            { name: 'Explore', icon: Search },
            { name: 'Scan', icon: Barcode },
            { name: 'Orders', icon: FileText },
            { name: 'Profile', icon: Users },
          ].map((item) => {
            const Icon = item.icon
            const active = tab === item.name
            return (
              <button
                key={item.name}
                onClick={() => setTab(item.name as typeof tab)}
                className={`relative flex flex-col items-center gap-0.5 px-3 py-1 text-[9px] font-semibold transition-colors ${
                  active ? 'text-[#1f7956]' : 'text-gray-400 hover:text-gray-700'
                }`}
              >
                <div
                  className={`flex size-6 items-center justify-center rounded-lg ${
                    item.name === 'Scan' ? 'bg-[#b7d66b] text-[#173f31] size-8 -mt-2 shadow-sm rounded-full' : ''
                  }`}
                >
                  <Icon className={item.name === 'Scan' ? 'size-4' : 'size-4'} />
                </div>
                <span>{item.name}</span>
              </button>
            )
          })}
        </nav>

        {/* ======================================================================= */}
        {/* MODAL 1: PRODUCT DETAILS MODAL */}
        {/* ======================================================================= */}
        {activeModal === 'product' && selectedProduct && (
          <div className="absolute inset-0 z-50 flex flex-col bg-[#fbfdf9] animate-in fade-in slide-in-from-bottom-3">
            <header className="flex items-center justify-between border-b border-[#f0f3ee] bg-white px-5 py-3.5">
              <button
                onClick={() => setActiveModal('none')}
                className="flex size-8 items-center justify-center rounded-xl border border-[#e5e7eb] bg-white"
              >
                <ChevronLeft className="size-4 text-[#173f31]" />
              </button>
              <span className="text-[12px] font-bold text-[#173f31]">Product Details</span>
              <button
                onClick={() => setActiveModal('cart')}
                className="relative flex size-8 items-center justify-center rounded-xl border border-[#e5e7eb] bg-white"
              >
                <ShoppingBag className="size-4 text-[#173f31]" />
                {cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-[#164e3b] text-[9px] font-bold text-white">
                    {cartCount}
                  </span>
                )}
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              <div className={`relative flex h-52 items-center justify-center rounded-3xl overflow-hidden bg-white border border-[#f0f2f5] p-4`}>
                {selectedProduct.image ? (
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="h-full w-full object-contain drop-shadow-sm"
                  />
                ) : (
                  <ShoppingBag className="size-20 text-[#5b876e]/50" />
                )}
                {selectedProduct.discount && (
                  <span className="absolute left-4 top-4 rounded-full bg-[#164e3b] px-2.5 py-1 text-[10px] font-bold text-white shadow-sm">
                    {selectedProduct.discount}
                  </span>
                )}
              </div>

              <div className="mt-4 flex items-start justify-between">
                <div>
                  <h2 className="text-[18px] font-bold text-[#173f31]">{selectedProduct.name}</h2>
                  <div className="mt-1 flex items-center gap-2 text-[11px] text-muted-foreground">
                    <span>{selectedProduct.size} · {selectedProduct.category}</span>
                    {selectedProduct.rating && (
                      <span className="flex items-center gap-0.5 rounded-md bg-[#fef9c3] px-1.5 py-0.5 font-bold text-[#854d0e]">
                        <Star className="size-3 fill-[#ca8a04]" /> {selectedProduct.rating}
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-[20px] font-bold text-[#173f31]">₹{selectedProduct.price}</span>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <span className="rounded-full bg-[#e3f1dc] px-2.5 py-0.5 text-[9px] font-bold text-[#2e8b65]">In stock</span>
                <span className="rounded-full bg-[#f3f4f6] px-2.5 py-0.5 text-[9px] font-semibold text-gray-600">100% Genuine</span>
              </div>

              <div className="mt-4 rounded-2xl border border-[#e5e7eb] bg-white p-3.5 space-y-2 text-[11px] text-gray-700">
                <div className="flex items-center gap-2">
                  <Clock3 className="size-3.5 text-[#2e8b65]" />
                  <span>Delivery in 20 mins · free over ₹499</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="size-3.5 text-[#2e8b65]" />
                  <span>{currentStore} · 1.2 km away</span>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Description & Quality</p>
                <p className="mt-1 text-[12px] leading-5 text-gray-700">{productDescription(selectedProduct.category)}</p>
              </div>

              {/* Quantity selector */}
              <div className="mt-5 flex items-center justify-between rounded-2xl border border-[#e5e7eb] bg-white p-3.5">
                <div>
                  <p className="text-[12px] font-bold text-[#173f31]">Select quantity</p>
                  <p className="text-[10px] text-muted-foreground">Total: ₹{selectedProduct.price * detailQty}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setDetailQty(Math.max(1, detailQty - 1))}
                    className="flex size-7 items-center justify-center rounded-lg border border-[#e5e7eb] bg-white text-gray-700 font-bold"
                  >
                    −
                  </button>
                  <span className="w-5 text-center text-[13px] font-bold text-[#173f31]">{detailQty}</span>
                  <button
                    onClick={() => setDetailQty(detailQty + 1)}
                    className="flex size-7 items-center justify-center rounded-lg bg-[#dff0d8] text-[#21664b] font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Add Bar */}
            <div className="border-t border-[#e5e7eb] bg-white p-4">
              {addedToast ? (
                <div className="flex gap-2">
                  <div className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#2e8b65] py-3 text-[12px] font-bold text-white">
                    <Check className="size-4" /> Added ({detailQty})
                  </div>
                  <button
                    onClick={() => setActiveModal('cart')}
                    className="rounded-xl border border-[#164e3b] px-4 py-3 text-[12px] font-bold text-[#164e3b]"
                  >
                    View cart ({cartCount})
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    addToCart(selectedProduct, detailQty)
                    setAddedToast(true)
                    setTimeout(() => setAddedToast(false), 2000)
                  }}
                  className="w-full rounded-xl bg-[#164e3b] py-3 text-[13px] font-bold text-white hover:bg-[#124031] transition-colors"
                >
                  Add to cart · ₹{selectedProduct.price * detailQty}
                </button>
              )}
            </div>
          </div>
        )}

        {/* ======================================================================= */}
        {/* MODAL 2: CART & CHECKOUT MODAL */}
        {/* ======================================================================= */}
        {activeModal === 'cart' && (
          <div className="absolute inset-0 z-50 flex flex-col bg-[#fbfdf9] animate-in fade-in slide-in-from-bottom-3">
            <header className="flex items-center justify-between border-b border-[#f0f3ee] bg-white px-5 py-3.5">
              <button
                onClick={() => setActiveModal('none')}
                className="flex size-8 items-center justify-center rounded-xl border border-[#e5e7eb] bg-white"
              >
                <ChevronLeft className="size-4 text-[#173f31]" />
              </button>
              <span className="text-[12px] font-bold text-[#173f31]">Your Cart ({cartCount})</span>
              <div className="size-8" />
            </header>

            {cartCount === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
                <div className="flex size-16 items-center justify-center rounded-full bg-[#f0f4ee] text-gray-400">
                  <ShoppingBag className="size-8" />
                </div>
                <h3 className="mt-4 text-[16px] font-bold text-[#173f31]">Your cart is empty</h3>
                <p className="mt-1 text-[11px] text-muted-foreground">Add fresh groceries from the store to checkout.</p>
                <button
                  onClick={() => setActiveModal('none')}
                  className="mt-5 rounded-xl bg-[#164e3b] px-5 py-2.5 text-[12px] font-bold text-white"
                >
                  Browse products
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
                  {/* In-Store Self-Checkout Status banner */}
                  <div className="rounded-xl bg-[#e3f1dc] p-3 border border-[#b7d66b]/60">
                    <div className="flex justify-between items-center text-[11px] font-bold text-[#173f31]">
                      <span className="flex items-center gap-1.5">
                        <span className="size-2 rounded-full bg-emerald-600 animate-pulse" />
                        In-Store Self-Billing Basket
                      </span>
                      <span className="rounded-full bg-[#164e3b] px-2 py-0.5 text-[9px] font-bold text-white">
                        🔒 {cartCount} Items Scanned
                      </span>
                    </div>
                    <p className="mt-1.5 text-[10px] text-[#3d6e52]">
                      Zero waiting in line! Pay with Razorpay to unlock your Digital Exit Turnstile Gate Pass.
                    </p>
                  </div>

                  {/* Items in cart */}
                  <div className="space-y-2.5">
                    {cartItems.map((item) => (
                      <div
                        key={item.product.name}
                        className="flex items-center gap-3 rounded-2xl border border-[#e5e7eb] bg-white p-3 shadow-sm"
                      >
                        <div className="flex size-14 items-center justify-center rounded-xl overflow-hidden bg-white border border-[#f0f2f5] p-1">
                          {item.product.image ? (
                            <img src={item.product.image} alt={item.product.name} className="h-full w-full object-contain" />
                          ) : (
                            <ShoppingBag className="size-5 text-[#5b876e]/60" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="truncate text-[12px] font-bold text-[#173f31]">{item.product.name}</p>
                          <p className="text-[10px] text-muted-foreground">{item.product.size}</p>
                          <div className="mt-1 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => changeQty(item.product.name, -1)}
                                className="flex size-6 items-center justify-center rounded-lg border border-[#e5e7eb] text-xs font-bold"
                              >
                                −
                              </button>
                              <span className="text-[11px] font-bold">{item.qty}</span>
                              <button
                                onClick={() => changeQty(item.product.name, 1)}
                                className="flex size-6 items-center justify-center rounded-lg bg-[#dff0d8] text-xs font-bold text-[#21664b]"
                              >
                                +
                              </button>
                            </div>
                            <span className="text-[12px] font-bold text-[#173f31]">
                              ₹{item.product.price * item.qty}
                            </span>
                          </div>
                        </div>
                        <button onClick={() => removeItem(item.product.name)} className="text-gray-400 hover:text-red-500">
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Exit turnstile gate selector */}
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Select Store Exit Gate</p>
                    <div className="mt-2 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                      {['Turnstile Gate 2 (Express)', 'Turnstile Gate 1', 'Main Security Gate'].map((g, idx) => (
                        <button
                          key={g}
                          onClick={() => setSelectedSlot(g)}
                          className={`whitespace-nowrap rounded-full px-3 py-1.5 text-[10px] font-semibold transition-colors ${
                            idx === 0 ? 'bg-[#164e3b] text-white' : 'border border-[#e5e7eb] bg-white text-gray-700'
                          }`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Promo coupon section */}
                  <div className="rounded-2xl border border-[#e5e7eb] bg-white p-3.5">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#173f31]">
                      <Tag className="size-3.5 text-[#2e8b65]" /> Promo Code / Coupon
                    </div>
                    {appliedCoupon ? (
                      <div className="mt-2 flex items-center justify-between rounded-xl bg-[#e3f1dc] px-3 py-2 text-[11px] font-bold text-[#173f31]">
                        <span className="flex items-center gap-1.5">
                          <Check className="size-3.5 text-[#1f7956]" /> {appliedCoupon}
                        </span>
                        <button
                          onClick={() => {
                            setAppliedCoupon('')
                            setCouponDiscount(0)
                          }}
                          className="text-[10px] text-red-600 font-bold"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div className="mt-2 flex gap-2">
                        <input
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          placeholder="Try GB120 or FREESHIP"
                          className="flex-1 rounded-xl border border-[#e5e7eb] bg-[#f9fafb] px-3 py-1.5 text-[11px] outline-none"
                        />
                        <button
                          onClick={applyCoupon}
                          className="rounded-xl bg-[#164e3b] px-3 py-1.5 text-[11px] font-bold text-white"
                        >
                          Apply
                        </button>
                      </div>
                    )}
                  </div>

                  {/* In-Store Express Perks banner */}
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-3.5 text-[11px] text-[#164e3b]">
                    <div className="flex items-center gap-2 font-bold">
                      <ShieldCheck className="size-4 text-emerald-600" />
                      <span>Self-Billing Advantage</span>
                    </div>
                    <p className="mt-1 text-[10px] text-emerald-700">
                      Estimated ~15 minutes saved skipping the store billing line. Anti-theft tags automatically deactivated upon payment.
                    </p>
                  </div>

                  {/* Bill details */}
                  <div className="rounded-2xl border border-[#e5e7eb] bg-white p-3.5 text-[11px] space-y-2">
                    <p className="font-bold text-[#173f31]">Bill breakdown</p>
                    <div className="flex justify-between text-gray-600">
                      <span>Verified items ({cartCount})</span>
                      <span>₹{cartSubtotal}</span>
                    </div>
                    {effectiveCouponDiscount > 0 && (
                      <div className="flex justify-between font-bold text-[#1f7956]">
                        <span>Self-checkout coupon discount</span>
                        <span>-₹{effectiveCouponDiscount}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-gray-600">
                      <span>Express Self-Billing Line</span>
                      <span className="font-bold text-[#1f7956]">FREE (₹0)</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Digital Exit Pass Generation</span>
                      <span className="font-bold text-[#1f7956]">INCLUDED</span>
                    </div>
                    <div className="border-t border-[#f0f2ef] pt-2 flex justify-between text-[13px] font-bold text-[#173f31]">
                      <span>Total to Pay</span>
                      <span>₹{cartGrandTotal}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-[#e5e7eb] bg-white p-4 space-y-2.5">
                  <div className="flex items-center justify-between px-1">
                    <span className="text-[11px] font-bold text-gray-700">Payment method:</span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setPaymentMode('razorpay')}
                        className={`rounded-lg px-2.5 py-1 text-[10px] font-bold flex items-center gap-1 transition-all ${
                          paymentMode === 'razorpay'
                            ? 'bg-[#0c2340] text-white shadow-xs'
                            : 'border border-gray-200 bg-gray-50 text-gray-600'
                        }`}
                      >
                        <span className="text-[#3395ff] font-extrabold text-xs">R</span> Razorpay
                      </button>
                      <button
                        onClick={() => setPaymentMode('cod')}
                        className={`rounded-lg px-2.5 py-1 text-[10px] font-bold transition-all ${
                          paymentMode === 'cod'
                            ? 'bg-[#164e3b] text-white shadow-xs'
                            : 'border border-gray-200 bg-gray-50 text-gray-600'
                        }`}
                      >
                        COD
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (paymentMode === 'razorpay') {
                        setShowRazorpay(true)
                      } else {
                        handlePlaceOrder()
                      }
                    }}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#0c2340] py-3.5 text-[13px] font-bold text-white hover:bg-[#153459] transition-all shadow-md cursor-pointer"
                  >
                    {paymentMode === 'razorpay' ? (
                      <>
                        <span className="text-[#3395ff] font-extrabold text-sm">R</span>
                        <span>Pay with Razorpay · ₹{cartGrandTotal}</span>
                      </>
                    ) : (
                      <span>Place Order (Cash on Delivery) · ₹{cartGrandTotal}</span>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* ======================================================================= */}
        {/* MODAL 3: DIGITAL STORE EXIT PASS (SCAN & GO) */}
        {/* ======================================================================= */}
        {activeModal === 'order-placed' && (
          <div className="absolute inset-0 z-50 flex flex-col overflow-y-auto bg-[#fbfdf9] p-6 text-center animate-in fade-in zoom-in-95">
            {/* Security Verified Badge */}
            <div className="inline-flex items-center gap-1.5 self-center rounded-full border border-emerald-300 bg-emerald-50 px-4 py-1.5 shadow-sm text-emerald-800 text-[11px] font-bold">
              <ShieldCheck className="size-4 text-emerald-600" />
              <span>SECURITY VERIFIED · READY TO EXIT</span>
            </div>

            <h2 className="mt-3 text-[22px] font-extrabold text-[#173f31]">Digital Store Exit Pass</h2>
            <p className="mt-1 text-[12px] text-[#4b7861]">
              {currentStore} · Turnstile Exit #2
            </p>

            {paidPaymentId ? (
              <div className="mt-2.5 inline-flex items-center gap-1.5 self-center rounded-full bg-blue-50 px-3.5 py-1 text-[10px] font-bold text-[#0c2340] border border-blue-200">
                <ShieldCheck className="size-3.5 text-blue-600" />
                <span>Razorpay Verified: <code className="font-mono text-blue-700">{paidPaymentId}</code></span>
              </div>
            ) : (
              <div className="mt-2.5 inline-flex items-center gap-1.5 self-center rounded-full bg-emerald-50 px-3.5 py-1 text-[10px] font-bold text-emerald-800 border border-emerald-200">
                <ShieldCheck className="size-3.5 text-emerald-600" />
                <span>Payment Confirmed · Anti-Theft Tag Released</span>
              </div>
            )}

            {/* High-contrast Digital QR Code Pass */}
            <div className="mt-5 w-full flex flex-col items-center">
              <div className="rounded-2xl border-2 border-[#164e3b] bg-white p-5 shadow-md">
                <div className="relative size-44 flex items-center justify-center rounded-xl bg-white p-2">
                  <svg width="160" height="160" viewBox="0 0 180 180">
                    <rect x="10" y="10" width="46" height="46" rx="6" fill="#164e3b" />
                    <rect x="18" y="18" width="30" height="30" rx="3" fill="#ffffff" />
                    <rect x="25" y="25" width="16" height="16" rx="2" fill="#164e3b" />

                    <rect x="124" y="10" width="46" height="46" rx="6" fill="#164e3b" />
                    <rect x="132" y="18" width="30" height="30" rx="3" fill="#ffffff" />
                    <rect x="139" y="25" width="16" height="16" rx="2" fill="#164e3b" />

                    <rect x="10" y="124" width="46" height="46" rx="6" fill="#164e3b" />
                    <rect x="18" y="132" width="30" height="30" rx="3" fill="#ffffff" />
                    <rect x="25" y="139" width="16" height="16" rx="2" fill="#164e3b" />

                    <rect x="66" y="20" width="8" height="8" fill="#164e3b" />
                    <rect x="82" y="20" width="8" height="8" fill="#164e3b" />
                    <rect x="98" y="20" width="8" height="8" fill="#164e3b" />

                    <rect x="20" y="66" width="8" height="8" fill="#164e3b" />
                    <rect x="20" y="82" width="8" height="8" fill="#164e3b" />
                    <rect x="20" y="98" width="8" height="8" fill="#164e3b" />

                    <rect x="64" y="64" width="12" height="12" rx="2" fill="#164e3b" />
                    <rect x="84" y="64" width="12" height="12" rx="2" fill="#164e3b" />
                    <rect x="104" y="64" width="12" height="12" rx="2" fill="#164e3b" />
                    <rect x="124" y="64" width="12" height="12" rx="2" fill="#164e3b" />
                    <rect x="144" y="64" width="12" height="12" rx="2" fill="#164e3b" />

                    <rect x="64" y="84" width="12" height="12" rx="2" fill="#164e3b" />
                    <rect x="104" y="84" width="12" height="12" rx="2" fill="#164e3b" />
                    <rect x="144" y="84" width="12" height="12" rx="2" fill="#164e3b" />

                    <rect x="64" y="104" width="12" height="12" rx="2" fill="#164e3b" />
                    <rect x="84" y="104" width="12" height="12" rx="2" fill="#164e3b" />
                    <rect x="124" y="104" width="12" height="12" rx="2" fill="#164e3b" />

                    <rect x="64" y="124" width="12" height="12" rx="2" fill="#164e3b" />
                    <rect x="104" y="124" width="12" height="12" rx="2" fill="#164e3b" />
                    <rect x="124" y="124" width="12" height="12" rx="2" fill="#164e3b" />
                    <rect x="144" y="124" width="12" height="12" rx="2" fill="#164e3b" />

                    <rect x="78" y="78" width="24" height="24" rx="6" fill="#b7d66b" />
                    <path d="M85 90 L88 93 L95 86" stroke="#164e3b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#f0f9f3] px-3 py-1 text-[11px] font-mono font-bold text-[#164e3b]">
                  <Sparkles className="size-3" />
                  <span>{latestOrderId || '#GB-PASS-2501'}</span>
                </div>
              </div>
              <p className="mt-2 text-[11px] font-medium text-[#4b7861]">
                Flash this QR code at Optical Exit Turnstiles or show Store Security
              </p>
            </div>

            {/* Exit Guide */}
            <div className="mt-5 w-full rounded-2xl border border-[#d2e8cb] bg-[#f7fbf4] p-4 text-left space-y-2">
              <p className="text-[12px] font-bold text-[#173f31]">How to exit with Zero Queue:</p>
              <div className="space-y-2 text-[11px] text-[#305a46]">
                <div className="flex items-start gap-2">
                  <span className="flex size-4.5 items-center justify-center rounded-full bg-[#164e3b] text-white text-[9px] font-bold">1</span>
                  <span>Walk to the express <strong className="text-[#173f31]">Self-Billing Exit Lane</strong>.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="flex size-4.5 items-center justify-center rounded-full bg-[#164e3b] text-white text-[9px] font-bold">2</span>
                  <span>Point this QR code at the turnstile glass scanner.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="flex size-4.5 items-center justify-center rounded-full bg-[#164e3b] text-white text-[9px] font-bold">3</span>
                  <span>Gate automatically unlocks. <strong className="text-[#173f31]">Queue skipped completely!</strong></span>
                </div>
              </div>
            </div>

            <div className="mt-6 w-full space-y-2.5">
              <button
                onClick={() => {
                  setActiveModal('none')
                  setTab('Orders')
                }}
                className="w-full rounded-xl bg-[#164e3b] py-3.5 text-[13px] font-bold text-white shadow-md hover:bg-[#124031] transition-colors"
              >
                View in Saved Exit Passes
              </button>
              <button
                onClick={() => {
                  setActiveModal('none')
                  setTab('Scan')
                }}
                className="w-full rounded-xl border border-[#b7d66b] bg-[#f5fbf1] py-3.5 text-[13px] font-bold text-[#164e3b] hover:bg-[#ebf6e5] transition-colors"
              >
                Scan More In-Store Items
              </button>
            </div>
          </div>
        )}

        {/* AI Copilot Modal */}
        {activeModal === 'ai' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="relative flex max-h-[85vh] w-full max-w-lg flex-col rounded-3xl bg-[#fbfdf9] shadow-2xl overflow-hidden">
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-[#e5e7eb] bg-white px-5 py-3.5">
                <div className="flex items-center gap-2">
                  <div className="flex size-7 items-center justify-center rounded-lg bg-[#164e3b] text-white">
                    <Sparkles className="size-4" />
                  </div>
                  <div>
                    <h2 className="text-[13px] font-bold text-[#173f31]">grocerAI Shopping Copilot</h2>
                    <p className="text-[9px] font-semibold text-[#2e8b65]">● Online · Instant Cart AI</p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveModal('none')}
                  className="rounded-full p-1.5 hover:bg-muted text-gray-500"
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3.5 max-h-[55vh]">
                {aiMessages.map((msg) => {
                  const isUser = msg.sender === 'user'
                  return (
                    <div key={msg.id} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                      <div
                        className={`max-w-[90%] rounded-2xl p-3.5 text-[12px] leading-5 ${
                          isUser
                            ? 'rounded-tr-none bg-[#164e3b] text-white'
                            : 'rounded-tl-none border border-[#e5e7eb] bg-white text-[#1f2937] shadow-sm'
                        }`}
                      >
                        {!isUser && (
                          <div className="mb-1 flex items-center gap-1 text-[10px] font-bold text-[#2e8b65]">
                            <Bot className="size-3" /> grocerAI
                          </div>
                        )}
                        <p>{msg.text}</p>
                      </div>

                      {/* Recipe card */}
                      {msg.recipe && (
                        <div className="mt-2.5 w-full rounded-2xl border border-[#cfe7c2] bg-[#f7fcf4] p-3 text-[11px]">
                          <div className="flex items-center gap-1.5 font-bold text-[#164e3b]">
                            <ChefHat className="size-4" /> {msg.recipe.title}
                          </div>
                          <div className="mt-1 flex gap-3 text-[10px] text-[#4b7861]">
                            <span>⏱ {msg.recipe.prep}</span>
                            <span>👥 {msg.recipe.servings}</span>
                            <span>🔥 {msg.recipe.calories}</span>
                          </div>
                          <div className="mt-2 space-y-1 border-t border-[#e2f1db] pt-1.5 text-[10px] text-gray-700">
                            {msg.recipe.steps.map((st, i) => (
                              <p key={i}>
                                <b className="text-[#164e3b]">{i + 1}.</b> {st}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Ingredient bundle */}
                      {msg.bundle && msg.bundle.length > 0 && (
                        <div className="mt-2.5 w-full rounded-2xl border border-[#e5e7eb] bg-white p-3 shadow-sm">
                          <div className="flex items-center justify-between text-[11px] font-bold text-[#173f31]">
                            <span>Ingredients in Stock ({msg.bundle.length})</span>
                            <span className="text-[#2e8b65]">
                              ₹{msg.bundle.reduce((s, b) => s + b.product.price * b.qty, 0)}
                            </span>
                          </div>
                          <div className="mt-2 space-y-1.5">
                            {msg.bundle.map((it) => (
                              <div
                                key={it.product.name}
                                className="flex items-center justify-between rounded-xl bg-[#f9fafb] p-2 text-[10px]"
                              >
                                <div>
                                  <p className="font-bold text-[#173f31]">{it.product.name}</p>
                                  <p className="text-muted-foreground">{it.reason}</p>
                                </div>
                                <button
                                  onClick={() => {
                                    addToCart(it.product, it.qty)
                                    showNotice(`Added ${it.product.name} to cart!`)
                                  }}
                                  className="rounded-lg bg-[#dff0d8] px-2 py-1 font-bold text-[#21664b] hover:bg-[#cde4c4]"
                                >
                                  + ₹{it.product.price}
                                </button>
                              </div>
                            ))}
                          </div>
                          <button
                            onClick={() => {
                              msg.bundle?.forEach((b) => addToCart(b.product, b.qty))
                              showNotice(`Added ${msg.bundle?.length ?? 0} items to cart!`)
                              setActiveModal('cart')
                            }}
                            className="mt-3 w-full rounded-xl bg-[#164e3b] py-2 text-[11px] font-bold text-white shadow-sm hover:bg-[#124031]"
                          >
                            Add All to Cart & Checkout →
                          </button>
                        </div>
                      )}

                      {/* Chips */}
                      {msg.chips && (
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {msg.chips.map((ch) => (
                            <button
                              key={ch}
                              onClick={() => sendAiQuery(ch)}
                              className="rounded-full border border-[#b7d66b] bg-[#f6fbf2] px-2.5 py-1 text-[10px] font-semibold text-[#1f7956] hover:bg-[#e4f3da]"
                            >
                              {ch}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Chat Input */}
              <div className="border-t border-[#e5e7eb] bg-white p-3">
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    sendAiQuery(aiInput)
                  }}
                  className="flex items-center gap-2 rounded-2xl border border-[#e5e7eb] bg-[#f9fafb] px-3 py-1.5"
                >
                  <input
                    value={aiInput}
                    onChange={(e) => setAiInput(e.target.value)}
                    placeholder="Ask for dinner recipes, diet meal plans, budget baskets…"
                    className="flex-1 bg-transparent text-[11px] outline-none text-[#173f31]"
                  />
                  <button
                    type="submit"
                    className="flex size-7 items-center justify-center rounded-xl bg-[#164e3b] text-white hover:bg-[#124031]"
                  >
                    <Send className="size-3.5" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
        {/* Razorpay Checkout Modal */}
        {showRazorpay && (
          <RazorpayCheckoutModal
            amount={cartGrandTotal}
            orderId={`#GB-${2501 + placedOrdersList.length}`}
            storeName={currentStore}
            itemsCount={cartCount}
            onSuccess={(paymentId) => {
              setShowRazorpay(false)
              handlePlaceOrder(paymentId)
            }}
            onCancel={() => setShowRazorpay(false)}
          />
        )}
      </div>
    </div>
  )
}
