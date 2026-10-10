import { useState, useEffect, useRef } from 'react';
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
import { router } from 'expo-router';
import {
  AlertTriangle,
  ArrowRight,
  Camera,
  Check,
  CheckCircle2,
  ChevronLeft,
  Clock,
  Lock,
  QrCode,
  RotateCcw,
  Scan,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Unlock,
  Users,
  Zap,
} from 'lucide-react-native';

import { Screen } from '@/components/screen';

interface VerifiedOrder {
  orderId: string;
  customerName: string;
  phone: string;
  storeName: string;
  exitGate: string;
  paymentMethod: string;
  paymentId: string;
  amount: number;
  status: string;
  paidAt: string;
  items: Array<{
    name: string;
    qty: number;
    price: number;
    image: string;
  }>;
}

const samplePasses = [
  { code: 'GB-EXIT-100234', label: 'Arjun · 2 items (Milk, Paneer)' },
  { code: 'GB-EXIT-884210', label: 'Priya · 2 items (Atta, Oil)' },
  { code: 'GB-EXIT-EXPIRED', label: 'Fraud Test · Already Exited' },
];

export default function StaffGateScannerScreen() {
  const [scannedCode, setScannedCode] = useState('');
  const [manualCode, setManualCode] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [verifiedOrder, setVerifiedOrder] = useState<VerifiedOrder | null>(null);
  const [verifyError, setVerifyError] = useState<string | null>(null);
  const [verifyTimeMs, setVerifyTimeMs] = useState<number | null>(null);
  const [gateUnlocked, setGateUnlocked] = useState(false);
  const [shiftStats, setShiftStats] = useState({ count: 142, avgSpeed: '0.35s' });

  // Laser scanner animation
  const laserAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(laserAnim, {
          toValue: 1,
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
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [laserAnim]);

  const translateY = laserAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 180],
  });

  const handleVerify = async (codeToVerify: string) => {
    if (!codeToVerify.trim()) return;
    setVerifying(true);
    setVerifyError(null);
    setVerifiedOrder(null);
    setGateUnlocked(false);
    const startTime = performance.now();

    try {
      if (codeToVerify.includes('EXPIRED')) {
        await new Promise((r) => setTimeout(r, 260));
        setVerifyError('PASS ALREADY USED: This customer pass has already exited through Gate 1 at 5:12 AM.');
        setVerifyTimeMs(260);
        setVerifying(false);
        return;
      }

      // Live verification (simulated < 350ms instant response)
      await new Promise((r) => setTimeout(r, 280));
      const elapsed = Math.round(performance.now() - startTime);
      setVerifyTimeMs(elapsed);

      // Pre-filled verified order data matching code
      const isArjun = codeToVerify.includes('100234');
      const orderData: VerifiedOrder = {
        orderId: codeToVerify,
        customerName: isArjun ? 'Arjun Sharma' : 'Priya Sundaram',
        phone: isArjun ? '+91 98765 43210' : '+91 94481 22910',
        storeName: 'GreenBasket Express · Indiranagar',
        exitGate: 'Turnstile Gate 2 (Express Lane)',
        paymentMethod: isArjun ? 'Razorpay UPI (Google Pay)' : 'Razorpay UPI (PhonePe)',
        paymentId: isArjun ? 'pay_P1rZ8x9K01qW2e' : 'pay_M9qA7z3T55xY1o',
        amount: isArjun ? 123 : 455,
        status: 'PAID · COMPLIANT',
        paidAt: '2 mins ago',
        items: isArjun
          ? [
              {
                name: 'Amul Taaza Milk',
                qty: 1,
                price: 28,
                image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500&auto=format&fit=crop&q=80',
              },
              {
                name: 'Fresh Paneer',
                qty: 1,
                price: 95,
                image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&auto=format&fit=crop&q=80',
              },
            ]
          : [
              {
                name: 'Aashirvaad Atta',
                qty: 1,
                price: 310,
                image: 'https://images.unsplash.com/photo-1574316071802-0d684efa7cd5?w=500&auto=format&fit=crop&q=80',
              },
              {
                name: 'Fortune Sunflower Oil',
                qty: 1,
                price: 145,
                image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&auto=format&fit=crop&q=80',
              },
            ],
      };

      setVerifiedOrder(orderData);
      setGateUnlocked(true);
      setShiftStats((prev) => ({ ...prev, count: prev.count + 1 }));
    } catch {
      setVerifyError('Verification timeout. Please re-scan.');
    } finally {
      setVerifying(false);
    }
  };

  const resetScanner = () => {
    setScannedCode('');
    setManualCode('');
    setVerifiedOrder(null);
    setVerifyError(null);
    setGateUnlocked(false);
    setVerifyTimeMs(null);
  };

  return (
    <Screen>
      {/* Top Staff Navigation */}
      <View className="flex-row items-center justify-between border-b border-[#e5e7eb] bg-white px-5 pb-3 pt-3">
        <Pressable
          onPress={() => router.back()}
          hitSlop={8}
          className="size-9 items-center justify-center rounded-xl border border-[#e5e7eb] bg-white">
          <ChevronLeft size={18} color="#173f31" />
        </Pressable>
        <View className="items-center">
          <View className="flex-row items-center gap-1.5">
            <View className="size-2 rounded-full bg-emerald-500" />
            <Text className="text-[13px] font-bold text-[#173f31]">Turnstile Exit Gate 2</Text>
          </View>
          <Text className="text-[9px] font-semibold text-[#6b7280]">STORE STAFF · SECURITY GUARD MODE</Text>
        </View>
        <Pressable onPress={resetScanner} hitSlop={8} className="size-9 items-center justify-center rounded-xl bg-slate-100">
          <RotateCcw size={15} color="#475569" />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 16 }}>
        {/* Real-Time Shift Statistics */}
        <View className="flex-row items-center justify-between rounded-2xl border border-emerald-200 bg-[#f4faf1] p-3 shadow-2xs">
          <View className="flex-row items-center gap-2">
            <ShieldCheck size={18} color="#164e3b" />
            <View>
              <Text className="text-[11px] font-bold text-[#164e3b]">Express Exit Lane Active</Text>
              <Text className="text-[9px] text-[#2d634e]">Zero Queue · Optical Turnstile</Text>
            </View>
          </View>
          <View className="flex-row items-center gap-3">
            <View className="items-end">
              <Text className="text-[12px] font-extrabold text-[#164e3b]">{shiftStats.count}</Text>
              <Text className="text-[8px] text-[#6b7280]">Exited Today</Text>
            </View>
            <View className="h-6 w-px bg-emerald-200" />
            <View className="items-end">
              <Text className="text-[12px] font-extrabold text-[#2563eb]">{shiftStats.avgSpeed}</Text>
              <Text className="text-[8px] text-[#6b7280]">Avg Verification</Text>
            </View>
          </View>
        </View>

        {/* Optical Viewfinder / Camera Simulation Box */}
        <View className="mt-4 items-center rounded-3xl border border-[#cbd5e1] bg-[#0f172a] p-4 shadow-md">
          <View className="w-full flex-row items-center justify-between pb-2 border-b border-slate-700">
            <View className="flex-row items-center gap-1.5">
              <Camera size={14} color="#38bdf8" />
              <Text className="text-[11px] font-bold text-slate-200">Optical QR Scanner</Text>
            </View>
            <View className="flex-row items-center gap-1 rounded-full bg-emerald-950/80 px-2 py-0.5 border border-emerald-500/30">
              <Zap size={10} color="#4ade80" />
              <Text className="text-[9px] font-bold text-emerald-400">&lt; 1s Latency</Text>
            </View>
          </View>

          {/* Scanner Reticle Viewport */}
          <View className="relative my-4 size-52 items-center justify-center rounded-2xl border-2 border-dashed border-[#4ade80] bg-slate-900/60 overflow-hidden">
            {/* Animated Laser Scan Beam */}
            <Animated.View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 3,
                backgroundColor: '#ef4444',
                shadowColor: '#ef4444',
                shadowOpacity: 0.9,
                shadowRadius: 8,
                transform: [{ translateY }],
              }}
            />

            <QrCode size={64} color="#64748b" opacity={0.6} />

            <View className="absolute bottom-2 rounded-full bg-black/70 px-3 py-1">
              <Text className="text-[9px] font-medium text-slate-300">
                Aim at customer's Exit QR Pass
              </Text>
            </View>
          </View>

          {/* Quick Tap Samples for Guard Verification */}
          <View className="w-full">
            <Text className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Tap Sample Customer Exit Pass
            </Text>
            <View className="mt-2 flex-row flex-wrap gap-2">
              {samplePasses.map((p) => (
                <Pressable
                  key={p.code}
                  onPress={() => {
                    setScannedCode(p.code);
                    handleVerify(p.code);
                  }}
                  className="rounded-xl border border-slate-700 bg-slate-800/90 px-3 py-2 active:bg-slate-700">
                  <Text className="font-mono text-[10px] font-bold text-[#38bdf8]">{p.code}</Text>
                  <Text className="text-[8px] text-slate-400">{p.label}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        </View>

        {/* Verification Loading State */}
        {verifying && (
          <View className="mt-4 items-center rounded-2xl border border-blue-200 bg-blue-50 p-4">
            <Zap size={22} color="#2563eb" />
            <Text className="mt-2 text-[12px] font-bold text-blue-900">
              Querying Anti-Theft Ledger & Razorpay...
            </Text>
            <Text className="mt-0.5 text-[10px] text-blue-700">Validating item signatures</Text>
          </View>
        )}

        {/* Discrepancy / Error Alert */}
        {verifyError && (
          <View className="mt-4 rounded-2xl border border-red-300 bg-red-50 p-4 shadow-sm">
            <View className="flex-row items-center gap-2">
              <ShieldAlert size={20} color="#dc2626" />
              <Text className="text-[13px] font-extrabold text-red-900">
                ACCESS DENIED · GATE LOCKED
              </Text>
            </View>
            <Text className="mt-2 text-[11px] leading-5 text-red-800">{verifyError}</Text>
            <View className="mt-3 flex-row gap-2">
              <Pressable
                onPress={() => Alert.alert('Security Alerted', 'Store manager dispatched to Gate 2.')}
                className="flex-1 rounded-xl bg-red-600 py-2.5 items-center">
                <Text className="text-[11px] font-bold text-white">Call Store Manager</Text>
              </Pressable>
              <Pressable onPress={resetScanner} className="rounded-xl bg-white border border-red-300 px-4 py-2.5 items-center">
                <Text className="text-[11px] font-bold text-red-700">Retry Scan</Text>
              </Pressable>
            </View>
          </View>
        )}

        {/* Verified Order & Bag Inspection Audit */}
        {verifiedOrder && (
          <View className="mt-4 rounded-3xl border-2 border-emerald-400 bg-white p-4 shadow-md">
            {/* Gate Unlocked Header */}
            <View className="flex-row items-center justify-between border-b border-emerald-100 pb-3">
              <View className="flex-row items-center gap-2">
                <View className="size-9 items-center justify-center rounded-xl bg-emerald-500">
                  <Unlock size={20} color="#ffffff" />
                </View>
                <View>
                  <Text className="text-[14px] font-extrabold text-emerald-900">
                    ACCESS GRANTED 🔓
                  </Text>
                  <Text className="text-[10px] font-bold text-emerald-700">
                    TURNSTILE GATE UNLOCKED ({verifyTimeMs}ms)
                  </Text>
                </View>
              </View>
              <View className="rounded-full bg-emerald-100 px-2.5 py-1">
                <Text className="text-[9px] font-bold text-emerald-800">PAID VERIFIED</Text>
              </View>
            </View>

            {/* Shopper Details */}
            <View className="mt-3 flex-row items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <View>
                <Text className="text-[12px] font-bold text-[#173f31]">
                  {verifiedOrder.customerName}
                </Text>
                <Text className="text-[9px] text-[#6b7280]">
                  {verifiedOrder.phone} · {verifiedOrder.paidAt}
                </Text>
              </View>
              <View className="items-end">
                <Text className="text-[13px] font-bold text-[#164e3b]">
                  ₹{verifiedOrder.amount}
                </Text>
                <Text className="text-[8px] font-mono text-blue-700">
                  {verifiedOrder.paymentId}
                </Text>
              </View>
            </View>

            {/* Physical Bag Inspection Checklist */}
            <View className="mt-4">
              <View className="flex-row items-center justify-between mb-1.5">
                <Text className="text-[11px] font-bold uppercase tracking-wider text-[#6b7280]">
                  Bag Contents Audit ({verifiedOrder.items.length} Items)
                </Text>
                <Text className="text-[9px] font-bold text-[#2e8b65]">Match items in tote bag</Text>
              </View>

              {verifiedOrder.items.map((item) => (
                <View
                  key={item.name}
                  className="mt-2 flex-row items-center gap-3 rounded-2xl border border-slate-200 bg-white p-2.5 shadow-2xs">
                  <View className="size-12 items-center justify-center rounded-xl bg-slate-50 border border-slate-200 overflow-hidden">
                    <Image source={{ uri: item.image }} className="h-full w-full" resizeMode="cover" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-[12px] font-bold text-[#173f31]">{item.name}</Text>
                    <Text className="text-[10px] text-[#6b7280]">₹{item.price} each</Text>
                  </View>
                  <View className="items-center rounded-lg bg-emerald-100 px-2.5 py-1">
                    <Text className="text-[11px] font-bold text-emerald-900">Qty: {item.qty}</Text>
                  </View>
                </View>
              ))}
            </View>

            {/* Turnstile Actions */}
            <View className="mt-5 flex-row gap-2">
              <Pressable
                onPress={() => {
                  Alert.alert(
                    'Gate 2 Opened',
                    'Turnstile optical gate opened. Customer may exit safely.',
                    [{ text: 'Next Customer', onPress: resetScanner }]
                  );
                }}
                className="flex-1 flex-row items-center justify-center gap-1.5 rounded-xl bg-[#164e3b] py-3.5 shadow-sm active:opacity-90">
                <Check size={16} color="#ffffff" />
                <Text className="text-[12px] font-bold text-white">Approve & Open Turnstile</Text>
              </Pressable>

              <Pressable
                onPress={() => {
                  Alert.alert(
                    'Flag Discrepancy',
                    'Un-scanned extra item found in customer bag. Manager alert sent.',
                    [{ text: 'OK', onPress: resetScanner }]
                  );
                }}
                className="rounded-xl border border-amber-300 bg-amber-50 px-3 py-3.5 items-center justify-center">
                <AlertTriangle size={16} color="#b45309" />
              </Pressable>
            </View>
          </View>
        )}
      </ScrollView>
    </Screen>
  );
}
