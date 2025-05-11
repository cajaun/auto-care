import React, { act, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SegmentedTabs } from "@/components/ui/segmented-tab";
import SignInForm from "@/components/forms/sign-in-form";
import SignUpForm from "@/components/forms/sign-up-form";
import { Stack } from "expo-router";

const AuthScreen = () => {
  const tabItems = [
    { key: "contacts", label: "Contacts" },
    { key: "recent", label: "Recent" },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <View className="flex-1">
      <SafeAreaView className="w-full h-full">
        <View className="bg-dark-5 px-4">
          <SegmentedTabs
            tabs={tabItems}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        </View>

        <View className="w-full">
          {activeIndex === 0 ? <SignInForm /> : <SignUpForm />}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default AuthScreen;
