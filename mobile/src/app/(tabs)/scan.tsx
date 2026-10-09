import { useState } from 'react';
import { Barcode, Camera, Check, Plus, QrCode, Sparkles } from 'lucide-react-native';
import { router } from 'expo-router';
import { Alert, Pressable, ScrollView, Text, TextInput, View } from 'react-native';

import { useCart } from '@/components/cart-provider';
import { CartPill } from '@/components/cart-pill';
import { Screen } from '@/components/screen';
import { customerProducts, type CustomerProduct } from '@/lib/mock-data';

export default function ScanScreen() {
  const { addToCart, count } = useCart();
  const [scannedProduct, setScannedProduct] = useState<CustomerProduct | null>(null);
  const [manualCode, setManualCode] = useState('');
  const [mode, setMode] = useState<'camera' | 'manual'>('camera');
  const [isScanning, setIsScanning] = useState(false);

  const simulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      // Pick random product
      const random = customerProducts[Math.floor(Math.random() * customerProducts.length)];
      setScannedProduct(random);
      setIsScanning(false);
    }, 600);
  };

  const handleManualSearch = () => {
    const term = manualCode.trim().toLowerCase();
    const match = customerProducts.find(
      (p) => p.name.toLowerCase().includes(term) || p.category.toLowerCase().includes(term),
    );
    if (match) {
      setScannedProduct(match);
    } else {
      Alert.alert('Item not found', 'No product matching this barcode or code in our catalog.');
    }
  };

  return (
    <Screen>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 24, alignItems: 'center' }}>
        <Text className="text-[18px] font-bold text-[#173f31]">In-Store Scan & Pay</Text>
        <Text className="mt-1 text-center text-[12px] text-[#6b7280]">
          Scan barcodes at GreenBasket to skip the billing queue.
        </Text>

        {/* Mode Selector */}
        <View className="mt-4 flex-row rounded-xl bg-[#e5e7eb] p-1">
          <Pressable
            onPress={() => setMode('camera')}
            className={`rounded-lg px-4 py-1.5 ${mode === 'camera' ? 'bg-white shadow-sm' : ''}`}>
            <Text
              className={`text-[11px] font-bold ${mode === 'camera' ? 'text-[#173f31]' : 'text-[#6b7280]'}`}>
              Scan Viewfinder
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setMode('manual')}
            className={`rounded-lg px-4 py-1.5 ${mode === 'manual' ? 'bg-white shadow-sm' : ''}`}>
            <Text
              className={`text-[11px] font-bold ${mode === 'manual' ? 'text-[#173f31]' : 'text-[#6b7280]'}`}>
              Enter Code
            </Text>
          </Pressable>
        </View>

        {mode === 'camera' ? (
          <View className="mt-6 w-full items-center">
            {/* Viewfinder Target */}
            <View className="relative size-60 items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed border-[#2e8b65] bg-[#f2f8e8]">
              <Barcode size={72} color="#2e8b65" opacity={0.6} />
              {isScanning && (
                <View className="absolute inset-x-0 h-1 bg-[#2e8b65] shadow-lg animate-pulse" />
              )}
              <View className="absolute bottom-3 rounded-full bg-[#164e3b] px-3 py-1">
                <Text className="text-[9px] font-semibold text-white">
                  {isScanning ? 'Reading barcode…' : 'Aim at product barcode'}
                </Text>
              </View>
            </View>

            <Pressable
              onPress={simulateScan}
              disabled={isScanning}
              className="mt-6 flex-row items-center gap-2 rounded-xl bg-[#164e3b] px-6 py-3.5 active:opacity-90">
              <Camera size={16} color="#ffffff" />
              <Text className="text-[12px] font-bold text-white">
                {isScanning ? 'Scanning…' : 'Tap to scan barcode'}
              </Text>
            </Pressable>
          </View>
        ) : (
          <View className="mt-6 w-full rounded-2xl border border-[#e5e7eb] bg-white p-4">
            <Text className="text-[12px] font-bold text-[#173f31]">Enter product or barcode number</Text>
            <View className="mt-3 flex-row gap-2">
              <TextInput
                value={manualCode}
                onChangeText={setManualCode}
                placeholder="e.g. Milk, Atta, 890123"
                placeholderTextColor="#9ca3af"
                className="flex-1 rounded-xl border border-[#e5e7eb] bg-[#f9fafb] px-3 py-2 text-[12px] text-[#173f31]"
              />
              <Pressable
                onPress={handleManualSearch}
                className="items-center justify-center rounded-xl bg-[#164e3b] px-4">
                <Text className="text-[11px] font-bold text-white">Look up</Text>
              </Pressable>
            </View>
          </View>
        )}

        {/* Scanned Result Card */}
        {scannedProduct && (
          <View className="mt-6 w-full rounded-2xl border border-[#b7d66b] bg-[#f6fbf2] p-4 shadow-sm">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-1.5">
                <Sparkles size={14} color="#1f7956" />
                <Text className="text-[11px] font-bold text-[#1f7956]">Product Identified!</Text>
              </View>
              <Text className="text-[10px] text-[#6b7280]">EAN: 89010300{Math.floor(Math.random() * 899 + 100)}</Text>
            </View>

            <View className="mt-3 flex-row items-center justify-between">
              <View>
                <Text className="text-[14px] font-bold text-[#173f31]">{scannedProduct.name}</Text>
                <Text className="mt-0.5 text-[11px] text-[#6b7280]">
                  {scannedProduct.size} · {scannedProduct.category}
                </Text>
              </View>
              <Text className="text-[16px] font-bold text-[#173f31]">₹{scannedProduct.price}</Text>
            </View>

            <View className="mt-4 flex-row gap-2">
              <Pressable
                onPress={() => {
                  addToCart(scannedProduct, 1);
                  Alert.alert('Added', `${scannedProduct.name} added to cart!`);
                }}
                className="flex-1 flex-row items-center justify-center gap-1.5 rounded-xl bg-[#164e3b] py-3">
                <Plus size={14} color="#ffffff" />
                <Text className="text-[12px] font-bold text-white">Add to Cart</Text>
              </Pressable>
              <Pressable
                onPress={() =>
                  router.push(`/product/${encodeURIComponent(scannedProduct.name)}`)
                }
                className="rounded-xl border border-[#e5e7eb] bg-white px-4 py-3">
                <Text className="text-[12px] font-semibold text-[#173f31]">Details</Text>
              </Pressable>
            </View>
          </View>
        )}
      </ScrollView>
      <CartPill />
    </Screen>
  );
}
