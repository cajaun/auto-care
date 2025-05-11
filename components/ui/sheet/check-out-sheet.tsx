import { View, Text, Pressable } from "react-native";
import React, { useMemo, useState } from "react";
import { Sheet, useSheetRef } from "./sheet";
import DateTimePicker, {
  DateType,
  useDefaultClassNames,
  useDefaultStyles,
} from "react-native-ui-datepicker";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";

import { PressableScale } from "../pressable-scale";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { SymbolView } from "expo-symbols";
import { toast } from "sonner-native";

interface CheckOutSheetProps {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
  type: string;
  name: string;
}

const CheckOutSheet = ({
  bottomSheetModalRef,
  type,
  name,
}: CheckOutSheetProps) => {

  const [selected, setSelected] = useState<DateType>();

  const { top, bottom } = useSafeAreaInsets();



  const checkoutHandler = () => {

    if (!selected) {
      toast.error("Please select a date before checking out", {
        duration: 6000,
        position: "top-center",
      });
      return;
    }
    bottomSheetModalRef.current?.dismiss();
    router.push(
      `/(root)/(payments)/(system)?date=${selected}&type=${type}&name=${name}`
    );
  };

  return (
    <Sheet
      ref={bottomSheetModalRef}
      enableDynamicSizing={true}
    >
      <BottomSheetView className="bg-white px-4  flex-1 justify-between gap-y-4">
        <View className = "flex-row justify-between items-center">
          <Text className="text-xl text-dark-90 font-bold">Date & Time</Text>

          <Pressable onPress={() =>     bottomSheetModalRef.current?.dismiss()}>
            <SymbolView name = "xmark.circle" size={30} tintColor={"black"} />
          </Pressable>
        </View>



        <View className="w-full">

            <DateTimePicker
              mode="single"
              date={selected}
              showOutsideDays={true}
              onChange={({ date }) => setSelected(date)}
              classNames={{
                ...useDefaultClassNames(),
                day_label: "",
                month_selector_label: "text-xl font-bold",
                year_selector_label: "text-xl text-dark-90/50 font-bold",
                button_next: "",
                button_next_image: "",
                selected: "bg-accent text-white rounded-full ",
                selected_label: "text-white",
                outside: "text-dark-90/50",
                outside_label: "text-dark-90/50",
                today: "",
                today_label: "",
              }}
            />

        </View>

        <View style={{ paddingBottom: bottom }}>
          <PressableScale
            onPress={() => checkoutHandler()}
            className="bg-accent h-[50px] flex flex-row gap-[6px] justify-center items-center px-5 mx-auto w-full rounded-xl"
          >
            <Text className="text-white text-lg font-semibold">Checkout</Text>
          </PressableScale>
        </View>
      </BottomSheetView>
    </Sheet>
  );
};

export default CheckOutSheet;
