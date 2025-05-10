import React, { useState } from "react";
import { View, Text, Switch, TouchableOpacity, Pressable } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { logoutUser } from "@/services/auth-service";
import { useRouter } from "expo-router";
import { listItems } from "@/util/list-items";
import { SymbolView } from "expo-symbols";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileScreen = () => {
  const [isNotificationsOn, setIsNotificationsOn] = useState(true);
  const router = useRouter();

  return (
    <View className="flex-1 bg-white">
      <View className="w-full bg-[#1A202F] relative " style={{ height: 244 }}>
        <Image
          source={require("@/assets/images/profile-background.png")}
          style={{ width: "100%", height: "100%", position: "absolute" }}
          contentFit="cover"
        />

        <SafeAreaView
          className="flex-row justify-between items-center px-4 pt-4"
          style={{ position: "absolute", top: 0, left: 0, right: 0 }}
        >
          <Pressable onPress={() => router.back()}>
            <SymbolView name="arrow.left" tintColor={"#fff"} />
          </Pressable>
          <Text className="text-2xl font-semibold text-white">
            Profile
          </Text>
          <View className="w-6" />
        </SafeAreaView>
      </View>

      <View className="flex-row justify-between items-center px-6 -mt-[40px]">
        <Image
          source={{ uri: "https://picsum.photos/seed/696/3000/2000" }}
          style={{
            height: 80,
            width: 80,
            borderRadius: 40,
          }}
          contentFit="cover"
        />
      </View>

      <View className="mt-4 px-6 gap-y-3">
        <Text className="text-xl font-bold text-[#0C1A30]">Denuyel</Text>
        <Text className="text-dark-90 mt-1 text-lg">
          2972 Westheimer Rd. Santa Ana,{"\n"}Illinois 85486
        </Text>
      </View>

      <View className="gap-y-2 px-6 mt-8">
        {listItems.map((item, index, arr) => (
          <View key={index} className="">
            <TouchableOpacity
              activeOpacity={item.isSwitch ? 1 : 0.7}
              onPress={item.onPress}
              disabled={item.isSwitch}
              className="flex-row justify-between items-center py-4"
            >
              <View className="flex-row items-center gap-x-3">
                <View className="bg-dark-5 h-10 w-10 rounded-full items-center justify-center">
                  <Ionicons name={item.icon as any} size={20} color="#0C1A30" />
                </View>
                <Text className="">{item.label}</Text>
              </View>

              {item.isSwitch && (
                <Switch
                  value={isNotificationsOn}
                  onValueChange={setIsNotificationsOn}
                  trackColor={{ false: "#D1D5DB", true: "#22C55E" }}
                  thumbColor="#fff"
                />
              )}
            </TouchableOpacity>

            <View className="h-[1px] bg-dark-5 w-full" />
          </View>
        ))}
      </View>
    </View>
  );
};

export default ProfileScreen;
