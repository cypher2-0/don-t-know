import '../global.css';

import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { FileText, Grid2X2, QrCode, Search, Users } from 'lucide-react-native';
import { View } from 'react-native';

import { CartProvider } from '@/components/cart-provider';

const ACTIVE_TINT = '#1f7956';
const INACTIVE_TINT = '#8a948c';

function ScanIcon() {
  return (
    <View className="-mt-4 size-12 items-center justify-center rounded-full border-4 border-white bg-[#b7d66b] shadow-md">
      <QrCode size={22} color="#173f31" />
    </View>
  );
}

export default function RootLayout() {
  return (
    <CartProvider>
      <StatusBar style="dark" />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: ACTIVE_TINT,
          tabBarInactiveTintColor: INACTIVE_TINT,
          tabBarLabelStyle: { fontSize: 10, fontWeight: '600' },
          tabBarStyle: {
            backgroundColor: '#ffffff',
            borderTopColor: '#e5e7eb',
            borderTopWidth: 1,
          },
        }}>
        <Tabs.Screen
          name="index"
          options={{ title: 'Home', tabBarIcon: ({ color }) => <Grid2X2 size={20} color={color} /> }}
        />
        <Tabs.Screen
          name="explore"
          options={{ title: 'Explore', tabBarIcon: ({ color }) => <Search size={20} color={color} /> }}
        />
        <Tabs.Screen name="scan" options={{ title: 'Scan', tabBarIcon: () => <ScanIcon /> }} />
        <Tabs.Screen
          name="orders"
          options={{ title: 'Orders', tabBarIcon: ({ color }) => <FileText size={20} color={color} /> }}
        />
        <Tabs.Screen
          name="profile"
          options={{ title: 'Profile', tabBarIcon: ({ color }) => <Users size={20} color={color} /> }}
        />
      </Tabs>
    </CartProvider>
  );
}
