import { View, Text, TextInput } from "react-native";
import React from "react";
import { SymbolView } from "expo-symbols";
import { Image } from "expo-image";
import PillTabs from "@/components/ui/pill-tabs/pill-tabs";
import { pillTabsStyles } from "@/components/ui/pill-tabs/pill-tabs-styles";
import { tabs } from "@/util/tabs";
import { getAuth } from "firebase/auth";

interface HomeHeaderProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
  searchText: string;
  setSearchText: (text: string) => void;
}

const HomeHeader = ({
  activeTab,
  setActiveTab,
  searchText,
  setSearchText,
}: HomeHeaderProps) => {


  const auth = getAuth();

  // get the user that's logged in through the auth state 
  const user = auth.currentUser;

  const username = user?.displayName;

  return (
    <View className="bg-white rounded-es-[36px] rounded-ee-[36px]  gap-y-5 py-6">
      <View className="flex-row justify-between items-center px-4 ">
        <View className="flex-row justify-center items-center gap-x-4">
          <View>
            <Image
              source={{ uri: "https://picsum.photos/seed/696/3000/2000" }}
              style={{
                height: 40,
                width: 40,
                borderRadius: 20,
              }}
              contentFit="cover"
            />
          </View>

          <View>
            <Text className="text-xl font-bold">Welcome</Text>
            <Text className=" font-semibold text-dark-50">{username}</Text>
          </View>
        </View>

        <View className="items-center">
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

      <View className="px-4 mt-2">
        <View className="flex-row items-center border border-dark-5 rounded-xl px-4 py-3 h-[50px] bg-transparent">
          <SymbolView name="magnifyingglass" tintColor="#B8B8B8" size={25} />

          <TextInput
            className="flex-1 ml-2 bg-transparent"
            placeholder="Find your need service"
            value={searchText}
            onChangeText={setSearchText}
            secureTextEntry={false}
            autoCapitalize="none"
          />

          <SymbolView name="qrcode.viewfinder" tintColor="#B8B8B8" size={25} />
        </View>
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

      <View className="px-5">
        <PillTabs
          tabs={tabs}
          onChangeTab={setActiveTab}
          activeTab={activeTab}
          pillTabContainerStyle={pillTabsStyles.tabBarContainerStyle}
          tabStyle={[pillTabsStyles.tabStyle]}
          indicatorStyle={[pillTabsStyles.indicatorStyle]}
        />
      </View>
    </View>
  );
};

export default HomeHeader;
