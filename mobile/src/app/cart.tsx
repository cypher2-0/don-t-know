import { Banknote, Check, ChevronLeft, CreditCard, MapPin, Minus, Plus, ShoppingBag, Smartphone, Sparkles, Tag, Trash2, Wallet } from 'lucide-react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useCart } from '@/components/cart-provider';
import { Screen } from '@/components/screen';
import { deliverySlots, paymentMethods, storeInfo } from '@/lib/mock-data';

const DELIVERY_FEE = 30;
const FREE_DELIVERY_OVER = 499;

export default function CartScreen() {
  const { items, count, total, changeQty, removeItem, placeOrder } = useCart();
  const [slot, setSlot] = useState(deliverySlots[0]);
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0].id);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState('');
  const [tip, setTip] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const insets = useSafeAreaInsets();

  const delivery = total >= FREE_DELIVERY_OVER ? 0 : DELIVERY_FEE;
  const effectiveDiscount = Math.min(discount, total);
  const grand = Math.max(0, total - effectiveDiscount + delivery + tip);

  const applyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (code === 'GB120' || code === 'SMARTSAVE') {
      if (total < 250) {
        Alert.alert('Coupon restriction', 'GB120 requires a minimum order value of ₹250.');
        return;
      }
      setDiscount(120);
      setCouponApplied('GB120 (-₹120)');
      setCouponCode('');
    } else if (code === 'FREESHIP') {
      setDiscount(DELIVERY_FEE);
      setCouponApplied('FREESHIP (-₹30)');
      setCouponCode('');
    } else {
      Alert.alert('Invalid coupon', 'Try code "GB120" to redeem your smart savings discount.');
    }
  };

  const removeCoupon = () => {
    setDiscount(0);
    setCouponApplied('');
  };

  const selectedPayment = paymentMethods.find((p) => p.id === paymentMethod)?.name ?? 'UPI';

  const handlePlaceOrder = () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    const order = placeOrder({
      slot,
      paymentMethod: selectedPayment,
      discount: effectiveDiscount,
      tip,
      delivery,
    });
    router.replace(`/order-placed?id=${encodeURIComponent(order.id)}`);
  };

  return (
    <Screen>
      <View className="flex-row items-center justify-between px-5 pb-3 pt-4">
        <Pressable
          onPress={() => router.back()}
          hitSlop={8}
          className="size-9 items-center justify-center rounded-xl border border-[#e5e7eb] bg-white">
          <ChevronLeft size={18} color="#173f31" />
        </Pressable>
        <Text className="text-[12px] font-bold text-[#173f31]">Your cart</Text>
        <View className="size-9" />
      </View>

      {count === 0 ? (
        <View className="flex-1 items-center justify-center px-8">
          <View className="size-20 items-center justify-center rounded-full bg-[#f0f4ee]">
            <ShoppingBag size={32} color="#8a948c" />
          </View>
          <Text className="mt-5 text-[15px] font-bold text-[#173f31]">Your cart is empty</Text>
          <Text className="mt-2 text-center text-[12px] leading-5 text-[#6b7280]">
            Add fresh picks from the store and they&apos;ll show up right here.
          </Text>
          <Pressable
            onPress={() => {
              if (router.canGoBack()) {
                router.back();
              } else {
                router.replace('/(tabs)');
              }
            }}
            className="mt-6 rounded-xl bg-[#164e3b] px-5 py-3">
            <Text className="text-[12px] font-semibold text-white">Browse products</Text>
          </Pressable>
        </View>
      ) : (
        <>
          <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }}>
            {/* Free Delivery Bar */}
            <View className="mt-2 rounded-xl bg-[#e3f1dc] p-3">
              <View className="flex-row items-center justify-between">
                <Text className="text-[11px] font-semibold text-[#173f31]">
                  {delivery === 0
                    ? '🎉 You unlocked FREE Delivery!'
                    : `Add ₹${FREE_DELIVERY_OVER - total} more for FREE Delivery`}
                </Text>
                <Text className="text-[10px] font-bold text-[#2e8b65]">
                  {Math.min(100, Math.round((total / FREE_DELIVERY_OVER) * 100))}%
                </Text>
              </View>
              <View className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#c9e4bf]">
                <View
                  style={{ width: `${Math.min(100, (total / FREE_DELIVERY_OVER) * 100)}%` }}
                  className="h-full bg-[#2e8b65]"
                />
              </View>
            </View>

            {/* Cart Items */}
            {items.map((item) => (
              <View
                key={item.product.name}
                className="mt-3 flex-row gap-3 rounded-2xl border border-[#e5e7eb] bg-white p-3 shadow-sm">
                <View
                  className={`size-14 items-center justify-center rounded-xl ${item.product.color}`}>
                  <ShoppingBag size={22} color="#5b876e" opacity={0.5} />
                </View>
                <View className="flex-1">
                  <Text numberOfLines={1} className="text-[12px] font-bold text-[#173f31]">
                    {item.product.name}
                  </Text>
                  <Text className="mt-0.5 text-[10px] text-[#6b7280]">{item.product.size}</Text>
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

            {/* Delivery address */}
            <View className="mt-4 gap-2.5 rounded-2xl border border-[#e5e7eb] bg-white p-4">
              <View className="flex-row items-center gap-2.5">
                <MapPin size={14} color="#2e8b65" />
                <View className="flex-1">
                  <Text className="text-[11px] font-bold text-[#173f31]">Delivery address (Home)</Text>
                  <Text className="mt-0.5 text-[10px] leading-4 text-[#6b7280]">
                    {storeInfo.address}
                  </Text>
                </View>
              </View>
            </View>

            {/* Delivery slot */}
            <Text className="mt-5 text-[11px] font-bold uppercase tracking-wider text-[#6b7280]">
              Delivery slot
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mt-2"
              contentContainerStyle={{ gap: 10 }}>
              {deliverySlots.map((s) => {
                const active = s === slot;
                return (
                  <Pressable
                    key={s}
                    onPress={() => setSlot(s)}
                    className={`rounded-full border px-3.5 py-2 ${active ? 'border-[#164e3b] bg-[#164e3b]' : 'border-[#e5e7eb] bg-white'}`}>
                    <Text
                      className={`text-[10px] font-semibold ${active ? 'text-white' : 'text-[#365a4a]'}`}>
                      {s}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>

            {/* Coupon Code Section */}
            <View className="mt-5 rounded-2xl border border-[#e5e7eb] bg-white p-4">
              <View className="flex-row items-center gap-2">
                <Tag size={14} color="#2e8b65" />
                <Text className="text-[12px] font-bold text-[#173f31]">Apply Promo / Coupon</Text>
              </View>
              {couponApplied ? (
                <View className="mt-3 flex-row items-center justify-between rounded-xl bg-[#e3f1dc] px-3 py-2.5">
                  <View className="flex-row items-center gap-2">
                    <Check size={14} color="#1f7956" />
                    <Text className="text-[11px] font-bold text-[#173f31]">{couponApplied}</Text>
                  </View>
                  <Pressable onPress={removeCoupon} hitSlop={6}>
                    <Text className="text-[10px] font-bold text-[#dc2626]">Remove</Text>
                  </Pressable>
                </View>
              ) : (
                <View className="mt-3 flex-row gap-2">
                  <TextInput
                    value={couponCode}
                    onChangeText={setCouponCode}
                    placeholder="Enter GB120 or FREESHIP"
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

            {/* Tip Delivery Partner */}
            <View className="mt-4 rounded-2xl border border-[#e5e7eb] bg-white p-4">
              <View className="flex-row items-center gap-2">
                <Sparkles size={14} color="#2e8b65" />
                <Text className="text-[12px] font-bold text-[#173f31]">Tip delivery partner</Text>
              </View>
              <Text className="mt-1 text-[10px] text-[#6b7280]">
                100% of tips go directly to your delivery hero.
              </Text>
              <View className="mt-3 flex-row gap-2">
                {[0, 10, 20, 30].map((amount) => {
                  const active = tip === amount;
                  return (
                    <Pressable
                      key={amount}
                      onPress={() => setTip(amount)}
                      className={`flex-1 items-center rounded-xl border py-2 ${active ? 'border-[#164e3b] bg-[#164e3b]' : 'border-[#e5e7eb] bg-[#f9fafb]'}`}>
                      <Text
                        className={`text-[11px] font-bold ${active ? 'text-white' : 'text-[#173f31]'}`}>
                        {amount === 0 ? 'None' : `₹${amount}`}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            {/* Payment method selection */}
            <View className="mt-4 rounded-2xl border border-[#e5e7eb] bg-white p-4">
              <Text className="text-[12px] font-bold text-[#173f31]">Payment method</Text>
              <View className="mt-3 gap-2.5">
                {paymentMethods.map((pm) => {
                  const active = paymentMethod === pm.id;
                  const Icon =
                    pm.id === 'upi'
                      ? Smartphone
                      : pm.id === 'cod'
                        ? Banknote
                        : pm.id === 'card'
                          ? CreditCard
                          : Wallet;
                  return (
                    <Pressable
                      key={pm.id}
                      onPress={() => setPaymentMethod(pm.id)}
                      className={`flex-row items-center gap-3 rounded-xl border p-3 ${active ? 'border-[#164e3b] bg-[#f2f8ee]' : 'border-[#e5e7eb] bg-[#f9fafb]'}`}>
                      <View
                        className={`size-8 items-center justify-center rounded-lg ${active ? 'bg-[#164e3b]' : 'bg-[#e5e7eb]'}`}>
                        <Icon size={16} color={active ? '#ffffff' : '#4b5563'} />
                      </View>
                      <View className="flex-1">
                        <View className="flex-row items-center gap-2">
                          <Text
                            className={`text-[12px] font-bold ${active ? 'text-[#164e3b]' : 'text-[#173f31]'}`}>
                            {pm.name}
                          </Text>
                          {pm.badge && (
                            <View className="rounded bg-[#e3f1dc] px-1.5 py-0.5">
                              <Text className="text-[8px] font-bold text-[#2e8b65]">{pm.badge}</Text>
                            </View>
                          )}
                        </View>
                        <Text className="mt-0.5 text-[10px] text-[#6b7280]">{pm.subtitle}</Text>
                      </View>
                      <View
                        className={`size-4 items-center justify-center rounded-full border ${active ? 'border-[#164e3b] bg-[#164e3b]' : 'border-[#9ca3af]'}`}>
                        {active && <View className="size-1.5 rounded-full bg-white" />}
                      </View>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            {/* Bill details */}
            <View className="mt-4 rounded-2xl border border-[#e5e7eb] bg-white p-4">
              <Text className="text-[12px] font-bold text-[#173f31]">Bill details</Text>
              <View className="mt-3 flex-row items-center justify-between">
                <Text className="text-[11px] text-[#6b7280]">Items total ({count})</Text>
                <Text className="text-[11px] font-medium text-[#374151]">₹{total}</Text>
              </View>
              {effectiveDiscount > 0 && (
                <View className="mt-2 flex-row items-center justify-between">
                  <Text className="text-[11px] text-[#1f7956]">Coupon savings</Text>
                  <Text className="text-[11px] font-bold text-[#1f7956]">-₹{effectiveDiscount}</Text>
                </View>
              )}
              <View className="mt-2 flex-row items-center justify-between">
                <Text className="text-[11px] text-[#6b7280]">Delivery charge</Text>
                <Text
                  className={`text-[11px] font-medium ${delivery === 0 ? 'font-bold text-[#1f7956]' : 'text-[#374151]'}`}>
                  {delivery === 0 ? 'FREE' : `₹${delivery}`}
                </Text>
              </View>
              {tip > 0 && (
                <View className="mt-2 flex-row items-center justify-between">
                  <Text className="text-[11px] text-[#6b7280]">Delivery tip</Text>
                  <Text className="text-[11px] font-medium text-[#374151]">₹{tip}</Text>
                </View>
              )}
              <View className="mt-3 border-t border-[#f0f2ef] pt-3">
                <View className="flex-row items-center justify-between">
                  <Text className="text-[13px] font-bold text-[#173f31]">To pay</Text>
                  <Text className="text-[16px] font-bold text-[#173f31]">₹{grand}</Text>
                </View>
              </View>
            </View>
          </ScrollView>

          <View
            className="border-t border-[#e5e7eb] bg-white px-5 pt-3"
            style={{ paddingBottom: Math.max(insets.bottom, 14) + 4 }}>
            <Pressable
              onPress={handlePlaceOrder}
              disabled={isSubmitting}
              className="items-center rounded-xl bg-[#164e3b] py-3.5 active:opacity-90">
              <Text className="text-[13px] font-bold text-white">
                {isSubmitting ? 'Placing order…' : `Place order · ₹${grand}`}
              </Text>
            </Pressable>
          </View>
        </>
      )}
    </Screen>
  );
}
