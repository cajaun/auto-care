import React from "react";
import { View, Text } from "react-native";
import { Image } from "expo-image";
import { SymbolView } from "expo-symbols";
import TouchableBounce from "@/components/ui/touchable-bounce";
import { vehicleServices } from "./vehicle-services";
import { vehicleRentals } from "./vehicle-rentals";
import { vehicleSales } from "./vehicle-sales";

export const vehicleOptionsRenderMap: Record<
  string,
  ({ item }: { item: any }) => JSX.Element
> = {
  Services: ({ item }) => (
    <TouchableBounce style={{ width: "48%" }}>
      <View
        className="rounded-lg overflow-hidden"
        style={{
          width: "100%",
          height: 120,
          marginBottom: 10,
          position: "relative",
        }}
      >
        <Image
          source={item.image}
          style={{ width: "100%", height: 120, borderRadius: 12 }}
          contentFit="cover"
        />
        {item.tag && (
          <View
            className="absolute bottom-4"
            style={{ width: 100, height: 30 }}
          >
            <Image
              source={item.tag}
              style={{ width: "100%", height: "100%" }}
              contentFit="contain"
            />
          </View>
        )}
      </View>

      <View className="gap-y-1">
        <Text className="text-lg font-semibold">{item.name}</Text>
        <View className="flex-row items-center gap-x-2">
          <SymbolView name="headset" tintColor="#A3A6AC" />
          <Text className="text-dark-50">24/7</Text>
        </View>
      </View>
    </TouchableBounce>
  ),

  Rent: ({ item }) => (
    <TouchableBounce style={{ width: "100%", height: 94 }} className="">
      <View
        className="bg-white flex-row  items-center  rounded-2xl px-4 "
        style={{ height: "100%", width: "100%" }}
      >
        <View className="flex-row px-4 items-center justify-center gap-x-4">
          <View style={{ width: 90, height: 60 }}>
            <Image
              className=""
              source={item.image}
              style={{ width: "100%", height: "75%", marginVertical: "auto" }}
              contentFit="contain"
            />
          </View>

          <View className="gap-y-2">
            <Text className="text-2xl font-semibold">Car Rent Service</Text>

            <Text>Available</Text>
          </View>
        </View>
      </View>
    </TouchableBounce>
  ),

  Selling: ({ item }) => (
    <TouchableBounce style={{ width: "48%" }}>
      <View className="bg-white p-2 rounded-xl border border-gray-200">
        <View style={{ width: "100%", height: 120 }}>
          <Image
            className=""
            source={item.image}
            style={{ width: "100%", height: "75%", marginVertical: "auto" }}
            contentFit="contain"
          />
        </View>
        <View className = "px-2">

      
        <Text className="text-xl font-semibold mt-2">{item.name}</Text>
        <View className="flex-row justify-between items-center ">
          <Text className="mt-2 font-bold text-accent text-2xl">$240</Text>

          <View>
            <SymbolView
              name="plus.circle.fill"
              type="monochrome"
              tintColor="#FF4040"
              size={25}
            />
          </View>
        </View>
        </View>
      </View>
    </TouchableBounce>
  ),
};

export const vehicleOptionsDataMap: Record<string, any[]> = {
  Services: vehicleServices,
  Rent: vehicleRentals,
  Selling: vehicleSales,
};
