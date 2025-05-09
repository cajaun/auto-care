import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  BottomTabBarProps,
  useBottomTabBarHeight,
} from "@react-navigation/bottom-tabs";


import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TabBarData } from "@/util/tab-bar-data";
import TabBarButton from "./tab-bar-buttons";



export function useTopTabOverflow() {
  let tabHeight = 0;
  try {
    tabHeight = useBottomTabBarHeight();
  } catch {}
  const { top } = useSafeAreaInsets();
  return tabHeight + top;
}

const TabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        height: 100,

        width: "100%",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: 12,
          gap: 20,
        }}
      >
        {TabBarData.map((btn, index) => {
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: state.routes[index].key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(
                state.routes[index].name,
                state.routes[index].params
              );
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: state.routes[index].key,
            });
          };

          return (
            <TabBarButton
              key={btn.label}
              label={btn.label}
              active={isFocused}
              onPress={onPress}
              defaultSymbol={btn.defaultSymbol}
              activeSymbol={btn.activeSymbol}
              color={btn.color}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {},
});

export default TabBar;
