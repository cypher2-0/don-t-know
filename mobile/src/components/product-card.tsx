import { ShoppingBag } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

import type { CustomerProduct } from '@/lib/mock-data';

export function ProductCard({ product, onAdd }: { product: CustomerProduct; onAdd: () => void }) {
  return (
    <View className="mb-3 w-[48%] rounded-2xl border border-[#e5e7eb] bg-white p-3 shadow-sm">
      <View className={`h-24 items-center justify-center rounded-xl ${product.color}`}>
        <ShoppingBag size={36} color="#5b876e" opacity={0.5} />
      </View>
      <Text className="mt-3 text-[11px] font-bold text-[#173f31]">{product.name}</Text>
      <Text className="mt-1 text-[10px] text-[#6b7280]">{product.size} · In stock</Text>
      <View className="mt-3 flex-row items-center justify-between">
        <Text className="text-[14px] font-bold text-[#173f31]">₹{product.price}</Text>
        <Pressable onPress={onAdd} hitSlop={6} className="size-7 items-center justify-center rounded-lg bg-[#dff0d8]">
          <Text className="text-[16px] font-medium text-[#21664b]">+</Text>
        </Pressable>
      </View>
    </View>
  );
}
