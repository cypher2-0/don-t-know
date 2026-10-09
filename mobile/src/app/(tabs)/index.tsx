import { useState } from 'react';
import { Bell, ChevronDown, MapPin, Search, Sparkles, Trophy, X } from 'lucide-react-native';
import { router } from 'expo-router';
import {
  Alert,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';

import { useCart } from '@/components/cart-provider';
import { CartPill } from '@/components/cart-pill';
import { CategoryChips } from '@/components/category-chips';
import { Logo } from '@/components/logo';
import { ProductCard } from '@/components/product-card';
import { Screen } from '@/components/screen';
import { customerProducts, storeInfo, storesList } from '@/lib/mock-data';

export default function HomeScreen() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [refreshing, setRefreshing] = useState(false);
  const [activeStore, setActiveStore] = useState(storeInfo.name);
  const { addToCart } = useCart();

  const filtered = customerProducts.filter(
    (p) =>
      (category === 'All' || p.category === category) &&
      p.name.toLowerCase().includes(query.trim().toLowerCase()),
  );

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  };

  const handleStorePress = () => {
    Alert.alert(
      'Select Store Location',
      'Choose the store you are currently inside:',
      [
        ...storesList.map((s) => ({
          text: s.name,
          onPress: () => setActiveStore(s.name),
        })),
        { text: 'Cancel', style: 'cancel' },
      ],
    );
  };

  const handleRewardPress = () => {
    Alert.alert(
      'Smart Savings Reward',
      'You have 2,480 loyalty points! Use promo code "GB120" at checkout for ₹120 off orders over ₹250.',
      [
        { text: 'Got it', style: 'cancel' },
        { text: 'View cart', onPress: () => router.push('/cart') },
      ],
    );
  };

  return (
    <Screen>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#2e8b65"
            colors={['#2e8b65']}
          />
        }
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }}>
        <View className="flex-row items-center justify-between pb-3 pt-6">
          <Logo />
          <Pressable
            onPress={() => Alert.alert('Notifications', 'All orders are on schedule. No urgent notifications.')}
            className="size-9 items-center justify-center rounded-xl border border-[#e5e7eb] bg-white active:bg-[#f3f4f6]">
            <Bell size={18} color="#173f31" />
          </Pressable>
        </View>

        {/* In-Store Location Beacon Card */}
        <Pressable
          onPress={handleStorePress}
          className="mt-2 flex-row items-center justify-between rounded-2xl bg-[#e3f1dc] p-4 active:opacity-90">
          <View className="flex-1 pr-3">
            <View className="flex-row items-center gap-1.5">
              <View className="size-2 rounded-full bg-emerald-600" />
              <Text className="text-[10px] font-bold tracking-wider text-[#327255]">STORE BEACON CONNECTED</Text>
            </View>
            <Text className="mt-1 text-[15px] font-extrabold text-[#173f31]">{activeStore}</Text>
            <View className="mt-1 flex-row items-center gap-1">
              <MapPin size={12} color="#4b7861" />
              <Text className="text-[10px] text-[#4b7861]">
                {storeInfo.distance} · {storeInfo.exitGate} · 0 Min Wait
              </Text>
            </View>
          </View>
          <ChevronDown size={16} color="#327255" />
        </Pressable>

        {/* Premier In-Store "Scan & Go" Hero Action Banner */}
        <Pressable
          onPress={() => router.push('/(tabs)/scan')}
          className="mt-3 overflow-hidden rounded-2xl border-2 border-[#164e3b] bg-[#164e3b] p-4 shadow-md active:opacity-95">
          <View className="flex-row items-center justify-between">
            <View className="flex-1 pr-3">
              <View className="flex-row items-center gap-1.5">
                <View className="rounded-md bg-[#b7d66b] px-2 py-0.5">
                  <Text className="text-[9px] font-extrabold uppercase text-[#173f31]">
                    SKIP THE LINE
                  </Text>
                </View>
                <Text className="text-[10px] font-bold text-[#b7d66b]">SELF-BILLING APP</Text>
              </View>

              <Text className="mt-2 text-[16px] font-extrabold leading-5 text-white">
                Scan Shelf Barcode & Walk Out
              </Text>
              <Text className="mt-1 text-[11px] text-[#c7dfd2]">
                Pick item → Scan barcode → Pay via Razorpay UPI → Flash Exit QR pass
              </Text>

              <View className="mt-3 self-start flex-row items-center gap-2 rounded-xl bg-[#b7d66b] px-4 py-2">
                <Text className="text-[12px] font-extrabold text-[#173f31]">
                  📷 Open Barcode Scanner →
                </Text>
              </View>
            </View>
          </View>
        </Pressable>

        {/* Search Bar with Clear Button */}
        <View className="mt-4 flex-row items-center gap-2 rounded-xl border border-[#e5e7eb] bg-white px-3 py-3">
          <Search size={16} color="#6b7280" />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search shelf items, atta, dairy, fruits..."
            placeholderTextColor="#6b7280"
            className="flex-1 p-0 text-[12px] text-[#173f31]"
          />
          {query.length > 0 && (
            <Pressable onPress={() => setQuery('')} hitSlop={6}>
              <X size={14} color="#9ca3af" />
            </Pressable>
          )}
        </View>

        {/* grocerAI Copilot Banner */}
        <Pressable
          onPress={() => router.push('/ai-assistant')}
          className="mt-3 flex-row items-center justify-between rounded-2xl border border-[#b7d66b] bg-[#f5fbf1] p-3.5 shadow-sm active:opacity-90">
          <View className="flex-1 pr-3">
            <View className="flex-row items-center gap-1.5">
              <Sparkles size={14} color="#1f7956" />
              <Text className="text-[12px] font-bold text-[#1f7956]">In-Store Smart Shopping AI</Text>
            </View>
            <Text className="mt-1 text-[11px] leading-4 text-[#4b7861]">
              Locate shelf aisles, compare unit prices & check stock instantly
            </Text>
          </View>
          <View className="rounded-xl bg-[#164e3b] px-3 py-2">
            <Text className="text-[10px] font-bold text-white">Ask AI →</Text>
          </View>
        </Pressable>

        <View className="mt-6 flex-row items-center justify-between">
          <Text className="text-[18px] font-bold text-[#173f31]">Good morning, Arjun</Text>
          <Pressable onPress={handleRewardPress}>
            <Text className="text-[10px] font-bold text-[#2e8b65]">2,480 pts ★</Text>
          </Pressable>
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
            <ProductCard key={p.name} product={p} />
          ))}
        </View>
        {filtered.length === 0 && (
          <Text className="mt-6 text-center text-[12px] text-[#6b7280]">
            No items match &quot;{query}&quot;.
          </Text>
        )}

        {/* Smart savings reward card */}
        <Pressable
          onPress={handleRewardPress}
          className="mt-3 rounded-2xl bg-[#164e3b] p-4 active:opacity-95">
          <View className="flex-row items-center justify-between">
            <View className="flex-1 pr-3">
              <Text className="text-[10px] text-[#b5d8b5]">Smart savings</Text>
              <Text className="mt-1 text-[14px] font-bold text-white">Get ₹120 off your next bill</Text>
              <Text className="mt-1 text-[10px] text-[#c1dcc6]">Tap to reveal coupon GB120</Text>
            </View>
            <Trophy size={32} color="#b6d669" />
          </View>
        </Pressable>
      </ScrollView>
      <CartPill />
    </Screen>
  );
}
