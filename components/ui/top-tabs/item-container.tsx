import { BlurView } from "expo-blur";
import React, { FC, PropsWithChildren } from "react";
import { useWindowDimensions, StyleSheet, Platform } from "react-native";
import Animated, {
  interpolate,
  useAnimatedProps,
  Extrapolation,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";


type Props = {
  index: number;
  activeTabIndex: SharedValue<number>;
  prevActiveTabIndex: SharedValue<number>;
  horizontalListOffsetX: SharedValue<number>;
  isHorizontalListScrollingX: SharedValue<boolean>;
};

export const ItemContainer: FC<PropsWithChildren<Props>> = ({
  children,
  index,
  activeTabIndex,
  prevActiveTabIndex,
  horizontalListOffsetX,
  isHorizontalListScrollingX,
}) => {
  const { width } = useWindowDimensions();

  const rContainerStyle = useAnimatedStyle(() => {
    if (Platform.OS === "android") {
      return {};
    }

    if (
      Math.abs(activeTabIndex.value - prevActiveTabIndex.value) > 1 &&
      index !== activeTabIndex.value &&
      !isHorizontalListScrollingX.value
    ) {
      return { opacity: 0 };
    }

    const progress = horizontalListOffsetX.value / width;

    const fadeOut = interpolate(progress, [index, index + 0.7], [1, 0], Extrapolation.CLAMP);
    const fadeIn = interpolate(progress, [index - 0.3, index], [0, 1], Extrapolation.CLAMP);




    return {
      opacity: fadeOut * fadeIn,
      transform: [
       
      ],
    };
  });



  return (
    <Animated.View style={[{ width }, rContainerStyle]} className="bg-neutral-200">
      {children}
   
    </Animated.View>
  );
};


