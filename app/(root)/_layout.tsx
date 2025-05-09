import { Tabs } from "expo-router";
import { Platform, useColorScheme, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import { SymbolView } from "expo-symbols";
import TabBar from "@/components/ui/tab-bar";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <Tabs
    screenOptions={{headerShown: false}}
    tabBar={props=> <TabBar {...props} />}
    >
     
    </Tabs>
  );
}
