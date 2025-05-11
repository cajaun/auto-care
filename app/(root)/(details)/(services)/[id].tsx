import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { getImageName } from "@/util/get-image-name";
import { vehicleServices } from "@/util/vehicle-services";
import { PressableScale } from "@/components/ui/pressable-scale";
import { Image } from "expo-image";
import { SymbolView } from "expo-symbols";
import { useSheetRef } from "@/components/ui/sheet/sheet";
import CheckOutSheet from "@/components/ui/sheet/check-out-sheet";

const ServicesDetails = () => {
  const { id, name } = useLocalSearchParams();
  const { top, bottom } = useSafeAreaInsets();
  const [checked, setChecked] = useState(false);
  const imageName = getImageName(vehicleServices, name as string);

  const bottomSheetModalRef = useSheetRef();
  const fixedName = Array.isArray(name) ? name[0] : name;
  return (
    <View style={{ flex: 1, paddingTop: top }} className=" bg-white px-4">
      <CheckOutSheet
        bottomSheetModalRef={bottomSheetModalRef}
        type={"services"}
        name={fixedName}
      />

      <View className="flex-1">
        <View>
          <View className="flex-row justify-between items-center px-4 mb-4">
            <Pressable onPress={() => router.back()}>
              <SymbolView name="arrow.left" tintColor={"#1A202F"} />
            </Pressable>
            <Text className="text-xl font-semibold text-dark-90">{name}</Text>
            <View className="w-4" />
          </View>
        </View>

        <View className="gap-y-5">
          <View className=" ">
            <View
              className="items-center justify-center relative rounded-xl "
              style={{ width: "100%", height: 190 }}
            >
              <Image
                source={imageName}
                style={{ width: "100%", height: "100%", borderRadius: 12 }}
                contentFit="cover"
              />

              <View
                className="absolute -bottom-6 bg-dark-90 px-6 py-3 rounded-full   flex-row justify-between items-center gap-x-12"
                style={{ left: "50%", transform: [{ translateX: -90 }] }}
              >
                <Text className="text-lg font-semibold text-white">
                  Per hour
                </Text>
                <Text className="text-lg font-semibold text-white">$100</Text>
              </View>
            </View>
          </View>

          <View className="pt-8 gap-y-3 ">
            <View className="flex-row justify-between">
              <View>
                <Text className="text-xl font-bold">Service Description</Text>
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
                The Model B wis a Ford automobile wi production startin wi model
                year 1932 an
              </Text>
            </View>

            <View className="flex-row items-center gap-x-2">
              <Pressable
                onPress={() => setChecked(!checked)}
                className={`w-5 h-5 border-2 rounded ${
                  checked ? "bg-accent border-accent" : "border-gray-400"
                }`}
              />
              <Text className="text-dark-90">I need parts for my vehicle</Text>
            </View>

            <View className="h-3 border-b-[0.25px] border-dark-90/25" />
          </View>

          <View className=" ">
            <View className="bg-white shadow-sm py-4 px-2 rounded-xl">
              <View className="p-3 gap-y-6 ">
                <View className="">
                  <Text className="text-xl font-bold">
                    Emergency Vehicle Information
                  </Text>
                </View>

                <View className="px-4 flex-row justify-between items-center">
                  <View className="flex-row  items-center gap-x-4">
                    <SymbolView name="location.fill" tintColor={"#1A202F"} />
                    <Text className="text-lg text-dark-50">
                      Vehicle location
                    </Text>
                  </View>

                  <View>
                    <SymbolView name="dot.scope" tintColor={"#1A202F"} />
                  </View>
                </View>

                <View className="px-4 flex-row items-center gap-x-2">
                  <View>
                    <SymbolView
                      name="car.rear.road.lane.dashed"
                      tintColor={"#1A202F"}
                      size={35}
                    />
                  </View>
                  <Text className="text-lg text-dark-50">Vehicle model</Text>
                </View>
              </View>
            </View>
          </View>
         
        </View>
      </View>
      <View className = ""  style={{ paddingBottom: bottom }}>
            <PressableScale
              onPress={() => bottomSheetModalRef.current?.present()}
              className="bg-accent h-[50px] flex flex-row gap-[6px] justify-center items-center px-5 mx-auto w-full rounded-xl"
            >
              <Text className="text-white text-lg font-semibold">Book now</Text>
            </PressableScale>
          </View>
    </View>
  );
};

export default ServicesDetails;
