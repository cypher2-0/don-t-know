import { useState } from 'react';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import {
  Banknote,
  Check,
  ChevronLeft,
  CreditCard,
  MapPin,
  Minus,
  Plus,
  QrCode,
  ScanLine,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Tag,
  Trash2,
  Wallet,
  Zap,
} from 'lucide-react-native';

import { useCart } from '@/components/cart-provider';
import { Screen } from '@/components/screen';
import { MobileRazorpayModal } from '@/components/razorpay-modal';
import { paymentMethods, storeInfo } from '@/lib/mock-data';

export default function CartScreen() {
  const { items, count, total, changeQty, removeItem, placeOrder } = useCart();
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0].id);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showRazorpay, setShowRazorpay] = useState(false);
  const insets = useSafeAreaInsets();

  const effectiveDiscount = Math.min(discount, total);
  const grand = Math.max(0, total - effectiveDiscount);

  const applyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (code === 'GB120' || code === 'SMARTSAVE') {
      if (total < 250) {
        Alert.alert('Coupon restriction', 'GB120 requires a minimum in-store basket value of ₹250.');
        return;
      }
      setDiscount(120);
      setCouponApplied('GB120 (-₹120)');
      setCouponCode('');
    } else {
      Alert.alert('Invalid coupon', 'Try code "GB120" for in-store smart savings.');
    }
  };

  const removeCoupon = () => {
    setDiscount(0);
    setCouponApplied('');
  };

  const selectedPayment = paymentMethods.find((p) => p.id === paymentMethod)?.name ?? 'Razorpay Secure';

  const handlePlaceOrder = (paymentId?: string) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    const order = placeOrder({
      slot: 'In-Store Self-Checkout',
      paymentMethod: selectedPayment,
      discount: effectiveDiscount,
      tip: 0,
      delivery: 0,
    });
    router.replace(
      `/order-placed?id=${encodeURIComponent(order.id)}${paymentId ? `&paymentId=${encodeURIComponent(paymentId)}` : ''}`
    );
  };

  return (
    <Screen>
      {/* Top Header */}
      <View className="flex-row items-center justify-between px-5 pb-3 pt-4">
        <Pressable
          onPress={() => router.back()}
          hitSlop={8}
          className="size-9 items-center justify-center rounded-xl border border-[#e5e7eb] bg-white">
          <ChevronLeft size={18} color="#173f31" />
        </Pressable>
        <View className="items-center">
          <Text className="text-[13px] font-bold text-[#173f31]">In-Store Basket</Text>
          <Text className="text-[9px] font-semibold text-[#2e8b65]">SKIP THE BILLING LINE</Text>
        </View>
        <View className="size-9" />
      </View>

      {count === 0 ? (
        <View className="flex-1 items-center justify-center px-8">
          <View className="size-20 items-center justify-center rounded-full bg-[#f0f4ee]">
            <ShoppingBag size={32} color="#8a948c" />
          </View>
          <Text className="mt-5 text-[15px] font-bold text-[#173f31]">Your shopping basket is empty</Text>
          <Text className="mt-2 text-center text-[12px] leading-5 text-[#6b7280]">
            Scan barcodes directly from the store shelves using the scanner to build your self-billing basket.
          </Text>
          <Pressable
            onPress={() => router.replace('/(tabs)/scan')}
            className="mt-6 flex-row items-center gap-2 rounded-xl bg-[#164e3b] px-5 py-3">
            <ScanLine size={16} color="#ffffff" />
            <Text className="text-[12px] font-semibold text-white">Start Scanning Shelves</Text>
          </Pressable>
        </View>
      ) : (
        <>
          <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }}>
            {/* Store Presence Badge */}
            <View className="mt-2 flex-row items-center gap-2.5 rounded-2xl border border-emerald-200 bg-[#f3faf0] p-3.5">
              <View className="size-8 items-center justify-center rounded-xl bg-[#164e3b]">
                <Check size={16} color="#ffffff" />
              </View>
              <View className="flex-1">
                <Text className="text-[11px] font-bold text-[#143d31]">Self-Billing · Skip The Line Active</Text>
                <Text className="mt-0.5 text-[10px] text-[#2d634e]">
                  {storeInfo.name} · Scan items, pay on phone, show QR exit pass
                </Text>
              </View>
            </View>

            {/* In-Basket Verified Count */}
            <View className="mt-3 flex-row items-center justify-between rounded-xl border border-[#e5e7eb] bg-white px-3.5 py-2.5">
              <View className="flex-row items-center gap-2">
                <ScanLine size={15} color="#2e8b65" />
                <Text className="text-[11px] font-bold text-[#173f31]">Physical Basket Items Count</Text>
              </View>
              <View className="rounded-full bg-[#164e3b] px-2.5 py-0.5">
                <Text className="text-[10px] font-bold text-white">{count} items scanned</Text>
              </View>
            </View>

            {/* Basket Items List */}
            <Text className="mt-4 text-[11px] font-bold uppercase tracking-wider text-[#6b7280]">
              Scanned Shelf Items
            </Text>
            {items.map((item) => (
              <View
                key={item.product.name}
                className="mt-2.5 flex-row gap-3 rounded-2xl border border-[#e5e7eb] bg-white p-3 shadow-2xs">
                <View className="size-14 items-center justify-center rounded-xl bg-slate-50 border border-[#f0f2f5] overflow-hidden p-1">
                  {item.product.image ? (
                    <Image source={{ uri: item.product.image }} className="h-full w-full" resizeMode="contain" />
                  ) : (
                    <ShoppingBag size={22} color="#5b876e" opacity={0.5} />
                  )}
                </View>
                <View className="flex-1">
                  <Text numberOfLines={1} className="text-[12px] font-bold text-[#173f31]">
                    {item.product.name}
                  </Text>
                  <Text className="mt-0.5 text-[10px] text-[#6b7280]">{item.product.size} · Shelf Item</Text>
                  <View className="mt-2 flex-row items-center justify-between">
                    <View className="flex-row items-center gap-3">
                      <Pressable
                        onPress={() => changeQty(item.product.name, -1)}
                        hitSlop={6}
                        className="size-7 items-center justify-center rounded-lg border border-[#e5e7eb] bg-white">
                        <Minus size={12} color="#173f31" />
                      </Pressable>
                      <Text className="w-4 text-center text-[13px] font-bold text-[#173f31]">
                        {item.qty}
                      </Text>
                      <Pressable
                        onPress={() => changeQty(item.product.name, 1)}
                        hitSlop={6}
                        className="size-7 items-center justify-center rounded-lg bg-[#dff0d8]">
                        <Plus size={12} color="#21664b" />
                      </Pressable>
                    </View>
                    <Text className="text-[13px] font-bold text-[#173f31]">
                      ₹{item.product.price * item.qty}
                    </Text>
                  </View>
                </View>
                <Pressable
                  onPress={() => removeItem(item.product.name)}
                  hitSlop={8}
                  className="self-start">
                  <Trash2 size={15} color="#9ca3af" />
                </Pressable>
              </View>
            ))}

            {/* Quick Add More Button */}
            <Pressable
              onPress={() => router.replace('/(tabs)/scan')}
              className="mt-3 flex-row items-center justify-center gap-2 rounded-xl border border-dashed border-[#164e3b] bg-[#f5faf3] py-2.5">
              <ScanLine size={14} color="#164e3b" />
              <Text className="text-[11px] font-bold text-[#164e3b]">+ Scan Another Shelf Item</Text>
            </Pressable>

            {/* Coupon Code Section */}
            <View className="mt-4 rounded-2xl border border-[#e5e7eb] bg-white p-3.5">
              <View className="flex-row items-center gap-2">
                <Tag size={14} color="#2e8b65" />
                <Text className="text-[12px] font-bold text-[#173f31]">In-Store Promo / Member Points</Text>
              </View>
              {couponApplied ? (
                <View className="mt-2.5 flex-row items-center justify-between rounded-xl bg-[#e3f1dc] px-3 py-2">
                  <View className="flex-row items-center gap-2">
                    <Check size={14} color="#1f7956" />
                    <Text className="text-[11px] font-bold text-[#173f31]">{couponApplied}</Text>
                  </View>
                  <Pressable onPress={removeCoupon} hitSlop={6}>
                    <Text className="text-[10px] font-bold text-[#dc2626]">Remove</Text>
                  </Pressable>
                </View>
              ) : (
                <View className="mt-2.5 flex-row gap-2">
                  <TextInput
                    value={couponCode}
                    onChangeText={setCouponCode}
                    placeholder="Enter GB120"
                    placeholderTextColor="#9ca3af"
                    autoCapitalize="characters"
                    className="flex-1 rounded-xl border border-[#e5e7eb] bg-[#f9fafb] px-3 py-2 text-[11px] text-[#173f31]"
                  />
                  <Pressable
                    onPress={applyCoupon}
                    className="items-center justify-center rounded-xl bg-[#164e3b] px-4">
                    <Text className="text-[11px] font-bold text-white">Apply</Text>
                  </Pressable>
                </View>
              )}
            </View>

            {/* Payment Method Selector */}
            <View className="mt-4 rounded-2xl border border-[#e5e7eb] bg-white p-3.5">
              <Text className="text-[12px] font-bold text-[#173f31]">Self-Billing Payment Channel</Text>
              <View className="mt-2.5 gap-2">
                {paymentMethods.map((pm) => {
                  const active = paymentMethod === pm.id;
                  const Icon =
                    pm.id === 'razorpay'
                      ? ShieldCheck
                      : pm.id === 'upi'
                        ? Smartphone
                        : pm.id === 'card'
                          ? CreditCard
                          : Wallet;
                  return (
                    <Pressable
                      key={pm.id}
                      onPress={() => setPaymentMethod(pm.id)}
                      className={`flex-row items-center gap-3 rounded-xl border p-2.5 ${
                        active ? 'border-[#0c2340] bg-[#f0f4f8]' : 'border-[#e5e7eb] bg-[#f9fafb]'
                      }`}>
                      <View
                        className={`size-8 items-center justify-center rounded-lg ${
                          active ? 'bg-[#0c2340]' : 'bg-[#e5e7eb]'
                        }`}>
                        {pm.id === 'razorpay' ? (
                          <Text className="text-xs font-black text-[#3395ff]">R</Text>
                        ) : (
                          <Icon size={15} color={active ? '#ffffff' : '#4b5563'} />
                        )}
                      </View>
                      <View className="flex-1">
                        <View className="flex-row items-center gap-1.5">
                          <Text
                            className={`text-[11px] font-bold ${
                              active ? 'text-[#0c2340]' : 'text-[#173f31]'
                            }`}>
                            {pm.name}
                          </Text>
                          {pm.badge && (
                            <View className="rounded bg-[#e3f1dc] px-1.5 py-0.5">
                              <Text className="text-[8px] font-bold text-[#2e8b65]">{pm.badge}</Text>
                            </View>
                          )}
                        </View>
                        <Text className="text-[9px] text-[#6b7280]">{pm.subtitle}</Text>
                      </View>
                      <View
                        className={`size-4 items-center justify-center rounded-full border ${
                          active ? 'border-[#0c2340] bg-[#0c2340]' : 'border-[#9ca3af]'
                        }`}>
                        {active && <View className="size-1.5 rounded-full bg-white" />}
                      </View>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            {/* Bill details */}
            <View className="mt-4 rounded-2xl border border-[#e5e7eb] bg-white p-3.5">
              <Text className="text-[12px] font-bold text-[#173f31]">In-Store Bill Breakdown</Text>
              <View className="mt-2.5 flex-row items-center justify-between">
                <Text className="text-[11px] text-[#6b7280]">Shelf Items Total ({count} items)</Text>
                <Text className="text-[11px] font-medium text-[#374151]">₹{total}</Text>
              </View>
              {effectiveDiscount > 0 && (
                <View className="mt-1.5 flex-row items-center justify-between">
                  <Text className="text-[11px] text-[#1f7956]">Smart Savings Applied</Text>
                  <Text className="text-[11px] font-bold text-[#1f7956]">-₹{effectiveDiscount}</Text>
                </View>
              )}
              <View className="mt-1.5 flex-row items-center justify-between">
                <Text className="text-[11px] text-[#6b7280]">Self-Billing Convenience Fee</Text>
                <Text className="text-[11px] font-bold text-[#1f7956]">FREE (₹0)</Text>
              </View>
              <View className="mt-2.5 border-t border-[#f0f2ef] pt-2 flex-row items-center justify-between">
                <Text className="text-[13px] font-bold text-[#173f31]">Total Amount to Pay</Text>
                <Text className="text-[18px] font-bold text-[#164e3b]">₹{grand}</Text>
              </View>
            </View>
          </ScrollView>

          {/* Checkout Bar */}
          <View
            className="border-t border-[#e5e7eb] bg-white px-5 pt-3"
            style={{ paddingBottom: Math.max(insets.bottom, 14) + 4 }}>
            <Pressable
              onPress={() => setShowRazorpay(true)}
              disabled={isSubmitting}
              className="flex-row items-center justify-center gap-2 rounded-2xl bg-[#0c2340] py-3.5 shadow-md active:opacity-90">
              <Text className="text-base font-black text-[#3395ff]">R</Text>
              <Text className="text-[13px] font-bold text-white">
                Pay ₹{grand} with Razorpay & Get Exit Pass
              </Text>
            </Pressable>
            <Text className="mt-1.5 text-center text-[9px] text-[#6b7280]">
              Skip the queue · Digital QR pass generated upon payment
            </Text>
          </View>
        </>
      )}

      {/* Razorpay Modal */}
      <MobileRazorpayModal
        visible={showRazorpay}
        amount={grand}
        orderId={`#SB-${Math.floor(8200 + Math.random() * 900)}`}
        storeName={storeInfo.name}
        itemsCount={count}
        onSuccess={(paymentId) => {
          setShowRazorpay(false);
          handlePlaceOrder(paymentId);
        }}
        onCancel={() => setShowRazorpay(false)}
      />
    </Screen>
  );
}
