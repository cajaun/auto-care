import { View, Text, ScrollView, FlatList } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { Image } from "expo-image";
import { SymbolView } from "expo-symbols";
import { useBottomTabOverflow } from "@/components/utils.tsx/body-scroll-view";
import { popularCars } from "@/util/popular-cars";
import TouchableBounce from "@/components/ui/touchable-bounce";

const RentDetails = () => {
  const { id, name } = useLocalSearchParams();
  const paddingBottom = useBottomTabOverflow();

  console.log(id);

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="flex-row justify-between items-center px-4">
          <View>
            <SymbolView name="arrow.left" />
          </View>

          <View>
            <Text className="text-2xl font-semibold">{name}</Text>
          </View>

          <View>
            <Image
              source={{ uri: "https://picsum.photos/seed/696/3000/2000" }}
              style={{
                height: 40,
                width: 40,
                borderRadius: 20,
              }}
              contentFit="cover"
            />
          </View>
        </View>

        <View className="p-4">
          <Text className="font-bold text-xl">Popular Cars</Text>
        </View>

        <View className="px-4">
          <FlatList
            scrollEnabled={false}
            contentInsetAdjustmentBehavior="automatic"
            data={popularCars}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            renderItem={({ item }) => (
              <TouchableBounce style={{ width: "48%" }}>
                <View className="bg-dark-90/5 p-2 rounded-xl ">
                  <View style={{ width: "100%", height: 120 }}>
                    <Image
                      className=""
                      source={item.image}
                      style={{
                        width: "100%",
                        height: "75%",
                        marginVertical: "auto",
                      }}
                      contentFit="contain"
                    />
                  </View>
                  <View className="px-2">
                    <Text className="text-xl font-semibold mt-2">2023</Text>

                    <View className="flex-row items-center">
                      <SymbolView
                        name="figure.seated.side.right"
                        tintColor="#767982"
                        size={20}
                      />
                      <Text className="ml-1 mt-1 text-dark-50">4 Seats</Text>
                    </View>

                    <View className="flex-row justify-between items-center ">
                      <Text className="mt-2 font-bold text-black text-2xl">
                        ${item.price}
                      </Text>
                      <View style={{ width: 30, height: 30 }}>
                        <Image
                          source={require("@/assets/images/rentals/rent-button.png")}
                          style={{ width: "100%", height: "100%" }}
                          contentFit="contain"
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableBounce>
            )}
            columnWrapperStyle={{
              justifyContent: "space-between",
              marginBottom: 20,
            }}
            contentContainerStyle={{ paddingBottom: paddingBottom }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RentDetails;
