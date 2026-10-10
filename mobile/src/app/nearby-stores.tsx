import { useEffect, useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  View,
  ActivityIndicator,
  Linking,
} from 'react-native';
import {
  MapPin,
  Navigation,
  Clock,
  CheckCircle,
  ChevronRight,
  Star,
  Package,
  Locate,
  ShieldCheck,
} from 'lucide-react-native';
import { router } from 'expo-router';

import { Screen } from '@/components/screen';
import { CartPill } from '@/components/cart-pill';
import { storesList, type StoreLocation } from '@/lib/mock-data';

function haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

type StoreWithDist = StoreLocation & { distKm: number };

export default function NearbyStoresScreen() {
  const [loading, setLoading] = useState(true);
  const [stores, setStores] = useState<StoreWithDist[]>([]);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedStore, setSelectedStore] = useState<string | null>(null);

  const detectLocation = async () => {
    setLoading(true);
    try {
      if (typeof navigator !== 'undefined' && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const { latitude, longitude } = pos.coords;
            setUserLocation({ lat: latitude, lng: longitude });
            computeDistances(latitude, longitude);
          },
          () => {
            // Permission denied or error, fallback to Indiranagar
            setUserLocation({ lat: 12.9784, lng: 77.6408 });
            computeDistances(12.9784, 77.6408);
          },
          { timeout: 8000 }
        );
        return;
      }
      // Mobile / Native fallback
      setUserLocation({ lat: 12.9784, lng: 77.6408 });
      computeDistances(12.9784, 77.6408);
    } catch {
      computeDistances(12.9784, 77.6408);
    }
  };

  const computeDistances = (lat: number, lng: number) => {
    const sorted = storesList
      .map((s) => ({
        ...s,
        distKm: haversineDistance(lat, lng, s.lat, s.lng),
      }))
      .sort((a, b) => a.distKm - b.distKm);
    
    // Mark nearest as "In-Store" if < 0.1 km
    if (sorted.length > 0 && sorted[0].distKm < 0.1) {
      sorted[0].distance = 'In-Store';
    } else {
      sorted.forEach((s) => {
        s.distance = s.distKm < 1 ? `${(s.distKm * 1000).toFixed(0)} m` : `${s.distKm.toFixed(1)} km`;
      });
    }

    setStores(sorted);
    setLoading(false);
  };

  useEffect(() => {
    detectLocation();
  }, []);

  const openMaps = (store: StoreLocation) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${store.lat},${store.lng}`;
    Linking.openURL(url);
  };

  return (
    <Screen>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }}>
        {/* Header */}
        <View className="pb-3 pt-6">
          <View className="flex-row items-center gap-2">
            <MapPin size={18} color="#2e8b65" />
            <Text className="text-[18px] font-bold text-[#173f31]">Nearby Stores</Text>
          </View>
          <Text className="mt-1 text-[11px] text-[#6b7280]">
            Find the nearest GreenBasket outlet with stock availability
          </Text>
        </View>

        {/* GPS Detection Card */}
        <Pressable
          onPress={detectLocation}
          className="mt-2 flex-row items-center justify-between rounded-2xl bg-[#164e3b] p-4 active:opacity-90"
        >
          <View className="flex-1 pr-3">
            <View className="flex-row items-center gap-1.5">
              <Locate size={14} color="#b7d66b" />
              <Text className="text-[10px] font-bold text-[#b7d66b]">GPS AUTO-DETECT</Text>
            </View>
            <Text className="mt-1 text-[14px] font-bold text-white">
              {loading ? 'Detecting your location...' : 'Location detected'}
            </Text>
            <Text className="mt-0.5 text-[10px] text-[#c7dfd2]">
              Tap to refresh · Shows distance, stock & your regular items
            </Text>
          </View>
          {loading ? (
            <ActivityIndicator color="#b7d66b" />
          ) : (
            <Navigation size={20} color="#b7d66b" />
          )}
        </Pressable>

        {/* Store Cards */}
        <View className="mt-5 gap-3">
          {stores.map((store, idx) => {
            const isNearest = idx === 0;
            const isSelected = selectedStore === store.name;

            return (
              <Pressable
                key={store.name}
                onPress={() => setSelectedStore(isSelected ? null : store.name)}
                className={`rounded-2xl border p-4 ${
                  isNearest
                    ? 'border-[#b7d66b] bg-[#f6fbf2]'
                    : 'border-[#e5e7eb] bg-white'
                } active:opacity-95`}
              >
                {/* Nearest badge */}
                {isNearest && (
                  <View className="mb-2 self-start flex-row items-center gap-1 rounded-full bg-[#164e3b] px-2.5 py-1">
                    <Navigation size={10} color="#b7d66b" />
                    <Text className="text-[9px] font-bold text-[#b7d66b]">NEAREST TO YOU</Text>
                  </View>
                )}

                <View className="flex-row items-start justify-between">
                  <View className="flex-1 pr-3">
                    <Text className="text-[14px] font-bold text-[#173f31]">{store.name}</Text>
                    <View className="mt-1 flex-row items-center gap-1">
                      <MapPin size={11} color="#6b7280" />
                      <Text className="text-[10px] text-[#6b7280]">{store.address}</Text>
                    </View>
                  </View>
                  <View className="items-end">
                    <Text className={`text-[13px] font-bold ${isNearest ? 'text-[#1f7956]' : 'text-[#173f31]'}`}>
                      {store.distance}
                    </Text>
                    <Text className="text-[9px] text-[#6b7280]">away</Text>
                  </View>
                </View>

                {/* Stats row */}
                <View className="mt-3 flex-row gap-2">
                  <View className="flex-1 flex-row items-center gap-1.5 rounded-lg bg-[#f0f4ee] px-2 py-1.5">
                    <Clock size={11} color="#2e8b65" />
                    <Text className="text-[9px] font-semibold text-[#173f31]">{store.hours}</Text>
                  </View>
                  <View className="flex-1 flex-row items-center gap-1.5 rounded-lg bg-[#f0f4ee] px-2 py-1.5">
                    <Package size={11} color="#2e8b65" />
                    <Text className="text-[9px] font-semibold text-[#173f31]">
                      {store.stockAvailability}% in stock
                    </Text>
                  </View>
                </View>

                {/* Regular items tag */}
                {store.hasRegularItems && (
                  <View className="mt-2 flex-row items-center gap-1.5 rounded-lg bg-[#e3f1dc] px-2.5 py-1.5">
                    <CheckCircle size={11} color="#1f7956" />
                    <Text className="text-[9px] font-semibold text-[#1f7956]">
                      This store has your regular items
                    </Text>
                  </View>
                )}

                {/* Expanded details */}
                {isSelected && (
                  <View className="mt-3 gap-2 border-t border-[#f0f2ef] pt-3">
                    <View className="flex-row items-center gap-1.5">
                      <ShieldCheck size={12} color="#2e8b65" />
                      <Text className="text-[10px] text-[#4b7861]">
                        Exit Gate: {store.exitGate}
                      </Text>
                    </View>
                    <View className="flex-row gap-2">
                      <Pressable
                        onPress={() => openMaps(store)}
                        className="flex-1 flex-row items-center justify-center gap-1.5 rounded-xl bg-[#164e3b] py-2.5 active:opacity-90"
                      >
                        <Navigation size={12} color="#ffffff" />
                        <Text className="text-[11px] font-bold text-white">Get Directions</Text>
                      </Pressable>
                      <Pressable
                        onPress={() => {
                          Alert.alert('Store Selected', `You've selected ${store.name}. Start scanning!`);
                        }}
                        className="flex-1 flex-row items-center justify-center gap-1.5 rounded-xl border border-[#164e3b] bg-[#f5faf3] py-2.5"
                      >
                        <Star size={12} color="#164e3b" />
                        <Text className="text-[11px] font-bold text-[#164e3b]">Set as Default</Text>
                      </Pressable>
                    </View>
                  </View>
                )}
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
      <CartPill />
    </Screen>
  );
}
