import { Check, Clock, PackageCheck, ShieldCheck, ShoppingBag, Truck } from 'lucide-react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { useCart } from '@/components/cart-provider';
import { Screen } from '@/components/screen';
import { storeInfo } from '@/lib/mock-data';

export default function OrderPlacedScreen() {
  const { id, paymentId } = useLocalSearchParams<{ id: string; paymentId?: string }>();
  const orderId = id ? decodeURIComponent(id) : '';
  const { placedOrders } = useCart();
  const order = placedOrders.find((o) => o.id === orderId) ?? placedOrders[0];

  return (
    <Screen>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 32, alignItems: 'center' }}>
        <View className="size-20 items-center justify-center rounded-full bg-[#dff0d8] shadow-sm">
          <Check size={38} color="#1f7956" />
        </View>

        <Text className="mt-5 text-[22px] font-bold text-[#173f31]">Order Placed!</Text>
        <Text className="mt-1 text-center text-[12px] leading-5 text-[#4b7861]">
          {order?.id ? `ID: ${order.id}` : 'Order confirmed'} · Arriving in ~20 mins
        </Text>

        {paymentId ? (
          <View className="mt-2.5 flex-row items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1">
            <ShieldCheck size={13} color="#2563eb" />
            <Text className="text-[10px] font-bold text-[#0c2340]">
              Razorpay Verified: <Text className="font-mono text-blue-700">{paymentId}</Text>
            </Text>
          </View>
        ) : null}

        {/* Live Delivery Timeline */}
        <View className="mt-6 w-full rounded-2xl border border-[#e5e7eb] bg-white p-4 shadow-sm">
          <Text className="text-[12px] font-bold text-[#173f31]">Live delivery status</Text>
          <View className="mt-4 gap-4">
            <View className="flex-row items-center gap-3">
              <View className="size-7 items-center justify-center rounded-full bg-[#2e8b65]">
                <Check size={14} color="#ffffff" />
              </View>
              <View className="flex-1">
                <Text className="text-[11px] font-bold text-[#173f31]">Order placed</Text>
                <Text className="text-[9px] text-[#6b7280]">Received and confirmed by store</Text>
              </View>
            </View>

            <View className="flex-row items-center gap-3">
              <View className="size-7 items-center justify-center rounded-full bg-[#e3f1dc]">
                <PackageCheck size={14} color="#2e8b65" />
              </View>
              <View className="flex-1">
                <Text className="text-[11px] font-bold text-[#173f31]">Packing at {storeInfo.name}</Text>
                <Text className="text-[9px] text-[#2e8b65]">In progress right now</Text>
              </View>
            </View>

            <View className="flex-row items-center gap-3">
              <View className="size-7 items-center justify-center rounded-full bg-[#f3f4f6]">
                <Truck size={14} color="#9ca3af" />
              </View>
              <View className="flex-1">
                <Text className="text-[11px] font-bold text-[#9ca3af]">Out for delivery</Text>
                <Text className="text-[9px] text-[#9ca3af]">Delivery partner will be assigned</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Order Details summary */}
        {order && (
          <View className="mt-4 w-full rounded-2xl border border-[#e5e7eb] bg-white p-4">
            <Text className="text-[12px] font-bold text-[#173f31]">Order summary</Text>
            <View className="mt-2.5 flex-row items-center justify-between">
              <View className="flex-row items-center gap-1.5">
                <Clock size={12} color="#6b7280" />
                <Text className="text-[11px] text-[#6b7280]">Slot</Text>
              </View>
              <Text className="text-[11px] font-semibold text-[#173f31]">{order.slot ?? 'In 20 mins'}</Text>
            </View>
            <View className="mt-2 flex-row items-center justify-between">
              <View className="flex-row items-center gap-1.5">
                <ShoppingBag size={12} color="#6b7280" />
                <Text className="text-[11px] text-[#6b7280]">Items</Text>
              </View>
              <Text className="text-[11px] font-semibold text-[#173f31]">{order.items} items</Text>
            </View>
            <View className="mt-2 flex-row items-center justify-between">
              <Text className="text-[11px] text-[#6b7280]">Payment</Text>
              <Text className="text-[11px] font-semibold text-[#173f31]">{order.paymentMethod ?? 'UPI'}</Text>
            </View>
            {order.discount ? (
              <View className="mt-2 flex-row items-center justify-between">
                <Text className="text-[11px] text-[#1f7956]">Smart Savings</Text>
                <Text className="text-[11px] font-bold text-[#1f7956]">-₹{order.discount}</Text>
              </View>
            ) : null}
            <View className="mt-2 flex-row items-center justify-between border-t border-[#f0f2ef] pt-2">
              <Text className="text-[11px] font-bold text-[#173f31]">Amount paid</Text>
              <Text className="text-[13px] font-bold text-[#2e8b65]">₹{order.finalPaid ?? order.total}</Text>
            </View>
          </View>
        )}

        <View className="mt-6 w-full gap-2.5">
          <Pressable
            onPress={() => router.replace('/(tabs)/orders')}
            className="w-full items-center rounded-xl bg-[#164e3b] py-3.5 active:opacity-90">
            <Text className="text-[13px] font-bold text-white">Track in My Orders</Text>
          </Pressable>
          <Pressable
            onPress={() => router.replace('/(tabs)')}
            className="w-full items-center rounded-xl border border-[#e5e7eb] bg-white py-3.5">
            <Text className="text-[13px] font-semibold text-[#173f31]">Continue shopping</Text>
          </Pressable>
        </View>
      </ScrollView>
    </Screen>
  );
}
