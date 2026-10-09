import { createContext, useContext, useMemo, useState, type PropsWithChildren } from 'react';

type CartValue = { cart: number; addToCart: () => void };

const CartContext = createContext<CartValue>({ cart: 0, addToCart: () => {} });

export function CartProvider({ children }: PropsWithChildren) {
  const [cart, setCart] = useState(2);
  const value = useMemo(() => ({ cart, addToCart: () => setCart((c) => c + 1) }), [cart]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
