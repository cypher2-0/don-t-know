import { ChevronDown, MapPin, Search, Trophy } from 'lucide-react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, ScrollView, Text, TextInput, View } from 'react-native';

import { useCart } from '@/components/cart-provider';
import { CartPill } from '@/components/cart-pill';
import { CategoryChips } from '@/components/category-chips';
import { Logo } from '@/components/logo';
import { ProductCard } from '@/components/product-card';
import { Screen } from '@/components/screen';
import { customerProducts } from '@/lib/mock-data';

export default function HomeScreen() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const { addToCart } = useCart();

  const filtered = customerProducts.filter(
    (p) =>
      (category === 'All' || p.category === category) &&
      p.name.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <Screen>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }}>
        <View className="flex-row items-center justify-between pb-3 pt-6">
          <Logo />
          <Pressable
            onPress={() => Alert.alert('Admin console', 'The admin dashboard lives on the web app.')}
            className="rounded-lg border border-[#e5e7eb] bg-white px-2 py-1">
            <Text className="text-[10px] font-semibold text-[#173f31]">Admin</Text>
          </Pressable>
        </View>

        <View className="mt-2 flex-row items-center justify-between rounded-2xl bg-[#e3f1dc] p-4">
          <View className="flex-1 pr-3">
            <Text className="text-[10px] font-semibold text-[#327255]">Shopping at</Text>
            <Text className="mt-1 text-[14px] font-bold text-[#173f31]">GreenBasket · Indiranagar</Text>
            <View className="mt-1 flex-row items-center gap-1">
              <MapPin size={12} color="#4b7861" />
              <Text className="text-[10px] text-[#4b7861]">1.2 km away · Open until 10 PM</Text>
            </View>
          </View>
          <ChevronDown size={16} color="#327255" />
        </View>

        <View className="mt-4 flex-row items-center gap-2 rounded-xl border border-[#e5e7eb] bg-white px-3 py-3">
          <Search size={16} color="#6b7280" />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search for milk, atta, snacks..."
            placeholderTextColor="#6b7280"
            className="flex-1 p-0 text-[12px] text-[#173f31]"
          />
        </View>

        <View className="mt-6 flex-row items-center justify-between">
          <Text className="text-[18px] font-bold text-[#173f31]">Good morning, Arjun</Text>
          <Text className="text-[10px] font-bold text-[#2e8b65]">2,480 pts</Text>
        </View>

        <View className="mt-4">
          <CategoryChips selected={category} onSelect={setCategory} />
        </View>

        <View className="mt-6 flex-row items-center justify-between">
          <Text className="text-[15px] font-bold text-[#173f31]">Picked for you</Text>
          <Pressable onPress={() => router.push('/explore')}>
            <Text className="text-[10px] font-bold text-[#2e8b65]">See all</Text>
          </Pressable>
        </View>

        <View className="mt-3 flex-row flex-wrap justify-between">
          {filtered.map((p) => (
            <ProductCard key={p.name} product={p} onAdd={addToCart} />
          ))}
        </View>
        {filtered.length === 0 && (
          <Text className="mt-6 text-center text-[12px] text-[#6b7280]">No items match your search.</Text>
        )}

        <View className="mt-3 rounded-2xl bg-[#164e3b] p-4">
          <View className="flex-row items-center justify-between">
            <View className="flex-1 pr-3">
              <Text className="text-[10px] text-[#b5d8b5]">Smart savings</Text>
              <Text className="mt-1 text-[14px] font-bold text-white">Get ₹120 off your next bill</Text>
              <Text className="mt-1 text-[10px] text-[#c1dcc6]">Use your 2,480 loyalty points</Text>
            </View>
            <Trophy size={32} color="#b6d669" />
          </View>
        </View>
      </ScrollView>
      <CartPill />
    </Screen>
  );
}
