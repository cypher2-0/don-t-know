import { Bell, ChevronRight, CreditCard, MapPin, Package, Settings } from 'lucide-react-native';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';

import { PageHeader } from '@/components/page-header';
import { Screen } from '@/components/screen';

const rows = [
  { label: 'Saved addresses', icon: MapPin },
  { label: 'Payment methods', icon: CreditCard },
  { label: 'Notifications', icon: Bell },
  { label: 'Order history', icon: Package },
  { label: 'App settings', icon: Settings },
];

export default function ProfileScreen() {
  return (
    <Screen>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }}>
        <PageHeader eyebrow="Your account" title="Profile" />

        <View className="mt-5 flex-row items-center gap-4 rounded-2xl border border-[#e5e7eb] bg-white p-4 shadow-sm">
          <View className="size-14 items-center justify-center rounded-full bg-[#164e3b]">
            <Text className="text-[18px] font-bold text-white">AM</Text>
          </View>
          <View className="flex-1">
            <Text className="text-[15px] font-bold text-[#173f31]">Arjun Mehta</Text>
            <Text className="mt-0.5 text-[11px] text-[#6b7280]">arjun@example.com</Text>
            <Text className="mt-1 text-[10px] font-bold text-[#2e8b65]">2,480 loyalty points</Text>
          </View>
        </View>

        <View className="mt-4 overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white">
          {rows.map((row, index) => {
            const Icon = row.icon;
            return (
              <Pressable
                key={row.label}
                onPress={() => Alert.alert(row.label, 'Coming soon.')}
                className={`flex-row items-center gap-3 px-4 py-3.5 ${index > 0 ? 'border-t border-[#f0f2ef]' : ''}`}>
                <Icon size={16} color="#2e8b65" />
                <Text className="flex-1 text-[12px] font-medium text-[#173f31]">{row.label}</Text>
                <ChevronRight size={16} color="#9ca3af" />
              </Pressable>
            );
          })}
        </View>

        <Pressable
          onPress={() => Alert.alert('Signed out', 'See you soon, Arjun!')}
          className="mt-4 items-center rounded-2xl border border-[#f3d4d4] bg-white py-3.5">
          <Text className="text-[12px] font-bold text-[#dc2626]">Log out</Text>
        </Pressable>
      </ScrollView>
    </Screen>
  );
}
