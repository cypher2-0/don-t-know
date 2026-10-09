import { createContext, useCallback, useContext, useMemo, useState, type PropsWithChildren } from 'react';

import { customerProducts, type CustomerProduct } from '@/lib/mock-data';

export type CartItem = { product: CustomerProduct; qty: number };

export type PlacedOrderItem = {
  name: string;
  qty: number;
  price: number;
  size: string;
};

export type PlacedOrder = {
  id: string;
  date: string;
  items: number;
  total: number;
  finalPaid?: number;
  paymentMethod?: string;
  discount?: number;
  tip?: number;
  delivery?: number;
  status: string;
  slot?: string;
  itemsList?: PlacedOrderItem[];
};

export type PlaceOrderOptions = {
  slot?: string;
  paymentMethod?: string;
  discount?: number;
  tip?: number;
  delivery?: number;
};

type CartValue = {
  items: CartItem[];
  count: number;
  total: number;
  getItemQty: (name: string) => number;
  addToCart: (product: CustomerProduct, qty?: number) => void;
  changeQty: (name: string, delta: number) => void;
  removeItem: (name: string) => void;
  clearCart: () => void;
  placedOrders: PlacedOrder[];
  placeOrder: (options?: PlaceOrderOptions | string) => PlacedOrder;
  reorder: (orderItems: PlacedOrderItem[]) => void;
};

const CartContext = createContext<CartValue | null>(null);

export function CartProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [placedOrders, setPlacedOrders] = useState<PlacedOrder[]>([]);

  const getItemQty = useCallback(
    (name: string) => items.find((i) => i.product.name === name)?.qty ?? 0,
    [items],
  );

  const addToCart = useCallback((product: CustomerProduct, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.name === product.name);
      if (existing) {
        return prev.map((i) =>
          i.product.name === product.name ? { ...i, qty: i.qty + qty } : i,
        );
      }
      return [...prev, { product, qty }];
    });
  }, []);

  const changeQty = useCallback((name: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((i) => (i.product.name === name ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0),
    );
  }, []);

  const removeItem = useCallback((name: string) => {
    setItems((prev) => prev.filter((i) => i.product.name !== name));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const count = items.reduce((sum, i) => sum + i.qty, 0);
  const total = items.reduce((sum, i) => sum + i.qty * i.product.price, 0);

  const placeOrder = useCallback(
    (options?: PlaceOrderOptions | string): PlacedOrder => {
      const opts = typeof options === 'string' ? { slot: options } : (options ?? {});
      const slot = opts.slot ?? 'In 20 mins';
      const paymentMethod = opts.paymentMethod ?? 'UPI';
      const discount = opts.discount ?? 0;
      const tip = opts.tip ?? 0;
      const delivery = opts.delivery ?? 0;
      const finalPaid = Math.max(0, total - discount + delivery + tip);

      const currentItems: PlacedOrderItem[] = items.map((i) => ({
        name: i.product.name,
        qty: i.qty,
        price: i.product.price,
        size: i.product.size,
      }));

      const order: PlacedOrder = {
        id: `#GB-${2501 + placedOrders.length}`,
        date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
        items: count,
        total,
        finalPaid,
        paymentMethod,
        discount,
        tip,
        delivery,
        status: 'Confirmed',
        slot,
        itemsList: currentItems,
      };
      setPlacedOrders((prev) => [order, ...prev]);
      setItems([]);
      return order;
    },
    [count, total, items, placedOrders.length],
  );

  const reorder = useCallback((orderItems: PlacedOrderItem[]) => {
    setItems((prev) => {
      const copy = [...prev];
      for (const item of orderItems) {
        const found = customerProducts.find((p) => p.name === item.name);
        if (found) {
          const idx = copy.findIndex((ci) => ci.product.name === item.name);
          if (idx >= 0) {
            copy[idx] = { ...copy[idx], qty: copy[idx].qty + item.qty };
          } else {
            copy.push({ product: found, qty: item.qty });
          }
        }
      }
      return copy;
    });
  }, []);

  const value = useMemo(
    () => ({
      items,
      count,
      total,
      getItemQty,
      addToCart,
      changeQty,
      removeItem,
      clearCart,
      placedOrders,
      placeOrder,
      reorder,
    }),
    [items, count, total, getItemQty, addToCart, changeQty, removeItem, clearCart, placedOrders, placeOrder, reorder],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
