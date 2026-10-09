import { Alert, Pressable, ScrollView, Text, View } from 'react-native';

import { PageHeader } from '@/components/page-header';
import { Screen } from '@/components/screen';
import { pastOrders } from '@/lib/mock-data';

export default function OrdersScreen() {
  return (
    <Screen>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }}>
        <PageHeader
          eyebrow="Your history"
          title="Orders"
          desc="Recent orders from GreenBasket · Indiranagar."
        />

        {pastOrders.map((order) => (
          <View key={order.id} className="mt-3 rounded-2xl border border-[#e5e7eb] bg-white p-4 shadow-sm">
            <View className="flex-row items-center justify-between">
              <Text className="text-[13px] font-bold text-[#173f31]">{order.id}</Text>
              <View className="rounded-full bg-[#e3f1dc] px-2.5 py-1">
                <Text className="text-[9px] font-bold text-[#2e8b65]">{order.status}</Text>
              </View>
            </View>
            <Text className="mt-1 text-[11px] text-[#6b7280]">
              {order.date} · {order.items} items · ₹{order.total}
            </Text>
            <View className="mt-3 flex-row items-center justify-between border-t border-[#f0f2ef] pt-3">
              <Text className="text-[10px] font-semibold text-[#6b7280]">GreenBasket · Indiranagar</Text>
              <Pressable hitSlop={8} onPress={() => Alert.alert(order.id, 'Reorder is coming soon.')}>
                <Text className="text-[10px] font-bold text-[#2e8b65]">Reorder</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>
    </Screen>
  );
}
