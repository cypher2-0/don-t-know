import { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Easing,
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
  ArrowRight,
  Banknote,
  Check,
  CheckCircle2,
  ChevronLeft,
  CreditCard,
  Flame,
  Lock,
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

  // Button pulse animation
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const beaconAnim = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    // Pulse animation for checkout button
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.025,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );
    pulseLoop.start();

    // Beacon glow animation
    const beaconLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(beaconAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(beaconAnim, {
          toValue: 0.4,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    );
    beaconLoop.start();

    return () => {
      pulseLoop.stop();
      beaconLoop.stop();
    };
  }, [pulseAnim, beaconAnim]);

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
      <View className="flex-row items-center justify-between px-5 pb-3 pt-3 border-b border-slate-100 bg-white">
        <Pressable
          onPress={() => router.back()}
          hitSlop={10}
          className="size-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 active:bg-slate-100">
          <ChevronLeft size={18} color="#173f31" />
        </Pressable>
        <View className="items-center">
          <Text className="text-[14px] font-extrabold text-[#173f31]">In-Store Basket</Text>
          <View className="flex-row items-center gap-1 mt-0.5">
            <Animated.View style={{ opacity: beaconAnim }} className="size-2 rounded-full bg-[#10b981]" />
            <Text className="text-[9px] font-bold text-[#10b981] tracking-wider uppercase">
              Skip The Billing Line
            </Text>
          </View>
        </View>
        <Pressable
          onPress={() => router.replace('/(tabs)/scan')}
          className="size-9 items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50 active:bg-emerald-100">
          <ScanLine size={17} color="#164e3b" />
        </Pressable>
      </View>

      {count === 0 ? (
        <View className="flex-1 items-center justify-center px-8">
          <View className="size-24 items-center justify-center rounded-full bg-[#f0f4ee] shadow-inner">
            <ShoppingBag size={40} color="#8a948c" />
          </View>
          <Text className="mt-5 text-[16px] font-extrabold text-[#173f31]">Your shopping basket is empty</Text>
          <Text className="mt-2 text-center text-[12px] leading-5 text-[#6b7280]">
            Scan barcodes directly from the store shelves using the scanner to build your self-billing basket.
          </Text>
          <Pressable
            onPress={() => router.replace('/(tabs)/scan')}
            className="mt-6 flex-row items-center gap-2 rounded-2xl bg-[#164e3b] px-6 py-3.5 shadow-md active:opacity-90">
            <ScanLine size={17} color="#ffffff" />
            <Text className="text-[13px] font-bold text-white">Start Scanning Shelves</Text>
          </Pressable>
        </View>
      ) : (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 18, paddingTop: 14, paddingBottom: 30 }}>
            {/* Modern Skip The Line Hero Badge */}
            <View className="rounded-3xl bg-[#164e3b] p-4 shadow-md">
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-2.5 flex-1 pr-2">
                  <View className="size-9 items-center justify-center rounded-xl bg-white/15">
                    <CheckCircle2 size={18} color="#b7d66b" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-[12px] font-extrabold text-white">
                      Self-Billing Mode Active
                    </Text>
                    <Text className="text-[10px] text-emerald-100">
                      {storeInfo.name} · {storeInfo.exitGate}
                    </Text>
                  </View>
                </View>
                <View className="rounded-xl bg-white/20 px-2.5 py-1">
                  <Text className="text-[9px] font-extrabold text-white">0 MIN QUEUE</Text>
                </View>
              </View>
              <View className="mt-3 flex-row items-center justify-between rounded-xl bg-black/15 px-3 py-1.5">
                <View className="flex-row items-center gap-1.5">
                  <QrCode size={12} color="#b7d66b" />
                  <Text className="text-[10px] font-semibold text-emerald-100">
                    Pay on phone & show digital QR pass at turnstile
                  </Text>
                </View>
              </View>
            </View>

            {/* In-Basket Count Banner */}
            <View className="mt-3.5 flex-row items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-xs">
              <View className="flex-row items-center gap-2">
                <ScanLine size={16} color="#164e3b" />
                <Text className="text-[12px] font-extrabold text-[#173f31]">Physical Basket Items</Text>
              </View>
              <View className="rounded-full bg-[#164e3b] px-3 py-1">
                <Text className="text-[10px] font-extrabold text-white">{count} items verified</Text>
              </View>
            </View>

            {/* Scanned Items Section Header */}
            <View className="mt-5 flex-row items-center justify-between">
              <Text className="text-[11px] font-extrabold uppercase tracking-wider text-[#64748b]">
                Scanned Shelf Items ({items.length})
              </Text>
              <Text className="text-[9px] font-semibold text-[#164e3b]">Tap +/- to adjust</Text>
            </View>

            {/* Scanned Items List */}
            <View className="mt-2.5 gap-2.5">
              {items.map((item) => (
                <View
                  key={item.product.name}
                  className="flex-row gap-3 rounded-3xl border border-slate-200 bg-white p-3.5 shadow-sm">
                  <View className="size-16 items-center justify-center rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden p-1 shadow-xs">
                    {item.product.image ? (
                      <Image
                        source={{ uri: item.product.image }}
                        className="h-full w-full rounded-xl"
                        resizeMode="cover"
                      />
                    ) : (
                      <ShoppingBag size={22} color="#5b876e" opacity={0.5} />
                    )}
                  </View>
                  <View className="flex-1 justify-between">
                    <View>
                      <View className="flex-row items-start justify-between">
                        <Text numberOfLines={1} className="flex-1 text-[13px] font-bold text-[#173f31] pr-2">
                          {item.product.name}
                        </Text>
                        <Pressable
                          onPress={() => removeItem(item.product.name)}
                          hitSlop={8}
                          className="size-6 items-center justify-center rounded-full bg-slate-100 active:bg-rose-50">
                          <Trash2 size={13} color="#94a3b8" />
                        </Pressable>
                      </View>
                      <Text className="text-[10px] text-[#64748b]">
                        {item.product.size} · {item.product.aisle || 'Shelf'}
                      </Text>
                    </View>

                    <View className="flex-row items-center justify-between pt-1">
                      {/* Quantity Selector Pill */}
                      <View className="flex-row items-center gap-2 rounded-xl bg-slate-100 p-1">
                        <Pressable
                          onPress={() => changeQty(item.product.name, -1)}
                          hitSlop={6}
                          className="size-6 items-center justify-center rounded-lg bg-white shadow-xs active:bg-slate-200">
                          <Minus size={11} color="#1e293b" />
                        </Pressable>
                        <Text className="w-5 text-center text-[12px] font-extrabold text-[#173f31]">
                          {item.qty}
                        </Text>
                        <Pressable
                          onPress={() => changeQty(item.product.name, 1)}
                          hitSlop={6}
                          className="size-6 items-center justify-center rounded-lg bg-[#164e3b] shadow-xs active:opacity-90">
                          <Plus size={11} color="#ffffff" />
                        </Pressable>
                      </View>

                      {/* Price Display */}
                      <View className="items-end">
                        <Text className="text-[14px] font-black text-[#164e3b]">
                          ₹{item.product.price * item.qty}
                        </Text>
                        {item.qty > 1 && (
                          <Text className="text-[9px] text-[#94a3b8]">₹{item.product.price} each</Text>
                        )}
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </View>

            {/* Quick Add More Button */}
            <Pressable
              onPress={() => router.replace('/(tabs)/scan')}
              className="mt-3.5 flex-row items-center justify-center gap-2 rounded-2xl border border-emerald-300 bg-emerald-50/70 py-3 active:bg-emerald-100">
              <ScanLine size={15} color="#164e3b" />
              <Text className="text-[12px] font-extrabold text-[#164e3b]">+ Scan Another Shelf Item</Text>
            </Pressable>

            {/* In-Store Promo Coupon */}
            <View className="mt-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-2">
                  <View className="size-6 items-center justify-center rounded-lg bg-emerald-100">
                    <Tag size={12} color="#164e3b" />
                  </View>
                  <Text className="text-[12px] font-bold text-[#173f31]">Store Promos & Coupons</Text>
                </View>
                <Pressable onPress={() => setCouponCode('GB120')}>
                  <Text className="text-[10px] font-bold text-[#164e3b]">Use GB120</Text>
                </Pressable>
              </View>

              {couponApplied ? (
                <View className="mt-3 flex-row items-center justify-between rounded-xl bg-emerald-50 px-3.5 py-2.5 border border-emerald-200">
                  <View className="flex-row items-center gap-2">
                    <Sparkles size={14} color="#059669" />
                    <Text className="text-[11px] font-bold text-[#059669]">{couponApplied}</Text>
                  </View>
                  <Pressable onPress={removeCoupon} hitSlop={6}>
                    <Text className="text-[10px] font-extrabold text-rose-600">REMOVE</Text>
                  </Pressable>
                </View>
              ) : (
                <View className="mt-3 flex-row gap-2">
                  <TextInput
                    value={couponCode}
                    onChangeText={setCouponCode}
                    placeholder="Enter promo code (e.g. GB120)"
                    placeholderTextColor="#94a3b8"
                    autoCapitalize="characters"
                    className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-[11px] text-[#173f31]"
                  />
                  <Pressable
                    onPress={applyCoupon}
                    className="items-center justify-center rounded-xl bg-[#164e3b] px-5 shadow-xs active:opacity-90">
                    <Text className="text-[11px] font-bold text-white">Apply</Text>
                  </Pressable>
                </View>
              )}
            </View>

            {/* Payment Method Selector */}
            <View className="mt-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
              <View className="flex-row items-center justify-between">
                <Text className="text-[12px] font-extrabold text-[#173f31]">Self-Billing Payment Channel</Text>
                <View className="flex-row items-center gap-1">
                  <Lock size={10} color="#059669" />
                  <Text className="text-[9px] font-bold text-[#059669]">256-Bit SSL</Text>
                </View>
              </View>

              <View className="mt-3 gap-2">
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
                      className={`flex-row items-center gap-3 rounded-2xl border p-3 ${
                        active
                          ? 'border-[#0c2340] bg-[#f2f7fc] shadow-xs'
                          : 'border-slate-200 bg-slate-50/50'
                      }`}>
                      <View
                        className={`size-9 items-center justify-center rounded-xl ${
                          active ? 'bg-[#0c2340]' : 'bg-slate-200'
                        }`}>
                        {pm.id === 'razorpay' ? (
                          <Text className="text-[13px] font-black text-[#3395ff]">R</Text>
                        ) : (
                          <Icon size={16} color={active ? '#ffffff' : '#64748b'} />
                        )}
                      </View>
                      <View className="flex-1">
                        <View className="flex-row items-center gap-1.5">
                          <Text
                            className={`text-[12px] font-bold ${
                              active ? 'text-[#0c2340]' : 'text-[#173f31]'
                            }`}>
                            {pm.name}
                          </Text>
                          {pm.badge && (
                            <View className="rounded-full bg-emerald-100 px-2 py-0.5">
                              <Text className="text-[8px] font-extrabold text-[#164e3b]">{pm.badge}</Text>
                            </View>
                          )}
                        </View>
                        <Text className="text-[10px] text-[#64748b]">{pm.subtitle}</Text>
                      </View>
                      <View
                        className={`size-5 items-center justify-center rounded-full border-2 ${
                          active ? 'border-[#0c2340] bg-[#0c2340]' : 'border-slate-300'
                        }`}>
                        {active && <View className="size-2 rounded-full bg-white" />}
                      </View>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            {/* Bill Details Card */}
            <View className="mt-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
              <Text className="text-[12px] font-extrabold text-[#173f31]">In-Store Receipt Breakdown</Text>
              <View className="mt-3 flex-row items-center justify-between">
                <Text className="text-[11px] text-[#64748b]">Shelf Items Subtotal ({count} items)</Text>
                <Text className="text-[11px] font-bold text-[#1e293b]">₹{total}</Text>
              </View>
              {effectiveDiscount > 0 && (
                <View className="mt-2 flex-row items-center justify-between">
                  <Text className="text-[11px] text-[#059669]">Smart Savings Coupon</Text>
                  <Text className="text-[11px] font-bold text-[#059669]">-₹{effectiveDiscount}</Text>
                </View>
              )}
              <View className="mt-2 flex-row items-center justify-between">
                <Text className="text-[11px] text-[#64748b]">Turnstile Exit Pass Convenience</Text>
                <View className="flex-row items-center gap-1">
                  <Text className="text-[10px] text-[#94a3b8] line-through">₹25</Text>
                  <Text className="text-[11px] font-extrabold text-[#059669]">FREE (₹0)</Text>
                </View>
              </View>
              <View className="mt-3 border-t border-slate-100 pt-3 flex-row items-center justify-between">
                <View>
                  <Text className="text-[13px] font-black text-[#173f31]">Final Amount</Text>
                  <Text className="text-[9px] text-[#64748b]">Includes all retail taxes</Text>
                </View>
                <Text className="text-[20px] font-black text-[#164e3b]">₹{grand}</Text>
              </View>
            </View>
          </ScrollView>

          {/* Sticky Checkout Floating Bar */}
          <View
            className="border-t border-slate-200 bg-white px-5 pt-3.5 shadow-2xl"
            style={{ paddingBottom: Math.max(insets.bottom, 16) + 6 }}>
            <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
              <Pressable
                onPress={() => setShowRazorpay(true)}
                disabled={isSubmitting}
                className="flex-row items-center justify-between rounded-2xl bg-[#0c2340] px-5 py-3.5 shadow-xl active:opacity-95">
                <View className="flex-row items-center gap-2.5">
                  <View className="size-8 items-center justify-center rounded-xl bg-[#3395ff]">
                    <Text className="text-[13px] font-black text-[#0c2340]">R</Text>
                  </View>
                  <View>
                    <Text className="text-[11px] font-bold text-slate-300">Total to Pay</Text>
                    <Text className="text-[16px] font-black text-white">₹{grand}</Text>
                  </View>
                </View>
                <View className="flex-row items-center gap-1.5 rounded-xl bg-[#3395ff] px-4 py-2">
                  <Text className="text-[12px] font-extrabold text-[#0c2340]">Pay & Exit</Text>
                  <ArrowRight size={14} color="#0c2340" />
                </View>
              </Pressable>
            </Animated.View>
            <View className="mt-2 flex-row items-center justify-center gap-1">
              <ShieldCheck size={11} color="#059669" />
              <Text className="text-[10px] font-semibold text-[#64748b]">
                Fastest Exit · Digital Gate QR pass generated instantly
              </Text>
            </View>
          </View>
        </>
      )}

      {/* Modern Razorpay Bottom Payment Sheet */}
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
