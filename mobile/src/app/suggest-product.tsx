import { useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  ChevronLeft,
  Lightbulb,
  Send,
  Check,
  Clock,
  MessageSquare,
  Star,
  Tag,
  ChevronDown,
} from 'lucide-react-native';
import { router } from 'expo-router';

import { Screen } from '@/components/screen';
import { productSuggestions, shopCategories, storeInfo } from '@/lib/mock-data';

export default function SuggestProductScreen() {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [suggestions, setSuggestions] = useState(productSuggestions);

  const handleSubmit = () => {
    if (!productName.trim()) {
      Alert.alert('Missing Info', 'Please enter the product name you want to suggest.');
      return;
    }

    const newSuggestion = {
      id: `SUG-${String(suggestions.length + 1).padStart(3, '0')}`,
      productName: productName.trim(),
      description: description.trim() || 'No additional details provided',
      category: category || 'General',
      userName: 'Arjun Mehta',
      storeName: storeInfo.name,
      timestamp: 'Just now',
      status: 'Pending' as const,
    };

    setSuggestions([newSuggestion, ...suggestions]);
    setSubmitted(true);
    setProductName('');
    setDescription('');
    setCategory('');

    setTimeout(() => setSubmitted(false), 3000);
  };

  const statusColor = (s: string) => {
    switch (s) {
      case 'Approved': return { bg: 'bg-[#e3f1dc]', text: 'text-[#1f7956]' };
      case 'Under Review': return { bg: 'bg-[#fef3c7]', text: 'text-[#92400e]' };
      case 'Declined': return { bg: 'bg-[#fde8e8]', text: 'text-[#dc2626]' };
      default: return { bg: 'bg-[#f3f4f6]', text: 'text-[#6b7280]' };
    }
  };

  const statusIcon = (s: string) => {
    switch (s) {
      case 'Approved': return <Check size={10} color="#1f7956" />;
      case 'Under Review': return <Clock size={10} color="#92400e" />;
      default: return <Clock size={10} color="#6b7280" />;
    }
  };

  const categoryList = shopCategories.filter((c) => c !== 'All');

  return (
    <Screen>
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 pb-3 pt-4">
        <Pressable
          onPress={() => router.back()}
          hitSlop={8}
          className="size-9 items-center justify-center rounded-xl border border-[#e5e7eb] bg-white"
        >
          <ChevronLeft size={18} color="#173f31" />
        </Pressable>
        <View className="items-center">
          <Text className="text-[13px] font-bold text-[#173f31]">Suggest a Product</Text>
          <Text className="text-[9px] font-semibold text-[#2e8b65]">HELP US STOCK BETTER</Text>
        </View>
        <View className="size-9" />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }}>
          {/* Info Banner */}
          <View className="mt-2 flex-row items-start gap-3 rounded-2xl bg-[#f6fbf2] border border-[#b7d66b] p-4">
            <Lightbulb size={20} color="#1f7956" />
            <View className="flex-1">
              <Text className="text-[12px] font-bold text-[#173f31]">
                Can't find what you need?
              </Text>
              <Text className="mt-1 text-[10px] leading-4 text-[#4b7861]">
                Suggest a product and we'll send it as a request ticket to the Store Manager & Admin. 
                We'll notify you when it's stocked!
              </Text>
            </View>
          </View>

          {/* Success toast */}
          {submitted && (
            <View className="mt-3 flex-row items-center gap-2 rounded-xl bg-[#e3f1dc] p-3">
              <Check size={16} color="#1f7956" />
              <Text className="flex-1 text-[11px] font-bold text-[#1f7956]">
                Suggestion submitted! Store Manager & Admin have been notified.
              </Text>
            </View>
          )}

          {/* Form */}
          <View className="mt-4 rounded-2xl border border-[#e5e7eb] bg-white p-4">
            <Text className="text-[12px] font-bold text-[#173f31]">Product Name *</Text>
            <TextInput
              value={productName}
              onChangeText={setProductName}
              placeholder="e.g. Organic Jaggery Powder"
              placeholderTextColor="#9ca3af"
              className="mt-2 rounded-xl border border-[#e5e7eb] bg-[#f9fafb] px-3 py-2.5 text-[12px] text-[#173f31]"
            />

            <Text className="mt-4 text-[12px] font-bold text-[#173f31]">Category</Text>
            <Pressable
              onPress={() => setShowCategoryPicker(!showCategoryPicker)}
              className="mt-2 flex-row items-center justify-between rounded-xl border border-[#e5e7eb] bg-[#f9fafb] px-3 py-2.5"
            >
              <Text className={`text-[12px] ${category ? 'text-[#173f31]' : 'text-[#9ca3af]'}`}>
                {category || 'Select a category'}
              </Text>
              <ChevronDown size={14} color="#6b7280" />
            </Pressable>
            {showCategoryPicker && (
              <View className="mt-1 rounded-xl border border-[#e5e7eb] bg-white p-2">
                {categoryList.map((c) => (
                  <Pressable
                    key={c}
                    onPress={() => {
                      setCategory(c);
                      setShowCategoryPicker(false);
                    }}
                    className={`rounded-lg px-3 py-2 ${category === c ? 'bg-[#e3f1dc]' : ''}`}
                  >
                    <Text className={`text-[11px] font-semibold ${category === c ? 'text-[#1f7956]' : 'text-[#374151]'}`}>
                      {c}
                    </Text>
                  </Pressable>
                ))}
              </View>
            )}

            <Text className="mt-4 text-[12px] font-bold text-[#173f31]">Details (optional)</Text>
            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder="Brand preference, pack size, any specifics..."
              placeholderTextColor="#9ca3af"
              multiline
              numberOfLines={3}
              textAlignVertical="top"
              className="mt-2 rounded-xl border border-[#e5e7eb] bg-[#f9fafb] px-3 py-2.5 text-[12px] text-[#173f31]"
              style={{ minHeight: 80 }}
            />

            <View className="mt-2 flex-row items-center gap-1.5 rounded-lg bg-[#f0f4ee] px-2.5 py-1.5">
              <MessageSquare size={10} color="#6b7280" />
              <Text className="text-[9px] text-[#6b7280]">
                This request will be sent to {storeInfo.name} manager
              </Text>
            </View>

            <Pressable
              onPress={handleSubmit}
              className="mt-4 flex-row items-center justify-center gap-2 rounded-xl bg-[#164e3b] py-3 active:opacity-90"
            >
              <Send size={14} color="#ffffff" />
              <Text className="text-[12px] font-bold text-white">Submit Product Suggestion</Text>
            </Pressable>
          </View>

          {/* Past Suggestions */}
          <Text className="mt-6 text-[11px] font-bold uppercase tracking-wider text-[#6b7280]">
            Your Past Suggestions
          </Text>
          <View className="mt-2 gap-2">
            {suggestions.map((s) => {
              const sc = statusColor(s.status);
              return (
                <View
                  key={s.id}
                  className="rounded-2xl border border-[#e5e7eb] bg-white p-3.5"
                >
                  <View className="flex-row items-start justify-between">
                    <View className="flex-1 pr-3">
                      <Text className="text-[12px] font-bold text-[#173f31]">{s.productName}</Text>
                      <Text className="mt-0.5 text-[10px] text-[#6b7280]">{s.description}</Text>
                    </View>
                    <View className={`flex-row items-center gap-1 rounded-full ${sc.bg} px-2 py-1`}>
                      {statusIcon(s.status)}
                      <Text className={`text-[9px] font-bold ${sc.text}`}>{s.status}</Text>
                    </View>
                  </View>
                  <View className="mt-2 flex-row items-center gap-3">
                    <View className="flex-row items-center gap-1">
                      <Tag size={9} color="#9ca3af" />
                      <Text className="text-[9px] text-[#9ca3af]">{s.category}</Text>
                    </View>
                    <View className="flex-row items-center gap-1">
                      <Clock size={9} color="#9ca3af" />
                      <Text className="text-[9px] text-[#9ca3af]">{s.timestamp}</Text>
                    </View>
                    <Text className="text-[9px] text-[#9ca3af]">{s.id}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}
