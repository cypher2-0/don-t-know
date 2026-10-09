import { ShoppingBag } from 'lucide-react-native';
import { Text, View } from 'react-native';

export function Logo() {
  return (
    <View className="flex-row items-center gap-2.5">
      <View className="size-9 items-center justify-center rounded-xl bg-[#0d4f3c]">
        <ShoppingBag size={20} color="#ffffff" />
      </View>
      <View>
        <Text className="text-[15px] font-bold tracking-tight text-[#123c31]">
          grocer<Text className="text-[#a6c83f]">AI</Text>
        </Text>
        <Text className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#6b7280]">
          smart retail ops
        </Text>
      </View>
    </View>
  );
}
