import { useState } from 'react';
import { Check, ChevronDown, ChevronUp, Clock, PackageCheck, RotateCcw, Truck } from 'lucide-react-native';
import { router } from 'expo-router';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';

import { useCart } from '@/components/cart-provider';
import { PageHeader } from '@/components/page-header';
import { Screen } from '@/components/screen';
import { pastOrders, storeInfo } from '@/lib/mock-data';

export default function OrdersScreen() {
  const { placedOrders, reorder } = useCart();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'All' | 'Active' | 'Delivered'>('All');

  const allOrders = [...placedOrders, ...pastOrders];
  const filteredOrders = allOrders.filter((o) => {
    if (filter === 'Active') return o.status === 'Confirmed' || o.status === 'Packing';
    if (filter === 'Delivered') return o.status === 'Delivered';
    return true;
  });

  const handleReorder = (order: (typeof allOrders)[0]) => {
    if (order.itemsList && order.itemsList.length > 0) {
      reorder(order.itemsList);
      Alert.alert(
        'Added to cart',
        `${order.itemsList.length} items from ${order.id} were added to your cart.`,
        [
          { text: 'Keep shopping', style: 'cancel' },
          { text: 'View cart', onPress: () => router.push('/cart') },
        ],
      );
    } else {
      Alert.alert('Reorder', 'Items from this order are being retrieved.');
    }
  };

  return (
    <Screen>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }}>
        <PageHeader
          eyebrow="In-Store Self-Checkout"
          title="Exit Passes & Bills"
          desc={`Digital receipts and gate clearance passes for ${storeInfo.name}.`}
        />

        {/* Filter Pills */}
        <View className="mt-4 flex-row gap-2">
          {(['All', 'Active Passes', 'Past Receipts'] as const).map((tab) => {
            const active = filter === (tab === 'Active Passes' ? 'Active' : tab === 'Past Receipts' ? 'Delivered' : 'All');
            return (
              <Pressable
                key={tab}
                onPress={() => setFilter(tab === 'Active Passes' ? 'Active' : tab === 'Past Receipts' ? 'Delivered' : 'All')}
                className={`rounded-full border px-4 py-1.5 ${active ? 'border-[#164e3b] bg-[#164e3b]' : 'border-[#e5e7eb] bg-white'}`}>
                <Text
                  className={`text-[11px] font-semibold ${active ? 'text-white' : 'text-[#4b5563]'}`}>
                  {tab}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {filteredOrders.length === 0 ? (
          <View className="mt-12 items-center justify-center p-6">
            <Text className="text-[13px] font-semibold text-[#6b7280]">No orders found in this tab.</Text>
          </View>
        ) : (
          filteredOrders.map((order) => {
            const confirmed = order.status === 'Confirmed';
            const isExpanded = expandedId === order.id;

            return (
              <View
                key={order.id}
                className="mt-3 rounded-2xl border border-[#e5e7eb] bg-white p-4 shadow-sm">
                <Pressable
                  onPress={() => setExpandedId(isExpanded ? null : order.id)}
                  className="flex-row items-center justify-between">
                  <View>
                    <View className="flex-row items-center gap-2">
                      <Text className="text-[14px] font-bold text-[#173f31]">{order.id}</Text>
                      <View
                        className={`rounded-full px-2 py-0.5 ${confirmed ? 'bg-[#dff0d8]' : 'bg-[#f3f4f6]'}`}>
                        <Text
                          className={`text-[9px] font-bold ${confirmed ? 'text-[#1f7956]' : 'text-[#4b5563]'}`}>
                          {order.status}
                        </Text>
                      </View>
                    </View>
                    <Text className="mt-1 text-[11px] text-[#6b7280]">
                      {order.date} · {order.items} items · ₹{order.total}
                    </Text>
                  </View>
                  {isExpanded ? (
                    <ChevronUp size={16} color="#6b7280" />
                  ) : (
                    <ChevronDown size={16} color="#6b7280" />
                  )}
                </Pressable>

                {/* Expanded Tracking & Items Breakdown */}
                {isExpanded && (
                  <View className="mt-3 border-t border-[#f0f2ef] pt-3">
                    {confirmed ? (
                      <View className="mb-3 rounded-xl bg-[#e3f1dc] p-3">
                        <View className="flex-row items-center gap-2">
                          <PackageCheck size={14} color="#2e8b65" />
                          <Text className="text-[11px] font-bold text-[#173f31]">
                            Gate Exit Pass Active at {storeInfo.name}
                          </Text>
                        </View>
                        <Text className="mt-1 text-[10px] text-[#4b7861]">
                          Status: Security tag cleared · Turnstile #2 optical scanner ready
                        </Text>
                      </View>
                    ) : (
                      <View className="mb-3 flex-row items-center gap-2 rounded-xl bg-[#f9fafb] p-2.5">
                        <Clock size={12} color="#6b7280" />
                        <Text className="text-[10px] text-[#6b7280]">
                          Type: In-Store Self-Checkout · {order.slot ?? 'Express Exit'}
                        </Text>
                      </View>
                    )}

                    {order.itemsList && order.itemsList.length > 0 && (
                      <View className="mb-2">
                        <Text className="text-[10px] font-bold uppercase tracking-wider text-[#9ca3af]">
                          Scanned Basket Items:
                        </Text>
                        {order.itemsList.map((item, idx) => (
                          <View key={idx} className="mt-1.5 flex-row items-center justify-between">
                            <Text className="text-[11px] text-[#374151]">
                              {item.qty} × {item.name} ({item.size})
                            </Text>
                            <Text className="text-[11px] font-semibold text-[#173f31]">
                              ₹{item.price * item.qty}
                            </Text>
                          </View>
                        ))}
                      </View>
                    )}
                  </View>
                )}

                {/* Action Footer */}
                <View className="mt-3 flex-row items-center justify-between border-t border-[#f0f2ef] pt-3">
                  <Text className="text-[10px] font-semibold text-[#6b7280]">{storeInfo.name}</Text>
                  {confirmed ? (
                    <Pressable
                      hitSlop={8}
                      onPress={() => router.push({ pathname: '/order-placed', params: { id: order.id } })}
                      className="flex-row items-center gap-1 rounded-lg bg-[#164e3b] px-3 py-1.5">
                      <Text className="text-[10px] font-bold text-white">
                        Show Exit Pass QR →
                      </Text>
                    </Pressable>
                  ) : (
                    <Pressable
                      hitSlop={8}
                      onPress={() => handleReorder(order)}
                      className="flex-row items-center gap-1 rounded-lg bg-[#dff0d8] px-2.5 py-1">
                      <RotateCcw size={11} color="#21664b" />
                      <Text className="text-[10px] font-bold text-[#21664b]">Re-scan items</Text>
                    </Pressable>
                  )}
                </View>
              </View>
            );
          })
        )}
      </ScrollView>
    </Screen>
  );
}
