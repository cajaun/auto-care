import {
  gestureHandlerRootHOC,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { Stack } from "expo-router";
import "./global.css";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { AuthProvider } from "@/context/auth-context";
import { StatusBar, useColorScheme } from "react-native";

export default function RootLayout() {

  const colorScheme = useColorScheme();
  return (
    <AuthProvider>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
      <StatusBar barStyle={colorScheme === "dark" ? "light-content" : "dark-content"} />
        <Stack >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(root)" options={{ headerShown: false }} />
        </Stack>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
    </AuthProvider>
  );
}
