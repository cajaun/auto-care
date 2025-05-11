import { View, Text } from "react-native";
import React, { useMemo } from "react";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { Sheet } from "./sheet";
import { PressableScale } from "../pressable-scale";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SymbolView } from "expo-symbols";

interface RebookSheetProps {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
  data: any;
}

const RebookSheet = ({ bottomSheetModalRef, data }: RebookSheetProps) => {

  const { top, bottom } = useSafeAreaInsets();
  
  return (
    <Sheet
      ref={bottomSheetModalRef}
      // snapPoints={snapPoints}
      enableDynamicSizing={true}
    >
      <BottomSheetView className="bg-white px-4  flex-1 justify-between ">

        <View>

       
        <View>
          <Text className="text-xl text-dark-90 font-bold">Previse</Text>
        </View>

        <View className="flex-row items-center py-3 ">
          <View className="w-14 h-14 rounded-xl bg-[#E5EAFF4D] justify-center items-center mr-3">
            <SymbolView name="house.fill" tintColor={"#FF4040"} />
          </View>

          <View className="flex-1">
            <Text className="text-lg font-semibold text-black">
              {data?.name}
            </Text>
            <Text className="text-sm text-gray-500">Shop no: 120Ab38</Text>
          </View>
        </View>
        </View>

        <View className="gap-y-4 py-8">
          {/* Address */}
          <View className="flex-row items-center gap-x-4">
            <SymbolView name="map.fill" tintColor="#0F172A" />
            <Text className="text-base text-dark-90">
              2972 Westheimer Rd. Santa Ana, Illinois 85486
            </Text>
          </View>
          <View className="h-[1px] bg-gray-200" />

          {/* Date and Time */}
          <View className="flex-row items-center gap-x-4">
            <SymbolView name="calendar" tintColor="#0F172A" />
            <Text className="text-base text-dark-90">
              <Text className="font-semibold">
                {new Date(data?.date).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </Text>{" "}
              <Text className="text-dark-70">
                {new Date(data?.date).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </Text>
          </View>
          <View className="h-[1px] bg-gray-200" />

          {/* Message */}
          <View className="flex-row items-center gap-x-4">
            <SymbolView name="envelope.fill" tintColor="#0F172A" />
            <Text className="text-base text-dark-90">Message</Text>
          </View>
          <View className="h-[1px] bg-gray-200" />

          {/* Phone */}
          <View className="flex-row items-center gap-x-4">
            <SymbolView name="phone.fill" tintColor="#0F172A" />
            <Text className="text-base text-dark-90">
              {data?.phone ?? "(704) 555-0127"}
            </Text>
          </View>
        </View>

        <View style={{ paddingBottom: bottom}}>
          <PressableScale className="bg-accent h-[50px] flex flex-row gap-[6px] justify-center items-center px-5 mx-auto w-full rounded-xl">
            <Text className="text-white text-lg font-semibold">Rebook now</Text>
          </PressableScale>
        </View>
      </BottomSheetView>
    </Sheet>
  );
};

export default RebookSheet;
