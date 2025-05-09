import { Tabs } from "expo-router";
import { Platform, useColorScheme, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import { SymbolView } from "expo-symbols";
import TabBar from "@/components/ui/tab-bar";

export default function TabLayout() {

    
  return (
    <Tabs
    screenOptions={{headerShown: false}}
    tabBar={props=> <TabBar {...props} />}
    >
       <Tabs.Screen
            name="home"
            options={{
                title: "Home"
            }}
        />
        <Tabs.Screen
            name="workshop"
            options={{
                title: "Workshop"
            }}
        />
        <Tabs.Screen
            name="history"
            options={{
                title: "History"
            }}
        />
        <Tabs.Screen
            name="profile"
            options={{
                title: "Profile"
            }}
        />
    </Tabs>
  );
}
