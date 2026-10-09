import { Text, View } from 'react-native';

export function PageHeader({ eyebrow, title, desc }: { eyebrow: string; title: string; desc?: string }) {
  return (
    <View className="pt-6">
      <Text className="text-[11px] font-semibold text-[#2e8b65]">{eyebrow}</Text>
      <Text className="mt-1 text-[25px] font-bold tracking-tight text-[#143d31]">{title}</Text>
      {desc ? <Text className="mt-1 text-[12px] text-[#6b7280]">{desc}</Text> : null}
    </View>
  );
}
