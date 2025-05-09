import { View, Text, FlatList, ScrollView } from "react-native";
import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { router } from "expo-router";
import { auth } from "@/FirebaseConfig";

import HomeHeader from "@/components/home-header";
import HomeServices from "@/components/home-services";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.replace("/(auth)/auth-screen");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };
  const [activeTab, setActiveTab] = useState("services");

  return (
    <ScrollView className=" " style={{ width: "100%" }}>


     
      <HomeHeader activeTab={activeTab} setActiveTab={setActiveTab} />


      <HomeServices activeTab={activeTab} />
    </ScrollView>
  );
};

export default HomeScreen;
