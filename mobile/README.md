# grocerAI · customer mobile app

A standalone Expo app for shopping at GreenBasket — ported from the customer view of the Next.js web dashboard.

**Fully self-contained**: own `pnpm-lock.yaml`, own store, no imports from the rest of the repo. It can be moved into its own repository as-is.

## Run it

```bash
cd mobile
pnpm install
pnpm start          # scan the QR code with Expo Go, or press a / i
```

Other scripts: `pnpm run android`, `pnpm run ios`, `pnpm run web`.

## What's inside

- **Browse** — home feed with search, category filters, pull-to-refresh
- **Product detail** — qty stepper, delivery info, add to cart
- **Cart & checkout** — qty management, delivery slot, bill details, free delivery over ₹499
- **Orders** — placed orders appear at the top with live status; history below
- **Explore / Scan / Profile** tabs

## Stack

- **Expo SDK 57** (React Native 0.86, React 19.2, TypeScript 6)
- **Expo Router** — file-based routes, tabs in `src/app/(tabs)/`, cart/product as stack + modal screens
- **NativeWind 4.2.7** — Tailwind classes, same design language as the web app
- **lucide-react-native** — same icon set as `lucide-react` on web

## Structure

```
src/app/
  _layout.tsx        Stack root (tabs + product/cart/order-placed)
  (tabs)/            Home, Explore, Scan, Orders, Profile
  product/[id].tsx   product detail
  cart.tsx           cart + checkout (modal)
  order-placed.tsx   confirmation (modal)
src/components/      Logo, ProductCard, CategoryChips, CartPill, Screen…
src/lib/mock-data.ts products, store, slots, order history
```

Cart and placed orders live in `CartProvider` (`src/components/cart-provider.tsx`) — in-memory only, resets on reload.

> The **Admin** chip on Home points at the web dashboard; there is no admin UI in this app.
