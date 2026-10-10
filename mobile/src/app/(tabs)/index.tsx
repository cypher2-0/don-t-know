import { useState } from 'react';
import {
  Bell,
  BellRing,
  ChevronDown,
  Flame,
  Lightbulb,
  MapPin,
  Navigation,
  Search,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users,
  X,
} from 'lucide-react-native';
import { router } from 'expo-router';
import {
  Alert,
  Image,
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
import {
  customerProducts,
  storeInfo,
  storesList,
  getBestSellers,
  getOutOfStockProducts,
  getRecommendations,
} from '@/lib/mock-data';

export default function HomeScreen() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [refreshing, setRefreshing] = useState(false);
  const [activeStore, setActiveStore] = useState(storeInfo.name);
  const [notifyList, setNotifyList] = useState<string[]>([]);
  const { addToCart, items } = useCart();

  const filtered = customerProducts.filter(
    (p) =>
      (category === 'All' || p.category === category) &&
      p.name.toLowerCase().includes(query.trim().toLowerCase()),
  );

  const bestSellers = getBestSellers().slice(0, 6);
  const outOfStock = getOutOfStockProducts();

  // Get recommendations based on what's in cart
  const cartRecommendations = items.length > 0
    ? [...new Set(items.flatMap((it) => getRecommendations(it.product.name).map((r) => r.name)))]
        .filter((name) => !items.some((it) => it.product.name === name))
        .map((name) => customerProducts.find((p) => p.name === name)!)
        .filter(Boolean)
        .slice(0, 4)
    : [];

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
        { text: 'Cancel', style: 'cancel' as const },
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

  const handleNotifyMe = (productName: string) => {
    if (notifyList.includes(productName)) {
      setNotifyList(notifyList.filter((n) => n !== productName));
      Alert.alert('Removed', `You'll no longer be notified when ${productName} is back in stock.`);
    } else {
      setNotifyList([...notifyList, productName]);
      Alert.alert(
        '🔔 Notify Me Set!',
        `We'll send you a push notification when "${productName}" is restocked at ${activeStore}.`,
        [{ text: 'Got it!' }],
      );
    }
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
          <View className="flex-row items-center gap-2">
            <Pressable
              onPress={() => router.push('/staff-gate-scanner')}
              className="flex-row items-center gap-1 rounded-xl border border-emerald-300 bg-emerald-50 px-2.5 py-1.5 active:bg-emerald-100">
              <ShieldCheck size={14} color="#164e3b" />
              <Text className="text-[10px] font-bold text-[#164e3b]">Staff Gate</Text>
            </Pressable>
            <Pressable
              onPress={() => Alert.alert('Notifications', 'All orders are on schedule. No urgent notifications.')}
              className="size-9 items-center justify-center rounded-xl border border-[#e5e7eb] bg-white active:bg-[#f3f4f6]">
              <Bell size={18} color="#173f31" />
            </Pressable>
          </View>
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

        {/* GPS Nearby Stores Quick Link */}
        <Pressable
          onPress={() => router.push('/nearby-stores')}
          className="mt-2 flex-row items-center justify-between rounded-xl border border-[#e5e7eb] bg-white px-3.5 py-2.5 active:opacity-90">
          <View className="flex-row items-center gap-2">
            <View className="size-7 items-center justify-center rounded-lg bg-[#f0f4ee]">
              <Navigation size={13} color="#2e8b65" />
            </View>
            <View>
              <Text className="text-[11px] font-bold text-[#173f31]">Find Nearby Stores</Text>
              <Text className="text-[9px] text-[#6b7280]">GPS distance, stock & your regular items</Text>
            </View>
          </View>
          <Text className="text-[10px] font-bold text-[#2e8b65]">→</Text>
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

        {/* 🔥 Best Sellers Section */}
        <View className="mt-5">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-1.5">
              <Flame size={16} color="#ef4444" />
              <Text className="text-[15px] font-bold text-[#173f31]">Best Sellers in Store</Text>
            </View>
            <Text className="text-[10px] font-bold text-[#6b7280]">Last 30 days</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mt-2"
            contentContainerStyle={{ gap: 10 }}>
            {bestSellers.map((p) => (
              <Pressable
                key={p.name}
                onPress={() => router.push(`/product/${encodeURIComponent(p.name)}`)}
                style={{ width: 135, height: 175 }}
                className="rounded-2xl border border-[#e5e7eb] bg-white p-2.5 active:opacity-95">
                <View
                  style={{ width: '100%', height: 90 }}
                  className="relative items-center justify-center rounded-xl bg-slate-50 overflow-hidden border border-[#f0f2f5]">
                  {p.image ? (
                    <Image
                      source={{ uri: p.image }}
                      style={{ width: '100%', height: 90 }}
                      resizeMode="cover"
                    />
                  ) : (
                    <Flame size={20} color="#ef4444" />
                  )}
                  <View className="absolute top-1 right-1 rounded-full bg-[#fef3c7] px-1 py-0.5">
                    <Text className="text-[7px] font-bold text-[#92400e]">🔥</Text>
                  </View>
                </View>
                <Text numberOfLines={1} className="mt-1.5 text-[11px] font-bold text-[#173f31]">
                  {p.name}
                </Text>
                <Text className="text-[9px] text-[#6b7280]">{p.size}</Text>
                <View className="mt-1 flex-row items-center justify-between">
                  <Text className="text-[12px] font-bold text-[#173f31]">₹{p.price}</Text>
                  <View className="flex-row items-center gap-0.5">
                    <Users size={8} color="#6b7280" />
                    <Text className="text-[8px] text-[#6b7280]">{p.buyCount}+</Text>
                  </View>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* 🛒 Recommendations based on cart */}
        {cartRecommendations.length > 0 && (
          <View className="mt-5">
            <View className="flex-row items-center gap-1.5">
              <Sparkles size={14} color="#2e8b65" />
              <Text className="text-[14px] font-bold text-[#173f31]">People also bought</Text>
            </View>
            <Text className="mt-0.5 text-[10px] text-[#6b7280]">
              Based on items in your basket
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mt-2"
              contentContainerStyle={{ gap: 10 }}>
              {cartRecommendations.map((p) => (
                <Pressable
                  key={p.name}
                  onPress={() => router.push(`/product/${encodeURIComponent(p.name)}`)}
                  style={{ width: 135, height: 175 }}
                  className="rounded-2xl border border-[#b7d66b] bg-[#f6fbf2] p-2.5 active:opacity-95">
                  <View
                    style={{ width: '100%', height: 90 }}
                    className="items-center justify-center rounded-xl bg-slate-50 overflow-hidden border border-[#d8eacb]">
                    {p.image ? (
                      <Image
                        source={{ uri: p.image }}
                        style={{ width: '100%', height: 90 }}
                        resizeMode="cover"
                      />
                    ) : (
                      <Sparkles size={18} color="#2e8b65" />
                    )}
                  </View>
                  <Text numberOfLines={1} className="mt-1.5 text-[11px] font-bold text-[#173f31]">
                    {p.name}
                  </Text>
                  <View className="mt-1 flex-row items-center justify-between">
                    <Text className="text-[12px] font-bold text-[#173f31]">₹{p.price}</Text>
                    <Pressable
                      onPress={(e) => {
                        e.stopPropagation?.();
                        addToCart(p, 1);
                      }}
                      className="rounded-lg bg-[#dff0d8] px-2 py-0.5">
                      <Text className="text-[10px] font-bold text-[#21664b]">+ Add</Text>
                    </Pressable>
                  </View>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        )}

        {/* 🔔 Out of Stock — Notify Me */}
        {outOfStock.length > 0 && (
          <View className="mt-5">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-1.5">
                <BellRing size={14} color="#dc2626" />
                <Text className="text-[14px] font-bold text-[#173f31]">Out of Stock</Text>
              </View>
              <Text className="text-[10px] text-[#6b7280]">Tap to get notified</Text>
            </View>
            <View className="mt-2 gap-2">
              {outOfStock.map((p) => {
                const isWatching = notifyList.includes(p.name);
                return (
                  <View
                    key={p.name}
                    className="flex-row items-center justify-between rounded-xl border border-[#e5e7eb] bg-white px-3 py-2.5">
                    <View className="flex-1 pr-3">
                      <Text className="text-[12px] font-bold text-[#374151]">{p.name}</Text>
                      <Text className="text-[9px] text-[#9ca3af]">
                        {p.size} · {p.category} · {p.aisle}
                      </Text>
                    </View>
                    <Pressable
                      onPress={() => handleNotifyMe(p.name)}
                      className={`flex-row items-center gap-1 rounded-full px-3 py-1.5 ${
                        isWatching ? 'bg-[#164e3b]' : 'bg-[#fef3c7]'
                      }`}>
                      <BellRing size={11} color={isWatching ? '#ffffff' : '#92400e'} />
                      <Text className={`text-[9px] font-bold ${isWatching ? 'text-white' : 'text-[#92400e]'}`}>
                        {isWatching ? 'Watching' : 'Notify Me'}
                      </Text>
                    </Pressable>
                  </View>
                );
              })}
            </View>
          </View>
        )}

        {/* 💡 Suggest a Product */}
        <Pressable
          onPress={() => router.push('/suggest-product')}
          className="mt-5 flex-row items-center justify-between rounded-2xl border border-dashed border-[#b7d66b] bg-[#f6fbf2] p-3.5 active:opacity-90">
          <View className="flex-row items-center gap-2">
            <View className="size-8 items-center justify-center rounded-lg bg-[#e3f1dc]">
              <Lightbulb size={16} color="#1f7956" />
            </View>
            <View>
              <Text className="text-[11px] font-bold text-[#173f31]">Suggest a New Product</Text>
              <Text className="text-[9px] text-[#6b7280]">
                Can't find something? Request it here
              </Text>
            </View>
          </View>
          <Text className="text-[10px] font-bold text-[#2e8b65]">→</Text>
        </Pressable>

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
