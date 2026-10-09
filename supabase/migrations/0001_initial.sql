-- Supabase Migration: 0001_initial.sql

-- 1. Customers Table (Extends Supabase Auth)
CREATE TABLE IF NOT EXISTS public.customers (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    phone_number TEXT,
    loyalty_points INTEGER DEFAULT 0,
    push_token TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Stores Table
CREATE TABLE IF NOT EXISTS public.stores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    city TEXT NOT NULL,
    address TEXT NOT NULL,
    lat DOUBLE PRECISION,
    lng DOUBLE PRECISION,
    status TEXT DEFAULT 'Healthy',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Products Catalog
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    barcode TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    size TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Store Inventory
CREATE TABLE IF NOT EXISTS public.store_inventory (
    store_id UUID REFERENCES public.stores(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    stock_quantity INTEGER DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (store_id, product_id)
);

-- 5. Orders (Cart -> Checkout -> Verified)
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number TEXT UNIQUE NOT NULL,
    customer_id UUID REFERENCES public.customers(id),
    store_id UUID REFERENCES public.stores(id),
    total_amount DECIMAL(10, 2) NOT NULL,
    payment_status TEXT DEFAULT 'PENDING', -- PENDING, SUCCESS, FAILED
    payment_reference TEXT,
    verification_status TEXT DEFAULT 'PENDING', -- PENDING, VERIFIED
    verification_staff_id UUID,
    verified_at TIMESTAMPTZ,
    exit_qr_code TEXT UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Order Items
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id),
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Product Suggestions
CREATE TABLE IF NOT EXISTS public.product_suggestions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES public.customers(id),
    store_id UUID REFERENCES public.stores(id),
    product_name TEXT NOT NULL,
    category TEXT,
    reason TEXT,
    status TEXT DEFAULT 'PENDING', -- PENDING, APPROVED, REJECTED, FULFILLED
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Restock Subscriptions
CREATE TABLE IF NOT EXISTS public.restock_subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES public.customers(id),
    product_id UUID REFERENCES public.products(id),
    store_id UUID REFERENCES public.stores(id),
    notified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(customer_id, product_id, store_id)
);

-- Row Level Security (RLS)
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_suggestions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.restock_subscriptions ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Customers can view their own profile" ON public.customers FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Customers can update their own profile" ON public.customers FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Customers can view their own orders" ON public.orders FOR SELECT USING (auth.uid() = customer_id);
CREATE POLICY "Customers can insert their own orders" ON public.orders FOR INSERT WITH CHECK (auth.uid() = customer_id);
CREATE POLICY "Customers can view their suggestions" ON public.product_suggestions FOR SELECT USING (auth.uid() = customer_id);
CREATE POLICY "Customers can insert suggestions" ON public.product_suggestions FOR INSERT WITH CHECK (auth.uid() = customer_id);
