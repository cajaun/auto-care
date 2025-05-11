import React, { act, useState } from "react";
import { View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { SegmentedTabs } from "@/components/ui/segmented-tab";
import SignInForm from "@/components/forms/sign-in-form";
import SignUpForm from "@/components/forms/sign-up-form";
import { Stack } from "expo-router";

const AuthScreen = () => {
  const tabItems = [
    { key: "login", label: "Login" },
    { key: "sign up", label: "Sign up" },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const {top} = useSafeAreaInsets();


  return (
    <View className="flex-1">
      <View className="">
        <View className="px-4 bg-dark-5" style={{paddingTop: top, paddingBottom: 12}}>
          <SegmentedTabs
            tabs={tabItems}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        </View>

        <View className="w-full">
          {activeIndex === 0 ? <SignInForm /> : <SignUpForm />}
        </View>
      </View>
    </View>
  );
};

export default AuthScreen;
