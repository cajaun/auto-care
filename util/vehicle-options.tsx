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
  ({
    item,
    type,
    onPress,
  }: {
    item: any;
    type: string;
    onPress: (
      itemId: string,
      itemName: string,
      type: string,
      itemImage?: string
    ) => void;
  }) => JSX.Element
> = {
  services: ({ item, type, onPress }) => (
    <TouchableBounce
      style={{ width: "48%" }}
      onPress={() => onPress(item.id, item.name, type, item.image)}
    >
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
            style={{
              position: "absolute",
              bottom: 4,
              right: 80,
              width: 100,
              height: 30,
            }}
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

  rent: ({ item, type, onPress }) => (
    <TouchableBounce
      style={{ width: "100%", height: 94 }}
      onPress={() => onPress(item.id, item.name, type)}
    >
      <View
        className="bg-white flex-row  justify-between items-center  rounded-xl "
        style={{ height: "100%", width: "100%", paddingHorizontal: 28 }}
      >
        <View className="flex-row" style={{ gap: 28 }}>
          <View>
            {/* the Sf symbol for the car is facing the other way so transform */}
            <SymbolView
              name={item.icon}
              tintColor="#000"
              size={60}
              style={{
                transform:
                  item.name.toLowerCase() === "car rent"
                    ? [{ scaleX: -1 }]
                    : [],
              }}
            />
          </View>

          <View className="  gap-y-2">
            <Text className="text-xl font-semibold">{item.name} Service</Text>

            <Text
              className=""
              style={{ color: "#2AB749", fontWeight: "semibold" }}
            >
              Available
            </Text>
          </View>
        </View>

        <View style={{ width: 30, height: 30 }}>
          <Image
            source={require("@/assets/images/rentals/rent-button.png")}
            style={{ width: "100%", height: "100%" }}
            contentFit="contain"
          />
        </View>
      </View>
    </TouchableBounce>
  ),

  selling: ({ item, type, onPress }) => (
    <TouchableBounce
      style={{ width: "48%" }}
      onPress={() => onPress(item.id, item.name, type, item.image)}
    >
      <View
        className=" p-2 rounded-xl "
        style={{ borderColor: "#E8E9EA", borderWidth: 1 }}
      >
        <View style={{ width: "100%", height: 120 }}>
          <Image
            className=""
            source={item.image}
            style={{ width: "100%", height: "75%", marginVertical: "auto" }}
            contentFit="contain"
          />
        </View>
        <View className="px-2">
          <View className="flex-row items-center">
            <SymbolView name="star.fill" tintColor="#FFB23F" size={20} />
            <Text className="ml-1 mt-1 text-dark-50">4.9</Text>
          </View>

          <Text className="text-xl font-semibold mt-2">{item.name}</Text>
          <View className="flex-row justify-between items-center ">
            <Text className="mt-2 font-bold text-accent text-xl">${item.price}</Text>

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
  services: vehicleServices,
  rent: vehicleRentals,
  selling: vehicleSales,
};
