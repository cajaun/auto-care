import { View, Text, Pressable, Dimensions } from "react-native";
import React from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { getImageName } from "@/util/get-image-name";
import { popularCars } from "@/util/popular-cars";
import { Image } from "expo-image";
import { SymbolView } from "expo-symbols";
import { PressableScale } from "@/components/ui/pressable-scale";
import { FlatList } from "react-native-gesture-handler";
import { useBottomTabOverflow } from "@/components/utils.tsx/body-scroll-view";
import TouchableBounce from "@/components/ui/touchable-bounce";
import CheckOutSheet from "@/components/ui/sheet/check-out-sheet";
import { useSheetRef } from "@/components/ui/sheet/sheet";

const modelDetails = [
  {
    name: "Rear",
    characteristics: "38.4 in",
  },
  {
    name: "Seats",
    characteristics: "5",
  },
  {
    name: "Length",
    characteristics: "174.8 in",
  },
  {
    name: "Height",
    characteristics: "62 in",
  },
];

const RentBooking = () => {
  const { id, name } = useLocalSearchParams();
  const imageName = getImageName(popularCars, name as string);
  const { top, bottom } = useSafeAreaInsets();
  const paddingBottom = useBottomTabOverflow();
  const screenWidth = Dimensions.get("window").width;
  const itemWidth = screenWidth / 4;
  const bottomSheetModalRef = useSheetRef();
  const fixedName = Array.isArray(name) ? name[0] : name;
  return (
    <View style={{ flex: 1, paddingTop: top }} className=" bg-white ">
      <CheckOutSheet
        bottomSheetModalRef={bottomSheetModalRef}
        type={"rent"}
        name={fixedName}
      />

      <View className="flex-1">
        <View className="px-4">
          <View className="flex-row justify-between items-center px-4 mb-4">
            <Pressable onPress={() => router.back()}>
              <SymbolView name="arrow.left" tintColor={"#1A202F"} />
            </Pressable>
            <Text className="text-xl font-semibold text-dark-90">
              Rent details
            </Text>
            <View className="w-4" />
          </View>
        </View>

        <View className="gap-y-5 ">
          <View className="px-4 gap-y-8">
            <View
              className="items-center justify-center rounded-xl "
              style={{ width: "100%", height: 190 }}
            >
              <Image
                source={imageName}
                style={{ width: "100%", height: "100%", borderRadius: 12 }}
                contentFit="cover"
              />
            </View>

            <View style={{ width: "100%", height: 53 }}>
              <Image
                source={require("@/assets/images/car-carousel.png")}
                style={{ width: "100%", height: "100%", borderRadius: 12 }}
                contentFit="cover"
              />
            </View>
          </View>

          <View className="pt-8 gap-y-3 px-4">
            <View className="flex-row justify-between">
              <View>
                <Text className="text-xl font-bold">Volvo C40 Recharge</Text>
              </View>
              <View className="flex-row items-center">
                <SymbolView name="star.fill" tintColor="#FFB23F" size={20} />
                <Text className="ml-1 mt-1 text-dark-90 text-lg">4.9</Text>
              </View>
            </View>

            <View className="flex-row gap-x-2 items-center ">
              <View>
                <SymbolView name="person.fill" tintColor="#767982" size={25} />
              </View>

              <Text className="text-dark-50 text-lg">1605k User</Text>
            </View>

            <View>
              <Text className="text-dark-90 text-lg">
                Volvo C40 Recharge. Discover our first pure electric crossover
                with leather free interior & Google built-in.
              </Text>
            </View>
          </View>

          <View className="pt-4 gap-y-3">
            <View className="flex-row px-4">
              <Text className="text-xl font-bold">Model Details</Text>
            </View>

            <FlatList
              contentInsetAdjustmentBehavior="automatic"
              data={modelDetails}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableBounce style={{ width: itemWidth, marginRight: 12 }}>
                  <View
                    className="bg-dark-90/5 p-2 rounded-xl  justify-center items-center"
                    style={{ width: "100%", height: 100 }}
                  >
                    <View className="px-2 " style={{ marginVertical: "auto" }}>
                      <Text className="text-xl font-semibold mt-2 text-dark-50">
                        {item.name}
                      </Text>

                      <View className=" items-center">
                        <Text className="mt-1 font0b">
                          {item.characteristics}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableBounce>
              )}
              contentContainerStyle={{
                paddingBottom: paddingBottom,
                paddingHorizontal: 12,
              }}
            />
          </View>
        </View>
      </View>

      <View
        className="px-8 bg-dark-90/5 py-8  flex-row  justify-between"
        style={{ paddingBottom: bottom }}
      >
        <View className="">
          <View>
            <Text className="text-xl ">Total</Text>
          </View>

          <View>
            <Text className="text-xl font-bold">
              $400<Text className="text-xl font-semibold text-dark-40">/h</Text>
            </Text>
          </View>
        </View>

        <PressableScale
          onPress={() => bottomSheetModalRef.current?.present()}
          className="bg-accent h-[50px]  justify-center items-center px-5  rounded-xl"
          style={{ width: "60%" }}
        >
          <Text className="text-white text-lg font-semibold">Book now</Text>
        </PressableScale>
      </View>
    </View>
  );
};

export default RentBooking;
