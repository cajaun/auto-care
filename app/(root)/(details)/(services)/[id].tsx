import { View, Text, Pressable, StyleSheet } from "react-native";
import React, { useCallback, useMemo, useState } from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { getImageName } from "@/util/get-image-name";
import { vehicleServices } from "@/util/vehicle-services";
import { PressableScale } from "@/components/ui/pressable-scale";
import { Image } from "expo-image";
import { SymbolView } from "expo-symbols";
import { Sheet, useSheetRef } from "@/components/ui/sheet";
import {  BottomSheetView } from "@gorhom/bottom-sheet";
import { SegmentedControl } from "@/components/ui/segmented-tab";
import DateTimePicker, {
  DateType,
  useDefaultClassNames,
  useDefaultStyles,
} from "react-native-ui-datepicker";

const ServicesDetails = () => {
  const { id, name } = useLocalSearchParams();
  const { top } = useSafeAreaInsets();

  const imageName = getImageName(vehicleServices, name as string);

  const bottomSheetModalRef = useSheetRef();

  const snapPoints = useMemo(() => ["70%"], []);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const defaultStyles = useDefaultStyles();
  const [selected, setSelected] = useState<DateType>();
  const defaultClassNames = useDefaultClassNames();

  return (
    <View style={{ flex: 1, paddingTop: top }} className=" bg-white px-4">
      <Sheet
        ref={bottomSheetModalRef}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
      >
        <BottomSheetView className="bg-white px-4 gap-y-4">
          <View>
            <Text className="text-2xl text-dark-90 font-bold">Date & Time</Text>
          </View>

          <View>
            <SegmentedControl
              values={["Date", "Time"]}
              selectedIndex={selectedIndex}
              onChange={setSelectedIndex}
            />
          </View>

          <View className="w-full">
            {selectedIndex === 0 ? (
              <DateTimePicker
                mode="single"
                date={selected}
                onChange={({ date }) => setSelected(date)}
                classNames={{
                  ...useDefaultClassNames(),
                  day_label: "",
                  month_selector_label: "text-2xl font-bold",
                  year_selector_label: "text-2xl font-bold",
                  // button_next_image: "bg-black p-4 rounded-full text-white",
                  button_next: " text-red-500 fill-[#FF]",
                  // button_prev_image: "text-amber-500",
                  selected: "bg-blue-500 text-white", // Highlight the selected day with a background color
                  selected_label: "text-white", // Make the label white for visibility
              
                }}
              />
            ) : (
              <DateTimePicker
                mode="single"
                timePicker={true}
                date={selected}
                onChange={({ date }) => setSelected(date)}
                styles={defaultStyles}
                initialView="time"
              />
            )}
          </View>

          <View>
            <PressableScale
              onPress={() => bottomSheetModalRef.current?.present()}
              className="bg-accent h-[50px] flex flex-row gap-[6px] justify-center items-center px-5 mx-auto w-full rounded-2xl"
            >
              <Text className="text-white text-lg font-semibold">Checkout</Text>
            </PressableScale>
          </View>
        </BottomSheetView>
      </Sheet>

      <View className="">
        <View>
          <View className="flex-row justify-between items-center px-4 mb-4">
            <Pressable onPress={() => router.back()}>
              <SymbolView name="arrow.left" tintColor={"#1A202F"} />
            </Pressable>
            <Text className="text-2xl font-semibold text-dark-90">{name}</Text>
            <View className="w-4" />
          </View>
        </View>

        <View className="gap-y-5">
          <View className=" ">
            <View
              className="items-center justify-center relative rounded-3xl "
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

          <View className="pt-8 gap-y-3">
            <View className="flex-row">
              <Text className="text-2xl font-bold">Service Description</Text>
            </View>

            <View>
              <Text className="text-dark-50 text-lg">1605k User</Text>
            </View>

            <View>
              <Text className="text-dark-90 text-lg">
                The Model B wis a Ford automobile wi production startin wi model
                year 1932 an
              </Text>
            </View>

            <View>
              <Text className="text-dark-90 ">I need parts for my vehicle</Text>
            </View>
            <View className="h-[1px] bg-dark-5 w-full" />
          </View>

          <View className=" pb-8 ">
            <View className="bg-white shadow-md  py-4 px-2 rounded-2xl">
              <View className="p-3 gap-y-6 ">
                <View className="">
                  <Text className="text-2xl font-bold">
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
          <View>
            <PressableScale
              onPress={() => bottomSheetModalRef.current?.present()}
              className="bg-accent h-[50px] flex flex-row gap-[6px] justify-center items-center px-5 mx-auto w-full rounded-2xl"
            >
              <Text className="text-white text-lg font-semibold">Book now</Text>
            </PressableScale>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ServicesDetails;
