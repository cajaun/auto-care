import React, { FC, useRef } from "react";
import { FlatList, View, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

import { TopTabs } from "@/components/ui/top-tabs/top-tabs";
import { Tab, TabValue } from "@/components/ui/top-tabs/types";
import { ItemContainer } from "@/components/ui/top-tabs/item-container";
import HistoryList from "@/components/history-list";

const tabs: Tab[] = [
  {
    label: "Services",
    value: TabValue.Dashboard,
    content: <HistoryList paymentType="services" />,
  },
  {
    label: "Rentals",
    value: TabValue.Coins,
    content: <HistoryList paymentType="rent" />,
  },
  {
    label: "Sales",
    value: TabValue.NFTs,
    content: <HistoryList paymentType="sales" />,
  }
];

const HistoryScreen = () => {
  const horizontalListRef = useRef<FlatList>(null);

  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const horizontalListOffsetX = useSharedValue(0);
  const isHorizontalListScrollingX = useSharedValue(false);
  const prevActiveTabIndex = useSharedValue(0);
  const activeTabIndex = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onBeginDrag: () => {
      isHorizontalListScrollingX.value = true;
    },
    onScroll: (event) => {
      horizontalListOffsetX.value = event.contentOffset.x;
    },
    onMomentumEnd: (event) => {
      isHorizontalListScrollingX.value = false;
      activeTabIndex.value = Math.round(event.contentOffset.x / width);
    },
  });

  const _renderItem = ({ item, index }: { item: Tab; index: number }) => {
    return (
      <ItemContainer
        index={index}
        activeTabIndex={activeTabIndex}
        prevActiveTabIndex={prevActiveTabIndex}
        horizontalListOffsetX={horizontalListOffsetX}
        isHorizontalListScrollingX={isHorizontalListScrollingX}
      >
        {item.content}
      </ItemContainer>
    );
  };

  return (
    <View
      className="flex-1 bg-neutral-200"
      style={{ paddingTop: insets.top + 8 }}
    >
      <TopTabs
        tabs={tabs}
        horizontalListRef={horizontalListRef}
        horizontalListOffsetX={horizontalListOffsetX}
        isHorizontalListScrollingX={isHorizontalListScrollingX}
        activeTabIndex={activeTabIndex}
        prevActiveTabIndex={prevActiveTabIndex}
      />

      <View className="flex-1">
        <Animated.FlatList
          ref={horizontalListRef}
          data={tabs}
          renderItem={_renderItem}
          keyExtractor={(item) => item.value.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          decelerationRate="fast"
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          bounces={false}
        />
      </View>
    </View>
  );
};

export default HistoryScreen;
