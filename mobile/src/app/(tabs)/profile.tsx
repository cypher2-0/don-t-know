import { useState } from "react";
import {
  Award,
  Bell,
  ChevronRight,
  CreditCard,
  Heart,
  HelpCircle,
  MapPin,
  Package,
  Settings,
  ShieldCheck,
} from "lucide-react-native";
import { router } from "expo-router";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";

import { PageHeader } from "@/components/page-header";
import { Screen } from "@/components/screen";

const rows = [
  { label: "Saved addresses", icon: MapPin, sub: "Home, Office (2 saved)" },
  {
    label: "Payment methods",
    icon: CreditCard,
    sub: "Google Pay UPI, Visa ••4821",
  },
  { label: "Notifications", icon: Bell, sub: "Order updates, offers" },
  {
    label: "Order history",
    icon: Package,
    sub: "View past receipts & invoices",
  },
  { label: "Loyalty & Rewards", icon: Award, sub: "2,480 GreenPoints earned" },
  { label: "Help & Support", icon: HelpCircle, sub: "24/7 store assistance" },
  { label: "App settings", icon: Settings, sub: "Language, dark theme, cache" },
];

export default function ProfileScreen() {
  const [points, setPoints] = useState(2480);

  const onRowPress = (label: string) => {
    if (label === "Order history") {
      router.navigate("/orders");
      return;
    }
    if (label === "Saved addresses") {
      Alert.alert(
        "Favorite Store Outlets",
        "• Primary: GreenBasket Express · Indiranagar (Aisle 2 Beacon)\n• Secondary: GreenBasket Superstore · Koramangala",
        [{ text: "Switch Store" }, { text: "Done", style: "cancel" }],
      );
      return;
    }
    if (label === "Payment methods") {
      Alert.alert(
        "In-Store Payment Methods",
        "• Razorpay UPI: arjun@okhdfcbank (Default)\n• Card: HDFC Millennia Visa ending in 4821\n• Express Exit Turnstile Cash Desk",
        [{ text: "Manage Methods" }, { text: "Done", style: "cancel" }],
      );
      return;
    }
    if (label === "Notifications") {
      Alert.alert(
        "Notifications",
        "Digital exit pass generation and flash shelf markdown notifications are enabled.",
      );
      return;
    }
    if (label === "Loyalty & Rewards") {
      Alert.alert(
        "GreenPoints Club",
        `You have ${points} points! Every 500 points = ₹25 grocery cash. Use promo code GB120 at checkout.`,
      );
      return;
    }
    if (label === "Help & Support") {
      Alert.alert(
        "Customer Care",
        "Need assistance with an order? Call our store hotline: 1800-200-GREEN or chat with support.",
      );
      return;
    }
    Alert.alert(label, "All system configurations are up to date.");
  };

  return (
    <Screen>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }}
      >
        <PageHeader eyebrow="Your account" title="Profile" />

        {/* Member Profile Card */}
        <View className="mt-5 flex-row items-center gap-4 rounded-2xl border border-[#e5e7eb] bg-white p-4 shadow-sm">
          <View className="size-14 items-center justify-center rounded-full bg-[#164e3b]">
            <Text className="text-[18px] font-bold text-white">AM</Text>
          </View>
          <View className="flex-1">
            <View className="flex-row items-center gap-1.5">
              <Text className="text-[15px] font-bold text-[#173f31]">
                Arjun Mehta
              </Text>
              <ShieldCheck size={14} color="#2e8b65" />
            </View>
            <Text className="mt-0.5 text-[11px] text-[#6b7280]">
              arjun@example.com · +91 98765 43210
            </Text>
            <View className="mt-1.5 self-start rounded-full bg-[#e3f1dc] px-2.5 py-0.5">
              <Text className="text-[10px] font-bold text-[#2e8b65]">
                {points} loyalty points ★
              </Text>
            </View>
          </View>
        </View>

        {/* Account Settings List */}
        <View className="mt-4 overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white">
          {rows.map((row, index) => {
            const Icon = row.icon;
            return (
              <Pressable
                key={row.label}
                onPress={() => onRowPress(row.label)}
                className={`flex-row items-center gap-3 px-4 py-3.5 active:bg-[#f9fafb] ${index > 0 ? "border-t border-[#f0f2ef]" : ""}`}
              >
                <View className="size-8 items-center justify-center rounded-lg bg-[#f0f4ee]">
                  <Icon size={16} color="#2e8b65" />
                </View>
                <View className="flex-1">
                  <Text className="text-[12px] font-bold text-[#173f31]">
                    {row.label}
                  </Text>
                  <Text className="text-[10px] text-[#6b7280]">{row.sub}</Text>
                </View>
                <ChevronRight size={16} color="#9ca3af" />
              </Pressable>
            );
          })}
        </View>

        <Pressable
          onPress={() =>
            Alert.alert("Sign out", "Are you sure you want to sign out?", [
              { text: "Cancel", style: "cancel" },
              { text: "Log out", style: "destructive" },
            ])
          }
          className="mt-4 items-center rounded-2xl border border-[#f3d4d4] bg-white py-3.5 active:opacity-90"
        >
          <Text className="text-[12px] font-bold text-[#dc2626]">Log out</Text>
        </Pressable>
      </ScrollView>
    </Screen>
  );
}
