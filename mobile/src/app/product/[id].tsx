import {
  Check,
  ChevronLeft,
  Clock3,
  MapPin,
  Minus,
  Plus,
  ShoppingBag,
  Star,
} from "lucide-react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useCart } from "@/components/cart-provider";
import { ProductCard } from "@/components/product-card";
import { Screen } from "@/components/screen";
import {
  customerProducts,
  productDescription,
  storeInfo,
} from "@/lib/mock-data";

export default function ProductScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const name = decodeURIComponent(String(id ?? ""));
  const product = customerProducts.find((p) => p.name === name);
  const { addToCart, count } = useCart();
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const insets = useSafeAreaInsets();

  if (!product) {
    return (
      <Screen>
        <View className="flex-1 items-center justify-center px-8">
          <Text className="text-[14px] font-bold text-[#173f31]">
            Product not found
          </Text>
          <Pressable
            onPress={() => router.back()}
            className="mt-4 rounded-xl bg-[#164e3b] px-4 py-3"
          >
            <Text className="text-[12px] font-semibold text-white">
              Go back
            </Text>
          </Pressable>
        </View>
      </Screen>
    );
  }

  const related = customerProducts
    .filter((p) => p.category === product.category && p.name !== product.name)
    .slice(0, 4);

  const handleAdd = () => {
    addToCart(product, qty);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2200);
  };

  return (
    <Screen>
      <View className="flex-row items-center justify-between px-5 pb-3 pt-4">
        <Pressable
          onPress={() => router.back()}
          hitSlop={8}
          className="size-9 items-center justify-center rounded-xl border border-[#e5e7eb] bg-white"
        >
          <ChevronLeft size={18} color="#173f31" />
        </Pressable>
        <Text className="text-[12px] font-bold text-[#173f31]">
          Product details
        </Text>
        <Pressable
          onPress={() => router.push("/cart")}
          hitSlop={8}
          className="relative size-9 items-center justify-center rounded-xl border border-[#e5e7eb] bg-white"
        >
          <ShoppingBag size={16} color="#173f31" />
          {count > 0 && (
            <View className="absolute -right-1 -top-1 size-4 items-center justify-center rounded-full bg-[#164e3b]">
              <Text className="text-[9px] font-bold text-white">{count}</Text>
            </View>
          )}
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }}
      >
        <View
          className={`relative h-60 items-center justify-center rounded-3xl ${product.color}`}
        >
          <ShoppingBag size={72} color="#5b876e" opacity={0.5} />
          {product.discount && (
            <View className="absolute left-4 top-4 rounded-full bg-[#164e3b] px-2.5 py-1">
              <Text className="text-[10px] font-bold text-white">
                {product.discount}
              </Text>
            </View>
          )}
        </View>

        <View className="mt-5 flex-row items-start justify-between gap-3">
          <View className="flex-1">
            <Text className="text-[18px] font-bold text-[#173f31]">
              {product.name}
            </Text>
            <View className="mt-1 flex-row items-center gap-2">
              <Text className="text-[11px] text-[#6b7280]">
                {product.size} · {product.category}
              </Text>
              {product.rating && (
                <View className="flex-row items-center gap-1 rounded-md bg-[#fef9c3] px-1.5 py-0.5">
                  <Star size={10} color="#ca8a04" fill="#ca8a04" />
                  <Text className="text-[10px] font-bold text-[#854d0e]">
                    {product.rating}
                  </Text>
                </View>
              )}
            </View>
          </View>
          <Text className="text-[20px] font-bold text-[#173f31]">
            ₹{product.price}
          </Text>
        </View>

        <View className="mt-3 flex-row items-center gap-2">
          <View className="self-start rounded-full bg-[#e3f1dc] px-2.5 py-1">
            <Text className="text-[9px] font-bold text-[#2e8b65]">
              In stock
            </Text>
          </View>
          <View className="self-start rounded-full bg-[#f3f4f6] px-2.5 py-1">
            <Text className="text-[9px] font-semibold text-[#4b5563]">
              100% Genuine
            </Text>
          </View>
        </View>

        <View className="mt-4 gap-2.5 rounded-2xl border border-[#e5e7eb] bg-white p-4">
          <View className="flex-row items-center gap-2.5">
            <Clock3 size={14} color="#2e8b65" />
            <Text className="text-[11px] text-[#374151]">
              Delivery in 20 mins · free over ₹499
            </Text>
          </View>
          <View className="flex-row items-center gap-2.5">
            <MapPin size={14} color="#2e8b65" />
            <Text className="text-[11px] text-[#374151]">
              {storeInfo.name} · {storeInfo.distance}
            </Text>
          </View>
        </View>

        <Text className="mt-5 text-[11px] font-bold uppercase tracking-wider text-[#6b7280]">
          Description & Quality
        </Text>
        <Text className="mt-2 text-[12px] leading-5 text-[#374151]">
          {productDescription(product.category)}
        </Text>

        <View className="mt-6 flex-row items-center justify-between rounded-2xl border border-[#e5e7eb] bg-white p-4">
          <View>
            <Text className="text-[12px] font-semibold text-[#173f31]">
              Select quantity
            </Text>
            <Text className="mt-0.5 text-[10px] text-[#6b7280]">
              Total: ₹{product.price * qty}
            </Text>
          </View>
          <View className="flex-row items-center gap-4">
            <Pressable
              onPress={() => setQty((q) => Math.max(1, q - 1))}
              className="size-8 items-center justify-center rounded-lg border border-[#e5e7eb] bg-white"
            >
              <Minus size={14} color="#173f31" />
            </Pressable>
            <Text className="w-5 text-center text-[14px] font-bold text-[#173f31]">
              {qty}
            </Text>
            <Pressable
              onPress={() => setQty((q) => Math.min(20, q + 1))}
              className="size-8 items-center justify-center rounded-lg bg-[#dff0d8]"
            >
              <Plus size={14} color="#21664b" />
            </Pressable>
          </View>
        </View>

        {related.length > 0 && (
          <View className="mt-7">
            <Text className="text-[13px] font-bold text-[#173f31]">
              More in {product.category}
            </Text>
            <View className="mt-3 flex-row flex-wrap justify-between">
              {related.map((item) => (
                <ProductCard key={item.name} product={item} />
              ))}
            </View>
          </View>
        )}
      </ScrollView>

      <View
        className="border-t border-[#e5e7eb] bg-white px-5 pt-3"
        style={{ paddingBottom: Math.max(insets.bottom, 14) + 4 }}
      >
        {justAdded ? (
          <View className="flex-row gap-2">
            <View className="flex-1 flex-row items-center justify-center gap-1.5 rounded-xl bg-[#2e8b65] py-3.5">
              <Check size={16} color="#ffffff" />
              <Text className="text-[13px] font-bold text-white">
                Added ({qty})
              </Text>
            </View>
            <Pressable
              onPress={() => router.push("/cart")}
              className="rounded-xl border border-[#164e3b] bg-white px-5 py-3.5"
            >
              <Text className="text-[13px] font-bold text-[#164e3b]">
                View Cart ({count})
              </Text>
            </Pressable>
          </View>
        ) : (
          <Pressable
            onPress={handleAdd}
            className="items-center rounded-xl bg-[#164e3b] py-3.5 active:opacity-90"
          >
            <Text className="text-[13px] font-bold text-white">
              Add to cart · ₹{product.price * qty}
            </Text>
          </Pressable>
        )}
      </View>
    </Screen>
  );
}
