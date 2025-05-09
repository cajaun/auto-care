import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import TabBarButton from './tab-bar-buttons';
import { Configs } from '@/types/button-config';

const buttonConfigs: Configs[] = [
  {
    label: "Home",
    defaultSymbol: "house.fill",
    activeSymbol: "house.fill",
    color: '#FF4040',
  },
  {
    label: "Workshop",
    defaultSymbol: "location.fill",
    activeSymbol: "location.fill",
    color: '#FF4040',
  },
  {
    label: "History",
    defaultSymbol: "questionmark.circle.fill",
    activeSymbol: "questionmark.circle.fill",
    color: '#FF4040',
  },
  {
    label: "Profile",
    defaultSymbol: "person.fill",
    activeSymbol: "person.fill",
    color: '#FF4040',
  },
];

const TabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        {buttonConfigs.map((btn, index) => {
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: state.routes[index].key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(state.routes[index].name, state.routes[index].params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
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
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingBottom: 30,
    paddingVertical: 30,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
});

export default TabBar;
