# grocerAI · customer mobile app

Expo port of the customer shopping app from the Next.js web dashboard (`../components/grocery-dashboard.tsx` → `CustomerApp`).

## Run it

```bash
# from the repo root (pnpm workspace)
pnpm install
cd mobile
pnpm start          # scan the QR code with Expo Go, or press a / i
```

Other scripts: `pnpm run android`, `pnpm run ios`, `pnpm run web`.

## Stack

- **Expo SDK 57** (React Native 0.86, React 19.2, TypeScript 6)
- **Expo Router** — file-based tabs in `src/app`
- **NativeWind 4.2.7** — Tailwind classes, same design language as the web app
- **lucide-react-native** — same icon set as `lucide-react` on web

## Structure

```
src/app/          routes: index (home), explore, scan, orders, profile
src/components/   Logo, ProductCard, CategoryChips, CartPill, Screen, PageHeader
src/lib/          app data + re-export of shared ../lib/mock-data (repo root)
```

Mock data lives at the workspace root (`lib/mock-data.ts`) and is shared with the web app — Metro watches the repo root via `metro.config.js`.

## Notes

- Cart state is app-wide (`CartProvider` in `src/app/_layout.tsx`); the cart pill appears above the tab bar once more than 2 items are added.
- The **Admin** chip on Home points at the web dashboard — there is no admin UI in this app.
