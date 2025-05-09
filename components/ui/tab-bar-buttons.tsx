import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';
import { SFSymbol, SymbolView } from 'expo-symbols';

interface TabBarButtonProps {
  active: boolean;
  label: string;
  color: string;
  onPress: () => void;
  defaultSymbol: SFSymbol;
  activeSymbol: SFSymbol;  
}

const MIN_WIDTH = 60;
const MAX_WIDTH = 120;
const INNER_BOX_PADDING_LEFT = 13;
const SYMBOL_SIZE = 25;
const TEXT_PADDING = 6;
const TEXT_TRANSLATE_X = 12;

const TabBarButton: React.FC<TabBarButtonProps> = ({
  active,
  onPress,
  label,
  defaultSymbol,
  activeSymbol,
  color,
}) => {
  const [textWidth, setTextWidth] = useState(0);

  const width = useSharedValue(active ? MAX_WIDTH : MIN_WIDTH);
  const padding = useSharedValue(0);
  const defaultSymbolOpacity = useSharedValue(active ? 0 : 1);
  const activeSymbolOpacity = useSharedValue(active ? 1 : 0);
  const boxPadding = useSharedValue(
    active
      ? (MAX_WIDTH - (textWidth + SYMBOL_SIZE + TEXT_PADDING)) / 2 - INNER_BOX_PADDING_LEFT
      : 0
  );

  useEffect(() => {
    if (textWidth) {
      width.value = withTiming(active ? MAX_WIDTH : MIN_WIDTH, { duration: 300 });
      padding.value = withTiming(active ? -TEXT_TRANSLATE_X : 0, { duration: 300 });
      defaultSymbolOpacity.value = withTiming(active ? 0 : 1, { duration: 300 });
      activeSymbolOpacity.value = withTiming(active ? 1 : 0, { duration: 300 });
      boxPadding.value = withTiming(
        active
          ? (MAX_WIDTH - (textWidth + SYMBOL_SIZE + TEXT_PADDING)) / 2 - INNER_BOX_PADDING_LEFT
          : 0
      );
    }
  }, [active, textWidth]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: width.value,
    backgroundColor: interpolateColor(width.value, [MIN_WIDTH, MAX_WIDTH], ['transparent', color]),
  }));

  const animatedTextStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: padding.value }],
  }));

  const animatedBoxStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: boxPadding.value }],
  }));

  const animatedDefaultSymbolStyle = useAnimatedStyle(() => ({
    opacity: defaultSymbolOpacity.value,
  }));

  const animatedActiveSymbolStyle = useAnimatedStyle(() => ({
    opacity: activeSymbolOpacity.value,
  }));

  return (
    <Pressable onPressIn={onPress}>
      <Animated.View style={[styles.animatedBox, animatedStyle]}>
        <Animated.View style={[styles.innerBox, animatedBoxStyle]}>
          <View style={styles.symbolContainer}>
            <Animated.View style={[styles.symbolWrapper, animatedDefaultSymbolStyle]}>
              <SymbolView name={defaultSymbol} type="palette" size={SYMBOL_SIZE} tintColor="#8999AB" />
            </Animated.View>
            <Animated.View style={[styles.symbolWrapper, animatedActiveSymbolStyle]}>
              <SymbolView name={activeSymbol} type="palette" size={SYMBOL_SIZE}   tintColor="white"/>
            </Animated.View>
          </View>
          <Animated.Text
            numberOfLines={1}
            style={[styles.text, animatedTextStyle]}
            onLayout={(event) => setTextWidth(event.nativeEvent.layout.width)}
          >
            {label}
          </Animated.Text>
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  animatedBox: {
    height: 44,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  innerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingLeft: INNER_BOX_PADDING_LEFT,
  },
  symbolContainer: {
    width: SYMBOL_SIZE,
    height: SYMBOL_SIZE,
    position: 'relative',
  },
  symbolWrapper: {
    position: 'absolute',
    width: SYMBOL_SIZE,
    height: SYMBOL_SIZE,
  },
  text: {
    flex: 1,
    overflow: 'hidden',
    position: 'absolute',
    color: 'white',
    fontWeight: '500',
    left: INNER_BOX_PADDING_LEFT + SYMBOL_SIZE + TEXT_PADDING + TEXT_TRANSLATE_X,
  },
});

export default TabBarButton;
