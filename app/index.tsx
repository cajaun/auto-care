import React, { useEffect } from "react";
import { useAuth } from "@/context/auth-context";
import { ActivityIndicator, View } from "react-native";
import { router } from "expo-router";

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
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return null;
};

export default SplashScreen;
