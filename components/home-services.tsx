import { View, Text, FlatList } from "react-native";
import React from "react";
import {
  vehicleOptionsDataMap,
  vehicleOptionsRenderMap,
} from "@/util/vehicle-options";
import { FadeIn } from "./utils.tsx/fade-in";
import { useBottomTabOverflow } from "./utils.tsx/body-scroll-view";
import { router } from "expo-router";

interface HomeServicesProps {
  activeTab: string;
  searchText: string;
}

const HomeServices = ({ activeTab, searchText }: HomeServicesProps) => {

  // selected data based on the activeTab 
  const selectedData = vehicleOptionsDataMap[activeTab] || [];

  // selected render function for the activeTab to display items correctly
  const selectedRenderItem = vehicleOptionsRenderMap[activeTab] || (() => null);

  const paddingBottom = useBottomTabOverflow();

  // set the number of columns for the FlatList based on the active tab
  const numColumns = activeTab === "rent" ? 1 : 2;

  //  navigate to the details screen for the item
  const detailsHandler = (
    itemId: string,
    itemName: string,
    type: string,
    itemImage?: string
  ) => {
    router.push(
      `/(root)/(details)/(${type})/${itemId}?name=${itemName}&image=${itemImage}`
    );
    // pass item name and image name as queries through the routes
  };

  // filter the data based on the search text entered by the user
  const filteredData = selectedData.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View className="gap-y-4 pt-8 px-4">

      <Text className="text-xl font-bold capitalize">{activeTab === "selling" ? "Parts for sale" : `Vehicle ${activeTab}`}</Text>

      <FadeIn>
        <FlatList
          key={numColumns}
          scrollEnabled={false}
          contentInsetAdjustmentBehavior="automatic"
          data={filteredData}
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
