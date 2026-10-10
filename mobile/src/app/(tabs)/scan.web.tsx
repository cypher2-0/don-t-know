import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  ArrowRight,
  Barcode,
  Camera,
  Check,
  ChevronRight,
  Minus,
  Plus,
  QrCode,
  ScanLine,
  ShoppingBag,
  Sparkles,
  Zap,
} from "lucide-react-native";
import { router } from "expo-router";
import { useCart } from "@/components/cart-provider";
import { CartPill } from "@/components/cart-pill";
import { Screen } from "@/components/screen";
import { customerProducts, type CustomerProduct } from "@/lib/mock-data";

export default function ScanScreen() {
  const { addToCart, items, count, total, changeQty } = useCart();
  const [scannedProduct, setScannedProduct] = useState<CustomerProduct | null>(
    null,
  );
  const [manualCode, setManualCode] = useState("");
  const [mode, setMode] = useState<"camera" | "manual">("camera");
  const [isScanning, setIsScanning] = useState(false);
  const [scanMessage, setScanMessage] = useState<string | null>(null);
  
  // Initialize html5-qrcode for the web platform
  useEffect(() => {
    if (mode === "camera" && typeof window !== "undefined") {
      let scannerInstance: any = null;
      try {
        const html5Module = require("html5-qrcode");
        const { Html5QrcodeScanner, Html5QrcodeSupportedFormats } = html5Module;
        const scanner = new Html5QrcodeScanner("reader", {
          fps: 10,
          formatsToSupport: [
            Html5QrcodeSupportedFormats.QR_CODE,
            Html5QrcodeSupportedFormats.EAN_13,
            Html5QrcodeSupportedFormats.EAN_8,
            Html5QrcodeSupportedFormats.CODE_128,
            Html5QrcodeSupportedFormats.UPC_A,
            Html5QrcodeSupportedFormats.UPC_E
          ]
        }, false);
        scannerInstance = scanner;
        
        scanner.render((decodedText: string) => {
          triggerScan(decodedText);
        }, () => {});
      } catch {}

      return () => {
        try {
          if (scannerInstance) scannerInstance.clear();
        } catch {}
      };
    }
  }, [mode, isScanning]);

  // Animated laser line
  const laserAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(laserAnim, {
          toValue: 200,
          duration: 1600,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(laserAnim, {
          toValue: 0,
          duration: 1600,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [laserAnim]);

  const triggerScan = async (productOrBarcode: CustomerProduct | string) => {
    if (isScanning) return;
    setIsScanning(true);
    setScanMessage("Processing...");

    try {
      if (typeof productOrBarcode === "string") {
        const scannedCode = productOrBarcode.trim();
        // Fallback to local mock data
        const match = customerProducts.find(
          (p) => p.barcode === scannedCode || scannedCode.includes(p.barcode) || p.barcode.includes(scannedCode),
        );
        
        if (match) {
          setScannedProduct(match);
          addToCart(match, 1);
          setScanMessage(`Beep! Added ${match.name} to basket`);
        } else {
          // DEMO MAGIC: If the product is not in the database, automatically generate it!
          const dynamicProduct: CustomerProduct = {
            barcode: scannedCode,
            name: scannedCode === '8901725013790' ? 'Bingo! Mad Angles' : `Scanned Item (${scannedCode.slice(-4)})`,
            size: '1 unit',
            price: Math.floor(Math.random() * 100) + 20,
            category: 'Store Item',
            color: 'bg-emerald-100',
            rating: 5.0
          };
          setScannedProduct(dynamicProduct);
          addToCart(dynamicProduct, 1);
          setScanMessage(`Beep! Added ${dynamicProduct.name} to basket`);
        }
      } else {
        // Mock scan fallback
        setScannedProduct(productOrBarcode as CustomerProduct);
        addToCart(productOrBarcode as CustomerProduct, 1);
        setScanMessage(`Beep! Added ${(productOrBarcode as CustomerProduct).name} to basket`);
      }
    } catch (e) {
      setScanMessage("Error scanning product");
    }

    setTimeout(() => {
      setIsScanning(false);
      setScanMessage(null);
    }, 1500);
  };

  const simulateRandomScan = () => {
    const random =
      customerProducts[Math.floor(Math.random() * customerProducts.length)];
    triggerScan(random);
  };

  const handleManualSearch = () => {
    const term = manualCode.trim().toLowerCase();
    if (!term) return;
    const match = customerProducts.find(
      (p) =>
        p.barcode.includes(term) ||
        p.name.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term),
    );
    if (match) {
      triggerScan(match);
      setManualCode("");
    } else {
      setScanMessage("Product code not found in store catalog");
      setTimeout(() => setScanMessage(null), 3000);
    }
  };

  return (
    <Screen>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingVertical: 20,
          alignItems: "center",
        }}
      >
        {/* Header */}
        <View className="items-center">
          <View className="flex-row items-center gap-2">
            <Zap size={16} color="#2e8b65" />
            <Text className="text-[18px] font-bold text-[#173f31]">
              In-Store Scan & Go
            </Text>
          </View>
          <Text className="mt-1 text-center text-[11px] text-[#6b7280]">
            Scan items as you put them in your basket to skip retail queues.
          </Text>
        </View>

        {/* Mode Selector */}
        <View className="mt-4 flex-row rounded-xl bg-[#e5e7eb] p-1">
          <Pressable
            onPress={() => setMode("camera")}
            className={`rounded-lg px-4 py-1.5 ${mode === "camera" ? "bg-white shadow-sm" : ""}`}
          >
            <Text
              className={`text-[11px] font-bold ${mode === "camera" ? "text-[#173f31]" : "text-[#6b7280]"}`}
            >
              Laser Viewfinder
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setMode("manual")}
            className={`rounded-lg px-4 py-1.5 ${mode === "manual" ? "bg-white shadow-sm" : ""}`}
          >
            <Text
              className={`text-[11px] font-bold ${mode === "manual" ? "text-[#173f31]" : "text-[#6b7280]"}`}
            >
              Enter Code / EAN
            </Text>
          </Pressable>
        </View>

        {mode === "camera" ? (
          <View className="mt-5 w-full items-center">
            <View className="relative size-60 items-center justify-center overflow-hidden rounded-3xl border-2 border-[#2e8b65] shadow-inner bg-black">
              <View nativeID="reader" style={{ width: "100%", height: "100%" }} />

              {/* Animated laser line */}
              <Animated.View
                style={{
                  transform: [{ translateY: laserAnim }],
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                }}
                className="h-0.5 bg-red-500 shadow-lg"
                pointerEvents="none"
              />

              <View className="absolute bottom-3 rounded-full bg-[#164e3b]/90 px-3 py-1 pointer-events-none">
                <Text className="text-[9px] font-semibold text-white">
                  {isScanning ? "Processing…" : "Aim at product barcode"}
                </Text>
              </View>
            </View>

            {scanMessage && (
              <View className="mt-3 rounded-lg bg-[#e3f1dc] px-3 py-1.5">
                <Text className="text-[11px] font-semibold text-[#1f7956]">
                  {scanMessage}
                </Text>
              </View>
            )}

            <Pressable
              onPress={simulateRandomScan}
              disabled={isScanning}
              className="mt-4 flex-row items-center gap-2 rounded-xl bg-[#164e3b] px-6 py-3 active:opacity-90"
            >
              <Camera size={16} color="#ffffff" />
              <Text className="text-[12px] font-bold text-white">
                {isScanning ? "Reading…" : "Scan random shelf item"}
              </Text>
            </Pressable>
          </View>
        ) : (
          <View className="mt-5 w-full rounded-2xl border border-[#e5e7eb] bg-white p-4">
            <Text className="text-[12px] font-bold text-[#173f31]">
              Enter product barcode (EAN-13) or name
            </Text>
            <View className="mt-3 flex-row gap-2">
              <TextInput
                value={manualCode}
                onChangeText={setManualCode}
                placeholder="e.g. 8901262010053 or Milk"
                placeholderTextColor="#9ca3af"
                className="flex-1 rounded-xl border border-[#e5e7eb] bg-[#f9fafb] px-3 py-2 text-[12px] text-[#173f31]"
              />
              <Pressable
                onPress={handleManualSearch}
                className="items-center justify-center rounded-xl bg-[#164e3b] px-4"
              >
                <Text className="text-[11px] font-bold text-white">
                  Look up
                </Text>
              </Pressable>
            </View>
            {scanMessage && (
              <Text className="mt-2 text-[10px] text-red-500">
                {scanMessage}
              </Text>
            )}
          </View>
        )}

        {/* Quick Barcode Shelf Samples */}
        <View className="mt-5 w-full">
          <Text className="text-[11px] font-bold uppercase tracking-wider text-[#6b7280]">
            Tap shelf barcode to scan
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mt-2"
            contentContainerStyle={{ gap: 8 }}
          >
            {customerProducts.slice(0, 7).map((prod) => (
              <Pressable
                key={prod.name}
                onPress={() => triggerScan(prod)}
                className="items-center rounded-xl border border-[#e5e7eb] bg-white p-2.5 active:bg-[#f2f8ee]"
              >
                <ScanLine size={16} color="#2e8b65" />
                <Text
                  numberOfLines={1}
                  className="mt-1 text-[10px] font-bold text-[#173f31]"
                >
                  {prod.name}
                </Text>
                <Text className="text-[8px] text-[#9ca3af]">
                  {prod.barcode.slice(-5)}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Scanned Result Card */}
        {scannedProduct && (
          <View className="mt-5 w-full rounded-2xl border border-[#b7d66b] bg-[#f6fbf2] p-4 shadow-sm">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-1.5">
                <Sparkles size={14} color="#1f7956" />
                <Text className="text-[11px] font-bold text-[#1f7956]">
                  Identified from Barcode
                </Text>
              </View>
              <Text className="text-[10px] text-[#6b7280]">
                EAN: {scannedProduct.barcode}
              </Text>
            </View>

            <View className="mt-3 flex-row items-center justify-between">
              <View className="flex-1 pr-3">
                <Text className="text-[14px] font-bold text-[#173f31]">
                  {scannedProduct.name}
                </Text>
                <Text className="mt-0.5 text-[11px] text-[#6b7280]">
                  {scannedProduct.size} · {scannedProduct.category}
                </Text>
              </View>
              <Text className="text-[16px] font-bold text-[#173f31]">
                ₹{scannedProduct.price}
              </Text>
            </View>

            <View className="mt-4 flex-row gap-2">
              <Pressable
                onPress={() => {
                  addToCart(scannedProduct, 1);
                  setScanMessage(`+1 ${scannedProduct.name} added to basket!`);
                  setTimeout(() => setScanMessage(null), 2500);
                }}
                className="flex-1 flex-row items-center justify-center gap-1.5 rounded-xl bg-[#164e3b] py-3 active:opacity-90"
              >
                <Plus size={14} color="#ffffff" />
                <Text className="text-[12px] font-bold text-white">
                  Add to Basket
                </Text>
              </Pressable>
              <Pressable
                onPress={() =>
                  router.push(
                    `/product/${encodeURIComponent(scannedProduct.name)}`,
                  )
                }
                className="rounded-xl border border-[#e5e7eb] bg-white px-4 py-3"
              >
                <Text className="text-[12px] font-semibold text-[#173f31]">
                  Details
                </Text>
              </Pressable>
            </View>
          </View>
        )}

        {/* Active In-Store Basket Preview */}
        {count > 0 && (
          <View className="mt-5 w-full rounded-2xl border border-[#e5e7eb] bg-white p-4 shadow-sm">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-2">
                <ShoppingBag size={14} color="#164e3b" />
                <Text className="text-[12px] font-bold text-[#173f31]">
                  My Scanned Basket ({count} items)
                </Text>
              </View>
              <Text className="text-[13px] font-bold text-[#164e3b]">
                ₹{total}
              </Text>
            </View>

            <View className="mt-3 gap-2">
              {items.slice(0, 3).map((it) => (
                <View
                  key={it.product.name}
                  className="flex-row items-center justify-between border-t border-[#f0f2ef] pt-2"
                >
                  <Text
                    numberOfLines={1}
                    className="flex-1 text-[11px] font-medium text-[#374151]"
                  >
                    {it.product.name} × {it.qty}
                  </Text>
                  <View className="flex-row items-center gap-2">
                    <Pressable
                      onPress={() => changeQty(it.product.name, -1)}
                      className="size-5 items-center justify-center rounded bg-[#f3f4f6]"
                    >
                      <Minus size={10} color="#374151" />
                    </Pressable>
                    <Pressable
                      onPress={() => changeQty(it.product.name, 1)}
                      className="size-5 items-center justify-center rounded bg-[#dff0d8]"
                    >
                      <Plus size={10} color="#21664b" />
                    </Pressable>
                    <Text className="w-12 text-right text-[11px] font-bold text-[#173f31]">
                      ₹{it.product.price * it.qty}
                    </Text>
                  </View>
                </View>
              ))}
              {items.length > 3 && (
                <Text className="text-center text-[10px] text-[#6b7280]">
                  +{items.length - 3} more items in basket
                </Text>
              )}
            </View>

            <Pressable
              onPress={() => router.push("/cart")}
              className="mt-4 flex-row items-center justify-center gap-2 rounded-xl bg-[#164e3b] py-3 active:opacity-90"
            >
              <Text className="text-[12px] font-bold text-white">
                Self-Checkout Now
              </Text>
              <ArrowRight size={14} color="#ffffff" />
            </Pressable>
          </View>
        )}
      </ScrollView>
      <CartPill />
    </Screen>
  );
}
