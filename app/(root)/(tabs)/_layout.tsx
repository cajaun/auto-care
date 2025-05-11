import { router, Tabs } from "expo-router";
import TabBar from "@/components/ui/tab-bar/tab-bar";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="workshop"
        options={{
          title: "Workshop",
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            router.push("/(root)/(profile)");
          },
        }}
      />
    </Tabs>
  );
}
