import { QrCode } from 'lucide-react-native';
import { Alert, Pressable, Text, View } from 'react-native';

import { Screen } from '@/components/screen';

export default function ScanScreen() {
  return (
    <Screen>
      <View className="flex-1 items-center justify-center px-8">
        <View className="size-52 items-center justify-center rounded-3xl border-2 border-dashed border-[#b7d66b] bg-[#f2f8e8]">
          <QrCode size={56} color="#2e8b65" />
        </View>
        <Text className="mt-6 text-[16px] font-bold text-[#173f31]">Scan & pay</Text>
        <Text className="mt-2 text-center text-[12px] leading-5 text-[#6b7280]">
          Point your camera at a product barcode or your member QR code at checkout.
        </Text>
        <Pressable
          onPress={() => Alert.alert('Manual entry', 'Type the barcode number instead.')}
          className="mt-6 rounded-xl border border-[#e5e7eb] bg-white px-4 py-3">
          <Text className="text-[11px] font-semibold text-[#173f31]">Enter code manually</Text>
        </Pressable>
      </View>
    </Screen>
  );
}
