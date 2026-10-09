import { useState } from "react";
import { ArrowUpDown, Search } from "lucide-react-native";
import { ScrollView, Text, TextInput, View } from "react-native";

import { CartPill } from "@/components/cart-pill";
import { CategoryChips } from "@/components/category-chips";
import { PageHeader } from "@/components/page-header";
import { ProductCard } from "@/components/product-card";
import { Screen } from "@/components/screen";
import { customerProducts } from "@/lib/mock-data";

export default function ExploreScreen() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "rating">(
    "featured",
  );

  let filtered = customerProducts.filter(
    (p) =>
      (category === "All" || p.category === category) &&
      p.name.toLowerCase().includes(search.trim().toLowerCase()),
  );

  if (sortBy === "price-asc") {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (sortBy === "rating") {
    filtered = [...filtered].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
  }

  return (
    <Screen>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }}
      >
        <PageHeader
          eyebrow="Browse aisles"
          title="Explore"
          desc="Fresh picks across every aisle, updated daily."
        />

        {/* Search Bar */}
        <View className="mt-4 flex-row items-center gap-2 rounded-xl border border-[#e5e7eb] bg-white px-3 py-3">
          <Search size={16} color="#6b7280" />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search all items and brands…"
            placeholderTextColor="#6b7280"
            className="flex-1 p-0 text-[12px] text-[#173f31]"
          />
        </View>

        {/* Category Chips */}
        <View className="mt-4">
          <CategoryChips selected={category} onSelect={setCategory} />
        </View>

        {/* Sort & Count Header */}
        <View className="mt-5 flex-row items-center justify-between">
          <Text className="text-[12px] font-bold text-[#173f31]">
            {filtered.length} {filtered.length === 1 ? "item" : "items"} found
          </Text>
          <View className="flex-row items-center gap-2">
            <ArrowUpDown size={12} color="#6b7280" />
            <Text
              onPress={() =>
                setSortBy((prev) =>
                  prev === "featured"
                    ? "price-asc"
                    : prev === "price-asc"
                      ? "rating"
                      : "featured",
                )
              }
              className="text-[11px] font-semibold text-[#2e8b65]"
            >
              {sortBy === "featured"
                ? "Featured"
                : sortBy === "price-asc"
                  ? "Price: Low ↑"
                  : "Top Rated ★"}
            </Text>
          </View>
        </View>

        {/* Product Grid */}
        <View className="mt-3 flex-row flex-wrap justify-between">
          {filtered.map((p) => (
            <ProductCard key={p.name} product={p} />
          ))}
        </View>

        {filtered.length === 0 && (
          <View className="mt-12 items-center justify-center p-6">
            <Text className="text-[13px] font-semibold text-[#6b7280]">
              No items match &quot;{search}&quot;.
            </Text>
          </View>
        )}
      </ScrollView>
      <CartPill />
    </Screen>
  );
}
