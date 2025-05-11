import React, { FC } from "react";
import { View, Pressable } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const _padding = 3;

type TabItemType = {
  key: string;
  label: string;
};

type TabItemProps = {
  title: string;
  active: boolean;
  onPress: () => void;
};

const TabItem: FC<TabItemProps> = ({ title, active, onPress }) => {
  const rTextStyle = useAnimatedStyle(() => ({
    color: withTiming(active ? "#FFFFFF" : "#000000"),
    // transform: [{ scale: withTiming(active ? 1.05 : 0.95) }],
  }));

  return (
    <Pressable className="flex-1 items-center py-[6px]" onPress={onPress}>
      <Animated.Text className="text-sm font-medium" style={rTextStyle}>
        {title}
      </Animated.Text>
    </Pressable>
  );
};

type Props = {
  tabs: TabItemType[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
};

export const SegmentedTabs: FC<Props> = ({ tabs, activeIndex, setActiveIndex }) => {
  const tabsWidth = useSharedValue(0);

  const rIndicatorStyle = useAnimatedStyle(() => {
    const tabCount = tabs.length;
    const tabWidth = (tabsWidth.value - _padding * 2) / tabCount;

    return {
      width: tabWidth,
      left: withTiming(tabWidth * activeIndex + _padding, { duration: 200 }),
    };
  });

  return (
    <View
      className="rounded-lg bg-white flex-row items-center relative"
      style={{ padding: _padding }}
      onLayout={(e) => (tabsWidth.value = e.nativeEvent.layout.width)}
    >
      <Animated.View
        className="absolute rounded-[6px] bg-accent "
        style={[rIndicatorStyle, { top: _padding, bottom: _padding }]}
      />
      {tabs.map((tab, index) => (
        <TabItem
          key={tab.key}
          title={tab.label}
          active={index === activeIndex}
          onPress={() => setActiveIndex(index)}
        />
      ))}
    </View>
  );
};
