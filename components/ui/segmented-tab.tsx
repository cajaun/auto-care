import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  LayoutChangeEvent,
  Pressable,
} from "react-native";

interface Props {
  values: string[];
  selectedIndex: number;
  onChange: (index: number) => void;
}

export const SegmentedControl = ({
  values,
  selectedIndex,
  onChange,
}: Props) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const segmentWidth = useRef(0);

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: selectedIndex * segmentWidth.current,
      useNativeDriver: true,
    }).start();
  }, [selectedIndex]);

  const onLayout = (event: LayoutChangeEvent) => {
    const totalWidth = event.nativeEvent.layout.width;
    segmentWidth.current = totalWidth / values.length;
  };

  return (
    <View
      className="h-[47px] bg-white rounded-2xl flex-row mb-4 relative overflow-hidden items-center"
      onLayout={onLayout}
    >
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          width: `${100 / values.length}%`,
          backgroundColor: "#FF4040",

          borderRadius: 16,
          transform: [{ translateX }],
        }}
      />
      {values.map((value, index) => (
        <Pressable
          key={value}
          onPress={() => onChange(index)}
          style={{ flex: 1, zIndex: 1 }}
          className="items-center justify-center h-full"
        >
          <Text
            className={`font-medium capitalize ${
              selectedIndex === index ? "text-white " : "text-dark-80"
            }`}
          >
            {value}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};
