import '../global.css';

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { CartProvider } from '@/components/cart-provider';

export default function RootLayout() {
  return (
    <CartProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#fbfdf9' },
        }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="product/[id]" />
        <Stack.Screen name="cart" options={{ presentation: 'modal' }} />
        <Stack.Screen
          name="order-placed"
          options={{ presentation: 'modal', gestureEnabled: false }}
        />
      </Stack>
    </CartProvider>
  );
}
