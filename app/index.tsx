import React, { useEffect } from "react";
import { useAuth } from "@/context/auth-context";
import { View } from "react-native";
import { router } from "expo-router";
import { Image } from "expo-image"; 

const SplashScreen = () => {
  const { user, loading } = useAuth(); 

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.replace("/(root)/(tabs)/home"); 
      } else {
        router.replace("/(auth)/auth-screen");
      }
    }
  }, [loading, user]); 

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FF4040",
        }}
      >
        <Image
          source={require("@/assets/images/logo.png")} 
          style={{ width: 150, height: 150 }}
          contentFit="contain"
        />
      </View>
    );
  }

  return null;
};

export default SplashScreen;
