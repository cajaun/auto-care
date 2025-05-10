import { View, Text, Pressable } from "react-native";
import React from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { Image } from "expo-image";
import { SymbolView } from "expo-symbols";
import { useBottomTabOverflow } from "@/components/utils.tsx/body-scroll-view";
import { getImageName } from "@/util/get-image-name";
import { PressableScale } from "@/components/ui/pressable-scale";
import { vehicleSales } from "@/util/vehicle-sales";

const SellingDetails = () => {
  const { id, name } = useLocalSearchParams();
  const paddingBottom = useBottomTabOverflow();
  const { top } = useSafeAreaInsets();

  const imageName = getImageName(vehicleSales, name as string);

  return (
    <View style={{ flex: 1, paddingTop: top }} className="bg-white">
      <View className="flex-1 justify-between">
        <View>
          <View className="flex-row justify-between items-center px-4 mb-4">
            <Pressable onPress={() => router.back()}>
              <SymbolView name="arrow.left" tintColor={"#1A202F"} />
            </Pressable>
            <Text className="text-2xl font-semibold text-dark-90">
              Parts Details
            </Text>
            <View className="w-6" />
          </View>
        </View>

        <View className = "gap-y-6">
          <View className="items-center justify-center h-64">
            <Image
              source={imageName}
              style={{ width: "80%", height: 250 }}
              contentFit="contain"
            />
          </View>

          <View className="flex-row justify-center items-center gap-6 my-4">
            <Text className="text-xl font-medium">-</Text>
            <Text className="text-xl font-semibold bg-black py-1 px-4 rounded-xl text-white">
              1
            </Text>
            <Text className="text-xl font-medium">+</Text>
          </View>
        </View>

        <View className="bg-dark-90 px-6 py-16 rounded-t-3xl relative">
        <View
  className="absolute -top-6 bg-white px-6 py-4 rounded-full border border-gray-200 shadow-md flex-row justify-between items-center gap-x-12"
  style={{ left: '50%', transform: [{ translateX: -60 }] }} 
>
  <Text className="text-lg font-semibold text-gray-800">Price</Text>
  <Text className="text-lg font-semibold text-gray-800">$120</Text>
</View>


      
          <View className="gap-y-5">
            <Text className="text-white text-2xl font-bold mb-1">{name}</Text>

            <View className="flex-row items-center justify-between">
              <Text className="text-white text-2xl font-bold">Description</Text>
              <Text className="text-white ml-2 text-sm">4.9 Review</Text>
            </View>

            <Text className="text-gray-300 text-sm mb-4">
              The piston rings prevent leakage of gas pressure from the
              combustion chamber and reduce to a minimum the seepage of oil...
            </Text>

            <View>
              <PressableScale className="bg-accent h-[50px] flex flex-row gap-[6px] justify-center items-center px-5 mx-auto w-full rounded-2xl">
                <Text className="text-white text-lg font-semibold">
                  Buy now
                </Text>
              </PressableScale>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SellingDetails;
