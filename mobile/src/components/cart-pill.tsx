import { Alert, Pressable, Text, View } from 'react-native';

import { useCart } from '@/components/cart-provider';

export function CartPill() {
  const { cart } = useCart();
  if (cart <= 2) return null;
  return (
    <View className="px-4 pb-3">
      <View className="flex-row items-center justify-between rounded-xl bg-[#173f31] px-4 py-3 shadow-lg">
        <Text className="text-[12px] font-semibold text-white">{cart} items in cart</Text>
        <Pressable
          hitSlop={8}
          onPress={() => Alert.alert('Your cart', `${cart} items · GreenBasket Indiranagar`)}>
          <Text className="text-[10px] font-bold text-[#d0efad]">View cart →</Text>
        </Pressable>
      </View>
    </View>
  );
}
