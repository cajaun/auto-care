import { View, ScrollView } from "react-native";
import React, { useState } from "react";

import HomeHeader from "@/components/home-header";
import HomeServices from "@/components/home-services";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const HomeScreen = () => {
  const [activeTab, setActiveTab] = useState("services");
  const [searchText, setSearchText] = useState("");
  const { top } = useSafeAreaInsets();

  return (
    <View style={{ paddingTop: top }}>
      <ScrollView className=" " style={{ width: "100%" }}>
        <HomeHeader
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          searchText={searchText}
          setSearchText={setSearchText}
        />

        <HomeServices activeTab={activeTab} searchText={searchText} />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
