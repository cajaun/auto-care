import { View, Text, StatusBar, useColorScheme } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const ProfileLayout = () => {
  const colorScheme = useColorScheme();
  return (
    <Stack>
      
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(edit)" options={{ headerShown: false }} />
      <Stack.Screen name="(settings)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default ProfileLayout;
