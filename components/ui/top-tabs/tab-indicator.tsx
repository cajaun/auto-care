import React, { FC } from "react";
import { useWindowDimensions } from "react-native";
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";



export const sharedConfigs = {
  tabBarSidePadding: 20,
  tabBarGap: 24,
  indicatorOnPressAnimDuration: 250,
};

type Props = {
  activeTabIndex: SharedValue<number>;
  tabWidths: SharedValue<number[]>;
  tabOffsets: SharedValue<number[]>;
  tabBarOffsetX: SharedValue<number>;
  horizontalListOffsetX: SharedValue<number>;
  isHorizontalListScrollingX: SharedValue<boolean>;
};

export const TabIndicator: FC<Props> = ({
  activeTabIndex,
  tabWidths,
  tabOffsets,
  tabBarOffsetX,
  horizontalListOffsetX,
  isHorizontalListScrollingX,
}) => {
  const { width: windowWidth } = useWindowDimensions();



  const rIndicatorStyle = useAnimatedStyle(() => {
    const left = isHorizontalListScrollingX.value
      ? interpolate(
          horizontalListOffsetX.value / windowWidth,
          Object.keys(tabOffsets.value).map(Number),
          tabOffsets.value
        )
      : withTiming(tabOffsets.value[activeTabIndex.value], {
          duration: sharedConfigs.indicatorOnPressAnimDuration,
        });

    const width = isHorizontalListScrollingX.value
      ? interpolate(
          horizontalListOffsetX.value / windowWidth,
          Object.keys(tabWidths.value).map(Number),
          tabWidths.value
        )
      : withTiming(tabWidths.value[activeTabIndex.value], {
          duration: sharedConfigs.indicatorOnPressAnimDuration,
        });

    return {
      left,
      width,
      transform: [
        {
          translateX: -tabBarOffsetX.value,
        },
      ],
    };
  });

  return (
    <Animated.View
      className="absolute h-1 bottom-0 rounded-full bg-accent"
      style={rIndicatorStyle}
    />
  );
};


