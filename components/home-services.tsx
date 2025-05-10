import { View, Text, FlatList } from "react-native";
import React from "react";
import TouchableBounce from "./ui/touchable-bounce";
import { Image } from "expo-image";
import { SymbolView } from "expo-symbols";

import {
  vehicleOptionsDataMap,
  vehicleOptionsRenderMap,
} from "@/util/vehicle-options";
import { FadeIn } from "./utils.tsx/fade-in";
import { useBottomTabOverflow } from "./utils.tsx/body-scroll-view";
import { router } from "expo-router";

interface HomeServicesProps {
  activeTab: string;
}

const HomeServices = ({ activeTab }: HomeServicesProps) => {
  const selectedData = vehicleOptionsDataMap[activeTab] || [];
  const selectedRenderItem = vehicleOptionsRenderMap[activeTab] || (() => null);
  const paddingBottom = useBottomTabOverflow();
  const numColumns = activeTab === "rent" ? 1 : 2;

  const detailsHandler = (itemId: string, itemName: string, type: string, itemImage?: string) => {
    router.push(`/(root)/(details)/(${type})/${itemId}?name=${itemName}&image=${itemImage}`);
  };

  return (
    <View className="gap-y-4 pt-8 px-4">
      <Text className="text-2xl font-bold capitalize">Vehicle {activeTab}</Text>

      <FadeIn>
        <FlatList
          key={numColumns}
          scrollEnabled={false}
          contentInsetAdjustmentBehavior="automatic"
          data={selectedData}
          keyExtractor={(item, index) => index.toString()}
          numColumns={numColumns}
          columnWrapperStyle={
            numColumns > 1
              ? {
                  justifyContent: "space-between",
                  marginBottom: 20,
                }
              : undefined
          }
          renderItem={({ item }) =>
            selectedRenderItem({
              item,
              type: activeTab,
              onPress: detailsHandler,
            })
          }
          ItemSeparatorComponent={
            numColumns === 1 ? () => <View style={{ height: 20 }} /> : undefined
          }
          contentContainerStyle={{ paddingBottom: paddingBottom }}
        />
      </FadeIn>
    </View>
  );
};

export default HomeServices;
