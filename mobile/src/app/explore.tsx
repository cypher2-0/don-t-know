import { useState } from 'react';
import { ScrollView, View } from 'react-native';

import { useCart } from '@/components/cart-provider';
import { CartPill } from '@/components/cart-pill';
import { CategoryChips } from '@/components/category-chips';
import { PageHeader } from '@/components/page-header';
import { ProductCard } from '@/components/product-card';
import { Screen } from '@/components/screen';
import { customerProducts } from '@/lib/mock-data';

export default function ExploreScreen() {
  const [category, setCategory] = useState('All');
  const { addToCart } = useCart();

  const filtered = customerProducts.filter((p) => category === 'All' || p.category === category);

  return (
    <Screen>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }}>
        <PageHeader
          eyebrow="Browse aisles"
          title="Explore"
          desc="Fresh picks across every aisle, updated daily."
        />

        <View className="mt-5">
          <CategoryChips selected={category} onSelect={setCategory} />
        </View>

        <View className="mt-5 flex-row flex-wrap justify-between">
          {filtered.map((p) => (
            <ProductCard key={p.name} product={p} onAdd={addToCart} />
          ))}
        </View>
      </ScrollView>
      <CartPill />
    </Screen>
  );
}
