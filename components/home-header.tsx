import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SymbolView } from 'expo-symbols'
import { Image } from 'expo-image'
import PillTabs from './ui/top-tabs/pillTabs'
import { pillTabsStyles } from './ui/top-tabs/pill-tabs-styles'
import { tabs } from '@/util/tabs'


interface HomeHeaderProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
}


const HomeHeader = ({ activeTab, setActiveTab }: HomeHeaderProps) => {
  return (
    <SafeAreaView className="bg-white rounded-es-[36px] rounded-ee-[36px]  gap-y-5">
    <View className="flex-row justify-between items-center px-4 ">
      <View className="flex-row justify-center items-center gap-x-4">
        <View>
          <View className="h-10 w-10 bg-black rounded-full" />
        </View>

        <View>
          <Text className="text-2xl font-bold">Welcome</Text>
        </View>
      </View>

      <View className="">
        <View>
          <SymbolView
            name="bell.fill"
            type="hierarchical"
            tintColor="#FF4040"
            size={25}
          />
        </View>
      </View>
    </View>

    <View className = "px-4">
      <TextInput
        className="rounded-xl px-4 py-3 mt-2 h-[50px] bg-transparent border border-dark-5 placeholder:text-[#B8B8B8]"
        placeholder="Find your need service"
        secureTextEntry
        autoCapitalize="none"
      />
    </View>

    <View
      className="px-3"
      style={{
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        source={require("@/assets/images/Banner.png")}
        style={{
          width: "105%",
          height: 200,
          borderRadius: 12,
          marginLeft: 24,
        }}
        contentFit="cover"
      />
    </View>

    <View className="px-4">
      <PillTabs
        tabs={tabs}
        onChangeTab={setActiveTab}
        activeTab={activeTab}
        pillTabContainerStyle={pillTabsStyles.tabBarContainerStyle}
        tabStyle={[pillTabsStyles.tabStyle]}
        indicatorStyle={[pillTabsStyles.indicatorStyle]}
      />
    </View>
  </SafeAreaView>
  )
}

export default HomeHeader