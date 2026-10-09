import { Pressable, ScrollView, Text } from 'react-native';

import { shopCategories } from '@/lib/mock-data';

export function CategoryChips({ selected, onSelect }: { selected: string; onSelect: (c: string) => void }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12 }}>
      {shopCategories.map((c) => {
        const active = c === selected;
        return (
          <Pressable
            key={c}
            onPress={() => onSelect(c)}
            className={`rounded-full border px-3.5 py-2 ${active ? 'border-[#164e3b] bg-[#164e3b]' : 'border-[#e5e7eb] bg-white'}`}>
            <Text className={`text-[10px] font-semibold ${active ? 'text-white' : 'text-[#365a4a]'}`}>{c}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
