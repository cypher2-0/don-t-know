import { ShoppingBag, Star } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';

import type { CustomerProduct } from '@/lib/mock-data';
import { useCart } from './cart-provider';

export function ProductCard({
  product,
  onAdd,
}: {
  product: CustomerProduct;
  onAdd?: () => void;
}) {
  const { getItemQty, changeQty, addToCart } = useCart();
  const qty = getItemQty(product.name);

  return (
    <Pressable
      onPress={() => router.push(`/product/${encodeURIComponent(product.name)}`)}
      className="mb-3 w-[48%] rounded-2xl border border-[#e5e7eb] bg-white p-3 shadow-sm active:opacity-95">
      <View className={`relative h-24 items-center justify-center rounded-xl ${product.color}`}>
        <ShoppingBag size={36} color="#5b876e" opacity={0.5} />
        {product.discount ? (
          <View className="absolute left-2 top-2 rounded-full bg-[#164e3b] px-1.5 py-0.5">
            <Text className="text-[8px] font-bold text-white">{product.discount}</Text>
          </View>
        ) : null}
      </View>
      <Text numberOfLines={1} className="mt-2.5 text-[12px] font-bold text-[#173f31]">
        {product.name}
      </Text>
      <View className="mt-0.5 flex-row items-center justify-between">
        <Text className="text-[10px] text-[#6b7280]">{product.size}</Text>
        {product.rating ? (
          <View className="flex-row items-center gap-0.5">
            <Star size={10} color="#eab308" fill="#eab308" />
            <Text className="text-[9px] font-semibold text-[#4b5563]">{product.rating}</Text>
          </View>
        ) : null}
      </View>
      <View className="mt-2.5 flex-row items-center justify-between">
        <Text className="text-[13px] font-bold text-[#173f31]">₹{product.price}</Text>
        {qty > 0 ? (
          <View className="flex-row items-center rounded-lg bg-[#dff0d8] px-1 py-0.5">
            <Pressable
              onPress={(e) => {
                e.stopPropagation?.();
                changeQty(product.name, -1);
              }}
              hitSlop={6}
              className="size-5 items-center justify-center">
              <Text className="text-[13px] font-bold text-[#21664b]">−</Text>
            </Pressable>
            <Text className="min-w-4 text-center text-[11px] font-bold text-[#21664b]">{qty}</Text>
            <Pressable
              onPress={(e) => {
                e.stopPropagation?.();
                changeQty(product.name, 1);
              }}
              hitSlop={6}
              className="size-5 items-center justify-center">
              <Text className="text-[13px] font-bold text-[#21664b]">+</Text>
            </Pressable>
          </View>
        ) : (
          <Pressable
            onPress={(e) => {
              e.stopPropagation?.();
              if (onAdd) onAdd();
              else addToCart(product, 1);
            }}
            hitSlop={6}
            className="rounded-lg bg-[#dff0d8] px-2.5 py-1">
            <Text className="text-[11px] font-bold text-[#21664b]">+ Add</Text>
          </Pressable>
        )}
      </View>
    </Pressable>
  );
}
