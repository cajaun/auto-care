import { useMemo, useRef } from "react";
import { Animated } from "react-native";

// fadeIn animation for when theres a need for smooth transitions for data/components
export function FadeIn({ children }: { children: React.ReactNode }) {


  const opacity = useRef(new Animated.Value(0)).current;
  useMemo(() => {
    return Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return <Animated.View style={{ opacity }}>{children}</Animated.View>;
}