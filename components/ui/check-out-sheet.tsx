import { View, Text } from "react-native";
import React, { useMemo, useState } from "react";
import { Sheet, useSheetRef } from "./sheet";
import DateTimePicker, {
  DateType,
  useDefaultClassNames,
  useDefaultStyles,
} from "react-native-ui-datepicker";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";

import { PressableScale } from "./pressable-scale";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SegmentedTabs } from "./segmented-tab";

interface CheckOutSheetProps {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
  type: string;
  name: string;
}

const CheckOutSheet = ({ bottomSheetModalRef, type, name }: CheckOutSheetProps) => {
  const snapPoints = useMemo(() => ["70%"], []);;
  const defaultStyles = useDefaultStyles();
  const [selected, setSelected] = useState<DateType>();
  const defaultClassNames = useDefaultClassNames();
  const { top, bottom } = useSafeAreaInsets();
  const tabItems = [
    { key: "contacts", label: "Contacts" },
    { key: "recent", label: "Recent" },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const checkoutHandler = () => {
    bottomSheetModalRef.current?.dismiss();
    router.push(`/(root)/(payments)/(system)?date=${selected}&type=${type}&name=${name}`);
  };

  return (
    <Sheet
      ref={bottomSheetModalRef}
      snapPoints={snapPoints}
      enableDynamicSizing={false}
    >
      <BottomSheetView className="bg-white px-4  flex-1 justify-between">
        <View>
          <Text className="text-2xl text-dark-90 font-bold">Date & Time</Text>
        </View>

        <View>
        <SegmentedTabs
            tabs={tabItems}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
     
        </View>

        <View className="w-full">
          {activeIndex === 0 ? (
            <DateTimePicker
              mode="single"
              date={selected}
              showOutsideDays={true}
              onChange={({ date }) => setSelected(date)}
              classNames={{
                ...useDefaultClassNames(),
                day_label: "",
                month_selector_label: "text-2xl font-bold",
                year_selector_label: "text-2xl text-dark-90/50 font-bold",
                button_next: "text-red-500 fill-[#FF]",
                selected: "bg-accent text-white rounded-full ",
                selected_label: "text-white",
                outside: "text-dark-90/50",
                outside_label: "text-dark-90/50",
                today: "",
                today_label: "",
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

        <View style={{ paddingBottom: bottom }}>
          <PressableScale
            onPress={() => checkoutHandler()}
            className="bg-accent h-[50px] flex flex-row gap-[6px] justify-center items-center px-5 mx-auto w-full rounded-2xl"
          >
            <Text className="text-white text-lg font-semibold">Checkout</Text>
          </PressableScale>
        </View>
      </BottomSheetView>
    </Sheet>
  );
};

export default CheckOutSheet;
