import { useState } from 'react';
import { ArrowRight, Check, CheckCircle2, Clock, QrCode, ShieldCheck, ShoppingBag, Sparkles } from 'lucide-react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import Svg, { Rect, Path } from 'react-native-svg';

import { useCart } from '@/components/cart-provider';
import { Screen } from '@/components/screen';
import { storeInfo } from '@/lib/mock-data';

// Crisp aesthetic QR code pattern for turnstile gate optical scanner
function ExitPassQRCode({ code }: { code: string }) {
  return (
    <View className="items-center rounded-2xl border-2 border-[#164e3b] bg-white p-5 shadow-md">
      <View className="relative size-48 items-center justify-center rounded-xl bg-white p-2">
        {/* Synthetic high-contrast barcode / QR SVG representation */}
        <Svg width="180" height="180" viewBox="0 0 180 180">
          {/* Corner finder pattern: Top Left */}
          <Rect x="10" y="10" width="46" height="46" rx="6" fill="#164e3b" />
          <Rect x="18" y="18" width="30" height="30" rx="3" fill="#ffffff" />
          <Rect x="25" y="25" width="16" height="16" rx="2" fill="#164e3b" />

          {/* Corner finder pattern: Top Right */}
          <Rect x="124" y="10" width="46" height="46" rx="6" fill="#164e3b" />
          <Rect x="132" y="18" width="30" height="30" rx="3" fill="#ffffff" />
          <Rect x="139" y="25" width="16" height="16" rx="2" fill="#164e3b" />

          {/* Corner finder pattern: Bottom Left */}
          <Rect x="10" y="124" width="46" height="46" rx="6" fill="#164e3b" />
          <Rect x="18" y="132" width="30" height="30" rx="3" fill="#ffffff" />
          <Rect x="25" y="139" width="16" height="16" rx="2" fill="#164e3b" />

          {/* Alignment & timing marks */}
          <Rect x="66" y="20" width="8" height="8" fill="#164e3b" />
          <Rect x="82" y="20" width="8" height="8" fill="#164e3b" />
          <Rect x="98" y="20" width="8" height="8" fill="#164e3b" />

          <Rect x="20" y="66" width="8" height="8" fill="#164e3b" />
          <Rect x="20" y="82" width="8" height="8" fill="#164e3b" />
          <Rect x="20" y="98" width="8" height="8" fill="#164e3b" />

          {/* Body data points */}
          <Rect x="64" y="64" width="12" height="12" rx="2" fill="#164e3b" />
          <Rect x="84" y="64" width="12" height="12" rx="2" fill="#164e3b" />
          <Rect x="104" y="64" width="12" height="12" rx="2" fill="#164e3b" />
          <Rect x="124" y="64" width="12" height="12" rx="2" fill="#164e3b" />
          <Rect x="144" y="64" width="12" height="12" rx="2" fill="#164e3b" />

          <Rect x="64" y="84" width="12" height="12" rx="2" fill="#164e3b" />
          <Rect x="104" y="84" width="12" height="12" rx="2" fill="#164e3b" />
          <Rect x="144" y="84" width="12" height="12" rx="2" fill="#164e3b" />

          <Rect x="64" y="104" width="12" height="12" rx="2" fill="#164e3b" />
          <Rect x="84" y="104" width="12" height="12" rx="2" fill="#164e3b" />
          <Rect x="124" y="104" width="12" height="12" rx="2" fill="#164e3b" />

          <Rect x="64" y="124" width="12" height="12" rx="2" fill="#164e3b" />
          <Rect x="104" y="124" width="12" height="12" rx="2" fill="#164e3b" />
          <Rect x="124" y="124" width="12" height="12" rx="2" fill="#164e3b" />
          <Rect x="144" y="124" width="12" height="12" rx="2" fill="#164e3b" />

          <Rect x="84" y="144" width="12" height="12" rx="2" fill="#164e3b" />
          <Rect x="104" y="144" width="12" height="12" rx="2" fill="#164e3b" />
          <Rect x="144" y="144" width="12" height="12" rx="2" fill="#164e3b" />

          {/* Central security logo emblem */}
          <Rect x="78" y="78" width="24" height="24" rx="6" fill="#b7d66b" />
          <Path d="M85 90 L88 93 L95 86" stroke="#164e3b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
      </View>

      <View className="mt-2 flex-row items-center gap-1.5 rounded-full bg-[#f0f9f3] px-3 py-1">
        <Sparkles size={11} color="#164e3b" />
        <Text className="font-mono text-[11px] font-bold text-[#164e3b]">{code}</Text>
      </View>
    </View>
  );
}

export default function OrderPlacedScreen() {
  const { id, paymentId } = useLocalSearchParams<{ id: string; paymentId?: string }>();
  const orderId = id ? decodeURIComponent(id) : '';
  const { placedOrders } = useCart();
  const order = placedOrders.find((o) => o.id === orderId) ?? placedOrders[0];
  const passCode = orderId || `GB-EXIT-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <Screen>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 24, alignItems: 'center' }}>
        {/* Top Verified Pill */}
        <View className="flex-row items-center gap-1.5 rounded-full border border-emerald-300 bg-emerald-50 px-4 py-1.5 shadow-sm">
          <CheckCircle2 size={16} color="#059669" />
          <Text className="text-[11px] font-bold tracking-wide text-emerald-800">
            SECURITY VERIFIED · READY TO EXIT
          </Text>
        </View>

        <Text className="mt-3 text-center text-[22px] font-extrabold text-[#173f31]">
          Digital Store Exit Pass
        </Text>
        <Text className="mt-1 text-center text-[12px] text-[#4b7861]">
          {storeInfo.name} · {storeInfo.exitGate}
        </Text>

        {/* Razorpay Badge */}
        {paymentId ? (
          <View className="mt-2.5 flex-row items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1">
            <ShieldCheck size={13} color="#2563eb" />
            <Text className="text-[10px] font-bold text-[#0c2340]">
              Razorpay Verified: <Text className="font-mono text-blue-700">{paymentId}</Text>
            </Text>
          </View>
        ) : (
          <View className="mt-2.5 flex-row items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1">
            <ShieldCheck size={13} color="#059669" />
            <Text className="text-[10px] font-bold text-emerald-800">
              Payment Confirmed · Anti-Theft Tag Released
            </Text>
          </View>
        )}

        {/* Digital QR Code Card */}
        <View className="mt-5 w-full items-center">
          <ExitPassQRCode code={passCode} />
          <Text className="mt-2 text-center text-[11px] font-medium text-[#4b7861]">
            Flash this QR code at the Optical Exit Turnstile or show security guard
          </Text>
        </View>

        {/* How to Exit Instructions */}
        <View className="mt-5 w-full rounded-2xl border border-[#d2e8cb] bg-[#f7fbf4] p-4">
          <Text className="text-[12px] font-bold text-[#173f31]">
            How to exit without waiting in line:
          </Text>
          <View className="mt-3 gap-2.5">
            <View className="flex-row items-start gap-2.5">
              <View className="size-5 items-center justify-center rounded-full bg-[#164e3b]">
                <Text className="text-[10px] font-bold text-white">1</Text>
              </View>
              <Text className="flex-1 text-[11px] leading-4 text-[#305a46]">
                Carry your bagged items and proceed to the <Text className="font-bold">Self-Checkout Express Lane</Text>.
              </Text>
            </View>

            <View className="flex-row items-start gap-2.5">
              <View className="size-5 items-center justify-center rounded-full bg-[#164e3b]">
                <Text className="text-[10px] font-bold text-white">2</Text>
              </View>
              <Text className="flex-1 text-[11px] leading-4 text-[#305a46]">
                Hold this screen directly in front of the <Text className="font-bold">turnstile scanner</Text>.
              </Text>
            </View>

            <View className="flex-row items-start gap-2.5">
              <View className="size-5 items-center justify-center rounded-full bg-[#164e3b]">
                <Text className="text-[10px] font-bold text-white">3</Text>
              </View>
              <Text className="flex-1 text-[11px] leading-4 text-[#305a46]">
                Turnstile gate opens automatically in &lt;1 second. <Text className="font-bold">Zero queue, you are good to go!</Text>
              </Text>
            </View>
          </View>
        </View>

        {/* Paid Basket Summary */}
        {order && (
          <View className="mt-4 w-full rounded-2xl border border-[#e5e7eb] bg-white p-4 shadow-sm">
            <View className="flex-row items-center justify-between border-b border-[#f0f2ef] pb-2.5">
              <Text className="text-[12px] font-bold text-[#173f31]">Verified Items in Basket</Text>
              <Text className="text-[11px] font-bold text-[#1f7956]">
                🔒 {order.items} Items Scanned
              </Text>
            </View>

            <View className="mt-2.5 flex-row items-center justify-between">
              <Text className="text-[11px] text-[#6b7280]">Payment Method</Text>
              <Text className="text-[11px] font-bold text-[#173f31]">
                {order.paymentMethod?.includes('Razorpay') ? 'Razorpay Secure' : order.paymentMethod ?? 'Razorpay'}
              </Text>
            </View>

            <View className="mt-2 flex-row items-center justify-between">
              <Text className="text-[11px] text-[#6b7280]">Billing Queue Saved</Text>
              <Text className="text-[11px] font-bold text-emerald-700">~12 minutes saved</Text>
            </View>

            {order.discount ? (
              <View className="mt-2 flex-row items-center justify-between">
                <Text className="text-[11px] text-[#1f7956]">Self-Checkout Savings</Text>
                <Text className="text-[11px] font-bold text-[#1f7956]">-₹{order.discount}</Text>
              </View>
            ) : null}

            <View className="mt-2 flex-row items-center justify-between border-t border-[#f0f2ef] pt-2">
              <Text className="text-[12px] font-bold text-[#173f31]">Total Amount Paid</Text>
              <Text className="text-[14px] font-extrabold text-[#164e3b]">
                ₹{order.finalPaid ?? order.total}
              </Text>
            </View>
          </View>
        )}

        {/* Actions */}
        <View className="mt-6 w-full gap-2.5">
          <Pressable
            onPress={() => router.replace('/(tabs)/orders')}
            className="w-full items-center rounded-xl bg-[#164e3b] py-3.5 shadow-sm active:opacity-90">
            <Text className="text-[13px] font-bold text-white">View in Saved Exit Passes</Text>
          </Pressable>
          <Pressable
            onPress={() => router.replace('/(tabs)/scan')}
            className="w-full flex-row items-center justify-center gap-1.5 rounded-xl border border-[#b7d66b] bg-[#f5fbf1] py-3.5 active:bg-[#eaf4e3]">
            <QrCode size={16} color="#164e3b" />
            <Text className="text-[13px] font-bold text-[#164e3b]">Scan More In-Store Items</Text>
          </Pressable>
        </View>
      </ScrollView>
    </Screen>
  );
}
