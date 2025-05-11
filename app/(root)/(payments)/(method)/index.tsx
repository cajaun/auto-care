import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SymbolView } from "expo-symbols";
import { router, useLocalSearchParams } from "expo-router";
import { PressableScale } from "@/components/ui/pressable-scale";
import { PayPal } from "@/assets/icons/paypal";
import { Visa } from "@/assets/icons/visacard";
import { MasterCard } from "@/assets/icons/mastercard";
import { handlePayment } from "@/services/payment-service";

const MethodScreen = () => {
  const { top, bottom } = useSafeAreaInsets();

  const { system, date, type, name } = useLocalSearchParams();
  const [selectedMethod, setSelectedMethod] = useState("");

  const onPaymentSubmit = () => {
    handlePayment({
      type: Array.isArray(type) ? type[0] : type,
      name: Array.isArray(name) ? name[0] : name,
      date: Array.isArray(date) ? date[0] : date,
      selectedMethod: selectedMethod,
    });
  };

  return (
    <View style={{ flex: 1, paddingTop: top }} className="bg-white px-4">
      <View className="flex-1 gap-y-6 ">
        <View className="pb-4">
          <View className="flex-row justify-between items-center  ">
            <Pressable onPress={() => router.back()}>
              <SymbolView name="arrow.left" tintColor={"#1A202F"} />
            </Pressable>
            <Text className="text-xl font-semibold text-dark-90">Payment</Text>
            <View className="w-6" />
          </View>
        </View>

        <View className="gap-y-4">
          <View>
            <Text className="text-xl font-semibold">
              Your current location
            </Text>
          </View>

          <View
            className=" p-2 rounded-xl "
            style={{ borderColor: "#E8E9EA", borderWidth: 1 }}
          >
            <View className="flex-row ">
              <View className="p-4 bg-dark-90/5 rounded-xl">
                <SymbolView name="map.fill" tintColor="black" />
              </View>

              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text numberOfLines={2} className="font-semibold text-lg">
                  2972 Westheimer Rd. Santa Ana, Illinois 85486
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View className="gap-y-4">
          <View>
            <Text className="text-xl font-semibold">Payment Method</Text>
          </View>

          <Pressable
            onPress={() => setSelectedMethod("mastercard")}
            className={`p-2 rounded-xl ${
              selectedMethod === "mastercard" ? "border-2 border-accent" : ""
            }`}
            style={{ borderColor: "#E8E9EA", borderWidth: 1 }}
          >
            <View className="flex-row justify-between items-center px-2">
              <View className="flex-row items-center">
                <View className="p-4 rounded-lg">
                  <MasterCard width={25} height={25} />
                </View>
                <View style={{ marginLeft: 12 }}>
                  <Text numberOfLines={2} className="font-semibold text-lg">
                    Mastercard
                  </Text>
                </View>
              </View>
              {selectedMethod === "mastercard" && (
                <SymbolView name="button.programmable" tintColor={"#2AB749"} />
              )}
            </View>
          </Pressable>

          <Pressable
            onPress={() => setSelectedMethod("visa")}
            className={`p-2 rounded-xl ${
              selectedMethod === "visa" ? "border-2 border-accent" : ""
            }`}
            style={{ borderColor: "#E8E9EA", borderWidth: 1 }}
          >
            <View className="flex-row justify-between items-center px-2">
              <View className="flex-row items-center">
                <View className="p-4 rounded-lg">
                  <Visa width={25} height={25} />
                </View>
                <View style={{ marginLeft: 12 }}>
                  <Text numberOfLines={2} className="font-semibold text-lg">
                    Visa Card
                  </Text>
                </View>
              </View>
              {selectedMethod === "visa" && (
                <SymbolView name="button.programmable" tintColor={"#2AB749"} />
              )}
            </View>
          </Pressable>

          <Pressable
            onPress={() => setSelectedMethod("paypal")}
            className={`p-2 rounded-xl ${
              selectedMethod === "paypal" ? "border-2 border-accent" : ""
            }`}
            style={{ borderColor: "#E8E9EA", borderWidth: 1 }}
          >
            <View className="flex-row justify-between items-center px-2">
              <View className="flex-row items-center">
                <View className="p-4 rounded-lg">
                  <PayPal width={25} height={25} />
                </View>
                <View style={{ marginLeft: 12 }}>
                  <Text numberOfLines={2} className="font-semibold text-lg">
                    PayPal
                  </Text>
                </View>
              </View>
              {selectedMethod === "paypal" && (
                <SymbolView name="button.programmable" tintColor={"#2AB749"} />
              )}
            </View>
          </Pressable>

          <View className="h-[1px] bg-dark-5 w-full " />
        </View>

        <View className="flex-row justify-between">
          <View>
            <Text className="text-xl font-semibold">Total Amount</Text>
          </View>

          <View>
            <Text className="text-2xl font-semibold text-accent">$600</Text>
          </View>
        </View>
      </View>

      <View style={{ paddingBottom: bottom }}>
        <PressableScale
          onPress={() => onPaymentSubmit()}
          className="bg-accent h-[50px] flex flex-row gap-[6px] justify-center items-center px-5 mx-auto w-full rounded-xl"
        >
          <Text className="text-white text-lg font-semibold">Pay now</Text>
        </PressableScale>
      </View>
    </View>
  );
};

export default MethodScreen;
