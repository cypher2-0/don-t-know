import { router } from 'expo-router';
import { ShoppingBag } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

import { useCart } from '@/components/cart-provider';

export function CartPill() {
  const { count, total } = useCart();
  if (count === 0) return null;
  return (
    <View className="px-4 pb-3">
      <Pressable
        onPress={() => router.push('/cart')}
        className="flex-row items-center justify-between rounded-2xl bg-[#173f31] px-4 py-3.5 shadow-xl active:opacity-90">
        <View className="flex-row items-center gap-2.5">
          <View className="size-7 items-center justify-center rounded-lg bg-[#2e8b65]">
            <ShoppingBag size={14} color="#ffffff" />
          </View>
          <View>
            <Text className="text-[12px] font-bold text-white">
              {count} {count === 1 ? 'item' : 'items'} · ₹{total}
            </Text>
            <Text className="text-[9px] text-[#bbf7d0]">🔒 In-Store Basket · Skip the billing line</Text>
          </View>
        </View>
        <View className="rounded-xl bg-[#2e8b65] px-3 py-1.5">
          <Text className="text-[11px] font-bold text-white">Self-Checkout →</Text>
        </View>
      </Pressable>
    </View>
  );
}
