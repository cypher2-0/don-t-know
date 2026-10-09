import { useRef, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  ArrowLeft,
  Bot,
  ChefHat,
  ChevronRight,
  Clock,
  Flame,
  Plus,
  Send,
  ShoppingBag,
  Sparkles,
  Users,
  Zap,
} from "lucide-react-native";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useCart } from "@/components/cart-provider";
import { CartPill } from "@/components/cart-pill";
import { Screen } from "@/components/screen";
import {
  AI_PROMPT_CHIPS,
  getAIResponse,
  type AIMessage,
} from "@/lib/ai-assistant";

const INITIAL_MESSAGE: AIMessage = {
  id: "init-1",
  sender: "assistant",
  timestamp: "Just now",
  text: `Hi Arjun! I'm your **grocerAI Copilot** 🤖.\n\nTell me what you'd like to cook, your budget, or your diet goals, and I'll assemble your cart instantly!`,
  chips: AI_PROMPT_CHIPS,
};

export default function AIAssistantScreen() {
  const insets = useSafeAreaInsets();
  const { addToCart } = useCart();
  const [messages, setMessages] = useState<AIMessage[]>([INITIAL_MESSAGE]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg: AIMessage = {
      id: Math.random().toString(36).substring(7),
      sender: "user",
      text: trimmed,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 100);

    // Simulate AI thinking and reply
    setTimeout(() => {
      const response = getAIResponse(trimmed);
      setMessages((prev) => [...prev, response]);
      setIsTyping(false);
      setTimeout(() => {
        scrollRef.current?.scrollToEnd({ animated: true });
      }, 150);
    }, 700);
  };

  const handleAddBundleToCart = (bundle: AIMessage["suggestedProducts"]) => {
    if (!bundle || bundle.length === 0) return;
    bundle.forEach((item) => {
      addToCart(item.product, item.qty);
    });
    Alert.alert(
      "Bundle Added!",
      `Added ${bundle.length} items to your cart! Ready for checkout.`,
      [
        { text: "Keep Chatting", style: "cancel" },
        { text: "View Cart", onPress: () => router.push("/cart") },
      ],
    );
  };

  return (
    <Screen>
      {/* Top Header */}
      <View className="flex-row items-center justify-between border-b border-[#e5e7eb] bg-white px-5 pb-3 pt-3">
        <Pressable
          onPress={() => router.back()}
          hitSlop={8}
          className="size-9 items-center justify-center rounded-xl border border-[#e5e7eb] bg-white"
        >
          <ArrowLeft size={18} color="#173f31" />
        </Pressable>
        <View className="items-center">
          <View className="flex-row items-center gap-1.5">
            <Sparkles size={14} color="#2e8b65" />
            <Text className="text-[13px] font-bold text-[#173f31]">
              grocerAI Copilot
            </Text>
          </View>
          <Text className="text-[9px] font-semibold text-[#2e8b65]">
            ● Online · Instant Cart AI
          </Text>
        </View>
        <Pressable
          onPress={() => setMessages([INITIAL_MESSAGE])}
          className="rounded-lg bg-[#f0f4ee] px-2.5 py-1"
        >
          <Text className="text-[9px] font-bold text-[#2e8b65]">Reset</Text>
        </Pressable>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingVertical: 16,
            gap: 14,
          }}
        >
          {messages.map((msg) => {
            const isUser = msg.sender === "user";
            return (
              <View
                key={msg.id}
                className={`max-w-[92%] ${isUser ? "self-end" : "self-start"}`}
              >
                {/* Message Bubble */}
                <View
                  className={`rounded-2xl p-3.5 shadow-sm ${
                    isUser
                      ? "rounded-tr-none bg-[#164e3b]"
                      : "rounded-tl-none border border-[#e5e7eb] bg-white"
                  }`}
                >
                  <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center gap-1">
                      {isUser ? null : <Bot size={13} color="#2e8b65" />}
                      <Text
                        className={`text-[10px] font-bold ${
                          isUser ? "text-[#b5d8b5]" : "text-[#2e8b65]"
                        }`}
                      >
                        {isUser ? "You" : "grocerAI"}
                      </Text>
                    </View>
                    <Text
                      className={`text-[9px] ${
                        isUser ? "text-[#a3caa3]" : "text-[#9ca3af]"
                      }`}
                    >
                      {msg.timestamp}
                    </Text>
                  </View>

                  <Text
                    className={`mt-1.5 text-[12px] leading-5 ${
                      isUser ? "text-white" : "text-[#1f2937]"
                    }`}
                  >
                    {msg.text}
                  </Text>
                </View>

                {/* Recipe Card If Available */}
                {msg.recipeMeta && (
                  <View className="mt-3 rounded-2xl border border-[#cfe7c2] bg-[#f7fcf4] p-3.5 shadow-sm">
                    <View className="flex-row items-center gap-1.5">
                      <ChefHat size={15} color="#164e3b" />
                      <Text className="text-[12px] font-bold text-[#164e3b]">
                        {msg.recipeMeta.title}
                      </Text>
                    </View>

                    <View className="mt-2 flex-row gap-3">
                      <View className="flex-row items-center gap-1">
                        <Clock size={11} color="#4b7861" />
                        <Text className="text-[10px] font-medium text-[#4b7861]">
                          {msg.recipeMeta.prepTime}
                        </Text>
                      </View>
                      <View className="flex-row items-center gap-1">
                        <Users size={11} color="#4b7861" />
                        <Text className="text-[10px] font-medium text-[#4b7861]">
                          {msg.recipeMeta.servings}
                        </Text>
                      </View>
                      <View className="flex-row items-center gap-1">
                        <Flame size={11} color="#4b7861" />
                        <Text className="text-[10px] font-medium text-[#4b7861]">
                          {msg.recipeMeta.calories}
                        </Text>
                      </View>
                    </View>

                    <View className="mt-2.5 gap-1 border-t border-[#e2f1db] pt-2">
                      {msg.recipeMeta.steps.map((st, i) => (
                        <Text
                          key={i}
                          className="text-[10px] leading-4 text-[#374151]"
                        >
                          <Text className="font-bold text-[#164e3b]">
                            {i + 1}.{" "}
                          </Text>
                          {st}
                        </Text>
                      ))}
                    </View>
                  </View>
                )}

                {/* Suggested Products Bundle */}
                {msg.suggestedProducts && msg.suggestedProducts.length > 0 && (
                  <View className="mt-3 rounded-2xl border border-[#e5e7eb] bg-white p-3.5 shadow-sm">
                    <View className="flex-row items-center justify-between">
                      <Text className="text-[11px] font-bold text-[#173f31]">
                        Matched In-Stock Ingredients (
                        {msg.suggestedProducts.length})
                      </Text>
                      {msg.totalBundlePrice ? (
                        <Text className="text-[12px] font-bold text-[#2e8b65]">
                          ₹{msg.totalBundlePrice}
                        </Text>
                      ) : null}
                    </View>

                    <View className="mt-2 gap-2">
                      {msg.suggestedProducts.map((it) => (
                        <View
                          key={it.product.name}
                          className="flex-row items-center justify-between rounded-xl bg-[#f9fafb] p-2"
                        >
                          <View className="flex-1 pr-2">
                            <Text
                              numberOfLines={1}
                              className="text-[11px] font-bold text-[#173f31]"
                            >
                              {it.product.name}
                            </Text>
                            <Text className="text-[9px] text-[#6b7280]">
                              {it.reason} · ₹{it.product.price}
                            </Text>
                          </View>
                          <Pressable
                            onPress={() => addToCart(it.product, it.qty)}
                            className="size-6 items-center justify-center rounded-lg bg-[#dff0d8] active:opacity-80"
                          >
                            <Plus size={13} color="#21664b" />
                          </Pressable>
                        </View>
                      ))}
                    </View>

                    {/* 1-Tap Bundle Add Button */}
                    <Pressable
                      onPress={() =>
                        handleAddBundleToCart(msg.suggestedProducts)
                      }
                      className="mt-3 flex-row items-center justify-center gap-1.5 rounded-xl bg-[#164e3b] py-2.5 active:opacity-90"
                    >
                      <ShoppingBag size={13} color="#ffffff" />
                      <Text className="text-[11px] font-bold text-white">
                        Add All to Cart · ₹{msg.totalBundlePrice}
                      </Text>
                    </Pressable>
                  </View>
                )}

                {/* Quick Chips in Assistant Messages */}
                {msg.chips && (
                  <View className="mt-2.5 flex-row flex-wrap gap-1.5">
                    {msg.chips.map((ch) => (
                      <Pressable
                        key={ch}
                        onPress={() => sendMessage(ch)}
                        className="rounded-full border border-[#b7d66b] bg-[#f6fbf2] px-2.5 py-1 active:bg-[#e4f3da]"
                      >
                        <Text className="text-[10px] font-semibold text-[#1f7956]">
                          {ch}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                )}
              </View>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <View className="self-start rounded-2xl rounded-tl-none border border-[#e5e7eb] bg-white p-3 shadow-sm">
              <View className="flex-row items-center gap-1.5">
                <Bot size={13} color="#2e8b65" />
                <Text className="text-[10px] font-medium text-[#6b7280]">
                  grocerAI is cooking up suggestions…
                </Text>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Input Bar */}
        <View
          className="border-t border-[#e5e7eb] bg-white px-4 py-2.5"
          style={{ paddingBottom: Math.max(insets.bottom, 10) }}
        >
          <View className="flex-row items-center gap-2 rounded-2xl border border-[#e5e7eb] bg-[#f9fafb] px-3 py-1.5">
            <TextInput
              value={inputText}
              onChangeText={setInputText}
              placeholder="Ask for recipes, budget meal plans, diet ideas…"
              placeholderTextColor="#9ca3af"
              onSubmitEditing={() => sendMessage(inputText)}
              className="flex-1 py-1 text-[12px] text-[#173f31]"
            />
            <Pressable
              onPress={() => sendMessage(inputText)}
              disabled={!inputText.trim()}
              className={`size-8 items-center justify-center rounded-xl ${
                inputText.trim() ? "bg-[#164e3b]" : "bg-[#e5e7eb]"
              }`}
            >
              <Send
                size={14}
                color={inputText.trim() ? "#ffffff" : "#9ca3af"}
              />
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>

      <CartPill />
    </Screen>
  );
}
